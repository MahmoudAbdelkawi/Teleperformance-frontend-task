<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import EmployeeComponents from '@/components/dashboard/Employee.vue';
import type { Employee } from '@/interfaces/employee';
import { useEmployeeStore } from '@/stores/employee';

const Employees = ref<Employee[] | undefined>();
const employeeStore = useEmployeeStore();
const currentPage = computed({
    get: () => employeeStore.current_page,
    set: (value) => (employeeStore.current_page = value)
});

const totalPages = computed(() => employeeStore.pagination.total_pages); // useState

onMounted(async () => {
    await useEmployeeStore().fetchAll();
    Employees.value = useEmployeeStore().all_employees;
}); // useEffect

const handlePageChange = async (page: number) => {
    currentPage.value = page;

    // fetchEmployees is called automatically due to the watch in the store
    await useEmployeeStore().fetchAll();
    Employees.value = useEmployeeStore().all_employees;
};

const handlePrevPage = () => {
    if (currentPage.value > 1) {
        handlePageChange(currentPage.value - 1);
    }
};

const handleNextPage = () => {
    if (employeeStore.all_employees.length >= 5) {
        handlePageChange(currentPage.value + 1);
    }
};
</script>

<template>
    <v-row>
        <v-col>
            <EmployeeComponents :Employees="Employees" />
            <v-pagination v-model="currentPage" :length="0" :total-visible="5" @update:modelValue="handlePageChange">
                <template #prev="{ props }">
                    <v-btn v-bind="props" text @click="handlePrevPage">Prev</v-btn>
                </template>
                <template #next="{ props }">
                    <v-btn v-bind="props" text @click="handleNextPage">Next</v-btn>
                </template>
            </v-pagination>
        </v-col>
    </v-row>
</template>
