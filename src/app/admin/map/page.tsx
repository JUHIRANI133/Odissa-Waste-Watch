
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronsRight, Building, Home, Warehouse } from "lucide-react";
import { useMemo } from "react";
import { mrfData } from "@/lib/mrf-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GPMapPage() {
    const structureByDistrict = useMemo(() => {
        const districts: { [key: string]: { name: string, blocks: { [key: string]: { name: string, ulbs: Set<string>, gps: number } } } } = {};

        mrfData.forEach(record => {
            if (!districts[record.district]) {
                districts[record.district] = { name: record.district, blocks: {} };
            }
            if (!districts[record.district].blocks[record.blockCovered]) {
                districts[record.district].blocks[record.blockCovered] = { name: record.blockCovered, ulbs: new Set(), gps: 0 };
            }
            districts[record.district].blocks[record.blockCovered].ulbs.add(record.ulbName);
            districts[record.district].blocks[record.blockCovered].gps += record.gpsCovered;
        });
        return Object.values(districts);
    }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizational Structure Map</CardTitle>
        <CardDescription>Hierarchical chart showing District → Block → GP → Tagged ULB.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible defaultValue="item-0">
          {structureByDistrict.map((district, index) => (
             <AccordionItem value={`item-${index}`} key={district.name}>
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <Building className="h-6 w-6 text-primary"/>
                        <span className="text-xl font-bold">{district.name} District</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-4 border-l-2 border-primary ml-3 space-y-6 pt-4">
                    {Object.values(district.blocks).map(block => (
                        <div key={block.name} className="relative">
                            <div className="absolute -left-[19px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>
                            <h3 className="text-md font-semibold mb-2 flex items-center gap-2"><Home className="h-5 w-5 text-muted-foreground"/> Block: {block.name}</h3>

                            <div className="pl-6 space-y-3">
                                <div className="flex items-center gap-4 p-3 rounded-lg border bg-muted/50">
                                    <Home className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-semibold">{block.gps}</span>
                                    <span className="text-sm text-muted-foreground">Gram Panchayats Covered</span>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <ChevronsRight className="h-5 w-5 text-primary"/>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-primary">Tagged ULBs:</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {Array.from(block.ulbs).map(ulb => (
                                                <Badge key={ulb} variant="secondary" className="flex items-center gap-1">
                                                   <Warehouse className="h-3 w-3"/>
                                                   {ulb}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

