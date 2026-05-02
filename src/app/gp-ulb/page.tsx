'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Truck, 
  ArrowRight,
  AlertCircle,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Layers,
  Building,
  Warehouse,
  ListFilter,
  UserCircle,
  ShieldCheck,
  Calendar as CalendarIcon,
  MapPin,
  Calculator,
  Navigation,
  Weight,
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

// Type Definitions
interface GpMapping {
  gpName: string;
  taggedUlb: string;
  [key: string]: any;
}

interface WasteGeneration {
  gpName: string;
  totalHouseholds: number;
  monthlyWasteTotalGm: number;
  [key: string]: any;
}

interface CollectionSchedule {
  ulb: string;
  mrf: string;
  collectionSchedule: string;
  routeId?: string;
  routeName?: string;
  gpNodalPerson?: string;
  gpNodalContact?: string;
  ulbNodalPerson?: string;
  ulbNodalContact?: string;
  driverName?: string;
  driverContact?: string;
  vehicleType?: string;
  vehicleNo?: string;
  block?: string;
  [key: string]: any;
}

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

interface DistrictData {
  data: {
    gpMappings: GpMapping[];
    wasteGeneration: WasteGeneration[];
    collectionSchedules: CollectionSchedule[];
    routes: RouteData[];
  };
  getGpDetails: (gpName: string) => any;
  getBlockDetails: (blockName: string) => any;
}

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
  gpBreakdown?: { name: string; amount: number }[];
}

interface GpListItem {
  name: string;
  households: number;
  surveyedWaste: number;
  verifiedWaste: number;
}

interface ScheduleItem extends CollectionSchedule {
  days: number;
  isActiveToday: boolean;
}

interface WorkerItem {
  name: string;
  contact?: string;
}

interface DiscrepancyItem {
  id: string;
  msg: string;
}

interface LineDataItem {
  name: string;
  weekly: number;
  monthly: number;
}

interface MrfTonnageItem {
  name: string;
  value: number;
}

interface StreamDataItem {
  name: string;
  value: number;
}

const COMPOSITION_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#64748b'];

const calculateDaysUntilNext = (schedule: string, now: Date): number => {
    if (!schedule || /notified|required|TBD|NA/i.test(schedule)) return 999;
    
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

    const getNthWeekdayOfMonth = (year: number, month: number, weekdayIdx: number, n: number): Date | null => {
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
            if (diff === 0) minDays = 0;
            else if (diff < minDays) minDays = diff;
        }
    });
    if (foundWeekday && minDays !== 999) return minDays;

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

function GpUlbDashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const gpName = searchParams.get('gp') || '';
  const ulbName = searchParams.get('ulb') || '';
  const blockName = searchParams.get('block') || '';
  const districtNameParam = searchParams.get('district');
  
  const [mounted, setMounted] = useState(false);
  const [solvedAlerts, setSolvedAlerts] = useState<string[]>([]);
  const [lineToggle, setLineToggle] = useState('monthly');
  const [barToggle, setBarToggle] = useState('top');

  const db = useFirestore();
  
  // Real-time waste records state (for graphs)
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>([]);
  
  // Listen to waste details from Firestore (for graphs)
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
          gpBreakdown: data.gpBreakdown || []
        });
      });
      setWasteRecords(items);
    });
    
    return () => unsubscribe();
  }, [db]);

  // Listen to route plans from Firestore (for active circuits and workers)
  const [firestoreRoutes, setFirestoreRoutes] = useState<RouteData[]>([]);
  useEffect(() => {
    if (!db) return;
    const routesQuery = query(collection(db, 'routePlans'), where('isDeleted', '==', false));
    const unsubscribe = onSnapshot(routesQuery, (snapshot) => {
      const routes: RouteData[] = [];
      snapshot.forEach((doc: DocumentData) => {
        const data = doc.data();
        routes.push({ id: doc.id, ...data } as RouteData);
      });
      setFirestoreRoutes(routes);
    });
    return () => unsubscribe();
  }, [db]);

  // Listen to collection schedules from Firestore (for drivers, PEOs, operators)
  const [firestoreSchedules, setFirestoreSchedules] = useState<CollectionSchedule[]>([]);
  useEffect(() => {
    if (!db) return;
    const schedulesQuery = query(collection(db, 'collectionSchedules'));
    const unsubscribe = onSnapshot(schedulesQuery, (snapshot) => {
      const schedules: CollectionSchedule[] = [];
      snapshot.forEach((doc: DocumentData) => {
        const data = doc.data();
        schedules.push({ id: doc.id, ...data } as CollectionSchedule);
      });
      setFirestoreSchedules(schedules);
    });
    return () => unsubscribe();
  }, [db]);

  useEffect(() => { setMounted(true); }, []);

  const districtName = useMemo(() => {
    if (districtNameParam) return districtNameParam;
    if (ulbName) return mrfData.find(m => m.ulbName.toLowerCase().trim() === ulbName.toLowerCase().trim())?.district || '';
    if (gpName && blockName) return mrfData.find(m => m.blockCovered.toLowerCase().trim() === blockName.toLowerCase().trim())?.district || '';
    return '';
  }, [districtNameParam, ulbName, gpName, blockName]);

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
    return map[districtName.toLowerCase()] as DistrictData;
  }, [districtName]);

  const ulbRealData = useMemo(() => {
    if (!mounted || role !== 'ulb' || !ulbName || !districtSource) return null;
    
    const ulbRecords = mrfData.filter(m => m.ulbName.toLowerCase().trim() === ulbName.toLowerCase().trim());
    const mrfIds = ulbRecords.map(m => m.mrfId);
    
    const gpMappings = (districtSource as any).data.gpMappings.filter((m: GpMapping) => 
        m.taggedUlb.toLowerCase().trim().includes(ulbName.toLowerCase().trim()) || 
        ulbName.toLowerCase().trim().includes(m.taggedUlb.toLowerCase().trim())
    );

    // Get real waste records for this ULB
    const ulbWasteRecords = wasteRecords.filter(r => 
      r.ulb?.toLowerCase().trim() === ulbName.toLowerCase().trim() ||
      r.mrf?.toLowerCase().trim() === ulbName.toLowerCase().trim() ||
      mrfIds.some(id => r.mrf?.toLowerCase().trim() === id.toLowerCase().trim())
    );
    const hasRealData = ulbWasteRecords.length > 0;

    const gpsList: GpListItem[] = gpMappings.map((gp: GpMapping) => {
        const wasteInfo = (districtSource as any).data.wasteGeneration.find((w: WasteGeneration) => w.gpName.toLowerCase().trim() === gp.gpName.toLowerCase().trim());
        const gpVerifiedWaste = ulbWasteRecords.filter(r => r.gpName === gp.gpName).reduce((s: number, r: WasteRecord) => s + (r.driverSubmitted || 0), 0);
        return { name: gp.gpName, households: wasteInfo?.totalHouseholds || 0, surveyedWaste: (wasteInfo?.monthlyWasteTotalGm / 1000) || 0, verifiedWaste: gpVerifiedWaste };
    });

    // Merge local schedules with Firestore schedules
    let localSchedules = (districtSource as any).data.collectionSchedules.filter((s: CollectionSchedule) => 
        s.ulb.toLowerCase().trim().includes(ulbName.toLowerCase().trim()) ||
        mrfIds.some(mId => s.mrf.toLowerCase().includes(mId.toLowerCase()))
    );
    
    const mergedSchedulesMap = new Map<string, CollectionSchedule>();
    firestoreSchedules.forEach(schedule => {
      if (schedule.ulb?.toLowerCase().trim() === ulbName.toLowerCase().trim() ||
          mrfIds.some(mId => schedule.mrf?.toLowerCase().includes(mId.toLowerCase()))) {
        mergedSchedulesMap.set(schedule.gpName || schedule.routeId || '', schedule);
      }
    });
    
    localSchedules.forEach((schedule: CollectionSchedule) => {
      if (!mergedSchedulesMap.has(schedule.gpName || schedule.routeId || '')) {
        mergedSchedulesMap.set(schedule.gpName || schedule.routeId || '', schedule);
      }
    });
    
    const mergedSchedules = Array.from(mergedSchedulesMap.values());
    
    const schedules: ScheduleItem[] = mergedSchedules.map((s: CollectionSchedule) => {
        const days = calculateDaysUntilNext(s.collectionSchedule, new Date());
        return { 
            ...s, 
            days, 
            isActiveToday: days === 0
        };
    }).sort((a: ScheduleItem, b: ScheduleItem) => a.days - b.days);

    // Helper function to safely parse JSON strings
    const safeJsonParse = (jsonStr: unknown): any => {
      try {
        return JSON.parse(jsonStr as string);
      } catch {
        return null;
      }
    };

    const peos = Array.from(new Set(schedules.map((s: ScheduleItem) => JSON.stringify({ name: (s.gpNodalPerson || "").split(',')[0].trim(), contact: (s.gpNodalContact || "").split(',')[0].trim() }))))
        .map((s: unknown) => safeJsonParse(s))
        .filter((p: any) => p && p.name !== '-');

    const ulbOperators = Array.from(new Set(schedules.map((s: ScheduleItem) => JSON.stringify({ name: (s.ulbNodalPerson || "").split('&')[0].trim(), contact: (s.ulbNodalContact || "").split(',')[0].trim() }))))
        .map((s: unknown) => safeJsonParse(s))
        .filter((u: any) => u && u.name !== '-');

    const drivers = Array.from(new Set(schedules.map((s: ScheduleItem) => JSON.stringify({ name: s.driverName, contact: s.driverContact }))))
        .map((s: unknown) => safeJsonParse(s))
        .filter((d: any) => d && d.name !== '-');

    // Get workers from Firestore routes that are relevant to this ULB
    const ulbRoutes = firestoreRoutes.filter(r => 
      r.destination?.toLowerCase().includes(ulbName.toLowerCase()) ||
      r.block?.toLowerCase() === blockName?.toLowerCase()
    );
    const localRoutes = (districtSource as any).data.routes.filter((r: RouteData) => 
        mrfIds.includes(r.destination) || r.destination.toLowerCase().includes(ulbName.toLowerCase())
    );
    const allRelevantRoutes = [...ulbRoutes, ...localRoutes];
    const workers = allRelevantRoutes.flatMap((r: RouteData) => r.workers || []);

    // Nodal Recovery Trend (Kg) - connected to GP waste details
    const lineData: LineDataItem[] = gpsList.map((g: GpListItem) => {
        const gpRecords = wasteRecords.filter(r => r.gpName === g.name);
        return {
            name: g.name,
            weekly: hasRealData ? gpRecords.filter(r => new Date(r.date) > new Date(Date.now() - 7*24*60*60*1000)).reduce((s: number, r: WasteRecord) => s + (r.driverSubmitted || 0), 0) : Math.random() * 50 + 20,
            monthly: hasRealData ? gpRecords.reduce((s: number, r: WasteRecord) => s + (r.driverSubmitted || 0), 0) : Math.random() * 200 + 100
        };
    });

    // Nodal Performance Rankings - connected to GP waste details
    const gpRankingsData = [...gpsList].map(g => ({ name: g.name, verifiedWaste: g.verifiedWaste }));

    // Facility Inventory (All Time) - connected to ULB waste details
    const mrfTonnage: MrfTonnageItem[] = mrfIds.map((id: string) => ({
        name: id,
        value: hasRealData ? wasteRecords.filter((r: WasteRecord) => r.mrf === id).reduce((s: number, r: WasteRecord) => s + (r.driverSubmitted || 0), 0) : 500 + Math.random() * 1000
    }));

    // Nodal Recovery (Last 5 Months) - connected to ULB waste details
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    let monthlyRecoveryData: any[] = [];
    
    if (hasRealData && ulbWasteRecords.length > 0) {
        const monthMap = new Map<string, number>();
        for (let i = 4; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthNames[d.getMonth()];
            monthMap.set(monthName, 0);
        }
        
        ulbWasteRecords.forEach(record => {
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
        monthlyRecoveryData = [{month: 'Mar', val: 12000}, {month: 'Apr', val: 14500}, {month: 'May', val: 18000}, {month: 'Jun', val: 16200}, {month: 'Jul', val: 21600}];
    }

    // Nodal Stream Composition - connected to ULB waste details
    const streamData: StreamDataItem[] = hasRealData ? [
        { name: 'Plastic', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.plastic || 0), 0) },
        { name: 'Paper', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.paper || 0), 0) },
        { name: 'Metal', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.metal || 0), 0) },
        { name: 'Glass', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.glass || 0), 0) },
        { name: 'Sanitation', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.sanitation || 0), 0) },
        { name: 'Others', value: ulbWasteRecords.reduce((s: number, r: WasteRecord) => s + (r.others || 0), 0) },
    ] : [
        { name: 'Plastic', value: 450 }, { name: 'Paper', value: 300 }, { name: 'Metal', value: 120 }, 
        { name: 'Glass', value: 80 }, { name: 'Sanitation', value: 150 }, { name: 'Others', value: 100 }
    ];

    const discrepancies: DiscrepancyItem[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    schedules.filter((s: ScheduleItem) => s.isActiveToday).forEach((s: ScheduleItem, idx: number) => {
        const hasReceipt = wasteRecords.some((r: WasteRecord) => r.date === todayStr && (r.routeId === s.routeId || r.gpName === s.gpName));
        if (!hasReceipt) {
            discrepancies.push({ 
                id: `miss-${districtName}-${blockName}-${s.routeId}-${s.gpName}-${idx}`.replace(/\s+/g, '-'), 
                msg: `Circuit ${s.routeId} active today - No receipt transmitted.` 
            });
        }
    });

    return { 
        primaryRecord: ulbRecords[0], gpsList, activeCircuits: schedules, lineData, mrfTonnage, streamData, discrepancies,
        mrfCount: mrfIds.length, mrfList: mrfIds, workers, drivers, peos, ulbOperators,
        gpRankingsData, monthlyRecoveryData, hasRealData
    };
  }, [role, ulbName, districtSource, mounted, wasteRecords, blockName, districtName, firestoreSchedules, firestoreRoutes]);

  const gpRealData = useMemo(() => {
    if (!mounted || role !== 'gp' || !gpName || !districtSource) return null;
    const details = (districtSource as any).getGpDetails(gpName);
    
    // Get real waste records for this GP
    const gpRecords = wasteRecords.filter((r: WasteRecord) => r.gpName === gpName || (r.gpBreakdown?.some((g: any) => g.name === gpName)));
    const hasRealData = gpRecords.length > 0;
    
    // Get the total driver submitted amount
    const totalVerified = gpRecords.reduce((s: number, r: WasteRecord) => s + (r.driverSubmitted || 0), 0);
    const surveyedWaste = details.waste?.monthlyWasteTotalGm ? details.waste.monthlyWasteTotalGm / 1000 : 0;
    const recoveryRate = surveyedWaste > 0 ? (totalVerified / surveyedWaste) * 100 : 94.5;

    // Nodal Recovery Trend (Kg) - connected to GP waste details
    const weekNames = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    let lineData: LineDataItem[] = [];
    
    if (hasRealData && gpRecords.length > 0) {
        const now = new Date();
        const weeks: number[][] = [[], [], [], []];
        gpRecords.forEach(record => {
            const date = new Date(record.date);
            const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
            const weekIndex = Math.floor(diffDays / 7);
            if (weekIndex >= 0 && weekIndex < 4) {
                weeks[weekIndex].push(record.driverSubmitted);
            }
        });
        
        lineData = weekNames.map((name, idx) => ({
            name,
            weekly: weeks[idx].reduce((s: number, v: number) => s + v, 0),
            monthly: totalVerified
        }));
    } else {
        lineData = weekNames.map((name, idx) => ({
            name,
            weekly: [45, 52, 38, 65][idx],
            monthly: 180 + idx * 20
        }));
    }

    // Waste Collected (Last 5 Months) - connected to GP waste details
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    let monthlyTonnage: any[] = [];
    
    if (hasRealData && gpRecords.length > 0) {
        const monthMap = new Map<string, number>();
        for (let i = 4; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthNames[d.getMonth()];
            monthMap.set(monthName, 0);
        }
        
        gpRecords.forEach(record => {
            const date = new Date(record.date);
            const monthName = monthNames[date.getMonth()];
            monthMap.set(monthName, (monthMap.get(monthName) || 0) + (record.driverSubmitted || 0));
        });
        
        monthlyTonnage = Array.from(monthMap.entries()).map(([month, val]) => ({ month, value: val }));
    } else {
        monthlyTonnage = [
            { month: 'Mar', value: 1200 },
            { month: 'Apr', value: 1450 },
            { month: 'May', value: 1800 },
            { month: 'Jun', value: 1620 },
            { month: 'Jul', value: 1900 },
        ];
    }

    // Nodal Stream Composition - connected to GP waste details
    const streamData: StreamDataItem[] = hasRealData ? [
        { name: 'Plastic', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.plastic || 0), 0) },
        { name: 'Paper', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.paper || 0), 0) },
        { name: 'Metal', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.metal || 0), 0) },
        { name: 'Glass', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.glass || 0), 0) },
        { name: 'Sanitation', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.sanitation || 0), 0) },
        { name: 'Others', value: gpRecords.reduce((s: number, r: WasteRecord) => s + (r.others || 0), 0) },
    ] : [
        { name: 'Plastic', value: 450 }, { name: 'Paper', value: 300 }, { name: 'Metal', value: 120 }, 
        { name: 'Glass', value: 80 }, { name: 'Sanitation', value: 150 }, { name: 'Others', value: 100 }
    ];

    // Get schedule from Firestore or local data
    let scheduleStr = details.schedule?.collectionSchedule;
    let driverName = details.schedule?.driverName;
    let driverContact = details.schedule?.driverContact;
    let vehicleType = details.schedule?.vehicleType;
    let routeId = details.routes?.[0]?.routeId;
    let routeName = details.routes?.[0]?.routeName;
    let destination = details.routes?.[0]?.destination;
    
    // Check Firestore for overrides
    const firestoreSchedule = firestoreSchedules.find((s: CollectionSchedule) => s.gpName?.toLowerCase() === gpName.toLowerCase());
    if (firestoreSchedule) {
        scheduleStr = firestoreSchedule.collectionSchedule || scheduleStr;
        driverName = firestoreSchedule.driverName || driverName;
        driverContact = firestoreSchedule.driverContact || driverContact;
        vehicleType = firestoreSchedule.vehicleType || vehicleType;
    }
    
    const firestoreRoute = firestoreRoutes.find((r: RouteData) => 
      r.startingGp?.toLowerCase() === gpName.toLowerCase() ||
      r.intermediateGps?.some((igp: string) => igp.toLowerCase() === gpName.toLowerCase()) ||
      r.finalGp?.toLowerCase() === gpName.toLowerCase()
    );
    if (firestoreRoute) {
        routeId = firestoreRoute.routeId || routeId;
        routeName = firestoreRoute.routeName || routeName;
        destination = firestoreRoute.destination || destination;
    }
    
    scheduleStr = scheduleStr || details.routes?.[0]?.scheduledOn || 'Scheduled';
    const daysLeft = calculateDaysUntilNext(scheduleStr, new Date());

    const circuit = {
        ulb: details.mapping?.taggedUlb || 'N/A',
        mrf: details.mapping?.taggedMrf || destination || 'N/A',
        id: routeId || 'TBD',
        name: routeName || 'Verified Circuit',
        vehicle: vehicleType || 'Motorised',
        driver: (driverName && driverName !== '-') ? driverName : 'Verified',
        driverContact: driverContact || '9437XXXXXX',
        scheduleDay: scheduleStr,
        isActiveToday: daysLeft === 0,
        countdown: daysLeft === 0 ? "Active Today" : `Arrival in ${daysLeft} days`
    };

    const targetUlb = details.mapping?.taggedUlb || '';
    
    // Get schedules from Firestore and local
    let siblingSchedules = (districtSource as any).data.collectionSchedules.filter((s: CollectionSchedule) => 
        s.ulb.toLowerCase().trim().includes(targetUlb.toLowerCase().trim()) ||
        targetUlb.toLowerCase().trim().includes(s.ulb.toLowerCase().trim())
    );
    
    firestoreSchedules.forEach(schedule => {
      if (schedule.ulb?.toLowerCase().trim().includes(targetUlb.toLowerCase().trim()) ||
          targetUlb.toLowerCase().trim().includes(schedule.ulb?.toLowerCase().trim() || '')) {
        if (!siblingSchedules.some((s: CollectionSchedule) => s.gpName === schedule.gpName)) {
          siblingSchedules.push(schedule);
        }
      }
    });
    
    // Helper function to safely parse JSON strings - for GP section
    const safeJsonParseGp = (jsonStr: unknown): any => {
      try {
        return JSON.parse(jsonStr as string);
      } catch {
        return null;
      }
    };

    // Use siblingSchedules for GP section (not schedules)
    const peos = Array.from(new Set(siblingSchedules.map((s: CollectionSchedule) => JSON.stringify({ name: (s.gpNodalPerson || "").split(',')[0].trim(), contact: (s.gpNodalContact || "").split(',')[0].trim() }))))
        .map((s: unknown) => safeJsonParseGp(s))
        .filter((p: any) => p && p.name !== '-');

    const ulbOperators = Array.from(new Set(siblingSchedules.map((s: CollectionSchedule) => JSON.stringify({ name: (s.ulbNodalPerson || "").split('&')[0].trim(), contact: (s.ulbNodalContact || "").split(',')[0].trim() }))))
        .map((s: unknown) => safeJsonParseGp(s))
        .filter((u: any) => u && u.name !== '-');

    const drivers = Array.from(new Set(siblingSchedules.map((s: CollectionSchedule) => JSON.stringify({ name: s.driverName, contact: s.driverContact }))))
        .map((s: unknown) => safeJsonParseGp(s))
        .filter((d: any) => d && d.name !== '-');

    const blockDetails = (districtSource as any).getBlockDetails(blockName);
    let relevantRoute = (blockDetails.routes || []).find((r: any) => 
        r.startingGp.toLowerCase().trim() === gpName.toLowerCase().trim() ||
        (r.intermediateGps || []).some((igp: string) => igp.toLowerCase().trim() === gpName.toLowerCase().trim()) ||
        (r.finalGp && r.finalGp.toLowerCase().trim() === gpName.toLowerCase().trim())
    );
    
    // Check Firestore for route workers
    const firestoreRouteForWorkers = firestoreRoutes.find((r: RouteData) => 
      r.startingGp?.toLowerCase() === gpName.toLowerCase() ||
      r.intermediateGps?.some((igp: string) => igp.toLowerCase() === gpName.toLowerCase()) ||
      r.finalGp?.toLowerCase() === gpName.toLowerCase()
    );
    if (firestoreRouteForWorkers && firestoreRouteForWorkers.workers) {
      relevantRoute = firestoreRouteForWorkers;
    }
    
    const workers = relevantRoute?.workers || [];

    const discrepancies: DiscrepancyItem[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    if (daysLeft === 0 && !gpRecords.some((r: WasteRecord) => r.date === todayStr)) {
        discrepancies.push({ 
            id: `miss-${districtName}-${blockName}-${circuit.id}-${gpName}`.replace(/\s+/g, '-'), 
            msg: `Route ${circuit.id} active today - Receipt not submitted.` 
        });
    }

    return { 
        details, circuit, lineData, monthlyTonnage, streamData, gpRecords, peos, ulbOperators, drivers, workers,
        isActiveToday: daysLeft === 0,
        countdown: daysLeft === 0 ? "Active Today" : `Arrival in ${daysLeft} days`,
        scheduleStr,
        discrepancies: discrepancies || [],
        dailyWaste: details.waste?.dailyWasteTotalGm || 0,
        monthlyWaste: details.waste?.monthlyWasteTotalGm || 0,
        totalVerified,
        surveyedWaste,
        recoveryRate,
        hasRealData
    };
  }, [role, gpName, districtSource, mounted, wasteRecords, districtName, blockName, firestoreSchedules, firestoreRoutes]);

  if (!mounted) return <div className="p-12 text-center animate-pulse">Syncing nodal analytics...</div>;

  return (
    <div className="grid gap-6">
      {/* ULB PORTAL VIEW */}
      {role === 'ulb' && ulbRealData && (
        <div className="space-y-8">
            <Card className="border-2 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">ULB Node: {ulbName}</CardTitle>
                            <CardDescription className="font-bold flex gap-4 mt-1 uppercase text-[10px]">
                                <span>Category: {ulbRealData.primaryRecord?.categoryOfUlb || 'NAC'}</span>
                                <span>Functionality: {ulbRealData.primaryRecord?.functionality || 'Functional'}</span>
                                <span>Status: {ulbRealData.hasRealData ? 'LIVE DATA ACTIVE' : 'MOCK DATA MODE'}</span>
                            </CardDescription>
                        </div>
                        <Badge className="bg-primary font-black uppercase text-[10px]">ULB COMMAND CENTRE</Badge>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">District</p><p className="text-xs font-black uppercase truncate">{districtName}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Block</p><p className="text-xs font-black uppercase truncate">{blockName || ulbRealData.primaryRecord?.blockCovered}</p></Card>
                
                <Popover>
                    <PopoverTrigger asChild>
                        <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged MRF</p>
                            <p className="text-lg font-black text-primary underline">{ulbRealData.mrfCount}</p>
                        </Card>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                        <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Linked Facility Roster</div>
                        <Table><TableBody>{ulbRealData.mrfList.map((m: string, i: number) => (<TableRow key={i}><TableCell className="text-[10px] font-bold uppercase">{m}</TableCell></TableRow>))}</TableBody></Table>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">GPs Tagged</p>
                            <p className="text-lg font-black text-primary underline">{ulbRealData.gpsList.length}</p>
                        </Card>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0 border-2 shadow-2xl overflow-hidden">
                        <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Constituent GP Registry</div>
                        <ScrollArea className="h-64">
                            <Table><TableBody>{ulbRealData.gpsList.map((g: GpListItem, i: number) => (<TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{g.name}</TableCell></TableRow>))}</TableBody></Table>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Card className="border-2 shadow-sm p-4 text-center cursor-pointer hover:bg-primary/5 transition-all group">
                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Households</p>
                            <p className="text-lg font-black text-primary underline">{ulbRealData.gpsList.reduce((s: number, g: GpListItem) => s + g.households, 0).toLocaleString()}</p>
                        </Card>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                        <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px]">Household Census (GP-wise)</div>
                        <Table>
                            <TableHeader className="bg-muted"><TableRow><TableHead className="text-[9px] uppercase font-black">GP Node</TableHead><TableHead className="text-[9px] uppercase font-black text-right">Count</TableHead></TableRow></TableHeader>
                            <TableBody>{ulbRealData.gpsList.map((g: GpListItem, i: number) => (<TableRow key={i} className="h-10 border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{g.name}</TableCell><TableCell className="text-right font-mono font-bold text-xs">{g.households.toLocaleString()}</TableCell></TableRow>))}</TableBody></Table>
                    </PopoverContent>
                </Popover>

                <Card className="border-2 shadow-sm p-4 text-center bg-primary/5 border-primary/20">
                    <p className="text-[9px] font-black uppercase text-primary mb-1">Efficiency Score</p>
                    <p className="text-lg font-black text-primary">96.4%</p>
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
                                {ulbRealData.discrepancies.filter((d: DiscrepancyItem) => !solvedAlerts.includes(d.id)).map((alert: DiscrepancyItem) => (
                                    <div key={alert.id} className="p-4 flex items-center justify-between group">
                                        <p className="text-[10px] font-bold text-foreground uppercase italic">{alert.msg}</p>
                                        <Button size="sm" variant="outline" className="h-7 text-[8px] font-black uppercase hover:bg-green-600 hover:text-white" onClick={() => setSolvedAlerts([...solvedAlerts, alert.id])}>Mark Solved</Button>
                                    </div>
                                ))}
                                {ulbRealData.discrepancies.filter((d: DiscrepancyItem) => !solvedAlerts.includes(d.id)).length === 0 && (
                                    <div className="p-12 text-center text-muted-foreground opacity-30 italic uppercase font-black text-xs">No active discrepancies.</div>
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
                                {ulbRealData.activeCircuits.map((log: ScheduleItem, i: number) => (
                                    <div key={i} className={`p-5 flex items-center justify-between border-l-4 ${log.isActiveToday ? 'border-l-green-600 bg-green-50/10' : 'border-l-primary/20'}`}>
                                        <div className="flex-[1.5] space-y-1 border-r border-dashed pr-6">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground leading-none">
                                                {blockName || log.block} | {log.mrf}
                                            </p>
                                            <p className="font-black text-xs uppercase text-primary truncate">
                                                {log.routeId || 'R-01'}: {log.routeName || 'Circuit'}
                                            </p>
                                        </div>
                                        <div className="flex-1 text-center px-6 border-r border-dashed">
                                            <div className={`text-sm font-black ${log.isActiveToday ? 'text-green-700 animate-pulse' : ''}`}>
                                                {log.isActiveToday ? "Active Today" : `In ${log.days} days`}
                                            </div>
                                            <p className="text-[9px] font-black text-blue-700 uppercase mt-1">
                                                {log.collectionSchedule}
                                            </p>
                                        </div>
                                        <div className="flex-[1.5] text-right space-y-1 pl-6">
                                            <p className="text-[11px] font-black uppercase leading-none">{log.driverName || 'Verified'}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{log.vehicleType} | {log.vehicleNo}</p>
                                            <p className="text-[9px] font-black text-primary font-mono">{log.driverContact}</p>
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
                    <CardTitle className="text-sm font-black uppercase flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary"/> Nodal Recovery Trend (Kg)</CardTitle>
                    <Tabs value={lineToggle} onValueChange={setLineToggle}>
                        <TabsList className="h-8 bg-background border"><TabsTrigger value="weekly" className="text-[9px] font-black uppercase">Weekly</TabsTrigger><TabsTrigger value="monthly" className="text-[9px] font-black uppercase">Monthly</TabsTrigger></TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className="h-[300px] pt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ulbRealData.lineData}>
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
                        <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> Nodal Performance Rankings</CardTitle>
                        <Tabs value={barToggle} onValueChange={setBarToggle}>
                            <TabsList className="h-7"><TabsTrigger value="top" className="text-[8px] font-black px-2">Top 5</TabsTrigger><TabsTrigger value="low" className="text-[8px] font-black px-2">Lowest 5</TabsTrigger></TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[...ulbRealData.gpRankingsData].sort((a: any, b: any) => barToggle === 'top' ? b.verifiedWaste - a.verifiedWaste : a.verifiedWaste - b.verifiedWaste).slice(0, 5)} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                                <XAxis type="number" fontSize={10} />
                                <YAxis dataKey="name" type="category" fontSize={9} width={80} fontWeight="bold" />
                                <Tooltip />
                                <Bar dataKey="verifiedWaste" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-2 shadow-sm">
                    <CardHeader className="bg-muted/10 border-b pb-3 flex flex-row items-center justify-between">
                        <CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Warehouse className="h-4 w-4 text-primary" /> Facility Inventory (All Time)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ulbRealData.mrfTonnage}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" fontSize={9} fontWeight="bold" />
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
                    <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Nodal Recovery (Last 5 Months)</CardTitle></CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ulbRealData.monthlyRecoveryData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="month" fontSize={10} fontWeight="bold" />
                                <YAxis fontSize={10} tickFormatter={(v: number) => `${(v/1000).toFixed(0)}T`} />
                                <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} Tons`} />
                                <Bar dataKey="val" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-2 shadow-sm">
                    <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> Nodal Stream Composition</CardTitle></CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={ulbRealData.streamData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {ulbRealData.streamData.map((_: StreamDataItem, i: number) => (<Cell key={`cell-${i}`} fill={COMPOSITION_COLORS[i % COMPOSITION_COLORS.length]} />))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} Tons`} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> Professional Node Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Sanitation Workers</p>
                                <p className="text-2xl font-black text-primary underline">{ulbRealData.workers.length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Users className="h-3 w-3" /> Sanitation Roster</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[9px] uppercase font-black">Name</TableHead><TableHead className="text-[9px] uppercase font-black text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {ulbRealData.workers.map((n: WorkerItem, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact || '9437XXXXXX'}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (GP)</p>
                                <p className="text-2xl font-black text-primary underline">{ulbRealData.peos.length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> GP PEO Directory</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[9px] uppercase font-black">Name</TableHead><TableHead className="text-[9px] uppercase font-black text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {ulbRealData.peos.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (ULB)</p>
                                <p className="text-2xl font-black text-primary underline">{ulbRealData.ulbOperators.length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><UserCircle className="h-3 w-3" /> ULB Operator Directory</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(ulbRealData.ulbOperators || []).map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Logistical Drivers</p>
                                <p className="text-2xl font-black text-primary underline">{ulbRealData.drivers.length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Truck className="h-3 w-3" /> Driver Directory</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[9px] uppercase font-black">Name</TableHead><TableHead className="text-[9px] uppercase font-black text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {ulbRealData.drivers.map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
      )}

      {/* GP PORTAL VIEW */}
      {role === 'gp' && gpRealData && (
        <div className="space-y-8">
            <Card className="border-2 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-black uppercase tracking-tight text-primary">GP Portal: {gpName}</CardTitle>
                            <CardDescription className="font-bold">Official nodal workspace for jurisdictional waste tracking. {gpRealData.hasRealData ? '(LIVE DATA ACTIVE)' : '(MOCK DATA MODE)'}</CardDescription>
                        </div>
                        <Badge className="bg-primary font-black uppercase text-[10px]">GP COMMAND POST</Badge>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">District</p><p className="text-xs font-black uppercase truncate">{districtName}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Block</p><p className="text-xs font-black uppercase truncate">{blockName}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged ULB</p><p className="text-xs font-black uppercase truncate text-primary">{gpRealData.circuit.ulb}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Tagged MRF</p><p className="text-xs font-black uppercase truncate text-primary">{gpRealData.circuit.mrf}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Households</p><p className="text-lg font-black text-primary">{(gpRealData.details.waste?.totalHouseholds || 0).toLocaleString()}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Schools</p><p className="text-lg font-black text-primary">{gpRealData.details.waste?.schools || 0}</p></Card>
                <Card className="border-2 shadow-sm p-4 text-center"><p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Anganwadis</p><p className="text-lg font-black text-primary">{gpRealData.details.waste?.anganwadis || 0}</p></Card>
                
                <Card className="border-2 shadow-sm p-4 text-center border-primary/20 bg-primary/5">
                    <p className="text-[9px] font-black uppercase text-primary mb-1">Waste/Day (Gm)</p>
                    <p className="text-lg font-black text-primary">{(gpRealData.dailyWaste || 0).toLocaleString()}</p>
                </Card>
                <Card className="border-2 shadow-sm p-4 text-center border-primary/20 bg-primary/5">
                    <p className="text-[9px] font-black uppercase text-primary mb-1">Waste/Month (Gm)</p>
                    <p className="text-lg font-black text-primary">{(gpRealData.monthlyWaste || 0).toLocaleString()}</p>
                </Card>

                <Card className="border-2 shadow-sm p-4 text-center bg-primary/5 border-primary/20">
                    <p className="text-[9px] font-black uppercase text-primary mb-1">Recovery Rate</p>
                    <p className="text-lg font-black text-primary">{gpRealData.recoveryRate.toFixed(1)}%</p>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-destructive/20 bg-destructive/[0.01]">
                    <CardHeader className="bg-destructive/5 border-b pb-3 flex row items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <CardTitle className="text-base font-black uppercase text-destructive">Critical Discrepancy Hub</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[250px]">
                            <div className="divide-y">
                                {gpRealData.discrepancies.filter((d: DiscrepancyItem) => !solvedAlerts.includes(d.id)).map((alert: DiscrepancyItem) => (
                                    <div key={alert.id} className="p-4 flex items-center justify-between group">
                                        <p className="text-[10px] font-bold text-foreground uppercase italic">{alert.msg}</p>
                                        <Button size="sm" variant="outline" className="h-7 text-[8px] font-black uppercase hover:bg-green-600 hover:text-white" onClick={() => setSolvedAlerts([...solvedAlerts, alert.id])}>Mark Solved</Button>
                                    </div>
                                ))}
                                {gpRealData.discrepancies.filter((d: DiscrepancyItem) => !solvedAlerts.includes(d.id)).length === 0 && (
                                    <div className="p-12 text-center text-muted-foreground opacity-30 italic uppercase font-black text-xs">No active discrepancies.</div>
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
                        <div className={`p-5 flex items-center justify-between border-l-4 ${gpRealData.isActiveToday ? 'border-l-green-600 bg-green-50/10' : 'border-l-primary/20'}`}>
                            <div className="flex-[1.5] space-y-1 border-r border-dashed pr-6">
                                <p className="text-[10px] font-black uppercase text-muted-foreground leading-none">
                                    {blockName} | {gpRealData.circuit.mrf}
                                </p>
                                <p className="font-black text-xs uppercase text-primary truncate">
                                    {gpRealData.circuit.id}: {gpRealData.circuit.name}
                                </p>
                            </div>
                            <div className="flex-1 text-center px-6 border-r border-dashed">
                                <div className={`text-sm font-black ${gpRealData.isActiveToday ? 'text-green-700 animate-pulse' : ''}`}>
                                    {gpRealData.countdown}
                                </div>
                                <p className="text-[9px] font-black text-blue-700 uppercase mt-1">
                                    {gpRealData.scheduleStr}
                                </p>
                            </div>
                            <div className="flex-[1.5] text-right space-y-1 pl-6">
                                <p className="text-[11px] font-black uppercase leading-none">{gpRealData.circuit.driver}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{gpRealData.circuit.vehicle}</p>
                                <p className="text-[9px] font-black text-primary font-mono">{gpRealData.circuit.driverContact}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary"/> Nodal Recovery Trend (Kg)</CardTitle>
                    <Tabs value={lineToggle} onValueChange={setLineToggle}>
                        <TabsList className="h-8 bg-background border"><TabsTrigger value="weekly" className="text-[9px] font-black uppercase">Weekly</TabsTrigger><TabsTrigger value="monthly" className="text-[9px] font-black uppercase">Monthly</TabsTrigger></TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className="h-[300px] pt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={gpRealData.lineData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="name" fontSize={10} fontWeight="bold" />
                            <YAxis fontSize={10} />
                            <Tooltip />
                            <Line type="monotone" dataKey={lineToggle === 'monthly' ? 'monthly' : 'weekly'} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Waste Collected (Last 5 Months)</CardTitle></CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gpRealData.monthlyTonnage}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="month" fontSize={10} fontWeight="bold" />
                                <YAxis fontSize={10} tickFormatter={(v: number) => `${(v/1000).toFixed(1)}T`} />
                                <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} Tons`} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-2 shadow-sm">
                    <CardHeader className="bg-muted/10 border-b pb-3"><CardTitle className="text-xs font-black uppercase flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-primary" /> Nodal Stream Composition</CardTitle></CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={gpRealData.streamData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {gpRealData.streamData.map((_: StreamDataItem, i: number) => (<Cell key={`cell-${i}`} fill={COMPOSITION_COLORS[i % COMPOSITION_COLORS.length]} />))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} Tons`} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> Professional Node Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Sanitation Workers</p>
                                <p className="text-2xl font-black text-primary underline">{(gpRealData.workers || []).length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Users className="h-3 w-3" /> Sanitation Roster</div>
                            <ScrollArea className="h-64">
                                <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {(gpRealData.workers || []).map((n: WorkerItem, i: number) => (
                                        <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact || '9437XXXXXX'}</TableCell></TableRow>
                                    ))}
                                </TableBody></Table>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (GP)</p>
                                <p className="text-2xl font-black text-primary underline">{(gpRealData.peos || []).length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> GP PEO Directory</div>
                            <ScrollArea className="h-64">
                                <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {(gpRealData.peos || []).map((n: any, i: number) => (
                                        <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                    ))}
                                </TableBody></Table>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Nodal Person (ULB)</p>
                                <p className="text-2xl font-black text-primary underline">{(gpRealData.ulbOperators || []).length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><UserCircle className="h-3 w-3" /> ULB Operator Directory</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[10px] font-bold uppercase">Name</TableHead><TableHead className="text-[10px] font-bold uppercase text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(gpRealData.ulbOperators || []).map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Card className="border-2 border-primary/10 shadow-sm cursor-pointer hover:bg-primary/5 transition-all p-4 text-center">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Logistical Driver</p>
                                <p className="text-2xl font-black text-primary underline">{(gpRealData.drivers || []).length}</p>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-2 shadow-2xl overflow-hidden">
                            <div className="bg-primary text-primary-foreground p-3 font-black uppercase text-[9px] flex items-center gap-2"><Truck className="h-3 w-3" /> Driver Directory</div>
                            <Table><TableHeader><TableRow><TableHead className="text-[9px] font-bold uppercase">Name</TableHead><TableHead className="text-[9px] font-bold uppercase text-right">Phone</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(gpRealData.drivers || []).map((n: any, i: number) => (
                                    <TableRow key={i} className="border-b border-dashed"><TableCell className="text-[10px] font-bold uppercase">{n.name}</TableCell><TableCell className="text-right font-mono text-[9px] font-black text-primary">{n.contact}</TableCell></TableRow>
                                ))}
                            </TableBody></Table>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default function GpUlbDashboard() {
    return (<Suspense fallback={<div className="p-12 text-center">Loading portal...</div>}><GpUlbDashboardContent /></Suspense>);
}