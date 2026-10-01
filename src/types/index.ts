export type Language = 'en' | 'bn';

export type Theme = 'light' | 'dark';

export interface LocalizedString {
  en: string;
  bn: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: string;
  calculatorCount?: number;
}

export interface CalculatorMeta {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  keywords: string[];
  isPopular?: boolean;
}

export interface CurrencyRateData {
  base: string;
  rates: Record<string, number>;
  time_last_update_utc?: string;
  success: boolean;
  error?: string;
}
