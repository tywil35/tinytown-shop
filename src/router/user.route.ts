import type { RouteRecordRaw } from "vue-router";

export const UserRoutes: RouteRecordRaw = {
    path: '/consumer',
    redirect: "/consumer/dashboard",
    meta: {
        title: "Shop User Portal",
        metaTags: [
            {
                name: "description",
                content: "User Portal",
            },
        ],
    },
    children: [
        {
            path: "dashboard",
            name: "consumer-dashboard",
            component: () => import('../views/ShopPage.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => {
                return import('../views/ProfilePage.vue');
            }
        },
    ],
};