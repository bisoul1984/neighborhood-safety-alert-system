import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to light mode
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Create theme based on dark mode preference with professional dark blue/black color palette
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1E3A8A', // Professional dark blue
        light: '#3B82F6',
        dark: '#1E40AF',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#DC2626', // Professional red
        light: '#EF4444',
        dark: '#B91C1C',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#DC2626',
        light: '#EF4444',
        dark: '#B91C1C',
      },
      warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
      },
      success: {
        main: '#059669',
        light: '#10B981',
        dark: '#047857',
      },
      background: {
        default: darkMode ? '#0F172A' : '#F8FAFC', // Dark blue/black for dark mode
        paper: darkMode ? '#1E293B' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#F1F5F9' : '#0F172A',
        secondary: darkMode ? '#94A3B8' : '#475569',
      },
      divider: darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(71, 85, 105, 0.1)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8, // Reduced from 12 to 8 for more professional look
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '12px 24px',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(30, 58, 138, 0.3)',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0,0,0,0.4)' 
              : '0 8px 32px rgba(0,0,0,0.08)',
            border: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(71, 85, 105, 0.1)'}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode 
                ? '0 12px 40px rgba(0,0,0,0.5)' 
                : '0 12px 40px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(135deg, #1E293B 0%, #334155 100%)'
              : 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(71, 85, 105, 0.1)'}`,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0,0,0,0.4)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: 0, // Remove rounded corners from navbar
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: darkMode 
              ? '0 4px 16px rgba(0,0,0,0.3)' 
              : '0 4px 16px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: darkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(71, 85, 105, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: '#1E3A8A',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1E3A8A',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
    },
  });

  const value = {
    darkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 