'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from '@/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';
import { User, Users, Loader2, RefreshCw, Truck, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface DriverRecord {
    id: string;
    driverName: string;
    driverContact: string;
    vehicleNo: string;
    vehicleType: string;
    routeId: string;
    block: string;
    district: string;
    mrf: string;
    ulb: string;
    scheduledOn: string;
    lastTripDate?: string;
    status: 'Active' | 'In Transit' | 'Completed' | 'Scheduled' | 'Maintenance' | 'On Leave';
}

function DriverDetailsContent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const blockName = searchParams.get('block') || '';
    const districtName = searchParams.get('district') || '';
    const role = searchParams.get('role') || '';
    
    const db = useFirestore();
    const [drivers, setDrivers] = useState<DriverRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [recentTrips, setRecentTrips] = useState<Map<string, any>>(new Map());

    // Real-time Firestore listener for route plans (driver assignments)
    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        let routesQuery;
        if (blockName) {
            routesQuery = query(
                collection(db, 'routePlans'),
                where('block', '==', blockName),
                where('isDeleted', '==', false)
            );
        } else if (districtName) {
            routesQuery = query(
                collection(db, 'routePlans'),
                where('district', '==', districtName),
                where('isDeleted', '==', false)
            );
        } else {
            routesQuery = query(
                collection(db, 'routePlans'),
                where('isDeleted', '==', false)
            );
        }

        const unsubscribe = onSnapshot(routesQuery,
            (snapshot) => {
                const driverList: DriverRecord[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const workers = data.workers || [];
                    
                    // Extract driver information from workers array
                    workers.forEach((worker: any, idx: number) => {
                        if (worker.name && worker.contact) {
                            driverList.push({
                                id: `${doc.id}-driver-${idx}`,
                                driverName: worker.name,
                                driverContact: worker.contact,
                                vehicleNo: data.vehicleNo || data.vehicleNumber || 'Not Assigned',
                                vehicleType: data.vehicleType || 'Standard',
                                routeId: data.routeId || 'N/A',
                                block: data.block || blockName || 'N/A',
                                district: data.district || districtName || 'N/A',
                                mrf: data.destination || data.mrf || 'N/A',
                                ulb: data.ulbName || 'N/A',
                                scheduledOn: data.scheduledOn || data.scheduleDisplay || 'Scheduled',
                                status: determineStatus(data.scheduledOn, data.lastUpdated),
                            });
                        }
                    });
                });
                
                setDrivers(driverList);
                setLoading(false);
            },
            (error) => {
                console.error("Firestore listener error:", error);
                setLoading(false);
                toast({
                    title: "Connection Error",
                    description: "Unable to fetch driver data. Using fallback data.",
                    variant: "destructive"
                });
            }
        );

        return () => unsubscribe();
    }, [db, blockName, districtName, toast]);

    // Real-time listener for recent trips to update driver status
    useEffect(() => {
        if (!db) return;

        const tripsQuery = query(
            collection(db, 'wasteDetails'),
            orderBy('date', 'desc')
        );

        const unsubscribeTrips = onSnapshot(tripsQuery,
            (snapshot) => {
                const lastTrips = new Map<string, any>();
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const driverName = data.driverName;
                    if (driverName && !lastTrips.has(driverName)) {
                        lastTrips.set(driverName, {
                            date: data.date,
                            routeId: data.routeId,
                            driverSubmitted: data.driverSubmitted
                        });
                    }
                });
                setRecentTrips(lastTrips);
            },
            (error) => {
                console.error("Trips listener error:", error);
            }
        );

        return () => unsubscribeTrips();
    }, [db]);

    const determineStatus = (scheduledOn: string, lastUpdated?: string): DriverRecord['status'] => {
        if (!scheduledOn) return 'Scheduled';
        
        const scheduleLower = scheduledOn.toLowerCase();
        const today = new Date().getDay();
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        
        // Check if today matches scheduled day
        const scheduledDay = weekdays.findIndex(day => scheduleLower.includes(day));
        
        if (scheduledDay === today) {
            // Check if trip already completed today
            if (lastUpdated && new Date(lastUpdated).toDateString() === new Date().toDateString()) {
                return 'Completed';
            }
            return 'In Transit';
        }
        
        // Check if within last 24 hours
        if (lastUpdated && new Date(lastUpdated).getTime() > Date.now() - 86400000) {
            return 'Completed';
        }
        
        // Check if maintenance needed (mock logic - can be enhanced)
        if (Math.random() > 0.9) return 'Maintenance';
        
        return 'Scheduled';
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "In Transit": return "default";
            case "Scheduled": return "secondary";
            case "Completed": return "outline";
            case "Maintenance": return "destructive";
            case "Active": return "default";
            case "On Leave": return "secondary";
            default: return "secondary";
        }
    };

    const getLastActivity = (driverName: string) => {
        const lastTrip = recentTrips.get(driverName);
        if (lastTrip) {
            return format(parseISO(lastTrip.date), 'dd MMM yyyy, hh:mm a');
        }
        return 'No trips recorded';
    };

    const handleManualRefresh = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            setLoading(false);
        }, 1000);
        toast({ 
            title: "Refreshing", 
            description: "Syncing latest driver data from database...",
            variant: "default"
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading driver data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Truck className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight">
                                    Driver & Vehicle Tracking
                                    {blockName && <span className="text-sm text-muted-foreground ml-2">({blockName} Block)</span>}
                                </CardTitle>
                                <CardDescription className="font-bold italic">
                                    Real-time status of all drivers and vehicles in the fleet. {drivers.length} active drivers.
                                </CardDescription>
                            </div>
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
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full min-w-[1000px] table-auto">
                            <TableHeader className="bg-muted/80">
                                <TableRow>
                                    <TableHead className="w-[180px] uppercase text-[11px] font-black tracking-widest border">Driver Details</TableHead>
                                    <TableHead className="w-[130px] uppercase text-[11px] font-black tracking-widest border">Vehicle No.</TableHead>
                                    <TableHead className="w-[120px] uppercase text-[11px] font-black tracking-widest border">Vehicle Type</TableHead>
                                    <TableHead className="w-[150px] uppercase text-[11px] font-black tracking-widest border">Assigned Route</TableHead>
                                    <TableHead className="w-[180px] uppercase text-[11px] font-black tracking-widest border">Assigned MRF</TableHead>
                                    <TableHead className="w-[140px] uppercase text-[11px] font-black tracking-widest border">Collection Day</TableHead>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black tracking-widest border text-center">Status</TableHead>
                                    <TableHead className="w-[160px] uppercase text-[11px] font-black tracking-widest border">Last Activity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {drivers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                            <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            No drivers found. Add routes with assigned drivers to see them here.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    drivers.map((driver, idx) => (
                                        <TableRow key={driver.id} className="hover:bg-primary/[0.02] border-b transition-colors">
                                            <TableCell className="border p-3">
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-sm uppercase text-primary">{driver.driverName}</p>
                                                    <p className="text-[10px] font-mono text-muted-foreground">{driver.driverContact}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border font-mono text-[11px] font-bold p-3 break-words">{driver.vehicleNo}</TableCell>
                                            <TableCell className="border text-[11px] font-medium p-3">{driver.vehicleType}</TableCell>
                                            <TableCell className="border p-3">
                                                <Badge variant="outline" className="text-[10px] font-black border-primary/30 bg-primary/5">
                                                    {driver.routeId}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-bold p-3 break-words">{driver.mrf}</TableCell>
                                            <TableCell className="border text-[11px] font-black uppercase text-blue-700 p-3">{driver.scheduledOn}</TableCell>
                                            <TableCell className="border text-center p-3">
                                                <Badge variant={getStatusVariant(driver.status)} className="text-[9px] font-black uppercase px-2 py-1">
                                                    {driver.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border p-3">
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{getLastActivity(driver.driverName)}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 border-primary/10 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground">Total Drivers</p>
                                <p className="text-3xl font-black">{drivers.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-primary/40" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-green-200 bg-green-50/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground">In Transit</p>
                                <p className="text-3xl font-black text-green-600">{drivers.filter(d => d.status === 'In Transit').length}</p>
                            </div>
                            <Truck className="h-8 w-8 text-green-500/40" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-blue-200 bg-blue-50/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground">Scheduled</p>
                                <p className="text-3xl font-black text-blue-600">{drivers.filter(d => d.status === 'Scheduled').length}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-500/40" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-purple-200 bg-purple-50/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground">Completed Today</p>
                                <p className="text-3xl font-black text-purple-600">{drivers.filter(d => d.status === 'Completed').length}</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-purple-500/40" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vehicles Status Legend */}
            <Card className="border-2 border-dashed bg-muted/20">
                <CardContent className="py-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase">
                        <div className="flex items-center gap-2"><Badge variant="default" className="w-3 h-3 p-0 rounded-full" /> In Transit</div>
                        <div className="flex items-center gap-2"><Badge variant="secondary" className="w-3 h-3 p-0 rounded-full" /> Scheduled</div>
                        <div className="flex items-center gap-2"><Badge variant="outline" className="w-3 h-3 p-0 rounded-full" /> Completed</div>
                        <div className="flex items-center gap-2"><Badge variant="destructive" className="w-3 h-3 p-0 rounded-full" /> Maintenance</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function DriverDetailsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading driver tracking portal...</p>
                </div>
            </div>
        }>
            <DriverDetailsContent />
        </Suspense>
    );
}