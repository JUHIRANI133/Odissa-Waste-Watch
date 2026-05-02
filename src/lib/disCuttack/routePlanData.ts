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
  // ATHAGARH Block Routes
  {
    id: 1,
    block: 'Athagarh',
    routeId: 'CATHBJIK',
    routeName: 'BADABHUIN to KHUNTUKATA',
    routeAbbreviation: 'BJIK-01',
    startingGp: 'BADABHUIN',
    intermediateGps: ['JENAPADA', 'ICHHAPUR'],
    finalGp: 'KHUNTUKATA',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 32,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'Kailash Chandra Sethi', contact: '7894962661' },
      { name: 'Bichitrananda Khatua', contact: '9776545067' },
      { name: 'Ramachandra Sahoo', contact: '9337317995' },
      { name: 'Saroj Kumar Nayak', contact: '9937584364' }
    ],
    remarks: 'If waste collection not happened during the scheduled day/date due to some issue, then collection will be done in next day/date or any date coordinating with ULB Nodal person'
  },
  {
    id: 2,
    block: 'Athagarh',
    routeId: 'CATHSSDK',
    routeName: 'SAMASARAPUR to KULAILO',
    routeAbbreviation: 'SSDK-02',
    startingGp: 'SAMASARAPUR',
    intermediateGps: ['SATHILO', 'DORADA'],
    finalGp: 'KULAILO',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 25,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'PURNACHANDRA ROUT', contact: '7855080138' },
      { name: 'Raghunath Sahoo', contact: '8249413746' },
      { name: 'RENUBALA PRADHAN', contact: '8328929249' },
      { name: 'AMULI MUDULI', contact: '9348522080' }
    ]
  },
  {
    id: 3,
    block: 'Athagarh',
    routeId: 'CATHRDRK',
    routeName: 'RADHAGOVIUNDAPUR to KANDARPUR',
    routeAbbreviation: 'RDRK-03',
    startingGp: 'RADHAGOVIUNDAPUR',
    intermediateGps: ['DHAIPUR', 'RAJANAGAR'],
    finalGp: 'KANDARPUR',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 31,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Kartika Chhotray', contact: '9337768525' },
      { name: 'BRAJENDRA MOHAN BEHERA', contact: '7894001522' },
      { name: 'Gadadhar Sahoo', contact: '7684069936' },
      { name: 'Santosh Kumar Sahoo', contact: '6370851510' }
    ]
  },
  {
    id: 4,
    block: 'Athagarh',
    routeId: 'CATHMKDA',
    routeName: 'MEGHA to MEGHA (Loop)',
    routeAbbreviation: 'MKDA-04',
    startingGp: 'MEGHA',
    intermediateGps: ['KATAKIASAHI', 'DHURUSIA'],
    finalGp: 'MEGHA',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 45,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Sankarsana Dhala', contact: '7849048490' },
      { name: 'Pradip Kumar Sahoo', contact: '7205769770' },
      { name: 'Ajay Kumar Pradhan', contact: '9938811874' },
      { name: 'ARUN KUMAR SETHI', contact: '9438149596' }
    ]
  },
  {
    id: 5,
    block: 'Athagarh',
    routeId: 'CATHBJTM',
    routeName: 'BENTAPADA to MAHAKALABASTA',
    routeAbbreviation: 'BJTM-05',
    startingGp: 'BENTAPADA',
    intermediateGps: ['JORANDA', 'TARDING'],
    finalGp: 'MAHAKALABASTA',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 33,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'Kanhu charan Mohanty', contact: '9348761504' },
      { name: 'Sisir Kumar Behera', contact: '9668153044' },
      { name: 'Sanjay Kumar nayak', contact: '7846852839' },
      { name: 'Khambunatha Behera', contact: '9348556520' }
    ]
  },
  {
    id: 6,
    block: 'Athagarh',
    routeId: 'CATHKBDK',
    routeName: 'KHUNTUNI to KANDAREI',
    routeAbbreviation: 'KBDK-06',
    startingGp: 'KHUNTUNI',
    intermediateGps: ['BHOGARA', 'DALBHAG'],
    finalGp: 'KANDAREI',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 35,
    scheduledOn: '6th & 20th of each Month',
    workers: [
      { name: 'Pratap Chandra Sahoo', contact: '7381408994' },
      { name: 'Purna Chandra Sahoo', contact: '8658160385' },
      { name: 'Sanjukta Nayak', contact: '7008019244' },
      { name: 'SASHI BHUSAN JENA', contact: '7855901729' }
    ]
  },
  {
    id: 7,
    block: 'Athagarh',
    routeId: 'CATHRRGGK',
    routeName: 'RADHAKRUSHNAPUR to KUMARAPUR',
    routeAbbreviation: 'RRGGK-07',
    startingGp: 'RADHAKRUSHNAPUR',
    intermediateGps: ['RADHAKISHOREPUR', 'GURUDIJHATIA', 'GOBARA'],
    finalGp: 'KUMARAPUR',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 52,
    scheduledOn: '7th & 21st of each Month',
    workers: [
      { name: 'AJAYA JENA', contact: '8260029811' },
      { name: 'Mamina Behera', contact: '7008342701' },
      { name: 'Sukadev Behera', contact: '9937106495' },
      { name: 'Purna Chandra Rath', contact: '9777868327' },
      { name: 'Babu Sahoo', contact: '9861832978' }
    ]
  },
  {
    id: 8,
    block: 'Athagarh',
    routeId: 'CATHOKMGC',
    routeName: 'ORANDA to CHHAGAON',
    routeAbbreviation: 'OKMGC-08',
    startingGp: 'ORANDA',
    intermediateGps: ['KUSPANGI', 'MANCHESWAR', 'GHANTIKHAL'],
    finalGp: 'CHHAGAON',
    destination: 'CTC/ATH/MRF/001',
    totalDistance: 62,
    scheduledOn: '8th & 22nd of each Month',
    workers: [
      { name: 'Rajib Lochan Das', contact: '7609963874' },
      { name: 'Pramila Dhal', contact: '8144685509' },
      { name: 'Bharat Chandra Nayak', contact: '9178240208' },
      { name: 'Sridhara Bishoi', contact: '9937948963' },
      { name: 'Sunakar Patra', contact: '8456088501' }
    ]
  },

  // BANKI Block Routes
  {
    id: 9,
    block: 'Banki',
    routeId: 'CBANSOKK',
    routeName: 'SUBARNAPUR to KANTAPANHRA',
    routeAbbreviation: 'SOKK-1',
    startingGp: 'SUBARNAPUR',
    intermediateGps: ['OSTIA', 'KADABADI'],
    finalGp: 'KANTAPANHRA',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 40,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'SRIDHAR BEHERA', contact: '8018969652' },
      { name: 'RAMAKANTA SAMANTRAY', contact: '9937026167' },
      { name: 'PRASANT KU SAHOO', contact: '7894164700' },
      { name: 'PRADEEP KHATUA', contact: '9937853499' }
    ]
  },
  {
    id: 10,
    block: 'Banki',
    routeId: 'CBANBBR',
    routeName: 'BAUNSPUT to RATAGADA(GOVINDPUR)',
    routeAbbreviation: 'BBR-2',
    startingGp: 'BAUNSPUT',
    intermediateGps: ['BANDALO'],
    finalGp: 'RATAGADA(GOVINDPUR)',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 50,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'PRAKASH ROUT', contact: '9776036389' },
      { name: 'PRADEEP KUMAR ROUT', contact: '6371028635' },
      { name: 'JASOBANTA ROUT', contact: '9777343601' }
    ]
  },
  {
    id: 11,
    block: 'Banki',
    routeId: 'CBANAGBK',
    routeName: 'ANUARY to KALAPATHAR',
    routeAbbreviation: 'AGBK-3',
    startingGp: 'ANUARY',
    intermediateGps: ['GOLAGANDA', 'BAIDESWAR'],
    finalGp: 'KALAPATHAR',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 55,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'KRUPASINDHU MAJHI', contact: '8114927782' },
      { name: 'SIDHANTA MALLICK', contact: '8328867829' },
      { name: 'PRAVAT RANJAN MAHAPATRA', contact: '7682940842' },
      { name: 'ASIT PRADHAN', contact: '8144291765' }
    ]
  },
  {
    id: 12,
    block: 'Banki',
    routeId: 'CBANBJKK',
    routeName: 'BALABHADRAPUR to KALIPOI',
    routeAbbreviation: 'BJKK-4',
    startingGp: 'BALABHADRAPUR',
    intermediateGps: ['JAGANNATHPUR', 'KENDUPALI'],
    finalGp: 'KALIPOI',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 50,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'BIJAY KUMAR SAHOO', contact: '8456831315' },
      { name: 'MANOJ KUMAR SAHOO', contact: '9861675696' },
      { name: 'MANAS KUMAR KHUNTIA', contact: '7978604790' },
      { name: 'SUSANTA KUMAR DHAL', contact: '8018776691' }
    ]
  },
  {
    id: 13,
    block: 'Banki',
    routeId: 'CBANBKBNP',
    routeName: 'BERHUMPURA to PUINCHA',
    routeAbbreviation: 'BKBNP-5',
    startingGp: 'BERHUMPURA',
    intermediateGps: ['KIAPALA', 'BARAPUT', 'NUAGAON'],
    finalGp: 'PUINCHA',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 60,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'TRINATH NAYAK', contact: '7749953414' },
      { name: 'GOBINDA SENAPATI', contact: '9776615596' },
      { name: 'SANTOSH KUMAR PANDAA', contact: '9178522032' },
      { name: 'JYOTSNARANI SINGHA', contact: '6372731418' },
      { name: 'SAMRENDRA PANIGRAHI', contact: '7978481879' }
    ]
  },

  // BANKI-DAMPADA Block Routes
  {
    id: 14,
    block: 'Banki-Dampada',
    routeId: 'CBANDNTDR',
    routeName: 'DUGAPUR to RAGADI',
    routeAbbreviation: 'DNTDR-1',
    startingGp: 'DUGAPUR',
    intermediateGps: ['NARGANGA', 'TULASIPUR', 'DHANSAR'],
    finalGp: 'RAGADI',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 40,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'DILLIP KUMAR BEHERA', contact: '8018661272' },
      { name: 'GOBINDA CHANDRA SETHY', contact: '9668573950' },
      { name: 'SITARAM PRADHAN', contact: '9692233412' },
      { name: 'SANGRAM KESWORI BISWAL', contact: '9853755433' },
      { name: 'PRAVADA KUMAR PATRA', contact: '7684822500' }
    ]
  },
  {
    id: 15,
    block: 'Banki-Dampada',
    routeId: 'CBANGBHS',
    routeName: 'GOPALPUR to SIMILIPUR',
    routeAbbreviation: 'GBHS-2',
    startingGp: 'GOPALPUR',
    intermediateGps: ['BILIPADA', 'HARIRAJPUR'],
    finalGp: 'SIMILIPUR',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 20,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'TAPAN KUMAR BEHERA', contact: '6372503483' },
      { name: 'BASANTA KUMAR PRADHAN', contact: '9348173182' },
      { name: 'PRADEEP KUMAR SAMAL', contact: '9078160866' },
      { name: 'MADHAV BEHERA', contact: '8018839833' }
    ]
  },
  {
    id: 16,
    block: 'Banki-Dampada',
    routeId: 'CBANTGDD',
    routeName: 'TALABASTA to DOMPARA',
    routeAbbreviation: 'TGDD-3',
    startingGp: 'TALABASTA',
    intermediateGps: ['GOVINDPUR', 'DULANAPUR'],
    finalGp: 'DOMPARA',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 50,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'TARESWAR DAS', contact: '8658566459' },
      { name: 'SIBA NARAYAN ROUT', contact: '9658164435' },
      { name: 'SARAJ KUMAR NAYAK', contact: '8270988594' },
      { name: 'DEBENDRA KUMAR DHALASAMANT', contact: '6372480433' }
    ]
  },
  {
    id: 17,
    block: 'Banki-Dampada',
    routeId: 'CBANKBPP',
    routeName: 'KUSPANGI to BANARA',
    routeAbbreviation: 'KPBB-4',
    startingGp: 'KUSPANGI',
    intermediateGps: ['PATHAPUR', 'BHAGIPUR'],
    finalGp: 'BANARA',
    destination: 'CTC/BAN/MRF/001',
    totalDistance: 60,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'AKSHAY KUMAR MOHAPATRA', contact: '7789945104' },
      { name: 'JAYADHAR RATH PARIDA', contact: '9658134535' },
      { name: 'SOMIYA RANJAN SAHOO', contact: '8144979218' },
      { name: 'CHANDRAKANTA ROUT', contact: '7873661828' }
    ]
  },

  // CUTTACK SADAR Block Routes
  {
    id: 18,
    block: 'Cuttack Sadar',
    routeId: 'CCUTUKA',
    routeName: 'URALI to AMAN',
    routeAbbreviation: 'UKA-01',
    startingGp: 'URALI',
    intermediateGps: ['KHANDEITA'],
    finalGp: 'AMAN',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 35,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'PATITA PABAN BARIK', contact: '6372914394' },
      { name: 'KALPATARU BAITHALU', contact: '8658969714' },
      { name: 'BANAMALI BHOI', contact: '7008522565' }
    ]
  },
  {
    id: 19,
    block: 'Cuttack Sadar',
    routeId: 'CCUTBDBJ',
    routeName: 'BRAHMAPUR to JHARKATA',
    routeAbbreviation: 'BDBJ-02',
    startingGp: 'BRAHMAPUR',
    intermediateGps: ['DADHIBAMANPUR', 'BENTKAR'],
    finalGp: 'JHARKATA',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 34,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'RAJKISHOR NAYAK', contact: '9438848977' },
      { name: 'SURAJ KUMAR SAHOO', contact: '9556999206' },
      { name: 'ANIL KUMAR SENAPATI', contact: '8260458978' },
      { name: 'ADIKANDA LENKA', contact: '9348553132' }
    ]
  },
  {
    id: 20,
    block: 'Cuttack Sadar',
    routeId: 'CCUTGNPA',
    routeName: 'GATIROUTPATNA to AYATPUR',
    routeAbbreviation: 'GNPA-03',
    startingGp: 'GATIROUTPATNA',
    intermediateGps: ['NIMEISAPUR', 'PARAMAHANSA'],
    finalGp: 'AYATPUR',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 65,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'NIRANJAN PRADHAN', contact: '6371211631' },
      { name: 'ASHOK DAS', contact: '9861093572' },
      { name: 'LAXMIDHAR ROUT', contact: '7978697614' },
      { name: 'RAKESH BEHERA', contact: '9439511271' }
    ]
  },
  {
    id: 21,
    block: 'Cuttack Sadar',
    routeId: 'CCUTKKKF',
    routeName: 'KALAPADA to FAKIRPADA',
    routeAbbreviation: 'KKKF-04',
    startingGp: 'KALAPADA',
    intermediateGps: ['KULASARICHUAN', 'KANDARPUR'],
    finalGp: 'FAKIRPADA',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 52,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'NABAKISHOR NAYAK', contact: '9777684508' },
      { name: 'BANAMALI BIHARI', contact: '9337606961' },
      { name: 'BIGNESWAR ROUT', contact: '7008152071' },
      { name: 'JOGENDRA ROUT', contact: '9776875399' }
    ]
  },
  {
    id: 22,
    block: 'Cuttack Sadar',
    routeId: 'CCUTBJDA',
    routeName: 'BARDA to ARILO',
    routeAbbreviation: 'BJDA-05',
    startingGp: 'BARDA',
    intermediateGps: ['JASAPADA', 'DHARINA'],
    finalGp: 'ARILO',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 48,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'CHITTA RANJAN MALLICK', contact: '9348756648' },
      { name: 'AJAYA MOHANTY', contact: '9938771375' },
      { name: 'RATNAKAR ROUT', contact: '7978286128' },
      { name: 'RAJESH BEHERA', contact: '9938613164' }
    ]
  },
  {
    id: 23,
    block: 'Cuttack Sadar',
    routeId: 'CCUTSBPK',
    routeName: 'SOMPUR to KISHOR NAGAR',
    routeAbbreviation: 'SBPK-06',
    startingGp: 'SOMPUR',
    intermediateGps: ['BODHAPUR', 'PRAHARAJPUR'],
    finalGp: 'KISHOR NAGAR',
    destination: 'CTC/CUT/MRF/001',
    totalDistance: 86,
    scheduledOn: '6th & 20th of each Month',
    workers: [
      { name: 'RUPAK KUMAR SWAIN', contact: '9437219198' },
      { name: 'PRASANTA BEHERA', contact: '9348046223' },
      { name: 'LIAKAT ALI KHAN', contact: '9348188280' },
      { name: 'PRAVAT KUMAR SETHI', contact: '7906670855' }
    ]
  },

  // TANGI CHOUDWAR Block Routes
  {
    id: 24,
    block: 'Tangi Choudwar',
    routeId: 'CTANBMSM',
    routeName: 'BADASAMANTARAPUR to MAHISALANDA',
    routeAbbreviation: 'BMSM-01',
    startingGp: 'BADASAMANTARAPUR',
    intermediateGps: ['MANGRAJAPUR', 'SANKARAPUR'],
    finalGp: 'MAHISALANDA',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 42,
    scheduledOn: '1st & 15th of each Month',
    workers: [
      { name: 'Sumitra Majhi', contact: '7077272772' },
      { name: 'Binapani Mohanty', contact: '7008493284' },
      { name: 'Pankajini Khatua', contact: '7978787149' },
      { name: 'Satyabhama Behera', contact: '8018336128' }
    ]
  },
  {
    id: 25,
    block: 'Tangi Choudwar',
    routeId: 'CTANBGSK',
    routeName: 'BERHMAPUR to KARANJI',
    routeAbbreviation: 'BGSK-02',
    startingGp: 'BERHMAPUR',
    intermediateGps: ['GARUDAGAON', 'SAFA'],
    finalGp: 'KARANJI',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 55,
    scheduledOn: '2nd & 16th of each Month',
    workers: [
      { name: 'Rashmirekha Behera', contact: '6370455600' },
      { name: 'Hemalata Bhoi', contact: '9439374604' },
      { name: 'Sasmita Das', contact: '8339056677' },
      { name: 'Subhasini Swain', contact: '9692606965' }
    ]
  },
  {
    id: 26,
    block: 'Tangi Choudwar',
    routeId: 'CTANKKUM',
    routeName: 'KANHEIPUR to MAGURA DHANAMANDAL',
    routeAbbreviation: 'KKUM-03',
    startingGp: 'KANHEIPUR',
    intermediateGps: ['KOTTASAHI', 'UCHHAPADA'],
    finalGp: 'MAGURA DHANAMANDAL',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 52,
    scheduledOn: '3rd & 17th of each Month',
    workers: [
      { name: 'Mamata Bhuyan', contact: '9348471027' },
      { name: 'Hemalata Bhoi', contact: '9439374604' },
      { name: 'Pritirekha Samal', contact: '9777811956' },
      { name: 'Jahara Bibi', contact: '8895683341' }
    ]
  },
  {
    id: 27,
    block: 'Tangi Choudwar',
    routeId: 'CTANHANS',
    routeName: 'HARIANTA to SALAGAON',
    routeAbbreviation: 'HANS-04',
    startingGp: 'HARIANTA',
    intermediateGps: ['AGRAHAT', 'NAKHARA'],
    finalGp: 'SALAGAON',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 47,
    scheduledOn: '4th & 18th of each Month',
    workers: [
      { name: 'Mamata Jena', contact: '8114796970' },
      { name: 'Bishaka Panda', contact: '934887767' },
      { name: 'Reenarani khuntia', contact: '6370914406' },
      { name: 'Mamata Rout', contact: '6351604773' }
    ]
  },
  {
    id: 28,
    block: 'Tangi Choudwar',
    routeId: 'CTANBIKK',
    routeName: 'BANIPADA to KAKHADI',
    routeAbbreviation: 'BIKK-05',
    startingGp: 'BANIPADA',
    intermediateGps: ['INDRANIPATNA', 'KAYALAPADA'],
    finalGp: 'KAKHADI',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 41,
    scheduledOn: '5th & 19th of each Month',
    workers: [
      { name: 'Sumitra Muduli', contact: '6372719921' },
      { name: 'Sulochana Mohapatra', contact: '9439668702' },
      { name: 'Minarani Panda', contact: '9556868294' },
      { name: 'Bharati Sahoo', contact: '7787052747' }
    ]
  },
  {
    id: 29,
    block: 'Tangi Choudwar',
    routeId: 'CTANGJBN',
    routeName: 'GOVINDPUR to NAPANGA',
    routeAbbreviation: 'GJBN-06',
    startingGp: 'GOVINDPUR',
    intermediateGps: ['JARIPADA', 'BHATIMUNDA'],
    finalGp: 'NAPANGA',
    destination: 'CTC/CHO/MRF/001',
    totalDistance: 56,
    scheduledOn: '6th & 20th of each Month',
    workers: [
      { name: 'Chinmayee Nath', contact: '8908434441' },
      { name: 'Sasmita Kandi', contact: '98530227784' },
      { name: 'Swapna Sahoo', contact: '9658876737' },
      { name: 'Minati Samal', contact: '8249898027' }
    ]
  }
];