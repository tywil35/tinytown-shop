<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { useToastStore } from '@/stores/toast.store';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { TableData } from '@/components/table/interfaces/table-data.class';
import TableComponent from '../components/table/TableComponent.vue';
import { useRouter } from 'vue-router';
import { AllOrderService } from '../service/all-order.service';
import { InvoiceStatusEnum, type InvoiceModel } from '@/interfaces/invoice.interface';
import { FriendlyEnum } from '@/utils/friendly-enum.util';
const invoice_status_arr = [InvoiceStatusEnum.Pending, InvoiceStatusEnum.Cultivated, InvoiceStatusEnum.Cancel];
const toastStore = useToastStore();
const adminEditStore = useAdminEditStore();
const router = useRouter();

const tableData = ref<TableData>(new TableData());
const setupTable = () => {
  tableData.value.actions = ['clickable'];
  tableData.value.columns = [
    { name: 'Invoice No.', key: 'invoice_number', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Collection/Delivery Time', key: 'delivery_time', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Address', key: 'delivery_address', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Note', key: 'delivery_note', searchable: true, sortable: true, asc: true, date: false },
    { name: 'Amount', key: 'total_amount', searchable: true, sortable: true, asc: true, date: false },
  ];
  tableData.value.pages();
  tableData.value.loadPage(1);
};
const editProduct = (update_invoice: InvoiceModel) => {
  adminEditStore.setInvoice(update_invoice);
  router.push({ name: 'staff-check-order' })
};
const intervalFetchID = ref<number>(-1);
const stopfetchData = () => {
  clearInterval(intervalFetchID.value);
}
const startfetchData = () => {
  fetchData();
  intervalFetchID.value = setInterval(fetchData, 30000);
}
const fetchData = () => {
  AllOrderService.Filter({ status: selected_status.value }).then(res => {
    tableData.value.data = res;
    setupTable();
  })
    .catch(err => {
      toastStore.showFor({
        msg: err.message
      });
    });
};
onUpdated(fetchData);
onMounted(startfetchData);
const selected_status = ref<InvoiceStatusEnum>(InvoiceStatusEnum.Pending);
const filterStatus = (invcstts: InvoiceStatusEnum) => {
  selected_status.value = invcstts;
  fetchData();
};
onUnmounted(stopfetchData);
</script>
  
<template>
  <div class="my-20 mx-4 grid gap-4">
    <div class="border rounded flex mx-auto">
      <div v-for="(invcstts,i) in invoice_status_arr" :key="i" @click="filterStatus(invcstts)"
        :class="['py-2 px-4 text-center uppercase cursor-pointer',(selected_status === invcstts ? 'text-white bg-green-600' : 'hover:bg-slate-500 hover:bg-opacity-25')]">
        {{FriendlyEnum('invoice_status',invcstts)}}
      </div>
    </div>
    <TableComponent v-if="tableData" :tableData="tableData" @rowsPerPage="tableData?.assignCustomBatch($event)"
      @sort="tableData?.sort($event)" @previousPage="tableData?.previousPage()" @loadPage="tableData?.loadPage($event)"
      @nextPage="tableData?.nextPage()" @clickable="editProduct($event)" />
  </div>
</template>
  