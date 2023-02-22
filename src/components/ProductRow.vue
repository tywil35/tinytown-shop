<script setup lang="ts">
import type { ProductModel, ProductOption, ProductOrder } from '@/interfaces/product.interface';
import { computed, onMounted, ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

const emit = defineEmits<{
  (e: 'cultivate', product: ProductOrder): void
  (e: 'removeProduct', product: ProductOrder): void
}>()
const props = defineProps<{
  product: ProductModel | ProductOrder
}>();
const quantity = ref<number>(1);
const option = ref<ProductOption | undefined>(undefined);

const from = computed(() => {
  let lowestPrice = '';
  let isLowest = props.product.product_options[0];
  lowestPrice = FriendlyPrice(props.product.currency, isLowest.price);
  for (let index = 0; index < props.product.product_options.length; index++) {
    const element = props.product.product_options[index];
    if (isLowest.price > element.price) {
      isLowest = element;
      lowestPrice = FriendlyPrice(props.product.currency, element.price);
    }
  }
  return lowestPrice;
});

const FriendlyPrice = (currency: string, price: number): string => {
  return `${currency} ${(price * quantity.value).toFixed(2)}`
};
const isThereOneOption = () => {
  if (props.product.product_options.length === 1) {
    option.value = props.product.product_options[0];
  }
  if (isProductOrder.value) {
    option.value = (props.product as ProductOrder).option
    quantity.value = +(props.product as ProductOrder).quantity
  }
  if (!option.value) {
    option.value = props.product.product_options[0];
  }
};
onMounted(isThereOneOption);
const cultivate = () => {
  if (!option.value) {
    return;
  }
  const productOrder: ProductOrder = {
    ...props.product,
    option: option.value,
    quantity: +quantity.value,
  }
  emit('cultivate', productOrder);
  resetForm();
}
const removeProduct = () => {
  if (!option.value) {
    return;
  }
  emit('removeProduct', props.product as ProductOrder);
  resetForm();
}
const isProductOrder = computed(() => {
  return (props.product as ProductOrder).quantity != undefined;
});
const resetForm = () => {
  if (isProductOrder.value) {
    return;
  }
  option.value = undefined;
  quantity.value = 1;
  isThereOneOption();
};
</script>

<template>
  <div class="shadow-xl relative rounded bg-slate-200 p-4 text-green-900 grid font-sans">
    <span class="absolute top-0 right-0 text-xs mx-1">{{ product.product_code }}</span>
    <div class="grid gap-2">
      <span class="capitalize text-xl">
        {{ product.product_name }}&nbsp;|&nbsp;<span v-if="option">
          <span v-if="quantity > 0">{{ quantity }}x&nbsp;</span>{{ option.description }}&nbsp;@&nbsp;{{
              FriendlyPrice(product.currency, option.price)
          }}
        </span></span>
      <div class="text-sm">Cultivating/Processing member&nbsp;<span class="italic font-bold">{{ product.sharing_goa_farm
      }}</span></div>
      <div class="text-sm">Owner member&nbsp;<span class="italic font-bold">{{ product.sharing_goa_member
      }}</span></div>
      <span v-if="!option">
        FROM {{ from }}
      </span>
      <div class="flex gap-1">
        <select v-if="product.product_options.length > 1" name="productOptions" v-model="option"
          class="block w-full px-3 py-1.5 text-base font-normal  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus: text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <option :value="undefined">Select Option</option>
          <option v-for="opt in product.product_options" :key="opt.position" :value="opt">{{ opt.description
          }}&nbsp;@&nbsp;{{
    FriendlyPrice(product.currency, opt.price)
}}</option>
        </select>
        <select name="productQuantity" v-model="quantity"
          class="block w-full px-3 py-1.5 text-base font-normal  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus: text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none">
          <option v-for="(qty, i) in [...Array(product.max_quantity).keys()]" :key="i" :value="qty + 1">{{ qty + 1 }}</option>
        </select>
      </div>
      <div class="flex gap-2">
        <ButtonComponent class="grow" v-if="isProductOrder" @click="removeProduct" color="bg-red-500 hover:bg-red-600">
          Remove
        </ButtonComponent>
        <ButtonComponent class="grow" :disabled="!option" @click="cultivate">
          {{ isProductOrder === true ? 'Update' : 'Share' }}
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>
