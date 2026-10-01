import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (calculatorId: string) => void;
  isFavorite: (calculatorId: string) => boolean;
  recentlyUsed: string[];
  addRecentlyUsed: (calculatorId: string) => void;
  currentRoute: string;
  navigateTo: (route: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  t: typeof TRANSLATIONS.en;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language State
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('allcalc_lang');
      if (saved === 'en' || saved === 'bn') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('allcalc_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  // Theme State
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('allcalc_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('allcalc_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('allcalc_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (calculatorId: string) => {
    setFavorites(prev => {
      const next = prev.includes(calculatorId)
        ? prev.filter(id => id !== calculatorId)
        : [...prev, calculatorId];
      try {
        localStorage.setItem('allcalc_favs', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isFavorite = (calculatorId: string) => favorites.includes(calculatorId);

  // Recently Used
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('allcalc_recents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addRecentlyUsed = (calculatorId: string) => {
    setRecentlyUsed(prev => {
      const filtered = prev.filter(id => id !== calculatorId);
      const updated = [calculatorId, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('allcalc_recents', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Routing (Hash-based so it works seamlessly in AI Studio iframe and standalone browser)
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentRoute(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    window.location.hash = cleanRoute;
    setCurrentRoute(cleanRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyUsed,
        addRecentlyUsed,
        currentRoute,
        navigateTo,
        searchQuery,
        setSearchQuery,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
