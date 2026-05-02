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
    block: 'Jagatsinghpur',
    ulb: 'Jagatsinghpur ULB',
    mrf: 'Jagatsinghpur MRF',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80 KG',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '27.04.2026',
    gpName: 'Punanga',
    wasteGeneratedKg: 2181,
    gpNodalPerson: 'SAROJ KUMAT TRIPATHY, PUNANGA GP',
    gpNodalContact: '9658264787',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  },
  {
    id: 2,
    block: 'Jagatsinghpur',
    ulb: 'Jagatsinghpur ULB',
    mrf: 'Jagatsinghpur MRF',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80 KG',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '28.04.2026',
    gpName: 'Ayar',
    wasteGeneratedKg: 2272,
    gpNodalPerson: 'GOTTAM KUMAR PARIJA, AYAR',
    gpNodalContact: '9937257752',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  },
  {
    id: 3,
    block: 'Jagatsinghpur',
    ulb: 'Jagatsinghpur ULB',
    mrf: 'Jagatsinghpur MRF',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80 KG',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '29.04.2026',
    gpName: 'Tartanga',
    wasteGeneratedKg: 1977,
    gpNodalPerson: 'PRADYUMNA KHUNTIA, TARTANGA GP',
    gpNodalContact: '7751073960',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  },
  {
    id: 4,
    block: 'Kujanga',
    ulb: 'Paradeep',
    mrf: 'Paradeep',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '22.04.2026',
    gpName: 'Paradeepgarh',
    wasteGeneratedKg: 4459,
    gpNodalPerson: 'Nihar Ranjan Jena PEO,Paradeepgarh GPs',
    gpNodalContact: '9861772445',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  },
  {
    id: 5,
    block: 'Kujanga',
    ulb: 'Paradeep',
    mrf: 'Paradeep',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '22.04.2026',
    gpName: 'Nuagarh',
    wasteGeneratedKg: 3310,
    gpNodalPerson: 'Nihar Ranjan Jena PEO,Nuagarh GPs',
    gpNodalContact: '9861772445',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  },
  {
    id: 6,
    block: 'Kujanga',
    ulb: 'Paradeep',
    mrf: 'Paradeep',
    vehicleType: 'Tractor',
    vehicleNo: '-',
    vehicleCapacity: '80',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: '22.04.2026',
    gpName: 'Bagadia',
    wasteGeneratedKg: 2988,
    gpNodalPerson: 'Nilamani Khtaua PEO,Bagadia GPs',
    gpNodalContact: '6370566544',
    ulbNodalPerson: '-',
    ulbNodalContact: '-'
  }
];
