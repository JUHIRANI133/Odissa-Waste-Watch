'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { steeringCommitteeData as jajpurData } from "@/lib/disJajpur/steeringCommitteeData";
import { steeringCommitteeData as bhadrakData } from "@/lib/disBhadrak/steeringCommitteeData";
import { steeringCommitteeData as bargarhData } from "@/lib/disBargarh/steeringCommitteeData";
import { steeringCommitteeData as snprData } from "@/lib/disSonepur/steeringCommitteeData";
import { steeringCommitteeData as angulData } from "@/lib/disAngul/steeringCommitteeData";
import { steeringCommitteeData as balangirData } from "@/lib/disBalangir/steeringCommitteeData";
import { mrfData } from "@/lib/mrf-data";
import { Users, PlusCircle, Edit, Trash2, Save, Loader2, RefreshCw } from "lucide-react";
import { Suspense, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, query, where, onSnapshot, deleteDoc } from "firebase/firestore";

interface SteeringCommitteeRecord {
  id: string;
  district: string;
  meetingOrganised: string;
  dateOfMeeting: string;
  scheduledDate: string;
  blocksToTag: number;
  gpsToTag: number;
  routeChartFinalised: string;
  vehicleAllocated: string;
  noOfVehicles: number;
  vehicleType: string;
  wasteCollectionStarted: string;
  gpsStarted: number;
  tentativeDate: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  isDeleted?: boolean;
}

interface LocalSteeringRecord {
  id: string;
  district: string;
  meetingOrganised: string;
  dateOfMeeting: string;
  scheduledDate: string;
  blocksToTag: number;
  gpsToTag: number;
  routeChartFinalised: string;
  vehicleAllocated: string;
  noOfVehicles: number;
  vehicleType: string;
  wasteCollectionStarted: string;
  gpsStarted: number;
  tentativeDate: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
}

