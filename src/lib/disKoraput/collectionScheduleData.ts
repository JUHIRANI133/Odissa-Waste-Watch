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
  {
    id: 1,
    block: 'Jeypore',
    ulb: 'Jeypore',
    mrf: 'Jeypore',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'MONDAY',
    gpName: 'Barniput',
    wasteGeneratedKg: 2148,
    gpNodalPerson: 'Kahnu Charan Dandasena, PEO, Bariniput',
    gpNodalContact: '7854965093',
    ulbNodalPerson: 'Kiran Kumar Malik',
    ulbNodalContact: '8114324140'
  },
  {
    id: 2,
    block: 'Jeypore',
    ulb: 'Jeypore',
    mrf: 'Jeypore',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'FRIDAY',
    gpName: 'Umuri',
    wasteGeneratedKg: 1807,
    gpNodalPerson: 'Sanatan Panda, PEO, Umuri',
    gpNodalContact: '8895061231',
    ulbNodalPerson: 'Kiran Kumar Malik',
    ulbNodalContact: '8114324140'
  },
  {
    id: 3,
    block: 'Koraput',
    ulb: 'Koraput',
    mrf: 'Koraput',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'ONCE IN EVERY TWO DAYS',
    gpName: 'Mathalput',
    wasteGeneratedKg: 1667,
    gpNodalPerson: 'Kishore Chandra Mishra,PEO Mathalput',
    gpNodalContact: '8249754199',
    ulbNodalPerson: 'Suprabha',
    ulbNodalContact: '9337379748'
  },
  {
    id: 4,
    block: 'Koraput',
    ulb: 'Koraput',
    mrf: 'Koraput',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'TUESDAY',
    gpName: 'Badakerenga',
    wasteGeneratedKg: 1877,
    gpNodalPerson: 'Chandan Panigrahi,PEO Kerenga',
    gpNodalContact: '7978996731',
    ulbNodalPerson: 'Suprabha',
    ulbNodalContact: '9337379748'
  },
  {
    id: 5,
    block: 'Kotpad',
    ulb: 'Kotpad',
    mrf: 'Kotpad',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'MONDAY & THURSDAY',
    gpName: 'Dhamanahandi',
    wasteGeneratedKg: 4808,
    gpNodalPerson: 'Sai Prasad Patnaik,PEO Dhamanahandi',
    gpNodalContact: '7008422719',
    ulbNodalPerson: 'Rajsekhar',
    ulbNodalContact: '9078296200'
  },
  {
    id: 6,
    block: 'Sunabeda',
    ulb: 'Sunabeda',
    mrf: 'Sunabeda',
    vehicleType: 'TATA ACE',
    vehicleNo: '-',
    vehicleCapacity: '400 Kg',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'MONDAY & THURSDAY',
    gpName: 'Rajpalma',
    wasteGeneratedKg: 862,
    gpNodalPerson: 'Sujata Khuntia,PEO Rajpalma',
    gpNodalContact: '8249421428',
    ulbNodalPerson: 'Milan Patra',
    ulbNodalContact: '9861874261'
  }
];
