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
  // Bhuban Block Routes
  {
    id: 1,
    block: 'Bhuban',
    routeId: 'DBHUBEMMBK',
    routeName: 'Balibo to Kuninda',
    routeAbbreviation: 'BEMMBK-01',
    startingGp: 'Balibo',
    intermediateGps: ['Ektali', 'Mahulpal', 'Mrudanga', 'Bhusal'],
    finalGp: 'Kuninda',
    destination: 'MRF1 (Kolhasahi W-2)',
    totalDistance: 38,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Prakash Mukhi', contact: '7540998625' },
      { name: 'Nirmal Tarei', contact: '9827466075' },
      { name: 'Bharat Naik', contact: '9692163626' },
      { name: 'Babaji Malik', contact: '9692163626' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    block: 'Bhuban',
    routeId: 'DBHUDBOGDS',
    routeName: 'Dhalapada to Surapratappur',
    routeAbbreviation: 'DBOGDS-02',
    startingGp: 'Dhalapada',
    intermediateGps: ['Baruan', 'Odisha', 'GN Prasad', 'Dayanabilli'],
    finalGp: 'Surapratappur',
    destination: 'MRF1 (Kolhasahi W-2)',
    totalDistance: 45,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Kalandi Nayak', contact: '8984103656' },
      { name: 'Babul Naik', contact: '8984103656' },
      { name: 'Sanatan Patra', contact: '-' },
      { name: 'Tuku Naik', contact: '7750841779' }
    ]
  },
  {
    id: 3,
    block: 'Bhuban',
    routeId: 'DBHUJMDJAM',
    routeName: 'Jamunakote to Mathakaragola',
    routeAbbreviation: 'JMDJAM-03',
    startingGp: 'Jamunakote',
    intermediateGps: ['Marthapur', 'Dighi', 'Jiral', 'Arakhapal'],
    finalGp: 'Mathakaragola',
    destination: 'MRF1 (Kolhasahi W-2)',
    totalDistance: 52,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Bichitra Nai', contact: '9040433640' },
      { name: 'Ramesh Naik', contact: '7894994402' },
      { name: 'Susanta ku Malik', contact: '9776792862' },
      { name: 'Ranjan Malik', contact: '9938602211' },
      { name: 'Santa Ku Naik', contact: '-' }
    ]
  },

  // Dhenkanal Sadar Block Routes
  {
    id: 4,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADBGNTM',
    routeName: 'Baladiabandha to Manipur',
    routeAbbreviation: 'BGNTM-01',
    startingGp: 'Baladiabandha',
    intermediateGps: ['Govindpur', 'Nadiali', 'Talabarakote'],
    finalGp: 'Manipur',
    destination: 'MRF 1 (Kathagada)',
    totalDistance: 10,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Anita Naik', contact: '7437078966' },
      { name: 'Sima Naik', contact: '7735640383' },
      { name: 'Sandesh Palei', contact: '9861054377' },
      { name: 'Minati Bisoi', contact: '8144248863' },
      { name: 'Akhila Naik', contact: '7894563286' }
    ]
  },
  {
    id: 5,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADBGSTB',
    routeName: 'Barada to Banasingh',
    routeAbbreviation: 'BGSTB-02',
    startingGp: 'Barada',
    intermediateGps: ['Gengutia', 'Sankulei', 'Tarava'],
    finalGp: 'Banasingh',
    destination: 'MRF 4 (alasuhata caltax)',
    totalDistance: 14,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Sumitra Swain', contact: '8280327858' },
      { name: 'Srikanta Barik', contact: '7847875131' },
      { name: 'Sunil ku Padhan', contact: '7205396725' },
      { name: 'Purnima Padhan', contact: '7205396725' },
      { name: 'Pinki Malick', contact: '9078165787' },
      { name: 'Sujata Malik', contact: '8260040486' },
      { name: 'Rita Mallik', contact: '8114743346' },
      { name: 'Landi Mallik', contact: '9178202320' },
      { name: 'Babina Naik', contact: '8984454377' },
      { name: 'Sanju Naik', contact: '7735073493' }
    ]
  },
  {
    id: 6,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADCSRBN',
    routeName: 'Chaulia to Nuagaon',
    routeAbbreviation: 'CSRBN-03',
    startingGp: 'Chaulia',
    intermediateGps: ['Sogarpasi', 'Radhadeipur'],
    finalGp: 'Nuagaon',
    destination: 'MRF 4 (alasuhata caltax)',
    totalDistance: 12,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Rupa Naik', contact: '9078539799' },
      { name: 'Gitanjali Naik', contact: '6372749808' },
      { name: 'Bipin Mallik', contact: '9668557361' },
      { name: 'Prakash Sandha', contact: '9090894773' },
      { name: 'Naresh Mallik', contact: '9348554518' }
    ]
  },
  {
    id: 7,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADKNSK',
    routeName: 'Kankadapal to Nagiapasi',
    routeAbbreviation: 'KNSK-04',
    startingGp: 'Kankadapal',
    intermediateGps: ['Suakhaikateni', 'Kaimati', 'Beltikiri'],
    finalGp: 'Nagiapasi',
    destination: 'MRF 4 (alasuhata caltax)',
    totalDistance: 15,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'Nirakar Naik', contact: '9337159621' },
      { name: 'Chinmaya ku Behera', contact: '6371075611' },
      { name: 'Sudhakar Behera', contact: '7008941206' },
      { name: 'Pratap Mallik', contact: '9337238905' }
    ]
  },
  {
    id: 8,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADKMBKM',
    routeName: 'Kankadahad to Madhu Sahu patna',
    routeAbbreviation: 'KMBKM-05',
    startingGp: 'Kankadahad',
    intermediateGps: ['Mangalpur', 'BB Kateni', 'Kakudibhag'],
    finalGp: 'Madhu Sahu patna',
    destination: 'MRF 2 (Mahisapat)',
    totalDistance: 15,
    scheduledOn: '6th & 20th of each Month',
    workers: [
      { name: 'Jagannath Naik', contact: '9178980570' },
      { name: 'Raimani Naik', contact: '7873568747' },
      { name: 'Raman ku Sahoo', contact: '7064061856' },
      { name: 'Kartikeswar Barik', contact: '8018760428' },
      { name: 'Prasanta ku Behera', contact: '9777732141' }
    ]
  },
  {
    id: 9,
    block: 'Dhenkanal Sadar',
    routeId: 'DSADBCBDSS',
    routeName: 'Bhapur to Saptasajya',
    routeAbbreviation: 'BCBDSS-06',
    startingGp: 'Bhapur',
    intermediateGps: ['C S Prasad', 'Baliamba', 'Dhirapatna', 'Sankarpur'],
    finalGp: 'Saptasajya',
    destination: 'MRF 2 (Mahisapat)',
    totalDistance: 30,
    scheduledOn: '7th & 21st of each Month',
    workers: [
      { name: 'Amulya Naik', contact: '9776097389' },
      { name: 'Bharat Naik', contact: '-' },
      { name: 'Rabi Nayak', contact: '7326095618' },
      { name: 'Bulu Pirei', contact: '-' },
      { name: 'Kuna Naik', contact: '9776095930' },
      { name: 'Sadananda Sahoo', contact: '7327989177' }
    ]
  },

  // Hindol Block Routes
  {
    id: 10,
    block: 'Hindol',
    routeId: 'DHINNMRJKC',
    routeName: 'Nuabaga to Chitalpur',
    routeAbbreviation: 'NMRJKC-01',
    startingGp: 'Nuabaga',
    intermediateGps: ['Madhapur', 'Rasol', 'Jarada', 'Kalinga'],
    finalGp: 'Chitalpur',
    destination: 'MRF-1',
    totalDistance: 10,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Biju Gochhayat', contact: '7894550081' },
      { name: 'Sanatan Gochhayat', contact: '7735028933' },
      { name: 'Sumant Gochhayat', contact: '9348401181' },
      { name: 'Baruna Gochhayat', contact: '7751941418' }
    ]
  },
  {
    id: 11,
    block: 'Hindol',
    routeId: 'DHINDGMHP',
    routeName: 'Dudurkote to Patala',
    routeAbbreviation: 'DGMHP-02',
    startingGp: 'Dudurkote',
    intermediateGps: ['Gulehi', 'Mahalunda', 'Hatura'],
    finalGp: 'Patala',
    destination: 'MRF-1',
    totalDistance: 15,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Manoj Gochhayat', contact: '8457054335' },
      { name: 'Kumar Gochhayat', contact: '9337185535' },
      { name: 'Pratap Ku Patra', contact: '8260681556' },
      { name: 'Suryakanta Gochhayat', contact: '7735128872' },
      { name: 'Subala Dehury', contact: '9776752185' }
    ]
  },
  {
    id: 12,
    block: 'Hindol',
    routeId: 'DHINARKTKK',
    routeName: 'Asarada to Kadala',
    routeAbbreviation: 'ARKTKK-03',
    startingGp: 'Asarada',
    intermediateGps: ['Ranjagola', 'Kukuta', 'Thokar', 'Kantimili'],
    finalGp: 'Kadala',
    destination: 'MRF-1',
    totalDistance: 15,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Rohita Gochhayt', contact: '8249380052' },
      { name: 'Pandav Naik', contact: '9827893913' },
      { name: 'Basant Sethy', contact: '9777004356' }
    ]
  },
  {
    id: 13,
    block: 'Hindol',
    routeId: 'DHINKBGBK',
    routeName: 'Karanda to Kutunia',
    routeAbbreviation: 'KBGBK-04',
    startingGp: 'Karanda',
    intermediateGps: ['Babandha', 'Giridharprasad', 'Bampa'],
    finalGp: 'Kutunia',
    destination: 'MRF-1',
    totalDistance: 17,
    scheduledOn: '5th & 19th of each Month',
    workers: []
  },
  {
    id: 14,
    block: 'Hindol',
    routeId: 'DHINNPSGKKB',
    routeName: 'Nuagaon to Baunsapokhari',
    routeAbbreviation: 'NPSGKKB-05',
    startingGp: 'Nuagaon',
    intermediateGps: ['Paikapurunakote', 'Sanjapada', 'Galapada', 'Kansara', 'Kantamila'],
    finalGp: 'Baunsapokhari',
    destination: 'MRF-1',
    totalDistance: 20,
    scheduledOn: '6th & 20st of each Month',
    workers: [
      { name: 'Bhuban Gochhayat', contact: '7894947957' },
      { name: 'Samir Gochhayat', contact: '7328872956' },
      { name: 'Kartika Gochhayat', contact: '7735226130' },
      { name: 'Mahendra Ku Gochhayat', contact: '8144052239' }
    ]
  },
  {
    id: 15,
    block: 'Hindol',
    routeId: 'DHINKBGKND',
    routeName: 'Kunua to Dandiri',
    routeAbbreviation: 'KBGKND-06',
    startingGp: 'Kunua',
    intermediateGps: ['Buhalipal', 'Gandanali', 'Khaliborei', 'Nabakishorepur'],
    finalGp: 'Dandiri',
    destination: 'MRF-1',
    totalDistance: 19,
    scheduledOn: '7th & 21st of each Month',
    workers: [
      { name: 'Jitu Naik', contact: '-' },
      { name: 'Dayanidhi Nayak', contact: '6372659676' }
    ]
  },

  // Kamakhyanagar Block Routes
  {
    id: 16,
    block: 'Kamakhyanagar',
    routeId: 'DKAMBBBJBBBS',
    routeName: 'Baisinga to Saruali',
    routeAbbreviation: 'BBBJBBBS-01',
    startingGp: 'Baisinga',
    intermediateGps: ['Baligorad', 'Badasuanlo', 'Jagannathpur', 'Bankual', 'Budhibilli', 'Bhairpur'],
    finalGp: 'Saruali',
    destination: 'MRF-Kamakhyanagar NAC',
    totalDistance: 35,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Tunu Naik', contact: '9124150048' },
      { name: 'Sarojini Barik', contact: '6371316173' },
      { name: 'Sambhua Naik', contact: '-' },
      { name: 'Pabana Naik', contact: '9668783734' },
      { name: 'Kartik Patra', contact: '9938426373' }
    ]
  },
  {
    id: 17,
    block: 'Kamakhyanagar',
    routeId: 'DKAMKBKMAKKR',
    routeName: 'Kanpura to R N PUR',
    routeAbbreviation: 'KBKMAKKR-02',
    startingGp: 'Kanpura',
    intermediateGps: ['Baunsapal', 'Kadua', 'Mahulpala', 'Anlabereni', 'Kusumjodi', 'Kotagara'],
    finalGp: 'R N PUR',
    destination: 'MRF-Kamakhyanagar NAC',
    totalDistance: 30,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Ashok Naik', contact: '8018216680' },
      { name: 'Sujata Biswal', contact: '7989054969' },
      { name: 'Duryodhan Naik', contact: '-' },
      { name: 'Sudarsan Sahu', contact: '-' },
      { name: 'Sukanti Sahoo', contact: '-' },
      { name: 'Madanmohan Naik', contact: '-' },
      { name: 'Sanjaya Naik', contact: '9337758558' }
    ]
  },
  {
    id: 18,
    block: 'Kamakhyanagar',
    routeId: 'DKAMTKKKSB',
    routeName: 'Tumusinga to Baruan',
    routeAbbreviation: 'TKKKSB-03',
    startingGp: 'Tumusinga',
    intermediateGps: ['Kantapal', 'Kantio Kateni', 'Kantio puta sahi', 'Sogar'],
    finalGp: 'Baruan',
    destination: 'MRF-Kamakhyanagar NAC',
    totalDistance: 45,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Gangadhar Pruthy', contact: '9776240873' },
      { name: 'Prakash Dehury', contact: '9337982593' },
      { name: 'Labanga Naik', contact: '-' },
      { name: 'Satyaprasad Swain', contact: '7008933130' }
    ]
  }
];