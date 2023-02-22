<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToastStore } from '@/stores/toast.store';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { FindProductService } from '@/service/find-product.service';
import { TableData } from '@/components/table/interfaces/table-data.class';
import TableComponent from '../components/table/TableComponent.vue';
import type { ProductModel } from '@/interfaces/product.interface';
import { useRouter } from 'vue-router';
import ButtonComponent from '../components/ButtonComponent.vue';
const toastStore = useToastStore();
const adminEditStore = useAdminEditStore();
const router = useRouter();

const productsTableData = ref<TableData>(new TableData());
const setupTable = () => {
    productsTableData.value.actions = ['clickable'];
    productsTableData.value.columns = [
        { name: 'Code', key: 'product_code', searchable: true, sortable: true, asc: true, date: false },
        { name: 'Name', key: 'product_name', searchable: true, sortable: true, asc: true, date: false },
        { name: 'Categories', key: 'categories', searchable: true, sortable: true, asc: true, date: false },
        { name: 'Stock Level', key: 'stock_level', searchable: true, sortable: true, asc: true, date: false },
        { name: 'Active', key: 'active', searchable: true, sortable: true, asc: true, date: false },
        { name: 'G.O.A', key: 'goa_member_only', searchable: true, sortable: true, asc: true, date: false },
    ];
    productsTableData.value.pages();
    productsTableData.value.loadPage(1);
};
const editProduct = (update_product: ProductModel) => {
    adminEditStore.setProduct(update_product);
    router.push({ name: 'admin-product-create' })
};
const newProduct = () => {
    adminEditStore.setProduct();
    router.push({ name: 'admin-product-create' })
};
onMounted(() => {
    FindProductService.FilterAdmin({}).then(res => {
        productsTableData.value.data = res;
        setupTable();
    })
        .catch(err => {
            toastStore.showFor({
                msg: err.message
            });
        });
});
</script>

<template>
    <div class="my-20 mx-4 grid gap-4">
        <div class="place-self-end">
            <ButtonComponent @click="newProduct">New</ButtonComponent>
        </div>
        <TableComponent v-if="productsTableData" :tableData="productsTableData"
            @rowsPerPage="productsTableData?.assignCustomBatch($event)" @sort="productsTableData?.sort($event)"
            @previousPage="productsTableData?.previousPage()" @loadPage="productsTableData?.loadPage($event)"
            @nextPage="productsTableData?.nextPage()" @clickable="editProduct($event)" />
    </div>
</template>
