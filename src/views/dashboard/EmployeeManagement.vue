<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useEmployeeStore } from '@/stores/employee';
import type { Employee } from '@/interfaces/employee';
import { format, parseISO } from 'date-fns';
import PickDate from '@/components/utils/PickDate.vue';
import nodata from '@/assets/images/svgs/no-data.svg';
import VueLoader from '@/components/utils/VueLoader.vue';
import { usePermissionStore } from '@/stores/permission';
import { useI18n } from 'vue-i18n';
import imageUrlBuilder from '@/utils/helpers/imageUrlBuilder';
import CitySelector from '@/components/utils/CitySelector.vue';

const { t } = useI18n();
const permissionsStore = usePermissionStore();
const employeeStore = useEmployeeStore();
const data_arrived = ref(false);
const search = ref('');
const pagination = ref(1);
const alert = ref(true);

// file upload

const fileInput = ref<HTMLInputElement | null>(null);
const files = ref();

function handleFileChange() {
    files.value = fileInput.value?.files;
}

// create-update dialog props
const show_missing_fields = ref(false);
const valid = ref(false);
const loading = ref(false);
const editedIndex = ref<number | undefined>(-1);
const delete_dialog = ref(false);
const employee_dialog = ref(false);

const contracts_types = [
    { id: 1, name: 'CDI', value: 'cdi' },
    { id: 2, name: 'CDD', value: 'cdd' },
    { id: 3, name: 'Freelance', value: 'freelance' },
    { id: 4, name: 'Internship', value: 'internship' }
];
const workPositions = [
    { title: 'Select role', value: '' },
    { title: 'Software Developer', value: 'software_developer' },
    { title: 'Mobile Developer', value: 'mobile_developer' },
    { title: 'Backend Developer', value: 'backend_developer' },
    { title: 'Front end Developer', value: 'fontend_developer' },
    { title: 'Graphic Designer', value: 'graphic_designer' },
    { title: 'Marketing Manager', value: 'marketing_manager' },
    { title: 'Sales Representative', value: 'sales_representative' },
    { title: 'Data Analyst', value: 'data_analyst' },
    { title: 'Project Manager', value: 'project_manager' },
    { title: 'Human Resources Manager', value: 'human_resources_manager' },
    { title: 'Financial Analyst', value: 'financial_analyst' },
    { title: 'Customer Service Representative', value: 'customer_service_representative' },
    { title: 'Content Writer', value: 'content_writer' },
    { title: 'Research Scientist', value: 'research_scientist' },
    { title: 'Operations Manager', value: 'operations_manager' },
    { title: 'Accountant', value: 'accountant' },
    { title: 'Product Manager', value: 'product_manager' },
    { title: 'IT Support Specialist', value: 'it_support_specialist' },
    { title: 'Social Media Manager', value: 'social_media_manager' },
    { title: 'Business Analyst', value: 'business_analyst' },
    { title: 'Executive Assistant', value: 'executive_assistant' },
    { title: 'Event Planner', value: 'event_planner' },
    { title: 'Legal Assistant', value: 'legal_assistant' },
    { title: 'Healthcare Administrator', value: 'healthcare_administrator' },
    { title: 'Mechanical Engineer', value: 'mechanical_engineer' },
    { title: 'Electrician', value: 'electrician' },
    { title: 'Teacher', value: 'teacher' },
    { title: 'Architect', value: 'architect' },
    { title: 'Web Designer', value: 'web_designer' },
    { title: 'Chef', value: 'chef' },
    { title: 'Financial Planner', value: 'financial_planner' },
    { title: 'Public Relations Specialist', value: 'public_relations_specialist' },
    { title: 'Data Scientist', value: 'data_scientist' },
    { title: 'Biomedical Engineer', value: 'biomedical_engineer' },
    { title: 'Market Research Analyst', value: 'market_research_analyst' },
    { title: 'Photographer', value: 'photographer' },
    { title: 'Pharmacist', value: 'pharmacist' },
    { title: 'Nurse', value: 'nurse' },
    { title: 'Librarian', value: 'librarian' },
    { title: 'Aerospace Engineer', value: 'aerospace_engineer' },
    { title: 'Interior Designer', value: 'interior_designer' },
    { title: 'Real Estate Agent', value: 'real_estate_agent' },
    { title: 'Occupational Therapist', value: 'occupational_therapist' }
];

