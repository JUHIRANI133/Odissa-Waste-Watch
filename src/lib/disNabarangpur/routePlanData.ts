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
  // Umerkote Block (Umerkote MRF)
  {
    id: 1,
    block: 'Umerkote',
    routeId: 'NUMEA1',
    routeName: 'BBKM-01',
    routeAbbreviation: 'BBKM-01',
    startingGp: 'BADAKUMARI',
    intermediateGps: ['BADABHARANDI', 'KARAGAM'],
    finalGp: 'MUNDIGUDA',
    destination: 'UMERKOTE',
    totalDistance: 60,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'SUNDAY'
  },
  {
    id: 2,
    block: 'Umerkote',
    routeId: 'NUMEB2',
    routeName: 'STRBN-02',
    routeAbbreviation: 'STRBN-02',
    startingGp: 'SINGISARI',
    intermediateGps: ['TORENGA', 'RAJPUR', 'BHANDARIGUDA'],
    finalGp: 'NEHURA',
    destination: 'UMERKOTE',
    totalDistance: 70,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'MONDAY'
  },
  {
    id: 3,
    block: 'Umerkote',
    routeId: 'NUMEB3',
    routeName: 'SASB-03',
    routeAbbreviation: 'SASB-03',
    startingGp: 'SEMALA',
    intermediateGps: ['ANCHALA', 'SUNABEDA'],
    finalGp: 'BURJA',
    destination: 'UMERKOTE',
    totalDistance: 40,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'TUESDAY'
  },
  {
    id: 4,
    block: 'Umerkote',
    routeId: 'NUMEB4',
    routeName: 'CMSKB-04',
    routeAbbreviation: 'CMSKB-04',
    startingGp: 'CHIKALAPADAR',
    intermediateGps: ['MURTUMMA', 'SUKHIGAM A/C', 'KOPENA'],
    finalGp: 'BEHEDA',
    destination: 'UMERKOTE',
    totalDistance: 18,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'WEDNESDAY'
  },
  {
    id: 5,
    block: 'Umerkote',
    routeId: 'NUMEB5',
    routeName: 'KBH-05',
    routeAbbreviation: 'KBH-05',
    startingGp: 'KHANDA',
    intermediateGps: ['BHAMINI'],
    finalGp: 'HIRAPUR',
    destination: 'UMERKOTE',
    totalDistance: 20,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'THURSDAY'
  },
  {
    id: 6,
    block: 'Umerkote',
    routeId: 'NUMEB6',
    routeName: 'JBB-06',
    routeAbbreviation: 'JBB-06',
    startingGp: 'JAMRONDA',
    intermediateGps: ['BAKODA'],
    finalGp: 'BENORA',
    destination: 'UMERKOTE',
    totalDistance: 25,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'FRIDAY'
  },
  {
    id: 7,
    block: 'Umerkote',
    routeId: 'NUMEB7',
    routeName: 'KT-07',
    routeAbbreviation: 'KT-07',
    startingGp: 'KURSHI',
    intermediateGps: ['TOHARA'],
    finalGp: 'TOHARA',
    destination: 'UMERKOTE',
    totalDistance: 15,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'SATURDAY'
  },

  // Nabarangpur Block (Nabarangapur MRF)
  {
    id: 8,
    block: 'Nabarangpur',
    routeId: 'NNABA1',
    routeName: 'ABS-01',
    routeAbbreviation: 'ABS-01',
    startingGp: 'AGNIPUR',
    intermediateGps: ['BHTRASUNI'],
    finalGp: 'SANAMASINGA',
    destination: 'NABARANGAPUR',
    totalDistance: 40,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'TUESDAY'
  },
  {
    id: 9,
    block: 'Nabarangpur',
    routeId: 'NNABB2',
    routeName: 'BCB-02',
    routeAbbreviation: 'BCB-02',
    startingGp: 'BIKRAMPUR',
    intermediateGps: ['CHATAHANDI'],
    finalGp: 'BASINI',
    destination: 'NABARANGAPUR',
    totalDistance: 70,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'WEDNESDAY'
  },
  {
    id: 10,
    block: 'Nabarangpur',
    routeId: 'NNABP3',
    routeName: 'PSB-03',
    routeAbbreviation: 'PSB-03',
    startingGp: 'PUJARIGUDA',
    intermediateGps: ['SINDHIGAM'],
    finalGp: 'BADAMASIGAM',
    destination: 'NABARANGAPUR',
    totalDistance: 60,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'FRIDAY'
  },
  {
    id: 11,
    block: 'Nabarangpur',
    routeId: 'NNABT4',
    routeName: 'TM-04',
    routeAbbreviation: 'TM-04',
    startingGp: 'TARAGAM',
    intermediateGps: [],
    finalGp: 'MANRIGUDA',
    destination: 'NABARANGAPUR',
    totalDistance: 30,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'THURSDAY'
  },
  {
    id: 12,
    block: 'Nabarangpur',
    routeId: 'NNABB5',
    routeName: 'BB-05',
    routeAbbreviation: 'BB-05',
    startingGp: 'BAGHASUNI',
    intermediateGps: [],
    finalGp: 'BADAKUMULI',
    destination: 'NABARANGAPUR',
    totalDistance: 30,
    workers: [{ name: 'Verified Personnel', contact: '-' }],
    scheduledOn: 'MONDAY'
  }
];