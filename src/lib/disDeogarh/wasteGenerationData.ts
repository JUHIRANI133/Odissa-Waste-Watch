
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
  { id: 1, gpName: 'Badchhapal', totalHouseholds: 1121, totalWasteKg: 3288.005, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 109600, monthlyWasteTotalGm: 3288005 },
  { id: 2, gpName: 'Cheplipalli', totalHouseholds: 1336, totalWasteKg: 3918.622, schools: 11, anganwadis: 17, panchayatGhar: 1, commercial: 53, dailyWasteTotalGm: 130621, monthlyWasteTotalGm: 3918622 },
  { id: 3, gpName: 'Suguda', totalHouseholds: 822, totalWasteKg: 2411.008, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 32, dailyWasteTotalGm: 80367, monthlyWasteTotalGm: 2411008 },
  { id: 4, gpName: 'Baniakilinda', totalHouseholds: 917, totalWasteKg: 2689.653, schools: 10, anganwadis: 11, panchayatGhar: 1, commercial: 74, dailyWasteTotalGm: 89655, monthlyWasteTotalGm: 2689653 },
  { id: 5, gpName: 'Tileibani', totalHouseholds: 1570, totalWasteKg: 4604.967, schools: 13, anganwadis: 17, panchayatGhar: 1, commercial: 57, dailyWasteTotalGm: 153499, monthlyWasteTotalGm: 4604967 },
  { id: 6, gpName: 'Tainsar', totalHouseholds: 1220, totalWasteKg: 3578.382, schools: 14, anganwadis: 19, panchayatGhar: 1, commercial: 48, dailyWasteTotalGm: 119279, monthlyWasteTotalGm: 3578382 },
  { id: 7, gpName: 'Kalanda', totalHouseholds: 733, totalWasteKg: 2149.962, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 48, dailyWasteTotalGm: 71665, monthlyWasteTotalGm: 2149962 },
  { id: 8, gpName: 'Dholpada', totalHouseholds: 989, totalWasteKg: 2900.836, schools: 9, anganwadis: 16, panchayatGhar: 1, commercial: 39, dailyWasteTotalGm: 96695, monthlyWasteTotalGm: 2900836 },
  { id: 9, gpName: 'Dudhianalli', totalHouseholds: 1011, totalWasteKg: 2965.364, schools: 14, anganwadis: 19, panchayatGhar: 1, commercial: 31, dailyWasteTotalGm: 98845, monthlyWasteTotalGm: 2965364 },
  { id: 10, gpName: 'Talkundi', totalHouseholds: 1021, totalWasteKg: 2994.695, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 99823, monthlyWasteTotalGm: 2994695 },
  { id: 11, gpName: 'Sodo', totalHouseholds: 784, totalWasteKg: 2299.55, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 76652, monthlyWasteTotalGm: 2299550 },
  { id: 12, gpName: 'Kansar', totalHouseholds: 1258, totalWasteKg: 3689.84, schools: 8, anganwadis: 16, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 122995, monthlyWasteTotalGm: 3689840 },
  { id: 13, gpName: 'Palkudar', totalHouseholds: 400, totalWasteKg: 1173.24, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 39108, monthlyWasteTotalGm: 1173240 },
  { id: 14, gpName: 'Kendeijhuri', totalHouseholds: 993, totalWasteKg: 2912.568, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 28, dailyWasteTotalGm: 97086, monthlyWasteTotalGm: 2912568 },
  { id: 15, gpName: 'Laimura', totalHouseholds: 1161, totalWasteKg: 3405.329, schools: 11, anganwadis: 27, panchayatGhar: 1, commercial: 102, dailyWasteTotalGm: 113511, monthlyWasteTotalGm: 3405329 },
  { id: 16, gpName: 'Jharmunda', totalHouseholds: 606, totalWasteKg: 1777.459, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 59249, monthlyWasteTotalGm: 1777459 },
  { id: 17, gpName: 'Parposi', totalHouseholds: 671, totalWasteKg: 1968.11, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 65604, monthlyWasteTotalGm: 1968110 },
  { id: 18, gpName: 'Dimirikuda', totalHouseholds: 723, totalWasteKg: 2120.631, schools: 8, anganwadis: 11, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 70688, monthlyWasteTotalGm: 2120631 },
  { id: 19, gpName: 'Gandam', totalHouseholds: 698, totalWasteKg: 2047.304, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: 27, dailyWasteTotalGm: 68243, monthlyWasteTotalGm: 2047304 },
  { id: 20, gpName: 'Jharagogua', totalHouseholds: 853, totalWasteKg: 2501.934, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 83398, monthlyWasteTotalGm: 2501934 },
];
