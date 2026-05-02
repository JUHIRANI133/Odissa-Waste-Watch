'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Truck, Route, Building, ShieldCheck, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

function ProfileContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || 'Personnel';
    const role = searchParams.get('role') || 'Personnel';
    const contact = searchParams.get('contact') || 'N/A';
    const district = searchParams.get('district') || 'N/A';
    const block = searchParams.get('block') || 'N/A';
    const ulb = searchParams.get('ulb') || 'N/A';

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    const formatRole = (r: string) => {
        switch(r) {
            case 'driver': return 'Logistical Driver';
            case 'sanitation_worker': return 'Sanitation Worker';
            case 'nodal_gp': return 'Nodal Person (GP)';
            case 'nodal_ulb': return 'Nodal Person (ULB)';
            default: return r.replace('_', ' ').toUpperCase();
        }
    }

    return (
        <Card className="max-w-2xl mx-auto border-2 shadow-xl">
            <CardHeader className="text-center bg-primary/5 border-b pb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-background shadow-xl">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">{initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-headline font-black uppercase tracking-tight text-primary">{name}</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">{formatRole(role)}</CardDescription>
                <Badge variant="secondary" className="mt-4 font-black uppercase tracking-widest">{ulb}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 pt-8">
               <div className="grid gap-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed hover:border-primary/40 transition-colors">
                        <div className="p-2 rounded-full bg-background"><ShieldCheck className="h-5 w-5 text-primary"/></div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Administrative Role</p>
                            <p className="font-black text-lg">{formatRole(role)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                        <div className="p-2 rounded-full bg-background"><Phone className="h-5 w-5 text-primary"/></div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified Contact</p>
                            <p className="font-mono font-black text-lg">{contact}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                            <div className="p-2 rounded-full bg-background"><MapPin className="h-5 w-5 text-primary"/></div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">District</p>
                                <p className="font-black text-sm uppercase">{district}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                            <div className="p-2 rounded-full bg-background"><Building className="h-5 w-5 text-primary"/></div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Block</p>
                                <p className="font-black text-sm uppercase">{block}</p>
                            </div>
                        </div>
                    </div>
               </div>

               <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
                    <p className="text-xs font-bold text-primary italic">This profile is managed by the District SWM Cell. All operational circuits are logged in real-time.</p>
               </div>
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading verified profile...</div>}>
        <ProfileContent />
    </Suspense>
  );
}
