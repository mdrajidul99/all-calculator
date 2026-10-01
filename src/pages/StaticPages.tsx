import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdBanner } from '../components/AdBanner';
import {
  Mail,
  ShieldCheck,
  FileText,
  AlertTriangle,
  HelpCircle,
  Info,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useApp();
  const logoUrl = 'https://pxdrop.online/raw/dauv31q81qec73f6ofi0';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navAbout }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={logoUrl}
            alt="All Calculator Logo"
            className="h-16 w-16 rounded-2xl object-contain border border-slate-200 dark:border-slate-700 bg-white p-1"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'অল ক্যালকুলেটর সম্পর্কে' : 'About All Calculator'}
            </h1>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Developed by MRS Engineers BD
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'অল ক্যালকুলেটর (All Calculator) হলো দৈনন্দিন জীবন, শিক্ষা, ব্যবসা, ব্যাংকিং ও অর্থায়ন, জমি পরিমাপ, স্বাস্থ্য, জ্বালানি এবং প্রকৌশল সংক্রান্ত জটিল হিসাব-নিকাশকে সহজ ও গতিশীল করার একটি সর্বজনীন প্ল্যাটফর্ম।'
              : 'All Calculator is a universal, modern, and high-performance online calculation portal designed to make everyday arithmetic, financial planning, land surveying, currency conversion, health tracking, and engineering estimations effortless.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            {language === 'bn' ? 'আমাদের মূল দর্শন' : 'Our Core Philosophy'}
          </h3>
          <p>
            {language === 'bn'
              ? 'আমরা বিশ্বাস করি প্রয়োজনীয় গাণিতিক ও ব্যবহারিক সরঞ্জাম সবার জন্য উন্মুক্ত ও বাধাহীন হওয়া উচিত। তাই অল ক্যালকুলেটরে কোনো অ্যাকাউন্ট খোলা, পাসওয়ার্ড মনে রাখা বা নিবন্ধন করার কোনো বাধ্যবাধকতা নেই। যে কেউ ওয়েবসাইট খুলে নিমেষেই কাঙ্ক্ষিত ক্যালকুলেটরটি ব্যবহার করতে পারবেন।'
              : 'We believe practical calculation tools should be universally accessible without friction. All Calculator never requires registration, sign-up, subscriptions, or invasive personal information. Simply open the website and compute what you need immediately.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            {language === 'bn' ? 'প্রকৌশল ও কারিগরি টিম' : 'Engineering & Development'}
          </h3>
          <p>
            {language === 'bn'
              ? 'প্ল্যাটফর্মটি তৈরি ও পরিচালনা করছে "এমআরএস ইঞ্জিনিয়ার্স বিডি (MRS Engineers BD)"। সফটওয়্যার আর্কিটেকচার ও ব্যবহারকারী অভিজ্ঞতার সর্বোচ্চ মান বজায় রেখে আমরা সঠিক সূত্র ও নিখুঁত ফলাফলের নিশ্চয়তা প্রদানে সচেষ্ট।'
              : 'The platform is engineered by MRS Engineers BD. Focused on mathematical rigor, clean ergonomics, and lightning speed, we continuously maintain and refine calculation formulas.'}
          </p>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {language === 'bn' ? 'যোগাযোগ' : 'Direct Contact'}
          </span>
          <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Mail className="h-4 w-4 text-blue-500" />
            <a href="mailto:mrs.engineers.bd26@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              mrs.engineers.bd26@gmail.com
            </a>
          </div>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};

