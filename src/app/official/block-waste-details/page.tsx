'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar, Calculator, MapPin, Warehouse, Building, BarChart3, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect } from "react";
import { useFirestore } from '@/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { mrfData } from "@/lib/mrf-data";

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
  totalGpLoad: number;
  driverSubmitted: number;
  plastic: number;
  paper: number;
  metal: number;
  cloth: number;
  glass: number;
  sanitation: number;
  others: number;
  gpBreakdown?: { name: string; amount: number }[];
}

function BlockWasteReconciliationContent() {
  const searchParams = useSearchParams();
  const blockName = searchParams.get('block') || '';
  const districtName = searchParams.get('district') || '';
  
  const [mounted, setMounted] = useState(false);
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  useEffect(() => { setMounted(true); }, []);

  // Get all ULBs associated with this block from mrfData (pre-built cards)
  const allAssociatedUlbs = useMemo(() => {
    const ulbs = new Set<string>();
    mrfData.forEach(mrf => {
      if (mrf.blockCovered.toLowerCase() === blockName.toLowerCase()) {
        ulbs.add(mrf.ulbName);
      }
    });
    return Array.from(ulbs);
  }, [blockName]);

  // Real-time Firestore listener
  useEffect(() => {
    if (!db || !blockName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const wasteQuery = query(
      collection(db, 'wasteDetails'),
      where('block', '==', blockName),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(wasteQuery,
      (snapshot) => {
        const items: WasteRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            date: data.date || '',
            routeId: data.routeId || '',
            mrf: data.mrf || '',
            ulb: data.ulb || '',
            block: data.block || '',
            district: data.district || '',
            totalGpLoad: data.totalGpLoad || 0,
            driverSubmitted: data.driverSubmitted || 0,
            plastic: data.plastic || 0,
            paper: data.paper || 0,
            metal: data.metal || 0,
            cloth: data.cloth || 0,
            glass: data.glass || 0,
            sanitation: data.sanitation || 0,
            others: data.others || 0,
            gpBreakdown: data.gpBreakdown || []
          });
        });
        setRecords(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, blockName]);

  // Calculate block baseline average from GP Information page
  const blockBaselineAvg = useMemo(() => {
    if (!districtName || !blockName) return 0;
    const districtsMap: Record<string, any> = { 
      'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
      'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData,
      'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData,
      'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData,
      'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
      'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
      'khordha': khordhaDistrictData, 'koraput': koraputDistrictData, 'mayurbhanj': mayurbhanjDistrictData,
      'malkangiri': malkangiriDistrictData, 'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData,
      'nayagarh': nayagarhDistrictData, 'nuapada': nuapadaDistrictData, 'puri': puriDistrictData,
      'sambalpur': sambalpurDistrictData, 'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData
    };
    const source = districtsMap[districtName.toLowerCase()];
    if (!source) return 0;
    
    const blockDetails = source.getBlockDetails(blockName);
    const gps = blockDetails.gps || [];
    const waste = blockDetails.waste || [];
    
    return gps.reduce((sum: number, gp: any) => {
      const w = waste.find((wg: any) => wg.gpName?.toLowerCase() === gp.gpName?.toLowerCase());
      const kg = w ? (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000) || 0) : 0;
      return sum + kg;
    }, 0);
  }, [districtName, blockName]);

  // Generate years from 2026 to current year + 2
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2026;
    const years = [];
    for (let year = startYear; year <= currentYear + 2; year++) {
      years.push(year.toString());
    }
    return years;
  }, []);

  const calculateTotals = (items: WasteRecord[]) => {
    return items.reduce((acc, curr) => ({
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

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading block waste reconciliation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Card className="border-2 border-primary/20 bg-primary/[0.01] shadow-md">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center gap-3 text-primary">
            <Calculator className="h-10 w-10" />
            <div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Block Waste Reconciliation Hub</CardTitle>
              <CardDescription className="font-bold italic text-muted-foreground">Authoritative block oversight for {blockName}.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {availableYears.map((year) => (
        <div key={year} className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-primary opacity-20 tracking-tighter uppercase">{year} FISCAL CYCLE</h2>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-8">
            {MONTHS.map((month) => {
              // Filter records for this specific month and year
              const monthItems = records.filter(r => {
                if (!r.date) return false;
                const d = new Date(r.date);
                return d.getFullYear().toString() === year && d.toLocaleString('default', { month: 'long' }) === month;
              });

              // Calculate totals for the month
              const monthTotals = calculateTotals(monthItems);
              const monthVerified = monthTotals.driverSubmitted;
              const discrepancy = blockBaselineAvg - monthVerified;
              const efficiency = blockBaselineAvg > 0 ? (monthVerified / blockBaselineAvg) * 100 : 0;

              // For each ULB, get its records (even if empty, the card will show empty table)
              const ulbRecordsMap = new Map<string, WasteRecord[]>();
              
              // Initialize all ULBs with empty arrays (so cards are pre-built)
              allAssociatedUlbs.forEach(ulb => {
                ulbRecordsMap.set(ulb, []);
              });
              
              // Populate with actual records
              monthItems.forEach(record => {
                if (record.ulb && ulbRecordsMap.has(record.ulb)) {
                  const existing = ulbRecordsMap.get(record.ulb) || [];
                  existing.push(record);
                  ulbRecordsMap.set(record.ulb, existing);
                } else if (record.ulb) {
                  ulbRecordsMap.set(record.ulb, [record]);
                }
              });

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
                          {monthItems.length} RECEIPTS SYNCED
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 space-y-8 bg-background">
                      
                      {/* ULB-wise Cards - Pre-built for all associated ULBs */}
                      <Accordion type="multiple" className="w-full space-y-6">
                        {allAssociatedUlbs.map((ulb) => {
                          const ulbRecords = ulbRecordsMap.get(ulb) || [];
                          const ulbTotals = calculateTotals(ulbRecords);
                          
                          return (
                            <AccordionItem value={`${year}-${month}-${ulb}`} key={ulb} className="border rounded-xl shadow-sm overflow-hidden">
                              <AccordionTrigger className="px-6 py-4 bg-primary/5 hover:no-underline">
                                <div className="flex items-center gap-3">
                                  <Warehouse className="h-5 w-5 text-primary" />
                                  <h4 className="font-black uppercase text-sm text-primary">Facility (MRF): {ulb}</h4>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="p-0">
                                <ScrollArea className="w-full">
                                  <div className="min-w-[1600px]">
                                    <Table className="border text-[10px]">
                                      <TableHeader className="bg-muted/30">
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
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {ulbRecords.length === 0 ? (
                                          <TableRow>
                                            <TableCell colSpan={14} className="text-center py-12 text-muted-foreground">
                                              No submissions found for {ulb} in {month} {year}
                                            </TableCell>
                                          </TableRow>
                                        ) : (
                                          ulbRecords.map((row: WasteRecord) => (
                                            <TableRow key={row.id} className="hover:bg-primary/[0.01] border-b last:border-0 h-16 transition-colors">
                                              <TableCell className="border-r font-mono text-center font-bold">{row.date}</TableCell>
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
                                                      {(row.totalGpLoad || 0).toFixed(1)} KG
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
                                                            <span className="text-right text-primary">{(row.totalGpLoad || 0).toFixed(2)} KG</span>
                                                          </div>
                                                        </div>
                                                      ) : (
                                                        <div className="text-center py-6 text-muted-foreground">
                                                          <p className="text-[9px] italic">No GP breakdown available</p>
                                                          <p className="text-[8px] mt-1">Total: {(row.totalGpLoad || 0).toFixed(2)} KG</p>
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
                                            </TableRow>
                                          ))
                                        )}
                                      </TableBody>
                                      {ulbRecords.length > 0 && (
                                        <TableFooter className="bg-muted/30 font-black uppercase text-[9px]">
                                          <TableRow className="h-14">
                                            <TableCell colSpan={4} className="text-right border-r">ULB Monthly Totals:</TableCell>
                                            <TableCell className="text-right border-r text-blue-700">{ulbTotals.totalFromGPs.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r text-primary">{ulbTotals.driverSubmitted.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r text-destructive">{ulbTotals.discrepancy.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.plastic.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.paper.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.metal.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.cloth.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.glass.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.sanitation.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r">{ulbTotals.others.toFixed(1)}</TableCell>
                                          </TableRow>
                                        </TableFooter>
                                      )}
                                    </Table>
                                  </div>
                                  <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>

                      {/* Monthly Audit Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-muted/5 border-t mt-8 rounded-xl">
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Block Target Load</p>
                          <p className="text-2xl font-black">{blockBaselineAvg.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-primary mb-1">Total Verified</p>
                          <p className="text-2xl font-black text-primary">{monthVerified.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-background border-2 border-dashed rounded-xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-destructive mb-1">Total Discrepancy</p>
                          <p className="text-2xl font-black text-destructive">{discrepancy.toLocaleString()} KG</p>
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-xl p-5 shadow-lg">
                          <p className="text-[10px] font-black uppercase opacity-60 mb-1">Efficiency Score</p>
                          <p className="text-3xl font-black">{efficiency.toFixed(1)}%</p>
                        </div>
                      </div>

                      {/* Stream Totals */}
                      <div className="p-4 bg-muted/20 rounded-xl flex justify-between items-center text-[9px] font-black uppercase flex-wrap gap-2">
                        <span>Block Stream Totals:</span>
                        <div className="flex gap-6 flex-wrap">
                          <span>Plastic: {monthTotals.plastic.toFixed(1)}</span>
                          <span>Paper: {monthTotals.paper.toFixed(1)}</span>
                          <span>Metal: {monthTotals.metal.toFixed(1)}</span>
                          <span>Cloth: {monthTotals.cloth.toFixed(1)}</span>
                          <span>Glass: {monthTotals.glass.toFixed(1)}</span>
                          <span>Sanitation: {monthTotals.sanitation.toFixed(1)}</span>
                          <span>Others: {monthTotals.others.toFixed(1)}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Yearly Block Audit Section */}
          <Card className="mt-12 border-4 border-dashed border-primary/30 bg-muted/5 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-dashed border-primary/20 pb-8 text-center">
              <CardTitle className="text-4xl font-black font-headline uppercase tracking-tight text-primary/40 flex items-center justify-center gap-4">
                <BarChart3 className="h-12 w-12" /> Yearly Block Audit: {year}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[1600px]">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[200px] uppercase font-black border">ULB / Facility</TableHead>
                        <TableHead className="w-[150px] uppercase font-black border text-center">Routes</TableHead>
                        <TableHead className="w-[180px] text-right uppercase font-black border bg-primary/5">Total Collected (Kg)</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Plastic</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Paper</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Metal</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Glass</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Sanitation</TableHead>
                        <TableHead className="w-[120px] text-right uppercase font-black border">Total Others</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        const yearly = records.filter(r => new Date(r.date).getFullYear().toString() === year);
                        if (yearly.length === 0) {
                          return <TableRow><TableCell colSpan={9} className="h-48 text-center italic font-black uppercase tracking-[0.3em] opacity-10 text-2xl">Awaiting Annual Audit Cycle</TableCell></TableRow>;
                        }
                        
                        const ulbMap = new Map();
                        yearly.forEach(r => {
                          const ulb = r.ulb || 'Other';
                          const prev = ulbMap.get(ulb) || { count: 0, received: 0, plastic: 0, paper: 0, metal: 0, glass: 0, sani: 0, other: 0 };
                          ulbMap.set(ulb, {
                            count: prev.count + 1,
                            received: prev.received + (r.driverSubmitted || 0),
                            plastic: prev.plastic + (r.plastic || 0),
                            paper: prev.paper + (r.paper || 0),
                            metal: prev.metal + (r.metal || 0),
                            glass: prev.glass + (r.glass || 0),
                            sani: prev.sani + (r.sanitation || 0),
                            other: prev.other + (r.others || 0)
                          });
                        });

                        return Array.from(ulbMap.entries()).map(([ulb, stats]) => (
                          <TableRow key={ulb} className="bg-primary/5 font-black text-primary h-16 hover:bg-primary/10 transition-colors">
                            <TableCell className="border font-mono uppercase">{ulb}</TableCell>
                            <TableCell className="border text-center">{stats.count} Circuits</TableCell>
                            <TableCell className="border text-right text-lg">{stats.received.toFixed(1)} KG</TableCell>
                            <TableCell className="border text-right">{stats.plastic.toFixed(1)}</TableCell>
                            <TableCell className="border text-right">{stats.paper.toFixed(1)}</TableCell>
                            <TableCell className="border text-right">{stats.metal.toFixed(1)}</TableCell>
                            <TableCell className="border text-right">{stats.glass.toFixed(1)}</TableCell>
                            <TableCell className="border text-right">{stats.sani.toFixed(1)}</TableCell>
                            <TableCell className="border text-right">{stats.other.toFixed(1)}</TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function BlockWasteDetailsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" /></div>}>
      <BlockWasteReconciliationContent />
    </Suspense>
  );
}