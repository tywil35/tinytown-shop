<script setup lang="ts">
import { onMounted } from 'vue';
import ProductTile from '@/components/ProductTile.vue';
import { useCartStore } from '@/stores/cart.store';
import type { ProductOrder } from '@/interfaces/product.interface';
import { useShopStore } from '@/stores/shop.store';
import ButtonComponent from '../components/ButtonComponent.vue';
import { useUacStore } from '@/stores/uac.store';
import { useAuthStore } from '@/stores/auth.store';
const cartStore = useCartStore();
const shopStore = useShopStore();
const uacStore = useUacStore();
const authStore = useAuthStore();

const cultivate = (productOrder: ProductOrder) => {
    cartStore.addToCart(productOrder);
};
onMounted(() => {
    shopStore.search();
});
</script>

<template>
    <div class="my-20 px-2">
        <div v-if="!authStore.token || shopStore.products.length === 0" class="grid place-items-center gap-4 text-xl font-medium text-center">
            <img class="w-auto h-24" src="/img/tinytown.png" alt="tiny town logo">
            <p>Nothing to see here bud &#128126;</p>
            <p>New user? wait to get your verification call or contact us.</p>
            <div v-if="!authStore.token" class="grid gap-4">
                <p>Not logged in?</p>
                <ButtonComponent @click="uacStore.showLogin();">Login</ButtonComponent>
            </div>
        </div>
        <div v-if="shopStore.products.length > 0">
            <transition-group name="slide-fade" tag="div" class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProductTile :key="product.id" v-for="product in shopStore.products" :product="product"
                    @cultivate="cultivate" />
            </transition-group>
        </div>
    </div>
</template>