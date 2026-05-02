
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
  // Angul Block
  {
    id: 1,
    block: 'Angul',
    routeId: 'AANGN1',
    routeName: 'NBKBSDPB-01',
    routeAbbreviation: 'NBKBSDPB-01',
    startingGp: 'Nuamouja',
    intermediateGps: ['Baluakata', 'Kumursingha', 'Bantal', 'Sankhapur', 'Dhokuta', 'Pokatunga'],
    finalGp: 'Baragounia',
    destination: 'Hulursingha',
    totalDistance: 40,
    workers: [
      { name: 'Gopala Behera', contact: '-' },
      { name: 'Pratap Gochhayat', contact: '-' },
      { name: 'Ramachandra Gochayat', contact: '-' },
      { name: 'Mangulu Gochayat', contact: '-' },
      { name: 'Abhay Gochayat', contact: '-' },
      { name: 'Durjya Mukhi', contact: '-' },
      { name: 'Baya behera', contact: '-' },
      { name: 'Promad Gochayat', contact: '-' }
    ],
    scheduledOn: 'Friday of 1st week'
  },
  {
    id: 2,
    block: 'Angul',
    routeId: 'AANGT2',
    routeName: 'TLAGARH-02',
    routeAbbreviation: 'TLAGARH-02',
    startingGp: 'Talagarh',
    intermediateGps: ['Nandapur', 'Jagannathpur', 'Balanga', 'Purunakote'],
    finalGp: 'Tikarpada',
    destination: 'Hulursingha',
    totalDistance: 90,
    workers: [
      { name: 'Pranabandhu Gochayat', contact: '8018524289' },
      { name: 'Rinku Gochayat', contact: '9078731036' },
      { name: 'Hemanta Maharana', contact: '-' },
      { name: 'Pradeep Naik', contact: '-' },
      { name: 'Subash Sahu', contact: '-' },
      { name: 'Somnath Behera', contact: '-' }
    ],
    scheduledOn: 'Friday of 2nd week'
  },
  {
    id: 3,
    block: 'Angul',
    routeId: 'AANGR3',
    routeName: 'RBMSMAKT-03',
    routeAbbreviation: 'RBMSMAKT-03',
    startingGp: 'Rantalei',
    intermediateGps: ['Badakera', 'Matiasahi', 'Sharadhapur', 'Manikjodi', 'Antulia', 'Kothabhuin'],
    finalGp: 'Tainshi',
    destination: 'Hulursingha',
    totalDistance: 64,
    workers: [
      { name: 'Ananda Gochayat', contact: '-' },
      { name: 'Sashadeva Behera', contact: '-' },
      { name: 'Banamali Mukhi', contact: '-' },
      { name: 'Bikram mukhi', contact: '-' },
      { name: 'Kumara nayak', contact: '-' },
      { name: 'Pitambar Gochayat', contact: '-' },
      { name: 'Ramesh Gochayat', contact: '-' },
      { name: 'Partha mukhi', contact: '-' }
    ],
    scheduledOn: 'Friday of 3rd week'
  },
  {
    id: 4,
    block: 'Angul',
    routeId: 'AANGK4',
    routeName: 'KSKCBIBBKGAB-04',
    routeAbbreviation: 'KSKCBIBBKGAB-04',
    startingGp: 'Khalari',
    intermediateGps: ['Susuda', 'K-Bentapur', 'Chheliapada', 'Balasingha', 'Inkarbandha', 'Basala', 'Bedasasan', 'Khinda', 'Gadtarash', 'Angarbandha'],
    finalGp: 'Bdakantakul',
    destination: 'Mishrapada',
    totalDistance: 60,
    workers: [
      { name: 'Parihasa Gochayat', contact: '-' },
      { name: 'Ghana Gochayat', contact: '-' },
      { name: 'Chagala sethi', contact: '-' },
      { name: 'Angada Naik', contact: '-' },
      { name: 'Sankrasan Gochayat', contact: '-' },
      { name: 'Chandramani Gochayat', contact: '7077639053' },
      { name: 'Siba behera', contact: '7077639053' },
      { name: 'Siba behera', contact: '-' },
      { name: 'Prasanna gochayat', contact: '-' },
      { name: 'Ranjan Gochayat', contact: '-' },
      { name: 'Bhikari Gochayat', contact: '7608886043' },
      { name: 'Gopa Gochayat', contact: '-' }
    ],
    scheduledOn: 'Friday of 4th week'
  },
  // Talcher Block
  {
    id: 5,
    block: 'Talcher',
    routeId: 'ATALK1',
    routeName: 'KKGDB-01',
    routeAbbreviation: 'KKGDB-01',
    startingGp: 'Kandhal',
    intermediateGps: ['Brajanathpur', 'Dharampur', 'Gurujang'],
    finalGp: 'Kankili',
    destination: 'Ranipark',
    totalDistance: 80,
    workers: [
      { name: 'Hema Dehury', contact: '7735558202' },
      { name: 'Anusuya Behera', contact: '8917389410' },
      { name: 'Kuni Naik', contact: '7205418653' },
      { name: 'Sumati Khatua', contact: '9827707404' },
      { name: 'Shantilata Biswal', contact: '9348305690' }
    ],
    scheduledOn: 'Friday of 1st week'
  },
  {
    id: 6,
    block: 'Talcher',
    routeId: 'ATALS2',
    routeName: 'SGJB-02',
    routeAbbreviation: 'SGJB-02',
    startingGp: 'Santhapada',
    intermediateGps: ['Gurujanguli', 'Jaganathpur'],
    finalGp: 'Bantol',
    destination: 'Baghubal',
    totalDistance: 50,
    workers: [
      { name: 'Damayanti Dhir', contact: '7684880600' },
      { name: 'Mami Behara', contact: '7606883118' },
      { name: 'Rijalin Bhoi', contact: '8117884416' },
      { name: 'Ranju Pattanaik', contact: '6370131763' }
    ],
    scheduledOn: 'Friday of 2nd week'
  },
  {
    id: 7,
    block: 'Talcher',
    routeId: 'ATALT3',
    routeName: 'TGBPK-03',
    routeAbbreviation: 'TGBPK-03',
    startingGp: 'Tentoloi',
    intermediateGps: ['Gobara', 'Badajorada', 'Padmabatipur'],
    finalGp: 'Kumunda',
    destination: 'Baghubal',
    totalDistance: 70,
    workers: [
      { name: 'Pranati Garnaik', contact: '9439020789' },
      { name: 'Pramila Behera', contact: '9078790562' },
      { name: 'Tiki Karwa', contact: '7749856112' },
      { name: 'Ambika Gochyat', contact: '-' }
    ],
    scheduledOn: 'Friday of 3rd week'
  },
  // Athamallik Block
  {
    id: 8,
    block: 'Athamallik',
    routeId: 'AATHN1',
    routeName: 'NALJ-01',
    routeAbbreviation: 'NALJ-01',
    startingGp: 'Nagaon',
    intermediateGps: ['Aida', 'Luhasinga'],
    finalGp: 'Jamudoli',
    destination: 'Haridanali',
    totalDistance: 44,
    workers: [
      { name: 'Narayan Behera', contact: '8144740718' },
      { name: 'Khuntia Naik', contact: '7750837219' },
      { name: 'Amulya Basantara', contact: '9938033554' }
    ],
    scheduledOn: 'Friday of 1st week'
  },
  {
    id: 9,
    block: 'Athamallik',
    routeId: 'AATHP2',
    routeName: 'PKMLKKBKT-02',
    routeAbbreviation: 'PKMLKKBKT-02',
    startingGp: 'Purunamatri',
    intermediateGps: ['Kudagaon', 'Madhapur', 'Lunahandi', 'Kampala', 'Kandhapada', 'Basudevpur', 'Kiakata'],
    finalGp: 'Tusar',
    destination: 'Haridanali',
    totalDistance: 54,
    workers: [
      { name: 'Debendra Kanar', contact: '9178378083' },
      { name: 'Nabin Banichar', contact: '9777422273' },
      { name: 'Sandhyarani Dash', contact: '9556914327' },
      { name: 'Pabi Naik', contact: '6370720716' },
      { name: 'Bipin Kumbhar', contact: '7682058922' },
      { name: 'Sujata Sahoo', contact: '7978671308' },
      { name: 'Puspanjali Pradhan', contact: '7894590636' },
      { name: 'Suresh Kumar Naik', contact: '9777509397' },
      { name: 'Tulu Pradhan', contact: '7846970676' }
    ],
    scheduledOn: 'Friday of 2nd week'
  },
  {
    id: 10,
    block: 'Athamallik',
    routeId: 'AATHT3',
    routeName: 'TAKKSP-03',
    routeAbbreviation: 'TAKKSP-03',
    startingGp: 'Thakurgarh',
    intermediateGps: ['Amsarmunda', 'Krutibaspur', 'Kurumtap', 'Sanahula'],
    finalGp: 'Pedipathar',
    destination: 'Haridanali',
    totalDistance: 64,
    workers: [
      { name: 'Nirakshya Sahoo', contact: '9178017359' },
      { name: 'Sagar Behera', contact: '8456988621' },
      { name: 'Malia Behera', contact: '9348334318' },
      { name: 'Dandua Nayak', contact: '7845379037' },
      { name: 'Kailash Gochhayat', contact: '7847806447' },
      { name: 'Lipi Naik', contact: '7735499660' }
    ],
    scheduledOn: 'Friday of 3rd week'
  },
  {
    id: 11,
    block: 'Athamallik',
    routeId: 'AATHS4',
    routeName: 'SPTKM-04',
    routeAbbreviation: 'SPTKM-04',
    startingGp: 'Sapaghara',
    intermediateGps: ['Paiksahi', 'Tapdhol', 'Kantapada'],
    finalGp: 'Maimura',
    destination: 'Haridanali',
    totalDistance: 50,
    workers: [
      { name: 'Prafulla Gochayat', contact: '9078618049' },
      { name: 'Artrana Behera', contact: '9178541634' },
      { name: 'Rama Gochayat', contact: '9040860727' },
      { name: 'Arun Kumar Pradhan', contact: '9348138991' },
      { name: 'Dilip Kumar Pradhan', contact: '9439106247' }
    ],
    scheduledOn: 'Friday of 4th week'
  }
];
