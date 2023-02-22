<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import ProductTile from '@/components/ProductTile.vue';
import { type ProductOption, type ProductModel, ProductStockLevelEnum } from '../interfaces/product.interface';
import InputText from '../components/InputText.vue';
import { RegexPattern } from '@/utils/regex-pattern.util';
import InputTextArea from '../components/InputTextArea.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { AdminCaptureProductService } from '../service/admin-capture-product.service';
import InputNumber from '../components/InputNumber.vue';
import SwitchComponent from '../components/SwitchComponent.vue';
import { useToastStore } from '@/stores/toast.store';
import { useAdminEditStore } from '@/stores/admin-edit.store';
import { useRouter } from 'vue-router';
import { FriendlyEnum } from '@/utils/friendly-enum.util';
const toastStore = useToastStore();
const adminEditStore = useAdminEditStore();
const router = useRouter();
const stock_level_arr = [ProductStockLevelEnum.None, ProductStockLevelEnum.Low, ProductStockLevelEnum.Ok, ProductStockLevelEnum.High];
const product = ref<ProductModel>({
    categories: [],
    stock_level: 3,
    active: true,
    goa_member_only: true,
    currency: 'CSRF',
    product_name: '',
    product_description: '',
    imgs: [],
    product_options: [],
    product_code: '',
    product_analysis: [],
    sharing_goa_farm: '',
    sharing_goa_member: '',
    max_quantity: 90
});

const category = ref<string>('');
const imgUrl = ref<string>('');
const analysis = ref<string>('');
const option = ref<ProductOption>({
    description: '',
    position: 1,
    price: 0
});
const goaChange = () => {
    product.value.currency = (product.value.goa_member_only === true ? 'CSRF' : 'R');
};
const addCategory = () => {
    product.value.categories = product.value.categories.filter((x: string) => x !== category.value);
    product.value.categories.push(category.value);
    category.value = '';
};
const removeCategory = (_category: string) => {
    product.value.categories = product.value.categories.filter((x: string) => x !== _category);
};
const addImageUrl = () => {
    const rude = imgUrl.value;
    const rude_1 = rude.indexOf('/d/') + 3;
    const rude_2 = rude.indexOf('/view');
    imgUrl.value = rude.substring(rude_1, rude_2);
    imgUrl.value = `https://drive.google.com/uc?export=view&id=${imgUrl.value}`;
    product.value.imgs = product.value.imgs.filter((x: string) => x !== imgUrl.value);
    product.value.imgs.push(imgUrl.value)
    imgUrl.value = '';
};
const removeImageUrl = (url: string) => {
    product.value.imgs = product.value.imgs.filter((x: string) => x !== url);
};
const addAnalysis = () => {
    const _product_analysis = product.value.product_analysis.filter((x: string) => x !== analysis.value);
    _product_analysis.push(analysis.value)
    analysis.value = '';
    product.value.product_analysis = _product_analysis;
};
const removeAnalysis = (_analysis: string) => {
    product.value.product_analysis = product.value.product_analysis.filter((x: string) => x !== _analysis);
};
const addOptions = () => {
    option.value.position = product.value.product_options.length;
    product.value.product_options.push(option.value);
    option.value = {
        description: '',
        position: 1,
        price: 0
    };
};
const removeOptions = (index: number) => {
    product.value.product_options = product.value.product_options.filter((x: ProductOption) => x.position !== index);
    for (let index = 0; index < product.value.product_options.length; index++) {
        product.value.product_options[index].position = index;
    }
};
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
    if (product.value.id) {
        AdminCaptureProductService.Update(product.value).then(res => onSuccess(res.message)).catch(err => onFail(err.message));
    } else {
        AdminCaptureProductService.Create(product.value).then(res => onSuccess(res.message)).catch(err => onFail(err.message));
    }
};
const preview = ref<boolean>(false);
onMounted(() => {
    if (adminEditStore.product) {
        product.value = adminEditStore.product;
    }
});

const pactive = computed({
    get: () => { if (typeof product.value.active === 'number') return product.value.active === 1; return product.value.active },
    set: (v: boolean) => {
        product.value.active = v;
    }
});
const pgoa_member_only = computed({
    get: () => { if (typeof product.value.goa_member_only === 'number') return product.value.goa_member_only === 1; return product.value.goa_member_only },
    set: (v: boolean) => {
        product.value.goa_member_only = v;
    }
});
</script>

