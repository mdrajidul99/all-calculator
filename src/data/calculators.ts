import { CalculatorMeta } from '../types';

export const CALCULATORS: CalculatorMeta[] = [
  // Math & Basic
  {
    id: 'basic-calculator',
    categoryId: 'math-basic',
    name: { en: 'Basic & Scientific Calculator', bn: 'সাধারণ ও বৈজ্ঞানিক ক্যালকুলেটর' },
    description: {
      en: 'Perform fundamental arithmetic, powers, roots, and trigonometric calculations with memory keys',
      bn: 'মৌলিক পাটিগণিত, বর্গমূল, ঘাত ও ত্রিকোণমিতিক হিসাব করুন'
    },
    keywords: ['basic', 'scientific', 'math', 'calculator', 'arithmetic', 'trig', 'sin', 'cos', 'tan', 'গণিত', 'সাধারণ', 'ক্যালকুলেটর'],
    isPopular: true,
  },
  {
    id: 'percentage-calculator',
    categoryId: 'math-basic',
    name: { en: 'Percentage Calculator', bn: 'শতকরা ক্যালকুলেটর' },
    description: {
      en: 'Find percentages, what percent X is of Y, and value of percentage easily',
      bn: 'শতকরা হার, কত শতাংশ এবং যে কোনো মানের শতকরা নির্ণয় করুন'
    },
    keywords: ['percentage', 'percent', 'percent of', 'pct', 'শতকরা', 'শতাংশ', 'পারসেন্ট'],
    isPopular: true,
  },
  {
    id: 'percentage-change',
    categoryId: 'math-basic',
    name: { en: 'Percentage Increase / Decrease', bn: 'শতকরা বৃদ্ধি ও হ্রাস' },
    description: {
      en: 'Calculate percentage difference, increase, or decrease between two values',
      bn: 'দুটি মানের মধ্যে শতকরা বৃদ্ধি বা হ্রাসের হার হিসাব করুন'
    },
    keywords: ['increase', 'decrease', 'growth', 'percentage change', 'শতকরা বৃদ্ধি', 'শতকরা হ্রাস'],
  },
  {
    id: 'fraction-calculator',
    categoryId: 'math-basic',
    name: { en: 'Fraction Calculator', bn: 'ভগ্নাংশ ক্যালকুলেটর' },
    description: {
      en: 'Add, subtract, multiply, and divide fractions with mixed numbers and simplification',
      bn: 'ভগ্নাংশের যোগ, বিয়োগ, গুণ, ভাগ ও লঘুকরণ করুন'
    },
    keywords: ['fraction', 'numerator', 'denominator', 'mixed fraction', 'ভগ্নাংশ'],
  },
  {
    id: 'ratio-proportion',
    categoryId: 'math-basic',
    name: { en: 'Ratio & Proportion Calculator', bn: 'অনুপাত ও সমানুপাত ক্যালকুলেটর' },
    description: {
      en: 'Simplify ratios (A:B) and solve proportional missing values (A:B = C:D)',
      bn: 'অনুপাত সরলীকরণ এবং সমানুপাত সমাধান করুন'
    },
    keywords: ['ratio', 'proportion', 'scale', 'A:B', 'অনুপাত', 'সমানুপাত'],
  },
  {
    id: 'average-calculator',
    categoryId: 'math-basic',
    name: { en: 'Average, Mean, Median & Mode', bn: 'গড়, মধ্যক ও প্রচুরক' },
    description: {
      en: 'Find mean (average), median, mode, range, and sum of any comma-separated numbers',
      bn: 'যেকোনো সংখ্যাক্রমের গড়, মধ্যক, প্রচুরক ও বিস্তার নির্ণয় করুন'
    },
    keywords: ['average', 'mean', 'median', 'mode', 'stats', 'গড়', 'মধ্যক', 'প্রচুরক'],
  },
  {
    id: 'roots-exponents',
    categoryId: 'math-basic',
    name: { en: 'Square Root & Exponent Calculator', bn: 'বর্গমূল ও ঘাত ক্যালকুলেটর' },
    description: {
      en: 'Calculate square root, cube root, nth root, and powers/exponents',
      bn: 'বর্গমূল, ঘনমূল এবং যেকোনো ঘাত বা পাওয়ার নির্ণয় করুন'
    },
    keywords: ['square root', 'cube root', 'power', 'exponent', 'বর্গমূল', 'ঘনমূল', 'পাওয়ার'],
  },
  {
    id: 'gcd-lcm-factorial',
    categoryId: 'math-basic',
    name: { en: 'GCD, LCM & Factorial', bn: 'গ.সা.গু, ল.সা.গু ও ফ্যাক্টোরিয়াল' },
    description: {
      en: 'Find greatest common divisor (GCD/HCF), least common multiple (LCM), and factorial (n!)',
      bn: 'গরিষ্ঠ সাধারণ গুণনীয়ক, লঘিষ্ট সাধারণ গুণিতক ও ফ্যাক্টোরিয়াল'
    },
    keywords: ['gcd', 'lcm', 'hcf', 'factorial', 'গসাগু', 'লসাগু', 'ফ্যাক্টোরিয়াল'],
  },
  {
    id: 'standard-deviation',
    categoryId: 'math-basic',
    name: { en: 'Standard Deviation & Variance', bn: 'পরিমিত ব্যবধান ও ভেদাঙ্ক' },
    description: {
      en: 'Calculate sample and population standard deviation, variance, and mean',
      bn: 'নমুনা ও সমগ্রকের পরিমিত ব্যবধান ও ভেদাঙ্ক নির্ণয় করুন'
    },
    keywords: ['standard deviation', 'variance', 'statistics', 'পরিমিত ব্যবধান', 'ভেদাঙ্ক'],
  },
  {
    id: 'permutation-combination',
    categoryId: 'math-basic',
    name: { en: 'Permutation & Combination (nPr / nCr)', bn: 'বিন্যাস ও সমাবেশ ক্যালকুলেটর' },
    description: {
      en: 'Calculate permutations nPr and combinations nCr for probability and combinatorics',
      bn: 'সম্ভাব্যতা ও গণনায় বিন্যাস nPr এবং সমাবেশ nCr হিসাব করুন'
    },
    keywords: ['permutation', 'combination', 'nPr', 'nCr', 'বিন্যাস', 'সমাবেশ'],
  },
  {
    id: 'quadratic-equation',
    categoryId: 'math-basic',
    name: { en: 'Quadratic Equation Solver', bn: 'দ্বিঘাত সমীকরণ সমাধান' },
    description: {
      en: 'Solve ax² + bx + c = 0 with real and complex roots and discriminant steps',
      bn: 'দ্বিঘাত সমীকরণ ax² + bx + c = 0 এর মূল বা বীজ নির্ণয় করুন'
    },
    keywords: ['quadratic', 'roots', 'equation', 'algebra', 'দ্বিঘাত সমীকরণ'],
  },

  // Finance & Money
  {
    id: 'emi-calculator',
    categoryId: 'finance-money',
    name: { en: 'EMI Calculator', bn: 'ইএমআই (EMI) ক্যালকুলেটর' },
    description: {
      en: 'Calculate monthly installment (EMI), total interest, and total payment for loans',
      bn: 'যেকোনো ব্যাংক বা আর্থিক ঋণের মাসিক কিস্তি ও মোট সুদের পরিমাণ হিসাব করুন'
    },
    keywords: ['emi', 'installment', 'loan emi', 'monthly payment', 'ইএমআই', 'কিস্তি'],
    isPopular: true,
  },
  {
    id: 'loan-calculator',
    categoryId: 'finance-money',
    name: { en: 'Loan Calculator', bn: 'ঋণ (Loan) ক্যালকুলেটর' },
    description: {
      en: 'Analyze personal, business, or home loans with payoff schedules and breakdown',
      bn: 'ব্যক্তিগত, গৃহ বা ব্যবসায়িক ঋণের বিস্তারিত হিসাব ও পরিশোধ তালিকা'
    },
    keywords: ['loan', 'interest', 'borrowing', 'ঋণ', 'লোন', 'সুদ'],
    isPopular: true,
  },
  {
    id: 'simple-compound-interest',
    categoryId: 'finance-money',
    name: { en: 'Simple & Compound Interest', bn: 'সরল ও চক্রবৃদ্ধি সুদ' },
    description: {
      en: 'Compare simple vs compound interest with compounding frequency (monthly, yearly)',
      bn: 'সরল সুদ ও বিভিন্ন মেয়াদের চক্রবৃদ্ধি সুদের তুলনা করুন'
    },
    keywords: ['interest', 'compound interest', 'simple interest', 'সরল সুদ', 'চক্রবৃদ্ধি সুদ'],
  },
  {
    id: 'investment-sip',
    categoryId: 'finance-money',
    name: { en: 'Investment & SIP Calculator', bn: 'বিনিয়োগ ও এসআইপি ক্যালকুলেটর' },
    description: {
      en: 'Estimate future wealth for monthly recurring investments (SIP) or lump-sum deposits',
      bn: 'মাসিক সঞ্চয় (SIP) বা এককালীন বিনিয়োগের ভবিষ্যৎ মুনাফা হিসাব করুন'
    },
    keywords: ['sip', 'investment', 'mutual fund', 'savings', 'বিনিয়োগ', 'সঞ্চয়', 'মুনাফা'],
  },
  {
    id: 'savings-goal',
    categoryId: 'finance-money',
    name: { en: 'Savings Goal Calculator', bn: 'সঞ্চয় লক্ষ্যমাত্রা ক্যালকুলেটর' },
    description: {
      en: 'Find how much you need to save each month to reach your target savings goal',
      bn: 'নির্দিষ্ট সময়ের মধ্যে নির্ধারিত লক্ষ্য অর্জনে মাসে কত সঞ্চয় করতে হবে'
    },
    keywords: ['savings goal', 'target savings', 'wealth', 'সঞ্চয় লক্ষ্য', 'জমানো'],
  },
  {
    id: 'profit-loss',
    categoryId: 'finance-money',
    name: { en: 'Profit & Loss Calculator', bn: 'লাভ ও ক্ষতি ক্যালকুলেটর' },
    description: {
      en: 'Calculate profit amount, loss amount, profit percentage, and margin from cost and selling price',
      bn: 'ক্রয়মূল্য ও বিক্রয়মূল্য থেকে নিট লাভ, ক্ষতি ও শতকরা হার নির্ণয় করুন'
    },
    keywords: ['profit', 'loss', 'cost price', 'selling price', 'লাভ', 'ক্ষতি', 'মুনাফা'],
    isPopular: true,
  },
  {
    id: 'salary-calculator',
    categoryId: 'finance-money',
    name: { en: 'Salary & Wage Calculator', bn: 'বেতন ও মজুরি ক্যালকুলেটর' },
    description: {
      en: 'Convert annual, monthly, weekly, and hourly wages with deductions and net pay',
      bn: 'মাসিক, দৈনিক ও বাৎসরিক বেতন বা ঘণ্টার মজুরি রূপান্তর করুন'
    },
    keywords: ['salary', 'wage', 'paycheck', 'hourly', 'বেতন', 'মজুরি'],
    isPopular: true,
  },
  {
    id: 'debt-payoff',
    categoryId: 'finance-money',
    name: { en: 'Debt Payoff Calculator', bn: 'ঋণ মুক্তি ক্যালকুলেটর' },
    description: {
      en: 'Find how many months it will take to become debt-free with monthly payments',
      bn: 'নির্দিষ্ট মাসিক কিস্তিতে কত দ্রুত সম্পূর্ণ ঋণমুক্ত হওয়া যাবে'
    },
    keywords: ['debt', 'credit card', 'payoff', 'ঋণ মুক্তি', 'দেনা পরিশোধ'],
  },
  {
    id: 'tip-bill-split',
    categoryId: 'finance-money',
    name: { en: 'Tip & Bill Split Calculator', bn: 'টিপ ও বিল ভাগাভাগি' },
    description: {
      en: 'Calculate restaurant tip percentage and split bills equally among friends or diners',
      bn: 'রেস্তোরাঁর খাবারের বিল বন্ধুদের মধ্যে সমানভাবে ভাগ করুন'
    },
    keywords: ['tip', 'split bill', 'restaurant', 'dining', 'টিপ', 'বিল স্প্লিট'],
  },

  // Currency & Exchange
  {
    id: 'currency-converter',
    categoryId: 'currency-exchange',
    name: { en: 'Universal Currency Converter', bn: 'আন্তর্জাতিক মুদ্রা রূপান্তরক' },
    description: {
      en: 'Live exchange rates for USD, BDT, EUR, GBP, INR, SAR, AED, CAD, AUD, and more',
      bn: 'বাংলাদেশি টাকা, ইউএস ডলার, ইউরো, পাউন্ড, রিয়াল ও অন্যান্য মুদ্রার লাইভ রূপান্তর'
    },
    keywords: ['currency', 'exchange rate', 'usd to bdt', 'bdt to usd', 'eur to bdt', 'টাকা', 'ডলার', 'মুদ্রা'],
    isPopular: true,
  },
  {
    id: 'usdt-to-bdt',
    categoryId: 'currency-exchange',
    name: { en: 'USDT to BDT / USD Converter', bn: 'USDT থেকে টাকা / ডলার রূপান্তরক' },
    description: {
      en: 'Convert Tether (USDT) to Bangladeshi Taka (BDT) and US Dollar with custom P2P rate support',
      bn: 'টিথার (USDT) থেকে বাংলাদেশি টাকা বা ডলারে রূপান্তর করুন'
    },
    keywords: ['usdt', 'tether', 'crypto', 'usdt to bdt', 'ইউএসডিটি', 'টাকা', 'পিটুপি'],
    isPopular: true,
  },

  // Shopping & Discount
  {
    id: 'discount-calculator',
    categoryId: 'shopping-discount',
    name: { en: 'Discount & Sale Price Calculator', bn: 'মূল্যছাড় ও সেল প্রাইস ক্যালকুলেটর' },
    description: {
      en: 'Calculate discounted price, total money saved, and optional sales tax',
      bn: 'মূল দাম ও ছাড়ের শতকরা হার থেকে ছাড়ের পরিমাণ এবং চূড়ান্ত মূল্য জানুন'
    },
    keywords: ['discount', 'sale', 'off', 'savings', 'ছাড়', 'ডিসকাউন্ট', 'সাশ্রয়'],
    isPopular: true,
  },
  {
    id: 'unit-price-comparison',
    categoryId: 'shopping-discount',
    name: { en: 'Unit Price Comparison Calculator', bn: 'একক মূল্য তুলনা ক্যালকুলেটর' },
    description: {
      en: 'Compare two packaging sizes/prices to find the best value for money',
      bn: 'কোন প্যাকেজটি কেনা সবচেয়ে লাভজনক তা সহজে তুলনা করুন'
    },
    keywords: ['unit price', 'comparison', 'grocery', 'best deal', 'মূল্য তুলনা'],
  },

  // Date, Age & Time
  {
    id: 'age-calculator',
    categoryId: 'date-age-time',
    name: { en: 'Age Calculator', bn: 'বয়স ক্যালকুলেটর' },
    description: {
      en: 'Calculate exact age in years, months, and days, total days lived, and next birthday countdown',
      bn: 'জন্মতারিখ থেকে বছর, মাস, দিন সহ নিখুঁত বয়স এবং পরবর্তী জন্মদিনের দিন গণনা'
    },
    keywords: ['age', 'birthday', 'dob', 'how old', 'বয়স', 'জন্মতারিখ', 'দিন'],
    isPopular: true,
  },
  {
    id: 'date-difference',
    categoryId: 'date-age-time',
    name: { en: 'Date Difference Calculator', bn: 'দুই তারিখের ব্যবধান' },
    description: {
      en: 'Calculate exact days, weeks, months, and years between any two dates',
      bn: 'যেকোনো দুটি তারিখের মধ্যকার সঠিক দিন, সপ্তাহ ও মাসের পার্থক্য জানুন'
    },
    keywords: ['date difference', 'days between', 'calendar', 'তারিখের পার্থক্য', 'দিন গণনা'],
    isPopular: true,
  },
  {
    id: 'date-add-subtract',
    categoryId: 'date-age-time',
    name: { en: 'Date Add / Subtract Calculator', bn: 'তারিখ যোগ বা বিয়োগ' },
    description: {
      en: 'Add or subtract days, weeks, months, or years to/from any starting date',
      bn: 'যেকোনো তারিখের সাথে দিন বা মাস যোগ বা বিয়োগ করে নতুন তারিখ বের করুন'
    },
    keywords: ['add days', 'subtract days', 'future date', 'তারিখ যোগ'],
  },
  {
    id: 'working-days',
    categoryId: 'date-age-time',
    name: { en: 'Working & Business Days Calculator', bn: 'কার্যদিবস ক্যালকুলেটর' },
    description: {
      en: 'Calculate total working days between dates excluding Fridays/Saturdays or Sundays',
      bn: 'সাপ্তাহিক ছুটি বাদে মোট কর্মদিবসের সংখ্যা বের করুন'
    },
    keywords: ['working days', 'business days', 'office days', 'কার্যদিবস'],
  },

  // Unit Converter
  {
    id: 'unit-converter-all',
    categoryId: 'unit-converter',
    name: { en: 'Universal Unit Converter', bn: 'সার্বজনীন একক রূপান্তরক' },
    description: {
      en: 'Length, weight, area, volume, temperature, speed, pressure, energy, and data converter',
      bn: 'দৈর্ঘ্য, ওজন, ক্ষেত্রফল, আয়তন, তাপমাত্রা, গতি ও ডাটার সহজ রূপান্তর'
    },
    keywords: ['unit', 'converter', 'metric', 'feet to meter', 'kg to lbs', 'একক', 'রূপান্তর'],
    isPopular: true,
  },

  // Land & Property
  {
    id: 'land-area-calculator',
    categoryId: 'land-property',
    name: { en: 'Land Area & Measurement (জমির পরিমাপ)', bn: 'জমির ক্ষেত্রফল ও পরিমাপ ক্যালকুলেটর' },
    description: {
      en: 'Calculate land area in Decimal (শতক), Katha (কাঠা), Bigha (বিঘা), Acre (একর), and Sq Feet',
      bn: 'দৈর্ঘ্য ও প্রস্থ দিয়ে শতক/ডেসিমেল, কাঠা, বিঘা, একর ও বর্গফুটে জমির হিসাব'
    },
    keywords: ['land', 'shotok', 'decimal', 'katha', 'bigha', 'acre', 'sqft', 'জমি', 'শতক', 'কাঠা', 'বিঘা', 'একর'],
    isPopular: true,
  },
  {
    id: 'bangladesh-land-units',
    categoryId: 'land-property',
    name: { en: 'Bangladesh Land Unit Converter', bn: 'বাংলাদেশ ভূমি একক রূপান্তরক' },
    description: {
      en: 'Convert directly between Decimal, Katha, Bigha, Acre, Hectare, Kani, and Gonda',
      bn: 'শতক, কাঠা, বিঘা, একর, হেক্টর, কানি ও গণ্ডার পারস্পরিক রূপান্তর'
    },
    keywords: ['land converter', 'kani', 'gonda', 'bigha to katha', 'ভূমি রূপান্তর', 'কানি', 'গণ্ডা'],
  },
  {
    id: 'irregular-land-area',
    categoryId: 'land-property',
    name: { en: 'Irregular 4-Sided Land Area (অনিয়মিত চতুর্ভুজ জমি)', bn: 'অনিয়মিত চতুর্ভুজ জমির পরিমাপ' },
    description: {
      en: 'Calculate irregular four-sided land area using four side measurements and diagonal method',
      bn: 'চার বাহু ও কর্ণের মাপ দিয়ে অসমান বা বাঁকা জমির সঠিক পরিমাপ নির্ণয়'
    },
    keywords: ['irregular land', 'quadrilateral', 'diagonal', 'বাঁকা জমি', 'অনিয়মিত জমি'],
  },
  {
    id: 'triangle-land-area',
    categoryId: 'land-property',
    name: { en: "Triangle Land Area (Heron's Formula)", bn: 'ত্রিভুজাকার জমির পরিমাপ' },
    description: {
      en: 'Calculate 3-sided triangular land area accurately using side lengths (a, b, c)',
      bn: 'তিন কোণা বা ত্রিভুজাকার জমির তিন বাহুর মাপ দিয়ে সঠিক ক্ষেত্রফল'
    },
    keywords: ['triangle land', 'heron', 'তিন কোণা জমি', 'ত্রিভুজ জমি'],
  },
  {
    id: 'land-price-share',
    categoryId: 'land-property',
    name: { en: 'Land Price & Share Distribution', bn: 'জমির দাম ও ওয়ারিশ বণ্টন ক্যালকুলেটর' },
    description: {
      en: 'Calculate total land price and divide land shares accurately among multiple heirs or partners',
      bn: 'জমির মোট দাম নির্ধারণ এবং অংশীদার বা ওয়ারিশদের মাঝে জমি বণ্টন'
    },
    keywords: ['land price', 'land share', 'heir', 'distribution', 'জমির দাম', 'জমির অংশ', 'ওয়ারিশ'],
  },

  // Health & Fitness
  {
    id: 'bmi-calculator',
    categoryId: 'health-fitness',
    name: { en: 'BMI Calculator (Body Mass Index)', bn: 'বিএমআই (BMI) ক্যালকুলেটর' },
    description: {
      en: 'Calculate your Body Mass Index, WHO weight category, and healthy weight range',
      bn: 'উচ্চতা ও ওজন অনুযায়ী আপনার বডি মাস ইনডেক্স ও আদর্শ ওজন জানুন'
    },
    keywords: ['bmi', 'body mass index', 'weight', 'health', 'বিএমআই', 'আদর্শ ওজন'],
    isPopular: true,
  },
  {
    id: 'bmr-calorie-calculator',
    categoryId: 'health-fitness',
    name: { en: 'BMR & Daily Calorie Calculator', bn: 'বিএমআর ও দৈনিক ক্যালোরি চাহিদা' },
    description: {
      en: 'Calculate Basal Metabolic Rate (BMR) and daily calories needed for weight loss or maintenance',
      bn: 'আপনার শরীরের মৌলিক বিপাক হার এবং ওজন বজায় রাখা বা কমানোর ক্যালোরি'
    },
    keywords: ['bmr', 'calorie', 'tdee', 'metabolism', 'ক্যালোরি', 'বিএমআর'],
  },
  {
    id: 'water-ideal-weight',
    categoryId: 'health-fitness',
    name: { en: 'Water Intake & Ideal Body Weight', bn: 'দৈনিক পানির পরিমাণ ও আদর্শ ওজন' },
    description: {
      en: 'Find daily recommended water intake and ideal body weight based on height and gender',
      bn: 'প্রতিদিন কত লিটার পানি পান করা উচিত এবং উচ্চতা অনুযায়ী আদর্শ ওজন'
    },
    keywords: ['water intake', 'ideal weight', 'hydration', 'পানি', 'আদর্শ ওজন'],
  },
  {
    id: 'target-heart-rate',
    categoryId: 'health-fitness',
    name: { en: 'Target Heart Rate Zones', bn: 'টার্গেট হার্ট রেট ও হৃদস্পন্দন' },
    description: {
      en: 'Calculate maximum heart rate and exercise training zones (Fat Burn, Cardio, Peak)',
      bn: 'ব্যায়ামের সময় চর্বি ঝরানো ও কার্ডিও ট্রেনিংয়ের জন্য নিরাপদ হার্ট রেট'
    },
    keywords: ['heart rate', 'cardio', 'pulse', 'fat burn', 'হার্ট রেট', 'হৃদস্পন্দন'],
  },

  // Education & Student
  {
    id: 'gpa-calculator',
    categoryId: 'education-student',
    name: { en: 'GPA Calculator (4.0 & 5.0 Scale)', bn: 'জিপিএ (GPA) ক্যালকুলেটর' },
    description: {
      en: 'Calculate grade point average with multiple subjects, credit hours, and letter grades',
      bn: 'বিষয়, ক্রেডিট আওয়ার ও গ্রেড যোগ করে সেমিস্টার জিপিএ হিসাব করুন'
    },
    keywords: ['gpa', 'grade point', 'grades', 'student', 'জিপিএ', 'গ্রেড'],
    isPopular: true,
  },
  {
    id: 'cgpa-calculator',
    categoryId: 'education-student',
    name: { en: 'CGPA Calculator (Multi-Semester)', bn: 'সিজিপিএ (CGPA) ক্যালকুলেটর' },
    description: {
      en: 'Calculate Cumulative Grade Point Average across multiple semesters or terms',
      bn: 'সকল সেমিস্টারের জিপিএ ও ক্রেডিট একত্রিত করে সামগ্রিক সিজিপিএ বের করুন'
    },
    keywords: ['cgpa', 'cumulative gpa', 'university', 'সিজিপিএ'],
    isPopular: true,
  },
  {
    id: 'marks-percentage',
    categoryId: 'education-student',
    name: { en: 'Marks Percentage & Grade Calculator', bn: 'নম্বর শতকরা ও গ্রেড ক্যালকুলেটর' },
    description: {
      en: 'Calculate percentage from obtained marks and total marks with grade classification',
      bn: 'প্রাপ্ত নম্বর ও মোট পূর্ণমান থেকে শতকরা হার ও গ্রেড জানুন'
    },
    keywords: ['marks', 'percentage', 'exam', 'grade', 'প্রাপ্ত নম্বর', 'পরীক্ষা'],
  },
  {
    id: 'attendance-calculator',
    categoryId: 'education-student',
    name: { en: 'Attendance Percentage Calculator', bn: 'উপস্থিতির শতকরা হার ক্যালকুলেটর' },
    description: {
      en: 'Calculate attendance % and find how many more classes needed to reach 75% or 80%',
      bn: 'ক্লাসে উপস্থিতির শতকরা হার এবং লক্ষ্যমাত্রা অর্জনে আরও কত ক্লাস করতে হবে'
    },
    keywords: ['attendance', 'class attendance', '75 percent', 'উপস্থিতি', 'ক্লাস'],
  },

  // Vehicle & Travel
  {
    id: 'fuel-cost-calculator',
    categoryId: 'vehicle-travel',
    name: { en: 'Fuel Cost & Trip Travel Calculator', bn: 'জ্বালানি খরচ ও ভ্রমণ ব্যয় ক্যালকুলেটর' },
    description: {
      en: 'Calculate total fuel cost, liters/gallons required, and cost per passenger for any trip',
      bn: 'ভ্রমণের দূরত্ব, মাইলেজ ও তেলের দাম দিয়ে মোট জ্বালানি খরচ হিসাব করুন'
    },
    keywords: ['fuel', 'petrol', 'octane', 'diesel', 'trip cost', 'জ্বালানি', 'তেলের খরচ', 'ভ্রমণ'],
    isPopular: true,
  },
  {
    id: 'mileage-calculator',
    categoryId: 'vehicle-travel',
    name: { en: 'Vehicle Mileage & Fuel Economy', bn: 'গাড়ির মাইলেজ ও জ্বালানি দক্ষতা' },
    description: {
      en: 'Calculate fuel economy in km/L, L/100km, or MPG from distance travelled and fuel consumed',
      bn: 'প্রতি লিটার জ্বালানিতে গাড়ি কত কিলোমিটার যায় (কিমি/লিটার) তা নির্ণয় করুন'
    },
    keywords: ['mileage', 'km/l', 'mpg', 'fuel economy', 'মাইলেজ', 'গাড়ির তেল'],
  },

  // Home & Household
  {
    id: 'electricity-bill-calc',
    categoryId: 'home-household',
    name: { en: 'Electricity Bill Calculator', bn: 'বিদ্যুৎ বিল ক্যালকুলেটর' },
    description: {
      en: 'Calculate electric bill with Bangladesh slab rates or custom unit rates with demand and VAT',
      bn: 'ব্যবহৃত ইউনিট অনুযায়ী বিদ্যুৎ বিলের আনুমানিক হিসাব'
    },
    keywords: ['electricity bill', 'desco', 'dpdc', 'reb', 'wzpdcl', 'bpdb', 'বিদ্যুৎ বিল', 'কারেন্ট বিল'],
    isPopular: true,
  },
  {
    id: 'paint-tile-flooring',
    categoryId: 'home-household',
    name: { en: 'Room Area, Paint & Tile Calculator', bn: 'ঘরের ক্ষেত্রফল, রঙ ও টাইলস হিসাব' },
    description: {
      en: 'Calculate room wall area, required paint liters/gallons, and number of floor tiles needed',
      bn: 'ঘরের দেয়াল ও মেঝের ক্ষেত্রফল, প্রয়োজনীয় রঙ এবং টাইলসের সংখ্যা জানুন'
    },
    keywords: ['paint', 'tiles', 'flooring', 'room area', 'রঙের হিসাব', 'টাইলস'],
  },

  // Construction
  {
    id: 'concrete-cement-sand',
    categoryId: 'construction',
    name: { en: 'Concrete Mix (Cement, Sand, Stone)', bn: 'কংক্রিট মিক্স (সিমেন্ট, বালি ও খোয়া)' },
    description: {
      en: 'Calculate cement bags, sand cft, and stone/aggregate cft using 1:1.5:3, 1:2:4 ratios with 1.54 dry factor',
      bn: 'ঢালাইয়ের আয়তন থেকে সিমেন্টের ব্যাগ, বালি (cft) ও খোয়ার পরিমাণ নির্ণয়'
    },
    keywords: ['concrete', 'cement', 'sand', 'cft', 'ঢালাই', 'সিমেন্ট', 'বালি', 'খোয়া'],
  },
  {
    id: 'brick-plaster-calc',
    categoryId: 'construction',
    name: { en: 'Brick & Wall Plaster Calculator', bn: 'ইট ও দেয়াল প্লাস্টার ক্যালকুলেটর' },
    description: {
      en: 'Calculate number of standard 5-inch or 10-inch wall bricks and plaster cement/sand requirement',
      bn: '৫ ইঞ্চি বা ১০ ইঞ্চি দেয়ালে মোট ইটের সংখ্যা এবং প্লাস্টারের মালামাল হিসাব'
    },
    keywords: ['brick', 'plaster', 'wall', 'ইটের হিসাব', 'প্লাস্টার', 'গাঁথুনি'],
  },
  {
    id: 'rebar-steel-weight',
    categoryId: 'construction',
    name: { en: 'Rebar / Steel Weight (রডের ওজন)', bn: 'রডের ওজন ক্যালকুলেটর (D²/162)' },
    description: {
      en: 'Calculate total weight of steel rebar in kg and tons for 8mm, 10mm, 12mm, 16mm, 20mm, 25mm bars',
      bn: 'রডের মিলিমিটার মাপ ও দৈর্ঘ্য অনুযায়ী মোট ওজন (কেজি ও টন) বের করুন'
    },
    keywords: ['rebar', 'steel', 'rod weight', 'd2/162', 'রডের ওজন', 'রড হিসাব'],
  },

  // Electricity & Energy
  {
    id: 'ohms-law-power',
    categoryId: 'electricity-energy',
    name: { en: "Ohm's Law & Electrical Power (P=VI)", bn: 'ওহমের সূত্র ও বিদ্যুৎ শক্তি (Watts)' },
    description: {
      en: 'Calculate Voltage (V), Current (I), Resistance (R), and Power in Watts (P)',
      bn: 'ভোল্টেজ, কারেন্ট, রোধ এবং ওয়াট শক্তি হিসাব করুন'
    },
    keywords: ['ohm law', 'voltage', 'current', 'watts', 'power', 'ওহমের সূত্র', 'ওয়াট'],
  },
  {
    id: 'battery-backup-time',
    categoryId: 'electricity-energy',
    name: { en: 'Battery Backup & Inverter Sizing', bn: 'ব্যাটারি ব্যাকআপ ও আইপিএস সাইজ' },
    description: {
      en: 'Calculate hours of backup time from battery Ah, voltage, and electrical load in Watts',
      bn: 'ব্যাটারির অ্যাম্পিয়ার-আওয়ার (Ah) ও লোড (Watts) থেকে ব্যাকআপ সময় জানুন'
    },
    keywords: ['battery backup', 'ips', 'ups', 'inverter', 'ah', 'ব্যাটারি ব্যাকআপ'],
  },

  // Solar & Battery
  {
    id: 'solar-system-calc',
    categoryId: 'solar-battery',
    name: { en: 'Solar Panel & System Size Calculator', bn: 'সোলার প্যানেল ও সিস্টেম সাইজ ক্যালকুলেটর' },
    description: {
      en: 'Calculate required solar panel wattage, daily kWh generation, and recommended battery capacity',
      bn: 'দৈনিক বিদ্যুৎ চাহিদার উপর ভিত্তি করে সোলার প্যানেলের ওয়াট ও ব্যাটারির হিসাব'
    },
    keywords: ['solar panel', 'solar system', 'clean energy', 'সোলার প্যানেল', 'সৌর বিদ্যুৎ'],
  },

  // Business
  {
    id: 'profit-margin-markup',
    categoryId: 'business',
    name: { en: 'Profit Margin & Markup Calculator', bn: 'প্রফিট মার্জিন ও মার্কআপ ক্যালকুলেটর' },
    description: {
      en: 'Calculate gross profit margin %, markup %, and target selling price from cost',
      bn: 'ক্রয়মূল্য থেকে কাঙ্ক্ষিত মুনাফার মার্জিন ও মার্কআপ বের করুন'
    },
    keywords: ['profit margin', 'markup', 'revenue', 'business', 'প্রফিট মার্জিন', 'মার্কআপ'],
  },
  {
    id: 'break-even-calculator',
    categoryId: 'business',
    name: { en: 'Break-Even Analysis Calculator', bn: 'ব্রেক-ইভেন পয়েন্ট ক্যালকুলেটর' },
    description: {
      en: 'Find the sales volume and revenue required to cover fixed and variable business costs',
      bn: 'ব্যবসায় লাভ-ক্ষতিহীন অবস্থা বা সমচ্ছেদ বিন্দু নির্ণয় করুন'
    },
    keywords: ['break even', 'fixed costs', 'sales volume', 'ব্রেক ইভেন'],
  },

  // Computer & Digital
  {
    id: 'download-upload-time',
    categoryId: 'computer-digital',
    name: { en: 'Download & Upload Time Calculator', bn: 'ডাউনলোড ও আপলোড সময় ক্যালকুলেটর' },
    description: {
      en: 'Calculate file download/upload duration based on file size (MB/GB) and internet speed (Mbps)',
      bn: 'ফাইলের সাইজ ও ইন্টারনেট স্পিড (Mbps) অনুযায়ী কত সময় লাগবে তা জানুন'
    },
    keywords: ['download time', 'upload time', 'internet speed', 'mbps', 'ডাউনলোড সময়'],
  },
  {
    id: 'aspect-ratio-calc',
    categoryId: 'computer-digital',
    name: { en: 'Aspect Ratio & Resolution Calculator', bn: 'অ্যাসপেক্ট রেশিও ও স্ক্রিন রেজোলিউশন' },
    description: {
      en: 'Calculate dimensions for 16:9, 4:3, 21:9, and custom resolutions for videos and screens',
      bn: 'ভিডিও ও ডিসপ্লের জন্য ১৬:৯, ৪:৩ ইত্যাদি অ্যাসপেক্ট রেশিও স্কেল করুন'
    },
    keywords: ['aspect ratio', 'resolution', '16:9', '4:3', 'screen', 'রেজোলিউশন'],
  },

  // Food & Cooking
  {
    id: 'recipe-scaling',
    categoryId: 'food-cooking',
    name: { en: 'Recipe Scaling & Kitchen Units', bn: 'রেসিপি গুণক ও রান্নাঘরের পরিমাপ' },
    description: {
      en: 'Scale recipe ingredient quantities up or down by servings, plus convert cups, tbsp, tsp, and ml',
      bn: 'পরিবেশন সংখ্যা অনুযায়ী রান্নার উপাদানের সঠিক পরিমাণ ও একক রূপান্তর'
    },
    keywords: ['recipe', 'servings', 'kitchen converter', 'cup to ml', 'রান্না', 'রেসিপি'],
  },

  // Science & Engineering
  {
    id: 'physics-motion-force',
    categoryId: 'science-engineering',
    name: { en: 'Physics Motion & Force (v=d/t, F=ma)', bn: 'গতি ও বল ক্যালকুলেটর' },
    description: {
      en: 'Calculate speed, velocity, acceleration, and Newton force (F=ma) with unit conversions',
      bn: 'গতিবেগ, ত্বরণ এবং নিউটনের বলের সূত্র (F=ma) সমাধান করুন'
    },
    keywords: ['physics', 'velocity', 'force', 'acceleration', 'f=ma', 'বল', 'গতিবেগ', 'পদার্থবিজ্ঞান'],
  },
  {
    id: 'density-pressure-work',
    categoryId: 'science-engineering',
    name: { en: 'Density, Pressure & Work / Energy', bn: 'ঘনত্ব, চাপ ও কাজের পরিমাণ' },
    description: {
      en: 'Calculate density (ρ = m/V), pressure (P = F/A), and mechanical work/kinetic energy (W = F·d)',
      bn: 'ঘনত্ব (m/V), চাপ (F/A) এবং কৃতকাজ বা গতিশক্তি হিসাব করুন'
    },
    keywords: ['density', 'pressure', 'work', 'energy', 'ঘনত্ব', 'চাপ', 'শক্তি'],
  },
];
