import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Star,
  Layers,
  Sparkles,
  HelpCircle,
  Home,
  Info,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { CALCULATORS } from '../data/calculators';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    favorites,
    navigateTo,
    currentRoute,
    searchQuery,
    setSearchQuery,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const logoUrl = 'https://pxdrop.online/raw/dauv31q81qec73f6ofi0';

  const handleNav = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  // Close search when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [searchOpen]);

  const filteredCalcList = searchQuery.trim()
    ? CALCULATORS.filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
          c.name.en.toLowerCase().includes(q) ||
          c.name.bn.toLowerCase().includes(q) ||
          c.description.en.toLowerCase().includes(q) ||
          c.description.bn.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNav('/')}
          className="flex cursor-pointer items-center gap-2 sm:gap-2.5 transition-transform hover:opacity-95 shrink-0"
        >
          <img
            src={logoUrl}
            alt="All Calculator Logo"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain shadow-sm border border-slate-200 dark:border-slate-700 bg-white shrink-0"
            onError={(e) => {
              // fallback if network fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="text-base sm:text-lg font-black tracking-tight text-blue-600 dark:text-blue-400 whitespace-nowrap">
            {language === 'bn' ? 'অল ক্যালকুলেটর' : 'All Calculator'}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
          <button
            onClick={() => handleNav('/')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              currentRoute === '/'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="h-4 w-4" />
            {t.navHome}
          </button>

          <button
            onClick={() => handleNav('/categories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              currentRoute.startsWith('/categories')
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            {t.navCategories}
          </button>

          <button
            onClick={() => handleNav('/popular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              currentRoute === '/popular'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            {t.navPopular}
          </button>

          <button
            onClick={() => handleNav('/favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors relative ${
              currentRoute === '/favorites'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
            {t.navFavorites}
            {favorites.length > 0 && (
              <span className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.2 text-[11px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('/how-to-use')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              currentRoute === '/how-to-use'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            {t.navHowToUse}
          </button>
        </nav>

        {/* Right Actions: Search Modal trigger, Language switch, Theme switch, Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Search Button */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-2 sm:px-2.5 sm:py-1.5 text-xs text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 transition"
              title="Search calculators"
              aria-label="Search calculators"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{language === 'bn' ? 'অনুসন্ধান...' : 'Search...'}</span>
            </button>

            {/* Floating Quick Search Dropdown / Mobile Viewport Panel */}
            {searchOpen && (
              <>
                {/* Backdrop on mobile */}
                <div
                  className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px] sm:hidden"
                  onClick={() => setSearchOpen(false)}
                />

                {/* Dropdown / Modal: fully viewport-bounded on phone, clean right-aligned dropdown on desktop */}
                <div className="fixed inset-x-2.5 top-[68px] z-50 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl dark:border-slate-700 dark:bg-slate-800 max-w-lg mx-auto sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:p-2 sm:shadow-xl sm:mx-0">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-700">
                    <Search className="h-4 w-4 text-slate-400 ml-1 shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search query"
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 sm:hidden"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 max-h-[55vh] sm:max-h-60 overflow-y-auto">
                    {filteredCalcList.length > 0 ? (
                      filteredCalcList.map((calc) => (
                        <div
                          key={calc.id}
                          onClick={() => {
                            handleNav(`/calculators/${calc.id}`);
                            setSearchQuery('');
                          }}
                          className="cursor-pointer rounded-lg p-2.5 sm:p-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition flex flex-col active:bg-blue-100 dark:active:bg-blue-900/50"
                        >
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-xs">
                            {calc.name[language]}
                          </span>
                          <span className="line-clamp-1 text-slate-500 dark:text-slate-400 text-xs sm:text-[11px]">
                            {calc.description[language]}
                          </span>
                        </div>
                      ))
                    ) : searchQuery.trim() ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        {t.noResults}
                      </div>
                    ) : (
                      <div className="p-3 text-center text-xs sm:text-[11px] text-slate-400">
                        {language === 'bn'
                          ? 'বয়স, জমি, শতকরা, লোন লিখে খুঁজুন...'
                          : 'Search by Age, Land, Loan, BMI, USDT...'}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language between English and Bangla"
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 sm:px-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition shadow-sm"
          >
            <span className={language === 'en' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-400'}>
              EN
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className={language === 'bn' ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-400'}>
              বাংলা
            </span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="rounded-lg p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-900 md:hidden shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Home className="h-4 w-4 text-blue-500" />
              {t.navHome}
            </button>

            <button
              onClick={() => handleNav('/categories')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Layers className="h-4 w-4 text-indigo-500" />
              {t.navCategories}
            </button>

            <button
              onClick={() => handleNav('/popular')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              {t.navPopular}
            </button>

            <button
              onClick={() => handleNav('/favorites')}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
                {t.navFavorites}
              </div>
              {favorites.length > 0 && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('/how-to-use')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <HelpCircle className="h-4 w-4 text-emerald-500" />
              {t.navHowToUse}
            </button>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2 space-y-1">
              <button
                onClick={() => handleNav('/about')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Info className="h-3.5 w-3.5" />
                {t.navAbout}
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Mail className="h-3.5 w-3.5" />
                {t.navContact}
              </button>
              <button
                onClick={() => handleNav('/privacy-policy')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.privacyPolicy}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
