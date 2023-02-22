<script setup lang="ts">
import { ref } from 'vue';
import IconCannabis from './icons/IconCannabis.vue';
const loadState = ref<number>(-1);
const loadeddata = () => {
    loadState.value = 1;
};
defineProps<{
    src: string,
    alt: string
}>();

</script>

<template>
    <div class="bg-black bg-opacity-25">
        <img :src="src" :alt="alt" v-on:load="loadeddata"
            :class="[loadState !== -1 ? '' : 'opacity-0 absolute', 'h-full w-full object-contain']">
        <IconCannabis v-if="loadState === -1" class="h-full w-full mx-auto text-green-600 floating" />
    </div>
</template>

<style>
.floating {
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}

@keyframes floating {
    0% {
        transform: translate(0, 0px);
    }

    50% {
        transform: translate(0, 5px);
    }

    100% {
        transform: translate(0, -0px);
    }
}
</style>
