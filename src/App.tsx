import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { PopularPage, FavoritesPage } from './pages/PopularPage';
import {
  AboutPage,
  HowToUsePage,
  PrivacyPolicyPage,
  TermsPage,
  DisclaimerPage,
  ContactPage,
} from './pages/StaticPages';
import { CalculatorRegistry } from './calculators/CalculatorRegistry';
import { CALCULATORS } from './data/calculators';
import { CATEGORIES } from './data/categories';

const MainContent: React.FC = () => {
  const { currentRoute, language } = useApp();

  // Route Dispatcher
  const renderCurrentView = () => {
    // 1. Home
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }

    // 2. Specific Calculator: /calculators/:id
    if (currentRoute.startsWith('/calculators/')) {
      const calcId = currentRoute.replace('/calculators/', '').split('?')[0];
      return <CalculatorRegistry calculatorId={calcId} />;
    }

    // 3. Category Page or Specific Category: /categories/:id
    if (currentRoute.startsWith('/categories')) {
      const catId = currentRoute.replace('/categories/', '').replace('/categories', '').split('?')[0];
      return <CategoriesPage categoryId={catId || undefined} />;
    }

    // 4. Popular
    if (currentRoute === '/popular') {
      return <PopularPage />;
    }

    // 5. Favorites
    if (currentRoute === '/favorites') {
      return <FavoritesPage />;
    }

    // 6. Static informational pages
    if (currentRoute === '/how-to-use') {
      return <HowToUsePage />;
    }
    if (currentRoute === '/about') {
      return <AboutPage />;
    }
    if (currentRoute === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (currentRoute === '/terms') {
      return <TermsPage />;
    }
    if (currentRoute === '/disclaimer') {
      return <DisclaimerPage />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }

    // Fallback to Home
    return <HomePage />;
  };

  // Sync document title and OpenGraph metadata dynamically based on current route
  useEffect(() => {
    if (currentRoute.startsWith('/calculators/')) {
      const calcId = currentRoute.replace('/calculators/', '').split('?')[0];
      const calc = CALCULATORS.find((c) => c.id === calcId);
      if (calc) {
        document.title = `${calc.name[language]} – All Calculator`;
        return;
      }
    } else if (currentRoute.startsWith('/categories/')) {
      const catId = currentRoute.replace('/categories/', '').split('?')[0];
      const cat = CATEGORIES.find((c) => c.id === catId);
      if (cat) {
        document.title = `${cat.name[language]} – All Calculator`;
        return;
      }
    }

    document.title =
      language === 'bn'
        ? 'অল ক্যালকুলেটর – গণিত, অর্থ, জমি ও স্বাস্থ্যের ফ্রি ক্যালকুলেটর'
        : 'All Calculator – Free Online Calculators for Math, Finance, Land, Health & More';
  }, [currentRoute, language]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">{renderCurrentView()}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
