
export interface CollectionScheduleItem {
  id: number;
  block: string;
  ulb: string;
  mrf: string;
  vehicleType: string;
  vehicleNo: string;
  vehicleCapacity: string;
  driverName: string;
  driverContact: string;
  collectionSchedule: string;
  gpName: string;
  wasteGeneratedKg: number;
  gpNodalPerson: string;
  gpNodalContact: string;
  ulbNodalPerson: string;
  ulbNodalContact: string;
}

export const collectionScheduleData: CollectionScheduleItem[] = [
  // Angul Block - Hulursingha MRF
  {
    id: 1,
    block: 'Angul',
    ulb: 'Angul ULB',
    mrf: 'MRF 1 (Hulursingha)',
    vehicleType: 'Single Chambered Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'Friday of 1st week',
    gpName: 'Hulursingha Cluster (AANGH1)',
    wasteGeneratedKg: 20848,
    gpNodalPerson: 'Puspanjani Pradhan, Bhagaban Sandha, Rutuparna Pradhan, Mita Behera, Judhister Sahu, Mahima Prasad Garnaik, Abhijit Sahu, Sanghamitra Pradhan, Rojalin Pradhan, Sangram Keshari Nath, Kshyamanidhi Jani, Kshyamanidhi Jani, Sushanta Kumar Jani, Durga Charan Sahu, Kumar Bulu Singh, Sridhar Sahu, Tapaswini Garnaik, Abhaya Kumar Pradhan, Abhaya Kumar Pradhan, Mamata Sahoo, Niranjan Dehury, Mamta Sahoo',
    gpNodalContact: '8917498166, 9337623240, 8457061612, 9668682252, 9556247020, 7008636905, 8249940433, 9337062615, 7978770748, 8328935286, 8249360010, 8249360010, 7205125761, 9938481729, 6370281454, 7008910414, 8984102641, 7751028868, 7751028868, 9438774006, 9348309634, 9438774006',
    ulbNodalPerson: 'Deepak Kumar Sahu',
    ulbNodalContact: '9861105900'
  },
  // Angul Block - Mishrapada MRF
  {
    id: 2,
    block: 'Angul',
    ulb: 'Angul ULB',
    mrf: 'MRF 2 (Mishrapada)',
    vehicleType: 'Single Chambered Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'Friday of 2nd week',
    gpName: 'Mishrapada Cluster (AANGM2)',
    wasteGeneratedKg: 43136,
    gpNodalPerson: 'Gitanjali Behera, Debabrata Bhoi, Mandakini Naik, Debabrata Bhoi, Arun Kumar Pradhan, Bhagaban Sandha, Girish Chandra Mishra, Saroj Kumar Pradhan, Niranjan Sahu, Pratap Chandra Pradhan, Jyotismita Pradhan, Pratap chandra Pradhan',
    gpNodalContact: '9337947447, 8249784973, 9668180828, 8249784973, 9556633561, 9337623240, 8249242478, 9937756822, 9777067532, 9437602006, 7854090649, 9437602006',
    ulbNodalPerson: 'Deepak Kumar Sahu',
    ulbNodalContact: '9861105900'
  },
  // Athamallick Block - Haridanali MRF
  {
    id: 3,
    block: 'Athamallick',
    ulb: 'Athamallick NAC',
    mrf: 'MRF(ward no.1 Haridanali Chasasahi)',
    vehicleType: 'Single Chambered Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'Friday of 1st week',
    gpName: 'Haridanali Cluster (AATHN1)',
    wasteGeneratedKg: 15138,
    gpNodalPerson: 'Mohan Naik, Prashant Kumar Nayak, Alok Chandra Pradhan, Bimbadhar Sahoo, Sanjay kumar Pradhan, Kabuli Charan Nayak, Rama Ch. Parida, Kabuli Charan Nayak, Prashant Kumar Nayak, Sailabala Mirdha, Anita Raul, Subash Gochhayat, Manas Ranjan Sahu, Alok Chandra Pradhan, Rama Ch. Parida, Dharitri Padhan, Srikant Pradhan, Chitaranjan Nayak, Prabhat Kumar Khatua, Gyanaranjan Bhukta, Ajit Kumar Pradhan, Manasmita Sethy, Manas Ranjan Sahu, Chitaranjan Nayak',
    gpNodalContact: '9938451414, 9337477261, 8917511242, 9556266274, 9692351432, 7854002878, 7978856710, 7854002878, 9337477261, 9178999275, 7008912464, 9439595612, 8249325790, 8917511242, 7978856710, 6370247233, 8917388553, 6370544009, 8328953137, 9938783940, 7008770660, 9078369484, 8249325790, 6370544009',
    ulbNodalPerson: 'Abinash Mishra',
    ulbNodalContact: '7008028934'
  },
  // Talcher Block - Ranipark MRF
  {
    id: 4,
    block: 'Talcher',
    ulb: 'Talcher ULB',
    mrf: 'MRF 1 (Ranipark)',
    vehicleType: 'Single Chambered Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'Friday of 1st week',
    gpName: 'Ranipark Cluster (ATALR1)',
    wasteGeneratedKg: 5193,
    gpNodalPerson: 'Dusmanta Pradhan, Rakesh Rosan Pal, Bichanda Behera, Bichanda Behera, Prashanta Dehury',
    gpNodalContact: '8144236068, 9438824462, 8249314435, 8149314435, 9348316736',
    ulbNodalPerson: 'Priyajit Sethi',
    ulbNodalContact: '8249110714'
  },
  // Talcher Block - Baghubal MRF
  {
    id: 5,
    block: 'Talcher',
    ulb: 'Talcher ULB',
    mrf: 'MRF 2(Baghubal)',
    vehicleType: 'Single Chambered Vehicle',
    vehicleNo: '-',
    vehicleCapacity: '400',
    driverName: '-',
    driverContact: '-',
    collectionSchedule: 'Friday of 2nd week',
    gpName: 'Baghubal Cluster (ATALB2)',
    wasteGeneratedKg: 5220,
    gpNodalPerson: 'Prgyan Mohanty, Bikram Keshari Behera, Bikram Keshari Behera, Subhasmita Garnaik, Nimain Charan Dehury, Pramod Behera, Bijaya Kumar Sahu, Dusmanta Pradhan, Anita Rout, Satya Ranjan Parida, Bijaya Kumar Sahu, Bideshi Mohanty, Kumuda Ch Majhi, Monalisha Pradhan',
    gpNodalContact: '8908904308, 9937423380, 9937423380, 8917371031, 8114328369, 9438092263, 9337407339, 8144236068, 8984246163, 8658411104, 9337407339, 9437122145, 9861359118, 8328835764',
    ulbNodalPerson: 'Priyajit Sethi',
    ulbNodalContact: '8249110714'
  }
];
