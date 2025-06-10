import { useEffect, useState } from 'react';

export interface ColorSchemeHook {
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  isLight: boolean;
  toggleColorScheme: () => void;
}

export default function useColorScheme(): ColorSchemeHook {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('color-scheme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setColorScheme(savedTheme);
    } else if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
      
      // Listen for changes in system preference
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('color-scheme')) {
          setColorScheme(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    localStorage.setItem('color-scheme', newScheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newScheme);
  };

  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';

  // Apply theme to document on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme);
  }, [colorScheme]);

  return {
    colorScheme,
    isDark,
    isLight,
    toggleColorScheme,
  };
}