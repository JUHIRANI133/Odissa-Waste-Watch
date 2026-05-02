
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, MapPin, Truck, User, Droplet, Anchor, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useMemo, Suspense } from "react";

function ApprovedReportsContent() {
  const db = useFirestore();
  const reportsQuery = useMemo(() => db ? query(collection(db, 'monthlyReports'), where('status', '==', 'Approved'), orderBy('submittedAt', 'desc')) : null, [db]);
  const { data: reports = [] } = useCollection(reportsQuery);

  return (
    <div className="space-y-8">
      <Card className="border-2 border-primary/20 bg-primary/[0.01]">
        <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-3xl font-black uppercase tracking-tight text-primary flex items-center gap-3">
                <ShieldCheck className="h-10 w-10" /> Verified Monthly Reports (State Ledger)
            </CardTitle>
            <CardDescription className="text-lg font-bold">Consolidated directory of all monthly submissions approved by Block representatives.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-8">
        {reports.map((report: any) => (
            <Card key={report.id} className="border-2 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30">
                    <div>
                        <CardTitle className="text-lg font-black uppercase text-primary">Node: {report.gpName} ({report.block})</CardTitle>
                        <CardDescription>Approved on: {new Date(report.submittedAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="font-black text-[10px] uppercase">
                        <Download className="mr-2 h-3 w-3"/> Export Receipt
                    </Button>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="p-3 border rounded-lg bg-card">
                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Administrative Context</p>
                            <p className="text-xs font-bold uppercase">{report.district} District</p>
                            <p className="text-[10px] text-primary font-bold uppercase">{report.ulbName}</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-card text-center">
                             <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Receipt Reference</p>
                             <p className="text-xs font-mono font-bold">{report.receiptNo}</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-card text-right">
                             <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Total Tonnage</p>
                             <p className="text-lg font-black text-primary">{parseFloat(report.plastic || 0) + parseFloat(report.paper || 0) + parseFloat(report.metal || 0)} Kg</p>
                        </div>
                    </div>
                    <Separator className="border-dashed" />
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                {['Plastic', 'Paper', 'Metal', 'Glass', 'Special', 'Cloth', 'Sanitary'].map(h => <TableHead key={h} className="text-center font-black uppercase text-[9px]">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.plastic}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.paper}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.metal}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.glass}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.special}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.cloth}</TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">{report.sanitary}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        ))}

        {reports.length === 0 && (
            <Card className="border-2 border-dashed p-32 text-center text-muted-foreground flex flex-col items-center gap-4 opacity-30">
                <FileText className="h-20 w-20" />
                <p className="text-xl font-black uppercase tracking-[0.2em]">No Approved Reports Resolved</p>
            </Card>
        )}
      </div>
    </div>
  );
}

export default function MonthlyDetailsPage() {
    return (<Suspense fallback={<div>Loading state ledger...</div>}><ApprovedReportsContent /></Suspense>);
}
