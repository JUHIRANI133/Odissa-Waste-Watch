export interface RouteWorker {
  name: string;
  contact: string;
}

export interface RouteGpDistance {
  gpName: string;
  distance: number;
}

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
  gpDistances?: RouteGpDistance[];
  workers: RouteWorker[];
  scheduledOn: string;
}

export const routePlanData: RoutePlanData[] = [
  // Aska Block Routes
  {
    id: 1,
    block: 'Aska',
    routeId: 'GASKA-1',
    routeName: 'Chadhiapalli to Khandadeuli',
    routeAbbreviation: 'CK-01',
    startingGp: 'Chadhiapalli',
    intermediateGps: ['Kalasandhapur', 'Nalabanta', 'Debabhumi', 'Mangalpur', 'Balichhai', 'Haridapadar', 'Jaypur', 'Gangapur'],
    finalGp: 'Khandadeuli',
    destination: 'Aska NAC MRF 1',
    totalDistance: 56,
    gpDistances: [
      { gpName: 'Chadhiapalli', distance: 3 },
      { gpName: 'Kalasandhapur', distance: 1 },
      { gpName: 'Nalabanta', distance: 6 },
      { gpName: 'Debabhumi', distance: 4 },
      { gpName: 'Mangalpur', distance: 5 },
      { gpName: 'Balichhai', distance: 6 },
      { gpName: 'Haridapadar', distance: 9 },
      { gpName: 'Jaypur', distance: 8 },
      { gpName: 'Gangapur', distance: 8 },
      { gpName: 'Khandadeuli', distance: 6 }
    ],
    workers: [],
    scheduledOn: 'MON, THU'
  },
  {
    id: 2,
    block: 'Aska',
    routeId: 'GASKA-2',
    routeName: 'Babanapur to Allipur',
    routeAbbreviation: 'BA-02',
    startingGp: 'Babanapur',
    intermediateGps: ['Bhetanai', 'Badakholi', 'Gahangu', 'Balisira', 'Gunthapada', 'Benapata', 'Bangarada'],
    finalGp: 'Allipur',
    destination: 'Aska NAC MRF 2',
    totalDistance: 89,
    gpDistances: [
      { gpName: 'Babanapur', distance: 2 },
      { gpName: 'Bhetanai', distance: 9 },
      { gpName: 'Badakholi', distance: 8 },
      { gpName: 'Gahangu', distance: 15 },
      { gpName: 'Balisira', distance: 10 },
      { gpName: 'Gunthapada', distance: 11 },
      { gpName: 'Benapata', distance: 14 },
      { gpName: 'Bangarada', distance: 15 },
      { gpName: 'Allipur', distance: 5 }
    ],
    workers: [],
    scheduledOn: 'TUE, FRI'
  },

  // Belaguntha Block Routes
  {
    id: 3,
    block: 'Belaguntha',
    routeId: 'GBELA-1',
    routeName: 'AMBAPUA to UDHURA',
    routeAbbreviation: 'AU-01',
    startingGp: 'AMBAPUA',
    intermediateGps: ['BANKA', 'BENIPALLI', 'DHUMUCHAI', 'G.NUAGAM', 'MANGALPUR', 'TANARADA'],
    finalGp: 'UDHURA',
    destination: 'Belaguntha MRF',
    totalDistance: 37,
    gpDistances: [
      { gpName: 'AMBAPUA', distance: 4 },
      { gpName: 'BANKA', distance: 3 },
      { gpName: 'BENIPALLI', distance: 6 },
      { gpName: 'DHUMUCHAI', distance: 5 },
      { gpName: 'G.NUAGAM', distance: 7 },
      { gpName: 'MANGALPUR', distance: 4 },
      { gpName: 'TANARADA', distance: 3 },
      { gpName: 'UDHURA', distance: 4 }
    ],
    workers: [],
    scheduledOn: 'Monday, Friday'
  },

  // Bhanjanagar Block Routes
  {
    id: 4,
    block: 'Bhanjanagar',
    routeId: 'GBHAN-1',
    routeName: 'BADAKODANDA to SANAKODANDA',
    routeAbbreviation: 'BS-01',
    startingGp: 'BADAKODANDA',
    intermediateGps: ['BARUDA', 'BAUNSALUNDI', 'DIHAPADHALA', 'GOLAPADA', 'JILLUNDI', 'KULLADA', 'LALSINGI', 'MUDULIPALLI', 'MUJAGADA'],
    finalGp: 'SANAKODANDA',
    destination: 'Bhanjanagar MRF',
    totalDistance: 64,
    gpDistances: [
      { gpName: 'BADAKODANDA', distance: 3 },
      { gpName: 'BARUDA', distance: 12 },
      { gpName: 'BAUNSALUNDI', distance: 7 },
      { gpName: 'DIHAPADHALA', distance: 2 },
      { gpName: 'GOLAPADA', distance: 4 },
      { gpName: 'JILLUNDI', distance: 6 },
      { gpName: 'KULLADA', distance: 3 },
      { gpName: 'LALSINGI', distance: 8 },
      { gpName: 'MUDULIPALLI', distance: 5 },
      { gpName: 'MUJAGADA', distance: 4 },
      { gpName: 'SANAKODANDA', distance: 9 }
    ],
    workers: [],
    scheduledOn: 'MON, THU'
  },

  // Buguda Block Routes
  {
    id: 5,
    block: 'Buguda',
    routeId: 'GBUGU-1',
    routeName: 'ANTARAPADA to PANGIDI',
    routeAbbreviation: 'AP-01',
    startingGp: 'ANTARAPADA',
    intermediateGps: ['B KARADABADI', 'BHAMASIALI', 'BIRANCHIPUR', 'KHOLOKHALI', 'GOLABANDHA', 'GOLIA'],
    finalGp: 'PANGIDI',
    destination: 'BugudaMRF',
    totalDistance: 51,
    gpDistances: [
      { gpName: 'ANTARAPADA', distance: 8 },
      { gpName: 'B KARADABADI', distance: 7 },
      { gpName: 'BHAMASIALI', distance: 4 },
      { gpName: 'BIRANCHIPUR', distance: 4 },
      { gpName: 'KHOLOKHALI', distance: 6 },
      { gpName: 'GOLABANDHA', distance: 7 },
      { gpName: 'GOLIA', distance: 6 },
      { gpName: 'PANGIDI', distance: 6 }
    ],
    workers: [],
    scheduledOn: 'MON, THU'
  },

  // Chikiti Block Routes
  {
    id: 6,
    block: 'Chikiti',
    routeId: 'GCHIK-1',
    routeName: 'KALABADA to LALAMENTA',
    routeAbbreviation: 'KL-01',
    startingGp: 'KALABADA',
    intermediateGps: ['KOTLINGI', 'RAMACHANDRAPUR', 'K.NUAGA', 'PITATALI', 'GIRISOLA'],
    finalGp: 'LALAMENTA',
    destination: 'Chikiti MRF',
    totalDistance: 73,
    gpDistances: [
      { gpName: 'KALABADA', distance: 9 },
      { gpName: 'KOTLINGI', distance: 12 },
      { gpName: 'RAMACHANDRAPUR', distance: 8 },
      { gpName: 'K.NUAGA', distance: 7 },
      { gpName: 'PITATALI', distance: 6 },
      { gpName: 'GIRISOLA', distance: 13 },
      { gpName: 'LALAMENTA', distance: 12 }
    ],
    workers: [],
    scheduledOn: 'MON, THU'
  },

  // Digapahandi Block Routes
  {
    id: 7,
    block: 'Digapahandi',
    routeId: 'GDIGA-1',
    routeName: 'ANKRODA to PADMANAVPUR',
    routeAbbreviation: 'AP-01',
    startingGp: 'ANKRODA',
    intermediateGps: ['BADADUMULA', 'BASUDEVPUR', 'GOKARNAPUR', 'KAITHADA', 'KUSAPADA'],
    finalGp: 'PADMANAVPUR',
    destination: 'Digapahandi MRF',
    totalDistance: 33,
    gpDistances: [
      { gpName: 'ANKRODA', distance: 1 },
      { gpName: 'BADADUMULA', distance: 3 },
      { gpName: 'BASUDEVPUR', distance: 7 },
      { gpName: 'GOKARNAPUR', distance: 4 },
      { gpName: 'KAITHADA', distance: 8 },
      { gpName: 'KUSAPADA', distance: 6 },
      { gpName: 'PADMANAVPUR', distance: 5 }
    ],
    workers: [],
    scheduledOn: 'MON, THU'
  }
];