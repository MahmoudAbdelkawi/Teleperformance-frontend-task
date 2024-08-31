import api from '@/utils/axios';
import { defineStore } from 'pinia';
import { getProjects, addProject, deleteProjectById, updateProjectById } from '@/api/projects';
import type { PaginationProject } from '@/interfaces/employee';
import type { Project } from '@/interfaces/projects';
import { ref, watch } from 'vue';
import apiRoutes from '@/api/routes';

export const useProjectStore = defineStore('project-store', () => {
    const all_projects = ref<Project[]>([]);
    const paginated_projects = ref<Project[]>([]);
    const pagination = ref<PaginationProject>({
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
                paginated_projects.value = pagination.value.results;
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
                paginated_projects.value = pagination.value.results;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function fetchProjects() {
        if (current_page.value == 1) {
            const response = await getProjects(page_size.value);
            pagination.value = response;
            paginated_projects.value = pagination.value.results;
        } else {
            const page = current_page.value;
            const size = page_size.value;
            const paginateWithPage = await api().get(apiRoutes.PROJECTS + `?page_size=${size}\&page=${page}`);
            pagination.value = paginateWithPage.data;
            paginated_projects.value = pagination.value.results;
        }
    }
    async function getAllProjects() {
        try {
            const response: Project[] = await getProjects(0);
            all_projects.value = response;
        } catch (error: any) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async function createProject(project: Project) {
        try {
            return await addProject(project);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    watch(current_page, async () => {
        await fetchProjects();
    });
    watch(page_size, async () => {
        await fetchProjects();
    });

    async function deleteProject(projectId: number|undefined) {
        try {
            await deleteProjectById(projectId);
        } catch (error: any) {
            return Promise.reject(error);
        }
    
    }

    async function updateProject(projectId: number|undefined, project: Project) {
        try {
            return await updateProjectById(projectId, project);
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    return {
        all_projects,
        paginated_projects,
        current_page,
        page_size,
        pagination,
        navigateNext,
        navigatePrev,
        getAllProjects,
        fetchProjects,
        createProject,
        deleteProject,
        updateProject
    };
});
