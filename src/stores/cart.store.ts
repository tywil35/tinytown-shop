import { defineStore } from 'pinia'
import type { ProductOrder } from '@/interfaces/product.interface';
import { AddCache, FetchCache, StorageType } from '@/utils/cache.util';
interface Cart {
    products: ProductOrder[];
    currency: string;
}
export const useCartStore = defineStore<'cart', Cart, { PriceExcludingVATCSRF(state: Cart): string, PriceExcludingVAT(state: Cart): string, TotalProducts(state: Cart): number }, { addToCart(product: ProductOrder): void, emptyCart(): void, removeFromCart(product: ProductOrder): void }>({
    id: 'cart',
    state: () => ({
        products: FetchCache('cart', StorageType.SESSION_STORAGE) ?? [],
        currency: FetchCache('cart-currency', StorageType.SESSION_STORAGE) ?? '',
    }),
    getters: {
        PriceExcludingVAT: (state: Cart): string => {
            if (state.products.length === 0) {
                return '';
            }
            let total = 0;
            for (let index = 0; index < state.products.length; index++) {
                const product = state.products[index];
                if (product.currency !== 'CSRF') {
                    total += product.option.price * product.quantity;
                }
            }
            if (!total) {
                return '';
            }
            return `R ${total.toFixed(2)}`;
        },
        PriceExcludingVATCSRF: (state: Cart): string => {
            if (state.products.length === 0) {
                return '';
            }
            let total = 0;
            for (let index = 0; index < state.products.length; index++) {
                const product = state.products[index];
                if (product.currency === 'CSRF') {
                    total += product.option.price * product.quantity;
                }
            }
            return `CSRF ${total.toFixed(2)}`;
        },
        TotalProducts: (state: Cart): number => {
            if (state.products.length === 0) {
                return 0;
            }
            let itemCount = 0;
            for (let index = 0; index < state.products.length; index++) {
                const product = state.products[index];
                itemCount += product.quantity;
            }
            return itemCount;
        }
    },
    actions: {
        addToCart(product: ProductOrder): void {
            this.products = this.products.filter(item => item.id !== product.id);
            this.products.push(product);
            AddCache('cart', this.products, StorageType.SESSION_STORAGE);
        },
        emptyCart(): void {
            this.products = [];
            AddCache('cart', this.products, StorageType.SESSION_STORAGE);
        },
        removeFromCart(product: ProductOrder): void {
            this.products = this.products.filter(item => item.id !== product.id);
            AddCache('cart', this.products, StorageType.SESSION_STORAGE);
        }
    }
});