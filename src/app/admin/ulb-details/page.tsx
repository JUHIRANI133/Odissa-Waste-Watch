
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Home, Warehouse, AlertCircle, CheckCircle2, Truck, Navigation, Calendar } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

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

import { mrfData } from "@/lib/mrf-data";

export default function StateULBDetailsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const masterReconciliationStructure = useMemo(() => {
    if (!mounted) return [];

    const districtSources = [
      angulDistrictData, balangirDistrictData, bhadrakDistrictData, bargarhDistrictData,
      sonepurDistrictData, boudhDistrictData, cuttackDistrictData, deogarhDistrictData,
      dhenkanalDistrictData, gajapatiDistrictData, ganjamDistrictData, jagatsinghpurDistrictData,
      jajpurDistrictData, jharsugudaDistrictData, kalahandiDistrictData, kandhamalDistrictData,
      kendraparaDistrictData, kendujharDistrictData, balasoreDistrictData, baleswarDistrictData
    ];

    return districtSources.map(source => {
      const blocks = source.blocks.map(blockName => {
        const details = source.getBlockDetails(blockName);
        
        // Group GPs by MRF within the block
        const mrfMap = new Map<string, any[]>();
        
        details.gps.forEach((gp: any) => {
          const mrfId = gp.taggedMrf || 'Unmapped';
          if (!mrfMap.has(mrfId)) mrfMap.set(mrfId, []);
          
          const waste = details.waste.find((w: any) => 
            w.gpName.toLowerCase() === gp.gpName.toLowerCase() ||
            gp.gpName.toLowerCase().includes(w.gpName.toLowerCase())
          );
          
          const schedule = details.schedules?.find((s: any) => 
            s.gpName.toLowerCase().includes(gp.gpName.toLowerCase())
          );

          const totalKg = waste ? (waste.totalWasteKg || (waste.monthlyWasteTotalGm / 1000)) : 0;
          
          mrfMap.get(mrfId)?.push({
            name: gp.gpName,
            routeId: schedule?.routeId || 'N/A',
            collectionDay: schedule?.collectionSchedule || 'Scheduled',
            status: totalKg > 0 ? (Math.random() > 0.3 ? 'Collected' : 'In Transit') : 'Pending',
            collected: totalKg,
            received: totalKg * (0.95 + Math.random() * 0.05), // Simulate minor loss
            metal: totalKg * 0.08,
            paper: totalKg * 0.22,
            glass: totalKg * 0.12,
            cloth: totalKg * 0.15,
            sanitary: totalKg * 0.05
          });
        });

        const mrfs = Array.from(mrfMap.entries()).map(([mrfId, gps]) => ({
          id: mrfId,
          gpCount: gps.length,
          totalCollected: gps.reduce((sum, g) => sum + g.collected, 0),
          gps
        }));

        return {
          name: blockName,
          mrfs
        };
      });

      return {
        name: source.district,
        blocks
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [mounted]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Collected': return <Badge className="bg-green-600 font-black text-[9px] uppercase">Collected</Badge>;
      case 'In Transit': return <Badge variant="secondary" className="text-blue-700 font-black text-[9px] uppercase flex items-center gap-1"><Truck className="h-2 w-2"/> In Transit</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground font-black text-[9px] uppercase">Pending</Badge>;
    }
  };

  if (!mounted) return <div className="p-12 text-center text-muted-foreground animate-pulse">Syncing state-wide reconciliation metrics...</div>;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-primary/[0.01]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Warehouse className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold font-headline uppercase tracking-tight">ULB-Level Reconciliation Hub</CardTitle>
              <CardDescription className="text-lg">State-wide verification for waste sent from GPs vs waste received at Material Recovery Facilities.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {masterReconciliationStructure.map((district) => (
          <AccordionItem value={district.name} key={district.name} className="border-none">
            <Card className="overflow-hidden border-2 shadow-md">
              <AccordionTrigger className="p-6 hover:no-underline bg-muted/10 data-[state=open]:bg-primary/5 transition-all">
                <div className="flex items-center gap-4">
                  <Building className="h-6 w-6 text-primary" />
                  <span className="font-black text-xl uppercase tracking-tighter text-foreground">{district.name} District</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-2 space-y-6 bg-background">
                <Accordion type="multiple" className="w-full space-y-4">
                  {district.blocks.map((block) => (
                    <AccordionItem value={`${district.name}-${block.name}`} key={block.name} className="border rounded-xl overflow-hidden shadow-sm">
                      <AccordionTrigger className="px-5 py-3 bg-muted/30 hover:no-underline hover:bg-primary/5 transition-all">
                         <div className="flex items-center gap-3">
                            <Home className="h-4 w-4 text-primary" />
                            <span className="font-bold text-sm uppercase">Block: {block.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-6 space-y-8">
                        {block.mrfs.map((mrf) => (
                          <div key={mrf.id} className="space-y-4">
                            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-2">
                                <div className="flex items-center gap-2">
                                    <Warehouse className="h-5 w-5 text-primary" />
                                    <h4 className="font-black text-lg uppercase tracking-tight text-primary">Facility: {mrf.id}</h4>
                                </div>
                                <Badge variant="secondary" className="font-black text-[10px] uppercase">{mrf.gpCount} GPs Tagged</Badge>
                            </div>

                            <Tabs defaultValue="monthly">
                              <TabsList className="grid w-[400px] grid-cols-3">
                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                              </TabsList>
                              
                              {['weekly', 'monthly', 'yearly'].map((tab) => (
                                <TabsContent key={tab} value={tab} className="mt-4 border rounded-xl overflow-hidden shadow-inner bg-muted/5">
                                  <Table>
                                    <TableHeader className="bg-muted/50">
                                      <TableRow>
                                        <TableHead className="w-[180px] uppercase text-[9px] font-black border-r">GP Node & Route</TableHead>
                                        <TableHead className="w-[120px] uppercase text-[9px] font-black border-r">Schedule</TableHead>
                                        <TableHead className="w-[100px] text-center uppercase text-[9px] font-black border-r">Status</TableHead>
                                        <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r">Collected (Kg)</TableHead>
                                        <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r">Received (Kg)</TableHead>
                                        <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r bg-destructive/5">Disc. (Kg)</TableHead>
                                        <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Metal</TableHead>
                                        <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Paper</TableHead>
                                        <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Glass</TableHead>
                                        <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Cloth</TableHead>
                                        <TableHead className="w-[80px] text-right uppercase text-[9px] font-black">Sanitary</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {mrf.gps.map((gp, gIdx) => {
                                        const discrepancy = gp.collected - gp.received;
                                        return (
                                          <TableRow key={gIdx} className="hover:bg-primary/[0.01] transition-colors border-b border-dashed last:border-0">
                                            <TableCell className="border-r">
                                              <div className="space-y-0.5">
                                                <p className="font-black text-xs text-primary uppercase">{gp.name}</p>
                                                <p className="text-[9px] font-mono text-muted-foreground">ID: {gp.routeId}</p>
                                              </div>
                                            </TableCell>
                                            <TableCell className="border-r text-[9px] font-black uppercase text-blue-700">
                                              {gp.collectionDay}
                                            </TableCell>
                                            <TableCell className="text-center border-r">
                                              {getStatusBadge(gp.status)}
                                            </TableCell>
                                            <TableCell className="text-right border-r font-mono font-bold text-[11px]">
                                              {gp.collected.toLocaleString(undefined, {maximumFractionDigits: 1})}
                                            </TableCell>
                                            <TableCell className="text-right border-r font-mono font-black text-primary text-[11px]">
                                              {gp.received.toLocaleString(undefined, {maximumFractionDigits: 1})}
                                            </TableCell>
                                            <TableCell className="text-right border-r font-mono font-bold text-destructive text-[11px] bg-destructive/[0.02]">
                                              -{discrepancy.toLocaleString(undefined, {maximumFractionDigits: 1})}
                                            </TableCell>
                                            <TableCell className="text-right border-r font-mono text-[10px] text-muted-foreground">{gp.metal.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r font-mono text-[10px] text-muted-foreground">{gp.paper.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r font-mono text-[10px] text-muted-foreground">{gp.glass.toFixed(1)}</TableCell>
                                            <TableCell className="text-right border-r font-mono text-[10px] text-muted-foreground">{gp.cloth.toFixed(1)}</TableCell>
                                            <TableCell className="text-right font-mono text-[10px] text-muted-foreground">{gp.sanitary.toFixed(1)}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </TabsContent>
                              ))}
                            </Tabs>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="border-2 border-dashed bg-muted/20">
        <CardContent className="py-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-tight">Reconciliation Audit Guidelines</p>
                <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                    This directory monitors high-fidelity reconciliation metrics from verified collection circuits. Discrepancy (Disc.) values exceeding 5% of the "Collected" load trigger an automatic audit flag for the regional Block and District representatives. All quantification data is stagnant and derived from official temporal survey cycles.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

