import { defineStore } from 'pinia';
import { router } from '@/router';
import type { Task } from '@/interfaces/task';
import { addTask, deleteTask, getAssignedTasks, getTasks, updateTask } from '@/api/task';

export const useTaskStore = defineStore({
    id: 'tasks',
    state: () => ({
        /*user: JSON.parse(localStorage.getItem('user')),*/
        tasks: [] as Array<Task>
    }),
    getters: {},
    actions: {
        async FETCH_TASKS() {
            try {
                const data = await getTasks();
                const res_tasks: Array<Task> = data.map((item: any) => {
                    const task: Task = {
                        id: item.id,
                        street_name: item.street_name,
                        zip_code: item.zip_code,
                        house_number: item.house_number,
                        title: item.title,
                        cross_street: item.cross_street,
                        description: item.description,
                        client: item.client,
                        city: item.city,
                        status: item.status,
                        priority: item.priority,
                        team_members: item.team_members,
                        time: {
                            start: new Date(item.start_date),
                            end: new Date(item.end_date)
                        },
                        latitude: item.latitude,
                        longitude: item.longitude,
                        emp_amount: item.emp_amount,
                        confirmed_by: item.confirmed_by
                    };
                    return task;
                });
                this.tasks = res_tasks;
                return this.tasks;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async FETCH_ASSIGNED_TASKS() {
            try {
                const data = await getAssignedTasks();
                const res_tasks: Array<Task> = data.map((item: any) => {
                    const task: Task = {
                        id: item.id,
                        title: item.title,
                        cross_street: item.cross_street,
                        street_name: item.street_name,
                        zip_code: item.zip_code,
                        house_number: item.house_number,
                        description: item.description,
                        client: item.client,
                        city: item.city,
                        status: item.status,
                        priority: item.priority,
                        team_members: item.team_members,
                        time: {
                            start: new Date(item.start_date),
                            end: new Date(item.end_date)
                        },
                        latitude: item.latitude,
                        longitude: item.longitude,
                        emp_amount: item.emp_amount,
                        confirmed_by: item.confirmed_by
                    };
                    return task;
                });
                this.tasks = res_tasks;
                return this.tasks;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async ADD_TASK(task: Task) {
            try {
                const data = await addTask(task);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async UPDATE_TASK(task: Task) {
            try {
                const data = await updateTask(task);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async DELETE_TASK(id: string) {
            try {
                const data = await deleteTask(id);
                return data;
            } catch (error: any) {
                return Promise.reject(error);
            }
        }
    }
});
