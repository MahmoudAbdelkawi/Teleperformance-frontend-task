import { defineStore } from 'pinia';
import { getProjectst } from '@/api/documents';
import type { Project } from '@/interfaces/project';
import { ref } from 'vue';

export const useProjectStore = defineStore('projects-store', () => {
    const all_projects = ref<Project[]>([]);
    const updateTrigger = ref<boolean>(false); // Reactive trigger for reactivity

    async function fetchAllProjects() {
        try {
            const data = await getProjectst();
            all_projects.value = data; // Assign data to projects.value

            // Update trigger to force component reactivity
            updateTrigger.value = !updateTrigger.value;
        } catch (error: any) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    return {
        fetchAllProjects,
        all_projects
    };
});
