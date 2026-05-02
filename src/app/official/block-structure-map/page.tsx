'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState, useEffect } from "react";
import { Network, Warehouse, MapPin, Loader2, Building2, Trash2, Database } from "lucide-react";
import { mrfData, MrfData } from "@/lib/mrf-data";
import { useFirestore } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  block?: string;
  lastUpdated?: string;
  isFromFirestore?: boolean;
  firestoreId?: string;
  active?: boolean;
}

function BlockStructureMapContent() {
    const searchParams = useSearchParams();
    const blockNameParam = searchParams.get('block') || '';
    const districtParam = searchParams.get('district') || '';
    const [mounted, setMounted] = useState(false);
    const [firestoreGps, setFirestoreGps] = useState<GPRecord[]>([]);
    const [loadingFirestore, setLoadingFirestore] = useState(true);
    
    const db = useFirestore();

    useEffect(() => { 
        setMounted(true);
    }, []);

    // Fetch GP Information from Firestore
    useEffect(() => {
        const fetchFirestoreGPs = async () => {
            if (!db || !blockNameParam) {
                setLoadingFirestore(false);
                return;
            }
            
            try {
                const gpsQuery = query(
                    collection(db, 'gpInformation'),
                    where('block', '==', blockNameParam)
                );
                
                const querySnapshot = await getDocs(gpsQuery);
                const gps: GPRecord[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (!data.isDeleted) {
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
                            block: data.block || '',
                            lastUpdated: data.lastUpdated || '',
                            isFromFirestore: true,
                            active: (data.monthlyWaste || 0) > 0
                        });
                    }
                });
                setFirestoreGps(gps);
            } catch (error) {
                console.error("Error fetching Firestore GP data:", error);
            } finally {
                setLoadingFirestore(false);
            }
        };
        
        fetchFirestoreGPs();
    }, [db, blockNameParam]);
    
    const structure = useMemo(() => {
        if (!mounted || !blockNameParam) return null;
        
        try {
            // Filter MRF data by block
            const blockRecords = mrfData.filter(d => 
                d.blockCovered.toLowerCase() === blockNameParam.toLowerCase() && 
                (!districtParam || d.district.toLowerCase() === districtParam.toLowerCase())
            );
            
            if (blockRecords.length === 0) return null;
            
            const districtOfBlock = blockRecords[0].district;
            const districtsSourceMap: Record<string, any> = {
                'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData,
                'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData,
                'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
                'bargarh': bargarhDistrictData, 'boudh': boudhDistrictData, 'cuttack': cuttackDistrictData,
                'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData, 'gajapati': gajapatiDistrictData,
                'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData, 'sonepur': sonepurDistrictData,
                'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
                'koraput': koraputDistrictData, 'malkangiri': malkangiriDistrictData, 'mayurbhanj': mayurbhanjDistrictData,
                'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData, 'nayagarh': nayagarhDistrictData,
                'nuapada': nuapadaDistrictData, 'puri': puriDistrictData, 'sambalpur': sambalpurDistrictData
            };

            const source = districtsSourceMap[districtOfBlock.toLowerCase()];
            if (!source) return null;

            const blockDetails = source.getBlockDetails(blockNameParam);
            
            // Create a map of GPS from Firestore for easy lookup
            const firestoreGpsMap = new Map();
            firestoreGps.forEach(gp => {
                firestoreGpsMap.set(gp.gpName.toLowerCase(), gp);
            });

            // Group by ULB
            const ulbs: { [key: string]: { name: string; mrfs: any[] } } = {};

            blockRecords.forEach(record => {
                if (!ulbs[record.ulbName]) {
                    ulbs[record.ulbName] = { name: record.ulbName, mrfs: [] };
                }
                
                // Find GPS from either local data or Firestore
                let mrfGps = [];
                
                // First try to get GPS from Firestore for this MRF
                const firestoreGpsForMrf = firestoreGps.filter(gp => 
                    gp.mrfName?.toLowerCase() === record.mrfId.toLowerCase() ||
                    gp.mrfName?.toLowerCase().includes(record.mrfId.toLowerCase())
                );
                
                if (firestoreGpsForMrf.length > 0) {
                    // Use Firestore GP data
                    mrfGps = firestoreGpsForMrf.map(gp => ({
                        name: gp.gpName,
                        active: gp.active || false,
                        households: gp.households,
                        monthlyWaste: gp.monthlyWaste,
                        source: 'firestore'
                    }));
                } else if (blockDetails?.gps) {
                    // Fallback to local data
                    mrfGps = blockDetails.gps
                        .filter((gp: any) => 
                            gp.taggedMrf?.toLowerCase().includes(record.mrfId.toLowerCase()) || 
                            record.mrfId.toLowerCase().includes(gp.taggedMrf?.toLowerCase())
                        )
                        .map((lgp: any) => ({
                            name: lgp.gpName,
                            active: (blockDetails?.waste?.find((w: any) => w.gpName?.toLowerCase() === lgp.gpName?.toLowerCase())?.totalWasteKg || 0) > 0,
                            households: blockDetails?.waste?.find((w: any) => w.gpName?.toLowerCase() === lgp.gpName?.toLowerCase())?.totalHouseholds || 0,
                            monthlyWaste: blockDetails?.waste?.find((w: any) => w.gpName?.toLowerCase() === lgp.gpName?.toLowerCase())?.totalWasteKg || 0,
                            source: 'local'
                        }));
                }
                
                ulbs[record.ulbName].mrfs.push({ 
                    id: record.mrfId, 
                    functionality: record.functionality,
                    categoryOfUlb: record.categoryOfUlb,
                    gpsCovered: record.gpsCovered,
                    households: record.households,
                    dryWasteKg: record.dryWasteKg,
                    gps: mrfGps,
                    sourceData: firestoreGpsForMrf.length > 0 ? 'firestore' : 'local'
                });
            });

            return { 
                block: blockNameParam, 
                district: districtOfBlock,
                ulbs: Object.values(ulbs),
                totalHouseholds: blockRecords.reduce((sum, r) => sum + r.households, 0),
                totalDryWaste: blockRecords.reduce((sum, r) => sum + r.dryWasteKg, 0),
                totalGps: blockRecords.reduce((sum, r) => sum + r.gpsCovered, 0),
                firestoreGpsCount: firestoreGps.length
            };
        } catch (err) {
            console.error("Error building structure:", err);
            return null;
        }
    }, [blockNameParam, districtParam, mounted, firestoreGps]);

    if (!mounted || loadingFirestore) {
        return (
            <div className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground animate-pulse">Aggregating block structure map...</p>
            </div>
        );
    }

    if (!structure) {
        return (
            <Card className="border-2 border-yellow-200 bg-yellow-50">
                <CardContent className="p-12 text-center">
                    <MapPin className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <p className="text-yellow-600 font-black mb-2">No Structure Data Available</p>
                    <p className="text-sm text-muted-foreground">
                        No MRF records found for block: <span className="font-bold">{blockNameParam || 'Not specified'}</span>
                        {districtParam && ` in district: ${districtParam}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                        Please check the block name or select a different block.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-primary/[0.01]">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Network className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">Block Hierarchy Mapping</CardTitle>
                            <CardDescription>Verified structural linkage of GPs to respective Processing Facilities (MRFs).</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="border-2 border-primary/10 bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-4 text-center">
                        <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-black">{structure.ulbs.length}</p>
                        <p className="text-[10px] font-black uppercase text-muted-foreground">ULBs Covered</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-primary/10 bg-gradient-to-br from-green-50 to-white">
                    <CardContent className="p-4 text-center">
                        <Warehouse className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-black">{structure.ulbs.reduce((sum, ulb: any) => sum + ulb.mrfs.length, 0)}</p>
                        <p className="text-[10px] font-black uppercase text-muted-foreground">MRF Facilities</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-primary/10 bg-gradient-to-br from-purple-50 to-white">
                    <CardContent className="p-4 text-center">
                        <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-black">{structure.totalGps}</p>
                        <p className="text-[10px] font-black uppercase text-muted-foreground">GPs Covered</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-primary/10 bg-gradient-to-br from-orange-50 to-white">
                    <CardContent className="p-4 text-center">
                        <Trash2 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-black">{(structure.totalDryWaste / 1000).toFixed(1)}T</p>
                        <p className="text-[10px] font-black uppercase text-muted-foreground">Annual Dry Waste</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-primary/10 bg-gradient-to-br from-teal-50 to-white">
                    <CardContent className="p-4 text-center">
                        <Database className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                        <p className="text-2xl font-black">{structure.firestoreGpsCount}</p>
                        <p className="text-[10px] font-black uppercase text-muted-foreground">Synced GPs</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b py-4">
                    <div className="text-center">
                        <CardTitle className="text-4xl font-black text-primary uppercase tracking-tighter">
                            {structure.block} Block Node
                        </CardTitle>
                        <CardDescription className="font-bold">
                            District: {structure.district}
                            {structure.firestoreGpsCount > 0 && (
                                <Badge className="ml-2 bg-green-100 text-green-700">
                                    {structure.firestoreGpsCount} GPS from GP Information Portal
                                </Badge>
                            )}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="overflow-x-auto p-10 bg-card/50">
                    <div className="flex flex-col items-center min-w-max pb-16 space-y-16">
                        <div className="flex justify-center gap-20 flex-wrap relative">
                            {structure.ulbs.map((ulb: any, idx: number) => (
                                <div key={idx} className="flex flex-col items-center space-y-10">
                                    <div className="bg-primary text-primary-foreground px-12 py-6 rounded-2xl shadow-xl border-4 border-primary/20">
                                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Urban Local Body</p>
                                        <p className="text-2xl font-black uppercase">{ulb.name}</p>
                                        <Badge className="mt-2 bg-white/20 text-white text-[8px]">
                                            {ulb.mrfs[0]?.categoryOfUlb || 'Non Amrut Town'}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex gap-16 flex-wrap justify-center relative pt-4">
                                        {ulb.mrfs.map((mrf: any, mrfIdx: number) => (
                                            <div key={mrfIdx} className="flex flex-col items-center space-y-8">
                                                <div className="bg-card border-4 border-dashed border-primary/30 p-8 rounded-[2rem] shadow-lg w-[380px] text-center relative">
                                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background border-2 border-primary/20 px-4 py-1 rounded-full text-[10px] font-black text-primary uppercase">
                                                        Facility Node {mrf.sourceData === 'firestore' && 
                                                            <Badge className="ml-1 bg-green-500 text-[6px]">Live</Badge>
                                                        }
                                                    </div>
                                                    <p className="text-xl font-black text-primary uppercase flex items-center justify-center gap-2">
                                                        <Warehouse className="h-5 w-5" /> {mrf.id}
                                                    </p>
                                                    <div className="mt-3 space-y-1">
                                                        <Badge className={`mt-2 uppercase text-[9px] font-black ${mrf.functionality === 'Functional' ? 'bg-green-600' : mrf.functionality === 'Partial Functional' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                                                            {mrf.functionality}
                                                        </Badge>
                                                        <div className="text-[8px] text-muted-foreground mt-2">
                                                            <p>GPS Covered: {mrf.gps.length}</p>
                                                            <p>Households: {mrf.households.toLocaleString()}</p>
                                                            <p>Dry Waste: {(mrf.dryWasteKg / 1000).toFixed(1)}T/year</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 p-6 border-2 border-primary/10 bg-muted/5 rounded-[3rem] w-full max-w-[400px]">
                                                    {mrf.gps && mrf.gps.length > 0 ? (
                                                        mrf.gps.map((gp: any, gpIdx: number) => (
                                                            <div key={gpIdx} className="bg-background border-2 rounded-2xl p-4 text-center shadow-md group hover:border-primary/40 transition-all">
                                                                <div className="flex items-center justify-between gap-3 mb-2">
                                                                    <div className={`h-2 w-2 rounded-full ${gp.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                                                    <Badge variant="outline" className="text-[8px] font-bold uppercase">
                                                                        {gp.active ? 'Active' : 'Pending'}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-[10px] font-black uppercase text-foreground leading-tight break-words">
                                                                    {gp.name}
                                                                </p>
                                                                {gp.source === 'firestore' && gp.monthlyWaste > 0 && (
                                                                    <p className="text-[6px] text-primary mt-1">
                                                                        {(gp.monthlyWaste / 1000).toFixed(1)} kg/month
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="col-span-2 text-center py-6">
                                                            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                            <p className="text-[10px] italic text-muted-foreground">No GPs tagged to this facility</p>
                                                            <p className="text-[8px] text-muted-foreground mt-1">Expected GPs: {mrf.gpsCovered}</p>
                                                        </div>
                                                    )}
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
        </div>
    );
}

export default function BlockStructureMapPage() {
    return (
        <Suspense fallback={
            <div className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading block structure...</p>
            </div>
        }>
            <BlockStructureMapContent />
        </Suspense>
    );
}