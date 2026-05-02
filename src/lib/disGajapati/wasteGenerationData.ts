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
  // Paralakhemundi Municipality (Daily: 330g/HH, Monthly: 9900g/HH)
  { 
    id: 1, 
    gpName: 'Ranipeta', 
    totalHouseholds: 1216, 
    schools: 22, 
    anganwadis: 23, 
    panchayatGhar: 4, 
    commercial: 81, 
    perHouseholdDayGm: 330,
    perHouseholdMonthGm: 9900,
    dailyWasteTotalGm: 401280, 
    monthlyWasteTotalGm: 12038400,
    totalWasteKg: 12038.4
  },
  { 
    id: 2, 
    gpName: 'Jhami', 
    totalHouseholds: 696, 
    schools: 22, 
    anganwadis: 23, 
    panchayatGhar: 4, 
    commercial: 81, 
    perHouseholdDayGm: 330,
    perHouseholdMonthGm: 9900,
    dailyWasteTotalGm: 229680, 
    monthlyWasteTotalGm: 6890400,
    totalWasteKg: 6890.4
  },
  { 
    id: 3, 
    gpName: 'Kerandi', 
    totalHouseholds: 535, 
    schools: 22, 
    anganwadis: 23, 
    panchayatGhar: 4, 
    commercial: 81, 
    perHouseholdDayGm: 330,
    perHouseholdMonthGm: 9900,
    dailyWasteTotalGm: 176550, 
    monthlyWasteTotalGm: 5296500,
    totalWasteKg: 5296.5
  },
  { 
    id: 4, 
    gpName: 'Kathalakaita', 
    totalHouseholds: 390, 
    schools: 22, 
    anganwadis: 23, 
    panchayatGhar: 4, 
    commercial: 81, 
    perHouseholdDayGm: 330,
    perHouseholdMonthGm: 9900,
    dailyWasteTotalGm: 128700, 
    monthlyWasteTotalGm: 3861000,
    totalWasteKg: 3861.0
  },

  // Kasinagar NAC (Daily: 348g/HH, Monthly: 10440g/HH)
  { 
    id: 5, 
    gpName: 'Goribandha', 
    totalHouseholds: 980, 
    schools: 18, 
    anganwadis: 20, 
    panchayatGhar: 3, 
    commercial: 31, 
    perHouseholdDayGm: 348,
    perHouseholdMonthGm: 10440,
    dailyWasteTotalGm: 341040, 
    monthlyWasteTotalGm: 10231200,
    totalWasteKg: 10231.2
  },
  { 
    id: 6, 
    gpName: 'Budura', 
    totalHouseholds: 20, 
    schools: 18, 
    anganwadis: 20, 
    panchayatGhar: 3, 
    commercial: 31, 
    perHouseholdDayGm: 348,
    perHouseholdMonthGm: 10440,
    dailyWasteTotalGm: 6960, 
    monthlyWasteTotalGm: 208800,
    totalWasteKg: 208.8
  },
  { 
    id: 7, 
    gpName: 'Kidigam', 
    totalHouseholds: 976, 
    schools: 18, 
    anganwadis: 20, 
    panchayatGhar: 3, 
    commercial: 31, 
    perHouseholdDayGm: 348,
    perHouseholdMonthGm: 10440,
    dailyWasteTotalGm: 339648, 
    monthlyWasteTotalGm: 10189440,
    totalWasteKg: 10189.44
  },
];
