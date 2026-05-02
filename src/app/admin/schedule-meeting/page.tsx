'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Send, Save, Building2, FileText, Upload, Loader2, RefreshCw, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mrfData } from "@/lib/mrf-data";
import { useMemo, useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Schema for scheduling meetings
const scheduleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  district: z.string({ required_error: "Please select a target district or 'All'." }),
  date: z.date({ required_error: "A date for the meeting is required." }),
  agenda: z.string().min(10, { message: "Agenda must be at least 10 characters." }),
});

// Schema for planning/logging meetings
const planningSchema = z.object({
    conducted: z.enum(["yes", "no"]),
    date: z.date().optional(),
    participants: z.string().optional(),
    decisions: z.string().optional(),
}).refine(data => data.conducted === 'no' || (data.conducted === 'yes' && data.date), {
    message: "Date of meeting is required if meeting was conducted.",
    path: ["date"],
});

interface MeetingRecord {
    id: string;
    title: string;
    district: string;
    date: Date;
    agenda: string;
    conducted: string;
    meetingDate?: Date;
    participants?: string;
    decisions?: string;
    minutesPdfUrl?: string;
    photosUrls?: string[];
    createdAt: Date;
    status: 'scheduled' | 'completed';
}

// Helper function to extract text from PDF (simplified - you may want to use a proper PDF parsing library)
const extractTextFromPDF = async (file: File): Promise<string> => {
    // This is a placeholder for actual PDF text extraction
    // In production, you would use libraries like pdf-parse or a cloud AI service
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            // Simulate AI text extraction
            // Replace this with actual PDF text extraction logic
            resolve("Extracted text from PDF would appear here. In production, use a proper PDF parsing library.");
        };
        reader.readAsArrayBuffer(file);
        return "PDF uploaded successfully";
    });
};

