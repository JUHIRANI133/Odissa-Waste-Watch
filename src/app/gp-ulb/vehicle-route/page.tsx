'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, User, Calendar, Route, Clock, Navigation, Anchor, Phone, Users, Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFirestore } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// District Data Imports
import { angulDistrictData } from "@/lib/disAngul";
import { balangirDistrictData } from "@/lib/disBalangir";
import { bhadrakDistrictData } from "@/lib/disBhadrak";
import { bargarhDistrictData } from "@/lib/disBargarh";
import { sonepurDistrictData } from "@/lib/disSonepur";
import { boudhDistrictData } from "@/lib/disBoudh";
import { cuttackDistrictData } from "@/lib/disCuttack";
import { deogarhDistrictData } from "@/lib/disDeogarh";
import { dhenkanalDistrictData } from "@/lib/disDhenkanal";
import { gajapatiDistrictData } from "@/lib/disGajapati";
import { ganjamDistrictData } from "@/lib/disGanjam";
import { jagatsinghpurDistrictData } from "@/lib/disJagatsinghpur";
import { jajpurDistrictData } from "@/lib/disJajpur";
import { jharsugudaDistrictData } from "@/lib/disJharsuguda";
import { kalahandiDistrictData } from "@/lib/disKalahandi";
import { kandhamalDistrictData } from "@/lib/disKandhamal";
import { kendraparaDistrictData } from "@/lib/disKendrapara";
import { kendujharDistrictData } from "@/lib/disKendujhar";
import { khordhaDistrictData } from "@/lib/disKhordha";
import { koraputDistrictData } from "@/lib/disKoraput";
import { mayurbhanjDistrictData } from "@/lib/disMayurbhanj";
import { malkangiriDistrictData } from "@/lib/disMalkangiri";
import { rayagadaDistrictData } from "@/lib/disRayagada";
import { nabarangpurDistrictData } from "@/lib/disNabarangpur";
import { nayagarhDistrictData } from "@/lib/disNayagarh";
import { nuapadaDistrictData } from "@/lib/disNuapada";
import { puriDistrictData } from "@/lib/disPuri";
import { sambalpurDistrictData } from "@/lib/disSambalpur";
import { balasoreDistrictData } from "@/lib/disBalasore";
import { baleswarDistrictData } from "@/lib/disBaleswar";

import { mrfData } from "@/lib/mrf-data";

