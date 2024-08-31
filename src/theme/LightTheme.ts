import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DEFAULT: ThemeTypes = {
    name: 'DEFAULT',
    dark: false,
    variables: {
        'border-color': '#e5eaef'
    },
    colors: {
        primary: '#5e244d',
        secondary: '#ff5c8e',
        info: '#539BFF',
        success: '#05b187',
        accent: '#FFAB91',
        warning: '#FFAE1F',
        error: '#FA896B',
        lightprimary: '#fce6ed',
        lightsecondary: '#EDFBF7',
        lightsuccess: '#E6FFFA',
        lighterror: '#FDEDE8',
        lightwarning: '#FEF5E5',
        textPrimary: '#2A3547',
        textSecondary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        background: '#f6f6f6',
        hoverColor: '#f6f9fc',
        surface: '#fff',
        'on-surface-variant': '#fff',
        grey100: '#F2F6FA',
        grey: '#808080',
        grey200: '#EAEFF4'
    }
};

export { DEFAULT };
