<script setup lang="ts">
import { ref } from 'vue';
import InputText from '../components/InputText.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import CheckboxComponent from '../components/CheckboxComponent.vue';
import { RegexPattern } from '@/utils/regex-pattern.util';
import { RegisterUserService } from '@/service/register-user.service';
import { useToastStore } from '@/stores/toast.store';
const toastStore = useToastStore();
const emit = defineEmits<{
    (e: 'login'): void
}>()
const resetForm = () => {
    username.value = '';
    email.value = '';
    cell.value = '';
    psswrd.value = '';
    verifyGoa.value = false;
};
const username = ref<string>('');
const email = ref<string>('');
const cell = ref<string>('');
const psswrd = ref<string>('');
const verifyGoa = ref<boolean>(false);
const registerUser = () => {
    RegisterUserService.Send({
        username: username.value,
        email: email.value,
        cell: cell.value,
        psswrd: psswrd.value,
        verifyGoa: verifyGoa.value
    }).then(res => {
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: res.message,
            x: 5000
        });
        resetForm();
        emit('login');
    })
        .catch(err => {
            toastStore.showFor({
                msg: err.message
            })
        });
};
</script>

<template>
    <div class="overflow-auto z-50 left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-20">
        <div class=" m-auto my-20 bg-white shadow-xl w-3/4 lg:w-1/4 py-4 px-2 rounded">
            <div class="grid justify-center m-4">
                <img class="w-auto h-24" src="/img/tinytown.png" alt="tiny town logo">
            </div>
            <div class="grid gap-8">
                <InputText typed="text" named="Username" :require="true" v-model:valued="username"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Provide username" />
                <InputText typed="email" named="Email" :require="true" v-model:valued="email"
                    :validation="RegexPattern.COMMON_EMAIL_ID" validationMessage="Provide email" />
                <InputText typed="tel" named="Cell No." :require="true" v-model:valued="cell"
                    :validation="RegexPattern.DIRTY_CELL" validationMessage="Provide cell" />
                <InputText typed="password" named="Password" :require="true" v-model:valued="psswrd"
                    :validation="RegexPattern.MODERATE_PASSWORD" validationMessage="Provide password" />
                <CheckboxComponent class="mt-2 mb-8 mx-auto" v-model:valued="verifyGoa" label="Verify GOA Membership" />
            </div>
            <div class="grid gap-2">
                <ButtonComponent @click="registerUser" color="bg-green-600 hover:bg-green-500">
                    Register
                </ButtonComponent>
                <span class="text-center">OR</span>
                <ButtonComponent @click="emit('login')">
                    Login
                </ButtonComponent>
                <a v-if="verifyGoa === true" href="https://www.growone.africa"
                    class="my-2 text-center underline visited:text-green-600 text-green-600 uppercase text-xs">
                    GrowOne.Africa</a>
            </div>
        </div>
    </div>
</template>
