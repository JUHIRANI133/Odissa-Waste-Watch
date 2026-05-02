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
  // BALLIGUDA Block Routes
  {
    id: 1,
    block: 'Balliguda',
    routeId: 'KBALRBPD1',
    routeName: 'RBPD-01',
    routeAbbreviation: 'RBPD-01',
    startingGp: 'Rutungia',
    intermediateGps: ['Bataguda', 'Parampanga'],
    finalGp: 'Dadakangia',
    destination: 'BALLIGUDA ULB',
    totalDistance: 55,
    scheduledOn: '10/25 th of Every Month',
    workers: [
      { name: 'Kailash Pradhan', contact: '9438243009' },
      { name: 'Nilanti Pradhan', contact: '9438516535' },
      { name: 'Ananda Mallick', contact: '8280122784' },
      { name: 'Aruna Mallick', contact: '8249919166' },
      { name: 'Chandru Digal', contact: '7008391448' },
      { name: 'Parsuram Mallick', contact: '8895888460' },
      { name: 'Alok Nayak', contact: '9861647917' },
      { name: 'Gobinda Mallick', contact: '9692145252' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    block: 'Balliguda',
    routeId: 'KBALSBK2',
    routeName: 'SBK-02',
    routeAbbreviation: 'SBK-02',
    startingGp: 'Sindrigaon',
    intermediateGps: ['Budrukia'],
    finalGp: 'Kutikia',
    destination: 'BALLIGUDA ULB',
    totalDistance: 32,
    scheduledOn: '10/25 th of Every Month',
    workers: [
      { name: 'Niranjan Mallick', contact: '7847993685' },
      { name: 'Jitendra Behera', contact: '7847042302' },
      { name: 'Hemananda Mallick', contact: '8260051863' },
      { name: 'Labanti Mallick', contact: '7735232081' },
      { name: 'Dirbi Sahani', contact: '9692590658' },
      { name: 'Prasant Ku Behera', contact: '8895457668' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 3,
    block: 'Balliguda',
    routeId: 'KBALMRBS3',
    routeName: 'MRBS-03',
    routeAbbreviation: 'MRBS-03',
    startingGp: 'Mediakia',
    intermediateGps: ['Rebingia', 'Barakhama'],
    finalGp: 'Salaguda',
    destination: 'BALLIGUDA ULB',
    totalDistance: 34,
    scheduledOn: '10/25 th of Every Month',
    workers: [
      { name: 'Simanchal Mallick', contact: '7978466283' },
      { name: 'Aiba Nayak', contact: '8895487524' },
      { name: 'Raja Mallick', contact: '8926368213' },
      { name: 'Jitendra Digal', contact: '9692603408' },
      { name: 'Daitari Nayak', contact: '8249917663' },
      { name: 'Mithun Nayak', contact: '8260790388' },
      { name: 'Kadeba Bhukta', contact: '7847973264' },
      { name: 'Gamara Mallick', contact: '8763463718' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 4,
    block: 'Balliguda',
    routeId: 'KBASKL4',
    routeName: 'SKL-04',
    routeAbbreviation: 'SKL-04',
    startingGp: 'Sudra',
    intermediateGps: ['Khamankhol'],
    finalGp: 'Landagaon',
    destination: 'BALLIGUDA ULB',
    totalDistance: 47,
    scheduledOn: '10/25 th of Every Month',
    workers: [
      { name: 'Kusha Mallick', contact: '7848885726' },
      { name: 'Likeswar Mallick', contact: '7653873464' },
      { name: 'Janmenjaya Nayak', contact: '6372814703' },
      { name: 'Subharajshing Patra', contact: '7008711303' },
      { name: 'Prafula Dandia', contact: '7978897289' },
      { name: 'Chintu Rana', contact: '7854980700' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },

  // Phulbani Block Routes
  {
    id: 5,
    block: 'Phulbani',
    routeId: 'KPHUTJK1',
    routeName: 'TJK-01',
    routeAbbreviation: 'TJK-01',
    startingGp: 'Tudipaju',
    intermediateGps: ['Jamjhari'],
    finalGp: 'Katringia',
    destination: 'Phulbani ULB',
    totalDistance: 52,
    scheduledOn: '15/25th every month',
    workers: [
      { name: 'Swapna Kanhar', contact: '8763588727' },
      { name: 'Padmini Kanhar', contact: '8763522126' },
      { name: 'Ashutosh Behera', contact: '9348039055' },
      { name: 'Nilamber Bagarti', contact: '8895248758' },
      { name: 'Amresh kanhar', contact: '9438716784' },
      { name: 'Soumyaranjan Kanhar', contact: '8280769694' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 6,
    block: 'Phulbani',
    routeId: 'KPHUDDB2',
    routeName: 'DDB-02',
    routeAbbreviation: 'DDB-02',
    startingGp: 'Dadaki',
    intermediateGps: ['Duduki'],
    finalGp: 'Bisipada',
    destination: 'Phulbani ULB',
    totalDistance: 50,
    scheduledOn: '15/25th every month',
    workers: [
      { name: 'Bhagabat Sahu', contact: '7853033290' },
      { name: 'Gadadhar Sahu', contact: '9827722060' },
      { name: 'Kashinath Pradhan', contact: '7854803935' },
      { name: 'Chaitanya Kanhar', contact: '7848029236' },
      { name: 'Shukru Behera', contact: '7984820313' },
      { name: 'Prabhat Digal', contact: '9438511190' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 7,
    block: 'Phulbani',
    routeId: 'KPHUAGM3',
    routeName: 'AGM-03',
    routeAbbreviation: 'AGM-03',
    startingGp: 'Alami',
    intermediateGps: ['Ganjuguda'],
    finalGp: 'Minia',
    destination: 'Phulbani ULB',
    totalDistance: 56,
    scheduledOn: '15/25th every month',
    workers: [
      { name: 'Pradip Ch Mallick', contact: '7016310215' },
      { name: 'Usat Behera', contact: '9437711787' },
      { name: 'Kaita Kanhar', contact: '9861614873' },
      { name: 'Janhiful Kanhar', contact: '9438106398' },
      { name: 'Jugal Kanhar', contact: '8480450881' },
      { name: 'Sukadev Mallick', contact: '8280351080' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 8,
    block: 'Phulbani',
    routeId: 'KPHUKG4',
    routeName: 'KG-04',
    routeAbbreviation: 'KG-04',
    startingGp: 'Keredi',
    intermediateGps: [],
    finalGp: 'Gumagarh',
    destination: 'Phulbani ULB',
    totalDistance: 48,
    scheduledOn: '15/25th every month',
    workers: [
      { name: 'Akash Mukhi', contact: '8763885622' },
      { name: 'Tapan Ku Sahu', contact: '9438727635' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },

  // G.UDAYAGIRI Block Routes
  {
    id: 9,
    block: 'G.Udayagiri',
    routeId: 'KGUDKTM-1',
    routeName: 'KTM--01',
    routeAbbreviation: 'KTM--01',
    startingGp: 'Talarimaha',
    intermediateGps: ['Kalinga'],
    finalGp: 'Malikapadi',
    destination: 'G.UDAYAGIRI ULB',
    totalDistance: 55,
    scheduledOn: '15/25th of Every Month',
    workers: [
      { name: 'MIKHAEL PRADHAN', contact: '8763471012' },
      { name: 'PRASANTA MALLICK', contact: '8895118127' },
      { name: 'NANDJRJA PRADHAN', contact: '6371944391' },
      { name: 'RAKESH KUMAR PRADHAN', contact: '8327734508' },
      { name: 'JITENDRA KANHAR', contact: '9437712578' },
      { name: 'ASUTOS NAYAK', contact: '8921389297' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 10,
    block: 'G.Udayagiri',
    routeId: 'KGUDKLR-2',
    routeName: 'KLR-2',
    routeAbbreviation: 'KLR-2',
    startingGp: 'Katingia',
    intermediateGps: ['Lingagada'],
    finalGp: 'Raikala',
    destination: 'G.UDAYAGIRI ULB',
    totalDistance: 52,
    scheduledOn: '15/25th of Every Month',
    workers: [
      { name: 'BIRUPAKSHYA PRADHAN', contact: '8144722967' },
      { name: 'AGNIMITRA PRADHAN', contact: '9337103022' },
      { name: 'RAGHUNATH PRADHAN', contact: '9438634541' },
      { name: 'SACHIN KUMAR MALLICK', contact: '6370468820' },
      { name: 'SUKESINI DIGAL', contact: '9337091277' },
      { name: 'SHAMUKA PRADHAN', contact: '8895069561' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 11,
    block: 'G.Udayagiri',
    routeId: 'KGUDRG-3',
    routeName: 'RG-3',
    routeAbbreviation: 'RG-3',
    startingGp: 'Ratingia',
    intermediateGps: [],
    finalGp: 'Gressingia',
    destination: 'G.UDAYAGIRI ULB',
    totalDistance: 28,
    scheduledOn: '15/25th of Every Month',
    workers: [
      { name: 'CHINMAYA PRADHAN', contact: '8637217780' },
      { name: 'RUNA NAYAK', contact: '8895665621' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  }
];