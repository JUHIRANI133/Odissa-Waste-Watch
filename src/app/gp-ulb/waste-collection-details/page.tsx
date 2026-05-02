'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
    ClipboardCheck, 
    PlusCircle,
    Edit,
    Trash2,
    Save,
    Phone,
    User,
    Users,
    Loader2,
    RefreshCw
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CollectionRecord {
  id: string;
  block: string;
  ulb: string;
  mrf: string;
  vehicleType: string;
  vehicleNo: string;
  vehicleCapacity: string;
  driverName: string;
  driverContact: string;
  collectionSchedule: string;
  gpName: string;
  actualWasteKg: number;
  gpNodalPerson: string;
  gpNodalContact: string;
  ulbNodalPerson: string;
  ulbNodalContact: string;
  district?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  isDeleted?: boolean;
}

function GpUlbWasteCollectionContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ulbParam = searchParams.get('ulb') || '';
  const districtParam = searchParams.get('district') || '';
  const role = searchParams.get('role');
  const isAuthorized = role === 'ulb' || role === 'block' || role === 'district';

  const db = useFirestore();
  const [firestoreRecords, setFirestoreRecords] = useState<CollectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<CollectionRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);
  const syncCompletedRef = useRef(false);

  const [formData, setFormData] = useState({
    block: '',
    ulb: '',
    mrf: '',
    vehicleType: '',
    vehicleNo: '',
    vehicleCapacity: '',
    driverName: '',
    driverContact: '',
    collectionSchedule: '',
    gpName: '',
    actualWasteKg: '',
    gpNodalPerson: '',
    gpNodalContact: '',
    ulbNodalPerson: '',
    ulbNodalContact: ''
  });

  const formatNamesWithContacts = (names: string, contacts: string): { name: string; contact: string }[] => {
    if (!names || names === '-' || names === 'N/A') return [];
    
    const nameList = names.split(/[,&/]/).map(n => n.trim()).filter(n => n && n !== '-');
    const contactList = contacts ? contacts.split(/[,&/]/).map(c => c.trim()).filter(c => c && c !== '-') : [];
    
    const result: { name: string; contact: string }[] = [];
    for (let i = 0; i < nameList.length; i++) {
      result.push({
        name: nameList[i],
        contact: contactList[i] || 'N/A'
      });
    }
    return result;
  };

  const localRecords = useMemo((): CollectionRecord[] => {
    if (!districtParam || !ulbParam) return [];
    
    const districtsSourceMap: Record<string, any> = {
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

    const source = districtsSourceMap[districtParam.toLowerCase()];
    if (!source) return [];

    const schedules = source.data?.collectionSchedules || [];
    
    const filtered = schedules.filter((item: any) => 
        (item.ulb?.toLowerCase().trim().includes(ulbParam.toLowerCase().trim()) || 
         ulbParam.toLowerCase().trim().includes(item.ulb?.toLowerCase().trim()))
    );

    return filtered.map((item: any, idx: number): CollectionRecord => ({
      id: `local-${item.gpName || idx}-${idx}`,
      block: item.block || 'Other',
      ulb: item.ulb || ulbParam,
      mrf: item.mrf || '',
      vehicleType: item.vehicleType || '',
      vehicleNo: item.vehicleNo || '-',
      vehicleCapacity: item.vehicleCapacity || '-',
      driverName: item.driverName || '-',
      driverContact: item.driverContact || '-',
      collectionSchedule: item.collectionSchedule || '',
      gpName: item.gpName || '',
      actualWasteKg: item.wasteGeneratedKg || 0,
      gpNodalPerson: item.gpNodalPerson || '',
      gpNodalContact: item.gpNodalContact || '',
      ulbNodalPerson: item.ulbNodalPerson || '',
      ulbNodalContact: item.ulbNodalContact || '',
      district: districtParam,
      isFromFirestore: false,
      firestoreId: undefined
    }));
  }, [districtParam, ulbParam]);

  useEffect(() => {
    if (!db || !districtParam || !ulbParam) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const recordsQuery = query(
      collection(db, 'collectionSchedules'),
      where('district', '==', districtParam),
      where('ulb', '==', ulbParam)
    );

    const unsubscribe = onSnapshot(recordsQuery,
      (snapshot) => {
        const records: CollectionRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          records.push({
            id: doc.id,
            firestoreId: doc.id,
            block: data.block || '',
            ulb: data.ulb || '',
            mrf: data.mrf || '',
            vehicleType: data.vehicleType || '',
            vehicleNo: data.vehicleNo || '-',
            vehicleCapacity: data.vehicleCapacity || '-',
            driverName: data.driverName || '-',
            driverContact: data.driverContact || '-',
            collectionSchedule: data.collectionSchedule || '',
            gpName: data.gpName || '',
            actualWasteKg: data.actualWasteKg || 0,
            gpNodalPerson: data.gpNodalPerson || '',
            gpNodalContact: data.gpNodalContact || '',
            ulbNodalPerson: data.ulbNodalPerson || '',
            ulbNodalContact: data.ulbNodalContact || '',
            district: data.district || '',
            lastUpdated: data.lastUpdated || '',
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
  }, [db, districtParam, ulbParam, toast, dataInitialized]);

  const allRecords = useMemo((): CollectionRecord[] => {
    const firestoreMap = new Map();
    firestoreRecords.forEach(record => {
      firestoreMap.set(record.gpName?.toLowerCase(), record);
    });
    
    const mergedRecords: CollectionRecord[] = [...firestoreRecords];
    
    localRecords.forEach((localRecord: CollectionRecord) => {
      if (!firestoreMap.has(localRecord.gpName?.toLowerCase())) {
        mergedRecords.push(localRecord);
      }
    });
    
    return mergedRecords.sort((a, b) => (a.block || '').localeCompare(b.block || ''));
  }, [localRecords, firestoreRecords]);

  const syncLocalToFirestore = useCallback(async () => {
    if (!db || !districtParam || !ulbParam || syncing || firestoreRecords.length > 0 || syncCompletedRef.current) return;
    
    setSyncing(true);
    try {
      for (const localRecord of localRecords) {
        const documentId = `${districtParam}-${ulbParam}-${localRecord.gpName}`.toLowerCase().replace(/\s+/g, '-');
        const recordRef = doc(db, 'collectionSchedules', documentId);
        
        const recordData = {
          block: localRecord.block,
          ulb: localRecord.ulb,
          mrf: localRecord.mrf,
          vehicleType: localRecord.vehicleType,
          vehicleNo: localRecord.vehicleNo,
          vehicleCapacity: localRecord.vehicleCapacity,
          driverName: localRecord.driverName,
          driverContact: localRecord.driverContact,
          collectionSchedule: localRecord.collectionSchedule,
          gpName: localRecord.gpName,
          actualWasteKg: localRecord.actualWasteKg,
          gpNodalPerson: localRecord.gpNodalPerson,
          gpNodalContact: localRecord.gpNodalContact,
          ulbNodalPerson: localRecord.ulbNodalPerson,
          ulbNodalContact: localRecord.ulbNodalContact,
          district: districtParam,
          lastUpdated: new Date().toISOString(),
          syncedFromLocal: true
        };
        
        await setDoc(recordRef, recordData, { merge: true });
      }
      
      syncCompletedRef.current = true;
      
      toast({ 
        title: "Data Synced", 
        description: `Successfully synced ${localRecords.length} collection records to database.`,
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
  }, [db, districtParam, ulbParam, localRecords, firestoreRecords.length, syncing, toast]);

  useEffect(() => {
    if (!loading && dataInitialized && firestoreRecords.length === 0 && localRecords.length > 0 && !syncing && !syncCompletedRef.current) {
      syncLocalToFirestore();
    }
  }, [loading, dataInitialized, firestoreRecords.length, localRecords.length, syncLocalToFirestore, syncing]);

  const handleOpenAddDialog = () => {
    setEditingRow(null);
    setFormData({
      block: '', ulb: ulbParam, mrf: '', vehicleType: '', vehicleNo: '',
      vehicleCapacity: '', driverName: '', driverContact: '', collectionSchedule: '',
      gpName: '', actualWasteKg: '', gpNodalPerson: '', gpNodalContact: '',
      ulbNodalPerson: '', ulbNodalContact: ''
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (record: CollectionRecord) => {
    setEditingRow(record);
    setFormData({
      block: record.block,
      ulb: record.ulb,
      mrf: record.mrf,
      vehicleType: record.vehicleType,
      vehicleNo: record.vehicleNo,
      vehicleCapacity: record.vehicleCapacity,
      driverName: record.driverName,
      driverContact: record.driverContact,
      collectionSchedule: record.collectionSchedule,
      gpName: record.gpName,
      actualWasteKg: record.actualWasteKg.toString(),
      gpNodalPerson: record.gpNodalPerson,
      gpNodalContact: record.gpNodalContact,
      ulbNodalPerson: record.ulbNodalPerson,
      ulbNodalContact: record.ulbNodalContact
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (record: CollectionRecord) => {
    if (!db) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete collection record for ${record.gpName}? This will affect all portals.`);
    if (!confirmDelete) return;
    
    setIsDeleting(record.id);
    
    try {
      if (!record.isFromFirestore) {
        const documentId = `${districtParam}-${ulbParam}-${record.gpName}`.toLowerCase().replace(/\s+/g, '-');
        const recordRef = doc(db, 'collectionSchedules', documentId);
        
        const recordData = {
          ...record,
          district: districtParam,
          ulb: ulbParam,
          isDeleted: true,
          deletedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        await setDoc(recordRef, recordData, { merge: true });
        
        toast({ 
          title: "Record Deleted", 
          description: `Collection record for ${record.gpName} has been removed from all portals.`,
          variant: "default" 
        });
        setIsDeleting(null);
        return;
      }
      
      const recordRef = doc(db, 'collectionSchedules', record.id);
      await deleteDoc(recordRef);
      
      toast({ 
        title: "Record Deleted", 
        description: `Collection record for ${record.gpName} has been removed from all portals.`,
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

    if (!formData.gpName || !formData.ulb) {
      toast({ title: "Validation Error", description: "GP Name and ULB are required.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const documentId = editingRow?.firestoreId || (editingRow?.id?.startsWith('local-') ?
        `${districtParam}-${ulbParam}-${formData.gpName}`.toLowerCase().replace(/\s+/g, '-') :
        editingRow?.id || `${districtParam}-${ulbParam}-${formData.gpName}`.toLowerCase().replace(/\s+/g, '-'));
      
      const now = new Date().toISOString();
      
      const recordData = {
        block: formData.block || 'Other',
        ulb: formData.ulb || ulbParam,
        mrf: formData.mrf,
        vehicleType: formData.vehicleType,
        vehicleNo: formData.vehicleNo,
        vehicleCapacity: formData.vehicleCapacity,
        driverName: formData.driverName,
        driverContact: formData.driverContact,
        collectionSchedule: formData.collectionSchedule,
        gpName: formData.gpName,
        actualWasteKg: parseFloat(formData.actualWasteKg) || 0,
        gpNodalPerson: formData.gpNodalPerson,
        gpNodalContact: formData.gpNodalContact,
        ulbNodalPerson: formData.ulbNodalPerson,
        ulbNodalContact: formData.ulbNodalContact,
        district: districtParam,
        lastUpdated: now,
        updatedBy: role || 'unknown'
      };
      
      if (!editingRow) {
        Object.assign(recordData, { createdAt: now });
      }
      
      const recordRef = doc(db, 'collectionSchedules', documentId);
      await setDoc(recordRef, recordData, { merge: true });

      toast({ 
        title: editingRow ? "Record Updated" : "New Record Added", 
        description: `Collection record for ${formData.gpName} has been synchronized across all portals.`,
        variant: "default" 
      });
      
      setIsDialogOpen(false);
      setEditingRow(null);
      
    } catch (error) {
      console.error('Error saving record:', error);
      toast({ 
        title: "Sync Failed", 
        description: "Failed to save collection record. Please try again.", 
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
          <p className="text-muted-foreground">Loading waste collection data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 shadow-md">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
                <ClipboardCheck className="text-primary h-8 w-8" />
                <div>
                <CardTitle className="text-2xl font-black uppercase">Waste Collection Details: {ulbParam}</CardTitle>
                <CardDescription>Verified chronological audit of logistical circuits linking GP nodes to this facility. Changes sync across all portals instantly.</CardDescription>
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
                <Button onClick={handleOpenAddDialog} className="font-black uppercase tracking-widest h-11 bg-primary shadow-lg px-6">
                  <PlusCircle className="mr-2 h-5 w-5" /> Add New Entry
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[1000px] table-auto border">
              <TableHeader className="bg-muted/80">
                <TableRow>
                  <TableHead className="w-[50px] border uppercase font-black text-[11px]">S.No.</TableHead>
                  <TableHead className="w-[120px] border uppercase font-black text-[11px]">Block</TableHead>
                  <TableHead className="w-[180px] border uppercase font-black text-[11px] text-center">Vehicle Details</TableHead>
                  <TableHead className="w-[160px] border uppercase font-black text-[11px] text-center">Driver Details</TableHead>
                  <TableHead className="w-[130px] border uppercase font-black text-[11px]">Collection Day</TableHead>
                  <TableHead className="w-[80px] border uppercase font-black text-[11px] text-right">Load (Kg)</TableHead>
                  <TableHead className="w-[160px] border uppercase font-black text-[11px]">PEO Details (GP)</TableHead>
                  <TableHead className="w-[160px] border uppercase font-black text-[11px]">ULB Operator</TableHead>
                  {isAuthorized && <TableHead className="w-[80px] border uppercase font-black text-[11px] text-center">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isAuthorized ? 9 : 8} className="text-center py-12 text-muted-foreground">
                      <ClipboardCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      No collection records found for {ulbParam}
                    </TableCell>
                  </TableRow>
                ) : (
                  allRecords.map((item, idx) => {
                    const driverItems = formatNamesWithContacts(item.driverName, item.driverContact);
                    const peoItems = formatNamesWithContacts(item.gpNodalPerson, item.gpNodalContact);
                    const operatorItems = formatNamesWithContacts(item.ulbNodalPerson, item.ulbNodalContact);
                    
                    return (
                      <TableRow key={item.id || idx} className="hover:bg-primary/[0.01] border-b">
                        <TableCell className="border text-center font-mono text-[11px] p-2">{idx + 1}</TableCell>
                        <TableCell className="border font-black text-[11px] uppercase p-2 break-words">{item.block}</TableCell>
                        <TableCell className="border text-[11px] text-center p-2">
                          <div className="space-y-0.5">
                            <p className="font-bold uppercase text-foreground break-words">{item.vehicleType}</p>
                            <p className="font-mono text-[10px] text-muted-foreground break-words">{item.vehicleNo} | {item.vehicleCapacity} Kg</p>
                          </div>
                        </TableCell>
                        <TableCell className="border text-center p-2">
                          <div className="space-y-1">
                            {driverItems.length > 0 ? (
                              driverItems.map((d, i) => (
                                <div key={i} className="text-[10px] font-bold">
                                  <span className="uppercase break-words">{d.name}</span>
                                  <span className="text-primary font-mono ml-1 text-[9px]">({d.contact})</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-muted-foreground italic">No driver assigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="border text-[11px] font-black text-blue-700 uppercase p-2 break-words">{item.collectionSchedule}</TableCell>
                        <TableCell className="border text-right font-mono font-black text-primary text-[11px] p-2">{item.actualWasteKg.toLocaleString()}</TableCell>
                        <TableCell className="border bg-blue-50/10 p-2">
                          <div className="space-y-1">
                            {peoItems.length > 0 ? (
                              peoItems.map((p, i) => (
                                <div key={i} className="text-[10px] font-bold">
                                  <span className="uppercase text-primary break-words">{p.name}</span>
                                  <span className="text-muted-foreground font-mono ml-1 text-[9px]">({p.contact})</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-muted-foreground italic">No PEO assigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="border bg-orange-50/5 p-2">
                          <div className="space-y-1">
                            {operatorItems.length > 0 ? (
                              operatorItems.map((o, i) => (
                                <div key={i} className="text-[10px] font-bold">
                                  <span className="uppercase text-primary break-words">{o.name}</span>
                                  <span className="text-muted-foreground font-mono ml-1 text-[9px]">({o.contact})</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-muted-foreground italic">No operator assigned</span>
                            )}
                          </div>
                        </TableCell>
                        {isAuthorized && (
                          <TableCell className="border text-center p-2">
                            <div className="flex justify-center gap-1">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 w-7 p-0 text-primary hover:bg-primary/10" 
                                onClick={() => handleOpenEditDialog(item)}
                                disabled={isSubmitting}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" 
                                onClick={() => handleDelete(item)}
                                disabled={isDeleting === item.id}
                              >
                                {isDeleting === item.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-primary flex items-center gap-2">
              {editingRow ? <Edit className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
              {editingRow ? 'Edit Collection Record' : 'Add Collection Record'}
            </DialogTitle>
            <DialogDescription>
              {editingRow 
                ? `Editing record for ${editingRow.gpName}. Changes will sync across all portals.`
                : 'Add new waste collection record for ULB-wide synchronization.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Block Name *</Label>
              <Input 
                value={formData.block} 
                onChange={e => setFormData({...formData, block: e.target.value})} 
                placeholder="Enter block name"
                disabled={!!editingRow}
              />
              {editingRow && <p className="text-[8px] text-muted-foreground">Block cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">ULB Name *</Label>
              <Input 
                value={formData.ulb || ulbParam} 
                onChange={e => setFormData({...formData, ulb: e.target.value})} 
                placeholder="Urban Local Body name"
                disabled={!!editingRow}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">MRF Node</Label>
              <Input 
                value={formData.mrf} 
                onChange={e => setFormData({...formData, mrf: e.target.value})} 
                placeholder="Material Recovery Facility"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">GP Name *</Label>
              <Input 
                value={formData.gpName} 
                onChange={e => setFormData({...formData, gpName: e.target.value})} 
                placeholder="Gram Panchayat name"
                disabled={!!editingRow}
              />
              {editingRow && <p className="text-[8px] text-muted-foreground">GP Name cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Vehicle Type</Label>
              <Input 
                value={formData.vehicleType} 
                onChange={e => setFormData({...formData, vehicleType: e.target.value})} 
                placeholder="e.g., Mini Truck, Dumper"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Vehicle Number</Label>
              <Input 
                value={formData.vehicleNo} 
                onChange={e => setFormData({...formData, vehicleNo: e.target.value})} 
                placeholder="OD-01-AB-1234"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Vehicle Capacity (Kg)</Label>
              <Input 
                value={formData.vehicleCapacity} 
                onChange={e => setFormData({...formData, vehicleCapacity: e.target.value})} 
                placeholder="e.g., 5000"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Driver Name</Label>
              <Input 
                value={formData.driverName} 
                onChange={e => setFormData({...formData, driverName: e.target.value})} 
                placeholder="Driver full name"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple names with comma (,)</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Driver Contact</Label>
              <Input 
                value={formData.driverContact} 
                onChange={e => setFormData({...formData, driverContact: e.target.value})} 
                placeholder="Driver phone number"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple contacts with comma (,) in same order as names</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Collection Schedule</Label>
              <Input 
                value={formData.collectionSchedule} 
                onChange={e => setFormData({...formData, collectionSchedule: e.target.value})} 
                placeholder="e.g., Monday, Wednesday, Friday, 1st, 15th"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Actual Waste (Kg)</Label>
              <Input 
                type="number" 
                value={formData.actualWasteKg} 
                onChange={e => setFormData({...formData, actualWasteKg: e.target.value})} 
                placeholder="Weight in kilograms"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">GP Nodal Person</Label>
              <Input 
                value={formData.gpNodalPerson} 
                onChange={e => setFormData({...formData, gpNodalPerson: e.target.value})} 
                placeholder="PEO name"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple names with comma (,)</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">GP Nodal Contact</Label>
              <Input 
                value={formData.gpNodalContact} 
                onChange={e => setFormData({...formData, gpNodalContact: e.target.value})} 
                placeholder="PEO phone number"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple contacts with comma (,) in same order as names</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">ULB Operator Name</Label>
              <Input 
                value={formData.ulbNodalPerson} 
                onChange={e => setFormData({...formData, ulbNodalPerson: e.target.value})} 
                placeholder="ULB operator name"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple names with comma (,)</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">ULB Operator Contact</Label>
              <Input 
                value={formData.ulbNodalContact} 
                onChange={e => setFormData({...formData, ulbNodalContact: e.target.value})} 
                placeholder="ULB operator phone"
              />
              <p className="text-[8px] text-muted-foreground">Separate multiple contacts with comma (,) in same order as names</p>
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
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editingRow ? 'Update Record' : 'Save & Sync'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function GpUlbWasteCollectionDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading waste collection portal...</p>
        </div>
      </div>
    }>
      <GpUlbWasteCollectionContent />
    </Suspense>
  );
}