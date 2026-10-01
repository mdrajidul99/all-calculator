import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CALCULATORS } from '../data/calculators';
import { Tag, Sparkles, Scale, Check, Copy } from 'lucide-react';

// 1. Discount & Sale Price Calculator
export const DiscountCalculator: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'discount-calculator')!;

  const [originalPrice, setOriginalPrice] = useState('1200');
  const [discountPercent, setDiscountPercent] = useState('25');
  const [extraCoupon, setExtraCoupon] = useState('5');
  const [taxPercent, setTaxPercent] = useState('0');

  const [result, setResult] = useState<{
    finalPrice: number;
    totalSavings: number;
    effectiveDiscount: number;
  }>({
    finalPrice: 855,
    totalSavings: 345,
    effectiveDiscount: 28.75,
  });

  const handleCalculate = () => {
    const orig = parseFloat(originalPrice);
    const d1 = parseFloat(discountPercent) || 0;
    const d2 = parseFloat(extraCoupon) || 0;
    const tax = parseFloat(taxPercent) || 0;

    if (isNaN(orig) || orig <= 0) return;

    // Apply primary discount
    let discounted = orig - (orig * d1) / 100;
    // Apply extra coupon on top
    if (d2 > 0) {
      discounted = discounted - (discounted * d2) / 100;
    }
    // Apply tax
    const finalPrice = discounted + (discounted * tax) / 100;
    const totalSavings = orig - finalPrice;
    const effectiveDiscount = ((orig - discounted) / orig) * 100;

    setResult({
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      totalSavings: parseFloat(totalSavings.toFixed(2)),
      effectiveDiscount: parseFloat(effectiveDiscount.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Discount Formula', bn: 'মূল্যছাড়ের সূত্র' },
        expression: 'Final Price = Original Price × (1 - Discount/100) + Tax',
        explanation: {
          en: 'Applies primary discount followed by compounding secondary promotional coupons and sales tax.',
          bn: 'মূল দাম থেকে প্রাথমিক ছাড় এবং অতিরিক্ত কুপন বাদ দিয়ে প্রযোজ্য ট্যাক্স যোগ করে চূড়ান্ত মূল্য বের করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'মূল মূল্য (Original Price)' : 'Original Price'}
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ছাড়ের শতকরা হার (% Off)' : 'Discount (% Off)'}
            </label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'অতিরিক্ত কুপন / প্রোমো (% Optional)' : 'Extra Coupon (% Optional)'}
            </label>
            <input
              type="number"
              value={extraCoupon}
              onChange={(e) => setExtraCoupon(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'ভ্যাট / সেলস ট্যাক্স (% Optional)' : 'Sales Tax (% Optional)'}
            </label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
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
          <div className="mt-6 rounded-2xl bg-emerald-50/70 p-5 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {language === 'bn' ? 'চূড়ান্ত বিক্রয়মূল্য (Final Price)' : 'Final Price to Pay'}
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300">
                  {result.finalPrice.toLocaleString()}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 font-semibold uppercase">
                  {language === 'bn' ? 'মোট সাশ্রয় (You Save)' : 'Total Savings'}
                </span>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {result.totalSavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500">
                  {result.effectiveDiscount}% {language === 'bn' ? 'সাশ্রয়' : 'saved'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

// 2. Unit Price Comparison Calculator
export const UnitPriceComparison: React.FC = () => {
  const { language, t } = useApp();
  const meta = CALCULATORS.find((c) => c.id === 'unit-price-comparison')!;

  const [priceA, setPriceA] = useState('450');
  const [qtyA, setQtyA] = useState('500');
  const [priceB, setPriceB] = useState('780');
  const [qtyB, setQtyB] = useState('1000');

  const [comparison, setComparison] = useState<{
    unitA: number;
    unitB: number;
    winner: 'A' | 'B' | 'Equal';
    diffPercent: number;
  }>({
    unitA: 0.9,
    unitB: 0.78,
    winner: 'B',
    diffPercent: 13.33,
  });

  const handleCalculate = () => {
    const pA = parseFloat(priceA);
    const qA = parseFloat(qtyA);
    const pB = parseFloat(priceB);
    const qB = parseFloat(qtyB);

    if (isNaN(pA) || isNaN(qA) || isNaN(pB) || isNaN(qB) || qA <= 0 || qB <= 0) return;

    const unitA = pA / qA;
    const unitB = pB / qB;

    let winner: 'A' | 'B' | 'Equal' = 'Equal';
    let diff = 0;

    if (unitA < unitB) {
      winner = 'A';
      diff = ((unitB - unitA) / unitB) * 100;
    } else if (unitB < unitA) {
      winner = 'B';
      diff = ((unitA - unitB) / unitA) * 100;
    }

    setComparison({
      unitA: parseFloat(unitA.toFixed(4)),
      unitB: parseFloat(unitB.toFixed(4)),
      winner,
      diffPercent: parseFloat(diff.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={meta}
      formula={{
        title: { en: 'Unit Price Calculation', bn: 'একক মূল্য হিসাব' },
        expression: 'Unit Price = Total Price / Quantity',
        explanation: {
          en: 'Calculates the cost per single unit (gram, ml, piece) to identify the better commercial value.',
          bn: 'মোট দামকে পরিমাণ দিয়ে ভাগ করে প্রতি একক বা গ্রামের দাম বের করে কোনটি সাশ্রয়ী তা নির্ধারণ করা হয়।',
        },
      }}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Option A */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              {language === 'bn' ? 'পণ্য বা প্যাকেজ ১ (Item A)' : 'Package A'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Price (দাম)</label>
                <input
                  type="number"
                  value={priceA}
                  onChange={(e) => setPriceA(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Quantity (পরিমাণ - g, ml, pcs)</label>
                <input
                  type="number"
                  value={qtyA}
                  onChange={(e) => setQtyA(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Option B */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
              {language === 'bn' ? 'পণ্য বা প্যাকেজ ২ (Item B)' : 'Package B'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Price (দাম)</label>
                <input
                  type="number"
                  value={priceB}
                  onChange={(e) => setPriceB(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Quantity (পরিমাণ - g, ml, pcs)</label>
                <input
                  type="number"
                  value={qtyB}
                  onChange={(e) => setQtyB(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
            </div>
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

        {comparison && (
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {language === 'bn' ? 'তুলনা ও সিদ্ধান্ত' : 'Recommendation'}
                </span>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {comparison.winner === 'Equal'
                    ? language === 'bn'
                      ? 'উভয় প্যাকেজের দাম সমান সুবিধাজনক'
                      : 'Both items offer identical unit value'
                    : language === 'bn'
                    ? `প্যাকেজ ${comparison.winner} কেনা ${comparison.diffPercent}% বেশি সাশ্রয়ী!`
                    : `Package ${comparison.winner} is ${comparison.diffPercent}% cheaper!`}
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>Unit A: <span className="font-bold">{comparison.unitA}</span> per unit</div>
                <div>Unit B: <span className="font-bold">{comparison.unitB}</span> per unit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};
