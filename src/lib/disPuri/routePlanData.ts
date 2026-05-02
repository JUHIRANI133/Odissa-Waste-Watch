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
  // Data for GOP Block (Konark MRF)
  {
    id: 1,
    block: 'Gop',
    routeId: 'PGOPSBIDSJD',
    routeName: 'SBIDSJD-01',
    routeAbbreviation: 'SBIDSJD-01',
    startingGp: 'Simili',
    intermediateGps: ['Baulanga', 'Isanpur', 'Desthali', 'Sorava', 'Jangalbori'],
    finalGp: 'Dhumala',
    destination: 'KONARK MRF',
    totalDistance: 30,
    scheduledOn: 'Every Monday',
    workers: [
      { name: 'SUDARSAN BEHERA', contact: '9114067119' },
      { name: 'BRAHMANANDA MURUDI', contact: '9348667812' },
      { name: 'SIBA SWAIN', contact: '7978301284' },
      { name: 'NIRANJAN DAS', contact: '6370140827' },
      { name: 'RAJANI SETHY', contact: '9348922522' },
      { name: 'BHASKAR KUMAR SAHOO', contact: '9853255527' },
      { name: 'PABITRA KUMAR SINGH', contact: '7325933362' }
    ]
  },
  {
    id: 2,
    block: 'Gop',
    routeId: 'PGOPBBBMEBGG',
    routeName: 'BBBMEBGG-02',
    routeAbbreviation: 'BBBMEBGG-02',
    startingGp: 'Banakhandi',
    intermediateGps: ['Badatara', 'Bedapur', 'Mahalpada', 'Erabanga', 'Biritunga', 'Gop'],
    finalGp: 'Ganeswarpur',
    destination: 'KONARK MRF',
    totalDistance: 40,
    scheduledOn: 'Every Tuesday',
    workers: [
      { name: 'sanjaya kumar kandi', contact: '8280756486' },
      { name: 'KAILASH GOCHAYAT', contact: '7608997324' },
      { name: 'SAMPADA BEHERA', contact: '8093582955' },
      { name: 'GANESH NAYAK', contact: '9040756711' },
      { name: 'KABULA BHOI', contact: '8144976586' },
      { name: 'RAJA GOCHHAYAT', contact: '7735692537' },
      { name: 'JAGANATHA MISHRA', contact: '9692492023' },
      { name: 'BASUDEBA CHINARA', contact: '6372610842' }
    ]
  },
  {
    id: 3,
    block: 'Gop',
    routeId: 'PGOPNABKBBP',
    routeName: 'NABKBBP-02',
    routeAbbreviation: 'NABKBBP-02',
    startingGp: 'Nagapur',
    intermediateGps: ['Achyutpur', 'Kuanpada', 'Baniasahi', 'Bantaligaon'],
    finalGp: 'Payar',
    destination: 'KONARK MRF',
    totalDistance: 40,
    scheduledOn: 'Every Wednesday',
    workers: [
      { name: 'SAPANI DALEI', contact: '9438744805' },
      { name: 'PRAKASH KUMAR KANDI', contact: '8908727778' },
      { name: 'PREMANANDA PRADHAN', contact: '9337155824' },
      { name: 'RATIRANJAN NAYAK', contact: '9178729839' },
      { name: 'KABI MALLICK', contact: '9348766512' },
      { name: 'CHATRUBHUJA DAS', contact: '9777170327' }
    ]
  },
  {
    id: 4,
    block: 'Gop',
    routeId: 'PGOPDRNAI',
    routeName: 'DRNAI-03',
    routeAbbreviation: 'DRNAI-03',
    startingGp: 'Daver',
    intermediateGps: ['Rahangorada', 'Nuakholamara', 'Andaraichhapur'],
    finalGp: 'Itibhuan',
    destination: 'KONARK MRF',
    totalDistance: 60,
    scheduledOn: 'Every Thursday',
    workers: [
      { name: 'RATNAKAR BARAL', contact: '8658690946' },
      { name: 'SASIKANTA BALIARSINGH', contact: '9437217906' },
      { name: 'SOURABHA MALLICK', contact: '8260405929' },
      { name: 'DIPU MALLICK', contact: '9438654337' },
      { name: 'KAILASH BEHERA', contact: '7077782328' }
    ]
  },
  {
    id: 5,
    block: 'Gop',
    routeId: 'PGOPCGBST',
    routeName: 'CGBST-03',
    routeAbbreviation: 'CGBST-03',
    startingGp: 'Chaitana',
    intermediateGps: ['Gadavengura', 'Badagaon', 'Sutan'],
    finalGp: 'Tarakor',
    destination: 'KONARK MRF',
    totalDistance: 60,
    scheduledOn: 'Every Friday',
    workers: [
      { name: 'PRAFULLA KAHAL', contact: '9090080753' },
      { name: 'AMULYA BALIARSINGH', contact: '8763249469' },
      { name: 'GANGADHAR BARIK', contact: '9861312840' },
      { name: 'BULU BEHERA', contact: '7735895900' },
      { name: 'PRATAP SENAPATI', contact: '7381243171' }
    ]
  },

  // Data for NIMAPADA Block
  {
    id: 6,
    block: 'Nimapada',
    routeId: 'PNIMASBNU',
    routeName: 'ASBNU-01',
    routeAbbreviation: 'ASBNU-01',
    startingGp: 'Arisandha',
    intermediateGps: ['Salanga', 'Bamanala', 'Nuasanth'],
    finalGp: 'Uchhupur',
    destination: 'NIMAPADA MRF',
    totalDistance: 60,
    scheduledOn: 'Every Monday',
    workers: [
      { name: 'Prasanta Ku Gochhayat', contact: '8280079719' },
      { name: 'Anam charan sahoo (PEO)', contact: '9658827564' },
      { name: 'Dillip Kumar Rout', contact: '9567966851' },
      { name: 'Surendra Pradhan (PEO)', contact: '9668340275' }
    ]
  },
  {
    id: 7,
    block: 'Nimapada',
    routeId: 'PNIMADBKBG',
    routeName: 'ADBKBG-01',
    routeAbbreviation: 'ADBKBG-01',
    startingGp: 'Antuar',
    intermediateGps: ['Dhaleswar', 'Badasiribila', 'Kothakosang', 'Balanga'],
    finalGp: 'Gopinathpur',
    destination: 'NIMAPADA MRF',
    totalDistance: 44,
    scheduledOn: 'Every Tuesday',
    workers: [
      { name: 'Rabi Nayak', contact: '7853054988' },
      { name: 'Somanath Nayak (PEO)', contact: '9937247235' },
      { name: 'Sanjaya Mahari', contact: '9124004670' },
      { name: 'Tarun Ku Sngh (PEO)', contact: '6370286626' },
      { name: 'Chanda Nayak', contact: '7735529124' }
    ]
  },
  {
    id: 8,
    block: 'Nimapada',
    routeId: 'PNIMDSRGH',
    routeName: 'DSRGH-02',
    routeAbbreviation: 'DSRGH-02',
    startingGp: 'Dhanua',
    intermediateGps: ['Sainsasasan', 'Renchsasan', 'Gadapadanpur'],
    finalGp: 'Haripur',
    destination: 'NIMAPADA MRF',
    totalDistance: 60,
    scheduledOn: 'Every Wednesday',
    workers: [
      { name: 'Bishnu Charan Bhaula', contact: '9692004138' },
      { name: 'Arabinda Behera(PEO)', contact: '9937150785' },
      { name: 'Bhagaban Mohapatra(PEO)', contact: '9437269464' },
      { name: 'Kailash ch Nayak', contact: '8018570282' }
    ]
  },
  {
    id: 9,
    block: 'Nimapada',
    routeId: 'PNIMDCRSBA',
    routeName: 'DCRSBA-02',
    routeAbbreviation: 'DCRSBA-02',
    startingGp: 'Denua',
    intermediateGps: ['Chanarpada', 'Ratilo', 'Sagada', 'Badamachhapur'],
    finalGp: 'Alanda',
    destination: 'NIMAPADA MRF',
    totalDistance: 60,
    scheduledOn: 'Every Thursday',
    workers: [
      { name: 'Soumendra Behera', contact: '82800079719' },
      { name: 'Arabinda Behera(PEO)', contact: '9937150785' },
      { name: 'Manasi Tudu (PEO)', contact: '7978571575' },
      { name: 'Susanta Ku Behera (PEO)', contact: '8637205521' },
      { name: 'S.K Halli', contact: '7377216202' },
      { name: 'Ananta Bhoi', contact: '9938492557' }
    ]
  },
  {
    id: 10,
    block: 'Nimapada',
    routeId: 'PNIMTBBMK',
    routeName: 'TBBMK-03',
    routeAbbreviation: 'TBBMK-03',
    startingGp: 'Terundia',
    intermediateGps: ['Bhogasalada', 'Bhiligram', 'Miteipur'],
    finalGp: 'Kalapanchan',
    destination: 'NIMAPADA MRF',
    totalDistance: 60,
    scheduledOn: 'Every Friday',
    workers: [
      { name: 'Sarangadhar Swain (PEO)', contact: '9777609159' },
      { name: 'Bideshi Bhoi', contact: '9124169916' },
      { name: 'Kabiraj Kandi(PEO)', contact: '7978812696' }
    ]
  },
  {
    id: 11,
    block: 'Nimapada',
    routeId: 'PNIMBTBCT',
    routeName: 'BTBCT-03',
    routeAbbreviation: 'BTBCT-03',
    startingGp: 'Bhodar',
    intermediateGps: ['Tulasipur', 'Baharana', 'Chhanijanga'],
    finalGp: 'Tampalo',
    destination: 'NIMAPADA MRF',
    totalDistance: 60,
    scheduledOn: 'Every Saturday',
    workers: [
      { name: 'Bijaya Malik', contact: '9124169916' },
      { name: 'Sadananda Sahoo', contact: '7205749627' },
      { name: 'Priyanka P. Singh', contact: '8249717805' },
      { name: 'Gundicha Bhoi', contact: '7789086574' },
      { name: 'Bihari Sethi', contact: '7853054988' }
    ]
  },

  // Data for PIPILI Block
  {
    id: 12,
    block: 'Pipili',
    routeId: 'PPIPPGPLP',
    routeName: 'PGPLP-01',
    routeAbbreviation: 'PGPLP-01',
    startingGp: 'Poporanga',
    intermediateGps: ['Gobindapur', 'Pamasara', 'Laxminarayanpur'],
    finalGp: 'Pubasasan',
    destination: 'PIPILI MRF',
    totalDistance: 45,
    scheduledOn: 'Every Monday',
    workers: [
      { name: 'Biswajit Patra (PEO)', contact: '9531855973' },
      { name: 'Rajkishor nayak', contact: '8984391565' },
      { name: 'Goranga Samal', contact: '6370429473' },
      { name: 'Srikanta Sahoo(PEO)', contact: '7682936358' },
      { name: 'Bhagirathi sethi', contact: '7978405596' }
    ]
  },
  {
    id: 13,
    block: 'Pipili',
    routeId: 'PPIPOJNS',
    routeName: 'OJNS-01',
    routeAbbreviation: 'OJNS-01',
    startingGp: 'Orakal',
    intermediateGps: ['Jaganathpur', 'Nuasasan'],
    finalGp: 'Samapur',
    destination: 'PIPILI MRF',
    totalDistance: 30,
    scheduledOn: 'Every Tuesday',
    workers: [
      { name: 'Dibakara das', contact: '9692182105' },
      { name: 'Mangaraj Jena (PEO)', contact: '6370274288' },
      { name: 'Padma Bhusan Paltasingh(PEO)', contact: '9861016021' },
      { name: 'chitrasen behera', contact: '6380866831' }
    ]
  },
  {
    id: 14,
    block: 'Pipili',
    routeId: 'PPIPHBPK',
    routeName: 'HBPK-02',
    routeAbbreviation: 'HBPK-02',
    startingGp: 'Hatasahi',
    intermediateGps: ['Bharatipur', 'Panidola'],
    finalGp: 'Kanti',
    destination: 'PIPILI MRF',
    totalDistance: 30,
    scheduledOn: 'Every Wednesday',
    workers: [
      { name: 'Akshya behera', contact: '7325954801' },
      { name: 'Diptirekha Mallick(PEO)', contact: '8917538525' },
      { name: 'Bhaskar behera', contact: '9556341416' },
      { name: 'Bharat Baliarsingh', contact: '97778120425' }
    ]
  },
  {
    id: 15,
    block: 'Pipili',
    routeId: 'PPIPDKMDC',
    routeName: 'DKMDC-02',
    routeAbbreviation: 'DKMDC-02',
    startingGp: 'Dandamakundpur',
    intermediateGps: ['Kulasekharpur', 'Mangalpur', 'Durgadaspur'],
    finalGp: 'Chandradeipur',
    destination: 'PIPILI MRF',
    totalDistance: 35,
    scheduledOn: 'Every Thursday',
    workers: [
      { name: 'Suresh Mallik', contact: '7735992160' },
      { name: 'Suresh Chandra Sahu(PEO)', contact: '7008686652' },
      { name: 'Pradip behera', contact: '9937561172' },
      { name: 'Biswajita Das(PEO)', contact: '6370674019' },
      { name: 'Chitrasen behera', contact: '969230622' }
    ]
  },
  {
    id: 16,
    block: 'Pipili',
    routeId: 'PPIPJRSP',
    routeName: 'JRSP-03',
    routeAbbreviation: 'JRSP-03',
    startingGp: 'Jasuapur',
    intermediateGps: ['Rathapurusottampur', 'Saraswatipur'],
    finalGp: 'Rupadeipur',
    destination: 'PIPILI MRF',
    totalDistance: 60,
    scheduledOn: 'Every Friday',
    workers: [
      { name: 'Suresh Chandra Dash (PEO)', contact: '7077175822' },
      { name: 'chitaranjan jena', contact: '8917294813' },
      { name: 'Subhakanta Mohanty', contact: '8249084374' }
    ]
  },
  {
    id: 17,
    block: 'Pipili',
    routeId: 'PPIPSTB',
    routeName: 'STB-03',
    routeAbbreviation: 'STB-03',
    startingGp: 'Sahajpur',
    intermediateGps: ['Teisipur'],
    finalGp: 'Birapurussottampur',
    destination: 'PIPILI MRF',
    totalDistance: 30,
    scheduledOn: 'Every Saturday',
    workers: [
      { name: 'Debendra sahoo', contact: '8342054492' },
      { name: 'Prakash behera', contact: '6372373375' },
      { name: 'Salma Begum (PEO)', contact: '7735802307' }
    ]
  },

  // Data for PURI SADAR Block
  {
    id: 18,
    block: 'Puri Sadar',
    routeId: 'PSADSBKBHMT',
    routeName: 'SBKBHMT-01',
    routeAbbreviation: 'SBKBHMT-01',
    startingGp: 'Sasandamadorpur',
    intermediateGps: ['Basudebapur', 'Kerandipur', 'Birabalabhadrapur', 'Hantuka', 'Malatipatpur'],
    finalGp: 'Talajanga',
    destination: 'Baliapanda MRF',
    totalDistance: 60,
    scheduledOn: 'Every Monday',
    workers: [
      { name: 'Radhakanta Hati(PEO)', contact: '8249518040' },
      { name: 'HARI HAR SAHOO', contact: '6297194449' },
      { name: 'SUKADEV SASMAL', contact: '8599881153' },
      { name: 'SATIA JENA', contact: '9040832934' },
      { name: 'CHIKU SWAIN', contact: '7483798329' },
      { name: 'Sunil Kumar Hembram', contact: '9348771663' }
    ]
  },
  {
    id: 19,
    block: 'Puri Sadar',
    routeId: 'PSADBCCGB',
    routeName: 'BCCGB-01',
    routeAbbreviation: 'BCCGB-01',
    startingGp: 'Birapratappur',
    intermediateGps: ['Chandanpur', 'Chalisibatia', 'Ganganarayanpur'],
    finalGp: 'Balipada',
    destination: 'Baliapanda MRF',
    totalDistance: 60,
    scheduledOn: 'Every Tuesday',
    workers: [
      { name: 'Sarmistha Sethy', contact: '6371598854' },
      { name: 'Pranay Das', contact: '9937183770' },
      { name: 'SANTOSH KUMAR DAS', contact: '9938869798' },
      { name: 'Radhanath Soren', contact: '7008078921' },
      { name: 'LAXMIDHAR BHOI', contact: '9114176589' }
    ]
  },
  {
    id: 20,
    block: 'Puri Sadar',
    routeId: 'PSADBBBGKPP',
    routeName: 'BBBGKPP-02',
    routeAbbreviation: 'BBBGKPP-02',
    startingGp: 'Bhailipur',
    intermediateGps: ['Bijayaramachandrapur', 'Biranarsinghpur', 'Gaudakera', 'Kahneibidyadharpur', 'pratappurushottampur'],
    finalGp: 'Pratapramachandrapur',
    destination: 'Masanichandi MRF',
    totalDistance: 65,
    scheduledOn: 'Every Wednesday',
    workers: [
      { name: 'Soumya Mishra', contact: '7978337452' },
      { name: 'RAHUL BHOI', contact: '9348178399' },
      { name: 'Pratyush Ranjan Pradhan', contact: '8249627874' },
      { name: 'Arabinda Nayak', contact: '8249388345' },
      { name: 'NABAKISHOR PRADHAN', contact: '9937155992' },
      { name: 'Keshab Chandra Pradhan', contact: '9861453363' }
    ]
  },
  {
    id: 21,
    block: 'Puri Sadar',
    routeId: 'PSADBBGJR',
    routeName: 'BBGJR-03',
    routeAbbreviation: 'BBGJR-03',
    startingGp: 'Baliput',
    intermediateGps: ['Beladala', 'Gadamrugasira', 'Jamarsuan'],
    finalGp: 'Raigorada',
    destination: 'Talabania MRF',
    totalDistance: 60,
    scheduledOn: 'Every Friday',
    workers: [
      { name: 'RANJIT KUMAR PRADHAN', contact: '9178205590' },
      { name: 'SURENDRA SETHI', contact: '9348369981' },
      { name: 'MANAS RANJAN JENA', contact: '8328944848' },
      { name: 'Sulamani Jani (PEO)', contact: '9692042758' },
      { name: 'KRUSHNA CHANDRA MALICK', contact: '9178207133' }
    ]
  }
];