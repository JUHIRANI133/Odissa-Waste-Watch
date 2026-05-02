'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Navigation, Anchor, MapPin, Download, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query } from "firebase/firestore";

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

export default function AdminRoutePlanningPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const db = useFirestore();
  const { data: firestoreRoutes = [] } = useCollection(db ? query(collection(db, 'routePlans')) : null);

  useEffect(() => { setMounted(true); }, []);

  const masterRouteDirectory = useMemo(() => {
    if (!mounted) return [];
    const districtSources = [
      angulDistrictData, balangirDistrictData, balasoreDistrictData, baleswarDistrictData,
      bargarhDistrictData, bhadrakDistrictData, boudhDistrictData, cuttackDistrictData,
      deogarhDistrictData, dhenkanalDistrictData, gajapatiDistrictData, ganjamDistrictData,
      jagatsinghpurDistrictData, jajpurDistrictData, jharsugudaDistrictData, kalahandiDistrictData,
      kandhamalDistrictData, kendraparaDistrictData, kendujharDistrictData, sonepurDistrictData
    ];

    return districtSources.map(source => {
      const routes = source.data.routes || [];
      const overrides = firestoreRoutes.filter((f: any) => f.district === source.district);
      
      const enrichedRoutes = routes.map(route => {
        const override = overrides.find((o: any) => o.routeId === route.routeId);
        return {
          ...route,
          startingGp: override?.startingGp || route.startingGp,
          finalGp: override?.finalGp || route.finalGp,
          destination: override?.destination || route.destination,
          totalDistance: override?.totalDistance || route.totalDistance,
          schedule: override?.scheduledOn || (route as any).scheduledOn || "Scheduled"
        };
      });

      return {
        districtName: source.district,
        routes: enrichedRoutes
      };
    }).filter(d => d.routes.length > 0);
  }, [mounted, firestoreRoutes]);

  const filteredDirectory = useMemo(() => {
    if (!search) return masterRouteDirectory;
    return masterRouteDirectory.filter(d => 
        d.districtName.toLowerCase().includes(search.toLowerCase()) ||
        d.routes.some(r => r.routeId?.toLowerCase().includes(search.toLowerCase()) || r.startingGp?.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, masterRouteDirectory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (val.length > 2) {
        const match = masterRouteDirectory.find(d => 
            d.districtName.toLowerCase().includes(val.toLowerCase()) ||
            d.routes.some(r => r.routeId?.toLowerCase().includes(val.toLowerCase()))
        );
        if (match) {
            const el = document.getElementById(`route-${match.districtName}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  };

  if (!mounted) return <div className="p-12 text-center text-muted-foreground animate-pulse">Syncing route intelligence...</div>;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-primary/[0.01]">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <Navigation className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-bold font-headline uppercase tracking-tight text-primary">State-wide Route Planning Directory</CardTitle>
                <CardDescription className="text-lg font-medium">Consolidated Logistical Paths Linking GP Segregation Points to MRFs.</CardDescription>
              </div>
            </div>
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search District or Route ID..." 
                    className="pl-9 h-11 border-2 border-primary/20 focus:border-primary transition-all"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-10">
        {filteredDirectory.map((district) => (
          <Card key={district.districtName} id={`route-${district.districtName}`} className="border-2 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/40 border-b py-3 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-tighter text-foreground">{district.districtName} District</h3>
                </div>
                <Badge variant="outline" className="font-bold border-primary/30 text-primary uppercase text-[10px] bg-primary/5 px-3">
                  {district.routes.length} Verified Circuits
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[140px] uppercase text-[10px] font-black tracking-widest text-center border-r">Route ID</TableHead>
                    <TableHead className="uppercase text-[10px] font-black tracking-widest border-r px-6">Logistical Path (Start &rarr; Final)</TableHead>
                    <TableHead className="w-[200px] uppercase text-[10px] font-black tracking-widest border-r px-6">Target Facility (MRF)</TableHead>
                    <TableHead className="w-[200px] uppercase text-[10px] font-black tracking-widest text-center border-r">Collection Schedule</TableHead>
                    <TableHead className="w-[100px] text-right uppercase text-[10px] font-black tracking-widest pr-6">Dist (Km)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {district.routes.map((route, idx) => (
                    <TableRow key={idx} className="hover:bg-primary/[0.02] border-b border-dashed last:border-0 transition-colors">
                      <TableCell className="text-center border-r">
                        <p className="font-mono text-xs font-black text-primary">{route.routeId}</p>
                      </TableCell>
                      <TableCell className="border-r px-6">
                        <div className="flex flex-col gap-0.5 max-w-[400px]">
                          <p className="text-xs font-black text-green-700 uppercase tracking-tight">{route.startingGp}</p>
                          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground italic font-medium truncate py-0.5">
                            <Navigation className="h-2.5 w-2.5 opacity-40" />
                            {Array.isArray(route.intermediateGps) ? 
                              route.intermediateGps.map(igp => typeof igp === 'string' ? igp : igp.name || igp).join(' → ') : 
                              'Direct Circuit'
                            }
                          </div>
                          <p className="text-xs font-black text-blue-700 uppercase tracking-tight">{route.finalGp || route.destination}</p>
                        </div>
                      </TableCell>
                      <TableCell className="border-r px-6">
                        <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                          <Anchor className="h-3.5 w-3.5 text-primary shrink-0 opacity-70" />
                          <span className="truncate uppercase tracking-tighter">{route.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <Badge variant="secondary" className="text-[9px] font-black uppercase bg-blue-50 text-blue-800 border-blue-100 whitespace-nowrap px-2.5 py-1">
                          {route.schedule}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-black text-xs text-primary pr-6">
                        {route.totalDistance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
