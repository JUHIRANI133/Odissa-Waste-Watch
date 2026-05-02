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
  perHouseholdDayGm: number;
  perHouseholdMonthGm: number;
}

export const wasteGenerationData: WasteGenerationData[] = [
  // Block BOUDH
  { id: 1, gpName: 'Ainlapali', totalHouseholds: 1449, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 82158, monthlyWasteTotalGm: 2464749, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2464.75 },
  { id: 2, gpName: 'Badhigaon', totalHouseholds: 1825, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 103478, monthlyWasteTotalGm: 3104325, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3104.33 },
  { id: 3, gpName: 'Bahira', totalHouseholds: 1862, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 105575, monthlyWasteTotalGm: 3167262, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3167.26 },
  { id: 4, gpName: 'Baunsuni', totalHouseholds: 1945, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 110282, monthlyWasteTotalGm: 3308445, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3308.45 },
  { id: 5, gpName: 'Khaliapali', totalHouseholds: 1220, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 69174, monthlyWasteTotalGm: 2075220, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2075.22 },
  { id: 6, gpName: 'Khuntabandha', totalHouseholds: 1652, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 93668, monthlyWasteTotalGm: 2810052, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2810.05 },
  { id: 7, gpName: 'Laxmiprasad', totalHouseholds: 1442, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 81761, monthlyWasteTotalGm: 2452842, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2452.84 },
  { id: 8, gpName: 'Manupali', totalHouseholds: 1633, schools: 12, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 92591, monthlyWasteTotalGm: 2777733, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2777.73 },
  { id: 9, gpName: 'Mundipadar', totalHouseholds: 1835, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 104045, monthlyWasteTotalGm: 3121335, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3121.34 },
  { id: 10, gpName: 'Murusundhi', totalHouseholds: 1826, schools: 11, anganwadis: 10, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 103534, monthlyWasteTotalGm: 3106026, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3106.03 },
  { id: 11, gpName: 'Padmanpur', totalHouseholds: 1546, schools: 10, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 87658, monthlyWasteTotalGm: 2629746, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2629.75 },
  { id: 12, gpName: 'Roxa', totalHouseholds: 1668, schools: 13, anganwadis: 11, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 94576, monthlyWasteTotalGm: 2837268, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2837.27 },
  { id: 13, gpName: 'Talasarada', totalHouseholds: 2072, schools: 14, anganwadis: 11, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 117482, monthlyWasteTotalGm: 3524472, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3524.47 },
  { id: 14, gpName: 'Telibandha', totalHouseholds: 1700, schools: 11, anganwadis: 10, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 96390, monthlyWasteTotalGm: 2891700, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2891.70 },

  // Block HARABHANGA
  { id: 15, gpName: 'Bamanda', totalHouseholds: 1838, schools: 15, anganwadis: 12, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 104215, monthlyWasteTotalGm: 3126438, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3126.44 },
  { id: 16, gpName: 'Bandhapathar', totalHouseholds: 1277, schools: 9, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 72406, monthlyWasteTotalGm: 2172177, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2172.18 },
  { id: 17, gpName: 'Biranar Asinghpur', totalHouseholds: 1706, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 96730, monthlyWasteTotalGm: 2901906, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2901.91 },
  { id: 18, gpName: 'Lunibahal', totalHouseholds: 1452, schools: 13, anganwadis: 12, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 82328, monthlyWasteTotalGm: 2469852, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2469.85 },
  { id: 19, gpName: 'Mathura', totalHouseholds: 1158, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 65659, monthlyWasteTotalGm: 1969758, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 1969.76 },
  { id: 20, gpName: 'Pitambpur', totalHouseholds: 1013, schools: 8, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 57437, monthlyWasteTotalGm: 1723113, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 1723.11 },
  { id: 21, gpName: 'Purunakatak', totalHouseholds: 1543, schools: 12, anganwadis: 10, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 87488, monthlyWasteTotalGm: 2624643, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 2624.64 },
  { id: 22, gpName: 'Radhanagar', totalHouseholds: 1039, schools: 9, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 58911, monthlyWasteTotalGm: 1767339, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 1767.34 },
  { id: 23, gpName: 'Sarasara', totalHouseholds: 1877, schools: 13, anganwadis: 12, panchayatGhar: 1, commercial: 28, dailyWasteTotalGm: 106426, monthlyWasteTotalGm: 3192777, perHouseholdDayGm: 56.70, perHouseholdMonthGm: 1701.00, totalWasteKg: 3192.78 },
];
