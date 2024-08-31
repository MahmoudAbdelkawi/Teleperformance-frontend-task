<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDisplay, useTheme } from 'vuetify';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useAuthStore } from '@/stores/auth';
import Customizer from '@/layouts/full/customizer/Customizer.vue';
import AddEmployee from '@/layouts/full/AddEmployee.vue'; // Import the AddEmployee component

const { mdAndUp } = useDisplay();
const customizer = useCustomizerStore();
const theme = useTheme();
const authStore = useAuthStore();
const openEmployeeDialog = ref(false);

const closeDialog=()=>{
    console.log("close dialog");
    openEmployeeDialog.value=false
}


const openAddEmployee = () => {
    openEmployeeDialog.value = true;
};
</script>

<template>
    <v-locale-provider>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : '',
                customizer.inputBg ? 'inputWithbg' : ''
            ]"
        >
            <Customizer />
            <!--          this one-->

            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn
                            
                            :class="$i18n.locale === 'ar' ? 'customizer-btn-left' : 'customizer-btn-right'"
                            size="large"
                            icon
                            variant="flat"
                            color="primary"
                            @click.stop="openAddEmployee()"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </v-container>
                <BottomNavigationBar v-if="!mdAndUp" />
            </v-main>

            <v-dialog v-model="openEmployeeDialog" max-width="500">
                <v-card title="Create Employee">
                    <v-card-text>
                        <AddEmployee :closeDialog="closeDialog" /> <!-- Include the AddEmployee component -->
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Close Dialog" @click="openEmployeeDialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app>
    </v-locale-provider>
</template>
