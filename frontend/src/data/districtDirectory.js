/**
 * Hyper-Local District Assistance Directory
 * Mapping Indian States and Districts to District Industries Centres (DIC),
 * State Channelizing Agencies (SCA / NSFDC), and Khadi & Village Industries (KVIB) offices.
 * Covers major Indian states with accurate, non-overlapping district mappings.
 */

export const stateDistrictsData = [
  {
    state: "Gujarat",
    stateHi: "गुजरात",
    scaName: "Gujarat Backward Classes Development Corporation (GBCDC) / GSCDC",
    scaAddress: "Block No. 4, 2nd Floor, Dr. Jivraj Mehta Bhavan, Gandhinagar - 382010",
    helpline: "079-23253240 / 1800-233-0130",
    districts: [
      { name: "Ahmedabad", nameHi: "अहमदाबाद", dicOffice: "DIC, Bahumali Bhavan, Vastrapur, Ahmedabad", contact: "079-26302345 / dic-ahm@gujarat.gov.in", leadBank: "State Bank of India (Lead District Office)" },
      { name: "Surat", nameHi: "सूरत", dicOffice: "DIC, Nanpura Multistorey Building, Surat", contact: "0261-2465123 / dic-surat@gujarat.gov.in", leadBank: "Bank of Baroda (Lead District Office)" },
      { name: "Vadodara", nameHi: "वडोदरा", dicOffice: "DIC, Kothi Kacheri Compound, Vadodara", contact: "0265-2431234 / dic-vadodara@gujarat.gov.in", leadBank: "Bank of Baroda (Lead District Office)" },
      { name: "Rajkot", nameHi: "राजकोट", dicOffice: "DIC, Jilla Seva Sadan-2, Shroff Road, Rajkot", contact: "0281-2451234 / dic-rajkot@gujarat.gov.in", leadBank: "State Bank of India (Lead Bank Cell)" },
      { name: "Gandhinagar", nameHi: "गांधीनगर", dicOffice: "DIC, Sector-11, M.S. Building, Gandhinagar", contact: "079-23221234 / dic-gnr@gujarat.gov.in", leadBank: "Dena Bank / Bank of Baroda" },
      { name: "Bhavnagar", nameHi: "भावनगर", dicOffice: "DIC, Bahumali Bhavan, Bhavnagar", contact: "0278-2421234 / dic-bhavnagar@gujarat.gov.in", leadBank: "State Bank of India (Lead District Office)" },
      { name: "Jamnagar", nameHi: "जामनगर", dicOffice: "DIC, Lal Bungalow Campus, Jamnagar", contact: "0288-2551234 / dic-jamnagar@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Junagadh", nameHi: "जूनागढ़", dicOffice: "DIC, Sardarbaug, Junagadh", contact: "0285-2621234 / dic-junagadh@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Anand", nameHi: "आणंद", dicOffice: "DIC, Borsad Chokdi, Anand", contact: "02692-261234 / dic-anand@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Kutch", nameHi: "कच्छ (भुज)", dicOffice: "DIC, Bahumali Bhavan, Bhuj-Kutch", contact: "02832-251234 / dic-kutch@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Bharuch", nameHi: "भरूच", dicOffice: "DIC, Old Collector Office Compound, Bharuch", contact: "02642-241234 / dic-bharuch@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Navsari", nameHi: "नवसारी", dicOffice: "DIC, Jilla Seva Sadan, Junathana, Navsari", contact: "02637-251234 / dic-navsari@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Valsad", nameHi: "वलसाड", dicOffice: "DIC, Dharampur Road, Valsad", contact: "02632-241234 / dic-valsad@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Mehsana", nameHi: "मेहसाणा", dicOffice: "DIC, Bahumali Bhavan, Mehsana", contact: "02762-221234 / dic-mehsana@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Morbi", nameHi: "मोरबी", dicOffice: "DIC, Sobheshwar Road, Morbi", contact: "02822-221234 / dic-morbi@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Panchmahal (Godhra)", nameHi: "पंचमहाल (गोधरा)", dicOffice: "DIC, Collectorate Campus, Godhra", contact: "02672-241234 / dic-godhra@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Surendranagar", nameHi: "सुरेंद्रनगर", dicOffice: "DIC, Kherali Road, Surendranagar", contact: "02752-281234 / dic-snagar@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Patan", nameHi: "पाटण", dicOffice: "DIC, Siddhpur Char Rasta, Patan", contact: "02766-221234 / dic-patan@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Banaskantha (Palanpur)", nameHi: "बनासकांठा (पालनपुर)", dicOffice: "DIC, Jilla Seva Sadan, Palanpur", contact: "02742-251234 / dic-bk@gujarat.gov.in", leadBank: "Dena / Bank of Baroda" },
      { name: "Amreli", nameHi: "अमरेली", dicOffice: "DIC, Rajmahal Compound, Amreli", contact: "02792-221234 / dic-amreli@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Dahod", nameHi: "दाहोद", dicOffice: "DIC, Jilla Seva Sadan, Dahod", contact: "02673-221234 / dic-dahod@gujarat.gov.in", leadBank: "Bank of Baroda" },
      { name: "Gir Somnath (Veraval)", nameHi: "गीर सोमनाथ (वेरावल)", dicOffice: "DIC, Prabhas Patan Road, Veraval", contact: "02876-241234 / dic-girsomnath@gujarat.gov.in", leadBank: "State Bank of India" },
      { name: "Porbandar", nameHi: "पोरबंदर", dicOffice: "DIC, Chaupati Ground, Porbandar", contact: "0286-2241234 / dic-porbandar@gujarat.gov.in", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Maharashtra",
    stateHi: "महाराष्ट्र",
    scaName: "Mahatma Phule Backward Class Development Corporation (MPBCDC)",
    scaAddress: "Supreme Chambers, 17/18 Shah Industrial Estate, Veera Desai Road, Andheri West, Mumbai - 400053",
    helpline: "022-26732345 / 1800-222-340",
    districts: [
      { name: "Pune", nameHi: "पुणे", dicOffice: "DIC, Agriculture College Compound, Shivaji Nagar, Pune", contact: "020-25537456 / dicpune@maharashtra.gov.in", leadBank: "Bank of Maharashtra (Lead District Office)" },
      { name: "Nagpur", nameHi: "नागपुर", dicOffice: "DIC, Civil Lines, Near High Court, Nagpur", contact: "0712-2561234 / dicnagpur@maharashtra.gov.in", leadBank: "Bank of India (Lead District Office)" },
      { name: "Mumbai City", nameHi: "मुंबई शहर", dicOffice: "DIC, Old Customs House, Fort, Mumbai", contact: "022-22661234 / dicmumbai@maharashtra.gov.in", leadBank: "State Bank of India" },
      { name: "Mumbai Suburban", nameHi: "मुंबई उपनगर", dicOffice: "DIC, Administrative Building, Bandra East, Mumbai", contact: "022-26551234 / dicsuburban@maharashtra.gov.in", leadBank: "Bank of Baroda" },
      { name: "Thane", nameHi: "ठाणे", dicOffice: "DIC, Wagle Industrial Estate, Thane West", contact: "022-25821234 / dicthane@maharashtra.gov.in", leadBank: "Bank of Maharashtra" },
      { name: "Nashik", nameHi: "नाशिक", dicOffice: "DIC, Old Agra Road, CBS, Nashik", contact: "0253-2571234 / dicnashik@maharashtra.gov.in", leadBank: "Bank of Maharashtra" },
      { name: "Chhatrapati Sambhajinagar (Aurangabad)", nameHi: "छत्रपती संभाजीनगर (औरंगाबाद)", dicOffice: "DIC, Railway Station Road, Aurangabad", contact: "0240-2331234 / dicaurangabad@maharashtra.gov.in", leadBank: "Bank of Maharashtra" },
      { name: "Solapur", nameHi: "सोलापूर", dicOffice: "DIC, Old Employment Exchange Building, Solapur", contact: "0217-2721234 / dicsolapur@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Amravati", nameHi: "अमरावती", dicOffice: "DIC, Camp Road, Near Collectorate, Amravati", contact: "0721-2661234 / dicamravati@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Kolhapur", nameHi: "कोल्हापूर", dicOffice: "DIC, Udyog Bhavan, Kawala Naka, Kolhapur", contact: "0231-2651234 / dickolhapur@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Nanded", nameHi: "नांदेड", dicOffice: "DIC, VIP Road, Nanded", contact: "02462-234123 / dicnanded@maharashtra.gov.in", leadBank: "State Bank of India" },
      { name: "Jalgaon", nameHi: "जळगाव", dicOffice: "DIC, MIDC Area, Ajanta Road, Jalgaon", contact: "0257-2211234 / dicjalgaon@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Ahmednagar", nameHi: "अहमदनगर", dicOffice: "DIC, Station Road, Ahmednagar", contact: "0241-2411234 / dicanagar@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Satara", nameHi: "सातारा", dicOffice: "DIC, Sadar Bazar, Satara", contact: "02162-231234 / dicsatara@maharashtra.gov.in", leadBank: "Bank of Maharashtra" },
      { name: "Sangli", nameHi: "सांगली", dicOffice: "DIC, Madhavnagar Road, Sangli", contact: "0233-2371234 / dicsangli@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Latur", nameHi: "लातूर", dicOffice: "DIC, Old Collectorate, Latur", contact: "02382-241234 / diclatur@maharashtra.gov.in", leadBank: "Bank of Maharashtra" },
      { name: "Dhule", nameHi: "धुळे", dicOffice: "DIC, Sakri Road, Dhule", contact: "02562-231234 / dicdhule@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Akola", nameHi: "अकोला", dicOffice: "DIC, Civil Lines, Akola", contact: "0724-2431234 / dicakola@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Chandrapur", nameHi: "चंद्रपूर", dicOffice: "DIC, Mul Road, Chandrapur", contact: "07172-251234 / dicchandrapur@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Raigad (Alibag)", nameHi: "रायगड (अलिबाग)", dicOffice: "DIC, Chendhare, Alibag", contact: "02141-222123 / dicraigad@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Ratnagiri", nameHi: "रत्नागिरी", dicOffice: "DIC, Shivaji Nagar, Ratnagiri", contact: "02352-222123 / dicratnagiri@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Sindhudurg (Oros)", nameHi: "सिंधुदुर्ग (ओरोस)", dicOffice: "DIC, Administrative Complex, Sindhudurgnagari", contact: "02362-228123 / dicsindhudurg@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Yavatmal", nameHi: "यवतमाळ", dicOffice: "DIC, Darwha Road, Yavatmal", contact: "07232-241234 / dicyavatmal@maharashtra.gov.in", leadBank: "Central Bank of India" },
      { name: "Wardha", nameHi: "वर्धा", dicOffice: "DIC, Sevagram Road, Wardha", contact: "07152-241234 / dicwardha@maharashtra.gov.in", leadBank: "Bank of India" },
      { name: "Palghar", nameHi: "पालघर", dicOffice: "DIC, Collector Complex, Palghar", contact: "02525-251234 / dicpalghar@maharashtra.gov.in", leadBank: "Bank of Maharashtra" }
    ]
  },
  {
    state: "Uttar Pradesh",
    stateHi: "उत्तर प्रदेश",
    scaName: "Uttar Pradesh Scheduled Castes Finance & Development Corporation (UPSCFDC)",
    scaAddress: "Pragati Deep Building, Station Road, Lucknow - 226001",
    helpline: "0522-2635648 / 1800-180-5145",
    districts: [
      { name: "Varanasi", nameHi: "वाराणसी", dicOffice: "DIC, Chandpur Industrial Estate, Varanasi", contact: "0542-2370123 / dic-varanasi@up.gov.in", leadBank: "Union Bank of India" },
      { name: "Lucknow", nameHi: "लखनऊ", dicOffice: "DIC, Talkatora Industrial Area, Lucknow", contact: "0522-2691456 / diclucknow@gmail.com", leadBank: "Bank of India" },
      { name: "Kanpur Nagar", nameHi: "कानपुर नगर", dicOffice: "DIC, Sarvodaya Nagar, Kanpur", contact: "0512-2217890 / dickanpur@up.gov.in", leadBank: "Bank of Baroda" },
      { name: "Prayagraj (Allahabad)", nameHi: "प्रयागराज", dicOffice: "DIC, Naini Industrial Area, Prayagraj", contact: "0532-2687123 / dicprayagraj@up.gov.in", leadBank: "State Bank of India" },
      { name: "Gorakhpur", nameHi: "गोरखपुर", dicOffice: "DIC, GIDA Sector 5, Gorakhpur", contact: "0551-2281456 / dicgorakhpur@up.gov.in", leadBank: "State Bank of India" },
      { name: "Agra", nameHi: "आगरा", dicOffice: "DIC, Nunhai Industrial Area, Agra", contact: "0562-2281234 / dicagra@up.gov.in", leadBank: "Canara Bank" },
      { name: "Meerut", nameHi: "मेरठ", dicOffice: "DIC, Delhi Road, Meerut", contact: "0121-2401234 / dicmeerut@up.gov.in", leadBank: "Punjab National Bank" },
      { name: "Bareilly", nameHi: "बरेली", dicOffice: "DIC, Civil Lines, Bareilly", contact: "0581-2421234 / dicbareilly@up.gov.in", leadBank: "Bank of Baroda" },
      { name: "Aligarh", nameHi: "अलीगढ़", dicOffice: "DIC, Industrial Estate, Aligarh", contact: "0571-2401234 / dicaligarh@up.gov.in", leadBank: "Canara Bank" },
      { name: "Ghaziabad", nameHi: "गाजियाबाद", dicOffice: "DIC, Bulandshahr Road Industrial Area, Ghaziabad", contact: "0120-2711234 / dicghaziabad@up.gov.in", leadBank: "Punjab National Bank" },
      { name: "Gautam Buddha Nagar (Noida)", nameHi: "गौतम बुद्ध नगर (नोएडा)", dicOffice: "DIC, Sector-1, Noida", contact: "0120-2521234 / dicnoida@up.gov.in", leadBank: "Punjab National Bank" },
      { name: "Moradabad", nameHi: "मुरादाबाद", dicOffice: "DIC, Kanth Road, Moradabad", contact: "0591-2451234 / dicmoradabad@up.gov.in", leadBank: "Canara Bank" },
      { name: "Saharanpur", nameHi: "सहारनपुर", dicOffice: "DIC, Delhi Road, Saharanpur", contact: "0132-2711234 / dicsaharanpur@up.gov.in", leadBank: "Punjab National Bank" },
      { name: "Jhansi", nameHi: "झांसी", dicOffice: "DIC, Gwalior Road, Jhansi", contact: "0510-2441234 / dicjhansi@up.gov.in", leadBank: "State Bank of India" },
      { name: "Ayodhya (Faizabad)", nameHi: "अयोध्या (फैजाबाद)", dicOffice: "DIC, Civil Lines, Ayodhya", contact: "05278-224123 / dicayodhya@up.gov.in", leadBank: "Bank of Baroda" },
      { name: "Mathura", nameHi: "मथुरा", dicOffice: "DIC, Delhi-Agra Highway, Mathura", contact: "0565-2401234 / dicmathura@up.gov.in", leadBank: "Canara Bank" },
      { name: "Azamgarh", nameHi: "आजमगढ़", dicOffice: "DIC, Sidhari, Azamgarh", contact: "05462-246123 / dicazamgarh@up.gov.in", leadBank: "Union Bank of India" },
      { name: "Muzaffarnagar", nameHi: "मुजफ्फरनगर", dicOffice: "DIC, Meerut Road, Muzaffarnagar", contact: "0131-2601234 / dicmuzaffarnagar@up.gov.in", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Rajasthan",
    stateHi: "राजस्थान",
    scaName: "Rajasthan Scheduled Castes & Scheduled Tribes Finance Corporation (Anuja Nigam)",
    scaAddress: "Nehru Sahakar Bhawan, Bhawani Singh Road, Jaipur - 302001",
    helpline: "0141-2740456 / 181 (Jan Soochna)",
    districts: [
      { name: "Jaipur", nameHi: "जयपुर", dicOffice: "DIC, Jhotwara Industrial Area, Jaipur", contact: "0141-2341234 / dicjaipur@rajasthan.gov.in", leadBank: "UCO Bank" },
      { name: "Jodhpur", nameHi: "जोधपुर", dicOffice: "DIC, Heavy Industrial Area, Jodhpur", contact: "0291-2741234 / dicjodhpur@rajasthan.gov.in", leadBank: "Bank of Baroda" },
      { name: "Kota", nameHi: "कोटा", dicOffice: "DIC, DCM Road, Kota", contact: "0744-2481234 / dickota@rajasthan.gov.in", leadBank: "Central Bank of India" },
      { name: "Bikaner", nameHi: "बीकानेर", dicOffice: "DIC, Kanta Khaturia Colony, Bikaner", contact: "0151-2231234 / dicbikaner@rajasthan.gov.in", leadBank: "Punjab National Bank" },
      { name: "Ajmer", nameHi: "अजमेर", dicOffice: "DIC, Civil Lines, Ajmer", contact: "0145-2421234 / dicajmer@rajasthan.gov.in", leadBank: "Bank of Baroda" },
      { name: "Udaipur", nameHi: "उदयपुर", dicOffice: "DIC, Sukhadia Circle, Udaipur", contact: "0294-2421234 / dicudaipur@rajasthan.gov.in", leadBank: "ICICI / State Bank of India" },
      { name: "Bhilwara", nameHi: "भीलवाड़ा", dicOffice: "DIC, Pur Road, Bhilwara", contact: "01482-246123 / dicbhilwara@rajasthan.gov.in", leadBank: "Bank of Baroda" },
      { name: "Alwar", nameHi: "अलवर", dicOffice: "DIC, Matsya Industrial Area, Alwar", contact: "0144-2881234 / dicalwar@rajasthan.gov.in", leadBank: "Punjab National Bank" },
      { name: "Sikar", nameHi: "सीकर", dicOffice: "DIC, Bajaj Gram, Sikar", contact: "01572-251234 / dicsikar@rajasthan.gov.in", leadBank: "UCO Bank" },
      { name: "Bharatpur", nameHi: "भरतपुर", dicOffice: "DIC, Brij Industrial Area, Bharatpur", contact: "05644-224123 / dicbharatpur@rajasthan.gov.in", leadBank: "Punjab National Bank" },
      { name: "Sri Ganganagar", nameHi: "श्रीगंगानगर", dicOffice: "DIC, Industrial Area, Sri Ganganagar", contact: "0154-2461234 / dicsgnr@rajasthan.gov.in", leadBank: "Punjab National Bank" },
      { name: "Pali", nameHi: "पाली", dicOffice: "DIC, Mandia Road Industrial Area, Pali", contact: "02932-280123 / dicpali@rajasthan.gov.in", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Madhya Pradesh",
    stateHi: "मध्य प्रदेश",
    scaName: "Madhya Pradesh State SC Finance & Development Corp (MP Antyavasayi)",
    scaAddress: "Rajiv Gandhi Bhawan, 35 Shyamla Hills, Bhopal - 462002",
    helpline: "0755-2661280 / 1800-233-1250",
    districts: [
      { name: "Bhopal", nameHi: "भोपाल", dicOffice: "DIC, Govindpura Industrial Area, Bhopal", contact: "0755-2586745 / dicbhopal@mp.gov.in", leadBank: "Central Bank of India" },
      { name: "Indore", nameHi: "इंदौर", dicOffice: "DIC, Pologround Industrial Estate, Indore", contact: "0731-2421345 / dicindore@mp.gov.in", leadBank: "Bank of India" },
      { name: "Jabalpur", nameHi: "जबलपुर", dicOffice: "DIC, Richhai Industrial Area, Jabalpur", contact: "0761-2345678 / dicjabalpur@mp.gov.in", leadBank: "UCO Bank" },
      { name: "Gwalior", nameHi: "ग्वालियर", dicOffice: "DIC, Maharajpura Industrial Area, Gwalior", contact: "0751-2481234 / dicgwalior@mp.gov.in", leadBank: "Central Bank of India" },
      { name: "Ujjain", nameHi: "उज्जैन", dicOffice: "DIC, Maxi Road Industrial Area, Ujjain", contact: "0734-2511234 / dicujjain@mp.gov.in", leadBank: "Bank of India" },
      { name: "Sagar", nameHi: "सागर", dicOffice: "DIC, Civil Lines, Sagar", contact: "07582-224123 / dicsagar@mp.gov.in", leadBank: "State Bank of India" },
      { name: "Dewas", nameHi: "देवास", dicOffice: "DIC, Industrial Area AB Road, Dewas", contact: "07272-258123 / dicdewas@mp.gov.in", leadBank: "Bank of India" },
      { name: "Satna", nameHi: "सतना", dicOffice: "DIC, Maihar Bypass Road, Satna", contact: "07672-224123 / dicsatna@mp.gov.in", leadBank: "Union Bank of India" },
      { name: "Ratlam", nameHi: "रतलाम", dicOffice: "DIC, Industrial Area, Ratlam", contact: "07412-261234 / dicratlam@mp.gov.in", leadBank: "Bank of India" },
      { name: "Rewa", nameHi: "रीवा", dicOffice: "DIC, Kuthulia Industrial Area, Rewa", contact: "07662-251234 / dicrewa@mp.gov.in", leadBank: "Union Bank of India" }
    ]
  },
  {
    state: "Bihar",
    stateHi: "बिहार",
    scaName: "Bihar State SC Co-operative Development Corporation Ltd (BSSCCDC)",
    scaAddress: "Pariwahan Bhawan, Birchand Patel Path, Patna - 800001",
    helpline: "0612-2226348 / 1800-345-6215",
    districts: [
      { name: "Patna", nameHi: "पटना", dicOffice: "DIC, Patliputra Industrial Area, Patna", contact: "0612-2262456 / gm-dic-patna@bihar.gov.in", leadBank: "Punjab National Bank" },
      { name: "Gaya", nameHi: "गया", dicOffice: "DIC, Gaya Industrial Area, Gaya", contact: "0631-2221456 / dicgaya@bihar.gov.in", leadBank: "Punjab National Bank" },
      { name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", dicOffice: "DIC, Bela Industrial Estate, Muzaffarpur", contact: "0621-2273456 / dicmuz@bihar.gov.in", leadBank: "Central Bank of India" },
      { name: "Bhagalpur", nameHi: "भागलपुर", dicOffice: "DIC, Barari Industrial Estate, Bhagalpur", contact: "0641-2401234 / dicbhagalpur@bihar.gov.in", leadBank: "UCO Bank" },
      { name: "Darbhanga", nameHi: "दरभंगा", dicOffice: "DIC, Donar Industrial Area, Darbhanga", contact: "06272-245123 / dicdarbhanga@bihar.gov.in", leadBank: "Central Bank of India" },
      { name: "Purnia", nameHi: "पूर्णिया", dicOffice: "DIC, Maranga Industrial Area, Purnia", contact: "06454-242123 / dicpurnia@bihar.gov.in", leadBank: "State Bank of India" },
      { name: "Begusarai", nameHi: "बेगूसराय", dicOffice: "DIC, Harrakh Industrial Area, Begusarai", contact: "06243-224123 / dicbegusarai@bihar.gov.in", leadBank: "UCO Bank" },
      { name: "Katihar", nameHi: "कटिहार", dicOffice: "DIC, Mirchaibari, Katihar", contact: "06452-241234 / dickatihar@bihar.gov.in", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Karnataka",
    stateHi: "कर्नाटक",
    scaName: "Dr. B.R. Ambedkar Development Corporation Limited Karnataka",
    scaAddress: "9th & 10th Floor, Vishveshwaraiah Mini Tower, Dr. B.R. Ambedkar Veedhi, Bengaluru - 560001",
    helpline: "080-22864262 / 1800-425-4262",
    districts: [
      { name: "Bengaluru Urban", nameHi: "बेंगलुरु शहरी", dicOffice: "DIC, Rajajinagar Industrial Estate, Bengaluru", contact: "080-23151234 / dic-bengaluru@karnataka.gov.in", leadBank: "Canara Bank" },
      { name: "Bengaluru Rural", nameHi: "बेंगलुरु ग्रामीण", dicOffice: "DIC, Poddar Building, Bengaluru Rural", contact: "080-22341234 / dic-benrural@karnataka.gov.in", leadBank: "Canara Bank" },
      { name: "Mysuru", nameHi: "मैसूरु", dicOffice: "DIC, Sayyaji Rao Road, Mysuru", contact: "0821-2421234 / dic-mysuru@karnataka.gov.in", leadBank: "State Bank of India" },
      { name: "Hubballi-Dharwad", nameHi: "हुबली-धारवाड़", dicOffice: "DIC, Rayapur Industrial Area, Dharwad", contact: "0836-2371234 / dic-dharwad@karnataka.gov.in", leadBank: "Bank of Baroda" },
      { name: "Mangaluru (Dakshina Kannada)", nameHi: "मंगलुरु", dicOffice: "DIC, Yeyyadi Industrial Estate, Mangaluru", contact: "0824-2211234 / dic-mangaluru@karnataka.gov.in", leadBank: "Canara Bank" },
      { name: "Belagavi", nameHi: "बेलगावी", dicOffice: "DIC, Udyambag Industrial Estate, Belagavi", contact: "0831-2441234 / dic-belagavi@karnataka.gov.in", leadBank: "Canara Bank" },
      { name: "Kalaburagi", nameHi: "कलबुर्गी (गुलबर्गा)", dicOffice: "DIC, MSK Mill Road, Kalaburagi", contact: "08472-224123 / dic-kalaburagi@karnataka.gov.in", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Tamil Nadu",
    stateHi: "तमिलनाडु",
    scaName: "Tamil Nadu Adi Dravidar Housing & Development Corporation (TAHDCO)",
    scaAddress: "No. 31, Cenotaph Road, Teynampet, Chennai - 600018",
    helpline: "044-24344102 / 1800-425-4444",
    districts: [
      { name: "Chennai", nameHi: "चेन्नई", dicOffice: "DIC, Guindy Industrial Estate, Chennai", contact: "044-22501234 / dicchennai@tn.gov.in", leadBank: "Indian Bank" },
      { name: "Coimbatore", nameHi: "कोयंबटूर", dicOffice: "DIC, Patel Road, Ramnagar, Coimbatore", contact: "0422-2231234 / diccbe@tn.gov.in", leadBank: "Canara Bank" },
      { name: "Madurai", nameHi: "मदुरै", dicOffice: "DIC, Alagar Kovil Road, Madurai", contact: "0452-2531234 / dicmadurai@tn.gov.in", leadBank: "Canara Bank" },
      { name: "Tiruchirappalli (Trichy)", nameHi: "तिरुचिरापल्ली", dicOffice: "DIC, Collectorate Complex, Trichy", contact: "0431-2411234 / dictrichy@tn.gov.in", leadBank: "Indian Overseas Bank" },
      { name: "Salem", nameHi: "सलेम", dicOffice: "DIC, Omalur Main Road, Salem", contact: "0427-2441234 / dicsalem@tn.gov.in", leadBank: "Indian Bank" },
      { name: "Tiruppur", nameHi: "तिरुपूर", dicOffice: "DIC, Kumaran Road, Tiruppur", contact: "0421-2241234 / dictiruppur@tn.gov.in", leadBank: "Canara Bank" }
    ]
  },
  {
    state: "Punjab",
    stateHi: "पंजाब",
    scaName: "Punjab Scheduled Castes Land Development & Finance Corporation (PSCFC)",
    scaAddress: "SCO 101-103, Sector 17-C, Chandigarh - 160017",
    helpline: "0172-2702123 / 1800-180-2057",
    districts: [
      { name: "Ludhiana", nameHi: "लुधियाना", dicOffice: "DIC, Industrial Area-B, Ludhiana", contact: "0161-2531234 / dicldh@punjab.gov.in", leadBank: "Punjab National Bank" },
      { name: "Amritsar", nameHi: "अमृतसर", dicOffice: "DIC, Court Road, Amritsar", contact: "0183-2221234 / dicasr@punjab.gov.in", leadBank: "Punjab National Bank" },
      { name: "Jalandhar", nameHi: "जालंधर", dicOffice: "DIC, Patel Chowk, Jalandhar", contact: "0181-2281234 / dicjlr@punjab.gov.in", leadBank: "Punjab National Bank" },
      { name: "Patiala", nameHi: "पटियाला", dicOffice: "DIC, Sirhind Road, Patiala", contact: "0175-2211234 / dicpta@punjab.gov.in", leadBank: "State Bank of India" },
      { name: "Bathinda", nameHi: "बठिंडा", dicOffice: "DIC, Goniana Road, Bathinda", contact: "0164-2211234 / dicbtd@punjab.gov.in", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "Haryana",
    stateHi: "हरियाणा",
    scaName: "Haryana Scheduled Castes Finance & Development Corporation (HSCFDC)",
    scaAddress: "Bays No. 49-52, Sector 2, Panchkula - 134112",
    helpline: "0172-2565123 / 1800-180-2222",
    districts: [
      { name: "Gurugram (Gurgaon)", nameHi: "गुरुग्राम", dicOffice: "DIC, Old Judicial Complex, Gurugram", contact: "0124-2321234 / dicggn@haryana.gov.in", leadBank: "Punjab National Bank" },
      { name: "Faridabad", nameHi: "फरीदाबाद", dicOffice: "DIC, Sector-15A, Faridabad", contact: "0129-2281234 / dicfbd@haryana.gov.in", leadBank: "Punjab National Bank" },
      { name: "Panipat", nameHi: "पानीपत", dicOffice: "DIC, Old Court Road, Panipat", contact: "0180-2641234 / dicpanipat@haryana.gov.in", leadBank: "Punjab National Bank" },
      { name: "Hisar", nameHi: "हिसार", dicOffice: "DIC, Industrial Area, Hisar", contact: "01662-231234 / dichisar@haryana.gov.in", leadBank: "Punjab National Bank" },
      { name: "Ambala", nameHi: "अंबाला", dicOffice: "DIC, Jagadhri Road, Ambala Cantt", contact: "0171-2641234 / dicambala@haryana.gov.in", leadBank: "Punjab National Bank" }
    ]
  },
  {
    state: "West Bengal",
    stateHi: "पश्चिम बंगाल",
    scaName: "West Bengal SC, ST & OBC Development & Finance Corporation (WBSCSTDFCL)",
    scaAddress: "CF-217/A/1, Sector-I, Salt Lake, Kolkata - 700064",
    helpline: "033-23213031 / 1800-345-5555",
    districts: [
      { name: "Kolkata", nameHi: "कोलकाता", dicOffice: "DIC, Camac Street, Kolkata", contact: "033-22871234 / dickolkata@wb.gov.in", leadBank: "UCO Bank" },
      { name: "Howrah", nameHi: "हावड़ा", dicOffice: "DIC, Belilious Road, Howrah", contact: "033-26431234 / dichowrah@wb.gov.in", leadBank: "UCO Bank" },
      { name: "North 24 Parganas (Barasat)", nameHi: "उत्तर 24 परगना", dicOffice: "DIC, Barasat, North 24 Parganas", contact: "033-25841234 / dicbarasat@wb.gov.in", leadBank: "Punjab National Bank" },
      { name: "South 24 Parganas (Alipore)", nameHi: "दक्षिण 24 परगना", dicOffice: "DIC, Alipore, Kolkata", contact: "033-24791234 / dicalipore@wb.gov.in", leadBank: "State Bank of India" },
      { name: "Darjeeling (Siliguri)", nameHi: "दार्जिलिंग (सिलीगुड़ी)", dicOffice: "DIC, Sevoke Road, Siliguri", contact: "0353-2541234 / dicsiliguri@wb.gov.in", leadBank: "Central Bank of India" }
    ]
  },
  {
    state: "Andhra Pradesh",
    stateHi: "आंध्र प्रदेश",
    scaName: "Andhra Pradesh Scheduled Castes Co-operative Finance Corp (APSCCFC)",
    scaAddress: "Vemuri Vari Veedhi, Benz Circle, Vijayawada - 520010",
    helpline: "0866-2495123 / 1902",
    districts: [
      { name: "Visakhapatnam", nameHi: "विशाखापत्तनम", dicOffice: "DIC, Industrial Estate, Visakhapatnam", contact: "0891-2551234 / dicvizag@ap.gov.in", leadBank: "State Bank of India" },
      { name: "Vijayawada (NTR)", nameHi: "विजयवाड़ा (एनटीआर)", dicOffice: "DIC, Autonagar, Vijayawada", contact: "0866-2541234 / dicvja@ap.gov.in", leadBank: "Union Bank of India" },
      { name: "Guntur", nameHi: "गुंटूर", dicOffice: "DIC, Collectorate Compound, Guntur", contact: "0863-2231234 / dicguntur@ap.gov.in", leadBank: "Union Bank of India" },
      { name: "Tirupati", nameHi: "तिरुपति", dicOffice: "DIC, Renigunta Road, Tirupati", contact: "0877-2281234 / dictirupati@ap.gov.in", leadBank: "Union Bank of India" }
    ]
  },
  {
    state: "Telangana",
    stateHi: "तेलंगाना",
    scaName: "Telangana Scheduled Castes Co-operative Development Corporation (TSCCDC)",
    scaAddress: "DSS Bhavan, Masab Tank, Hyderabad - 500028",
    helpline: "040-23391234 / 1800-425-0000",
    districts: [
      { name: "Hyderabad", nameHi: "हैदराबाद", dicOffice: "DIC, Chirag Ali Lane, Abids, Hyderabad", contact: "040-23201234 / dichyd@telangana.gov.in", leadBank: "State Bank of India" },
      { name: "Warangal", nameHi: "वारंगल", dicOffice: "DIC, Subedari, Hanamkonda", contact: "0870-2571234 / dicwgl@telangana.gov.in", leadBank: "State Bank of India" },
      { name: "Karimnagar", nameHi: "करीमनगर", dicOffice: "DIC, Collectorate Complex, Karimnagar", contact: "0878-2241234 / dickmr@telangana.gov.in", leadBank: "Union Bank of India" },
      { name: "Nizamabad", nameHi: "निजामाबाद", dicOffice: "DIC, Pragathi Bhavan, Nizamabad", contact: "08462-234123 / dicnzb@telangana.gov.in", leadBank: "State Bank of India" }
    ]
  },
  {
    state: "Delhi (NCT)",
    stateHi: "दिल्ली",
    scaName: "Delhi SC/ST/OBC/Minorities Development Corporation (DSFDC)",
    scaAddress: "Ambedkar Bhawan, Sector-16, Rohini, New Delhi - 110085",
    helpline: "011-27881234 / 1076",
    districts: [
      { name: "Central Delhi", nameHi: "मध्य दिल्ली", dicOffice: "DIC, Pusa Industrial Area, New Delhi", contact: "011-25841234 / dicpusa@delhi.gov.in", leadBank: "State Bank of India" },
      { name: "North Delhi", nameHi: "उत्तरी दिल्ली", dicOffice: "DIC, Lawrence Road Industrial Area, Delhi", contact: "011-27181234 / dicnorth@delhi.gov.in", leadBank: "Punjab National Bank" },
      { name: "South Delhi", nameHi: "दक्षिणी दिल्ली", dicOffice: "DIC, Okhla Industrial Area Phase-II, New Delhi", contact: "011-26381234 / dicokhla@delhi.gov.in", leadBank: "State Bank of India" },
      { name: "East Delhi", nameHi: "पूर्वी दिल्ली", dicOffice: "DIC, Patparganj Industrial Area, Delhi", contact: "011-22151234 / diceast@delhi.gov.in", leadBank: "Punjab National Bank" }
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

  // Fallback to first district of the state if specific district isn't matched
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
    districts: s.districts.map(d => ({ name: d.name, nameHi: d.nameHi }))
  }));
};
