<script setup lang="ts">
import type { Employee } from '@/interfaces/employee';
import { useEmployeeStore } from '@/stores/employee';
import { onMounted, ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    phoneNumber: '',
    isGraduated: false,
});

const emit = defineEmits(['editEmployee']);

const props = defineProps<{
    Employee?: any;
    edit?: boolean;
    closeDialog: () => void;
}>();

const uploadImage = ref<File | null>(null);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        uploadImage.value = target.files[0];
    } else {
        uploadImage.value = null;
    }
};

onMounted(() => {
  
    if (props.edit) {
        form.value.name = props.Employee.name;
        form.value.email = props.Employee.email;
        form.value.phoneNumber = props.Employee.phoneNumber;
        form.value.isGraduated = props.Employee.isGraduated;
    }
});

const submitForm = async () => {
    const employee : any = {
        Name: form.value.name,
        Email: form.value.email,
        PhoneNumber: form.value.phoneNumber,
        IsGraduated: form.value.isGraduated
    };
    if (uploadImage.value) {
      if(props.edit){
        useEmployeeStore().updateEmployee(props.Employee.id, employee, uploadImage.value);
        useEmployeeStore().all_employees.forEach((emp: Employee) => {
            if (emp.id === props.Employee.id) {
                emp.name = employee.Name;
                emp.email = employee.Email;
                emp.phoneNumber = employee.PhoneNumber;
                emp.isGraduated = employee.IsGraduated;
            }
        });

      }else{        
        await useEmployeeStore().createEmployee(employee, uploadImage.value);
        // add the new employee to the store and re-render the component
        useEmployeeStore().all_employees.push(employee);
      }
      await useEmployeeStore().fetchAll();
      props.closeDialog();  
    } else {
        console.error('No file selected');
    }
    // Add any additional form submission logic here
};
</script>

<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="form.name" label="Name" required></v-text-field>
        <v-text-field v-model="form.email" label="Email" required></v-text-field>
        <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
        <v-checkbox v-model="form.isGraduated" label="Graduated"></v-checkbox>
        <v-file-input label="Upload Image" accept="image/*" @change="handleFileChange"></v-file-input>
        <v-btn type="submit">Submit</v-btn>
        <v-btn text="Close Dialog" @click="props.closeDialog()">Close</v-btn>
    </v-form>
</template>

<style scoped>
/* Add any custom styles here */
</style>
