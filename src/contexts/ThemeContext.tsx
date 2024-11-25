// src/contexts/ThemeContext.tsx
import React from 'react';
export const ThemeContext = React.createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});
