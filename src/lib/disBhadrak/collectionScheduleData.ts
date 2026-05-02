export interface CollectionScheduleItem {
  id: number;
  block: string;
  ulb: string;
  mrf: string;
  vehicleType: string;
  vehicleNo: string;
  vehicleCapacity: string;
  driverName: string;
  driverContact: string;
  collectionSchedule: string;
  gpName: string;
  wasteGeneratedKg: number;
  gpNodalPerson: string;
  gpNodalContact: string;
  ulbNodalPerson: string;
  ulbNodalContact: string;
}

export const collectionScheduleData: CollectionScheduleItem[] = [
  // Dhamnagar Block Routes
  {
    id: 115,
    block: 'Dhamnagar',
    ulb: 'Dhamnagar NAC',
    mrf: 'Wealth Center, Rahapita',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1st of Every Month',
    gpName: 'Dhamnagar Cluster 1 (BDHAS-1)',
    wasteGeneratedKg: 32822,
    gpNodalPerson: 'Saroj Ku. Routray, Debashis Mohapatra, Rakesh Senapati',
    gpNodalContact: '9438856875, 7504267620, 9776966423',
    ulbNodalPerson: 'Manoj Kumar Das',
    ulbNodalContact: '8917695521'
  },
  {
    id: 116,
    block: 'Dhamnagar',
    ulb: 'Dhamnagar NAC',
    mrf: 'Wealth Center, Rahapita',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '7th of Every Month',
    gpName: 'Dhamnagar Cluster 2 (BDHAB-2)',
    wasteGeneratedKg: 25548,
    gpNodalPerson: 'Anil Sethy, Bibhudutta Patra',
    gpNodalContact: '8144972757, 9583545498',
    ulbNodalPerson: 'Manoj Kumar Das',
    ulbNodalContact: '8917695521'
  },

  // Chandabali Block Routes
  {
    id: 106,
    block: 'Chandabali',
    ulb: 'KUNJAKALIKA',
    mrf: 'KUNJAKALIKA',
    vehicleType: 'Single chamber vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1ST DAY EVERY MONTH',
    gpName: 'Badaostia to Olaga Cluster (BCHAB-01)',
    wasteGeneratedKg: 33623,
    gpNodalPerson: 'Babrubahana Mallick, Dhirendra Ku. Nayak',
    gpNodalContact: '8328867207, 7608896956',
    ulbNodalPerson: 'Pravat Kumar Sahoo',
    ulbNodalContact: '9437545477'
  },
  {
    id: 107,
    block: 'Chandabali',
    ulb: 'KUNJAKALIKA',
    mrf: 'KUNJAKALIKA',
    vehicleType: 'Single chamber vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '7TH DAY EVERY MONTH',
    gpName: 'Motto to Nalagohira Cluster (BCHAM-02)',
    wasteGeneratedKg: 27122,
    gpNodalPerson: 'Rajkishore Das, Chandrakanta Behera',
    gpNodalContact: '7978806732, 9583130504',
    ulbNodalPerson: 'Pravat Kumar Sahoo',
    ulbNodalContact: '9437545477'
  },
  {
    id: 108,
    block: 'Chandabali',
    ulb: 'KUNJAKALIKA',
    mrf: 'KUNJAKALIKA',
    vehicleType: 'Single chamber vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '15TH DAY EVERY MONTH',
    gpName: 'Khadalpokhari to Gopinathapur Cluster (BCHAK-03)',
    wasteGeneratedKg: 29400,
    gpNodalPerson: 'Purnachandra Rout, Manoj Malik',
    gpNodalContact: '7008390530, 9937781378',
    ulbNodalPerson: 'Pravat Kumar Sahoo',
    ulbNodalContact: '9437545477'
  },
  {
    id: 109,
    block: 'Chandabali',
    ulb: 'KUNJAKALIKA',
    mrf: 'KUNJAKALIKA',
    vehicleType: 'Single chamber vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '22ND DAY EVERY MONTH',
    gpName: 'Nuagaon to Panchutikiri Cluster (BCHAN-04)',
    wasteGeneratedKg: 31200,
    gpNodalPerson: 'Babrubahana Mallick, Sudhir Mohanty',
    gpNodalContact: '8328867207, 7978026421',
    ulbNodalPerson: 'Pravat Kumar Sahoo',
    ulbNodalContact: '9437545477'
  },

  // Basudevpur Block Routes (Rectified from Official Schedule)
  {
    id: 110,
    block: 'Basudevpur',
    ulb: 'BASUDEVPUR MUNICIPALITY',
    mrf: 'BHAIRABPUR, W-22, BASUDEVPUR',
    vehicleType: '-',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1st day of every month',
    gpName: 'Basudevpur Cluster 1 (BBASC-1)',
    wasteGeneratedKg: 43113,
    gpNodalPerson: 'Jagannath Dehuri, Sagar Kumar Mallick, Bikash Kumar Dinda, Chinmayee Panda, Digambar Das, Chittaranjan Dash, Ramakanta Pal, Sridhar Majhi, Rajesh Barik, Siba Prasad Panda',
    gpNodalContact: '8598087037, 8249433807, 8917830537, 9937452127, 9937739367, 8917492785, 9938451224, 9776652565, 8594943188, 9437574890',
    ulbNodalPerson: 'RASHMI RANJAN BEHERA',
    ulbNodalContact: '9583241648'
  },
  {
    id: 111,
    block: 'Basudevpur',
    ulb: 'BASUDEVPUR MUNICIPALITY',
    mrf: 'BHAIRABPUR, W-22, BASUDEVPUR',
    vehicleType: '-',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '6th day of every month',
    gpName: 'Basudevpur Cluster 2 (BBASN-2)',
    wasteGeneratedKg: 28108,
    gpNodalPerson: 'Sanjay Ku Raut, Sushanta Malik, Rabindranath Das, Sabita Kar, Subashree Patnaik',
    gpNodalContact: '8249126116, 8018306564, 9438353281, 7894020811, 8457843390',
    ulbNodalPerson: 'RASHMI RANJAN BEHERA',
    ulbNodalContact: '9583241648'
  },
  {
    id: 112,
    block: 'Basudevpur',
    ulb: 'BASUDEVPUR MUNICIPALITY',
    mrf: 'BHAIRABPUR, W-22, BASUDEVPUR',
    vehicleType: '-',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '12th day of every month',
    gpName: 'Basudevpur Cluster 3 (BBASK-3)',
    wasteGeneratedKg: 21131,
    gpNodalPerson: 'Digambar Das, Sukanti Das, Parameswar Malik, Sabitri Sethi',
    gpNodalContact: '9937739367, 7205319965, 9661167067, 8908904285',
    ulbNodalPerson: 'RASHMI RANJAN BEHERA',
    ulbNodalContact: '9583241648'
  },
  {
    id: 113,
    block: 'Basudevpur',
    ulb: 'BASUDEVPUR MUNICIPALITY',
    mrf: 'BHAIRABPUR, W-22, BASUDEVPUR',
    vehicleType: '-',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '18th day of every month',
    gpName: 'Basudevpur Cluster 4 (BBASL-4)',
    wasteGeneratedKg: 26781,
    gpNodalPerson: 'Rajesh Barik, Debi Asima Biswal, Ramakanta Pal, Parameswar Malik, Purnachandra Barik, Sagar Kumar Mallick, Kamalakanta Behera, Bedaprakash Parida',
    gpNodalContact: '8594943188, 8328878211, 9938451224, 9661167067, 9853083088, 8249433807, 7019171742, 9040201087',
    ulbNodalPerson: 'RASHMI RANJAN BEHERA',
    ulbNodalContact: '9583241648'
  },
  {
    id: 114,
    block: 'Basudevpur',
    ulb: 'BASUDEVPUR MUNICIPALITY',
    mrf: 'BHAIRABPUR, W-22, BASUDEVPUR',
    vehicleType: '-',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '24th day of every month',
    gpName: 'Basudevpur Cluster 5 (BBASK-5)',
    wasteGeneratedKg: 27264,
    gpNodalPerson: 'Sushanta Malik, Rabindranath Das, Manoj Kumar Behera, Purnachandra Barik, Suryakanta Mallick',
    gpNodalContact: '8018306564, 9438353281, 8908803206, 9853083088, 9439006655',
    ulbNodalPerson: 'RASHMI RANJAN BEHERA',
    ulbNodalContact: '9583241648'
  },

  // Bhadrak Block Routes
  {
    id: 101,
    block: 'Bhadrak',
    ulb: 'Bhadrak Municipality',
    mrf: 'Bidanga MRF 1',
    vehicleType: 'Single chamber vehicle',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1st day of Every Month',
    gpName: 'Bidanga Cluster (BBHAC1)',
    wasteGeneratedKg: 28320,
    gpNodalPerson: 'Soumyajit Sahoo, Prativa Manjari Sing',
    gpNodalContact: '8018168695, 7681061790',
    ulbNodalPerson: 'Manmohan Mohapatra',
    ulbNodalContact: '8917258516'
  }
];
