<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useToastStore } from '@/stores/toast.store';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { useRouter } from 'vue-router';
import { OrderDetailService } from '../service/order-detail.service';
import { InvoiceStatusEnum, type InvoiceItemProductModel } from '@/interfaces/invoice.interface';
import type { UserProfileGoaModel } from '@/interfaces/profile.interface';
import ButtonComponent from '../components/ButtonComponent.vue';
import { UpdateOrderService } from '@/service/update-order.service';
import dayjs from 'dayjs'
const toastStore = useToastStore();
const adminEditStore = useAdminEditStore();
const router = useRouter();
const order_detail = ref<{ user: UserProfileGoaModel, items: InvoiceItemProductModel[] } | undefined>(undefined);
onMounted(() => {
  OrderDetailService.Send({ user_id: adminEditStore.invoice?.user_id ?? '', order_id: adminEditStore.invoice?.id ?? '' }).then(res => {
    order_detail.value = res;
  })
    .catch(err => {
      toastStore.showFor({
        msg: err.message
      });
    });
});
const cultivate = () => {
  UpdateOrderService.Cultivated(adminEditStore.invoice?.id ?? '');
  router.back();
};
const cancel = () => {
  UpdateOrderService.Cancel(adminEditStore.invoice?.id ?? '');
  router.back();
};
const FriendlyPrice = (currency: string, price: number, quantity: number): string => {
  return `${currency} ${(price * quantity).toFixed(2)}`
};
const isDone = computed<boolean>(() => adminEditStore.invoice?.invoice_status !== InvoiceStatusEnum.Pending)
</script>
  
<template>
  <div class="my-20 mx-4 grid gap-4">
    <div class="grid gap-2 grid-cols-2">
      <b class="text-right uppercase">User</b>
      <span>{{ order_detail?.user.username }}<span class="italic"
          v-if="order_detail?.user.goa_member_number">&nbsp;|&nbsp;{{ order_detail?.user.goa_member_number
          }}</span></span>
    </div>
    <div class="grid gap-2 grid-cols-2">
      <b class="text-right uppercase">total</b>
      <span>{{ order_detail?.user.cell }}</span>
    </div>

    <div class="grid gap-2 grid-cols-2">
      <b class="text-right uppercase">Address</b>
      <span>{{ adminEditStore.invoice?.delivery_address }}</span>
    </div>
    <div class="grid gap-2 grid-cols-2">
      <b class="text-right uppercase">Note</b>
      <span>{{ adminEditStore.invoice?.delivery_note }}</span>
    </div>
    <div class="grid gap-2 grid-cols-2">
      <b class="text-right uppercase">C/D Time</b>
      <span>
        {{ adminEditStore.invoice?.delivery_time ?
            dayjs(adminEditStore.invoice?.delivery_time).format('D MMM YY @ HH:mm') : ''
        }}
      </span>
    </div>
    <div class="justify-self-end"><b class="uppercase">total</b>&nbsp;{{ adminEditStore.invoice?.currency }}&nbsp;{{
        adminEditStore.invoice?.total_amount
    }}
    </div>
    <div class="grid gap-4">
      <div v-for="(item, i) in order_detail?.items" :key="i" class="rounded bg-slate-200 shadow px-2 py-4">
        <div class="grid">
          <div class="justify-self-end">
            {{ item.product_code }}
          </div>
          <div>{{ item.product_name }}</div>
          <div class="justify-self-end">
            <span>
              <span>{{ item.product_quantity }}x&nbsp;</span>{{
                  item.product_option.description
              }}&nbsp;@&nbsp;{{
    FriendlyPrice(adminEditStore.invoice?.currency ?? '', item.product_option.price, item.product_quantity)
}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isDone" class="flex gap-5 justify-center">
      <ButtonComponent @click="cultivate" color="bg-green-600 hover:bg-green-500">
        Share
      </ButtonComponent>
      <ButtonComponent @click="cancel">
        Cancel
      </ButtonComponent>
    </div>
  </div>
</template>
  