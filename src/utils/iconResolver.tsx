import React from 'react';
import {
  Calculator,
  Coins,
  ArrowLeftRight,
  ShoppingBag,
  Calendar,
  Scale,
  MapPin,
  HeartPulse,
  GraduationCap,
  Car,
  Home,
  HardHat,
  Zap,
  Sun,
  Briefcase,
  Monitor,
  UtensilsCrossed,
  Atom,
  Layers,
  Type,
  Binary,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  Coins,
  ArrowLeftRight,
  ShoppingBag,
  Calendar,
  Scale,
  MapPin,
  HeartPulse,
  GraduationCap,
  Car,
  Home,
  HardHat,
  Zap,
  Sun,
  Briefcase,
  Monitor,
  UtensilsCrossed,
  Atom,
  Layers,
  Type,
  Binary,
};

export const getCategoryIcon = (iconName: string): LucideIcon => {
  return ICON_MAP[iconName] || Calculator;
};
