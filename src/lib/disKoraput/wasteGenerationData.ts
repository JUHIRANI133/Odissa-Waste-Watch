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
  { 
    id: 1, 
    gpName: 'Barniput', 
    totalHouseholds: 1412, 
    schools: 10, 
    anganwadis: 15, 
    panchayatGhar: 1, 
    commercial: 25, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 71616.64, 
    monthlyWasteTotalGm: 2148499.2, 
    totalWasteKg: 2148.5 
  },
  { 
    id: 2, 
    gpName: 'Umuri', 
    totalHouseholds: 1188, 
    schools: 5, 
    anganwadis: 12, 
    panchayatGhar: 1, 
    commercial: 32, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 60255.36, 
    monthlyWasteTotalGm: 1807660.8, 
    totalWasteKg: 1807.66 
  },
  { 
    id: 3, 
    gpName: 'Mathalput', 
    totalHouseholds: 1096, 
    schools: 5, 
    anganwadis: 27, 
    panchayatGhar: 1, 
    commercial: 74, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 55589.12, 
    monthlyWasteTotalGm: 1667673.6, 
    totalWasteKg: 1667.67 
  },
  { 
    id: 4, 
    gpName: 'Badakerenga', 
    totalHouseholds: 1234, 
    schools: 11, 
    anganwadis: 11, 
    panchayatGhar: 1, 
    commercial: 34, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 62588.48, 
    monthlyWasteTotalGm: 1877654.4, 
    totalWasteKg: 1877.65 
  },
  { 
    id: 5, 
    gpName: 'Dhamanahandi', 
    totalHouseholds: 3160, 
    schools: 9, 
    anganwadis: 15, 
    panchayatGhar: 1, 
    commercial: 200, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 160275.2, 
    monthlyWasteTotalGm: 4808256, 
    totalWasteKg: 4808.26 
  },
  { 
    id: 6, 
    gpName: 'Sutipadar', 
    totalHouseholds: 1260, 
    schools: 6, 
    anganwadis: 8, 
    panchayatGhar: 1, 
    commercial: 40, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 63907.2, 
    monthlyWasteTotalGm: 1917216, 
    totalWasteKg: 1917.22 
  },
  { 
    id: 7, 
    gpName: 'Rajpalma', 
    totalHouseholds: 567, 
    schools: 4, 
    anganwadis: 7, 
    panchayatGhar: 1, 
    commercial: 7, 
    perHouseholdDayGm: 50.72, 
    perHouseholdMonthGm: 1521.6, 
    dailyWasteTotalGm: 28758.24, 
    monthlyWasteTotalGm: 862747.2, 
    totalWasteKg: 862.75 
  },
];