<template>
    <div class="my-20 mx-4 grid md:grid-cols-2 md:gap-4">
        <div v-if="preview" class="absolute z-30 left-0 top-0 bottom-0 right-0 bg-gray-500 bg-opacity-60 grid">
            <ProductTile class="z-50 m-auto my-20 w-1/2" :product="product" />
            <ButtonComponent class="my-auto place-self-center" @click.prevent="preview = false">Close</ButtonComponent>
        </div>
        <div class="grid gap-4">
            <div class="flex gap-4">
                <ButtonComponent class="my-auto" @click="create">Save</ButtonComponent>
                <ButtonComponent class="my-auto" v-if="product.product_options.length > 0" @click="preview = true">
                    Preview
                </ButtonComponent>
                <div class="flex flex-wrap gap-4 my-2">
                    <SwitchComponent v-model:valued="pactive">Active</SwitchComponent>
                    <SwitchComponent v-model:valued="pgoa_member_only" @change="goaChange">GOA</SwitchComponent>
                    <div class="flex border rounded">
                        <div v-for="(stcklvl,i) in stock_level_arr" :key="i" @click="product.stock_level = stcklvl"
                            :class="['py-2 px-4 text-center uppercase cursor-pointer',(product.stock_level === stcklvl ? 'text-white bg-green-600' : 'hover:bg-slate-500 hover:bg-opacity-25')]">
                            {{FriendlyEnum('stock_level',stcklvl)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid gap-8">
                <InputText named="Product Code" :require="true" v-model:valued="product.product_code"
                    :validation="RegexPattern.SLUG" validationMessage="Provide code for product" />
                <InputText named="Name" :require="true" v-model:valued="product.product_name"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Provide name for product" />
                <InputText named="Sharing Farm" :require="true" v-model:valued="product.sharing_goa_farm"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Must have sharing farm" />
                <InputText named="Sharing Member" :require="true" v-model:valued="product.sharing_goa_member"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Must have sharing member" />
                <InputTextArea named="Description" v-model:valued="product.product_description" />
            </div>
            <div class="bg-gray-400 w-full h-1 rounded-full"></div>
            <InputNumber class="my-4" named="Max Quantity" v-model:valued="product.max_quantity" />
            <div class="my-auto flex gap-2">
                <InputText named="Description" v-model:valued="option.description" :require="true"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Provide description" />
                <InputNumber named="Price" v-model:valued="option.price" />
                <ButtonComponent @click="addOptions">+</ButtonComponent>
            </div>
            <div class="grid divide-y gap-1">
                <div v-for="optn in product.product_options" :key="optn.position" class="p-2 grid grid-flow-col">
                    <span>
                        {{optn.description}}&nbsp;@&nbsp;{{product.currency}}&nbsp;{{optn.price?.toFixed(2)}}
                    </span>
                    <span @click="removeOptions(optn.position)"
                        class="justify-self-end cursor-pointer select-none">X</span>
                </div>
            </div>
        </div>
        <div class="md:hidden bg-gray-400 w-full h-1 rounded-full"></div>
        <div class="grid gap-4">
            <div class="my-auto flex gap-2">
                <InputText named="Catgory" v-model:valued="category" :require="true"
                    :validation="RegexPattern.ALPHANUMERIC_SPACE" validationMessage="Provide Category" />
                <ButtonComponent @click="addCategory">+</ButtonComponent>
            </div>
            <div class="grid divide-y gap-1">
                <div v-for="ctgr in product.categories" :key="ctgr" class="p-2 grid grid-flow-col">
                    <span>
                        {{ctgr}}
                    </span>
                    <span @click="removeCategory(ctgr)" class="justify-self-end cursor-pointer select-none">X</span>
                </div>
            </div>
            <div class="bg-gray-400 w-full h-1 rounded-full"></div>
            <div class="my-auto flex gap-2">
                <InputText named="Image URL" v-model:valued="imgUrl" :validation="RegexPattern.URL" :require="true"
                    validationMessage="Provide URL" />
                <ButtonComponent @click="addImageUrl">+</ButtonComponent>
            </div>
            <div class="grid divide-y gap-1">
                <div v-for="(img,i) in product.imgs" :key="i" class="p-2 grid grid-flow-col">
                    <a :href="img" class="visited:text-purple-500">
                        {{img.substring(img.length-50, img.length)}}
                    </a>
                    <span @click="removeImageUrl(img)" class="justify-self-end cursor-pointer select-none">X</span>
                </div>
            </div>
            <div class="bg-gray-400 w-full h-1 rounded-full"></div>
            <div class="my-auto flex gap-2">
                <InputText named="Analysis" v-model:valued="analysis" />
                <ButtonComponent @click="addAnalysis">+</ButtonComponent>
            </div>
            <div class="grid divide-y gap-1">
                <div v-for="anlyss in product.product_analysis" :key="anlyss" class="p-2 grid grid-flow-col">
                    <span>
                        {{anlyss}}
                    </span>
                    <span @click="removeAnalysis(anlyss)" class="justify-self-end cursor-pointer select-none">X</span>
                </div>
            </div>
        </div>
    </div>
</template>
