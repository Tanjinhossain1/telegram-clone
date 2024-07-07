"use client"
// ThemeContext.js
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@/theme';

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }:any) => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme) {
      setThemeMode(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
