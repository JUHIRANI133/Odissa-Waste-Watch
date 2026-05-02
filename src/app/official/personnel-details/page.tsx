'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense, useEffect, useCallback } from "react";
import { jharsugudaDistrictData } from "@/lib/disJharsuguda";
import { jajpurDistrictData } from "@/lib/disJajpur";
import { bhadrakDistrictData } from "@/lib/disBhadrak";
import { bargarhDistrictData } from "@/lib/disBargarh";
import { sonepurDistrictData } from "@/lib/disSonepur";
import { angulDistrictData } from "@/lib/disAngul";
import { balangirDistrictData } from "@/lib/disBalangir";
import { boudhDistrictData } from "@/lib/disBoudh";
import { baleswarDistrictData } from "@/lib/disBaleswar";
import { balasoreDistrictData } from "@/lib/disBalasore";
import { cuttackDistrictData } from "@/lib/disCuttack";
import { deogarhDistrictData } from "@/lib/disDeogarh";
import { dhenkanalDistrictData } from "@/lib/disDhenkanal";
import { gajapatiDistrictData } from "@/lib/disGajapati";
import { ganjamDistrictData } from "@/lib/disGanjam";
import { jagatsinghpurDistrictData } from "@/lib/disJagatsinghpur";
import { kalahandiDistrictData } from "@/lib/disKalahandi";
import { kandhamalDistrictData } from "@/lib/disKandhamal";
import { kendraparaDistrictData } from "@/lib/disKendrapara";
import { kendujharDistrictData } from "@/lib/disKendujhar";
import { khordhaDistrictData } from "@/lib/disKhordha";
import { koraputDistrictData } from "@/lib/disKoraput";
import { mayurbhanjDistrictData } from "@/lib/disMayurbhanj";
import { malkangiriDistrictData } from "@/lib/disMalkangiri";
import { mrfData } from "@/lib/mrf-data";
import { Navigation, Anchor, PlusCircle, Edit, Trash2, Loader2, RefreshCw, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";

interface Worker {
  name: string;
  contact: string;
}

interface Route {
  id: string;
  routeId: string;
  routeName: string;
  routeAbbreviation: string;
  startingGp: string;
  intermediateGps: string[];
  finalGp: string;
  destination: string;
  totalDistance: number;
  workers: Worker[];
  scheduledOn: string;
  taggedMrf: string;
  isDeleted?: boolean;
  district?: string;
  block?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string | null; 
}

// Helper function to get sort order for collection schedule
const getScheduleSortOrder = (schedule: string): number => {
  const scheduleLower = schedule.toLowerCase().trim();
  
  const weekdays: Record<string, number> = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7
  };
  
  if (weekdays[scheduleLower]) {
    return weekdays[scheduleLower];
  }
  
  const weekPattern = /(\d+)(?:st|nd|rd|th)\s+week\s+(\w+)/i;
  const weekMatch = scheduleLower.match(weekPattern);
  if (weekMatch) {
    const weekNum = parseInt(weekMatch[1]);
    const dayName = weekMatch[2];
    const dayOrder = weekdays[dayName] || 99;
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  const weekOfPattern = /(\w+)\s+of\s+(\d+)(?:st|nd|rd|th)\s+week/i;
  const weekOfMatch = scheduleLower.match(weekOfPattern);
  if (weekOfMatch) {
    const dayName = weekOfMatch[1];
    const weekNum = parseInt(weekOfMatch[2]);
    const dayOrder = weekdays[dayName] || 99;
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  const dateMatch = scheduleLower.match(/(\d+)(?:st|nd|rd|th)/);
  if (dateMatch) {
    const dateNum = parseInt(dateMatch[1]);
    return 200 + dateNum;
  }
  
  const rangeMatch = scheduleLower.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const startDate = parseInt(rangeMatch[1]);
    return 300 + startDate;
  }
  
  const weekNamePattern = /(first|second|third|fourth)\s+(\w+)/i;
  const weekNameMatch = scheduleLower.match(weekNamePattern);
  if (weekNameMatch) {
    const weekNames: Record<string, number> = { 'first': 1, 'second': 2, 'third': 3, 'fourth': 4 };
    const weekNum = weekNames[weekNameMatch[1]] || 5;
    const dayName = weekNameMatch[2];
    const dayOrder = weekdays[dayName] || 99;
    return 100 + (weekNum * 10) + dayOrder;
  }
  
  return 999;
};

const sortRoutes = (routes: Route[]): Route[] => {
  return [...routes].sort((a, b) => {
    const blockCompare = (a.block || '').localeCompare(b.block || '');
    if (blockCompare !== 0) return blockCompare;
    
    const aOrder = getScheduleSortOrder(a.scheduledOn || '');
    const bOrder = getScheduleSortOrder(b.scheduledOn || '');
    if (aOrder !== bOrder) return aOrder - bOrder;
    
    return (a.routeId || '').localeCompare(b.routeId || '');
  });
};

function PersonnelDetailsContent() {
    const searchParams = useSearchParams();
    const blockName = searchParams.get('block') || '';
    const district = searchParams.get('district') || '';
    const { toast } = useToast();

    const db = useFirestore();
    const [firestoreRoutes, setFirestoreRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoute, setEditingRoute] = useState<Route | null>(null);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [dataInitialized, setDataInitialized] = useState(false);
    
    const [formData, setFormData] = useState({
        taggedMrf: '',
        routeId: '',
        routeAbbreviation: '',
        startingGp: '',
        intermediateGps: '',
        finalGp: '',
        destination: '',
        totalDistance: '',
        workersText: '',
        scheduledOn: ''
    });

    const localRoutes = useMemo((): Route[] => {
        if (!blockName) return [];
        
        const districtsSourceMap: Record<string, any> = {
            'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
            'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData,
            'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData,
            'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData,
            'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
            'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
            'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
            'koraput': koraputDistrictData, 'mayurbhanj': mayurbhanjDistrictData, 'malkangiri': malkangiriDistrictData
        };
        
        const activeDistrict = district || mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase())?.district || 'Bhadrak';
        const source = districtsSourceMap[activeDistrict?.toLowerCase() || 'bhadrak'];
        
        let initialRoutes: any[] = [];
        
        if (source && source.routePlanData) {
            initialRoutes = source.routePlanData;
        } else if (source && source.data && source.data.routes) {
            initialRoutes = source.data.routes;
        } else if (source && source.routes) {
            initialRoutes = source.routes;
        } else if (source && source.getBlockDetails) {
            const blockDetails = source.getBlockDetails(blockName);
            if (blockDetails && blockDetails.routes) {
                initialRoutes = blockDetails.routes;
            }
        }
        
        let filteredRoutes = initialRoutes;
        if (filteredRoutes.length > 0 && filteredRoutes[0] && filteredRoutes[0].block) {
            filteredRoutes = filteredRoutes.filter((route: any) => {
                if (!route.block) return false;
                return route.block.toLowerCase() === blockName.toLowerCase();
            });
        }
        
        const mrfRecord = mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase());
        const defaultTaggedMrf = mrfRecord?.mrfId || (filteredRoutes[0]?.destination || 'District Facility');
        
        return filteredRoutes.map((route: any, index: number): Route => ({
            id: `local-${route.routeId || index}-${index}`,
            routeId: route.routeId || `ROUTE-${index + 1}`,
            routeName: route.routeName || route.routeId || `Route ${index + 1}`,
            routeAbbreviation: route.routeAbbreviation || '',
            startingGp: route.startingGp || '',
            intermediateGps: route.intermediateGps || [],
            finalGp: route.finalGp || '',
            destination: route.destination || '',
            totalDistance: route.totalDistance || 0,
            workers: route.workers || [],
            scheduledOn: route.scheduledOn || 'Scheduled',
            taggedMrf: route.taggedMrf || defaultTaggedMrf,
            firestoreId: null,
            isFromFirestore: false,
            block: route.block || blockName,
            district: activeDistrict
        }));
    }, [blockName, district]);

    useEffect(() => {
        if (!db || !blockName) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const routesQuery = query(
            collection(db, 'routePlans'), 
            where('block', '==', blockName),
            where('isDeleted', '==', false)
        );

        const unsubscribe = onSnapshot(routesQuery, 
            async (snapshot) => {
                const routes: Route[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    routes.push({ 
                        id: doc.id,
                        firestoreId: doc.id,
                        routeId: data.routeId || '',
                        routeName: data.routeName || '',
                        routeAbbreviation: data.routeAbbreviation || '',
                        startingGp: data.startingGp || '',
                        intermediateGps: data.intermediateGps || [],
                        finalGp: data.finalGp || '',
                        destination: data.destination || '',
                        totalDistance: data.totalDistance || 0,
                        workers: data.workers || [],
                        scheduledOn: data.scheduledOn || '',
                        taggedMrf: data.taggedMrf || '',
                        isDeleted: data.isDeleted || false,
                        district: data.district || '',
                        block: data.block || '',
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
    }, [db, blockName, toast, dataInitialized]);

    const allRoutes = useMemo((): Route[] => {
        const firestoreMap = new Map();
        firestoreRoutes.forEach(route => {
            firestoreMap.set(route.routeId, route);
        });
        
        const mergedRoutes: Route[] = [...firestoreRoutes];
        
        localRoutes.forEach((localRoute: Route) => {
            if (!firestoreMap.has(localRoute.routeId)) {
                mergedRoutes.push(localRoute);
            }
        });
        
        return sortRoutes(mergedRoutes);
    }, [localRoutes, firestoreRoutes, blockName]);

    const syncLocalToFirestore = useCallback(async () => {
        if (!db || !blockName || syncing || firestoreRoutes.length > 0) return;
        
        setSyncing(true);
        try {
            const activeDistrict = district || mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase())?.district || 'Bhadrak';
            
            for (const localRoute of localRoutes) {
                const documentId = `${activeDistrict}-${localRoute.routeId}`.toLowerCase().replace(/\s+/g, '-');
                const routeRef = doc(db, 'routePlans', documentId);
                
                const routeData = {
                    block: blockName,
                    district: activeDistrict,
                    taggedMrf: localRoute.taggedMrf,
                    routeId: localRoute.routeId,
                    routeName: localRoute.routeId,
                    routeAbbreviation: localRoute.routeAbbreviation,
                    startingGp: localRoute.startingGp,
                    intermediateGps: localRoute.intermediateGps,
                    finalGp: localRoute.finalGp,
                    destination: localRoute.destination,
                    totalDistance: localRoute.totalDistance,
                    workers: localRoute.workers,
                    scheduledOn: localRoute.scheduledOn,
                    isDeleted: false,
                    lastUpdated: new Date().toISOString(),
                    syncedFromLocal: true
                };
                
                await setDoc(routeRef, routeData, { merge: true });
            }
            
            if (localRoutes.length > 0) {
                toast({ 
                    title: "Data Synced", 
                    description: `Successfully synced ${localRoutes.length} routes to database.`,
                    variant: "default"
                });
            }
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
    }, [db, blockName, district, localRoutes, firestoreRoutes.length, syncing, toast]);

    useEffect(() => {
        if (!loading && dataInitialized && firestoreRoutes.length === 0 && localRoutes.length > 0 && !syncing) {
            syncLocalToFirestore();
        }
    }, [loading, dataInitialized, firestoreRoutes.length, localRoutes.length, syncLocalToFirestore, syncing]);

    const handleOpenAddDialog = () => {
        setEditingRoute(null);
        const mrfRecord = mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase());
        const defaultTaggedMrf = mrfRecord?.mrfId || '';
        
        setFormData({
            taggedMrf: defaultTaggedMrf,
            routeId: '',
            routeAbbreviation: '',
            startingGp: '',
            intermediateGps: '',
            finalGp: '',
            destination: '',
            totalDistance: '',
            workersText: '',
            scheduledOn: ''
        });
        setIsDialogOpen(true);
    };

    const handleOpenEditDialog = (route: Route) => {
        setEditingRoute(route);
        setFormData({
            taggedMrf: route.taggedMrf,
            routeId: route.routeId,
            routeAbbreviation: route.routeAbbreviation,
            startingGp: route.startingGp,
            intermediateGps: route.intermediateGps.join(', '),
            finalGp: route.finalGp,
            destination: route.destination,
            totalDistance: route.totalDistance.toString(),
            workersText: route.workers.map(w => `${w.name}:${w.contact}`).join('\n'),
            scheduledOn: route.scheduledOn
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (route: Route) => {
        if (!db) return;
        
        setDeletingId(route.id);
        
        try {
            if (!route.isFromFirestore) {
                const activeDistrict = district || mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase())?.district || 'Bhadrak';
                const documentId = `${activeDistrict}-${route.routeId}`.toLowerCase().replace(/\s+/g, '-');
                const routeRef = doc(db, 'routePlans', documentId);
                
                const routeData = {
                    block: blockName,
                    district: activeDistrict,
                    taggedMrf: route.taggedMrf,
                    routeId: route.routeId,
                    routeName: route.routeId,
                    routeAbbreviation: route.routeAbbreviation,
                    startingGp: route.startingGp,
                    intermediateGps: route.intermediateGps,
                    finalGp: route.finalGp,
                    destination: route.destination,
                    totalDistance: route.totalDistance,
                    workers: route.workers,
                    scheduledOn: route.scheduledOn,
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
                setDeletingId(null);
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
            setDeletingId(null);
        }
    };

    const handleSubmit = async () => {
        if (!db) {
            toast({ 
                title: "Configuration Error", 
                description: "Database connection not available.",
                variant: "destructive"
            });
            return;
        }

        setSaving(true);
        
        const workerList = formData.workersText.split('\n')
            .filter(line => line.trim() && line.includes(':'))
            .map(line => {
                const [name, contact] = line.split(':');
                return { 
                    name: name.trim(), 
                    contact: contact.trim() 
                };
            });

        if (workerList.length === 0) {
            toast({ 
                title: "Validation Error", 
                description: "At least one worker is required.",
                variant: "destructive"
            });
            setSaving(false);
            return;
        }

        if (!formData.routeId || !formData.startingGp || !formData.destination || !formData.scheduledOn) {
            toast({ 
                title: "Validation Error", 
                description: "Please fill all required fields.",
                variant: "destructive"
            });
            setSaving(false);
            return;
        }
        
        try {
            const activeDistrict = district || editingRoute?.district || 
                mrfData.find(m => m.blockCovered?.toLowerCase() === blockName?.toLowerCase())?.district || 'Bhadrak';
            
            const documentId = editingRoute?.firestoreId || (editingRoute?.id?.startsWith('local-') ? 
                `${activeDistrict}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-') : 
                editingRoute?.id || `${activeDistrict}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-'));
            
            const routeData = {
                block: blockName,
                district: activeDistrict,
                taggedMrf: formData.taggedMrf,
                routeId: formData.routeId,
                routeName: formData.routeId,
                routeAbbreviation: formData.routeAbbreviation,
                startingGp: formData.startingGp,
                intermediateGps: formData.intermediateGps.split(',').map(s => s.trim()).filter(Boolean),
                finalGp: formData.finalGp,
                destination: formData.destination,
                totalDistance: parseFloat(formData.totalDistance) || 0,
                workers: workerList,
                scheduledOn: formData.scheduledOn,
                isDeleted: false,
                lastUpdated: new Date().toISOString(),
                updatedBy: 'admin'
            };

            const routeRef = doc(db, 'routePlans', documentId);
            await setDoc(routeRef, routeData, { merge: true });
            
            toast({ 
                title: "Success", 
                description: editingRoute ? "Route updated successfully and synced across all portals." : "New route added successfully and synced across all portals.",
                variant: "default"
            });
            
            setIsDialogOpen(false);
            setEditingRoute(null);
        } catch (error) {
            console.error("Submit error:", error);
            toast({ 
                title: "Error", 
                description: "Failed to save route.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
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
        <div className="space-y-8">
            <Card className="border-2 border-primary/20 bg-primary/[0.01]">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2 font-headline uppercase tracking-tight">
                            <Navigation className="text-primary h-8 w-8" /> 
                            Route Planning & Worker Roster: {blockName}
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Manage collection circuits and assigned worker rosters
                        </CardDescription>
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
                        <Button 
                            onClick={handleOpenAddDialog} 
                            className="font-black uppercase tracking-widest h-11 bg-primary shadow-lg hover:bg-primary/90"
                            disabled={saving}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" /> Add New Entry
                        </Button>
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
                                    <p className="font-bold text-blue-900">Route Name (Abbreviation) Format:</p>
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
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full min-w-[900px] table-auto">
                            <TableHeader className="bg-muted/80">
                                <TableRow>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black tracking-widest border">Tagged MRF</TableHead>
                                    <TableHead className="w-[90px] uppercase text-[11px] font-black tracking-widest border">Route ID</TableHead>
                                    <TableHead className="w-[120px] uppercase text-[11px] font-black tracking-widest border">Route Name</TableHead>
                                    <TableHead className="w-[110px] uppercase text-[11px] font-black tracking-widest border">Starting GP</TableHead>
                                    <TableHead className="w-[130px] uppercase text-[11px] font-black tracking-widest border">Intermediate GPs</TableHead>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black tracking-widest border">Final GP</TableHead>
                                    <TableHead className="w-[110px] uppercase text-[11px] font-black tracking-widest border">Destination</TableHead>
                                    <TableHead className="w-[50px] text-right uppercase text-[11px] font-black tracking-widest border">Dist.</TableHead>
                                    <TableHead className="w-[180px] uppercase text-[11px] font-black tracking-widest border">Workers</TableHead>
                                    <TableHead className="w-[110px] uppercase text-[11px] font-black tracking-widest border">Collection Day</TableHead>
                                    <TableHead className="w-[70px] uppercase text-[11px] font-black tracking-widest border text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allRoutes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={11} className="text-center py-12 text-muted-foreground">
                                            No routes found for {blockName}. Click "Add New Entry" to create a route.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allRoutes.map((route) => (
                                        <TableRow 
                                            key={route.id} 
                                            className="hover:bg-primary/[0.01] transition-colors border-b last:border-0"
                                        >
                                            <TableCell className="border text-[11px] font-black text-primary uppercase p-2 break-words">
                                                {route.taggedMrf || route.destination || 'N/A'}
                                            </TableCell>
                                            <TableCell className="border font-mono text-[11px] font-bold text-foreground p-2 break-words">
                                                {route.routeId}
                                            </TableCell>
                                            <TableCell className="border p-2">
                                                <Badge variant="outline" className="text-[10px] font-black border-primary/30 bg-primary/5 whitespace-nowrap">
                                                    {route.routeAbbreviation || route.routeId}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-bold text-green-700 uppercase p-2 break-words">
                                                {route.startingGp}
                                            </TableCell>
                                            <TableCell className="border text-[10px] font-medium italic text-muted-foreground p-2 break-words">
                                                {route.intermediateGps?.length > 0 ? route.intermediateGps.join(' → ') : 'Direct'}
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-bold text-blue-700 uppercase p-2 break-words">
                                                {route.finalGp || route.destination}
                                            </TableCell>
                                            <TableCell className="border p-2">
                                                <div className="flex items-center gap-1 text-[11px] font-black uppercase text-primary">
                                                    <Anchor className="h-3 w-3 shrink-0" />
                                                    <span className="break-words">{route.destination}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border text-right font-mono font-black text-xs text-primary p-2">
                                                {route.totalDistance}
                                            </TableCell>
                                            <TableCell className="border bg-muted/5 p-2">
                                                <div className="space-y-1">
                                                    {route.workers && route.workers.length > 0 ? (
                                                        route.workers.map((w, i) => (
                                                            <div key={i} className="text-[10px] font-bold leading-tight">
                                                                <span className="text-primary uppercase">{w.name}</span>
                                                                <span className="text-muted-foreground ml-1 text-[9px]">({w.contact})</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted-foreground italic text-[10px]">No workers</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border text-[10px] font-black uppercase text-blue-700 p-2 break-words leading-tight">
                                                {route.scheduledOn}
                                            </TableCell>
                                            <TableCell className="border text-center p-2">
                                                <div className="flex justify-center gap-1">
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-7 w-7 p-0 text-primary hover:bg-primary/10" 
                                                        onClick={() => handleOpenEditDialog(route)}
                                                        disabled={saving}
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline" 
                                                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" 
                                                        onClick={() => handleDelete(route)}
                                                        disabled={deletingId === route.id}
                                                    >
                                                        {deletingId === route.id ? 
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        }
                                                    </Button>
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-primary">
                            {editingRoute ? 'Edit Route Entry' : 'Add New Route'}
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below. All changes are saved directly to the database and will sync across all portals permanently.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Tagged MRF *</Label>
                                <Input 
                                    value={formData.taggedMrf} 
                                    onChange={(e) => setFormData({...formData, taggedMrf: e.target.value})} 
                                    placeholder="e.g. Kodandapur MRF" 
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase">Route ID *</Label>
                                    <Input 
                                        value={formData.routeId} 
                                        onChange={(e) => setFormData({...formData, routeId: e.target.value})} 
                                        required
                                    />
                                    <p className="text-[8px] text-muted-foreground">Format: [District]-[Block]-[GP]-[Number]</p>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase">Route Name *</Label>
                                    <Input 
                                        value={formData.routeAbbreviation} 
                                        onChange={(e) => setFormData({...formData, routeAbbreviation: e.target.value})} 
                                        placeholder="e.g., DTDK-01"
                                    />
                                    <p className="text-[8px] text-muted-foreground">Abbreviation using GP first letters</p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Total Distance (km) *</Label>
                                <Input 
                                    type="number" 
                                    step="0.1"
                                    value={formData.totalDistance} 
                                    onChange={(e) => setFormData({...formData, totalDistance: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Starting GP *</Label>
                                <Input 
                                    value={formData.startingGp} 
                                    onChange={(e) => setFormData({...formData, startingGp: e.target.value})} 
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Destination MRF *</Label>
                                <Input 
                                    value={formData.destination} 
                                    onChange={(e) => setFormData({...formData, destination: e.target.value})} 
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Collection Day *</Label>
                                <Input 
                                    value={formData.scheduledOn} 
                                    onChange={(e) => setFormData({...formData, scheduledOn: e.target.value})} 
                                    placeholder="e.g., Monday, Tuesday, Wednesday, 1st, 15th, 1st week Friday"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Last/Final GP</Label>
                                <Input 
                                    value={formData.finalGp} 
                                    onChange={(e) => setFormData({...formData, finalGp: e.target.value})} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Intermediate GPs</Label>
                                <Input 
                                    value={formData.intermediateGps} 
                                    onChange={(e) => setFormData({...formData, intermediateGps: e.target.value})} 
                                    placeholder="GP1, GP2, GP3 (comma-separated)"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Workers (Format: Name:Contact, one per line) *</Label>
                            <Textarea 
                                value={formData.workersText} 
                                onChange={(e) => setFormData({...formData, workersText: e.target.value})} 
                                rows={4} 
                                className="font-mono"
                                placeholder="John Doe:9876543210&#10;Jane Smith:9876543211"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter each worker on a new line with name and contact number separated by a colon (:)
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            className="font-black uppercase px-8 bg-primary hover:bg-primary/90"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function PersonnelDetailsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading page...</p>
                </div>
            </div>
        }>
            <PersonnelDetailsContent />
        </Suspense>
    );
}