const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: async () => await import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: async () => await import('@/views/dashboard/Dashboard.vue')
        },
    ]
};

export default MainRoutes;
