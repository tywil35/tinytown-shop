<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TailwindButtonDefault } from '@/enum/tailwind-default.enum';
interface Props {
    color?: string;
    disabledClass?: string;
    pad?: string;
    pointer?: string;
    shape?: string;
    textAlign?: string;
    textColor?: string;
}
withDefaults(defineProps<Props>(), {
    color: TailwindButtonDefault.COLOR,
    disabledClass: TailwindButtonDefault.DISABLED_CLASS,
    pad: TailwindButtonDefault.PAD,
    pointer: TailwindButtonDefault.POINTER,
    shape: TailwindButtonDefault.SHAPE,
    textAlign: TailwindButtonDefault.TEXT_ALIGN,
    textColor: TailwindButtonDefault.TEXT_COLOR,
})

const buttonHtml = ref<HTMLElement | undefined>(undefined);
const checkButtonEvents = () => {
    if (buttonHtml.value) {
        buttonHtml.value.addEventListener('click', () => {
            buttonHtml.value?.classList.add('clicked-animation');
            setTimeout(() => {
                buttonHtml.value?.classList.remove('clicked-animation');
            }, 1000);
        })
    }
};
onMounted(checkButtonEvents);
</script>
<template>
    <button ref="buttonHtml" :class="[pointer, pad, textAlign, textColor, color, disabledClass, shape]">
        <slot></slot>
    </button>
</template>
<style>
@import '../assets/animation/clicked.css';
</style>