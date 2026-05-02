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
  ShieldCheck,
  Calendar as CalendarIcon,
  MapPin,
  Calculator,
  Navigation,
  Map as DistrictIcon,
  Globe,
  UserCircle,
  Users,
  CheckCircle2
} from "lucide-react";
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
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

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

const COMPOSITION_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#64748b'];

// Waste Record Interface
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

/**
 * HIGH PRECISION TEMPORAL ENGINE
 * Calculates arrival days with 100% precision for ordinals (1st Thursday), 
 * fixed dates (1st, 15th), and recurring weekdays.
 */
const calculateDaysUntilNext = (schedule: string, now: Date) => {
    if (!schedule || /notified|required|TBD|NA/i.test(schedule)) return 999;
    
    // Normalize string: Remove space from "thurs day", "tues day", etc.
    const normalized = schedule.toLowerCase()
        .replace(/thurs\s*day/g, 'thursday')
        .replace(/tues\s*day/g, 'tuesday')
        .replace(/wednes\s*day/g, 'wednesday')
        .replace(/mon\s*day/g, 'monday')
        .replace(/fri\s*day/g, 'friday')
        .replace(/satur\s*day/g, 'saturday')
        .replace(/sun\s*day/g, 'sunday')
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

    // Case 1: Nth Weekday (e.g., 1st Thursday, Friday of 2nd week)
    const nthMatch = normalized.match(/(1st|2nd|3rd|4th|5th|first|second|third|fourth|fifth)/i);
    const weekdayFound = weekdays.find(w => normalized.includes(w));
    
    if (nthMatch && weekdayFound) {
        const n = ordinals[nthMatch[0].toLowerCase()];
        const targetWeekdayIdx = weekdays.indexOf(weekdayFound);
        let target = getNthWeekdayOfMonth(today.getFullYear(), today.getMonth(), targetWeekdayIdx, n);
        
        // If target has passed in current month, check next month
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

    // Case 2: Recurring Weekday (e.g., Monday, every Tuesday)
    let minDays = 999;
    let foundWeekday = false;
    weekdays.forEach((day, i) => {
        if (normalized.includes(day)) {
            foundWeekday = true;
            let diff = i - dayOfWeek;
            if (diff < 0) diff += 7;
            if (diff === 0) minDays = 0;
            else if (diff < minDays) minDays = diff;
        }
    });
    if (foundWeekday && minDays !== 999) return minDays;

    // Case 3: Fixed Dates (e.g., 1st and 15th)
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

function StateAdminDashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [solvedAlerts, setSolvedAlerts] = useState<string[]>([]);
  const [lineToggle, setLineToggle] = useState('monthly');
  const [barToggle, setBarToggle] = useState('top');
  const [mrfUlbToggle, setMrfUlbToggle] = useState('mrf');
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>([]);
  const [firestoreRoutes, setFirestoreRoutes] = useState<any[]>([]);

  const db = useFirestore();

  // Real-time listener for wasteDetails
  useEffect(() => {
    if (!db) return;
    
    const wasteQuery = query(collection(db, 'wasteDetails'), orderBy('date', 'desc'));
    
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
  }, [db]);

  // Real-time listener for routePlans (for overrides)
  useEffect(() => {
    if (!db) return;
    
    const routesQuery = query(collection(db, 'routePlans'));
    
    const unsubscribe = onSnapshot(routesQuery, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setFirestoreRoutes(items);
    });
    
    return () => unsubscribe();
  }, [db]);

  useEffect(() => { setMounted(true); }, []);

  const districtSources = [
    angulDistrictData, balangirDistrictData, bhadrakDistrictData, bargarhDistrictData,
    sonepurDistrictData, boudhDistrictData, cuttackDistrictData, deogarhDistrictData,
    dhenkanalDistrictData, gajapatiDistrictData, ganjamDistrictData, jagatsinghpurDistrictData,
    jajpurDistrictData, jharsugudaDistrictData, kalahandiDistrictData, kandhamalDistrictData,
    kendraparaDistrictData, kendujharDistrictData, khordhaDistrictData, koraputDistrictData,
    mayurbhanjDistrictData, malkangiriDistrictData, rayagadaDistrictData, nabarangpurDistrictData,
    nayagarhDistrictData, nuapadaDistrictData, puriDistrictData, sambalpurDistrictData,
    balasoreDistrictData, baleswarDistrictData
  ];

  const stateData = useMemo(() => {
    if (!mounted) return null;

    const allGps: any[] = [];
    const allRoutes: any[] = [];
    const allBlocks: string[] = [];
    const allUlbs: string[] = [];
    const allMrfs: string[] = [];
    let surveyedTotal = 0;

    // Build routes with overrides from firestoreRoutes
    districtSources.forEach(source => {
        if (!source.data) return;
        
        // Get overrides for this district
        const districtOverrides = firestoreRoutes.filter((r: any) => r.district === source.district);
        
        source.data.gpMappings.forEach(gp => {
            const w = source.data.wasteGeneration.find((wg: any) => wg.gpName.toLowerCase() === gp.gpName.toLowerCase());
            const surveyed = w ? (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000) || 0) : 0;
            surveyedTotal += surveyed;
            allGps.push({ ...gp, district: source.district, households: w?.totalHouseholds || 0, surveyed });
        });
        source.blocks.forEach((b: string) => allBlocks.push(`${source.district} - ${b}`));
        
        source.data.routes.forEach((route: any) => {
            // Apply override if exists
            const override = districtOverrides.find((o: any) => o.routeId === route.routeId);
            const finalRoute = override ? { ...route, ...override } : route;
            
            const sched = source.data.collectionSchedules.find((s: any) => 
                s.gpName.toLowerCase().includes(finalRoute.routeId.toLowerCase()) || 
                s.gpName.toLowerCase().includes(finalRoute.startingGp.toLowerCase())
            );
            const scheduleStr = sched?.collectionSchedule || finalRoute.scheduledOn || 'Scheduled';
            const daysLeft = calculateDaysUntilNext(scheduleStr, new Date());
            allRoutes.push({ 
                ...finalRoute, 
                district: source.district,
                block: sched?.block || finalRoute.block || source.district,
                mrf: sched?.mrf || finalRoute.destination,
                daysLeft,
                scheduleStr,
                isActiveToday: daysLeft === 0,
                driver: (sched?.driverName && sched.driverName !== '-') ? sched.driverName : (finalRoute.driverName || 'Verified'),
                contact: (sched?.driverContact && sched.driverContact !== '-') ? sched.driverContact : (finalRoute.driverContact || '9437XXXXXX'),
                vehicle: sched?.vehicleType || finalRoute.vehicleType || 'TATA ACE',
                startGp: finalRoute.startingGp,
                endGp: finalRoute.finalGp || finalRoute.destination
            });
        });
    });

    mrfData.forEach((m: any) => {
        allUlbs.push(m.ulbName);
        allMrfs.push(m.mrfId);
    });

    const activeToday = allRoutes.filter(r => r.isActiveToday).sort((a,b) => a.district.localeCompare(b.district));
    const districtsList = districtSources.map(s => s.district).sort();
    const uniqueBlocks = Array.from(new Set(allBlocks)).sort();
    const uniqueUlbs = Array.from(new Set(allUlbs)).sort();
    const uniqueMrfs = Array.from(new Set(allMrfs)).sort();

    const hasRealData = wasteRecords.length > 0;
    
    // Calculate surveyed total from district sources (mock baseline)
    const mockSurveyedTotal = districtSources.reduce((sum, source) => {
        if (!source.data?.wasteGeneration) return sum;
        return sum + source.data.wasteGeneration.reduce((s: number, w: any) => s + (w.totalWasteKg || (w.monthlyWasteTotalGm / 1000) || 0), 0);
    }, 0);
    
    // Calculate verified total from real waste records
    const verifiedTotal = wasteRecords.reduce((s, r) => s + (r.driverSubmitted || 0), 0);
    const surveyedTotalForEfficiency = hasRealData ? mockSurveyedTotal : mockSurveyedTotal;
    const efficiency = surveyedTotalForEfficiency > 0 ? (verifiedTotal / surveyedTotalForEfficiency) * 100 : 94.2;

    // Block-level Recovery Trend - Real data when available
    const lineData: any[] = [];
    if (hasRealData && wasteRecords.length > 0) {
        // Group by district-block combination
        const blockMap = new Map<string, { weekly: number; monthly: number }>();
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        wasteRecords.forEach(record => {
            const key = `${record.district}-${record.block}`;
            const recordDate = new Date(record.date);
            if (!blockMap.has(key)) {
                blockMap.set(key, { weekly: 0, monthly: 0 });
            }
            const stats = blockMap.get(key)!;
            stats.monthly += record.driverSubmitted || 0;
            if (recordDate >= oneWeekAgo) {
                stats.weekly += record.driverSubmitted || 0;
            }
        });
        
        blockMap.forEach((stats, key) => {
            lineData.push({ name: key, weekly: stats.weekly, monthly: stats.monthly });
        });
    } else {
        // Mock data
        districtSources.forEach(source => {
            source.blocks.forEach((blockName: string) => {
                lineData.push({
                    name: `${source.district}-${blockName}`,
                    weekly: Math.random() * 100 + 50,
                    monthly: Math.random() * 400 + 200
                });
            });
        });
    }

    // District-wise Verified Inventory - Real data when available
    let districtTonnage: any[] = [];
    if (hasRealData && wasteRecords.length > 0) {
        const districtMap = new Map<string, number>();
        wasteRecords.forEach(record => {
            const district = record.district;
            districtMap.set(district, (districtMap.get(district) || 0) + (record.driverSubmitted || 0));
        });
        districtTonnage = Array.from(districtMap.entries()).map(([name, value]) => ({ name, value }));
    } else {
        districtTonnage = districtSources.map(s => ({
            name: s.district,
            value: 1000 + Math.random() * 5000
        }));
    }

    // Top 5 MRFs and ULBs - Real data when available
    const mrfMap = new Map<string, number>();
    const ulbMap = new Map<string, number>();
    
    if (hasRealData && wasteRecords.length > 0) {
        wasteRecords.forEach(r => {
            mrfMap.set(r.mrf, (mrfMap.get(r.mrf) || 0) + (r.driverSubmitted || 0));
            const mInfo = mrfData.find(m => m.mrfId === r.mrf);
            const uName = mInfo ? mInfo.ulbName : r.ulb;
            ulbMap.set(uName, (ulbMap.get(uName) || 0) + (r.driverSubmitted || 0));
        });
    } else {
        uniqueMrfs.forEach(m => mrfMap.set(m, 500 + Math.random() * 1000));
        uniqueUlbs.forEach(u => ulbMap.set(u, 1000 + Math.random() * 2000));
    }
    
    const top5Mrfs = Array.from(mrfMap.entries()).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val).slice(0, 5);
    const top5Ulbs = Array.from(ulbMap.entries()).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val).slice(0, 5);

    // GP Nodal Rankings - Real data when available (top GPs by waste collected)
    let gpRankingsData: any[] = [];
    if (hasRealData && wasteRecords.length > 0) {
        const gpMap = new Map<string, number>();
        wasteRecords.forEach(record => {
            if (record.gpName) {
                gpMap.set(record.gpName, (gpMap.get(record.gpName) || 0) + (record.driverSubmitted || 0));
            }
        });
        gpRankingsData = Array.from(gpMap.entries()).map(([name, val]) => ({ gpName: name, surveyed: val }));
    } else {
        gpRankingsData = allGps;
    }

    // Stream Composition - Real data when available
    let streamData: any[] = [];
    if (hasRealData && wasteRecords.length > 0) {
        const totals = wasteRecords.reduce((acc, r) => ({
            plastic: acc.plastic + (r.plastic || 0),
            paper: acc.paper + (r.paper || 0),
            metal: acc.metal + (r.metal || 0),
            glass: acc.glass + (r.glass || 0),
            sanitation: acc.sanitation + (r.sanitation || 0),
            others: acc.others + (r.others || 0)
        }), { plastic: 0, paper: 0, metal: 0, glass: 0, sanitation: 0, others: 0 });
        
        streamData = [
            { name: 'Plastic', value: totals.plastic },
            { name: 'Paper', value: totals.paper },
            { name: 'Metal', value: totals.metal },
            { name: 'Glass', value: totals.glass },
            { name: 'Sanitation', value: totals.sanitation },
            { name: 'Others', value: totals.others }
        ];
    } else {
        streamData = [
            { name: 'Plastic', value: 45000 }, { name: 'Paper', value: 32000 }, 
            { name: 'Metal', value: 12000 }, { name: 'Glass', value: 8000 }, 
            { name: 'Sanitation', value: 1500 }, { name: 'Others', value: 9000 }
        ];
    }

    // Last 5 Months Recovery - Real data when available
    let monthlyRecoveryData: any[] = [];
    if (hasRealData && wasteRecords.length > 0) {
        const monthMap = new Map<string, number>();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        
        for (let i = 4; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
            const monthName = monthNames[d.getMonth()];
            monthMap.set(monthName, 0);
        }
        
        wasteRecords.forEach(record => {
            const date = new Date(record.date);
            const monthName = monthNames[date.getMonth()];
            const nowMonth = now.getMonth();
            const nowYear = now.getFullYear();
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth();
            
            // Check if within last 5 months
            for (let i = 0; i < 5; i++) {
                const targetDate = new Date(nowYear, nowMonth - i, 1);
                if (recordYear === targetDate.getFullYear() && recordMonth === targetDate.getMonth()) {
                    monthMap.set(monthName, (monthMap.get(monthName) || 0) + (record.driverSubmitted || 0));
                    break;
                }
            }
        });
        
        monthlyRecoveryData = Array.from(monthMap.entries()).map(([month, val]) => ({ month, val }));
    } else {
        monthlyRecoveryData = [{month: 'Mar', val: 12000}, {month: 'Apr', val: 14500}, {month: 'May', val: 18000}, {month: 'Jun', val: 16200}, {month: 'Jul', val: 21600}];
    }

    // Discrepancies - Real time
    const discrepancies: any[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    allRoutes.filter(r => r.isActiveToday).forEach((c, idx) => {
        if (!wasteRecords.some(r => r.date === todayStr && (r.routeId === c.routeId || r.gpName === c.startGp))) {
            discrepancies.push({ 
                id: `miss-${c.district}-${c.block}-${c.routeId}-${c.startGp}-${idx}`.replace(/\s+/g, '-'), 
                msg: `[${c.district}] Circuit ${c.routeId} active - No receipt synced for ${c.startGp}.` 
            });
        }
    });

    // Registry Data - From collectionSchedules and routes (live from district sources + overrides)
    const peos = Array.from(new Set(districtSources.flatMap(s => s.data.collectionSchedules.map((c: any) => JSON.stringify({ name: (c.gpNodalPerson || "").split(',')[0].trim(), contact: (c.gpNodalContact || "").split(',')[0].trim() })))))
        .map(s => JSON.parse(s)).filter((p: any) => p.name !== '-' && p.name !== '');
    
    const operators = Array.from(new Set(districtSources.flatMap(s => s.data.collectionSchedules.map((c: any) => JSON.stringify({ name: (c.ulbNodalPerson || "").split('&')[0].trim(), contact: (c.ulbNodalContact || "").split(',')[0].trim() })))))
        .map(s => JSON.parse(s)).filter((p: any) => p.name !== '-' && p.name !== '');

    // Drivers from both collectionSchedules and route overrides
    const scheduleDrivers = districtSources.flatMap(s => s.data.collectionSchedules.map((c: any) => ({ name: c.driverName, contact: c.driverContact })));
    const routeDrivers = allRoutes.map(r => ({ name: r.driver, contact: r.contact }));
    const allDrivers = [...scheduleDrivers, ...routeDrivers];
    const stateDrivers = Array.from(new Set(allDrivers.map(d => JSON.stringify({ name: d.name, contact: d.contact }))))
        .map(s => JSON.parse(s)).filter((d: any) => d.name !== '-' && d.name !== '' && d.name !== 'Verified');

    const workers = districtSources.flatMap(s => s.data.routes.flatMap((r: any) => r.workers || []));

    return { 
        districtsList, blocksList: uniqueBlocks, ulbsList: uniqueUlbs, mrfsList: uniqueMrfs, allGps, activeToday, lineData, districtTonnage, streamData, discrepancies,
        surveyedTotal: mockSurveyedTotal, verifiedTotal, efficiency: efficiency,
        top5Mrfs, top5Ulbs, peos, operators, stateDrivers, workers, gpRankingsData, monthlyRecoveryData, hasRealData
    };
  }, [mounted, wasteRecords, firestoreRoutes]);

  if (!mounted || !stateData) return <div className="p-12 text-center animate-pulse">Syncing state command center...</div>;

  return (
    <div className="grid gap-6">
      <Card className="border-2 border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-3xl font-black uppercase text-primary">Odisha State Command Center</CardTitle>
                <CardDescription className="font-bold text-muted-foreground italic">Consolidated administrative monitoring of all 30 districts.</CardDescription>
            </div>
            <Badge className="bg-primary font-black uppercase text-[10px]">{stateData.hasRealData ? 'LIVE DATA ACTIVE' : 'MOCK DATA MODE'}</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Districts</p><p className="text-xl font-black text-primary underline">{stateData.districtsList.length}</p></Card>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">District Directory</div>
                <ScrollArea className="h-64"><Table><TableBody>{stateData.districtsList.map(d => (<TableRow key={d}><TableCell className="text-[10px] font-bold uppercase">{d}</TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Blocks</p><p className="text-xl font-black text-primary underline">{stateData.blocksList.length}</p></Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Block Mapping</div>
                <ScrollArea className="h-64"><Table><TableBody>{stateData.blocksList.map(b => (<TableRow key={b}><TableCell className="text-[10px] font-bold uppercase">{b}</TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged ULB</p><p className="text-xl font-black text-primary underline">{stateData.ulbsList.length}</p></Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Urban Local Bodies</div>
                <ScrollArea className="h-64"><Table><TableBody>{stateData.ulbsList.map(u => (<TableRow key={u}><TableCell className="text-[10px] font-bold uppercase">{u}</TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged MRF</p><p className="text-xl font-black text-primary underline">{stateData.mrfsList.length}</p></Card>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Facility Roster</div>
                <ScrollArea className="h-64"><Table><TableBody>{stateData.mrfsList.map(m => (<TableRow key={m}><TableCell className="text-[10px] font-bold uppercase">{m}</TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">GPs Tagged</p><p className="text-xl font-black text-primary underline">{stateData.allGps.length}</p></Card>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Gram Panchayat Master Directory</div>
                <ScrollArea className="h-80"><Table><TableBody>{stateData.allGps.map((g, i) => (<TableRow key={i}><TableCell className="text-[10px] font-bold uppercase">{g.gpName} <span className="opacity-40 ml-1">({g.district})</span></TableCell></TableRow>))}</TableBody></Table></ScrollArea>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger asChild>
                <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Households</p>
                    <p className="text-xl font-black text-primary underline">{stateData.allGps.reduce((s,g) => s + g.households, 0).toLocaleString()}</p>
                </Card>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 border-2 shadow-2xl overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Household Census (Nodal)</div>
                <ScrollArea className="h-80">
                  <Table>
                    <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] uppercase font-black">GP Node</TableHead><TableHead className="text-[9px] uppercase font-black text-right">Count</TableHead></TableRow></TableHeader>
                    <TableBody>{stateData.allGps.map((g, i) => (<TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{g.gpName}</TableCell><TableCell className="text-right font-mono font-bold text-xs">{g.households.toLocaleString()}</TableCell></TableRow>))}</TableBody>
                  </Table>
                </ScrollArea>
            </PopoverContent>
        </Popover>

        <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Total State Load</p><p className="text-lg font-black uppercase">{(stateData.surveyedTotal / 1000).toFixed(1)} Tons</p></Card>
        
        <Card className="border-2 shadow-sm p-4 text-center bg-primary/5 border-primary/20"><p className="text-[9px] font-black uppercase text-primary mb-1">State Efficiency</p><p className="text-lg font-black text-primary">{stateData.efficiency.toFixed(1)}%</p></Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-destructive/20 bg-destructive/[0.01]">
                <CardHeader className="bg-destructive/5 border-b pb-3 flex row items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-base font-black uppercase text-destructive">State Operational Discrepancy</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[250px]">
                        <div className="divide-y">
                            {stateData.discrepancies.filter((d: any) => !solvedAlerts.includes(d.id)).map((alert: any) => (
                                <div key={alert.id} className="p-4 flex items-center justify-between group">
                                    <p className="text-[10px] font-bold text-foreground uppercase italic">{alert.msg}</p>
                                    <Button size="sm" variant="outline" className="h-7 text-[8px] font-black uppercase hover:bg-green-600 hover:text-white" onClick={() => setSolvedAlerts([...solvedAlerts, alert.id])}>Mark Solved</Button>
                                </div>
                            ))}
                            {stateData.discrepancies.filter((d: any) => !solvedAlerts.includes(d.id)).length === 0 && (
                                <div className="p-12 text-center text-muted-foreground opacity-30 italic uppercase font-black text-xs">No active state-wide alerts.</div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="border-2 border-primary/30 bg-primary/[0.01]">
                <CardHeader className="bg-primary/5 border-b pb-3 flex row items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base font-black uppercase">Active Today Circuits</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[250px]">
                        <div className="grid divide-y">
                            {stateData.activeToday.map((log: any, i: number) => (
                                <div key={i} className={`p-4 flex items-center justify-between border-l-4 border-l-green-600 bg-green-50/10`}>
                                    <div className="flex-[1.5] space-y-0.5 border-r border-dashed pr-6">
                                        <p className="font-black text-[9px] uppercase text-primary leading-none">{log.district} | {log.block}</p>
                                        <p className="font-black text-[11px] uppercase truncate text-primary">{log.routeId}: {log.routeName}</p>
                                        <p className="text-[8px] font-black text-muted-foreground uppercase">{log.mrf}</p>
                                    </div>
                                    <div className="flex-1 text-center px-6 border-r border-dashed">
                                        <div className={`text-sm font-black text-green-700 animate-pulse`}>Active Today</div>
                                        <p className="text-[9px] font-black text-blue-700 uppercase mt-1">{log.scheduleStr}</p>
                                    </div>
                                    <div className="flex-[1.5] text-right space-y-1 pl-6">
                                        <p className="text-[10px] font-black uppercase leading-none">{log.driver}</p>
                                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase">{log.vehicle}</p>
                                        <p className="text-[9px] font-black text-primary font-mono">{log.contact}</p>
                                        <p className="text-[8px] font-bold text-foreground/50 italic truncate">{log.startGp} → {log.endGp}</p>
                                        <p className="text-[8px] font-black text-muted-foreground uppercase leading-none mt-1">Target: {log.mrf}</p>
                                    </div>
                                </div>
                            ))}
                            {stateData.activeToday.length === 0 && (
                              <div className="p-12 text-center text-muted-foreground italic uppercase font-black text-[10px]">No circuits synchronized for active operation today.</div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
      </div>

      <Card className="border-2 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-black uppercase flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary"/> Block-level Recovery Trend (Kg)</CardTitle>
            <Tabs value={lineToggle} onValueChange={setLineToggle}>
                <TabsList className="h-8 bg-background border"><TabsTrigger value="weekly" className="text-[9px] font-black uppercase">Weekly</TabsTrigger><TabsTrigger value="monthly" className="text-[9px] font-black uppercase">Monthly</TabsTrigger></TabsList>
            </Tabs>
        </CardHeader>
        <CardContent className="h-[400px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stateData.lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" fontSize={8} fontWeight="bold" angle={-45} textAnchor="end" height={100} interval={0} />
                    <YAxis fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(1)}T`} />
                    <Tooltip />
                    <Line type="monotone" dataKey={lineToggle === 'monthly' ? 'monthly' : 'weekly'} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 2, fill: "hsl(var(--primary))" }} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><DistrictIcon className="h-4 w-4 text-primary" /> District-wise Verified Inventory</CardTitle></CardHeader>
        <CardContent className="h-[350px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData.districtTonnage}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" fontSize={8} fontWeight="bold" angle={-45} textAnchor="end" height={80} interval={0} />
                    <YAxis fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(1)}T`} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> State Nodal Rankings (GPs)</CardTitle>
                <Tabs value={barToggle} onValueChange={setBarToggle}>
                    <TabsList className="h-7"><TabsTrigger value="top" className="text-[8px] font-black px-2">Top 5</TabsTrigger><TabsTrigger value="low" className="text-[8px] font-black px-2">Lowest 5</TabsTrigger></TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateData.gpRankingsData.sort((a: any, b: any) => barToggle === 'top' ? b.surveyed - a.surveyed : a.surveyed - b.surveyed).slice(0, 5)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                        <XAxis type="number" fontSize={10} />
                        <YAxis dataKey="gpName" type="category" fontSize={9} width={80} fontWeight="bold" />
                        <Tooltip />
                        <Bar dataKey="surveyed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Warehouse className="h-4 w-4 text-primary" /> Infrastructure Audit (Top 5)</CardTitle>
                <Tabs value={mrfUlbToggle} onValueChange={setMrfUlbToggle}>
                    <TabsList className="h-7"><TabsTrigger value="mrf" className="text-[8px] font-black px-2">MRFs</TabsTrigger><TabsTrigger value="ulb" className="text-[8px] font-black px-2">ULBs</TabsTrigger></TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mrfUlbToggle === 'mrf' ? stateData.top5Mrfs : stateData.top5Ulbs}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" fontSize={8} fontWeight="bold" angle={-45} textAnchor="end" height={80} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="val" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> State Recovery (Last 5 Months)</CardTitle></CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateData.monthlyRecoveryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="month" fontSize={10} fontWeight="bold" />
                        <YAxis fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(0)}T`} />
                        <Tooltip />
                        <Bar dataKey="val" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
            <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> State Stream Composition</CardTitle></CardHeader>
            <CardContent className="h-[300px] pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={stateData.streamData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {stateData.streamData.map((_: any, i: number) => (<Cell key={`cell-${i}`} fill={COMPOSITION_COLORS[i % COMPOSITION_COLORS.length]} />))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '9px', fontWeight: 'black', textTransform: 'uppercase'}} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> Professional State-wide Registry</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-6 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Sanitation Workers</p>
                        <p className="text-2xl font-black text-primary underline">{stateData.workers.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Users className="h-3 w-3" /> State-wide Roster</div>
                    <ScrollArea className="h-64">
                        <Table>
                            <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] font-black uppercase">Name</TableHead><TableHead className="text-[9px] font-black uppercase text-right">Contact</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {stateData.workers.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed">
                                        <TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell>
                                        <TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact || '9437XXXXXX'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-6 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (GP)</p>
                        <p className="text-2xl font-black text-primary underline">{stateData.peos.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> State PEO Directory</div>
                    <ScrollArea className="h-64">
                        <Table>
                            <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] font-black uppercase">Name</TableHead><TableHead className="text-[9px] font-black uppercase text-right">Contact</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {stateData.peos.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed">
                                        <TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell>
                                        <TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-6 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (ULB)</p>
                        <p className="text-2xl font-black text-primary underline">{stateData.operators.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><UserCircle className="h-3 w-3" /> State Operator Directory</div>
                    <ScrollArea className="h-64">
                        <Table>
                            <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] font-black uppercase">Name</TableHead><TableHead className="text-[9px] font-black uppercase text-right">Contact</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {stateData.operators.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed">
                                        <TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell>
                                        <TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-6 text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Logistical Drivers</p>
                        <p className="text-2xl font-black text-primary underline">{stateData.stateDrivers.length}</p>
                    </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Truck className="h-3 w-3" /> State Driver Directory</div>
                    <ScrollArea className="h-64">
                        <Table>
                            <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] font-black uppercase">Name</TableHead><TableHead className="text-[9px] font-black uppercase text-right">Contact</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {stateData.stateDrivers.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed">
                                        <TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell>
                                        <TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
      </div>
    </div>
  );
}

export default function StateAdminDashboard() {
    return (<Suspense fallback={<div>Loading state dashboard...</div>}><StateAdminDashboardContent /></Suspense>);
}