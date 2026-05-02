'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, PlusCircle, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
import { khordhaDistrictData } from "@/lib/disKhordha";
import { koraputDistrictData } from "@/lib/disKoraput";
import { malkangiriDistrictData } from "@/lib/disMalkangiri";
import { mayurbhanjDistrictData } from "@/lib/disMayurbhanj";
import { rayagadaDistrictData } from "@/lib/disRayagada";
import { nabarangpurDistrictData } from "@/lib/disNabarangpur";
import { nayagarhDistrictData } from "@/lib/disNayagarh";
import { nuapadaDistrictData } from "@/lib/disNuapada";
import { puriDistrictData } from "@/lib/disPuri";
import { sambalpurDistrictData } from "@/lib/disSambalpur";
import { balasoreDistrictData } from "@/lib/disBalasore";
import { baleswarDistrictData } from "@/lib/disBaleswar";

interface GPRecord {
  id: string;
  ulbName: string;
  mrfName: string;
  gpName: string;
  households: number;
  schools: number;
  anganwadis: number;
  commercial: string;
  dailyWaste: number;
  monthlyWaste: number;
  district?: string;
  ulb?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  isDeleted?: boolean;
}

function GpInformationContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ulbParam = searchParams.get('ulb') || '';
  const districtName = searchParams.get('district') || '';
  const role = searchParams.get('role');
  const isAuthorized = role === 'ulb' || role === 'block' || role === 'district';

  const db = useFirestore();
  const [firestoreGps, setFirestoreGps] = useState<GPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<GPRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);
  const syncCompletedRef = useRef(false);

  const [formData, setFormData] = useState({
    ulbName: '',
    mrfName: '',
    gpName: '',
    households: '',
    schools: '',
    anganwadis: '',
    commercial: '',
    dailyWaste: '',
    monthlyWaste: ''
  });

  // Get local GP data based on district and ULB (Fallback data)
  const localGps = useMemo((): GPRecord[] => {
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
        'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'malkangiri': malkangiriDistrictData
    };
    
    const source = districtsSourceMap[districtName.toLowerCase()];
    if (!source) return [];

    const mappedGps = source.data.gpMappings.filter((m: any) => 
        m.taggedUlb.toLowerCase().includes(ulbParam.toLowerCase()) || 
        ulbParam.toLowerCase().includes(m.taggedUlb.toLowerCase())
    );

    return mappedGps.map((gp: any, idx: number): GPRecord => {
        const wasteInfo = source.data.wasteGeneration.find((w: any) => w.gpName.toLowerCase().trim() === gp.gpName.toLowerCase().trim());
        return {
            id: `local-${gp.gpName}-${idx}`,
            ulbName: gp.taggedUlb,
            mrfName: gp.taggedMrf,
            gpName: gp.gpName,
            households: wasteInfo?.totalHouseholds || 0,
            schools: wasteInfo?.schools || 0,
            anganwadis: wasteInfo?.anganwadis || 0,
            commercial: wasteInfo?.commercial || '0',
            dailyWaste: wasteInfo ? (wasteInfo.dailyWasteTotalGm || (wasteInfo.totalWasteKg ? wasteInfo.totalWasteKg * 1000 / 30 : 0)) : 0,
            monthlyWaste: wasteInfo ? (wasteInfo.monthlyWasteTotalGm || (wasteInfo.totalWasteKg ? wasteInfo.totalWasteKg * 1000 : 0)) : 0,
            isFromFirestore: false,
            firestoreId: undefined,
            district: districtName,
            ulb: ulbParam
        };
    });
  }, [districtName, ulbParam]);

  // Real-time Firestore listener
  useEffect(() => {
    if (!db || !districtName || !ulbParam) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const gpsQuery = query(
      collection(db, 'gpInformation'),
      where('district', '==', districtName),
      where('ulb', '==', ulbParam)
    );

    const unsubscribe = onSnapshot(gpsQuery,
      (snapshot) => {
        const gps: GPRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          gps.push({
            id: doc.id,
            firestoreId: doc.id,
            ulbName: data.ulbName || '',
            mrfName: data.mrfName || '',
            gpName: data.gpName || '',
            households: data.households || 0,
            schools: data.schools || 0,
            anganwadis: data.anganwadis || 0,
            commercial: data.commercial || '0',
            dailyWaste: data.dailyWaste || 0,
            monthlyWaste: data.monthlyWaste || 0,
            district: data.district || '',
            ulb: data.ulb || '',
            lastUpdated: data.lastUpdated || '',
            isFromFirestore: true
          });
        });
        
        setFirestoreGps(gps);
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

  // Merge local GP data with Firestore data
  const allGps = useMemo((): GPRecord[] => {
    const firestoreMap = new Map();
    firestoreGps.forEach(gp => {
      firestoreMap.set(gp.gpName?.toLowerCase(), gp);
    });
    
    const mergedGps: GPRecord[] = [...firestoreGps];
    
    localGps.forEach((localGp: GPRecord) => {
      if (!firestoreMap.has(localGp.gpName?.toLowerCase())) {
        mergedGps.push(localGp);
      }
    });
    
    return mergedGps.sort((a, b) => (a.gpName || '').localeCompare(b.gpName || ''));
  }, [localGps, firestoreGps]);

  // Sync local GPs to Firestore on first load (only once)
  const syncLocalToFirestore = useCallback(async () => {
    if (!db || !districtName || !ulbParam || syncing || firestoreGps.length > 0 || syncCompletedRef.current) return;
    
    setSyncing(true);
    try {
      for (const localGp of localGps) {
        const documentId = `${districtName}-${ulbParam}-${localGp.gpName}`.toLowerCase().replace(/\s+/g, '-');
        const gpRef = doc(db, 'gpInformation', documentId);
        
        const gpData = {
          ulbName: localGp.ulbName,
          mrfName: localGp.mrfName,
          gpName: localGp.gpName,
          households: localGp.households,
          schools: localGp.schools,
          anganwadis: localGp.anganwadis,
          commercial: localGp.commercial,
          dailyWaste: localGp.dailyWaste,
          monthlyWaste: localGp.monthlyWaste,
          district: districtName,
          ulb: ulbParam,
          lastUpdated: new Date().toISOString(),
          syncedFromLocal: true
        };
        
        await setDoc(gpRef, gpData, { merge: true });
      }
      
      syncCompletedRef.current = true;
      
      toast({ 
        title: "Data Synced", 
        description: `Successfully synced ${localGps.length} GP records to database.`,
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
  }, [db, districtName, ulbParam, localGps, firestoreGps.length, syncing, toast]);

  // Auto-sync local data to Firestore only once
  useEffect(() => {
    if (!loading && dataInitialized && firestoreGps.length === 0 && localGps.length > 0 && !syncing && !syncCompletedRef.current) {
      syncLocalToFirestore();
    }
  }, [loading, dataInitialized, firestoreGps.length, localGps.length, syncLocalToFirestore, syncing]);

  const handleOpenAddDialog = () => {
    setEditingRow(null);
    setFormData({ 
      ulbName: ulbParam, mrfName: '', gpName: '', households: '', schools: '', 
      anganwadis: '', commercial: '', dailyWaste: '', monthlyWaste: '' 
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (row: GPRecord) => {
    setEditingRow(row);
    setFormData({
      ulbName: row.ulbName,
      mrfName: row.mrfName,
      gpName: row.gpName,
      households: row.households.toString(),
      schools: row.schools.toString(),
      anganwadis: row.anganwadis.toString(),
      commercial: row.commercial.toString(),
      dailyWaste: row.dailyWaste.toString(),
      monthlyWaste: row.monthlyWaste.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (row: GPRecord) => {
    if (!db) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete GP information for ${row.gpName}? This will affect all portals.`);
    if (!confirmDelete) return;
    
    setIsDeleting(row.id);
    
    try {
      if (!row.isFromFirestore) {
        const documentId = `${districtName}-${ulbParam}-${row.gpName}`.toLowerCase().replace(/\s+/g, '-');
        const gpRef = doc(db, 'gpInformation', documentId);
        
        const gpData = {
          ...row,
          district: districtName,
          ulb: ulbParam,
          isDeleted: true,
          deletedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        await setDoc(gpRef, gpData, { merge: true });
        
        toast({ 
          title: "GP Information Deleted", 
          description: `${row.gpName} has been removed from all portals.`,
          variant: "default" 
        });
        setIsDeleting(null);
        return;
      }
      
      const gpRef = doc(db, 'gpInformation', row.id);
      await deleteDoc(gpRef);
      
      toast({ 
        title: "GP Information Deleted", 
        description: `${row.gpName} has been removed from all portals.`,
        variant: "default" 
      });
    } catch (error) {
      console.error('Error deleting GP data:', error);
      toast({ 
        title: "Delete Failed", 
        description: "Failed to delete GP information. Please try again.", 
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

    if (!formData.gpName) {
      toast({ title: "Validation Error", description: "GP Name is required.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const documentId = editingRow?.firestoreId || (editingRow?.id?.startsWith('local-') ?
        `${districtName}-${ulbParam}-${formData.gpName}`.toLowerCase().replace(/\s+/g, '-') :
        editingRow?.id || `${districtName}-${ulbParam}-${formData.gpName}`.toLowerCase().replace(/\s+/g, '-'));
      
      const gpData = {
        ulbName: formData.ulbName || ulbParam,
        mrfName: formData.mrfName,
        gpName: formData.gpName,
        households: parseFloat(formData.households) || 0,
        schools: parseFloat(formData.schools) || 0,
        anganwadis: parseFloat(formData.anganwadis) || 0,
        commercial: formData.commercial || '0',
        dailyWaste: parseFloat(formData.dailyWaste) || 0,
        monthlyWaste: parseFloat(formData.monthlyWaste) || 0,
        district: districtName,
        ulb: ulbParam,
        lastUpdated: new Date().toISOString(),
        updatedBy: role || 'unknown'
      };
      
      const gpRef = doc(db, 'gpInformation', documentId);
      await setDoc(gpRef, gpData, { merge: true });

      toast({ 
        title: editingRow ? "GP Information Updated" : "GP Information Added", 
        description: `Data for ${formData.gpName} has been synchronized across all portals.`,
        variant: "default" 
      });
      
      setIsDialogOpen(false);
      setEditingRow(null);
      
    } catch (error) {
      console.error('Error saving GP data:', error);
      toast({ 
        title: "Sync Failed", 
        description: "Failed to save GP information. Please try again.", 
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
          <p className="text-muted-foreground">Loading GP information...</p>
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
                <ClipboardList className="h-10 w-10 text-primary" />
                <div>
                <CardTitle className="text-2xl font-bold font-headline uppercase tracking-tight">Information about GPs: {ulbParam}</CardTitle>
                <CardDescription>Verified quantification survey data for constituent Gram Panchayats mapped to this facility. Changes sync across all portals instantly.</CardDescription>
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
          {/* Removed ScrollArea and min-width to allow natural fit */}
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[900px] table-auto border-collapse border">
              <TableHeader className="bg-muted/80">
                <TableRow>
                  <TableHead className="w-[50px] text-center border font-black uppercase text-[11px]">S.No.</TableHead>
                  <TableHead className="w-[180px] border font-black uppercase text-[11px]">Facility (ULB/MRF)</TableHead>
                  <TableHead className="w-[150px] border font-black uppercase text-[11px]">GP Node</TableHead>
                  <TableHead className="w-[90px] border font-black uppercase text-[11px] text-center">Households</TableHead>
                  <TableHead className="w-[70px] border font-black uppercase text-[11px] text-center">Schools</TableHead>
                  <TableHead className="w-[90px] border font-black uppercase text-[11px] text-center">Anganwadis</TableHead>
                  <TableHead className="w-[90px] border font-black uppercase text-[11px] text-center">Comm. Est.</TableHead>
                  <TableHead className="w-[110px] border font-black uppercase text-[11px] text-right px-4">Waste/Day (Gm)</TableHead>
                  <TableHead className="w-[120px] border font-black uppercase text-[11px] text-right px-4">Waste/Month (Gm)</TableHead>
                  {isAuthorized && <TableHead className="w-[80px] border font-black uppercase text-[11px] text-center">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allGps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isAuthorized ? 10 : 9} className="text-center py-12 text-muted-foreground">
                      <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      No GP information found for {ulbParam}
                    </TableCell>
                  </TableRow>
                ) : (
                  allGps.map((row, idx) => (
                    <TableRow key={row.id || idx} className="hover:bg-primary/[0.02] border-b">
                      <TableCell className="text-center border-r font-mono text-[11px] p-2">{idx + 1}</TableCell>
                      <TableCell className="border-r font-bold uppercase leading-tight p-2">
                        <p className="text-primary text-[11px] break-words">{row.mrfName || 'N/A'}</p>
                        <p className="text-[9px] text-muted-foreground italic break-words">{row.ulbName}</p>
                      </TableCell>
                      <TableCell className="border-r font-black uppercase text-foreground text-[11px] p-2 break-words">{row.gpName}</TableCell>
                      <TableCell className="text-center border-r font-mono font-bold text-[12px] p-2">{row.households.toLocaleString()}</TableCell>
                      <TableCell className="text-center border-r font-mono text-[11px] p-2">{row.schools}</TableCell>
                      <TableCell className="text-center border-r font-mono text-[11px] p-2">{row.anganwadis}</TableCell>
                      <TableCell className="text-center border-r font-medium text-[11px] p-2">{row.commercial}</TableCell>
                      <TableCell className="text-right border-r font-mono font-black text-primary text-[11px] px-4 p-2">{(row.dailyWaste || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right border-r font-mono font-black text-primary text-[11px] px-4 p-2">{(row.monthlyWaste || 0).toLocaleString()}</TableCell>
                      {isAuthorized && (
                        <TableCell className="border text-center p-2">
                          <div className="flex justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0 text-primary hover:bg-primary/10" 
                              onClick={() => handleOpenEditDialog(row)}
                              disabled={isSubmitting}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" 
                              onClick={() => handleDelete(row)}
                              disabled={isDeleting === row.id}
                            >
                              {isDeleting === row.id ? (
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
        <DialogContent className="max-w-2xl border-2">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase text-primary">
                {editingRow ? 'Edit GP Information' : 'Add GP Information'}
              </DialogTitle>
              <DialogDescription>
                {editingRow 
                  ? `Editing data for ${editingRow.gpName}. Changes will sync across all portals.` 
                  : 'Add new GP survey data. This will be available across district, block, ULB, and GP portals.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-6">
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Facility (ULB Name)</Label>
                    <Input 
                      value={formData.ulbName} 
                      onChange={(e) => setFormData({...formData, ulbName: e.target.value})} 
                      disabled={!!editingRow}
                    />
                    {editingRow && <p className="text-[8px] text-muted-foreground">ULB cannot be changed after creation</p>}
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Facility (MRF Name)</Label>
                    <Input 
                      value={formData.mrfName} 
                      onChange={(e) => setFormData({...formData, mrfName: e.target.value})} 
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">GP Node *</Label>
                    <Input 
                      value={formData.gpName} 
                      onChange={(e) => setFormData({...formData, gpName: e.target.value})} 
                      placeholder="Enter Gram Panchayat name"
                      disabled={!!editingRow}
                    />
                    {editingRow && <p className="text-[8px] text-muted-foreground">GP Name cannot be changed after creation</p>}
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Households</Label>
                    <Input 
                      type="number" 
                      value={formData.households} 
                      onChange={(e) => setFormData({...formData, households: e.target.value})} 
                      placeholder="Total households"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Schools</Label>
                    <Input 
                      type="number" 
                      value={formData.schools} 
                      onChange={(e) => setFormData({...formData, schools: e.target.value})} 
                      placeholder="Number of schools"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Anganwadis</Label>
                    <Input 
                      type="number" 
                      value={formData.anganwadis} 
                      onChange={(e) => setFormData({...formData, anganwadis: e.target.value})} 
                      placeholder="Number of anganwadis"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Commercial Establishments</Label>
                    <Input 
                      value={formData.commercial} 
                      onChange={(e) => setFormData({...formData, commercial: e.target.value})} 
                      placeholder="Number of commercial units"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Waste Generation (Grams/Day)</Label>
                    <Input 
                      type="number" 
                      value={formData.dailyWaste} 
                      onChange={(e) => setFormData({...formData, dailyWaste: e.target.value})} 
                      placeholder="Daily waste in grams"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase opacity-60">Waste Generation (Grams/Month)</Label>
                    <Input 
                      type="number" 
                      value={formData.monthlyWaste} 
                      onChange={(e) => setFormData({...formData, monthlyWaste: e.target.value})} 
                      placeholder="Monthly waste in grams"
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
                  editingRow ? 'Update Changes' : 'Save Details'
                )}
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function GpInformationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading GP Information Portal...</p>
        </div>
      </div>
    }>
      <GpInformationContent />
    </Suspense>
  );
}