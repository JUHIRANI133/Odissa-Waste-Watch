
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
  // Block Umerkote
  { id: 1, gpName: 'ANCHALA', totalHouseholds: 907, schools: 9, anganwadis: 7, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 166416.36, monthlyWasteTotalGm: 4992490.8, totalWasteKg: 166.42, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 2, gpName: 'BADABHARANDI', totalHouseholds: 2544, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 466773.12, monthlyWasteTotalGm: 14003193.6, totalWasteKg: 466.77, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 3, gpName: 'BADAKUMARI', totalHouseholds: 1950, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 357786.00, monthlyWasteTotalGm: 10733580.0, totalWasteKg: 357.79, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 4, gpName: 'BAKODA', totalHouseholds: 2437, schools: 12, anganwadis: 13, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 447140.76, monthlyWasteTotalGm: 13414222.8, totalWasteKg: 447.14, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 5, gpName: 'BEHEDA', totalHouseholds: 1902, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 348978.96, monthlyWasteTotalGm: 10469368.8, totalWasteKg: 348.98, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 6, gpName: 'BENORA', totalHouseholds: 1952, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 358152.96, monthlyWasteTotalGm: 10744588.8, totalWasteKg: 358.15, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 7, gpName: 'BHAMINI', totalHouseholds: 2788, schools: 14, anganwadis: 12, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 511542.24, monthlyWasteTotalGm: 15346267.2, totalWasteKg: 511.54, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 8, gpName: 'BHANDARIGUDA', totalHouseholds: 1881, schools: 11, anganwadis: 10, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 345125.88, monthlyWasteTotalGm: 10353776.4, totalWasteKg: 345.13, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 9, gpName: 'BURJA', totalHouseholds: 2533, schools: 5, anganwadis: 13, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 464754.84, monthlyWasteTotalGm: 13942645.2, totalWasteKg: 464.75, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 10, gpName: 'CHIKALAPADAR', totalHouseholds: 1585, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 100, dailyWasteTotalGm: 290815.80, monthlyWasteTotalGm: 8724474.0, totalWasteKg: 290.82, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 11, gpName: 'HIRAPUR', totalHouseholds: 1990, schools: 5, anganwadis: 4, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 365125.20, monthlyWasteTotalGm: 10953756.0, totalWasteKg: 365.13, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 12, gpName: 'JAMRONDA', totalHouseholds: 1890, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 346777.20, monthlyWasteTotalGm: 10403316.0, totalWasteKg: 346.78, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 13, gpName: 'KARAGAM', totalHouseholds: 2304, schools: 12, anganwadis: 10, panchayatGhar: 1, commercial: 80, dailyWasteTotalGm: 422737.92, monthlyWasteTotalGm: 12682137.6, totalWasteKg: 422.74, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 14, gpName: 'KHANDA', totalHouseholds: 1727, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 316869.96, monthlyWasteTotalGm: 9506098.8, totalWasteKg: 316.87, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 15, gpName: 'KOPENA', totalHouseholds: 1974, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 362189.52, monthlyWasteTotalGm: 10865685.6, totalWasteKg: 362.19, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 16, gpName: 'KURSHI', totalHouseholds: 1294, schools: 5, anganwadis: 3, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 237423.12, monthlyWasteTotalGm: 7122693.6, totalWasteKg: 237.42, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 17, gpName: 'MUNDIGUDA', totalHouseholds: 973, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 178526.04, monthlyWasteTotalGm: 5355781.2, totalWasteKg: 178.53, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 18, gpName: 'MURTUMMA', totalHouseholds: 1892, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 347144.16, monthlyWasteTotalGm: 10414324.8, totalWasteKg: 347.14, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 19, gpName: 'NEHURA', totalHouseholds: 1564, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 286962.72, monthlyWasteTotalGm: 8608881.6, totalWasteKg: 286.96, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 20, gpName: 'RAJPUR', totalHouseholds: 2087, schools: 13, anganwadis: 11, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 382922.76, monthlyWasteTotalGm: 11487682.8, totalWasteKg: 382.92, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 21, gpName: 'SEMALA', totalHouseholds: 1995, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 366042.60, monthlyWasteTotalGm: 10981278.0, totalWasteKg: 366.04, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 22, gpName: 'SINGISARI', totalHouseholds: 1913, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 350997.24, monthlyWasteTotalGm: 10529917.2, totalWasteKg: 351.00, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 23, gpName: 'SUKHIGAM A/C', totalHouseholds: 784, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 143848.32, monthlyWasteTotalGm: 4315449.6, totalWasteKg: 143.85, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 24, gpName: 'SUNABEDA', totalHouseholds: 1624, schools: 11, anganwadis: 12, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 297971.52, monthlyWasteTotalGm: 8939145.6, totalWasteKg: 297.97, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 25, gpName: 'TOHARA', totalHouseholds: 2190, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 40, dailyWasteTotalGm: 401821.20, monthlyWasteTotalGm: 12054636.0, totalWasteKg: 401.82, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 26, gpName: 'TORENGA', totalHouseholds: 1348, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 30, dailyWasteTotalGm: 247331.04, monthlyWasteTotalGm: 7419931.2, totalWasteKg: 247.33, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },

  // Block Nabarangpur
  { id: 27, gpName: 'AGNIPUR', totalHouseholds: 1788, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 110, dailyWasteTotalGm: 328062.24, monthlyWasteTotalGm: 9841867.2, totalWasteKg: 328.06, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 28, gpName: 'BADAMASIGAM', totalHouseholds: 1248, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 42, dailyWasteTotalGm: 228983.04, monthlyWasteTotalGm: 6869491.2, totalWasteKg: 228.98, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 29, gpName: 'BAGHASIUNI', totalHouseholds: 2497, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 52, dailyWasteTotalGm: 458149.56, monthlyWasteTotalGm: 13744486.8, totalWasteKg: 458.15, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 30, gpName: 'BASINI', totalHouseholds: 1544, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 283293.12, monthlyWasteTotalGm: 8498793.6, totalWasteKg: 283.29, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 31, gpName: 'BHATRASIUNI', totalHouseholds: 1125, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 206415.00, monthlyWasteTotalGm: 6192450.0, totalWasteKg: 206.42, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 32, gpName: 'BIKRAMPUR', totalHouseholds: 1053, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 193204.44, monthlyWasteTotalGm: 5796133.2, totalWasteKg: 193.20, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 33, gpName: 'BADAKUMULI', totalHouseholds: 1861, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 62, dailyWasteTotalGm: 341456.28, monthlyWasteTotalGm: 10243688.4, totalWasteKg: 341.46, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 34, gpName: 'CHATAHANDI', totalHouseholds: 2394, schools: 16, anganwadis: 21, panchayatGhar: 1, commercial: 73, dailyWasteTotalGm: 439251.12, monthlyWasteTotalGm: 13177533.6, totalWasteKg: 439.25, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 35, gpName: 'MANTRIGUA', totalHouseholds: 1321, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 242377.08, monthlyWasteTotalGm: 7271312.4, totalWasteKg: 242.38, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 36, gpName: 'PUJARIGUDA', totalHouseholds: 1538, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 43, dailyWasteTotalGm: 282192.24, monthlyWasteTotalGm: 8465767.2, totalWasteKg: 282.19, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 37, gpName: 'SANAMASIGAM', totalHouseholds: 1421, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 260725.08, monthlyWasteTotalGm: 7821752.4, totalWasteKg: 260.73, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 38, gpName: 'SINDHIGAM', totalHouseholds: 1319, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 50, dailyWasteTotalGm: 242010.12, monthlyWasteTotalGm: 7260303.6, totalWasteKg: 242.01, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
  { id: 39, gpName: 'TARAGAM', totalHouseholds: 1575, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 26, dailyWasteTotalGm: 288981.00, monthlyWasteTotalGm: 8669430.0, totalWasteKg: 288.98, perHouseholdDayGm: 183.48, perHouseholdMonthGm: 5504.4 },
];