export const HowToUsePage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navHowToUse }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'কীভাবে ব্যবহার করবেন' : 'How to Use All Calculator'}
            </h1>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'খুব সহজ ৪টি ধাপে যেকোনো হিসাব সম্পন্ন করুন' : 'Simple guide to finding and using calculators'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {language === 'bn' ? 'ক্যালকুলেটর খুঁজুন বা ক্যাটাগরি বেছে নিন' : 'Find or Browse a Calculator'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'হোমপেজের সার্চ বক্সে নাম লিখুন (যেমন: বয়স, জমি, ইএমআই, শতকরা) অথবা ক্যাটাগরি তালিকা থেকে পছন্দমতো ক্যালকুলেটরে ক্লিক করুন।'
                  : 'Type keywords into the search box (e.g. Age, Land, Loan, BMI, USDT) or browse through the 18 specialized categories.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {language === 'bn' ? 'প্রয়োজনীয় তথ্য ইনপুট দিন' : 'Enter the Required Values'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'ক্যালকুলেটরের প্রতিটি ঘরে সঠিক সংখ্যা লিখুন। কোনো কোনো ক্যালকুলেটরে ড্রপডাউন থেকে একক বা সময়কাল নির্বাচন করতে হতে পারে।'
                  : 'Type your numerical inputs into the designated fields and select relevant units or timeframes.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {language === 'bn' ? '"হিসাব করুন" বোতামে চাপুন' : 'Click Calculate & Review Results'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'নীল রঙের Calculate বা হিসাব করুন বাটনে চাপ দিন। চোখের পলকে আপনার সামনে বিস্তারিত ফলাফল, চার্ট ও বিশ্লেষণ প্রদর্শিত হবে।'
                  : 'Press Calculate to view the formatted result, breakdown numbers, formulas, and visual indicator cards.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {language === 'bn' ? 'কপি ও শেয়ার করুন' : 'Copy or Share Result'}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'ক্যালকুলেটরের ফলাফলটি কপি বোতামে চাপ দিয়ে সরাসরি কপি করতে পারবেন এবং শেয়ার বাটনের মাধ্যমে বন্ধুদের পাঠাতে পারেন।'
                  : 'Use the Copy Result button to copy directly to your clipboard or share with friends via the Share button.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.privacyPolicy }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
            </h1>
            <p className="text-xs text-slate-500">Last updated: 2026</p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'অল ক্যালকুলেটর (All Calculator) সম্পূর্ণ বিনামূল্যে পরিচালিত একটি প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য ব্যবহারকারীদের ব্যক্তিগত তথ্যের সর্বোচ্চ সম্মান জানানো এবং তাদের গোপনীয়তা রক্ষা করা।'
              : 'All Calculator is dedicated to providing free, accessible mathematical and computational tools while respecting user privacy.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            1. {language === 'bn' ? 'কোনো অ্যাকাউন্ট বা ব্যক্তিগত তথ্য সংগ্রহ নেই' : 'No Accounts or Personal Data Collection'}
          </h3>
          <p>
            {language === 'bn'
              ? 'ওয়েবসাইট ব্যবহারের জন্য কোনো অ্যাকাউন্ট সৃষ্টি, লগইন, নাম, ঠিকানা বা মোবাইল নম্বর প্রদানের প্রয়োজন নেই। আপনি ক্যালকুলেটরে যেসব সংখ্যা বা মান ইনপুট দেন, তা আপনার নিজস্ব ব্রাউজারে স্থানীয়ভাবে প্রক্রিয়াকৃত হয় এবং আমাদের কোনো সার্ভারে সংরক্ষণ করা হয় না।'
              : 'Our website does not require registration or personal identification. Numerical values entered into calculators are calculated directly within your client web browser and are not transmitted to or stored on our servers.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            2. {language === 'bn' ? 'লোকাল স্টোরেজ (LocalStorage) এর ব্যবহার' : 'Use of Browser Local Storage'}
          </h3>
          <p>
            {language === 'bn'
              ? 'আপনার পছন্দসই ভাষা (ইংরেজি বা বাংলা), থিম (ডার্ক বা লাইট মোড), পছন্দ তালিকা (Favorites) এবং সম্প্রতি ব্যবহৃত ক্যালকুলেটরের তালিকা শুধুমাত্র আপনার নিজস্ব ডিভাইসের ব্রাউজারে (LocalStorage) জমা থাকে যাতে পেজ রিফ্রেশ করলেও সেটিংস ঠিক থাকে।'
              : 'We use your browser’s localStorage solely to persist your UI preferences (chosen language, dark/light theme, favorite calculators, and recently used calculator history). No personal tracking data is stored.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            3. {language === 'bn' ? 'বিজ্ঞাপন ও থার্ড পার্টি সেবা' : 'Third-Party Advertising & Cookies'}
          </h3>
          <p>
            {language === 'bn'
              ? 'ওয়েবসাইটটি পরিচালনা ও বিনামূল্যে চালু রাখার সুবিধার্থে আমরা অনুমোদিত তৃতীয় পক্ষীয় বিজ্ঞাপন নেটওয়ার্কের বিজ্ঞাপন প্রদর্শন করতে পারি। এসব বিজ্ঞাপন সরবরাহকারী প্রতিষ্ঠান তাদের নিজস্ব নীতিমালা অনুযায়ী বেনামী ট্রাফিক তথ্য বা কুকি ব্যবহার করতে পারে। আমরা কোনো অযাচিত পপ-আপ বা প্রতারণামূলক বিজ্ঞাপন সমর্থন করি না।'
              : 'To keep All Calculator 100% free, we display non-intrusive advertisements served by third-party ad networks. These third parties may utilize standard cookies or web beacons in accordance with their privacy policies to deliver relevant advertising.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            4. {language === 'bn' ? 'যোগাযোগ' : 'Contact Information'}
          </h3>
          <p>
            {language === 'bn'
              ? 'গোপনীয়তা নীতি সম্পর্কে যেকোনো মতামত বা প্রশ্নের জন্য ইমেইল করুন: '
              : 'If you have questions regarding our privacy practices, contact MRS Engineers BD at: '}
            <a href="mailto:mrs.engineers.bd26@gmail.com" className="font-bold text-blue-600 dark:text-blue-400">
              mrs.engineers.bd26@gmail.com
            </a>
          </p>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.termsOfService }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'শর্তাবলী ও নিয়ম (Terms & Conditions)' : 'Terms & Conditions'}
            </h1>
            <p className="text-xs text-slate-500">Effective as of 2026</p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
          <p>
            {language === 'bn'
              ? 'অল ক্যালকুলেটর ওয়েবসাইট পরিদর্শনের জন্য আপনাকে স্বাগতম। এই সাইটটি ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত সাধারণ শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে।'
              : 'Welcome to All Calculator. By accessing or using this website, you agree to comply with and be bound by the following Terms and Conditions.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            1. {language === 'bn' ? 'বিনামূল্যে সেবার শর্ত' : 'Free Informational Use'}
          </h3>
          <p>
            {language === 'bn'
              ? 'আমাদের সকল ক্যালকুলেটর সাধারণ নাগরিক, শিক্ষার্থী এবং পেশাজীবীদের সুবিধার্থে সম্পূর্ণ বিনামূল্যে প্রদান করা হয়েছে। এই ক্যালকুলেটরগুলোর ফলাফল কেবল প্রাথমিক তথ্য বা আনুমানিক হিসাবের জন্য ব্যবহারযোগ্য।'
              : 'All calculations are provided free of charge for informational, educational, and computational convenience.'}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            2. {language === 'bn' ? 'দায়সীমা (Limitation of Liability)' : 'Limitation of Liability'}
          </h3>
          <p>
            {language === 'bn'
              ? 'আমরা প্রতিটি হিসাবের গাণিতিক বিশুদ্ধতা রক্ষায় সর্বোচ্চ যত্ন নিয়ে থাকি। তবে কোনো আর্থিক ঋণ, চিকিৎসা, জমির রেজিস্ট্রি দলিল বা নির্মাণ প্রকল্পের ক্ষেত্রে সংশ্লিষ্ট লাইসেন্সপ্রাপ্ত পেশাদার বা সরকারি কর্তৃপক্ষের আনুষ্ঠানিক সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে। সাইটের ফলাফলের উপর ভিত্তি করে গৃহীত কোনো আর্থিক বা শারীরিক ক্ষতির জন্য প্ল্যাটফর্ম কর্তৃপক্ষ দায়ী থাকবে না।'
              : 'While we apply standard scientific, mathematical, and statutory formulas, MRS Engineers BD shall not be liable for any direct, indirect, or consequential loss arising from the use of calculations.'}
          </p>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.disclaimer }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'দায়মুক্তি ও বিশেষ সতর্কতা (Disclaimer)' : 'Disclaimer'}
            </h1>
            <p className="text-xs text-slate-500">Official Notice</p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-1">
              {language === 'bn' ? '১. চিকিৎসাগত সতর্কতা (Health & Medical)' : '1. Health & Medical Information'}
            </h3>
            <p>
              {language === 'bn'
                ? 'বিএমআই, ক্যালোরি এবং হার্ট রেট ক্যালকুলেটরের ফলাফল পরিসংখ্যানভিত্তিক সাধারণ ধারণা প্রদান করে। এটি কোনো রোগ নির্ণয় বা ক্লিনিকাল পরামর্শ নয়। কোনো ডায়েট বা ব্যায়াম শুরুর পূর্বে চিকিৎসকের পরামর্শ গ্রহণ করুন।'
                : 'Health calculators (BMI, BMR, Calorie, Heart Rate) are intended for general fitness and wellness estimation only and do not constitute medical diagnosis, advice, or treatment.'}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">
              {language === 'bn' ? '২. আর্থিক ও ঋণ হিসাব (Financial & EMI)' : '2. Financial & Loan Estimates'}
            </h3>
            <p>
              {language === 'bn'
                ? 'ইএমআই, সুদের হার ও সঞ্চয়ের ফলাফল আনুমানিক গাণিতিক প্রক্ষেপণ। বিভিন্ন ব্যাংক বা ঋণদাতা প্রতিষ্ঠানের নির্দিষ্ট প্রসেসিং ফি, সারচার্জ এবং পরিবর্তনশীল সুদের হারের কারণে বাস্তব কিস্তিতে সামান্য তারতম্য হতে পারে।'
                : 'Financial calculations (EMI, loan payoff, SIP, interest) are estimates based on standard compound models. Actual financial institution terms, fees, and floating interest rates may differ.'}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">
              {language === 'bn' ? '৩. ভূমি ও জমির পরিমাপ (Land & Property)' : '3. Land & Regional Property Units'}
            </h3>
            <p>
              {language === 'bn'
                ? 'বাংলাদেশে সরকারি মান অনুযায়ী ১ শতাংশ = ৪৩৫.৬ বর্গফুট এবং ১ আদর্শ কাঠা = ৭২০ বর্গফুট। তবে কিছু জেলায় (যেমন চট্টগ্রাম বা সিলেটের নির্দিষ্ট অঞ্চল) স্থানীয় রীতিনীতিতে কাঠা ও কানির মাপে আঞ্চলিক ভিন্নতা থাকতে পারে। সরকারি দলিলের পূর্বে রেকর্ড খতিয়ান যাচাই আবশ্যক।'
                : 'Land measurements utilize Bangladesh national survey standards (1 Decimal = 435.6 sq ft; 1 Standard Katha = 720 sq ft). Regional deed customs in certain districts may vary. Verify official sub-registry records for property transactions.'}
            </p>
          </div>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { language, t } = useApp();
  const [copied, setCopied] = useState(false);
  const email = 'mrs.engineers.bd26@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: t.navContact }]} />

      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
            </h1>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'মতামত, নতুন ক্যালকুলেটরের প্রস্তাব বা সহায়তার জন্য' : 'Suggestions, inquiries, or feedback'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'bn' ? 'ডেভেলপার প্রতিষ্ঠান' : 'Developer & Engineering'}
          </div>
          <div className="mt-1 text-xl font-black text-slate-900 dark:text-slate-100">
            MRS Engineers BD
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
            >
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? t.copied : 'Copy Email Address'}</span>
            </button>
          </div>
        </div>
      </div>

      <AdBanner type="banner" className="mt-8" />
    </div>
  );
};
