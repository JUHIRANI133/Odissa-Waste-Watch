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
  // Jajpur Municipality - Kodandapur
  { id: 1, gpName: 'PANASA', totalHouseholds: 1833, schools: 13, anganwadis: 13, panchayatGhar: 1, commercial: 216, dailyWasteTotalGm: 202821.45, monthlyWasteTotalGm: 6084643.50, totalWasteKg: 6084.64 },
  { id: 2, gpName: 'CHAINIPUR', totalHouseholds: 762, schools: 10, anganwadis: 14, panchayatGhar: 1, commercial: 102, dailyWasteTotalGm: 84315.30, monthlyWasteTotalGm: 2529459.00, totalWasteKg: 2529.46 },
  { id: 3, gpName: 'MALANDAPUR', totalHouseholds: 2439, schools: 11, anganwadis: 15, panchayatGhar: 1, commercial: 203, dailyWasteTotalGm: 269875.35, monthlyWasteTotalGm: 8096260.50, totalWasteKg: 8096.26 },
  { id: 4, gpName: 'NATHASAHI', totalHouseholds: 1641, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: 26, dailyWasteTotalGm: 181576.65, monthlyWasteTotalGm: 5447299.50, totalWasteKg: 5447.30 },
  { id: 5, gpName: 'BHUBANESWARPUR', totalHouseholds: 1195, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 52, dailyWasteTotalGm: 132226.75, monthlyWasteTotalGm: 3966802.50, totalWasteKg: 3966.80 },
  { id: 6, gpName: 'JAFARPUR', totalHouseholds: 1358, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 150262.70, monthlyWasteTotalGm: 4507881.00, totalWasteKg: 4507.88 },
  { id: 7, gpName: 'SIMILIA', totalHouseholds: 2279, schools: 10, anganwadis: 18, panchayatGhar: 1, commercial: 104, dailyWasteTotalGm: 252171.35, monthlyWasteTotalGm: 7565140.50, totalWasteKg: 7565.14 },
  { id: 8, gpName: 'BERUDA', totalHouseholds: 1389, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: 65, dailyWasteTotalGm: 153692.85, monthlyWasteTotalGm: 4610785.50, totalWasteKg: 4610.79 },
  { id: 9, gpName: 'BHUINPUR', totalHouseholds: 1436, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: 99, dailyWasteTotalGm: 158893.40, monthlyWasteTotalGm: 4766802.00, totalWasteKg: 4766.80 },
  { id: 10, gpName: 'KHAIRABAD', totalHouseholds: 1326, schools: 4, anganwadis: 10, panchayatGhar: 1, commercial: 55, dailyWasteTotalGm: 146721.90, monthlyWasteTotalGm: 4401657.00, totalWasteKg: 4401.66 },
  { id: 11, gpName: 'SHYAMDASPUR', totalHouseholds: 942, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 104232.30, monthlyWasteTotalGm: 3126969.00, totalWasteKg: 3126.97 },
  { id: 12, gpName: 'ERBANK', totalHouseholds: 1172, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 129681.80, monthlyWasteTotalGm: 3890454.00, totalWasteKg: 3890.45 },
  { id: 13, gpName: 'SUJANPUR', totalHouseholds: 1847, schools: 4, anganwadis: 12, panchayatGhar: 1, commercial: 102, dailyWasteTotalGm: 204370.55, monthlyWasteTotalGm: 6131116.50, totalWasteKg: 6131.12 },
  { id: 14, gpName: 'SAHASPUR', totalHouseholds: 1553, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 171839.45, monthlyWasteTotalGm: 5155183.50, totalWasteKg: 5155.18 },
  { id: 15, gpName: 'CHHATISDEVIL', totalHouseholds: 1603, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 177371.95, monthlyWasteTotalGm: 5321158.50, totalWasteKg: 5321.16 },
  
  // Jajpur Municipality - Jageswarpur
  { id: 16, gpName: 'BICHITRAPUR', totalHouseholds: 1896, schools: 8, anganwadis: 13, panchayatGhar: 1, commercial: 272, dailyWasteTotalGm: 209792.40, monthlyWasteTotalGm: 6293772.00, totalWasteKg: 6293.77 },
  { id: 17, gpName: 'JAHANPUR', totalHouseholds: 1511, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 125, dailyWasteTotalGm: 167192.15, monthlyWasteTotalGm: 5015764.50, totalWasteKg: 5015.76 },
  { id: 18, gpName: 'BASUDEVPUR', totalHouseholds: 1376, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 103, dailyWasteTotalGm: 152254.40, monthlyWasteTotalGm: 4567632.00, totalWasteKg: 4567.63 },
  { id: 19, gpName: 'MARKANDAPUR', totalHouseholds: 1670, schools: 3, anganwadis: 9, panchayatGhar: 1, commercial: 70, dailyWasteTotalGm: 184785.50, monthlyWasteTotalGm: 5543565.00, totalWasteKg: 5543.57 },
  { id: 20, gpName: 'SANASUAR', totalHouseholds: 1637, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 99, dailyWasteTotalGm: 181134.05, monthlyWasteTotalGm: 5434021.50, totalWasteKg: 5434.02 },
  { id: 21, gpName: 'BADASUAR', totalHouseholds: 1166, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 129017.90, monthlyWasteTotalGm: 3870537.00, totalWasteKg: 3870.54 },
  { id: 22, gpName: 'MAHESWARPUR', totalHouseholds: 1935, schools: 7, anganwadis: 16, panchayatGhar: 1, commercial: 115, dailyWasteTotalGm: 214107.75, monthlyWasteTotalGm: 6423232.50, totalWasteKg: 6423.23 },
  { id: 23, gpName: 'UPARBARUHAN', totalHouseholds: 1365, schools: 4, anganwadis: 10, panchayatGhar: 1, commercial: 201, dailyWasteTotalGm: 151037.25, monthlyWasteTotalGm: 4531117.50, totalWasteKg: 4531.12 },
  { id: 24, gpName: 'JAMDHAR', totalHouseholds: 1529, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 55, dailyWasteTotalGm: 169183.85, monthlyWasteTotalGm: 5075515.50, totalWasteKg: 5075.52 },
  { id: 25, gpName: 'JHALPADA', totalHouseholds: 1602, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 65, dailyWasteTotalGm: 177261.30, monthlyWasteTotalGm: 5317839.00, totalWasteKg: 5317.84 },
  { id: 26, gpName: 'RUDRAPUR', totalHouseholds: 901, schools: 5, anganwadis: 9, panchayatGhar: 1, commercial: 68, dailyWasteTotalGm: 99695.65, monthlyWasteTotalGm: 2990869.50, totalWasteKg: 2990.87 },

  // Vysanagar Municipality - Jodabara
  { id: 27, gpName: 'MULAPAL', totalHouseholds: 1225, schools: 10, anganwadis: 8, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 135546.25, monthlyWasteTotalGm: 4066387.50, totalWasteKg: 4066.39 },
  { id: 28, gpName: 'KARADA', totalHouseholds: 1637, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 181134.05, monthlyWasteTotalGm: 5434021.50, totalWasteKg: 5434.02 },
  { id: 29, gpName: 'PATHARAPADA', totalHouseholds: 1199, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 132669.35, monthlyWasteTotalGm: 3980080.50, totalWasteKg: 3980.08 },
  { id: 30, gpName: 'PANIKOILI', totalHouseholds: 1172, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 58, dailyWasteTotalGm: 129681.80, monthlyWasteTotalGm: 3890454.00, totalWasteKg: 3890.45 },
  { id: 31, gpName: 'GOLEIPUR', totalHouseholds: 1393, schools: 13, anganwadis: 13, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 154135.45, monthlyWasteTotalGm: 4624063.50, totalWasteKg: 4624.06 },
  { id: 32, gpName: 'AMRUTIA', totalHouseholds: 1131, schools: 9, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 125145.15, monthlyWasteTotalGm: 3754354.50, totalWasteKg: 3754.35 },
  { id: 33, gpName: 'BANDALO', totalHouseholds: 1282, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 27, dailyWasteTotalGm: 141853.30, monthlyWasteTotalGm: 4255599.00, totalWasteKg: 4255.60 },
  { id: 34, gpName: 'MAKANDAPUR', totalHouseholds: 1213, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 134218.45, monthlyWasteTotalGm: 4026553.50, totalWasteKg: 4026.55 },
  { id: 35, gpName: 'BARUNDEI', totalHouseholds: 811, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: 61, dailyWasteTotalGm: 89737.15, monthlyWasteTotalGm: 2692114.50, totalWasteKg: 2692.11 },
  { id: 36, gpName: 'TARAKOT', totalHouseholds: 709, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 78450.85, monthlyWasteTotalGm: 2353525.50, totalWasteKg: 2353.53 },
  { id: 37, gpName: 'GOURAPUR', totalHouseholds: 1297, schools: 9, anganwadis: 7, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 143513.05, monthlyWasteTotalGm: 4305391.50, totalWasteKg: 4305.39 },
  { id: 38, gpName: 'RANAPUR', totalHouseholds: 635, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 70262.75, monthlyWasteTotalGm: 2107882.50, totalWasteKg: 2107.88 },
  { id: 39, gpName: 'ASANJHAR', totalHouseholds: 739, schools: 7, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 81770.35, monthlyWasteTotalGm: 2453110.50, totalWasteKg: 2453.11 },
  { id: 40, gpName: 'KACHARASAHI', totalHouseholds: 805, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 89073.25, monthlyWasteTotalGm: 2672197.50, totalWasteKg: 2672.20 },
  { id: 41, gpName: 'PACHHIKOTE', totalHouseholds: 1653, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 182904.45, monthlyWasteTotalGm: 5487133.50, totalWasteKg: 5487.13 },
  { id: 42, gpName: 'JANHA', totalHouseholds: 1805, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 199723.25, monthlyWasteTotalGm: 5991697.50, totalWasteKg: 5991.70 },
  { id: 43, gpName: 'KHAMAN', totalHouseholds: 1258, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 52, dailyWasteTotalGm: 139197.70, monthlyWasteTotalGm: 4175931.00, totalWasteKg: 4175.93 },
  { id: 44, gpName: 'TANDARA', totalHouseholds: 439, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 48575.35, monthlyWasteTotalGm: 1457260.50, totalWasteKg: 1457.26 },
  { id: 45, gpName: 'BADABIRUHAN', totalHouseholds: 1167, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 129128.55, monthlyWasteTotalGm: 3873856.50, totalWasteKg: 3873.86 },

  // Vysanagar Municipality - Chandama
  { id: 46, gpName: 'DHANESWAR', totalHouseholds: 2005, schools: 15, anganwadis: 12, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 221853.25, monthlyWasteTotalGm: 6655597.50, totalWasteKg: 6655.60 },
  { id: 47, gpName: 'SADAKPUR', totalHouseholds: 1839, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 203485.35, monthlyWasteTotalGm: 6104560.50, totalWasteKg: 6104.56 },
  { id: 48, gpName: 'HALADIGADIA', totalHouseholds: 229, schools: 8, anganwadis: 3, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 25338.85, monthlyWasteTotalGm: 760165.50, totalWasteKg: 760.17 },
  { id: 49, gpName: 'TULATI', totalHouseholds: 1196, schools: 10, anganwadis: 7, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 132337.40, monthlyWasteTotalGm: 3970122.00, totalWasteKg: 3970.12 },
  { id: 50, gpName: 'KANTORE', totalHouseholds: 1138, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 125919.70, monthlyWasteTotalGm: 3777591.00, totalWasteKg: 3777.59 },
  { id: 51, gpName: 'TAHARPUR', totalHouseholds: 1480, schools: 9, anganwadis: 5, panchayatGhar: 1, commercial: 4, dailyWasteTotalGm: 163762.00, monthlyWasteTotalGm: 4912860.00, totalWasteKg: 4912.86 },
  { id: 52, gpName: 'TALAGARH', totalHouseholds: 1055, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 116735.75, monthlyWasteTotalGm: 3502072.50, totalWasteKg: 3502.07 },
  { id: 53, gpName: 'PATARANGA', totalHouseholds: 883, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 97703.95, monthlyWasteTotalGm: 2931118.50, totalWasteKg: 2931.12 },
  { id: 54, gpName: 'ANDHARI', totalHouseholds: 925, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 31, dailyWasteTotalGm: 102351.25, monthlyWasteTotalGm: 3070537.50, totalWasteKg: 3070.54 }
];
