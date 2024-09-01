<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import avatar from '@/assets/images/profile/3.jpg';
import type { Employee } from '@/interfaces/employee';
import { VIcon } from 'vuetify/components';
import { deleteEmployeeById } from '@/api/employee';
import AddEmployee from '@/layouts/full/AddEmployee.vue';

const props = defineProps<{
    Employees: Employee[] | undefined;
}>();

const emit = defineEmits(['employeeDeleted','editEmployee']);

const employees = ref(props.Employees);

const employeeEdit= ref<Employee | undefined>();
const openEditEmployee=ref<boolean>(false)
watchEffect(() => {
    employees.value = props.Employees;
});

const getProfileImageUrl = (profileImage: string) => {
    return `http://www.teleperformance-task.somee.com/Employee/${profileImage}`;
};

const handleDelete = async (employeeId: string | undefined) => {
    if (employeeId === undefined) return;
    try {
        await deleteEmployeeById(employeeId);
        // Update the local employees state and re-render the component
        employees.value = employees.value?.filter(employee => employee.id !== employeeId);
        emit('employeeDeleted', employeeId); // Emit an event to inform the parent component
    } catch (error) {
        console.error('Error deleting employee:', error);
    }

    
};

const editEmployee = (employee: Employee) => {
    if(employee){
       employeeEdit.value = employee;
       openEditEmployee.value=true
   }
    emit('editEmployee', employee);
};

const closeDialog=()=>{
    console.log("close dialog");
    openEditEmployee.value=false
}
</script>


<template>
    <v-card elevation="3" rounded="lg" class="mb-3">
        <!--  header -->
        <div class="d-flex justify-space-between pa-4 pt-5 bg-warning">
            <h2 class="text-h1 font">{{ $t('Schedule.Options.Employee') }}</h2>
        </div>
        <div style="overflow-y: auto; max-height: 900px">
            <v-list two-lines v-for="item in employees" :key="item.id">
                <v-list-item active-color="primary" class="py-4">
                    <v-list-item-title class="text-lg-h5 text-md-h6 text-xs-h8 d-flex justify-space-between">
                        <h3>{{ item.name }}</h3>
                        <h5 class="" style="color: darkgrey">{{ item.date }}</h5>
                    </v-list-item-title>
                    <div class="d-flex justify-content-between mt-3">
                        <p class="text-lg-h6 text-md-h5 text-sm-h7">
                            <h4>{{ item.email }}</h4>
                        </p>
                        <v-avatar class="mt-5 ml-4 mt-xs-6">
                            <v-img :src="getProfileImageUrl(item.profileImage)" alt="John"></v-img>
                        </v-avatar>
                    </div>
                    <div class="d-flex mt-3">
                        <p class="text-lg-h6 text-md-h5 text-sm-h7">
                            <h4>{{ item.phoneNumber }}</h4>
                        </p>
                    </div>
                    <div class="d-flex mt-3">
                        <p class="text-lg-h6 text-md-h5 text-sm-h7">
                            <v-checkbox
                                v-model="item.isGraduated"
                                :label="`Graduated`"
                            ></v-checkbox>
                        </p>
                    </div>
                    <div class="d-flex justify-end mt-3">
                        <v-btn icon @click="editEmployee(item)">
                            <v-icon color="blue">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="handleDelete(item.id)">
                            <v-icon color="red">mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </div>
    </v-card>

    <v-dialog v-model="openEditEmployee" max-width="500">
                <v-card title="Edit Employee">
                    <v-card-text>
                        <AddEmployee :closeDialog="closeDialog" :edit="openEditEmployee" :Employee="employeeEdit" /> <!-- Include the AddEmployee component -->
                    </v-card-text>
                </v-card>
            </v-dialog>
</template>
