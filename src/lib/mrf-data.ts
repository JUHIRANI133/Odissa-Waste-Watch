
export interface MrfData {
  id: number;
  district: string;
  ulbName: string;
  categoryOfUlb: string;
  mrfId: string;
  functionality: 'Functional' | 'Not Functional' | 'Partial Functional';
  blockCovered: string;
  gpsCovered: number;
  households: number;
  dryWasteKg: number;
  institutions?: number;
}

export const mrfData: MrfData[] = [
  // 01. Angul
  { id: 1, district: 'Angul', ulbName: 'Angul Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 1 (Hulursingha)', functionality: 'Functional', blockCovered: 'Angul', gpsCovered: 23, households: 25000, dryWasteKg: 40000 },
  { id: 2, district: 'Angul', ulbName: 'Angul Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 2 (Mishrapada)', functionality: 'Functional', blockCovered: 'Angul', gpsCovered: 12, households: 43136, dryWasteKg: 43136 },
  { id: 3, district: 'Angul', ulbName: 'Athamallik NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF(ward no.1 Haridanali)', functionality: 'Functional', blockCovered: 'Athamallik', gpsCovered: 24, households: 20000, dryWasteKg: 30000 },
  { id: 4, district: 'Angul', ulbName: 'Talcher ULB', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 1 (Ranipark)', functionality: 'Functional', blockCovered: 'Talcher', gpsCovered: 5, households: 35000, dryWasteKg: 50000 },
  { id: 5, district: 'Angul', ulbName: 'Talcher ULB', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 2(Baghubal)', functionality: 'Functional', blockCovered: 'Talcher', gpsCovered: 14, households: 35000, dryWasteKg: 50000 },
  
  // 02. Balangir
  { id: 6, district: 'Balangir', ulbName: 'Balangir', categoryOfUlb: 'Amrut Town', mrfId: 'Balangir MRF', functionality: 'Functional', blockCovered: 'Balangir', gpsCovered: 25, households: 30000, dryWasteKg: 45000 },
  { id: 7, district: 'Balangir', ulbName: 'Tusura', categoryOfUlb: 'Non Amrut Town', mrfId: 'Tusura MRF', functionality: 'Functional', blockCovered: 'Gudvella', gpsCovered: 13, households: 15000, dryWasteKg: 22000 },
  { id: 8, district: 'Balangir', ulbName: 'Patnagarh', categoryOfUlb: 'Non Amrut Town', mrfId: 'Patnagarh MRF', functionality: 'Functional', blockCovered: 'Patnagarh', gpsCovered: 30, households: 25000, dryWasteKg: 40000 },
  { id: 9, district: 'Balangir', ulbName: 'Titlagarh', categoryOfUlb: 'Amrut Town', mrfId: 'Titlagarh MRF', functionality: 'Functional', blockCovered: 'Titlagarh', gpsCovered: 24, households: 28000, dryWasteKg: 42000 },
  { id: 10, district: 'Balangir', ulbName: 'Kantabanji', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kantabanji MRF', functionality: 'Functional', blockCovered: 'Tureikela', gpsCovered: 19, households: 20000, dryWasteKg: 30000 },
  
  // 03. Baleswar
  { id: 11, district: 'Baleswar', ulbName: 'Balasore Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF Purna Baleswar', functionality: 'Functional', blockCovered: 'Baleswar', gpsCovered: 18, households: 45000, dryWasteKg: 65000 },
  { id: 12, district: 'Baleswar', ulbName: 'Balasore Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF-2(Sahadevkhunta)', functionality: 'Functional', blockCovered: 'Baleswar', gpsCovered: 19, households: 45000, dryWasteKg: 65000 },
  { id: 13, district: 'Baleswar', ulbName: 'Jaleswar Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Jaleswar-MRF', functionality: 'Functional', blockCovered: 'Jaleswar', gpsCovered: 35, households: 25000, dryWasteKg: 40000 },
  { id: 14, district: 'Baleswar', ulbName: 'Soro Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Soro-MRF', functionality: 'Functional', blockCovered: 'Soro', gpsCovered: 24, households: 18000, dryWasteKg: 32000 },
  { id: 15, district: 'Baleswar', ulbName: 'Nilagiri NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Nilgiri-MRF', functionality: 'Functional', blockCovered: 'Nilgiri', gpsCovered: 25, households: 15000, dryWasteKg: 28000 },
  { id: 16, district: 'Baleswar', ulbName: 'Remuna NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Remuna-NAC-MRF', functionality: 'Functional', blockCovered: 'Remuna', gpsCovered: 32, households: 22000, dryWasteKg: 38000 },

  // 04. Bargarh
  { id: 17, district: 'Bargarh', ulbName: 'Attabira NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF 1', functionality: 'Functional', blockCovered: 'Attabira', gpsCovered: 12, households: 25000, dryWasteKg: 40000 },
  { id: 18, district: 'Bargarh', ulbName: 'Attabira NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF 2', functionality: 'Functional', blockCovered: 'Attabira', gpsCovered: 12, households: 25000, dryWasteKg: 40000 },
  { id: 19, district: 'Bargarh', ulbName: 'Bargarh Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 1', functionality: 'Functional', blockCovered: 'Bargarh', gpsCovered: 12, households: 30000, dryWasteKg: 48000 },
  { id: 20, district: 'Bargarh', ulbName: 'Bargarh Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 2', functionality: 'Functional', blockCovered: 'Bargarh', gpsCovered: 5, households: 30000, dryWasteKg: 48000 },
  { id: 21, district: 'Bargarh', ulbName: 'Bargarh Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'MRF 3', functionality: 'Functional', blockCovered: 'Bargarh', gpsCovered: 10, households: 30000, dryWasteKg: 48000 },
  { id: 22, district: 'Bargarh', ulbName: 'Barpali NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF 1', functionality: 'Functional', blockCovered: 'Barpali', gpsCovered: 11, households: 15000, dryWasteKg: 20000 },
  { id: 23, district: 'Bargarh', ulbName: 'Barpali NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF 2', functionality: 'Functional', blockCovered: 'Barpali', gpsCovered: 12, households: 15000, dryWasteKg: 20000 },

  // 05. Bhadrak
  { id: 24, district: 'Bhadrak', ulbName: 'Bhadrak Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'Bidanga MRF 1', functionality: 'Functional', blockCovered: 'Bhadrak', gpsCovered: 36, households: 45000, dryWasteKg: 65000 },
  { id: 25, district: 'Bhadrak', ulbName: 'Dhamnagar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Wealth Center Rahapita', functionality: 'Functional', blockCovered: 'Dhamnagar', gpsCovered: 31, households: 28000, dryWasteKg: 42000 },
  { id: 26, district: 'Bhadrak', ulbName: 'Chandbali NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kunjakalika MRF1', functionality: 'Functional', blockCovered: 'Chandabali', gpsCovered: 36, households: 25000, dryWasteKg: 35000 },
  { id: 27, district: 'Bhadrak', ulbName: 'Basudevpur Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Basudevpur', functionality: 'Functional', blockCovered: 'Basudevpur', gpsCovered: 36, households: 22000, dryWasteKg: 38000 },
  
  // 06. Boudh
  { id: 28, district: 'Boudh', ulbName: 'BOUDHGARH ULB', categoryOfUlb: 'Non Amrut Town', mrfId: 'BOUDHGARH MRF1', functionality: 'Functional', blockCovered: 'Boudh', gpsCovered: 14, households: 15000, dryWasteKg: 25000 },
  { id: 29, district: 'Boudh', ulbName: 'BOUDHGARH ULB', categoryOfUlb: 'Non Amrut Town', mrfId: 'BOUDHGARH MRF1', functionality: 'Functional', blockCovered: 'Harabhanga', gpsCovered: 9, households: 8000, dryWasteKg: 12000 },
  
  // 07. Cuttack
  { id: 30, district: 'Cuttack', ulbName: 'ATHAGARH NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'CTC/ATH/MRF/001', functionality: 'Functional', blockCovered: 'ATHAGAD', gpsCovered: 34, households: 40000, dryWasteKg: 60000 },
  { id: 31, district: 'Cuttack', ulbName: 'CMC CUTTACK', categoryOfUlb: 'Amrut Town', mrfId: 'CTC/CUT/MRF/001', functionality: 'Functional', blockCovered: 'CUTTACKSADAR', gpsCovered: 23, households: 35000, dryWasteKg: 55000 },
  { id: 32, district: 'Cuttack', ulbName: 'BANKI NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'CTC/BAN/MRF/001', functionality: 'Functional', blockCovered: 'Banki', gpsCovered: 20, households: 18000, dryWasteKg: 28000 },
  { id: 33, district: 'Cuttack', ulbName: 'BANKI NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'CTC/BAN/MRF/001', functionality: 'Functional', blockCovered: 'Banki-Dampada', gpsCovered: 17, households: 15000, dryWasteKg: 22000 },
  { id: 34, district: 'Cuttack', ulbName: 'Choudwar Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'CTC/CHO/MRF/001', functionality: 'Functional', blockCovered: 'TANGI CHOUDWAR', gpsCovered: 24, households: 25000, dryWasteKg: 40000 },
  
  // 08. Deogarh
  { id: 35, district: 'Deogarh', ulbName: 'Deogarh Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Deogarh (Benjatinali)', functionality: 'Functional', blockCovered: 'Tileibani', gpsCovered: 20, households: 22000, dryWasteKg: 35000 },
  
  // 09. Dhenkanal
  { id: 36, district: 'Dhenkanal', ulbName: 'DHENKANAL MUNICIPALITY', categoryOfUlb: 'Amrut Town', mrfId: 'MRF1 Kathagada', functionality: 'Functional', blockCovered: 'Dhenkanal Sadar', gpsCovered: 30, households: 35000, dryWasteKg: 55000 },
  { id: 37, district: 'Dhenkanal', ulbName: 'BHUBAN NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF1KOLHASAHI', functionality: 'Functional', blockCovered: 'Bhuban', gpsCovered: 18, households: 15000, dryWasteKg: 22000 },
  { id: 38, district: 'Dhenkanal', ulbName: 'HINDOL NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF1', functionality: 'Functional', blockCovered: 'HINDOL', gpsCovered: 35, households: 22000, dryWasteKg: 32000 },
  { id: 39, district: 'Dhenkanal', ulbName: 'KAMAKHYANAGAR NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF', functionality: 'Functional', blockCovered: 'KAMAKHYANAGAR', gpsCovered: 22, households: 20000, dryWasteKg: 30000 },
  
  // 10. Gajapati
  { id: 40, district: 'Gajapati', ulbName: 'Paralakhemundi', categoryOfUlb: 'Non Amrut Town', mrfId: 'Paralakhemundi Stadium', functionality: 'Functional', blockCovered: 'Gosani', gpsCovered: 2, households: 12000, dryWasteKg: 18000 },
  { id: 41, district: 'Gajapati', ulbName: 'Paralakhemundi', categoryOfUlb: 'Non Amrut Town', mrfId: 'Betaguda', functionality: 'Functional', blockCovered: 'Gumma', gpsCovered: 1, households: 8000, dryWasteKg: 12000 },
  { id: 42, district: 'Gajapati', ulbName: 'Kashinagar', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kashinagar', functionality: 'Functional', blockCovered: 'Kashinagar', gpsCovered: 4, households: 10000, dryWasteKg: 15000 },
  
  // 11. Ganjam
  { id: 43, district: 'Ganjam', ulbName: 'Aska NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Aska NAC MRF 1', functionality: 'Functional', blockCovered: 'Aska', gpsCovered: 19, households: 25000, dryWasteKg: 38000 },
  { id: 44, district: 'Ganjam', ulbName: 'Belaguntha NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Belaguntha MRF', functionality: 'Functional', blockCovered: 'Belaguntha', gpsCovered: 8, households: 12000, dryWasteKg: 18000 },
  { id: 45, district: 'Ganjam', ulbName: 'Bhanjanagar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Bhanjanagar MRF', functionality: 'Functional', blockCovered: 'Bhanjanagar', gpsCovered: 11, households: 20000, dryWasteKg: 30000 },
  
  // 12. Jagatsinghpur
  { id: 46, district: 'Jagatsinghpur', ulbName: 'Jagatsinghpur ULB', categoryOfUlb: 'Non Amrut Town', mrfId: 'Jagatsinghpur', functionality: 'Functional', blockCovered: 'Jagatsinghpur', gpsCovered: 3, households: 10000, dryWasteKg: 15000 },
  { id: 47, district: 'Jagatsinghpur', ulbName: 'Paradeep', categoryOfUlb: 'Non Amrut Town', mrfId: 'Paradeep', functionality: 'Functional', blockCovered: 'Kujanga', gpsCovered: 3, households: 12000, dryWasteKg: 18000 },
  
  // 13. Jajpur
  { id: 48, district: 'Jajpur', ulbName: 'JAJPUR MUNICIPALITY', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kodandapur', functionality: 'Functional', blockCovered: 'Jajpur', gpsCovered: 15, households: 18000, dryWasteKg: 28000 },
  { id: 49, district: 'Jajpur', ulbName: 'VYSANAGAR MUNICIPALITY', categoryOfUlb: 'Non Amrut Town', mrfId: 'Jodabara', functionality: 'Functional', blockCovered: 'Korei', gpsCovered: 19, households: 22000, dryWasteKg: 32000 },
  
  // 14. Jharsuguda
  { id: 50, district: 'Jharsuguda', ulbName: 'Jharsuguda', categoryOfUlb: 'Amrut Town', mrfId: 'Jharsuguda MRF', functionality: 'Functional', blockCovered: 'Jharsuguda', gpsCovered: 12, households: 25000, dryWasteKg: 40000 },
  { id: 51, district: 'Jharsuguda', ulbName: 'Brajarajnagar', categoryOfUlb: 'Non Amrut Town', mrfId: 'Brajarajnagar', functionality: 'Functional', blockCovered: 'Jharsuguda', gpsCovered: 5, households: 12000, dryWasteKg: 18000 },
  
  // 15. Kalahandi
  { id: 52, district: 'Kalahandi', ulbName: 'Bhabanipatna Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'Bhabanipatna', functionality: 'Functional', blockCovered: 'Bhabanipatna', gpsCovered: 36, households: 35000, dryWasteKg: 55000 },
  { id: 53, district: 'Kalahandi', ulbName: 'DHARAMGARH NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Dharamgarh', functionality: 'Functional', blockCovered: 'Dharamgarh', gpsCovered: 24, households: 22000, dryWasteKg: 32000 },
  
  // 16. Kandhamal
  { id: 54, district: 'Kandhamal', ulbName: 'BALLIGUDA', categoryOfUlb: 'Non Amrut Town', mrfId: 'NAC , BALLIGUDA', functionality: 'Functional', blockCovered: 'BALLIGUDA', gpsCovered: 14, households: 15000, dryWasteKg: 25000 },
  { id: 55, district: 'Kandhamal', ulbName: 'Phulbani', categoryOfUlb: 'Non Amrut Town', mrfId: 'ULB Phulbani', functionality: 'Functional', blockCovered: 'Phulbani', gpsCovered: 11, households: 18000, dryWasteKg: 28000 },
  
  // 17. Kendrapara
  { id: 56, district: 'Kendrapara', ulbName: 'Kendrapara', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kendrapara MRF', functionality: 'Functional', blockCovered: 'Kendrapara', gpsCovered: 27, households: 28000, dryWasteKg: 42000 },
  { id: 57, district: 'Kendrapara', ulbName: 'Pattamundei', categoryOfUlb: 'Non Amrut Town', mrfId: 'Pattamundei MRF', functionality: 'Functional', blockCovered: 'Pattamundei', gpsCovered: 31, households: 30000, dryWasteKg: 45000 },
  
  // 18. Kendujhar
  { id: 58, district: 'Kendujhar', ulbName: 'Kendujhargarh Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Brahmanigaon', functionality: 'Functional', blockCovered: 'Kendujhar Sadar', gpsCovered: 25, households: 25000, dryWasteKg: 38000 },
  { id: 59, district: 'Kendujhar', ulbName: 'Anandapur Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Salapada', functionality: 'Functional', blockCovered: 'Anandapur', gpsCovered: 18, households: 20000, dryWasteKg: 30000 },
  
  // 19. Khordha
  { id: 60, district: 'Khordha', ulbName: 'BMC', categoryOfUlb: 'Amrut Town', mrfId: 'BASUAGHAI', functionality: 'Functional', blockCovered: 'Bhubaneswar', gpsCovered: 20, households: 80000, dryWasteKg: 150000 },
  { id: 61, district: 'Khordha', ulbName: 'KHORDHA MUNICIPALITY', categoryOfUlb: 'Non Amrut Town', mrfId: 'KHORDHA MUNICIPALITY', functionality: 'Functional', blockCovered: 'KHORDHA', gpsCovered: 2, households: 10000, dryWasteKg: 15000 },
  
  // 20. Koraput
  { id: 62, district: 'Koraput', ulbName: 'Jeypore', categoryOfUlb: 'Amrut Town', mrfId: 'Jeypore', functionality: 'Functional', blockCovered: 'Jeypore', gpsCovered: 2, households: 20000, dryWasteKg: 35000 },
  { id: 63, district: 'Koraput', ulbName: 'Koraput', categoryOfUlb: 'Non Amrut Town', mrfId: 'Koraput', functionality: 'Functional', blockCovered: 'Koraput', gpsCovered: 2, households: 15000, dryWasteKg: 25000 },
  
  // 21. Malkangiri
  { id: 64, district: 'Malkangiri', ulbName: 'Malkangiri Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'Malkangiri MRF', functionality: 'Functional', blockCovered: 'Malkangiri', gpsCovered: 5, households: 15000, dryWasteKg: 22000 },

  // 22. Mayurbhanj
  { id: 65, district: 'Mayurbhanj', ulbName: 'Baripada Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'RAGHUNATHPUR MRF', functionality: 'Functional', blockCovered: 'BARIPADA', gpsCovered: 11, households: 30000, dryWasteKg: 45000 },
  { id: 66, district: 'Mayurbhanj', ulbName: 'UDALA NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'MRF1 (MENDHAKHAI)', functionality: 'Functional', blockCovered: 'UDALA', gpsCovered: 12, households: 18000, dryWasteKg: 22000 },

  // 23. Nabarangpur
  { id: 67, district: 'Nabarangpur', ulbName: 'NABARANGAPUR ULB', categoryOfUlb: 'Non Amrut Town', mrfId: 'NABARANGAPUR MRF', functionality: 'Functional', blockCovered: 'Nabarangpur', gpsCovered: 13, households: 22000, dryWasteKg: 33000 },
  { id: 68, district: 'Nabarangpur', ulbName: 'UMERKOTE ULB', categoryOfUlb: 'Non Amrut Town', mrfId: 'Umerkote', functionality: 'Functional', blockCovered: 'Umerkote', gpsCovered: 26, households: 28000, dryWasteKg: 42000 },

  // 24. Nayagarh
  { id: 69, district: 'Nayagarh', ulbName: 'NAYAGARH Municipality', categoryOfUlb: 'Non Amrut Town', mrfId: 'NAYAGARH', functionality: 'Functional', blockCovered: 'NAYAGARH', gpsCovered: 29, households: 25000, dryWasteKg: 40000 },
  { id: 70, district: 'Nayagarh', ulbName: 'Odagaon NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Odagaon', functionality: 'Functional', blockCovered: 'Odagaon', gpsCovered: 36, households: 25000, dryWasteKg: 38000 },
  { id: 71, district: 'Nayagarh', ulbName: 'Daspalla NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Daspalla', functionality: 'Functional', blockCovered: 'Daspalla', gpsCovered: 20, households: 15000, dryWasteKg: 22000 },
  { id: 72, district: 'Nayagarh', ulbName: 'Ranpur NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Ranpur', functionality: 'Functional', blockCovered: 'Ranpur', gpsCovered: 37, households: 22000, dryWasteKg: 32000 },
  { id: 73, district: 'Nayagarh', ulbName: 'Khandapada NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Khandapada', functionality: 'Functional', blockCovered: 'Khandapada', gpsCovered: 22, households: 18000, dryWasteKg: 28000 },
  
  // 25. Nuapada
  { id: 74, district: 'Nuapada', ulbName: 'Khariar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'KHARIAR MRF', functionality: 'Functional', blockCovered: 'Khariar', gpsCovered: 26, households: 18000, dryWasteKg: 28000 },
  { id: 75, district: 'Nuapada', ulbName: 'Khariar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'KHARIAR MRF', functionality: 'Functional', blockCovered: 'Sinapali', gpsCovered: 27, households: 18000, dryWasteKg: 28000 },
  { id: 76, district: 'Nuapada', ulbName: 'Khariar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'KHARIAR MRF', functionality: 'Functional', blockCovered: 'Boden', gpsCovered: 15, households: 18000, dryWasteKg: 28000 },
  { id: 77, district: 'Nuapada', ulbName: 'Khariar NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'KHARIAR MRF', functionality: 'Functional', blockCovered: 'Komna', gpsCovered: 14, households: 18000, dryWasteKg: 28000 },
  { id: 78, district: 'Nuapada', ulbName: 'NUAPADANAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'NUAPADA MRF', functionality: 'Functional', blockCovered: 'Nuapada', gpsCovered: 2, households: 12000, dryWasteKg: 18000 },

  // 26. Puri
  { id: 79, district: 'Puri', ulbName: 'KONARK NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'Konark MRF', functionality: 'Functional', blockCovered: 'GOP', gpsCovered: 31, households: 22000, dryWasteKg: 35000 },
  { id: 80, district: 'Puri', ulbName: 'PURI MUNICIPALITY', categoryOfUlb: 'Amrut Town', mrfId: 'Baliapanda MRF', functionality: 'Functional', blockCovered: 'PURI SADAR', gpsCovered: 12, households: 35000, dryWasteKg: 55000 },
  { id: 81, district: 'Puri', ulbName: 'PURI MUNICIPALITY', categoryOfUlb: 'Amrut Town', mrfId: 'Masanichandi MRF', functionality: 'Functional', blockCovered: 'PURI SADAR', gpsCovered: 7, households: 35000, dryWasteKg: 55000 },
  { id: 82, district: 'Puri', ulbName: 'PURI MUNICIPALITY', categoryOfUlb: 'Amrut Town', mrfId: 'Talabania MRF', functionality: 'Functional', blockCovered: 'PURI SADAR', gpsCovered: 5, households: 35000, dryWasteKg: 55000 },
  { id: 83, district: 'Puri', ulbName: 'Pipili NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'PIPILI MRF', functionality: 'Functional', blockCovered: 'PIPILI', gpsCovered: 25, households: 28000, dryWasteKg: 42000 },
  { id: 84, district: 'Puri', ulbName: 'Nimapada NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'NIMAPADA MRF', functionality: 'Functional', blockCovered: 'NIMAPADA', gpsCovered: 32, households: 32000, dryWasteKg: 48000 },
  
  // 27. Rayagada
  { id: 85, district: 'Rayagada', ulbName: 'RAYAGADA', categoryOfUlb: 'Amrut Town', mrfId: 'ANTARIGUDA', functionality: 'Functional', blockCovered: 'RAYAGADA SDAR', gpsCovered: 28, households: 35000, dryWasteKg: 55000 },
  { id: 86, district: 'Rayagada', ulbName: 'Gunupur', categoryOfUlb: 'Non Amrut Town', mrfId: 'Kothaluguda', functionality: 'Functional', blockCovered: 'Gunupur', gpsCovered: 19, households: 15000, dryWasteKg: 22000 },
  { id: 87, district: 'Rayagada', ulbName: 'GUDARI NAC', categoryOfUlb: 'Non Amrut Town', mrfId: 'GUDARI NAC', functionality: 'Functional', blockCovered: 'GUDARI', gpsCovered: 9, households: 8000, dryWasteKg: 12000 },

  // 28. Sambalpur
  { id: 88, district: 'Sambalpur', ulbName: 'Sambalpur Municipality', categoryOfUlb: 'Amrut Town', mrfId: 'Sambalpur MRF', functionality: 'Functional', blockCovered: 'Sambalpur Sadar', gpsCovered: 15, households: 40000, dryWasteKg: 60000 },

  // 29. Sonepur
  { id: 89, district: 'Sonepur', ulbName: 'Sonepur-M', categoryOfUlb: 'Non Amrut town', mrfId: 'SONEPUR MRF', functionality: 'Functional', blockCovered: 'Sonepur', gpsCovered: 14, households: 20608, dryWasteKg: 39678 },
  { id: 90, district: 'Sonepur', ulbName: 'Binika NAC', categoryOfUlb: 'Non Amrut town', mrfId: 'Binika', functionality: 'Functional', blockCovered: 'Binika', gpsCovered: 16, households: 18000, dryWasteKg: 28000 },
  { id: 91, district: 'Sonepur', ulbName: 'Tarbha NAC', categoryOfUlb: 'Non Amrut town', mrfId: 'Tarbha', functionality: 'Functional', blockCovered: 'Tarbha', gpsCovered: 21, households: 22000, dryWasteKg: 32000 },
];
