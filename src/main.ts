import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import VCalendar from 'v-calendar';
import VueScrollTo from 'vue-scrollto';
import '@/scss/style.scss';
import 'v-calendar/style.css';
import { createI18n } from 'vue-i18n';
import messages from '@/utils/locales/messages';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

const i18n = createI18n({
    locale: 'en',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    legacy: false
});

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(VCalendar, {});
app.use(VueTablerIcons);

app.use(i18n);
app.use(VueApexCharts);

app.use(vuetify).mount('#app');
//ScrollTop Use
// app.use(VueScrollTo);
app.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease'
});

export { i18n };
