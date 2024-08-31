import { defineStore } from 'pinia';
import { getEmployeesPerformanceData, getWeeklyTasksData } from '@/api/analytics';
import type { EmployeePerformance, IWeekData } from '@/interfaces/analytics';

export const useAnalyticsStore = defineStore({
    id: 'analytics',
    state: () => ({
        weeklyAnalyticsData: {} as IWeekData,
        employees_performance: [] as EmployeePerformance[]
    }),

    getters: {},
    actions: {
        async GET_WEEKLY_TASKS_DATA() {
            try {
                this.weeklyAnalyticsData = await getWeeklyTasksData();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async GET_EMPLOYEES_PERFORMANCE_DATA() {
            try {
                const resp = await getEmployeesPerformanceData();
                this.employees_performance = resp;
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
});
