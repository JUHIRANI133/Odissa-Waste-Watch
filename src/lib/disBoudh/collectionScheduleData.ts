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
    block: 'BOUDH',
    ulb: 'BOUDHGARH ULB',
    mrf: 'BOUDHGARH MRF 1',
    vehicleType: 'Single chamber vechile',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'MONDAY',
    gpName: 'MURSUNDHI to TELIBANDH (BBOUBKLMPT-1)',
    wasteGeneratedKg: 4000,
    gpNodalPerson: 'PRAGYAN PARAMITA PRADHAN, SARAT KU PUROHIT, MINATI BEHERA, SRADHANJALI KALTA, AZAD NAIK',
    gpNodalContact: '9438389354, 9658177534, 9078341768, 7504168199, 8260629287',
    ulbNodalPerson: 'BISWAPRATAP SWAIN',
    ulbNodalContact: '9337903256'
  },
  {
    id: 2,
    block: 'BOUDH',
    ulb: 'BOUDHGARH ULB',
    mrf: 'BOUDHGARH MRF 1',
    vehicleType: 'Single chamber vechile',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'THURS DAY',
    gpName: 'TALASARDA to ROXA (BBOUABBKMMTR-2)',
    wasteGeneratedKg: 8400,
    gpNodalPerson: 'PRANIT GOPAL, SAMIR PRADHAN, PRAHALLAD BHOI, SAMIR PRADHAN, SOUDAMINI NAIK',
    gpNodalContact: '9078415569, 8658747990, 9556798449, 8658747990, 9178003931',
    ulbNodalPerson: 'BISWAPRATAP SWAIN',
    ulbNodalContact: '9337903256'
  },
  {
    id: 3,
    block: 'HARABHANGA',
    ulb: 'BOUDHGARH ULB',
    mrf: 'BOUDHGARH MRF 1',
    vehicleType: 'Single chamber vechile',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'TUES DAY',
    gpName: 'SARSARA to RADHANAGAR (BHARBBRS-3)',
    wasteGeneratedKg: 3400,
    gpNodalPerson: 'srikanta pradhan, Nabaghana Pradhan, Srimant Pradhan',
    gpNodalContact: '8018183717, 7894075300, 8456024769',
    ulbNodalPerson: 'BISWAPRATAP SWAIN',
    ulbNodalContact: '9337903256'
  },
  {
    id: 4,
    block: 'HARABHANGA',
    ulb: 'BOUDHGARH ULB',
    mrf: 'BOUDHGARH MRF 1',
    vehicleType: 'Single chamber vechile',
    vehicleNo: '-',
    vehicleCapacity: '-',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'FRIDAY',
    gpName: 'Mathura to Pitambpur (BHARBLMPP-4)',
    wasteGeneratedKg: 8000,
    gpNodalPerson: 'shesadev jani, sudam pradhan, Namita sahu, Ladu kishor Sahu',
    gpNodalContact: '7978430639, 7077795415, 9937676457, 9438297096',
    ulbNodalPerson: 'BISWAPRATAP SWAIN',
    ulbNodalContact: '9337903256'
  }
];