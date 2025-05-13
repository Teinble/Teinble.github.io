export const colors = {
    // Primary colors
    primary: {
        main: '#2563eb', // Blue 600
        light: '#60a5fa', // Blue 400
        dark: '#1d4ed8',  // Blue 700
    },
    // Background colors
    background: {
        light: '#ffffff',
        dark: '#1a1a1a',
    },
    // Text colors
    text: {
        light: '#1f2937', // Gray 800
        dark: '#f3f4f6',  // Gray 100
        gray: '#6b7280',
    },
    // Border colors
    border: {
        light: '#e5e7eb', // Gray 200
        dark: '#374151',  // Gray 700
    },
    // Hover states
    hover: {
        light: '#f3f4f6', // Gray 100
        dark: '#374151',  // Gray 700
    }
} as const;

export type ThemeColors = typeof colors; 