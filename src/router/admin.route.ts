import type { RouteRecordRaw } from "vue-router";

export const AdminRoutes: RouteRecordRaw = {
    path: '/admin',
    redirect: "/admin/dashboard",
    meta: {
        title: "Shop Admin Portal",
        metaTags: [
            {
                name: "description",
                content: "Admin Portal",
            },
        ]
    },
    children: [
        {
            path: "product/create",
            name: "admin-product-create",
            component: () => import('../views/AdminCaptureProduct.vue')
        },
        {
            path: "product",
            name: "admin-product",
            component: () => import('../views/AdminProductTable.vue')
        },
        {
            path: "users",
            name: "admin-users",
            component: () => import('../views/AdminUserTable.vue')
        },
        {
            path: "users/create",
            name: "admin-user-create",
            component: () => import('../views/AdminCaptureUser.vue')
        },
        {
            path: "orders",
            name: "admin-orders",
            component: () => import('../views/OrdersPage.vue')
        },
        {
            path: "order",
            name: "staff-check-order",
            component: () => import('../views/OrderPage.vue')
        },
    ],
};