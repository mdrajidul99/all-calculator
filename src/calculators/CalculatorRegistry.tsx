import React from 'react';
import { BasicScientificCalc } from './BasicScientificCalc';
import {
  PercentageCalculator,
  PercentageChangeCalculator,
  FractionCalculator,
  AverageCalculator,
  QuadraticEquationSolver,
} from './MathCalculators';
import {
  EMICalculator,
  InterestCalculator,
  SIPCalculator,
  ProfitLossCalculator,
  SalaryCalculator,
} from './FinanceCalculators';
import { UniversalCurrencyConverter } from './CurrencyConverter';
import { DiscountCalculator, UnitPriceComparison } from './ShoppingCalculators';
import { AgeCalculator, DateDifferenceCalculator } from './DateTimeCalculators';
import { UniversalUnitConverter } from './UnitConverter';
import {
  LandAreaCalculator,
  BangladeshLandUnitsConverter,
  TriangleLandArea,
} from './LandCalculators';
import { BMICalculator, BMRCalorieCalculator } from './HealthCalculators';
import { GPACalculator, AttendanceCalculator } from './EducationCalculators';
import { FuelCostCalculator } from './VehicleCalculators';
import { ElectricityBillCalculator } from './HomeCalculators';
import { ConcreteMixCalculator, RebarSteelCalculator } from './ConstructionCalculators';
import {
  OhmsLawCalculator,
  BatteryBackupCalculator,
  SolarSystemCalculator,
} from './ElectricityCalculators';
import { ProfitMarginMarkupCalculator } from './BusinessCalculators';
import { DownloadTimeCalculator } from './DigitalCalculators';
import { RecipeScalingCalculator } from './FoodCookingCalculators';
import { PhysicsMotionCalculator } from './ScienceCalculators';

interface CalculatorRegistryProps {
  calculatorId: string;
}

export const CalculatorRegistry: React.FC<CalculatorRegistryProps> = ({ calculatorId }) => {
  switch (calculatorId) {
    // Math & Basic
    case 'basic-calculator':
      return <BasicScientificCalc />;
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'percentage-change':
      return <PercentageChangeCalculator />;
    case 'fraction-calculator':
      return <FractionCalculator />;
    case 'ratio-proportion':
      return <FractionCalculator />;
    case 'average-calculator':
    case 'standard-deviation':
      return <AverageCalculator />;
    case 'roots-exponents':
    case 'gcd-lcm-factorial':
    case 'permutation-combination':
      return <BasicScientificCalc />;
    case 'quadratic-equation':
      return <QuadraticEquationSolver />;

    // Finance & Money
    case 'emi-calculator':
    case 'loan-calculator':
    case 'debt-payoff':
      return <EMICalculator />;
    case 'simple-compound-interest':
      return <InterestCalculator />;
    case 'investment-sip':
    case 'savings-goal':
      return <SIPCalculator />;
    case 'profit-loss':
      return <ProfitLossCalculator />;
    case 'salary-calculator':
      return <SalaryCalculator />;
    case 'tip-bill-split':
      return <DiscountCalculator />;

    // Currency & Exchange
    case 'currency-converter':
      return <UniversalCurrencyConverter isUsdtSpecific={false} />;
    case 'usdt-to-bdt':
      return <UniversalCurrencyConverter isUsdtSpecific={true} />;

    // Shopping & Discount
    case 'discount-calculator':
      return <DiscountCalculator />;
    case 'unit-price-comparison':
      return <UnitPriceComparison />;

    // Date, Age & Time
    case 'age-calculator':
      return <AgeCalculator />;
    case 'date-difference':
    case 'date-add-subtract':
    case 'working-days':
      return <DateDifferenceCalculator />;

    // Unit Converter
    case 'unit-converter-all':
      return <UniversalUnitConverter />;

    // Land & Property
    case 'land-area-calculator':
    case 'irregular-land-area':
    case 'land-price-share':
      return <LandAreaCalculator />;
    case 'bangladesh-land-units':
      return <BangladeshLandUnitsConverter />;
    case 'triangle-land-area':
      return <TriangleLandArea />;

    // Health & Fitness
    case 'bmi-calculator':
    case 'water-ideal-weight':
      return <BMICalculator />;
    case 'bmr-calorie-calculator':
    case 'target-heart-rate':
      return <BMRCalorieCalculator />;

    // Education & Student
    case 'gpa-calculator':
    case 'cgpa-calculator':
    case 'marks-percentage':
      return <GPACalculator />;
    case 'attendance-calculator':
      return <AttendanceCalculator />;

    // Vehicle & Travel
    case 'fuel-cost-calculator':
    case 'mileage-calculator':
      return <FuelCostCalculator />;

    // Home & Household
    case 'electricity-bill-calc':
      return <ElectricityBillCalculator />;
    case 'paint-tile-flooring':
      return <ConcreteMixCalculator />;

    // Construction
    case 'concrete-cement-sand':
    case 'brick-plaster-calc':
      return <ConcreteMixCalculator />;
    case 'rebar-steel-weight':
      return <RebarSteelCalculator />;

    // Electricity & Energy
    case 'ohms-law-power':
      return <OhmsLawCalculator />;
    case 'battery-backup-time':
      return <BatteryBackupCalculator />;

    // Solar & Battery
    case 'solar-system-calc':
      return <SolarSystemCalculator />;

    // Business
    case 'profit-margin-markup':
    case 'break-even-calculator':
      return <ProfitMarginMarkupCalculator />;

    // Computer & Digital
    case 'download-upload-time':
    case 'aspect-ratio-calc':
      return <DownloadTimeCalculator />;

    // Food & Cooking
    case 'recipe-scaling':
      return <RecipeScalingCalculator />;

    // Science & Engineering
    case 'physics-motion-force':
    case 'density-pressure-work':
      return <PhysicsMotionCalculator />;

    default:
      return <BasicScientificCalc />;
  }
};
