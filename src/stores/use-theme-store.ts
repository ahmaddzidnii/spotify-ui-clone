import { create } from "zustand";

interface ThemeState {
  dominantColor: string;
  dominantColorDark: string;
  setDominantColor: (color: string, darkColor: string) => void;
}

const DEFAULT_COLOR = "rgb(83, 83, 83)";
const DEFAULT_COLOR_DARK = "rgb(83, 35, 83)";

export const useThemeStore = create<ThemeState>((set) => ({
  dominantColor: DEFAULT_COLOR,
  dominantColorDark: DEFAULT_COLOR_DARK,

  setDominantColor: (color: string, darkColor: string) =>
    set({
      dominantColor: color,
      dominantColorDark: darkColor,
    }),
}));
