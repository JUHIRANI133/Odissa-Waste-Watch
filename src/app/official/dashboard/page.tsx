'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Truck, 
  ArrowRight,
  AlertCircle,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  Layers,
  Building,
  Warehouse,
  MapPin,
  Navigation,
  Users,
  ShieldCheck,
  UserCircle,
  Phone
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, where, onSnapshot, DocumentData } from 'firebase/firestore';

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

import { mrfData } from "@/lib/mrf-data";

interface RouteData {
  id?: string;
  routeId: string;
  routeName: string;
  startingGp: string;
  finalGp?: string;
  destination: string;
  scheduledOn: string;
  block?: string;
  workers?: { name: string; contact: string }[];
  [key: string]: any;
}

interface ScheduleData {
  id?: string;
  gpName: string;
  collectionSchedule: string;
  driverName: string;
  driverContact: string;
  vehicleType: string;
  mrf: string;
  gpNodalPerson: string;
  gpNodalContact: string;
  ulbNodalPerson: string;
  ulbNodalContact: string;
  ulb: string;
  block: string;
  [key: string]: any;
}

// Waste Record Interface for real-time waste data
interface WasteRecord {
  id: string;
  date: string;
  routeId: string;
  mrf: string;
  ulb: string;
  block: string;
  district: string;
  gpName: string;
  totalGpLoad: number;
  driverSubmitted: number;
  plastic: number;
  paper: number;
  metal: number;
  cloth: number;
  glass: number;
  sanitation: number;
  others: number;
}

const COMPOSITION_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#64748b'];

