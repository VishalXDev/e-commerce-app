import { useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export interface ColorSchemeHook {
  colorScheme: 'light' | 'dark' | null;
  isDark: boolean;
  isLight: boolean;
  toggleColorScheme?: () => void;
}

export function useColorScheme(): ColorSchemeHook {
  const nativeColorScheme = useNativeColorScheme();
  const [manualColorScheme, setManualColorScheme] = useState<'light' | 'dark' | null>(null);

  // Ensure colorScheme is always 'light', 'dark', or null
  const normalizedNativeColorScheme: 'light' | 'dark' | null =
    nativeColorScheme === 'light' || nativeColorScheme === 'dark'
      ? nativeColorScheme
      : null;

  const colorScheme = manualColorScheme || normalizedNativeColorScheme;

  const isDark = colorScheme === 'dark';
  const isLight = colorScheme === 'light';
  
  const toggleColorScheme = () => {
    setManualColorScheme(current => {
      if (current === null) {
        return nativeColorScheme === 'dark' ? 'light' : 'dark';
      }
      return current === 'dark' ? 'light' : 'dark';
    });
  };
  
  return {
    colorScheme,
    isDark,
    isLight,
    toggleColorScheme,
  };
}