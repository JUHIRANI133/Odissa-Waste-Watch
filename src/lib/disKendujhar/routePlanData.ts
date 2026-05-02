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
  // Anandapur Block Routes
  {
    id: 1,
    block: 'Anandapur',
    routeId: 'KANABBDJHKP-01',
    routeName: 'PBBHJDK-01',
    routeAbbreviation: 'PBBHJDK-01',
    startingGp: 'PANCHUPALLY',
    intermediateGps: ['BAILO', 'BELABAHALI', 'HARIDAPAL', 'JALASUAN', 'DHAKOTHA'],
    finalGp: 'KOLIMATI',
    destination: 'MRF - 01 (SALAPADA)',
    totalDistance: 90,
    scheduledOn: '1ST & 3RD MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Tipun Padhi (Panchupalli)', contact: '7735608398' },
      { name: 'Liliprava Sahoo (Bailo)', contact: '9861604299' },
      { name: 'Lalita Sahoo (Belabahali)', contact: '6372032143' },
      { name: 'Jyotsnarani Rout (Haridapal)', contact: '9861858624' },
      { name: 'Mamata Rana (Jalasuan)', contact: '8144281374' },
      { name: 'Hamamalini Sethy (Dhakotha)', contact: '7377752370' },
      { name: 'Lilabati Naik (Kolimati)', contact: '8917377815' }
    ]
  },
  {
    id: 2,
    block: 'Anandapur',
    routeId: 'KANABKKMST-02',
    routeName: 'SMTKKB-02',
    routeAbbreviation: 'SMTKKB-02',
    startingGp: 'SALABANI',
    intermediateGps: ['MOCHINDA', 'TARATARA', 'KATHAKATA', 'KANTIPAL'],
    finalGp: 'BAUNSAGARH',
    destination: 'MRF - 02 (PADAMPUR)',
    totalDistance: 90,
    scheduledOn: '2ND & 4TH MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Parbati Sahoo (Salabani)', contact: '9437632266' },
      { name: 'Damayanti Dehuri (Mochinda)', contact: '863728260' },
      { name: 'Ranjit Kumar Patra (Taratara)', contact: '934837955' },
      { name: 'Runu Jena (Kathakata)', contact: '760893383' },
      { name: 'Sanjukta Sahoo (Kantipal)', contact: '8338824964' },
      { name: 'Soudamini Sethy (Baunsagarh)', contact: '9938988510' }
    ]
  },
  {
    id: 3,
    block: 'Anandapur',
    routeId: 'KANABGKMP-03',
    routeName: 'KBGPM-03',
    routeAbbreviation: 'KBGPM-03',
    startingGp: 'KODAPADA',
    intermediateGps: ['BUDHIKUDA', 'GAYALMUNDA', 'PANASADIHA'],
    finalGp: 'MANOHARPUR',
    destination: 'MRF - 02 (PADAMPUR)',
    totalDistance: 120,
    scheduledOn: '1ST & 3RD WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Lili Mukhi (Kodapada)', contact: '9658207162' },
      { name: 'Bilasini Naik (Budhikuda)', contact: '7735038335' },
      { name: 'Mamatarani Das (Gayalmunda)', contact: '8144502535' },
      { name: 'Truptimayee Ketial (Panasadiha)', contact: '7853045632' },
      { name: 'Gurubari Murumu (Manoharpur)', contact: '8018686325' }
    ]
  },

  // Champua Block Routes
  {
    id: 4,
    block: 'Champua',
    routeId: 'KCHABKPRR-01',
    routeName: 'RKBPR-01',
    routeAbbreviation: 'RKBPR-01',
    startingGp: 'RAJIA',
    intermediateGps: ['KALIKAPRASAD', 'BADANAI', 'PARSALA'],
    finalGp: 'RIMULI',
    destination: 'MRF - 01 (KANTIA-RAJIA)',
    totalDistance: 50,
    scheduledOn: '1ST & 3RD MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Radharani Nayak (Rajia)', contact: '6371409949' },
      { name: 'Purnima Guru (Kalikaprasad)', contact: '-' },
      { name: 'Rekha Mahanta (Badanai)', contact: '-' },
      { name: 'Rinki Munda (Parsala)', contact: '7892711291' }
    ]
  },
  {
    id: 5,
    block: 'Champua',
    routeId: 'KCHAJKKS-02',
    routeName: 'SJKK-02',
    routeAbbreviation: 'SJKK-02',
    startingGp: 'SUNAPOSI',
    intermediateGps: ['JAMUDALAK', 'KUTARIPOSI'],
    finalGp: 'KODAGADIA',
    destination: 'MRF - 01 (KANTIA-RAJIA)',
    totalDistance: 60,
    scheduledOn: '2ND & 4TH MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Rita Mohanta (Sunaposi)', contact: '7854969214' },
      { name: 'Srimati Naik (Kodagadia)', contact: '9692890857' }
    ]
  },
  {
    id: 6,
    block: 'Champua',
    routeId: 'KCHACKKPSU-03',
    routeName: 'SKCKPU-03',
    routeAbbreviation: 'SKCKPU-03',
    startingGp: 'SAREI',
    intermediateGps: ['KARANJIA', 'CHANDRASEKHARPUR', 'KASHIPAL', 'PADUA'],
    finalGp: 'UCHABALI',
    destination: 'MRF - 01 (KANTIA-RAJIA)',
    totalDistance: 60,
    scheduledOn: '1ST & 3RD WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Jyoshnarani Nayak (Sarei)', contact: '8018265425' },
      { name: 'Raibari Munda (Karanjia)', contact: '9124208015' },
      { name: 'Sanjulata Naik (CS Pur)', contact: '9937151838' },
      { name: 'Mamata Naik (Kashipal)', contact: '7853968916' },
      { name: 'Minarani Barik (Padua)', contact: '8917348496' },
      { name: 'Damayanti Naik (Uchabali)', contact: '8118085418' }
    ]
  },
  {
    id: 7,
    block: 'Champua',
    routeId: 'KCHABBJJJSR-04',
    routeName: 'JBJSJBR-04',
    routeAbbreviation: 'JBJSJBR-04',
    startingGp: 'JYOTIPUR',
    intermediateGps: ['BHUINPUR', 'JALLY', 'SADANGI', 'JAJAPOSI', 'BHANDA'],
    finalGp: 'RANGAMATIA',
    destination: 'MRF - 01 (KANTIA-RAJIA)',
    totalDistance: 70,
    scheduledOn: '2ND & 4TH WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Umakanta Karma (Jyotipur)', contact: '7854043367' },
      { name: 'Debananda Karma (Bhuinpur)', contact: '9937282622' },
      { name: 'Kabita Mahanta (Jally)', contact: '9348181695' },
      { name: 'Bhagabati Mahanta (Sadangi)', contact: '7327065900' },
      { name: 'Sarojini Naik (Jajaposi)', contact: '7854043367' },
      { name: 'Rajani Naik (Rangamatia)', contact: '7978603072' }
    ]
  },

  // Joda Block Routes
  {
    id: 8,
    block: 'Joda',
    routeId: 'KJODBBKS-01',
    routeName: 'KBSB-01',
    routeAbbreviation: 'KBSB-01',
    startingGp: 'KARAKHENDRA',
    intermediateGps: ['BLAGODA', 'SERENDA'],
    finalGp: 'BOLANI',
    destination: 'MRF - 01 (KARA)',
    totalDistance: 70,
    scheduledOn: '1ST & 3RD MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Pushpa Batlaid (karakhendra)', contact: '9608805679' },
      { name: 'Chanchala Mahanta (Balagoda)', contact: '7205139622' },
      { name: 'Binati Mohanta (Serenda)', contact: '8270129812' },
      { name: 'Julky Naik (Bolani)', contact: '8895006952' }
    ]
  },
  {
    id: 9,
    block: 'Joda',
    routeId: 'KJODBBJJJP-02',
    routeName: 'JJJBPB-02',
    routeAbbreviation: 'JJJBPB-02',
    startingGp: 'JALAHARI',
    intermediateGps: ['JURUDI', 'JAJANGA', 'PALASA', 'BALADA'],
    finalGp: 'BADAKALIMATI',
    destination: 'MRF - 01 (BACHU HONTING, Ward No. 06)',
    totalDistance: 100,
    scheduledOn: '1ST & 3RD MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Lili Lohar (Jalahari)', contact: '8895251963' },
      { name: 'Sandhyarani Maharana (Jurudi)', contact: '9827111829' },
      { name: 'Indumati Naik (Jajanga)', contact: '8895538738' },
      { name: 'Droupadi Mahanta (Palasa)', contact: '9439756816' },
      { name: 'Payrja Thakuri (Balada)', contact: '7655987484' },
      { name: 'Subhalaxmi Maharana (Badakalimati)', contact: '8926007696' }
    ]
  },
  {
    id: 10,
    block: 'Joda',
    routeId: 'KJODABBCDK-03',
    routeName: 'ABBCDK-03',
    routeAbbreviation: 'ABBCDK-03',
    startingGp: 'BHADRASAHI',
    intermediateGps: ['BIRIKALA', 'DEOJHAR', 'KANDRA', 'ASENIKALA'],
    finalGp: 'CHAMAKPUR',
    destination: 'MRF - 01 (BACHU HONTING, Ward No. 06)',
    totalDistance: 70,
    scheduledOn: '2ND & 4TH MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Malati Mahanta (Bhadrasahi)', contact: '7308892323' },
      { name: 'Padmini Naik (Birikala)', contact: '8658205336' },
      { name: 'Sujata Naik (Deojhar)', contact: '9439514539' },
      { name: 'Basanti Naik (Kandara)', contact: '7077149288' },
      { name: 'Reeta Behera (Aseinkala)', contact: '8908908023' },
      { name: 'Rabita Naik (Chamakpur)', contact: '6371830957' }
    ]
  },
  {
    id: 11,
    block: 'Joda',
    routeId: 'KJODBGL-04',
    routeName: 'BGL-04',
    routeAbbreviation: 'BGL-04',
    startingGp: 'BHUIANROIDA',
    intermediateGps: ['GUALI'],
    finalGp: 'LOIDAPADA',
    destination: 'MRF - 01 (BACHU HONTING, Ward No. 06)',
    totalDistance: 65,
    scheduledOn: '1ST & 3RD WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Ashrita Chanpia (Bhuninroida)', contact: '8763573543' },
      { name: 'Sangita Mahapatra (Guali)', contact: '9692049456' },
      { name: 'Sujata Naik (Loidapada)', contact: '8895661819' }
    ]
  },

  // Kendujhar Sadar Block Routes
  {
    id: 12,
    block: 'Kendujhar Sadar',
    routeId: 'KKENBGJMR-01',
    routeName: 'JRGMB-01',
    routeAbbreviation: 'JRGMB-01',
    startingGp: 'JANARDANPUR',
    intermediateGps: ['RAISUAN', 'GOPINATHPUR', 'MAHADEIJODA'],
    finalGp: 'BARADAPAL',
    destination: 'MRF - 01 (BRAHMANIGAON)',
    totalDistance: 35,
    scheduledOn: '1ST & 3RD MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Bina Naik (Janardanpur)', contact: '7683944380' },
      { name: 'Priyanka Behera (Raisuan)', contact: '7328814616' },
      { name: 'Sukanti Behera (GN Pur)', contact: '7787987731' },
      { name: 'Manoroma Munda (Mahadeijoda)', contact: '9937881852' },
      { name: 'Rudrani Mahakud (Bardapal)', contact: '6342450434' }
    ]
  },
  {
    id: 13,
    block: 'Kendujhar Sadar',
    routeId: 'KKENKNPPP-02',
    routeName: 'PNPPK-02',
    routeAbbreviation: 'PNPPK-02',
    startingGp: 'PADAMPUR',
    intermediateGps: ['NUAGAON', 'PARJANPUR', 'PALASAPANGA'],
    finalGp: 'KANDARAPOSI',
    destination: 'MRF - 01 (BRAHMANIGAON)',
    totalDistance: 45,
    scheduledOn: '2ND & 4TH MONDAY OF EVERY MONTH',
    workers: [
      { name: 'Minati Mohanta (Padampur)', contact: '8260861434' },
      { name: 'Chandrika Mohanta (Nuagaon)', contact: '8763368650' },
      { name: 'Binodini Mohanta (Parjanpur)', contact: '8658384803' },
      { name: 'Damayanti Mohanta (Palasapanga)', contact: '9938430950' },
      { name: 'Sairendri Mohanta (Kandaraposi)', contact: '8895304018' }
    ]
  },
  {
    id: 14,
    block: 'Kendujhar Sadar',
    routeId: 'KKENBBGHKRS-03',
    routeName: 'BBGKSHR-03',
    routeAbbreviation: 'BBGKSHR-03',
    startingGp: 'BODAPALASA',
    intermediateGps: ['BAURIPADA', 'GOBARDHAN', 'HANDIBHANGA', 'KAUNRIKALA', 'RAIKALA'],
    finalGp: 'SANKIRI',
    destination: 'MRF - 02 (BRAHMANIGAON)',
    totalDistance: 50,
    scheduledOn: '1ST & 3RD WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Kadambini (Bodapalasa)', contact: '7077486563' },
      { name: 'Rukmani Behera (Bauripada)', contact: '9777050423' },
      { name: 'Tribeni Moahanta (Gobardhan)', contact: '8018973878' },
      { name: 'Gouri Mohanta (Handibhanga)', contact: '6372230684' },
      { name: 'Champabati Mohanta (Kaunrikala)', contact: '8144469075' },
      { name: 'Josoda Mohanta (Raikala)', contact: '9777659032' },
      { name: 'Sania Naik (Sankiri)', contact: '8144275616' }
    ]
  },
  {
    id: 15,
    block: 'Kendujhar Sadar',
    routeId: 'KKENDKMMNNRS-04',
    routeName: 'MNDSNRKM-04',
    routeAbbreviation: 'MNDSNRKM-04',
    startingGp: 'MANDUA',
    intermediateGps: ['DIMBO', 'NARANPUR', 'NELUNG', 'SIRISPAL', 'RAGHUNATHPUR', 'KATHABARI'],
    finalGp: 'MAIDANKEL',
    destination: 'MRF - 02 (BRAHMANIGAON)',
    totalDistance: 60,
    scheduledOn: '2ND & 4TH WEDNESDAY OF EVERY MONTH',
    workers: [
      { name: 'Manoroma Jena (Mandua)', contact: '7855882277' },
      { name: 'Nalini Patra (Dimbo)', contact: '7848024719' },
      { name: 'Jatri Naik (Naranapur)', contact: '9348494006' },
      { name: 'Manju Mohanta (Nelung)', contact: '6732465003' },
      { name: 'Gouri Maharana (Sirispal)', contact: '8895030807' },
      { name: 'Ucharani Naik (RG Pur)', contact: '9777185513' },
      { name: 'Subasini Mohanta (Kathabari)', contact: '6372344355' },
      { name: 'Ranjita Behera (Maidankel)', contact: '8280061779' }
    ]
  }
];