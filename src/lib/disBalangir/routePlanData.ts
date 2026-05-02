export interface RoutePlanData {
  id: number;
  block: string;
  routeId: string;
  routeName: string;
  routeAbbreviation: string;
  startingGp: string;
  intermediateGps: string[];
  finalGp: string;
  destination: string;
  totalDistance: number;
  workers: {
    name: string;
    contact: string;
  }[];
  scheduledOn: string;
  remarks?: string;
}

export const routePlanData: RoutePlanData[] = [
  // Titlagarh Block - Tagged with Titlagarh MRF
  {
    id: 1,
    block: 'Titlagarh',
    routeId: 'B-Tit-BGKMSS-1',
    routeName: 'Kuskela-Binekela-Ghodar-Kuskela-Marlad-Sijuan-Sihini',
    routeAbbreviation: 'KSBMGS-1',
    startingGp: 'Kuskela',
    intermediateGps: ['Binekela', 'Ghodar', 'Kuskela', 'Marlad', 'Sijuan'],
    finalGp: 'Sihini',
    destination: 'Titlagarh MRF',
    totalDistance: 45,
    scheduledOn: '1st Monday',
    workers: [
      { name: 'ROHIT BAG', contact: '9337868367' },
      { name: 'KOUTUKA MAJHI', contact: '9556947091' },
      { name: 'JULI NAG', contact: '9078913408' },
      { name: 'LALIT TANDI', contact: '7077094043' },
      { name: 'PARME ADJUAD', contact: '8249517030' },
      { name: 'DRONO CHTTARIA', contact: '8018872129' }
    ]
  },
  {
    id: 2,
    block: 'Titlagarh',
    routeId: 'B-Tit-ADKKPS-2',
    routeName: 'Kursud-Adabahal-Digsira-Kholan-Kursud-Parasara-Surda-Bandupala-Jagua',
    routeAbbreviation: 'KDSAPK-2',
    startingGp: 'Kursud',
    intermediateGps: ['Adabahal', 'Digsira', 'Kholan', 'Kursud', 'Parasara', 'Surda', 'Bandupala', 'Jagua'],
    finalGp: 'Kholan',
    destination: 'Titlagarh MRF',
    totalDistance: 60,
    scheduledOn: '2nd Monday',
    workers: [
      { name: 'MADHABA PUTEL', contact: '8917442304' },
      { name: 'PREMANAD SAHU', contact: '9668125932' },
      { name: 'GAYATRI CHURA', contact: '8917395122' },
      { name: 'UMESH MAHANAND', contact: '6371145991' },
      { name: 'JHARU SUNA', contact: '6370564359' },
      { name: 'RAJKUMAR BANCHHO', contact: '7684844570' },
      { name: 'GITA TANDI', contact: '9937597476' },
      { name: 'GAYATRI KHARSEL', contact: '9778767007' }
    ]
  },
  {
    id: 3,
    block: 'Titlagarh',
    routeId: 'B-Tit-MMNS-3',
    routeName: 'Mahulpada-Manigaon-Naren-Sagadghat',
    routeAbbreviation: 'MSNMGSN-3',
    startingGp: 'Mahulpada',
    intermediateGps: ['Manigaon', 'Naren', 'Sagadghat'],
    finalGp: 'Naren',
    destination: 'Titlagarh MRF',
    totalDistance: 25,
    scheduledOn: '3rd Monday',
    workers: [
      { name: 'GANAPATI BAG', contact: '8249681560' },
      { name: 'KANAKA PADHAN', contact: '6372195552' },
      { name: 'PUJA SWAIN', contact: '9938563819' },
      { name: 'ARATI PATRA', contact: '9861105874' }
    ]
  },
  {
    id: 4,
    block: 'Titlagarh',
    routeId: 'B-Tit-BBBGKL-4',
    routeName: 'Ghantabahali-Banjipadar-Bhalegaon-Bijepur-Ghantabahali-Katarkela-Luthurbandh',
    routeAbbreviation: 'GBLBK-4',
    startingGp: 'Ghantabahali',
    intermediateGps: ['Banjipadar', 'Bhalegaon', 'Bijepur', 'Ghantabahali', 'Katarkela', 'Luthurbandh'],
    finalGp: 'Katarkela',
    destination: 'Titlagarh MRF',
    totalDistance: 40,
    scheduledOn: '4th Monday',
    workers: [
      { name: 'HEMAKANTA BAGART', contact: '7205432288' },
      { name: 'BHUMISUTA RANA', contact: '9777383130' },
      { name: 'BIKASH BEHERA', contact: '9556262357' },
      { name: 'BHARATI BEHERA', contact: '7735227944' },
      { name: 'ANJALI MAHANAND', contact: '8117017043' },
      { name: 'SUNITA BISI', contact: '9583477017' }
    ]
  },

  // Turekela Block - Tagged with Kantabanji MRF
  {
    id: 5,
    block: 'Turekela',
    routeId: 'B-Kan-BCCDKK-1',
    routeName: 'Chaulsukha-Buromal-Chaulsukha-Chatuanka-Dhamandanga-Karuanmunda-Khagsa',
    routeAbbreviation: 'CKKDBC-1',
    startingGp: 'Chaulsukha',
    intermediateGps: ['Buromal', 'Chaulsukha', 'Chatuanka', 'Dhamandanga', 'Karuanmunda', 'Khagsa'],
    finalGp: 'Chatuanka',
    destination: 'Kantabanji MRF',
    totalDistance: 20,
    scheduledOn: '1st Monday',
    workers: [
      { name: 'Santoshini Dash', contact: '9937359075' },
      { name: 'Pankhita Tandi', contact: '8018039014' },
      { name: 'Baldev Mahananda', contact: '7327942990' },
      { name: 'Rama Kumbhar', contact: '9937881512' },
      { name: 'Achuta Banchhor', contact: '9937126880' },
      { name: 'Trinath Hati', contact: '7371098883' }
    ]
  },
  {
    id: 6,
    block: 'Turekela',
    routeId: 'B-Kan-HJKKT-2',
    routeName: 'Turekela-Hial-Jharani-Kambimunda-Kuibahal',
    routeAbbreviation: 'TKKJH-2',
    startingGp: 'Turekela',
    intermediateGps: ['Hial', 'Jharani', 'Kambimunda', 'Kuibahal'],
    finalGp: 'Hial',
    destination: 'Kantabanji MRF',
    totalDistance: 30,
    scheduledOn: '2nd Monday',
    workers: [
      { name: 'Phagun Sibsa', contact: '7325899710' },
      { name: 'Dinesh Meher', contact: '8658228024' },
      { name: 'Kaibala Kumbhar', contact: '6372503423' },
      { name: 'Subhadra Kumbhar', contact: '6372308324' },
      { name: 'Jema Sagaria', contact: '7853997796' }
    ]
  },
  {
    id: 7,
    block: 'Turekela',
    routeId: 'B-Kan-BGKM-3',
    routeName: 'Kandei-Badbanki-Ghunesh-Mahakhand',
    routeAbbreviation: 'KMBG-3',
    startingGp: 'Kandei',
    intermediateGps: ['Badbanki', 'Ghunesh', 'Mahakhand'],
    finalGp: 'Ghunesh',
    destination: 'Kantabanji MRF',
    totalDistance: 70,
    scheduledOn: '3rd Monday',
    workers: [
      { name: 'Prabhat Nag', contact: '9937089645' },
      { name: 'Keshab Bhoi', contact: '7855972257' },
      { name: 'Kabita Putel', contact: '7326051551' },
      { name: 'Debarchan Sabaria', contact: '7077014802' }
    ]
  },
  {
    id: 8,
    block: 'Turekela',
    routeId: 'B-Kan-BDHM-4',
    routeName: 'Halanbhata-Baddhakla-Dholmandal-Mahulpati',
    routeAbbreviation: 'HDBM-4',
    startingGp: 'Halanbhata',
    intermediateGps: ['Baddhakla', 'Dholmandal', 'Mahulpati'],
    finalGp: 'Mahulpati',
    destination: 'Kantabanji MRF',
    totalDistance: 70,
    scheduledOn: '4th Monday',
    workers: [
      { name: 'Lokeshwar Kharsel', contact: '9337488254' },
      { name: 'Somanath Nag', contact: '7325911533' },
      { name: 'Debendra Bariha', contact: '6370257722' },
      { name: 'Sudhir Sahu', contact: '7608049631' }
    ]
  },

  // Balangir Block - Tagged with Balangir MRF
  {
    id: 9,
    block: 'Balangir',
    routeId: 'B-Bal-CKMMS-1',
    routeName: 'Manhira-Chandanbhati-Khaliapali-Manhira-Sakma-Mirdhpali',
    routeAbbreviation: 'MKSCM-1',
    startingGp: 'Manhira',
    intermediateGps: ['Chandanbhati', 'Khaliapali', 'Manhira', 'Sakma'],
    finalGp: 'Mirdhpali',
    destination: 'Balangir MRF',
    totalDistance: 40,
    scheduledOn: '1st Monday',
    workers: [
      { name: 'Annapura Sahu', contact: '9178007835' },
      { name: 'Brubani Siai', contact: '8926224929' },
      { name: 'Bimala Das', contact: '9938703074' },
      { name: 'Chandan Bag', contact: '8249265977' },
      { name: 'Shankar Chhatria', contact: '6304128289' }
    ]
  },
  {
    id: 10,
    block: 'Balangir',
    routeId: 'B-Bal-BKMS-2',
    routeName: 'Barkani-Barkani-Khujenpali-Madhiapali-Sadeipali',
    routeAbbreviation: 'BKMS-2',
    startingGp: 'Barkani',
    intermediateGps: ['Barkani', 'Khujenpali', 'Madhiapali'],
    finalGp: 'Sadeipali',
    destination: 'Balangir MRF',
    totalDistance: 25,
    scheduledOn: '2nd Monday',
    workers: [
      { name: 'Maheswari Nath', contact: '8249249095' },
      { name: 'Gayatri Bag', contact: '7377103814' },
      { name: 'Chandan Das', contact: '8249245977' },
      { name: 'Kelananda Suna', contact: '8144084056' }
    ]
  },
  {
    id: 11,
    block: 'Balangir',
    routeId: 'B-Bal-BCKSS-3',
    routeName: 'Bhutiarbahal-Chikalbahal-Kudasingha-Sahabahal-Sikachhida',
    routeAbbreviation: 'BSKCS-3',
    startingGp: 'Bhutiarbahal',
    intermediateGps: ['Bhutiarbahal', 'Chikalbahal', 'Kudasingha', 'Sahabahal', 'Sikachhida'],
    finalGp: 'Sikachhida',
    destination: 'Balangir MRF',
    totalDistance: 20,
    scheduledOn: '3rd Monday',
    workers: [
      { name: 'Laxmi Bai', contact: '9853537974' },
      { name: 'Pratibha Bag', contact: '6370526357' },
      { name: 'Amita Sahu', contact: '8847819476' },
      { name: 'Laxmi Nag', contact: '7684962930' },
      { name: 'Tarun Rai', contact: '8480475584' }
    ]
  },
  {
    id: 12,
    block: 'Balangir',
    routeId: 'B-Bal-BBBST-4',
    routeName: 'Sibtala-Baidipali-Barapudgia-Bidikhat-Sibtala-Tusurabahal',
    routeAbbreviation: 'STBBB-4',
    startingGp: 'Sibtala',
    intermediateGps: ['Baidipali', 'Barapudgia', 'Bidikhat', 'Sibtala'],
    finalGp: 'Tusurabahal',
    destination: 'Balangir MRF',
    totalDistance: 50,
    scheduledOn: '4th Monday',
    workers: [
      { name: 'Panchu Bag', contact: '6371867810' },
      { name: 'Annapurna Das', contact: '7894625698' },
      { name: 'Saraswati Nag', contact: '-' },
      { name: 'Sudira Kumbhar', contact: '9178975310' },
      { name: 'Duraga Nag', contact: '8144190125' }
    ]
  },
  {
    id: 13,
    block: 'Balangir',
    routeId: 'B-Bal-BCJKM-5',
    routeName: 'Mayabarha-Bhundimuhan-Chudapali-Jhankarpali-Khuntpali-Kutumdola-Mayabarha',
    routeAbbreviation: 'MBCKKJ-5',
    startingGp: 'Mayabarha',
    intermediateGps: ['Bhundimuhan', 'Chudapali', 'Jhankarpali', 'Khuntpali', 'Kutumdola'],
    finalGp: 'Jhankarpali',
    destination: 'Balangir MRF',
    totalDistance: 55,
    scheduledOn: '1st Wednesday',
    workers: [
      { name: 'Bhagabat Rana', contact: '6372253209' },
      { name: 'Prasadhu Ghibela', contact: '-' },
      { name: 'Sabitri Bag', contact: '9777315434' },
      { name: 'Pragati Nag', contact: '7684848059' },
      { name: 'Surekha Nag', contact: '6370731946' },
      { name: 'Sarala Rana', contact: '8144864508' }
    ]
  },

  // Patnagarh Block - Tagged with Patnagarh MRF
  {
    id: 14,
    block: 'Patnagarh',
    routeId: 'B-Pat-BDSTU-1',
    routeName: 'Dubhalapada-Bhainsa-Dhatuk-Sunamudi-Tendapadar-Ulba',
    routeAbbreviation: 'DBSTU-1',
    startingGp: 'Dubhalapada',
    intermediateGps: ['Bhainsa', 'Dhatuk', 'Sunamudi', 'Tendapadar'],
    finalGp: 'Ulba',
    destination: 'Patnagarh MRF',
    totalDistance: 20,
    scheduledOn: '1st Monday',
    workers: [
      { name: 'Pratima Sahoo', contact: '7894481544' },
      { name: 'Jharana Karan', contact: '9658850020' },
      { name: 'Arati Dhurua', contact: '9937924124' },
      { name: 'Geeta Behera', contact: '8144211588' },
      { name: 'Geetanjali Rout', contact: '6372549429' }
    ]
  },
  {
    id: 15,
    block: 'Patnagarh',
    routeId: 'B-Pat-GGKMS-2',
    routeName: 'Mundomahul-Gangasagar-Ghuche Pali-Kendumundi-Mundomahul-Salepali',
    routeAbbreviation: 'MSGKG-2',
    startingGp: 'Mundomahul',
    intermediateGps: ['Gangasagar', 'Ghuche Pali', 'Kendumundi', 'Mundomahul'],
    finalGp: 'Salepali',
    destination: 'Patnagarh MRF',
    totalDistance: 30,
    scheduledOn: '2nd Monday',
    workers: [
      { name: 'Prasanta Mallick', contact: '8658163427' },
      { name: 'Reena Badhei', contact: '9337051909' },
      { name: 'Dhartari Padhan', contact: '8895164144' },
      { name: 'Akash Sa', contact: '9348840371' },
      { name: 'Gahala Rana', contact: '6371773738' }
    ]
  },
  {
    id: 16,
    block: 'Patnagarh',
    routeId: 'B-Pat-BBDJP-3',
    routeName: 'Dhatuk-Balipata-Batharla-Dhatuk-Jogimunda-Pandamunda',
    routeAbbreviation: 'DPJBB-3',
    startingGp: 'Dhatuk',
    intermediateGps: ['Balipata', 'Batharla', 'Dhatuk', 'Jogimunda', 'Pandamunda'],
    finalGp: 'Pandamunda',
    destination: 'Patnagarh MRF',
    totalDistance: 35,
    scheduledOn: '3rd Monday',
    workers: [
      { name: 'Jasobanti Bagarty', contact: '6372089046' },
      { name: 'Sarojini Kumbhar', contact: '9178270071' },
      { name: 'Dhartri Bariha', contact: '7847970149' },
      { name: 'Sahani Verma', contact: '7077355989' },
      { name: 'Kishori Sahu', contact: '9178872137' }
    ]
  },
  {
    id: 17,
    block: 'Patnagarh',
    routeId: 'B-Pat-BBKMS-4',
    routeName: 'Kerbeda-Baneimunda-Barpadar-Kerbeda-Maruan-Solebandh',
    routeAbbreviation: 'KSBMB-4',
    startingGp: 'Kerbeda',
    intermediateGps: ['Baneimunda', 'Barpadar', 'Kerbeda', 'Maruan'],
    finalGp: 'Solebandh',
    destination: 'Patnagarh MRF',
    totalDistance: 40,
    scheduledOn: '4th Monday',
    workers: [
      { name: 'Mamata Meher', contact: '9437298386' },
      { name: 'Padmeswari Naik', contact: '6371831985' },
      { name: 'Rashmita Sahu', contact: '6371405896' },
      { name: 'Baidei Nag', contact: '9777955510' },
      { name: 'Nirupama Meher', contact: '7683962548' }
    ]
  },
  {
    id: 18,
    block: 'Patnagarh',
    routeId: 'B-Pat-GGKXL-5',
    routeName: 'Khursel-Gerda-Ghasian-Khuntsamal-Khursel-Larambha',
    routeAbbreviation: 'KLGGK-5',
    startingGp: 'Khursel',
    intermediateGps: ['Gerda', 'Ghasian', 'Khuntsamal', 'Khursel'],
    finalGp: 'Larambha',
    destination: 'Patnagarh MRF',
    totalDistance: 50,
    scheduledOn: '1st Wednesday',
    workers: [
      { name: 'Kanti Nag', contact: '7849076375' },
      { name: 'Bidusmita Mahakur', contact: '8144375596' },
      { name: 'Thabiara Tandi', contact: '7684015055' },
      { name: 'Sabita Naik', contact: '6371884714' }
    ]
  },
  {
    id: 19,
    block: 'Patnagarh',
    routeId: 'B-Pat-BDOFT-6',
    routeName: 'Dangbahal-Bharatbahal-Dangbahal-Deulgaon-Fatamunda-Tamian',
    routeAbbreviation: 'DFBTD-6',
    startingGp: 'Dangbahal',
    intermediateGps: ['Bharatbahal', 'Dangbahal', 'Deulgaon', 'Fatamunda'],
    finalGp: 'Tamian',
    destination: 'Patnagarh MRF',
    totalDistance: 60,
    scheduledOn: '1st Saturday',
    workers: [
      { name: 'Sasmita Mishra', contact: '9777778488' },
      { name: 'Kuni Bhoi', contact: '9348530511' },
      { name: 'Bina Putel', contact: '9861757840' },
      { name: 'Kamalini Sa', contact: '8144434621' },
      { name: 'Ritanjali Das', contact: '8260503744' }
    ]
  },

  // Gudvella Block - Tagged with Tusura MRF
  {
    id: 20,
    block: 'Gudvella',
    routeId: 'B-Tus-BCNRS-1',
    routeName: 'Chinched-Badamounda-Chinched-Nuapada-Rusuda-Samara',
    routeAbbreviation: 'CBNRS-1',
    startingGp: 'Chinched',
    intermediateGps: ['Badamounda', 'Chinched', 'Nuapada', 'Rusuda'],
    finalGp: 'Samara',
    destination: 'Tusura MRF',
    totalDistance: 20,
    scheduledOn: '1st Monday',
    workers: [
      { name: 'Anjana Bag', contact: '8260883727' },
      { name: 'Padmanabha Chand', contact: '9348019581' },
      { name: 'Hementa Bagarty', contact: '6371395322' },
      { name: 'Nabin Rana', contact: '8455811693' },
      { name: 'Chandra Bag', contact: '7752073315' }
    ]
  },
  {
    id: 21,
    block: 'Gudvella',
    routeId: 'B-Tus-BGGG-2',
    routeName: 'Gambhariguda-Biramunda-Gambhariguda-Ghuna-Gudvela',
    routeAbbreviation: 'GBGG-2',
    startingGp: 'Gambhariguda',
    intermediateGps: ['Biramunda', 'Gambhariguda', 'Ghuna'],
    finalGp: 'Gudvela',
    destination: 'Tusura MRF',
    totalDistance: 40,
    scheduledOn: '2nd Monday',
    workers: [
      { name: 'Khira Nanda', contact: '9337323604' },
      { name: 'Basanta Behera', contact: '8327778339' },
      { name: 'Jadumani Kumbhar', contact: '7894639696' },
      { name: 'Bhuja Bag', contact: '7735631306' }
    ]
  },
  {
    id: 22,
    block: 'Gudvella',
    routeId: 'B-Tus-DJMT-3',
    routeName: 'Jamut-Deuligudi-Jamut-Madhekela-Tentulikhunti',
    routeAbbreviation: 'JDMT-3',
    startingGp: 'Jamut',
    intermediateGps: ['Deuligudi', 'Jamut', 'Madhekela'],
    finalGp: 'Tentulikhunti',
    destination: 'Tusura MRF',
    totalDistance: 40,
    scheduledOn: '3rd Monday',
    workers: [
      { name: 'Dharmendra Rana', contact: '6371163798' },
      { name: 'Chandra Mahanand', contact: '9556941151' },
      { name: 'Marakdhawaj Rana', contact: '7008829385' },
      { name: 'Lochan Jankar', contact: '8456800369' }
    ]
  }
];
