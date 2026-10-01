import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

type UnitCategory =
  | 'length'
  | 'weight'
  | 'area'
  | 'volume'
  | 'temperature'
  | 'speed'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'data';

interface UnitDef {
  id: string;
  name: { en: string; bn: string };
  factor: number; // conversion factor to standard base unit
}

const UNIT_DATA: Record<UnitCategory, { title: { en: string; bn: string }; base: string; units: UnitDef[] }> = {
  length: {
    title: { en: 'Length & Distance', bn: 'দৈর্ঘ্য ও দূরত্ব' },
    base: 'meter',
    units: [
      { id: 'meter', name: { en: 'Meter (m)', bn: 'মিটার (m)' }, factor: 1 },
      { id: 'kilometer', name: { en: 'Kilometer (km)', bn: 'কিলোমিটার (km)' }, factor: 1000 },
      { id: 'centimeter', name: { en: 'Centimeter (cm)', bn: 'সেন্টিমিটার (cm)' }, factor: 0.01 },
      { id: 'millimeter', name: { en: 'Millimeter (mm)', bn: 'মিলিমিটার (mm)' }, factor: 0.001 },
      { id: 'foot', name: { en: 'Foot (ft)', bn: 'ফুট (ft)' }, factor: 0.3048 },
      { id: 'inch', name: { en: 'Inch (in)', bn: 'ইঞ্চি (in)' }, factor: 0.0254 },
      { id: 'yard', name: { en: 'Yard (yd)', bn: 'গজ (yd)' }, factor: 0.9144 },
      { id: 'mile', name: { en: 'Mile (mi)', bn: 'মাইল (mi)' }, factor: 1609.344 },
    ],
  },
  weight: {
    title: { en: 'Weight & Mass', bn: 'ওজন ও ভর' },
    base: 'kilogram',
    units: [
      { id: 'kilogram', name: { en: 'Kilogram (kg)', bn: 'কিলোগ্রাম (kg)' }, factor: 1 },
      { id: 'gram', name: { en: 'Gram (g)', bn: 'গ্রাম (g)' }, factor: 0.001 },
      { id: 'milligram', name: { en: 'Milligram (mg)', bn: 'মিলিগ্রাম (mg)' }, factor: 0.000001 },
      { id: 'ton', name: { en: 'Metric Ton (t)', bn: 'মেট্রিক টন (t)' }, factor: 1000 },
      { id: 'pound', name: { en: 'Pound (lb)', bn: 'পাউন্ড (lb)' }, factor: 0.45359237 },
      { id: 'ounce', name: { en: 'Ounce (oz)', bn: 'আউন্স (oz)' }, factor: 0.02834952 },
    ],
  },
  area: {
    title: { en: 'Area', bn: 'ক্ষেত্রফল' },
    base: 'sqm',
    units: [
      { id: 'sqm', name: { en: 'Square Meter (m²)', bn: 'বর্গমিটার (m²)' }, factor: 1 },
      { id: 'sqft', name: { en: 'Square Foot (ft²)', bn: 'বর্গফুট (ft²)' }, factor: 0.092903 },
      { id: 'sqyd', name: { en: 'Square Yard', bn: 'বর্গগজ' }, factor: 0.836127 },
      { id: 'acre', name: { en: 'Acre', bn: 'একর' }, factor: 4046.86 },
      { id: 'hectare', name: { en: 'Hectare (ha)', bn: 'হেক্টর' }, factor: 10000 },
      { id: 'sqkm', name: { en: 'Square Kilometer (km²)', bn: 'বর্গকিলোমিটার' }, factor: 1000000 },
      { id: 'decimal', name: { en: 'Decimal / Shotok', bn: 'শতাংশ / ডেসিমেল' }, factor: 40.4686 },
    ],
  },
  volume: {
    title: { en: 'Volume & Liquid', bn: 'আয়তন ও তরল' },
    base: 'liter',
    units: [
      { id: 'liter', name: { en: 'Liter (L)', bn: 'লিটার (L)' }, factor: 1 },
      { id: 'milliliter', name: { en: 'Milliliter (mL)', bn: 'মিলিলিটার (mL)' }, factor: 0.001 },
      { id: 'cubic_meter', name: { en: 'Cubic Meter (m³)', bn: 'ঘনমিটার (m³)' }, factor: 1000 },
      { id: 'gallon_us', name: { en: 'US Gallon (gal)', bn: 'ইউএস গ্যালন' }, factor: 3.78541 },
      { id: 'cup', name: { en: 'Cup', bn: 'কাপ' }, factor: 0.24 },
      { id: 'fl_oz', name: { en: 'Fluid Ounce (fl oz)', bn: 'ফ্লুইড আউন্স' }, factor: 0.0295735 },
    ],
  },
  temperature: {
    title: { en: 'Temperature', bn: 'তাপমাত্রা' },
    base: 'celsius',
    units: [
      { id: 'celsius', name: { en: 'Celsius (°C)', bn: 'সেলসিয়াস (°C)' }, factor: 1 },
      { id: 'fahrenheit', name: { en: 'Fahrenheit (°F)', bn: 'ফারেনহাইট (°F)' }, factor: 1 },
      { id: 'kelvin', name: { en: 'Kelvin (K)', bn: 'কেলভিন (K)' }, factor: 1 },
    ],
  },
  speed: {
    title: { en: 'Speed', bn: 'গতি ও দ্রুতি' },
    base: 'mps',
    units: [
      { id: 'mps', name: { en: 'Meters/second (m/s)', bn: 'মিটার/সেকেন্ড (m/s)' }, factor: 1 },
      { id: 'kmph', name: { en: 'Kilometers/hour (km/h)', bn: 'কিলোমিটার/ঘণ্টা (km/h)' }, factor: 0.277778 },
      { id: 'mph', name: { en: 'Miles/hour (mph)', bn: 'মাইল/ঘণ্টা (mph)' }, factor: 0.44704 },
      { id: 'knot', name: { en: 'Knot (kn)', bn: 'নট (kn)' }, factor: 0.514444 },
    ],
  },
  pressure: {
    title: { en: 'Pressure', bn: 'চাপ' },
    base: 'pascal',
    units: [
      { id: 'pascal', name: { en: 'Pascal (Pa)', bn: 'প্যাসকেল (Pa)' }, factor: 1 },
      { id: 'bar', name: { en: 'Bar', bn: 'বার' }, factor: 100000 },
      { id: 'psi', name: { en: 'PSI (lbf/in²)', bn: 'পিএসআই (PSI)' }, factor: 6894.76 },
      { id: 'atm', name: { en: 'Standard Atmosphere (atm)', bn: 'বায়ুমণ্ডলীয় চাপ (atm)' }, factor: 101325 },
    ],
  },
  energy: {
    title: { en: 'Energy', bn: 'শক্তি ও কাজ' },
    base: 'joule',
    units: [
      { id: 'joule', name: { en: 'Joule (J)', bn: 'জুল (J)' }, factor: 1 },
      { id: 'kilojoule', name: { en: 'Kilojoule (kJ)', bn: 'কিলোজুল (kJ)' }, factor: 1000 },
      { id: 'calorie', name: { en: 'Calorie (cal)', bn: 'ক্যালোরি' }, factor: 4.184 },
      { id: 'kilocalorie', name: { en: 'Kilocalorie (kcal)', bn: 'কিলোক্যালোরি' }, factor: 4184 },
      { id: 'kwh', name: { en: 'Kilowatt-hour (kWh)', bn: 'কিলোওয়াট-ঘণ্টা (kWh)' }, factor: 3600000 },
    ],
  },
  power: {
    title: { en: 'Power', bn: 'ক্ষমতা' },
    base: 'watt',
    units: [
      { id: 'watt', name: { en: 'Watt (W)', bn: 'ওয়াট (W)' }, factor: 1 },
      { id: 'kilowatt', name: { en: 'Kilowatt (kW)', bn: 'কিলোওয়াট (kW)' }, factor: 1000 },
      { id: 'horsepower', name: { en: 'Horsepower (hp)', bn: 'হর্সপাওয়ার (hp)' }, factor: 745.7 },
    ],
  },
  data: {
    title: { en: 'Data Storage', bn: 'ডাটা স্টোরেজ' },
    base: 'byte',
    units: [
      { id: 'byte', name: { en: 'Byte (B)', bn: 'বাইট (B)' }, factor: 1 },
      { id: 'kilobyte', name: { en: 'Kilobyte (KB)', bn: 'কিলোবাইট (KB)' }, factor: 1024 },
      { id: 'megabyte', name: { en: 'Megabyte (MB)', bn: 'মেগাবাইট (MB)' }, factor: 1048576 },
      { id: 'gigabyte', name: { en: 'Gigabyte (GB)', bn: 'গিগাবাইট (GB)' }, factor: 1073741824 },
      { id: 'terabyte', name: { en: 'Terabyte (TB)', bn: 'টেরাবাইট (TB)' }, factor: 1099511627776 },
    ],
  },
};

