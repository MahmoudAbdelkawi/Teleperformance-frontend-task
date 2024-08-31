import { defineStore } from 'pinia';
import { getWeeklyTasksData } from '@/api/analytics';
import type { IDayRequest } from '@/interfaces/day-request';
import { GetFreeDaysRequests, CreateFreeDayRequest, updateFreeDayRequest, deleteDayRequestById } from '@/api/free-day';
const status = [
    { id: 1, name: 'Pending', value: 'pending' },
    { id: 3, name: 'Rejected', value: 'rejected' },
    { id: 4, name: 'approved', value: 'approved' }
];

export const useFreeDayStore = defineStore({
    id: 'free-day',
    state: () => ({
        request: {} as IDayRequest,
        status,
        requests: [] as IDayRequest[]
    }),

    getters: {},
    actions: {
        async GET_FREE_DAY_REQUESTS() {
            try {
                this.requests = await GetFreeDaysRequests();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async DELETE_FREE_DAY_REQUEST(id: number | undefined) {
            try {
                await deleteDayRequestById(id);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CREATE_FREE_DAY_REQUEST(data: IDayRequest) {
            try {
                await CreateFreeDayRequest(data);
                await this.GET_FREE_DAY_REQUESTS();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async UPDATE_FREE_DAY_REQUEST(id: number | undefined, data: IDayRequest) {
            try {
                await updateFreeDayRequest(id, data);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
});
