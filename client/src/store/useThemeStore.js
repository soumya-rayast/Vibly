import { create } from 'zustand';
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("vibly-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("vibly-theme", theme);
    set({ theme });
  },
}));