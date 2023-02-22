<script setup lang="ts">
import { ref, computed } from 'vue';
const emit = defineEmits<{
    (e: 'update:valued', valued: number): void
}>()
const prop = defineProps<{
    named: string,
    require?: boolean,
    typed?: string,
    validationMessage?: string,
    valued: number,
}>();
const invalid = ref<boolean>(prop.require ?? false);

const inputCSS = computed(() => {
    const input_css = ['common']
    if (!prop.require) {
        return input_css;
    }
    input_css.push(invalid.value === true ? 'invalid' : 'valid');
    return input_css;
});

const inputType = computed(() => {
    return 'number';
});
const val = computed({
    get: () => prop.valued,
    set: (v) => {
        emit('update:valued', v);
    }
});
const showPassword = ref<boolean>(false);
</script>

<template>
    <div class="relative">
        <input onclick="this.select();" :name="prop.named" :type="inputType" placeholder=" " v-model="val" :required="prop.require ?? false"
            :class="inputCSS">
        <label :for="prop.named" class="-z-1 input-label">{{ prop.named
        }}</label>
        <label v-if="invalid" :for="prop.named" class="absolute ml-1 text-red-600 text-xs">{{ prop.validationMessage
        }}</label>
        <div v-if="prop.typed === 'password'" class="cursor-pointer absolute top-2 right-1 z-10 select-none">
            <a v-if="!showPassword" @click="showPassword = true">&#128065;</a>
            <a v-if="showPassword" @click="showPassword = false">&#128272;</a>
        </div>
    </div>
</template>

<style>
@import '../assets/input.css';
</style>