const computedPosition = (val: string) => {
    for (const element of workPositions) {
        if (element.value === val) {
            return element.title;
        }
    }
    return '---------';
};
// snackbar
const snackbar = ref(false);
const snackbar_color = ref('');
const snackbar_variant = ref<any>();
const snackbar_message = ref('');

const employee_data = ref<Employee>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    street_name: '',
    zip_code: '',
    house_number: '',
    contract_duration: 0,
    position: '',
    birthday: new Date(),
    profile_photo: '',
    hired_at: new Date(),
    city: '',
    contract_type: 'cdi',
    is_active: true,
    is_verified: false,
    is_employee: false,
    is_superuser: false,
    longitude: 0,
    latitude: 0
});

const default_data = ref<Employee>({
    id: 0,
    email: '',
    contract_duration: 0,
    city: '',
    position: '',
    street_name: '',
    zip_code: '',
    house_number: '',
    birthday: new Date(),
    profile_photo: '',
    hired_at: new Date(),
    first_name: '',
    last_name: '',
    contract_type: 'cdi',
    phone_number: '',
    password: '',
    is_active: false,
    is_verified: false,
    is_employee: false,
    is_superuser: false,
    longitude: 0,
    latitude: 0
});

//Methods

function openDeleteDialog(id: number) {
    editedIndex.value = id;
    delete_dialog.value = true;
}

async function confirmDelete() {
    const id = editedIndex.value;
    try {
        loading.value = true;
        await employeeStore.deleteEmployee(id);
        await employeeStore.fetchEmployees();
        loading.value = false;
        delete_dialog.value = false;
        showSnackbar('Employee deleted successfully!', 'elevated', 'success');
    } catch (err: any) {
        loading.value = false;
        showSnackbar(err, 'elevated', 'error');
        return Promise.reject(err);
    }
}

function openAsEditDialog(employee: Employee) {
    editedIndex.value = employee.id;
    employee_dialog.value = true;
    employee_data.value = Object.assign({}, employee);
}

function cancelCreateEmployee() {
    employee_dialog.value = false;
    loading.value = false;
    employee_data.value = default_data.value;
}

function showSnackbar(message: string, variant: string | null, color: string) {
    snackbar_variant.value = variant;
    snackbar_color.value = color;
    snackbar_message.value = message;
    snackbar.value = true;
}

function openAsCreateDialog(employee: Employee) {
    editedIndex.value = -1;
    employee_dialog.value = true;
}

async function createEmployee() {
    editedIndex.value = -1;
    const employee = employee_data.value;
    employee_dialog.value = true;

    if (employee.email == '') {
        showSnackbar('Email required', 'elevated', 'warning');
        return;
    } else if (employee.phone_number == '') {
        showSnackbar('Phone number required', 'elevated', 'warning');
        return;
    } else if (employee.password == '') {
        showSnackbar('password required', 'elevated', 'warning');
        return;
    } else if (employee.first_name == '') {
        showSnackbar('First name required', 'elevated', 'warning');
        return;
    } else if (employee.last_name == '') {
        showSnackbar('Last name required', 'elevated', 'warning');
        return;
    } else if (employee.contract_type == 'cdd' && employee.contract_duration == 0) {
        showSnackbar('Contract duration must be greater than 0', 'elevated', 'warning');
        return;
    }
    loading.value = true;
    let file;
    if (files.value && files.value.length > 0) {
        file = files.value[0];
    } else {
        file = null;
    }
    try {
        await employeeStore.createEmployee(employee_data.value, file);
        await employeeStore.fetchEmployees();
        showSnackbar('Employee created successfully!', 'elevated', 'success');
        loading.value = false;
        employee_dialog.value = false;
        employee_data.value = default_data.value;
    } catch (error: any) {
        loading.value = false;
        showSnackbar(error, 'elevated', 'error');
        return Promise.reject(error);
    }
}

