<script setup lang="ts">
import ButtonComponent from '../components/ButtonComponent.vue';
import { LocalStorageEnum } from '../enum/local-storage.enum';
const emit = defineEmits<{
    (e: 'im21'): void
}>()
const IamOver21 = () => {
    localStorage.setItem(LocalStorageEnum.GOA_MEMBER, 'true');
    emit('im21');
};
const IamNotOver21 = () => {
    localStorage.setItem(LocalStorageEnum.GOA_MEMBER, 'false');
    history.back();
};
</script>

<template>
    <div class="overflow-auto z-50 left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-20">
        <div class=" m-auto my-20 bg-white shadow-xl w-3/4 lg:w-1/4 py-4 px-2 rounded">
            <div class="grid justify-center m-4">
                <img class="w-auto h-24" src="/img/tinytown.png" alt="tiny town logo">
            </div>
            <div class="grid gap-2">
                <h1 class="text-center font-bold text-3xl">Already G.O.A. member?</h1>
                <p class="text-center mb-4">This is G.O.A. members only area.</p>
                <div class="grid gap-2">
                    <ButtonComponent color="bg-green-600 hover:bg-green-500" @click="IamOver21">
                        G.O.A. Member
                    </ButtonComponent>
                    <ButtonComponent @click="IamNotOver21">
                        Exit
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>
</template>