function SteeringCommitteeContent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const districtParam = searchParams.get('district');
    const blockParam = searchParams.get('block');
    const role = searchParams.get('role');
    const isAuthorized = role === 'block' || role === 'district';

    const db = useFirestore();
    const [firestoreRecords, setFirestoreRecords] = useState<SteeringCommitteeRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<SteeringCommitteeRecord | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [dataInitialized, setDataInitialized] = useState(false);

    const [formData, setFormData] = useState({
        meetingOrganised: 'No',
        dateOfMeeting: '',
        scheduledDate: '',
        blocksToTag: '',
        gpsToTag: '',
        routeChartFinalised: 'No',
        vehicleAllocated: 'No',
        noOfVehicles: '0',
        vehicleType: 'NA',
        wasteCollectionStarted: 'No',
        gpsStarted: '0',
        tentativeDate: 'TBD'
    });

    const finalDistrict = useMemo(() => {
        if (districtParam) return districtParam;
        if (blockParam) {
            const found = mrfData.find(m => m.blockCovered?.toLowerCase() === blockParam.toLowerCase());
            return found?.district || 'Bhadrak';
        }
        return 'Bhadrak';
    }, [districtParam, blockParam]);

    // Get local steering committee data (Fallback data)
    const localRecords = useMemo((): LocalSteeringRecord[] => {
        const districtsMap: Record<string, any> = {
            'balangir': balangirData, 'bhadrak': bhadrakData, 'jajpur': jajpurData,
            'bargarh': bargarhData, 'sonepur': snprData, 'angul': angulData
        };
        const defaultData = districtsMap[finalDistrict.toLowerCase()] || bhadrakData;
        const records = Array.isArray(defaultData) ? defaultData : [defaultData];
        
        return records.map((record: any, idx: number): LocalSteeringRecord => ({
            id: `local-steering-${idx}`,
            district: finalDistrict,
            meetingOrganised: record.meetingOrganised || 'No',
            dateOfMeeting: record.dateOfMeeting || '',
            scheduledDate: record.scheduledDate || '',
            blocksToTag: record.blocksToTag || 0,
            gpsToTag: record.gpsToTag || 0,
            routeChartFinalised: record.routeChartFinalised || 'No',
            vehicleAllocated: record.vehicleAllocated || 'No',
            noOfVehicles: record.noOfVehicles || 0,
            vehicleType: record.vehicleType || 'NA',
            wasteCollectionStarted: record.wasteCollectionStarted || 'No',
            gpsStarted: record.gpsStarted || 0,
            tentativeDate: record.tentativeDate || 'TBD',
            isFromFirestore: false,
            firestoreId: undefined
        }));
    }, [finalDistrict]);

    // Real-time Firestore listener
    useEffect(() => {
        if (!db || !finalDistrict) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        const steeringQuery = query(
            collection(db, 'steeringCommittee'),
            where('district', '==', finalDistrict)
        );

        const unsubscribe = onSnapshot(steeringQuery,
            (snapshot) => {
                const records: SteeringCommitteeRecord[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    records.push({
                        id: doc.id,
                        firestoreId: doc.id,
                        district: data.district || '',
                        meetingOrganised: data.meetingOrganised || 'No',
                        dateOfMeeting: data.dateOfMeeting || '',
                        scheduledDate: data.scheduledDate || '',
                        blocksToTag: data.blocksToTag || 0,
                        gpsToTag: data.gpsToTag || 0,
                        routeChartFinalised: data.routeChartFinalised || 'No',
                        vehicleAllocated: data.vehicleAllocated || 'No',
                        noOfVehicles: data.noOfVehicles || 0,
                        vehicleType: data.vehicleType || 'NA',
                        wasteCollectionStarted: data.wasteCollectionStarted || 'No',
                        gpsStarted: data.gpsStarted || 0,
                        tentativeDate: data.tentativeDate || 'TBD',
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        isFromFirestore: true
                    });
                });
                
                setFirestoreRecords(records);
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
    }, [db, finalDistrict, toast, dataInitialized]);

    // Merge local records with Firestore data
    const allRecords = useMemo((): SteeringCommitteeRecord[] => {
        const firestoreMap = new Map();
        firestoreRecords.forEach(record => {
            firestoreMap.set(record.id, record);
        });
        
        // Start with Firestore records (modified/added records)
        const mergedRecords: SteeringCommitteeRecord[] = [...firestoreRecords];
        
        // Add local records that DON'T exist in Firestore (unmodified records)
        localRecords.forEach((localRecord: LocalSteeringRecord) => {
            const exists = firestoreRecords.some(r => 
                r.meetingOrganised === localRecord.meetingOrganised && 
                r.dateOfMeeting === localRecord.dateOfMeeting
            );
            if (!exists && firestoreRecords.length === 0) {
                mergedRecords.push({
                    ...localRecord,
                    id: localRecord.id,
                    firestoreId: undefined,
                    isFromFirestore: false
                });
            }
        });
        
        return mergedRecords;
    }, [localRecords, firestoreRecords]);

    // Sync local records to Firestore on first load
    const syncLocalToFirestore = useCallback(async () => {
        if (!db || !finalDistrict || syncing || firestoreRecords.length > 0) return;
        
        setSyncing(true);
        try {
            for (let i = 0; i < localRecords.length; i++) {
                const localRecord = localRecords[i];
                const recordId = `${finalDistrict}-steering-${i}`.toLowerCase().replace(/\s+/g, '-');
                const steeringRef = doc(db, 'steeringCommittee', recordId);
                
                const recordData = {
                    district: finalDistrict,
                    meetingOrganised: localRecord.meetingOrganised,
                    dateOfMeeting: localRecord.dateOfMeeting,
                    scheduledDate: localRecord.scheduledDate,
                    blocksToTag: localRecord.blocksToTag,
                    gpsToTag: localRecord.gpsToTag,
                    routeChartFinalised: localRecord.routeChartFinalised,
                    vehicleAllocated: localRecord.vehicleAllocated,
                    noOfVehicles: localRecord.noOfVehicles,
                    vehicleType: localRecord.vehicleType,
                    wasteCollectionStarted: localRecord.wasteCollectionStarted,
                    gpsStarted: localRecord.gpsStarted,
                    tentativeDate: localRecord.tentativeDate,
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                    syncedFromLocal: true
                };
                
                await setDoc(steeringRef, recordData, { merge: true });
            }
            
            toast({ 
                title: "Data Synced", 
                description: `Successfully synced ${localRecords.length} steering committee records to database.`,
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
    }, [db, finalDistrict, localRecords, firestoreRecords.length, syncing, toast]);

    // Auto-sync local data to Firestore
    useEffect(() => {
        if (!loading && dataInitialized && firestoreRecords.length === 0 && localRecords.length > 0 && !syncing) {
            syncLocalToFirestore();
        }
    }, [loading, dataInitialized, firestoreRecords.length, localRecords.length, syncLocalToFirestore, syncing]);

    const handleOpenAddDialog = () => {
        setEditingRecord(null);
        setFormData({
            meetingOrganised: 'No', dateOfMeeting: '', scheduledDate: '',
            blocksToTag: '', gpsToTag: '', routeChartFinalised: 'No',
            vehicleAllocated: 'No', noOfVehicles: '0', vehicleType: 'NA',
            wasteCollectionStarted: 'No', gpsStarted: '0', tentativeDate: 'TBD'
        });
        setIsDialogOpen(true);
    };

    const handleOpenEditDialog = (record: SteeringCommitteeRecord) => {
        setEditingRecord(record);
        setFormData({
            meetingOrganised: record.meetingOrganised,
            dateOfMeeting: record.dateOfMeeting || '',
            scheduledDate: record.scheduledDate || '',
            blocksToTag: record.blocksToTag?.toString() || '',
            gpsToTag: record.gpsToTag?.toString() || '',
            routeChartFinalised: record.routeChartFinalised || 'No',
            vehicleAllocated: record.vehicleAllocated || 'No',
            noOfVehicles: record.noOfVehicles?.toString() || '0',
            vehicleType: record.vehicleType || 'NA',
            wasteCollectionStarted: record.wasteCollectionStarted || 'No',
            gpsStarted: record.gpsStarted?.toString() || '0',
            tentativeDate: record.tentativeDate || 'TBD'
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (record: SteeringCommitteeRecord) => {
        if (!db) return;
        
        const confirmDelete = confirm(`Are you sure you want to delete this steering committee record? This will affect all portals.`);
        if (!confirmDelete) return;
        
        setIsDeleting(record.id);
        
        try {
            if (!record.isFromFirestore) {
                const documentId = `${finalDistrict}-steering-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
                const steeringRef = doc(db, 'steeringCommittee', documentId);
                
                const recordData = {
                    ...record,
                    district: finalDistrict,
                    isDeleted: true,
                    deletedAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };
                
                await setDoc(steeringRef, recordData, { merge: true });
                
                toast({ 
                    title: "Record Deleted", 
                    description: "Steering committee record has been removed from all portals.",
                    variant: "default" 
                });
                setIsDeleting(null);
                return;
            }
            
            const steeringRef = doc(db, 'steeringCommittee', record.id);
            await deleteDoc(steeringRef);
            
            toast({ 
                title: "Record Deleted", 
                description: "Steering committee record has been removed from all portals.",
                variant: "default" 
            });
        } catch (error) {
            console.error('Error deleting record:', error);
            toast({ 
                title: "Delete Failed", 
                description: "Failed to delete record. Please try again.", 
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

        setIsSubmitting(true);
        
        try {
            const recordId = editingRecord?.firestoreId || (editingRecord?.id?.startsWith('local-') ?
                `${finalDistrict}-steering-${Date.now()}`.toLowerCase().replace(/\s+/g, '-') :
                editingRecord?.id || `${finalDistrict}-steering-${Date.now()}`.toLowerCase().replace(/\s+/g, '-'));
            
            const now = new Date().toISOString();
            
            const recordData = {
                district: finalDistrict,
                meetingOrganised: formData.meetingOrganised,
                dateOfMeeting: formData.dateOfMeeting,
                scheduledDate: formData.scheduledDate,
                blocksToTag: parseInt(formData.blocksToTag) || 0,
                gpsToTag: parseInt(formData.gpsToTag) || 0,
                routeChartFinalised: formData.routeChartFinalised,
                vehicleAllocated: formData.vehicleAllocated,
                noOfVehicles: parseInt(formData.noOfVehicles) || 0,
                vehicleType: formData.vehicleType,
                wasteCollectionStarted: formData.wasteCollectionStarted,
                gpsStarted: parseInt(formData.gpsStarted) || 0,
                tentativeDate: formData.tentativeDate,
                lastUpdated: now,
                updatedBy: role || 'unknown'
            };
            
            if (!editingRecord) {
                Object.assign(recordData, { createdAt: now });
            }
            
            const steeringRef = doc(db, 'steeringCommittee', recordId);
            await setDoc(steeringRef, recordData, { merge: true });

            toast({ 
                title: editingRecord ? "Record Updated" : "New Record Added", 
                description: `Steering committee status has been synchronized across all portals.`,
                variant: "default" 
            });
            
            setIsDialogOpen(false);
            setEditingRecord(null);
            
        } catch (error) {
            console.error('Error saving record:', error);
            toast({ 
                title: "Sync Failed", 
                description: "Failed to save record. Please try again.", 
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
                    <p className="text-muted-foreground">Loading steering committee data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Users className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-2xl font-bold font-headline uppercase tracking-tight">Steering Committee Status</CardTitle>
                                <CardDescription>Consolidated progress monitoring for District: <span className="font-bold text-foreground">{finalDistrict}</span>. Changes sync across all portals instantly.</CardDescription>
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
                <CardContent className="pt-8 overflow-x-auto">
                    <div className="rounded-lg border overflow-hidden bg-card min-w-[1400px]">
                        <Table className="border-collapse border text-[10px]">
                            <TableHeader className="bg-muted/80">
                                <TableRow>
                                    <TableHead rowSpan={2} className="w-[50px] font-black text-center border uppercase tracking-widest">S.No.</TableHead>
                                    <TableHead colSpan={3} className="font-black border text-center uppercase tracking-widest">Meeting Status</TableHead>
                                    <TableHead colSpan={2} className="font-black border text-center uppercase tracking-widest">Target Scope</TableHead>
                                    <TableHead rowSpan={2} className="font-black border text-center uppercase tracking-widest">Route Finalisation</TableHead>
                                    <TableHead rowSpan={2} className="font-black border text-center uppercase tracking-widest">Vehicle Allocation</TableHead>
                                    <TableHead rowSpan={2} className="font-black border text-center uppercase tracking-widest">No. & Type</TableHead>
                                    <TableHead colSpan={3} className="font-black border text-center uppercase tracking-widest">Collection Status</TableHead>
                                    {isAuthorized && <TableHead rowSpan={2} className="w-[120px] font-black border text-center uppercase tracking-widest">Actions</TableHead>}
                                </TableRow>
                                <TableRow>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Organised</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Date</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Scheduled</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Blocks</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">GPs</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Started</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Count</TableHead>
                                    <TableHead className="font-bold border text-center uppercase text-[8px]">Tentative Start</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allRecords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isAuthorized ? 13 : 12} className="text-center py-12 text-muted-foreground">
                                            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            No steering committee records found for {finalDistrict}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    allRecords.map((row, idx) => (
                                        <TableRow key={row.id || idx} className="hover:bg-muted/30">
                                            <TableCell className="text-center font-bold border">{idx + 1}</TableCell>
                                            <TableCell className="border text-center">
                                                <Badge variant={row.meetingOrganised?.toUpperCase() === "YES" ? "default" : "secondary"}>
                                                    {row.meetingOrganised}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-center font-mono font-bold">{row.dateOfMeeting || "-"}</TableCell>
                                            <TableCell className="border text-center font-mono">{row.scheduledDate || "-"}</TableCell>
                                            <TableCell className="border text-center font-black text-primary">{row.blocksToTag || "-"}</TableCell>
                                            <TableCell className="border text-center font-black text-primary">{row.gpsToTag || "-"}</TableCell>
                                            <TableCell className="border text-center">
                                                <Badge variant="outline" className={row.routeChartFinalised?.toUpperCase() === "YES" ? "text-green-700 bg-green-50" : "text-destructive bg-destructive/5"}>
                                                    {row.routeChartFinalised}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-center">
                                                <Badge variant="outline">{row.vehicleAllocated}</Badge>
                                            </TableCell>
                                            <TableCell className="border text-center font-bold uppercase">{row.noOfVehicles} | {row.vehicleType}</TableCell>
                                            <TableCell className="border text-center">
                                                <Badge className={row.wasteCollectionStarted?.toUpperCase() === "YES" ? "bg-green-600" : "bg-red-600"}>
                                                    {row.wasteCollectionStarted}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="border text-center font-black text-primary">{row.gpsStarted || "0"}</TableCell>
                                            <TableCell className="border text-center font-mono">{row.tentativeDate || "NA"}</TableCell>
                                            {isAuthorized && (
                                                <TableCell className="border text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Button 
                                                            size="icon" 
                                                            variant="outline" 
                                                            className="h-8 w-8 text-primary hover:bg-primary/10" 
                                                            onClick={() => handleOpenEditDialog(row)}
                                                            disabled={isSubmitting}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button 
                                                            size="icon" 
                                                            variant="outline" 
                                                            className="h-8 w-8 text-destructive hover:bg-destructive/10" 
                                                            onClick={() => handleDelete(row)}
                                                            disabled={isDeleting === row.id}
                                                        >
                                                            {isDeleting === row.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="h-4 w-4" />
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-primary flex items-center gap-2">
                            {editingRecord ? <Edit className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
                            {editingRecord ? 'Edit Steering Committee Status' : 'Add Steering Committee Status'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingRecord 
                                ? `Editing record for ${finalDistrict}. Changes will sync across all portals.`
                                : 'Input official meeting status and jurisdictional targets for block-wide synchronization.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Meeting Organised?</Label>
                            <Select value={formData.meetingOrganised} onValueChange={(v) => setFormData({...formData, meetingOrganised: v})}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Date of Meeting (If Yes)</Label>
                            <Input 
                                type="date"
                                value={formData.dateOfMeeting} 
                                onChange={(e) => setFormData({...formData, dateOfMeeting: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Scheduled Date for Next Meeting</Label>
                            <Input 
                                type="date"
                                value={formData.scheduledDate} 
                                onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Blocks to Tag</Label>
                            <Input 
                                type="number" 
                                value={formData.blocksToTag} 
                                onChange={(e) => setFormData({...formData, blocksToTag: e.target.value})} 
                                placeholder="Number of blocks"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">GPs to Tag</Label>
                            <Input 
                                type="number" 
                                value={formData.gpsToTag} 
                                onChange={(e) => setFormData({...formData, gpsToTag: e.target.value})} 
                                placeholder="Number of GPs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Route Chart Finalised?</Label>
                            <Select value={formData.routeChartFinalised} onValueChange={(v) => setFormData({...formData, routeChartFinalised: v})}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Vehicle Allocated?</Label>
                            <Select value={formData.vehicleAllocated} onValueChange={(v) => setFormData({...formData, vehicleAllocated: v})}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Number of Vehicles</Label>
                            <Input 
                                type="number" 
                                value={formData.noOfVehicles} 
                                onChange={(e) => setFormData({...formData, noOfVehicles: e.target.value})} 
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Vehicle Type</Label>
                            <Input 
                                value={formData.vehicleType} 
                                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})} 
                                placeholder="e.g., Mini Truck, Dumper"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Waste Collection Started?</Label>
                            <Select value={formData.wasteCollectionStarted} onValueChange={(v) => setFormData({...formData, wasteCollectionStarted: v})}>
                                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">GPs Where Collection Started</Label>
                            <Input 
                                type="number" 
                                value={formData.gpsStarted} 
                                onChange={(e) => setFormData({...formData, gpsStarted: e.target.value})} 
                                placeholder="Number of GPs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase">Tentative Start Date</Label>
                            <Input 
                                type="date"
                                value={formData.tentativeDate === 'TBD' ? '' : formData.tentativeDate} 
                                onChange={(e) => setFormData({...formData, tentativeDate: e.target.value || 'TBD'})} 
                                placeholder="TBD"
                            />
                        </div>
                    </div>
                    <DialogFooter className="bg-muted/30 p-4 rounded-xl">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="font-bold" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="font-black uppercase px-8">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Syncing...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> 
                                    {editingRecord ? 'Update Record' : 'Save Record'}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function SteeringCommitteePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading steering committee portal...</p>
                </div>
            </div>
        }>
            <SteeringCommitteeContent />
        </Suspense>
    );
}