
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { FileText, MapPin, Truck, User, Droplet, Anchor, CheckCircle, XCircle, Send, Building, ClipboardList, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Suspense, useMemo, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';

function OfficialDashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const district = searchParams.get('district');
  const block = searchParams.get('block');
  const { toast } = useToast();
  const db = useFirestore();

  const reportsQuery = useMemo(() => {
    if (!db) return null;
    if (role === 'block') {
        return query(collection(db, 'monthlyReports'), where('block', '==', block), where('status', '==', 'Pending Block Approval'));
    }
    if (role === 'district') {
        return query(collection(db, 'monthlyReports'), where('district', '==', district), where('status', '==', 'Approved'));
    }
    return null;
  }, [db, role, block, district]);

  const { data: reports = [] } = useCollection(reportsQuery);

  const handleAction = async (reportId: string, status: string) => {
    if (!db) return;
    try {
        await updateDoc(doc(db, 'monthlyReports', reportId), { status });
        toast({ title: `Report ${status}`, description: `Action successful for report node.` });
    } catch (err) {
        toast({ title: "Error", description: "Database sync failed.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
        <Card className="border-2 border-primary/20 shadow-xl bg-primary/[0.01]">
            <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight text-primary">
                    <ShieldCheck className="h-10 w-10" />
                    {role === 'block' ? `Block Approval Hub: ${block}` : `District Approved Reports: ${district}`}
                </CardTitle>
                <CardDescription className="text-lg font-bold">Verified queue of reports synced from constituent ULB facilities.</CardDescription>
            </CardHeader>
        </Card>

        <div className="grid gap-10">
            {reports.map((report: any) => (
                <Card key={report.id} className="border-2 shadow-lg overflow-hidden">
                    <CardHeader className="bg-muted/40 border-b flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black uppercase text-primary">Report Node: {report.gpName}</CardTitle>
                            <CardDescription className="font-bold">Receipt No: {report.receiptNo} | Date: {report.receiptDate}</CardDescription>
                        </div>
                        <Badge variant={report.status === 'Approved' ? 'default' : 'secondary'} className="font-black uppercase h-6">{report.status}</Badge>
                    </CardHeader>
                    <CardContent className="p-8 space-y-10">
                        <div className="grid md:grid-cols-3 gap-8">
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><MapPin className="h-3 w-3" /> Location Context</h4>
                                <div className="p-4 rounded-xl border-2 border-dashed bg-muted/5 text-sm font-bold uppercase leading-relaxed">
                                    <p className="text-primary">{report.district} District</p>
                                    <p className="text-muted-foreground">{report.block} Block</p>
                                    <p>{report.ulbName}</p>
                                </div>
                             </div>
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><User className="h-3 w-3" /> Personnel</h4>
                                <div className="p-4 rounded-xl border-2 border-dashed bg-muted/5 text-xs font-bold leading-relaxed">
                                    <p className="text-primary uppercase">Sender: {report.senderName}</p>
                                    <p className="text-muted-foreground uppercase">Receiver: {report.receiverName}</p>
                                    <p className="font-mono mt-1">C: {report.receiverContact}</p>
                                </div>
                             </div>
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><Truck className="h-3 w-3" /> Logistics</h4>
                                <div className="p-4 rounded-xl border-2 border-dashed bg-muted/5 text-xs font-bold leading-relaxed">
                                    <p className="uppercase">Vehicle: {report.vehicleType}</p>
                                    <p className="font-mono text-primary">{report.vehicleNo}</p>
                                    <p className="uppercase mt-1">Driver: {report.driverName}</p>
                                </div>
                             </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><Droplet className="h-3 w-3" /> Waste Stream Audit (Kg)</h4>
                            <div className="rounded-2xl border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted/80">
                                        <TableRow>
                                            {['Plastic', 'Paper', 'Metal', 'Glass', 'Special', 'Cloth', 'Sanitary'].map(h => <TableHead key={h} className="text-center font-black uppercase text-[9px]">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="h-12">
                                            <TableCell className="text-center font-mono font-bold">{report.plastic}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.paper}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.metal}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.glass}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.special}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.cloth}</TableCell>
                                            <TableCell className="text-center font-mono font-bold">{report.sanitary}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                    {role === 'block' && (
                        <CardFooter className="bg-muted/30 border-t p-6 flex justify-end gap-4">
                            <Button variant="destructive" className="font-black uppercase h-12 px-8" onClick={() => handleAction(report.id, 'Rejected')}>
                                <XCircle className="mr-2" /> Reject Report
                            </Button>
                            <Button className="font-black uppercase h-12 px-8 bg-green-600 hover:bg-green-700" onClick={() => handleAction(report.id, 'Approved')}>
                                <CheckCircle className="mr-2" /> Approve & Transmit
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            ))}

            {reports.length === 0 && (
                <Card className="border-2 border-dashed p-32 text-center text-muted-foreground flex flex-col items-center gap-4 opacity-30">
                    <ClipboardList className="h-20 w-20" />
                    <p className="text-xl font-black uppercase tracking-[0.2em]">Queue Empty: Awaiting Submissions</p>
                </Card>
            )}
        </div>
    </div>
  );
}

export default function OfficialDashboardPage() {
  return (
    <Suspense fallback={<div>Loading Approval Queue...</div>}>
      <OfficialDashboardContent />
    </Suspense>
  )
}
