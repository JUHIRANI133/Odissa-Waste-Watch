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
  // Baleswar Block - Balasore Municipality
  {
    id: 1,
    block: 'Baleswar',
    routeId: 'BBALPHSC-01',
    routeName: 'Patrapada to Chandipur',
    routeAbbreviation: 'PHSC-01',
    startingGp: 'Patrapada',
    intermediateGps: ['Hidigaon', 'Srikona'],
    finalGp: 'Chandipur',
    destination: 'MRF Purna Baleswar',
    totalDistance: 20,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Suni Hembram', contact: '8249561737' },
      { name: 'Jayanti Roul', contact: '6371360121' },
      { name: 'Kajal Patra', contact: '8917220548' },
      { name: 'Sasmita Das', contact: '7205893330' }
    ]
  },
  {
    id: 2,
    block: 'Baleswar',
    routeId: 'BBALBSGP-02',
    routeName: 'Baincha to Parikhi',
    routeAbbreviation: 'BSGP-02',
    startingGp: 'Baincha',
    intermediateGps: ['Sindhia', 'Gopinathpur'],
    finalGp: 'Parikhi',
    destination: 'MRF Purna Baleswar',
    totalDistance: 40,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Namimani Behera', contact: '9438751016' },
      { name: 'Sujata Das', contact: '9556974088' },
      { name: 'Jyoti Das', contact: '9178951855' },
      { name: 'Gouri Jana', contact: '8249083199' }
    ]
  },
  {
    id: 3,
    block: 'Baleswar',
    routeId: 'BBALDBC-03',
    routeName: 'Dubalagadi to Chhanua',
    routeAbbreviation: 'DBC-03',
    startingGp: 'Dubalagadi',
    intermediateGps: ['Bahabalpur'],
    finalGp: 'Chhanua',
    destination: 'MRF Purna Baleswar',
    totalDistance: 50,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Mamata Mandal', contact: '7735556169' },
      { name: 'Bhabani Mandal', contact: '6370526429' },
      { name: 'Laxmimani Majhi', contact: '8917458770' }
    ]
  },
  {
    id: 4,
    block: 'Baleswar',
    routeId: 'BBALRSGPB-4',
    routeName: 'Ranasahi to Bardhanpur',
    routeAbbreviation: 'RSGPB-4',
    startingGp: 'Ranasahi',
    intermediateGps: ['Sargaon', 'Gud', 'Padampur'],
    finalGp: 'Bardhanpur',
    destination: 'MRF 4 (Sunhat)',
    totalDistance: 16,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Kanak Das', contact: '7077438239' },
      { name: 'kuntala Majhi', contact: '7077217830' },
      { name: 'Sarmistha Dalei', contact: '9692883160' },
      { name: 'Rajashree Mahalik', contact: '7735205934' },
      { name: 'Ranjita Mallik', contact: '7205523092' }
    ]
  },
  {
    id: 5,
    block: 'Baleswar',
    routeId: 'BBALRJSGK-05',
    routeName: 'Rasalpur to Khannagar',
    routeAbbreviation: 'RJSGK-05',
    startingGp: 'Rasalpur',
    intermediateGps: ['Jaydev Kaspa', 'Sasanga', 'Genguti'],
    finalGp: 'Khannagar',
    destination: 'MRF 4 (Sunhat)',
    totalDistance: 20,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Dulamani Das', contact: '8895340442' },
      { name: 'Minati Lata Mallik', contact: '7381192376' },
      { name: 'kausalya mallik', contact: '9853894974' },
      { name: 'Latika Nayak', contact: '732800951' },
      { name: 'Kuni Singh', contact: '8114635206' }
    ]
  },
  {
    id: 6,
    block: 'Baleswar',
    routeId: 'BBALNBOO-06',
    routeName: 'Nagram to Odangi',
    routeAbbreviation: 'NBOO-06',
    startingGp: 'Nagram',
    intermediateGps: ['Buanla', 'Olanda Saragaon'],
    finalGp: 'Odangi',
    destination: 'MRF 2 (Sahadevkhunta, Chandmari padia)',
    totalDistance: 18,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Sarita Dandapat', contact: '6370325355' },
      { name: 'Saraswati Mahalik', contact: '9668019622' },
      { name: 'Kiranbala Das', contact: '7846855764' },
      { name: 'Lambodar Das', contact: '9348453274' }
    ]
  },
  {
    id: 7,    
    block: 'Baleswar',
    routeId: 'BBALRHKP-07',
    routeName: 'Raisuan to Panchupada',
    routeAbbreviation: 'RHKP-07',
    startingGp: 'Raisuan',
    intermediateGps: ['Haladipada', 'Kuradiha'],
    finalGp: 'Panchupada',
    destination: 'MRF 2 (Sahadevkhunta, Chandmari padia)',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Sunanda Mohapatra', contact: '7684018598' },
      { name: 'Hemalata Dhal', contact: '7077202151' },
      { name: 'Amita Das', contact: '7853955276' },
      { name: 'Subhadra Maity', contact: '9776285381' }
    ]
  },
  {
    id: 8,
    block: 'Baleswar',
    routeId: 'BBALKRARS-08',
    routeName: 'Kasipada to Srirampur',
    routeAbbreviation: 'KRARS-08',
    startingGp: 'Kasipada',
    intermediateGps: ['Rupsa', 'Anko', 'Rasulpur'],
    finalGp: 'Srirampur',
    destination: 'MRF 2 (Sahadevkhunta, Chandmari padia)',
    totalDistance: 65,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Sunita Giri', contact: '6370909732' },
      { name: 'Pratima Parida', contact: '6372602676' },
      { name: 'Santilata Giri', contact: '9692156887' },
      { name: 'Priyattama Pradhan', contact: '9337000917' },
      { name: 'Minati Biswal', contact: '9827424948' }
    ]
  },
  {
    id: 9,
    block: 'Baleswar',
    routeId: 'BBALSAK-09',
    routeName: 'Sartha to Kasafal',
    routeAbbreviation: 'SAK-09',
    startingGp: 'Sartha',
    intermediateGps: ['Alumeda'],
    finalGp: 'Kasafal',
    destination: 'MRF 2 (Sahadevkhunta, Chandmari padia)',
    totalDistance: 110,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Basanti Sethi', contact: '7854870515' },
      { name: 'Rebati Mallik', contact: '7438888804' },
      { name: 'Namita Majhi', contact: '9583733138' }
    ]
  },

  // Jaleswar Block Routes
  {
    id: 10,
    block: 'Jaleswar',
    routeId: 'BJALAGBKJ-01',
    routeName: 'Aruha to Jhadpimpal',
    routeAbbreviation: 'AGBKJ-01',
    startingGp: 'Aruha',
    intermediateGps: ['Gopimohanpur', 'Bartana', 'Khuluda'],
    finalGp: 'Jhadpimpal',
    destination: 'Jaleswar-MRF',
    totalDistance: 12,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Mamata Behera', contact: '8637209191' },
      { name: 'Sumitra Sheet', contact: '9861353854' },
      { name: 'Damayanti Behera', contact: '8144944725' },
      { name: 'Punam Chand', contact: '6372752919' },
      { name: 'Manjulata Parida', contact: '9776667005' }
    ]
  },
  {
    id: 11,
    block: 'Jaleswar',
    routeId: 'BJALRKPBP-02',
    routeName: 'R.R.Pur to Paschimabad',
    routeAbbreviation: 'RKPBP-02',
    startingGp: 'R.R.Pur',
    intermediateGps: ['Kothsahi', 'Kaikoda', 'Baigangadia'],
    finalGp: 'Paschimabad',
    destination: 'Jaleswar-MRF',
    totalDistance: 16,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Sunita Hansda', contact: '6370901477' },
      { name: 'Arati Parida', contact: '9238515471' },
      { name: 'Aniradha Sanki', contact: '6371842302' },
      { name: 'Shakuntala Pradhan', contact: '7873318000' },
      { name: 'Radharani Behera', contact: '7894025144' }
    ]
  },
  {
    id: 12,
    block: 'Jaleswar',  
    routeId: 'BJALGMRSC-03',
    routeName: 'Gadsai Baliapal to Chamargaon',
    routeAbbreviation: 'GMRSC-03',
    startingGp: 'Gadsai Baliapal',
    intermediateGps: ['N.N. Patana', 'Rajapur', 'Sikharpur'],
    finalGp: 'Chamargaon',
    destination: 'Jaleswar-MRF',
    totalDistance: 40,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Jayanti Majhi', contact: '9337091023' },
      { name: 'Arati Sahoo', contact: '6371911819' },
      { name: 'Kaloana Kar', contact: '9827643638' },
      { name: 'Manjulata Behera', contact: '9853839081' },
      { name: 'Kumudini Hansda', contact: '9777820732' }
    ]
  },
  {
    id: 13,
    block: 'Jaleswar',
    routeId: 'BJALBKKSS-04',
    routeName: 'Baradiha to Saradarbandha',
    routeAbbreviation: 'BKKSS-04',
    startingGp: 'Baradiha',
    intermediateGps: ['Kalma', 'Khurda', 'Sayam Nagar'],
    finalGp: 'Saradarbandha',
    destination: 'Jaleswar-MRF',
    totalDistance: 24,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Kiranbala Jena', contact: '7836498872' },
      { name: 'Rajeswari Das', contact: '8984342645' },
      { name: 'Tulasi Tudu', contact: '9178180763' },
      { name: 'Sabita Mahanta', contact: '8018698978' },
      { name: 'Fulamani Majhi', contact: '6371870148' }
    ]
  },
  {
    id: 14,
    block: 'Jaleswar',
    routeId: 'BJALKROKM-05',
    routeName: 'Kaliko to Makidiha',
    routeAbbreviation: 'KROKM-05',
    startingGp: 'Kaliko',
    intermediateGps: ['Raibania', 'Olmara', 'KM Sahi'],
    finalGp: 'Makidiha',
    destination: 'Jaleswar-MRF',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Aniradha Sanki', contact: '6371842302' },
      { name: 'Tulasi Bag', contact: '9348638151' },
      { name: 'Mamata Sar', contact: '9348296692' },
      { name: 'Sulochana Dehuru', contact: '7064743849' },
      { name: 'Rita Das', contact: '8455078294' }
    ]
  },
  {
    id: 15,
    block: 'Jaleswar',
    routeId: 'BJALGLSDN-06',
    routeName: 'Gobarghata to Nachhimpur',
    routeAbbreviation: 'GLSDN-06',
    startingGp: 'Gobarghata',
    intermediateGps: ['Lakshmannath', 'Srirampur', 'D.P Pur'],
    finalGp: 'Nachhimpur',
    destination: 'Jaleswar-MRF',
    totalDistance: 16,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Kajal Kana Chattarji', contact: '8595926696' },
      { name: 'Sandhyarani Mohanty', contact: '707799095' },
      { name: 'Sumitra Ghosh', contact: '9583177981' },
      { name: 'Annapurna Behera', contact: '7681814002' },
      { name: 'Kalpana Giri', contact: '7608824240' }
    ]
  },
  {
    id: 16,
    block: 'Jaleswar',
    routeId: 'BJALSNNKS-07',
    routeName: 'Sago to Sampatia',
    routeAbbreviation: 'SNNKS-07',
    startingGp: 'Sago',
    intermediateGps: ['Netua', 'Nampo', 'Khalina'],
    finalGp: 'Sampatia',
    destination: 'Jaleswar-MRF',
    totalDistance: 18,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Basanti Mahali', contact: '9853310419' },
      { name: 'Sania Murmu', contact: '7205393247' },
      { name: 'Ashalata Dey', contact: '8093653737' },
      { name: 'Sasmita Dutta', contact: '9583232553' },
      { name: 'Minati Hui', contact: '8984244849' }
    ]
  },

  // Soro Block Routes
  {
    id: 17,
    block: 'Soro',
    routeId: 'BSORGTAPBM-01',
    routeName: 'Gud to Mulising',
    routeAbbreviation: 'GTAPBM-01',
    startingGp: 'Gud',
    intermediateGps: ['Tentei', 'Anatapur', 'Pakhar', 'Balanga'],
    finalGp: 'Mulising',
    destination: 'Soro-MRF',
    totalDistance: 40,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Basantilata Sethi', contact: '7749030227' },
      { name: 'Santosh Malik', contact: '7064215545' },
      { name: 'Annanta Gochhayat', contact: '9337258235' },
      { name: 'Rabindra Pradhan', contact: '7735597086' },
      { name: 'Chhitaranjan Palei', contact: '9090003449' },
      { name: 'Shantilata Behera', contact: '9777725875' }
    ]
  },
  {
    id: 18,
    block: 'Soro',
    routeId: 'BSORSTSK-02',
    routeName: 'Sabira to Kedarpur',
    routeAbbreviation: 'STSK-02',
    startingGp: 'Sabira',
    intermediateGps: ['Talanagar', 'Sajanpur'],
    finalGp: 'Kedarpur',
    destination: 'Soro-MRF',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Arjun Jena', contact: '8984499090' },
      { name: 'Prashanta Kumar Mohakud', contact: '8114617181' },
      { name: 'Abhiram Jena', contact: '9178535828' },
      { name: 'Mandakini Jena', contact: '9078353367' }
    ]
  },
  {
    id: 19,
    block: 'Soro',  
    routeId: 'BSORSGKMD-03',
    routeName: 'Singakhunta to Dahisada',
    routeAbbreviation: 'SGKMD-03',
    startingGp: 'Singakhunta',
    intermediateGps: ['Mahumuhan', 'Gopinathpur', 'Kesharipur', 'Manatri'],
    finalGp: 'Dahisada',
    destination: 'Soro-MRF',
    totalDistance: 40,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Rabindra Patra', contact: '9337864119' },
      { name: 'Debendra Das', contact: '9439702484' },
      { name: 'Sunanda Gochhayat', contact: '9937299238' },
      { name: 'Rebati Samal', contact: '8457862419' },
      { name: 'Rebati Mallik', contact: '9692997294' },
      { name: 'Radhakanta Dwary', contact: '8917242322' }
    ]
  },
  {
    id: 20,
    block: 'Soro',
    routeId: 'BSORAMNNS-04',
    routeName: 'Attapur to Sarasankha',
    routeAbbreviation: 'AMNNS-04',
    startingGp: 'Attapur',
    intermediateGps: ['Madhusudanpur', 'Nischintapur', 'Nadigaon'],
    finalGp: 'Sarasankha',
    destination: 'Soro-MRF',
    totalDistance: 20,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Kalpana Behera', contact: '6372852809' },
      { name: 'Damburudhar Jena', contact: '8658805942' },
      { name: 'Jayanti Das', contact: '7077430640' },
      { name: 'Ramesh Chandra Patra', contact: '9938569875' },
      { name: 'Manoranjan Rout', contact: '7064668558' }
    ]
  },
  {
    id: 21,
    block: 'Soro',
    routeId: 'BSORMJN-05',
    routeName: 'Manipur to Natapada',
    routeAbbreviation: 'MJN-05',
    startingGp: 'Manipur',
    intermediateGps: ['Jadida'],
    finalGp: 'Natapada',
    destination: 'Soro-MRF',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Prabhakar Barik', contact: '9439641708' },
      { name: 'Brundaban Sahoo', contact: '9438457357' },
      { name: 'Mithun Parida', contact: '9777220223' }
    ]
  },

  // Nilgiri Block Routes
  {
    id: 22,
    block: 'Nilgiri',
    routeId: 'BNILDKBJK-01',
    routeName: 'Dhabasila to K.P. Lakharajpur',
    routeAbbreviation: 'DKBJK-01',
    startingGp: 'Dhabasila',
    intermediateGps: ['K.C,Pur', 'Degunia', 'Jodia'],
    finalGp: 'K.P. Lakharajpur',
    destination: 'Nilgiri-MRF',
    totalDistance: 16,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Gurubari Sethi', contact: '7894491246' },
      { name: 'Manorama Behera', contact: '7846929361' },
      { name: 'Shantilata Kar', contact: '7381726584' },
      { name: 'Saraswati Singh', contact: '7606972572' },
      { name: 'Sanjukta Singh', contact: '9937537783' }
    ]
  },
  {
    id: 23,
    block: 'Nilgiri',
    routeId: 'BNILMKKNR-02',
    routeName: 'Machhua to R.K.Pur',
    routeAbbreviation: 'MMKNR-02',
    startingGp: 'Machhua',
    intermediateGps: ['Mahisapata', 'Kansa', 'Narasingpur'],
    finalGp: 'R.K.Pur',
    destination: 'Nilgiri-MRF',
    totalDistance: 26,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Binimani Dalei', contact: '8917463421' },
      { name: 'Pramila Singh', contact: '8342043585' },
      { name: 'Rukmani Rout', contact: '7683939827' },
      { name: 'Debimani Nayak', contact: '7681851751' },
      { name: 'Kabita Singh', contact: '7327845255' }
    ]
  },
  {
    id: 24,
    block: 'Nilgiri',
    routeId: 'BNILANGMS-03',
    routeName: 'Ajodhya to Siadimal',
    routeAbbreviation: 'ANGMS-03',
    startingGp: 'Ajodhya',
    intermediateGps: ['Naranpur', 'Garadi', 'Matiali'],
    finalGp: 'Siadimal',
    destination: 'Nilgiri-MRF',
    totalDistance: 28,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Mamata Singh', contact: '6372267068' },
      { name: 'Somyashree Nayak', contact: '-' },
      { name: 'Panchami Singh', contact: '7077099395' },
      { name: 'Sabitri Behera', contact: '8393723667' }
    ]
  },
  {
    id: 25,
    block: 'Nilgiri',
    routeId: 'BNILSJTBP-04',
    routeName: 'Sajanagarh to Pithahata',
    routeAbbreviation: 'SJTBP-04',
    startingGp: 'Sajanagarh',
    intermediateGps: ['Jamudhia', 'Telipal', 'Berhempur'],
    finalGp: 'Pithahata',
    destination: 'Nilgiri-MRF',
    totalDistance: 24,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Rashmita Barik', contact: '7504789308' },
      { name: 'Mamata Palei', contact: '9337877946' },
      { name: 'Rashmita Das', contact: '9658691985' },
      { name: 'Gitanjali Sankhual', contact: '8249380625' }
    ]
  },
  {
    id: 26,
    block: 'Nilgiri',
    routeId: 'BNILCDATB-05',
    routeName: 'Chhatrapur to Bhouriabad',
    routeAbbreviation: 'CDATB-05',
    startingGp: 'Chhatrapur',
    intermediateGps: ['Dharmpur', 'Arabandh', 'Tentulia'],
    finalGp: 'Bhouriabad',
    destination: 'Nilgiri-MRF',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Champa singh', contact: '6372393986' },
      { name: 'Padmabati Sethi', contact: '7809539735' },
      { name: 'Dehala Majhi', contact: '8327732258' },
      { name: 'Gelhi Mukhi', contact: '7684077598' },
      { name: 'Srimati Singh', contact: '7327078898' }
    ]
  },

  // Remuna Block Routes (Remuna NAC)
  {
    id: 27,
    block: 'Remuna',
    routeId: 'BREMSTITKM-01',
    routeName: 'Srijang to Maharajpur',
    routeAbbreviation: 'STITKM-01',
    startingGp: 'Srijang',
    intermediateGps: ['Tundra', 'Inchudi', 'Talapada', 'Kuligaon'],
    finalGp: 'Maharajpur',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 62,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Basanti Mallik', contact: '7873321081' },
      { name: 'Bhabani Shankkar Mallik', contact: '9938094703' },
      { name: 'Ajit Kumar Parida', contact: '9861517482' },
      { name: 'Deepak Kumar Pardhan', contact: '9777622695' },
      { name: 'Satya Malik', contact: '8249467452' },
      { name: 'Keshab Chandra Behera', contact: '6370089192' }
    ]
  },
  {
    id: 28,
    block: 'Remuna',
    routeId: 'BREMBSNBKK-02',
    routeName: 'Barunasing to Karanjia',
    routeAbbreviation: 'BSNBKK-02',
    startingGp: 'Barunasing',
    intermediateGps: ['Sergarh', 'Nuagaon', 'Biruan', 'Kuruda'],
    finalGp: 'Karanjia',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 54,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Biswajit Parida', contact: '7978343896' },
      { name: 'Manoranjan Das', contact: '9777324621' },
      { name: 'Basanti Mahalik', contact: '8018623179' },
      { name: 'Maheswar Bhoi', contact: '9937947922' },
      { name: 'Harinarayan Singh', contact: '9938553530' },
      { name: 'Madhumita Giri', contact: '9777508955' }
    ]
  },
  {
    id: 29,
    block: 'Remuna',
    routeId: 'BREMBSSKB-03',
    routeName: 'Balia to Bhimpura',
    routeAbbreviation: 'BSSKB-03',
    startingGp: 'Balia',
    intermediateGps: ['Saraswatipur', 'Sutei', 'Kharidmukhura'],
    finalGp: 'Bhimpura',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 24,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Chhayamani Patra', contact: '9337269208' },
      { name: 'Sarita Singh', contact: '8917547122' },
      { name: 'Subhasmita Das', contact: '9658146429' },
      { name: 'Bhanumati Barik', contact: '9348508997' },
      { name: 'Droupadi Singh', contact: '9337343654' }
    ]
  },
  {
    id: 30,
    block: 'Remuna',
    routeId: 'BREMHNGDC-03',
    routeName: 'Haripur to Chasakhand',
    routeAbbreviation: 'HNGDC-03',
    startingGp: 'Haripur',
    intermediateGps: ['Nizampur', 'Gandarda', 'Dahapada'],
    finalGp: 'Chasakhand',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 30,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Gobinda Mohanty', contact: '9337324373' },
      { name: 'Smaraki Swain', contact: '8144851112' },
      { name: 'Iswar Mohanty', contact: '7752092560' },
      { name: 'Sanjulata Jena', contact: '9776478767' },
      { name: 'Bikash Kumar Pakal', contact: '7908429585' }
    ]
  },
  {
    id: 31,
    block: 'Remuna',
    routeId: 'BREMBPKMA-05',
    routeName: 'Badapal to Armala',
    routeAbbreviation: 'BPKMA-05',
    startingGp: 'Badapal',
    intermediateGps: ['Patripal', 'Kalyapur', 'Mandarpur'],
    finalGp: 'Armala',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 36,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Sushanta Acharya', contact: '891743768' },
      { name: 'Bimal Kumar Das', contact: '6371551138' },
      { name: 'Sabitri Panda', contact: '8260481067' },
      { name: 'Jyotsnarani Mahalik', contact: '9658562248' },
      { name: 'Pratima Jena', contact: '7682956147' }
    ]
  },
  {
    id: 32,
    block: 'Remuna',
    routeId: 'BREMNTDG-06',
    routeName: 'Nuapadhi to Gududa',
    routeAbbreviation: 'NTDGP-06',
    startingGp: 'Nuapadhi',
    intermediateGps: ['Tentulida', 'Durgadevi'],
    finalGp: 'Gududa',
    destination: 'Remuna-NAC-MRF',
    totalDistance: 14,
    scheduledOn: 'Twice in Month (1st & 3rd week)',
    workers: [
      { name: 'Alpana Biswas', contact: '8917371211' },
      { name: 'Rebati Kar', contact: '9348905982' },
      { name: 'Mamita Pal', contact: '6371950880' },
      { name: 'Rukmani Pardhan', contact: '8917476421' }
    ]
  }
];
