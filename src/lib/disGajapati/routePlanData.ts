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
    routeId: 'GGOSKAT-1',
    routeName: 'Kathalakaviti to Kerandi',
    routeAbbreviation: 'GKKK-01',
    startingGp: 'Kathalakaviti',
    intermediateGps: ['Kerandi'],
    finalGp: 'Kerandi',
    destination: 'MRF at Betaguda',
    totalDistance: 5,
    workers: [],
    scheduledOn: 'Tuesday, Thursday'
  },
  {
    id: 2,
    routeId: 'GGOSKER-2',
    routeName: 'Kathalakaviti to Kerandi',
    routeAbbreviation: 'GKKK-02',
    startingGp: 'Kathalakaviti',
    intermediateGps: ['Kerandi'],
    finalGp: 'Kerandi',
    destination: 'MRF at Betaguda',
    totalDistance: 5,
    workers: [],
    scheduledOn: 'Tuesday, Thursday'
  },
  {
    id: 3,
    routeId: 'GGUMJHA-3',
    routeName: 'Jhami to Jhami',
    routeAbbreviation: 'GJJJ-03',
    startingGp: 'Jhami',
    intermediateGps: ['Jhami'],
    finalGp: 'Jhami',
    destination: 'MRF at Betaguda',
    totalDistance: 3,
    workers: [],
    scheduledOn: 'Tuesday'
  },
  {
    id: 4,
    routeId: 'GKASRAN-4',
    routeName: 'Ranipeta to Ranipeta',
    routeAbbreviation: 'GRRR-04',
    startingGp: 'Ranipeta',
    intermediateGps: ['Ranipeta'],
    finalGp: 'Ranipeta',
    destination: 'MRF at Betaguda',
    totalDistance: 4,
    workers: [],
    scheduledOn: 'Thursday'
  },
  {
    id: 5,
    routeId: 'GKASGOR-1',
    routeName: 'Goribandha to Goribandha',
    routeAbbreviation: 'GGGG-05',
    startingGp: 'Goribandha',
    intermediateGps: ['Goribandha'],
    finalGp: 'Goribandha',
    destination: 'MRF at Goribandha',
    totalDistance: 4,
    workers: [],
    scheduledOn: 'Tuesday'
  },
  {
    id: 6,
    routeId: 'GKASBUR-2',
    routeName: 'Budura to Budura',
    routeAbbreviation: 'GBBB-06',
    startingGp: 'Budura',
    intermediateGps: ['Budura'],
    finalGp: 'Budura',
    destination: 'MRF at Goribandha',
    totalDistance: 4,
    workers: [],
    scheduledOn: 'Thursday'
  },
  {
    id: 7,
    routeId: 'GKASKID-3',
    routeName: 'Kidigam to Kidigam',
    routeAbbreviation: 'GKKK-07',
    startingGp: 'Kidigam',
    intermediateGps: ['Kidigam'],
    finalGp: 'Kidigam',
    destination: 'MRF at Goribandha',
    totalDistance: 4,
    workers: [],
    scheduledOn: 'Tuesday'
  }
];
