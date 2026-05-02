export interface WasteGenerationData {
  id: number;
  gpName: string;
  totalHouseholds: number;
  totalWasteKg: number;
  schools: number;
  anganwadis: number;
  panchayatGhar: number;
  commercial: number;
  dailyWasteTotalGm: number;
  monthlyWasteTotalGm: number;
}

export const wasteGenerationData: WasteGenerationData[] = [
  // Block GUDARI
  { id: 1, gpName: 'ASADA', totalHouseholds: 1206, totalWasteKg: 0, schools: 13, anganwadis: 11, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 2, gpName: 'KARLAGHATI', totalHouseholds: 1138, totalWasteKg: 0, schools: 15, anganwadis: 18, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 3, gpName: 'KHARIGUDA', totalHouseholds: 978, totalWasteKg: 0, schools: 12, anganwadis: 14, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 4, gpName: 'KODAMA', totalHouseholds: 1347, totalWasteKg: 0, schools: 15, anganwadis: 16, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 5, gpName: 'M.K.RAI', totalHouseholds: 1203, totalWasteKg: 0, schools: 10, anganwadis: 11, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 6, gpName: 'MADHUBAN', totalHouseholds: 1403, totalWasteKg: 0, schools: 16, anganwadis: 21, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 7, gpName: 'PENDILI', totalHouseholds: 1078, totalWasteKg: 0, schools: 15, anganwadis: 15, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 8, gpName: 'SANAHUMA', totalHouseholds: 1235, totalWasteKg: 0, schools: 13, anganwadis: 10, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 9, gpName: 'SIRIGUDA', totalHouseholds: 1068, totalWasteKg: 0, schools: 17, anganwadis: 14, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },

  // Block Gunupur
  { id: 10, gpName: 'ABADA', totalHouseholds: 292, totalWasteKg: 0, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 11, gpName: 'BAGASALA', totalHouseholds: 613, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 12, gpName: 'BHIMPUR', totalHouseholds: 612, totalWasteKg: 0, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 13, gpName: 'CHALAKAMBA', totalHouseholds: 1022, totalWasteKg: 0, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 14, gpName: 'DOMBASORA', totalHouseholds: 1184, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 15, gpName: 'GADIAKHALA', totalHouseholds: 735, totalWasteKg: 0, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 16, gpName: 'GHANANTRI', totalHouseholds: 721, totalWasteKg: 0, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 17, gpName: 'GOTHALAPADAR', totalHouseholds: 666, totalWasteKg: 0, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 18, gpName: 'JAGANNATHPUR', totalHouseholds: 1084, totalWasteKg: 0, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 19, gpName: 'JALTAR', totalHouseholds: 763, totalWasteKg: 0, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 20, gpName: 'KULUSING', totalHouseholds: 935, totalWasteKg: 0, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 21, gpName: 'MORAMA', totalHouseholds: 524, totalWasteKg: 0, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 22, gpName: 'PUTTASING', totalHouseholds: 1258, totalWasteKg: 0, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 23, gpName: 'REGEDA', totalHouseholds: 737, totalWasteKg: 0, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 24, gpName: 'SAGADA', totalHouseholds: 857, totalWasteKg: 0, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 25, gpName: 'CHINASARI', totalHouseholds: 1201, totalWasteKg: 0, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 26, gpName: 'SIRIJHOLLI', totalHouseholds: 762, totalWasteKg: 0, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 28, gpName: 'TOLONA', totalHouseholds: 901, totalWasteKg: 0, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 28, gpName: 'TITIMIRI', totalHouseholds: 591, totalWasteKg: 0, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },

  // Block RAYAGADA SDAR
  { id: 29, gpName: 'Badaalubadi', totalHouseholds: 758, totalWasteKg: 0, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 30, gpName: 'Badaerukubadi', totalHouseholds: 598, totalWasteKg: 0, schools: 10, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 31, gpName: 'Bairagihalua', totalHouseholds: 580, totalWasteKg: 0, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 32, gpName: 'Baising', totalHouseholds: 727, totalWasteKg: 0, schools: 10, anganwadis: 8, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 33, gpName: 'Chandili', totalHouseholds: 4591, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 34, gpName: 'Dangalodi', totalHouseholds: 619, totalWasteKg: 0, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 35, gpName: 'Durgapadu', totalHouseholds: 641, totalWasteKg: 0, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 36, gpName: 'Gajigaon', totalHouseholds: 746, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 37, gpName: 'Gumma', totalHouseholds: 1179, totalWasteKg: 0, schools: 21, anganwadis: 221, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 38, gpName: 'Halua', totalHouseholds: 1613, totalWasteKg: 0, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 39, gpName: 'Hatseshkhal', totalHouseholds: 685, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 40, gpName: 'Jhimidipeta', totalHouseholds: 985, totalWasteKg: 0, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 41, gpName: 'Kampa Maligan', totalHouseholds: 842, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 42, gpName: 'Karlakona', totalHouseholds: 920, totalWasteKg: 0, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 43, gpName: 'Karubai', totalHouseholds: 619, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 44, gpName: 'Kereda', totalHouseholds: 972, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 45, gpName: 'Kotapeta', totalHouseholds: 1098, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 46, gpName: 'Kuli', totalHouseholds: 1871, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 47, gpName: 'Kumatalpeta', totalHouseholds: 555, totalWasteKg: 0, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 48, gpName: 'Kumbhikota', totalHouseholds: 1229, totalWasteKg: 0, schools: 12, anganwadis: 12, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 49, gpName: 'Kutuli', totalHouseholds: 750, totalWasteKg: 0, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 50, gpName: 'Matikona', totalHouseholds: 625, totalWasteKg: 0, schools: 11, anganwadis: 8, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 51, gpName: 'Mirabali', totalHouseholds: 769, totalWasteKg: 0, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 52, gpName: 'Nakiti', totalHouseholds: 832, totalWasteKg: 0, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 53, gpName: 'Penta', totalHouseholds: 1482, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 1, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 54, gpName: 'Pipalguda', totalHouseholds: 666, totalWasteKg: 0, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0 },
  { id: 55, gpName: 'Pitamahal', totalHouseholds: 1324, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0, totalWasteKg: 0 },
  { id: 56, gpName: 'Tadama', totalHouseholds: 1123, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 0, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0, totalWasteKg: 0 },
];