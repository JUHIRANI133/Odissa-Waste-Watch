
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Building } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type RequestStatus = "Approved" | "Rejected" | "Pending";

const requestSchema = z.object({
  requestType: z.enum(["leave", "shift_change", "route_reassignment", "other"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  details: z.string().min(20, "Please provide more details for your request"),
});

const pastRequests = [
    {id: 1, type: "Leave", subject: "Leave for Family Function", status: "Approved" as RequestStatus, date: "2026-05-15"},
    {id: 2, type: "Other", subject: "Vehicle Maintenance Issue", status: "Pending" as RequestStatus, date: "2026-05-22"},
]

function RequestQueryContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ulb = searchParams.get('ulb') || 'Assigned Facility';

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      subject: "",
      details: "",
    },
  });
  
  const getStatusVariant = (status: RequestStatus) => {
    switch (status) {
        case "Approved": return "default";
        case "Pending": return "secondary";
        case "Rejected": return "destructive";
        default: return "outline";
    }
  }

  function onSubmit(values: z.infer<typeof requestSchema>) {
    console.log("Reporting Request to ULB:", ulb, values);
    toast({
      title: "Request Transmitted",
      description: `Your query has been reported to the ${ulb} administrative cell.`,
    });
    form.reset({ subject: "", details: "" });
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card className="border-2 shadow-md">
                <CardHeader className="bg-primary/5 border-b">
                    <CardTitle className="flex items-center gap-2 uppercase font-black tracking-tight">
                        <MessageSquare className="text-primary h-5 w-5" /> Personnel Request Hub
                    </CardTitle>
                    <CardDescription className="font-bold text-primary">Direct communication with {ulb} Nodal Cell.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="requestType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-xs font-black uppercase">Request Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="h-11 font-bold">
                                        <SelectValue placeholder="Select a request type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="leave">Leave Application</SelectItem>
                                    <SelectItem value="shift_change">Shift Change</SelectItem>
                                    <SelectItem value="route_reassignment">Route Reassignment</SelectItem>
                                    <SelectItem value="other">Other Query</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xs font-black uppercase">Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Leave for personal reasons" {...field} className="h-11 font-bold" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-xs font-black uppercase">Detailed Explanation</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Provide high-fidelity context for your request."
                                    className="resize-none font-medium"
                                    rows={5}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-12 font-black uppercase tracking-widest shadow-lg">
                            <Send className="mr-2 h-4 w-4"/> Transmit to ULB Cell
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="border-2">
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" /> Transmission Log
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    {pastRequests.map((request) => (
                        <div key={request.id} className="p-4 border-2 border-dashed rounded-2xl bg-card shadow-sm">
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-xs uppercase text-foreground">{request.subject}</h4>
                                 <Badge variant={getStatusVariant(request.status)} className="text-[8px] font-black uppercase h-4">
                                    {request.status}
                                </Badge>
                            </div>
                             <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">{request.type} | {request.date}</p>
                        </div>
                    ))}
                    {pastRequests.length === 0 && <p className="text-center text-xs text-muted-foreground italic">No queries logged in current cycle.</p>}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

export default function RequestQueryPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading request hub...</div>}>
            <RequestQueryContent />
        </Suspense>
    )
}
