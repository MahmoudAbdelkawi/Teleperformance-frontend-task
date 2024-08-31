<script setup lang="ts">
import { ref } from 'vue';
import { useSideBarMenuStore } from '@/stores/side-bar-menu';
import Icon from '@/layouts/full/horizontal-sidebar/Icon.vue';
import { useRouter } from 'vue-router';

const menuStore = useSideBarMenuStore();
const value = ref(1);
const router = useRouter();

function navigate(link: any) {
    router.push(link);
}
</script>

<template>
    <v-bottom-navigation v-model="value" mode="shift" grow color="primary" style="height: 56px">
        <v-btn :value="link.to" @click="navigate(link.to)" v-for="link in menuStore.getHorizontalBarItems">
            <Icon :item="link.icon" size="25" />
            <span>{{ $t(link.title!) }}</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped lang="scss"></style>
