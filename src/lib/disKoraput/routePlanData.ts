export interface RoutePlanData {
  id: number;
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
  {
    id: 1,
    routeId: 'K/JEY/BAR',
    routeName: 'Barniput',
    routeAbbreviation: 'Barniput',
    startingGp: 'Barniput',
    intermediateGps: [],
    finalGp: 'Barniput',
    destination: 'Jeypore',
    totalDistance: 6,
    workers: [],
    scheduledOn: 'MONDAY'
  },
  {
    id: 2,
    routeId: 'K/JEY/UMU',
    routeName: 'Umuri',
    routeAbbreviation: 'Umuri',
    startingGp: 'Umuri',
    intermediateGps: [],
    finalGp: 'Umuri',
    destination: 'Jeypore',
    totalDistance: 5,
    workers: [],
    scheduledOn: 'FRIDAY'
  },
  {
    id: 3,
    routeId: 'K/KOR/MAT',
    routeName: 'Mathalput',
    routeAbbreviation: 'Mathalput',
    startingGp: 'Mathalput',
    intermediateGps: [],
    finalGp: 'Mathalput',
    destination: 'Koraput',
    totalDistance: 13,
    workers: [{ name: 'Rasmita Patnaik', contact: '9692130996' }],
    scheduledOn: 'ONCE IN EVERY TWO DAYS'
  },
  {
    id: 4,
    routeId: 'K/KOR/BAD',
    routeName: 'Badakerenga',
    routeAbbreviation: 'Badakerenga',
    startingGp: 'Badakerenga',
    intermediateGps: [],
    finalGp: 'Badakerenga',
    destination: 'Koraput',
    totalDistance: 13,
    workers: [{ name: 'Babula Khosla', contact: '7008202029' }],
    scheduledOn: 'TUESDAY'
  },
  {
    id: 5,
    routeId: 'K/KOT/DHA',
    routeName: 'DS-01',
    routeAbbreviation: 'DS-01',
    startingGp: 'Dhamanahandi',
    intermediateGps: [],
    finalGp: 'Sutipadar',
    destination: 'Kotpad',
    totalDistance: 11,
    workers: [],
    scheduledOn: 'MONDAY & THURSDAY'
  },
  {
    id: 6,
    routeId: 'K/SEM/RAJ',
    routeName: 'Rajpalma',
    routeAbbreviation: 'Rajpalma',
    startingGp: 'Rajpalma',
    intermediateGps: [],
    finalGp: 'Rajpalma',
    destination: 'Semiliguda',
    totalDistance: 0,
    workers: [],
    scheduledOn: 'MONDAY & THURSDAY'
  }
];
