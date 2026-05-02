export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Block GUDARI - GUDARI NAC
  { id: 1, block: 'GUDARI', gpName: 'ASADA', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 2, block: 'GUDARI', gpName: 'KARLAGHATI', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 3, block: 'GUDARI', gpName: 'KHARIGUDA', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 4, block: 'GUDARI', gpName: 'KODAMA', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 5, block: 'GUDARI', gpName: 'M.K.RAI', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 6, block: 'GUDARI', gpName: 'MADHUBAN', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 7, block: 'GUDARI', gpName: 'PENDILI', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 8, block: 'GUDARI', gpName: 'SANAHUMA', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },
  { id: 9, block: 'GUDARI', gpName: 'SIRIGUDA', taggedUlb: 'GUDARI NAC', taggedMrf: 'GUDARI NAC' },

  // Block Gunupur - Gunupur Town
  { id: 10, block: 'Gunupur', gpName: 'ABADA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 11, block: 'Gunupur', gpName: 'BAGASALA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 12, block: 'Gunupur', gpName: 'BHIMPPUR', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 13, block: 'Gunupur', gpName: 'CHALAKAMBA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 14, block: 'Gunupur', gpName: 'DOMBASORA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 15, block: 'Gunupur', gpName: 'GADIAKHALA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 16, block: 'Gunupur', gpName: 'GHANANTRI', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 17, block: 'Gunupur', gpName: 'GOTHALAPADAR', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 18, block: 'Gunupur', gpName: 'JAGANNATHPUR', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 19, block: 'Gunupur', gpName: 'JALTAR', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 20, block: 'Gunupur', gpName: 'KULUSING', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 21, block: 'Gunupur', gpName: 'MORAMA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 22, block: 'Gunupur', gpName: 'PUTTASING', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 23, block: 'Gunupur', gpName: 'REGEDA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 24, block: 'Gunupur', gpName: 'SAGADA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 25, block: 'Gunupur', gpName: 'CHINASARI', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 26, block: 'Gunupur', gpName: 'SIRIJHOLLI', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 27, block: 'Gunupur', gpName: 'TOLONA', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },
  { id: 28, block: 'Gunupur', gpName: 'TITIMIRI', taggedUlb: 'Gunupur', taggedMrf: 'Kothaluguda' },

  // Block RAYAGADA SDAR - RAYAGADA TOWN
  { id: 29, block: 'RAYAGADA SDAR', gpName: 'Badaalubadi', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 30, block: 'RAYAGADA SDAR', gpName: 'Badaerukubadi', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 31, block: 'RAYAGADA SDAR', gpName: 'Bairagihalua', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 32, block: 'RAYAGADA SDAR', gpName: 'Baising', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 33, block: 'RAYAGADA SDAR', gpName: 'Chandili', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 34, block: 'RAYAGADA SDAR', gpName: 'Dangalodi', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 35, block: 'RAYAGADA SDAR', gpName: 'Durgapadu', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 36, block: 'RAYAGADA SDAR', gpName: 'Gajigaon', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 37, block: 'RAYAGADA SDAR', gpName: 'Gumma', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 38, block: 'RAYAGADA SDAR', gpName: 'Halua', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 39, block: 'RAYAGADA SDAR', gpName: 'Hatseshkhal', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 40, block: 'RAYAGADA SDAR', gpName: 'Jhimidipeta', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 41, block: 'RAYAGADA SDAR', gpName: 'Kampa Maligan', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 42, block: 'RAYAGADA SDAR', gpName: 'Karlakona', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 43, block: 'RAYAGADA SDAR', gpName: 'Karubai', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 44, block: 'RAYAGADA SDAR', gpName: 'Kereda', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 45, block: 'RAYAGADA SDAR', gpName: 'Kotapeta', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 46, block: 'RAYAGADA SDAR', gpName: 'Kuli', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 47, block: 'RAYAGADA SDAR', gpName: 'Kumatalpeta', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 48, block: 'RAYAGADA SDAR', gpName: 'Kumbhikota', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 49, block: 'RAYAGADA SDAR', gpName: 'Kutuli', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 50, block: 'RAYAGADA SDAR', gpName: 'Matikona', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 51, block: 'RAYAGADA SDAR', gpName: 'Mirabali', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 52, block: 'RAYAGADA SDAR', gpName: 'Nakiti', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 53, block: 'RAYAGADA SDAR', gpName: 'Penta', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 54, block: 'RAYAGADA SDAR', gpName: 'Pipalguda', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 55, block: 'RAYAGADA SDAR', gpName: 'Pitamahal', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
  { id: 56, block: 'RAYAGADA SDAR', gpName: 'Tadama', taggedUlb: 'RAYAGADA', taggedMrf: 'ANTARIGUDA' },
];