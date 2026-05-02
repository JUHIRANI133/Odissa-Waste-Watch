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
  // Kendrapara Block (ULB Kendrapara)
  {
    id: 1,
    block: 'Kendrapara',
    routeId: 'KKEN-01',
    routeName: 'AYEBA → PUROSATAMPUR → KANSAR → OSTAPUR → KALAPADA',
    routeAbbreviation: 'APKOK-01',
    startingGp: 'AYEBA',
    intermediateGps: ['PUROSATAMPUR', 'KANSAR', 'OSTAPUR'],
    finalGp: 'KALAPADA',
    destination: 'KOJALA MRF',
    totalDistance: 20,
    scheduledOn: '1st of Every Month',
    workers: [
      { name: 'PRABHATI DAS', contact: '8249903081' },
      { name: 'ELINA SETHY', contact: '9178818351' },
      { name: 'SULACHANA SWAIN', contact: '6372052641' },
      { name: 'LAXMIPRIYA JENA', contact: '6372421423' },
      { name: 'LIPIKA MOHANTY', contact: '8018868690' }
    ]
  },
  {
    id: 2,
    block: 'Kendrapara',
    routeId: 'KKEN-02',
    routeName: 'BAGADA → SYAMSUNDARPUR → BHARTAPUR → CHAKRADA → BHAGABATPUR',
    routeAbbreviation: 'BSBCB-02',
    startingGp: 'BAGADA',
    intermediateGps: ['SYAMSUNDARPUR', 'BHARTAPUR', 'CHAKRADA'],
    finalGp: 'BHAGABATPUR',
    destination: 'KOJALA MRF',
    totalDistance: 22,
    scheduledOn: '6th of Every Month',
    workers: [
      { name: 'NANDINI MALLA', contact: '7077361206' },
      { name: 'LAXMIPRIYA KARO', contact: '8260538347' },
      { name: 'SUSAMA DAS', contact: '9556435075' },
      { name: 'URMILA BEHERA', contact: '9776628568' },
      { name: 'MANISHA MOHANTY', contact: '8480708732' }
    ]
  },
  {
    id: 3,
    block: 'Kendrapara',
    routeId: 'KKEN-03',
    routeName: 'JAMDHAR → GULNAGAR → KAPALESWAR → KUTURAN → DHOLO',
    routeAbbreviation: 'JGKKD-03',
    startingGp: 'JAMDHAR',
    intermediateGps: ['GULNAGAR', 'KAPALESWAR', 'KUTURAN'],
    finalGp: 'DHOLO',
    destination: 'KENDRAPARA MRF',
    totalDistance: 27,
    scheduledOn: '12th of Every Month',
    workers: [
      { name: 'MINATI MOHARANA', contact: '9938364217' },
      { name: 'JHUNA SETHY', contact: '8018694620' },
      { name: 'MINATI SWAIN', contact: '9937657127' },
      { name: 'SARASWATI SAHU', contact: '9178434336' },
      { name: 'SASMITA RANA', contact: '9861116850' }
    ]
  },
  {
    id: 4,
    block: 'Kendrapara',
    routeId: 'KKEN-04',
    routeName: 'NIKIREI → INDUPUR → DHUMATA → CHARIGAON → GHAGARA',
    routeAbbreviation: 'NIDHG-04',
    startingGp: 'NIKIREI',
    intermediateGps: ['INDUPUR', 'DHUMATA', 'CHARIGAON'],
    finalGp: 'GHAGARA',
    destination: 'KENDRAPARA MRF',
    totalDistance: 30,
    scheduledOn: '23rd of the Every Month',
    workers: [
      { name: 'DEBALA JENA', contact: '9853081269' },
      { name: 'RASMITA PANI', contact: '9937968175' },
      { name: 'MINAXSI SAHU', contact: '8114699410' },
      { name: 'CHUMUKI DAS', contact: '9692710912' },
      { name: 'ANITA MALLIK', contact: '8658678105' }
    ]
  },
  {
    id: 5,
    block: 'Kendrapara',
    routeId: 'KKEN-05',
    routeName: 'SANAMANATIA → CHANDANPUR → KESPUR → GANGAPADA → PALASINGHA → BARO → KORO',
    routeAbbreviation: 'SCKGPBK-05',
    startingGp: 'SANAMANATIA',
    intermediateGps: ['CHANDANPUR', 'KESPUR', 'GANGAPADA', 'PALASINGHA', 'BARO'],
    finalGp: 'KORO',
    destination: 'KENDRAPARA MRF',
    totalDistance: 40,
    scheduledOn: '28 th of the Every Month',
    workers: [
      { name: 'MINATI DHALO', contact: '9178979026' },
      { name: 'SUMANNATHA SARMA', contact: '7064142323' },
      { name: 'MINATI BALO', contact: '9938149378' },
      { name: 'RANU BISWAL', contact: '9337900617' },
      { name: 'URMILA DAS', contact: '9178200461' },
      { name: 'SAMPADA PARIDA', contact: '9861947006' },
      { name: 'TAPOI MALLIK', contact: '9668248994' }
    ]
  },

  // Pattamundei Block (ULB Pattamundei)
  {
    id: 6,
    block: 'Pattamundei',
    routeId: 'KPAT-01',
    routeName: 'BADAMULABASANTA → BADAPADA → BALABHADRAPUR → BALIPATANA → BALURIA → BILIKANA',
    routeAbbreviation: 'BDNBBN-01',
    startingGp: 'BADAMULABASANTA',
    intermediateGps: ['BADAPADA', 'BALABHADRAPUR', 'BALIPATANA', 'BALURIA'],
    finalGp: 'BILIKANA',
    destination: 'Pattamundei MRF',
    totalDistance: 28,
    scheduledOn: '7th of Every Month',
    workers: [
      { name: 'Durga prasad Nayak', contact: '8917265374' },
      { name: 'Ananta kumar Biswal', contact: '8117808401' },
      { name: 'Sarada Prasanna Rout', contact: '7008065503' },
      { name: 'Sukul Majhi', contact: '9668350496' },
      { name: 'Pravat kumar Mallik', contact: '8917630526' },
      { name: 'Raibari Majhi', contact: '7894279914' }
    ]
  },
  {
    id: 7,
    block: 'Pattamundei',
    routeId: 'KPAT-02',
    routeName: 'KAKHARUNI → KHADIANTA → KHANATA → NARASINGHPUR → NILAKANTHAPUR → OUPADA',
    routeAbbreviation: 'KKGSAB-02',
    startingGp: 'KAKHARUNI',
    intermediateGps: ['KHADIANTA', 'KHANATA', 'NARASINGHPUR', 'NILAKANTHAPUR'],
    finalGp: 'OUPADA',
    destination: 'Pattamundei MRF',
    totalDistance: 28,
    scheduledOn: '22th of Every Month',
    workers: [
      { name: 'Subhashree Nayak', contact: '9861696257' },
      { name: 'Tapan kumar Pradhan', contact: '9937229218' },
      { name: 'Madhab Dalai', contact: '9337285368' },
      { name: 'Jyoti ranjan Samal', contact: '8480339793' },
      { name: 'ALEKHA PRADHAN', contact: '9937813688' }
    ]
  },
  {
    id: 8,
    block: 'Pattamundei',
    routeId: 'KPAT-03',
    routeName: 'PENTHAPAL → SANJARIA → SANSARFAL → SASANA → SINGHAGAN → SRIRAMPUR → TARADIPAL',
    routeAbbreviation: 'BDDSSB-03',
    startingGp: 'PENTHAPAL',
    intermediateGps: ['SANJARIA', 'SANSARFAL', 'SASANA', 'SINGHAGAN', 'SRIRAMPUR'],
    finalGp: 'TARADIPAL',
    destination: 'Pattamundei MRF',
    totalDistance: 40,
    scheduledOn: '28th of Every Month',
    workers: [
      { name: 'Bahadur Tudu', contact: '9668211447' },
      { name: 'Sarbeswar Baral', contact: '9337196350' },
      { name: 'Ashoka Jena', contact: '7978098872' },
      { name: 'Ranjit Parida', contact: '9938741526' }
    ]
  },
  {
    id: 9,
    block: 'Pattamundei',
    routeId: 'KPAT-04',
    routeName: 'CHANDANAGAR → DHAMARPUR → DIHAPADA → DIHUDIPUR → DOSIA → GANGARAMPUR',
    routeAbbreviation: 'DSKOBC-04',
    startingGp: 'CHANDANAGAR',
    intermediateGps: ['DHAMARPUR', 'DIHAPADA', 'DIHUDIPUR', 'DOSIA'],
    finalGp: 'GANGARAMPUR',
    destination: 'Pattamundei MRF',
    totalDistance: 36,
    scheduledOn: '15th of Every Month',
    workers: [
      { name: 'Suraj Mohanty', contact: '7008332533' },
      { name: 'ALEKHA PRADHAN', contact: '9937813688' },
      { name: 'Rajnandini Biswal', contact: '7682979971' },
      { name: 'Ananta kumar Biswal', contact: '8117808401' },
      { name: 'Jyoti ranjan Samal', contact: '8480339793' }
    ]
  },
  {
    id: 10,
    block: 'Pattamundei',
    routeId: 'KPAT-05',
    routeName: 'ALAPUA → AMRUTAMANOHI → ANDARA → ARADAPALLI → BACHHARA → BADAMOHANPUR',
    routeAbbreviation: 'ATPAABS-05',
    startingGp: 'ALAPUA',
    intermediateGps: ['AMRUTAMANOHI', 'ANDARA', 'ARADAPALLI', 'BACHHARA'],
    finalGp: 'BADAMOHANPUR',
    destination: 'Pattamundei MRF',
    totalDistance: 25,
    scheduledOn: '1st of Every Month',
    workers: [
      { name: 'Suraj Mohanty', contact: '7008332533' },
      { name: 'Sricharan Barik', contact: '8249456262' },
      { name: 'Sankarshan Majhi', contact: '9658610146' },
      { name: 'BANAMALI BEHERA', contact: '9337500363' },
      { name: 'Kausalya Lenka', contact: '7750001609' },
      { name: 'Pravat kumar Mallik', contact: '8917630526' }
    ]
  }
];