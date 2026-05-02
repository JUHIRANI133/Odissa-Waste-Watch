'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Layers, Anchor, Weight, CheckCircle2, PlayCircle, CheckCircle, Flag, Loader2, Calendar, Truck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useFirestore } from '@/firebase';
import { collection, doc, setDoc, updateDoc, getDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';

// District Data Imports
import { jajpurDistrictData } from "@/lib/disJajpur";
import { bhadrakDistrictData } from "@/lib/disBhadrak";
import { angulDistrictData } from "@/lib/disAngul";
import { balangirDistrictData } from "@/lib/disBalangir";
import { baleswarDistrictData } from "@/lib/disBaleswar";
import { balasoreDistrictData } from "@/lib/disBalasore";
import { bargarhDistrictData } from "@/lib/disBargarh";
import { boudhDistrictData } from "@/lib/disBoudh";
import { cuttackDistrictData } from "@/lib/disCuttack";
import { deogarhDistrictData } from "@/lib/disDeogarh";
import { dhenkanalDistrictData } from "@/lib/disDhenkanal";
import { gajapatiDistrictData } from "@/lib/disGajapati";
import { ganjamDistrictData } from "@/lib/disGanjam";
import { jagatsinghpurDistrictData } from "@/lib/disJagatsinghpur";
import { sonepurDistrictData } from "@/lib/disSonepur";
import { jharsugudaDistrictData } from "@/lib/disJharsuguda";
import { kalahandiDistrictData } from "@/lib/disKalahandi";
import { kandhamalDistrictData } from "@/lib/disKandhamal";
import { kendraparaDistrictData } from "@/lib/disKendrapara";
import { kendujharDistrictData } from "@/lib/disKendujhar";
import { khordhaDistrictData } from "@/lib/disKhordha";
import { koraputDistrictData } from "@/lib/disKoraput";
import { malkangiriDistrictData } from "@/lib/disMalkangiri";
import { mayurbhanjDistrictData } from "@/lib/disMayurbhanj";

interface StopStatus {
  name: string;
  time: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Target';
  completedAt?: string;
  completedBy?: string;
  gpCode?: string;
  wasteCollected?: number;
}

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
  status: 'NotStarted' | 'Started' | 'InProgress' | 'Completed';
  completedStops: string[];
  totalWaste?: number;
  mrf: string;
  submittedAt?: string;
  stopWasteCollected?: Record<string, number>;
}

function CivilianScheduleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || '';
  const district = searchParams.get('district') || '';
  const block = searchParams.get('block') || '';
  const [currentDate, setCurrentDate] = useState<string>("");
  const [tripStatus, setTripStatus] = useState<TripRecord['status']>('NotStarted');
  const [stopStatuses, setStopStatuses] = useState<StopStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);
  const [submittedToMRF, setSubmittedToMRF] = useState(false);
  const [wasteAmount, setWasteAmount] = useState<string>('');
  const [showWasteDialog, setShowWasteDialog] = useState(false);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);
  const [showStopWasteDialog, setShowStopWasteDialog] = useState(false);
  const [stopWasteAmount, setStopWasteAmount] = useState<string>('');
  
  const db = useFirestore();

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const routeData = useMemo(() => {
    if (!district || !block) return null;

    const districtsMap: Record<string, any> = {
        'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
        'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
        'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
        'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
        'koraput': koraputDistrictData, 'malkangiri': malkangiriDistrictData, 'mayurbhanj': mayurbhanjDistrictData,
        'bargarh': bargarhDistrictData, 'boudh': boudhDistrictData, 'cuttack': cuttackDistrictData,
        'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData, 'gajapati': gajapatiDistrictData,
        'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData, 'sonepur': sonepurDistrictData
    };

    const source = districtsMap[district.toLowerCase()];
    if (!source) return null;

    const blockDetails = source.getBlockDetails(block);
    
    const assignedRoute = blockDetails.routes.find((r: any) => {
        const isDriver = (blockDetails.schedules || []).some((s: any) => 
            s.driverName.toLowerCase().includes(name.toLowerCase()) && 
            (s.gpName.toLowerCase().includes(r.routeId.toLowerCase()) || s.gpName.toLowerCase().includes(r.startingGp.toLowerCase()))
        );
        const isWorker = (r.workers || []).some((w: any) => w.name.toLowerCase().includes(name.toLowerCase()));
        return isDriver || isWorker;
    }) || blockDetails.routes[0];

    if (!assignedRoute) return null;

    const schedule = blockDetails.schedules?.find((s: any) => 
        s.gpName.toLowerCase().includes(assignedRoute.routeId.toLowerCase()) ||
        s.gpName.toLowerCase().includes(assignedRoute.startingGp.toLowerCase())
    );

    const stops = [
        { 
          name: assignedRoute.startingGp, 
          time: "08:00 AM", 
          status: 'Pending' as const,
          gpCode: assignedRoute.startingGpCode || `GP${Math.floor(Math.random() * 1000)}`
        },
        ...(assignedRoute.intermediateGps || []).map((igp: string, idx: number) => ({
            name: igp,
            time: `${9 + idx}:00 AM`,
            status: 'Pending' as const,
            gpCode: `${igp.replace(/\s/g, '')}${idx}`
        })),
        { 
          name: assignedRoute.finalGp || assignedRoute.destination, 
          time: "02:00 PM", 
          status: 'Target' as const,
          gpCode: assignedRoute.destinationCode || `MRF${Math.floor(Math.random() * 1000)}`
        }
    ];

    return {
        reportTime: "07:30 AM",
        route: assignedRoute.routeName || assignedRoute.routeId,
        routeId: assignedRoute.routeId,
        fromGp: assignedRoute.startingGp,
        toUlb: assignedRoute.destination,
        expectedWaste: `${schedule?.wasteGeneratedKg || 'TBD'} KG`,
        wasteTypes: "Plastic, Paper, Glass, Metal, Cloth",
        stops,
        mrf: assignedRoute.destination,
        scheduleId: schedule?.id,
        vehicleNumber: assignedRoute.vehicleNumber || "OD-32-1234",
        driverName: schedule?.driverName || "Assigned Driver"
    };
  }, [name, district, block]);

  // Check for existing trip for today
  useEffect(() => {
    const checkExistingTrip = async () => {
      if (!db || !name || !routeData) return;
      
      const today = new Date().toISOString().split('T')[0];
      const tripsRef = collection(db, 'trips');
      const q = query(tripsRef, 
        where('personnelName', '==', name),
        where('date', '==', today),
        where('routeId', '==', routeData.routeId)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const existingTrip = querySnapshot.docs[0];
        const tripData = existingTrip.data() as TripRecord;
        setCurrentTripId(existingTrip.id);
        setTripStatus(tripData.status);
        
        // Initialize stop statuses based on existing trip data
        if (routeData.stops) {
          const updatedStops = routeData.stops.map((stop, idx) => {
            let stopStatus = stop.status;
            if (tripData.completedStops.includes(stop.name)) {
              stopStatus = 'Completed';
            } else if (tripData.status === 'Started' && idx === 0) {
              stopStatus = 'Active';
            } else if (tripData.status === 'InProgress') {
              const completedCount = tripData.completedStops.length;
              if (idx === completedCount) {
                stopStatus = 'Active';
              }
            }
            return {
              ...stop,
              status: stopStatus,
              wasteCollected: tripData.stopWasteCollected?.[stop.name] || 0
            };
          });
          setStopStatuses(updatedStops);
        }
        
        if (tripData.status === 'Completed') {
          setSubmittedToMRF(true);
        }
      } else {
        // Initialize stop statuses
        if (routeData?.stops) {
          setStopStatuses(routeData.stops);
        }
      }
    };
    
    if (routeData) {
      checkExistingTrip();
    }
  }, [db, name, routeData]);

  const startTrip = async () => {
    if (!db || !name || !district || !block || !routeData) return;
    
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const tripId = `${name.replace(/\s/g, '_')}_${routeData.routeId}_${today}`;
      const tripRef = doc(db, 'trips', tripId);
      
      const tripData: TripRecord = {
        id: tripId,
        personnelName: name,
        district: district,
        block: block,
        routeId: routeData.routeId,
        routeName: routeData.route,
        date: today,
        startTime: new Date().toISOString(),
        status: 'Started',
        completedStops: [],
        mrf: routeData.mrf,
        stopWasteCollected: {}
      };
      
      await setDoc(tripRef, tripData);
      setCurrentTripId(tripId);
      setTripStatus('Started');
      setStopStatuses(prev => prev.map((stop, idx) => 
        idx === 0 ? { ...stop, status: 'Active' } : { ...stop, status: 'Pending' }
      ));
    } catch (error) {
      console.error('Error starting trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openStopWasteDialog = (index: number) => {
    if (tripStatus !== 'Started' && tripStatus !== 'InProgress') return;
    const stop = stopStatuses[index];
    if (stop.status === 'Completed') return;
    if (stop.status !== 'Active') return;
    
    setSelectedStopIndex(index);
    setStopWasteAmount('');
    setShowStopWasteDialog(true);
  };

  const completeStopWithWaste = async () => {
    if (selectedStopIndex === null) return;
    if (!stopWasteAmount || parseFloat(stopWasteAmount) <= 0) {
      alert("Please enter valid waste amount");
      return;
    }
    
    if (!currentTripId || !db) return;
    
    setIsLoading(true);
    try {
      const index = selectedStopIndex;
      const stop = stopStatuses[index];
      
      const tripRef = doc(db, 'trips', currentTripId);
      const tripDoc = await getDoc(tripRef);
      const currentCompletedStops = tripDoc.data()?.completedStops || [];
      const currentStopWaste = tripDoc.data()?.stopWasteCollected || {};
      
      const completedStops = [...currentCompletedStops, stop.name];
      const updatedStopWaste = {
        ...currentStopWaste,
        [stop.name]: parseFloat(stopWasteAmount)
      };
      
      const newStatus = index === stopStatuses.length - 1 ? 'InProgress' : tripStatus;
      
      await updateDoc(tripRef, {
        completedStops: completedStops,
        stopWasteCollected: updatedStopWaste,
        status: newStatus,
        totalWaste: (tripDoc.data()?.totalWaste || 0) + parseFloat(stopWasteAmount)
      });
      
      setStopStatuses(prev => prev.map((s, idx) => {
        if (idx === index) {
          return { 
            ...s, 
            status: 'Completed', 
            completedAt: new Date().toISOString(), 
            completedBy: name,
            wasteCollected: parseFloat(stopWasteAmount)
          };
        }
        if (idx === index + 1 && idx < stopStatuses.length - 1) {
          return { ...s, status: 'Active' };
        }
        if (idx === stopStatuses.length - 1 && index === stopStatuses.length - 2) {
          return { ...s, status: 'Active' };
        }
        return s;
      }));
      
      // If this was the last stop (before MRF), update status to InProgress
      if (index === stopStatuses.length - 2) {
        setTripStatus('InProgress');
      }
      
      setShowStopWasteDialog(false);
      setSelectedStopIndex(null);
      setStopWasteAmount('');
    } catch (error) {
      console.error('Error completing stop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitToMRF = async () => {
    if (!currentTripId || !db || !routeData) return;
    
    if (!wasteAmount) {
      setShowWasteDialog(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const tripRef = doc(db, 'trips', currentTripId);
      const tripDoc = await getDoc(tripRef);
      const currentTotalWaste = tripDoc.data()?.totalWaste || 0;
      
      await updateDoc(tripRef, {
        status: 'Completed',
        endTime: new Date().toISOString(),
        totalWaste: currentTotalWaste + parseFloat(wasteAmount),
        submittedAt: new Date().toISOString()
      });
      
      // Create waste record
      const wasteId = `${currentTripId}_waste`;
      const wasteRef = doc(db, 'wasteDetails', wasteId);
      await setDoc(wasteRef, {
        id: wasteId,
        tripId: currentTripId,
        personnelName: name,
        routeId: routeData.routeId,
        mrf: routeData.mrf,
        date: new Date().toISOString().split('T')[0],
        driverSubmitted: currentTotalWaste + parseFloat(wasteAmount),
        stopWiseCollection: stopStatuses.reduce((acc, stop) => {
          if (stop.wasteCollected) {
            acc[stop.name] = stop.wasteCollected;
          }
          return acc;
        }, {} as Record<string, number>),
        status: 'submitted',
        createdAt: Timestamp.now()
      });
      
      setTripStatus('Completed');
      setSubmittedToMRF(true);
      setStopStatuses(prev => prev.map(s => ({ ...s, status: 'Completed' })));
      setShowWasteDialog(false);
      
      // Redirect to trip history after 2 seconds
      setTimeout(() => {
        router.push(`/trip-history?name=${encodeURIComponent(name)}&ulb=${encodeURIComponent(routeData.mrf)}`);
      }, 2000);
    } catch (error) {
      console.error('Error submitting to MRF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!routeData) {
      return (
          <div className="p-12 text-center text-muted-foreground italic border-2 border-dashed rounded-xl">
              No assigned circuit path resolved for your profile. Please contact the Block Coordinator.
          </div>
      );
  }

  const allStopsCompleted = stopStatuses.length > 0 && stopStatuses.every(s => s.status === 'Completed');
  const isTripActive = tripStatus === 'Started' || tripStatus === 'InProgress';
  const totalWasteCollected = stopStatuses.reduce((sum, stop) => sum + (stop.wasteCollected || 0), 0);

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight">Today's Assigned Schedule</CardTitle>
            <CardDescription className="font-bold">{currentDate || "..."}</CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] px-3 py-1">
            <Truck className="h-3 w-3 mr-1" />
            {routeData.vehicleNumber}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        {/* Start Trip Button */}
        {tripStatus === 'NotStarted' && (
          <div className="flex justify-center">
            <Button 
              onClick={startTrip} 
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-wider px-8 py-6 text-lg shadow-lg"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <PlayCircle className="h-5 w-5 mr-2" />}
              START TRIP FROM {routeData.fromGp}
            </Button>
          </div>
        )}

        {/* Trip Status Banner */}
        {(tripStatus !== 'NotStarted') && (
          <div className={`p-4 rounded-lg border-2 ${
            tripStatus === 'Completed' ? 'bg-green-50 border-green-500' : 
            'bg-blue-50 border-blue-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {tripStatus === 'Completed' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                )}
                <div>
                  <p className="font-black text-sm uppercase tracking-wider">
                    Trip Status: {tripStatus === 'Started' ? 'IN PROGRESS' : tripStatus.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tripStatus === 'Completed' 
                      ? 'All stops completed and submitted to MRF' 
                      : `${stopStatuses.filter(s => s.status === 'Completed').length} of ${stopStatuses.length} stops completed`}
                  </p>
                  {isTripActive && totalWasteCollected > 0 && (
                    <p className="text-xs font-bold text-primary mt-1">
                      Total Collected: {totalWasteCollected} KG
                    </p>
                  )}
                </div>
              </div>
              {currentTripId && (
                <Badge variant="outline" className="font-mono text-[9px]">
                  Trip ID: {currentTripId.slice(-8)}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Route Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                <div className="p-2 rounded-full bg-background"><Clock className="h-5 w-5 text-primary"/></div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Report Time</p>
                    <p className="font-black text-lg">{routeData.reportTime}</p>
                </div>
            </div>
             <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                <div className="p-2 rounded-full bg-background"><MapPin className="h-5 w-5 text-primary"/></div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Route ID</p>
                    <p className="font-black text-lg text-primary">{routeData.routeId}</p>
                </div>
            </div>
             <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                <div className="p-2 rounded-full bg-background"><Anchor className="h-5 w-5 text-primary"/></div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Terminal Path</p>
                    <p className="font-bold text-xs uppercase">{routeData.fromGp} &rarr; {routeData.toUlb}</p>
                </div>
            </div>
             <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed">
                <div className="p-2 rounded-full bg-background"><Weight className="h-5 w-5 text-primary"/></div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Est. Load</p>
                    <p className="font-black text-lg">{routeData.expectedWaste}</p>
                </div>
            </div>
        </div>

        {/* Vertical Timeline with GPS Nodes */}
        <div className="space-y-6">
            <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" /> Logistical Circuit Nodes
            </h3>
            <div className="relative pl-10 border-l-4 border-primary/20 space-y-12">
                {stopStatuses.map((stop, index) => (
                    <div key={index} className="relative">
                         <div className={`h-6 w-6 bg-background border-4 rounded-full flex items-center justify-center absolute -left-[44px] top-1 z-10 shadow-sm
                           ${stop.status === 'Completed' ? 'border-green-600 bg-green-100' : 
                             stop.status === 'Active' ? 'border-blue-600 bg-blue-100' : 
                             stop.status === 'Target' ? 'border-purple-600 bg-purple-100' :
                             'border-primary/30'}`}>
                            {stop.status === 'Completed' && <CheckCircle className="h-3 w-3 text-green-600"/>}
                            {stop.status === 'Active' && <Loader2 className="h-3 w-3 text-blue-600 animate-spin"/>}
                            {stop.status === 'Pending' && <div className="h-2 w-2 bg-primary/30 rounded-full"></div>}
                            {stop.status === 'Target' && <Flag className="h-3 w-3 text-purple-600"/>}
                        </div>
                        <Card className={`p-4 shadow-sm border-l-4 transition-all ${
                            stop.status === 'Active' ? 'border-l-blue-600 bg-blue-50/30 shadow-md' : 
                            stop.status === 'Completed' ? 'border-l-green-600 bg-green-50/30' : 
                            stop.status === 'Target' ? 'border-l-purple-600 bg-purple-50/30' :
                            'border-l-primary/30'
                        }`}>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-black text-sm uppercase text-foreground">{stop.name}</p>
                                    {stop.gpCode && (
                                      <Badge variant="outline" className="text-[8px] font-mono">
                                        {stop.gpCode}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter">
                                      <Clock className="h-3 w-3"/>
                                      <span>Estimated Arrival: {stop.time}</span>
                                  </div>
                                  {stop.wasteCollected && stop.wasteCollected > 0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge className="bg-blue-100 text-blue-700 text-[9px] font-black">
                                        Collected: {stop.wasteCollected} KG
                                      </Badge>
                                    </div>
                                  )}
                                  {stop.completedAt && (
                                    <div className="text-[9px] text-green-600 mt-1">
                                      Completed at: {new Date(stop.completedAt).toLocaleTimeString()}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge variant={stop.status === "Completed" ? "default" : stop.status === "Active" ? "secondary" : stop.status === "Target" ? "destructive" : "outline"} 
                                         className={`text-[9px] font-black uppercase ${
                                           stop.status === 'Completed' ? 'bg-green-600' : 
                                           stop.status === 'Active' ? 'bg-blue-600' : 
                                           stop.status === 'Target' ? 'bg-purple-600' : ''
                                         }`}>
                                    {stop.status === 'Target' ? 'MRF TARGET' : stop.status}
                                  </Badge>
                                  
                                  {/* Complete Button - Only visible when active and trip is active and not the final MRF target */}
                                  {isTripActive && stop.status === 'Active' &&  (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => openStopWasteDialog(index)}
                                      disabled={isLoading}
                                      className="h-7 px-3 text-[10px] font-black uppercase bg-white hover:bg-blue-50"
                                    >
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Complete & Record Waste
                                    </Button>
                                  )}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

        {/* Submit to MRF Button */}
        {isTripActive && allStopsCompleted && !submittedToMRF && (
          <div className="flex justify-center pt-6 border-t-2 border-dashed">
            <Button 
              onClick={() => setShowWasteDialog(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider px-8 py-6 text-lg shadow-lg animate-pulse"
            >
              <Flag className="h-5 w-5 mr-2" />
              SUBMIT TO {routeData.mrf} MRF
            </Button>
          </div>
        )}

        {/* Success Message */}
        {submittedToMRF && (
          <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center">
            <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="font-black text-green-800 uppercase tracking-wide">
              Successfully submitted to MRF! Redirecting to trip history...
            </p>
          </div>
        )}

        {/* Waste Amount Dialog for Stop */}
        {showStopWasteDialog && selectedStopIndex !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="font-black uppercase">Waste Collection Details</CardTitle>
                <CardDescription>
                  Enter waste collected at {stopStatuses[selectedStopIndex]?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-black uppercase block mb-2">Waste Collected (KG)</label>
                  <input 
                    type="number"
                    value={stopWasteAmount}
                    onChange={(e) => setStopWasteAmount(e.target.value)}
                    placeholder="Enter waste in kilograms"
                    className="w-full p-3 border-2 rounded-lg font-mono"
                    step="0.1"
                    min="0"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      setShowStopWasteDialog(false);
                      setSelectedStopIndex(null);
                      setStopWasteAmount('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={completeStopWithWaste}
                    disabled={!stopWasteAmount || isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Complete Stop'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Waste Amount Dialog for MRF Submission */}
        {showWasteDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="font-black uppercase">Final MRF Submission</CardTitle>
                <CardDescription>
                  Enter total waste amount submitted to {routeData.mrf} MRF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-black uppercase block mb-2">Total Waste (KG)</label>
                  <input 
                    type="number"
                    value={wasteAmount}
                    onChange={(e) => setWasteAmount(e.target.value)}
                    placeholder="Enter waste in kilograms"
                    className="w-full p-3 border-2 rounded-lg font-mono"
                    step="0.1"
                    min="0"
                    autoFocus
                  />
                  {totalWasteCollected > 0 && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-xs font-black text-blue-800">
                        Previously collected from stops: {totalWasteCollected} KG
                      </p>
                      <p className="text-xs font-black text-purple-800">
                        Final Total: {totalWasteCollected + (parseFloat(wasteAmount) || 0)} KG
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowWasteDialog(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={submitToMRF}
                    disabled={!wasteAmount || isLoading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit & Complete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CivilianSchedulePage() {
    return (
        <Suspense fallback={<div className="p-12 text-center animate-pulse">Mapping assigned circuit...</div>}>
            <CivilianScheduleContent />
        </Suspense>
    )
}