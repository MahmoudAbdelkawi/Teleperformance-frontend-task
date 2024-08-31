import { defineStore } from 'pinia';
import { product_PerformanceData } from '@/_mockApis/modernData';
import { dailyActivitiesData, weeklyStatesData } from '@/_mockApis/AnalyticalData';

export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        product_PerformanceData: product_PerformanceData,
        dailyActivitiesData: dailyActivitiesData,
        weeklyStatsData: weeklyStatesData
    }),
    getters: {},
    actions: {}
});
