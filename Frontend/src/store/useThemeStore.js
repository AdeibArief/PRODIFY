import { create } from 'zustand'; // Import the create function from Zustand state management library

export const useThemeStore = create((set) => ({
    // Initialize the theme state:
    // - First tries to get theme from localStorage
    // - If not found, defaults to "night" theme
    theme: localStorage.getItem("preferred-theme") || "night",

    // setTheme function takes a theme parameter and:
    // 1. Saves it to localStorage for persistence across page refreshes
    // 2. Updates the Zustand store state using the 'set' function
    setTheme: (theme) => {
        localStorage.setItem("preferred-theme", theme);
        set({ theme }); // Equivalent to set({ theme: theme })
    }
}));

// This store can be used in components like:
// const { theme, setTheme } = useThemeStore();
// setTheme('light') to change theme


