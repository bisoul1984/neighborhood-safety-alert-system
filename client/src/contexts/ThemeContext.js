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

  // Create theme based on dark mode preference with modern color palette
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00BFA6', // Modern teal accent
        light: '#00D4B8',
        dark: '#00A896',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF6B6B', // Modern coral accent
        light: '#FF8585',
        dark: '#E55A5A',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#FF6B6B',
        light: '#FF8585',
        dark: '#E55A5A',
      },
      warning: {
        main: '#FFB74D',
        light: '#FFC97D',
        dark: '#F57C00',
      },
      success: {
        main: '#00BFA6',
        light: '#00D4B8',
        dark: '#00A896',
      },
      background: {
        default: darkMode ? '#1E1E1E' : '#F5F7FA',
        paper: darkMode ? '#2D2D2D' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#2D2D2D',
        secondary: darkMode ? '#B0BEC5' : '#6B7280',
      },
      divider: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
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
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            padding: '12px 24px',
            boxShadow: '0 4px 12px rgba(0, 191, 166, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(0, 191, 166, 0.3)',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              background: 'linear-gradient(135deg, #00BFA6 0%, #00D4B8 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00A896 0%, #00BFA6 100%)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 8px 32px rgba(0,0,0,0.08)',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode 
                ? '0 12px 40px rgba(0,0,0,0.4)' 
                : '0 12px 40px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
              : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode 
              ? '0 4px 16px rgba(0,0,0,0.2)' 
              : '0 4px 16px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '& fieldset': {
                borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              },
              '&:hover fieldset': {
                borderColor: '#00BFA6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00BFA6',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
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