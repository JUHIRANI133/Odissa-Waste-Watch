
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, Calendar, Anchor, TrendingUp, BarChart3 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function WasteCollectedContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Personnel';

  // Collection Registry Logic: Starting April 2026
  const registryData = useMemo(() => {
    return [
        {
            year: "2026",
            months: {
                "April 2026": [
                    { date: '2026-04-05', gp: 'Panasa', ulb: 'Kodandapur MRF', generated: 160, collected: 0, plastic: 0, paper: 0, glass: 0, other: 0 },
                    { date: '2026-04-12', gp: 'Chainipur', ulb: 'Kodandapur MRF', generated: 90, collected: 0, plastic: 0, paper: 0, glass: 0, other: 0 },
                ],
                "May 2026": [
                    { date: '2026-05-10', gp: 'Malandapur', ulb: 'Kodandapur MRF', generated: 275, collected: 0, plastic: 0, paper: 0, glass: 0, other: 0 },
                ],
                "December 2026": [
                    { date: '2026-12-15', gp: 'Panasa', ulb: 'Kodandapur MRF', generated: 180, collected: 0, plastic: 0, paper: 0, glass: 0, other: 0 },
                ]
            }
        },
        {
            year: "2027",
            months: {
                "January 2027": [
                    { date: '2027-01-05', gp: 'Nathasahi', ulb: 'Kodandapur MRF', generated: 140, collected: 0, plastic: 0, paper: 0, glass: 0, other: 0 },
                ]
            }
        }
    ];
  }, []);

  const calculateYearlyTotals = (months: any) => {
    const allRecords = Object.values(months).flat() as any[];
    return allRecords.reduce((acc, curr) => ({
        collected: acc.collected + curr.collected,
        generated: acc.generated + curr.generated,
        plastic: acc.plastic + curr.plastic,
        paper: acc.paper + curr.paper,
        glass: acc.glass + curr.glass,
        other: acc.other + curr.other
    }), { collected: 0, generated: 0, plastic: 0, paper: 0, glass: 0, other: 0 });
  };

  return (
    <div className="space-y-12">
      <Card className="border-2 shadow-lg border-primary/20 bg-primary/[0.01]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight text-primary">Nodal Collection Registry</CardTitle>
              <CardDescription className="font-bold">Verified chronological audit (Cycle start: April 2026).</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {registryData.map((yearBlock, yIdx) => (
        <div key={yIdx} className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-primary/20"></div>
                <h2 className="text-4xl font-black text-primary opacity-20">{yearBlock.year}</h2>
                <div className="h-px flex-1 bg-primary/20"></div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {Object.entries(yearBlock.months).map(([month, records], mIdx) => (
                    <AccordionItem value={month} key={mIdx} className="border-none">
                        <Card className="overflow-hidden border-2 shadow-md">
                            <AccordionTrigger className="p-6 hover:no-underline bg-muted/10 data-[state=open]:bg-primary/5 transition-all border-b border-dashed">
                                <div className="flex justify-between w-full pr-8 items-center">
                                    <div className="flex items-center gap-4">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span className="font-black text-xl uppercase tracking-tighter text-foreground">{month}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase leading-none">Collected (Month)</p>
                                            <p className="font-black text-primary text-sm">{records.reduce((s: any, r: any) => s + r.collected, 0).toLocaleString()} KG</p>
                                        </div>
                                        <Badge variant="outline" className="font-bold border-primary/30 text-primary uppercase text-[8px]">{records.length} CIRCUITS</Badge>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <ScrollArea className="w-full">
                                    <Table>
                                        <TableHeader className="bg-muted/80">
                                            <TableRow>
                                                <TableHead className="w-[120px] uppercase text-[9px] font-black border-r">Date</TableHead>
                                                <TableHead className="w-[150px] uppercase text-[9px] font-black border-r">Gram Panchayat</TableHead>
                                                <TableHead className="w-[150px] uppercase text-[9px] font-black border-r">Associated ULB/MRF</TableHead>
                                                <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r bg-muted/5">Generated (Avg)</TableHead>
                                                <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r bg-primary/5 text-primary">Collected</TableHead>
                                                <TableHead className="w-[100px] text-right uppercase text-[9px] font-black border-r">Discrepancy</TableHead>
                                                <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Plastic</TableHead>
                                                <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Paper</TableHead>
                                                <TableHead className="w-[80px] text-right uppercase text-[9px] font-black border-r">Glass</TableHead>
                                                <TableHead className="w-[80px] text-right uppercase text-[9px] font-black">Other</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {records.map((row: any, rIdx: number) => {
                                                const discrepancy = row.generated - row.collected;
                                                return (
                                                    <TableRow key={rIdx} className="hover:bg-muted/20 border-b border-dashed last:border-0">
                                                        <TableCell className="font-mono text-xs font-bold border-r">{row.date}</TableCell>
                                                        <TableCell className="font-black text-[10px] uppercase border-r text-foreground">{row.gp}</TableCell>
                                                        <TableCell className="border-r"><div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase"><Anchor className="h-2.5 w-2.5 opacity-50"/> {row.ulb}</div></TableCell>
                                                        <TableCell className="text-right font-mono font-bold text-xs border-r bg-muted/5">{row.generated.toLocaleString()}</TableCell>
                                                        <TableCell className="text-right font-mono font-black text-xs border-r text-primary bg-primary/[0.02]">{row.collected.toLocaleString()}</TableCell>
                                                        <TableCell className="text-right border-r font-mono text-xs font-black text-muted-foreground">{discrepancy.toLocaleString()}</TableCell>
                                                        <TableCell className="text-right font-mono text-xs border-r text-muted-foreground">{row.plastic}</TableCell>
                                                        <TableCell className="text-right font-mono text-xs border-r text-muted-foreground">{row.paper}</TableCell>
                                                        <TableCell className="text-right font-mono text-xs border-r text-muted-foreground">{row.glass}</TableCell>
                                                        <TableCell className="text-right font-mono text-xs text-muted-foreground">{row.other}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Yearly Audit Report - Automatically triggered after December */}
            {yearBlock.months["December " + yearBlock.year] && (
                <Card className="border-4 border-primary shadow-2xl bg-primary text-primary-foreground overflow-hidden">
                    <CardHeader className="bg-white/10 border-b border-white/20">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-3xl font-black font-headline uppercase tracking-tight">Yearly Audit Report: {yearBlock.year}</CardTitle>
                                <CardDescription className="text-primary-foreground/70 font-bold uppercase text-xs tracking-widest">Cumulative performance audit for the fiscal year</CardDescription>
                            </div>
                            <BarChart3 className="h-12 w-12 opacity-30" />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-10">
                        {(() => {
                            const yearTotals = calculateYearlyTotals(yearBlock.months);
                            return (
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Collected</p>
                                        <p className="text-3xl font-black font-mono">{yearTotals.collected.toLocaleString()} KG</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Discrepancy</p>
                                        <p className="text-3xl font-black font-mono text-red-300">{(yearTotals.generated - yearTotals.collected).toLocaleString()} KG</p>
                                    </div>
                                    <div className="space-y-2 border-l border-white/20 pl-6">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Plastic</p>
                                        <p className="text-2xl font-black font-mono">{yearTotals.plastic.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-2 border-l border-white/20 pl-6">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Paper</p>
                                        <p className="text-2xl font-black font-mono">{yearTotals.paper.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-2 border-l border-white/20 pl-6">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Glass</p>
                                        <p className="text-2xl font-black font-mono">{yearTotals.glass.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-2 border-l border-white/20 pl-6">
                                        <p className="text-[10px] font-black uppercase opacity-60">Total Others</p>
                                        <p className="text-2xl font-black font-mono">{yearTotals.other.toLocaleString()}</p>
                                    </div>
                                </div>
                            );
                        })()}
                        <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                            <p className="text-[10px] font-bold italic opacity-60">Verified by Government of Odisha SWM Portal Temporal Engine</p>
                            <Badge variant="secondary" className="bg-white text-primary font-black uppercase tracking-tight px-4 py-1">FISCAL FINALIZED</Badge>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
      ))}
    </div>
  );
}

export default function WasteCollectedPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center animate-pulse">Syncing chronological registry...</div>}>
        <WasteCollectedContent />
    </Suspense>
  )
}
