import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    // Brand & Header
    siteTitle: 'All Calculator',
    tagline: 'All the Calculators You Need in One Place',
    heroDescription:
      'Hundreds of accurate, practical calculators for everyday life, finance, land measurement, currency, health, and engineering. Completely free with no registration required.',
    searchPlaceholder: 'Search calculators (e.g., Age, EMI, Land, BMI, USDT, Percentage)...',
    noResults: 'No calculators found matching your search.',
    tryDifferentSearch: 'Try searching with different terms like "loan", "land", "age", or "currency".',
    
    // Nav
    navHome: 'Home',
    navCategories: 'Categories',
    navPopular: 'Popular',
    navFavorites: 'Favorites',
    navHowToUse: 'How to Use',
    navAbout: 'About',
    navContact: 'Contact',

    // Sections
    secPopular: 'Popular Calculators',
    secPopularSubtitle: 'Most frequently used tools for daily calculations and decisions',
    secCategories: 'Explore by Category',
    secCategoriesSubtitle: 'Browse our complete collection organized across 18 practical categories',
    secRecentlyUsed: 'Recently Used',
    secFavorites: 'Your Favorite Calculators',
    secNoFavorites: 'You have not added any favorite calculators yet. Click the star icon on any calculator to pin it here!',
    secAllCalculators: 'All Calculators',
    
    // Actions & Buttons
    calculate: 'Calculate',
    calculating: 'Calculating...',
    reset: 'Reset',
    copyResult: 'Copy Result',
    copied: 'Copied to clipboard!',
    share: 'Share Calculator',
    shared: 'Link copied or shared!',
    openCalculator: 'Open Calculator',
    viewAll: 'View All',
    backToHome: 'Back to Home',
    backToCategory: 'Back to Category',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    swapCurrencies: 'Swap Currencies',

    // UI Badges & Headings
    popularBadge: 'Popular',
    resultsHeading: 'Calculation Results',
    breakdownHeading: 'Detailed Breakdown',
    formulaHeading: 'Formula & Method',
    howToUseHeading: 'How to Use This Calculator',
    notesHeading: 'Important Notes & Assumptions',
    disclaimerHeading: 'Disclaimer',
    advertisement: 'Advertisement',

    // General Validation & Status
    errorPrefix: 'Error',
    invalidInput: 'Please enter valid numerical values.',
    emptyInput: 'Please fill in all required fields.',
    positiveValueRequired: 'Please enter a positive value greater than zero.',
    divisionByZero: 'Cannot divide by zero.',
    genericError: 'Something went wrong. Please check your inputs and try again.',

    // Currency specifics
    liveExchangeRate: 'Exchange rates are approximate and updated regularly.',
    rateSourceNote: 'Rates powered by live market feeds. For critical transactions, verify with your authorized financial provider.',
    lastUpdated: 'Last Updated',
    refreshRates: 'Refresh Live Rates',
    fetchingRates: 'Fetching latest exchange rates...',
    rateFetchError: 'Unable to reach the live currency feed at this moment. You can still enter a custom rate manually.',

    // Land specifics
    landNoteBD: 'Note: Land measurements such as Katha and Bigha may exhibit slight regional variations across Bangladesh districts. The standard government-standard conversions (1 Shotok/Decimal = 435.6 sq ft; 1 Standard Katha = 720 sq ft = 1.65 Decimal) are used here.',

    // Health specifics
    healthDisclaimer: 'These health calculations are statistical estimates and do not substitute for professional medical advice, diagnosis, or treatment.',

    // Engineering & Construction specifics
    constructionDisclaimer: 'These calculations provide material estimates based on standard field conventions. They do not substitute for structural engineering drawings and certified site testing.',

    // Footer
    footerDesc: 'All Calculator is a comprehensive, free, and accessible calculation portal built to simplify complex math, finance, land, and daily calculations.',
    developedBy: 'Developed by',
    developerName: 'MRS Engineers BD',
    contactEmail: 'mrs.engineers.bd26@gmail.com',
    quickLinks: 'Quick Links',
    legal: 'Legal & Info',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms & Conditions',
    disclaimer: 'Disclaimer',
    copyright: 'All rights reserved.',
    freeServiceNotice: '100% Free • No Sign-up Required • Instant Calculations',
  },

  bn: {
    // Brand & Header
    siteTitle: 'অল ক্যালকুলেটর',
    tagline: 'আপনার প্রয়োজনীয় সব ক্যালকুলেটর এক জায়গায়',
    heroDescription:
      'দৈনন্দিন জীবন, অর্থ, জমি পরিমাপ, মুদ্রা, স্বাস্থ্য এবং প্রকৌশলের শত শত সঠিক ও ব্যবহারিক ক্যালকুলেটর। কোনো অ্যাকাউন্ট বা রেজিস্ট্রেশন ছাড়াই সম্পূর্ণ বিনামূল্যে ব্যবহার করুন।',
    searchPlaceholder: 'ক্যালকুলেটর খুঁজুন (যেমন: বয়স, জমি, ইএমআই, শতকরা, ডলার, বিএমআই)...',
    noResults: 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ক্যালকুলেটর পাওয়া যায়নি।',
    tryDifferentSearch: 'অন্য কোনো শব্দ যেমন "জমি", "বয়স", "লোন", বা "মুদ্রা" লিখে অনুসন্ধান করুন।',
    
    // Nav
    navHome: 'হোম',
    navCategories: 'ক্যাটাগরি',
    navPopular: 'জনপ্রিয়',
    navFavorites: 'পছন্দ তালিকা',
    navHowToUse: 'ব্যবহার বিধি',
    navAbout: 'আমাদের সম্পর্কে',
    navContact: 'যোগাযোগ',

    // Sections
    secPopular: 'জনপ্রিয় ক্যালকুলেটরসমূহ',
    secPopularSubtitle: 'দৈনন্দিন সবচেয়ে বেশি ব্যবহৃত গুরুত্বপূর্ণ ক্যালকুলেটরগুলো এক নজরে',
    secCategories: 'বিষয়ভিত্তিক ক্যাটাগরি',
    secCategoriesSubtitle: '১৮টি প্রধান ক্যাটাগরিতে সাজানো আমাদের সকল ক্যালকুলেটরের সংগ্রহ',
    secRecentlyUsed: 'সম্প্রতি ব্যবহৃত',
    secFavorites: 'আপনার প্রিয় ক্যালকুলেটর',
    secNoFavorites: 'আপনি এখনও কোনো ক্যালকুলেটর পছন্দ তালিকায় যুক্ত করেননি। যেকোনো ক্যালকুলেটরের তারা (★) আইকনে ক্লিক করে সংরক্ষণ করুন!',
    secAllCalculators: 'সকল ক্যালকুলেটর',

    // Actions & Buttons
    calculate: 'হিসাব করুন',
    calculating: 'হিসাব করা হচ্ছে...',
    reset: 'রিসেট',
    copyResult: 'ফলাফল কপি করুন',
    copied: 'ফলাফল কপি করা হয়েছে!',
    share: 'শেয়ার করুন',
    shared: 'লিংক কপি বা শেয়ার সম্পন্ন!',
    openCalculator: 'ক্যালকুলেটর খুলুন',
    viewAll: 'সবগুলো দেখুন',
    backToHome: 'হোমে ফিরে যান',
    backToCategory: 'ক্যাটাগরিতে ফিরে যান',
    addToFavorites: 'পছন্দ তালিকায় যুক্ত করুন',
    removeFromFavorites: 'পছন্দ তালিকা থেকে সরান',
    swapCurrencies: 'মুদ্রা অদলবদল',

    // UI Badges & Headings
    popularBadge: 'জনপ্রিয়',
    resultsHeading: 'হিসাবের ফলাফল',
    breakdownHeading: 'বিস্তারিত বিবরণ',
    formulaHeading: 'সূত্র ও নিয়ম',
    howToUseHeading: 'কীভাবে ব্যবহার করবেন',
    notesHeading: 'গুরুত্বপূর্ণ তথ্য ও শর্ত',
    disclaimerHeading: 'সতর্কবার্তা ও দায়মুক্তি',
    advertisement: 'বিজ্ঞাপন',

    // General Validation & Status
    errorPrefix: 'ত্রুটি',
    invalidInput: 'অনুগ্রহ করে সঠিক সংখ্যাসূচক মান প্রদান করুন।',
    emptyInput: 'সকল প্রয়োজনীয় ঘর পূরণ করুন।',
    positiveValueRequired: 'শূন্যের চেয়ে বেশি ধনাত্মক সংখ্যা প্রদান করুন।',
    divisionByZero: 'শূন্য দ্বারা ভাগ করা সম্ভব নয়।',
    genericError: 'কিছু সমস্যা হয়েছে। অনুগ্রহ করে তথ্যগুলো যাচাই করে আবার চেষ্টা করুন।',

    // Currency specifics
    liveExchangeRate: 'মুদ্রা বিনিময় হার আনুমানিক এবং নিয়মিত পরিবর্তনশীল।',
    rateSourceNote: 'আন্তর্জাতিক বাজার থেকে রেট সংগ্রহ করা হয়। বাস্তব লেনদেনের পূর্বে অনুমোদিত ব্যাংক বা মানি এক্সচেঞ্জে যাচাই করুন।',
    lastUpdated: 'সর্বশেষ আপডেট',
    refreshRates: 'নতুন রেট রিফ্রেশ করুন',
    fetchingRates: 'মুদ্রার সর্বশেষ রেট আনা হচ্ছে...',
    rateFetchError: 'এই মুহূর্তে লাইভ রেট সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আপনি চাইলে নিজে রেট বসিয়ে রূপান্তর করতে পারেন।',

    // Land specifics
    landNoteBD: 'বিশেষ দ্রষ্টব্য: বাংলাদেশে অঞ্চলভেদে কাঠা ও বিঘার মাপে কিছুটা ভিন্নতা থাকতে পারে। এখানে সরকারি স্ট্যান্ডার্ড মান (১ শতাংশ/ডেসিমেল = ৪৩৫.৬ বর্গফুট; ১ আদর্শ কাঠা = ৭২০ বর্গফুট = ১.৬৫ শতাংশ) ব্যবহার করা হয়েছে।',

    // Health specifics
    healthDisclaimer: 'এই স্বাস্থ্য ক্যালকুলেটরের ফলাফল পরিসংখ্যানভিত্তিক আনুমানিক তথ্য এবং চিকিৎসকের সরাসরি পরামর্শের বিকল্প নয়।',

    // Engineering & Construction specifics
    constructionDisclaimer: 'নির্মাণ মালামালের এই হিসাব প্রচলিত প্র্যাকটিক্যাল নিয়মের উপর ভিত্তি করে তৈরি। এটি কোনো সার্টিফাইড কাঠামোগত প্রকৌশল ড্রয়িং বা ডিজাইনের বিকল্প নয়।',

    // Footer
    footerDesc: 'অল ক্যালকুলেটর একটি সম্পূর্ণ বিনামূল্যের সর্বজনীন ক্যালকুলেশন প্ল্যাটফর্ম, যা আপনার দৈনন্দিন ও পেশাগত হিসাবকে করে তোলে সহজ ও দ্রুত।',
    developedBy: 'প্রস্তুতকারক',
    developerName: 'এমআরএস ইঞ্জিনিয়ার্স বিডি (MRS Engineers BD)',
    contactEmail: 'mrs.engineers.bd26@gmail.com',
    quickLinks: 'প্রয়োজনীয় লিংক',
    legal: 'আইনি ও নীতিমালা',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'শর্তাবলী ও নিয়ম',
    disclaimer: 'দায়মুক্তি (Disclaimer)',
    copyright: 'সর্বস্বত্ব সংরক্ষিত।',
    freeServiceNotice: '১০০% ফ্রি • কোনো রেজিস্ট্রেশন বা অ্যাকাউন্ট প্রয়োজন নেই',
  }
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang];
