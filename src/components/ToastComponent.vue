<script lang="ts" setup>
import { useToastStore } from '../stores/toast.store';
const toastStore = useToastStore();
</script>
<style>
@import '../assets/toast.css';
</style>
<template>
    <div id="snackbar"
        :class="[(toastStore.visibility === true ? 'show' : toastStore.msg ? 'hide' : ''), toastStore.color]">
        <span class="break-words">
            {{toastStore.msg}}
        </span>
    </div>
</template>
