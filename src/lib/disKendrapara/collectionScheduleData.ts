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
  routeId?: string;
  routeName?: string;
}

export const collectionScheduleData: CollectionScheduleItem[] = [
  // Kendrapara Block
  {
    id: 1,
    block: 'KENDRAPARA',
    ulb: 'KENDRAPARA',
    mrf: 'KOJALA MRF',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1st of Every Month',
    gpName: 'AYEBA, PUROSATAMPUR, KANSAR, OSTAPUR, KALAPADA',
    wasteGeneratedKg: 21912,
    gpNodalPerson: 'SWAGATIKA BEHERA, UMESH CHANDRA SETHY, JHUNILATA MALIK, SURYAMANI TUDU, STUTI SUMAN',
    gpNodalContact: '9348643012, 9938458394, 7873412294, 9777492005, 7326058862',
    ulbNodalPerson: 'SUMIT KUMAR PATTNAIK, SANITATION EXPERT',
    ulbNodalContact: '8249623639',
    routeId: 'KKEN-01',
    routeName: 'AYEBA → PUROSATAMPUR → KANSAR → OSTAPUR → KALAPADA'
  },
  {
    id: 2,
    block: 'KENDRAPARA',
    ulb: 'KENDRAPARA',
    mrf: 'KOJALA MRF',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '6th of Every Month',
    gpName: 'BAGADA, SYAMSUNDARPUR, BHARTAPUR, CHAKRADA, BHAGABATPUR',
    wasteGeneratedKg: 25513,
    gpNodalPerson: 'SURYAMANI TUDU, MAMATAMANI SINGH, HARMOHAN MOHANTY, MINAKHI BAL, BISWARANJAN JENA',
    gpNodalContact: '9777492005, 9776713822, 9777230643, 6370995801, 7008733924',
    ulbNodalPerson: 'SUMIT KUMAR PATTNAIK, SANITATION EXPERT',
    ulbNodalContact: '8249623639',
    routeId: 'KKEN-02',
    routeName: 'BAGADA → SYAMSUNDARPUR → BHARTAPUR → CHAKRADA → BHAGABATPUR'
  },
  {
    id: 3,
    block: 'KENDRAPARA',
    ulb: 'KENDRAPARA',
    mrf: 'KOJALA MRF',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '12th of Every Month',
    gpName: 'JAMDHAR, GULNAGAR, KAPALESWAR, KUTURAN, DHOLO',
    wasteGeneratedKg: 25026,
    gpNodalPerson: 'SANGEETA MOHAPATRA, MAHESWAR PRADHAN, BIJAYALAXMI PRADHAN, HARMOHAN MOHANTY, SUKANTA KUMAR NAYAK',
    gpNodalContact: '9337155698, 9437158037, 9861458816, 9777230643, 8327777937',
    ulbNodalPerson: 'SUMIT KUMAR PATTNAIK, SANITATION EXPERT',
    ulbNodalContact: '8249623639',
    routeId: 'KKEN-03',
    routeName: 'JAMDHAR → GULNAGAR → KAPALESWAR → KUTURAN → DHOLO'
  },
  {
    id: 4,
    block: 'KENDRAPARA',
    ulb: 'KENDRAPARA',
    mrf: 'KOJALA MRF',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '23rd of Every Month',
    gpName: 'NIKIREI, INDUPUR, DHUMATA, CHARIGAN, GHAGARA',
    wasteGeneratedKg: 19448,
    gpNodalPerson: 'SUKANTA KUMAR NAYAK, NIHARA RANJAN THATOI, ASHOK KUMAR PARIDA, NIHARA RANJAN THATOI, KIRAN SATPATHY',
    gpNodalContact: '8327777937, 9437968571, 9347547413, 9437968571, 7978394926',
    ulbNodalPerson: 'SUMIT KUMAR PATTNAIK, SANITATION EXPERT',
    ulbNodalContact: '8249623639',
    routeId: 'KKEN-04',
    routeName: 'NIKIREI → INDUPUR → DHUMATA → CHARIGAON → GHAGARA'
  },
  {
    id: 5,
    block: 'KENDRAPARA',
    ulb: 'KENDRAPARA',
    mrf: 'KOJALA MRF',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '28th of Every Month',
    gpName: 'SANAMANATIA, CHANDANPUR, KESPUR, GANGAPADA, PALASINGHA, BARO, KORO',
    wasteGeneratedKg: 22924,
    gpNodalPerson: 'DHARMANANDA BEHERA, RASHMIRANJAN SAMAL, MRUTRYNJAYA DAS, SANTOSH KUMAR NAYAK, AISURYA NATHASHARMA, UMESH CHANDRA SETHY, BIJAYALAXMI PATHY',
    gpNodalContact: '9658212139, 7978074206, 9777231141, 8917461734, 7978157718, 9938458394, 8917555679',
    ulbNodalPerson: 'SUMIT KUMAR PATTNAIK, SANITATION EXPERT',
    ulbNodalContact: '8249623639',
    routeId: 'KKEN-05',
    routeName: 'SANAMANATIA → CHANDANPUR → KESPUR → GANGAPADA → PALASINGHA → BARO → KORO'
  },

  // Pattamundei Block
  {
    id: 6,
    block: 'PATTAMUNDEI',
    ulb: 'PATTAMUNDEI',
    mrf: 'MATIA MRF CENTRE',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '1st of Every Month',
    gpName: 'ALAPUA, AMRUTAMANOHI, ANDARA, ARADAPALLI, BACHHARA, BADAMOHANPUR',
    wasteGeneratedKg: 20785,
    gpNodalPerson: 'Suraj Mohanty, Sricharan Barik, Sankarshan Majhi, BANAMALI BEHERA, Kausalya Lenka, Pravat kumar Mallik',
    gpNodalContact: '7008332533, 8249456262, 9658610146, 9337500363, 7750001609, 8917630526',
    ulbNodalPerson: 'PRAVONJAN SWAIN, SANITATION EXPERT',
    ulbNodalContact: '8249633574',
    routeId: 'KPAT-05',
    routeName: 'ALAPUA → AMRUTAMANOHI → ANDARA → ARADAPALLI → BACHHARA → BADAMOHANPUR'
  },
  {
    id: 7,
    block: 'PATTAMUNDEI',
    ulb: 'PATTAMUNDEI',
    mrf: 'MATIA MRF CENTRE',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '7th of Every Month',
    gpName: 'BADAMULABASANTA, BADAPADA, BALABHADRAPUR, BALIPATANA, BALURIA, BILIKANA',
    wasteGeneratedKg: 28023,
    gpNodalPerson: 'Durga prasad Nayak, Ananta kumar Biswal, Sarada Prasanna Rout, Sukul Majhi, Pravat kumar Mallik, Raibari Majhi',
    gpNodalContact: '8917265374, 8117808401, 7008065503, 9668350496, 8917630526, 7894279914',
    ulbNodalPerson: 'PRAVONJAN SWAIN, SANITATION EXPERT',
    ulbNodalContact: '8249633574',
    routeId: 'KPAT-01',
    routeName: 'BADAMULABASANTA → BADAPADA → BALABHADRAPUR → BALIPATANA → BALURIA → BILIKANA'
  },
  {
    id: 8,
    block: 'PATTAMUNDEI',
    ulb: 'PATTAMUNDEI',
    mrf: 'MATIA MRF CENTRE',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '15th of Every Month',
    gpName: 'CHANDANAGAR, DHAMARPUR, DIHAPADA, DIHUDIPUR, DOSIA, GANGARAMPUR',
    wasteGeneratedKg: 29280,
    gpNodalPerson: 'Suraj Mohanty, ALEKHA PRADHAN, Rajnandini Biswal, Ananta kumar Biswal, Jyoti ranjan Samal, Jyoti ranjan Samal',
    gpNodalContact: '7008332533, 9937813688, 7682979971, 8117808401, 8480339793, 8480339793',
    ulbNodalPerson: 'PRAVONJAN SWAIN, SANITATION EXPERT',
    ulbNodalContact: '8249633574',
    routeId: 'KPAT-04',
    routeName: 'CHANDANAGAR → DHAMARPUR → DIHAPADA → DIHUDIPUR → DOSIA → GANGARAMPUR'
  },
  {
    id: 9,
    block: 'PATTAMUNDEI',
    ulb: 'PATTAMUNDEI',
    mrf: 'MATIA MRF CENTRE',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '22th of Every Month',
    gpName: 'KAKHARUNI, KHADIANTA, KHANATA, NARASINGHPUR, NILAKANTHAPUR, OUPADA',
    wasteGeneratedKg: 26670,
    gpNodalPerson: 'Subhashree Nayak, Tapan kumar Pradhan, Tapan kumar Pradhan, Madhab Dalai, Jyoti ranjan Samal, ALEKHA PRADHAN',
    gpNodalContact: '9861696257, 9937229218, 9937229218, 9337285368, 8480339793, 9937813688',
    ulbNodalPerson: 'PRAVONJAN SWAIN, SANITATION EXPERT',
    ulbNodalContact: '8249633574',
    routeId: 'KPAT-02',
    routeName: 'KAKHARUNI → KHADIANTA → KHANATA → NARASINGHPUR → NILAKANTHAPUR → OUPADA'
  },
  {
    id: 10,
    block: 'PATTAMUNDEI',
    ulb: 'PATTAMUNDEI',
    mrf: 'MATIA MRF CENTRE',
    vehicleType: 'Single Chamber Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '28th of Every Month',
    gpName: 'PENTHAPAL, SANJARIA, SANSARFAL, SASANA, SINGHAGAN, SRIRAMPUR, TARADIPAL',
    wasteGeneratedKg: 35143,
    gpNodalPerson: 'Bahadur Tudu, Bahadur Tudu, Sarbeswar Baral, Ashoka Jena, Ranjit Parida, AShoka Jena, Sarbeswar Baral',
    gpNodalContact: '9668211447, 9668211447, 9337196350, 7978098872, 9938741526, 7978098872, 9337196350',
    ulbNodalPerson: 'PRAVONJAN SWAIN, SANITATION EXPERT',
    ulbNodalContact: '8249633574',
    routeId: 'KPAT-03',
    routeName: 'PENTHAPAL → SANJARIA → SANSARFAL → SASANA → SINGHAGAN → SRIRAMPUR → TARADIPAL'
  }
];
