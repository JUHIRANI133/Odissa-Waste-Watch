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
  // Block Khariar (Khariar MRF)
  {
    id: 1,
    block: 'Khariar',
    routeId: 'NKHAR1',
    routeName: 'Route-1',
    routeAbbreviation: 'ABBBFBC-01',
    startingGp: 'AREDA',
    intermediateGps: ['BADDOHEL', 'BADI', 'BARGAON', 'BHOJPUR', 'BHULIASIKUAN', 'GARDAMUNDA', 'CHANABEDA', 'CHINDAGUDA', 'KENDUPATI', 'LANJI', 'SANMAHESWAR'],
    finalGp: 'TUKLA',
    destination: 'KHARIAR MRF',
    totalDistance: 60,
    workers: [],
    scheduledOn: 'MON, THU'
  },
  {
    id: 2,
    block: 'Khariar',
    routeId: 'NKHAR2',
    routeName: 'Route-2',
    routeAbbreviation: 'BKKDM-02',
    startingGp: 'BIRIGHAT',
    intermediateGps: ['KHASBAHAL', 'KHUDPEJ', 'KIRIKITA', 'DUAJHAR', 'MANDOSIL', 'NEHENA', 'RANIMUNDA', 'RISIGAON', 'DOHELPADA', 'SARDHAPUR', 'SUNARI SIKUAN'],
    finalGp: 'DABRI',
    destination: 'KHARIAR MRF',
    totalDistance: 60,
    workers: [],
    scheduledOn: 'TUE, FRI'
  },

  // Block Sinapali
  {
    id: 3,
    block: 'Sinapali',
    routeId: 'NSINB3',
    routeName: 'Route-3',
    routeAbbreviation: 'BBCHGH-03',
    startingGp: 'BARGAON',
    intermediateGps: ['BHARUAMUNDA', 'CHATIAGUDA', 'GANDABAHALI', 'HATIBANDHA', 'LITIGUDA', 'MAKHAPADAR', 'GODAL'],
    finalGp: 'SINAPALI',
    destination: 'KHARIAR MRF',
    totalDistance: 40,
    workers: [],
    scheduledOn: 'MON, THU'
  },
  {
    id: 4,
    block: 'Sinapali',
    routeId: 'NSINK4',
    routeName: 'Route-4',
    routeAbbreviation: 'KJKKK-04',
    startingGp: 'KUSUMJORE',
    intermediateGps: ['JHARBANDH', 'KAINTPADAR', 'KARANBAHALI', 'KENDUMUNDA', 'KHAIRABHADI', 'KHARSEL', 'SINGJHAR'],
    finalGp: 'GHUCHAGUDA',
    destination: 'KHARIAR MRF',
    totalDistance: 50,
    workers: [],
    scheduledOn: 'TUE, FRI'
  },
  {
    id: 5,
    block: 'Sinapali',
    routeId: 'NSING5',
    routeName: 'Route-5',
    routeAbbreviation: 'GNNNR-05',
    startingGp: 'GORLA',
    intermediateGps: ['NANGALBOD', 'NILJEE', 'NUAMALPADA', 'NUAPADA', 'RANIMUNDA', 'GHANTIGUDA', 'GHATMAL'],
    finalGp: 'TIMANPUR',
    destination: 'KHARIAR MRF',
    totalDistance: 60,
    workers: [],
    scheduledOn: 'WED, SAT'
  },

  // Block Boden
  {
    id: 6,
    block: 'Boden',
    routeId: 'NBODB6',
    routeName: 'Route-6',
    routeAbbreviation: 'BDFPL-06',
    startingGp: 'BABEBIR',
    intermediateGps: ['DAMJHAR', 'FARSARA', 'PALSAPADA', 'LITISARGI', 'ROKAL', 'LARKA'],
    finalGp: 'KARANGAMAL',
    destination: 'KHARIAR MRF',
    totalDistance: 50,
    workers: [],
    scheduledOn: 'MON, THU'
  },
  {
    id: 7,
    block: 'Boden',
    routeId: 'NBODB7',
    routeName: 'Route-7',
    routeAbbreviation: 'BKSUKN-07',
    startingGp: 'BODEN',
    intermediateGps: ['BHAISADANI', 'KARLAKOT', 'SUNAPUR', 'KHAIRA', 'NAGAPADA'],
    finalGp: 'BOIRGAON',
    destination: 'KHARIAR MRF',
    totalDistance: 40,
    workers: [],
    scheduledOn: 'TUE, FRI'
  },

  // Block Komna
  {
    id: 8,
    block: 'Komna',
    routeId: 'NKOMA8',
    routeName: 'Route-8',
    routeAbbreviation: 'AKRD-08',
    startingGp: 'AGREN',
    intermediateGps: ['KONABIRA', 'RAJNA', 'DHORLAMUNDA', 'PENDRAWAN', 'JHAGRAHI', 'DEODHARA', 'KOMNA', 'BUHIKOMNA', 'TIKRAPADA'],
    finalGp: 'POINR',
    destination: 'KHARIAR MRF',
    totalDistance: 60,
    workers: [],
    scheduledOn: 'TUE, FRI'
  },
  {
    id: 9,
    block: 'Komna',
    routeId: 'NKOMS9',
    routeName: 'Route-9',
    routeAbbreviation: 'SSM-09',
    startingGp: 'SOSENG',
    intermediateGps: ['SUNABEDA'],
    finalGp: 'MICHHAPALI',
    destination: 'KHARIAR MRF',
    totalDistance: 30,
    workers: [],
    scheduledOn: 'MON'
  }
];