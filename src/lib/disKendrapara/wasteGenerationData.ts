export interface WasteGenerationData {
  id: number;
  gpName: string;
  totalHouseholds: number;
  totalWasteKg: number;
  schools: number;
  anganwadis: number;
  panchayatGhar: number;
  commercial: string;
  dailyWasteTotalGm: number;
  monthlyWasteTotalGm: number;
  peoName?: string;
  peoContact?: string;
}

export const wasteGenerationData: WasteGenerationData[] = [
  // Kendrapara Block
  { id: 1, gpName: 'AYEBA', totalHouseholds: 950, totalWasteKg: 3410.88, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: "35", dailyWasteTotalGm: 113696, monthlyWasteTotalGm: 3410880 },
  { id: 2, gpName: 'BAGADA', totalHouseholds: 2005, totalWasteKg: 7198.75, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: "190", dailyWasteTotalGm: 239958, monthlyWasteTotalGm: 7198752 },
  { id: 3, gpName: 'BARO', totalHouseholds: 2103, totalWasteKg: 7550.61, schools: 10, anganwadis: 12, panchayatGhar: 1, commercial: "150", dailyWasteTotalGm: 251687, monthlyWasteTotalGm: 7550611 },
  { id: 4, gpName: 'BHAGABATPUR', totalHouseholds: 1307, totalWasteKg: 4692.65, schools: 7, anganwadis: 7, panchayatGhar: 1, commercial: "60", dailyWasteTotalGm: 156422, monthlyWasteTotalGm: 4692653 },
  { id: 5, gpName: 'BHARATPUR', totalHouseholds: 874, totalWasteKg: 3138.01, schools: 6, anganwadis: 5, panchayatGhar: 1, commercial: "105", dailyWasteTotalGm: 104600, monthlyWasteTotalGm: 3138010 },
  { id: 6, gpName: 'CHAKRODA', totalHouseholds: 2231, totalWasteKg: 8010.18, schools: 10, anganwadis: 10, panchayatGhar: 1, commercial: "105", dailyWasteTotalGm: 267006, monthlyWasteTotalGm: 8010182 },
  { id: 8, gpName: 'CHARIGAON', totalHouseholds: 830, totalWasteKg: 2980.03, schools: 3, anganwadis: 10, panchayatGhar: 1, commercial: "35", dailyWasteTotalGm: 99334, monthlyWasteTotalGm: 2980032 },
  { id: 9, gpName: 'DHOLA', totalHouseholds: 880, totalWasteKg: 3159.55, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: "13", dailyWasteTotalGm: 105318, monthlyWasteTotalGm: 3159552 },
  { id: 10, gpName: 'DHUMAT', totalHouseholds: 1205, totalWasteKg: 4326.43, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: "23", dailyWasteTotalGm: 144214, monthlyWasteTotalGm: 4326432 },
  { id: 11, gpName: 'GANGAPADA', totalHouseholds: 1526, totalWasteKg: 5478.95, schools: 7, anganwadis: 8, panchayatGhar: 1, commercial: "90", dailyWasteTotalGm: 182632, monthlyWasteTotalGm: 5478950 },
  { id: 12, gpName: 'GHAGARA', totalHouseholds: 905, totalWasteKg: 3249.31, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: "40", dailyWasteTotalGm: 108310, monthlyWasteTotalGm: 3249312 },
  { id: 13, gpName: 'GULNAGAR', totalHouseholds: 1070, totalWasteKg: 3841.72, schools: 5, anganwadis: 6, panchayatGhar: 1, commercial: "172", dailyWasteTotalGm: 128058, monthlyWasteTotalGm: 3841728 },
  { id: 14, gpName: 'INDUPUR', totalHouseholds: 1100, totalWasteKg: 3949.44, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: "104", dailyWasteTotalGm: 131648, monthlyWasteTotalGm: 3949440 },
  { id: 15, gpName: 'JAMDHAR', totalHouseholds: 2021, totalWasteKg: 7256.19, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: "80", dailyWasteTotalGm: 241873, monthlyWasteTotalGm: 7256198 },
  { id: 16, gpName: 'KALAPADA', totalHouseholds: 1280, totalWasteKg: 4595.71, schools: 6, anganwadis: 6, panchayatGhar: 1, commercial: "60", dailyWasteTotalGm: 153190, monthlyWasteTotalGm: 4595712 },
  { id: 17, gpName: 'KANSAR', totalHouseholds: 1517, totalWasteKg: 5446.63, schools: 7, anganwadis: 9, panchayatGhar: 1, commercial: "35", dailyWasteTotalGm: 181555, monthlyWasteTotalGm: 5446637 },
  { id: 18, gpName: 'KAPALESWAR', totalHouseholds: 1902, totalWasteKg: 6828.94, schools: 9, anganwadis: 13, panchayatGhar: 1, commercial: "125", dailyWasteTotalGm: 227631, monthlyWasteTotalGm: 6828941 },
  { id: 20, gpName: 'KORO', totalHouseholds: 1608, totalWasteKg: 5773.36, schools: 8, anganwadis: 9, panchayatGhar: 1, commercial: "50", dailyWasteTotalGm: 192445, monthlyWasteTotalGm: 5773363 },
  { id: 21, gpName: 'KUTARANG', totalHouseholds: 531, totalWasteKg: 1906.50, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: "12", dailyWasteTotalGm: 63550, monthlyWasteTotalGm: 1906502 },
  { id: 22, gpName: 'NIKIRAI', totalHouseholds: 1920, totalWasteKg: 6893.56, schools: 6, anganwadis: 11, panchayatGhar: 1, commercial: "55", dailyWasteTotalGm: 229786, monthlyWasteTotalGm: 6893568 },
  { id: 23, gpName: 'OSTAPUR', totalHouseholds: 1280, totalWasteKg: 4595.71, schools: 9, anganwadis: 9, panchayatGhar: 1, commercial: "82", dailyWasteTotalGm: 153190, monthlyWasteTotalGm: 4595712 },
  { id: 24, gpName: 'PALASINGHA', totalHouseholds: 1252, totalWasteKg: 4495.18, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: "50", dailyWasteTotalGm: 149839, monthlyWasteTotalGm: 4495181 },
  { id: 25, gpName: 'PURUSHOTTAMPUR', totalHouseholds: 1076, totalWasteKg: 3863.27, schools: 5, anganwadis: 9, panchayatGhar: 1, commercial: "40", dailyWasteTotalGm: 128776, monthlyWasteTotalGm: 3863270 },
  { id: 27, gpName: 'SHYAMSUNDARPUR', totalHouseholds: 2550, totalWasteKg: 9155.52, schools: 7, anganwadis: 11, panchayatGhar: 1, commercial: "75", dailyWasteTotalGm: 305184, monthlyWasteTotalGm: 9155520 },

  // Pattamundei Block - Detailed 31 GP Registry
  { id: 101, gpName: 'ALAPUA', totalHouseholds: 899, schools: 1, anganwadis: 3, panchayatGhar: 1, commercial: "1 Hotel", dailyWasteTotalGm: 107592, monthlyWasteTotalGm: 3227770, totalWasteKg: 3227.77, peoName: "Bahadur Tudu", peoContact: "9668211447" },
  { id: 102, gpName: 'AMRUTAMANOHI', totalHouseholds: 1259, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: "23 Shop", dailyWasteTotalGm: 150677, monthlyWasteTotalGm: 4520314, totalWasteKg: 4520.31, peoName: "Ranjit Parida", peoContact: "9938741526" },
  { id: 103, gpName: 'ANDARA', totalHouseholds: 1075, schools: 1, anganwadis: 3, panchayatGhar: 1, commercial: "1 HAAT 25 shop", dailyWasteTotalGm: 128656, monthlyWasteTotalGm: 3859680, totalWasteKg: 3859.68, peoName: "Ashoka Jena", peoContact: "7978098872" },
  { id: 104, gpName: 'ARADAPALLI', totalHouseholds: 533, schools: 1, anganwadis: 2, panchayatGhar: 1, commercial: "14 Shop", dailyWasteTotalGm: 63789, monthlyWasteTotalGm: 1913683, totalWasteKg: 1913.68, peoName: "Pravat kumar Mallik", peoContact: "8917630526" },
  { id: 105, gpName: 'BACHHARA', totalHouseholds: 943, schools: 2, anganwadis: 2, panchayatGhar: 1, commercial: "4 Shop", dailyWasteTotalGm: 112858, monthlyWasteTotalGm: 3385747, totalWasteKg: 3385.75, peoName: "Kausalya Lenka", peoContact: "7750001609" },
  { id: 106, gpName: 'BADAMOHANPUR', totalHouseholds: 1081, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: "KATABAN BAZAR", dailyWasteTotalGm: 129374, monthlyWasteTotalGm: 3881222, totalWasteKg: 3881.22, peoName: "Suraj Mohanty", peoContact: "7008332533" },
  { id: 107, gpName: 'BADAMULABASANTA', totalHouseholds: 1598, schools: 3, anganwadis: 8, panchayatGhar: 1, commercial: "30 Shop", dailyWasteTotalGm: 191249, monthlyWasteTotalGm: 5737459, totalWasteKg: 5737.46, peoName: "Surendra Das", peoContact: "7894290641" },
  { id: 108, gpName: 'BADAPADA', totalHouseholds: 1324, schools: 3, anganwadis: 6, panchayatGhar: 1, commercial: "4 hotel 30 Shop", dailyWasteTotalGm: 158456, monthlyWasteTotalGm: 4753690, totalWasteKg: 4753.69, peoName: "Raibari Majhi", peoContact: "7894279914" },
  { id: 109, gpName: 'BALABHADRAPUR', totalHouseholds: 970, schools: 4, anganwadis: 2, panchayatGhar: 1, commercial: "19 Shop", dailyWasteTotalGm: 116090, monthlyWasteTotalGm: 3482688, totalWasteKg: 3482.69, peoName: "Jyoti ranjan Samal", peoContact: "8480339793" },
  { id: 110, gpName: 'BALIPATNA', totalHouseholds: 1016, schools: 1, anganwadis: 2, panchayatGhar: 1, commercial: "9 Shop", dailyWasteTotalGm: 121595, monthlyWasteTotalGm: 3647846, totalWasteKg: 3647.85, peoName: "BANAMALI BEHERA", peoContact: "9337500363" },
  { id: 111, gpName: 'BALURIA', totalHouseholds: 1077, schools: 1, anganwadis: 3, panchayatGhar: 1, commercial: "22 Shop", dailyWasteTotalGm: 128895, monthlyWasteTotalGm: 3866861, totalWasteKg: 3866.86, peoName: "Ashoka Jena", peoContact: "7978098872" },
  { id: 112, gpName: 'BILIKANA', totalHouseholds: 1821, schools: 4, anganwadis: 12, panchayatGhar: 1, commercial: "1 hotel 32 shop", dailyWasteTotalGm: 217937, monthlyWasteTotalGm: 6538118, totalWasteKg: 6538.12, peoName: "Jyoti ranjan Samal", peoContact: "8480339793" },
  { id: 113, gpName: 'CHANDANAGAR', totalHouseholds: 2081, schools: 6, anganwadis: 10, panchayatGhar: 1, commercial: "5 hotel 25 shop", dailyWasteTotalGm: 249054, monthlyWasteTotalGm: 7471622, totalWasteKg: 7471.62, peoName: "ALEKHA PRADHAN", peoContact: "9937813688" },
  { id: 114, gpName: 'DHAMARPUR', totalHouseholds: 1260, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: "23 Shop", dailyWasteTotalGm: 150797, monthlyWasteTotalGm: 4523904, totalWasteKg: 4523.90, peoName: "Subhashree Nayak", peoContact: "9861696257" },
  { id: 115, gpName: 'DIHAPADA', totalHouseholds: 1374, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: "28 shop", dailyWasteTotalGm: 164440, monthlyWasteTotalGm: 4933210, totalWasteKg: 4933.21, peoName: "Sricharan Barik", peoContact: "8249456262" },
  { id: 116, gpName: 'DIHUDIPUR', totalHouseholds: 1088, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: "1 hotel 34 shop", dailyWasteTotalGm: 130212, monthlyWasteTotalGm: 3906355, totalWasteKg: 3906.35, peoName: "ALEKHA PRADHAN", peoContact: "9937813688" },
  { id: 117, gpName: 'DOSIA', totalHouseholds: 1097, schools: 2, anganwadis: 6, panchayatGhar: 1, commercial: "2 hotel 23 shop", dailyWasteTotalGm: 131289, monthlyWasteTotalGm: 3938669, totalWasteKg: 3938.67, peoName: "Rajnandini Biswal", peoContact: "7682979971" },
  { id: 118, gpName: 'GANGARAMPUR', totalHouseholds: 1256, schools: 4, anganwadis: 8, panchayatGhar: 1, commercial: "2 hotel 29 shop", dailyWasteTotalGm: 150318, monthlyWasteTotalGm: 4509542, totalWasteKg: 4509.54, peoName: "Sarada Prasanna Rout", peoContact: "7008065503" },
  { id: 119, gpName: 'KAKHARUNI', totalHouseholds: 1057, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: "19 shop", dailyWasteTotalGm: 126502, monthlyWasteTotalGm: 3795053, totalWasteKg: 3795.05, peoName: "Durga prasad Nayak", peoContact: "8917265374" },
  { id: 120, gpName: 'KHADIANTA', totalHouseholds: 1361, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: "17 shop", dailyWasteTotalGm: 162884, monthlyWasteTotalGm: 4886534, totalWasteKg: 4886.53, peoName: "Ananta kumar Biswal", peoContact: "8117808401" },
  { id: 121, gpName: 'KHANATA', totalHouseholds: 1292, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: "1 hotel 23 shop", dailyWasteTotalGm: 154627, monthlyWasteTotalGm: 4638797, totalWasteKg: 4638.80, peoName: "Tapan kumar Pradhan", peoContact: "9937229218" },
  { id: 122, gpName: 'NARASINGHPUR', totalHouseholds: 1173, schools: 5, anganwadis: 5, panchayatGhar: 1, commercial: "19 shop", dailyWasteTotalGm: 140385, monthlyWasteTotalGm: 4211539, totalWasteKg: 4211.54, peoName: "Pravat kumar Mallik", peoContact: "8917630526" },
  { id: 123, gpName: 'NILAKANTHAPUR', totalHouseholds: 1089, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: "21 shop", dailyWasteTotalGm: 130332, monthlyWasteTotalGm: 3909946, totalWasteKg: 3909.95, peoName: "Sankarshan Majhi", peoContact: "9658610146" },
  { id: 124, gpName: 'OUPADA', totalHouseholds: 1457, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: "25 shop", dailyWasteTotalGm: 174374, monthlyWasteTotalGm: 5231213, totalWasteKg: 5231.21, peoName: "Madhab Dalai", peoContact: "9337285368" },
  { id: 125, gpName: 'PENTHAPAL', totalHouseholds: 1415, schools: 4, anganwadis: 3, panchayatGhar: 1, commercial: "4 hotel 29 shop", dailyWasteTotalGm: 169347, monthlyWasteTotalGm: 5080416, totalWasteKg: 5080.42, peoName: "Sarbeswar Baral", peoContact: "9337196350" },
  { id: 126, gpName: 'SANJARIA', totalHouseholds: 2072, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: "1 nos 43 shop", dailyWasteTotalGm: 247977, monthlyWasteTotalGm: 7439309, totalWasteKg: 7439.31, peoName: "Sukul Majhi", peoContact: "9668350496" },
  { id: 127, gpName: 'SANSARFAL', totalHouseholds: 1177, schools: 3, anganwadis: 3, panchayatGhar: 1, commercial: "1 haat 43 shop", dailyWasteTotalGm: 140863, monthlyWasteTotalGm: 4225901, totalWasteKg: 4225.90, peoName: "Tapan kumar Pradhan", peoContact: "9937229218" },
  { id: 128, gpName: 'SASANA', totalHouseholds: 1542, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: "33 shop", dailyWasteTotalGm: 184547, monthlyWasteTotalGm: 5536397, totalWasteKg: 5536.40, peoName: "Ananta kumar Biswal", peoContact: "8117808401" },
  { id: 129, gpName: 'SINGHAGAN', totalHouseholds: 628, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: "24 shops", dailyWasteTotalGm: 75159, monthlyWasteTotalGm: 2254771, totalWasteKg: 2254.77, peoName: "Sarbeswar Baral", peoContact: "9337196350" },
  { id: 130, gpName: 'SRIRAMPUR', totalHouseholds: 1781, schools: 4, anganwadis: 4, panchayatGhar: 1, commercial: "21 shop", dailyWasteTotalGm: 213150, monthlyWasteTotalGm: 6394502, totalWasteKg: 6394.50, peoName: "Jyoti ranjan Samal", peoContact: "8480339793" },
  { id: 131, gpName: 'TARADIPAL', totalHouseholds: 1174, schools: 4, anganwadis: 3, panchayatGhar: 1, commercial: "17 shops", dailyWasteTotalGm: 140504, monthlyWasteTotalGm: 4215130, totalWasteKg: 4215.13, peoName: "Bahadur Tudu", peoContact: "9668211447" },
];
