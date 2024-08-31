import api from '@/utils/axios';
import apiRoutes from '@/api/routes';
import type { Employee } from '@/interfaces/employee';
// import type { UnwrapRef } from 'vue';
// import { format } from 'date-fns';

const getEmployees = async (pageSize: number , pageNumber: number) => {
    try {
        const response = await api().get(apiRoutes.EMPLOYEE + `?pageSize=${pageSize}\&pageNumber=${pageNumber}`);
        return response.data.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

const getSpecificEmployees = async (ids: Array<number>) => {
    // try {
    //     const response = await api().post(apiRoutes.EMPLOYEES + 'by-ids/', {
    //         ids
    //     });
    //     return response.data;
    // } catch (error: any) {
    //     return Promise.reject(error);
    // }
};

const addEmployee = async (employee: Employee, file: any) => {
    console.log("file===================", file);
  try {
        const formData = new FormData();

        // Append each field separately to the FormData
        Object.entries(employee).forEach(([key, value]) => {
            // Convert booleans and numbers to strings
            if (typeof value === 'boolean' || typeof value === 'number') {
                value = value.toString();
            }
            formData.append(key, value as string);
        });

        // Append the profile photo file if provided
        if (file) {
            formData.append('UploadImage', file);
        }

        // Make the POST request
        const response = await api().post(apiRoutes.EMPLOYEE, formData);

        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        return Promise.reject(error);
    }
};

const updateEmployeeById = async (id: number, data: Employee, file: any) => {
    try {
        const formData = new FormData();
        // Append each field separately to the FormData
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Append the photo_profile file to the FormData
        if (file) {
            formData.append('UploadImage', file); // 'file' is the File object obtained from an input field
        } else {
            formData.delete('UploadImage');
        }
        const response = await api().put(apiRoutes.EMPLOYEE + `/${id}`, formData);
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};



const deleteEmployeeById = async (id: string | undefined) => {
    try {
        await api().delete(apiRoutes.EMPLOYEE + `/${id}`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};


export { getEmployees, addEmployee, updateEmployeeById, deleteEmployeeById, getSpecificEmployees };
