export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Block Angul - Mishrapada MRF (1-12)
  { id: 1, block: 'Angul', gpName: 'Khalari', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 2, block: 'Angul', gpName: 'Chheliapada', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 3, block: 'Angul', gpName: 'Susuda', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 4, block: 'Angul', gpName: 'KangulaBentapur', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 5, block: 'Angul', gpName: 'Angarbandha', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 6, block: 'Angul', gpName: 'Balasinga', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 7, block: 'Angul', gpName: 'Inkarbandha', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 8, block: 'Angul', gpName: 'Basala', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 9, block: 'Angul', gpName: 'Bedasasan', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 10, block: 'Angul', gpName: 'Khinda', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 11, block: 'Angul', gpName: 'Gadatarash', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },
  { id: 12, block: 'Angul', gpName: 'Badakantukul', taggedUlb: 'Angul Municipality', taggedMrf: 'Mishrapada' },

  // Block Angul - Hulursinga MRF (13-34)
  { id: 13, block: 'Angul', gpName: 'Nuamouza', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 14, block: 'Angul', gpName: 'Baluakata', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 15, block: 'Angul', gpName: 'Kumurusinga', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 16, block: 'Angul', gpName: 'Bantala', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 17, block: 'Angul', gpName: 'Sankhapur', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 18, block: 'Angul', gpName: 'Pokatunga', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 19, block: 'Angul', gpName: 'Dhukuta', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 20, block: 'Angul', gpName: 'Nandapur', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 21, block: 'Angul', gpName: 'Bargounia', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 22, block: 'Angul', gpName: 'Talagarh', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 23, block: 'Angul', gpName: 'Jganathapur', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 24, block: 'Angul', gpName: 'Balanga', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 25, block: 'Angul', gpName: 'Purunakote', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 26, block: 'Angul', gpName: 'Tikarpada', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 27, block: 'Angul', gpName: 'Rantalei', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 28, block: 'Angul', gpName: 'Badakera', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 29, block: 'Angul', gpName: 'Matiasahi', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 30, block: 'Angul', gpName: 'Saradhapur', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 31, block: 'Angul', gpName: 'Manikajodi', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 32, block: 'Angul', gpName: 'Antulia', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 33, block: 'Angul', gpName: 'Kothabhuin', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },
  { id: 34, block: 'Angul', gpName: 'Tainshi', taggedUlb: 'Angul Municipality', taggedMrf: 'Hulursinga' },

  // Block Athamallik - Haridanali MRF (35-58)
  { id: 35, block: 'Athamallik', gpName: 'Aida', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 36, block: 'Athamallik', gpName: 'Ambasarmunda', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 37, block: 'Athamallik', gpName: 'Basudevpur', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 38, block: 'Athamallik', gpName: 'Jamudoli', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 39, block: 'Athamallik', gpName: 'Kampala', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 40, block: 'Athamallik', gpName: 'Kandhapada', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 41, block: 'Athamallik', gpName: 'Kanthapada', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 42, block: 'Athamallik', gpName: 'Kiakata', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 43, block: 'Athamallik', gpName: 'Krutibaspur', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 44, block: 'Athamallik', gpName: 'Kudgaon', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 45, block: 'Athamallik', gpName: 'Kurumtap', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 46, block: 'Athamallik', gpName: 'Luhasinga', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 47, block: 'Athamallik', gpName: 'Lunahandi', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 48, block: 'Athamallik', gpName: 'Madhapur', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 49, block: 'Athamallik', gpName: 'Maimura', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 50, block: 'Athamallik', gpName: 'Nagaon', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 51, block: 'Athamallik', gpName: 'Paikasahi', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 52, block: 'Athamallik', gpName: 'Pedipathar', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 53, block: 'Athamallik', gpName: 'Purunamantri', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 54, block: 'Athamallik', gpName: 'Sanahula', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 55, block: 'Athamallik', gpName: 'Sapaghara', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 56, block: 'Athamallik', gpName: 'Tapdhol', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 57, block: 'Athamallik', gpName: 'Thakurgarh', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },
  { id: 58, block: 'Athamallik', gpName: 'Tusar', taggedUlb: 'Athamallik NAC', taggedMrf: 'Haridanali' },

  // Block Talcher - Ranipark MRF (59-63)
  { id: 59, block: 'Talcher', gpName: 'Brajanathapur', taggedUlb: 'Talcher Municipality', taggedMrf: 'Ranipark' },
  { id: 60, block: 'Talcher', gpName: 'Dharmapur', taggedUlb: 'Talcher Municipality', taggedMrf: 'Ranipark' },
  { id: 61, block: 'Talcher', gpName: 'Gurujanguli', taggedUlb: 'Talcher Municipality', taggedMrf: 'Ranipark' },
  { id: 62, block: 'Talcher', gpName: 'Kankil', taggedUlb: 'Talcher Municipality', taggedMrf: 'Ranipark' },
  { id: 63, block: 'Talcher', gpName: 'Kandhal', taggedUlb: 'Talcher Municipality', taggedMrf: 'Ranipark' },

  // Block Talcher - Baghubal MRF (64-77)
  { id: 64, block: 'Talcher', gpName: 'Bantol', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 65, block: 'Talcher', gpName: 'Badajorda', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 66, block: 'Talcher', gpName: 'Danara', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 67, block: 'Talcher', gpName: 'Dera', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 68, block: 'Talcher', gpName: 'Ghantapada', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 69, block: 'Talcher', gpName: 'Gobara', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 70, block: 'Talcher', gpName: 'Gopalprasad', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 71, block: 'Talcher', gpName: 'Gurujanga', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 72, block: 'Talcher', gpName: 'Jaganathpur', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 73, block: 'Talcher', gpName: 'Karnapur', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 74, block: 'Talcher', gpName: 'Kumunda', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 75, block: 'Talcher', gpName: 'Padmabatipur', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 76, block: 'Talcher', gpName: 'Santhapada', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
  { id: 77, block: 'Talcher', gpName: 'Tentulei', taggedUlb: 'Talcher Municipality', taggedMrf: 'Baghubal' },
];
