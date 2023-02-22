import type { RouteRecordRaw } from "vue-router";

export const VendorRoutes: RouteRecordRaw = {
    path: '/vendor',
    redirect: "/vendor/dashboard",
    meta: {
        title: "Shop Vendor Portal",
        metaTags: [
            {
                name: "description",
                content: "Vendor Portal",
            },
        ],
    },
    children: [
        {
            path: "dashboard",
            name: "vendor-dashboard",
            component: () => import('../views/ShopPage.vue')
        },
    ],
};