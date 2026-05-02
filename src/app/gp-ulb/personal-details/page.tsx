
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Building, CalendarDays, MapPin, Map } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

function PersonalDetailsContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const gp = searchParams.get('gp');
    const ulb = searchParams.get('ulb');
    const name = searchParams.get('name') || 'Official User';
    const block = searchParams.get('block');
    const district = searchParams.get('district');
    const contact = searchParams.get('contact') || 'N/A';

    const roleName = role === 'gp' ? 'Gram Panchayat Official' : 'Urban Local Body Official';
    const affiliation = gp || ulb || 'N/A';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <Card className="max-w-2xl mx-auto border-2 shadow-lg">
            <CardHeader className="text-center bg-primary/5 border-b pb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-background shadow-xl">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">{initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-black uppercase tracking-tight text-primary">{name}</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">{roleName}</CardDescription>
                <Badge variant="secondary" className="mt-4 font-black uppercase">{affiliation}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 pt-8">
               <div className="grid gap-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed hover:border-primary/40 transition-colors">
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
                                <p className="font-black text-sm uppercase">{district || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                            <div className="p-2 rounded-full bg-background"><Building className="h-5 w-5 text-primary"/></div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Block</p>
                                <p className="font-black text-sm uppercase">{block || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                        <div className="p-2 rounded-full bg-background"><Map className="h-5 w-5 text-primary"/></div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{role?.toUpperCase()} Affiliation</p>
                            <p className="font-black text-lg uppercase">{affiliation}</p>
                        </div>
                    </div>
               </div>

               <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
                    <p className="text-xs font-bold text-primary italic">This profile is managed by the District SWM Cell. Any discrepancies should be reported to the Block Coordinator.</p>
               </div>
            </CardContent>
        </Card>
    );
}

export default function GpUlbProfilePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading verified profile...</div>}>
        <PersonalDetailsContent />
    </Suspense>
  );
}
