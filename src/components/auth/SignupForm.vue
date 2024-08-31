<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

const authStore = useAuthStore();
const router = useRouter(); // Initialize router for navigation

const valid = ref(false);
const password = ref('');
const email = ref('');
const userName = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters'
]);
const emailRules = ref([
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]);

const userNameRules = ref([
    (v: string) => !!v || 'Username is required',
    (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters'
]);

async function validate(values: any, { setErrors }: any) {
    try {
        await authStore.SIGNUP(email.value, password.value, userName.value, 'User');
        showSnackbar('Signup successful', 'elevated', 'success');
    } catch (err: any) {
        if (err.response) {
            if (err.response.data.error) {
                showSnackbar(err.response.data.error, 'elevated', 'error');
            } else if (err.response.status === 0) {
                showSnackbar('Something went wrong', 'elevated', 'error');
            } else {
                showSnackbar(err, 'elevated', 'error');
            }
        }
    }
}

const show_password = ref(false);
const snackbar = ref(false);
const snackbar_color = ref('');
const snackbar_variant = ref<any>();
const snackbar_message = ref('');

function showSnackbar(message: string, variant: string | null, color: string) {
    snackbar_variant.value = variant;
    snackbar_color.value = color;
    snackbar_message.value = message;
    snackbar.value = true;
}

function navigateToLogin() {
    router.push('/auth/login'); // Navigate to the login page
}
</script>

<template>
    <h2 class="text-h1 font-weight-semibold text-center text-primary mb-2">{{ $t('Login.Title') }} Planfy</h2>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="px-5 py-3 position-relative">{{ $t('Login.Instructions') }}</span>
        </div>
    </div>
    <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('Login.Username') }}</v-label>
        <VTextField v-model="userName" :rules="userNameRules" class="mb-8" required hide-details="auto"></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('Login.Email') }}</v-label>
        <VTextField v-model="email" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('Login.Password') }}</v-label>
        <VTextField
            v-model="password"
            :rules="passwordRules"
            :type="show_password ? 'text' : 'password'"
            :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password = !show_password"
            required
            hide-details="auto"
            class="pwdInput my-4"
        ></VTextField>
        <div class="d-flex flex-wrap align-center my-4 ml-n2">
        </div>
        <v-btn size="large" :loading="isSubmitting" color="primary" class="text-uppercase" :disabled="valid" block type="submit" flat>
            {{ $t('Login.SignUp') }}
        </v-btn>
        <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
        </div>
    </Form>
    <v-snackbar v-model="snackbar" :variant="snackbar_variant" :color="snackbar_color" rounded="pill">
        {{ snackbar_message }}
        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false"> Close</v-btn>
        </template>
    </v-snackbar>
    <div class="text-center mt-4">
        <v-btn text @click="navigateToLogin">{{ $t('Login') }}</v-btn>
    </div>
</template>
