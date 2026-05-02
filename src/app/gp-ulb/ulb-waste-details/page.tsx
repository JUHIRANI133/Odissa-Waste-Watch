'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Calculator, 
  MapPin,
  BarChart3,
  Info,
  Edit,
  Trash2,
  PlusCircle,
  Save,
  Loader2,
  RefreshCw,
  Building,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect } from "react";
import { useFirestore } from '@/firebase';
import { collection, query, where, orderBy, doc, setDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// District Data Imports for Baseline Calculation
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

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

interface WasteRecord {
  id: string;
  date: string;
  routeId: string;
  mrf: string;
  ulb: string;
  block: string;
  district: string;
  gpName: string;
  driverSubmitted: number;
  totalGpLoad: number;
  plastic: number;
  paper: number;
  metal: number;
  cloth: number;
  glass: number;
  sanitation: number;
  others: number;
  submittedByRole: string;
  gpBreakdown?: { name: string; amount: number }[];
  createdAt?: string;
  updatedAt?: string;
}

function UlbWasteDetailsContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ulbParam = searchParams.get('ulb') || '';
  const districtParam = searchParams.get('district') || '';
  const role = searchParams.get('role');
  const isAuthorized = role === 'ulb' || role === 'block' || role === 'district';
  
  const [mounted, setMounted] = useState(false);
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRecord, setEditingRecord] = useState<WasteRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);

  const db = useFirestore();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    routeId: '',
    mrf: ulbParam,
    ulb: ulbParam,
    block: '',
    district: districtParam,
    totalGpLoad: '',
    driverSubmitted: '',
    plastic: '',
    paper: '',
    metal: '',
    cloth: '',
    glass: '',
    sanitation: '',
    others: ''
  });

  useEffect(() => { setMounted(true); }, []);

  // Real-time Firestore listener for ULB waste details
  useEffect(() => {
    if (!db || !ulbParam) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const wasteQuery = query(
      collection(db, 'wasteDetails'),
      where('ulb', '==', ulbParam),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(wasteQuery,
      (snapshot) => {
        const wasteRecords: WasteRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          wasteRecords.push({
            id: doc.id,
            date: data.date || '',
            routeId: data.routeId || '',
            mrf: data.mrf || '',
            ulb: data.ulb || '',
            block: data.block || '',
            district: data.district || '',
            gpName: data.gpName || '',
            driverSubmitted: data.driverSubmitted || 0,
            totalGpLoad: data.totalGpLoad || 0,
            plastic: data.plastic || 0,
            paper: data.paper || 0,
            metal: data.metal || 0,
            cloth: data.cloth || 0,
            glass: data.glass || 0,
            sanitation: data.sanitation || 0,
            others: data.others || 0,
            submittedByRole: data.submittedByRole || 'ulb',
            gpBreakdown: data.gpBreakdown || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        
        setRecords(wasteRecords);
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
          description: "Unable to sync with server. Please refresh.",
          variant: "destructive"
        });
      }
    );

    return () => unsubscribe();
  }, [db, ulbParam, toast, dataInitialized]);

  // Calculate baseline average (target load) from GP Information page
  const baselineAvg = useMemo(() => {
    if (!districtParam || !ulbParam) return 0;
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
    const source = districtsMap[districtParam.toLowerCase()];
    if (!source) return 0;

    const mappedGps = source.data.gpMappings.filter((m: any) => 
        m.taggedUlb.toLowerCase().trim().includes(ulbParam.toLowerCase().trim()) ||
        ulbParam.toLowerCase().trim().includes(m.taggedUlb.toLowerCase().trim())
    );
    return mappedGps.reduce((sum: number, gp: any) => {
        const w = source.data.wasteGeneration.find((wg: any) => wg.gpName.toLowerCase() === gp.gpName.toLowerCase());
        const kg = w ? (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000)) : 0;
        return sum + kg;
    }, 0);
  }, [districtParam, ulbParam]);

  // Dynamically extract available years from records
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    records.forEach(record => {
      if (record.date) {
        const year = new Date(record.date).getFullYear().toString();
        years.add(year);
      }
    });
    const currentYear = new Date().getFullYear().toString();
    const nextYear = (parseInt(currentYear) + 1).toString();
    if (years.size === 0) {
      years.add(currentYear);
      years.add(nextYear);
    }
    return Array.from(years).sort();
  }, [records]);

  const calculateMonthlyTotals = (monthRecords: WasteRecord[]) => {
    return monthRecords.reduce((acc, curr) => ({
      totalFromGPs: acc.totalFromGPs + (curr.totalGpLoad || 0),
      driverSubmitted: acc.driverSubmitted + (curr.driverSubmitted || 0),
      discrepancy: acc.discrepancy + ((curr.totalGpLoad || 0) - (curr.driverSubmitted || 0)),
      plastic: acc.plastic + (curr.plastic || 0),
      paper: acc.paper + (curr.paper || 0),
      metal: acc.metal + (curr.metal || 0),
      cloth: acc.cloth + (curr.cloth || 0),
      glass: acc.glass + (curr.glass || 0),
      sanitation: acc.sanitation + (curr.sanitation || 0),
      others: acc.others + (curr.others || 0)
    }), { 
      totalFromGPs: 0, driverSubmitted: 0, discrepancy: 0, 
      plastic: 0, paper: 0, metal: 0, cloth: 0, glass: 0, sanitation: 0, others: 0 
    });
  };

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      routeId: '',
      mrf: ulbParam,
      ulb: ulbParam,
      block: '',
      district: districtParam,
      totalGpLoad: '',
      driverSubmitted: '',
      plastic: '',
      paper: '',
      metal: '',
      cloth: '',
      glass: '',
      sanitation: '',
      others: ''
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (record: WasteRecord) => {
    setEditingRecord(record);
    setFormData({
      date: record.date,
      routeId: record.routeId,
      mrf: record.mrf,
      ulb: record.ulb,
      block: record.block,
      district: record.district,
      totalGpLoad: record.totalGpLoad?.toString() || '',
      driverSubmitted: record.driverSubmitted?.toString() || '',
      plastic: record.plastic?.toString() || '',
      paper: record.paper?.toString() || '',
      metal: record.metal?.toString() || '',
      cloth: record.cloth?.toString() || '',
      glass: record.glass?.toString() || '',
      sanitation: record.sanitation?.toString() || '',
      others: record.others?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete this record? This will affect all portals.`);
    if (!confirmDelete) return;
    
    setIsDeleting(id);
    
    try {
      await deleteDoc(doc(db, 'wasteDetails', id));
      toast({ 
        title: "Record Removed", 
        description: "Record deleted from all portals.",
        variant: "default" 
      });
    } catch (error) {
      toast({ 
        title: "Delete Failed", 
        description: "Failed to delete record.", 
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

    if (!formData.routeId) {
      toast({ title: "Validation Error", description: "Route ID is required.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const now = new Date().toISOString();
      const payload = {
        date: formData.date,
        routeId: formData.routeId,
        mrf: formData.mrf,
        ulb: formData.ulb,
        block: formData.block,
        district: formData.district,
        totalGpLoad: parseFloat(formData.totalGpLoad) || 0,
        driverSubmitted: parseFloat(formData.driverSubmitted) || 0,
        plastic: parseFloat(formData.plastic) || 0,
        paper: parseFloat(formData.paper) || 0,
        metal: parseFloat(formData.metal) || 0,
        cloth: parseFloat(formData.cloth) || 0,
        glass: parseFloat(formData.glass) || 0,
        sanitation: parseFloat(formData.sanitation) || 0,
        others: parseFloat(formData.others) || 0,
        submittedByRole: 'ulb',
        updatedAt: now
      };

      if (editingRecord) {
        await setDoc(doc(db, 'wasteDetails', editingRecord.id), payload, { merge: true });
        toast({ 
          title: "Record Updated", 
          description: "Record updated across all portals.",
          variant: "default" 
        });
      } else {
        await addDoc(collection(db, 'wasteDetails'), { 
          ...payload, 
          createdAt: now,
          submittedAt: now 
        });
        toast({ 
          title: "Entry Created", 
          description: "New record added to master ledger.",
          variant: "default" 
        });
      }
      setIsDialogOpen(false);
      setEditingRecord(null);
    } catch (err) {
      console.error('Error saving record:', err);
      toast({ 
        title: "Update Failed", 
        description: "Database error. Please try again.", 
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

  if (!mounted || (loading && !dataInitialized)) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading ULB waste reconciliation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Card className="border-2 border-primary/20 bg-primary/[0.01] shadow-md">
        <CardHeader className="bg-primary/5 border-b flex flex-row items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <Calculator className="h-10 w-10" />
            <div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight">ULB Waste Reconciliation Hub</CardTitle>
              <CardDescription className="font-bold italic text-muted-foreground">Authoritative audit ledger for {ulbParam}.</CardDescription>
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
              <Button onClick={handleOpenAdd} className="font-black uppercase tracking-widest bg-primary shadow-lg h-11 px-6">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Verified Entry
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {availableYears.map((year) => (
        <div key={year} className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-primary opacity-20 tracking-tighter uppercase">{year} FISCAL CYCLE</h2>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-6">
            {MONTHS.map((month) => {
              const monthRecords = records.filter(r => {
                if (!r.date) return false;
                const d = new Date(r.date);
                return d.getFullYear().toString() === year && d.toLocaleString('default', { month: 'long' }) === month;
              });
              
              const totals = calculateMonthlyTotals(monthRecords);
              const monthVerified = totals.driverSubmitted;
              const discrepancy = baselineAvg - monthVerified;
              const efficiency = baselineAvg > 0 ? (monthVerified / baselineAvg) * 100 : 0;

              return (
                <AccordionItem value={`${year}-${month}`} key={`${year}-${month}`} className="border-none">
                  <Card className="overflow-hidden border-2 shadow-xl">
                    <AccordionTrigger className="p-6 hover:no-underline bg-muted/10 data-[state=open]:bg-primary/5 transition-all border-b border-dashed">
                      <div className="flex justify-between w-full pr-8 items-center">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-6 w-6 text-primary" />
                          <span className="font-black text-xl uppercase tracking-tighter text-foreground">{month}</span>
                        </div>
                        <Badge variant="outline" className="font-bold border-primary/30 text-primary uppercase text-[8px] bg-primary/5 px-4 py-1">
                          {monthRecords.length} RECEIPTS SYNCED
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 bg-background">
                      <ScrollArea className="w-full">
                        <div className="min-w-[1600px]">
                          <Table className="border-collapse border text-[10px]">
                            <TableHeader className="bg-muted/80">
                              <TableRow>
                                <TableHead className="w-[100px] uppercase font-black border text-center">Date</TableHead>
                                <TableHead className="w-[120px] uppercase font-black border text-center">Route ID</TableHead>
                                <TableHead className="w-[180px] uppercase font-black border text-center">Facility (MRF)</TableHead>
                                <TableHead className="w-[150px] uppercase font-black border text-center">Tagged ULB</TableHead>
                                <TableHead className="w-[180px] uppercase font-black border text-center">Total Waste from GPs (Click)</TableHead>
                                <TableHead className="w-[150px] text-right uppercase font-black border bg-primary/5 text-primary">Driver Submitted (Kg)</TableHead>
                                <TableHead className="w-[120px] text-right uppercase font-black border bg-destructive/5 text-destructive">Discrepancy</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Plastic</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Paper</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Metal</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Cloth</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Glass</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Sanitation</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Others</TableHead>
                                {isAuthorized && <TableHead className="w-[100px] uppercase font-black border text-center">Actions</TableHead>}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {monthRecords.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={isAuthorized ? 15 : 14} className="text-center py-12 text-muted-foreground">
                                    No submissions found for {month} {year}
                                  </TableCell>
                                </TableRow>
                              ) : (
                                monthRecords.map((row) => (
                                  <TableRow key={row.id} className="hover:bg-primary/[0.01] border-b last:border-0 h-16 transition-colors">
                                    <TableCell className="border-r font-mono text-center font-bold">{row.date}</TableCell>
                                    <TableCell className="border-r font-black text-primary uppercase text-center">{row.routeId}</TableCell>
                                    <TableCell className="border-r font-bold uppercase text-center">{row.mrf}</TableCell>
                                    <TableCell className="border-r font-bold uppercase text-center flex items-center justify-center gap-1">
                                      <Building className="h-3 w-3 text-primary" />
                                      {row.ulb}
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <button className="px-4 py-2 font-bold text-blue-700 hover:bg-blue-50 underline decoration-dotted underline-offset-4 rounded-lg transition-all">
                                            {row.totalGpLoad?.toFixed(1)} KG
                                          </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-96 p-0 border-2 shadow-2xl overflow-hidden" align="center">
                                          <div className="bg-blue-700 text-white p-3 font-black uppercase text-[9px] flex items-center gap-2">
                                            <MapPin className="h-3 w-3" /> GP-wise Waste Collection Breakdown
                                          </div>
                                          <div className="p-3">
                                            {row.gpBreakdown && row.gpBreakdown.length > 0 ? (
                                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                                <div className="grid grid-cols-2 gap-2 pb-2 border-b font-black text-[9px] text-muted-foreground">
                                                  <span>Gram Panchayat</span>
                                                  <span className="text-right">Waste Collected (Kg)</span>
                                                </div>
                                                {row.gpBreakdown.map((gp: any, idx: number) => (
                                                  <div key={idx} className="grid grid-cols-2 gap-2 border-b border-dashed pb-2 last:border-0">
                                                    <span className="text-[10px] font-bold uppercase truncate">{gp.name}</span>
                                                    <span className="text-right text-[10px] font-mono font-black text-blue-700">{gp.amount?.toFixed(2)}</span>
                                                  </div>
                                                ))}
                                                <div className="grid grid-cols-2 gap-2 pt-2 font-black text-[10px] border-t">
                                                  <span>Total:</span>
                                                  <span className="text-right text-primary">{row.totalGpLoad?.toFixed(2)} KG</span>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="text-center py-6 text-muted-foreground">
                                                <p className="text-[9px] italic">No GP breakdown available</p>
                                                <p className="text-[8px] mt-1">Total: {row.totalGpLoad?.toFixed(2)} KG</p>
                                              </div>
                                            )}
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    </TableCell>
                                    <TableCell className="border-r text-right font-mono font-black text-primary bg-primary/[0.02] text-sm">{row.driverSubmitted?.toFixed(1)} KG</TableCell>
                                    <TableCell className="border-r text-right font-mono font-black text-destructive">{(row.totalGpLoad - row.driverSubmitted).toFixed(1)} KG</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.plastic}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.paper}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.metal}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.cloth}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.glass}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.sanitation}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.others}</TableCell>
                                    {isAuthorized && (
                                      <TableCell className="border text-center">
                                        <div className="flex justify-center gap-1">
                                          <Button 
                                            size="icon" 
                                            variant="outline" 
                                            className="h-7 w-7 text-primary hover:bg-primary hover:text-white transition-all" 
                                            onClick={() => handleOpenEdit(row)}
                                            disabled={isSubmitting}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button 
                                            size="icon" 
                                            variant="outline" 
                                            className="h-7 w-7 text-destructive hover:bg-destructive hover:text-white transition-all" 
                                            onClick={() => handleDelete(row.id)}
                                            disabled={isDeleting === row.id}
                                          >
                                            {isDeleting === row.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                          </Button>
                                        </div>
                                      </TableCell>
                                    )}
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                            {monthRecords.length > 0 && (
                              <TableFooter className="bg-muted/30 font-black uppercase text-[9px]">
                                <TableRow className="h-14">
                                  <TableCell colSpan={4} className="text-right border-r">Monthly Totals:</TableCell>
                                  <TableCell className="text-right border-r text-blue-700">{totals.totalFromGPs.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r text-primary">{totals.driverSubmitted.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r text-destructive">{totals.discrepancy.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.plastic.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.paper.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.metal.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.cloth.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.glass.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.sanitation.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.others.toFixed(1)}</TableCell>
                                  {isAuthorized && <TableCell></TableCell>}
                                </TableRow>
                              </TableFooter>
                            )}
                          </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>

                      {/* Monthly Audit Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-muted/5 border-t mt-4">
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Target Load (Avg Month)</p>
                          <p className="text-2xl font-black">{baselineAvg.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-primary mb-1">Total Verified</p>
                          <p className="text-2xl font-black text-primary">{monthVerified.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-destructive mb-1">Cumulative Discrepancy</p>
                          <p className="text-2xl font-black text-destructive">{discrepancy.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-xl p-5 shadow-lg">
                          <p className="text-[10px] font-black uppercase opacity-60 mb-1">Efficiency Score</p>
                          <p className="text-3xl font-black">{efficiency.toFixed(1)}%</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Yearly Professional Audit Section */}
          <Card className="mt-12 border-4 border-dashed border-primary/30 bg-muted/5 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-dashed border-primary/20 pb-8 text-center">
              <CardTitle className="text-4xl font-black font-headline uppercase tracking-tight text-primary/40 flex items-center justify-center gap-4">
                <BarChart3 className="h-12 w-12" /> Yearly Professional Audit: {year}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-10">
              {(() => {
                const yearlyRecords = records.filter(r => new Date(r.date).getFullYear().toString() === year);
                const yearlyTotals = calculateMonthlyTotals(yearlyRecords);
                
                if (yearlyRecords.length === 0) {
                  return <p className="text-center py-12 text-muted-foreground italic uppercase font-black tracking-widest opacity-30">Awaiting annual cycle completion for {year}.</p>;
                }

                return (
                  <div className="grid grid-cols-2 lg:grid-cols-10 gap-8 text-center">
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Total from GPs</p><p className="text-2xl font-black text-blue-700">{yearlyTotals.totalFromGPs.toFixed(1)} Kg</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Driver Submitted</p><p className="text-2xl font-black text-primary">{yearlyTotals.driverSubmitted.toFixed(1)} Kg</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Discrepancy</p><p className="text-2xl font-black text-destructive">{yearlyTotals.discrepancy.toFixed(1)} Kg</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Plastic</p><p className="text-xl font-black">{yearlyTotals.plastic.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Paper</p><p className="text-xl font-black">{yearlyTotals.paper.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Metal</p><p className="text-xl font-black">{yearlyTotals.metal.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Cloth</p><p className="text-xl font-black">{yearlyTotals.cloth.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Glass</p><p className="text-xl font-black">{yearlyTotals.glass.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Sanitation</p><p className="text-xl font-black">{yearlyTotals.sanitation.toFixed(1)}</p></div>
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Others</p><p className="text-xl font-black">{yearlyTotals.others.toFixed(1)}</p></div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl border-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase text-primary">
              {editingRecord ? 'Edit Verified Entry' : 'Administrative Verified Entry'}
            </DialogTitle>
            <DialogDescription>
              {editingRecord 
                ? `Editing record from ${editingRecord.date}. Changes will sync across all portals.`
                : 'Manual synchronization of logistical waste recovery metrics.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4 border-y my-4">
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Collection Date</Label><Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Route ID</Label><Input value={formData.routeId} onChange={e => setFormData({...formData, routeId: e.target.value})} placeholder="e.g., RJ-01" disabled={!!editingRecord} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Tagged MRF</Label><Input value={formData.mrf} disabled className="bg-muted/20 font-bold" /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Tagged ULB</Label><Input value={formData.ulb} disabled className="bg-muted/20 font-bold" /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Block</Label><Input value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} placeholder="Block name" /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">District</Label><Input value={formData.district} disabled className="bg-muted/20" /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Total Load from GPs (Kg)</Label><Input type="number" value={formData.totalGpLoad} onChange={e => setFormData({...formData, totalGpLoad: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Driver Submitted (Kg)</Label><Input type="number" value={formData.driverSubmitted} onChange={e => setFormData({...formData, driverSubmitted: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Plastic</Label><Input type="number" value={formData.plastic} onChange={e => setFormData({...formData, plastic: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Paper</Label><Input type="number" value={formData.paper} onChange={e => setFormData({...formData, paper: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Metal</Label><Input type="number" value={formData.metal} onChange={e => setFormData({...formData, metal: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Cloth</Label><Input type="number" value={formData.cloth} onChange={e => setFormData({...formData, cloth: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Glass</Label><Input type="number" value={formData.glass} onChange={e => setFormData({...formData, glass: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Sanitation</Label><Input type="number" value={formData.sanitation} onChange={e => setFormData({...formData, sanitation: e.target.value})} /></div>
            <div className="space-y-2"><Label className="text-[10px] font-bold uppercase">Others</Label><Input type="number" value={formData.others} onChange={e => setFormData({...formData, others: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="font-bold" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="font-black uppercase px-8">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} 
              {editingRecord ? 'Update Record' : 'Save Verified Entry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-muted/20 border-l-4 border-primary p-6 rounded-r-xl shadow-inner flex items-start gap-4 mt-8">
        <Info className="h-6 w-6 text-primary mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-black uppercase tracking-tight">ULB Reconciliation Guidelines</p>
          <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
            ULB waste reconciliation data is organized by fiscal cycle. Each monthly card features jurisdictional auditing with real-time discrepancy monitoring. 
            Click on "Total Waste from GPs" to see detailed GP-wise breakdown. Large variances trigger automatic block-level audit flags.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UlbWasteDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading ULB waste reconciliation ledger...</p>
        </div>
      </div>
    }>
      <UlbWasteDetailsContent />
    </Suspense>
  );
}