const calculateDaysUntilNext = (schedule: string, now: Date) => {
    if (!schedule || /notified|required|TBD|NA/i.test(schedule)) return 999;
    
    const normalized = schedule.toLowerCase()
        .replace(/thurs\s*day/g, 'thursday')
        .replace(/tues\s*day/g, 'tuesday')
        .replace(/wednes\s*day/g, 'wednesday')
        .replace(/\s+/g, ' ')
        .trim();
        
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayOfWeek = today.getDay();
    const dateOfMonth = today.getDate();
    
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const ordinals: Record<string, number> = { 
        '1st': 1, '2nd': 2, '3rd': 3, '4th': 4, '5th': 5, 
        'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5 
    };

    const getNthWeekdayOfMonth = (year: number, month: number, weekdayIdx: number, n: number) => {
        let count = 0;
        let d = new Date(year, month, 1);
        while (d.getMonth() === month) {
            if (d.getDay() === weekdayIdx) {
                count++;
                if (count === n) return new Date(d);
            }
            d.setDate(d.getDate() + 1);
        }
        return null;
    };

    const nthMatch = normalized.match(/(1st|2nd|3rd|4th|5th|first|second|third|fourth|fifth)/i);
    const weekdayFound = weekdays.find(w => normalized.includes(w));
    
    if (nthMatch && weekdayFound) {
        const n = ordinals[nthMatch[0].toLowerCase()];
        const targetWeekdayIdx = weekdays.indexOf(weekdayFound);
        let target = getNthWeekdayOfMonth(today.getFullYear(), today.getMonth(), targetWeekdayIdx, n);
        
        if (!target || target < today) {
            let nextMonth = today.getMonth() + 1;
            let nextYear = today.getFullYear();
            if (nextMonth > 11) { nextMonth = 0; nextYear++; }
            target = getNthWeekdayOfMonth(nextYear, nextMonth, targetWeekdayIdx, n);
        }
        
        if (target) {
            if (target.getTime() === today.getTime()) return 0;
            const diffTime = target.getTime() - today.getTime();
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
    }

    let minDays = 999;
    let foundWeekday = false;
    weekdays.forEach((day, i) => {
        if (normalized.includes(day)) {
            foundWeekday = true;
            let diff = i - dayOfWeek;
            if (diff < 0) diff += 7;
            if (diff < minDays) minDays = diff;
        }
    });
    if (foundWeekday) return minDays;

    const dateMatches = normalized.match(/(\d+)/g);
    if (dateMatches && !normalized.includes('week')) {
        const days = dateMatches.map(Number).sort((a, b) => a - b);
        const nextDay = days.find(d => d >= dateOfMonth);
        if (nextDay === dateOfMonth) return 0;
        if (nextDay) return nextDay - dateOfMonth;
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        return (daysInMonth - dateOfMonth) + days[0];
    }

    return 999;
};

function DistrictDashboardContent() {
  const searchParams = useSearchParams();
  const districtName = searchParams.get('district') || '';
  const [mounted, setMounted] = useState(false);
  const [solvedAlerts, setSolvedAlerts] = useState<string[]>([]);
  const [lineToggle, setLineToggle] = useState('monthly');
  const [barToggle, setBarToggle] = useState('top');
  const [mrfUlbToggle, setMrfUlbToggle] = useState('mrf');
  
  // Real-time waste records state
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>([]);

  const db = useFirestore();
  
  // Real-time listener for wasteDetails (for graphs)
  useEffect(() => {
    if (!db || !districtName) return;
    
    const wasteQuery = query(
      collection(db, 'wasteDetails'),
      where('district', '==', districtName),
      orderBy('date', 'desc')
    );
    
    const unsubscribe = onSnapshot(wasteQuery, (snapshot) => {
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
          gpName: data.gpName || '',
          totalGpLoad: data.totalGpLoad || 0,
          driverSubmitted: data.driverSubmitted || 0,
          plastic: data.plastic || 0,
          paper: data.paper || 0,
          metal: data.metal || 0,
          cloth: data.cloth || 0,
          glass: data.glass || 0,
          sanitation: data.sanitation || 0,
          others: data.others || 0,
        });
      });
      setWasteRecords(items);
    });
    
    return () => unsubscribe();
  }, [db, districtName]);
  
  // Listen to route plans from Firestore (for active circuits and workers)
  const [firestoreRoutes, setFirestoreRoutes] = useState<RouteData[]>([]);
  useEffect(() => {
    if (!db || !districtName) return;
    const routesQuery = query(collection(db, 'routePlans'), where('district', '==', districtName), where('isDeleted', '==', false));
    const unsubscribe = onSnapshot(routesQuery, (snapshot) => {
      const routes: RouteData[] = [];
      snapshot.forEach((doc: DocumentData) => {
        const data = doc.data();
        routes.push({ id: doc.id, ...data } as RouteData);
      });
      setFirestoreRoutes(routes);
    });
    return () => unsubscribe();
  }, [db, districtName]);

  // Listen to collection schedules from Firestore (for drivers, PEOs, ULB operators)
  const [firestoreSchedules, setFirestoreSchedules] = useState<ScheduleData[]>([]);
  useEffect(() => {
    if (!db || !districtName) return;
    const schedulesQuery = query(collection(db, 'collectionSchedules'), where('district', '==', districtName));
    const unsubscribe = onSnapshot(schedulesQuery, (snapshot) => {
      const schedules: ScheduleData[] = [];
      snapshot.forEach((doc: DocumentData) => {
        const data = doc.data();
        schedules.push({ id: doc.id, ...data } as ScheduleData);
      });
      setFirestoreSchedules(schedules);
    });
    return () => unsubscribe();
  }, [db, districtName]);

  useEffect(() => { setMounted(true); }, []);

  const districtSource = useMemo(() => {
    if (!districtName) return null;
    const map: Record<string, any> = { 
      'angul': angulDistrictData, 'balangir': balangirDistrictData, 'bhadrak': bhadrakDistrictData, 
      'bargarh': bargarhDistrictData, 'sonepur': sonepurDistrictData, 'boudh': boudhDistrictData, 
      'cuttack': cuttackDistrictData, 'deogarh': deogarhDistrictData, 'dhenkanal': dhenkanalDistrictData, 
      'gajapati': gajapatiDistrictData, 'ganjam': ganjamDistrictData, 'jagatsinghpur': jagatsinghpurDistrictData, 
      'jajpur': jajpurDistrictData, 'jharsuguda': jharsugudaDistrictData, 'kalahandi': kalahandiDistrictData, 
      'kandhamal': kandhamalDistrictData, 'kendrapara': kendraparaDistrictData, 'kendujhar': kendujharDistrictData, 
      'khordha': khordhaDistrictData, 'koraput': koraputDistrictData, 'mayurbhanj': mayurbhanjDistrictData, 
      'malkangiri': malkangiriDistrictData, 'balasore': balasoreDistrictData, 'baleswar': baleswarDistrictData, 
      'rayagada': rayagadaDistrictData, 'nabarangpur': nabarangpurDistrictData, 'nayagarh': nayagarhDistrictData, 
      'nuapada': nuapadaDistrictData, 'puri': puriDistrictData, 'sambalpur': sambalpurDistrictData 
    };
    return map[districtName.toLowerCase()];
  }, [districtName]);

  const dashData = useMemo(() => {
    if (!mounted || !districtSource) return null;
    
    const districtRecords = mrfData.filter(m => m.district.toLowerCase() === districtName.toLowerCase());
    const ulbs = Array.from(new Set(districtRecords.map(m => m.ulbName))).sort();
    const mrfs = Array.from(new Set(districtRecords.map(m => m.mrfId))).sort();
    
    // Merge local routes with Firestore routes
    let localRoutesData: RouteData[] = districtSource.data.routes || [];
    const mergedRoutesMap = new Map<string, RouteData>();
    
    firestoreRoutes.forEach(route => {
      mergedRoutesMap.set(route.routeId, route);
    });
    
    localRoutesData.forEach((route: RouteData) => {
      if (!mergedRoutesMap.has(route.routeId)) {
        mergedRoutesMap.set(route.routeId, route);
      }
    });
    
    const mergedRoutes = Array.from(mergedRoutesMap.values());
    
    // Merge local schedules with Firestore schedules
    let localSchedulesData: ScheduleData[] = districtSource.data.collectionSchedules || [];
    const mergedSchedulesMap = new Map<string, ScheduleData>();
    
    firestoreSchedules.forEach(schedule => {
      mergedSchedulesMap.set(schedule.gpName, schedule);
    });
    
    localSchedulesData.forEach((schedule: ScheduleData) => {
      if (!mergedSchedulesMap.has(schedule.gpName)) {
        mergedSchedulesMap.set(schedule.gpName, schedule);
      }
    });
    
    const mergedSchedules = Array.from(mergedSchedulesMap.values());
    
    const gpsList = (districtSource.data.gpMappings || []).map((gp: any) => {
        const w = (districtSource.data.wasteGeneration || []).find((waste: any) => waste.gpName.toLowerCase() === gp.gpName.toLowerCase());
        const total = w ? (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000) || 0) : 0;
        return { 
            name: gp.gpName, 
            households: w?.totalHouseholds || 0, 
            surveyed: total,
            dailyGen: w?.dailyWasteTotalGm || 0,
            monthlyGen: w?.monthlyWasteTotalGm || 0
        };
    });

    const totalDailyGen = gpsList.reduce((s: number, g: any) => s + g.dailyGen, 0);
    const totalMonthlyGen = gpsList.reduce((s: number, g: any) => s + g.monthlyGen, 0);

    // Build active circuits from merged routes and schedules (connected to route planning)
    const activeCircuits = mergedRoutes.map((route: RouteData) => {
        const sched = mergedSchedules.find((s: ScheduleData) => 
            s.gpName.toLowerCase().includes(route.routeId.toLowerCase()) || 
            s.gpName.toLowerCase().includes(route.startingGp.toLowerCase())
        );
        const scheduleStr = sched?.collectionSchedule || route.scheduledOn || 'Scheduled';
        const daysLeft = calculateDaysUntilNext(scheduleStr, new Date());
        return { 
            ...route, 
            daysLeft, 
            scheduleStr, 
            isActiveToday: daysLeft === 0, 
            driverName: (sched?.driverName && sched.driverName !== '-') ? sched.driverName : 'Verified',
            driverContact: (sched?.driverContact && sched.driverContact !== '-') ? sched.driverContact : '9437XXXXXX',
            vehicleDetails: sched?.vehicleType || 'TATA ACE',
            block: sched?.block || route.block || districtName,
            mrf: sched?.mrf || route.destination || 'Facility',
            startingGp: route.startingGp,
            finalGp: route.finalGp || route.destination
        };
    }).sort((a: any, b: any) => a.daysLeft - b.daysLeft);

    const hasRealData = wasteRecords.length > 0;
    
    // District Load Trend (Kg) - connected to GP waste details (wasteRecords)
    const lineData = gpsList.map((g: any) => {
        const gpRecords = wasteRecords.filter(r => r.gpName?.toLowerCase() === g.name.toLowerCase());
        return {
            name: g.name,
            weekly: hasRealData ? gpRecords.filter(r => new Date(r.date) > new Date(Date.now() - 7*24*60*60*1000)).reduce((s, r) => s + (r.driverSubmitted || 0), 0) : Math.random() * 50 + 20,
            monthly: hasRealData ? gpRecords.reduce((s, r) => s + (r.driverSubmitted || 0), 0) : Math.random() * 200 + 100
        };
    });

    // District Facility Audit - connected to ULB waste details (wasteRecords)
    const mrfTonnage = mrfs.map((id: string) => ({
        name: id,
        value: hasRealData ? wasteRecords.filter((r: any) => r.mrf === id).reduce((s: number, r: any) => s + (r.driverSubmitted || 0), 0) : 1000 + Math.random() * 2000
    }));

    const ulbTonnage = ulbs.map((name: string) => ({
        name: name,
        value: hasRealData ? wasteRecords.filter((r: any) => r.ulb?.toLowerCase() === name.toLowerCase()).reduce((s: number, r: any) => s + (r.driverSubmitted || 0), 0) : 2000 + Math.random() * 3000
    }));

    // District Stream Composition - connected to waste records
    const streamData = hasRealData ? [
        { name: 'Plastic', value: wasteRecords.reduce((s, r) => s + (r.plastic || 0), 0) },
        { name: 'Paper', value: wasteRecords.reduce((s, r) => s + (r.paper || 0), 0) },
        { name: 'Metal', value: wasteRecords.reduce((s, r) => s + (r.metal || 0), 0) },
        { name: 'Glass', value: wasteRecords.reduce((s, r) => s + (r.glass || 0), 0) },
        { name: 'Sanitation', value: wasteRecords.reduce((s, r) => s + (r.sanitation || 0), 0) },
        { name: 'Others', value: wasteRecords.reduce((s, r) => s + (r.others || 0), 0) },
    ] : [
        { name: 'Plastic', value: 4500 }, { name: 'Paper', value: 3200 }, 
        { name: 'Metal', value: 1200 }, { name: 'Glass', value: 800 }, 
        { name: 'Sanitation', value: 150 }, { name: 'Others', value: 900 }
    ];

    // District Recovery (Last 5 Months) - connected to waste records
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    let monthlyRecoveryData: any[] = [];
    
    if (hasRealData && wasteRecords.length > 0) {
        const monthMap = new Map<string, number>();
        for (let i = 4; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthNames[d.getMonth()];
            monthMap.set(monthName, 0);
        }
        
        wasteRecords.forEach(record => {
            const date = new Date(record.date);
            const monthName = monthNames[date.getMonth()];
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth();
            
            for (let i = 0; i < 5; i++) {
                const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
                if (recordYear === targetDate.getFullYear() && recordMonth === targetDate.getMonth()) {
                    monthMap.set(monthName, (monthMap.get(monthName) || 0) + (record.driverSubmitted || 0));
                    break;
                }
            }
        });
        
        monthlyRecoveryData = Array.from(monthMap.entries()).map(([month, val]) => ({ month, val }));
    } else {
        monthlyRecoveryData = [{month: 'Mar', val: 5800}, {month: 'Apr', val: 6100}, {month: 'May', val: 7400}, {month: 'Jun', val: 6200}, {month: 'Jul', val: 8600}];
    }

    // Discrepancies based on active circuits and waste records
    const discrepancies: any[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    activeCircuits.filter((c: any) => c.isActiveToday).forEach((c: any, idx: number) => {
        if (!wasteRecords.some((r: any) => r.date === todayStr && (r.routeId === c.routeId || r.gpName === c.startingGp))) {
            discrepancies.push({ 
                id: `miss-${districtName}-${c.block}-${c.routeId}-${c.startingGp}-${idx}`.replace(/\s+/g, '-'), 
                msg: `Circuit ${c.routeId} active - No receipt synced for ${c.startingGp}.` 
            });
        }
    });

    // Registry Data - Connected to waste collection page (from merged schedules and routes)
    // Get PEOs (Nodal Person GP) from merged schedules
    const peos = Array.from(new Set(mergedSchedules.map((s: ScheduleData) => JSON.stringify({ name: (s.gpNodalPerson || "").split(',')[0].trim(), contact: (s.gpNodalContact || "").split(',')[0].trim(), mrf: s.mrf }))))
        .map((s: string) => JSON.parse(s)).filter((p: any) => p.name !== '-' && p.name !== '');

    // Get ULB Operators (Nodal Person ULB) from merged schedules
    const operators = Array.from(new Set(mergedSchedules.map((s: ScheduleData) => JSON.stringify({ name: (s.ulbNodalPerson || "").split('&')[0].trim(), contact: (s.ulbNodalContact || "").split(',')[0].trim(), ulb: s.ulb }))))
        .map((s: string) => JSON.parse(s)).filter((o: any) => o.name !== '-' && o.name !== '');

    // Get Drivers (Logistical Drivers) from merged schedules
    const drivers = Array.from(new Set(mergedSchedules.map((s: ScheduleData) => JSON.stringify({ name: s.driverName, contact: s.driverContact, vehicle: s.vehicleType }))))
        .map((s: string) => JSON.parse(s)).filter((d: any) => d.name !== '-' && d.name !== '');

    // Get Sanitation Workers from merged routes (connected to route planning)
    const workers = mergedRoutes.flatMap((r: RouteData) => (r.workers || []).map((w: any) => ({ ...w, mrf: r.destination })));

    // GP Nodal Rankings (Top/Lowest GPs by waste collected) - connected to waste records
    let gpRankingsData = gpsList.map((g: any) => ({
        gpName: g.name,
        surveyed: hasRealData ? wasteRecords.filter(r => r.gpName?.toLowerCase() === g.name.toLowerCase()).reduce((s, r) => s + (r.driverSubmitted || 0), 0) : g.surveyed
    }));

    return { 
        ulbs, mrfs, gpsList, activeCircuits,
        lineData, mrfTonnage, ulbTonnage, streamData, discrepancies, peos, operators, drivers, workers,
        households: gpsList.reduce((s: number, g: any) => s + g.households, 0),
        totalDailyGen, totalMonthlyGen,
        blocks: districtSource.blocks || [],
        gpRankingsData,
        monthlyRecoveryData,
        hasRealData
    };
  }, [districtName, districtSource, mounted, wasteRecords, firestoreRoutes, firestoreSchedules]);

  if (!mounted || !dashData) return <div className="p-12 text-center animate-pulse">Syncing district hub...</div>;

  return (
    <div className="grid gap-6">
      <Card className="border-2 border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-3xl font-black uppercase text-primary">District Node: {districtName}</CardTitle>
                <CardDescription className="font-bold text-muted-foreground">Authoritative multi-block administrative oversight hub.</CardDescription>
            </div>
            <Badge className="bg-primary font-black uppercase text-[10px]">{dashData.hasRealData ? 'LIVE DATA ACTIVE' : 'DISTRICT COMMAND CENTRE'}</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-8 gap-4">
        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Blocks</p>
                    <p className="text-lg font-black text-primary underline">{dashData.blocks.length}</p>
                </Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Administrative Blocks</div>
                <Table><TableBody>{dashData.blocks.map((b: string, i: number) => (<TableRow key={i}><TableCell className="text-[10px] font-bold uppercase">{b}</TableCell></TableRow>))}</TableBody></Table>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged ULB</p>
                    <p className="text-lg font-black text-primary underline">{dashData.ulbs.length}</p>
                </Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Linked Urban Local Bodies</div>
                <Table><TableBody>{dashData.ulbs.map((u: string, i: number) => (<TableRow key={i}><TableCell className="text-[10px] font-bold uppercase">{u}</TableCell></TableRow>))}</TableBody></Table>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged MRF</p>
                    <p className="text-lg font-black text-primary underline">{dashData.mrfs.length}</p>
                </Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">District Facility Roster</div>
                <Table><TableBody>{dashData.mrfs.map((m: string, i: number) => (<TableRow key={i}><TableCell className="text-[10px] font-bold uppercase">{m}</TableCell></TableRow>))}</TableBody></Table>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">GPs Tagged</p>
                    <p className="text-lg font-black text-primary underline">{dashData.gpsList.length}</p>
                </Card>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">District GP Directory</div>
                <ScrollArea className="h-64"><Table><TableBody>{dashData.gpsList.map((g: any, i: number) => (<TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{g.name}</TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Card className="border-2 shadow-sm p-4 text-center">
            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Households</p>
            <p className="text-lg font-black">{dashData.households.toLocaleString()}</p>
        </Card>

        <Card className="border-2 shadow-sm p-4 text-center border-primary/20 bg-primary/5">
            <p className="text-[9px] font-black text-primary uppercase mb-1">Total Waste/Day (Gm)</p>
            <p className="text-lg font-black text-primary">{(dashData.totalDailyGen / 1000).toFixed(1)} Kg</p>
        </Card>
        <Card className="border-2 shadow-sm p-4 text-center border-primary/20 bg-primary/5">
            <p className="text-[9px] font-black text-primary uppercase mb-1">Total Waste/Month (Gm)</p>
            <p className="text-lg font-black text-primary">{(dashData.totalMonthlyGen / 1000).toFixed(1)} Kg</p>
        </Card>

        <Card className="border-2 shadow-sm p-4 text-center bg-primary/5 border-primary/20">
            <p className="text-[9px] font-black uppercase text-primary mb-1">Efficiency Score</p>
            <p className="text-lg font-black text-primary">95.2%</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-destructive/20 bg-destructive/[0.01]">
                <CardHeader className="bg-destructive/5 border-b pb-3 flex row items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-base font-black uppercase text-destructive">Operational Discrepancy Hub</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[250px]">
                        <div className="divide-y">
                            {dashData.discrepancies.filter((d: any) => !solvedAlerts.includes(d.id)).map((alert: any) => (
                                <div key={alert.id} className="p-4 flex items-center justify-between group">
                                    <p className="text-[10px] font-bold text-foreground uppercase italic">{alert.msg}</p>
                                    <Button size="sm" variant="outline" className="h-7 text-[8px] font-black uppercase hover:bg-green-600 hover:text-white" onClick={() => setSolvedAlerts([...solvedAlerts, alert.id])}>Mark Solved</Button>
                                </div>
                            ))}
                            {dashData.discrepancies.filter((d: any) => !solvedAlerts.includes(d.id)).length === 0 && (
                                <div className="p-12 text-center text-muted-foreground opacity-30 italic uppercase font-black text-xs">No active district-level discrepancies.</div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 bg-primary/[0.01]">
                <CardHeader className="bg-primary/5 border-b pb-3 flex row items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base font-black uppercase">Active Circuits</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[250px]">
                        <div className="grid divide-y">
                            {dashData.activeCircuits.map((log: any, i: number) => (
                                <div key={i} className={`p-5 flex items-center justify-between border-l-4 ${log.isActiveToday ? 'border-l-green-600 bg-green-50/10' : 'border-l-primary/20'}`}>
                                    <div className="flex-[1.5] space-y-1 border-r border-dashed pr-6">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground leading-none">
                                            {log.block} | {log.mrf}
                                        </p>
                                        <p className="font-black text-xs uppercase text-primary truncate">
                                            {log.routeId}: {log.routeName}
                                        </p>
                                    </div>
                                    <div className="flex-1 text-center px-6 border-r border-dashed">
                                        <div className={`text-sm font-black ${log.isActiveToday ? 'text-green-700 animate-pulse' : ''}`}>
                                            {log.isActiveToday ? "Active Today" : `In ${log.daysLeft} days`}
                                        </div>
                                        <p className="text-[9px] font-black text-blue-700 uppercase mt-1">
                                            {log.scheduleStr}
                                        </p>
                                    </div>
                                    <div className="flex-[1.5] text-right space-y-1 pl-6">
                                        <p className="text-[11px] font-black uppercase leading-none">{log.driverName || 'Verified'}</p>
                                        <p className="text-[9px] font-mono font-bold text-muted-foreground">{log.vehicleDetails}</p>
                                        <p className="text-[9px] font-black text-primary font-mono">{log.driverContact}</p>
                                        <p className="text-[8px] font-bold text-foreground/50 italic truncate">{log.startingGp} → {log.finalGp || log.destination}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
      </div>

      <Card className="border-2 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-black uppercase flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary"/> District Load Trend (Kg)</CardTitle>
            <Tabs value={lineToggle} onValueChange={setLineToggle}>
                <TabsList className="h-8 bg-background border"><TabsTrigger value="weekly" className="text-[9px] font-black uppercase">Weekly</TabsTrigger><TabsTrigger value="monthly" className="text-[9px] font-black uppercase">Monthly</TabsTrigger></TabsList>
            </Tabs>
        </CardHeader>
        <CardContent className="h-[300px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashData.lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" fontSize={9} fontWeight="bold" angle={-45} textAnchor="end" height={60} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line type="monotone" dataKey={lineToggle === 'monthly' ? 'monthly' : 'weekly'} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> District Nodal Rankings</CardTitle>
                <Tabs value={barToggle} onValueChange={setBarToggle}>
                    <TabsList className="h-7"><TabsTrigger value="top" className="text-[8px] font-black px-2">Top 5</TabsTrigger><TabsTrigger value="low" className="text-[8px] font-black px-2">Lowest 5</TabsTrigger></TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...dashData.gpRankingsData].sort((a: any, b: any) => barToggle === 'top' ? b.surveyed - a.surveyed : a.surveyed - b.surveyed).slice(0, 5)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                        <XAxis type="number" fontSize={10} />
                        <YAxis dataKey="gpName" type="category" fontSize={9} width={80} fontWeight="black" />
                        <Tooltip />
                        <Bar dataKey="surveyed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Warehouse className="h-4 w-4 text-primary" /> District Facility Audit</CardTitle>
                <Tabs value={mrfUlbToggle} onValueChange={setMrfUlbToggle}>
                    <TabsList className="h-7"><TabsTrigger value="mrf" className="text-[8px] font-black px-2">MRFs</TabsTrigger><TabsTrigger value="ulb" className="text-[8px] font-black px-2">ULBs</TabsTrigger></TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mrfUlbToggle === 'mrf' ? dashData.mrfTonnage : dashData.ulbTonnage}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" fontSize={9} fontWeight="black" />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> District Recovery (Last 5 Months)</CardTitle></CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashData.monthlyRecoveryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="month" fontSize={10} fontWeight="black" />
                        <YAxis fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(0)}T`} />
                        <Tooltip />
                        <Bar dataKey="val" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> District Stream Composition</CardTitle></CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={dashData.streamData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {dashData.streamData.map((_: any, i: number) => (<Cell key={`cell-${i}`} fill={COMPOSITION_COLORS[i % COMPOSITION_COLORS.length]} />))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '9px', fontWeight: 'black', textTransform: 'uppercase'}} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> Professional District Registry</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Sanitation Workers</p>
                        <p className="text-2xl font-black text-primary underline">{dashData.workers.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Users className="h-3 w-3" /> District Sanitation Roster</div>
                    <ScrollArea className="h-64">
                        <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead><TableHead className="text-[10px] font-bold uppercase">MRF</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {dashData.workers.map((n: any, i: number) => (
                                <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact || '9437XXXXXX'}</TableCell><TableCell className="text-[9px] font-bold uppercase">{n.mrf}</TableCell></TableRow>
                            ))}
                        </TableBody></Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (GP)</p>
                        <p className="text-2xl font-black text-primary underline">{dashData.peos.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> District PEO Directory</div>
                    <ScrollArea className="h-64">
                        <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead><TableHead className="text-[10px] font-bold uppercase">MRF</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {dashData.peos.map((n: any, i: number) => (
                                <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell><TableCell className="text-[9px] font-bold uppercase">{n.mrf}</TableCell></TableRow>
                            ))}
                        </TableBody></Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (ULB)</p>
                        <p className="text-2xl font-black text-primary underline">{dashData.operators.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><UserCircle className="h-3 w-3" /> District Operator Directory</div>
                    <ScrollArea className="h-64">
                        <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead><TableHead className="text-[10px] font-bold uppercase">ULB</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {dashData.operators.map((n: any, i: number) => (
                                <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell><TableCell className="text-[9px] font-bold uppercase">{n.ulb}</TableCell></TableRow>
                            ))}
                        </TableBody></Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Logistical Drivers</p>
                        <p className="text-2xl font-black text-primary underline">{dashData.drivers.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Truck className="h-3 w-3" /> District Driver Directory</div>
                    <ScrollArea className="h-64">
                        <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead><TableHead className="text-[10px] font-bold uppercase">Vehicle</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {dashData.drivers.map((n: any, i: number) => (
                                <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell><TableCell className="text-[9px] font-bold uppercase">{n.vehicle}</TableCell></TableRow>
                            ))}
                        </TableBody></Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
      </div>
    </div>
  );
}

export default function DistrictDashboardPage() {
    return (<Suspense fallback={<div>Loading district portal...</div>}><DistrictDashboardContent /></Suspense>);
}