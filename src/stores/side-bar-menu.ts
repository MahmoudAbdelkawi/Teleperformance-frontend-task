import { defineStore } from 'pinia';
import { router } from '@/router';
import { usePermissionStore } from '@/stores/permission';
import { computed, ref, shallowRef } from 'vue';
import type { profileType } from '@/types/HeaderTypes';
import {
    HomeIcon,
    BellIcon,
    BriefcaseIcon,
    UsersIcon,
    SettingsIcon,
    LogoutIcon,
    CalendarEventIcon,
    ListCheckIcon,
    MessageIcon,
    WalletIcon,
    LayoutDashboardIcon,
    UserIcon,
    TargetIcon
} from 'vue-tabler-icons';
import horizontalItems from '@/layouts/full/horizontal-sidebar/horizontalItems';
import { useAuthStore } from '@/stores/auth';
interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const profileDD: profileType[] = [
    {
        avatar: 'account',
        title: 'My Profile',
        subtitle: 'Account settings',
        href: '/profile-settings/profile'
    },
    // {
    //     avatar: 'inbox',
    //     title: 'My Inbox',
    //     subtitle: 'Messages & Emails',
    //     href: '/inbox'
    // },
    {
        avatar: 'file-tree',
        title: 'My Tasks',
        subtitle: 'To-do and Daily tasks',
        href: '/tasks'
    }
    // {
    //     avatar: 'card-bulleted-settings',
    //     title: 'Payment',
    //     subtitle: 'Manage your payment',
    //     href: '/payments'
    // }
];

const sidebarItem: menu[] = [
    { header: 'Planfy' },
    {
        title: 'SideBar.Home',
        icon: HomeIcon,
        to: '/'
    },
    {
        title: 'Projects.Title',
        icon: BriefcaseIcon,
        to: '/projects'
    },
    // {
    //     title: 'SideBar.Notifications',
    //     icon: BellIcon,
    //     to: '/notifications'
    // },
    // {
    //     title: 'SideBar.Documents',
    //     icon: BriefcaseIcon,
    //     to: '/documents'
    // },
    {
        title: 'Overview',
        icon: TargetIcon,
        to: '/overview'
    },
    {
        title: 'SideBar.Team',
        icon: UsersIcon,
        to: '/employee-management'
    },
    {
        title: 'SideBar.Client',
        icon: UserIcon,
        to: '/clients'
    },
    {
        title: 'SideBar.Tasks',
        icon: ListCheckIcon,
        to: '/tasks'
    },
    {
        title: 'SideBar.Documents',
        icon: BriefcaseIcon,
        to: '/documents'
    },
    { header: 'SideBar.Settings' },

    {
        title: 'SideBar.MainSettings',
        icon: SettingsIcon,
        // to: '/settings'
        to: '/profile-settings/profile'
        // type: 'external'
    }
    // {
    //     title: 'SideBar.Logout',
    //     icon: LogoutIcon,
    //     to: '/logout'
    //     // type: 'external'
    // }
];
const top_bar: menu[] = [
    {
        title: 'Navbar.Dashboard',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    {
        title: 'Navbar.Schedule',
        icon: CalendarEventIcon,
        to: '/schedule'
    },
    {
        title: 'Overview',
        icon: TargetIcon,
        to: '/overview'
    }
    // {
    //     title: 'Navbar.Inbox',
    //     icon: MessageIcon,
    //     to: '/inbox'
    // },
    // {
    //     title: 'Navbar.Payments',
    //     icon: WalletIcon,
    //     to: '/payments'
    // }
];

// computed prop

export const useSideBarMenuStore = defineStore('side-bar', () => {
    const permissionsStore = usePermissionStore();
    const authStore = useAuthStore();
    const menuItems = shallowRef(sidebarItem);
    const profileData = shallowRef(profileDD);
    const horizontalItems = shallowRef(top_bar);
    const getHorizontalBarItems = computed(() => {
        // if not remove item
        let hItems = [...horizontalItems.value];
        if (!permissionsStore.permissions.includes('event.view_event')) {
            hItems = hItems.filter((item: menu) => item.to != '/schedule');
        }
        if (!authStore.user.is_superuser) {
            hItems = hItems.filter((item: menu) => item.to != '/overview');
        }
        return hItems;
    });
    const getMenuItems = computed(() => {
        let vItems = [...menuItems.value];
        if (!permissionsStore.permissions.includes('users.view_tenantuser')) {
            vItems = vItems.filter((item: menu) => item.to != '/employee-management');
        }
        if (!permissionsStore.permissions.includes('tasks.view_task')) {
            vItems = vItems.filter((item: menu) => item.to != '/tasks');
        }
        if (!permissionsStore.permissions.includes('client.view_client')) {
            vItems = vItems.filter((item: menu) => item.to != '/clients');
        }
        if (!authStore.user.is_superuser) {
            vItems = vItems.filter((item: menu) => item.to != '/overview');
        }
        if (!permissionsStore.permissions.includes('project.view_project')) {
            vItems = vItems.filter((item: menu) => item.to != '/projects');
        }
        if (!permissionsStore.permissions.includes('documents.view_document')) {
            vItems = vItems.filter((item: menu) => item.to != '/documents');
        }
        return vItems;
    });
    return { permissionsStore, menuItems, getMenuItems, getHorizontalBarItems, horizontalItems, profileData };
});
