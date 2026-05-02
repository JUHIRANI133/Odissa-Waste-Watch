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
  // Aska Block
  { id: 1, gpName: 'Chadhiapalli', totalHouseholds: 1250, totalWasteKg: 412.5, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 13750, monthlyWasteTotalGm: 412500 },
  { id: 2, gpName: 'Kalasandhapur', totalHouseholds: 980, totalWasteKg: 323.4, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 10780, monthlyWasteTotalGm: 323400 },
  { id: 3, gpName: 'Nalabanta', totalHouseholds: 1420, totalWasteKg: 468.6, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 15620, monthlyWasteTotalGm: 468600 },
  { id: 4, gpName: 'Debabhumi', totalHouseholds: 410, totalWasteKg: 135.3, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 4510, monthlyWasteTotalGm: 135300 },
  { id: 5, gpName: 'Mangalpur', totalHouseholds: 500, totalWasteKg: 165, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 5500, monthlyWasteTotalGm: 165000 },
  { id: 6, gpName: 'Balichhai', totalHouseholds: 600, totalWasteKg: 198, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 6600, monthlyWasteTotalGm: 198000 },
  { id: 7, gpName: 'Haridapadar', totalHouseholds: 900, totalWasteKg: 297, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 9900, monthlyWasteTotalGm: 297000 },
  { id: 8, gpName: 'Jaypur', totalHouseholds: 800, totalWasteKg: 264, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 8800, monthlyWasteTotalGm: 264000 },
  { id: 9, gpName: 'Gangapur', totalHouseholds: 800, totalWasteKg: 264, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 8800, monthlyWasteTotalGm: 264000 },
  { id: 10, gpName: 'Khandadeuli', totalHouseholds: 600, totalWasteKg: 198, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 6600, monthlyWasteTotalGm: 198000 },
  { id: 11, gpName: 'Babanapur', totalHouseholds: 1182, totalWasteKg: 390.06, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 13002, monthlyWasteTotalGm: 390060 },
  { id: 12, gpName: 'Bhetanai', totalHouseholds: 900, totalWasteKg: 297, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 9900, monthlyWasteTotalGm: 297000 },
  { id: 13, gpName: 'Badakholi', totalHouseholds: 800, totalWasteKg: 264, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 8800, monthlyWasteTotalGm: 264000 },
  { id: 14, gpName: 'Gahangu', totalHouseholds: 1500, totalWasteKg: 495, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 16500, monthlyWasteTotalGm: 495000 },
  { id: 15, gpName: 'Balisira', totalHouseholds: 1000, totalWasteKg: 330, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 11000, monthlyWasteTotalGm: 330000 },
  { id: 16, gpName: 'Gunthapada', totalHouseholds: 1100, totalWasteKg: 363, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 12100, monthlyWasteTotalGm: 363000 },
  { id: 17, gpName: 'Benapata', totalHouseholds: 1400, totalWasteKg: 462, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 15400, monthlyWasteTotalGm: 462000 },
  { id: 18, gpName: 'Bangarada', totalHouseholds: 1500, totalWasteKg: 495, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 16500, monthlyWasteTotalGm: 495000 },
  { id: 19, gpName: 'Allipur', totalHouseholds: 500, totalWasteKg: 165, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 5500, monthlyWasteTotalGm: 165000 },

  // Belaguntha Block
  { id: 20, gpName: 'AMBAPUA', totalHouseholds: 400, totalWasteKg: 132, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 4400, monthlyWasteTotalGm: 132000 },
  { id: 21, gpName: 'BANKA', totalHouseholds: 300, totalWasteKg: 99, schools: 2, anganwadis: 2, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 3300, monthlyWasteTotalGm: 99000 },
  { id: 22, gpName: 'BENIPALLI', totalHouseholds: 600, totalWasteKg: 198, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 6600, monthlyWasteTotalGm: 198000 },
  { id: 23, gpName: 'DHUMUCHAI', totalHouseholds: 500, totalWasteKg: 165, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 5500, monthlyWasteTotalGm: 165000 },
  { id: 24, gpName: 'G.NUAGAM', totalHouseholds: 700, totalWasteKg: 231, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 7700, monthlyWasteTotalGm: 231000 },
  { id: 25, gpName: 'MANGALPUR', totalHouseholds: 400, totalWasteKg: 132, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 4400, monthlyWasteTotalGm: 132000 },
  { id: 26, gpName: 'TANARADA', totalHouseholds: 300, totalWasteKg: 99, schools: 2, anganwadis: 2, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 3300, monthlyWasteTotalGm: 99000 },
  { id: 27, gpName: 'UDHURA', totalHouseholds: 400, totalWasteKg: 132, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 4400, monthlyWasteTotalGm: 132000 }
];