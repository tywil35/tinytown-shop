import { defineStore } from 'pinia'
export interface IMenuStore {
    adminUsers: boolean;
    adminProduct: boolean;
    orders: boolean;
}
export const useMenuStore = defineStore<'menu-store', IMenuStore, Record<string, never>, { setAdminUsers(adminUsers: boolean): void, setAdminProducts(adminProduct: boolean): void, setOrders(orders: boolean): void }>({
    id: 'menu-store',
    state: () => ({
        adminUsers: false,
        adminProduct: false,
        orders: false,
    }),
    actions: {
        setAdminUsers(adminUsers: boolean): void {
            this.adminUsers = adminUsers;
        },
        setAdminProducts(adminProduct: boolean): void {
            this.adminProduct = adminProduct;
        },
        setOrders(orders: boolean): void {
            this.orders = orders;
        },
    }
});