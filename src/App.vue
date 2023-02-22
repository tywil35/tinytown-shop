<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router'
import LoaderComponent from './components/LoaderComponent.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import Over21Only from './views/Over21Only.vue'
import { LocalStorageEnum } from './enum/local-storage.enum';
import { useUacStore } from './stores/uac.store';
import { useLoadStore } from './stores/load.store';
import ShopHeader from './ShopHeader.vue';
import ShopFooter from './ShopFooter.vue';
import { RefreshAuthUtil } from './utils/refresh-auth.util';
import ToastComponent from './components/ToastComponent.vue';
const uacStore = useUacStore();
const loadStore = useLoadStore();
const im21 = ref<boolean>(false);
const fetchim21 = () => {
  const ans = localStorage.getItem(LocalStorageEnum.GOA_MEMBER);
  im21.value = ans === 'true';
};
onMounted(() => {
  fetchim21();
  RefreshAuthUtil.StartInterval();
});
onUnmounted(RefreshAuthUtil.ClearInterval)
</script>

<template>
  <div>
    <ShopHeader />
    <div class="w-screen h-screen  relative overflow-auto">
      <RouterView />
    </div>
    <LoaderComponent v-if="loadStore.load" />
    <ShopFooter />
    <RegisterPage v-if=" uacStore.registerDlg == true" @login="uacStore.hideRegister(); uacStore.showLogin();" />
    <LoginPage v-if=" uacStore.loginDlg === true" @register="uacStore.hideLogin(); uacStore.showRegister();" />
    <Over21Only v-if="im21 !== true" @im21="fetchim21" />
    <ToastComponent />
  </div>
</template>