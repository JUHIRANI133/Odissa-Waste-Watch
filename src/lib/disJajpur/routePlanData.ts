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
  remarks?: string;
}

export const routePlanData: RoutePlanData[] = [
  // Jajpur Block (Jajpur Municipality)
  {
    id: 1,
    block: 'Jajpur',
    routeId: 'JJAJPCMBN',
    routeName: 'PCMBN-01',
    routeAbbreviation: 'PCMBN-01',
    startingGp: 'Panasa',
    intermediateGps: ['Chainpur', 'Malandapur', 'Bhubaneswarpur'],
    finalGp: 'Nathasahi',
    destination: 'Kodandapur',
    totalDistance: 37,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'Tikili Parida', contact: '7894917733' },
      { name: 'Mira Parida', contact: '8093022846' },
      { name: 'Tulasi Jena', contact: '9943363861' },
      { name: 'Arati Jena', contact: '8984459550' },
      { name: 'Sonali Jena', contact: '8658872270' },
      { name: 'Manasi Bihari', contact: '8114631021' },
      { name: 'Kanakalata Behera', contact: '9668884439' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    block: 'Jajpur',
    routeId: 'JJAJSKJBB',
    routeName: 'SKJBB-02',
    routeAbbreviation: 'SKJBB-02',
    startingGp: 'Similia',
    intermediateGps: ['Khirabad', 'Jafarpur', 'Beruda'],
    finalGp: 'Bhuinpur',
    destination: 'Kodandapur',
    totalDistance: 44,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Nilima Ojha', contact: '8093179586' },
      { name: 'Bijayalaxmi Prusty', contact: '9090752867' },
      { name: 'Mamata Sahoo', contact: '9776576261' },
      { name: 'Sukanti Mallick', contact: '7848840640' }
    ]
  },
  {
    id: 3,
    block: 'Jajpur',
    routeId: 'JJAJSSESC',
    routeName: 'SSESC-03',
    routeAbbreviation: 'SSESC-03',
    startingGp: 'Samdaspur',
    intermediateGps: ['Sujanpur', 'Erbank', 'Sahaspur'],
    finalGp: 'Chatisdevil',
    destination: 'Kodandapur',
    totalDistance: 46,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Tulasi Das', contact: '9938440361' },
      { name: 'Kabita Das', contact: '7327971499' },
      { name: 'Sanju Jena', contact: '7205114102' },
      { name: 'Lopamudra Das', contact: '9692368928' },
      { name: 'Sanjulata Senapati', contact: '9692297813' },
      { name: 'Uma Dalai', contact: '7326992740' }
    ]
  },
  {
    id: 4,
    block: 'Jajpur',
    routeId: 'JJAJBJBMSB',
    routeName: 'BJBMSB-04',
    routeAbbreviation: 'BJBMSB-04',
    startingGp: 'Bichitrapur',
    intermediateGps: ['Jahanpur', 'Basudebpur', 'Markandapur', 'Sanasuar'],
    finalGp: 'Badasuar',
    destination: 'Jageswarpur',
    totalDistance: 41,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Sasmita Nayak', contact: '9556827369' },
      { name: 'Pramila Behera', contact: '9040787877' },
      { name: 'Kalpana Jena', contact: '7205981096' },
      { name: 'Prabhati Jena', contact: '9853043376' },
      { name: 'Ashalata Jena', contact: '9437159634' },
      { name: 'Lilirani Jena', contact: '9853961624' }
    ]
  },
  {
    id: 5,
    block: 'Jajpur',
    routeId: 'JJAJUMJJR',
    routeName: 'UMJJR-05',
    routeAbbreviation: 'UMJJR-05',
    startingGp: 'Upper Baruhan',
    intermediateGps: ['Maheswarpur', 'Jamdhar', 'Jhalpada'],
    finalGp: 'Rudrapur',
    destination: 'Jageswarpur',
    totalDistance: 62,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'Sarathi Sahoo', contact: '9040263297' },
      { name: 'Pramodini Gochhayat', contact: '8984117485' },
      { name: 'Rupa Mallick', contact: '9438111185' },
      { name: 'Sarita Sahoo', contact: '8093274945' },
      { name: 'Barsha Mallick', contact: '8658379843' },
      { name: 'Sumitra Mallick', contact: '9348868929' }
    ]
  },

  // Korei Block (Vysanagar Municipality)
  {
    id: 6,
    block: 'Korei',
    routeId: 'JKORMKPPG',
    routeName: 'MKPPG-01',
    routeAbbreviation: 'MKPPG-01',
    startingGp: 'Mulapal',
    intermediateGps: ['Karda', 'Patharapada', 'Panikoili'],
    finalGp: 'Goleipur',
    destination: 'Jodabara',
    totalDistance: 50,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'URMILA DALAI', contact: '8093724927' },
      { name: 'KALAYANI MALIK', contact: '9861692660' },
      { name: 'DEBAKI MAJHI', contact: '9827488942' },
      { name: 'BHAMA MALIK', contact: '9337663057' },
      { name: 'KANAKALATA DASH', contact: '9348124460' }
    ]
  },
  {
    id: 7,
    block: 'Korei',
    routeId: 'JKORABMBT',
    routeName: 'ABMBT-02',
    routeAbbreviation: 'ABMBT-02',
    startingGp: 'Amrutia',
    intermediateGps: ['Bandlo', 'Makundapur', 'Barundei'],
    finalGp: 'Tarakote',
    destination: 'Jodabara',
    totalDistance: 70,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'SAILA SAHOO', contact: '6370751460' },
      { name: 'PADMABATI MALLIK', contact: '7653900390' },
      { name: 'BIJAYA JENA', contact: '9937376302' },
      { name: 'GITA PADHI', contact: '8974769955' },
      { name: 'URMILA SINHA', contact: '7377648803' }
    ]
  },
  {
    id: 8,
    block: 'Korei',
    routeId: 'JKORGRAKP',
    routeName: 'GRAKP-03',
    routeAbbreviation: 'GRAKP-03',
    startingGp: 'Gourapur',
    intermediateGps: ['Ranapur', 'Asanjhar', 'Kacharasahi'],
    finalGp: 'Pachikote',
    destination: 'Jodabara',
    totalDistance: 63,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'URMILA MALIK', contact: '9348669414' },
      { name: 'SHANTILATA JENA', contact: '8637262707' },
      { name: 'GURUBARI JENA', contact: '9361624721' },
      { name: 'BELA JENA', contact: '9439759535' },
      { name: 'KANDHEI MUKHI', contact: '9337551562' }
    ]
  },
  {
    id: 9,
    block: 'Korei',
    routeId: 'JKORJKTB',
    routeName: 'JKTB-04',
    routeAbbreviation: 'JKTB-04',
    startingGp: 'Jahna',
    intermediateGps: ['Khamana', 'Tandra'],
    finalGp: 'Badabiruhan',
    destination: 'Jodabara',
    totalDistance: 39,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'RINA SINGH', contact: '9668687121' },
      { name: 'TABINA MAJHI', contact: '8908371526' },
      { name: 'CHINMAYEE BEHERA', contact: '8144794526' },
      { name: 'SABITA TARAI', contact: '7853078421' }
    ]
  },
  {
    id: 10,
    block: 'Korei',
    routeId: 'JKORDSHTK',
    routeName: 'DSHTK-05',
    routeAbbreviation: 'DSHTK-05',
    startingGp: 'Dhaneswar',
    intermediateGps: ['Sadakpur', 'Haladigadia', 'Tulati'],
    finalGp: 'Kantor',
    destination: 'Chandama',
    totalDistance: 43,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'JANAKILATA MAJHI', contact: '7852991099' },
      { name: 'BINAPANI SING', contact: '7609040523' },
      { name: 'SUKANTI SWAIN', contact: '7735846214' },
      { name: 'SUBHADRA MALIK', contact: '9337665167' },
      { name: 'URBASI LENA', contact: '8260653974' }
    ]
  },
  {
    id: 11,
    block: 'Korei',
    routeId: 'JKORTTPA',
    routeName: 'TTPA-06',
    routeAbbreviation: 'TTPA-06',
    startingGp: 'Taharpur',
    intermediateGps: ['Talagarh', 'Pataranga'],
    finalGp: 'Andhari',
    destination: 'Chandama',
    totalDistance: 38,
    scheduledOn: '6th & 20th of each Month',
    workers: [
      { name: 'SANTILATA MALLIK', contact: '6370358834' },
      { name: 'JIBANTI JENA', contact: '6372729194' },
      { name: 'JHARANA MAYAK', contact: '7894817354' },
      { name: 'SAKUNTALA BARIK', contact: '8144831202' }
    ]
  }
];