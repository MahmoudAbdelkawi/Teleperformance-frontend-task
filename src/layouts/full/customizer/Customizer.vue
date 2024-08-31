<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import { LayoutDistributeHorizontalIcon, LayoutDistributeVerticalIcon, LayoutSidebarLeftCollapseIcon } from 'vue-tabler-icons';

const customizer = useCustomizerStore();
const theme = useTheme();
// Dark Theme Colors
const darkTheme = ref({ name: 'DARK', bg: 'themeDarkRed' });
// themes color options
const defaultTheme = ref({ name: 'DEFAULT', bg: 'themeRed' });
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
    <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="320">
        <div class="pa-6">
            <h5 class="text-h5">Settings</h5>
        </div>
        <v-divider></v-divider>
        <perfect-scrollbar style="height: calc(100vh - 90px)">
            <div class="pa-6">
                <h6 class="text-h6 mt-8 mb-5">Light Theme</h6>
                <v-item-group mandatory v-model="customizer.actTheme" class="ml-n2 v-row">
                    <v-col cols="4" class="pa-2">
                        <v-item v-slot="{ isSelected, toggle }" :value="defaultTheme.name">
                            <v-sheet
                                rounded="md"
                                class="border cursor-pointer d-block text-center px-5 py-4 hover-btn"
                                elevation="9"
                                @click="toggle"
                            >
                                <v-icon>mdi-white-balance-sunny</v-icon>
                            </v-sheet>
                        </v-item>
                    </v-col>
                </v-item-group>
                <h6 class="text-h6 mt-11 mb-5">Dark theme</h6>
                <v-item-group mandatory v-model="customizer.actTheme" class="ml-n2 v-row">
                    <v-col cols="4" class="pa-2">
                        <v-item v-slot="{ isSelected, toggle }" :value="darkTheme.name">
                            <v-sheet
                                rounded="md"
                                class="border cursor-pointer d-block text-center px-5 py-4 hover-btn"
                                elevation="9"
                                @click="toggle"
                            >
                                <v-avatar size="25">
                                    <v-icon>mdi-brightness-4</v-icon>
                                </v-avatar>
                            </v-sheet>
                        </v-item>
                    </v-col>
                </v-item-group>
                <!--              change calendar color-->
                <!--                <h6 class="text-h6 mt-11 mb-5">Calendar overview Color</h6>-->
                <!--                <v-item-group mandatory v-model="customizer.overview_calendar_color" class="ml-n2 v-row">-->
                <!--                    <v-col cols="4" v-for="color in customizer.colors" :key="color.name" class="pa-2">-->
                <!--                        <v-item v-slot="{ isSelected, toggle }" :value="color.value">-->
                <!--                            <v-sheet-->
                <!--                                rounded="md"-->
                <!--                                class="border cursor-pointer d-block text-center px-5 py-4 hover-btn"-->
                <!--                                elevation="9"-->
                <!--                                @click="toggle"-->
                <!--                            >-->
                <!--                                <v-avatar :style="{ backgroundColor: color.value }" size="25">-->
                <!--                                    <CheckIcon color="white" size="18" v-if="isSelected" />-->
                <!--                                </v-avatar>-->
                <!--                            </v-sheet>-->
                <!--                        </v-item>-->
                <!--                    </v-col>-->
                <!--                </v-item-group>-->
                <!--              change calendar color-->

                <!--                <h6 class="text-h6 mt-8 mb-5">Change Theme Colors</h6>-->
                <!--                <v-item-group mandatory class="ml-n2 v-row">-->
                <!--                    <v-col cols="12" class="pa-2">-->
                <!--                        <v-item v-slot="{ isSelected, toggle }">-->
                <!--                            <v-sheet-->
                <!--                                v-ripple-->
                <!--                                rounded="md"-->
                <!--                                :color="theme.themes.value['DEFAULT'].colors.primary"-->
                <!--                                class="border cursor-pointer pa-2 text-center my-2 hover-btn"-->
                <!--                                elevation="9"-->
                <!--                            >-->
                <!--                                <div class="text-h4 text-white mt-2">Primary</div>-->
                <!--                            </v-sheet>-->
                <!--                        </v-item>-->
                <!--                        <v-expand-transition>-->
                <!--                            <div class="">-->
                <!--                                <v-color-picker-->
                <!--                                    class="py-2"-->
                <!--                                    v-model="theme.themes.value['DEFAULT'].colors.primary"-->
                <!--                                    show-swatches-->
                <!--                                ></v-color-picker>-->
                <!--                            </div>-->
                <!--                        </v-expand-transition>-->
                <!--                    </v-col>-->
                <!--                </v-item-group>-->

                <h6 class="text-h6 mt-11 mb-2">Container Option</h6>
                <v-btn-toggle v-model="customizer.boxed" color="primary" class="my-2 btn-group-custom" rounded="0" group>
                    <v-btn :value="true" variant="text" elevation="9" class="rounded-md">
                        <LayoutDistributeVerticalIcon stroke-width="1.5" size="21" class="mr-2" />
                        Boxed
                    </v-btn>
                    <v-btn :value="false" variant="text" elevation="9" class="rounded-md ml-4">
                        <LayoutDistributeHorizontalIcon stroke-width="1.5" size="21" class="mr-2" />
                        Full
                    </v-btn>
                </v-btn-toggle>
                <h6 class="text-h6 mt-11 mb-2">Sidebar Type</h6>
                <v-btn-toggle v-model="customizer.mini_sidebar" color="primary" class="my-2 btn-group-custom" rounded="0" group>
                    <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                        <LayoutSidebarIcon stroke-width="1.5" size="21" class="mr-2" />
                        Full
                    </v-btn>
                    <v-btn :value="true" variant="text" elevation="9" class="rounded-md ml-4">
                        <LayoutSidebarLeftCollapseIcon stroke-width="1.5" size="21" class="mr-2" />
                        Collapse
                    </v-btn>
                </v-btn-toggle>
                <h6 class="text-h6 mt-11 mb-2">Card with</h6>
                <v-btn-toggle v-model="customizer.setBorderCard" color="primary" class="my-2 btn-group-custom" rounded="0" group>
                    <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                        <LayoutSidebarLeftCollapseIcon stroke-width="1.5" size="21" class="mr-2" />
                        Shadow
                    </v-btn>
                    <v-btn :value="true" variant="text" elevation="9" class="rounded-md ml-4">
                        <LayoutSidebarIcon stroke-width="1.5" size="21" class="mr-2" />
                        Border
                    </v-btn>
                </v-btn-toggle>
                <h6 class="text-h6 mt-11 mb-2">Expand on hover</h6>
                <v-btn-toggle v-model="customizer.expand_on_hover" color="primary" class="my-2 btn-group-custom" rounded="0" group>
                    <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                        <LayoutSidebarIcon stroke-width="1.5" size="21" class="mr-2" />
                        Disable
                    </v-btn>
                    <v-btn :value="true" variant="text" elevation="9" class="rounded-md ml-4">
                        <LayoutSidebarLeftCollapseIcon stroke-width="1.5" size="21" class="mr-2" />
                        Expand
                    </v-btn>
                </v-btn-toggle>
                <h6 class="text-h6 mt-11 mb-2">Size of logo on expand</h6>
                <v-text-field type="number" v-model="customizer.size_of_logo_on_expand" />
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>

<style lang="scss"></style>
