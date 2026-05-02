'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, query, where, onSnapshot, deleteDoc } from "firebase/firestore";

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
import { balasoreDistrictData } from "@/lib/disBalasore";
import { baleswarDistrictData } from "@/lib/disBaleswar";
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

import { Navigation, Anchor, PlusCircle, Edit, Trash2, Loader2, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Route {
  id: string;
  block: string;
  ulbName: string;
  routeId: string;
  routeAbbreviation: string;
  startingGp: string;
  intermediateGps: string[];
  finalGp: string;
  destination: string;
  totalDistance: number;
  scheduleDisplay: string;
  district?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  isDeleted?: boolean;
}

// Helper function to get sort order for collection schedule
const getScheduleSortOrder = (schedule: string): number => {
  const scheduleLower = schedule.toLowerCase().trim();
  
  // Weekday mapping (Monday = 1, Sunday = 7)
  const weekdays: Record<string, number> = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7
  };
  
  // Check if it's a weekday
  if (weekdays[scheduleLower]) {
    return weekdays[scheduleLower];
  }
  
  // Check for "1st week friday", "2nd week monday", etc.
  const weekPattern = /(\d+)(?:st|nd|rd|th)\s+week\s+(\w+)/i;
  const weekMatch = scheduleLower.match(weekPattern);
  if (weekMatch) {
    const weekNum = parseInt(weekMatch[1]);
    const dayName = weekMatch[2];
    const dayOrder = weekdays[dayName] || 99;
    // Base: 100 + (weekNum * 10) + dayOrder
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  // Check for "Friday of 1st week", "Monday of 2nd week" pattern
  const weekOfPattern = /(\w+)\s+of\s+(\d+)(?:st|nd|rd|th)\s+week/i;
  const weekOfMatch = scheduleLower.match(weekOfPattern);
  if (weekOfMatch) {
    const dayName = weekOfMatch[1];
    const weekNum = parseInt(weekOfMatch[2]);
    const dayOrder = weekdays[dayName] || 99;
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  // Check for date patterns (1st, 2nd, 3rd, 4th, 5th, 15th, etc.)
  const dateMatch = scheduleLower.match(/(\d+)(?:st|nd|rd|th)/);
  if (dateMatch) {
    const dateNum = parseInt(dateMatch[1]);
    return 200 + dateNum;
  }
  
  // Check for hyphenated dates (e.g., "1-15", "16-30")
  const rangeMatch = scheduleLower.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const startDate = parseInt(rangeMatch[1]);
    return 300 + startDate;
  }
  
  // Check for "first", "second", "third", "fourth" week patterns
  const weekNamePattern = /(first|second|third|fourth)\s+(\w+)/i;
  const weekNameMatch = scheduleLower.match(weekNamePattern);
  if (weekNameMatch) {
    const weekNames: Record<string, number> = { 'first': 1, 'second': 2, 'third': 3, 'fourth': 4 };
    const weekNum = weekNames[weekNameMatch[1]] || 5;
    const dayName = weekNameMatch[2];
    const dayOrder = weekdays[dayName] || 99;
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  // Default - put at the end
  return 999;
};

// Sort routes by block first, then by schedule order
const sortRoutes = (routes: Route[]): Route[] => {
  return [...routes].sort((a, b) => {
    // First sort by block name
    const blockCompare = (a.block || '').localeCompare(b.block || '');
    if (blockCompare !== 0) return blockCompare;
    
    // Then sort by collection schedule using custom order
    const aOrder = getScheduleSortOrder(a.scheduleDisplay || '');
    const bOrder = getScheduleSortOrder(b.scheduleDisplay || '');
    if (aOrder !== bOrder) return aOrder - bOrder;
    
    // Finally sort by route ID if both block and schedule are the same
    return (a.routeId || '').localeCompare(b.routeId || '');
  });
};

function DistrictRoutePlanningContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const districtName = searchParams.get('district') || '';
  const blockParam = searchParams.get('block');
  const role = searchParams.get('role');
  const isAuthorized = role === 'block' || role === 'district';

  const db = useFirestore();
  const [firestoreRoutes, setFirestoreRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);

  const [formData, setFormData] = useState({
    block: '', ulbName: '', routeId: '', routeAbbreviation: '',
    startingGp: '', intermediateGps: '', finalGp: '', destination: '',
    totalDistance: '', scheduleDisplay: ''
  });

  // Get local routes based on district and block (Fallback data)
  const localRoutes = useMemo((): Route[] => {
    if (!districtName) return [];
    
    const districtsMap: Record<string, any> = {
      'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
      'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData,
      'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData,
      'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData,
      'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
      'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
      'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
      'koraput': koraputDistrictData, 'mayurbhanj': mayurbhanjDistrictData, 'malkangiri': malkangiriDistrictData,
      'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData, 'nayagarh': nayagarhDistrictData,
      'nuapada': nuapadaDistrictData, 'puri': puriDistrictData, 'sambalpur': sambalpurDistrictData
    };
    
    const source = districtsMap[districtName.toLowerCase()];
    if (!source) return [];

    let initialRoutes = source.data?.routes || [];
    
    // Filter by block if blockParam is provided
    let filteredRoutes = initialRoutes;
    if (blockParam) {
      filteredRoutes = initialRoutes.filter((r: any) => 
        (r.block || "").toLowerCase() === blockParam.toLowerCase() ||
        (r.block || "").toLowerCase().includes(blockParam.toLowerCase())
      );
    }
    
    return filteredRoutes.map((route: any, idx: number): Route => ({
      id: `local-${route.routeId}-${idx}`,
      block: route.block || 'District Block',
      ulbName: route.ulbName || route.destination || 'District ULB',
      routeId: route.routeId,
      routeAbbreviation: route.routeAbbreviation || route.routeName || '',
      startingGp: route.startingGp,
      intermediateGps: route.intermediateGps || [],
      finalGp: route.finalGp || '',
      destination: route.destination,
      totalDistance: route.totalDistance || 0,
      scheduleDisplay: route.scheduledOn || route.collectionSchedule || 'Scheduled',
      isFromFirestore: false,
      firestoreId: undefined
    }));
  }, [districtName, blockParam]);

  // Real-time Firestore listener
  useEffect(() => {
    if (!db || !districtName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Build query - if blockParam is provided, filter by block
    let routesQuery;
    if (blockParam) {
      routesQuery = query(
        collection(db, 'routePlans'),
        where('district', '==', districtName),
        where('block', '==', blockParam),
        where('isDeleted', '==', false)
      );
    } else {
      routesQuery = query(
        collection(db, 'routePlans'),
        where('district', '==', districtName),
        where('isDeleted', '==', false)
      );
    }

    const unsubscribe = onSnapshot(routesQuery,
      (snapshot) => {
        const routes: Route[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          routes.push({
            id: doc.id,
            firestoreId: doc.id,
            block: data.block || '',
            ulbName: data.ulbName || '',
            routeId: data.routeId || '',
            routeAbbreviation: data.routeAbbreviation || data.routeName || '',
            startingGp: data.startingGp || '',
            intermediateGps: data.intermediateGps || [],
            finalGp: data.finalGp || '',
            destination: data.destination || '',
            totalDistance: data.totalDistance || 0,
            scheduleDisplay: data.scheduleDisplay || '',
            district: data.district || '',
            lastUpdated: data.lastUpdated || '',
            isFromFirestore: true
          });
        });
        
        setFirestoreRoutes(routes);
        setLoading(false);
        
        if (!dataInitialized) {
          setDataInitialized(true);
        }
      },
      (error) => {
        console.error("Firestore listener error:", error);
        setLoading(false);
        toast({
          title: "Connection Error",
          description: "Unable to sync with server. Using local data.",
          variant: "destructive"
        });
      }
    );

    return () => unsubscribe();
  }, [db, districtName, blockParam, toast, dataInitialized]);

  // Merge local routes with Firestore data and sort properly
  const allRoutes = useMemo((): Route[] => {
    const firestoreMap = new Map();
    firestoreRoutes.forEach(route => {
      firestoreMap.set(route.routeId, route);
    });
    
    // Start with Firestore routes (modified/added routes)
    const mergedRoutes: Route[] = [...firestoreRoutes];
    
    // Add local routes that DON'T exist in Firestore (unmodified routes)
    localRoutes.forEach((localRoute: Route) => {
      if (!firestoreMap.has(localRoute.routeId)) {
        mergedRoutes.push(localRoute);
      }
    });
    
    // Sort routes by block and then by schedule order
    return sortRoutes(mergedRoutes);
  }, [localRoutes, firestoreRoutes]);

  // Sync local routes to Firestore on first load (only if no data exists)
  const syncLocalToFirestore = useCallback(async () => {
    if (!db || !districtName || syncing || firestoreRoutes.length > 0) return;
    
    setSyncing(true);
    try {
      for (const localRoute of localRoutes) {
        const documentId = `${districtName}-${localRoute.routeId}`.toLowerCase().replace(/\s+/g, '-');
        const routeRef = doc(db, 'routePlans', documentId);
        
        const routeData = {
          block: localRoute.block,
          ulbName: localRoute.ulbName,
          routeId: localRoute.routeId,
          routeAbbreviation: localRoute.routeAbbreviation,
          startingGp: localRoute.startingGp,
          intermediateGps: localRoute.intermediateGps,
          finalGp: localRoute.finalGp,
          destination: localRoute.destination,
          totalDistance: localRoute.totalDistance,
          scheduleDisplay: localRoute.scheduleDisplay,
          district: districtName,
          isDeleted: false,
          lastUpdated: new Date().toISOString(),
          syncedFromLocal: true
        };
        
        await setDoc(routeRef, routeData, { merge: true });
      }
      
      toast({ 
        title: "Data Synced", 
        description: `Successfully synced ${localRoutes.length} routes to database.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Sync error:", error);
      toast({ 
        title: "Sync Failed", 
        description: "Failed to sync local data.",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  }, [db, districtName, localRoutes, firestoreRoutes.length, syncing, toast]);

  // Auto-sync local data to Firestore only when Firestore is empty
  useEffect(() => {
    if (!loading && dataInitialized && firestoreRoutes.length === 0 && localRoutes.length > 0 && !syncing) {
      syncLocalToFirestore();
    }
  }, [loading, dataInitialized, firestoreRoutes.length, localRoutes.length, syncLocalToFirestore, syncing]);

  const handleOpenAddDialog = () => {
    setEditingRoute(null);
    setFormData({
      block: blockParam || '', ulbName: '', routeId: '', routeAbbreviation: '',
      startingGp: '', intermediateGps: '', finalGp: '', destination: '',
      totalDistance: '', scheduleDisplay: ''
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (route: Route) => {
    setEditingRoute(route);
    setFormData({
      block: route.block,
      ulbName: route.ulbName,
      routeId: route.routeId,
      routeAbbreviation: route.routeAbbreviation,
      startingGp: route.startingGp,
      intermediateGps: Array.isArray(route.intermediateGps) ? route.intermediateGps.join(', ') : '',
      finalGp: route.finalGp,
      destination: route.destination,
      totalDistance: route.totalDistance.toString(),
      scheduleDisplay: route.scheduleDisplay
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (route: Route) => {
    if (!db) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete route ${route.routeId}? This action will remove it from all portals.`);
    if (!confirmDelete) return;
    
    setIsDeleting(route.id);
    
    try {
      if (!route.isFromFirestore) {
        const documentId = `${districtName}-${route.routeId}`.toLowerCase().replace(/\s+/g, '-');
        const routeRef = doc(db, 'routePlans', documentId);
        
        const routeData = {
          block: route.block,
          ulbName: route.ulbName,
          routeId: route.routeId,
          routeAbbreviation: route.routeAbbreviation,
          startingGp: route.startingGp,
          intermediateGps: route.intermediateGps,
          finalGp: route.finalGp,
          destination: route.destination,
          totalDistance: route.totalDistance,
          scheduleDisplay: route.scheduleDisplay,
          district: districtName,
          isDeleted: true,
          deletedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        await setDoc(routeRef, routeData, { merge: true });
        
        toast({ 
          title: "Route Removed", 
          description: "Route has been deactivated and synced to database.",
          variant: "default"
        });
        setIsDeleting(null);
        return;
      }
      
      const routeRef = doc(db, 'routePlans', route.id);
      await setDoc(routeRef, {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      
      toast({ 
        title: "Route Removed", 
        description: "Route has been deactivated successfully across all portals.",
        variant: "default"
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to delete route. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSubmit = async () => {
    if (!db) {
      toast({ title: "Error", description: "Database connection not available.", variant: "destructive" });
      return;
    }

    if (!formData.routeId || !formData.startingGp || !formData.destination) {
      toast({ title: "Validation Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const documentId = editingRoute?.firestoreId || (editingRoute?.id?.startsWith('local-') ?
        `${districtName}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-') :
        editingRoute?.id || `${districtName}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-'));
      
      const routeData = {
        block: formData.block || blockParam || districtName,
        ulbName: formData.ulbName,
        routeId: formData.routeId,
        routeAbbreviation: formData.routeAbbreviation,
        startingGp: formData.startingGp,
        intermediateGps: formData.intermediateGps.split(',').map(s => s.trim()).filter(Boolean),
        finalGp: formData.finalGp,
        destination: formData.destination,
        totalDistance: parseFloat(formData.totalDistance) || 0,
        scheduleDisplay: formData.scheduleDisplay,
        district: districtName,
        isDeleted: false,
        lastUpdated: new Date().toISOString(),
        updatedBy: role || 'admin'
      };
      
      const routeRef = doc(db, 'routePlans', documentId);
      await setDoc(routeRef, routeData, { merge: true });

      toast({ 
        title: editingRoute ? "Route Updated" : "Route Added", 
        description: `Route ${formData.routeId} has been synchronized across all portals.`,
        variant: "default" 
      });
      
      setIsDialogOpen(false);
      setEditingRoute(null);
      
    } catch (error) {
      console.error('Error saving route:', error);
      toast({ 
        title: "Sync Failed", 
        description: "Failed to save route. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    toast({ 
      title: "Refreshing", 
      description: "Syncing latest data from database...",
      variant: "default"
    });
  };

  if (loading && !dataInitialized) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading route data...</p>
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
              <Navigation className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-black uppercase">Route Planning: {districtName}</CardTitle>
                <CardDescription>
                  Verified circuit audits linking GP nodes to processing facilities. 
                  {blockParam ? ` Showing routes for block: ${blockParam}` : ' Showing all block routes.'}
                  Changes sync across all portals.
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleManualRefresh} 
                variant="outline"
                className="font-black uppercase tracking-widest h-11"
                disabled={syncing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} /> 
                Sync Now
              </Button>
              {isAuthorized && (
                <Button onClick={handleOpenAddDialog} className="font-black uppercase tracking-widest h-11 bg-primary shadow-lg">
                  <PlusCircle className="mr-2 h-5 w-5" /> Add New Details
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Information Box about Route ID and Route Name Convention */}
      <Card className="border-2 border-blue-200 bg-blue-50/30 shadow-sm">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-black uppercase text-blue-800 text-xs tracking-wider">Route Naming Convention</p>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-blue-900">Route ID Format:</p>
                  <p className="text-muted-foreground font-mono text-[11px]">
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">[District First Letter]</span> - 
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">[Block First 3 Letters]</span> - 
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">[GP First Letter]</span> - 
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">[Number 1/2/3]</span>
                  </p>
                  <p className="text-muted-foreground text-[10px] italic">Example: <span className="font-mono font-bold">B-BAN-K-01</span> (Bhadrak - Bantala - Karanjam - Route 1)</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-blue-900">Route Name Format:</p>
                  <p className="text-muted-foreground font-mono text-[11px]">
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">First letters of all GPs along the route</span> - 
                    <span className="bg-blue-100 px-1.5 py-0.5 rounded">Number</span>
                  </p>
                  <p className="text-muted-foreground text-[10px] italic">Example: <span className="font-mono font-bold">DTDK-01</span> (Durlaga → Talpatia → Dalki → Katikela)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-md">
        <CardContent className="pt-6">
          {/* Responsive table with horizontal scroll only when needed */}
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[1000px] table-auto">
              <TableHeader className="bg-muted/80">
                <TableRow>
                  <TableHead className="w-[50px] text-center border font-black text-[11px] uppercase tracking-widest">S.No.</TableHead>
                  <TableHead className="w-[130px] border font-black text-[11px] uppercase tracking-widest">Block Name</TableHead>
                  <TableHead className="w-[100px] border font-black text-[11px] uppercase tracking-widest">Route ID</TableHead>
                  <TableHead className="w-[120px] border font-black text-[11px] uppercase tracking-widest">Route Name</TableHead>
                  <TableHead className="w-[130px] border font-black text-[11px] uppercase tracking-widest">Starting GP</TableHead>
                  <TableHead className="w-[180px] border font-black text-[11px] uppercase tracking-widest">Intermediate GPs</TableHead>
                  <TableHead className="w-[130px] border font-black text-[11px] uppercase tracking-widest">Destination (MRF)</TableHead>
                  <TableHead className="w-[70px] border font-black text-[11px] uppercase tracking-widest text-right">Dist. (Km)</TableHead>
                  <TableHead className="w-[150px] border font-black text-[11px] uppercase tracking-widest">Schedule</TableHead>
                  {isAuthorized && <TableHead className="w-[80px] border font-black text-[11px] uppercase tracking-widest text-center">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRoutes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isAuthorized ? 10 : 9} className="text-center py-12 text-muted-foreground">
                      <Navigation className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      No routes found. Click "Add New Entry" to create a route.
                    </TableCell>
                  </TableRow>
                ) : (
                  allRoutes.map((route, idx) => (
                    <TableRow key={route.id || idx} className="hover:bg-primary/[0.02] border-b transition-colors">
                      <TableCell className="border text-center font-mono text-[11px] p-2">{idx + 1}</TableCell>
                      <TableCell className="border text-[11px] font-bold uppercase p-2 break-words">{route.block}</TableCell>
                      <TableCell className="border font-mono text-[11px] font-black text-primary p-2 break-words">{route.routeId}</TableCell>
                      <TableCell className="border p-2">
                        <Badge variant="outline" className="text-[10px] font-black border-primary/30 bg-primary/5 whitespace-nowrap">
                          {route.routeAbbreviation || '-'}
                        </Badge>
                      </TableCell>
                      <TableCell className="border text-[11px] font-bold text-green-700 uppercase p-2 break-words">{route.startingGp}</TableCell>
                      <TableCell className="border text-[10px] font-medium italic text-muted-foreground p-2">
                        {route.intermediateGps?.length > 0 ? route.intermediateGps.join(' → ') : 'Direct'}
                      </TableCell>
                      <TableCell className="border p-2">
                        <div className="flex items-center gap-1 text-[11px] font-black uppercase text-primary">
                          <Anchor className="h-3 w-3 shrink-0" />
                          <span className="break-words">{route.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border text-right font-mono font-black text-xs text-primary p-2">{route.totalDistance}</TableCell>
                      <TableCell className="border text-[10px] font-black uppercase text-blue-700 p-2 break-words leading-tight">{route.scheduleDisplay}</TableCell>
                      {isAuthorized && (
                        <TableCell className="border text-center p-2">
                          <div className="flex justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0 text-primary hover:bg-primary/10" 
                              onClick={() => handleOpenEditDialog(route)}
                              disabled={isSubmitting}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" 
                              onClick={() => handleDelete(route)}
                              disabled={isDeleting === route.id}
                            >
                              {isDeleting === route.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-primary">
              {editingRoute ? 'Edit Route Plan' : 'Add New Route Plan'}
            </DialogTitle>
            <DialogDescription>
              {editingRoute 
                ? `Editing route ${editingRoute.routeId}. Changes will sync across all portals.` 
                : 'Add new route plan. This will be available across district, block, and driver portals.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Block Name *</Label>
              <Input 
                value={formData.block} 
                onChange={e => setFormData({...formData, block: e.target.value})} 
                placeholder="Enter block name"
                disabled={!!editingRoute}
              />
              {editingRoute && <p className="text-[8px] text-muted-foreground">Block cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">ULB Name</Label>
              <Input 
                value={formData.ulbName} 
                onChange={e => setFormData({...formData, ulbName: e.target.value})} 
                placeholder="Urban Local Body name"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Route ID *</Label>
              <Input 
                value={formData.routeId} 
                onChange={e => setFormData({...formData, routeId: e.target.value})} 
                placeholder="e.g., B-BAN-K-01"
                disabled={!!editingRoute}
              />
              <p className="text-[8px] text-muted-foreground">Format: [District]-[Block]-[GP]-[Number]</p>
              {editingRoute && <p className="text-[8px] text-muted-foreground">Route ID cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Route Name *</Label>
              <Input 
                value={formData.routeAbbreviation} 
                onChange={e => setFormData({...formData, routeAbbreviation: e.target.value})} 
                placeholder="e.g., DTDK-01"
              />
              <p className="text-[8px] text-muted-foreground">Abbreviation using first letters of all GPs along the route</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Starting GP *</Label>
              <Input 
                value={formData.startingGp} 
                onChange={e => setFormData({...formData, startingGp: e.target.value})} 
                placeholder="Starting Gram Panchayat"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Final GP</Label>
              <Input 
                value={formData.finalGp} 
                onChange={e => setFormData({...formData, finalGp: e.target.value})} 
                placeholder="Final Gram Panchayat"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Destination (MRF) *</Label>
              <Input 
                value={formData.destination} 
                onChange={e => setFormData({...formData, destination: e.target.value})} 
                placeholder="Material Recovery Facility"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase">Total Distance (km) *</Label>
              <Input 
                type="number" 
                step="0.1"
                value={formData.totalDistance} 
                onChange={e => setFormData({...formData, totalDistance: e.target.value})} 
                placeholder="Distance in kilometers"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-[10px] font-black uppercase">Intermediate GPs (comma separated)</Label>
              <Input 
                value={formData.intermediateGps} 
                onChange={e => setFormData({...formData, intermediateGps: e.target.value})} 
                placeholder="GP1, GP2, GP3"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-[10px] font-black uppercase">Collection Schedule *</Label>
              <Input 
                value={formData.scheduleDisplay} 
                onChange={e => setFormData({...formData, scheduleDisplay: e.target.value})} 
                placeholder="e.g., Monday, 1st, 15th, 1st week Friday"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="font-black uppercase px-8">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingRoute ? 'Update Route' : 'Save Route'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function DistrictRoutePlanningPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading route planning portal...</p>
        </div>
      </div>
    }>
      <DistrictRoutePlanningContent />
    </Suspense>
  );
}