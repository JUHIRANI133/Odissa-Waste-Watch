export interface RouteWorker {
  name: string;
  contact: string;
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
  workers: RouteWorker[];
  scheduledOn: string;
  remarks?: string;
}

export const routePlanData: RoutePlanData[] = [
  // BARIPADA Block Routes
  {
    id: 1,
    block: 'Baripada',
    routeId: 'KMAYBARB-1',
    routeName: 'BBC-01',
    routeAbbreviation: 'BBC-01',
    startingGp: 'BETNA',
    intermediateGps: ['BANKISOLE'],
    finalGp: 'CHANDANPUR',
    destination: 'RAGHUNATHPUR MRF',
    totalDistance: 28,
    scheduledOn: 'MONDAY, FRIDAY (EVERY MONDAY, FRIDAY IN A MONTH)',
    workers: [{ name: 'Kartik Chandra Mohanta', contact: '9861213832' }]
  },
  {
    id: 2,
    block: 'Baripada',
    routeId: 'KMAYBARL-2',
    routeName: 'LRS-02',
    routeAbbreviation: 'LRS-02',
    startingGp: 'LAXMIPOSI',
    intermediateGps: ['RAJABASA'],
    finalGp: 'SANKHABHANGA',
    destination: 'RAGHUNATHPUR MRF',
    totalDistance: 14,
    scheduledOn: 'TUESDAY, SATURDAY (EVERY TUESDAY, SATURDAY IN A MONTH)',
    workers: [{ name: 'Ananta Kishore Maharana', contact: '9861363677' }]
  },
  {
    id: 3,
    block: 'Baripada',
    routeId: 'KMAYBARB-3',
    routeName: 'BB-03',
    routeAbbreviation: 'BB-03',
    startingGp: 'BUDHIKHAMARI',
    intermediateGps: [],
    finalGp: 'BADJODE',
    destination: 'RAGHUNATHPUR MRF',
    totalDistance: 23,
    scheduledOn: 'WEDNESDAY (EVERY WEDNESDAY IN A MONTH)',
    workers: [{ name: 'Binay Ku Das', contact: '7077793498' }]
  },
  {
    id: 4,
    block: 'Baripada',
    routeId: 'KMAYBARB-4',
    routeName: 'BHK-04',
    routeAbbreviation: 'BHK-04',
    startingGp: 'BHAGABATCHANDRAPUR',
    intermediateGps: ['HATIKOTE'],
    finalGp: 'KHADISOLE',
    destination: 'RAGHUNATHPUR MRF',
    totalDistance: 23,
    scheduledOn: 'THRUSDAY, SUNDAY (EVERY THRUSDAY, SUNDAY IN A MONTH)',
    workers: [{ name: 'Binay Ku Das', contact: '7077793498' }]
  },

  // UDALA Block Routes
  {
    id: 5,
    block: 'Udala',
    routeId: 'KMAYUDAR-1',
    routeName: 'RK-01',
    routeAbbreviation: 'RK-01',
    startingGp: 'RADHO',
    intermediateGps: ['KOCHILADIHA'],
    finalGp: 'KOCHILADIHA',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 24,
    scheduledOn: 'MONDAY (EVERY MONDAY IN A MONTH)',
    workers: [
        { name: 'Prafulla Kumar sial', contact: '9853988109' },
        { name: 'Daka Singh', contact: '8018980295' }
    ]
  },
  {
    id: 6,
    block: 'Udala',
    routeId: 'KMAYUDAB-2',
    routeName: 'BB-02',
    routeAbbreviation: 'BB-02',
    startingGp: 'BAHUBANDH',
    intermediateGps: ['BADKHAMAN'],
    finalGp: 'BADKHAMAN',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 22,
    scheduledOn: 'TUESDAY (EVERY TUESDAY IN A MONTH)',
    workers: [
        { name: 'Gangadhara Sahu', contact: '9439450171' },
        { name: 'Prafulla Kumar sial', contact: '9853988110' }
    ]
  },
  {
    id: 7,
    block: 'Udala',
    routeId: 'KMAYUDAB-3',
    routeName: 'BD-03',
    routeAbbreviation: 'BD-03',
    startingGp: 'BADSINGARIA',
    intermediateGps: ['DUGUDHA'],
    finalGp: 'DUGUDHA',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 14,
    scheduledOn: 'WEDNESDAY (EVERY WEDNESDAY IN A MONTH)',
    workers: [
        { name: 'Banita Patra', contact: '9439714047' },
        { name: 'Rasmita Kumari Sahu', contact: '9937501333' }
    ]
  },
  {
    id: 8,
    block: 'Udala',
    routeId: 'KMAYUDAK-4',
    routeName: 'KB-04',
    routeAbbreviation: 'KB-04',
    startingGp: 'KHALADI',
    intermediateGps: ['BHIMTALI'],
    finalGp: 'BHIMTALI',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 7,
    scheduledOn: 'THRUSDAY (EVERY THRUSDAY IN A MONTH)',
    workers: [
        { name: 'Biswanath Sail', contact: '9853454896' },
        { name: 'Surat Kumar Pradhan', contact: '9778346109' }
    ]
  },
  {
    id: 9,
    block: 'Udala',
    routeId: 'KMAYUDAK-5',
    routeName: 'KN-05',
    routeAbbreviation: 'KN-05',
    startingGp: 'KUNDABAI',
    intermediateGps: ['NUAGAN'],
    finalGp: 'NUAGAN',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 29,
    scheduledOn: 'FRIDAY (EVERY FRIDAY IN A MONTH)',
    workers: [
        { name: 'Prasanta Kumar Pattanayak', contact: '9439216480' },
        { name: 'Anita Behera', contact: '7381626128' }
    ]
  },
  {
    id: 10,
    block: 'Udala',
    routeId: 'KMAYUDAP-6',
    routeName: 'PS-06',
    routeAbbreviation: 'PS-06',
    startingGp: 'PATSANIPUR',
    intermediateGps: ['SRIRAMCHANDRAPUR'],
    finalGp: 'SRIRAMCHANDRAPUR',
    destination: 'MRF1 (MENDHAKHAI)',
    totalDistance: 39,
    scheduledOn: 'SATURDAY (EVERY SATURDAY IN A MONTH)',
    workers: [
        { name: 'Harish Chandra Sahu', contact: '9337985204' },
        { name: 'Bijan Kumar Mohapatra', contact: '9853269370' }
    ]
  },

  // RAIRANGPUR Block Routes
  {
    id: 11,
    block: 'Rairangpur',
    routeId: 'KMAYRAIBH-1',
    routeName: 'BH-01',
    routeAbbreviation: 'BH-01',
    startingGp: 'BHALUBASA',
    intermediateGps: ['HALDA'],
    finalGp: 'HALDA',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 13,
    scheduledOn: 'MONDAY (EVERY MONDAY IN A MONTH)',
    workers: [
        { name: 'Anil Kumar Mohanta(Jamda)', contact: '9438116732' },
        { name: 'Ghasiram Marndi', contact: '8249077677' }
    ]
  },
  {
    id: 12,
    block: 'Rairangpur',
    routeId: 'KMAYRAISB-2',
    routeName: 'SB-02',
    routeAbbreviation: 'SB-02',
    startingGp: 'SANPAKHANA',
    intermediateGps: ['BADMOUDA'],
    finalGp: 'BADMOUDA',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 23,
    scheduledOn: 'TUESDAY (EVERY TUESDAY IN A MONTH)',
    workers: [
        { name: 'Jharana Naik', contact: '9348704583' },
        { name: 'Sasmita Kisku', contact: '8917271296' }
    ]
  },
  {
    id: 13,
    block: 'Rairangpur',
    routeId: 'KMAYRAIK-3',
    routeName: 'K-03',
    routeAbbreviation: 'K-03',
    startingGp: 'KULEISILA',
    intermediateGps: [],
    finalGp: 'KULEISILA',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 36,
    scheduledOn: 'WEDNESDAY (EVERY WEDNESDAY IN A MONTH)',
    workers: [
        { name: 'Pradeep Kumar Behera', contact: '9437615050' }
    ]
  },
  {
    id: 14,
    block: 'Rairangpur',
    routeId: 'KMAYRAIS-4',
    routeName: 'S-04',
    routeAbbreviation: 'S-04',
    startingGp: 'SUDARSANPUR',
    intermediateGps: [],
    finalGp: 'SUDARSANPUR',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 48,
    scheduledOn: 'WEDNESDAY (EVERY WEDNESDAY IN A MONTH)',
    workers: [
        { name: 'Mohan Patra', contact: '9348010793' }
    ]
  },
  {
    id: 15,
    block: 'Rairangpur',
    routeId: 'KMAYRAIGH-5',
    routeName: 'GH-05',
    routeAbbreviation: 'GH-05',
    startingGp: 'GUHALDANGRI',
    intermediateGps: ['HATIA'],
    finalGp: 'HATIA',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 46,
    scheduledOn: 'THRUSDAY (EVERY THRUSDAY IN A MONTH)',
    workers: [
        { name: 'Mohan Patra', contact: '9348010793' },
        { name: 'Budai Majhi', contact: '8917222481' }
    ]
  },
  {
    id: 16,
    block: 'Rairangpur',
    routeId: 'KMAYRAIP-6',
    routeName: 'P-06',
    routeAbbreviation: 'P-06',
    startingGp: 'PURUNAPANI',
    intermediateGps: [],
    finalGp: 'PURUNAPANI',
    destination: 'MRF 2 (BAIDAPOSI)',
    totalDistance: 12,
    scheduledOn: 'FRIDAY (EVERY FRIDAY IN A MONTH)',
    workers: [
        { name: 'Hemanta Kumar Patra', contact: '8847836161' }
    ]
  },

  // KARANJIA Block Routes
  {
    id: 17,
    block: 'Karanjia',
    routeId: 'KMAYKARA-1',
    routeName: 'BCG-01',
    routeAbbreviation: 'BCG-01',
    startingGp: 'BADADEULI',
    intermediateGps: ['CHITRAPOSI', 'GHOSADA'],
    finalGp: 'GHOSADA',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 48,
    scheduledOn: 'MONDAY (EVERY MONDAY IN A MONTH)',
    workers: [
      { name: 'Nibedita Sethy', contact: '9337424183' },
      { name: 'Swadhin Kumar Mahanty', contact: '9658466655' }
    ]
  },
  {
    id: 18,
    block: 'Karanjia',
    routeId: 'KMAYKARA-2',
    routeName: 'KSD-02',
    routeAbbreviation: 'KSD-02',
    startingGp: 'KERKERA',
    intermediateGps: ['SARANGAGADA', 'DORI'],
    finalGp: 'DORI',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 38,
    scheduledOn: 'TUESDAY (EVERY TUESDAY IN A MONTH)',
    workers: [
      { name: 'Manoranjan Sethy', contact: '9777013411' },
      { name: 'Kajal Prusty', contact: '8984044908' },
      { name: 'Preetiranjan Mohanta', contact: '7008865037' }
    ]
  },
  {
    id: 19,
    block: 'Karanjia',
    routeId: 'KMAYKARA-3',
    routeName: 'BT-03',
    routeAbbreviation: 'BT-03',
    startingGp: 'BALA',
    intermediateGps: ['TATO'],
    finalGp: 'TATO',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 32,
    scheduledOn: 'WEDNESDAY (EVERY WEDNESDAY IN A MONTH)',
    workers: [
      { name: 'Manoranjan Sethy', contact: '9777013411' },
      { name: 'Malay Ranjan Mohanta', contact: '8260105699' }
    ]
  },
  {
    id: 20,
    block: 'Karanjia',
    routeId: 'KMAYKARA-4',
    routeName: 'BBM-04',
    routeAbbreviation: 'BBM-04',
    startingGp: 'BADAGAON',
    intermediateGps: ['BATPALASA', 'MIRIGINENDI'],
    finalGp: 'MIRIGINENDI',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 59,
    scheduledOn: 'THRUSDAY (EVERY THRUSDAY IN A MONTH)',
    workers: [
      { name: 'Malay Ranjan Mohanta', contact: '8260105699' },
      { name: 'Smita Soren', contact: '6371555871' },
      { name: 'Parshuram Nayak', contact: '6372824641' }
    ]
  },
  {
    id: 21,
    block: 'Karanjia',
    routeId: 'KMAYKARA-5',
    routeName: 'RD-05',
    routeAbbreviation: 'RD-05',
    startingGp: 'RASAMTALA',
    intermediateGps: ['DUDHIANI'],
    finalGp: 'DUDHIANI',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 68,
    scheduledOn: 'FRIDAY (EVERY FRIDAY IN A MONTH)',
    workers: [
      { name: 'Kajal Prusty', contact: '8984044908' },
      { name: 'Soraj Kumar Barik', contact: '7008089506' }
    ]
  },
  {
    id: 22,
    block: 'Karanjia',
    routeId: 'KMAYKARA-6',
    routeName: 'KP-06',
    routeAbbreviation: 'KP-06',
    startingGp: 'KOLIPOSI',
    intermediateGps: ['PATBIL'],
    finalGp: 'PATBIL',
    destination: 'MRF1 (NUASAHI)',
    totalDistance: 50,
    scheduledOn: 'SATURDAY (EVERY SATURDAY IN A MONTH)',
    workers: [
      { name: 'Soraj Kumar Barik', contact: '7008089506' },
      { name: 'Parshuram Nayak', contact: '6372824641' }
    ]
  }
];