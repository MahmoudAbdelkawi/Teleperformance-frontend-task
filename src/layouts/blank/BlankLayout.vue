// ===============================|| Blank Layout ||=============================== //
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Logo from '@/layouts/full/logo/LogoDark.vue';
/* Login form */
import logobg from '@/assets/images/backgrounds/login-planfy.svg';
import planfy from '@/assets/images/logos/Logo.svg';
</script>

<template>
    <v-app>
        <div class="pa-3">
            <v-row class="h-100vh mh-100 auth">
                <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication position-relative">
                    <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                        <div class="position-relative">
                            <Logo />
                        </div>
                    </div>
                    <div class="">
                        <img :src="planfy" height="330" class="position-relative d-none d-lg-flex" alt="login-background" />
                        <h1 class="text-h1 text-center text-capitalize mt-5">Planfy</h1>
                        <h2 class="text-center">{{ $t('Login.Description') }}</h2>
                    </div>
                </v-col>
                <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center bg-surface">
                    <div class="mt-xl-0 mt-5" :class="$vuetify.display.mdAndDown ? 'h-100vh' : 'mw-100'">
                        <RouterView />
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-app>
</template>
