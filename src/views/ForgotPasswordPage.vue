<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InputText from '../components/InputText.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { RegexPattern } from '../utils/regex-pattern.util';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { useToastStore } from '@/stores/toast.store';
import { useRoute, useRouter } from 'vue-router';
const toastStore = useToastStore();
const router = useRouter();
const route = useRoute();
const email = ref<string>('');
const forgot_token = ref<string>('');
const password = ref<string>('');
const resetPassword = () => {
    ForgotPasswordService.Validate({
        email: email.value,
        forgot_token: forgot_token.value,
        psswrd: password.value
    }).then(res => {
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: res.message
        })
        router.replace('shop');
    })
        .catch(err => {
            toastStore.showFor({
                msg: err.message
            })
        });
};
onMounted(() => {
    forgot_token.value = route.query.token as string;
});
</script>
<template>
    <div class="my-20  px-2">
        <div class="py-4 px-2 rounded">
            <div class="grid justify-center m-4">
                <img class="w-auto h-24" src="/img/tinytown.png" alt="tiny town logo">
            </div>
            <div class="grid gap-8">
                <InputText typed="email" named="Email" :require="true" v-model:valued="email"
                    :validation="RegexPattern.COMMON_EMAIL_ID" validationMessage="Provide email" />
                <InputText typed="password" named="New Password" :require="true" v-model:valued="password"
                    :validation="RegexPattern.MODERATE_PASSWORD" validationMessage="Provide password" />
                <div class="grid gap-2">
                    <ButtonComponent @click="resetPassword">
                        Send
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>
</template>