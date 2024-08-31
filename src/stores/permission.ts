import { defineStore } from 'pinia';
import { router } from '@/router';
import type { Task } from '@/interfaces/task';
import { addTask, deleteTask, getTasks, updateTask } from '@/api/task';
import { getConfig } from '@/api/config';

export const usePermissionStore = defineStore({
    id: 'permissions',
    state: () => ({
        /*user: JSON.parse(localStorage.getItem('user')),*/
        permissions: [] as Array<string>
    }),
    getters: {},
    actions: {
        async FETCH_PERMISSIONS() {
            try {
                const data = await getConfig();
                this.permissions = data.permissions;
            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    }
});
