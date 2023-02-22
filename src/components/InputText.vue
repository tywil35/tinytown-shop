<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from 'vue';
import {
    RegexTest,
    RegexPattern
} from '@/utils/regex-pattern.util';
const emit = defineEmits<{
    (e: 'update:valued', valued: string): void
}>()
const prop = defineProps<{
    named: string,
    require?: boolean,
    typed?: string,
    validation?: RegexPattern,
    validationMessage?: string,
    valued: string,
}>();
const invalid = ref<boolean>(prop.require ?? false);
const invalidCheck = () => {
    if (!prop.require) {
        invalid.value = false;
        return;
    }
    if (prop.valued === '' && !prop.validation) {
        invalid.value = true;
        return;
    }
    if (prop.valued !== '' && !prop.validation) {
        invalid.value = false;
        return;
    }
    if (prop.validation) {
        invalid.value = !RegexTest[prop.validation](prop.valued);
        return;
    }
};

const inputCSS = computed(() => {
    const input_css = ['common']
    if (!prop.require) {
        return input_css;
    }
    input_css.push(invalid.value === true ? 'invalid' : 'valid');
    return input_css;
});

const inputType = computed(() => {
    if (prop.typed) {
        if (prop.typed === 'password' && showPassword.value) { return 'text' }
        return prop.typed;
    }
    return 'text';
});
const val = computed({
    get: () => prop.valued,
    set: (v) => {
        emit('update:valued', v);
    }
});
const showPassword = ref<boolean>(false);
onMounted(invalidCheck);
onUpdated(invalidCheck);
</script>

<template>
    <div class="relative">
        <input :name="prop.named" :type="inputType" placeholder=" " v-model="val" @change="invalidCheck"
            :required="prop.require ?? false" :class="inputCSS">
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