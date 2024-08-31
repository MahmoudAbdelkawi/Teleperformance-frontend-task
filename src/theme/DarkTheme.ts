import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DARK: ThemeTypes = {
    name: 'DARK',
    dark: true,
    variables: {
        'border-color': '#333F55'
    },
    colors: {
        primary: '#5e244d',
        secondary: '#ff5c8e',
        info: '#539BFF',
        success: '#13DEB9',
        accent: '#FA896B',
        warning: '#FFAE1F',
        error: '#FA896B',
        lightprimary: '#fce6ed',
        lightsecondary: '#0C4339',
        lightsuccess: '#1B3C48',
        lighterror: '#4B313D',
        lightwarning: '#4D3A2A',
        textPrimary: '#EAEFF4',
        textSecondary: '#7C8FAC',
        borderColor: '#333F55',
        inputBorder: '#465670',
        containerBg: '#171c23',
        background: '#171c23',
        hoverColor: '#333f55',
        surface: '#171c23',
        'on-surface-variant': '#171c23',
        grey100: '#333F55',
        grey200: '#465670'
    }
};

export { DARK };
