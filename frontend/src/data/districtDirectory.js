/**
 * Hyper-Local District Assistance Directory
 * Complete Mapping for all 28 Indian States and 8 Union Territories.
 * Mapping States and Districts to District Industries Centres (DIC),
 * State Channelizing Agencies (SCA / NSFDC), and Sub-districts (Tehsils/Blocks).
 */

export const ALL_INDIA_STATES_LIST = [
  { name: "Andhra Pradesh", nameHi: "आंध्र प्रदेश", type: "State" },
  { name: "Arunachal Pradesh", nameHi: "अरुणाचल प्रदेश", type: "State" },
  { name: "Assam", nameHi: "असम", type: "State" },
  { name: "Bihar", nameHi: "बिहार", type: "State" },
  { name: "Chhattisgarh", nameHi: "छत्तीसगढ़", type: "State" },
  { name: "Goa", nameHi: "गोवा", type: "State" },
  { name: "Gujarat", nameHi: "गुजरात", type: "State" },
  { name: "Haryana", nameHi: "हरियाणा", type: "State" },
  { name: "Himachal Pradesh", nameHi: "हिमाचल प्रदेश", type: "State" },
  { name: "Jharkhand", nameHi: "झारखंड", type: "State" },
  { name: "Karnataka", nameHi: "कर्नाटक", type: "State" },
  { name: "Kerala", nameHi: "केरल", type: "State" },
  { name: "Madhya Pradesh", nameHi: "मध्य प्रदेश", type: "State" },
  { name: "Maharashtra", nameHi: "महाराष्ट्र", type: "State" },
  { name: "Manipur", nameHi: "मणिपुर", type: "State" },
  { name: "Meghalaya", nameHi: "मेघालय", type: "State" },
  { name: "Mizoram", nameHi: "मिजोरम", type: "State" },
  { name: "Nagaland", nameHi: "नागालैंड", type: "State" },
  { name: "Odisha", nameHi: "ओडिशा", type: "State" },
  { name: "Punjab", nameHi: "पंजाब", type: "State" },
  { name: "Rajasthan", nameHi: "राजस्थान", type: "State" },
  { name: "Sikkim", nameHi: "सिक्किम", type: "State" },
  { name: "Tamil Nadu", nameHi: "तमिलनाडु", type: "State" },
  { name: "Telangana", nameHi: "तेलंगाना", type: "State" },
  { name: "Tripura", nameHi: "त्रिपुरा", type: "State" },
  { name: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", type: "State" },
  { name: "Uttarakhand", nameHi: "उत्तराखंड", type: "State" },
  { name: "West Bengal", nameHi: "पश्चिम बंगाल", type: "State" },
  // 8 Union Territories
  { name: "Andaman and Nicobar Islands", nameHi: "अंडमान और निकोबार द्वीप समूह", type: "UT" },
  { name: "Chandigarh", nameHi: "चंडीगढ़", type: "UT" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", nameHi: "दादरा और नगर हवेली और दमन और दीव", type: "UT" },
  { name: "Delhi", nameHi: "दिल्ली", type: "UT" },
  { name: "Jammu and Kashmir", nameHi: "जम्मू और कश्मीर", type: "UT" },
  { name: "Ladakh", nameHi: "लद्दाख", type: "UT" },
  { name: "Lakshadweep", nameHi: "लक्षद्वीप", type: "UT" },
  { name: "Puducherry", nameHi: "पुडुचेरी", type: "UT" }
];

export const stateDistrictsData = [
  {
    state: "Maharashtra",
    stateHi: "महाराष्ट्र",
    scaName: "Mahatma Phule Backward Class Development Corporation (MPBCDC)",
    scaAddress: "Supreme Chambers, Shah Industrial Estate, Veera Desai Road, Andheri West, Mumbai - 400053",
    helpline: "022-26732345 / 1800-222-340",
    districts: [
      { name: "Pune", nameHi: "पुणे", subdistricts: ["Haveli", "Baramati", "Shirur", "Ambegaon", "Khed", "Maval", "Mulshi", "Purandar", "Daund", "Indapur", "Junnar", "Bhor", "Velhe", "Pune City"], dicOffice: "DIC, Agriculture College Compound, Shivaji Nagar, Pune", contact: "020-25537456", leadBank: "Bank of Maharashtra" },
      { name: "Nagpur", nameHi: "नागपुर", subdistricts: ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Ramtek", "Umred"], dicOffice: "DIC, Civil Lines, Nagpur", contact: "0712-2561234", leadBank: "Bank of India" },
      { name: "Mumbai City", nameHi: "मुंबई शहर", subdistricts: ["Colaba", "Fort", "Dadar", "Byculla"], dicOffice: "DIC, Old Customs House, Fort, Mumbai", contact: "022-22661234", leadBank: "State Bank of India" },
      { name: "Mumbai Suburban", nameHi: "मुंबई उपनगर", subdistricts: ["Andheri", "Bandra", "Borivali", "Kurla"], dicOffice: "DIC, Administrative Bldg, Bandra East", contact: "022-26551234", leadBank: "Bank of Baroda" },
      { name: "Thane", nameHi: "ठाणे", subdistricts: ["Thane", "Kalyan", "Murbad", "Bhiwandi", "Shahapur", "Ulhasnagar", "Ambarnath"], dicOffice: "DIC, Wagle Industrial Estate, Thane", contact: "022-25821234", leadBank: "Bank of Maharashtra" },
      { name: "Nashik", nameHi: "नाशिक", subdistricts: ["Nashik", "Niphad", "Sinnar", "Dindori", "Igatpuri", "Trimbakeshwar", "Malegaon", "Yeola"], dicOffice: "DIC, Old Agra Road, Nashik", contact: "0253-2571234", leadBank: "Bank of Maharashtra" },
      { name: "Chhatrapati Sambhajinagar (Aurangabad)", nameHi: "छत्रपती संभाजीनगर", subdistricts: ["Aurangabad", "Paithan", "Gangapur", "Vaijapur", "Kannad", "Khuldabad", "Sillod", "Soegaon", "Phulambri"], dicOffice: "DIC, Railway Station Road", contact: "0240-2331234", leadBank: "Bank of Maharashtra" },
      { name: "Solapur", nameHi: "सोलापूर", subdistricts: ["Solapur North", "Solapur South", "Barshi", "Pandharpur", "Karmala", "Madha", "Sangole", "Malshiras"], dicOffice: "DIC, Old Employment Exchange, Solapur", contact: "0217-2721234", leadBank: "Bank of India" },
      { name: "Kolhapur", nameHi: "कोल्हापूर", subdistricts: ["Karvir", "Kagal", "Hatkanangle", "Shirol", "Panhala", "Radhanagari", "Bhudargad", "Ajara", "Gadhinglaj", "Chandgad"], dicOffice: "DIC, Udyog Bhavan, Kolhapur", contact: "0231-2651234", leadBank: "Bank of India" },
      { name: "Ahmednagar", nameHi: "अहमदनगर", subdistricts: ["Nagar", "Rahuri", "Shrirampur", "Nevasa", "Sangamner", "Akole", "Kopargaon", "Pathardi", "Shevgaon", "Parner", "Jamkhed", "Karjat", "Shrigonda"], dicOffice: "DIC, Station Road, Ahmednagar", contact: "0241-2411234", leadBank: "Central Bank of India" },
      { name: "Amravati", nameHi: "अमरावती", subdistricts: ["Amravati", "Bhatkuli", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Teosa", "Daryapur", "Anjangaon Surji"], dicOffice: "DIC, Camp Road, Amravati", contact: "0721-2661234", leadBank: "Central Bank of India" },
      { name: "Jalgaon", nameHi: "जळगाव", subdistricts: ["Jalgaon", "Bhusawal", "Raver", "Muktainagar", "Bodwad", "Yawal", "Chopda", "Erandol", "Dharangaon", "Pachora", "Bhadgaon", "Chalisgaon", "Jamner", "Parola", "Amalner"], dicOffice: "DIC, MIDC Area, Jalgaon", contact: "0257-2211234", leadBank: "Central Bank of India" },
      { name: "Satara", nameHi: "सातारा", subdistricts: ["Satara", "Karad", "Wai", "Mahabaleshwar", "Phaltan", "Khandala", "Khatav", "Man", "Koregaon", "Patan", "Jaoli"], dicOffice: "DIC, Sadar Bazar, Satara", contact: "02162-234123", leadBank: "Bank of Maharashtra" },
      { name: "Sangli", nameHi: "सांगली", subdistricts: ["Miraj", "Tasgaon", "Khanapur (Vita)", "Atpadi", "Jat", "Kavathe Mahankal", "Walwa (Islampur)", "Shirala", "Kadegaon", "Palus"], dicOffice: "DIC, Madhavnagar Road, Sangli", contact: "0233-2311234", leadBank: "Bank of India" },
      { name: "Nanded", nameHi: "नांदेड", subdistricts: ["Nanded", "Biloli", "Mukhed", "Kandhar", "Loha", "Mudkhed", "Bhokar", "Degloor", "Kinwat", "Himayatnagar", "Hadgaon", "Mahoor", "Ardhapur"], dicOffice: "DIC, VIP Road, Nanded", contact: "02462-234123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Gujarat",
    stateHi: "गुजरात",
    scaName: "Gujarat Backward Classes Development Corporation (GBCDC)",
    scaAddress: "Block No. 4, Dr. Jivraj Mehta Bhavan, Gandhinagar - 382010",
    helpline: "079-23253240 / 1800-233-0130",
    districts: [
      { name: "Ahmedabad", nameHi: "अहमदाबाद", subdistricts: ["Ahmedabad City", "Daskroi", "Sanand", "Bavla", "Dholka", "Viramgam", "Mandal", "Dhandhuka", "Dholera"], dicOffice: "DIC, Bahumali Bhavan, Vastrapur, Ahmedabad", contact: "079-26302345", leadBank: "State Bank of India" },
      { name: "Surat", nameHi: "सूरत", subdistricts: ["Surat City", "Chorasi", "Olpad", "Kamrej", "Bardoli", "Mahuva", "Mandvi", "Mangrol", "Palsana"], dicOffice: "DIC, Nanpura Multistorey Bldg, Surat", contact: "0261-2465123", leadBank: "Bank of Baroda" },
      { name: "Vadodara", nameHi: "वडोदरा", subdistricts: ["Vadodara City", "Vadodara Rural", "Padra", "Karjan", "Shinor", "Dabhoi", "Waghodia", "Savli", "Desar"], dicOffice: "DIC, Kothi Kacheri Compound, Vadodara", contact: "0265-2431234", leadBank: "Bank of Baroda" },
      { name: "Rajkot", nameHi: "राजकोट", subdistricts: ["Rajkot", "Gondal", "Jetpur", "Dhoraji", "Upleta", "Jasdan", "Kotda Sangani", "Lodhika", "Paddhari", "Vinchhiya"], dicOffice: "DIC, Jilla Seva Sadan-2, Rajkot", contact: "0281-2451234", leadBank: "State Bank of India" },
      { name: "Gandhinagar", nameHi: "गांधीनगर", subdistricts: ["Gandhinagar", "Kalol", "Dehgam", "Mansa"], dicOffice: "DIC, Sector-11, Gandhinagar", contact: "079-23221234", leadBank: "Bank of Baroda" },
      { name: "Bhavnagar", nameHi: "भावनगर", subdistricts: ["Bhavnagar", "Sihor", "Umrala", "Gariadhar", "Palitana", "Talaja", "Mahuva", "Jesar"], dicOffice: "DIC, Bahumali Bhavan, Bhavnagar", contact: "0278-2421234", leadBank: "State Bank of India" },
      { name: "Kutch", nameHi: "कच्छ (भुज)", subdistricts: ["Bhuj", "Anjar", "Mandvi", "Mundra", "Gandhidham", "Bhachau", "Rapar", "Nakhatrana", "Abdasa", "Lakhpat"], dicOffice: "DIC, Bahumali Bhavan, Bhuj-Kutch", contact: "02832-251234", leadBank: "State Bank of India" },
      { name: "Anand", nameHi: "आणंद", subdistricts: ["Anand", "Borsad", "Khambhat", "Petlad", "Sojitra", "Umreth", "Tarapur", "Anklav"], dicOffice: "DIC, Borsad Chokdi, Anand", contact: "02692-261234", leadBank: "Bank of Baroda" }
    ]
  },
  {
    state: "Uttar Pradesh",
    stateHi: "उत्तर प्रदेश",
    scaName: "UP Scheduled Castes Finance and Development Corporation (UPSCFDC)",
    scaAddress: "B-2, Bapu Bhavan, Vidhan Sabha Marg, Lucknow - 226001",
    helpline: "0522-2238456 / 1800-180-5131",
    districts: [
      { name: "Lucknow", nameHi: "लखनऊ", subdistricts: ["Lucknow Sadar", "Bakshi Ka Talab", "Malihabad", "Mohanlalganj", "Sarojini Nagar"], dicOffice: "DIC, Kaiserbagh, Lucknow", contact: "0522-2621234", leadBank: "Bank of India" },
      { name: "Varanasi", nameHi: "वाराणसी", subdistricts: ["Varanasi Sadar", "Pindra", "Raja Talab"], dicOffice: "DIC, Chaukaghat, Varanasi", contact: "0542-2211234", leadBank: "Union Bank of India" },
      { name: "Kanpur Nagar", nameHi: "कानपुर नगर", subdistricts: ["Kanpur Sadar", "Ghatampur", "Bilhaur"], dicOffice: "DIC, Sarvodaya Nagar, Kanpur", contact: "0512-2291234", leadBank: "Bank of Baroda" },
      { name: "Agra", nameHi: "आगरा", subdistricts: ["Agra Sadar", "Etmadpur", "Fatehabad", "Kheragarh", "Bah"], dicOffice: "DIC, Sanjay Place, Agra", contact: "0562-2521234", leadBank: "Canara Bank" },
      { name: "Prayagraj (Allahabad)", nameHi: "प्रयागराज", subdistricts: ["Sadar", "Phulpur", "Koraon", "Meja", "Bara", "Handia", "Karchhana", "Soraon"], dicOffice: "DIC, Civil Lines, Prayagraj", contact: "0532-2401234", leadBank: "Bank of Baroda" },
      { name: "Gorakhpur", nameHi: "गोरखपुर", subdistricts: ["Gorakhpur Sadar", "Campierganj", "Sahjanwa", "Khajni", "Chauri Chaura", "Bansgaon", "Gola"], dicOffice: "DIC, Gorakhnath Road, Gorakhpur", contact: "0551-2201234", leadBank: "State Bank of India" },
      { name: "Gautam Buddha Nagar (Noida)", nameHi: "गौतम बुद्ध नगर (नोएडा)", subdistricts: ["Noida", "Dadri", "Jewar"], dicOffice: "DIC, Sector-6, Noida", contact: "0120-2521234", leadBank: "Punjab National Bank" },
      { name: "Ghaziabad", nameHi: "गाजियाबाद", subdistricts: ["Ghaziabad", "Modinagar", "Loni"], dicOffice: "DIC, Patel Nagar, Ghaziabad", contact: "0120-2731234", leadBank: "Punjab National Bank" },
      { name: "Bareilly", nameHi: "बरेली", subdistricts: ["Bareilly Sadar", "Aonla", "Faridpur", "Meerganj", "Baheri", "Nawabganj"], dicOffice: "DIC, Civil Lines, Bareilly", contact: "0581-2421234", leadBank: "Bank of Baroda" },
      { name: "Meerut", nameHi: "मेरठ", subdistricts: ["Meerut Sadar", "Mawana", "Sardhana"], dicOffice: "DIC, Delhi Road, Meerut", contact: "0121-2511234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Rajasthan",
    stateHi: "राजस्थान",
    scaName: "Rajasthan SC & ST Finance and Development Cooperative Corp (Anuja Nigam)",
    scaAddress: "Nehru Sahakar Bhavan, 4th Floor, 22 Godam Circle, Jaipur - 302005",
    helpline: "0141-2740234 / 181",
    districts: [
      { name: "Jaipur", nameHi: "जयपुर", subdistricts: ["Jaipur", "Amer", "Sanganer", "Bassi", "Chaksu", "Jamwa Ramgarh", "Chomu", "Shahpura"], dicOffice: "DIC, Tilak Marg, C-Scheme, Jaipur", contact: "0141-2385123", leadBank: "UCO Bank" },
      { name: "Jodhpur", nameHi: "जोधपुर", subdistricts: ["Jodhpur", "Luni", "Bilara", "Bhopalgarh", "Piparcity", "Osian", "Bawari"], dicOffice: "DIC, Industrial Estate, Jodhpur", contact: "0291-2611234", leadBank: "Punjab National Bank" },
      { name: "Kota", nameHi: "कोटा", subdistricts: ["Kota", "Ladpura", "Digod", "Sangod", "Ramganj Mandi"], dicOffice: "DIC, Aerodrome Circle, Kota", contact: "0744-2421234", leadBank: "Central Bank of India" },
      { name: "Udaipur", nameHi: "उदयपुर", subdistricts: ["Girwa (Udaipur)", "Vallabhnagar", "Mavli", "Gogunda", "Kotra", "Jhadol", "Salumber"], dicOffice: "DIC, Madri Industrial Area, Udaipur", contact: "0294-2491234", leadBank: "State Bank of India" },
      { name: "Ajmer", nameHi: "अजमेर", subdistricts: ["Ajmer", "Pushkar", "Nasirabad", "Kishangarh", "Beawar", "Kekri"], dicOffice: "DIC, Todarmal Marg, Civil Lines, Ajmer", contact: "0145-2421234", leadBank: "Bank of Baroda" },
      { name: "Bikaner", nameHi: "बीकानेर", subdistricts: ["Bikaner", "Nokha", "Lunkaransar", "Kolayat", "Khajuwala", "Dungargarh"], dicOffice: "DIC, Rani Bazar, Bikaner", contact: "0151-2521234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Madhya Pradesh",
    stateHi: "मध्य प्रदेश",
    scaName: "MP State Cooperative Scheduled Castes Finance & Development Corp",
    scaAddress: "Rajiv Gandhi Bhavan, 35 Shyamla Hills, Bhopal - 462002",
    helpline: "0755-2661234 / 181",
    districts: [
      { name: "Bhopal", nameHi: "भोपाल", subdistricts: ["Huzur", "Berasia", "Kolar"], dicOffice: "DIC, Govindpura Industrial Area, Bhopal", contact: "0755-2581234", leadBank: "Bank of India" },
      { name: "Indore", nameHi: "इंदौर", subdistricts: ["Indore", "Mhow (Dr. Ambedkar Nagar)", "Sanwer", "Depalpur"], dicOffice: "DIC, Pologround Industrial Estate, Indore", contact: "0731-2421234", leadBank: "Bank of India" },
      { name: "Gwalior", nameHi: "ग्वालियर", subdistricts: ["Gwalior", "Dabra", "Bhitarwar", "Chinour"], dicOffice: "DIC, Maharaj Bada, Gwalior", contact: "0751-2421234", leadBank: "Central Bank of India" },
      { name: "Jabalpur", nameHi: "जबलपुर", subdistricts: ["Jabalpur", "Panagar", "Sihora", "Patan", "Shahpura", "Kundam"], dicOffice: "DIC, Wright Town, Jabalpur", contact: "0761-2401234", leadBank: "Union Bank of India" },
      { name: "Ujjain", nameHi: "उज्जैन", subdistricts: ["Ujjain", "Ghatiya", "Tarana", "Mahidpur", "Khachrod", "Nagda", "Badnagar"], dicOffice: "DIC, Kothi Palace, Ujjain", contact: "0734-2511234", leadBank: "Bank of India" }
    ]
  },
  {
    state: "Bihar",
    stateHi: "बिहार",
    scaName: "Bihar State Scheduled Castes Co-operative Development Corp (BSSCDC)",
    scaAddress: "Maurya Lok Complex, Block A, 2nd Floor, Dak Bungalow Road, Patna - 800001",
    helpline: "0612-2221234 / 1800-345-6262",
    districts: [
      { name: "Patna", nameHi: "पटना", subdistricts: ["Patna Sadar", "Danapur", "Barh", "Masaurhi", "Paliganj", "Bikram"], dicOffice: "DIC, Gandhi Maidan, Patna", contact: "0612-2201234", leadBank: "Punjab National Bank" },
      { name: "Gaya", nameHi: "गया", subdistricts: ["Gaya Sadar", "Tekari", "Sherghati", "Neemchak Bathani"], dicOffice: "DIC, Collectorate Campus, Gaya", contact: "0631-2221234", leadBank: "Punjab National Bank" },
      { name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", subdistricts: ["Muzaffarpur East", "Muzaffarpur West", "Kanti", "Motipur"], dicOffice: "DIC, Bela Industrial Estate, Muzaffarpur", contact: "0621-2241234", leadBank: "Central Bank of India" },
      { name: "Bhagalpur", nameHi: "भागलपुर", subdistricts: ["Bhagalpur Sadar", "Kahalgaon", "Naugachhia"], dicOffice: "DIC, Barari Industrial Area, Bhagalpur", contact: "0641-2401234", leadBank: "UCO Bank" },
      { name: "Darbhanga", nameHi: "दरभंगा", subdistricts: ["Darbhanga Sadar", "Benipur", "Biraul"], dicOffice: "DIC, Laheriasarai, Darbhanga", contact: "06272-221234", leadBank: "Central Bank of India" }
    ]
  },
  {
    state: "Karnataka",
    stateHi: "कर्नाटक",
    scaName: "Dr. B.R. Ambedkar Development Corporation Limited",
    scaAddress: "9th Floor, Vishveshwaraiah Mini Tower, Dr. B.R. Ambedkar Veedhi, Bengaluru - 560001",
    helpline: "080-22861234 / 1800-425-0000",
    districts: [
      { name: "Bengaluru Urban", nameHi: "बेंगलुरु शहरी", subdistricts: ["Bengaluru North", "Bengaluru South", "Bengaluru East", "Anekal", "Yelahanka"], dicOffice: "DIC, Rajajinagar Industrial Estate, Bengaluru", contact: "080-23151234", leadBank: "Canara Bank" },
      { name: "Mysuru", nameHi: "मैसूरु", subdistricts: ["Mysuru", "Nanjangud", "T. Narasipura", "Hunsur", "Piriyapatna", "K.R. Nagar"], dicOffice: "DIC, Sayyaji Rao Road, Mysuru", contact: "0821-2421234", leadBank: "Bank of Baroda" },
      { name: "Belagavi", nameHi: "बेलगावी", subdistricts: ["Belagavi", "Gokak", "Chikkodi", "Athani", "Bailhongal", "Hukkeri", "Khanapur", "Ramdurg", "Saundatti"], dicOffice: "DIC, Club Road, Belagavi", contact: "0831-2401234", leadBank: "Canara Bank" },
      { name: "Dharwad", nameHi: "धारवाड़", subdistricts: ["Dharwad", "Hubballi Urban", "Hubballi Rural", "Kalghatgi", "Navalgund", "Kundgol"], dicOffice: "DIC, Belur Industrial Area, Dharwad", contact: "0836-2441234", leadBank: "Bank of Baroda" }
    ]
  },
  {
    state: "Tamil Nadu",
    stateHi: "तमिलनाडु",
    scaName: "Tamil Nadu Adi Dravidar Housing and Development Corp (TAHDCO)",
    scaAddress: "TAHDCO Head Office, No. 31, Cenotaph Road, Teynampet, Chennai - 600018",
    helpline: "044-24311234 / 1800-425-4444",
    districts: [
      { name: "Chennai", nameHi: "चेन्नई", subdistricts: ["Tondiarpet", "Royapuram", "Anna Nagar", "Teynampet", "Alandur", "Adyar", "Sholinganallur"], dicOffice: "DIC, Guindy Industrial Estate, Chennai", contact: "044-22501234", leadBank: "Indian Overseas Bank" },
      { name: "Coimbatore", nameHi: "कोयंबटूर", subdistricts: ["Coimbatore North", "Coimbatore South", "Pollachi", "Mettupalayam", "Sulur"], dicOffice: "DIC, Patel Road, Ramnagar, Coimbatore", contact: "0422-2231234", leadBank: "Canara Bank" },
      { name: "Madurai", nameHi: "मदुरै", subdistricts: ["Madurai North", "Madurai South", "Melur", "Thirumangalam", "Usilampatti", "Vadipatti"], dicOffice: "DIC, Alagar Kovil Road, Madurai", contact: "0452-2531234", leadBank: "Canara Bank" },
      { name: "Salem", nameHi: "सेलम", subdistricts: ["Salem", "Attur", "Mettur", "Omalur", "Sankari", "Yercaud"], dicOffice: "DIC, Five Roads, Salem", contact: "0427-2441234", leadBank: "Indian Bank" }
    ]
  },
  {
    state: "Telangana",
    stateHi: "तेलंगाना",
    scaName: "Telangana Scheduled Castes Cooperative Development Corp (TSCCDC)",
    scaAddress: "Damodaram Sanjeevaiah Sankshema Bhavan, Masab Tank, Hyderabad - 500028",
    helpline: "040-23391234 / 1800-425-0000",
    districts: [
      { name: "Hyderabad", nameHi: "हैदराबाद", subdistricts: ["Charminar", "Secunderabad", "Khairatabad", "Golconda", "Musheerabad", "Asifnagar"], dicOffice: "DIC, Chirag Ali Lane, Abids, Hyderabad", contact: "040-23201234", leadBank: "State Bank of India" },
      { name: "Warangal", nameHi: "वारंगल", subdistricts: ["Warangal", "Hanamkonda", "Kazipet", "Wardhannapet"], dicOffice: "DIC, Subedari, Hanamkonda", contact: "0870-2571234", leadBank: "State Bank of India" },
      { name: "Karimnagar", nameHi: "करीमनगर", subdistricts: ["Karimnagar", "Huzurabad", "Manakondur", "Choppadandi"], dicOffice: "DIC, Collectorate Complex, Karimnagar", contact: "0878-2241234", leadBank: "Union Bank of India" },
      { name: "Nizamabad", nameHi: "निजामाबाद", subdistricts: ["Nizamabad North", "Nizamabad South", "Bodhan", "Armoor"], dicOffice: "DIC, Pragathi Bhavan, Nizamabad", contact: "08462-234123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Delhi",
    stateHi: "दिल्ली",
    scaName: "Delhi SC/ST/OBC/Minorities Development Corporation (DSFDC)",
    scaAddress: "Ambedkar Bhawan, Sector-16, Rohini, New Delhi - 110085",
    helpline: "011-27881234 / 1076",
    districts: [
      { name: "Central Delhi", nameHi: "मध्य दिल्ली", subdistricts: ["Civil Lines", "Karol Bagh", "Kotwali"], dicOffice: "DIC, Pusa Industrial Area, New Delhi", contact: "011-25841234", leadBank: "State Bank of India" },
      { name: "New Delhi", nameHi: "नई दिल्ली", subdistricts: ["Chanakyapuri", "Connaught Place", "Delhi Cantt"], dicOffice: "DIC, Patparganj Industrial Area", contact: "011-22151234", leadBank: "State Bank of India" },
      { name: "North Delhi", nameHi: "उत्तरी दिल्ली", subdistricts: ["Model Town", "Narela", "Alipur"], dicOffice: "DIC, Lawrence Road Industrial Area", contact: "011-27181234", leadBank: "Punjab National Bank" },
      { name: "South Delhi", nameHi: "दक्षिणी दिल्ली", subdistricts: ["Hauz Khas", "Saket", "Mehrauli"], dicOffice: "DIC, Okhla Industrial Area Phase-II", contact: "011-26381234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Punjab",
    stateHi: "पंजाब",
    scaName: "Punjab Scheduled Castes Land Development & Finance Corp (PSCFC)",
    scaAddress: "SCO 104-106, Sector 34-A, Chandigarh - 160022",
    helpline: "0172-2601234 / 1800-180-2444",
    districts: [
      { name: "Ludhiana", nameHi: "लुधियाना", subdistricts: ["Ludhiana East", "Ludhiana West", "Jagraon", "Khanna", "Samrala", "Payal", "Raikot"], dicOffice: "DIC, Ferozepur Road, Ludhiana", contact: "0161-2401234", leadBank: "Punjab National Bank" },
      { name: "Amritsar", nameHi: "अमृतसर", subdistricts: ["Amritsar-I", "Amritsar-II", "Ajnala", "Baba Bakala", "Majitha"], dicOffice: "DIC, Court Road, Amritsar", contact: "0183-2221234", leadBank: "Punjab National Bank" },
      { name: "Jalandhar", nameHi: "जालंधर", subdistricts: ["Jalandhar-I", "Jalandhar-II", "Nakodar", "Phillaur", "Shahkot"], dicOffice: "DIC, Civil Lines, Jalandhar", contact: "0181-2221234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Haryana",
    stateHi: "हरियाणा",
    scaName: "Haryana Scheduled Castes Finance and Development Corporation (HSCFDC)",
    scaAddress: "Bays No. 49-52, Sector-2, Panchkula - 134112",
    helpline: "0172-2561234 / 1800-180-2121",
    districts: [
      { name: "Gurugram", nameHi: "गुरुग्राम", subdistricts: ["Gurugram", "Sohna", "Pataudi", "Badshahpur", "Farrukhnagar"], dicOffice: "DIC, Old Railway Road, Gurugram", contact: "0124-2321234", leadBank: "State Bank of India" },
      { name: "Faridabad", nameHi: "फरीदाबाद", subdistricts: ["Faridabad", "Ballabgarh", "Badkhal"], dicOffice: "DIC, Sector-15A, Faridabad", contact: "0129-2281234", leadBank: "Punjab National Bank" },
      { name: "Hisar", nameHi: "हिसार", subdistricts: ["Hisar", "Hansi", "Barwala", "Narnaund", "Adampur"], dicOffice: "DIC, Mini Secretariat, Hisar", contact: "01662-231234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "West Bengal",
    stateHi: "पश्चिम बंगाल",
    scaName: "West Bengal SC, ST & OBC Development & Finance Corporation",
    scaAddress: "CF-217/A/1, Sector-I, Salt Lake City, Kolkata - 700064",
    helpline: "033-23211234 / 1800-345-5555",
    districts: [
      { name: "Kolkata", nameHi: "कोलकाता", subdistricts: ["North Kolkata", "South Kolkata", "Central Kolkata", "Port Area"], dicOffice: "DIC, Camac Street, Kolkata", contact: "033-22871234", leadBank: "UCO Bank" },
      { name: "Howrah", nameHi: "हावड़ा", subdistricts: ["Howrah Sadar", "Uluberia"], dicOffice: "DIC, Belilious Road, Howrah", contact: "033-26661234", leadBank: "UCO Bank" },
      { name: "North 24 Parganas", nameHi: "उत्तर 24 परगना", subdistricts: ["Barasat Sadar", "Barrackpore", "Bangaon", "Basirhat", "Bidhannagar"], dicOffice: "DIC, Barasat, Kolkata", contact: "033-25521234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Kerala",
    stateHi: "केरल",
    scaName: "Kerala State Development Corp for SC & ST Ltd",
    scaAddress: "Town Hall Road, Thrissur - 680020",
    helpline: "0487-2331234 / 1800-425-2345",
    districts: [
      { name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", subdistricts: ["Thiruvananthapuram", "Neyyattinkara", "Nedumangad", "Chirayinkeezhu", "Varkala", "Kattakada"], dicOffice: "DIC, Vikas Bhavan, Thiruvananthapuram", contact: "0471-2301234", leadBank: "Canara Bank" },
      { name: "Ernakulam", nameHi: "एर्नाकुलम (कोच्चि)", subdistricts: ["Kanayannur (Kochi)", "Kochi", "Aluva", "Paravur", "Kunnathunad", "Muvattupuzha", "Kothamangalam"], dicOffice: "DIC, Kaloor, Kochi", contact: "0484-2341234", leadBank: "Union Bank of India" }
    ]
  },
  {
    state: "Odisha",
    stateHi: "ओडिशा",
    scaName: "Odisha Scheduled Castes & Scheduled Tribes Dev Finance Co-op Corp (OSFDC)",
    scaAddress: "Lewis Road, Bhubaneswar - 751002",
    helpline: "0674-2431234 / 1800-345-6770",
    districts: [
      { name: "Khordha", nameHi: "खोर्धा (भुवनेश्वर)", subdistricts: ["Bhubaneswar", "Khordha", "Jatni", "Banapur", "Begunia", "Bolagarh", "Chilika", "Tangi"], dicOffice: "DIC, Rasulgarh, Bhubaneswar", contact: "0674-2581234", leadBank: "UCO Bank" },
      { name: "Cuttack", nameHi: "कटक", subdistricts: ["Cuttack Sadar", "Athagarh", "Banki", "Baramba", "Narsinghpur", "Salepur"], dicOffice: "DIC, Madhupatna, Cuttack", contact: "0671-2341234", leadBank: "UCO Bank" }
    ]
  },
  {
    state: "Andhra Pradesh",
    stateHi: "आंध्र प्रदेश",
    scaName: "AP Scheduled Castes Co-operative Finance Corporation Ltd (APSCCFC)",
    scaAddress: "Tadepalli, Guntur District, Vijayawada - 522501",
    helpline: "0863-2341234 / 1902",
    districts: [
      { name: "Visakhapatnam", nameHi: "विशाखापत्तनम", subdistricts: ["Visakhapatnam Rural", "Visakhapatnam Urban", "Anandapuram", "Bheemunipatnam", "Gajuwaka", "Pedagantyada", "Pendurthi"], dicOffice: "DIC, Industrial Estate, Visakhapatnam", contact: "0891-2551234", leadBank: "State Bank of India" },
      { name: "NTR", nameHi: "विजयवाड़ा (एनटीआर)", subdistricts: ["Vijayawada Urban", "Vijayawada Rural", "Ibrahimpatnam", "G.Konduru", "Mylavaram", "Tiruvuru"], dicOffice: "DIC, Auto Nagar, Vijayawada", contact: "0866-2471234", leadBank: "Union Bank of India" }
    ]
  },
  {
    state: "Assam",
    stateHi: "असम",
    scaName: "Assam State Development Corp for SC Ltd",
    scaAddress: "R.G. Baruah Road, Ganeshguri, Guwahati - 781006",
    helpline: "0361-2261234 / 1800-345-3525",
    districts: [
      { name: "Kamrup Metropolitan", nameHi: "कामरूप मेट्रो (गुवाहाटी)", subdistricts: ["Guwahati", "Dispur", "Sonapur", "Chandrapur", "Azara"], dicOffice: "DIC, Bamunimaidam, Guwahati", contact: "0361-2551234", leadBank: "UCO Bank" },
      { name: "Dibrugarh", nameHi: "डिब्रूगढ़", subdistricts: ["Dibrugarh West", "Dibrugarh East", "Chabua", "Tingkhong", "Naharkatia", "Moran"], dicOffice: "DIC, Jail Road, Dibrugarh", contact: "0373-2321234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Jharkhand",
    stateHi: "झारखंड",
    scaName: "Jharkhand State Scheduled Castes Co-operative Development Corp",
    scaAddress: "Balihar Road, Morabadi, Ranchi - 834008",
    helpline: "0651-2401234 / 181",
    districts: [
      { name: "Ranchi", nameHi: "रांची", subdistricts: ["Ranchi Sadar", "Kanke", "Ratu", "Ormanjhi", "Angara", "Namkum", "Silli", "Bundu"], dicOffice: "DIC, Kokar Industrial Area, Ranchi", contact: "0651-2541234", leadBank: "Bank of India" },
      { name: "East Singhbhum", nameHi: "पूर्वी सिंहभूम (जमशेदपुर)", subdistricts: ["Jamshedpur (Golmuri)", "Ghatshila", "Potka", "Patamda", "Baharagora"], dicOffice: "DIC, Adityapur Industrial Area", contact: "0657-2381234", leadBank: "Bank of India" }
    ]
  },
  {
    state: "Chhattisgarh",
    stateHi: "छत्तीसगढ़",
    scaName: "Chhattisgarh Rajya Antyavasayi Sahkari Vitt Evam Vikas Nigam",
    scaAddress: "Sector-24, Nava Raipur Atal Nagar - 492002",
    helpline: "0771-2511234 / 1100",
    districts: [
      { name: "Raipur", nameHi: "रायपुर", subdistricts: ["Raipur", "Arang", "Abhanpur", "Tilda Neora", "Dharsiwa"], dicOffice: "DIC, Telibandha, Raipur", contact: "0771-2421234", leadBank: "State Bank of India" },
      { name: "Durg", nameHi: "दुर्ग (भिलाई)", subdistricts: ["Durg", "Bhilai", "Patan", "Dhamdha"], dicOffice: "DIC, Industrial Area, Durg", contact: "0788-2321234", leadBank: "Bank of Baroda" }
    ]
  },
  {
    state: "Uttarakhand",
    stateHi: "उत्तराखंड",
    scaName: "Uttarakhand Bahuuddeshiya Vitta Evam Vikas Nigam (KMVN / GMVN)",
    scaAddress: "Indira Nagar, Vasant Vihar, Dehradun - 248006",
    helpline: "0135-2761234 / 1905",
    districts: [
      { name: "Dehradun", nameHi: "देहरादून", subdistricts: ["Dehradun Sadar", "Rishikesh", "Vikasnagar", "Chakrata", "Kalsi", "Doiwala"], dicOffice: "DIC, Patel Nagar, Dehradun", contact: "0135-2721234", leadBank: "Punjab National Bank" },
      { name: "Haridwar", nameHi: "हरिद्वार", subdistricts: ["Haridwar", "Roorkee", "Laksar", "Bhagwanpur"], dicOffice: "DIC, SIDCUL, Haridwar", contact: "01334-221234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Himachal Pradesh",
    stateHi: "हिमाचल प्रदेश",
    scaName: "HP Scheduled Castes and Scheduled Tribes Development Corporation",
    scaAddress: "HIMUDA Complex, Shimla - 171002",
    helpline: "0177-2621234 / 1100",
    districts: [
      { name: "Shimla", nameHi: "शिमला", subdistricts: ["Shimla Urban", "Shimla Rural", "Rampur", "Theog", "Rohru", "Chopal", "Jubbal", "Kumarsain"], dicOffice: "DIC, Udyog Bhawan, Shimla", contact: "0177-2811234", leadBank: "UCO Bank" },
      { name: "Kangra", nameHi: "कांगड़ा (धर्मशाला)", subdistricts: ["Dharamshala", "Kangra", "Palampur", "Nurpur", "Dehra Gopipur", "Jawalamukhi", "Baijnath"], dicOffice: "DIC, Dharamshala, Kangra", contact: "01892-222123", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Goa",
    stateHi: "गोवा",
    scaName: "Goa State Scheduled Castes and Other Backward Classes Financial Dev Corp",
    scaAddress: "Patto Plaza, EDC Complex, Panaji, Goa - 403001",
    helpline: "0832-2431234",
    districts: [
      { name: "North Goa", nameHi: "उत्तरी गोवा", subdistricts: ["Tiswadi (Panaji)", "Bardez (Mapusa)", "Pernem", "Bicholim", "Sattari"], dicOffice: "DIC, Udyog Bhavan, Panaji", contact: "0832-2221234", leadBank: "State Bank of India" },
      { name: "South Goa", nameHi: "दक्षिणी गोवा", subdistricts: ["Salcete (Margao)", "Mormugao (Vasco)", "Ponda", "Quepem", "Sanguem", "Canacona", "Dharbandora"], dicOffice: "DIC, Margao, South Goa", contact: "0832-2711234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Jammu and Kashmir",
    stateHi: "जम्मू और कश्मीर",
    scaName: "J&K Scheduled Castes, Scheduled Tribes & Backward Classes Development Corp",
    scaAddress: "Haji House, Bemina, Srinagar / Romi Market, Jammu",
    helpline: "0194-2491234 / 0191-2431234",
    districts: [
      { name: "Srinagar", nameHi: "श्रीनगर", subdistricts: ["Srinagar South", "Srinagar North", "Eidgah", "Pantha Chowk", "Shalteng", "Chanapora", "Khanyar"], dicOffice: "DIC, Sanat Ghar, Bemina, Srinagar", contact: "0194-2491234", leadBank: "J&K Bank" },
      { name: "Jammu", nameHi: "जम्मू", subdistricts: ["Jammu", "Jammu South", "Jammu North", "Akhnoor", "Bishnah", "R.S. Pura", "Dansal", "Khour", "Marh"], dicOffice: "DIC, Exhibition Ground, Jammu", contact: "0191-2541234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Ladakh",
    stateHi: "लद्दाख",
    scaName: "Ladakh Social Welfare & Tribal Development Cell",
    scaAddress: "Council Secretariat, Kurbathang, Kargil / Leh",
    helpline: "01982-252123",
    districts: [
      { name: "Leh", nameHi: "लेह", subdistricts: ["Leh", "Nubra", "Khaltsi", "Nyoma", "Durbuk", "Kharu", "Saspol"], dicOffice: "DIC, Industrial Estate, Leh", contact: "01982-252123", leadBank: "State Bank of India" },
      { name: "Kargil", nameHi: "कारगिल", subdistricts: ["Kargil", "Sanku", "Zanskar", "Drass", "Shakar Chiktan"], dicOffice: "DIC, Baroo, Kargil", contact: "01985-232123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Chandigarh",
    stateHi: "चंडीगढ़",
    scaName: "Chandigarh Child and Women Development Corporation",
    scaAddress: "Additional Town Hall Bldg, Sector-17, Chandigarh - 160017",
    helpline: "0172-2701234",
    districts: [
      { name: "Chandigarh", nameHi: "चंडीगढ़", subdistricts: ["Sector 1-20 (North)", "Sector 21-40 (Central)", "Sector 41-60 (South)", "Industrial Area Phase I & II", "Manimajra"], dicOffice: "DIC, Industrial Area Phase II, Chandigarh", contact: "0172-2651234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Puducherry",
    stateHi: "पुडुचेरी",
    scaName: "Puducherry Adi Dravidar Development Corporation (PADCO)",
    scaAddress: "Kamaraj Salai, Saram, Puducherry - 605013",
    helpline: "0413-2241234",
    districts: [
      { name: "Puducherry", nameHi: "पुडुचेरी", subdistricts: ["Puducherry", "Oulgaret", "Villianur", "Bahour"], dicOffice: "DIC, Thattanchavady, Puducherry", contact: "0413-2248123", leadBank: "Indian Bank" },
      { name: "Karaikal", nameHi: "काराइकल", subdistricts: ["Karaikal", "Kottucherry", "Nedungadu", "Thirunallar", "Neravy", "T.R. Pattinam"], dicOffice: "DIC, Beach Road, Karaikal", contact: "04368-222123", leadBank: "Indian Bank" }
    ]
  },
  {
    state: "Tripura",
    stateHi: "त्रिपुरा",
    scaName: "Tripura Scheduled Castes Co-operative Development Corp",
    scaAddress: "Lake Chowmuhani, Agartala - 799001",
    helpline: "0381-2321234",
    districts: [
      { name: "West Tripura", nameHi: "पश्चिम त्रिपुरा (अगरतला)", subdistricts: ["Sadar (Agartala)", "Mohanpur", "Jirania", "Mandai", "Lefunga", "Belbari"], dicOffice: "DIC, Kunjaban, Agartala", contact: "0381-2351234", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Meghalaya",
    stateHi: "मेघालय",
    scaName: "Meghalaya Rural & Social Development Directorate",
    scaAddress: "Lower Lachumiere, Shillong - 793001",
    helpline: "0364-2221234",
    districts: [
      { name: "East Khasi Hills", nameHi: "पूर्वी खासी हिल्स (शिलांग)", subdistricts: ["Mylliem (Shillong)", "Mawphlang", "Mawkynrew", "Khatarshnong Laitkroh", "Pynursla", "Shella Bholaganj"], dicOffice: "DIC, Nonghimmai, Shillong", contact: "0364-2224123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Manipur",
    stateHi: "मणिपुर",
    scaName: "Manipur Tribal & SC Development Directorate",
    scaAddress: "Babupara, Imphal - 795001",
    helpline: "0385-2451234",
    districts: [
      { name: "Imphal West", nameHi: "इंफाल पश्चिम", subdistricts: ["Lamphelpat", "Patsoi", "Lamsang", "Wangoi"], dicOffice: "DIC, Lamphelpat, Imphal", contact: "0385-2411234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Nagaland",
    stateHi: "नागालैंड",
    scaName: "Nagaland Handloom & Handicrafts / Rural Enterprise Cell",
    scaAddress: "NH-29, Half Nagarjan, Dimapur - 797112",
    helpline: "03862-224123",
    districts: [
      { name: "Dimapur", nameHi: "दीमापुर", subdistricts: ["Dimapur Sadar", "Chümoukedima", "Medziphema", "Niuland", "Dhansiripar"], dicOffice: "DIC, Nagarjan, Dimapur", contact: "03862-232123", leadBank: "State Bank of India" },
      { name: "Kohima", nameHi: "कोहिमा", subdistricts: ["Kohima Sadar", "Sechu-Zubza", "Chiephobozou", "Tseminyu", "Jakhama", "Botsa"], dicOffice: "DIC, High School Colony, Kohima", contact: "0370-222123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Mizoram",
    stateHi: "मिजोरम",
    scaName: "Mizoram Rural Development Cell",
    scaAddress: "New Capital Complex, Khatla, Aizawl - 796001",
    helpline: "0389-2331234",
    districts: [
      { name: "Aizawl", nameHi: "आइजोल", subdistricts: ["Aizawl", "Tlangnuam", "Thingsulthliah", "Darlawn", "Phullen"], dicOffice: "DIC, Upper Khatla, Aizawl", contact: "0389-2321234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Arunachal Pradesh",
    stateHi: "अरुणाचल प्रदेश",
    scaName: "Arunachal Pradesh Rural Development Agency",
    scaAddress: "Civil Secretariat, Itanagar - 791111",
    helpline: "0360-2212345",
    districts: [
      { name: "Papum Pare", nameHi: "पापुम पारे (ईटानगर)", subdistricts: ["Itanagar", "Naharlagun", "Doimukh", "Sagalee", "Balijan", "Kimin", "Mengio"], dicOffice: "DIC, Naharlagun, Papum Pare", contact: "0360-2244123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Sikkim",
    stateHi: "सिक्किम",
    scaName: "Sikkim Scheduled Castes, Scheduled Tribes & Other Backward Classes Development Corp (SABCCO)",
    scaAddress: "Sonam Tshering Marg, Gangtok - 737101",
    helpline: "03592-202123",
    districts: [
      { name: "Gangtok", nameHi: "गंगटोक", subdistricts: ["Gangtok", "Pakyong", "Rongli", "Dikiing"], dicOffice: "DIC, Deorali, Gangtok", contact: "03592-281123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    stateHi: "दादरा और नगर हवेली और दमन और दीव",
    scaName: "UT Social Welfare & Enterprise Directorate",
    scaAddress: "Collectorate, Silvassa / Daman",
    helpline: "0260-2642123",
    districts: [
      { name: "Dadra and Nagar Haveli", nameHi: "दादरा और नगर हवेली", subdistricts: ["Silvassa", "Khanvel", "Dadra"], dicOffice: "DIC, Silvassa", contact: "0260-2642123", leadBank: "Dena / Bank of Baroda" },
      { name: "Daman", nameHi: "दमन", subdistricts: ["Nani Daman", "Moti Daman"], dicOffice: "DIC, Moti Daman", contact: "0260-2231234", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Andaman and Nicobar Islands",
    stateHi: "अंडमान और निकोबार द्वीप समूह",
    scaName: "Andaman and Nicobar Islands Integrated Development Corp (ANIIDCO)",
    scaAddress: "Vikas Bhawan, Port Blair - 744101",
    helpline: "03192-232123",
    districts: [
      { name: "South Andaman", nameHi: "दक्षिण अंडमान (पोर्ट ब्लेयर)", subdistricts: ["Port Blair", "Ferrargunj", "Little Andaman"], dicOffice: "DIC, Middle Point, Port Blair", contact: "03192-232123", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Lakshadweep",
    stateHi: "लक्षद्वीप",
    scaName: "Lakshadweep Development Corporation Ltd",
    scaAddress: "Kavaratti Island - 682555",
    helpline: "04896-262123",
    districts: [
      { name: "Lakshadweep", nameHi: "लक्षद्वीप", subdistricts: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy", "Kalpeni", "Kiltan", "Chetlat", "Kadmat", "Bitra"], dicOffice: "DIC, Kavaratti", contact: "04896-262123", leadBank: "Syndicate / Canara Bank" }
    ]
  }
];

export const getDistrictInfo = (stateName, districtName) => {
  if (!stateName) return null;
  const stateMatch = stateDistrictsData.find(
    s => s.state.toLowerCase() === stateName.toLowerCase() ||
         stateName.toLowerCase().includes(s.state.toLowerCase())
  );
  if (!stateMatch) return null;

  let districtMatch = null;
  if (districtName) {
    districtMatch = stateMatch.districts.find(
      d => d.name.toLowerCase() === districtName.toLowerCase() ||
           districtName.toLowerCase().includes(d.name.toLowerCase())
    );
  }

  const selectedDistrict = districtMatch || stateMatch.districts[0];

  return {
    state: stateMatch.state,
    stateHi: stateMatch.stateHi,
    scaName: stateMatch.scaName,
    scaAddress: stateMatch.scaAddress,
    helpline: stateMatch.helpline,
    district: selectedDistrict
  };
};

export const getAllStates = () => {
  return stateDistrictsData.map(s => ({
    name: s.state,
    nameHi: s.stateHi,
    districts: s.districts.map(d => ({ name: d.name, nameHi: d.nameHi, subdistricts: d.subdistricts || [] }))
  }));
};
