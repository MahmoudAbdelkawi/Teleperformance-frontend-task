import { computed } from 'vue';
import * as themeColors from '@/theme/LightTheme';
import * as DarkThemeColors from '@/theme/DarkTheme';
import { useCustomizerStore } from '@/stores/customizer';

const custmizer = useCustomizerStore();

const getPrimary = computed(() => {
    if (custmizer.actTheme === 'DEFAULT') {
        return themeColors.DEFAULT.colors.primary;
    } else if (custmizer.actTheme === 'DARK') {
        return DarkThemeColors.DARK.colors.primary;
    }
});

const getLightPrimary = computed(() => {
    if (custmizer.actTheme === 'DEFAULT') {
        return themeColors.DEFAULT.colors.lightprimary;
    }
    if (custmizer.actTheme === 'DARK') {
        return DarkThemeColors.DARK.colors.lightprimary;
    }
});

const getSecondary = computed(() => {
    if (custmizer.actTheme === 'DEFAULT') {
        return themeColors.DEFAULT.colors.secondary;
    } else if (custmizer.actTheme === 'DARK') {
        return DarkThemeColors.DARK.colors.secondary;
    }
});

const getLightSecondary = computed(() => {
    if (custmizer.actTheme === 'DEFAULT') {
        return themeColors.DEFAULT.colors.lightsecondary;
    }
    if (custmizer.actTheme === 'DARK') {
        return DarkThemeColors.DARK.colors.lightsecondary;
    }
});

export { getPrimary, getSecondary, getLightPrimary, getLightSecondary };
