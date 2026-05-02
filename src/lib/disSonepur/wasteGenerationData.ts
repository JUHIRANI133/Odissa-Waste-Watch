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
  // Block Binika
  { id: 1, gpName: 'Babupali', totalHouseholds: 1818, schools: 11, anganwadis: 13, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 126006, monthlyWasteTotalGm: 3780167, totalWasteKg: 3780.167 },
  { id: 2, gpName: 'Bankighirdi', totalHouseholds: 1975, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 136887, monthlyWasteTotalGm: 4106618, totalWasteKg: 4106.618 },
  { id: 3, gpName: 'Bausuni', totalHouseholds: 1051, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 72845, monthlyWasteTotalGm: 2185344, totalWasteKg: 2185.344 },
  { id: 4, gpName: 'Bhandar', totalHouseholds: 2196, schools: 8, anganwadis: 16, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 152205, monthlyWasteTotalGm: 4566143, totalWasteKg: 4566.143 },
  { id: 5, gpName: 'Charda', totalHouseholds: 1283, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 88925, monthlyWasteTotalGm: 2667742, totalWasteKg: 2667.742 },
  { id: 6, gpName: 'Jullunda', totalHouseholds: 1528, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 105906, monthlyWasteTotalGm: 3177170, totalWasteKg: 3177.170 },
  { id: 7, gpName: 'Kaintara', totalHouseholds: 1259, schools: 4, anganwadis: 11, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 87261, monthlyWasteTotalGm: 2617839, totalWasteKg: 2617.839 },
  { id: 8, gpName: 'Kuhibahal', totalHouseholds: 1024, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 70973, monthlyWasteTotalGm: 2129203, totalWasteKg: 2129.203 },
  { id: 9, gpName: 'Mahada', totalHouseholds: 1443, schools: 7, anganwadis: 14, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 100014, monthlyWasteTotalGm: 3000430, totalWasteKg: 3000.430 },
  { id: 10, gpName: 'Mahadevpali', totalHouseholds: 1632, schools: 9, anganwadis: 15, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 113114, monthlyWasteTotalGm: 3393418, totalWasteKg: 3393.418 },
  { id: 11, gpName: 'Meghala', totalHouseholds: 925, schools: 2, anganwadis: 5, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 64112, monthlyWasteTotalGm: 1923353, totalWasteKg: 1923.353 },
  { id: 12, gpName: 'Sankara', totalHouseholds: 1173, schools: 2, anganwadis: 6, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 81301, monthlyWasteTotalGm: 2439019, totalWasteKg: 2439.019 },
  { id: 13, gpName: 'Seledi', totalHouseholds: 1197, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 82964, monthlyWasteTotalGm: 2488922, totalWasteKg: 2488.922 },
  { id: 14, gpName: 'Silati', totalHouseholds: 1244, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 86222, monthlyWasteTotalGm: 2586649, totalWasteKg: 2586.649 },
  { id: 15, gpName: 'Sindurpur', totalHouseholds: 1585, schools: 10, anganwadis: 20, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 109856, monthlyWasteTotalGm: 3295691, totalWasteKg: 3295.691 },
  { id: 16, gpName: 'Singhijuba', totalHouseholds: 2071, schools: 8, anganwadis: 17, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 143541, monthlyWasteTotalGm: 4306230, totalWasteKg: 4306.230 },

  // Block Sonepur
  { id: 17, gpName: 'Baladi', totalHouseholds: 1380, schools: 6, anganwadis: 14, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 95648, monthlyWasteTotalGm: 2869434, totalWasteKg: 2869.434 },
  { id: 18, gpName: 'Bishimunda', totalHouseholds: 1502, schools: 6, anganwadis: 18, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 104104, monthlyWasteTotalGm: 3123109, totalWasteKg: 3123.109 },
  { id: 19, gpName: 'Chhakormal', totalHouseholds: 2046, schools: 9, anganwadis: 20, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 141808, monthlyWasteTotalGm: 4254248, totalWasteKg: 4254.248 },
  { id: 20, gpName: 'Hardokhol', totalHouseholds: 1768, schools: 10, anganwadis: 17, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 122540, monthlyWasteTotalGm: 3676202, totalWasteKg: 3676.202 },
  { id: 21, gpName: 'Janmura', totalHouseholds: 1165, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 80746, monthlyWasteTotalGm: 2422385, totalWasteKg: 2422.385 },
  { id: 22, gpName: 'Kalapathar', totalHouseholds: 1407, schools: 12, anganwadis: 16, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 97519, monthlyWasteTotalGm: 2925575, totalWasteKg: 2925.575 },
  { id: 23, gpName: 'Khaliapali', totalHouseholds: 981, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 67993, monthlyWasteTotalGm: 2039793, totalWasteKg: 2039.793 },
  { id: 24, gpName: 'Khari', totalHouseholds: 1477, schools: 8, anganwadis: 15, panchayatGhar: 1, commercial: 28, dailyWasteTotalGm: 102371, monthlyWasteTotalGm: 3071126, totalWasteKg: 3071.126 },
  { id: 25, gpName: 'Kharjura', totalHouseholds: 1105, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: 29, dailyWasteTotalGm: 76588, monthlyWasteTotalGm: 2297627, totalWasteKg: 2297.627 },
  { id: 26, gpName: 'Lachhipur', totalHouseholds: 1777, schools: 7, anganwadis: 16, panchayatGhar: 1, commercial: 32, dailyWasteTotalGm: 123164, monthlyWasteTotalGm: 3694916, totalWasteKg: 3694.916 },
  { id: 27, gpName: 'Mallikmunda', totalHouseholds: 1758, schools: 7, anganwadis: 19, panchayatGhar: 1, commercial: 36, dailyWasteTotalGm: 121847, monthlyWasteTotalGm: 3655409, totalWasteKg: 3655.409 },
  { id: 28, gpName: 'Mayurudan', totalHouseholds: 1245, schools: 8, anganwadis: 13, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 86291, monthlyWasteTotalGm: 2588729, totalWasteKg: 2588.729 },
  { id: 29, gpName: 'Narayanpur', totalHouseholds: 1119, schools: 5, anganwadis: 11, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 77558, monthlyWasteTotalGm: 2326737, totalWasteKg: 2326.737 },
  { id: 30, gpName: 'Rengali', totalHouseholds: 1528, schools: 14, anganwadis: 19, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 105906, monthlyWasteTotalGm: 3177170, totalWasteKg: 3177.170 },

  // Block Tarbha
  { id: 31, gpName: 'Badbhainro', totalHouseholds: 984, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 68201, monthlyWasteTotalGm: 2046031, totalWasteKg: 2046.031 },
  { id: 32, gpName: 'Baghia', totalHouseholds: 932, schools: 6, anganwadis: 13, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 64597, monthlyWasteTotalGm: 1937908, totalWasteKg: 1937.908 },
  { id: 33, gpName: 'Balikhamar', totalHouseholds: 1115, schools: 6, anganwadis: 13, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 77281, monthlyWasteTotalGm: 2318420, totalWasteKg: 2318.420 },
  { id: 34, gpName: 'Brahmani', totalHouseholds: 1149, schools: 5, anganwadis: 11, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 79637, monthlyWasteTotalGm: 2389116, totalWasteKg: 2389.116 },
  { id: 35, gpName: 'Charbhata', totalHouseholds: 1281, schools: 10, anganwadis: 13, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 88786, monthlyWasteTotalGm: 2663583, totalWasteKg: 2663.583 },
  { id: 36, gpName: 'Deulpadar', totalHouseholds: 764, schools: 1, anganwadis: 9, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 52953, monthlyWasteTotalGm: 1588585, totalWasteKg: 1588.585 },
  { id: 37, gpName: 'Dubula', totalHouseholds: 628, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 43527, monthlyWasteTotalGm: 1305800, totalWasteKg: 1305.800 },
  { id: 38, gpName: 'Jarajaring', totalHouseholds: 676, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 46854, monthlyWasteTotalGm: 1405607, totalWasteKg: 1405.607 },
  { id: 39, gpName: 'Jhartarbha', totalHouseholds: 958, schools: 2, anganwadis: 15, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 66399, monthlyWasteTotalGm: 1991969, totalWasteKg: 1991.969 },
  { id: 40, gpName: 'Kamsara', totalHouseholds: 996, schools: 7, anganwadis: 12, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 69033, monthlyWasteTotalGm: 2070983, totalWasteKg: 2070.983 },
  { id: 41, gpName: 'Katapali', totalHouseholds: 794, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 55032, monthlyWasteTotalGm: 1650964, totalWasteKg: 1650.964 },
  { id: 42, gpName: 'Kumbharmunda', totalHouseholds: 835, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 57874, monthlyWasteTotalGm: 1736216, totalWasteKg: 1736.216 },
  { id: 43, gpName: 'Maruduguchha', totalHouseholds: 1134, schools: 6, anganwadis: 17, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 78598, monthlyWasteTotalGm: 2357926, totalWasteKg: 2357.926 },
  { id: 44, gpName: 'Menda', totalHouseholds: 878, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 60854, monthlyWasteTotalGm: 1825625, totalWasteKg: 1825.625 },
  { id: 45, gpName: 'Paikbahal', totalHouseholds: 783, schools: 4, anganwadis: 11, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 54270, monthlyWasteTotalGm: 1628092, totalWasteKg: 1628.092 },
  { id: 46, gpName: 'Pua', totalHouseholds: 880, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 60993, monthlyWasteTotalGm: 1829784, totalWasteKg: 1829.784 },
  { id: 47, gpName: 'Ranisarda', totalHouseholds: 1305, schools: 3, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 90450, monthlyWasteTotalGm: 2713487, totalWasteKg: 2713.487 },
  { id: 48, gpName: 'Sargaj', totalHouseholds: 1410, schools: 9, anganwadis: 15, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 97727, monthlyWasteTotalGm: 2931813, totalWasteKg: 2931.813 },
  { id: 49, gpName: 'Sibtula', totalHouseholds: 1539, schools: 8, anganwadis: 16, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 106668, monthlyWasteTotalGm: 3200043, totalWasteKg: 3200.043 },
  { id: 50, gpName: 'Singhari', totalHouseholds: 1163, schools: 10, anganwadis: 17, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 80608, monthlyWasteTotalGm: 2418226, totalWasteKg: 2418.226 },
  { id: 51, gpName: 'Tulunda', totalHouseholds: 802, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 55587, monthlyWasteTotalGm: 1667599, totalWasteKg: 1667.599 },
];