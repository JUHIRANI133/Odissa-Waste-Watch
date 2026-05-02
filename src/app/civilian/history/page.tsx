'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Route, Anchor, CheckCircle2, XCircle, Clock, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useEffect, useState } from "react";
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';

interface TripRecord {
  id: string;
  personnelName: string;
  district: string;
  block: string;
  routeId: string;
  routeName: string;
  date: string;
  startTime?: string;
  endTime?: string;
  status: 'Started' | 'InProgress' | 'Completed';
  completedStops: string[];
  totalWaste?: number;
  mrf: string;
  submittedAt?: string;
}

interface WasteRecord {
  id: string;
  tripId: string;
  personnelName: string;
  routeId: string;
  mrf: string;
  date: string;
  driverSubmitted: number;
  status: string;
}

function TripHistoryContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '';
    const ulb = searchParams.get('ulb') || '';
    const [trips, setTrips] = useState<TripRecord[]>([]);
    const [wasteRecords, setWasteRecords] = useState<Record<string, WasteRecord>>({});
    const [isLoading, setIsLoading] = useState(true);
    
    const db = useFirestore();

    useEffect(() => {
        const fetchTrips = async () => {
            if (!db || !name) return;
            
            setIsLoading(true);
            try {
                // Fetch trips for this personnel
                const tripsRef = collection(db, 'trips');
                const q = query(tripsRef, 
                    where('personnelName', '==', name),
                    orderBy('date', 'desc')
                );
                
                const querySnapshot = await getDocs(q);
                const tripsData: TripRecord[] = [];
                const wasteMap: Record<string, WasteRecord> = {};
                
                for (const doc of querySnapshot.docs) {
                    const tripData = doc.data() as TripRecord;
                    tripsData.push(tripData);
                    
                    // Fetch corresponding waste record
                    const wasteRef = collection(db, 'wasteDetails');
                    const wasteQuery = query(wasteRef, where('tripId', '==', doc.id));
                    const wasteSnapshot = await getDocs(wasteQuery);
                    
                    if (!wasteSnapshot.empty) {
                        wasteMap[doc.id] = wasteSnapshot.docs[0].data() as WasteRecord;
                    }
                }
                
                setTrips(tripsData);
                setWasteRecords(wasteMap);
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchTrips();
    }, [db, name]);

    const historyData = useMemo(() => {
        const groups: Record<string, TripRecord[]> = {};
        
        trips.forEach((trip) => {
            const monthYear = format(new Date(trip.date), 'MMMM yyyy');
            if (!groups[monthYear]) groups[monthYear] = [];
            groups[monthYear].push(trip);
        });

        return groups;
    }, [trips]);

    if (isLoading) {
        return (
            <div className="p-12 text-center animate-pulse">
                Loading trip history...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-primary/[0.01]">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Route className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight">Personnel Trip History</CardTitle>
                            <CardDescription className="font-bold italic">Detailed chronological verification of logistical circuits.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {Object.entries(historyData).map(([month, monthTrips], idx) => (
                    <AccordionItem value={month} key={idx} className="border-none">
                        <Card className="overflow-hidden border-2 shadow-md">
                            <AccordionTrigger className="p-6 hover:no-underline bg-muted/10 data-[state=open]:bg-primary/5 transition-all border-b border-dashed">
                                <div className="flex items-center gap-4">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span className="font-black text-xl uppercase tracking-tighter text-foreground">{month}</span>
                                    <Badge variant="outline" className="font-bold border-primary/30 text-primary uppercase text-[8px]">
                                        {monthTrips.length} TRIPS
                                    </Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <ScrollArea className="w-full">
                                    <Table>
                                        <TableHeader className="bg-muted/80">
                                            <TableRow>
                                                <TableHead className="w-[120px] uppercase text-[9px] font-black border-r">Trip Date</TableHead>
                                                <TableHead className="w-[150px] uppercase text-[9px] font-black border-r">Route ID</TableHead>
                                                <TableHead className="w-[200px] uppercase text-[9px] font-black border-r">Facility (MRF)</TableHead>
                                                <TableHead className="w-[180px] uppercase text-[9px] font-black border-r">Stops Completed</TableHead>
                                                <TableHead className="w-[150px] text-right uppercase text-[9px] font-black border-r bg-primary/5 text-primary">Load (Kg)</TableHead>
                                                <TableHead className="w-[150px] text-center uppercase text-[9px] font-black">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {monthTrips.map((trip, tIdx) => {
                                                const wasteRecord = wasteRecords[trip.id];
                                                return (
                                                    <TableRow key={tIdx} className="hover:bg-muted/20 border-b border-dashed last:border-0 h-16">
                                                        <TableCell className="font-mono text-xs font-bold border-r text-center">
                                                            {format(new Date(trip.date), 'dd MMM yyyy')}
                                                        </TableCell>
                                                        <TableCell className="border-r font-black text-[10px] text-primary uppercase text-center">
                                                            {trip.routeId}
                                                        </TableCell>
                                                        <TableCell className="border-r">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground uppercase">
                                                                <Anchor className="h-3 w-3 opacity-40"/> {trip.mrf}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border-r">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-[10px] font-black">
                                                                    {trip.completedStops.length} stops
                                                                </span>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {trip.completedStops.slice(0, 2).map((stop, i) => (
                                                                        <Badge key={i} variant="outline" className="text-[8px]">
                                                                            {stop}
                                                                        </Badge>
                                                                    ))}
                                                                    {trip.completedStops.length > 2 && (
                                                                        <Badge variant="outline" className="text-[8px]">
                                                                            +{trip.completedStops.length - 2}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="border-r text-right font-mono font-black text-primary bg-primary/[0.02] text-sm px-6">
                                                            {wasteRecord?.driverSubmitted?.toFixed(1) || trip.totalWaste?.toFixed(1) || '0.0'}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge className={`font-black uppercase text-[9px] flex items-center gap-1 w-fit mx-auto ${
                                                                trip.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'
                                                            }`}>
                                                                {trip.status === 'Completed' ? (
                                                                    <CheckCircle2 className="h-2 w-2"/>
                                                                ) : (
                                                                    <Clock className="h-2 w-2"/>
                                                                )}
                                                                {trip.status}
                                                            </Badge>
                                                            {trip.submittedAt && (
                                                                <div className="text-[8px] text-muted-foreground mt-1">
                                                                    {format(new Date(trip.submittedAt), 'HH:mm')}
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                ))}
                {trips.length === 0 && (
                    <Card className="border-2 border-dashed p-12 text-center text-muted-foreground opacity-30 italic uppercase font-black tracking-widest text-sm">
                        No trip records found. Start your first trip today!
                    </Card>
                )}
            </Accordion>
        </div>
    );
}

export default function TripHistoryPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center animate-pulse">Syncing trip history...</div>}>
            <TripHistoryContent />
        </Suspense>
    )
}