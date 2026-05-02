export interface RoutePlanData {
  id: number;
  block: string;
  routeId: string;
  routeName: string;
  routeAbbreviation: string;
  startingGp: string;
  intermediateGps: string[];
  finalGp: string;
  destination: string;
  totalDistance: number;
  workers: {
    name: string;
    contact: string;
  }[];
  scheduledOn: string;
}

export const routePlanData: RoutePlanData[] = [
  // Block Jagatsinghpur
  {
    id: 1,
    block: 'Jagatsinghpur',
    routeId: 'J/J/P',
    routeName: 'P →B→M→P→ULB',
    routeAbbreviation: 'PBM-01',
    startingGp: 'Punanga',
    intermediateGps: ['Anla'],
    finalGp: 'Ayar',
    destination: 'Jagatsinghpur MRF',
    totalDistance: 10,
    workers: [{ name: 'Badana Swain', contact: '7860460747' }],
    scheduledOn: '27.04.2026'
  },
  {
    id: 2,
    block: 'Jagatsinghpur',
    routeId: 'J/J/A',
    routeName: 'G →P →S →A →ULB',
    routeAbbreviation: 'GPSA-02',
    startingGp: 'Ayar',
    intermediateGps: ['Samanga'],
    finalGp: 'Ayar',
    destination: 'Jagatsinghpur MRF',
    totalDistance: 12,
    workers: [{ name: 'Partha Sarathi Nayak', contact: '6371572271' }],
    scheduledOn: '28.04.2026'
  },
  {
    id: 3,
    block: 'Jagatsinghpur',
    routeId: 'J/J/T',
    routeName: 'T→P→ULB',
    routeAbbreviation: 'TPU-03',
    startingGp: 'Tartanga',
    intermediateGps: ['Punanga'],
    finalGp: 'Rambhadeipur',
    destination: 'Jagatsinghpur MRF',
    totalDistance: 5,
    workers: [{ name: 'Renubala Parida', contact: '9667688678' }],
    scheduledOn: '29.04.2026'
  },

  // Block Paradeep (Kujanga)
  {
    id: 4,
    block: 'Paradeep',
    routeId: 'J/P/P',
    routeName: 'P→N→R→C',
    routeAbbreviation: 'PNRC-04',
    startingGp: 'Paradeepgarh',
    intermediateGps: ['Bagadia'],
    finalGp: 'Paradeepgarh',
    destination: 'Paradeep',
    totalDistance: 10,
    workers: [{ name: 'Kalpana Dalai', contact: '7873689742' }],
    scheduledOn: '22.4.2026'
  },
  {
    id: 5,
    block: 'Paradeep',
    routeId: 'J/P/N',
    routeName: 'N→B→S',
    routeAbbreviation: 'NBS-05',
    startingGp: 'Nuagarh',
    intermediateGps: ['Paradeepgarh'],
    finalGp: 'Nuagarh',
    destination: 'Paradeep',
    totalDistance: 12,
    workers: [{ name: 'Sarita Sahoo', contact: '9938093944' }],
    scheduledOn: '22.4.2026'
  },
  {
    id: 6,
    block: 'Paradeep',
    routeId: 'J/P/B',
    routeName: 'B→J',
    routeAbbreviation: 'BJ-06',
    startingGp: 'Bagadia',
    intermediateGps: ['Kothi'],
    finalGp: 'Bagadia',
    destination: 'Paradeep',
    totalDistance: 14,
    workers: [{ name: 'Lily Parida', contact: '7327922630' }],
    scheduledOn: '22.4.2026'
  }
];