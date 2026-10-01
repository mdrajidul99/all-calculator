import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Heart, Activity, Droplets, User, AlertTriangle } from 'lucide-react';

// 1. BMI Calculator
export const BMICalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'bmi-calculator')!;

  const [weightKg, setWeightKg] = useState('68');
  const [heightCm, setHeightCm] = useState('172');

  const [result, setResult] = useState<{
    bmi: number;
    category: { en: string; bn: string; color: string };
    healthyMin: number;
    healthyMax: number;
  }>({
    bmi: 23.0,
    category: { en: 'Normal Weight', bn: 'স্বাভাবিক ওজন', color: 'text-emerald-600' },
    healthyMin: 54.7,
    healthyMax: 73.7,
  });

  const handleCalculate = () => {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100; // to meters

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const bmi = w / (h * h);
    const healthyMin = 18.5 * (h * h);
    const healthyMax = 24.9 * (h * h);

    let category = { en: 'Normal Weight', bn: 'স্বাভাবিক ওজন', color: 'text-emerald-600' };
    if (bmi < 18.5) {
      category = { en: 'Underweight', bn: 'স্বাভাবিকের চেয়ে কম ওজন', color: 'text-amber-500' };
    } else if (bmi >= 25 && bmi < 29.9) {
      category = { en: 'Overweight', bn: 'অতিরিক্ত ওজন', color: 'text-orange-500' };
    } else if (bmi >= 30) {
      category = { en: 'Obese (স্থূলতা)', bn: 'স্থূলতা বা অতিওজন', color: 'text-rose-600' };
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      healthyMin: parseFloat(healthyMin.toFixed(1)),
      healthyMax: parseFloat(healthyMax.toFixed(1)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'WHO BMI Formula', bn: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO) বিএমআই সূত্র' },
        expression: 'BMI = ওজন (kg) / [উচ্চতা (m)]²',
        explanation: {
          en: 'Body Mass Index is a simple index of weight-for-height that is commonly used to classify underweight, normal weight, overweight and obesity in adults.',
          bn: 'বডি মাস ইনডেক্স বা বিএমআই হলো উচ্চতা সাপেক্ষে ওজনের সামঞ্জস্য পরিমাপের আন্তর্জাতিক পদ্ধতি।',
        },
      }}
      howToUseSteps={{
        en: [
          'Enter your body weight in kilograms (kg).',
          'Enter your height in centimeters (cm). (For example, 5 ft 8 in = 172.7 cm).',
          'Click Calculate to see your BMI score, weight classification, and recommended healthy weight span.',
        ],
        bn: [
          'আপনার শরীরের বর্তমান ওজন কেজিতে (kg) লিখুন।',
          'আপনার উচ্চতা সেন্টিমিটারে (cm) লিখুন (যেমন: ৫ ফুট ৮ ইঞ্চি = ১৭৩ সেমি)।',
          'হিসাব করুন বাটনে চাপ দিয়ে আপনার বিএমআই ও আদর্শ ওজনের পরিসর জানুন।',
        ],
      }}
      disclaimer={{
        en: 'These health calculations are statistical estimates and do not substitute for professional medical advice, diagnosis, or clinical consultation.',
        bn: 'এই স্বাস্থ্য ক্যালকুলেটরের ফলাফল পরিসংখ্যানভিত্তিক আনুমানিক তথ্য এবং চিকিৎসকের সরাসরি পরামর্শ বা স্বাস্থ্য পরীক্ষার বিকল্প নয়।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ওজন (কেজি / kg)' : 'Weight (kg)'}
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'উচ্চতা (সেন্টিমিটার / cm)' : 'Height (cm)'}
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'bn' ? 'আপনার বিএমআই স্কোর' : 'Your BMI Score'}
                </span>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{result.bmi}</span>
                  <span className={`text-lg font-bold ${result.category.color}`}>
                    {result.category[language]}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'আদর্শ ওজনের সীমা' : 'Healthy Weight Range'}
                </span>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {result.healthyMin} kg – {result.healthyMax} kg
                </div>
              </div>
            </div>

            {/* Visual Indicator Bar */}
            <div className="mt-5">
              <div className="grid grid-cols-4 text-center text-[10px] font-semibold text-slate-500 mb-1">
                <span>&lt; 18.5 Under</span>
                <span>18.5 - 24.9 Normal</span>
                <span>25 - 29.9 Over</span>
                <span>30+ Obese</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700">
                <div className="w-1/4 bg-amber-400 h-full" />
                <div className="w-1/4 bg-emerald-500 h-full" />
                <div className="w-1/4 bg-orange-500 h-full" />
                <div className="w-1/4 bg-rose-600 h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. BMR & Daily Calorie Calculator
