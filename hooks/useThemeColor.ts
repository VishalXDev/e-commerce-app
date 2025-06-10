import { useColorScheme } from './useColorScheme';

const Colors = {
  light: {
    // Primary Colors
    primary: '#3949ab',
    primaryDark: '#1a237e',
    primaryLight: '#7986cb',
    
    // Secondary Colors
    secondary: '#ff6f00',
    secondaryDark: '#e65100',
    secondaryLight: '#ffb74d',
    
    // Background Colors
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    backgroundTertiary: '#f5f5f5',
    
    // Surface Colors
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    
    // Text Colors
    text: '#212121',
    textSecondary: '#666666',
    textMuted: '#999999',
    textLight: '#cccccc',
    
    // Action Colors
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    
    // Border Colors
    border: '#e0e0e0',
    borderLight: '#f5f5f5',
    borderDark: '#cccccc',
    
    // Other Colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#bdbdbd',
  },
  dark: {
    // Primary Colors
    primary: '#7986cb',
    primaryDark: '#3949ab',
    primaryLight: '#c5cae9',
    
    // Secondary Colors
    secondary: '#ffb74d',
    secondaryDark: '#ff6f00',
    secondaryLight: '#ffe0b2',
    
    // Background Colors
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    backgroundTertiary: '#2d2d2d',
    
    // Surface Colors
    surface: '#1e1e1e',
    surfaceVariant: '#2d2d2d',
    
    // Text Colors
    text: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#999999',
    textLight: '#666666',
    
    // Action Colors
    success: '#66bb6a',
    warning: '#ffb74d',
    error: '#ef5350',
    info: '#42a5f5',
    
    // Border Colors
    border: '#333333',
    borderLight: '#2d2d2d',
    borderDark: '#444444',
    
    // Other Colors
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: '#666666',
  },
};

export type ThemeColors = typeof Colors.light;

export const useThemeColors = (): ThemeColors => {
  const { colorScheme } = useColorScheme();
  return Colors[colorScheme || 'light'];
};

export { Colors };
export default Colors;