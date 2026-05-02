export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Jeypore Block
  { id: 1, block: 'Jeypore', gpName: 'Barniput', taggedUlb: 'Jeypore', taggedMrf: 'Jeypore' },
  { id: 2, block: 'Jeypore', gpName: 'Umuri', taggedUlb: 'Jeypore', taggedMrf: 'Jeypore' },
  // Koraput Block
  { id: 3, block: 'Koraput', gpName: 'Mathalput', taggedUlb: 'Koraput', taggedMrf: 'Koraput' },
  { id: 4, block: 'Koraput', gpName: 'Badakerenga', taggedUlb: 'Koraput', taggedMrf: 'Koraput' },
  // Kotpad Block
  { id: 5, block: 'Kotpad', gpName: 'Dhamanahandi', taggedUlb: 'Kotpad', taggedMrf: 'Kotpad' },
  { id: 6, block: 'Kotpad', gpName: 'Sutipadar', taggedUlb: 'Kotpad', taggedMrf: 'Kotpad' },
  // Semiliguda Block
  { id: 7, block: 'Semiliguda', gpName: 'Rajpalma', taggedUlb: 'Sunabeda', taggedMrf: 'Semiliguda' },
];
