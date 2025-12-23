// src/theme/theme.ts
export const lightTheme = {
  mode: "light",

  colors: {
    primary: "#6e5fb8",
    secondary: "#ec407a",

    background: "#FAFAFA",
    surface: "#ffffff",

    textPrimary: "#000",
    textSecondary: "#666",

    border: "#dddddd",
    error: "#ff0000",

    info: "#e5f6fd",
    success: "#4caf50",
  },

  ourTheme: {
    bodybg: "#FAFAFA",
    grey: "#666",
    grey400: "#bdbdbd",
    grey300: "#e0e0e0",
    grey200: "#eee",
    grey100: "#f5f5f5",
    stroke: "#dddddd",

    black: "#000",
    white: "#fff",

    orange: "#f2994a",
    purple: "#673AC4",
    lightpurple: "#f0e8fc",

    blue: "#005CFF",
    sky: "#42A3FD",
    lightsky: "#DAEDFF",

    pink: "#BF56A5",
    lightpink: "#FFD9E2",

    green: "#4caf50",
    lightgreen: "#C9F9EF",
  },

  typography: {
    fontFamily: "Roboto",

    h1: 24,
    h2: 20,
    body: 16,
    small: 14,

    button: 15,
    caption: 12,
  },

  spacing: (value: number) => value * 8,

  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
  },

  shadow: {
    paper: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};

export const darkTheme = {
  mode: "dark",

  colors: {
    primary: "#ffffff",
    secondary: "#ffffff",

    background: "#121212",
    surface: "#000000",

    textPrimary: "#ffffff",
    textSecondary: "#cccccc",

    border: "#ffffff1f",
    error: "#ff0000",

    info: "#121212",
    success: "#4caf50",
  },

  ourTheme: {
    bodybg: "#121212",
    grey: "#ffffff",
    grey400: "#000",
    grey300: "#000",
    grey200: "#000",
    grey100: "#383838",
    stroke: "#ffffff1f",

    black: "#fff",
    white: "#000",

    orange: "#f2994a",
    purple: "#fff",
    lightpurple: "#000",

    blue: "#fff",
    sky: "#fff",
    lightsky: "#000",

    pink: "#fff",
    lightpink: "#000",

    green: "#fff",
    lightgreen: "#000",
  },

  typography: {
    fontFamily: "Roboto",

    h1: 24,
    h2: 20,
    body: 16,
    small: 14,

    button: 15,
    caption: 12,
  },

  spacing: (value: number) => value * 8,

  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
  },

  shadow: {
    paper: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.6,
      shadowRadius: 6,
      elevation: 6,
    },
  },
};

export type ThemeType = typeof lightTheme;
