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
  // Bhabanipatna Block Routes
  {
    id: 1,
    block: 'Bhabanipatna',
    routeId: 'KBHAB',
    routeName: 'BSDAPGK-01',
    routeAbbreviation: 'BSDAPGK-01',
    startingGp: 'BORDA',
    intermediateGps: ['SIKUAN', 'DUMRIA', 'ARTAL', 'PALNA', 'GURJUNG'],
    finalGp: 'KENDUPATI',
    destination: 'Bhawanipata(Bhangabari)',
    totalDistance: 72,
    workers: [
      { name: 'Rasmita Bagarti', contact: '6371135088' },
      { name: 'Rukmani Bagarti', contact: '9668722859' },
      { name: 'Rashmita Majhi', contact: '9827237342' },
      { name: 'Jayamani Dei', contact: '7681882024' },
      { name: 'Sanita Gahir', contact: '7077430737' },
      { name: 'Rukuni Gahir', contact: '9078062857' },
      { name: 'Chandini Sabar', contact: '9937143734' },
      { name: 'Rekha Bag', contact: '7894533409' }
    ],
    scheduledOn: '1st and 16th of Every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    block: 'Bhabanipatna',
    routeId: 'KBHAS',
    routeName: 'SBMMCKC-02',
    routeAbbreviation: 'SBMMCKC-02',
    startingGp: 'SEINPUR',
    intermediateGps: ['BORBHATA', 'MADIGUDA', 'MATIA', 'CHAHAGAON', 'KARLAPADA'],
    finalGp: 'CHHELIAMAL',
    destination: 'Bhawanipata(Bhangabari)',
    totalDistance: 45,
    workers: [
      { name: 'Dulani Bag', contact: '7894497645' },
      { name: 'Turebati Gahir', contact: '8018497959 / 7978461653' },
      { name: 'Pana Majhi', contact: '9668838105' },
      { name: 'Jagyanseni Sahu', contact: '7847871720' },
      { name: 'Deepanjali sahu', contact: '9692690461' },
      { name: 'Kumudini Majhi', contact: '6370449535' },
      { name: 'Jayanti Majhi', contact: '8260933615' }
    ],
    scheduledOn: '3th and 18th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 3,
    block: 'Bhabanipatna',
    routeId: 'KBHAK',
    routeName: 'KPKKT-03',
    routeAbbreviation: 'KPKKT-03',
    startingGp: 'KALAM',
    intermediateGps: ['PALSIJHARAN', 'KARLAGUDA', 'KAMTHANA'],
    finalGp: 'THUAPADAR',
    destination: 'Bhawanipata(Bhangabari)',
    totalDistance: 63,
    workers: [
      { name: 'Chitra Sa', contact: '9861150834' },
      { name: 'Sonia Majhi', contact: '7735806583' },
      { name: 'Pami Harpal', contact: '8144386253' },
      { name: 'Ankita Mangraj', contact: '9040730864' },
      { name: 'Lochana Naik', contact: '977254683' }
    ],
    scheduledOn: '5th and 20nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 4,
    block: 'Bhabanipatna',
    routeId: 'KBHAD',
    routeName: 'DCTJS-04',
    routeAbbreviation: 'DCTJS-04',
    startingGp: 'DUARSUNI',
    intermediateGps: ['CHANCHER', 'TALBELGAON', 'JUGSAIPATNA'],
    finalGp: 'SAGADA',
    destination: 'Bhawanipata(Sirliguda)',
    totalDistance: 43,
    workers: [
      { name: 'Surendra Majhi', contact: '8917258359' },
      { name: 'Lakhsmi Majhi', contact: '6372703839' },
      { name: 'Mohini Goud', contact: '9178417123' },
      { name: 'Sande Dei', contact: '6371231086' }
    ],
    scheduledOn: '7th and 22th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 5,
    block: 'Bhabanipatna',
    routeId: 'KBHAR',
    routeName: 'RMKGK-O5',
    routeAbbreviation: 'RMKGK-O5',
    startingGp: 'RISIGAON',
    intermediateGps: ['MALGAON', 'KULIAMAL', 'GANDBARJHOLA'],
    finalGp: 'KUTRUKHAMAR',
    destination: 'Bhawanipata(Near Lic Office)',
    totalDistance: 31,
    workers: [
      { name: 'SURABI PODH', contact: '9861999135' },
      { name: 'LATA PUJHARI', contact: '8144207419' },
      { name: 'Ratnabati Naik', contact: '9937295256' },
      { name: 'Samabati Rana', contact: '8260598023' },
      { name: 'PINKI PUJHARI', contact: '9668264631' }
    ],
    scheduledOn: '9th and 24th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 6,
    block: 'Bhabanipatna',
    routeId: 'KBHAD',
    routeName: 'DDUGMLS-06',
    routeAbbreviation: 'DDUGMLS-06',
    startingGp: 'DADPUR',
    intermediateGps: ['DEYPORE', 'UDEPUR', 'GUDIALIPADAR', 'MEDINIPUR', 'LAXMIPUR'],
    finalGp: 'SRIPUR',
    destination: 'Bhawanipata(Near Lic Office)',
    totalDistance: 34,
    workers: [
      { name: 'Sukun Jhankar', contact: '9777849452' },
      { name: 'Bibha Sill', contact: '8984060210' },
      { name: 'Dipanjali Sahu', contact: '70084208465' },
      { name: 'Pushpanjali Thakur', contact: '8260905505' },
      { name: 'muni das', contact: '7750084901' },
      { name: 'Rukha Bag', contact: '7894100713' }
    ],
    scheduledOn: '11th and 26th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },

  // Dharamgarh Block Routes
  {
    id: 7,
    block: 'Dharamgarh',
    routeId: 'KDHAT',
    routeName: 'TBBBNBB-01',
    routeAbbreviation: 'TBBBNBB-01',
    startingGp: 'TARAPUR',
    intermediateGps: ['BODEN', 'BADGHUMER', 'NANDAGAON', 'BADFURLA'],
    finalGp: 'BAGAD',
    destination: 'Dharamgarh (Near Paradeswar Mandir Pada)',
    totalDistance: 29,
    workers: [
      { name: 'BELAMATI SUNANI', contact: '9178055513' },
      { name: 'JAYANTI NIAL', contact: '9938634573' },
      { name: 'MANGRE SUNANI', contact: '8260875089' },
      { name: 'RASMITA MAHANAND', contact: '7008685474' },
      { name: 'KANCHANA SABAR', contact: '6372405312' },
      { name: 'AMRUTANJALI BAG', contact: '9861783349' }
    ],
    scheduledOn: '1st and 16th of Every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 8,
    block: 'Dharamgarh',
    routeId: 'KDHAT',
    routeName: 'TBDCJPKG-02',
    routeAbbreviation: 'TBDCJPKG-02',
    startingGp: 'TENDAPALI',
    intermediateGps: ['BEHERA', 'DHANARPUR', 'CHANCHANBAHALI', 'JAYANTAPUR', 'PARLA', 'KADALIMUNDA'],
    finalGp: 'GADIAJORE',
    destination: 'Dharamgarh (Near Paradeswar Mandir Pada)',
    totalDistance: 56,
    workers: [
      { name: 'BASAMATI MEHER', contact: '6372701789' },
      { name: 'SUNITA SINC. RAJPUT', contact: '9337993562' },
      { name: 'KUSUMA NAIK', contact: '6372943868' },
      { name: 'JAY. DURGA SHG', contact: '7077443246' },
      { name: 'ARUNDHATI JAL', contact: '8658120307' },
      { name: 'CHARULATA BODKIA', contact: '9078352559' },
      { name: 'HARABATI NAIK', contact: '6371199229' }
    ],
    scheduledOn: '3rd and 18th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 9,
    block: 'Dharamgarh',
    routeId: 'KDHAK',
    routeName: 'KSC-03',
    routeAbbreviation: 'KSC-03',
    startingGp: 'KANKERI',
    intermediateGps: ['SANDHIKULIHARI'],
    finalGp: 'CHHILPA',
    destination: 'Dharamgarh (Near Paradeswar Mandir Pada)',
    totalDistance: 13,
    workers: [
      { name: 'DHANUBALI KATA', contact: '8917546149' },
      { name: 'BARSA TANDI', contact: '9339463506' },
      { name: 'MAMATA PATEL', contact: '9348372538' }
    ],
    scheduledOn: '5th and 20nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 10,
    block: 'Dharamgarh',
    routeId: 'KDHAT',
    routeName: 'TDKB-04',
    routeAbbreviation: 'TDKB-04',
    startingGp: 'TIPIGUDA',
    intermediateGps: ['DUMERGUDA', 'KANAGAON'],
    finalGp: 'BRAHMANCHHENDIA',
    destination: 'Dharamgarh (Near Paradeswar Mandir Pada)',
    totalDistance: 32,
    workers: [
      { name: 'ASTAMI NAIK', contact: '9348342271' },
      { name: 'GUNAMATI MAJHI', contact: '9078860222' },
      { name: 'TARULATA JAGAT', contact: '9937032956' },
      { name: 'JAGYANSENI SHABAR', contact: '7894790403' }
    ],
    scheduledOn: '7th and 22nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 11,
    block: 'Dharamgarh',
    routeId: 'KDHAT',
    routeName: 'TKB-O5',
    routeAbbreviation: 'TKB-O5',
    startingGp: 'TAMBACHHADA',
    intermediateGps: ['KHAIRPADAR'],
    finalGp: 'BADBASUL',
    destination: 'Dharamgarh (Near Paradeswar Mandir Pada)',
    totalDistance: 29,
    workers: [
      { name: 'TULASI GOPAL', contact: '9337316685' },
      { name: 'SUSHREE SANGITA MAHUTI', contact: '8249787990' },
      { name: 'KUSUMNANJALI SABAR', contact: '7855859211' }
    ],
    scheduledOn: '9th and 24th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },

  // Junagarh Block Routes
  {
    id: 12,
    block: 'Junagarh',
    routeId: 'KJUNT',
    routeName: 'TAKPCNCPB-01',
    routeAbbreviation: 'TAKPCNCPB-01',
    startingGp: 'TALMALA',
    intermediateGps: ['ATIGAON', 'KALIAKUNDAL', 'PILKIA', 'CHICHEIGUDA', 'NAKTIGUDA', 'CHHORIAGARH', 'PALAS'],
    finalGp: 'BALDIAMAL',
    destination: 'Junagarh (Near Eye Hospital)',
    totalDistance: 38,
    workers: [
      { name: 'ARCHITA NAG', contact: '8144356954' },
      { name: 'MANJULA MAJHI', contact: '7834677133' },
      { name: 'LALITA PANA', contact: '8144800109' },
      { name: 'DIPAN DANDSENA', contact: '9838249853' },
      { name: 'GITANIALI MEHER', contact: '7725500050' },
      { name: 'Shilpa Saraf', contact: '8288112044' },
      { name: 'Madhesreita pulari', contact: '7852910484' },
      { name: 'ARIPTA MEHER', contact: '8558629155' },
      { name: 'ARTINAG', contact: '8318045750' }
    ],
    scheduledOn: '1st and 16th of Every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 13,
    block: 'Junagarh',
    routeId: 'KJUNC',
    routeName: 'CKMSMHG-02',
    routeAbbreviation: 'CKMSMHG-02',
    startingGp: 'CHARBAHAL',
    intermediateGps: ['KALOPALA', 'MAHICHALA', 'S.KUNDAMAL', 'MALIGUDA', 'HABASPUR'],
    finalGp: 'GOUGCHHENDIA',
    destination: 'Junagarh (Near Eye Hospital)',
    totalDistance: 55,
    workers: [
      { name: 'Nindiri Sunani', contact: '8144455353' },
      { name: 'Pinu Singh', contact: '6372105583' },
      { name: 'Sashmurhi Gamir', contact: '9556467776' },
      { name: 'Torans Nak', contact: '3337983766' },
      { name: 'Indumati Hans', contact: '6370428564' },
      { name: 'Garubi Lahaja', contact: '6373079715' }
    ],
    scheduledOn: '3rd and 18th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 14,
    block: 'Junagarh',
    routeId: 'KJUND',
    routeName: 'DMRBM-03',
    routeAbbreviation: 'DMRBM-03',
    startingGp: 'DASIGAON',
    intermediateGps: ['MUNDRAGUDA', 'RAJPUR', 'BANIJARA'],
    finalGp: 'MATIGAON',
    destination: 'Junagarh (Near Eye Hospital)',
    totalDistance: 21,
    workers: [
      { name: 'Anaiya Sumel', contact: '9044342606' },
      { name: 'Nipura Naik', contact: '9777966165' },
      { name: 'GROUPADI NAIK', contact: '9133831463' },
      { name: 'RANAKA CUPICA', contact: '7326834121' }
    ],
    scheduledOn: '5th and 20nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 15,
    block: 'Junagarh',
    routeId: 'KJUNT',
    routeName: 'TNKCBMB-04',
    routeAbbreviation: 'TNKCBMB-04',
    startingGp: 'TALJARING',
    intermediateGps: ['NANDOL', 'KENDUPATI', 'CHINGUDISAR', 'BHAINRIGUDA', 'MERIABANDHLI'],
    finalGp: 'B.TULSIPALI',
    destination: 'Junagarh (Near Eye Hospital)',
    totalDistance: 32,
    workers: [
      { name: 'Boi Bewal', contact: '8307936553' },
      { name: 'LAUTA BAG', contact: '9340574322' },
      { name: 'Dhateri Mahanad', contact: '9071306014' },
      { name: 'Tanirun Begarm', contact: '6572539960' },
      { name: 'SARITA KANDPAN', contact: '7845058075' },
      { name: 'Sasmita Majhi', contact: '7068337584' }
    ],
    scheduledOn: '7th and 22nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 16,
    block: 'Junagarh',
    routeId: 'KJUND',
    routeName: 'DDKCBB-05',
    routeAbbreviation: 'DDKCBB-05',
    startingGp: 'DEDAR',
    intermediateGps: ['DUNDEIMAL', 'KALEIGAON', 'CHARBHATI', 'BUDHIDARA'],
    finalGp: 'BANKAPALAS',
    destination: 'Junagarh (Near Eye Hospital)',
    totalDistance: 58,
    workers: [
      { name: 'Paripama Sumal', contact: '8144773757' },
      { name: 'Bhumisuta Majhi', contact: '5372974357' },
      { name: 'Bajuni Rag', contact: '8144631984' },
      { name: 'Chautari Maitra', contact: '7835893831' },
      { name: 'Archana Beg', contact: '8144455353' }
    ],
    scheduledOn: '9th and 24th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },

  // Kesinga Block Routes
  {
    id: 17,
    block: 'Kesinga',
    routeId: 'KKESN',
    routeName: 'NPFA-01',
    routeAbbreviation: 'NPFA-01',
    startingGp: 'NASIGAON',
    intermediateGps: ['PASTIKUDI', 'FATKAMAL'],
    finalGp: 'ADHMUNDA',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 39,
    workers: [
      { name: 'Lata Goud', contact: '7894873788' },
      { name: 'CHINMAYEE MAJHI', contact: '9348208345' },
      { name: 'SUKANTI MEHER', contact: '6370621318' },
      { name: 'Mamata Budhia', contact: '9348062433' }
    ],
    scheduledOn: '1st and 16th of Every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 18,
    block: 'Kesinga',
    routeId: 'KKESG',
    routeName: 'GGD-02',
    routeAbbreviation: 'GGD-02',
    startingGp: 'GAIGAON',
    intermediateGps: ['GOKULESWAR'],
    finalGp: 'DEOGAON',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 18,
    workers: [
      { name: 'Lata Goud', contact: '7894873788' },
      { name: 'Jashobanti Goud', contact: '9777138516' },
      { name: 'Ganimati Sabar', contact: '9348765272' }
    ],
    scheduledOn: '3rd and 18th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 19,
    block: 'Kesinga',
    routeId: 'KKESC',
    routeName: 'CUKK-03',
    routeAbbreviation: 'CUKK-03',
    startingGp: 'CHANCHER',
    intermediateGps: ['UTKELA', 'KIKIA'],
    finalGp: 'KUNDABANDH',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 21,
    workers: [
      { name: 'Madana Meher', contact: '9668373254' },
      { name: 'Janani Naik', contact: '7381977556' },
      { name: 'Kalpana Majhi', contact: '9178820116' },
      { name: 'Bharati Biswal', contact: '7077620781' }
    ],
    scheduledOn: '5th and 20nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 20,
    block: 'Kesinga',
    routeId: 'KKESP',
    routeName: 'PBLK-04',
    routeAbbreviation: 'PBLK-04',
    startingGp: 'PATHARLA',
    intermediateGps: ['BORIA', 'LAITARA'],
    finalGp: 'KANDEL',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 23,
    workers: [
      { name: 'Dharitri Podh', contact: '9337788716' },
      { name: 'Lotus Bagarty', contact: '7894498383' },
      { name: 'Janakrani Mahala', contact: '9938833274' },
      { name: 'Geeta Harijan', contact: '7873218932' }
    ],
    scheduledOn: '7th and 22nd of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 21,
    block: 'Kesinga',
    routeId: 'KKESB',
    routeName: 'BPS-05',
    routeAbbreviation: 'BPS-05',
    startingGp: 'BALSI',
    intermediateGps: ['PARALSINGH'],
    finalGp: 'SIROL',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 12,
    workers: [
      { name: 'Rukuni Sahu', contact: '9937785159' },
      { name: 'Subhadra Naik', contact: '7077175221' },
      { name: 'Bhumisuta Nag', contact: '9556687684' }
    ],
    scheduledOn: '9th and 24th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 22,
    block: 'Kesinga',
    routeId: 'KKESN',
    routeName: 'NKK-06',
    routeAbbreviation: 'NKK-06',
    startingGp: 'NUNMATH',
    intermediateGps: ['KASRUPADA'],
    finalGp: 'KANTESIR',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 26,
    workers: [
      { name: 'Padmalaya Rana', contact: '7008125672' },
      { name: 'Bhumiuta Naik', contact: '8018974384' },
      { name: 'Jharana Naik', contact: '7381594434' }
    ],
    scheduledOn: '11th and 26th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 23,
    block: 'Kesinga',
    routeId: 'KKESB',
    routeName: 'BHSTT-07',
    routeAbbreviation: 'BHSTT-07',
    startingGp: 'BELKHANDI',
    intermediateGps: ['HATIKHOJ', 'SIRJAPALI', 'TUNDLA'],
    finalGp: 'TURLAKHAMAN',
    destination: 'kesinga(Dumermunda)',
    totalDistance: 44,
    workers: [
      { name: 'Jasobanti Putel', contact: '7853862973' },
      { name: 'Jhipi Bhoi', contact: '7077050113' },
      { name: 'Jagyanseni Gahir', contact: '9078628544' },
      { name: 'Babita Padhan', contact: '8117840025' },
      { name: 'Banita Sahu', contact: '9778813438' }
    ],
    scheduledOn: '13th and 28th of every month',
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  }
];