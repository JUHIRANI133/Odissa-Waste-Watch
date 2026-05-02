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
  // Block: BINIKA (ULB: BINIKA NAC)
  {
    id: 1,
    block: 'Binika',
    routeId: 'S-BIN-SB-1',
    routeName: 'SINGHIJUBA-BHANDAR',
    routeAbbreviation: 'SB-1',
    startingGp: 'SINGHIJUBA',
    intermediateGps: ['SINGHIJUBA'],
    finalGp: 'BHANDAR',
    destination: 'BINIKA MRF',
    totalDistance: 23,
    workers: [
      { name: 'MUKTA BHUE', contact: '8260494420' },
      { name: 'SABITA KUMBHAR', contact: '8260375828' }
    ],
    scheduledOn: '1ST Monday'
  },
  {
    id: 2,
    block: 'Binika',
    routeId: 'S-BIN-SM-2',
    routeName: 'SILATI-MEGHALA',
    routeAbbreviation: 'SM-2',
    startingGp: 'SILATI',
    intermediateGps: ['SILATI'],
    finalGp: 'MEGHALA',
    destination: 'BINIKA MRF',
    totalDistance: 23,
    workers: [
      { name: 'SUSHMA SAHU', contact: '7684056101' },
      { name: 'DIPANJALI NAIK', contact: '7205809958' }
    ],
    scheduledOn: '1ST TUESDAY'
  },
  {
    id: 3,
    block: 'Binika',
    routeId: 'S-BIN-CS-3',
    routeName: 'CHARDA-SANKARA',
    routeAbbreviation: 'CS-3',
    startingGp: 'CHARDA',
    intermediateGps: ['CHARDA'],
    finalGp: 'SANKARA',
    destination: 'BINIKA MRF',
    totalDistance: 11,
    workers: [
      { name: 'NURABATI BARIK', contact: '7978778001' },
      { name: 'SANDHYARANI TANDI', contact: '9078362291' }
    ],
    scheduledOn: '1ST WEDNESDAY'
  },
  {
    id: 4,
    block: 'Binika',
    routeId: 'S-BIN-BK-4',
    routeName: 'BAUNSUNI-KAINTARA',
    routeAbbreviation: 'BK-4',
    startingGp: 'BAUNSUNI',
    intermediateGps: ['BAUNSUNI'],
    finalGp: 'KAINTARA',
    destination: 'BINIKA MRF',
    totalDistance: 33,
    workers: [
      { name: 'KISHORI MAHALA', contact: '8658077990' },
      { name: 'LAXMI BHUE', contact: '9668512690' }
    ],
    scheduledOn: '1ST THURS DAY'
  },
  {
    id: 5,
    block: 'Binika',
    routeId: 'S-BIN-JKM-5',
    routeName: 'JULLUNDA-KUHIBAHAL-MAHADA',
    routeAbbreviation: 'JKM-5',
    startingGp: 'JULLUNDA',
    intermediateGps: ['JULLUNDA', 'KUHIBAHAL'],
    finalGp: 'MAHADA',
    destination: 'BINIKA MRF',
    totalDistance: 54,
    workers: [
      { name: 'PUSPANJALI BAGH', contact: '9556565044' },
      { name: 'SUMI SANDHA', contact: '9668711700' },
      { name: 'PUSPANJALI KALET', contact: '8917459961' }
    ],
    scheduledOn: '1ST Friday'
  },
  {
    id: 6,
    block: 'Binika',
    routeId: 'S-BIN-SM-6',
    routeName: 'SELEDI-MAHADEVPALI',
    routeAbbreviation: 'SM-6',
    startingGp: 'SELEDI',
    intermediateGps: ['SELEDI'],
    finalGp: 'MAHADEVPALI',
    destination: 'BINIKA MRF',
    totalDistance: 22,
    workers: [
      { name: 'PUNI CHHATRI', contact: '9078117028' },
      { name: 'MAITHILI PANDEY', contact: '9938943773' }
    ],
    scheduledOn: '1STSaturday'
  },
  {
    id: 7,
    block: 'Binika',
    routeId: 'S-BIN-BB-7',
    routeName: 'BABUPALI-BANKIGHIRDI',
    routeAbbreviation: 'BB-7',
    startingGp: 'BABUPALI',
    intermediateGps: ['BABUPALI'],
    finalGp: 'BANKIGHIRDI',
    destination: 'BINIKA MRF',
    totalDistance: 25,
    workers: [
      { name: 'BASANTI BAGH', contact: '7077313583' },
      { name: 'MANOAKINI CHHATRIA', contact: '9938821492' }
    ],
    scheduledOn: '2ND Monday'
  },
  {
    id: 8,
    block: 'Binika',
    routeId: 'S-BIN-S-8',
    routeName: 'SINDURPUR',
    routeAbbreviation: 'S-8',
    startingGp: 'SINDURPUR',
    intermediateGps: ['SINDURPUR'],
    finalGp: 'SINDURPUR',
    destination: 'BINIKA MRF',
    totalDistance: 9,
    workers: [
      { name: 'MADHUSMITA PANDA', contact: '6372592055' }
    ],
    scheduledOn: '2ND TUESDAY'
  },

  // Block: SONEPUR (ULB: Sonepur M)
  {
    id: 9,
    block: 'Sonepur',
    routeId: 'S-SON-KJ-1',
    routeName: 'Kalapathar-Janmura',
    routeAbbreviation: 'KJ-1',
    startingGp: 'Kalapathar',
    intermediateGps: ['Kalapathar'],
    finalGp: 'Janmura',
    destination: 'SONEPUR MRF',
    totalDistance: 8,
    workers: [
      { name: 'Rajani Kathar', contact: '9556581880' },
      { name: 'Jambubati Bhoi', contact: '9078736577' }
    ],
    scheduledOn: '1ST Monday'
  },
  {
    id: 10,
    block: 'Sonepur',
    routeId: 'S-SON-MH-2',
    routeName: 'Mayurudan-Haradakhol',
    routeAbbreviation: 'MH-2',
    startingGp: 'Mayurudan',
    intermediateGps: ['Mayurudan'],
    finalGp: 'Haradakhol',
    destination: 'SONEPUR MRF',
    totalDistance: 33,
    workers: [
      { name: 'Bindusara Sethi', contact: '9777285403' },
      { name: 'Puspanjali kaunr', contact: '9692885867' }
    ],
    scheduledOn: '1ST TUESDAY'
  },
  {
    id: 11,
    block: 'Sonepur',
    routeId: 'S-SON-MB-3',
    routeName: 'Mallikmunda-Bishimunda',
    routeAbbreviation: 'MB-3',
    startingGp: 'Mallikmunda',
    intermediateGps: ['Mallikmunda'],
    finalGp: 'Bishimunda',
    destination: 'SONEPUR MRF',
    totalDistance: 34,
    workers: [
      { name: 'Kishori Mahananda', contact: '8018677393' },
      { name: 'Dandeswari Suna', contact: '8249580883' }
    ],
    scheduledOn: '1ST WEDNESDAY'
  },
  {
    id: 12,
    block: 'Sonepur',
    routeId: 'S-SON-KK-4',
    routeName: 'Kharjhura-Khari',
    routeAbbreviation: 'KK-4',
    startingGp: 'Kharjhura',
    intermediateGps: ['Kharjhura'],
    finalGp: 'Khari',
    destination: 'SONEPUR MRF',
    totalDistance: 49,
    workers: [
      { name: 'Puspanjali Matari', contact: '7855895504' },
      { name: 'Ambika Sa', contact: '9777947850' }
    ],
    scheduledOn: '1ST THURS DAY'
  },
  {
    id: 13,
    block: 'Sonepur',
    routeId: 'S-SON-BN-5',
    routeName: 'Baladi-Narayapur',
    routeAbbreviation: 'BN-5',
    startingGp: 'Baladi',
    intermediateGps: ['Baladi'],
    finalGp: 'Narayapur',
    destination: 'SONEPUR MRF',
    totalDistance: 60,
    workers: [
      { name: 'Priyata Mahakur', contact: '9337544240' },
      { name: 'Josnamayee Sahu', contact: '6371986343' }
    ],
    scheduledOn: '1ST Friday'
  },
  {
    id: 14,
    block: 'Sonepur',
    routeId: 'S-SON-KR-6',
    routeName: 'Khaliapali-Rengali',
    routeAbbreviation: 'KR-6',
    startingGp: 'Khaliapali',
    intermediateGps: ['Khaliapali'],
    finalGp: 'Rengali',
    destination: 'SONEPUR MRF',
    totalDistance: 44,
    workers: [
      { name: 'Rajani Kathar', contact: '9556581880' },
      { name: 'Banita Putel', contact: '7853821661' }
    ],
    scheduledOn: '1STSaturday'
  },
  {
    id: 15,
    block: 'Sonepur',
    routeId: 'S-SON-LC-7',
    routeName: 'Lachhipur-Chhakormal',
    routeAbbreviation: 'LC-7',
    startingGp: 'Lachhipur',
    intermediateGps: ['Lachhipur'],
    finalGp: 'Chhakormal',
    destination: 'SONEPUR MRF',
    totalDistance: 70,
    workers: [
      { name: 'Mita Tandia', contact: '6371358886' },
      { name: 'Sabita Bharasagar', contact: '9937698102' }
    ],
    scheduledOn: '2ND Monday'
  },

  // Block: TARBHA (ULB: Tarbha NAC)
  {
    id: 16,
    block: 'Tarbha',
    routeId: 'S-TAR-JK-1',
    routeName: 'Jhartarbha-Katapali',
    routeAbbreviation: 'JK-1',
    startingGp: 'Jartarbha',
    intermediateGps: ['Jartarbha'],
    finalGp: 'Katapali',
    destination: 'TRABHA MRF',
    totalDistance: 11,
    workers: [
      { name: 'Basudha Karan', contact: '6370871675' },
      { name: 'Subhrakanti Bishi', contact: '8926163537' }
    ],
    scheduledOn: '1ST Monday'
  },
  {
    id: 17,
    block: 'Tarbha',
    routeId: 'S-TAR-BM-2',
    routeName: 'Badbhairo-Maraduguchha',
    routeAbbreviation: 'BM-2',
    startingGp: 'Badbhairo',
    intermediateGps: ['Badbhairo'],
    finalGp: 'Maraduguchha',
    destination: 'TRABHA MRF',
    totalDistance: 17,
    workers: [
      { name: 'Belmati Meher', contact: '6371889287' },
      { name: 'Bimala Kuanr', contact: '9348743430' }
    ],
    scheduledOn: '1ST TUESDAY'
  },
  {
    id: 18,
    block: 'Tarbha',
    routeId: 'S-TAR-SJ-3',
    routeName: 'Sibtula-Jarajaring',
    routeAbbreviation: 'SJ-3',
    startingGp: 'Sibtula',
    intermediateGps: ['Sibtula'],
    finalGp: 'Jarajaring',
    destination: 'TRABHA MRF',
    totalDistance: 15,
    workers: [
      { name: 'Malliphula Barik', contact: '7978161132' },
      { name: 'Parbati Nag', contact: '8260684622' }
    ],
    scheduledOn: '1ST WEDNESDAY'
  },
  {
    id: 19,
    block: 'Tarbha',
    routeId: 'S-TAR-PD-4',
    routeName: 'Pua-Deulpadar',
    routeAbbreviation: 'PD-4',
    startingGp: 'Pua',
    intermediateGps: ['Pua'],
    finalGp: 'Deulpadar',
    destination: 'TRABHA MRF',
    totalDistance: 33,
    workers: [
      { name: 'Rukuni Kuanr', contact: '9124146191' },
      { name: 'Kuni Mahananda', contact: '7978694316' }
    ],
    scheduledOn: '1ST THURS DAY'
  },
  {
    id: 20,
    block: 'Tarbha',
    routeId: 'S-TAR-PMR-5',
    routeName: 'Paikbahal-Ranisarda',
    routeAbbreviation: 'PMR-5',
    startingGp: 'Paikbahal',
    intermediateGps: ['Paikbahal', 'Menda'],
    finalGp: 'Ranisarda',
    destination: 'TRABHA MRF',
    totalDistance: 67,
    workers: [
      { name: 'Duleswari Nanda', contact: '9337831655' },
      { name: 'Padmini Hati', contact: '7504192237' },
      { name: 'Sushama Sagar', contact: '8328918462' }
    ],
    scheduledOn: '1ST Friday'
  },
  {
    id: 21,
    block: 'Tarbha',
    routeId: 'S-TAR-SB-6',
    routeName: 'Sargaj-Brahmani',
    routeAbbreviation: 'SB-6',
    startingGp: 'Sargaj',
    intermediateGps: ['Sargaj'],
    finalGp: 'Brahmani',
    destination: 'TRABHA MRF',
    totalDistance: 20,
    workers: [
      { name: 'Jhili Bibhar', contact: '8018387361' },
      { name: 'chandrama Ratha', contact: '9777183535' }
    ],
    scheduledOn: '1STSaturday'
  },
  {
    id: 22,
    block: 'Tarbha',
    routeId: 'S-TAR-SB-7',
    routeName: 'Singhari-Baghia',
    routeAbbreviation: 'SB-7',
    startingGp: 'Singhari',
    intermediateGps: ['Singhari'],
    finalGp: 'Baghia',
    destination: 'TRABHA MRF',
    totalDistance: 32,
    workers: [
      { name: 'Ranjita Rana', contact: '9668779923' },
      { name: 'Kousalya Bagh', contact: '8018334411' }
    ],
    scheduledOn: '2ND Monday'
  },
  {
    id: 23,
    block: 'Tarbha',
    routeId: 'S-TAR-DT-8',
    routeName: 'Dubula-Tulunda',
    routeAbbreviation: 'DT-8',
    startingGp: 'Dubula',
    intermediateGps: ['Dubula'],
    finalGp: 'Tulunda',
    destination: 'TRABHA MRF',
    totalDistance: 21,
    workers: [
      { name: 'Abanti Suna', contact: '8926012551' },
      { name: 'Sukanti Kumbhar', contact: '7327820231' }
    ],
    scheduledOn: '2ND TUESDAY'
  },
  {
    id: 24,
    block: 'Tarbha',
    routeId: 'S-TAR-CB-9',
    routeName: 'Charvata-Balikhamar',
    routeAbbreviation: 'CB-9',
    startingGp: 'Charvata',
    intermediateGps: ['Charvata'],
    finalGp: 'Balikhamar',
    destination: 'TRABHA MRF',
    totalDistance: 53,
    workers: [
      { name: 'Pinki Rana', contact: '8144510705' },
      { name: 'Janhabi Nag', contact: '7894621152' }
    ],
    scheduledOn: '2ND WEDNESDAY'
  },
  {
    id: 25,
    block: 'Tarbha',
    routeId: 'S-TAR-KK-10',
    routeName: 'Kamsara-Kumbharmunda',
    routeAbbreviation: 'KK-10',
    startingGp: 'Kamsara',
    intermediateGps: ['Kamsara'],
    finalGp: 'Kumbharmunda',
    destination: 'TRABHA MRF',
    totalDistance: 27,
    workers: [
      { name: 'Kuntala Rana', contact: '9337215145' },
      { name: 'Pratima Bibhar', contact: '7978489925' }
    ],
    scheduledOn: '2ND THURS DAY'
  }
];