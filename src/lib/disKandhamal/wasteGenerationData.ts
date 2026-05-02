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
  // Block BALLIGUDA
  { id: 1, gpName: 'BARAKHAMA', totalHouseholds: 1326, schools: 12, anganwadis: 12, panchayatGhar: 1, commercial: 35, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 26520, monthlyWasteTotalGm: 795600, totalWasteKg: 795.6 },
  { id: 2, gpName: 'BATAGUDA', totalHouseholds: 1365, schools: 13, anganwadis: 14, panchayatGhar: 1, commercial: 25, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 27300, monthlyWasteTotalGm: 819000, totalWasteKg: 819.0 },
  { id: 3, gpName: 'BUDRUKIA', totalHouseholds: 1042, schools: 12, anganwadis: 10, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 20840, monthlyWasteTotalGm: 625200, totalWasteKg: 625.2 },
  { id: 4, gpName: 'DADAKANGIA', totalHouseholds: 765, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 8, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 15300, monthlyWasteTotalGm: 459000, totalWasteKg: 459.0 },
  { id: 5, gpName: 'KHAMANKHOL', totalHouseholds: 1353, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: 15, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 27060, monthlyWasteTotalGm: 811800, totalWasteKg: 811.8 },
  { id: 6, gpName: 'KUTIKIA', totalHouseholds: 1012, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: 8, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 20240, monthlyWasteTotalGm: 607200, totalWasteKg: 607.2 },
  { id: 7, gpName: 'LANDAGAON', totalHouseholds: 1010, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 18, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 20200, monthlyWasteTotalGm: 606000, totalWasteKg: 606.0 },
  { id: 8, gpName: 'MEDIAKIA', totalHouseholds: 640, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 12800, monthlyWasteTotalGm: 384000, totalWasteKg: 384.0 },
  { id: 9, gpName: 'PARAMPANGA', totalHouseholds: 887, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 17740, monthlyWasteTotalGm: 532200, totalWasteKg: 532.2 },
  { id: 10, gpName: 'REBINGIA', totalHouseholds: 990, schools: 15, anganwadis: 13, panchayatGhar: 1, commercial: 16, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 19800, monthlyWasteTotalGm: 594000, totalWasteKg: 594.0 },
  { id: 11, gpName: 'RUTUNGIA', totalHouseholds: 1280, schools: 17, anganwadis: 16, panchayatGhar: 1, commercial: 15, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 25600, monthlyWasteTotalGm: 768000, totalWasteKg: 768.0 },
  { id: 12, gpName: 'SALAGUDA', totalHouseholds: 1156, schools: 14, anganwadis: 16, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 23120, monthlyWasteTotalGm: 693600, totalWasteKg: 693.6 },
  { id: 13, gpName: 'SINDRIGAON', totalHouseholds: 1251, schools: 15, anganwadis: 18, panchayatGhar: 1, commercial: 16, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 25020, monthlyWasteTotalGm: 750600, totalWasteKg: 750.6 },
  { id: 14, gpName: 'SUDRA', totalHouseholds: 1320, schools: 16, anganwadis: 18, panchayatGhar: 1, commercial: 20, perHouseholdDayGm: 20, perHouseholdMonthGm: 600, dailyWasteTotalGm: 26400, monthlyWasteTotalGm: 792000, totalWasteKg: 792.0 },

  // Block Phulbani
  { id: 15, gpName: 'Alami', totalHouseholds: 854, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: 17, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 37576, monthlyWasteTotalGm: 1127280, totalWasteKg: 1127.28 },
  { id: 16, gpName: 'Bisipada', totalHouseholds: 1138, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 22, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 50072, monthlyWasteTotalGm: 1502160, totalWasteKg: 1502.16 },
  { id: 17, gpName: 'Dadaki', totalHouseholds: 821, schools: 10, anganwadis: 9, panchayatGhar: 1, commercial: 18, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 36124, monthlyWasteTotalGm: 1083720, totalWasteKg: 1083.72 },
  { id: 18, gpName: 'Duduki', totalHouseholds: 727, schools: 9, anganwadis: 10, panchayatGhar: 1, commercial: 8, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 31988, monthlyWasteTotalGm: 959640, totalWasteKg: 959.64 },
  { id: 19, gpName: 'Ganjuguda', totalHouseholds: 895, schools: 8, anganwadis: 12, panchayatGhar: 1, commercial: 35, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 39380, monthlyWasteTotalGm: 1181400, totalWasteKg: 1181.40 },
  { id: 20, gpName: 'Gumagarh', totalHouseholds: 891, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 23, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 39204, monthlyWasteTotalGm: 1176120, totalWasteKg: 1176.12 },
  { id: 21, gpName: 'Jamjhari', totalHouseholds: 677, schools: 11, anganwadis: 7, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 29788, monthlyWasteTotalGm: 893640, totalWasteKg: 893.64 },
  { id: 22, gpName: 'Katringia', totalHouseholds: 1205, schools: 9, anganwadis: 15, panchayatGhar: 1, commercial: 45, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 53020, monthlyWasteTotalGm: 1590600, totalWasteKg: 1590.60 },
  { id: 23, gpName: 'Keredi', totalHouseholds: 971, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 20, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 42724, monthlyWasteTotalGm: 1281720, totalWasteKg: 1281.72 },
  { id: 24, gpName: 'Minia', totalHouseholds: 732, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 0, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 32208, monthlyWasteTotalGm: 966240, totalWasteKg: 966.24 },
  { id: 25, gpName: 'Tudipaju', totalHouseholds: 896, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 25, perHouseholdDayGm: 44, perHouseholdMonthGm: 1320, dailyWasteTotalGm: 39424, monthlyWasteTotalGm: 1182720, totalWasteKg: 1182.72 },

  // Block G.UDAYAGIRI
  { id: 26, gpName: 'MALIKAPADI', totalHouseholds: 1950, schools: 9, anganwadis: 15, panchayatGhar: 1, commercial: 12, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 78000, monthlyWasteTotalGm: 2340000, totalWasteKg: 2340.0 },
  { id: 27, gpName: 'TALARIMAHA', totalHouseholds: 689, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 7, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 27560, monthlyWasteTotalGm: 826800, totalWasteKg: 826.8 },
  { id: 28, gpName: 'KALINGA', totalHouseholds: 1986, schools: 10, anganwadis: 18, panchayatGhar: 1, commercial: 25, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 79440, monthlyWasteTotalGm: 2383200, totalWasteKg: 2383.2 },
  { id: 29, gpName: 'GRESSINGIA', totalHouseholds: 1050, schools: 10, anganwadis: 8, panchayatGhar: 1, commercial: 15, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 42000, monthlyWasteTotalGm: 1260000, totalWasteKg: 1260.0 },
  { id: 30, gpName: 'RATINGIA', totalHouseholds: 861, schools: 8, anganwadis: 11, panchayatGhar: 1, commercial: 9, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 34440, monthlyWasteTotalGm: 1033200, totalWasteKg: 1033.2 },
  { id: 31, gpName: 'LINGAGADA', totalHouseholds: 1081, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 18, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 43240, monthlyWasteTotalGm: 1297200, totalWasteKg: 1297.2 },
  { id: 32, gpName: 'RAIKALA', totalHouseholds: 911, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 5, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 36440, monthlyWasteTotalGm: 1093200, totalWasteKg: 1093.2 },
  { id: 33, gpName: 'KATINGIA', totalHouseholds: 1167, schools: 11, anganwadis: 14, panchayatGhar: 1, commercial: 10, perHouseholdDayGm: 40, perHouseholdMonthGm: 1200, dailyWasteTotalGm: 46680, monthlyWasteTotalGm: 1400400, totalWasteKg: 1400.4 },
];
