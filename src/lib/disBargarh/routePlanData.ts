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
  // ATTABIRA BLOCK
  {
    id: 1,
    block: 'Attabira',
    routeId: 'BATT-K/B/C-1',
    routeName: 'KULUNDA-BUGBUGA-CHKULI',
    routeAbbreviation: 'KBC-01',
    startingGp: 'KULUNDA',
    intermediateGps: ['BUGBUGA'],
    finalGp: 'CHKULI',
    destination: 'MRF-1',
    totalDistance: 22,
    workers: [
      { name: 'INDRANI SAHU', contact: '9337340577' },
      { name: 'SABITA NAG', contact: '9556262255' },
      { name: 'BABITA BAG', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 2,
    block: 'Attabira',
    routeId: 'BATT-M/K/H-1',
    routeName: 'MANAPADA-KHARMUMUNDA-HIRLIAPALI',
    routeAbbreviation: 'MKH-01',
    startingGp: 'MANAPADA',
    intermediateGps: ['KHARMUMUNDA'],
    finalGp: 'HIRLIAPALI',
    destination: 'MRF-1',
    totalDistance: 30,
    workers: [
      { name: 'RASHMITA BHOI', contact: '7854949148' },
      { name: 'JASOBANTI NAG', contact: '7608975494' },
      { name: 'SUKANTI BEHERA', contact: '9938146148' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 3,
    block: 'Attabira',
    routeId: 'BATT-P/J/J-1',
    routeName: 'PAHARSRIGIDA-JANHAPADA-JHILIMINDA',
    routeAbbreviation: 'PJJ-01',
    startingGp: 'PAHARSRIGIDA',
    intermediateGps: ['JANHAPADA'],
    finalGp: 'JHILIMINDA',
    destination: 'MRF-1',
    totalDistance: 15,
    workers: [
      { name: 'SUNITA SETH', contact: '7008987997' },
      { name: 'BASANTI NAG', contact: '7894374665' },
      { name: 'TIKESWARI NAIK', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 4,
    block: 'Attabira',
    routeId: 'BATT-L/T/G-1',
    routeName: 'LACHIDA-TANGARAPALLI-GODBHAGA',
    routeAbbreviation: 'LTG-01',
    startingGp: 'LACHIDA',
    intermediateGps: ['TANGARAPALLI'],
    finalGp: 'GODBHAGA',
    destination: 'MRF-1',
    totalDistance: 19,
    workers: [
      { name: 'BHARTI MAHANANDA', contact: '9938393317' },
      { name: 'MUKTA BARIK', contact: '9078300903' },
      { name: 'KUNTI BASAN', contact: '8117880980' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 5,
    block: 'Attabira',
    routeId: 'BATT-K/K/K-1',
    routeName: 'KADABAHAL-KULTATUKRA-KUMALSINMGHA',
    routeAbbreviation: 'KKK-01',
    startingGp: 'KADABAHAL',
    intermediateGps: ['KULTATUKRA'],
    finalGp: 'KUMALSINMGHA',
    destination: 'MRF-2',
    totalDistance: 26,
    workers: [
      { name: 'KUNTI PAIK', contact: '9777559965' },
      { name: 'PURNABASI SETH', contact: '7978549887' },
      { name: 'DIBYA NAG', contact: '7852994257' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 6,
    block: 'Attabira',
    routeId: 'BATT-L/L/S-1',
    routeName: 'LAHANDA-LARAMBHA-SILOT',
    routeAbbreviation: 'LLS-01',
    startingGp: 'LAHANDA',
    intermediateGps: ['LARAMBHA'],
    finalGp: 'SILOT',
    destination: 'MRF-2',
    totalDistance: 30,
    workers: [
      { name: 'SANTOSHINI SARAF', contact: '6370566229' },
      { name: 'ARUNA KUMBHAR', contact: '9692548421' },
      { name: 'KUMODINI PRADHAN', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 7,
    block: 'Attabira',
    routeId: 'BATT-T/D/A-1',
    routeName: 'TAMPARSARA-DULAMPUR-AMLIPALI',
    routeAbbreviation: 'TDA-01',
    startingGp: 'TAMPARSARA',
    intermediateGps: ['DULAMPUR'],
    finalGp: 'AMLIPALI',
    destination: 'MRF-2',
    totalDistance: 25,
    workers: [
      { name: 'SANJUKTA BAG', contact: '8457060887' },
      { name: 'NALINI MALLIK', contact: '9937353569' },
      { name: 'DILESWARI SINGH', contact: '8260994803' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 8,
    block: 'Attabira',
    routeId: 'BATT-L/T/J-1',
    routeName: 'LARASARA-TOPE-JANGAD',
    routeAbbreviation: 'LTJ-01',
    startingGp: 'LARASARA',
    intermediateGps: ['TOPE'],
    finalGp: 'JANGAD',
    destination: 'MRF-2',
    totalDistance: 15,
    workers: [
      { name: 'JANHABI MAHAKUR', contact: '8917492526' },
      { name: 'KABITA JAGDALA', contact: '7205807226' },
      { name: 'SANTOSINI DANSANA', contact: '8455995349' }
    ],
    scheduledOn: 'To be notified'
  },

  // BARGARH BLOCK
  {
    id: 9,
    block: 'Bargarh',
    routeId: 'BBAR-N/B/S',
    routeName: 'Nileswar-Birmal-S.Dumerpali',
    routeAbbreviation: 'NBS-01',
    startingGp: 'Nileswar',
    intermediateGps: ['Birmal'],
    finalGp: 'S.Dumerpali',
    destination: 'MRF-1',
    totalDistance: 20,
    workers: [
      { name: 'Premraj Tandi', contact: '7735063505' },
      { name: 'Bikash Luha', contact: '-' },
      { name: 'Minati Sahu', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 10,
    block: 'Bargarh',
    routeId: 'BBAR-C/P/G',
    routeName: 'Chakarkend-Patharla-Gobindpur',
    routeAbbreviation: 'CPG-01',
    startingGp: 'Chakarkend',
    intermediateGps: ['Patharla'],
    finalGp: 'Gobindpur',
    destination: 'MRF-1',
    totalDistance: 15,
    workers: [
      { name: 'Dasaratha Bhue', contact: '6371831826' },
      { name: 'Bhagabat Bhue', contact: '-' },
      { name: 'Sushanta sahu', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 11,
    block: 'Bargarh',
    routeId: 'BBAR-G/D/B',
    routeName: 'Gudesira-Deogaon-Bardol',
    routeAbbreviation: 'GDB-01',
    startingGp: 'Gudesira',
    intermediateGps: ['Deogaon'],
    finalGp: 'Bardol',
    destination: 'MRF-1',
    totalDistance: 10,
    workers: [
      { name: 'Kulamani Tandi', contact: '7684904933' },
      { name: 'Aswini Bibhar', contact: '-' },
      { name: 'Satya Kumar Sahu', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 12,
    block: 'Bargarh',
    routeId: 'BBAR-K/K/B',
    routeName: 'Khaliapali-Katapali-Bargaon',
    routeAbbreviation: 'KKB-01',
    startingGp: 'Khaliapali',
    intermediateGps: ['Katapali'],
    finalGp: 'Bargaon',
    destination: 'MRF-1',
    totalDistance: 15,
    workers: [
      { name: 'Mahesh Thapa', contact: '8455877698' },
      { name: 'Sushanta Sandha', contact: '-' },
      { name: 'Gajendra Banchhor', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 13,
    block: 'Bargarh',
    routeId: 'BBAR-T/K/S',
    routeName: 'Tumgaon-Khuntpali-Sarasara',
    routeAbbreviation: 'TKS-01',
    startingGp: 'Tumgaon',
    intermediateGps: ['Khuntpali'],
    finalGp: 'Sarasara',
    destination: 'MRF-2',
    totalDistance: 20,
    workers: [
      { name: 'Benudhar Nag', contact: '7789936925' },
      { name: 'Hrudaya Bhoi', contact: '-' },
      { name: 'Sudam tandi', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 14,
    block: 'Bargarh',
    routeId: 'BBAR-G/D',
    routeName: 'Gaisima-Dhanger',
    routeAbbreviation: 'GD-01',
    startingGp: 'Gaisima',
    intermediateGps: [],
    finalGp: 'Dhanger',
    destination: 'MRF-2',
    totalDistance: 30,
    workers: [
      { name: 'Hari Luha', contact: '6371742815' },
      { name: 'Santoshini Bhamarjal', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 15,
    block: 'Bargarh',
    routeId: 'BBAR-B/N.J/J',
    routeName: 'Bonda-N.Jampali-Jamurda',
    routeAbbreviation: 'BNJJ-01',
    startingGp: 'Bonda',
    intermediateGps: ['N.Jampali'],
    finalGp: 'Jamurda',
    destination: 'MRF-3',
    totalDistance: 25,
    workers: [
      { name: 'Ashok Behera', contact: '6372943963' },
      { name: 'Kanchana Bhisar', contact: '-' },
      { name: 'Durbadal Biswal', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 16,
    block: 'Bargarh',
    routeId: 'BBAR-T/K/B',
    routeName: 'Talsrigida-Kalapani-Barhagoda',
    routeAbbreviation: 'TKB-01',
    startingGp: 'Talsrigida',
    intermediateGps: ['Kalapani'],
    finalGp: 'Barhagoda',
    destination: 'MRF-3',
    totalDistance: 20,
    workers: [
      { name: 'Naresh Kalet', contact: '9668097138' },
      { name: 'Soudamini Nayak', contact: '-' },
      { name: 'Premanand Kumbhar', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 17,
    block: 'Bargarh',
    routeId: 'BBAR-K/K/A',
    routeName: 'Kuruan-Khandahata-Adgaon',
    routeAbbreviation: 'KKA-01',
    startingGp: 'Kuruan',
    intermediateGps: ['Khandahata'],
    finalGp: 'Adgaon',
    destination: 'MRF-3',
    totalDistance: 15,
    workers: [
      { name: 'Bharat Naik', contact: '9778887788' },
      { name: 'Karan Bhoi', contact: '-' },
      { name: 'Abhimanyu Sandha', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 18,
    block: 'Bargarh',
    routeId: 'BBAR-T',
    routeName: 'Tora Circuit',
    routeAbbreviation: 'T-01',
    startingGp: 'Tora',
    intermediateGps: [],
    finalGp: 'Tora',
    destination: 'MRF-3',
    totalDistance: 10,
    workers: [
      { name: 'Anjali Luha', contact: '7848016621' }
    ],
    scheduledOn: 'To be notified'
  },

  // BARPALI BLOCK
  {
    id: 19,
    block: 'Barpali',
    routeId: 'BBAR-G/B/K-1',
    routeName: 'Gopaepali-Bandhpali-Katapali',
    routeAbbreviation: 'GBK-01',
    startingGp: 'Gopaepali',
    intermediateGps: ['Bandhpali'],
    finalGp: 'Katapali',
    destination: 'MRF-2',
    totalDistance: 20,
    workers: [
      { name: 'RAMBHA NAG', contact: '9777681229' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 20,
    block: 'Barpali',
    routeId: 'BBAR-B/B/S-1',
    routeName: 'Barguda-Bhatigaon-Satalma',
    routeAbbreviation: 'BBS-01',
    startingGp: 'Barguda',
    intermediateGps: ['Bhatigaon'],
    finalGp: 'Satalma',
    destination: 'MRF-2',
    totalDistance: 15,
    workers: [
      { name: 'MADHUMATI LUHA', contact: '9861558528' },
      { name: 'DHANESWAR SINGH', contact: '9937853726' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 21,
    block: 'Barpali',
    routeId: 'BBAR-K/T/P-1',
    routeName: 'Kainsir-Tulandi-Patkulunda',
    routeAbbreviation: 'KTP-01',
    startingGp: 'Kainsir',
    intermediateGps: ['Tulandi'],
    finalGp: 'Patkulunda',
    destination: 'MRF-2',
    totalDistance: 10,
    workers: [
      { name: 'ARABINDA PADHAN', contact: '7064567372' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 22,
    block: 'Barpali',
    routeId: 'BBAR-T/T/R-1',
    routeName: 'Tinkani-Tilaemal-Roxa',
    routeAbbreviation: 'TTR-01',
    startingGp: 'Tinkani',
    intermediateGps: ['Tilaemal'],
    finalGp: 'Roxa',
    destination: 'MRF-2',
    totalDistance: 15,
    workers: [
      { name: 'SAMEER KU BEHERA', contact: '9937787966' },
      { name: 'ASHWINI MEHER', contact: '9861635147' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 23,
    block: 'Barpali',
    routeId: 'BBAR-K/M/A-1',
    routeName: 'Khemesara-Mahada-Agalpur',
    routeAbbreviation: 'KMA-01',
    startingGp: 'Khemesara',
    intermediateGps: ['Mahada'],
    finalGp: 'Agalpur',
    destination: 'MRF-2',
    totalDistance: 20,
    workers: [
      { name: 'JASHOBANTA BAG', contact: '6370642855' },
      { name: 'DINABANDHU GARTIA', contact: '7749965136' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 24,
    block: 'Barpali',
    routeId: 'BBAR-L/M/K-1',
    routeName: 'Lenda-Mahulpali-Kusanpuri',
    routeAbbreviation: 'LMK-01',
    startingGp: 'Lenda',
    intermediateGps: ['Mahulpali'],
    finalGp: 'Kusanpuri',
    destination: 'MRF-1',
    totalDistance: 30,
    workers: [
      { name: 'ULLASINI BARIK', contact: '7751035209' },
      { name: 'SANJURANI PADHAN', contact: '9853968947' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 25,
    block: 'Barpali',
    routeId: 'BBAR-K/-/B-1',
    routeName: 'Kanbar-Bagbadi',
    routeAbbreviation: 'KB-01',
    startingGp: 'Kanbar',
    intermediateGps: [],
    finalGp: 'Bagbadi',
    destination: 'MRF-1',
    totalDistance: 25,
    workers: [
      { name: 'BABULAL CHHATAR', contact: '9692138062' },
      { name: 'BALARAM BAG', contact: '9556719897' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 26,
    block: 'Barpali',
    routeId: 'BBAR-R/K/B-1',
    routeName: 'Remta-Kumbhari-Baramkela',
    routeAbbreviation: 'RKB-01',
    startingGp: 'Remta',
    intermediateGps: ['Kumbhari'],
    finalGp: 'Baramkela',
    destination: 'MRF-1',
    totalDistance: 20,
    workers: [
      { name: 'SAROJINI MAHANANDA', contact: '8457985933' },
      { name: 'MADHABA SAHU', contact: '6370435710' }
    ],
    scheduledOn: 'To be notified'
  },

  // BIJEPUR BLOCK
  {
    id: 27,
    block: 'Bijepur',
    routeId: 'BBIJ-C/B/B',
    routeName: 'CHARPALI-BUDAPALI-BAIRAKHPALI',
    routeAbbreviation: 'CBB-01',
    startingGp: 'CHARPALI',
    intermediateGps: ['BUDAPALI'],
    finalGp: 'BAIRAKHPALI',
    destination: 'MRF-1',
    totalDistance: 15,
    workers: [
      { name: 'CHUDAMANI NAIK', contact: '8328912189' },
      { name: 'SABITRI LUHA', contact: '-' },
      { name: 'RAMBHA RANA', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 28,
    block: 'Bijepur',
    routeId: 'BBIJ-T/K/S',
    routeName: 'T.GANDAPALI-KHARMUNDA-SURUBALI',
    routeAbbreviation: 'TKS-01',
    startingGp: 'T.GANDAPALI',
    intermediateGps: ['KHARMUNDA'],
    finalGp: 'SURUBALI',
    destination: 'MRF-2',
    totalDistance: 22,
    workers: [
      { name: 'SATYA DEEP', contact: '6370962918' },
      { name: 'JAGANNATHA MISHRA', contact: '-' },
      { name: 'KUNTI KUANR', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 29,
    block: 'Bijepur',
    routeId: 'BBIJ-S/T/M',
    routeName: 'SANBAUSEN-TALPADAR-M.SRIGIDA',
    routeAbbreviation: 'STM-01',
    startingGp: 'SANBAUSEN',
    intermediateGps: ['TALPADAR'],
    finalGp: 'M.SRIGIDA',
    destination: 'MRF-1',
    totalDistance: 28,
    workers: [
      { name: 'BHARAT BARIHA', contact: '8917675196' },
      { name: 'MINATI SAHU', contact: '-' },
      { name: 'SUBASH PATEL', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 30,
    block: 'Bijepur',
    routeId: 'BBIJ-J/L/P',
    routeName: 'JOKHIPALI-LAUMUNDA-PATHARLA',
    routeAbbreviation: 'JLP-01',
    startingGp: 'JOKHIPALI',
    intermediateGps: ['LAUMUNDA'],
    finalGp: 'PATHARLA',
    destination: 'MRF-2',
    totalDistance: 32,
    workers: [
      { name: 'SUJAL BAG', contact: '9861740118' },
      { name: 'DILLIP MAHAPATRA', contact: '-' },
      { name: 'RAGHU BIBHAR', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 31,
    block: 'Bijepur',
    routeId: 'BBIJ-B/S/B',
    routeName: 'BADBRAHAMNI-SAIPALI-BENIACHAL',
    routeAbbreviation: 'BSB-01',
    startingGp: 'BADBRAHAMNI',
    intermediateGps: ['SAIPALI'],
    finalGp: 'BENIACHAL',
    destination: 'MRF-1',
    totalDistance: 38,
    workers: [
      { name: 'ANANDA SAHU', contact: '8247771536' },
      { name: 'MOHAN SINGH', contact: '-' },
      { name: 'PURAN PAIK', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 32,
    block: 'Bijepur',
    routeId: 'BBIJ-B/P/B',
    routeName: 'BARMUNDA-PADA-BHATIGAON',
    routeAbbreviation: 'BPB-01',
    startingGp: 'BARMUNDA',
    intermediateGps: ['PADA'],
    finalGp: 'BHATIGAON',
    destination: 'MRF-1',
    totalDistance: 33,
    workers: [
      { name: 'SOUDAMINI BAGARTI', contact: '6371227325' },
      { name: 'RASHMI KUMBHAR', contact: '-' },
      { name: 'JIBARDHAN MEHER', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 33,
    block: 'Bijepur',
    routeId: 'BBIJ-S/J/B',
    routeName: 'SAMALEIPADAR-JARING-BADBAUSEN',
    routeAbbreviation: 'SJB-01',
    startingGp: 'SAMALEIPADAR',
    intermediateGps: ['JARING'],
    finalGp: 'BADBAUSEN',
    destination: 'MRF-1',
    totalDistance: 36,
    workers: [
      { name: 'NAROTTAM PARIDA', contact: '7855941773' },
      { name: 'JAYKRUSHNA MAHANANDA', contact: '-' },
      { name: 'ANU PODH', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 34,
    block: 'Bijepur',
    routeId: 'BBIJ-P/G',
    routeName: 'PAHANDI-GANTHIAPALI',
    routeAbbreviation: 'PG-01',
    startingGp: 'PAHANDI',
    intermediateGps: [],
    finalGp: 'GANTHIAPALI',
    destination: 'MRF-2',
    totalDistance: 32,
    workers: [
      { name: 'NIRANJAN SANDHA', contact: '8018517922' },
      { name: 'NARESH SAHU', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },

  // PADAMPUR BLOCK
  {
    id: 35,
    block: 'Padampur',
    routeId: 'BPAD-M/B/B',
    routeName: 'MAHULPALI-BHEUNRIA-BARIKEL',
    routeAbbreviation: 'MBB-01',
    startingGp: 'MAHULPALI',
    intermediateGps: ['BHEUNRIA'],
    finalGp: 'BARIKEL',
    destination: 'MRF1',
    totalDistance: 10,
    workers: [
      { name: 'Minakhi Bharasagar', contact: '9692179204' },
      { name: 'Keshba Gurla', contact: '-' },
      { name: 'Sadananda Bandia', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 36,
    block: 'Padampur',
    routeId: 'BPAD-P/L/K',
    routeName: 'PURENA-LOHARPALI-KHALIAPALI',
    routeAbbreviation: 'PLK-01',
    startingGp: 'PURENA',
    intermediateGps: ['LOHARPALI'],
    finalGp: 'KHALIAPALI',
    destination: 'MRF1',
    totalDistance: 10,
    workers: [
      { name: 'Panchanan Patakhamia', contact: '9668129600' },
      { name: 'Suratha Luhar', contact: '-' },
      { name: 'Hemanta majhi', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 37,
    block: 'Padampur',
    routeId: 'BPAD-D/B/D',
    routeName: 'DAHITA-BUDEN-DAHIGAON',
    routeAbbreviation: 'DBD-01',
    startingGp: 'DAHITA',
    intermediateGps: ['BUDEN'],
    finalGp: 'DAHIGAON',
    destination: 'MRF1',
    totalDistance: 20,
    workers: [
      { name: 'Sagar Bag', contact: '8018231099' },
      { name: 'Ramlal Patra', contact: '-' },
      { name: 'Laxman Besera', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 38,
    block: 'Padampur',
    routeId: 'BPAD-J/B/K',
    routeName: 'JAMARTALA-BUDAMAL-KANSAR',
    routeAbbreviation: 'JBK-01',
    startingGp: 'JAMARTALA',
    intermediateGps: ['BUDAMAL'],
    finalGp: 'KANSAR',
    destination: 'MRF2',
    totalDistance: 20,
    workers: [
      { name: 'Durjodhan Bhoi', contact: '8984323096' },
      { name: 'Sabita Giri', contact: '8457056181' },
      { name: 'Jamuna Gurla', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 39,
    block: 'Padampur',
    routeId: 'BPAD-J/D/P',
    routeName: 'JAMALA-DANGAGHAT-PALSAPALI',
    routeAbbreviation: 'JDP-01',
    startingGp: 'JAMALA',
    intermediateGps: ['DANGAGHAT'],
    finalGp: 'PALSAPALI',
    destination: 'MRF2',
    totalDistance: 20,
    workers: [
      { name: 'Subal Chibila', contact: '9938442843' },
      { name: 'Hari Dunguri', contact: '-' },
      { name: 'Upendra luhar', contact: '-' },
      { name: 'Paradesi Bharasagar', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 40,
    block: 'Padampur',
    routeId: 'BPAD-G/T/M',
    routeName: 'GYAN-TAL-MELCHHAMUNDA',
    routeAbbreviation: 'GTM-01',
    startingGp: 'GYAN',
    intermediateGps: ['TAL'],
    finalGp: 'MELCHHAMUNDA',
    destination: 'MRF2',
    totalDistance: 30,
    workers: [
      { name: 'Raja Nag', contact: '9938172218' },
      { name: 'Pikesh Deep', contact: '9629392706' },
      { name: 'Bikash Kalet', contact: '-' },
      { name: 'Saroj Tandi', contact: '-' },
      { name: 'Manoj Behera', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 41,
    block: 'Padampur',
    routeId: 'BPAD-S/B/K',
    routeName: 'SARGIBAHAL-BARIHAPALI-KANSINGHA',
    routeAbbreviation: 'SBK-01',
    startingGp: 'SARGIBAHAL',
    intermediateGps: ['BARIHAPALI'],
    finalGp: 'KANSINGHA',
    destination: 'MRF3',
    totalDistance: 30,
    workers: [
      { name: 'Trilochan Kumbhar', contact: '8917595252' },
      { name: 'Sudam kumbhar', contact: '-' },
      { name: 'Pabitra Bag', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  },
  {
    id: 42,
    block: 'Padampur',
    routeId: 'BPAD-C',
    routeName: 'CHARPALI Circuit',
    routeAbbreviation: 'C-01',
    startingGp: 'CHARPALI',
    intermediateGps: [],
    finalGp: 'CHARPALI',
    destination: 'MRF3',
    totalDistance: 10,
    workers: [
      { name: 'Chalu Behera', contact: '9178793265' },
      { name: 'Ajit Behera', contact: '-' }
    ],
    scheduledOn: 'To be notified'
  }
];
