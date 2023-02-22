import type { RouteRecordRaw } from "vue-router";

export const OpenRoutes: RouteRecordRaw = {
    path: '/',
    redirect: "/shop",
    meta: {
        title: "Shop Portal",
        metaTags: [
            {
                name: "description",
                content: "Portal",
            },
        ],
    },
    children: [
        {
            path: "shop",
            name: "shop",
            component: () => import('../views/ShopPage.vue')
        },
        {
            path: "cart",
            name: "cart",
            component: () => import('../views/CartPage.vue')
        },
        {
            path: "forgot-password",
            name: "forgot-password",
            component: () => import('../views/ForgotPasswordPage.vue')
        },
    ],
};