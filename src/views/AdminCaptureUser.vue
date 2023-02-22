<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InputText from '../components/InputText.vue';
import { RegexPattern } from '@/utils/regex-pattern.util';
import ButtonComponent from '../components/ButtonComponent.vue';
import { useToastStore } from '@/stores/toast.store';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { useRouter } from 'vue-router';
import { FriendlyEnum } from '@/utils/friendly-enum.util';
import { UserRoleEnum, UserStatusEnum } from '@/enum/user.enum';
import { AdminUsersService } from '@/service/admin-users.service';
const toastStore = useToastStore();
const adminEditStore = useAdminEditStore();
const router = useRouter();
const user_role_arr = [UserRoleEnum.Customer, UserRoleEnum.GoaMember, UserRoleEnum.FrontCounter, UserRoleEnum.BudBar, UserRoleEnum.SA];
const user_status_arr = [UserStatusEnum.Inactive, UserStatusEnum.Active, UserStatusEnum.ActiveMember, UserStatusEnum.BlockMember];
// eslint-disable-next-line
const arg_usr = ref<any>(
    {
        update_user_id: '',
        username: '',
        email: '',
        cell: '',
        goa_member_number: '',
        address_line: '',
        user_role: UserRoleEnum.Customer,
        user_status: UserStatusEnum.Inactive
    }
);

const onSuccess = (msg: string) => {
    toastStore.showFor({
        color: 'bg-blue-400',
        msg: msg,
        x: 1000
    });
    router.back();
}
const onFail = (msg: string) => {
    toastStore.showFor({
        msg: msg
    });
}
const create = () => {
    if (arg_usr.value.update_user_id) {
        AdminUsersService.UpdateUser(arg_usr.value).then(res => onSuccess(res.message)).catch(err => onFail(err.message));
    } else {
        AdminUsersService.RegisterUser(arg_usr.value).then(res => onSuccess(res.message)).catch(err => onFail(err.message));
    }
};
onMounted(() => {
    if (adminEditStore.user) {
        arg_usr.value.address_line = adminEditStore.user.address_line ?? '';
        arg_usr.value.cell = adminEditStore.user.cell;
        arg_usr.value.email = adminEditStore.user.email;
        arg_usr.value.goa_member_number = adminEditStore.user.goa_member_number ?? '';
        arg_usr.value.user_role = adminEditStore.user.user_role;
        arg_usr.value.user_status = adminEditStore.user.user_status;
        arg_usr.value.username = adminEditStore.user.username;
        arg_usr.value.update_user_id = adminEditStore.user.id;
    }
});
</script>

<template>
    <div class="my-20 mx-4 grid gap-4">
        <div class="grid gap-4">
            <div class="flex gap-4">
                <div class="flex flex-wrap gap-4 my-2">
                    <div class="flex border rounded">
                        <div v-for="(rl,i) in user_role_arr" :key="i" @click="arg_usr.user_role = rl"
                            :class="['py-2 px-4 text-center uppercase cursor-pointer',(arg_usr.user_role === rl ? 'text-white bg-green-600' : 'hover:bg-slate-500 hover:bg-opacity-25')]">
                            {{FriendlyEnum('user_role',rl)}}
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 my-2">
                    <div class="flex border rounded">
                        <div v-for="(st,i) in user_status_arr" :key="i" @click="arg_usr.user_status = st"
                            :class="['py-2 px-4 text-center uppercase cursor-pointer',(arg_usr.user_status === st ? 'text-white bg-green-600' : 'hover:bg-slate-500 hover:bg-opacity-25')]">
                            {{FriendlyEnum('user_status',st)}}
                        </div>
                    </div>
                </div>
                <ButtonComponent class="my-auto" @click="create">Save</ButtonComponent>
            </div>
            <div class="grid gap-8">
                <InputText named="Username" :require="true" v-model:valued="arg_usr.username"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Provide username" />
                <InputText named="G.O.A" v-model:valued="arg_usr.goa_member_number"
                    :validation="RegexPattern.WHOLE_NUMBER" />
                <InputText typed="email" named="Email" :require="true" v-model:valued="arg_usr.email"
                    :validation="RegexPattern.COMMON_EMAIL_ID" validationMessage="Provide email" />
                <InputText named="Cell" v-model:valued="arg_usr.cell" />
                <InputText named="Address" v-model:valued="arg_usr.address_line" />
            </div>
        </div>
    </div>
</template>
