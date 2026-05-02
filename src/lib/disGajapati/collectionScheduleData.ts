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
    block: 'Gosani',
    ulb: 'Paralakhemundi',
    mrf: 'Paralakhemundi Stadium',
    vehicleType: 'TATA ACE',
    vehicleNo: '1',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Kerandi',
    wasteGeneratedKg: 2,
    gpNodalPerson: 'Nibeditha Pattanik',
    gpNodalContact: '6371619301',
    ulbNodalPerson: 'Mahesh Kumar Dakua',
    ulbNodalContact: '9437211299'
  },
  {
    id: 2,
    block: 'Gosani',
    ulb: 'Paralakhemundi',
    mrf: 'Paralakhemundi Stadium',
    vehicleType: 'TATA ACE',
    vehicleNo: '2',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Kathalakaviti',
    wasteGeneratedKg: 2,
    gpNodalPerson: 'Khageswar Bhuyan',
    gpNodalContact: '7894555004',
    ulbNodalPerson: 'Mahesh Kumar Dakua',
    ulbNodalContact: '9437211299'
  },
  {
    id: 3,
    block: 'Gumma',
    ulb: 'Paralakhemundi',
    mrf: 'Betaguda',
    vehicleType: 'TATA ACE',
    vehicleNo: '3',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Jhami',
    wasteGeneratedKg: 2,
    gpNodalPerson: 'S. Ramesh',
    gpNodalContact: '9437772821',
    ulbNodalPerson: 'Mahesh Kumar Dakua',
    ulbNodalContact: '9437211299'
  },
  {
    id: 4,
    block: 'Kashinagar',
    ulb: 'Paralakhemundi',
    mrf: 'Betaguda',
    vehicleType: 'TATA ACE',
    vehicleNo: '4',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Ranipeta',
    wasteGeneratedKg: 2,
    gpNodalPerson: 'Raj Kumar Limma',
    gpNodalContact: '9337671255',
    ulbNodalPerson: 'Mahesh Kumar Dakua',
    ulbNodalContact: '9437211299'
  },
  {
    id: 5,
    block: 'Kashinagar',
    ulb: 'Kashinagar',
    mrf: 'Kashinagar',
    vehicleType: 'TATA ACE',
    vehicleNo: '5',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Kidigam',
    wasteGeneratedKg: 1.5,
    gpNodalPerson: 'O.Satish',
    gpNodalContact: '9438236741',
    ulbNodalPerson: 'Jaysen Nahak',
    ulbNodalContact: '8328958383'
  },
  {
    id: 6,
    block: 'Kashinagar',
    ulb: 'Kashinagar',
    mrf: 'Kashinagar',
    vehicleType: 'TATA ACE',
    vehicleNo: '6',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Goribandha',
    wasteGeneratedKg: 3,
    gpNodalPerson: 'Santhosh Kumar Bahudur',
    gpNodalContact: '9437400144',
    ulbNodalPerson: 'Jaysen Nahak',
    ulbNodalContact: '8328958383'
  },
  {
    id: 7,
    block: 'Kashinagar',
    ulb: 'Kashinagar',
    mrf: 'Kashinagar',
    vehicleType: 'TATA ACE',
    vehicleNo: '7',
    vehicleCapacity: '300-400 Kg',
    driverName: 'Verified Personnel',
    driverContact: '-',
    collectionSchedule: 'Tuesday & Thursday',
    gpName: 'Budura',
    wasteGeneratedKg: 3,
    gpNodalPerson: 'Sunita Limma',
    gpNodalContact: '6370787556',
    ulbNodalPerson: 'Jaysen Nahak',
    ulbNodalContact: '8328958383'
  }
];