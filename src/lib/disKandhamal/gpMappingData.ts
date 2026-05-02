export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Block BALLIGUDA
  { id: 1, block: 'BALLIGUDA', gpName: 'BARAKHAMA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 2, block: 'BALLIGUDA', gpName: 'BATAGUDA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 3, block: 'BALLIGUDA', gpName: 'BUDRUKIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 4, block: 'BALLIGUDA', gpName: 'DADAKANGIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 5, block: 'BALLIGUDA', gpName: 'KHAMANKHOL', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 6, block: 'BALLIGUDA', gpName: 'KUTIKIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 7, block: 'BALLIGUDA', gpName: 'LANDAGAON', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 8, block: 'BALLIGUDA', gpName: 'MEDIAKIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 9, block: 'BALLIGUDA', gpName: 'PARAMPANGA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 10, block: 'BALLIGUDA', gpName: 'REBINGIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 11, block: 'BALLIGUDA', gpName: 'RUTUNGIA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 12, block: 'BALLIGUDA', gpName: 'SALAGUDA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 13, block: 'BALLIGUDA', gpName: 'SINDRIGAON', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },
  { id: 14, block: 'BALLIGUDA', gpName: 'SUDRA', taggedUlb: 'BALLIGUDA', taggedMrf: 'NAC , BALLIGUDA' },

  // Block Phulbani
  { id: 15, block: 'Phulbani', gpName: 'Alami', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 16, block: 'Phulbani', gpName: 'Bisipada', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 17, block: 'Phulbani', gpName: 'Dadaki', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 18, block: 'Phulbani', gpName: 'Duduki', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 19, block: 'Phulbani', gpName: 'Ganjuguda', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 20, block: 'Phulbani', gpName: 'Gumagarh', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 21, block: 'Phulbani', gpName: 'Jamjhari', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 22, block: 'Phulbani', gpName: 'Katringia', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 23, block: 'Phulbani', gpName: 'Keredi', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 24, block: 'Phulbani', gpName: 'Minia', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },
  { id: 25, block: 'Phulbani', gpName: 'Tudipaju', taggedUlb: 'Phulbani', taggedMrf: 'ULB Phulbani' },

  // Block G.UDAYAGIRI
  { id: 26, block: 'G.UDAYAGIRI', gpName: 'MALIKAPADI', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 27, block: 'G.UDAYAGIRI', gpName: 'TALARIMAHA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 28, block: 'G.UDAYAGIRI', gpName: 'KALINGA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 29, block: 'G.UDAYAGIRI', gpName: 'GRESSINGIA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 30, block: 'G.UDAYAGIRI', gpName: 'RATINGIA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 31, block: 'G.UDAYAGIRI', gpName: 'LINGAGADA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 32, block: 'G.UDAYAGIRI', gpName: 'RAIKALA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
  { id: 33, block: 'G.UDAYAGIRI', gpName: 'KATINGIA', taggedUlb: 'G.UDAYAGIRI', taggedMrf: 'NAC , G.UDAYAGIRI' },
];
