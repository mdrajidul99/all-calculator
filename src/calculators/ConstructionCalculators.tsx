import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { HardHat, Layers, Box, Check, Copy } from 'lucide-react';

// 1. Concrete Mix Calculator (Cement, Sand, Aggregate)
export const ConcreteMixCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'concrete-cement-sand')!;

  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('15');
  const [thicknessInch, setThicknessInch] = useState('5');
  const [mixRatio, setMixRatio] = useState('1:2:4'); // 1:2:4 or 1:1.5:3

  const [materials, setMaterials] = useState<{
    wetVolumeCft: number;
    dryVolumeCft: number;
    cementBags: number;
    sandCft: number;
    stoneCft: number;
  }>({
    wetVolumeCft: 125,
    dryVolumeCft: 192.5,
    cementBags: 22,
    sandCft: 55,
    stoneCft: 110,
  });

  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const th = parseFloat(thicknessInch) / 12; // convert inches to feet

    if (isNaN(l) || isNaN(w) || isNaN(th) || l <= 0 || w <= 0 || th <= 0) return;

    // Wet volume in cubic feet (cft)
    const wetVolumeCft = l * w * th;
    // Dry volume factor for concrete is standard 1.54
    const dryVolumeCft = wetVolumeCft * 1.54;

    // Parse ratio
    const [c, s, a] = mixRatio.split(':').map(Number);
    const totalParts = c + s + a;

    // Cement in cft, then divided by 1.25 cft per 50kg bag
    const cementCft = (c / totalParts) * dryVolumeCft;
    const cementBags = Math.ceil(cementCft / 1.25);

    // Sand in cft
    const sandCft = (s / totalParts) * dryVolumeCft;

    // Aggregate in cft
    const stoneCft = (a / totalParts) * dryVolumeCft;

    setMaterials({
      wetVolumeCft: parseFloat(wetVolumeCft.toFixed(2)),
      dryVolumeCft: parseFloat(dryVolumeCft.toFixed(2)),
      cementBags,
      sandCft: parseFloat(sandCft.toFixed(2)),
      stoneCft: parseFloat(stoneCft.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Concrete Mix Proportioning (IS / ACI Code)', bn: 'কংক্রিট ঢালাই উপাদান সূত্র' },
        expression: 'শুষ্ক আয়তন = আর্দ্র আয়তন × ১.৫৪   |   সিমেন্ট ব্যাগ = (সিমেন্ট অনুপাত ÷ মোট অনুপাত) × শুষ্ক আয়তন ÷ ১.২৫ cft',
        explanation: {
          en: 'Applies standard civil engineering dry factor 1.54 to account for voids in sand and coarse aggregate. Standard 50 kg cement bag volume equals 1.25 cft.',
          bn: 'ঢালাইয়ের আর্দ্র আয়তনের সাথে শুষ্ক ফ্যাক্টর ১.৫৪ গুণ করা হয়। প্রতি ৫০ কেজি সিমেন্টের ব্যাগের আয়তন ১.২৫ সিএফটি (cft)।',
        },
      }}
      notes={{
        en: 'Civil Engineering Assumptions: Calculations assume standard 1.54 dry volume multiplier and 1 bag of cement = 1.25 cft (50 kg). Actual field mix proportions should adhere to approved structural engineering mix designs.',
        bn: 'প্রকৌশলীয় শর্ত: স্ট্যান্ডার্ড ১.৫৪ শুষ্ক ফ্যাক্টর এবং প্রতি ব্যাগ সিমেন্ট = ১.২৫ সিএফটি ধরা হয়েছে। সাইটের কাঠামোগত ডিজাইন অনুযায়ী অনুপাত নিশ্চিত করুন।',
      }}
      disclaimer={{
        en: 'These calculations are material estimates and do not replace certified engineering drawing schedules or laboratory slump tests.',
        bn: 'এই হিসাবটি নির্মাণ কাজের প্রাথমিক মালামালের আনুমানিক অনুমান এবং প্রফেশনাল সিভিল ইঞ্জিনিয়ারিং ডিজাইনের বিকল্প নয়।',
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'দৈর্ঘ্য (ফুট)' : 'Length (Feet)'}
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'প্রস্থ (ফুট)' : 'Width (Feet)'}
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'পুরুত্ব / উচ্চতা (ইঞ্চি)' : 'Thickness (Inches)'}
            </label>
            <input
              type="number"
              value={thicknessInch}
              onChange={(e) => setThicknessInch(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মিক্স রেশিও (সিমেন্ট:বালি:খোয়া)' : 'Mix Ratio'}
            </label>
            <select
              value={mixRatio}
              onChange={(e) => setMixRatio(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="1:1.5:3">1:1.5:3 (M20 - Slab & Beam)</option>
              <option value="1:2:4">1:2:4 (M15 - Standard RCC)</option>
              <option value="1:3:6">1:3:6 (M10 - Foundation / CC)</option>
            </select>
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

        {materials && (
          <div className="mt-6 rounded-2xl bg-amber-50/70 p-5 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {language === 'bn' ? 'প্রয়োজনীয় মালামালের বিবরণ' : 'Required Construction Materials'}
            </span>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white p-4 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'সিমেন্ট (Cement)' : 'Cement'}
                </span>
                <div className="mt-1 text-3xl font-black text-amber-700 dark:text-amber-400">
                  {materials.cementBags}{' '}
                  <span className="text-sm font-bold text-slate-500">{language === 'bn' ? 'ব্যাগ' : 'Bags'}</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'বালি (Sand)' : 'Sand (বালি)'}
                </span>
                <div className="mt-1 text-3xl font-black text-amber-700 dark:text-amber-400">
                  {materials.sandCft}{' '}
                  <span className="text-sm font-bold text-slate-500">cft (ঘনফুট)</span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-xs text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'খোয়া / পাথর (Stone)' : 'Stone Aggregate'}
                </span>
                <div className="mt-1 text-3xl font-black text-amber-700 dark:text-amber-400">
                  {materials.stoneCft}{' '}
                  <span className="text-sm font-bold text-slate-500">cft (ঘনফুট)</span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-right text-xs text-slate-500">
              Wet Vol: {materials.wetVolumeCft} cft | Dry Vol: {materials.dryVolumeCft} cft
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Rebar / Steel Weight Calculator
export const RebarSteelCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'rebar-steel-weight')!;

  const [diameter, setDiameter] = useState('16'); // mm
  const [lengthFeet, setLengthFeet] = useState('100'); // feet

  const [weight, setWeight] = useState<{
    unitWeightKgPerMeter: number;
    totalKg: number;
    totalTons: number;
  }>({
    unitWeightKgPerMeter: 1.58,
    totalKg: 48.16,
    totalTons: 0.048,
  });

  const handleCalculate = () => {
    const d = parseFloat(diameter);
    const lFt = parseFloat(lengthFeet);

    if (isNaN(d) || isNaN(lFt) || d <= 0 || lFt <= 0) return;

    // Standard formula: W (kg/m) = D^2 / 162.28
    const unitWeightKgPerM = (d * d) / 162.28;
    // Length in meters: feet * 0.3048
    const lMeters = lFt * 0.3048;
    const totalKg = unitWeightKgPerM * lMeters;
    const totalTons = totalKg / 1000;

    setWeight({
      unitWeightKgPerMeter: parseFloat(unitWeightKgPerM.toFixed(3)),
      totalKg: parseFloat(totalKg.toFixed(2)),
      totalTons: parseFloat(totalTons.toFixed(4)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Rebar Steel Weight Formula (D²/162)', bn: 'রডের ওজন নির্ণয়ের সূত্র' },
        expression: 'W (kg/m) = D² / 162.28   |   W (kg/ft) = D² / 533',
        explanation: {
          en: 'Where D is the nominal rebar diameter in millimeters. Standard density of structural steel is 7850 kg/m³.',
          bn: 'এখানে D হলো রডের ব্যাস মিলিমিটারে (mm)। ১ মিটার রডের ওজন = D² ÷ ১৬২.২৮ কেজি।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'রডের ব্যাস / সাইজ (মিলিমিটার - mm)' : 'Rebar Diameter (mm)'}
            </label>
            <select
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="8">8 mm (2.5 সুতা)</option>
              <option value="10">10 mm (3 সুতা)</option>
              <option value="12">12 mm (4 সুতা)</option>
              <option value="16">16 mm (5 সুতা)</option>
              <option value="20">20 mm (6 সুতা)</option>
              <option value="25">25 mm (8 সুতা)</option>
              <option value="32">32 mm (10 সুতা)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'রডের মোট দৈর্ঘ্য (ফুট)' : 'Total Length (Feet)'}
            </label>
            <input
              type="number"
              value={lengthFeet}
              onChange={(e) => setLengthFeet(e.target.value)}
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

        {weight && (
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {language === 'bn' ? 'মোট রডের ওজন' : 'Total Rebar Weight'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {weight.totalKg.toLocaleString()}{' '}
                  <span className="text-xl font-bold">{language === 'bn' ? 'কেজি' : 'kg'}</span>
                </div>
              </div>

              <div className="text-right text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div>
                  {language === 'bn' ? 'মেট্রিক টন:' : 'Metric Tons:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{weight.totalTons} Ton</span>
                </div>
                <div>
                  {language === 'bn' ? 'প্রতি মিটার ওজন:' : 'Unit Weight:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {weight.unitWeightKgPerMeter} kg/m
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
