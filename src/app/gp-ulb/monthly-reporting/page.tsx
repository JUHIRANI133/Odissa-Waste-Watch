
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, FileUp, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFirestore } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

function MonthlyReportingContent() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const db = useFirestore();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        district: searchParams.get('district') || '',
        block: searchParams.get('block') || '',
        gpName: searchParams.get('gp') || '',
        collectionPoint: '',
        receiptNo: '',
        receiptDate: '',
        senderName: '',
        senderDesignation: '',
        senderContact: '',
        receiverName: '',
        receiverDesignation: '',
        receiverContact: '',
        ulbName: searchParams.get('ulb') || '',
        mrfName: '',
        vehicleNo: '',
        vehicleType: '',
        driverName: '',
        driverContact: '',
        plastic: '',
        paper: '',
        metal: '',
        glass: '',
        special: '',
        cloth: '',
        sanitary: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!db) return;
        setIsLoading(true);

        try {
            await addDoc(collection(db, 'monthlyReports'), {
                ...form,
                status: 'Pending Block Approval',
                submittedAt: new Date().toISOString(),
                ulb: searchParams.get('ulb')
            });
            toast({ title: "Report Submitted", description: "Successfully transmitted to Block Portal for approval." });
            router.push(`/gp-ulb?${searchParams.toString()}`);
        } catch (err) {
            toast({ title: "Submission Failed", description: "Ledger sync error.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-2 shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="font-black uppercase tracking-tight">Monthly Reporting Hub</CardTitle>
                <CardDescription className="font-bold">Authoritative data compilation for jurisdictional auditing.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase text-muted-foreground border-b pb-2 tracking-[0.2em]">Context & Receipt</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5"><Label className="text-[9px] font-black uppercase opacity-60">District</Label><Input value={form.district} disabled className="bg-muted/20 font-bold" /></div>
                            <div className="space-y-1.5"><Label className="text-[9px] font-black uppercase opacity-60">Block</Label><Input value={form.block} disabled className="bg-muted/20 font-bold" /></div>
                            <div className="space-y-1.5"><Label className="text-[9px] font-black uppercase opacity-60">GP Name</Label><Input value={form.gpName} onChange={e => setForm({...form, gpName: e.target.value})} className="font-bold" /></div>
                            <div className="space-y-1.5 md:col-span-2"><Label className="text-[9px] font-black uppercase opacity-60">Collection Point Address</Label><Input value={form.collectionPoint} onChange={e => setForm({...form, collectionPoint: e.target.value})} /></div>
                            <div className="space-y-1.5"><Label className="text-[9px] font-black uppercase opacity-60">Receipt No.</Label><Input value={form.receiptNo} onChange={e => setForm({...form, receiptNo: e.target.value})} className="font-mono" /></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase text-muted-foreground border-b pb-2 tracking-[0.2em]">Verified Personnel</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-4 border-2 border-dashed rounded-2xl bg-muted/5 space-y-4">
                                <p className="text-[10px] font-black text-primary uppercase">Sender (GP Side)</p>
                                <Input placeholder="Name" value={form.senderName} onChange={e => setForm({...form, senderName: e.target.value})} />
                                <Input placeholder="Designation" value={form.senderDesignation} onChange={e => setForm({...form, senderDesignation: e.target.value})} />
                                <Input placeholder="Contact" value={form.senderContact} onChange={e => setForm({...form, senderContact: e.target.value})} />
                            </div>
                            <div className="p-4 border-2 border-dashed rounded-2xl bg-muted/5 space-y-4">
                                <p className="text-[10px] font-black text-primary uppercase">Receiver (ULB Side)</p>
                                <Input placeholder="Name" value={form.receiverName} onChange={e => setForm({...form, receiverName: e.target.value})} />
                                <Input placeholder="Designation" value={form.receiverDesignation} onChange={e => setForm({...form, receiverDesignation: e.target.value})} />
                                <Input placeholder="Contact" value={form.receiverContact} onChange={e => setForm({...form, receiverContact: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase text-muted-foreground border-b pb-2 tracking-[0.2em]">Quantification (Kg)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['plastic', 'paper', 'metal', 'glass', 'special', 'cloth', 'sanitary'].map(item => (
                                <div key={item} className="space-y-1.5">
                                    <Label className="text-[9px] font-black uppercase opacity-60">{item}</Label>
                                    <Input type="number" placeholder="0.0" value={form[item as keyof typeof form]} onChange={e => setForm({...form, [item]: e.target.value})} className="font-mono font-bold" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-xl" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Submit Official Report
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default function MonthlyReportingPage() {
    return (<Suspense fallback={<div>Loading...</div>}><MonthlyReportingContent /></Suspense>);
}