async function UpdateEmployee() {
    loading.value = true;
    try {
        if (employee_data.value.id && employee_data.value.id > 1) {
            let file;
            if (files.value && files.value.length > 0) {
                file = files.value[0];
            } else {
                file = null;
            }
            await employeeStore.updateEmployee(employee_data.value.id, { ...employee_data.value }, file);
            await employeeStore.fetchEmployees();
            showSnackbar('Employee updated successfully!', 'elevated', 'success');
            loading.value = false;
            employee_dialog.value = false;
            employee_data.value = default_data.value;
        }
    } catch (error: any) {
        loading.value = false;
        showSnackbar(error, 'elevated', 'error');
        return Promise.reject(error);
    }
}

function sendHours() {
    //   send hours
}

// computed props
const formTitle = computed(() => {
    return editedIndex.value === -1 ? t('Table.CreateEmployee') : t('Table.EditEmployee');
});
const formSubmit = computed(() => {
    return editedIndex.value === -1 ? 'Create' : 'Update';
});

const filteredList = computed(() => {
    return employeeStore.paginated_employees?.filter((user: any) => {
        return user.email.toLowerCase().includes(search.value.toLowerCase());
    });
});

const listLength = computed(() => {
    return employeeStore.paginated_employees?.length;
});

onMounted(async () => {
    data_arrived.value = false;
    try {
        await employeeStore.fetchEmployees();
        data_arrived.value = true;
    } catch (error: any) {
        data_arrived.value = true;
        showSnackbar(error, 'elevated', 'error');
    }
});
</script>
<template>
    <div>
        <v-dialog v-model="delete_dialog" width="auto">
            <v-card rounded="lg">
                <v-card-text class="text-h3">{{ $t('Table.ConfirmDeleteMessage') }}</v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn size="large" variant="outlined" color="info" @click="delete_dialog = false">{{ $t('Table.Cancel') }} </v-btn>
                    <v-btn size="large" variant="outlined" color="error" @click="confirmDelete" :loading="loading"
                        >{{ $t('Table.Confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :variant="snackbar_variant" :color="snackbar_color">
            {{ snackbar_message }}
            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false"> {{ $t('Table.Close') }}</v-btn>
            </template>
        </v-snackbar>
        <v-dialog v-model="employee_dialog" class="h-100" :width="$vuetify.display.sm ? '80rem' : '70rem'">
            <v-form style="overflow-y: scroll">
                <v-card class="pa-6">
                    <div class="text-h2 mb-4 text-center">{{ formTitle }}</div>
                    <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" color="secondary">
                        {{ $t('Table.RequiredFieldsText') }}
                    </v-alert>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-at</v-icon>
                                    <p class="fieldTitle ml-md-2">* {{ $t('Table.Keys.Email') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    hide-details
                                    v-model="employee_data.email"
                                    label="User email"
                                    type="email"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text v-if="editedIndex == -1">
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-lock</v-icon>
                                    <p class="fieldTitle ml-md-2">* {{ $t('Table.Keys.Password') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    hide-details
                                    v-model="employee_data.password"
                                    label="Password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-phone-dial-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">* {{ $t('Table.Keys.PhoneNumber') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    hide-details
                                    v-model="employee_data.phone_number"
                                    label="Phone number"
                                    placeholder="Phone number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-card-account-details-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">* {{ $t('Table.Keys.FirstName') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    hide-details
                                    v-model="employee_data.first_name"
                                    label="First name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-card-account-details-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">* {{ $t('Table.Keys.LastName') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    hide-details
                                    v-model="employee_data.last_name"
                                    label="Last name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <!-- street name-->
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col cols="4">
                                <v-row>
                                    <v-icon color="primary">mdi-map-marker</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Tasks.Modals.Fields.StreetName.Label') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    hide-details
                                    :placeholder="$t('Tasks.Modals.Fields.StreetName.Placeholder')"
                                    required
                                    class="font-weight-bold"
                                    v-model="employee_data.street_name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!--zipcode-->
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col cols="4">
                                <v-row>
                                    <v-icon color="primary">mdi-card-bulleted-settings-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Tasks.Modals.Fields.ZipCode.Label') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    hide-details
                                    :placeholder="$t('Tasks.Modals.Fields.ZipCode.Placeholder')"
                                    required
                                    class="font-weight-bold"
                                    v-model="employee_data.zip_code"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <!--                  house number-->
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col cols="4">
                                <v-row>
                                    <v-icon color="primary">mdi-home-map-marker</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Tasks.Modals.Fields.HouseNumber.Label') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    hide-details
                                    :placeholder="$t('Tasks.Modals.Fields.HouseNumber.Placeholder')"
                                    required
                                    class="font-weight-bold"
                                    v-model="employee_data.house_number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-account-circle-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.PhotoProfile') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-file-input
                                    :rules="[
                                        (value) => {
                                            return (
                                                !value ||
                                                !value.length ||
                                                value[0].size < 2000000 ||
                                                'Avatar size should be less than 2 MB!'
                                            );
                                        }
                                    ]"
                                    show-size
                                    type="file"
                                    ref="fileInput"
                                    @change="handleFileChange"
                                    accept="image/png, image/jpeg, image/bmp"
                                    :placeholder="t('Table.ImagePlaceholder')"
                                    variant="outlined"
                                    prepend-icon="mdi-account-circle-outline"
                                    :label="t('Table.Keys.PhotoProfile')"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-cake-variant-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.Birthday') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                {{ employee_data.birthday }}
                                <PickDate
                                    v-model="employee_data.birthday"
                                    mode="date"
                                    placeholder="Birthday"
                                    :model-config="{
                                        type: 'string',
                                        mask: 'YYYY-MM-DD'
                                    }"
                                    :masks="{
                                        title: 'DD MMMM YYYY',
                                        weekdays: 'W',
                                        navMonths: 'MMM',
                                        input: ['YYYY-MM-DD'],
                                        dayPopover: 'WWW, MMM D, YYYY',
                                        data: ['YYYY-MM-DD']
                                    }"
                                    hint="Select your Birth date"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-calendar-start</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.HiredAt') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                {{ employee_data.hired_at }}
                                <PickDate
                                    v-model="employee_data.hired_at"
                                    mode="datetime"
                                    :model-config="{
                                        type: 'string',
                                        mask: 'YYYY-MM-DD HH:mm'
                                    }"
                                    :masks="{
                                        title: 'MMMM YYYY',
                                        weekdays: 'W',
                                        navMonths: 'MMM',
                                        input: ['YYYY-MM-DD HH:mm'],
                                        dayPopover: 'WWW, MMM D, YYYY',
                                        data: ['YYYY-MM-DD HH:mm']
                                    }"
                                    is
                                    label="Hired at"
                                    hint="Select The date you were hired at "
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-account-reactivate</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.Active') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col cols="8" md="8" class="d-flex justify-start">
                                <v-list-item>
                                    <template v-slot:append>
                                        <v-switch color="success" v-model="employee_data.is_active" hide-details inset></v-switch>
                                    </template>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-check-decagram</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.Verified') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col cols="8" md="8" class="d-flex justify-start">
                                <v-list-item>
                                    <template v-slot:append>
                                        <v-switch color="success" v-model="employee_data.is_verified" hide-details inset></v-switch>
                                    </template>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-city-variant-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.City') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <CitySelector v-model="employee_data.city"></CitySelector>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-account-cog</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.Position') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-select
                                    :items="workPositions"
                                    item-title="title"
                                    item-value="value"
                                    label="Select position"
                                    v-model="employee_data.position"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-file-sign</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.ContractType') }}:</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-select
                                    :items="contracts_types"
                                    item-title="name"
                                    item-value="value"
                                    label="Contract type"
                                    v-model="employee_data.contract_type"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="d-flex align-center">
                            <v-col md="4" cols="4">
                                <v-row class="fieldTitleContainer">
                                    <v-icon color="primary">mdi-clock-time-three-outline</v-icon>
                                    <p class="fieldTitle ml-md-2">{{ $t('Table.Keys.ContractDuration') }} :</p>
                                </v-row>
                            </v-col>
                            <v-col md="8" cols="8">
                                <v-text-field
                                    variant="outlined"
                                    type="number"
                                    :disabled="employee_data.contract_type == 'cdi'"
                                    v-model="employee_data.contract_duration"
                                    label="Contract duration"
                                    :hint="t('Table.ContractDuration.ContractDurationHint')"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions class="d-flex" :class="$vuetify.display.sm ? 'justify-center' : 'justify-end'">
                        <!--                        <v-btn color="success" @click="fillData">fill user data</v-btn>-->
                        <v-btn color="error" @click="cancelCreateEmployee" variant="outlined" rounded class="btn1">
                            {{ $t('Table.Cancel') }}
                        </v-btn>
                        <v-btn
                            color="success"
                            :loading="loading"
                            v-if="editedIndex == -1"
                            @click="createEmployee"
                            variant="flat"
                            rounded
                            class="btn2"
                            >{{ $t('Table.Create') }}
                        </v-btn>
                        <v-btn color="info" :loading="loading" v-else @click="UpdateEmployee" variant="flat" rounded class="btn2"
                            >{{ $t('Table.Update') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <v-card class="pa-2">
            <v-row>
                <v-col cols="12" lg="4" md="6">
                    <v-text-field
                        density="compact"
                        v-model="search"
                        :label="t('Table.SearchLabel')"
                        hide-details
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" lg="8" md="6" v-if="permissionsStore.permissions.includes('users.add_tenantuser')" class="text-right">
                    <!--                    create button-->
                    <v-btn color="primary" @click="openAsCreateDialog" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                        Add Employee
                    </v-btn>
                </v-col>
            </v-row>
            <v-table class="mt-5">
                <thead>
                    <tr>
                        <th class="text-subtitle-1 font-weight-semibold">ID</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.UserInfo') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.SendHours') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.PhoneNumber') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.Verification') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.Activity') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.City') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.LastLogin') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.Birthday') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.HiredAt') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.ContractType') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.ContractDuration') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.Role') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.StreetName') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.ZipCode') }}</th>
                        <th class="text-subtitle-1 font-weight-semibold">{{ $t('Table.Keys.HouseNumber') }}</th>
                        <th
                            class="text-subtitle-1 font-weight-semibold"
                            v-if="
                                permissionsStore.permissions.includes('users.change_tenantuser') ||
                                permissionsStore.permissions.includes('users.delete_tenantuser')
                            "
                        >
                            {{ $t('Table.Keys.Actions') }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="!data_arrived">
                        <td colspan="13" class="mt-3">
                            <div style="margin: auto" class="loading">
                                <VueLoader class="d-block mx-auto" />
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="filteredList.length < 1">
                        <td colspan="13">
                            <div style="margin: auto" class="no-data">
                                <v-img :src="nodata" max-width="180" class="d-block mx-auto" />
                                <div class="text-h4 text-center font-weight-light">No data found.</div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else v-for="employee in filteredList" :key="employee.id">
                        <td class="text-subtitle-1">#{{ employee.id }}</td>
                        <td>
                            <div class="d-flex align-center py-4">
                                <div>
                                    <!--                                        :src="host + employee.employee_profile?.profile_photo"-->
                                    <v-img
                                        v-if="!!employee.profile_photo"
                                        :src="imageUrlBuilder(employee.profile_photo)"
                                        :lazy-src="imageUrlBuilder(employee.profile_photo)"
                                        width="45px"
                                        class="rounded-circle img-fluid"
                                    ></v-img>
                                    <v-avatar color="primary" v-else>
                                        <span class="text-h5 text-white">{{ employee.email.charAt(0).toUpperCase() }}</span>
                                    </v-avatar>
                                </div>

                                <div class="ml-5">
                                    <h4 class="text-h6">
                                        {{
                                            employee.first_name && employee.last_name
                                                ? employee.first_name + ' ' + employee.last_name
                                                : 'user name'
                                        }}
                                    </h4>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ employee.email }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-subtitle-1">
                            <v-btn @click="sendHours" color="primary">{{ $t('Table.Keys.SendHours') }}</v-btn>
                        </td>
                        <td class="text-subtitle-1">{{ employee.phone_number ? employee.phone_number : '-----' }}</td>
                        <td class="text-subtitle-1">
                            <v-chip v-ripple class="ma-2" :color="employee.is_verified ? 'success' : 'error'" variant="outlined">
                                <v-icon start :icon="employee.is_verified ? 'mdi-check-decagram' : 'mdi-close-circle-outline'"></v-icon>
                                {{ employee.is_verified ? t('Table.Keys.Verified') : t('Table.Keys.Unverified') }}
                            </v-chip>
                        </td>
                        <td class="text-subtitle-1">
                            <v-chip v-ripple class="ma-2" :color="employee.is_active ? 'success' : 'error'" variant="outlined">
                                <v-icon size="10" class="mr-1" :icon="employee.is_active ? 'mdi-circle' : 'mdi-circle'"></v-icon>
                                {{ employee.is_active ? t('Table.Keys.Active') : t('Table.Keys.Inactive') }}
                            </v-chip>
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.city ? employee.city : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.last_login != null ? format(new Date(employee.last_login), 'dd-MM-yyy HH:mm a') : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.birthday != null ? format(new Date(employee.birthday), 'dd-MM-yyy') : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.hired_at != null ? format(new Date(employee.hired_at), 'dd-MM-yyy') : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{
                                employee.contract_type == 'cdi'
                                    ? 'CDI'
                                    : employee.contract_type == 'cdd'
                                    ? 'CDD'
                                    : employee.contract_type == 'internship'
                                    ? t('Table.Internship')
                                    : employee.contract_type == 'Freelance'
                                    ? t('Table.Freelance')
                                    : '-----'
                            }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.contract_duration ? employee.contract_duration + ' months' : '-----' }}
                        </td>
                        <td>
                            <v-chip v-ripple size="small" label v-if="employee.position != null"
                                >{{ computedPosition(employee.position) }}
                            </v-chip>
                            <span v-else>-----</span>
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.street_name ? employee.street_name : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.zip_code ? employee.zip_code : '-----' }}
                        </td>
                        <td class="text-subtitle-1">
                            {{ employee.house_number ? employee.house_number : '-----' }}
                        </td>
                        <td>
                            <div class="d-flex align-center">
                                <v-tooltip :text="t('Table.Edit')" v-if="permissionsStore.permissions.includes('users.change_tenantuser')">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="openAsEditDialog(employee)" v-bind="props">
                                            <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip
                                    :text="t('Table.Delete')"
                                    v-if="permissionsStore.permissions.includes('users.delete_tenantuser')"
                                >
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="openDeleteDialog(employee.id as number)" v-bind="props">
                                            <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-row class="d-flex mt-2">
                <v-col cols="1">
                    <v-select label="pages" v-model="employeeStore.page_size" :items="[5, 10, 15, 20, 25]" variant="underlined"></v-select>
                </v-col>
                <v-col cols="11">
                    <v-pagination
                        :length="employeeStore.pagination.total_pages"
                        class="float-right"
                        :total-visible="Math.floor(employeeStore.pagination.count / employeeStore.page_size)"
                        v-model="employeeStore.current_page"
                        @next="employeeStore.navigateNext"
                        @prev="employeeStore.navigatePrev"
                        rounded="circle"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<style scoped>
.btn1 {
    width: 5rem;
    height: 3rem;
}

.fieldTitle {
    font-weight: bold;
    font-size: 1rem;
    color: rgb(var(--v-theme-primary));
}

.btn2 {
    width: 8rem;
    height: 3rem;
}
</style>
