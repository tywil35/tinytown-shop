<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { ref, computed } from 'vue';
import type { Data } from '@/interfaces/data.interface';
import IconPlus from './icons/IconPlus.vue';
const emit = defineEmits<{
    (e: 'add', product: string): void,
    (e: 'quick', product: string): void,
    (e: 'remove', product: Data<any>): void,
    (e: 'push', product: Data<any>): void,
}>()
const props = defineProps<{
    selected: Data<any>[],
    data: Data<any>[],
}>();
const search = ref<string>('');
const focus = ref<boolean>(false);
const searchResults = computed((): Data<any>[] => {
    if (!search.value) {
        return props.data;
    }
    return props.data.filter((d) => {
        const reg = new RegExp(`^${search.value.toLowerCase()}`);
        return reg.test(d.name.toLowerCase());
    });
});
const resetSearch = () => {
    search.value = '';
    focus.value = false;
};
const pushData = (result: Data<any>) => {
    emit('push', result);
    setTimeout(resetSearch, 100);
};
const addData = () => {
    emit('add', search.value);
    setTimeout(resetSearch, 100);
};
const quickSearch = () => {
    emit('quick', search.value);
};
const remove = (data: Data<any>) => {
    emit('remove', data);
};
</script>

<template>
    <div class="py-2 px-4 relative ">
        <ul class="flex flex-wrap gap-1 justify-end">
            <li class="bg-blue-500 text-white rounded text-center p-1 cursor-pointer" v-for="d in selected"
                :key="d.id + 'selected'">{{ d.name }}<span class="p-1" @click="remove(d)">&nbsp;x</span></li>
            <li class="w-1/2 flex gap-2">
                <input
                    class="w-full placeholder-gray-400 block px-3 py-1.5 text-base font-normal  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus: text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none"
                    type="text" v-model="search" @focus="focus = true" placeholder="Search..." @change="quickSearch">
                <IconPlus v-if="false" class="m-auto cursor-pointer h-7 w-7 hover: hover:bg-opacity-20"
                    @click="addData" />
            </li>
        </ul>
        <ul class="overflow-auto h-52 w-full z-10 grid gap-1 divide-y p-2 absolute border bg-white border-green-600 text-black"
            v-if="focus">
            <li @click="resetSearch" class="text-xs cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 uppercase font-bold">
                close
            </li>
            <li v-for="result in searchResults" :key="result.id + 'data'" @click="pushData(result)"
                class="cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 ml-2">
                {{ result.name }}
            </li>
            <li @click="resetSearch" class="text-xs cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 uppercase font-bold">
                close
            </li>
        </ul>
    </div>
</template>
