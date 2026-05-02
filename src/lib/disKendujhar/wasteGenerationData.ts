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
  // Anandapur
  { id: 1, gpName: 'BAILO', totalHouseholds: 1928, schools: 12, anganwadis: 13, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 126110, monthlyWasteTotalGm: 3783314, totalWasteKg: 3783.31 },
  { id: 2, gpName: 'BELABAHALI', totalHouseholds: 1426, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 75, dailyWasteTotalGm: 93275, monthlyWasteTotalGm: 2798240, totalWasteKg: 2798.24 },
  { id: 3, gpName: 'HARIDAPAL', totalHouseholds: 1033, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 67569, monthlyWasteTotalGm: 2027056, totalWasteKg: 2027.06 },
  { id: 4, gpName: 'PANCHUPALLY', totalHouseholds: 1160, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 75876, monthlyWasteTotalGm: 2276268, totalWasteKg: 2276.27 },
  { id: 5, gpName: 'JALASUAN', totalHouseholds: 618, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 40423, monthlyWasteTotalGm: 1212701, totalWasteKg: 1212.70 },
  { id: 6, gpName: 'DHAKOTHA', totalHouseholds: 1754, schools: 14, anganwadis: 14, panchayatGhar: 1, commercial: 40, dailyWasteTotalGm: 114729, monthlyWasteTotalGm: 3441874, totalWasteKg: 3441.87 },
  { id: 7, gpName: 'KOLIMATI', totalHouseholds: 1568, schools: 13, anganwadis: 12, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 102563, monthlyWasteTotalGm: 3076886, totalWasteKg: 3076.89 },
  { id: 8, gpName: 'TARATARA', totalHouseholds: 1596, schools: 14, anganwadis: 13, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 104394, monthlyWasteTotalGm: 3131831, totalWasteKg: 3131.83 },
  { id: 9, gpName: 'KATHAKATA', totalHouseholds: 909, schools: 9, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 59458, monthlyWasteTotalGm: 1783731, totalWasteKg: 1783.73 },
  { id: 10, gpName: 'KANTIPAL', totalHouseholds: 1802, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 117869, monthlyWasteTotalGm: 3536065, totalWasteKg: 3536.07 },
  { id: 11, gpName: 'MOCHINDA', totalHouseholds: 1274, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 83332, monthlyWasteTotalGm: 2499970, totalWasteKg: 2499.97 },
  { id: 12, gpName: 'SALABANI', totalHouseholds: 1382, schools: 9, anganwadis: 6, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 90397, monthlyWasteTotalGm: 2711899, totalWasteKg: 2711.90 },
  { id: 13, gpName: 'BAUNSAGARH', totalHouseholds: 1825, schools: 11, anganwadis: 12, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 119373, monthlyWasteTotalGm: 3581198, totalWasteKg: 3581.20 },
  { id: 14, gpName: 'KODAPADA', totalHouseholds: 1300, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 85033, monthlyWasteTotalGm: 2550990, totalWasteKg: 2550.99 },
  { id: 15, gpName: 'BUDHIKUDA', totalHouseholds: 547, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 35779, monthlyWasteTotalGm: 1073378, totalWasteKg: 1073.38 },
  { id: 16, gpName: 'GAYALMUNDA', totalHouseholds: 1649, schools: 15, anganwadis: 17, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 107861, monthlyWasteTotalGm: 3235833, totalWasteKg: 3235.83 },
  { id: 17, gpName: 'PANASADIHA', totalHouseholds: 1281, schools: 12, anganwadis: 15, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 83790, monthlyWasteTotalGm: 2513706, totalWasteKg: 2513.71 },
  { id: 18, gpName: 'MANOHARPUR', totalHouseholds: 852, schools: 12, anganwadis: 11, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 55729, monthlyWasteTotalGm: 1671880, totalWasteKg: 1671.88 },

  // Champua
  { id: 19, gpName: 'Rajia', totalHouseholds: 2315, schools: 14, anganwadis: 10, panchayatGhar: 1, commercial: 27, dailyWasteTotalGm: 151424, monthlyWasteTotalGm: 4542725, totalWasteKg: 4542.73 },
  { id: 20, gpName: 'Kalikaprasad', totalHouseholds: 1036, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 67765, monthlyWasteTotalGm: 2032943, totalWasteKg: 2032.94 },
  { id: 21, gpName: 'Badanai', totalHouseholds: 2001, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 130885, monthlyWasteTotalGm: 3926562, totalWasteKg: 3926.56 },
  { id: 22, gpName: 'Parsala', totalHouseholds: 771, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 50431, monthlyWasteTotalGm: 1512933, totalWasteKg: 1512.93 },
  { id: 23, gpName: 'Rimuli', totalHouseholds: 1351, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 88369, monthlyWasteTotalGm: 2651067, totalWasteKg: 2651.07 },
  { id: 24, gpName: 'Sunaposi', totalHouseholds: 1431, schools: 9, anganwadis: 10, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 93602, monthlyWasteTotalGm: 2808051, totalWasteKg: 2808.05 },
  { id: 25, gpName: 'Jamudalak', totalHouseholds: 1718, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 112374, monthlyWasteTotalGm: 3371231, totalWasteKg: 3371.23 },
  { id: 26, gpName: 'Kutariposi', totalHouseholds: 552, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 36106, monthlyWasteTotalGm: 1083190, totalWasteKg: 1083.19 },
  { id: 27, gpName: 'Kodagadia', totalHouseholds: 1215, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 79473, monthlyWasteTotalGm: 2384195, totalWasteKg: 2384.20 },
  { id: 28, gpName: 'Sarei', totalHouseholds: 1420, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 92882, monthlyWasteTotalGm: 2786466, totalWasteKg: 2786.47 },
  { id: 29, gpName: 'Karanjia', totalHouseholds: 1159, schools: 9, anganwadis: 7, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 75810, monthlyWasteTotalGm: 2274306, totalWasteKg: 2274.31 },
  { id: 30, gpName: 'Chandrasekharpur', totalHouseholds: 937, schools: 11, anganwadis: 5, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 61289, monthlyWasteTotalGm: 1838675, totalWasteKg: 1838.68 },
  { id: 31, gpName: 'Kashipal', totalHouseholds: 527, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 34471, monthlyWasteTotalGm: 1034132, totalWasteKg: 1034.13 },
  { id: 32, gpName: 'Padua', totalHouseholds: 1016, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 66457, monthlyWasteTotalGm: 1993697, totalWasteKg: 1993.70 },
  { id: 33, gpName: 'Uchabali', totalHouseholds: 939, schools: 10, anganwadis: 9, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 61420, monthlyWasteTotalGm: 1842600, totalWasteKg: 1842.60 },
  { id: 34, gpName: 'Jyotipur', totalHouseholds: 747, schools: 8, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 48861, monthlyWasteTotalGm: 1465838, totalWasteKg: 1465.84 },
  { id: 35, gpName: 'Bhuinpur', totalHouseholds: 791, schools: 14, anganwadis: 10, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 51739, monthlyWasteTotalGm: 1552179, totalWasteKg: 1552.18 },
  { id: 36, gpName: 'Jally', totalHouseholds: 774, schools: 11, anganwadis: 6, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 50627, monthlyWasteTotalGm: 1518820, totalWasteKg: 1518.82 },
  { id: 37, gpName: 'Sadangi', totalHouseholds: 993, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 64952, monthlyWasteTotalGm: 1948564, totalWasteKg: 1948.56 },
  { id: 38, gpName: 'Jajaposi', totalHouseholds: 1167, schools: 15, anganwadis: 8, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 76333, monthlyWasteTotalGm: 2290004, totalWasteKg: 2290.00 },
  { id: 39, gpName: 'Bhanda', totalHouseholds: 972, schools: 11, anganwadis: 6, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 63579, monthlyWasteTotalGm: 1907356, totalWasteKg: 1907.36 },
  { id: 40, gpName: 'Rangamatia', totalHouseholds: 1230, schools: 11, anganwadis: 9, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 80454, monthlyWasteTotalGm: 2413629, totalWasteKg: 2413.63 },

  // Joda
  { id: 41, gpName: 'BOLANI', totalHouseholds: 809, schools: 12, anganwadis: 18, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 52917, monthlyWasteTotalGm: 1587501, totalWasteKg: 1587.50 },
  { id: 42, gpName: 'BALAGODA', totalHouseholds: 140, schools: 3, anganwadis: 9, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 9157, monthlyWasteTotalGm: 274722, totalWasteKg: 274.72 },
  { id: 43, gpName: 'KARAKHENDRA', totalHouseholds: 127, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 8307, monthlyWasteTotalGm: 249212, totalWasteKg: 249.21 },
  { id: 44, gpName: 'SERENDA', totalHouseholds: 783, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 51216, monthlyWasteTotalGm: 1536481, totalWasteKg: 1536.48 },
  { id: 45, gpName: 'JAJANGA', totalHouseholds: 769, schools: 8, anganwadis: 18, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 50300, monthlyWasteTotalGm: 1509009, totalWasteKg: 1509.01 },
  { id: 46, gpName: 'JALAHARI', totalHouseholds: 370, schools: 4, anganwadis: 11, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 24202, monthlyWasteTotalGm: 726051, totalWasteKg: 726.05 },
  { id: 47, gpName: 'JURUDI', totalHouseholds: 74, schools: 1, anganwadis: 1, panchayatGhar: 1, commercial: 3, dailyWasteTotalGm: 4840, monthlyWasteTotalGm: 145210, totalWasteKg: 145.21 },
  { id: 48, gpName: 'PALASA', totalHouseholds: 328, schools: 10, anganwadis: 16, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 21454, monthlyWasteTotalGm: 643634, totalWasteKg: 643.63 },
  { id: 49, gpName: 'BALADA', totalHouseholds: 192, schools: 11, anganwadis: 13, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 12559, monthlyWasteTotalGm: 376762, totalWasteKg: 376.76 },
  { id: 50, gpName: 'BADAKALIMATI', totalHouseholds: 570, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 37284, monthlyWasteTotalGm: 1118511, totalWasteKg: 1118.51 },
  { id: 51, gpName: 'BHADRASAHI', totalHouseholds: 962, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 62924, monthlyWasteTotalGm: 1887733, totalWasteKg: 1887.73 },
  { id: 52, gpName: 'BIRIKALA', totalHouseholds: 513, schools: 12, anganwadis: 13, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 33555, monthlyWasteTotalGm: 1006660, totalWasteKg: 1006.66 },
  { id: 53, gpName: 'DEOJHAR', totalHouseholds: 1119, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 73194, monthlyWasteTotalGm: 2195814, totalWasteKg: 2195.81 },
  { id: 54, gpName: 'KANDRA', totalHouseholds: 1193, schools: 10, anganwadis: 13, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 78034, monthlyWasteTotalGm: 2341024, totalWasteKg: 2341.02 },
  { id: 55, gpName: 'ASENIKALA', totalHouseholds: 1388, schools: 11, anganwadis: 12, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 90789, monthlyWasteTotalGm: 2723672, totalWasteKg: 2723.67 },
  { id: 56, gpName: 'CHAMAKPUR', totalHouseholds: 632, schools: 12, anganwadis: 11, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 41339, monthlyWasteTotalGm: 1240174, totalWasteKg: 1240.17 },
  { id: 57, gpName: 'GUALI', totalHouseholds: 873, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 57103, monthlyWasteTotalGm: 1713088, totalWasteKg: 1713.09 },
  { id: 58, gpName: 'LOIDAPADA', totalHouseholds: 882, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 57692, monthlyWasteTotalGm: 1730749, totalWasteKg: 1730.75 },
  { id: 59, gpName: 'BHUINROIDA', totalHouseholds: 383, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 25052, monthlyWasteTotalGm: 751561, totalWasteKg: 751.56 },

  // Kendujhar Sadar
  { id: 60, gpName: 'Janardanpur', totalHouseholds: 873, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 57103, monthlyWasteTotalGm: 1713088, totalWasteKg: 1713.09 },
  { id: 61, gpName: 'Raisuan', totalHouseholds: 1112, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 72736, monthlyWasteTotalGm: 2182078, totalWasteKg: 2182.08 },
  { id: 62, gpName: 'Gopinathpur', totalHouseholds: 871, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 56972, monthlyWasteTotalGm: 1709163, totalWasteKg: 1709.16 },
  { id: 63, gpName: 'Mahadeijoda', totalHouseholds: 1236, schools: 13, anganwadis: 11, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 80847, monthlyWasteTotalGm: 2425403, totalWasteKg: 2425.40 },
  { id: 64, gpName: 'Baradapal', totalHouseholds: 663, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 43367, monthlyWasteTotalGm: 1301005, totalWasteKg: 1301.01 },
  { id: 65, gpName: 'Nuagaon', totalHouseholds: 1757, schools: 15, anganwadis: 14, panchayatGhar: 1, commercial: 36, dailyWasteTotalGm: 114925, monthlyWasteTotalGm: 3447761, totalWasteKg: 3447.76 },
  { id: 66, gpName: 'Parjanpur', totalHouseholds: 1093, schools: 15, anganwadis: 12, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 71493, monthlyWasteTotalGm: 2144794, totalWasteKg: 2144.79 },
  { id: 67, gpName: 'Kandaraposi', totalHouseholds: 1569, schools: 14, anganwadis: 12, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 102628, monthlyWasteTotalGm: 3078849, totalWasteKg: 3078.85 },
  { id: 68, gpName: 'Palasapanga', totalHouseholds: 1117, schools: 11, anganwadis: 10, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 73063, monthlyWasteTotalGm: 2191889, totalWasteKg: 2191.89 },
  { id: 69, gpName: 'Padampur', totalHouseholds: 1362, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 89088, monthlyWasteTotalGm: 2672653, totalWasteKg: 2672.65 },
  { id: 70, gpName: 'Gobardhan', totalHouseholds: 1215, schools: 10, anganwadis: 9, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 79473, monthlyWasteTotalGm: 2384195, totalWasteKg: 2384.20 },
  { id: 71, gpName: 'Kaunrikala', totalHouseholds: 969, schools: 9, anganwadis: 7, panchayatGhar: 1, commercial: 32, dailyWasteTotalGm: 63382, monthlyWasteTotalGm: 1901469, totalWasteKg: 1901.47 },
  { id: 72, gpName: 'Sankiri', totalHouseholds: 866, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 56645, monthlyWasteTotalGm: 1699352, totalWasteKg: 1699.35 },
  { id: 73, gpName: 'Handibhanga', totalHouseholds: 1437, schools: 12, anganwadis: 13, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 93994, monthlyWasteTotalGm: 2819825, totalWasteKg: 2819.83 },
  { id: 74, gpName: 'Raikala', totalHouseholds: 1282, schools: 13, anganwadis: 12, panchayatGhar: 1, commercial: 32, dailyWasteTotalGm: 83856, monthlyWasteTotalGm: 2515669, totalWasteKg: 2515.67 },
  { id: 75, gpName: 'Bauripada', totalHouseholds: 1639, schools: 10, anganwadis: 15, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 107207, monthlyWasteTotalGm: 3216210, totalWasteKg: 3216.21 },
  { id: 76, gpName: 'Bodapalasa', totalHouseholds: 1216, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 79539, monthlyWasteTotalGm: 2386157, totalWasteKg: 2386.16 },
  { id: 77, gpName: 'Sirispal', totalHouseholds: 1793, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 117280, monthlyWasteTotalGm: 3518404, totalWasteKg: 3518.40 },
  { id: 78, gpName: 'Naranpur', totalHouseholds: 2205, schools: 18, anganwadis: 15, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 144229, monthlyWasteTotalGm: 4326872, totalWasteKg: 4326.87 },
  { id: 79, gpName: 'Raghunathpur', totalHouseholds: 1694, schools: 16, anganwadis: 16, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 110805, monthlyWasteTotalGm: 3324136, totalWasteKg: 3324.14 },
  { id: 80, gpName: 'Kathabari', totalHouseholds: 915, schools: 9, anganwadis: 8, panchayatGhar: 1, commercial: 34, dailyWasteTotalGm: 59850, monthlyWasteTotalGm: 1795505, totalWasteKg: 1795.51 },
  { id: 81, gpName: 'Maidankel', totalHouseholds: 1375, schools: 12, anganwadis: 9, panchayatGhar: 1, commercial: 36, dailyWasteTotalGm: 89939, monthlyWasteTotalGm: 2698163, totalWasteKg: 2698.16 },
  { id: 82, gpName: 'Dimbo', totalHouseholds: 1616, schools: 13, anganwadis: 15, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 105703, monthlyWasteTotalGm: 3171077, totalWasteKg: 3171.08 },
  { id: 83, gpName: 'Nelung', totalHouseholds: 1141, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 74633, monthlyWasteTotalGm: 2238984, totalWasteKg: 2238.98 },
  { id: 84, gpName: 'Mandua', totalHouseholds: 1250, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 81763, monthlyWasteTotalGm: 2452875, totalWasteKg: 2452.88 },
];
