export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Block Jagatsinghpur
  { id: 1, block: 'Jagatsinghpur', gpName: 'Punanga', taggedUlb: 'Jagatsinghpur', taggedMrf: 'Jagatsinghpur' },
  { id: 2, block: 'Jagatsinghpur', gpName: 'Ayar', taggedUlb: 'Jagatsinghpur', taggedMrf: 'Jagatsinghpur' },
  { id: 3, block: 'Jagatsinghpur', gpName: 'Tartanga', taggedUlb: 'Jagatsinghpur', taggedMrf: 'Jagatsinghpur' },
  // Block Kujanga
  { id: 4, block: 'Kujanga', gpName: 'Paradeepgarh', taggedUlb: 'Paradeep', taggedMrf: 'Paradeep' },
  { id: 5, block: 'Kujanga', gpName: 'Nuagarh', taggedUlb: 'Paradeep', taggedMrf: 'Paradeep' },
  { id: 6, block: 'Kujanga', gpName: 'Bagadia', taggedUlb: 'Paradeep', taggedMrf: 'Paradeep' },
];