function VehicleRouteContent() {
    const searchParams = useSearchParams();
    const gpName = searchParams.get('gp') || '';
    const districtName = searchParams.get('district') || '';
    const [mounted, setMounted] = useState(false);
    const [firestoreSchedule, setFirestoreSchedule] = useState<any>(null);
    const db = useFirestore();

    useEffect(() => { setMounted(true); }, []);

    // Real-time Firestore listener for collection schedule
    useEffect(() => {
        if (!db || !districtName || !gpName) return;

        const scheduleQuery = query(
            collection(db, 'collectionSchedules'),
            where('district', '==', districtName),
            where('gpName', '==', gpName)
        );

        const unsubscribe = onSnapshot(scheduleQuery, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                setFirestoreSchedule(data);
            }
        });

        return () => unsubscribe();
    }, [db, districtName, gpName]);

    const routeData = useMemo(() => {
        if (!mounted || !gpName || !districtName) return null;

        const sourceMap: Record<string, any> = {
          'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
          'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData,
          'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData,
          'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData,
          'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
          'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
          'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
          'koraput': koraputDistrictData, 'malkangiri': malkangiriDistrictData, 'mayurbhanj': mayurbhanjDistrictData,
          'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData, 'nayagarh': nayagarhDistrictData,
          'nuapada': nuapadaDistrictData, 'puri': puriDistrictData, 'sambalpur': sambalpurDistrictData
        };

        const source = sourceMap[districtName.toLowerCase()];
        if (!source) return null;

        const route = source.data.routes.find((r: any) => 
            r.startingGp.toLowerCase().trim() === gpName.toLowerCase().trim() ||
            (Array.isArray(r.intermediateGps) && r.intermediateGps.some((igp: any) => igp.toLowerCase().trim() === gpName.toLowerCase().trim())) ||
            (r.finalGp && r.finalGp.toLowerCase().trim() === gpName.toLowerCase().trim()) ||
            (r.destination && r.destination.toLowerCase().trim() === gpName.toLowerCase().trim())
        );

        if (!route) return null;

        const schedule = firestoreSchedule || source.data.collectionSchedules.find((s: any) => 
            s.gpName.toLowerCase().includes(gpName.toLowerCase().trim()) ||
            s.routeId === route.routeId
        );

        return {
            routeId: route.routeId,
            routeName: route.routeName || route.routeId,
            abbreviation: route.routeAbbreviation || route.routeId,
            destination: route.destination,
            distance: route.totalDistance,
            path: [route.startingGp, ...(route.intermediateGps || []), route.finalGp || route.destination].filter(Boolean),
            vehicleNo: schedule?.vehicleNo && schedule.vehicleNo !== '-' ? schedule.vehicleNo : 'TBD',
            vehicleType: schedule?.vehicleType || 'Motorised',
            driverName: (schedule?.driverName && schedule.driverName !== '-') ? schedule.driverName : 'Verified Personnel',
            driverContact: (schedule?.driverContact && schedule.driverContact !== '-') ? schedule.driverContact : '9437XXXXXX',
            collectionDay: schedule?.collectionSchedule || 'Scheduled',
            startTime: "08:00 AM",
            endTime: "02:00 PM",
            workers: route.workers || []
        };
    }, [gpName, districtName, mounted, firestoreSchedule]);

    if (!mounted) return <div className="p-12 text-center animate-pulse">Initializing Hub...</div>;

    if (!routeData) {
        return (
            <Card className="border-2 border-dashed">
                <CardHeader className="text-center py-12">
                    <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <CardTitle className="text-muted-foreground uppercase font-black tracking-tight">No Active Route Found</CardTitle>
                    <CardDescription className="font-bold">Your Gram Panchayat ({gpName}) is currently not mapped to an active collection circuit in {districtName}.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 shadow-sm">
                <CardHeader className="bg-primary/5 border-b pb-3">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary"/> Vehicle Assignment
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                        <span className="text-muted-foreground font-medium">Reg. Number:</span>
                        <Badge variant="outline" className="font-mono font-bold text-primary border-primary/30">{routeData.vehicleNo}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Type:</span>
                        <span className="font-black uppercase text-xs">{routeData.vehicleType}</span>
                    </div>
                </CardContent>
            </Card>

             <Card className="border-2 shadow-sm">
                <CardHeader className="bg-primary/5 border-b pb-3">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <User className="h-4 w-4 text-primary"/> Driver Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Verified Personnel</span>
                        <span className="font-black text-lg text-primary uppercase break-words">{routeData.driverName}</span>
                    </div>
                    <div className="bg-muted p-2 rounded-lg flex items-center justify-between">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono font-black text-sm">{routeData.driverContact}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-2 shadow-sm">
                <CardHeader className="bg-primary/5 border-b pb-3">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary"/> Sanitation Workers
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <ScrollArea className="h-[180px]">
                        <div className="space-y-2">
                            {routeData.workers.length > 0 ? routeData.workers.map((worker: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-2 border rounded-lg bg-card text-[10px]">
                                    <span className="font-black uppercase break-words">{worker.name}</span>
                                    <span className="font-mono text-primary flex items-center gap-1 shrink-0 ml-2">
                                        <Phone className="h-2.5 w-2.5" /> {worker.contact}
                                    </span>
                                </div>
                            )) : (
                                <div className="py-8 text-center bg-muted/10 rounded-lg border-2 border-dashed">
                                    <p className="text-xs text-muted-foreground italic text-center py-4">No workers assigned to this route.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b pb-3">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-primary"/> Logistical Circuit Path
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Route ID</p>
                            <div className="font-black text-2xl flex items-center flex-wrap gap-3">
                                {routeData.routeId} 
                                <Badge className="font-mono text-xs">{routeData.abbreviation}</Badge>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Total Path Length</p>
                            <p className="text-2xl font-black text-primary">{routeData.distance} KM</p>
                        </div>
                    </div>
                    
                    <div className="relative pl-6 border-l-4 border-primary/20 space-y-8 py-4 ml-2">
                        {routeData.path.map((stop: string, i: number) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[30px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background border-2 border-white shadow-sm"></div>
                                <div className={`text-sm font-black flex items-center flex-wrap gap-2 ${stop.toLowerCase().trim() === gpName.toLowerCase().trim() ? 'text-primary' : 'text-foreground'}`}>
                                    {stop.toUpperCase()} 
                                    {stop.toLowerCase().trim() === gpName.toLowerCase().trim() && <Badge variant="secondary" className="text-[9px] font-black uppercase h-4">Target Node</Badge>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="border-dashed" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground">Cycle Schedule</p>
                            <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
                                <Calendar className="h-4 w-4"/>
                                <span className="uppercase break-words">{routeData.collectionDay}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-muted-foreground">Operational Hours</p>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <Clock className="h-4 w-4 text-primary"/>
                                <span>{routeData.startTime} - {routeData.endTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-4 rounded-xl border border-dashed flex items-start gap-3">
                        <Info className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                        <p className="text-[10px] text-muted-foreground font-bold italic leading-relaxed">
                            Logistical adherence is monitored by the District SWM Cell. If collection is delayed due to operational constraints, circuits will be re-synchronized in coordination with the ULB Nodal Desk.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

export default function VehicleRoutePage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-muted-foreground animate-pulse">Mapping logistical path...</div>}>
            <VehicleRouteContent />
        </Suspense>
    );
}