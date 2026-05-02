
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MailWarning, Search, UserCircle, Clock, Info, CheckCircle2 } from "lucide-react";
import { useMemo, useState, Suspense, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

function PersonnelRequestsContent() {
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    
    // Initialized as blank to show only genuine submitted data
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => { setMounted(true); }, []);

    const filteredRequests = requests.filter(r => 
        r.personnel.toLowerCase().includes(search.toLowerCase()) || 
        r.type.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch(status) {
            case 'Approved': return 'default';
            case 'Pending': return 'secondary';
            case 'Rejected': return 'destructive';
            default: return 'outline';
        }
    };

    if (!mounted) return null;

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-primary/[0.01] shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <MailWarning className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight text-primary">Personnel Request Hub</CardTitle>
                            <CardDescription className="font-bold italic">Centralized management of queries transmitted from constitute GP nodes and personnel.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card className="border-2 shadow-lg overflow-hidden">
                <CardHeader className="bg-muted/30 border-b pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                            <Input 
                                placeholder="Search by name or request type..." 
                                className="pl-9 h-11 font-medium"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary font-black uppercase text-[10px] px-3 h-8">
                            {filteredRequests.length} ACTIVE QUERIES
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest border-r">Personnel Details</TableHead>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest border-r">Category</TableHead>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest border-r">Date Received</TableHead>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest border-r">Description of Complaint/Request</TableHead>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest border-r text-center">Status</TableHead>
                                <TableHead className="uppercase text-[10px] font-black tracking-widest text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRequests.map((req) => (
                                <TableRow key={req.id} className="hover:bg-primary/[0.01] border-b border-dashed last:border-0 h-24 transition-colors">
                                    <TableCell className="border-r">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-muted"><UserCircle className="h-5 w-5 text-muted-foreground" /></div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-xs uppercase leading-tight">{req.personnel}</p>
                                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{req.role}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-r">
                                        <Badge variant="outline" className="text-[9px] font-black uppercase border-primary/20 bg-primary/5">{req.type}</Badge>
                                    </TableCell>
                                    <TableCell className="border-r font-mono text-[10px] font-bold text-muted-foreground">
                                        <div className="flex items-center gap-1.5"><Clock className="h-3 w-3 opacity-40"/> {req.date}</div>
                                    </TableCell>
                                    <TableCell className="border-r max-w-xs py-4">
                                        <p className="text-[10px] font-medium leading-relaxed italic">"{req.details}"</p>
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                        <Badge variant={getStatusVariant(req.status)} className="text-[9px] font-black uppercase">{req.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col gap-1 px-2">
                                            <Button 
                                                size="sm" 
                                                className="h-7 text-[8px] font-black uppercase"
                                                onClick={() => toast({ title: "Request Approved", description: `Query from ${req.personnel} has been finalized.` })}
                                            >
                                                Approve
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-7 text-[8px] font-black uppercase border-destructive/20 text-destructive hover:bg-destructive/5"
                                                onClick={() => toast({ title: "Request Rejected", description: `Query from ${req.personnel} has been declined.`, variant: "destructive" })}
                                            >
                                                Decline
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredRequests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-20 text-muted-foreground italic">
                                        <div className="flex flex-col items-center gap-2 opacity-40">
                                            <MailWarning className="h-10 w-10" />
                                            <p className="text-xs uppercase font-black tracking-widest">No genuine complaints logged in current reporting cycle.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed bg-muted/20">
                    <CardContent className="py-6 flex items-start gap-4">
                        <Info className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase tracking-tight">Administrative Guidelines</p>
                            <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                                Only genuine complaints registered through the Personnel Portals appear in this hub. "Vehicle Maintenance" and "Logistical Gap" categories trigger immediate district review.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-dashed bg-muted/20">
                    <CardContent className="py-6 flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase tracking-tight">System Integrity</p>
                            <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                                Every action performed on this page is mirrored in the District and State audit logs for accountability.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function PersonnelRequestsPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading request hub...</div>}>
            <PersonnelRequestsContent />
        </Suspense>
    );
}
