export interface GpMappingData {
  id: number;
  block: string;
  gpName: string;
  taggedUlb: string;
  taggedMrf: string;
}

export const gpMappingData: GpMappingData[] = [
  // Block BALIANTA
  { id: 1, block: 'BALIANTA', gpName: 'BALIANTA', taggedUlb: 'BMC', taggedMrf: 'NAHARAKANTA' },
  { id: 2, block: 'BALIANTA', gpName: 'BENTAPUR', taggedUlb: 'BMC', taggedMrf: 'NAHARAKANTA' },
  { id: 3, block: 'BALIANTA', gpName: 'BHINGARPUR', taggedUlb: 'BMC', taggedMrf: 'NAHARAKANTA' },
  { id: 4, block: 'BALIANTA', gpName: 'JAGANNATHPUR', taggedUlb: 'BMC', taggedMrf: 'NAHARAKANTA' },
  { id: 5, block: 'BALIANTA', gpName: 'BAINCHUA', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 6, block: 'BALIANTA', gpName: 'PRATAPSASAN', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 7, block: 'BALIANTA', gpName: 'PURANPRADHAN', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 8, block: 'BALIANTA', gpName: 'SARAKANA', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 9, block: 'BALIANTA', gpName: 'SATYABHAMAPUR', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 10, block: 'BALIANTA', gpName: 'UMADEIBERHAMPUR', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },

  // Block BALIPATNA
  { id: 11, block: 'BALIPATNA', gpName: 'BHAPUR', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },

  // Block BANPUR
  { id: 12, block: 'BANPUR', gpName: 'GAMBHARIMUNDA', taggedUlb: 'BANPUR', taggedMrf: 'BANPUR' },
  { id: 13, block: 'BANPUR', gpName: 'NACHUNI', taggedUlb: 'BALUGAON', taggedMrf: 'BALUGAON' },

  // Block BEGUNIA
  { id: 14, block: 'BEGUNIA', gpName: 'SARUA', taggedUlb: 'KHORDHA MUNICIPALITY', taggedMrf: 'KHORDHA MUNICIPALITY' },
  { id: 15, block: 'BEGUNIA', gpName: 'BAGHAMARI', taggedUlb: 'KHORDHA MUNICIPALITY', taggedMrf: 'KHORDHA MUNICIPALITY' },

  // Block Bhubaneswar
  { id: 16, block: 'Bhubaneswar', gpName: 'BASUAGHAI', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 17, block: 'Bhubaneswar', gpName: 'SISUPALGARH', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 18, block: 'Bhubaneswar', gpName: 'DHAULI', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 19, block: 'Bhubaneswar', gpName: 'ITIPUR', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 20, block: 'Bhubaneswar', gpName: 'LINGIPUR', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 21, block: 'Bhubaneswar', gpName: 'TIKARAPADA', taggedUlb: 'BMC', taggedMrf: 'BASUAGHAI' },
  { id: 22, block: 'Bhubaneswar', gpName: 'BARIMUNDA', taggedUlb: 'BMC', taggedMrf: 'PANDRA' },
  { id: 23, block: 'Bhubaneswar', gpName: 'KALYANPUR', taggedUlb: 'BMC', taggedMrf: 'PANDRA' },
  { id: 24, block: 'Bhubaneswar', gpName: 'DADHA', taggedUlb: 'BMC', taggedMrf: 'PANDRA' },
  { id: 25, block: 'Bhubaneswar', gpName: 'INJANA', taggedUlb: 'BMC', taggedMrf: 'NILADRIBIHAR' },
  { id: 26, block: 'Bhubaneswar', gpName: 'RAGHUNATHPUR', taggedUlb: 'BMC', taggedMrf: 'NILADRIBIHAR' },
  { id: 27, block: 'Bhubaneswar', gpName: 'ANDHARUA', taggedUlb: 'BMC', taggedMrf: 'BHARATPUR' },
  { id: 28, block: 'Bhubaneswar', gpName: 'MALIPADA', taggedUlb: 'BMC', taggedMrf: 'BHARATPUR' },
  { id: 29, block: 'Bhubaneswar', gpName: 'CHANDAKA', taggedUlb: 'BMC', taggedMrf: 'BHARATPUR' },
  { id: 30, block: 'Bhubaneswar', gpName: 'KANTABADA', taggedUlb: 'BMC', taggedMrf: 'BHARATPUR' },
  { id: 31, block: 'Bhubaneswar', gpName: 'DARUTHENGA', taggedUlb: 'BMC', taggedMrf: 'BHARATPUR' },
  { id: 32, block: 'Bhubaneswar', gpName: 'RANSINGHPUR', taggedUlb: 'BMC', taggedMrf: 'BHAGABANPUR' },
  { id: 33, block: 'Bhubaneswar', gpName: 'TAMANDO', taggedUlb: 'BMC', taggedMrf: 'BHAGABANPUR' },
  { id: 34, block: 'Bhubaneswar', gpName: 'NANPUT', taggedUlb: 'BMC', taggedMrf: 'BHAGABANPUR' },
  { id: 35, block: 'Bhubaneswar', gpName: 'MENDHASAL', taggedUlb: 'BMC', taggedMrf: 'BHAGABANPUR' },

  // Block CHILIKA
  { id: 36, block: 'CHILIKA', gpName: 'DUNGAMAL', taggedUlb: 'BALUGAON', taggedMrf: 'BALUGAON' },
  { id: 37, block: 'CHILIKA', gpName: 'BADAKUL', taggedUlb: 'BALUGAON', taggedMrf: 'BALUGAON' },

  // Block JATNI
  { id: 38, block: 'JATNI', gpName: 'JANLA', taggedUlb: 'JATNI MUNICIPALITY', taggedMrf: 'JATNI MUNICIPALITY' },
  { id: 39, block: 'JATNI', gpName: 'BENAPANJARI', taggedUlb: 'JATNI MUNICIPALITY', taggedMrf: 'JATNI MUNICIPALITY' },

  // Block KHORDHA
  { id: 40, block: 'KHORDHA', gpName: 'NALIPADAARJUNPUR', taggedUlb: 'KHORDHA MUNICIPALITY', taggedMrf: 'KHORDHA MUNICIPALITY' },
  { id: 41, block: 'KHORDHA', gpName: 'GADAHALADIA', taggedUlb: 'KHORDHA MUNICIPALITY', taggedMrf: 'KHORDHA MUNICIPALITY' },

  // Block TANGI
  { id: 42, block: 'TANGI', gpName: 'BADAPARI', taggedUlb: 'TANGI', taggedMrf: 'TANGI' },
];