export default function ScheduleMeetingPage() {
    const { toast } = useToast();
    const db = useFirestore();
    const storage = getStorage();
    
    const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const districtOptions = useMemo(() => {
        const districts = Array.from(new Set(mrfData.map(d => d.district))).sort();
        return ["All", ...districts];
    }, []);

    const scheduleForm = useForm<z.infer<typeof scheduleSchema>>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            district: "All"
        }
    });

    const planningForm = useForm<z.infer<typeof planningSchema>>({
        resolver: zodResolver(planningSchema),
        defaultValues: {
            conducted: "no",
        }
    });

    const wasConducted = planningForm.watch("conducted");

    // Real-time Firestore listener for meetings
    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const meetingsQuery = query(
            collection(db, 'meetings'),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(meetingsQuery,
            (snapshot) => {
                const meetingsList: MeetingRecord[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    meetingsList.push({
                        id: doc.id,
                        title: data.title || '',
                        district: data.district || '',
                        date: data.date?.toDate() || new Date(),
                        agenda: data.agenda || '',
                        conducted: data.conducted || 'no',
                        meetingDate: data.meetingDate?.toDate(),
                        participants: data.participants || '',
                        decisions: data.decisions || '',
                        minutesPdfUrl: data.minutesPdfUrl || '',
                        photosUrls: data.photosUrls || [],
                        createdAt: data.createdAt?.toDate() || new Date(),
                        status: data.status || 'scheduled'
                    });
                });
                setMeetings(meetingsList);
                setLoading(false);
            },
            (error) => {
                console.error("Firestore listener error:", error);
                setLoading(false);
                toast({
                    title: "Connection Error",
                    description: "Unable to sync meeting data.",
                    variant: "destructive"
                });
            }
        );

        return () => unsubscribe();
    }, [db, toast]);

    async function onScheduleSubmit(values: z.infer<typeof scheduleSchema>) {
        if (!db) {
            toast({ title: "Error", description: "Database connection not available.", variant: "destructive" });
            return;
        }

        try {
            const documentId = `${values.title}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
            const meetingRef = doc(db, 'meetings', documentId);
            
            const meetingData = {
                title: values.title,
                district: values.district,
                date: values.date,
                agenda: values.agenda,
                conducted: 'no',
                status: 'scheduled',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            await setDoc(meetingRef, meetingData);
            
            toast({
                title: "Meeting Scheduled!",
                description: `The meeting "${values.title}" has been scheduled for ${format(values.date, "PPP")}. Officials from ${values.district === 'All' ? 'all districts' : values.district} have been notified.`,
            });
            scheduleForm.reset({ district: "All", title: "", agenda: "" });
        } catch (error) {
            console.error("Error scheduling meeting:", error);
            toast({ title: "Error", description: "Failed to schedule meeting.", variant: "destructive" });
        }
    }
    
    async function onPlanningSubmit(values: z.infer<typeof planningSchema>) {
        if (!db) {
            toast({ title: "Error", description: "Database connection not available.", variant: "destructive" });
            return;
        }

        setUploading(true);
        
        try {
            // For demo, we're creating a new meeting record or updating existing
            const documentId = `meeting-${Date.now()}`;
            const meetingRef = doc(db, 'meetings', documentId);
            
            const meetingData = {
                title: "Steering Committee Meeting",
                district: "All",
                date: values.date || new Date(),
                agenda: "District Steering Committee Meeting",
                conducted: values.conducted,
                meetingDate: values.date,
                participants: values.participants || '',
                decisions: values.decisions || '',
                status: 'completed',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            await setDoc(meetingRef, meetingData);
            
            toast({
                title: "Meeting Details Saved",
                description: "Your steering committee meeting details have been recorded.",
            });
            planningForm.reset({ conducted: "no" });
        } catch (error) {
            console.error("Error saving meeting details:", error);
            toast({ title: "Error", description: "Failed to save meeting details.", variant: "destructive" });
        } finally {
            setUploading(false);
        }
    }

    const handleManualRefresh = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            setLoading(false);
        }, 1000);
        toast({ 
            title: "Refreshing", 
            description: "Syncing latest meeting data...",
            variant: "default"
        });
    };

    const getStatusBadge = (status: string) => {
        if (status === 'completed') {
            return <Badge className="bg-green-600">Completed</Badge>;
        }
        return <Badge variant="secondary">Scheduled</Badge>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading meetings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-6 w-6 text-primary" />
                                Schedule a New Steering Committee Meeting
                            </CardTitle>
                            <CardDescription>Organize a new review session and notify regional officials.</CardDescription>
                        </div>
                        <Button 
                            onClick={handleManualRefresh} 
                            variant="outline"
                            className="font-black uppercase tracking-widest h-11"
                            disabled={syncing}
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} /> 
                            Sync Now
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...scheduleForm}>
                        <form onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={scheduleForm.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meeting Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Monthly Review" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={scheduleForm.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Target District (Recipient Scope)</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a district or 'All'" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <ScrollArea className="h-72">
                                                        {districtOptions.map(d => (
                                                            <SelectItem key={d} value={d} className={d === 'All' ? 'font-black text-primary' : ''}>
                                                                {d === 'All' ? 'All Districts (State-wide)' : d}
                                                            </SelectItem>
                                                        ))}
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={scheduleForm.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of Meeting</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn("w-full max-w-sm pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                    >
                                                        {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={scheduleForm.control}
                                name="agenda"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meeting Agenda</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Briefly describe the meeting agenda and required documentation" className="min-h-[120px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full max-w-sm h-11 font-bold">
                                <Send className="mr-2 h-4 w-4"/>
                                Schedule & Notify Officials
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Log Steering Committee Meeting</CardTitle>
                    <CardDescription>Log details of district-level steering committee meetings that have been attended.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...planningForm}>
                        <form onSubmit={planningForm.handleSubmit(onPlanningSubmit)} className="space-y-6">
                            <FormField
                                control={planningForm.control}
                                name="conducted"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Was a district-level steering committee meeting conducted/attended?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex items-center space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl><RadioGroupItem value="yes" id="yes" /></FormControl>
                                                    <FormLabel htmlFor="yes">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl><RadioGroupItem value="no" id="no" /></FormControl>
                                                    <FormLabel htmlFor="no">No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {wasConducted === 'yes' && (
                                <div className="space-y-6 pl-2 border-l-2 ml-2 pt-4">
                                    <FormField
                                        control={planningForm.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of Meeting</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn("w-full max-w-sm pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                            >
                                                                {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={planningForm.control}
                                        name="participants"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Details of Participants</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter names or departments of participants" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={planningForm.control}
                                        name="decisions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Key Decisions</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Summarize the key decisions made" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                            <Button type="submit" className="w-full max-w-sm h-11" disabled={uploading}>
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4"/>
                                        Save Meeting Details
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* History Card */}
            <Card className="border-2 shadow-md">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Meeting History</CardTitle>
                            <CardDescription>Complete record of all steering committee meetings</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full min-w-[1000px] table-auto">
                            <TableHeader className="bg-muted/80">
                                <TableRow>
                                    <TableHead className="w-[200px] uppercase text-[11px] font-black border">Meeting Title</TableHead>
                                    <TableHead className="w-[120px] uppercase text-[11px] font-black border">Scheduled Date</TableHead>
                                    <TableHead className="w-[120px] uppercase text-[11px] font-black border">Meeting Date</TableHead>
                                    <TableHead className="w-[150px] uppercase text-[11px] font-black border">District</TableHead>
                                    <TableHead className="w-[250px] uppercase text-[11px] font-black border">Agenda</TableHead>
                                    <TableHead className="w-[200px] uppercase text-[11px] font-black border">Participants</TableHead>
                                    <TableHead className="w-[250px] uppercase text-[11px] font-black border">Key Decisions</TableHead>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black border text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {meetings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            No meetings found. Schedule a meeting to see it here.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    meetings.map((meeting) => (
                                        <TableRow key={meeting.id} className="hover:bg-primary/[0.02] border-b transition-colors">
                                            <TableCell className="border text-[11px] font-bold p-3 break-words">{meeting.title}</TableCell>
                                            <TableCell className="border text-[11px] font-mono p-3">{format(meeting.date, "dd MMM yyyy")}</TableCell>
                                            <TableCell className="border text-[11px] font-mono p-3">
                                                {meeting.meetingDate ? format(meeting.meetingDate, "dd MMM yyyy") : '-'}
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-medium p-3">{meeting.district}</TableCell>
                                            <TableCell className="border text-[10px] p-3 break-words">{meeting.agenda}</TableCell>
                                            <TableCell className="border text-[10px] p-3 break-words">{meeting.participants || '-'}</TableCell>
                                            <TableCell className="border text-[10px] p-3 break-words">{meeting.decisions || '-'}</TableCell>
                                            <TableCell className="border text-center p-3">{getStatusBadge(meeting.status)}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}