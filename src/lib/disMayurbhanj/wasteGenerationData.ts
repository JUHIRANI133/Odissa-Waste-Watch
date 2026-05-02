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
  peoName: string;
  peoContact: string;
}

export const wasteGenerationData: WasteGenerationData[] = [
  // BARIPADA Block
  { id: 1, gpName: 'BETNA', totalHouseholds: 450, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 163900, monthlyWasteTotalGm: 4917000, totalWasteKg: 163.9, peoName: "Kartik Chandra Mohanta", peoContact: "9861213832" },
  { id: 2, gpName: 'BANKISOLE', totalHouseholds: 310, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 112100, monthlyWasteTotalGm: 3363000, totalWasteKg: 112.1, peoName: "Kartik Chandra Mohanta", peoContact: "9861213832" },
  { id: 3, gpName: 'CHANDANPUR', totalHouseholds: 490, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 178200, monthlyWasteTotalGm: 5346000, totalWasteKg: 178.2, peoName: "Kanhuram Soren", peoContact: "9980908409" },
  { id: 4, gpName: 'LAXMIPOSI', totalHouseholds: 255, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 92600, monthlyWasteTotalGm: 2778000, totalWasteKg: 92.6, peoName: "Ananta Kishore Maharana", peoContact: "9861363677" },
  { id: 5, gpName: 'RAJABASA', totalHouseholds: 600, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 217000, monthlyWasteTotalGm: 6510000, totalWasteKg: 217.0, peoName: "Subasish Behera", peoContact: "8984189369" },
  { id: 6, gpName: 'SANKHABHANGA', totalHouseholds: 480, schools: 3, anganwadis: 7, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 173100, monthlyWasteTotalGm: 5193000, totalWasteKg: 173.1, peoName: "Rajabati Sing", peoContact: "7735285694" },
  { id: 7, gpName: 'BUDHIKHAMARI', totalHouseholds: 500, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 0, monthlyWasteTotalGm: 0, totalWasteKg: 0, peoName: "Binay Ku Das", peoContact: "7077793498" },
  { id: 8, gpName: 'BADJODE', totalHouseholds: 420, schools: 2, anganwadis: 5, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 151700, monthlyWasteTotalGm: 4551000, totalWasteKg: 151.7, peoName: "Manoj Kumar Mohanta", peoContact: "7008681719" },
  { id: 9, gpName: 'BHAGABATCHANDRAPUR', totalHouseholds: 380, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 138300, monthlyWasteTotalGm: 4149000, totalWasteKg: 138.3, peoName: "Binay Ku Das", peoContact: "7077793498" },
  { id: 10, gpName: 'HATIKOTE', totalHouseholds: 285, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 103700, monthlyWasteTotalGm: 3111000, totalWasteKg: 103.7, peoName: "Ramesh Behera", peoContact: "9556765270" },
  { id: 11, gpName: 'KHADISOLE', totalHouseholds: 265, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 95900, monthlyWasteTotalGm: 2877000, totalWasteKg: 95.9, peoName: "Sapan Kumar Das", peoContact: "9437612270" },

  // UDALA Block
  { id: 12, gpName: 'RADHO', totalHouseholds: 2446, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 195700, monthlyWasteTotalGm: 5871000, totalWasteKg: 195.7, peoName: "Prafulla Kumar sial", peoContact: "9853988109" },
  { id: 13, gpName: 'KOCHILADIHA', totalHouseholds: 2476, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 198100, monthlyWasteTotalGm: 5943000, totalWasteKg: 198.1, peoName: "Daka Singh", peoContact: "8018980295" },
  { id: 14, gpName: 'BAHUBANDH', totalHouseholds: 2002, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 160200, monthlyWasteTotalGm: 4806000, totalWasteKg: 160.2, peoName: "Gangadhara Sahu", peoContact: "9439450171" },
  { id: 15, gpName: 'BADKHAMAN', totalHouseholds: 2091, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 167300, monthlyWasteTotalGm: 5019000, totalWasteKg: 167.3, peoName: "Prafulla Kumar sial", peoContact: "9853988110" },
  { id: 16, gpName: 'BADSINGARIA', totalHouseholds: 978, schools: 2, anganwadis: 3, panchayatGhar: 1, commercial: 5, dailyWasteTotalGm: 78300, monthlyWasteTotalGm: 2349000, totalWasteKg: 78.3, peoName: "Banita Patra", peoContact: "9439714047" },
  { id: 17, gpName: 'DUGUDHA', totalHouseholds: 2211, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 176900, monthlyWasteTotalGm: 5307000, totalWasteKg: 176.9, peoName: "Rasmita Kumari Sahu", peoContact: "9937501333" },
  { id: 18, gpName: 'KHALADI', totalHouseholds: 3196, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 255700, monthlyWasteTotalGm: 7671000, totalWasteKg: 255.7, peoName: "Biswanath Sail", peoContact: "9853454896" },
  { id: 19, gpName: 'BHIMTALI', totalHouseholds: 1696, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 135700, monthlyWasteTotalGm: 4071000, totalWasteKg: 135.7, peoName: "Surat Kumar Pradhan", peoContact: "9778346109" },
  { id: 20, gpName: 'KUNDABAI', totalHouseholds: 1392, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 111400, monthlyWasteTotalGm: 3342000, totalWasteKg: 111.4, peoName: "Prasanta Kumar Pattanayak", peoContact: "9439216480" },
  { id: 21, gpName: 'NUAGAN', totalHouseholds: 1410, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 11, dailyWasteTotalGm: 112800, monthlyWasteTotalGm: 3384000, totalWasteKg: 112.8, peoName: "Anita Behera", peoContact: "7381626128" },
  { id: 22, gpName: 'PATSANIPUR', totalHouseholds: 2207, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 176600, monthlyWasteTotalGm: 5298000, totalWasteKg: 176.6, peoName: "Harish Chandra Sahu", peoContact: "9337985204" },
  { id: 23, gpName: 'SRIRAMCHANDRAPUR', totalHouseholds: 2321, schools: 4, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 185700, monthlyWasteTotalGm: 5571000, totalWasteKg: 185.7, peoName: "Bijan Kumar Mohapatra", peoContact: "9853269370" },

  // RAIRANGPUR Block
  { id: 24, gpName: 'BHALUBASA', totalHouseholds: 2535, schools: 5, anganwadis: 8, panchayatGhar: 1, commercial: 22, dailyWasteTotalGm: 202800, monthlyWasteTotalGm: 6084000, totalWasteKg: 202.8, peoName: "Anil Kumar Mohanta(Jamda)", peoContact: "9438116732" },
  { id: 25, gpName: 'HALDA', totalHouseholds: 1670, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 133600, monthlyWasteTotalGm: 4008000, totalWasteKg: 133.6, peoName: "Ghasiram Marndi", peoContact: "8249077677" },
  { id: 26, gpName: 'SANPAKHANA', totalHouseholds: 3543, schools: 7, anganwadis: 10, panchayatGhar: 1, commercial: 28, dailyWasteTotalGm: 283500, monthlyWasteTotalGm: 8505000, totalWasteKg: 283.5, peoName: "Jharana Naik", peoContact: "9348704583" },
  { id: 27, gpName: 'BADMOUDA', totalHouseholds: 950, schools: 3, anganwadis: 4, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 76000, monthlyWasteTotalGm: 2280000, totalWasteKg: 76.0, peoName: "Sasmita Kisku", peoContact: "8917271296" },
  { id: 28, gpName: 'KULEISILA', totalHouseholds: 1585, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 126800, monthlyWasteTotalGm: 3804000, totalWasteKg: 126.8, peoName: "Pradeep Kumar Behera", peoContact: "9437615050" },
  { id: 29, gpName: 'SUDARSANPUR', totalHouseholds: 1957, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 156600, monthlyWasteTotalGm: 4698000, totalWasteKg: 156.6, peoName: "Mohan Patra", peoContact: "9348010793" },
  { id: 30, gpName: 'GUHALDANGRI', totalHouseholds: 2315, schools: 6, anganwadis: 8, panchayatGhar: 1, commercial: 20, dailyWasteTotalGm: 185200, monthlyWasteTotalGm: 5556000, totalWasteKg: 185.2, peoName: "Mohan Patra", peoContact: "9348010793" },
  { id: 31, gpName: 'HATIA', totalHouseholds: 1315, schools: 4, anganwadis: 5, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 105200, monthlyWasteTotalGm: 3156000, totalWasteKg: 105.2, peoName: "Budai Majhi", peoContact: "8917222481" },
  { id: 32, gpName: 'PURUNAPANI', totalHouseholds: 3012, schools: 8, anganwadis: 10, panchayatGhar: 1, commercial: 25, dailyWasteTotalGm: 241000, monthlyWasteTotalGm: 7230000, totalWasteKg: 241.0, peoName: "Hemanta Kumar Patra", peoContact: "8847836161" },

  // KARANJIA Block
  { id: 33, gpName: 'BADADEULI', totalHouseholds: 1627, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 162700, monthlyWasteTotalGm: 4881000, totalWasteKg: 162.7, peoName: "Nibedita Sethy", peoContact: "9337424183" },
  { id: 34, gpName: 'CHITRAPOSI', totalHouseholds: 2457, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 245700, monthlyWasteTotalGm: 7371000, totalWasteKg: 245.7, peoName: "Swadhin Kumar Mahanty", peoContact: "9658466655" },
  { id: 35, gpName: 'GHOSADA', totalHouseholds: 1521, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 152100, monthlyWasteTotalGm: 4563000, totalWasteKg: 152.1, peoName: "Swadhin Kumar Mahanty", peoContact: "-" },
  { id: 36, gpName: 'KERKERA', totalHouseholds: 1199, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 119900, monthlyWasteTotalGm: 3597000, totalWasteKg: 119.9, peoName: "Manoranjan Sethy", peoContact: "9777013411" },
  { id: 37, gpName: 'SARANGAGADA', totalHouseholds: 1056, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 7, dailyWasteTotalGm: 105600, monthlyWasteTotalGm: 3168000, totalWasteKg: 105.6, peoName: "Kajal Prusty", peoContact: "8984044908" },
  { id: 38, gpName: 'DORI', totalHouseholds: 2198, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 219800, monthlyWasteTotalGm: 6594000, totalWasteKg: 219.8, peoName: "Preetiranjan Mohanta", peoContact: "7008865037" },
  { id: 39, gpName: 'BALA', totalHouseholds: 1751, schools: 4, anganwadis: 6, panchayatGhar: 1, commercial: 12, dailyWasteTotalGm: 175100, monthlyWasteTotalGm: 5253000, totalWasteKg: 175.1, peoName: "Manoranjan Sethy", peoContact: "9777013411" },
  { id: 40, gpName: 'TATO', totalHouseholds: 1340, schools: 3, anganwadis: 5, panchayatGhar: 1, commercial: 10, dailyWasteTotalGm: 134000, monthlyWasteTotalGm: 4020000, totalWasteKg: 134.0, peoName: "Malay Ranjan Mohanta", peoContact: "8260105699" },
  { id: 41, gpName: 'BADAGAON', totalHouseholds: 2457, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 15, dailyWasteTotalGm: 245700, monthlyWasteTotalGm: 7371000, totalWasteKg: 245.7, peoName: "Malay Ranjan Mohanta", peoContact: "8260105699" },
  { id: 42, gpName: 'BATPALASA', totalHouseholds: 1208, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 9, dailyWasteTotalGm: 120800, monthlyWasteTotalGm: 3624000, totalWasteKg: 120.8, peoName: "Smita Soren", peoContact: "6371555871" },
  { id: 43, gpName: 'MIRIGINENDI', totalHouseholds: 1130, schools: 2, anganwadis: 4, panchayatGhar: 1, commercial: 8, dailyWasteTotalGm: 113000, monthlyWasteTotalGm: 3390000, totalWasteKg: 113.0, peoName: "Parshuram Nayak", peoContact: "6372824641" },
  { id: 44, gpName: 'RASAMTALA', totalHouseholds: 1914, schools: 5, anganwadis: 7, panchayatGhar: 1, commercial: 14, dailyWasteTotalGm: 191400, monthlyWasteTotalGm: 5742000, totalWasteKg: 191.4, peoName: "Kajal Prusty", peoContact: "8984044908" },
  { id: 45, gpName: 'DUDHIANI', totalHouseholds: 696, schools: 1, anganwadis: 3, panchayatGhar: 1, commercial: 6, dailyWasteTotalGm: 69600, monthlyWasteTotalGm: 2088000, totalWasteKg: 69.6, peoName: "Soraj Kumar Barik", peoContact: "7008089506" },
  { id: 46, gpName: 'KOLIPOSI', totalHouseholds: 2259, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 18, dailyWasteTotalGm: 225900, monthlyWasteTotalGm: 6777000, totalWasteKg: 225.9, peoName: "Soraj Kumar Barik", peoContact: "7008089506" },
  { id: 47, gpName: 'PATBIL', totalHouseholds: 2129, schools: 6, anganwadis: 9, panchayatGhar: 1, commercial: 16, dailyWasteTotalGm: 212900, monthlyWasteTotalGm: 6387000, totalWasteKg: 212.9, peoName: "Parshuram Nayak", peoContact: "6372824641" },
];
