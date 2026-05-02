
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mrfData } from "@/lib/mrf-data";
import { useMemo } from "react";
import { Building, Home, Warehouse, MapPinned, Globe } from "lucide-react";

// Helper function to get functionality variant for badge
const getFunctionalityVariant = (functionality: string) => {
    switch (functionality) {
        case 'Functional': return 'default';
        case 'Partial Functional': return 'secondary';
        case 'Non Functional': return 'destructive';
        default: return 'outline';
    }
}

export default function AdminOrganizationStructurePage() {
    const structure = useMemo(() => {
        const state: {
            name: string;
            districts: { [key: string]: { name: string; blocks: { [key: string]: { name: string; ulbs: { [key: string]: { name: string; mrfs: any[] } } } } } }
        } = {
            name: "Odisha",
            districts: {}
        };

        mrfData.forEach(record => {
            // District
            if (!state.districts[record.district]) {
                state.districts[record.district] = { name: record.district, blocks: {} };
            }
            const district = state.districts[record.district];

            // Block
            if (!district.blocks[record.blockCovered]) {
                district.blocks[record.blockCovered] = { name: record.blockCovered, ulbs: {} };
            }
            const block = district.blocks[record.blockCovered];

            // ULB
            if (!block.ulbs[record.ulbName]) {
                block.ulbs[record.ulbName] = { name: record.ulbName, mrfs: [] };
            }
            const ulb = block.ulbs[record.ulbName];

            // MRF - ensure no duplicates
            if (!ulb.mrfs.some(m => m.id === record.mrfId)) {
                ulb.mrfs.push({
                    id: record.mrfId,
                    functionality: record.functionality,
                });
            }
        });
        
        // Convert objects to arrays for mapping
        const districtsArray = Object.values(state.districts).map(d => ({
            ...d,
            blocks: Object.values(d.blocks).map(b => ({
                ...b,
                ulbs: Object.values(b.ulbs).map(u => ({
                    ...u,
                    mrfs: u.mrfs.sort((a,b) => a.id.localeCompare(b.id))
                })).sort((a,b) => a.name.localeCompare(b.name))
            })).sort((a,b) => a.name.localeCompare(b.name))
        })).sort((a, b) => a.name.localeCompare(b.name));

        return {
            ...state,
            districts: districtsArray
        };

    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>State-wide Organization Structure</CardTitle>
                <CardDescription>A complete hierarchical flowchart from the State down to individual MRFs.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto p-4 md:p-8 bg-muted/20 rounded-b-lg">
                <div className="flex flex-col items-center min-w-max pb-8">
                    {/* State Node */}
                    <div className="flex items-center gap-4 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-bold text-lg shadow-xl mb-8">
                        <Globe className="h-6 w-6"/>
                        State of {structure.name}
                    </div>
                    
                    {/* Connector to Districts */}
                    <div className="w-px bg-border h-8"></div>

                    {/* Districts Container */}
                    <div className="relative flex items-start gap-16 px-4">
                        <div className="absolute top-0 h-px bg-border" style={{left: '2%', right: '2%'}}></div>
                        
                        {structure.districts.map((district) => (
                            <div key={district.name} className="relative flex flex-col items-center pt-8">
                                <div className="absolute top-0 w-px h-8 bg-border"></div>
                                {/* District Node */}
                                <div className="bg-card border-2 border-primary/50 rounded-lg px-4 py-2 font-bold shadow-lg text-center text-primary-foreground bg-primary/90 min-w-48">
                                    <MapPinned className="mx-auto mb-1 h-5 w-5"/>
                                    {district.name}
                                </div>
                                <div className="w-px bg-border h-8"></div>

                                {/* Blocks Container */}
                                <div className="relative flex items-start gap-8 px-4">
                                    <div className="absolute top-0 h-px bg-border" style={{left: '5%', right: '5%'}}></div>
                                    
                                    {district.blocks.map((block) => (
                                        <div key={block.name} className="relative flex flex-col items-center pt-8">
                                            <div className="absolute top-0 w-px h-8 bg-border"></div>
                                            {/* Block Node */}
                                            <div className="bg-card border rounded-lg px-4 py-2 font-semibold shadow text-center min-w-48">
                                                <Building className="mx-auto mb-1 h-5 w-5 text-muted-foreground"/>
                                                {block.name}
                                            </div>
                                            <div className="w-px bg-border h-8"></div>

                                            {/* ULBs Container */}
                                            <div className="relative flex flex-col items-center gap-2 px-4">
                                                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border"></div>
                                                
                                                {block.ulbs.map((ulb) => (
                                                    <div key={ulb.name} className="relative flex flex-col items-center pt-8 w-full">
                                                        <div className="absolute top-0 w-full h-px bg-border"></div>
                                                        {/* ULB Node */}
                                                        <div className="bg-card border rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm text-center z-10 w-48">
                                                            <Home className="inline-block mr-2 h-4 w-4 text-muted-foreground"/>
                                                            {ulb.name}
                                                        </div>
                                                        <div className="w-px bg-border h-8"></div>

                                                        {/* MRFs Container */}
                                                        <div className="relative flex flex-col items-center gap-2 w-full">
                                                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border"></div>

                                                            {ulb.mrfs.map((mrf) => (
                                                                <div key={mrf.id} className="relative pt-8 w-full">
                                                                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-border"></div>
                                                                    {/* MRF Node */}
                                                                    <div className="border rounded-md p-2 text-xs bg-background/60 w-44 text-center shadow-sm mx-auto z-10">
                                                                        <p className="font-semibold flex items-center justify-center gap-1.5"><Warehouse className="h-3 w-3"/>{mrf.id}</p>
                                                                        <Badge variant={getFunctionalityVariant(mrf.functionality)} className="mt-1.5">{mrf.functionality}</Badge>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
