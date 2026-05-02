'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar, Calculator, BarChart3, Info, Edit, Trash2, Save, Loader2, PlusCircle, RefreshCw, MapPin, Phone, User, Building } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { useFirestore } from '@/firebase';
import { collection, query, where, orderBy, doc, setDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  driverSubmitted: number;
  plastic: number;
  paper: number;
  metal: number;
  cloth: number;
  glass: number;
  sanitation: number;
  others: number;
  driverName: string;
  driverContact: string;
  submittedByRole: string;
  gpBreakdown?: { name: string; amount: number }[];
  createdAt?: string;
  updatedAt?: string;
}

function DriverWasteDetailsContent() {
  const searchParams = useSearchParams();
  const driverName = searchParams.get('name') || 'Personnel';
  const driverContact = searchParams.get('contact') || 'N/A';
  const { toast } = useToast();
  
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
    mrf: '',
    ulb: '',
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

  // Real-time Firestore listener
  useEffect(() => {
    if (!db || !driverName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const wasteQuery = query(
      collection(db, 'wasteDetails'),
      where('driverName', '==', driverName),
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
            driverSubmitted: data.driverSubmitted || 0,
            plastic: data.plastic || 0,
            paper: data.paper || 0,
            metal: data.metal || 0,
            cloth: data.cloth || 0,
            glass: data.glass || 0,
            sanitation: data.sanitation || 0,
            others: data.others || 0,
            driverName: data.driverName || '',
            driverContact: data.driverContact || '',
            submittedByRole: data.submittedByRole || 'driver',
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
  }, [db, driverName, toast, dataInitialized]);

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
      total: acc.total + (curr.driverSubmitted || 0),
      plastic: acc.plastic + (curr.plastic || 0),
      paper: acc.paper + (curr.paper || 0),
      metal: acc.metal + (curr.metal || 0),
      cloth: acc.cloth + (curr.cloth || 0),
      glass: acc.glass + (curr.glass || 0),
      sanitation: acc.sanitation + (curr.sanitation || 0),
      others: acc.others + (curr.others || 0)
    }), { total: 0, plastic: 0, paper: 0, metal: 0, cloth: 0, glass: 0, sanitation: 0, others: 0 });
  };

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      routeId: '',
      mrf: '',
      ulb: '',
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
    
    const confirmDelete = confirm(`Are you sure you want to delete this receipt? This will affect all portals.`);
    if (!confirmDelete) return;
    
    setIsDeleting(id);
    
    try {
      await deleteDoc(doc(db, 'wasteDetails', id));
      toast({ 
        title: "Receipt Removed", 
        description: "Transmission record deleted from all portals.",
        variant: "default" 
      });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Delete failed. Please try again.", 
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

    if (!formData.routeId || !formData.mrf) {
      toast({ title: "Validation Error", description: "Route ID and MRF are required.", variant: "destructive" });
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
        driverSubmitted: parseFloat(formData.driverSubmitted) || 0,
        plastic: parseFloat(formData.plastic) || 0,
        paper: parseFloat(formData.paper) || 0,
        metal: parseFloat(formData.metal) || 0,
        cloth: parseFloat(formData.cloth) || 0,
        glass: parseFloat(formData.glass) || 0,
        sanitation: parseFloat(formData.sanitation) || 0,
        others: parseFloat(formData.others) || 0,
        driverName: driverName,
        driverContact: driverContact,
        submittedByRole: 'driver',
        updatedAt: now
      };

      if (editingRecord) {
        await setDoc(doc(db, 'wasteDetails', editingRecord.id), payload, { merge: true });
        toast({ 
          title: "Receipt Updated", 
          description: "Transmission data corrected across all portals.",
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
          description: "New receipt logged in master ledger.",
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
          <p className="text-muted-foreground">Loading waste collection history...</p>
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
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Personnel Waste Ledger</CardTitle>
              <CardDescription className="font-bold italic text-muted-foreground">Verified collection records for {driverName}.</CardDescription>
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
            <Button onClick={handleOpenAdd} className="font-black uppercase tracking-widest bg-primary shadow-lg h-11 px-6">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Submission
            </Button>
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
            {MONTHS.map((month, mIdx) => {
              const monthRecords = records.filter(r => {
                if (!r.date) return false;
                const d = new Date(r.date);
                return d.getFullYear().toString() === year && d.toLocaleString('default', { month: 'long' }) === month;
              });
              
              const totals = calculateMonthlyTotals(monthRecords);

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
                          {monthRecords.length} RECEIPTS VERIFIED
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
                                <TableHead className="w-[180px] uppercase font-black border text-center">Driver Details</TableHead>
                                <TableHead className="w-[120px] uppercase font-black border text-center">Route ID</TableHead>
                                <TableHead className="w-[180px] uppercase font-black border text-center">Facility (MRF)</TableHead>
                                <TableHead className="w-[150px] uppercase font-black border text-center">Tagged ULB</TableHead>
                                <TableHead className="w-[150px] uppercase font-black border text-center">Total (Kg) - Click</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Plastic</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Paper</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Metal</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Cloth</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Glass</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Sanitation</TableHead>
                                <TableHead className="w-[90px] text-right uppercase font-black border">Others</TableHead>
                                <TableHead className="w-[100px] uppercase font-black border text-center">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {monthRecords.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={14} className="text-center py-12 text-muted-foreground">
                                    No receipts found for {month} {year}
                                  </TableCell>
                                </TableRow>
                              ) : (
                                monthRecords.map((row) => (
                                  <TableRow key={row.id} className="hover:bg-primary/[0.01] border-b last:border-0 h-16 transition-colors">
                                    <TableCell className="border-r font-mono text-center font-bold">{row.date}</TableCell>
                                    <TableCell className="border-r text-center">
                                      <div className="space-y-0.5">
                                        <p className="text-[10px] font-black uppercase flex items-center justify-center gap-1">
                                          <User className="h-3 w-3" /> {row.driverName}
                                        </p>
                                        <p className="text-[9px] font-mono text-primary flex items-center justify-center gap-1">
                                          <Phone className="h-3 w-3" /> {row.driverContact || 'N/A'}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell className="border-r font-black text-primary uppercase text-center">{row.routeId}</TableCell>
                                    <TableCell className="border-r font-bold uppercase text-center">{row.mrf}</TableCell>
                                    <TableCell className="border-r font-bold uppercase text-center flex items-center justify-center gap-1">
                                      <Building className="h-3 w-3 text-primary" />
                                      {row.ulb || 'N/A'}
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <button className="px-4 py-2 font-bold text-blue-700 hover:bg-blue-50 underline decoration-dotted underline-offset-4 rounded-lg transition-all">
                                            {row.driverSubmitted?.toFixed(1)} KG
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
                                                  <span className="text-right text-primary">{row.driverSubmitted?.toFixed(2)} KG</span>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="text-center py-6 text-muted-foreground">
                                                <p className="text-[9px] italic">No GP breakdown available</p>
                                                <p className="text-[8px] mt-1">Total: {row.driverSubmitted?.toFixed(2)} KG</p>
                                              </div>
                                            )}
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    </TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.plastic}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.paper}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.metal}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.cloth}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.glass}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.sanitation}</TableCell>
                                    <TableCell className="border-r text-right font-mono">{row.others}</TableCell>
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
                                          {isDeleting === row.id ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                          ) : (
                                            <Trash2 className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                            {monthRecords.length > 0 && (
                              <TableFooter className="bg-primary/5 font-black uppercase text-[10px]">
                                <TableRow className="h-14">
                                  <TableCell colSpan={5} className="text-right border-r">Monthly Cumulative Total:</TableCell>
                                  <TableCell className="text-right border-r text-primary text-xs font-black">{totals.total.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.plastic.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.paper.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.metal.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.cloth.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.glass.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.sanitation.toFixed(1)}</TableCell>
                                  <TableCell className="text-right border-r">{totals.others.toFixed(1)}</TableCell>
                                  <TableCell></TableCell>
                                </TableRow>
                              </TableFooter>
                            )}
                          </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Yearly Audit Section */}
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
                  <div className="grid grid-cols-2 lg:grid-cols-9 gap-8 text-center">
                    <div className="space-y-1"><p className="text-[10px] font-black uppercase opacity-60">Total Collected</p><p className="text-2xl font-black text-primary">{yearlyTotals.total.toFixed(1)} Kg</p></div>
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
              {editingRecord ? 'Edit Verified Receipt' : 'New Receipt Submission'}
            </DialogTitle>
            <DialogDescription>
              {editingRecord 
                ? `Editing receipt from ${editingRecord.date}. Changes will sync across all portals.`
                : 'Add new waste collection receipt. This will be available across district, block, and ULB portals.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4 border-y my-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Date *</Label>
              <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Route ID *</Label>
              <Input 
                value={formData.routeId} 
                onChange={e => setFormData({...formData, routeId: e.target.value})} 
                placeholder="e.g. RJ-01"
                disabled={!!editingRecord}
              />
              {editingRecord && <p className="text-[8px] text-muted-foreground">Route ID cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Facility (MRF) *</Label>
              <Input 
                value={formData.mrf} 
                onChange={e => setFormData({...formData, mrf: e.target.value})} 
                placeholder="e.g. Kodandapur"
                disabled={!!editingRecord}
              />
              {editingRecord && <p className="text-[8px] text-muted-foreground">MRF cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Tagged ULB</Label>
              <Input 
                value={formData.ulb} 
                onChange={e => setFormData({...formData, ulb: e.target.value})} 
                placeholder="e.g. Boudh Municipality"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Load (Kg) *</Label>
              <Input type="number" value={formData.driverSubmitted} onChange={e => setFormData({...formData, driverSubmitted: e.target.value})} placeholder="Total weight" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Plastic</Label>
              <Input type="number" value={formData.plastic} onChange={e => setFormData({...formData, plastic: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Paper</Label>
              <Input type="number" value={formData.paper} onChange={e => setFormData({...formData, paper: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Metal</Label>
              <Input type="number" value={formData.metal} onChange={e => setFormData({...formData, metal: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Cloth</Label>
              <Input type="number" value={formData.cloth} onChange={e => setFormData({...formData, cloth: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Glass</Label>
              <Input type="number" value={formData.glass} onChange={e => setFormData({...formData, glass: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Sanitation</Label>
              <Input type="number" value={formData.sanitation} onChange={e => setFormData({...formData, sanitation: e.target.value})} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase">Others</Label>
              <Input type="number" value={formData.others} onChange={e => setFormData({...formData, others: e.target.value})} placeholder="0" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="font-bold" disabled={isSubmitting}>
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
                  {editingRecord ? 'Update Receipt' : 'Submit Receipt'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-muted/20 border-l-4 border-primary p-6 rounded-r-xl shadow-inner flex items-start gap-4 mt-8">
        <Info className="h-6 w-6 text-primary mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-black uppercase tracking-tight">Temporal Engine Guidelines</p>
          <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
            Personal collection history is archived by reporting month. Each receipt is a verified transmission node in the jurisdictional audit. 
            Click on any "Total (Kg)" value to see detailed GP-wise breakdown.
            Edits or corrections are mirrored in the ULB and District command centers to maintain fiscal integrity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DriverWasteDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Syncing personal collection history...</p>
        </div>
      </div>
    }>
      <DriverWasteDetailsContent />
    </Suspense>
  );
}