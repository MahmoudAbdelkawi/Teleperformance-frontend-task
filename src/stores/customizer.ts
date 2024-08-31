import { defineStore } from 'pinia';

const colors = [
    { id: 1, name: 'Gray', value: 'gray' },
    { id: 2, name: 'Red', value: 'red' },
    { id: 2, name: 'Yellow', value: 'yellow' },
    { id: 2, name: 'Orange', value: 'orange' },
    { id: 2, name: 'Green', value: 'green' },
    { id: 2, name: 'Teal', value: 'teal' },
    { id: 2, name: 'Blue', value: 'blue' },
    { id: 2, name: 'Indigo', value: 'indigo' },
    { id: 2, name: 'Purple', value: 'purple' },
    { id: 2, name: 'Pink', value: 'pink' }
];

export const useCustomizerStore = defineStore({
    id: 'customizer',
    state: () => ({
        Sidebar_drawer: true,
        Customizer_drawer: false,
        mini_sidebar: false,
        setHorizontalLayout: false, // Horizontal layout
        actTheme: 'DARK',
        inputBg: 'DARK',
        boxed: true,
        size_of_logo_on_expand: 98,
        expand_on_hover: false,
        setBorderCard: false,
        overview_calendar_color: 'gray',
        colors
    }),

    getters: {},
    actions: {
        SET_SIDEBAR_DRAWER() {
            this.Sidebar_drawer = !this.Sidebar_drawer;
        },
        SET_MINI_SIDEBAR(payload: any) {
            this.mini_sidebar = payload;
        },
        SET_CUSTOMIZER_DRAWER(payload: any) {
            this.Customizer_drawer = payload;
        },

        SET_LAYOUT(payload: any) {
            this.setHorizontalLayout = payload;
        },
        SET_THEME(payload: any) {
            this.actTheme = payload;
        },
        SET_CARD_BORDER(payload: any) {
            this.setBorderCard = payload;
        }
    }
});
