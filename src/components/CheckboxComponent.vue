<template>
    <div class="flex gap-1 cursor-pointer" @click="val = !val">
        <div :class="['shadow my-auto border border-green-600 rounded h-4 w-4', val === true ? 'bg-green-600' : 'bg-gray-400 bg-opacity-25']"></div>
        <span class="mx-2 my-auto pointer-events-none">{{label}}</span>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits<{
    (e: 'update:valued', valued: boolean): void
}>()
const prop = defineProps<{
    label: string,
    valued: boolean
}>();
const val = computed({
    get: () => prop.valued,
    set: (v) => {
        emit('update:valued', v);
    }
});
</script>
