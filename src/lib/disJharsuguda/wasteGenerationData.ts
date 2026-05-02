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
    // Jharsuguda Block
    { id: 1, gpName: 'Jamera', totalHouseholds: 929, schools: 6, anganwadis: 4, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 82077.15, monthlyWasteTotalGm: 2462314.5, totalWasteKg: 2462.31 },
    { id: 2, gpName: 'Marakuta', totalHouseholds: 919, schools: 7, anganwadis: 3, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 81193.65, monthlyWasteTotalGm: 2435809.5, totalWasteKg: 2435.81 },
    { id: 3, gpName: 'Badamal', totalHouseholds: 1377, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 121657.95, monthlyWasteTotalGm: 3649738.5, totalWasteKg: 3649.74 },
    { id: 4, gpName: 'H. Katapali', totalHouseholds: 2004, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: 24, dailyWasteTotalGm: 177053.4, monthlyWasteTotalGm: 5311602, totalWasteKg: 5311.60 },
    { id: 5, gpName: 'Hirma', totalHouseholds: 1669, schools: 13, anganwadis: 9, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 147456.15, monthlyWasteTotalGm: 4423684.5, totalWasteKg: 4423.68 },
    { id: 6, gpName: 'Sripura', totalHouseholds: 756, schools: 2, anganwadis: 5, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 66792.6, monthlyWasteTotalGm: 2003778, totalWasteKg: 2003.78 },
    { id: 7, gpName: 'Patrapali', totalHouseholds: 648, schools: 4, anganwadis: 3, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 57250.8, monthlyWasteTotalGm: 1717524, totalWasteKg: 1717.52 },
    { id: 8, gpName: 'Malda', totalHouseholds: 591, schools: 3, anganwadis: 2, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 52214.85, monthlyWasteTotalGm: 1566445.5, totalWasteKg: 1566.45 },
    { id: 9, gpName: 'Durlaga', totalHouseholds: 1013, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 89498.55, monthlyWasteTotalGm: 2684956.5, totalWasteKg: 2684.96 },
    { id: 10, gpName: 'Talpatia', totalHouseholds: 911, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 80486.85, monthlyWasteTotalGm: 2414605.5, totalWasteKg: 2414.61 },
    { id: 11, gpName: 'Dalki', totalHouseholds: 889, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 78543.15, monthlyWasteTotalGm: 2356294.5, totalWasteKg: 2356.29 },
    { id: 12, gpName: 'Katikela', totalHouseholds: 722, schools: 3, anganwadis: 1, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 63788.7, monthlyWasteTotalGm: 1913661, totalWasteKg: 1913.66 },
  
    // Kirmira Block
    { id: 13, gpName: 'Arda', totalHouseholds: 2140, schools: 17, anganwadis: 13, panchayatGhar: 1, commercial: 26, dailyWasteTotalGm: 189069, monthlyWasteTotalGm: 5672070, totalWasteKg: 5672.07 },
    { id: 14, gpName: 'Sulehi', totalHouseholds: 1708, schools: 13, anganwadis: 19, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 150901.8, monthlyWasteTotalGm: 4527054, totalWasteKg: 4527.05 },
    { id: 15, gpName: 'Bhimjore', totalHouseholds: 824, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 72800.4, monthlyWasteTotalGm: 2184012, totalWasteKg: 2184.01 },
    { id: 16, gpName: 'Jharmunda', totalHouseholds: 1496, schools: 12, anganwadis: 17, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 132171.6, monthlyWasteTotalGm: 3965148, totalWasteKg: 3965.15 },
    { id: 17, gpName: 'Bandhpali', totalHouseholds: 1212, schools: 10, anganwadis: 9, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 107080.2, monthlyWasteTotalGm: 3212406, totalWasteKg: 3212.41 },
    { id: 18, gpName: 'Kirmira', totalHouseholds: 1578, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 139416.3, monthlyWasteTotalGm: 4182489, totalWasteKg: 4182.49 },
    { id: 19, gpName: 'Naxapali', totalHouseholds: 1497, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 132259.95, monthlyWasteTotalGm: 3967798.5, totalWasteKg: 3967.80 },
    { id: 20, gpName: 'G.panpali', totalHouseholds: 1037, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 91618.95, monthlyWasteTotalGm: 2748568.5, totalWasteKg: 2748.57 },
  
    // Kolabira Block
    { id: 21, gpName: 'Jhirlapali', totalHouseholds: 1264, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 111674.4, monthlyWasteTotalGm: 3350232, totalWasteKg: 3350.23 },
    { id: 22, gpName: 'Pokharisale', totalHouseholds: 2316, schools: 14, anganwadis: 13, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 204618.6, monthlyWasteTotalGm: 6138558, totalWasteKg: 6138.56 },
    { id: 23, gpName: 'Kulihamal', totalHouseholds: 928, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 81988.8, monthlyWasteTotalGm: 2459664, totalWasteKg: 2459.66 },
    { id: 24, gpName: 'Samasingha', totalHouseholds: 1418, schools: 10, anganwadis: 15, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 125280.3, monthlyWasteTotalGm: 3758409, totalWasteKg: 3758.41 },
    { id: 25, gpName: 'Sodamal', totalHouseholds: 1455, schools: 11, anganwadis: 18, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 128549.25, monthlyWasteTotalGm: 3856477.5, totalWasteKg: 3856.48 },
    { id: 26, gpName: 'Kolabira', totalHouseholds: 1480, schools: 12, anganwadis: 12, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 130758, monthlyWasteTotalGm: 3922740, totalWasteKg: 3922.74 },
    { id: 27, gpName: 'Raghunathpali', totalHouseholds: 1425, schools: 10, anganwadis: 15, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 125898.75, monthlyWasteTotalGm: 3776962.5, totalWasteKg: 3776.96 },
    { id: 28, gpName: 'Keldamal', totalHouseholds: 1601, schools: 11, anganwadis: 16, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 141448.35, monthlyWasteTotalGm: 4243450.5, totalWasteKg: 4243.45 },
    { id: 29, gpName: 'Paramanpur', totalHouseholds: 1474, schools: 8, anganwadis: 13, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 130227.9, monthlyWasteTotalGm: 3906837, totalWasteKg: 3906.84 },
  
    // Laikera Block
    { id: 30, gpName: 'Bhatlaida', totalHouseholds: 1587, schools: 14, anganwadis: 15, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 140211.45, monthlyWasteTotalGm: 4206343.5, totalWasteKg: 4206.34 },
    { id: 31, gpName: 'Laikera', totalHouseholds: 810, schools: 6, anganwadis: 4, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 71563.5, monthlyWasteTotalGm: 2146905, totalWasteKg: 2146.91 },
    { id: 32, gpName: 'Saranglai', totalHouseholds: 1351, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 119360.85, monthlyWasteTotalGm: 3580825.5, totalWasteKg: 3580.83 },
    { id: 33, gpName: 'Kulemura', totalHouseholds: 1450, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: 23, dailyWasteTotalGm: 128107.5, monthlyWasteTotalGm: 3843225, totalWasteKg: 3843.23 },
    { id: 34, gpName: 'Babuchipidhi', totalHouseholds: 1227, schools: 11, anganwadis: 12, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 108405.45, monthlyWasteTotalGm: 3252163.5, totalWasteKg: 3252.16 },
    { id: 35, gpName: 'Jammal', totalHouseholds: 1065, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 94092.75, monthlyWasteTotalGm: 2822782.5, totalWasteKg: 2822.78 },
    { id: 36, gpName: 'Teleimal', totalHouseholds: 1415, schools: 11, anganwadis: 9, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 125015.25, monthlyWasteTotalGm: 3750457.5, totalWasteKg: 3750.46 },
    { id: 37, gpName: 'Pakelpada', totalHouseholds: 1316, schools: 12, anganwadis: 9, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 116268.6, monthlyWasteTotalGm: 3488058, totalWasteKg: 3488.06 },
    { id: 38, gpName: 'Sahaspur', totalHouseholds: 1105, schools: 9, anganwadis: 7, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 97626.75, monthlyWasteTotalGm: 2928802.5, totalWasteKg: 2928.80 },
    { id: 39, gpName: 'Khuntamal', totalHouseholds: 1044, schools: 8, anganwadis: 8, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 92237.4, monthlyWasteTotalGm: 2767122, totalWasteKg: 2767.12 },
    { id: 40, gpName: 'Niktimal', totalHouseholds: 1138, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 100542.3, monthlyWasteTotalGm: 3016269, totalWasteKg: 3016.27 },
  
    // Jharsuguda Block (Brajarajnagar ULB)
    { id: 41, gpName: 'Gourmal', totalHouseholds: 669, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 59106.15, monthlyWasteTotalGm: 1773184.5, totalWasteKg: 1773.18 },
    { id: 42, gpName: 'Rajpur', totalHouseholds: 1401, schools: 10, anganwadis: 11, panchayatGhar: 1, commercial: 21, dailyWasteTotalGm: 123778.35, monthlyWasteTotalGm: 3713350.5, totalWasteKg: 3713.35 },
    { id: 43, gpName: 'Lohising', totalHouseholds: 1883, schools: 14, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 166363.05, monthlyWasteTotalGm: 4990891.5, totalWasteKg: 4990.89 },
    { id: 44, gpName: 'Kudapali', totalHouseholds: 1299, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 114766.65, monthlyWasteTotalGm: 3442999.5, totalWasteKg: 3443.00 },
    { id: 45, gpName: 'Chandinimal', totalHouseholds: 849, schools: 10, anganwadis: 7, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 75009.15, monthlyWasteTotalGm: 2250274.5, totalWasteKg: 2250.27 },
  
    // Lakhanpur Block (Brajarajnagar ULB)
    { id: 46, gpName: 'Banjari', totalHouseholds: 1002, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 88526.7, monthlyWasteTotalGm: 2655801, totalWasteKg: 2655.80 },
    { id: 47, gpName: 'Pipilimal', totalHouseholds: 931, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 82253.85, monthlyWasteTotalGm: 2467615.5, totalWasteKg: 2467.62 },
    { id: 48, gpName: 'Kudaloi', totalHouseholds: 1055, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 93209.25, monthlyWasteTotalGm: 2796277.5, totalWasteKg: 2796.28 },
    { id: 49, gpName: 'Lakhanpur', totalHouseholds: 1318, schools: 11, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 116445.3, monthlyWasteTotalGm: 3493359, totalWasteKg: 3493.36 },
    { id: 50, gpName: 'Baghamunda', totalHouseholds: 848, schools: 6, anganwadis: 4, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 74920.8, monthlyWasteTotalGm: 2247624, totalWasteKg: 2247.62 },
  
    // Lakhanpur Block (Belapahar ULB)
    { id: 51, gpName: 'Tilia', totalHouseholds: 1110, schools: 8, anganwadis: 11, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 98068.5, monthlyWasteTotalGm: 2942055, totalWasteKg: 2942.06 },
    { id: 52, gpName: 'Rampela', totalHouseholds: 1059, schools: 8, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 93562.65, monthlyWasteTotalGm: 2806879.5, totalWasteKg: 2806.88 },
    { id: 53, gpName: 'Kumarbandha', totalHouseholds: 1031, schools: 9, anganwadis: 8, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 91088.85, monthlyWasteTotalGm: 2732665.5, totalWasteKg: 2732.67 },
    { id: 54, gpName: 'Dalagaon', totalHouseholds: 1025, schools: 13, anganwadis: 13, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 90558.75, monthlyWasteTotalGm: 2716762.5, totalWasteKg: 2716.76 },
    { id: 55, gpName: 'Pipilikani', totalHouseholds: 983, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 86848.05, monthlyWasteTotalGm: 2605441.5, totalWasteKg: 2605.44 },
    { id: 56, gpName: 'Kusharloi', totalHouseholds: 868, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 76687.8, monthlyWasteTotalGm: 2300634, totalWasteKg: 2300.63 },
    { id: 57, gpName: 'Bandhabahal', totalHouseholds: 599, schools: 7, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 52921.65, monthlyWasteTotalGm: 1587649.5, totalWasteKg: 1587.65 },
    { id: 58, gpName: 'Telenpali', totalHouseholds: 797, schools: 10, anganwadis: 6, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 70414.95, monthlyWasteTotalGm: 2112448.5, totalWasteKg: 2112.45 },
    { id: 59, gpName: 'Sarandamal', totalHouseholds: 1054, schools: 8, anganwadis: 7, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 93120.9, monthlyWasteTotalGm: 2793627, totalWasteKg: 2793.63 },
    { id: 60, gpName: 'Remenda', totalHouseholds: 932, schools: 7, anganwadis: 5, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 82342.2, monthlyWasteTotalGm: 2470266, totalWasteKg: 2470.27 },
    { id: 61, gpName: 'Sunari', totalHouseholds: 1063, schools: 9, anganwadis: 10, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 93916.05, monthlyWasteTotalGm: 2817481.5, totalWasteKg: 2817.48 },
    { id: 62, gpName: 'Pandri', totalHouseholds: 848, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 74920.8, monthlyWasteTotalGm: 2247624, totalWasteKg: 2247.62 },
    { id: 63, gpName: 'Bhournkhol', totalHouseholds: 1199, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 105931.65, monthlyWasteTotalGm: 3177949.5, totalWasteKg: 3177.95 },
    { id: 64, gpName: 'Kadamdihi', totalHouseholds: 1001, schools: 9, anganwadis: 3, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 88438.35, monthlyWasteTotalGm: 2653150.5, totalWasteKg: 2653.15 },
    { id: 65, gpName: 'Samarbaga', totalHouseholds: 702, schools: 10, anganwadis: 7, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 62021.7, monthlyWasteTotalGm: 1860651, totalWasteKg: 1860.65 },
    { id: 66, gpName: 'Jamagaon', totalHouseholds: 747, schools: 13, anganwadis: 13, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 65997.45, monthlyWasteTotalGm: 1979923.5, totalWasteKg: 1979.92 },
    { id: 67, gpName: 'Katarbaga', totalHouseholds: 706, schools: 9, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 62375.1, monthlyWasteTotalGm: 1871253, totalWasteKg: 1871.25 },
    { id: 68, gpName: 'Machhida', totalHouseholds: 815, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 72005.25, monthlyWasteTotalGm: 2160157.5, totalWasteKg: 2160.16 },
    { id: 69, gpName: 'Palsda', totalHouseholds: 1142, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 100895.7, monthlyWasteTotalGm: 3026871, totalWasteKg: 3026.87 },
    { id: 70, gpName: 'Panchagaon', totalHouseholds: 730, schools: 8, anganwadis: 4, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 64495.5, monthlyWasteTotalGm: 1934865, totalWasteKg: 1934.87 },
    { id: 71, gpName: 'Vikampali', totalHouseholds: 961, schools: 8, anganwadis: 11, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 84904.35, monthlyWasteTotalGm: 2547130.5, totalWasteKg: 2547.13 },
    { id: 72, gpName: 'Attabira', totalHouseholds: 1241, schools: 12, anganwadis: 10, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 109642.35, monthlyWasteTotalGm: 3289270.5, totalWasteKg: 3289.27 },
    { id: 73, gpName: 'Badimal', totalHouseholds: 765, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 67587.75, monthlyWasteTotalGm: 2027632.5, totalWasteKg: 2027.63 },
    { id: 74, gpName: 'Kanaktora', totalHouseholds: 1040, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 91884, monthlyWasteTotalGm: 2756520, totalWasteKg: 2756.52 },
    { id: 75, gpName: 'Pithinda', totalHouseholds: 1171, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 103457.85, monthlyWasteTotalGm: 3103735.5, totalWasteKg: 3103.74 },
    { id: 76, gpName: 'Charpali', totalHouseholds: 1308, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 115561.8, monthlyWasteTotalGm: 3466854, totalWasteKg: 3466.85 },
    { id: 77, gpName: 'Remeta', totalHouseholds: 1057, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 93385.95, monthlyWasteTotalGm: 2801578.5, totalWasteKg: 2801.58 },
    { id: 78, gpName: 'Kandheikela', totalHouseholds: 980, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 86583, monthlyWasteTotalGm: 2597490, totalWasteKg: 2597.49 },
  ];