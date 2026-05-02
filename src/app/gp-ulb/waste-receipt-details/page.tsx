'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Calendar, 
  Truck, 
  LayoutGrid, 
  ClipboardList,
  MapPin,
  User,
  Phone,
  Building,
  Loader2
} from 'lucide-react';
import React, { useMemo, Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

interface DriverWasteRecord {
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

interface GpWasteRecord {
  id: string;
  date: string;
  routeId: string;
  mrf: string;
  ulb: string;
  gpName: string;
  totalWasteGenerated: number;
  plastic: number;
  paper: number;
  metal: number;
  cloth: number;
  glass: number;
  sanitation: number;
  others: number;
  submittedByRole: string;
  createdAt?: string;
  updatedAt?: string;
}

function WasteReceiptSubmissionContent() {
  const searchParams = useSearchParams();
  const ulbParam = searchParams.get('ulb') || '';
  const [mounted, setMounted] = useState(false);
  
  // State for driver waste details (from wasteDetails collection)
  const [driverRecords, setDriverRecords] = useState<DriverWasteRecord[]>([]);
  
  // State for GP waste details (from gpWasteDetails collection)
  const [gpRecords, setGpRecords] = useState<GpWasteRecord[]>([]);
  
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  useEffect(() => { setMounted(true); }, []);

  // Real-time Firestore listener for Driver wasteDetails (from driver submissions)
  useEffect(() => {
    if (!db || !ulbParam) {
      setLoading(false);
      return;
    }

    const wasteQuery = query(
      collection(db, 'wasteDetails'),
      where('ulb', '==', ulbParam),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(wasteQuery,
      (snapshot) => {
        const items: DriverWasteRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
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
        setDriverRecords(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore listener error for wasteDetails:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, ulbParam]);

  // Real-time Firestore listener for GP wasteDetails (from GP invoice submissions)
  useEffect(() => {
    if (!db || !ulbParam) return;

    const gpWasteQuery = query(
      collection(db, 'gpWasteDetails'),
      where('ulb', '==', ulbParam),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(gpWasteQuery,
      (snapshot) => {
        const items: GpWasteRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            date: data.date || '',
            routeId: data.routeId || '',
            mrf: data.mrf || '',
            ulb: data.ulb || '',
            gpName: data.gpName || '',
            totalWasteGenerated: data.totalWasteGenerated || 0,
            plastic: data.plastic || 0,
            paper: data.paper || 0,
            metal: data.metal || 0,
            cloth: data.cloth || 0,
            glass: data.glass || 0,
            sanitation: data.sanitation || 0,
            others: data.others || 0,
            submittedByRole: data.submittedByRole || 'gp',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        setGpRecords(items);
      },
      (error) => {
        console.error("Firestore listener error for gpWasteDetails:", error);
      }
    );

    return () => unsubscribe();
  }, [db, ulbParam]);

  // Merge all records for year calculation
  const allRecords = useMemo(() => {
    const driverWithSource = driverRecords.map(r => ({ ...r, source: 'driver' }));
    const gpWithSource = gpRecords.map(r => ({ ...r, source: 'gp' }));
    return [...driverWithSource, ...gpWithSource];
  }, [driverRecords, gpRecords]);

  // Generate years from available records
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    allRecords.forEach(record => {
      if (record.date) {
        const year = new Date(record.date).getFullYear().toString();
        years.add(year);
      }
    });
    
    // Always include current year and next 2 years for pre-built cards
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 5; i++) {
      years.add((currentYear + i).toString());
    }
    
    return Array.from(years).sort();
  }, [allRecords]);

  const calculateDriverTotals = (items: DriverWasteRecord[]) => {
    return items.reduce((acc, curr) => ({
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

  const calculateGpTotals = (items: GpWasteRecord[]) => {
    return items.reduce((acc, curr) => ({
      total: acc.total + (curr.totalWasteGenerated || 0),
      plastic: acc.plastic + (curr.plastic || 0),
      paper: acc.paper + (curr.paper || 0),
      metal: acc.metal + (curr.metal || 0),
      cloth: acc.cloth + (curr.cloth || 0),
      glass: acc.glass + (curr.glass || 0),
      sanitation: acc.sanitation + (curr.sanitation || 0),
      others: acc.others + (curr.others || 0)
    }), { total: 0, plastic: 0, paper: 0, metal: 0, cloth: 0, glass: 0, sanitation: 0, others: 0 });
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading waste receipt data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Card className="border-2 border-primary/20 bg-primary/[0.01] shadow-md">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight text-primary">Waste Receipt Submission Hub</CardTitle>
              <CardDescription className="font-bold italic">Authoritative repository for verified circuit submissions from Driver and GP Portals.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {availableYears.map(year => {
        return (
          <div key={year} className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black text-primary opacity-20 uppercase tracking-tighter">{year} FISCAL CYCLE</h2>
              <div className="h-px flex-1 bg-primary/10"></div>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-6">
              {MONTHS.map((month) => {
                // Filter driver records for this month/year
                const driverMonthItems = driverRecords.filter(r => {
                  if (!r.date) return false;
                  const d = new Date(r.date);
                  return d.getFullYear().toString() === year && d.toLocaleString('default', { month: 'long' }) === month;
                });

                // Filter GP records for this month/year
                const gpMonthItems = gpRecords.filter(r => {
                  if (!r.date) return false;
                  const d = new Date(r.date);
                  return d.getFullYear().toString() === year && d.toLocaleString('default', { month: 'long' }) === month;
                });
                
                const driverTotals = calculateDriverTotals(driverMonthItems);
                const gpTotals = calculateGpTotals(gpMonthItems);
                const totalReceipts = driverMonthItems.length + gpMonthItems.length;

                return (
                  <AccordionItem value={`${year}-${month}`} key={`${year}-${month}`} className="border-none">
                    <Card className="overflow-hidden border-2 shadow-xl">
                      <AccordionTrigger className="p-6 hover:no-underline bg-muted/20 data-[state=open]:bg-primary/5 transition-all border-b border-dashed">
                        <div className="flex justify-between w-full pr-8 items-center">
                          <div className="flex items-center gap-4">
                            <Calendar className="h-6 w-6 text-primary" />
                            <span className="font-black text-xl uppercase tracking-tighter text-foreground">{month}</span>
                          </div>
                          <Badge variant="outline" className="font-bold border-primary/20 text-primary uppercase text-[8px] bg-primary/5 px-4 py-1">
                            {totalReceipts} TOTAL RECEIPTS SYNCED
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-6 space-y-12 bg-background">
                         
                        {/* Submissions from Driver Portal */}
                        <Card className="border-2 shadow-sm overflow-hidden">
                          <CardHeader className="bg-primary/5 border-b py-3 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-primary" />
                              <h3 className="font-black uppercase text-xs tracking-widest text-primary">Submissions from Driver Portal</h3>
                            </div>
                            <Badge className="bg-primary font-black text-[9px] uppercase">{driverMonthItems.length} LOGGED</Badge>
                          </CardHeader>
                          <CardContent className="p-0">
                            <ScrollArea className="w-full">
                              <div className="min-w-[1600px]">
                                <Table className="text-[10px]">
                                  <TableHeader className="bg-muted/50">
                                    <TableRow>
                                      <TableHead className="w-[100px] font-black uppercase border-r text-center">Date</TableHead>
                                      <TableHead className="w-[180px] font-black uppercase border-r text-center">Driver Details</TableHead>
                                      <TableHead className="w-[120px] font-black uppercase border-r text-center">Route ID</TableHead>
                                      <TableHead className="w-[180px] font-black uppercase border-r text-center">Facility (MRF)</TableHead>
                                      <TableHead className="w-[150px] font-black uppercase border-r text-center">Tagged ULB</TableHead>
                                      <TableHead className="w-[150px] font-black uppercase border-r text-center">Total (Kg) - Click</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Plastic</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Paper</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Metal</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Cloth</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Glass</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Sanitation</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Others</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {driverMonthItems.length === 0 ? (
                                      <TableRow>
                                        <TableCell colSpan={13} className="text-center py-12 text-muted-foreground">
                                          No driver submissions found for {month} {year}
                                        </TableCell>
                                      </TableRow>
                                    ) : (
                                      driverMonthItems.map((row, i) => (
                                        <TableRow key={row.id || i} className="h-14 border-b border-dashed last:border-0 hover:bg-muted/30">
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
                                                      {row.gpBreakdown.map((gp, idx) => (
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
                                        </TableRow>
                                      ))
                                    )}
                                  </TableBody>
                                  {driverMonthItems.length > 0 && (
                                    <TableFooter className="bg-primary/5 font-black uppercase text-[9px]">
                                      <TableRow>
                                        <TableCell colSpan={5} className="text-right border-r">Monthly Total (Driver):</TableCell>
                                        <TableCell className="text-right border-r text-primary text-xs">{driverTotals.total.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.plastic.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.paper.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.metal.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.cloth.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.glass.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.sanitation.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{driverTotals.others.toFixed(1)}</TableCell>
                                      </TableRow>
                                    </TableFooter>
                                  )}
                                </Table>
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </CardContent>
                        </Card>

                        {/* Submissions from GP Portal (Invoice Submissions) */}
                        <Card className="border-2 shadow-sm overflow-hidden">
                          <CardHeader className="bg-blue-50 border-b py-3 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <LayoutGrid className="h-4 w-4 text-blue-700" />
                              <h3 className="font-black uppercase text-xs tracking-widest text-blue-700">Submissions from GP Portal (Invoice Submissions)</h3>
                            </div>
                            <Badge className="bg-blue-700 font-black text-[9px] uppercase">{gpMonthItems.length} SYNC'D</Badge>
                          </CardHeader>
                          <CardContent className="p-0">
                            <ScrollArea className="w-full">
                              <div className="min-w-[1600px]">
                                <Table className="text-[10px]">
                                  <TableHeader className="bg-muted/50">
                                    <TableRow>
                                      <TableHead className="w-[100px] font-black uppercase border-r text-center">Date</TableHead>
                                      <TableHead className="w-[120px] font-black uppercase border-r text-center">Route ID</TableHead>
                                      <TableHead className="w-[180px] font-black uppercase border-r text-center">Facility (MRF)</TableHead>
                                      <TableHead className="w-[150px] font-black uppercase border-r text-center">Tagged ULB</TableHead>
                                      <TableHead className="w-[180px] font-black uppercase border-r text-center">GP Name</TableHead>
                                      <TableHead className="w-[120px] font-black uppercase border-r text-center">Total (Kg)</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Plastic</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Paper</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Metal</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Cloth</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Glass</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Sanitation</TableHead>
                                      <TableHead className="w-[90px] font-black uppercase border-r text-right">Others</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {gpMonthItems.length === 0 ? (
                                      <TableRow>
                                        <TableCell colSpan={13} className="text-center py-12 text-muted-foreground">
                                          No GP invoice submissions found for {month} {year}
                                        </TableCell>
                                      </TableRow>
                                    ) : (
                                      gpMonthItems.map((row, i) => (
                                        <TableRow key={row.id || i} className="h-14 border-b border-dashed last:border-0 hover:bg-muted/30">
                                          <TableCell className="border-r font-mono text-center font-bold">{row.date}</TableCell>
                                          <TableCell className="border-r font-black text-primary uppercase text-center">{row.routeId}</TableCell>
                                          <TableCell className="border-r font-bold uppercase text-center">{row.mrf}</TableCell>
                                          <TableCell className="border-r font-bold uppercase text-center flex items-center justify-center gap-1">
                                            <Building className="h-3 w-3 text-primary" />
                                            {row.ulb || 'N/A'}
                                          </TableCell>
                                          <TableCell className="border-r font-bold uppercase text-center flex items-center justify-center gap-1">
                                            <User className="h-3 w-3 text-primary" />
                                            {row.gpName}
                                          </TableCell>
                                          <TableCell className="border-r text-center font-mono font-black text-primary">
                                            {row.totalWasteGenerated?.toFixed(1)} KG
                                          </TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.plastic}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.paper}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.metal}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.cloth}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.glass}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.sanitation}</TableCell>
                                          <TableCell className="border-r text-right font-mono">{row.others || 0}</TableCell>
                                        </TableRow>
                                      ))
                                    )}
                                  </TableBody>
                                  {gpMonthItems.length > 0 && (
                                    <TableFooter className="bg-blue-50 font-black uppercase text-[9px] text-blue-800">
                                      <TableRow>
                                        <TableCell colSpan={5} className="text-right border-r">Monthly Total (GP Invoice):</TableCell>
                                        <TableCell className="text-right border-r text-xs">{gpTotals.total.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.plastic.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.paper.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.metal.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.cloth.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.glass.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.sanitation.toFixed(1)}</TableCell>
                                        <TableCell className="text-right border-r">{gpTotals.others.toFixed(1)}</TableCell>
                                      </TableRow>
                                    </TableFooter>
                                  )}
                                </Table>
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </CardContent>
                        </Card>

                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default function WasteReceiptSubmissionPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading verified submission hub...</div>}>
      <WasteReceiptSubmissionContent />
    </Suspense>
  );
}