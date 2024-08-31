import api from '@/utils/axios';
import apiRoutes from '@/api/routes';
const login = async (email: string, password: string) => {
    try {
        const response = await api().post(apiRoutes.LOGIN, {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const signup = async (email: string, password: string, userName: string) => {
    try {
        const response = await api().post(apiRoutes.SIGNUP, {
            email,
            password,
            userName,
            role: 1
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
const getCurrentUser = async () => {
    try {
        const response = await api().get(apiRoutes.CURRENT_USER);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export { login, signup,getCurrentUser };
