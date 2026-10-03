import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'math-basic',
    name: { en: 'Math & Basic', bn: 'গণিত ও সাধারণ' },
    description: {
      en: 'Everyday mathematical, scientific, and algebraic calculations',
      bn: 'দৈনন্দিন গাণিতিক, বৈজ্ঞানিক ও বীজগণিতীয় হিসাব'
    },
    icon: 'Calculator',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'finance-money',
    name: { en: 'Finance & Money', bn: 'অর্থ ও বিনিয়োগ' },
    description: {
      en: 'Loans, EMI, interest, savings, investment, and salaries',
      bn: 'ঋণ, ইএমআই, সুদ, সঞ্চয়, বিনিয়োগ ও বেতন হিসাব'
    },
    icon: 'Coins',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'currency-exchange',
    name: { en: 'Currency & Exchange', bn: 'মুদ্রা ও বিনিময়' },
    description: {
      en: 'Live foreign currency and digital asset converter with BDT, USD, etc.',
      bn: 'লাইভ বৈদেশিক মুদ্রা ও ডিজিটাল কারেন্সি রূপান্তরক (টাকা, ডলার ইত্যাদি)'
    },
    icon: 'ArrowLeftRight',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'shopping-discount',
    name: { en: 'Shopping & Discount', bn: 'কেনাকাটা ও ছাড়' },
    description: {
      en: 'Calculate discounts, sales tax, unit prices, and bill splits',
      bn: 'মূল্যছাড়, বিক্রয়মূল্য, ইউনিট মূল্য এবং বিল ভাগাভাগি'
    },
    icon: 'ShoppingBag',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'date-age-time',
    name: { en: 'Date, Age & Time', bn: 'তারিখ, বয়স ও সময়' },
    description: {
      en: 'Exact age, date difference, countdowns, and working days',
      bn: 'সঠিক বয়স, জন্মতারিখ, দুই তারিখের ব্যবধান ও কার্যদিবস'
    },
    icon: 'Calendar',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'unit-converter',
    name: { en: 'Unit Converter', bn: 'একক রূপান্তরক' },
    description: {
      en: 'Convert length, weight, area, volume, temperature, and speed',
      bn: 'দৈর্ঘ্য, ওজন, ক্ষেত্রফল, আয়তন, তাপমাত্রা এবং গতির রূপান্তর'
    },
    icon: 'Scale',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'land-property',
    name: { en: 'Land & Property', bn: 'জমি ও সম্পত্তি' },
    description: {
      en: 'Land area, Decimal, Shotok, Katha, Bigha, Acre, and share distribution',
      bn: 'জমির মাপ, শতক/ডেসিমেল, কাঠা, বিঘা, একর ও ওয়ারিশ বণ্টন'
    },
    icon: 'MapPin',
    color: 'from-green-600 to-emerald-700',
  },
  {
    id: 'health-fitness',
    name: { en: 'Health & Fitness', bn: 'স্বাস্থ্য ও ফিটনেস' },
    description: {
      en: 'BMI, BMR, daily calories, body fat, water intake, and heart rate',
      bn: 'বিএমআই (BMI), বিএমআর, ক্যালোরি, চর্বি, পানি ও হৃদস্পন্দন'
    },
    icon: 'HeartPulse',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'education-student',
    name: { en: 'Education & Student', bn: 'শিক্ষা ও শিক্ষার্থী' },
    description: {
      en: 'Marks percentage, GPA, CGPA, grades, and attendance calculator',
      bn: 'নম্বর শতকরা, জিপিএ (GPA), সিজিপিএ (CGPA) ও উপস্থিতি হিসাব'
    },
    icon: 'GraduationCap',
    color: 'from-blue-600 to-sky-600',
  },
  {
    id: 'vehicle-travel',
    name: { en: 'Vehicle & Travel', bn: 'যানবাহন ও ভ্রমণ' },
    description: {
      en: 'Fuel cost, vehicle mileage, travel time, and car/bike loans',
      bn: 'জ্বালানি খরচ, মাইলেজ, ভ্রমণের সময় ও গাড়ির ঋণ'
    },
    icon: 'Car',
    color: 'from-indigo-600 to-blue-700',
  },
  {
    id: 'home-household',
    name: { en: 'Home & Household', bn: 'বাড়ি ও গৃহস্থালি' },
    description: {
      en: 'Electricity bill, room area, paint, tiles, and household budgets',
      bn: 'বিদ্যুৎ বিল, ঘরের ক্ষেত্রফল, রঙ, টাইলস ও গৃহস্থালি বাজেট'
    },
    icon: 'Home',
    color: 'from-teal-600 to-cyan-700',
  },
  {
    id: 'construction',
    name: { en: 'Construction', bn: 'নির্মাণ প্রকৌশল' },
    description: {
      en: 'Concrete mix, cement, sand, bricks, rebar steel weight, and costs',
      bn: 'কংক্রিট, সিমেন্ট, বালি, ইট, রডের ওজন ও নির্মাণ ব্যয়'
    },
    icon: 'HardHat',
    color: 'from-yellow-600 to-amber-700',
  },
  {
    id: 'electricity-energy',
    name: { en: 'Electricity & Energy', bn: 'বিদ্যুৎ ও শক্তি' },
    description: {
      en: "Watts, Volts, Amps, Ohm's law, energy consumption, and battery backup",
      bn: 'ওয়াট, ভোল্ট, ওহম সূত্র, বিদ্যুৎ খরচ ও ব্যাটারি ব্যাকআপ সময়'
    },
    icon: 'Zap',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'solar-battery',
    name: { en: 'Solar & Battery', bn: 'সৌর ও ব্যাটারি' },
    description: {
      en: 'Solar panel sizing, battery bank, inverter, and solar energy generation',
      bn: 'সোলার প্যানেল সাইজ, ব্যাটারি ব্যাংক, আইপিএস/ইনভার্টার ও সৌর বিদ্যুৎ'
    },
    icon: 'Sun',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'business',
    name: { en: 'Business', bn: 'ব্যবসা ও বাণিজ্য' },
    description: {
      en: 'Profit margin, markup, break-even point, revenue, and ROI',
      bn: 'লাভের মার্জিন, মার্কআপ, ব্রেক-ইভেন পয়েন্ট, রাজস্ব ও আরওআই'
    },
    icon: 'Briefcase',
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'computer-digital',
    name: { en: 'Computer & Digital', bn: 'কম্পিউটার ও ডিজিটাল' },
    description: {
      en: 'Download/upload time, data storage conversion, and aspect ratio',
      bn: 'ডাউনলোড/আপলোড সময়, ডাটা স্টোরেজ রূপান্তর ও ডিসপ্লে অ্যাসপেক্ট রেশিও'
    },
    icon: 'Monitor',
    color: 'from-purple-600 to-indigo-700',
  },
  {
    id: 'food-cooking',
    name: { en: 'Food & Cooking', bn: 'খাবার ও রান্না' },
    description: {
      en: 'Recipe scaling, serving size adjustments, and kitchen measurement units',
      bn: 'রেসিপি গুণক, পরিবেশন পরিমাপ এবং রান্নাঘরের একক রূপান্তর'
    },
    icon: 'UtensilsCrossed',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'science-engineering',
    name: { en: 'Science & Engineering', bn: 'বিজ্ঞান ও প্রকৌশল' },
    description: {
      en: 'Velocity, acceleration, force, work, energy, density, and molarity',
      bn: 'বেগ, ত্বরণ, বল, কাজ, শক্তি, ঘনত্ব, চাপ এবং মোলারিটি'
    },
    icon: 'Atom',
    color: 'from-cyan-600 to-teal-700',
  },
  {
    id: 'text-number',
    name: { en: 'Text & Number', bn: 'টেক্সট ও সংখ্যা' },
    description: {
      en: 'Letter to number, number to letter, and text conversion tools',
      bn: 'অক্ষর থেকে সংখ্যা, সংখ্যা থেকে অক্ষর এবং টেক্সট রূপান্তর'
    },
    icon: 'Type',
    color: 'from-violet-600 to-indigo-700',
  },
];
