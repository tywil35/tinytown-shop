<script setup lang="ts">
import { TableData } from '@/components/table/interfaces/table-data.class';
import type { UserModel } from '@/interfaces/user.inteface';
import { AdminAllUsersService } from '@/service/admin-all-users.service';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Table from '../components/table/TableComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
const adminEditStore = useAdminEditStore();
const router = useRouter();
const usersTableData = ref<TableData>(new TableData());
const setupTable = () => {
  usersTableData.value.actions = ['clickable'];

  usersTableData.value.columns = [
    { name: 'Username', key: 'username', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Login Time', key: 'login_time', searchable: true, sortable: true, asc: true, date: true },
    { name: 'Email', key: 'email', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Cell', key: 'cell', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Address', key: 'address_line', searchable: true, sortable: true, asc: true, date: false },
    { name: 'G.O.A', key: 'goa_member_number', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Role', key: 'user_role', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Status', key: 'user_status', searchable: true, sortable: true, asc: true, date: false },
  ];
  usersTableData.value.pages();
  usersTableData.value.loadPage(1);
};
const fetchUsers = () => {
  AdminAllUsersService.AllUser().then(res => usersTableData.value.data = res).then(setupTable);
};
const editUser = (user: UserModel) => {
  adminEditStore.setUser(user);
  router.push({ name: 'admin-user-create' })
};
const newUser = () => {
  adminEditStore.setUser();
  router.push({ name: 'admin-user-create' })
};
onMounted(fetchUsers);
</script>
    
<template>
  <div class="my-20 mx-4 grid gap-4">
    <div class="place-self-end">
      <ButtonComponent @click="newUser">New</ButtonComponent>
    </div>
    <Table v-if="usersTableData" :tableData="usersTableData" @rowsPerPage="usersTableData?.assignCustomBatch($event)"
      @sort="usersTableData?.sort($event)" @previousPage="usersTableData?.previousPage()" @clickable="editUser($event)"
      @loadPage="usersTableData?.loadPage($event)" @nextPage="usersTableData?.nextPage()" />
  </div>
</template>