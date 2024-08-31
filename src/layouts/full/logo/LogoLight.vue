<script setup lang="ts">
import { RouterLink } from 'vue-router';
import planfylogo from '@/assets/images/logos/Logo.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/" class="d-flex" style="colosr: #f60c87; text-decoration: none" v-if="false">
            <img :src="planfylogo" alt="planfy logo" width="38" />
            <h4 class="pa-2">Planfy</h4>
        </RouterLink>

        <RouterLink to="/" class="d-flex justify-center" style="color: #f60c87; text-decoration: none" v-else>
            <!-- <img :src="true" alt="logo" width="150" /> -->
        </RouterLink>
    </div>
</template>
