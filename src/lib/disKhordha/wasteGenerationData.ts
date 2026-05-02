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
  { id: 1, gpName: 'BALIANTA', totalHouseholds: 1663, schools: 10, anganwadis: 16, panchayatGhar: 1, commercial: 160, dailyWasteTotalGm: 324135.33, monthlyWasteTotalGm: 9724059.9, totalWasteKg: 9724.06 },
  { id: 2, gpName: 'BENTAPUR', totalHouseholds: 711, schools: 2, anganwadis: 5, panchayatGhar: 1, commercial: 80, dailyWasteTotalGm: 138581.01, monthlyWasteTotalGm: 4157430.3, totalWasteKg: 4157.43 },
  { id: 3, gpName: 'BHINGARPUR', totalHouseholds: 1817, schools: 7, anganwadis: 13, panchayatGhar: 1, commercial: 70, dailyWasteTotalGm: 354151.47, monthlyWasteTotalGm: 10624544.1, totalWasteKg: 10624.54 },
  { id: 4, gpName: 'JAGANNATHPUR', totalHouseholds: 1483, schools: 9, anganwadis: 12, panchayatGhar: 0, commercial: 160, dailyWasteTotalGm: 289051.53, monthlyWasteTotalGm: 8671545.9, totalWasteKg: 8671.54 },
  { id: 5, gpName: 'BAINCHUA', totalHouseholds: 1198, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 233502.18, monthlyWasteTotalGm: 7005065.4, totalWasteKg: 7005.06 },
  { id: 6, gpName: 'PRATAPSASAN', totalHouseholds: 1923, schools: 9, anganwadis: 16, panchayatGhar: 1, commercial: 320, dailyWasteTotalGm: 374811.93, monthlyWasteTotalGm: 11244357.9, totalWasteKg: 11244.35 },
  { id: 7, gpName: 'PURANPRADHAN', totalHouseholds: 1775, schools: 10, anganwadis: 14, panchayatGhar: 1, commercial: 66, dailyWasteTotalGm: 345965.25, monthlyWasteTotalGm: 10378957.5, totalWasteKg: 10378.95 },
  { id: 8, gpName: 'SARAKANA', totalHouseholds: 1459, schools: 5, anganwadis: 13, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 284373.69, monthlyWasteTotalGm: 8531210.7, totalWasteKg: 8531.21 },
  { id: 9, gpName: 'SATYABHAMAPUR', totalHouseholds: 738, schools: 3, anganwadis: 8, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 143843.58, monthlyWasteTotalGm: 4315307.4, totalWasteKg: 4315.30 },
  { id: 10, gpName: 'UMADEIBERHAMPUR', totalHouseholds: 693, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 58, dailyWasteTotalGm: 135072.63, monthlyWasteTotalGm: 4052178.9, totalWasteKg: 4052.17 },
  { id: 11, gpName: 'BHAPUR', totalHouseholds: 1096, schools: 5, anganwadis: 9, panchayatGhar: 1, commercial: 72, dailyWasteTotalGm: 213621.36, monthlyWasteTotalGm: 6408640.8, totalWasteKg: 6408.64 },
  { id: 12, gpName: 'GAMBHARIMUNDA', totalHouseholds: 1503, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 215, dailyWasteTotalGm: 292949.73, monthlyWasteTotalGm: 8788491.9, totalWasteKg: 8788.49 },
  { id: 13, gpName: 'NACHUNI', totalHouseholds: 1703, schools: 13, anganwadis: 13, panchayatGhar: 1, commercial: 235, dailyWasteTotalGm: 331931.73, monthlyWasteTotalGm: 9957951.9, totalWasteKg: 9957.95 },
  { id: 14, gpName: 'SARUA', totalHouseholds: 950, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 88, dailyWasteTotalGm: 185164.5, monthlyWasteTotalGm: 5554935, totalWasteKg: 5554.93 },
  { id: 15, gpName: 'BAGHAMARI', totalHouseholds: 1404, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 110, dailyWasteTotalGm: 273653.64, monthlyWasteTotalGm: 8209609.2, totalWasteKg: 8209.60 },
  { id: 16, gpName: 'BASUAGHAI', totalHouseholds: 1110, schools: 8, anganwadis: 11, panchayatGhar: 1, commercial: 217, dailyWasteTotalGm: 216350.1, monthlyWasteTotalGm: 6490503, totalWasteKg: 6490.50 },
  { id: 17, gpName: 'SISUPALGARH', totalHouseholds: 1000, schools: 2, anganwadis: 6, panchayatGhar: 1, commercial: 187, dailyWasteTotalGm: 194910, monthlyWasteTotalGm: 5847300, totalWasteKg: 5847.30 },
  { id: 18, gpName: 'DHAULI', totalHouseholds: 931, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 241, dailyWasteTotalGm: 181461.21, monthlyWasteTotalGm: 5443836.3, totalWasteKg: 5443.83 },
  { id: 19, gpName: 'ITIPUR', totalHouseholds: 994, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: 31, dailyWasteTotalGm: 193740.54, monthlyWasteTotalGm: 5812216.2, totalWasteKg: 5812.21 },
  { id: 20, gpName: 'LINGIPUR', totalHouseholds: 1223, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 265, dailyWasteTotalGm: 238374.93, monthlyWasteTotalGm: 7151247.9, totalWasteKg: 7151.24 },
  { id: 21, gpName: 'TIKARAPADA', totalHouseholds: 794, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 154758.54, monthlyWasteTotalGm: 4642756.2, totalWasteKg: 4642.75 },
  { id: 22, gpName: 'BARIMUNDA', totalHouseholds: 1063, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 65, dailyWasteTotalGm: 207189.33, monthlyWasteTotalGm: 6215679.9, totalWasteKg: 6215.67 },
  { id: 23, gpName: 'KALYANPUR', totalHouseholds: 1608, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 53, dailyWasteTotalGm: 313415.28, monthlyWasteTotalGm: 9402458.4, totalWasteKg: 9402.45 },
  { id: 24, gpName: 'DADHA', totalHouseholds: 1552, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 86, dailyWasteTotalGm: 302500.32, monthlyWasteTotalGm: 9075009.6, totalWasteKg: 9075.00 },
  { id: 25, gpName: 'INJANA', totalHouseholds: 609, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 103, dailyWasteTotalGm: 118700.19, monthlyWasteTotalGm: 3561005.7, totalWasteKg: 3561.00 },
  { id: 26, gpName: 'RAGHUNATHPUR', totalHouseholds: 1476, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 547, dailyWasteTotalGm: 287687.16, monthlyWasteTotalGm: 8630614.8, totalWasteKg: 8630.61 },
  { id: 27, gpName: 'ANDHARUA', totalHouseholds: 1482, schools: 6, anganwadis: 13, panchayatGhar: 1, commercial: 63, dailyWasteTotalGm: 288856.62, monthlyWasteTotalGm: 8665698.6, totalWasteKg: 8665.69 },
  { id: 28, gpName: 'MALIPADA', totalHouseholds: 1353, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 261, dailyWasteTotalGm: 263713.23, monthlyWasteTotalGm: 7911396.9, totalWasteKg: 7911.39 },
  { id: 29, gpName: 'CHANDAKA', totalHouseholds: 1763, schools: 9, anganwadis: 15, panchayatGhar: 1, commercial: 117, dailyWasteTotalGm: 343626.33, monthlyWasteTotalGm: 10308789.9, totalWasteKg: 10308.78 },
  { id: 30, gpName: 'KANTABADA', totalHouseholds: 1040, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 135, dailyWasteTotalGm: 202706.4, monthlyWasteTotalGm: 6081192, totalWasteKg: 6081.19 },
  { id: 31, gpName: 'DARUTHENGA', totalHouseholds: 1523, schools: 8, anganwadis: 13, panchayatGhar: 1, commercial: 71, dailyWasteTotalGm: 296847.93, monthlyWasteTotalGm: 8905437.9, totalWasteKg: 8905.43 },
  { id: 32, gpName: 'RANSINGHPUR', totalHouseholds: 1455, schools: 5, anganwadis: 9, panchayatGhar: 1, commercial: 137, dailyWasteTotalGm: 283594.05, monthlyWasteTotalGm: 8507821.5, totalWasteKg: 8507.82 },
  { id: 33, gpName: 'TAMANDO', totalHouseholds: 1113, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 187, dailyWasteTotalGm: 216934.83, monthlyWasteTotalGm: 6508044.9, totalWasteKg: 6508.04 },
  { id: 34, gpName: 'NANPUT', totalHouseholds: 571, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 109, dailyWasteTotalGm: 111293.61, monthlyWasteTotalGm: 3338808.3, totalWasteKg: 3338.80 },
  { id: 35, gpName: 'MENDHASAL', totalHouseholds: 1339, schools: 4, anganwadis: 10, panchayatGhar: 1, commercial: 87, dailyWasteTotalGm: 260984.49, monthlyWasteTotalGm: 7829534.7, totalWasteKg: 7829.53 },
  { id: 36, gpName: 'DUNGAMAL', totalHouseholds: 926, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 180486.66, monthlyWasteTotalGm: 5414599.8, totalWasteKg: 5414.59 },
  { id: 37, gpName: 'BADAKUL', totalHouseholds: 1586, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 309127.26, monthlyWasteTotalGm: 9273817.8, totalWasteKg: 9273.81 },
  { id: 38, gpName: 'JANLA', totalHouseholds: 1436, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 175, dailyWasteTotalGm: 279890.76, monthlyWasteTotalGm: 8396722.8, totalWasteKg: 8396.72 },
  { id: 39, gpName: 'BENAPANJARI', totalHouseholds: 984, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 40, dailyWasteTotalGm: 191791.44, monthlyWasteTotalGm: 5753743.2, totalWasteKg: 5753.74 },
  { id: 40, gpName: 'NALIPADAARJUNPUR', totalHouseholds: 1693, schools: 11, anganwadis: 14, panchayatGhar: 1, commercial: 200, dailyWasteTotalGm: 329982.63, monthlyWasteTotalGm: 9899478.9, totalWasteKg: 9899.47 },
  { id: 41, gpName: 'GADAHALADIA', totalHouseholds: 1761, schools: 10, anganwadis: 13, panchayatGhar: 1, commercial: 100, dailyWasteTotalGm: 343236.51, monthlyWasteTotalGm: 10297095.3, totalWasteKg: 10297.09 },
  { id: 42, gpName: 'BADAPARI', totalHouseholds: 1796, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 350058.36, monthlyWasteTotalGm: 10501750.8, totalWasteKg: 10501.75 },
];
