const SelectTenantRoute = {
    path: '/select-tenant',
    meta: {
        requiresAuth: true
    },
    // redirect: '/',
    component: () => import('@/views/authentication/SelectTenant.vue')
};

export default SelectTenantRoute;
