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
  // Block Jagatsinghpur
  { id: 1, gpName: 'Punanga', totalHouseholds: 909, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 4, dailyWasteTotalGm: 72720, monthlyWasteTotalGm: 2181600, totalWasteKg: 2181.6, perHouseholdDayGm: 80, perHouseholdMonthGm: 2400 },
  { id: 2, gpName: 'Ayar', totalHouseholds: 1082, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 75740, monthlyWasteTotalGm: 2272200, totalWasteKg: 2272.2, perHouseholdDayGm: 70, perHouseholdMonthGm: 2100 },
  { id: 3, gpName: 'Tartanga', totalHouseholds: 879, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 3, dailyWasteTotalGm: 65925, monthlyWasteTotalGm: 1977750, totalWasteKg: 1977.75, perHouseholdDayGm: 75, perHouseholdMonthGm: 2250 },
  // Block Kujanga
  { id: 4, gpName: 'Paradeepgarh', totalHouseholds: 1858, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 148640, monthlyWasteTotalGm: 4459200, totalWasteKg: 4459.2, perHouseholdDayGm: 80, perHouseholdMonthGm: 2400 },
  { id: 5, gpName: 'Nuagarh', totalHouseholds: 1226, schools: 2, anganwadis: 2, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 110340, monthlyWasteTotalGm: 3310200, totalWasteKg: 3310.2, perHouseholdDayGm: 90, perHouseholdMonthGm: 2700 },
  { id: 6, gpName: 'Bagadia', totalHouseholds: 1328, schools: 1, anganwadis: 2, panchayatGhar: 1, commercial: 2, dailyWasteTotalGm: 99600, monthlyWasteTotalGm: 2988000, totalWasteKg: 2988, perHouseholdDayGm: 75, perHouseholdMonthGm: 2250 },
];
