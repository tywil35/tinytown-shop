<script setup lang="ts">
import { ref } from 'vue';
import InputText from '../components/InputText.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { RegexPattern } from '../utils/regex-pattern.util';
import { UserLoginService } from '../service/user-login.service';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { LocalStorageEnum } from '../enum/local-storage.enum';
import { useAuthStore } from '../stores/auth.store';
import { useUacStore } from '../stores/uac.store';
import { useShopStore } from '@/stores/shop.store';
import { useToastStore } from '@/stores/toast.store';
import { RefreshAuthUtil } from '@/utils/refresh-auth.util';

const uacStore = useUacStore();
const authStore = useAuthStore();
const shopStore = useShopStore();
const toastStore = useToastStore();

const emit = defineEmits<{
    (e: 'register'): void
}>()
const email = ref<string>('');
const password = ref<string>('');
const forgotPassword = () => {
    ForgotPasswordService.Send({
        email: email.value
    }).then(res => {
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: res.message
        })
    })
        .catch(err => {
            toastStore.showFor({
                msg: err.message
            })
        });
};

const login = () => {
    UserLoginService.Send({
        email: email.value,
        psswrd: password.value
    }).then(res => {
        localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, res.access_token);
        authStore.setToken(res.access_token);
        uacStore.hideLogin();
        shopStore.search();
        shopStore.searchCategory();
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: 'Login success'
        })
        RefreshAuthUtil.StartInterval();
    })
        .catch(err => {
            toastStore.showFor({
                msg: err.message
            })
            authStore.clearToken();
        });
};
</script>

<template>
    <div class="overflow-auto z-50 left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-20">
        <div class="m-auto my-20 bg-white shadow-xl w-3/4 lg:w-1/4 py-4 px-2 rounded">
            <div class="grid justify-center m-4">
                <img class="w-auto h-24" src="/img/tinytown.png" alt="tiny town logo">
            </div>
            <div class="grid gap-8">
                <InputText typed="email" named="Email" :require="true" v-model:valued="email"
                    :validation="RegexPattern.COMMON_EMAIL_ID" validationMessage="Provide email" />
                <InputText typed="password" named="Password" :require="true" v-model:valued="password"
                    :validation="RegexPattern.MODERATE_PASSWORD" validationMessage="Provide password" />
                <div class="grid gap-2">
                    <ButtonComponent @click="login">
                        Login
                    </ButtonComponent>
                    <span class="text-center">Open account?</span>
                    <ButtonComponent color="bg-green-600 hover:bg-green-500" @click="emit('register')">
                        Register
                    </ButtonComponent>
                </div>
                <div class="h-10"></div>
                <a @click="forgotPassword"
                    class="text-center underline visited:text-red-500 text-red-600 uppercase text-xs">forgot
                    password</a>
            </div>
        </div>
    </div>
</template>
