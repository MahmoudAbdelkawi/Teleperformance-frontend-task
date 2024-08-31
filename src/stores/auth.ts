import { defineStore } from 'pinia';
import { router } from '@/router';
import { login, signup,getCurrentUser } from '@/api/auth';
import type { currentUser, Employee } from '@/interfaces/employee';


interface AuthState {
    loggedIn: boolean;
    user: Employee;
    token: string;
    current_user: currentUser;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () =>
        ({
            /*user: JSON.parse(localStorage.getItem('user')),*/
            loggedIn: sessionStorage.getItem('token')  ? true : false,
            user: {} as Employee,
            token: sessionStorage.getItem('token')
        } as AuthState),
    actions: {
        async LOGIN(email: string, password: string) {
            try {
                const data = await login(email, password);
                this.loggedIn = true;
                this.token = data.data;
                sessionStorage.setItem('token', data.data);
                await router.push('/');
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async SIGNUP(email: string, password: string, userName: string) {
            try {
                const data = await signup(email, password, userName);
                this.loggedIn = true;
                this.token = data.data;
                sessionStorage.setItem('token', data.data);
                await router.push('/');
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async GET_CURRENT_USER() {
            try {
                const currentUser = await getCurrentUser();
                this.current_user = currentUser.data;
                console.log("currentUser",currentUser);
            } catch (error: any) {
                console.log('logging error from store');
                console.log(error);
                return Promise.reject(error);
            }
        }
    }
});
