<script setup lang="ts">
import type { ProductOrder } from '@/interfaces/product.interface';
import { CreateOrderService } from '@/service/create-order.service';
import { useCartStore } from '@/stores/cart.store';
import { useToastStore } from '@/stores/toast.store';
import { computed, onMounted, ref } from 'vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ProductRow from '../components/ProductRow.vue';
import InputText from '../components/InputText.vue';
import { UserProfileService } from '@/service/user-profile.service';
import { RegexPattern } from '@/utils/regex-pattern.util';
import { useRouter } from 'vue-router';
import { UserUpdateAddressService } from '@/service/user-update-address.service';
const toastStore = useToastStore();
const cartStore = useCartStore();
const router = useRouter();
const total = computed(() => cartStore.PriceExcludingVAT);
const totalCSRF = computed(() => cartStore.PriceExcludingVATCSRF);
const productLine = computed((): ProductOrder[] => cartStore.products);
const delivery_address = ref<string>('');
const delivery_note = ref<string>('');
const removeProduct = (productOrder: ProductOrder) => {
    cartStore.removeFromCart(productOrder);
};
const cultivate = (productOrder: ProductOrder) => {
    cartStore.addToCart(productOrder);
};
const no_addr = ref<boolean>(true);
const fetchProfile = () => {
    UserProfileService.Send().then((res) => {
        delivery_address.value = res.address_line ?? '';
        no_addr.value = delivery_address.value === ''
    }).catch(err => {
        toastStore.showFor({
            msg: err.message,
        })
    })
};
const order = () => {
    if (productLine.value.length <= 0) {
        toastStore.showFor({
            msg: 'Nothing in your cart'
        }); return;
    }
    if (no_addr.value) {
        updateAdress();
    }
    const what_hour_is_it = new Date().getHours();
    if (what_hour_is_it > 17) { delivery_time.value.delivery_time.setDate(delivery_time.value.delivery_time.getDate() + 1) };
    CreateOrderService.Send({
        delivery_address: delivery_address.value,
        delivery_note: delivery_note.value,
        delivery_time: delivery_time.value.delivery_time,
        items: productLine.value
    }).then((res) => {
        toastStore.showFor({
            color: 'bg-blue-400',
            msg: res.message
        });
        cartStore.emptyCart();
        router.push({ name: 'shop' })
    }).catch(err => {
        toastStore.showFor({
            msg: err.message
        });
    });
};
const updateAdress = () => {
    UserUpdateAddressService.Send({ address: delivery_address.value }).then((res) => {
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
const fetchDeliveryTimeSlot = (hour: number, minute: number): Date => {
    if (hour > 23 || hour < 0 || minute > 59 || minute < 0) {
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        return d
    }
    let d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
};
const delivery_time = ref<{ id: string, description: string, delivery_time: Date }>({
    id: '',
    description: '',
    delivery_time: new Date()
});
const time_slot_hours = [10, 11, 12, 13, 14, 15, 16, 17];
const time_slots: { id: string, description: string, delivery_time: Date }[] = [
];
for (let index = 0; index < time_slot_hours.length; index++) {
    const slot = time_slot_hours[index];
    time_slots.push({
        id: `${index}-${slot}-00`,
        description: `${slot}:00`,
        delivery_time: fetchDeliveryTimeSlot(slot, 0)
    });
    time_slots.push({
        id: `${index}-${slot}-30`,
        description: `${slot}:30`,
        delivery_time: fetchDeliveryTimeSlot(slot, 30)
    });
}
delivery_time.value = time_slots[0];
onMounted(fetchProfile);
</script>

<template>
    <div class="my-20  px-2">
        <transition-group name="slide-fade" tag="div" class="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            <ProductRow :key="product.id" v-for="product in productLine" :product="product" @cultivate="cultivate"
                @removeProduct="removeProduct" />
        </transition-group>
        <footer class="w-full bg-white shadow rounded p-2 sticky bottom-0 z-20 grid gap-2 justify-center">
            <span class="flex gap-4">
                <span class="m-auto">{{ total }}</span>
                <span class="m-auto">{{ totalCSRF }}</span>
            </span>
            <div class="p-4 flex gap-2">
                <InputText named="Address" v-model:valued="delivery_address" :validation="RegexPattern.ANYTHING"
                    :require="true" validationMessage="Provide Address" />
                <InputText named="Note" v-model:valued="delivery_note" />
            </div>
            <div class="font-bold px-2 text-center">Tuesday to Saturday 10am - 5pm</div>
            <div class="px-2 text-center text-xs">All share request are for today.</div>
            <div class="px-2 text-center text-xs">Share request made on Sunday or Monday will be moved to Tuesday. After
                hours next day</div>
            <div class="p-4">
                <select name="deliveryTime" v-model="delivery_time"
                    class="block w-full px-3 py-1.5 text-base font-normal  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus: text-gray-700 focus:bg-white focus:border-blue-400 focus:outline-none">
                    <option v-for="(slot, i) in time_slots" :key="i" :value="slot">{{ slot.description }}
                    </option>
                </select>
            </div>
            <ButtonComponent class="z-50 sticky bottom-0" @click="order">Order</ButtonComponent>
        </footer>
    </div>
</template>