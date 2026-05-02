export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Paralakhemundi Cluster
  { id: 1, block: 'Gosani', gpName: 'Kerandi', taggedUlb: 'Paralakhemundi', taggedMrf: 'Paralkhemundi Stadium' },
  { id: 2, block: 'Gosani', gpName: 'Kathalakaviti', taggedUlb: 'Paralakhemundi', taggedMrf: 'Paralkhemundi Stadium' },
  { id: 3, block: 'Gumma', gpName: 'Jhami', taggedUlb: 'Paralakhemundi', taggedMrf: 'Betaguda' },
  { id: 4, block: 'Kashinagar', gpName: 'Ranipeta', taggedUlb: 'Paralakhemundi', taggedMrf: 'Betaguda' },

  // Kasinagar Cluster
  { id: 5, block: 'Kashinagar', gpName: 'Kidigam', taggedUlb: 'Kashinagar', taggedMrf: 'Kashinagar' },
  { id: 6, block: 'Kashinagar', gpName: 'Goribandha', taggedUlb: 'Kashinagar', taggedMrf: 'Kashinagar' },
  { id: 7, block: 'Kashinagar', gpName: 'Budura', taggedUlb: 'Kashinagar', taggedMrf: 'Kashinagar' },
];