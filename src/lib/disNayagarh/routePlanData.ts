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
  // ODAGAON Block Routes
  {
    id: 1,
    block: 'Odagaon',
    routeId: 'NODAR1',
    routeName: 'RPR1',
    routeAbbreviation: 'RPR1',
    startingGp: 'RANGANIPATANA',
    intermediateGps: ['PANTIKHARI'],
    finalGp: 'RABIGADIA',
    destination: 'ODAGAON',
    totalDistance: 12,
    workers: [
      { name: 'ASISH SAHOO', contact: '8249860397' },
      { name: 'KISHORE NAHAK', contact: '9556269644' },
      { name: 'ASHOK NAYAK', contact: '9556546937' }
    ],
    scheduledOn: '1st, 16th'
  },
  {
    id: 2,
    block: 'Odagaon',
    routeId: 'NODAK2',
    routeName: 'KSS2',
    routeAbbreviation: 'KSS2',
    startingGp: 'KORAPITHA',
    intermediateGps: ['SAKERI'],
    finalGp: 'SARADHAPUR',
    destination: 'ODAGAON',
    totalDistance: 18,
    workers: [
      { name: 'SUKANTA DAS', contact: '8480350023' },
      { name: 'SUSANT PRADHAN', contact: '9178964616' },
      { name: 'PRNA CHANDRA SETHI', contact: '7735491728' }
    ],
    scheduledOn: '2nd, 17th'
  },
  {
    id: 3,
    block: 'Odagaon',
    routeId: 'NODAB3',
    routeName: 'BPK3',
    routeAbbreviation: 'BPK3',
    startingGp: 'BHADIKILA',
    intermediateGps: ['PANDERIPADA'],
    finalGp: 'KURAL',
    destination: 'ODAGAON',
    totalDistance: 22,
    workers: [
      { name: 'ARUN PRADHAN', contact: '-' },
      { name: 'TRILOCHAN JENA', contact: '8342063800' },
      { name: 'BRAJABANDHU NAYAK', contact: '7328818525' }
    ],
    scheduledOn: '3rd, 18th'
  },
  {
    id: 4,
    block: 'Odagaon',
    routeId: 'NODAG4',
    routeName: 'GSK4',
    routeAbbreviation: 'GSK4',
    startingGp: 'GIRIDIPALLI',
    intermediateGps: ['SUNAMUHIN'],
    finalGp: 'KOMANDA',
    destination: 'ODAGAON',
    totalDistance: 30,
    workers: [
      { name: 'SIBA SANKAR PRUSTY', contact: '6371352103' },
      { name: 'UMA PRADHAN', contact: '6370226083' },
      { name: 'SUSANTA NAYAK', contact: '9827723247' }
    ],
    scheduledOn: '4th, 19th'
  },
  {
    id: 5,
    block: 'Odagaon',
    routeId: 'NODAR5',
    routeName: 'RRAB5',
    routeAbbreviation: 'RRAB5',
    startingGp: 'ROHIBANKA',
    intermediateGps: ['RABERA', 'ARADA'],
    finalGp: 'BANTHAPUR',
    destination: 'ODAGAON',
    totalDistance: 38,
    workers: [
      { name: 'NARAYAN NAYAK', contact: '9556750221' },
      { name: 'ARJUN NAHAK', contact: '9556288661' },
      { name: 'NAGESH DASH', contact: '9777796091' },
      { name: 'SARAT BEHERA', contact: '9556765405' }
    ],
    scheduledOn: '5th, 20th'
  },
  {
    id: 6,
    block: 'Odagaon',
    routeId: 'NODAN6',
    routeName: 'NGB6',
    routeAbbreviation: 'NGB6',
    startingGp: 'NANDIGHORE',
    intermediateGps: ['GOUDAPUT'],
    finalGp: 'BARASAHI',
    destination: 'ODAGAON',
    totalDistance: 36,
    workers: [
      { name: 'ARABIND PRADHAN', contact: '8018838872' },
      { name: 'BIPIN NAYAK', contact: '7894498156' },
      { name: 'PANKAJ NAHAK', contact: '9692016891' }
    ],
    scheduledOn: '6th, 21st'
  },
  {
    id: 7,
    block: 'Odagaon',
    routeId: 'NODAG7',
    routeName: 'GPA7',
    routeAbbreviation: 'GPA7',
    startingGp: 'GODIPALLI',
    intermediateGps: ['PANCHIRIDA MANAPUR'],
    finalGp: 'ANGISINGI',
    destination: 'ODAGAON',
    totalDistance: 38,
    workers: [
      { name: 'BIPIN JENA', contact: '6372066080' },
      { name: 'JITENDRA MALLICK', contact: '7978669593' },
      { name: 'PRADEEP SAHOO', contact: '6370181285' }
    ],
    scheduledOn: '7th, 22nd'
  },
  {
    id: 8,
    block: 'Odagaon',
    routeId: 'NODAH8',
    routeName: 'HSD8',
    routeAbbreviation: 'HSD8',
    startingGp: 'HARIHARPUR',
    intermediateGps: ['SIKHARPUR'],
    finalGp: 'DIMISAR',
    destination: 'ODAGAON',
    totalDistance: 46,
    workers: [
      { name: 'DINESH SAHOO', contact: '6353557825' },
      { name: 'DILLIP KUMAR GURU', contact: '9238828722' },
      { name: 'PRAKSH SAHOO', contact: '9348788533' }
    ],
    scheduledOn: '8th, 23rd'
  },
  {
    id: 9,
    block: 'Odagaon',
    routeId: 'NODAB9',
    routeName: 'BGHP9',
    routeAbbreviation: 'BGHP9',
    startingGp: 'BADAGORADA',
    intermediateGps: ['GODIPADA', 'HARIDABANDHA'],
    finalGp: 'PANCHUMU',
    destination: 'ODAGAON',
    totalDistance: 60,
    workers: [
      { name: 'KEDAR CHANDRA DAS', contact: '8658700810' },
      { name: 'ADIYA KUMAR SAHOO', contact: '9078025301' },
      { name: 'CHANDAN NAHAK', contact: '6370073937' },
      { name: 'SARATHI NAYAK', contact: '9178124392' }
    ],
    scheduledOn: '9th, 24th'
  },
  {
    id: 10,
    block: 'Odagaon',
    routeId: 'NODAB10',
    routeName: 'BGKS10',
    routeAbbreviation: 'BGKS10',
    startingGp: 'BHALIADIHI',
    intermediateGps: ['GOLAGAON', 'KAJALAIPALLI'],
    finalGp: 'SARANKUL',
    destination: 'ODAGAON',
    totalDistance: 36,
    workers: [
      { name: 'TRILOCHAN BISOYI', contact: '8984347891' },
      { name: 'SALILA MOHANTY', contact: '9692052380' },
      { name: 'AMAR NAHAK', contact: '9777697747' },
      { name: 'HIRANYA KUMAR DORA', contact: '6349472199' }
    ],
    scheduledOn: '10th, 25th'
  },
  {
    id: 11,
    block: 'Odagaon',
    routeId: 'NODAM11',
    routeName: 'MGS11',
    routeAbbreviation: 'MGS11',
    startingGp: 'MAGARABANDHA',
    intermediateGps: ['GOTISAHI'],
    finalGp: 'SOLAPATA',
    destination: 'ODAGAON',
    totalDistance: 40,
    workers: [
      { name: 'KAILASH PRADHAN', contact: '9348353515' },
      { name: 'PHULBANI PARIDA', contact: '9337504600' },
      { name: 'RANAJN NAYAK', contact: '9777743379' }
    ],
    scheduledOn: '11th, 26th'
  },

  // RANPUR Block Routes
  {
    id: 12,
    block: 'Ranpur',
    routeId: 'NRANB1',
    routeName: 'BBDKG1',
    routeAbbreviation: 'BBDKG1',
    startingGp: 'BAJRAKOTE',
    intermediateGps: ['BAUNSAGARH', 'DARPANARAYANPUR', 'KHATIA'],
    finalGp: 'GOURANGAPUR',
    destination: 'RANPUR',
    totalDistance: 40,
    workers: [
      { name: 'AMBIKI DEI', contact: '9668823427' },
      { name: 'SAROJINI PATRA', contact: '7894354056' },
      { name: 'BIDULATA PRADHAN', contact: '7008901857' },
      { name: 'BINODINI NAYAK', contact: '6370065765' },
      { name: 'BASANTI BEHERA', contact: '9696907010' }
    ],
    scheduledOn: '1st, 16th'
  },
  {
    id: 13,
    block: 'Ranpur',
    routeId: 'NRANR2',
    routeName: 'RDSK2',
    routeAbbreviation: 'RDSK2',
    startingGp: 'RANKADEULI',
    intermediateGps: ['DAMASAHI', 'SURKABADI'],
    finalGp: 'KASANDA',
    destination: 'RANPUR',
    totalDistance: 50,
    workers: [
      { name: 'BILASHA NAYAK', contact: '7749997740' },
      { name: 'LAXMI BEHERA', contact: '9827719380' },
      { name: 'MANULATA MISHRA', contact: '9583848493' },
      { name: 'GITANJALI SAMANTARAY', contact: '6371145442' }
    ],
    scheduledOn: '2nd, 17th'
  },
  {
    id: 14,
    block: 'Ranpur',
    routeId: 'NRANR3',
    routeName: 'RNKT3',
    routeAbbreviation: 'RNKT3',
    startingGp: 'RAJSUNAKHALA',
    intermediateGps: ['NARENDRAPUR', 'KULASAR'],
    finalGp: 'TALAKANI',
    destination: 'RANPUR',
    totalDistance: 32,
    workers: [
      { name: 'PRAMILA DALEI', contact: '9124939369' },
      { name: 'SUBASINI SAHOO', contact: '9861458468' }
    ],
    scheduledOn: '3rd, 18th'
  }
];