import React, { createContext, useState } from 'react';

// ThemeContext oluşturuyoruz
export const ThemeContext = createContext();

/**
 * ThemeProvider bileşeni
 * 
 * Bu bileşen, tema durumunu (açık/koyu) ve tema değiştirme fonksiyonunu
 * alt bileşenlere sağlar.
 * 
 * @param {object} props - Bileşen özellikleri
 * @param {React.ReactNode} props.children - Alt bileşenler
 */
export const ThemeProvider = ({ children }) => {
  // Tema durumunu tutacak state
  const [darkMode, setDarkMode] = useState(false);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context değeri olarak tema durumu ve değiştirme fonksiyonunu sağlıyoruz
  const themeContextValue = {
    darkMode,
    toggleTheme
  };
// darkMode state'ini ve stati değiştiren toggleTheme fonksiyonunu alt bileşenlere sağlar
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 