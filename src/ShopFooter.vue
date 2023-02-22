<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '@/stores/cart.store';
import IconProfile from '@/components/icons/IconProfile.vue';
import IconCart from '@/components/icons/IconCart.vue';
import IconStore from '@/components/icons/IconStore.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth.store';
import { useUacStore } from './stores/uac.store';
import IconUsersCog from './components/icons/IconUsersCog.vue';
import IconDeliver from './components/icons/IconDeliver.vue';
import IconPersonBooth from './components/icons/IconPersonBooth.vue';
import { useMenuStore } from './stores/menu-item.store';
const menuStore = useMenuStore();
const router = useRouter();
const cartStore = useCartStore();
const total = computed(() => cartStore.PriceExcludingVAT);
const totalCSRF = computed(() => cartStore.PriceExcludingVATCSRF);
const notificationHtml = ref<HTMLElement | undefined>(undefined);
const totalProducts = computed(() => {
    tingle();
    flipit();
    return cartStore.TotalProducts
});

const tingle = () => {
    notificationHtml.value?.classList.add('shake-animation');
    setTimeout(() => {
        notificationHtml.value?.classList.remove('shake-animation');
    }, 1000);
};

const totalHtml = ref<HTMLElement | undefined>(undefined);
const flipit = () => {
    totalHtml.value?.classList.add('flip-animation');
    setTimeout(() => {
        totalHtml.value?.classList.remove('flip-animation');
    }, 1000);
};
const uacStore = useUacStore();
const authStore = useAuthStore();
const goToProduct = () => {
    router.push({ name: 'admin-product' })
}
const goToOrders = () => {
    router.push({ name: 'admin-orders' })
}
const goToUsers = () => {
    router.push({ name: 'admin-users' })
}
const goToProfile = () => {
    if (!authStore.token) {
        uacStore.showLogin();
        return;
    } else {
        router.push({ name: 'profile' })
    }
};
const goToCart = () => {
    if (!authStore.token) {
        uacStore.showLogin();
        return;
    } else {
        router.push({ name: 'cart' })
    }
};
</script>

<template>
    <footer
        class="w-full bg-green-600 sticky bottom-0 z-10 flex gap-10 justify-center p-2 text-white overflow-x-auto">
        <a v-if="menuStore.adminProduct === true" @click.prevent="goToProduct" class="ml-20">
            <IconPersonBooth class="cursor-pointer hover:text-gray-400 h-7 w-7" />
        </a>
        <a v-if="menuStore.adminUsers === true" @click.prevent="goToUsers">
            <IconUsersCog class="cursor-pointer hover:text-gray-400 h-7 w-7" />
        </a>
        <a v-if="menuStore.orders === true" @click.prevent="goToOrders">
            <IconDeliver class="cursor-pointer hover:text-gray-400 h-7 w-7" />
        </a>
        <a @click.prevent="goToProfile">
            <IconProfile class="cursor-pointer hover:text-gray-400 h-7 w-7" />
        </a>
        <a @click.prevent="router.replace({name: 'shop'})">
            <IconStore class="cursor-pointer hover:text-gray-400 h-7 w-7" />
        </a>
        <span ref="totalHtml" class="flex gap-4 text-sm">
            <span class="m-auto">{{ total }}</span>
            <span class="m-auto">{{ totalCSRF }}</span>
        </span>
        <a @click.prevent="goToCart">
            <div class="relative">
                <div ref="notificationHtml"
                    class="absolute inline-block -bottom-1 -right-2 p-1 bg-red-600 rounded-full z-10 text-white text-center text-xs">
                    {{ totalProducts }}</div>
                <IconCart class="cursor-pointer hover:text-gray-400 h-10 w-10" />
            </div>
        </a>
    </footer>
</template>

<style>
@import './assets/animation/shake.css';
@import './assets/animation/flip.css';
</style>