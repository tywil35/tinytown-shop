<script lang="ts" setup>
import { computed } from 'vue';
interface Props {
    valued: boolean
}
const emit = defineEmits<{
    (e: 'update:valued', valued: boolean): void
    (e: 'change'): void
}>()
const prop = defineProps<Props>();
const val = computed({
    get: () => prop.valued,
    set: (v) => {
        emit('update:valued', v);
    }
});
</script>
<template>
    <div class="flex">
        <div class="m-auto toggle-container">
            <input type="checkbox" v-model="val" class="toggle-checkbox" @change="$emit('change')" />
            <label class="toggle-label"></label>
        </div>
        <label class="m-auto text-black">
            <slot></slot>
        </label>
    </div>
</template>
<style>
@import '../assets/switch_button.css';
</style>
