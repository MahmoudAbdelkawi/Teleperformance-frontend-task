import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import { BLUE_THEME} from '@/theme/LightTheme';
import { DEFAULT } from '@/theme/LightTheme';
import { DARK } from '@/theme/DarkTheme';

export default createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'DEFAULT',
        themes: {
            DARK,
            DEFAULT
        }
    },
    locale: {
        rtl: {
            ar: true
        }
    },
    defaults: {
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VListItem: {
            minHeight: '45px'
        },
        VTooltip: {
            location: 'top'
        }
    }
});
