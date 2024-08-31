import { defineStore } from 'pinia';
import { getProjectDocumentsList } from '@/api/documents';
import type { Document } from '@/interfaces/document';
import { ref, watch } from 'vue';
export const useDocumentStore = defineStore('document-store', () => {
    const all_documents = ref<Document[]>([]);

    async function fetchAllDocuments(projectId: string) {
        try {
            const data = await getProjectDocumentsList(projectId);

            all_documents.value = data; // Assign data to all_documents.value
            return data;
        } catch (error: any) {
            await Promise.reject(error);
        }
    }

    return {
        fetchAllDocuments,
        all_documents
    };
});
