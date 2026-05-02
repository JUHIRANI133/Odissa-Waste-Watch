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
  // Block Angul - Mishrapada
  { id: 1, gpName: 'Khalari', totalHouseholds: 12890, totalWasteKg: 43136.385, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 1437879.5, monthlyWasteTotalGm: 43136385 },
  { id: 2, gpName: 'Chheliapada', totalHouseholds: 7200, totalWasteKg: 24094.8, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 41, dailyWasteTotalGm: 803160, monthlyWasteTotalGm: 24094800 },
  { id: 3, gpName: 'Susuda', totalHouseholds: 4990, totalWasteKg: 16699.035, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 556634.5, monthlyWasteTotalGm: 16699035 },
  { id: 4, gpName: 'KangulaBentapur', totalHouseholds: 14400, totalWasteKg: 48189.6, schools: 5, anganwadis: 10, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 1606320, monthlyWasteTotalGm: 48189600 },
  { id: 5, gpName: 'Angarbandha', totalHouseholds: 1879, totalWasteKg: 6288.0735, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 209602.45, monthlyWasteTotalGm: 6288073.5 },
  { id: 6, gpName: 'Balasinga', totalHouseholds: 2797, totalWasteKg: 9360.1605, schools: 5, anganwadis: 9, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 312005.35, monthlyWasteTotalGm: 9360160.5 },
  { id: 7, gpName: 'Inkarbandha', totalHouseholds: 7245, totalWasteKg: 24245.3925, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 808179.75, monthlyWasteTotalGm: 24245392.5 },
  { id: 8, gpName: 'Basala', totalHouseholds: 6540, totalWasteKg: 21886.11, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 729537, monthlyWasteTotalGm: 21886110 },
  { id: 9, gpName: 'Bedasasan', totalHouseholds: 7005, totalWasteKg: 23442.2325, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 781407.75, monthlyWasteTotalGm: 23442232.5 },
  { id: 10, gpName: 'Khinda', totalHouseholds: 8295, totalWasteKg: 27759.2175, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 925307.25, monthlyWasteTotalGm: 27759217.5 },
  { id: 11, gpName: 'Gadatarash', totalHouseholds: 9790, totalWasteKg: 32762.235, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 1092074.5, monthlyWasteTotalGm: 32762235 },
  { id: 12, gpName: 'Badakantukul', totalHouseholds: 2523, totalWasteKg: 8443.2195, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 281440.65, monthlyWasteTotalGm: 8443219.5 },

  // Block Angul - Hulursinga
  { id: 13, gpName: 'Nuamouza', totalHouseholds: 6230, totalWasteKg: 20848.695, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 39, dailyWasteTotalGm: 694956.5, monthlyWasteTotalGm: 20848695 },
  { id: 14, gpName: 'Baluakata', totalHouseholds: 2822, totalWasteKg: 9443.823, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 27, dailyWasteTotalGm: 314794.1, monthlyWasteTotalGm: 9443823 },
  { id: 15, gpName: 'Kumurusinga', totalHouseholds: 8705, totalWasteKg: 29131.2825, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 48, dailyWasteTotalGm: 971042.75, monthlyWasteTotalGm: 29131282.5 },
  { id: 16, gpName: 'Bantala', totalHouseholds: 1838, totalWasteKg: 6150.867, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 68, dailyWasteTotalGm: 205028.9, monthlyWasteTotalGm: 6150867 },
  { id: 17, gpName: 'Sankhapur', totalHouseholds: 6880, totalWasteKg: 23023.92, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 56, dailyWasteTotalGm: 767464, monthlyWasteTotalGm: 23023920 },
  { id: 18, gpName: 'Pokatunga', totalHouseholds: 7325, totalWasteKg: 24513.1125, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 43, dailyWasteTotalGm: 817103.75, monthlyWasteTotalGm: 24513112.5 },
  { id: 19, gpName: 'Dhukuta', totalHouseholds: 6665, totalWasteKg: 22304.4225, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 743480.75, monthlyWasteTotalGm: 22304422.5 },
  { id: 20, gpName: 'Nandapur', totalHouseholds: 12545, totalWasteKg: 41981.8425, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 1399394.75, monthlyWasteTotalGm: 41981842.5 },
  { id: 21, gpName: 'Bargounia', totalHouseholds: 1944, totalWasteKg: 6505.596, schools: 10, anganwadis: 7, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 216853.2, monthlyWasteTotalGm: 6505596 },
  { id: 22, gpName: 'Talagarh', totalHouseholds: 6955, totalWasteKg: 23274.9075, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 775830.25, monthlyWasteTotalGm: 23274907.5 },
  { id: 23, gpName: 'Jganathapur', totalHouseholds: 6490, totalWasteKg: 21718.785, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 723959.5, monthlyWasteTotalGm: 21718785 },
  { id: 24, gpName: 'Balanga', totalHouseholds: 851, totalWasteKg: 2847.8715, schools: 5, anganwadis: 4, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 94929.05, monthlyWasteTotalGm: 2847871.5 },
  { id: 25, gpName: 'Purunakote', totalHouseholds: 5540, totalWasteKg: 18539.61, schools: 7, anganwadis: 4, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 617987, monthlyWasteTotalGm: 18539610 },
  { id: 26, gpName: 'Tikarpada', totalHouseholds: 4590, totalWasteKg: 15360.435, schools: 8, anganwadis: 5, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 512014.5, monthlyWasteTotalGm: 15360435 },
  { id: 27, gpName: 'Rantalei', totalHouseholds: 9910, totalWasteKg: 33163.815, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 38, dailyWasteTotalGm: 1105460.5, monthlyWasteTotalGm: 33163815 },
  { id: 28, gpName: 'Badakera', totalHouseholds: 1889, totalWasteKg: 6321.5385, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: 62, dailyWasteTotalGm: 210717.95, monthlyWasteTotalGm: 6321538.5 },
  { id: 29, gpName: 'Matiasahi', totalHouseholds: 12495, totalWasteKg: 41814.5175, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: 46, dailyWasteTotalGm: 1393817.25, monthlyWasteTotalGm: 41814517.5 },
  { id: 30, gpName: 'Saradhapur', totalHouseholds: 5080, totalWasteKg: 17000.22, schools: 6, anganwadis: 4, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 566674, monthlyWasteTotalGm: 17000220 },
  { id: 31, gpName: 'Manikajodi', totalHouseholds: 4300, totalWasteKg: 14389.95, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 479665, monthlyWasteTotalGm: 14389950 },
  { id: 32, gpName: 'Antulia', totalHouseholds: 1522, totalWasteKg: 5093.373, schools: 4, anganwadis: 9, panchayatGhar: 1, commercial: 35, dailyWasteTotalGm: 169779.1, monthlyWasteTotalGm: 5093373 },
  { id: 33, gpName: 'Kothabhuin', totalHouseholds: 6645, totalWasteKg: 22237.4925, schools: 9, anganwadis: 5, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 741249.75, monthlyWasteTotalGm: 22237492.5 },
  { id: 34, gpName: 'Tainshi', totalHouseholds: 7345, totalWasteKg: 24580.0425, schools: 10, anganwadis: 8, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 819334.75, monthlyWasteTotalGm: 24580042.5 },

  // Block Athamallik - Haridanali
  { id: 35, gpName: 'Aida', totalHouseholds: 1552, totalWasteKg: 5193.768, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 173125.6, monthlyWasteTotalGm: 5193768 },
  { id: 36, gpName: 'Ambasarmunda', totalHouseholds: 1493, totalWasteKg: 4996.3245, schools: 15, anganwadis: 11, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 166544.15, monthlyWasteTotalGm: 4996324.5 },
  { id: 37, gpName: 'Basudevpur', totalHouseholds: 762, totalWasteKg: 2550.033, schools: 7, anganwadis: 6, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 85001.1, monthlyWasteTotalGm: 2550033 },
  { id: 38, gpName: 'Jamudoli', totalHouseholds: 1146, totalWasteKg: 3835.089, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 127836.3, monthlyWasteTotalGm: 3835089 },
  { id: 39, gpName: 'Kampala', totalHouseholds: 1126, totalWasteKg: 3768.159, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 4, dailyWasteTotalGm: 125605.3, monthlyWasteTotalGm: 3768159 },
  { id: 40, gpName: 'Kandhapada', totalHouseholds: 1066, totalWasteKg: 3567.369, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 118912.3, monthlyWasteTotalGm: 3567369 },
  { id: 41, gpName: 'Kanthapada', totalHouseholds: 914, totalWasteKg: 3058.701, schools: 8, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 101956.7, monthlyWasteTotalGm: 3058701 },
  { id: 42, gpName: 'Kiakata', totalHouseholds: 1159, totalWasteKg: 3878.5935, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 129286.45, monthlyWasteTotalGm: 3878593.5 },
  { id: 43, gpName: 'Krutibaspur', totalHouseholds: 1162, totalWasteKg: 3888.633, schools: 11, anganwadis: 8, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 129621.1, monthlyWasteTotalGm: 3888633 },
  { id: 44, gpName: 'Kudgaon', totalHouseholds: 1228, totalWasteKg: 4109.502, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 136983.4, monthlyWasteTotalGm: 4109502 },
  { id: 45, gpName: 'Kurumtap', totalHouseholds: 955, totalWasteKg: 3195.9075, schools: 7, anganwadis: 5, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 106530.25, monthlyWasteTotalGm: 3195907.5 },
  { id: 46, gpName: 'Luhasinga', totalHouseholds: 879, totalWasteKg: 2941.5735, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 98052.45, monthlyWasteTotalGm: 2941573.5 },
  { id: 47, gpName: 'Lunahandi', totalHouseholds: 931, totalWasteKg: 3115.5915, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 103853.05, monthlyWasteTotalGm: 3115591.5 },
  { id: 48, gpName: 'Madhapur', totalHouseholds: 1647, totalWasteKg: 5511.6855, schools: 10, anganwadis: 11, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 183722.85, monthlyWasteTotalGm: 5511685.5 },
  { id: 49, gpName: 'Maimura', totalHouseholds: 700, totalWasteKg: 2342.55, schools: 11, anganwadis: 7, panchayatGhar: 1, commercial: 13, dailyWasteTotalGm: 78085, monthlyWasteTotalGm: 2342550 },
  { id: 50, gpName: 'Nagaon', totalHouseholds: 947, totalWasteKg: 3169.1355, schools: 9, anganwadis: 11, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 105637.85, monthlyWasteTotalGm: 3169135.5 },
  { id: 51, gpName: 'Paikasahi', totalHouseholds: 619, totalWasteKg: 2071.4835, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 69049.45, monthlyWasteTotalGm: 2071483.5 },
  { id: 52, gpName: 'Pedipathar', totalHouseholds: 893, totalWasteKg: 2988.4245, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: 17, dailyWasteTotalGm: 99614.15, monthlyWasteTotalGm: 2988424.5 },
  { id: 53, gpName: 'Purunamantri', totalHouseholds: 1119, totalWasteKg: 3744.7335, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 124824.45, monthlyWasteTotalGm: 3744733.5 },
  { id: 54, gpName: 'Sanahula', totalHouseholds: 969, totalWasteKg: 3242.7585, schools: 11, anganwadis: 11, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 108091.95, monthlyWasteTotalGm: 3242758.5 },
  { id: 55, gpName: 'Sapaghara', totalHouseholds: 771, totalWasteKg: 2580.1515, schools: 12, anganwadis: 11, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 86005.05, monthlyWasteTotalGm: 2580151.5 },
  { id: 56, gpName: 'Tapdhol', totalHouseholds: 949, totalWasteKg: 3175.8285, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 105860.95, monthlyWasteTotalGm: 3175828.5 },
  { id: 57, gpName: 'Thakurgarh', totalHouseholds: 1112, totalWasteKg: 3721.308, schools: 12, anganwadis: 14, panchayatGhar: 1, commercial: 45, dailyWasteTotalGm: 124043.6, monthlyWasteTotalGm: 3721308 },
  { id: 58, gpName: 'Tusar', totalHouseholds: 1089, totalWasteKg: 3644.3385, schools: 10, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 121477.95, monthlyWasteTotalGm: 3644338.5 },

  // Block Talcher - Ranipark
  { id: 59, gpName: 'Brajanathapur', totalHouseholds: 588, totalWasteKg: 1967.742, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 65591.4, monthlyWasteTotalGm: 1967742 },
  { id: 60, gpName: 'Dharmapur', totalHouseholds: 1616, totalWasteKg: 5407.944, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 4, dailyWasteTotalGm: 180264.8, monthlyWasteTotalGm: 5407944 },
  { id: 61, gpName: 'Gurujanguli', totalHouseholds: 1452, totalWasteKg: 4859.118, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 161970.6, monthlyWasteTotalGm: 4859118 },
  { id: 62, gpName: 'Kankil', totalHouseholds: 1683, totalWasteKg: 5632.1595, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 3, dailyWasteTotalGm: 187738.65, monthlyWasteTotalGm: 5632159.5 },
  { id: 63, gpName: 'Kandhal', totalHouseholds: 1552, totalWasteKg: 5193.768, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 173125.6, monthlyWasteTotalGm: 5193768 },

  // Block Talcher - Baghubal
  { id: 64, gpName: 'Bantol', totalHouseholds: 1332, totalWasteKg: 4457.538, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 3, dailyWasteTotalGm: 148584.6, monthlyWasteTotalGm: 4457538 },
  { id: 65, gpName: 'Badajorda', totalHouseholds: 1225, totalWasteKg: 4099.4625, schools: 3, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 136648.75, monthlyWasteTotalGm: 4099462.5 },
  { id: 66, gpName: 'Danara', totalHouseholds: 1622, totalWasteKg: 5428.023, schools: 5, anganwadis: 13, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 180934.1, monthlyWasteTotalGm: 5428023 },
  { id: 67, gpName: 'Dera', totalHouseholds: 991, totalWasteKg: 3316.3815, schools: 3, anganwadis: 6, panchayatGhar: 1, commercial: 19, dailyWasteTotalGm: 110546.05, monthlyWasteTotalGm: 3316381.5 },
  { id: 68, gpName: 'Ghantapada', totalHouseholds: 181, totalWasteKg: 605.7165, schools: 4, anganwadis: 17, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 20190.55, monthlyWasteTotalGm: 605716.5 },
  { id: 69, gpName: 'Gobara', totalHouseholds: 1665, totalWasteKg: 5571.9225, schools: 5, anganwadis: 13, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 185730.75, monthlyWasteTotalGm: 5571922.5 },
  { id: 70, gpName: 'Gopalprasad', totalHouseholds: 1086, totalWasteKg: 3634.299, schools: 6, anganwadis: 7, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 121143.3, monthlyWasteTotalGm: 3634299 },
  { id: 71, gpName: 'Gurujanga', totalHouseholds: 1472, totalWasteKg: 4926.048, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 164201.6, monthlyWasteTotalGm: 4926048 },
  { id: 72, gpName: 'Jaganathpur', totalHouseholds: 2565, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 286125.75, monthlyWasteTotalGm: 8583772.5 },
  { id: 73, gpName: 'Karnapur', totalHouseholds: 1414, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 157731.7, monthlyWasteTotalGm: 4731951 },
  { id: 74, gpName: 'Kumunda', totalHouseholds: 954, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: 3, dailyWasteTotalGm: 106418.7, monthlyWasteTotalGm: 3192561 },
  { id: 75, gpName: 'Padmabatipur', totalHouseholds: 2126, schools: 1, anganwadis: 0, panchayatGhar: 1, commercial: 4, dailyWasteTotalGm: 237155.3, monthlyWasteTotalGm: 7114659 },
  { id: 76, gpName: 'Santhapada', totalHouseholds: 1560, totalWasteKg: 5220.54, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 174018, monthlyWasteTotalGm: 5220540 },
  { id: 77, gpName: 'Tentulei', totalHouseholds: 1024, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 114227.2, monthlyWasteTotalGm: 3426816 },
];
