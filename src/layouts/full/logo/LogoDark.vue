<script setup lang="ts">
import { RouterLink } from 'vue-router';
import planfylogo from '@/assets/images/logos/Logo.svg';
import { useCustomizerStore } from '@/stores/customizer';
import logo from '@/assets/images/logos/Logo.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/" class="d-flex" style="color: #f60c87; text-decoration: none" v-if="false">
            <img :src="planfylogo" alt="planfy logo" width="38" />
            <h4 class="pa-2">Planfy</h4>
        </RouterLink>

        <RouterLink to="/" class="d-flex justify-center" style="color: #f60c87; text-decoration: none" v-else>
            <v-expand-x-transition>
                <img
                    :src="logo"
                    alt="logo"
                    :width=" '50'"
                />
            </v-expand-x-transition>
        </RouterLink>
    </div>
</template>
