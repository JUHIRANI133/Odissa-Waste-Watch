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
  // Khariar Block
  { id: 1, gpName: 'AREDA', totalHouseholds: 1100, totalWasteKg: 34.5, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 34500, monthlyWasteTotalGm: 1035000 },
  { id: 2, gpName: 'BADDOHEL', totalHouseholds: 800, totalWasteKg: 22.3, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 22300, monthlyWasteTotalGm: 669000 },
  { id: 3, gpName: 'BADI', totalHouseholds: 850, totalWasteKg: 44.2, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 44200, monthlyWasteTotalGm: 1326000 },
  { id: 4, gpName: 'BARGAON', totalHouseholds: 820, totalWasteKg: 38.5, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 38500, monthlyWasteTotalGm: 1155000 },
  { id: 5, gpName: 'BHOJPUR', totalHouseholds: 1050, totalWasteKg: 28.1, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 28100, monthlyWasteTotalGm: 843000 },
  { id: 6, gpName: 'BHULIASIKUAN', totalHouseholds: 880, totalWasteKg: 45.6, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 45600, monthlyWasteTotalGm: 1368000 },
  { id: 7, gpName: 'GARDAMUNDA', totalHouseholds: 850, totalWasteKg: 46.4, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 46400, monthlyWasteTotalGm: 1392000 },
  { id: 8, gpName: 'CHANABEDA', totalHouseholds: 400, totalWasteKg: 20.5, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 20500, monthlyWasteTotalGm: 615000 },
  { id: 9, gpName: 'CHINDAGUDA', totalHouseholds: 1080, totalWasteKg: 24.4, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 24400, monthlyWasteTotalGm: 732000 },
  { id: 10, gpName: 'KENDUPATI', totalHouseholds: 580, totalWasteKg: 18.3, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 18300, monthlyWasteTotalGm: 549000 },
  { id: 11, gpName: 'LANJI', totalHouseholds: 400, totalWasteKg: 26.6, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 26600, monthlyWasteTotalGm: 798000 },
  { id: 12, gpName: 'SANMAHESWAR', totalHouseholds: 820, totalWasteKg: 25.8, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 25800, monthlyWasteTotalGm: 774000 },
  { id: 13, gpName: 'TUKLA', totalHouseholds: 920, totalWasteKg: 65.6, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 65600, monthlyWasteTotalGm: 1968000 },

  // Sinapali Block
  { id: 27, gpName: 'BARGAON', totalHouseholds: 950, totalWasteKg: 42.8, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 42800, monthlyWasteTotalGm: 1284000 },
  { id: 28, gpName: 'BHARUAMUNDA', totalHouseholds: 1200, totalWasteKg: 51.6, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 51600, monthlyWasteTotalGm: 1548000 },
  { id: 29, gpName: 'CHATIAGUDA', totalHouseholds: 850, totalWasteKg: 31.3, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 31300, monthlyWasteTotalGm: 939000 },
  { id: 30, gpName: 'GANDABAHALI', totalHouseholds: 1100, totalWasteKg: 45.5, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 45500, monthlyWasteTotalGm: 1365000 },
  { id: 31, gpName: 'HATIBANDHA', totalHouseholds: 1300, totalWasteKg: 64.7, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 64700, monthlyWasteTotalGm: 1941000 },
  { id: 32, gpName: 'LITIGUDA', totalHouseholds: 550, totalWasteKg: 24.5, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 24500, monthlyWasteTotalGm: 735000 },
  { id: 33, gpName: 'MAKHAPADAR', totalHouseholds: 1050, totalWasteKg: 48.2, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 48200, monthlyWasteTotalGm: 1446000 },
  { id: 34, gpName: 'GODAL', totalHouseholds: 1080, totalWasteKg: 48.7, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 48700, monthlyWasteTotalGm: 1461000 },
  { id: 35, gpName: 'SINAPALI', totalHouseholds: 1800, totalWasteKg: 85.2, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 85200, monthlyWasteTotalGm: 2556000 },

  // Boden Block
  { id: 54, gpName: 'BABEBIR', totalHouseholds: 800, totalWasteKg: 38.528, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 38528, monthlyWasteTotalGm: 1155840 },
  { id: 62, gpName: 'BODEN', totalHouseholds: 1800, totalWasteKg: 82.255, schools: 9, anganwadis: 12, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 82255, monthlyWasteTotalGm: 2467650 },
];
