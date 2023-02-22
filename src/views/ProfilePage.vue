<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UserProfileService } from '@/service/user-profile.service';
import type { UserProfileModel } from '@/interfaces/profile.interface';
import { useToastStore } from '@/stores/toast.store';
import ButtonComponent from '../components/ButtonComponent.vue';
import { useAuthStore } from '@/stores/auth.store';
import { UserUpdateAddressService } from '@/service/user-update-address.service';
import { RegexPattern } from '@/utils/regex-pattern.util';
import InputText from '../components/InputText.vue';
const toastStore = useToastStore();
const authStore = useAuthStore();
const profile = ref<UserProfileModel | undefined>(undefined);
const address = ref<string>('');
const fetchProfile = () => {
    UserProfileService.Send().then((res) => {
        profile.value = res;
        address.value = res.address_line ?? '';
    }).catch(err => {
        toastStore.showFor({
            msg: err.message,
        })
    })
};
onMounted(fetchProfile);
const updateAdress = () => {
    UserUpdateAddressService.Send({ address: address.value }).then((res) => {
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: res.message,
        });
        fetchProfile();
    }).catch(err => {
        toastStore.showFor({
            msg: err.message,
        })
    })
};
const logout = () => {
    authStore.clearToken();
    location.replace('/')
};
</script>
    
<template>
    <div class="grid gap-2 my-20 px-2">
        <div class="grid grid-cols-2 gap-1">
            <div class="text-right text-gray-400 italic">USERNAME:</div>
            <div class="">{{profile?.username}}</div>
            <div class="text-right text-gray-400 italic">EMAIL:</div>
            <div class="">{{profile?.email}}</div>
            <div class="text-right text-gray-400 italic">CELL:</div>
            <div class="">{{profile?.cell}}</div>
        </div>
        <div v-if="profile" class="grid grid-flow-col gap-2">
            <InputText named="Address" :require="true" v-model:valued="address" :validation="RegexPattern.ANYTHING"
                validationMessage="Provide address" />
            <ButtonComponent @click="updateAdress" class="my-auto h-10">Update Address</ButtonComponent>
        </div>
        <ButtonComponent class="mt-20" color="text-red-500 border border-red-500" @click="logout">Log Out</ButtonComponent>
    </div>
</template>
