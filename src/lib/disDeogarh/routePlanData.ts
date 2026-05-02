
export interface RoutePlanData {
  id: number;
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
  {
    id: 1,
    routeId: 'DTILB/C/S/B',
    routeName: 'Badchhapal to Baniakilinda',
    routeAbbreviation: 'BCSB-01',
    startingGp: 'Badchhapal',
    intermediateGps: ['Cheplipalli', 'Suguda'],
    finalGp: 'Baniakilinda',
    destination: 'Deogarh (Benjatinala)',
    totalDistance: 47,
    scheduledOn: '1st and 16th of Every month',
    workers: [
      { name: 'Dalimba Naik', contact: '9668763975' },
      { name: 'Banita Naik', contact: '7894105438' },
      { name: 'Babita Pradhan', contact: '9178565666' },
      { name: 'Jayanti Nayak', contact: '9438504552' },
      { name: 'Lipika Sahu', contact: '8144146461' },
      { name: 'Riji Sahu', contact: '9176144290' },
      { name: 'Labanga Lata Behera', contact: '7609866629' },
      { name: 'Kalima Topo', contact: '8658808293' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    routeId: 'DTILT/T/K',
    routeName: 'Tileibani to Kalanda',
    routeAbbreviation: 'TTK-02',
    startingGp: 'Tileibani',
    intermediateGps: ['Tainsar'],
    finalGp: 'Kalanda',
    destination: 'Deogarh (Benjatinala)',
    totalDistance: 43,
    scheduledOn: '4th and 19th of every month',
    workers: [
      { name: 'Sunita Minz', contact: '8917430503' },
      { name: 'Basanti Kindo', contact: '8763278384' },
      { name: 'Anupama Tigga', contact: '7894169614' },
      { name: 'Amlen Samad', contact: '8280269495' },
      { name: 'Aparajita Behera', contact: '9692639765' },
      { name: 'Santosini Behera', contact: '8144452698' }
    ]
  },
  {
    id: 3,
    routeId: 'DTILD/D/T',
    routeName: 'Dholpada to Talkundi',
    routeAbbreviation: 'DDT-03',
    startingGp: 'Dholpada',
    intermediateGps: ['Dudhianalli'],
    finalGp: 'Talkundi',
    destination: 'Deogarh (Benjatinala)',
    totalDistance: 99,
    scheduledOn: '7th and 22nd of every month',
    workers: [
      { name: 'Jharana Kumura', contact: '865879550' },
      { name: 'Suchita', contact: '9178004190' },
      { name: 'Lata Sabar', contact: '9790823022' },
      { name: 'Sukumari Sabar', contact: '9937515183' },
      { name: 'Amarsan Hemram', contact: '6371870388' },
      { name: 'Bimita Tete', contact: '7609860416' }
    ]
  },
  {
    id: 4,
    routeId: 'DTILS/K/P/K',
    routeName: 'Sodo to Kendeijhuri',
    routeAbbreviation: 'SKPK-04',
    startingGp: 'Sodo',
    intermediateGps: ['Kansar', 'Palkudar'],
    finalGp: 'Kendeijhuri',
    destination: 'Deogarh (Benjatinala)',
    totalDistance: 104,
    scheduledOn: '10th and 25th of every month',
    workers: [
      { name: 'Sanjit Kumar Dehury', contact: '8280138221' },
      { name: 'Susama Behera', contact: '9556096746' },
      { name: 'Sudarshan Behera', contact: '7894261905' },
      { name: 'Mamata Breahan', contact: '8260144160' },
      { name: 'Sunita Behera', contact: '9692250529' },
      { name: 'Nilamani Kisan', contact: '7077962781' }
    ]
  },
  {
    id: 5,
    routeId: 'DTILL/J/P/D/G/J',
    routeName: 'Laimura to Jharagogua',
    routeAbbreviation: 'LJPDGJ-05',
    startingGp: 'Laimura',
    intermediateGps: ['Jharmunda', 'Parposi', 'Dimirikuda', 'Gandam'],
    finalGp: 'Jharagogua',
    destination: 'Deogarh (Benjatinala)',
    totalDistance: 115,
    scheduledOn: '9th, 18th and 28th of every month',
    workers: [
      { name: 'Souri Nayak', contact: '7847929641' },
      { name: 'Nalini Mahanayak', contact: '8260527794' },
      { name: 'Bishnupriya Nayak', contact: '9439064137' },
      { name: 'Sumati Kisan', contact: '9827258192' },
      { name: 'Giridhari Adha', contact: '7894983760' },
      { name: 'David kumar Xes', contact: '7873695645' },
      { name: 'Rina Kisan', contact: '8249719663' }
    ]
  }
];
