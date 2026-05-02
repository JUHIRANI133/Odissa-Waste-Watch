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
  {
    id: 1,
     block: 'Boudh',
    routeId: 'BBOUBKLMPT-1',
    routeName: 'MURSUNDHI to TELIBANDH',
    routeAbbreviation: 'BLKLMPT-1',
    startingGp: 'MURSUNDHI',
    intermediateGps: ['BADHOGAON', 'KHUNTHBANDH', 'LAXMIPRASHAD', 'PADMANPUR'],
    finalGp: 'TELIBANDH',
    destination: 'BOUDH MRF',
    totalDistance: 40,
    scheduledOn: 'MONDAY',
    workers: [
      { name: 'BHASKAR MIRDHA', contact: '8457889149' },
      { name: 'SANJIB MUKHI', contact: '9668560947' },
      { name: 'SUBODH MIRDHA', contact: '7605975768' },
      { name: 'SNEHALATA MIRDHA', contact: '7326831976' }
    ]
  },
  {
    id: 2,
    block: 'Boudh',
    routeId: 'BBOUABBKMMTR-2',
    routeName: 'TALASARDA to ROXA',
    routeAbbreviation: 'ABBKMMTR-2',
    startingGp: 'TALASARDA',
    intermediateGps: ['MUNDIPADAR', 'BAHIRA', 'AINLAPALI', 'BAUSUNI', 'MANUPALI', 'KHALIAPALI'],
    finalGp: 'ROXA',
    destination: 'BOUDH MRF',
    totalDistance: 84,
    scheduledOn: 'THURSDAY',
    workers: [
      { name: 'RAMESH BEHERA', contact: '7205134812' },
      { name: 'KASTURI BEHERA', contact: '7205134812' },
      { name: 'JHUNU BEHERA', contact: '7008032012' },
      { name: 'NUADEI BEHERA', contact: '7609037523' },
      { name: 'KALPANA BEHERA', contact: '8118071428' }
    ]
  },
  {
    id: 3,
    block: 'Harbhanga',
    routeId: 'BHARBBRS-3',
    routeName: 'SARSARA to RADHANAGAR',
    routeAbbreviation: 'BBRS-3',
    startingGp: 'SARSARA',
    intermediateGps: ['BANDHAPATHAR', 'BAMANDA'],
    finalGp: 'RADHANAGAR',
    destination: 'BOUDH MRF',
    totalDistance: 34,
    scheduledOn: 'TUESDAY',
    workers: [
      { name: 'SAIRENDRI BEHERA', contact: '-' },
      { name: 'TULSA BEHERA', contact: '-' },
      { name: 'SOBHAGINI BEHERA', contact: '-' },
      { name: 'RADHA NAIK M', contact: '-' },
      { name: 'AMATA NAIK', contact: '-' }
    ]
  },
  {
    id: 4,
    block: 'Harbhanga',
    routeId: 'BHARBLMPP-4',
    routeName: 'Mathura to Pitambpur',
    routeAbbreviation: 'BLMPP-4',
    startingGp: 'Mathura',
    intermediateGps: ['Biranarsinghpur', 'Lunibahal', 'Purunakatak'],
    finalGp: 'Pitambpur',
    destination: 'BOUDH MRF',
    totalDistance: 80,
    scheduledOn: 'FRIDAY',
    workers: [
      { name: 'SURATHA NAYAK', contact: '7077341696' },
      { name: 'SUSHIL NAYAK', contact: '8260312011' },
      { name: 'TIRTHABASI RANA', contact: '7854883041' },
      { name: 'BASISTA MAJHI', contact: '8208140671' },
      { name: 'SANJAY NAIK', contact: '9124343301' },
      { name: 'RAJES PANIGRAHI', contact: '9178170476' }
    ]
  }
];
