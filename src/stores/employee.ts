import { defineStore } from 'pinia';
import { addEmployee, deleteEmployeeById, getEmployees, getSpecificEmployees, updateEmployeeById } from '@/api/employee';
import type { Employee, Pagination } from '@/interfaces/employee';
import api from '@/utils/axios';
import { ref, watch } from 'vue';

export const useEmployeeStore = defineStore('employee-store', () => {
    const paginated_employees = ref<Employee[]>([]);
    const all_employees = ref<Employee[]>([]);
    const pagination = ref<Pagination>({
        next: null,
        results: [],
        previous: null,
        count: 0,
        total_pages: 1
    });
    const page_size = ref(5);
    const current_page = ref<number>(1);
    let isFetching = ref(false); // Flag to prevent multiple simultaneous fetches


    async function navigateNext() {
        try {
            if (pagination.value.next) {
                const response = await api().get(pagination.value.next);
                pagination.value = response.data;
                paginated_employees.value = pagination.value.results;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function navigatePrev() {
        try {
            if (pagination.value.previous) {
                const response = await api().get(pagination.value.previous);
                pagination.value = response.data;
                paginated_employees.value = pagination.value.results;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // async function fetchEmployees() {
    //         const response = await getEmployees(page_size.value, current_page.value);
    //         pagination.value = response;
    //         paginated_employees.value = pagination.value.results;
    // }

    // async function fetchAll() {
    //     try {
    //         const data = await getEmployees(5, 1);
    //         console.log("data : ", data);
    //         all_employees.value = data;
    //     } catch (error: any) {
    //         await Promise.reject(error);
    //     }
    // }

    async function fetchEmployees() {
        if (isFetching.value) return; // Prevent multiple simultaneous fetches
        isFetching.value = true;
        try {
            const response = await getEmployees(page_size.value, current_page.value);
            pagination.value = response;
            paginated_employees.value = pagination.value.results;
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            isFetching.value = false;
        }
    }

    async function fetchAll() {
        if (isFetching.value) return; // Prevent multiple simultaneous fetches
        isFetching.value = true;
        try {
            const data = await getEmployees(page_size.value, current_page.value);
            all_employees.value = data;
            
        } catch (error: any) {
            console.error('Error fetching all employees:', error);
        } finally {
            isFetching.value = false;
        }
    }

    async function fetchSpecific(ids: Array<number>) {
        try {
            const data = await getSpecificEmployees(ids);
            return data;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async function createEmployee(employee: Employee, file: any) {
        try {
            return await addEmployee(employee, file);
        } catch (error: any) {
            console.log('logging create employee error');
            console.log(error);
            return Promise.reject(error);
        }
    }

    async function updateEmployee(id: string, data: Employee, file: any): Promise<any> {
        try {
            return await updateEmployeeById(id, data, file);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    watch(current_page, async () => {
        // await fetchEmployees();
        await fetchAll();
    });
    watch(page_size, async () => {
        // await fetchEmployees();
        await fetchAll();
    });

    async function deleteEmployee(id: string | undefined) {
        try {
            await deleteEmployeeById(id);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    return {
        paginated_employees,
        all_employees,
        pagination,
        current_page,
        page_size,
        navigateNext,
        navigatePrev,
        fetchEmployees,
        fetchAll,
        fetchSpecific,
        updateEmployee,
        createEmployee,
        deleteEmployee
    };
});




