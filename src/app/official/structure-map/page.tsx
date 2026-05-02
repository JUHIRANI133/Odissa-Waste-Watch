'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { mrfData } from "@/lib/mrf-data";
import { useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { Building, Home, Warehouse, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { jharsugudaDistrictData } from "@/lib/disJharsuguda";
import { jajpurDistrictData } from "@/lib/disJajpur";
import { bhadrakDistrictData } from "@/lib/disBhadrak";
import { bargarhDistrictData } from "@/lib/disBargarh";
import { sonepurDistrictData } from "@/lib/disSonepur";
import { angulDistrictData } from "@/lib/disAngul";
import { balangirDistrictData } from "@/lib/disBalangir";
import { boudhDistrictData } from "@/lib/disBoudh";
import { cuttackDistrictData } from "@/lib/disCuttack";
import { deogarhDistrictData } from "@/lib/disDeogarh";
import { dhenkanalDistrictData } from "@/lib/disDhenkanal";
import { gajapatiDistrictData } from "@/lib/disGajapati";
import { ganjamDistrictData } from "@/lib/disGanjam";
import { jagatsinghpurDistrictData } from "@/lib/disJagatsinghpur";
import { kalahandiDistrictData } from "@/lib/disKalahandi";
import { kandhamalDistrictData } from "@/lib/disKandhamal";
import { kendraparaDistrictData } from "@/lib/disKendrapara";
import { kendujharDistrictData } from "@/lib/disKendujhar";
import { balasoreDistrictData } from "@/lib/disBalasore";
import { baleswarDistrictData } from "@/lib/disBaleswar";
import { khordhaDistrictData } from "@/lib/disKhordha";
import { koraputDistrictData } from "@/lib/disKoraput";
import { malkangiriDistrictData } from "@/lib/disMalkangiri";
import { mayurbhanjDistrictData } from "@/lib/disMayurbhanj";

interface GPSummary {
  name: string;
  active: boolean;
  generated: number;
  collected: number;
}

interface BlockSummary {
  name: string;
  gps: GPSummary[];
}

interface StructureData {
  district: string;
  blocks: BlockSummary[];
  totalDistrictGenerated: number;
  totalDistrictCollected: number;
}

function StructureMapContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const districtName = searchParams.get('district') || 'Bhadrak';
  const [mounted, setMounted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [firestoreData, setFirestoreData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataInitialized, setDataInitialized] = useState(false);

  const db = useFirestore();

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // Real-time Firestore listener for GP data
  useEffect(() => {
    if (!db || !districtName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const gpQuery = query(
      collection(db, 'gpInformation'),
      where('district', '==', districtName)
    );

    const unsubscribe = onSnapshot(gpQuery,
      (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setFirestoreData(data);
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
          description: "Unable to sync with server. Using local data.",
          variant: "destructive"
        });
      }
    );

    return () => unsubscribe();
  }, [db, districtName, toast, dataInitialized]);

  const structure = useMemo(() => {
    if (!mounted) return null;
    
    const districtRecords = mrfData.filter(d => d.district.toLowerCase() === districtName.toLowerCase());
    if (districtRecords.length === 0) return null;

    const districtsSourceMap: Record<string, any> = {
      'jajpur': jajpurDistrictData, 'bhadrak': bhadrakDistrictData, 'jharsuguda': jharsugudaDistrictData,
      'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'angul': angulDistrictData,
      'balangir': balangirDistrictData, 'boudh': boudhDistrictData, 'cuttack': cuttackDistrictData,
      'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData, 'gajapati': gajapatiDistrictData,
      'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData, 'kalahandi': kalahandiDistrictData,
      'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData,
      'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 'khordha': khordhaDistrictData,
      'koraput': koraputDistrictData, 'malkangiri': malkangiriDistrictData, 'mayurbhanj': mayurbhanjDistrictData
    };

    const source = districtsSourceMap[districtName.toLowerCase()];
    if (!source) return null;

    const blocksData: { [key: string]: { name: string, records: typeof mrfData, gps: any[] } } = {};
    districtRecords.forEach(r => { 
      if (!blocksData[r.blockCovered]) {
        blocksData[r.blockCovered] = { name: r.blockCovered, records: [], gps: [] }; 
      }
      blocksData[r.blockCovered].records.push(r); 
    });

    Object.values(blocksData).forEach(blockInfo => {
      const blockDetails = source.getBlockDetails(blockInfo.name);
      if (blockDetails?.gps) {
        blockInfo.gps = blockDetails.gps.map((gp: any) => {
          // Check Firestore data first
          const firestoreGP = firestoreData.find(fg => fg.gpName?.toLowerCase() === gp.gpName?.toLowerCase());
          
          let collected = 0;
          if (firestoreGP) {
            collected = firestoreGP.monthlyWaste / 1000 || 0;
          } else {
            const w = blockDetails.waste.find((waste: any) => waste.gpName.toLowerCase() === gp.gpName.toLowerCase());
            collected = w ? (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000) || 0) : 0;
          }
          
          return { 
            name: gp.gpName, 
            active: collected > 0, 
            generated: collected * 1.05, 
            collected 
          };
        });
      }
    });

    const blocks = Object.values(blocksData).map(b => ({ 
      name: b.name, 
      gps: b.gps 
    }));
    
    return {
      district: districtName,
      blocks,
      totalDistrictGenerated: blocks.reduce((t, b) => t + b.gps.reduce((bt: number, g: any) => bt + g.generated, 0), 0),
      totalDistrictCollected: blocks.reduce((t, b) => t + b.gps.reduce((bt: number, g: any) => bt + g.collected, 0), 0)
    };
  }, [districtName, mounted, firestoreData]);

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

  if (!mounted || (!structure && loading && !dataInitialized)) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Aggregating structure map...</p>
        </div>
      </div>
    );
  }
  
  if (!structure) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-semibold">No data found for {districtName}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-headline uppercase tracking-tight">
                District Master Hierarchy: {structure.district}
              </CardTitle>
              <CardDescription>
                Visual representation of district structure with GP waste collection data
              </CardDescription>
            </div>
            <Button 
              onClick={handleManualRefresh} 
              variant="outline"
              className="font-black uppercase tracking-widest h-11"
              disabled={syncing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} /> 
              Sync Now
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8 overflow-x-auto bg-muted/5">
          <div className="flex flex-col items-center min-w-[800px] px-4 md:px-8 pb-12">
            {/* District Node */}
            <div className="flex flex-col items-center gap-2 bg-primary text-primary-foreground rounded-2xl px-12 py-6 font-black text-3xl mb-12 border-4 border-primary-foreground/10 shadow-xl">
              <Warehouse className="h-10 w-10 mb-2" />
              {structure.district}
              <div className="flex gap-4 mt-3">
                <Badge variant="secondary" className="text-sm font-mono px-4 py-1.5 rounded-lg">
                  {(structure.totalDistrictGenerated / 1000).toFixed(1)}T LOAD
                </Badge>
                <Badge variant="secondary" className="text-sm font-mono px-4 py-1.5 rounded-lg">
                  {(structure.totalDistrictCollected / 1000).toFixed(1)}T VERI.
                </Badge>
              </div>
            </div>

            {/* Blocks Container */}
            <div className="flex justify-center gap-8 md:gap-12 flex-wrap lg:flex-nowrap">
              {structure.blocks.map((block: BlockSummary, blockIdx: number) => (
                <div key={block.name} className="flex flex-col items-center relative">
                  {/* Connecting line from district to block */}
                  <div className="w-0.5 h-8 bg-primary/30"></div>
                  
                  {/* Block Node */}
                  <div className="bg-card border-2 border-primary/30 rounded-xl px-8 py-4 font-black shadow-lg min-w-[200px] text-center">
                    <Home className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <span className="text-base uppercase tracking-tighter text-primary">{block.name}</span>
                  </div>
                  
                  {/* Connecting line from block to GPs */}
                  <div className="w-0.5 h-6 bg-primary/20"></div>
                  
                  {/* GPs Container */}
                  <div className="relative flex flex-col gap-3 min-w-[180px]">
                    {block.gps.map((gp: GPSummary, gpIdx: number) => (
                      <div key={gpIdx} className="relative flex flex-col items-center">
                        <div className="bg-card border rounded-lg p-3 text-center shadow-md w-44">
                          <p className="font-bold text-xs uppercase truncate">{gp.name}</p>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className={`w-3 h-3 rounded-full ${gp.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                            <span className="text-[9px] font-mono text-muted-foreground">
                              {gp.collected.toFixed(0)} kg
                            </span>
                          </div>
                        </div>
                        {gpIdx < block.gps.length - 1 && (
                          <div className="w-0.5 h-3 bg-primary/10"></div>
                        )}
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

export default function StructureMapPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading structure map...</p>
        </div>
      </div>
    }>
      <StructureMapContent />
    </Suspense>
  );
}