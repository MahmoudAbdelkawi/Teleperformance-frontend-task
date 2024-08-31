import { defineStore } from 'pinia';
import { addClient, deleteClientById, getClients, getSingleClient, updateClientById } from '@/api/client';
import type { Client, Pagination } from '@/interfaces/client';
import api from '@/utils/axios';
import apiRoutes from '@/api/routes';
import { ref, watch } from 'vue';


export const useClientStore = defineStore('client-store', () => {
    const paginated_clients = ref<Client[]>([]);
    const all_clients = ref<Client[]>([]);
    const currentClient = ref<Client>();
    const pagination = ref<Pagination>({
        next: null,
        results: [],
        previous: null,
        count: 0,
        total_pages: 1
    });
    const page_size = ref(10);
    const current_page = ref<number>(1);

    async function navigateNext() {
        try {
            if (pagination.value.next) {
                const response = await api().get(pagination.value.next);
                pagination.value = response.data;
                paginated_clients.value = pagination.value.results;
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
                paginated_clients.value = pagination.value.results;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function getClientById(clientId: number) {
        try {
            const client = await getSingleClient(clientId);
            currentClient.value = client;
        } catch (error: any) {
            await Promise.reject(error);
        }
    }

    async function fetchClients() {
        if (current_page.value == 1) {
            const response = await getClients(page_size.value);
            pagination.value = response;
            paginated_clients.value = pagination.value.results;
        } else {
            const page = current_page.value;
            const size = page_size.value;
            const paginateWithPage = await api().get(apiRoutes.CLIENTS + `?page_size=${size}\&page=${page}`);
            pagination.value = paginateWithPage.data;
            paginated_clients.value = pagination.value.results;
        }
    }

    async function fetchAll() {
        try {
            const data = await getClients(0);
            all_clients.value = data.results;
        } catch (error: any) {
            await Promise.reject(error);
        }
    }

    async function createClient(employee: Client, file: any) {
        try {
            return await addClient(employee, file);
        } catch (error: any) {
            return await Promise.reject(error);
        }
    }

    async function updateClient(id: number, data: Client, file: any): Promise<any> {
        try {
            return await updateClientById(id, data, file);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    watch(current_page, async () => {
        await fetchClients();
    });
    watch(page_size, async () => {
        await fetchClients();
    });

    async function deleteClient(id: number | undefined) {
        try {
            await deleteClientById(id);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    return {
        paginated_clients,
        all_clients,
        pagination,
        current_page,
        page_size,
        currentClient,
        navigateNext,
        navigatePrev,
        fetchClients,
        getClientById,
        fetchAll,
        updateClient,
        createClient,
        deleteClient
    };
});
