'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense, useEffect, useCallback, useRef } from 'react';
import { Truck, Users, Phone, Navigation, Anchor, Edit, Trash2, PlusCircle, Save, Loader2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

interface Worker {
  name: string;
  contact: string;
}

interface Route {
  id: string;
  block: string;
  mrfName: string;
  routeId: string;
  routeAbbreviation: string;
  startingGp: string;
  intermediateGps: string[];
  finalGp: string;
  destination: string;
  totalDistance: number;
  workers: Worker[];
  scheduledOn: string;
  district?: string;
  ulb?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  isDeleted?: boolean;
}

function UlbPersonnelDetailsContent() {
    const searchParams = useSearchParams();
    const ulbParam = searchParams.get('ulb') || '';
    const districtName = searchParams.get('district') || '';
    const role = searchParams.get('role');
    const isAuthorized = role === 'ulb' || role === 'block' || role === 'district';
    const { toast } = useToast();

    const db = useFirestore();
    const [firestoreRoutes, setFirestoreRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoute, setEditingRoute] = useState<Route | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [dataInitialized, setDataInitialized] = useState(false);
    const syncCompletedRef = useRef(false);

    const [formData, setFormData] = useState({
        block: '',
        mrfName: '',
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

    // Get MRF IDs associated with this ULB
    const ulbMrfIds = useMemo(() => {
        return mrfData
            .filter(m => m.ulbName?.toLowerCase().trim() === ulbParam?.toLowerCase().trim())
            .map(m => m.mrfId.toLowerCase());
    }, [ulbParam]);

    // Get local routes based on district and ULB (Fallback data)
    const localRoutes = useMemo((): Route[] => {
        if (!districtName || !ulbParam) return [];
        
        const districtsSourceMap: Record<string, any> = {
            'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
            'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData,
            'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData,
            'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData,
            'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
            'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
            'khordha': khordhaDistrictData, 'koraput': koraputDistrictData, 'mayurbhanj': mayurbhanjDistrictData,
            'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData, 'nayagarh': nayagarhDistrictData,
            'nuapada': nuapadaDistrictData, 'puri': puriDistrictData, 'sambalpur': sambalpurDistrictData,
            'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData
        };
        
        const source = districtsSourceMap[districtName.toLowerCase()];
        if (!source) return [];

        const allRoutes = source.data?.routes || [];
        
        // Filter routes by MRF destination matching ULB's MRFs
        const filtered = allRoutes.filter((r: any) => 
            ulbMrfIds.some(mrfId => 
                (r.destination || "").toLowerCase().includes(mrfId) || 
                (r.mrfName || "").toLowerCase().includes(mrfId)
            ) ||
            (r.destination || "").toLowerCase().trim().includes(ulbParam.toLowerCase().trim())
        );
        
        return filtered.map((route: any, idx: number): Route => ({
            id: `local-${route.routeId || idx}-${idx}`,
            block: route.block || districtName,
            mrfName: route.mrfName || route.destination || 'District Facility',
            routeId: route.routeId || `ROUTE-${idx + 1}`,
            routeAbbreviation: route.routeAbbreviation || '',
            startingGp: route.startingGp || '',
            intermediateGps: route.intermediateGps || [],
            finalGp: route.finalGp || '',
            destination: route.destination || '',
            totalDistance: route.totalDistance || 0,
            workers: route.workers || [],
            scheduledOn: route.scheduledOn || 'Scheduled',
            isFromFirestore: false,
            firestoreId: undefined,
            district: districtName,
            ulb: ulbParam
        }));
    }, [districtName, ulbParam, ulbMrfIds]);

    // Real-time Firestore listener
    useEffect(() => {
        if (!db || !districtName || !ulbParam) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const routesQuery = query(
            collection(db, 'routePlans'),
            where('district', '==', districtName),
            where('ulb', '==', ulbParam),
            where('isDeleted', '==', false)
        );

        const unsubscribe = onSnapshot(routesQuery,
            (snapshot) => {
                const routes: Route[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    routes.push({
                        id: doc.id,
                        firestoreId: doc.id,
                        block: data.block || '',
                        mrfName: data.mrfName || '',
                        routeId: data.routeId || '',
                        routeAbbreviation: data.routeAbbreviation || '',
                        startingGp: data.startingGp || '',
                        intermediateGps: data.intermediateGps || [],
                        finalGp: data.finalGp || '',
                        destination: data.destination || '',
                        totalDistance: data.totalDistance || 0,
                        workers: data.workers || [],
                        scheduledOn: data.scheduledOn || '',
                        district: data.district || '',
                        ulb: data.ulb || '',
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
    }, [db, districtName, ulbParam, toast, dataInitialized]);

    // Merge local routes with Firestore data
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
        
        return mergedRoutes.sort((a, b) => (a.routeId || '').localeCompare(b.routeId || ''));
    }, [localRoutes, firestoreRoutes]);

    // Sync local routes to Firestore on first load (only once)
    const syncLocalToFirestore = useCallback(async () => {
        if (!db || !districtName || !ulbParam || syncing || firestoreRoutes.length > 0 || syncCompletedRef.current) return;
        
        setSyncing(true);
        try {
            for (const localRoute of localRoutes) {
                const documentId = `${districtName}-${ulbParam}-${localRoute.routeId}`.toLowerCase().replace(/\s+/g, '-');
                const routeRef = doc(db, 'routePlans', documentId);
                
                const routeData = {
                    block: localRoute.block,
                    mrfName: localRoute.mrfName,
                    routeId: localRoute.routeId,
                    routeAbbreviation: localRoute.routeAbbreviation,
                    startingGp: localRoute.startingGp,
                    intermediateGps: localRoute.intermediateGps,
                    finalGp: localRoute.finalGp,
                    destination: localRoute.destination,
                    totalDistance: localRoute.totalDistance,
                    workers: localRoute.workers,
                    scheduledOn: localRoute.scheduledOn,
                    district: districtName,
                    ulb: ulbParam,
                    isDeleted: false,
                    lastUpdated: new Date().toISOString(),
                    syncedFromLocal: true
                };
                
                await setDoc(routeRef, routeData, { merge: true });
            }
            
            syncCompletedRef.current = true;
            
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
    }, [db, districtName, ulbParam, localRoutes, firestoreRoutes.length, syncing, toast]);

    // Auto-sync local data to Firestore only once
    useEffect(() => {
        if (!loading && dataInitialized && firestoreRoutes.length === 0 && localRoutes.length > 0 && !syncing && !syncCompletedRef.current) {
            syncLocalToFirestore();
        }
    }, [loading, dataInitialized, firestoreRoutes.length, localRoutes.length, syncLocalToFirestore, syncing]);

    const handleOpenAddDialog = () => {
        setEditingRoute(null);
        setFormData({
            block: '', mrfName: '', routeId: '', routeAbbreviation: '',
            startingGp: '', intermediateGps: '', finalGp: '', destination: '',
            totalDistance: '', workersText: '', scheduledOn: ''
        });
        setIsDialogOpen(true);
    };

    const handleOpenEditDialog = (route: Route) => {
        setEditingRoute(route);
        setFormData({
            block: route.block,
            mrfName: route.mrfName,
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
        
        const confirmDelete = confirm(`Are you sure you want to delete route ${route.routeId}? This will affect all portals.`);
        if (!confirmDelete) return;
        
        setIsDeleting(route.id);
        
        try {
            if (!route.isFromFirestore) {
                const documentId = `${districtName}-${ulbParam}-${route.routeId}`.toLowerCase().replace(/\s+/g, '-');
                const routeRef = doc(db, 'routePlans', documentId);
                
                const routeData = {
                    ...route,
                    district: districtName,
                    ulb: ulbParam,
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
            toast({ 
                title: "Configuration Error", 
                description: "Database connection not available.",
                variant: "destructive"
            });
            return;
        }

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
            return;
        }

        if (!formData.routeId || !formData.startingGp || !formData.destination || !formData.scheduledOn) {
            toast({ 
                title: "Validation Error", 
                description: "Please fill all required fields.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        
        try {
            const documentId = editingRoute?.firestoreId || (editingRoute?.id?.startsWith('local-') ?
                `${districtName}-${ulbParam}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-') :
                editingRoute?.id || `${districtName}-${ulbParam}-${formData.routeId}`.toLowerCase().replace(/\s+/g, '-'));
            
            const routeData = {
                block: formData.block,
                mrfName: formData.mrfName,
                routeId: formData.routeId,
                routeAbbreviation: formData.routeAbbreviation,
                startingGp: formData.startingGp,
                intermediateGps: formData.intermediateGps.split(',').map(s => s.trim()).filter(Boolean),
                finalGp: formData.finalGp,
                destination: formData.destination,
                totalDistance: parseFloat(formData.totalDistance) || 0,
                workers: workerList,
                scheduledOn: formData.scheduledOn,
                district: districtName,
                ulb: ulbParam,
                isDeleted: false,
                lastUpdated: new Date().toISOString(),
                updatedBy: role || 'admin'
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
        <div className="space-y-8">
            <Card className="border-2 border-primary/20 bg-primary/[0.01]">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2 font-headline uppercase tracking-tight">
                        <Navigation className="text-primary h-8 w-8" /> 
                        Route Planning Directory: {ulbParam}
                        </CardTitle>
                        <CardDescription className="text-lg">Verified collection circuits and sanitation worker assignments for all associated MRF facilities. Changes sync across all portals instantly.</CardDescription>
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
                            <Button onClick={handleOpenAddDialog} className="font-black uppercase tracking-widest h-11 bg-primary shadow-lg px-6">
                                <PlusCircle className="mr-2 h-5 w-5" /> Add New Entry
                            </Button>
                        )}
                    </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 shadow-md">
                <CardContent className="p-0">
                    {/* Removed ScrollArea and min-width to allow natural fit */}
                    <div className="w-full overflow-x-auto">
                        <Table className="w-full min-w-[1000px] table-auto border-collapse">
                            <TableHeader className="bg-muted/80">
                                <TableRow>
                                    <TableHead className="w-[140px] uppercase text-[11px] font-black tracking-widest border">Block / MRF</TableHead>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black tracking-widest border">Route ID</TableHead>
                                    <TableHead className="w-[100px] uppercase text-[11px] font-black tracking-widest border">Route Name</TableHead>
                                    <TableHead className="w-[130px] uppercase text-[11px] font-black tracking-widest border">Starting GP</TableHead>
                                    <TableHead className="w-[160px] uppercase text-[11px] font-black tracking-widest border">Intermediate GPs</TableHead>
                                    <TableHead className="w-[120px] uppercase text-[11px] font-black tracking-widest border">Final GP</TableHead>
                                    <TableHead className="w-[140px] uppercase text-[11px] font-black tracking-widest border">Destination</TableHead>
                                    <TableHead className="w-[60px] text-right uppercase text-[11px] font-black tracking-widest border">Dist.</TableHead>
                                    <TableHead className="w-[180px] uppercase text-[11px] font-black tracking-widest border">Workers</TableHead>
                                    <TableHead className="w-[130px] uppercase text-[11px] font-black tracking-widest border">Collection Day</TableHead>
                                    {isAuthorized && <TableHead className="w-[80px] uppercase text-[11px] font-black tracking-widest border text-center">Actions</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allRoutes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isAuthorized ? 11 : 10} className="h-48 text-center text-muted-foreground italic uppercase font-black opacity-30">
                                            No logistical circuits resolved for this ULB.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allRoutes.map((route, idx) => (
                                        <TableRow key={route.id || idx} className="hover:bg-primary/[0.01] transition-colors border-b last:border-0">
                                            <TableCell className="border text-[11px] font-black text-primary uppercase leading-tight p-2">
                                                <p className="break-words">{route.block}</p>
                                                <p className="text-[9px] text-muted-foreground italic break-words">{route.mrfName}</p>
                                            </TableCell>
                                            <TableCell className="border font-mono text-[11px] font-bold text-foreground p-2 break-words">{route.routeId}</TableCell>
                                            <TableCell className="border p-2">
                                                <Badge variant="outline" className="text-[10px] font-black border-primary/30 bg-primary/5 whitespace-nowrap">
                                                    {route.routeAbbreviation || route.routeId}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-bold text-green-700 uppercase p-2 break-words">{route.startingGp}</TableCell>
                                            <TableCell className="border text-[10px] font-medium italic text-muted-foreground p-2 break-words">
                                                {route.intermediateGps.length > 0 ? route.intermediateGps.join(' → ') : 'Direct'}
                                            </TableCell>
                                            <TableCell className="border text-[11px] font-bold text-blue-700 uppercase p-2 break-words">{route.finalGp || route.destination}</TableCell>
                                            <TableCell className="border p-2">
                                                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-primary">
                                                    <Anchor className="h-3 w-3" />
                                                    <span className="break-words">{route.destination}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border text-right font-mono font-black text-xs text-primary p-2">{route.totalDistance}</TableCell>
                                            <TableCell className="border bg-muted/5 p-2">
                                                <div className="space-y-1">
                                                    {route.workers.map((w, i) => (
                                                        <div key={i} className="text-[10px] font-bold leading-tight">
                                                            <span className="text-primary uppercase">{w.name}</span>
                                                            <span className="text-muted-foreground ml-1 text-[9px]">({w.contact})</span>
                                                        </div>
                                                    ))}
                                                    {route.workers.length === 0 && (
                                                        <span className="text-muted-foreground italic text-[10px]">No workers assigned</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="border text-[10px] font-black uppercase text-blue-700 p-2 break-words leading-tight">{route.scheduledOn}</TableCell>
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
                        <DialogTitle className="text-xl font-black uppercase text-primary">{editingRoute ? 'Edit Route Entry' : 'Add New Route'}</DialogTitle>
                        <DialogDescription>
                            {editingRoute 
                                ? `Editing route ${editingRoute.routeId}. Changes will sync across all portals.`
                                : 'Add new route plan. This will be available across district, block, ULB, and driver portals.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Block</Label>
                                <Input value={formData.block} onChange={(e) => setFormData({...formData, block: e.target.value})} disabled={!!editingRoute} />
                                {editingRoute && <p className="text-[8px] text-muted-foreground">Block cannot be changed after creation</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase">Route ID *</Label>
                                    <Input value={formData.routeId} onChange={(e) => setFormData({...formData, routeId: e.target.value})} disabled={!!editingRoute} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase">Route Name</Label>
                                    <Input value={formData.routeAbbreviation} onChange={(e) => setFormData({...formData, routeAbbreviation: e.target.value})} placeholder="e.g., DTDK-01" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">MRF Name</Label>
                                <Input value={formData.mrfName} onChange={(e) => setFormData({...formData, mrfName: e.target.value})} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Total Distance (km) *</Label>
                                <Input type="number" step="0.1" value={formData.totalDistance} onChange={(e) => setFormData({...formData, totalDistance: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Starting GP *</Label>
                                <Input value={formData.startingGp} onChange={(e) => setFormData({...formData, startingGp: e.target.value})} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Destination MRF *</Label>
                                <Input value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Final GP</Label>
                                <Input value={formData.finalGp} onChange={(e) => setFormData({...formData, finalGp: e.target.value})} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Collection Day *</Label>
                                <Input value={formData.scheduledOn} onChange={(e) => setFormData({...formData, scheduledOn: e.target.value})} placeholder="e.g., Monday, Tuesday, Wednesday" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold uppercase">Intermediate GPs</Label>
                                <Input value={formData.intermediateGps} onChange={(e) => setFormData({...formData, intermediateGps: e.target.value})} placeholder="GP1, GP2, GP3 (comma-separated)" />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Workers (Format: Name:Contact, one per line) *</Label>
                            <Textarea value={formData.workersText} onChange={(e) => setFormData({...formData, workersText: e.target.value})} rows={4} className="font-mono" placeholder="John Doe:9876543210&#10;Jane Smith:9876543211" />
                            <p className="text-xs text-muted-foreground">Enter each worker on a new line with name and contact number separated by a colon (:)</p>
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
                                'Save Route Details'
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
                    <p className="text-muted-foreground">Loading roster...</p>
                </div>
            </div>
        }>
            <UlbPersonnelDetailsContent />
        </Suspense>
    );
}