export const UniversalUnitConverter: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'unit-converter-all')!;

  const [category, setCategory] = useState<UnitCategory>('length');
  const [valFrom, setValFrom] = useState('10');
  const [unitFrom, setUnitFrom] = useState('meter');
  const [unitTo, setUnitTo] = useState('foot');
  const [copied, setCopied] = useState(false);

  const activeCategory = UNIT_DATA[category];

  // Convert
  const convert = (val: number, from: string, to: string): number => {
    if (category === 'temperature') {
      let celsius = val;
      if (from === 'fahrenheit') celsius = ((val - 32) * 5) / 9;
      else if (from === 'kelvin') celsius = val - 273.15;

      if (to === 'celsius') return celsius;
      if (to === 'fahrenheit') return (celsius * 9) / 5 + 32;
      if (to === 'kelvin') return celsius + 273.15;
      return celsius;
    }

    const uFrom = activeCategory.units.find((u) => u.id === from);
    const uTo = activeCategory.units.find((u) => u.id === to);
    if (!uFrom || !uTo) return 0;

    const baseValue = val * uFrom.factor;
    return baseValue / uTo.factor;
  };

  const parsedVal = parseFloat(valFrom) || 0;
  const result = parseFloat(convert(parsedVal, unitFrom, unitTo).toFixed(6));

  const handleSwap = () => {
    const temp = unitFrom;
    setUnitFrom(unitTo);
    setUnitTo(temp);
  };

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const units = UNIT_DATA[newCat].units;
    setUnitFrom(units[0].id);
    setUnitTo(units[1] ? units[1].id : units[0].id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Dimensional Unit Scaling', bn: 'পরিমাপক একক রূপান্তর সূত্র' },
        expression: 'Target = (Input × Factor[From]) / Factor[To]',
        explanation: {
          en: 'Calculates mathematically exact dimensional conversions using international metric, imperial, and local standards.',
          bn: 'আন্তর্জাতিক মেট্রিক এবং প্রচলিত পরিমাপক ফ্যাক্টরের মাধ্যমে নিখুঁত গাণিতিক রূপান্তর সম্পন্ন করে।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Category Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {(Object.keys(UNIT_DATA) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {UNIT_DATA[cat].title[language]}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মান (Value)' : 'Value'}
            </label>
            <input
              type="number"
              value={valFrom}
              onChange={(e) => setValFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">From</label>
            <select
              value={unitFrom}
              onChange={(e) => setUnitFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              {activeCategory.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name[language]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              onClick={handleSwap}
              className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
              title="Swap"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">To</label>
            <select
              value={unitTo}
              onChange={(e) => setUnitTo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              {activeCategory.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase">
                {language === 'bn' ? 'রূপান্তরিত মান' : 'Converted Value'}
              </span>
              <div className="mt-1 text-3xl font-black text-blue-600 dark:text-blue-400">
                {result.toLocaleString()}{' '}
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">
                  {activeCategory.units.find((u) => u.id === unitTo)?.name[language]}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? t.copied : t.copyResult}</span>
            </button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
