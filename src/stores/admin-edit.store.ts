import type { InvoiceModel } from '@/interfaces/invoice.interface';
import type { ProductModel } from '@/interfaces/product.interface';
import type { UserModel } from '@/interfaces/user.inteface';
import { defineStore } from 'pinia'
export interface AdminEdit {
    product?: ProductModel;
    user?: UserModel;
    invoice?: InvoiceModel;
}
export const useAdminEditStore = defineStore<'admin-edit', AdminEdit, Record<string, never>, { setProduct(product?: ProductModel): void, setUser(user?: UserModel): void, setInvoice(invoice?: InvoiceModel): void }>({
    id: 'admin-edit',
    state: () => ({
        product: undefined,
        user: undefined,
        invoice: undefined,
    }),
    actions: {
        setProduct(product?: ProductModel): void {
            this.product = product;
        },
        setUser(user?: UserModel) {
            this.user = user;
        },
        setInvoice(invoice?: InvoiceModel) {
            this.invoice = invoice;
        }
    }
});