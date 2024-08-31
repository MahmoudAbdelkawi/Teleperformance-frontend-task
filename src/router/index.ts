import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes,
    ]
});

router.beforeEach(async (to, from, next) => {
    /*const tenantStore = useTenantStore();
    const subdomain = tenantStore.tenantId.replace('api', ''); // Retrieve the subdomain from the Pinia store and remove api from it
    const url = window.location;
    console.log('******** logging actual url *****************');
    console.log(url);
    if (subdomain && !url.toString().includes(subdomain)) {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        const newUrl = `${protocol}//${subdomain}.${hostname}${port ? ':' + port : ''}${to.path}`;
        console.log('***************** print from second router before each ******************');
        console.log(newUrl);
        window.location.href = newUrl;
    }*/

    // redirect to login page if not logged in and trying to access a restricted page
    const auth: any = useAuthStore();
    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);
    if (!auth.loggedIn) {
        try {
            // await auth.REFRESH_TOKEN();
        } catch (err) {
            console.log(err);
        }
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired) {
            if (auth.loggedIn) {
                return next();
            } else {
                return next('/auth/login');
            }
        }
    } else {
        if (to.path === '/auth/login') {
            if (auth.loggedIn) {
                return next('/');
            } else {
                return next();
            }
        }
        return next();
    }
});

export default router;
