// src/theme/ThemeProviderCustom.tsx
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from "react-native-paper";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme as customLight, darkTheme as customDark, ThemeType } from "./theme";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const theme = isDarkMode ? customDark : customLight;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeCustom must be used within ThemeProviderCustom");
  return context;
};