export const BMRCalorieCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'bmr-calorie-calculator')!;

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('28');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('1.375'); // Light exercise

  const [calories, setCalories] = useState<{
    bmr: number;
    tdee: number;
    weightLoss: number;
    mildLoss: number;
  }>({
    bmr: 1680,
    tdee: 2310,
    mildLoss: 2060,
    weightLoss: 1810,
  });

  const handleCalculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (isNaN(a) || isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = bmr * act;

    setCalories({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      mildLoss: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Mifflin-St Jeor BMR Equation', bn: 'মিফলিন-সেন্ট জিওর বিএমআর সূত্র' },
        expression: 'পুরুষ: BMR = 10W + 6.25H - 5A + 5   |   নারী: BMR = 10W + 6.25H - 5A - 161',
        explanation: {
          en: 'BMR measures baseline metabolic energy required at rest. TDEE adjusts for daily movement and physical activity.',
          bn: 'বিএমআর হলো সম্পূর্ণ বিশ্রামে থাকা অবস্থায় শরীরের অঙ্গ-প্রত্যঙ্গ সচল রাখতে প্রয়োজনীয় ন্যূনতম ক্যালোরির পরিমাণ।',
        },
      }}
      disclaimer={{
        en: 'Calorie estimates should guide general wellness. Individual metabolic rates, body composition, and endocrine factors vary.',
        bn: 'ক্যালোরির হিসাব সাধারণ গাইডলাইনের জন্য। ব্যক্তিগত হরমোন বা পেশির পার্থক্যে কিছুটা ভিন্ন হতে পারে।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="male">{language === 'bn' ? 'পুরুষ (Male)' : 'Male'}</option>
              <option value="female">{language === 'bn' ? 'নারী (Female)' : 'Female'}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'বয়স (বছর)' : 'Age (Years)'}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ওজন (kg)' : 'Weight (kg)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'উচ্চতা (cm)' : 'Height (cm)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {language === 'bn' ? 'দৈনিক শারীরিক পরিশ্রম / অ্যাক্টিভিটি' : 'Daily Activity Level'}
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="1.2">{language === 'bn' ? 'বসে কাজ / ব্যায়ামহীন (Sedentary)' : 'Sedentary (Little or no exercise)'}</option>
            <option value="1.375">{language === 'bn' ? 'হালকা ব্যায়াম (১-৩ দিন/সপ্তাহ)' : 'Light (Exercise 1-3 times/week)'}</option>
            <option value="1.55">{language === 'bn' ? 'মাঝারি পরিশ্রম (৩-৫ দিন/সপ্তাহ)' : 'Moderate (Exercise 3-5 times/week)'}</option>
            <option value="1.725">{language === 'bn' ? 'কঠোর ব্যায়াম (৬-৭ দিন/সপ্তাহ)' : 'Heavy (Exercise 6-7 times/week)'}</option>
          </select>
        </div>

        <div className="mt-5">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            {t.calculate}
          </button>
        </div>

        {calories && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-blue-50/70 p-4 text-center dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
              <span className="text-xs text-slate-500 font-semibold uppercase">
                {language === 'bn' ? 'মৌলিক বিএমআর (BMR)' : 'Base BMR'}
              </span>
              <div className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
                {calories.bmr} <span className="text-xs font-normal">kcal/day</span>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 p-4 text-center dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                {language === 'bn' ? 'ওজন বজায় রাখতে' : 'Weight Maintenance (TDEE)'}
              </span>
              <div className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {calories.tdee} <span className="text-xs font-normal">kcal/day</span>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50/70 p-4 text-center dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold uppercase">
                {language === 'bn' ? 'ওজন কমাতে' : 'Weight Loss (-0.5kg/wk)'}
              </span>
              <div className="mt-1 text-2xl font-black text-amber-700 dark:text-amber-300">
                {calories.weightLoss} <span className="text-xs font-normal">kcal/day</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
