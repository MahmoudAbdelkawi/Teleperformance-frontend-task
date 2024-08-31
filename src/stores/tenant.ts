import {defineStore} from "pinia";
import axios from "@/utils/axios";
import {getTheme, getUserTenants} from "@/api/config";

export const useTenantStore = defineStore({
    id: 'tenant',
    state: () => ({
        tenantId: '',
        tenantConfig: {
            logo: '',
            companyName: '',
            slogan: '',
            light: {
                primary: '',
                secondary: '',
                info: '',
                success: '',
                accent: ''
            },
            dark: {
                primary: '',
                secondary: '',
                info: '',
                success: '',
                accent: ''
            },
        }
    }),

    getters: {},
    actions: {
        async FETCH_THEME() {
            try {
                const data =  await getTheme()
                Object.assign(this.tenantConfig, data)
            } catch (error) {
                return Promise.reject(error)
            }

        },
        async GET_USER_TENANTS() {
            try {
                const data =  await getUserTenants()
                return data
            } catch (error) {
                return Promise.reject(error)
            }
        },

    },
    persist: true,
})