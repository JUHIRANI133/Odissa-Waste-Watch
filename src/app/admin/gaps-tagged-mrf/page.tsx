'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { mrfData } from "@/lib/mrf-data";
import { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Warehouse, Home, ClipboardList, Layers } from "lucide-react";

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

export default function InformationAboutMrfAndGpsPage() {
  const masterStructure = useMemo(() => {
    // Map of district keys to their data sources for GP resolution
    const districtSources: Record<string, any> = {
      'Angul': angulDistrictData,
      'Balangir': balangirDistrictData,
      'Bhadrak': bhadrakDistrictData,
      'Bargarh': bargarhDistrictData,
      'Sonepur': sonepurDistrictData,
      'Boudh': boudhDistrictData,
      'Cuttack': cuttackDistrictData,
      'Deogarh': deogarhDistrictData,
      'Dhenkanal': dhenkanalDistrictData,
      'Gajapati': gajapatiDistrictData,
      'Ganjam': ganjamDistrictData,
      'Jagatsinghpur': jagatsinghpurDistrictData,
      'Jajpur': jajpurDistrictData,
      'Jharsuguda': jharsugudaDistrictData,
      'Kalahandi': kalahandiDistrictData,
      'Kandhamal': kandhamalDistrictData,
      'Kendrapara': kendraparaDistrictData,
      'Kendujhar': kendujharDistrictData,
      'Balasore': balasoreDistrictData,
      'Baleswar': baleswarDistrictData
    };

    // Group MRF Data by District
    const districts = Array.from(new Set(mrfData.map(m => m.district))).sort();

    return districts.map(districtName => {
      const mrfsInDistrict = mrfData.filter(m => m.district === districtName);
      const source = districtSources[districtName];
      const uniqueBlocks = Array.from(new Set(mrfsInDistrict.map(m => m.blockCovered))).sort();
      
      const mrfDetails = mrfsInDistrict.map(mrf => {
        // Resolve GPs for this specific MRF from the district library using high-fidelity mapping
        const linkedGps = source?.data?.gpMappings?.filter((gp: any) => 
          gp.taggedMrf.toLowerCase().includes(mrf.mrfId.toLowerCase()) || 
          mrf.mrfId.toLowerCase().includes(gp.taggedMrf.toLowerCase())
        ) || [];

        return {
          ...mrf,
          taggedGps: linkedGps.map((g: any) => g.gpName)
        };
      });

      const totalGps = mrfDetails.reduce((sum, m) => sum + m.taggedGps.length, 0);
      const totalHh = mrfDetails.reduce((sum, m) => sum + m.households, 0);

      return {
        name: districtName,
        totalGps,
        totalHh,
        blocks: uniqueBlocks,
        mrfs: mrfDetails
      };
    });
  }, []);

  const getFunctionalityVariant = (functionality: string) => {
    switch (functionality) {
      case 'Functional': return 'default';
      case 'Partial Functional': return 'secondary';
      case 'Not Functional': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-primary/[0.01]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Warehouse className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold font-headline uppercase tracking-tight">Information about MRFs and its Associated GPs</CardTitle>
              <CardDescription className="text-lg">State-wide unified directory of Material Recovery Facilities and their constituent Gram Panchayat nodes across 20 districts.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={masterStructure[0]?.name}>
        {masterStructure.map((district) => (
          <AccordionItem value={district.name} key={district.name} className="border-none">
            <Card className="overflow-hidden border-2 shadow-sm">
              <AccordionTrigger className="p-6 hover:no-underline bg-muted/10 data-[state=open]:bg-primary/5 transition-all">
                <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-4">
                      <Building className="h-6 w-6 text-primary" />
                      <span className="font-black text-xl uppercase tracking-tighter text-foreground">{district.name} District</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Layers className="h-3 w-3 text-muted-foreground" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate max-w-[400px]">
                            Blocks: {district.blocks.join(", ")}
                        </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 pr-4">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total GPs Tagged</p>
                      <p className="font-black text-primary text-lg">{district.totalGps}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Households</p>
                      <p className="font-black text-foreground text-lg">{district.totalHh.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[60px] text-center uppercase text-[10px] font-black">Sl.</TableHead>
                                <TableHead className="w-[180px] uppercase text-[10px] font-black">MRF Identity</TableHead>
                                <TableHead className="w-[150px] uppercase text-[10px] font-black">ULB / Block</TableHead>
                                <TableHead className="w-[120px] uppercase text-[10px] font-black">Facility Status</TableHead>
                                <TableHead className="w-[100px] text-right uppercase text-[10px] font-black">HH Covered</TableHead>
                                <TableHead className="uppercase text-[10px] font-black">Associated Gram Panchayats</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {district.mrfs.map((mrf, idx) => (
                                <TableRow key={idx} className="hover:bg-muted/20 align-top border-b border-dashed last:border-0">
                                    <TableCell className="text-center font-bold text-xs text-muted-foreground">{idx + 1}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="font-black text-primary text-sm uppercase tracking-tight">{mrf.mrfId}</p>
                                            <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 border-primary/20 bg-primary/5">{mrf.categoryOfUlb}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-[10px] space-y-1">
                                            <p className="font-bold flex items-center gap-1"><Building className="h-3 w-3 text-muted-foreground"/> {mrf.ulbName}</p>
                                            <p className="font-medium flex items-center gap-1 text-muted-foreground"><Home className="h-3 w-3"/> {mrf.blockCovered} Block</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getFunctionalityVariant(mrf.functionality)} className="text-[9px] uppercase font-black px-2">
                                            {mrf.functionality}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-bold text-sm">
                                        {mrf.households.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <ScrollArea className="h-[120px] w-full rounded-md border bg-muted/5 p-2">
                                            <div className="flex flex-wrap gap-1.5">
                                                {mrf.taggedGps.length > 0 ? mrf.taggedGps.map((gp, gIdx) => (
                                                    <span key={gIdx} className="text-[10px] font-bold uppercase bg-background text-foreground border rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm">
                                                        {gp}
                                                    </span>
                                                )) : (
                                                    <span className="text-[10px] italic text-muted-foreground">No GP roster resolved for this facility.</span>
                                                )}
                                            </div>
                                        </ScrollArea>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
      
      <Card className="border-2 border-dashed bg-muted/20">
        <CardContent className="py-6 flex items-start gap-4">
            <ClipboardList className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-tight">Institutional Mapping Guidelines</p>
                <p className="text-xs text-muted-foreground font-medium italic">
                    This directory is optimized for state-wide logistical synchronization. All Gram Panchayats listed are officially mapped to their respective processing nodes as per the latest steering committee finalization across all 20 districts. Waste quantification metrics and collection schedules are monitored separately via the "Waste Collection Details" hub.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
