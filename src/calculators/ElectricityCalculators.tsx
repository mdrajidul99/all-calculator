import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Zap, BatteryCharging, SunMedium } from 'lucide-react';

// 1. Ohm's Law & Power Calculator
export const OhmsLawCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'ohms-law-power')!;

  const [voltage, setVoltage] = useState('220');
  const [current, setCurrent] = useState('5');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');

  const [calculated, setCalculated] = useState<{
    v: number;
    i: number;
    r: number;
    p: number;
  }>({
    v: 220,
    i: 5,
    r: 44,
    p: 1100,
  });

  const handleCalculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);

    if (!isNaN(v) && !isNaN(i) && i > 0) {
      const r = v / i;
      const p = v * i;
      setCalculated({
        v,
        i,
        r: parseFloat(r.toFixed(2)),
        p: parseFloat(p.toFixed(2)),
      });
    }
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: "Ohm's Law & Power Equations", bn: 'ওহম সূত্র ও বিদ্যুৎ শক্তির সমীকরণ' },
        expression: 'V = I × R   |   P = V × I   |   P = I² × R   |   P = V² / R',
        explanation: {
          en: 'Where V is Voltage in Volts, I is Current in Amperes, R is Resistance in Ohms (Ω), and P is Power in Watts.',
          bn: 'এখানে V হলো ভোল্টেজ (ভোল্ট), I হলো বিদ্যুৎ প্রবাহ (অ্যাম্পিয়ার), R হলো রোধ (ওহম), এবং P হলো বৈদ্যুতিক ক্ষমতা (ওয়াট)।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ভোল্টেজ (Voltage - V)' : 'Voltage (Volts - V)'}
            </label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কারেন্ট প্রবাহ (Current - A)' : 'Current (Amperes - A)'}
            </label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
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

        {calculated && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-amber-50/70 p-3.5 text-center dark:bg-amber-950/40">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Power (ক্ষমতা)</span>
              <div className="mt-1 text-xl font-black text-amber-600 dark:text-amber-400">
                {calculated.p} Watts
              </div>
            </div>
            <div className="rounded-xl bg-blue-50/70 p-3.5 text-center dark:bg-blue-950/40">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Resistance (রোধ)</span>
              <div className="mt-1 text-xl font-black text-blue-600 dark:text-blue-400">
                {calculated.r} Ω
              </div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Voltage</span>
              <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
                {calculated.v} V
              </div>
            </div>
            <div className="rounded-xl bg-slate-100 p-3.5 text-center dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Current</span>
              <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
                {calculated.i} A
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Battery Backup Time & Inverter Sizing
export const BatteryBackupCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'battery-backup-time')!;

  const [capacityAh, setCapacityAh] = useState('150'); // Ah
  const [batteryVoltage, setBatteryVoltage] = useState('12'); // V
  const [loadWatts, setLoadWatts] = useState('300'); // W

  const [result, setResult] = useState<{
    backupHours: number;
    backupFormatted: string;
    totalWh: number;
    recommendedInverterVA: number;
  }>({
    backupHours: 4.8,
    backupFormatted: '4 hrs 48 mins',
    totalWh: 1800,
    recommendedInverterVA: 500,
  });

  const handleCalculate = () => {
    const ah = parseFloat(capacityAh);
    const v = parseFloat(batteryVoltage);
    const w = parseFloat(loadWatts);

    if (isNaN(ah) || isNaN(v) || isNaN(w) || ah <= 0 || v <= 0 || w <= 0) return;

    // Total stored energy Wh = Ah * V
    const totalWh = ah * v;
    // Real usable backup accounting for 80% DoD and 85% inverter conversion efficiency = 0.8 * 0.85 = 0.68 to 0.8
    const usableWh = totalWh * 0.8;
    const backupHours = usableWh / w;

    const hrs = Math.floor(backupHours);
    const mins = Math.round((backupHours - hrs) * 60);

    // Recommended inverter rating with 25% safety margin / 0.8 power factor
    const recommendedInverterVA = Math.ceil((w * 1.25) / 0.8 / 50) * 50;

    setResult({
      backupHours: parseFloat(backupHours.toFixed(2)),
      backupFormatted: `${hrs} hrs ${mins} mins`,
      totalWh,
      recommendedInverterVA,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Battery Discharge Equation', bn: 'ব্যাটারি ব্যাকআপ সময় সূত্র' },
        expression: 'ব্যাকআপ সময় (ঘণ্টা) = (ব্যাটারি Ah × ভোল্টেজ × ০.৮ দক্ষতা) ÷ মোট লোড (Watts)',
        explanation: {
          en: 'Calculates realistic discharge time accounting for battery depth of discharge (DoD) and inverter conversion efficiency.',
          bn: 'ব্যাটারির শক্তি ক্ষয় ও ইনভার্টার দক্ষতার সমন্বয় করে বাস্তবসম্মত ব্যাকআপ সময় নির্ণয় করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ব্যাটারি ক্যাপাসিটি (Ah)' : 'Battery Capacity (Ah)'}
            </label>
            <input
              type="number"
              value={capacityAh}
              onChange={(e) => setCapacityAh(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ব্যাটারি ভোল্টেজ (V)' : 'Battery Voltage (V)'}
            </label>
            <select
              value={batteryVoltage}
              onChange={(e) => setBatteryVoltage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="12">12V (Single Battery)</option>
              <option value="24">24V (2 Batteries Series)</option>
              <option value="48">48V (4 Batteries Series)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মোট লোড (Watts)' : 'Total Load (Watts)'}
            </label>
            <input
              type="number"
              value={loadWatts}
              onChange={(e) => setLoadWatts(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-amber-50/70 p-5 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {language === 'bn' ? 'আনুমানিক ব্যাকআপ সময়' : 'Estimated Backup Time'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-amber-900 dark:text-amber-200">
                  {result.backupFormatted}
                </div>
              </div>

              <div className="text-right text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>
                  {language === 'bn' ? 'সুপারিশকৃত আইপিএস সাইজ:' : 'Recommended Inverter:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {result.recommendedInverterVA} VA
                  </span>
                </div>
                <div>
                  {language === 'bn' ? 'মোট ব্যাটারি শক্তি:' : 'Total Stored Energy:'}{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">{result.totalWh} Wh</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 3. Solar Panel & System Size Calculator
export const SolarSystemCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'solar-system-calc')!;

  const [dailyKwh, setDailyKwh] = useState('6'); // kWh/day
  const [sunHours, setSunHours] = useState('4.5'); // hours/day

  const [specs, setSpecs] = useState<{
    panelWatts: number;
    numberOf350WPanels: number;
    recommendedBatteryAh: number;
  }>({
    panelWatts: 1778,
    numberOf350WPanels: 6,
    recommendedBatteryAh: 400,
  });

  const handleCalculate = () => {
    const kwh = parseFloat(dailyKwh);
    const sh = parseFloat(sunHours);

    if (isNaN(kwh) || isNaN(sh) || kwh <= 0 || sh <= 0) return;

    // Required Watts = (Daily Wh / Sun hours) * 1.33 system loss buffer
    const dailyWh = kwh * 1000;
    const panelWatts = (dailyWh / sh) * 1.33;
    const numberOf350WPanels = Math.ceil(panelWatts / 350);

    // Battery bank recommendation for 1 day autonomy at 12V: (Wh * 0.8) / 12 / 0.8 DoD
    const batteryAh = Math.ceil((dailyWh * 0.6) / 12 / 0.7);

    setSpecs({
      panelWatts: Math.round(panelWatts),
      numberOf350WPanels,
      recommendedBatteryAh: batteryAh,
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Photovoltaic Array Sizing Formula', bn: 'সোলার প্যানেল সাইজ নির্ধারণের সূত্র' },
        expression: 'প্যানেল ওয়াট = (দৈনিক ওয়াট-ঘণ্টা ÷ গড় রোদ ঘণ্টা) × ১.৩৩',
        explanation: {
          en: 'Calculates solar photovoltaic panel capacity factoring in seasonal sun hours and standard 33% balance-of-system losses.',
          bn: 'দৈনিক গড় সূর্যালোক ও সিস্টেম লস বিবেচনা করে কাঙ্ক্ষিত সোলার প্যানেলের মোট ওয়াট নির্ধারণ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'দৈনিক বিদ্যুৎ খরচ (kWh বা ইউনিট)' : 'Daily Energy Use (kWh)'}
            </label>
            <input
              type="number"
              value={dailyKwh}
              onChange={(e) => setDailyKwh(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'গড় পিক রোদ ঘণ্টা (বাংলাদেশ: ৪.৫)' : 'Peak Sun Hours (e.g. 4.5)'}
            </label>
            <input
              type="number"
              step="0.1"
              value={sunHours}
              onChange={(e) => setSunHours(e.target.value)}
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

        {specs && (
          <div className="mt-6 rounded-2xl bg-amber-50/70 p-5 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {language === 'bn' ? 'প্রয়োজনীয় সোলার সিস্টেম' : 'Required Solar Capacity'}
            </span>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'প্যানেল ক্যাপাসিটি' : 'Solar Panel Watts'}
                </span>
                <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
                  {specs.panelWatts} W
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? '৩৫০W প্যানেল সংখ্যা' : '350W Panels Needed'}
                </span>
                <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
                  {specs.numberOf350WPanels} {language === 'bn' ? 'টি' : 'Panels'}
                </div>
              </div>

              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? '১২V ব্যাটারি ব্যাংক' : 'Recommended 12V Battery'}
                </span>
                <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
                  {specs.recommendedBatteryAh} Ah
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
