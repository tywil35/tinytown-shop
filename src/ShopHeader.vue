<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MultiSelectSearchable from '@/components/MultiSelectSearchable.vue';
import type { Data } from '@/interfaces/data.interface';
import { useShopStore } from './stores/shop.store';
import type { CategoryModel } from './interfaces/category.model';
const shopStore = useShopStore();
onMounted(() => {
    shopStore.searchCategory();
    arsd.value = shopStore.selectedCategoriesD[0];
})
const push = (item: Data<CategoryModel>) => {
    shopStore.addCategory(item.value);
};
const arsd = ref<Data<CategoryModel> | undefined>(undefined);
const clicky = (item: Data<CategoryModel>) => {
    shopStore.removeAll();
    push(item);
    arsd.value = item;
};
</script>
    
<template>
    <header
        class="w-full bg-green-600 sticky top-0 z-10 text-white grid grid-flow-row-dense grid-cols-3 md:grid-cols-5 grid-rows-1 gap-2">
        <div v-for="(cat, i) in shopStore.categories" :key="i"
            :class="[(arsd?.name === cat.name ? 'text-yellow-500' : ''), 'cursor-pointer  mx-auto my-2']"
            @click="clicky(cat)">
            <span class="uppercase">{{ cat.name }}</span>
        </div>
    </header>
</template>