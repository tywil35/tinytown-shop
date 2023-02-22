<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableData } from './interfaces/table-data.class';
import IconUpArrowCircle from '../icons/IconUpArrowCircle.vue';
import IconDownArrowCircle from '../icons/IconDownArrowCircle.vue';
import { FriendlyEnum } from '@/utils/friendly-enum.util';
import IconEllipsis from '../icons/IconEllipsis.vue';
import IconDownArrow from '../icons/IconDownArrow.vue';
import dayjs from 'dayjs'
import { Pad } from '@/utils/pad.util';
defineEmits<{
    (e: 'sort', valued: any): void,
    (e: 'previousPage'): void,
    (e: 'loadPage', valued: number): void,
    (e: 'nextPage'): void,
    (e: 'clickable', valued: any): void,
    (e: 'view', valued: any): void,
    (e: 'delete', valued: any): void,
    (e: 'edit', valued: any): void,
}>()
const prop = defineProps<{
    tableData: TableData
}>();
</script>

<template>
    <div class="bg-white relative">
        <div v-if="!prop.tableData || prop.tableData.currentData.length === 0" class="font-bold text-xl text-center">
            <span>No Data</span>
        </div>
        <transition name="fade">
            <div v-if="prop.tableData && prop.tableData.currentData.length > 0" ref="tableContainer">
                <div ref="tableHeader" class="hidden md:flex">
                    <div class="w-1/2 p-2 border-b border-gray-100 flex gap-2" v-for="(c, i) in prop.tableData.columns"
                        :key="i + 'c'">
                        <span class="uppercase text-bold">{{ c.name }}</span>
                        <IconUpArrowCircle v-if="c.asc === true" class="h-5 w-5" @click="$emit('sort', c);
                        c.asc = !c.asc;" />
                        <IconDownArrowCircle v-if="c.asc === false" class="h-5 w-5" @click="$emit('sort', c);
                        c.asc = !c.asc;" />
                    </div>
                    <div v-if="(prop.tableData.actions.length === 1 && prop.tableData.actions.includes('clickable')) === false && prop.tableData.actions.length > 0"
                        class="w-1/2 p-2 border-b border-gray-100 flex gap-2">
                        <span class="uppercase text-bold">Action</span>
                    </div>
                </div>
                <div ref="prop.tableData">
                    <transition-group name="fade" tag="div">
                        <div v-for="(tb, i) in prop.tableData.currentData" :key="i + 'r'"
                            :class="[prop.tableData.actions.includes('clickable') ? 'cursor-pointer hover:bg-opacity-10 hover:bg-dark' : '', 'grid grid-cols-2 md:flex border-b border-gray-600/20']">
                            <div class="w-1/2  p-2 overflow-auto" v-for="(c, i) in prop.tableData.columns"
                                :key="i + 'rc'"
                                @click="prop.tableData.actions.includes('clickable') ? $emit('clickable', tb) : undefined">
                                <span
                                    v-if="(!['delivery_time', 'login_time', 'invoice_number', 'invoice_status', 'goa_member_only', 'user_status', 'user_role', 'active', 'stock_level'].includes(c.key))">{{
                                            tb[c.key]
                                    }}</span>
                                <span v-if="(['invoice_number'].includes(c.key))">{{ Pad(tb[c.key], '0') }}</span>
                                <span v-if="(['login_time', 'delivery_time'].includes(c.key))">{{ tb[c.key] ?
                                        dayjs(tb[c.key]).format('D MMM YY @ HH:mm') : ''
                                }}</span>
                                <span
                                    v-if="(['invoice_status', 'goa_member_only', 'user_status', 'user_role', 'active', 'stock_level'].includes(c.key))"
                                    class="uppercase">{{ FriendlyEnum(c.key, tb[c.key]) }}</span>
                            </div>
                            <div v-if="(prop.tableData.actions.length === 1 && prop.tableData.actions.includes('clickable')) === false && prop.tableData.actions.length > 0"
                                class="w-1/2  p-2 overflow-auto z-10 cursor-default">
                                <span class="md:hidden uppercase font-bold">Action&#58;&nbsp;</span>
                                <div class="grid grid-cols-2 gap-4">
                                    <span v-if="prop.tableData.actions.includes('view')" @click="$emit('view', tb)"
                                        class="h-5 w-5 cursor-pointer text-gray-500 hover:text-primary-100">SEARCH</span>
                                    <span v-if="prop.tableData.actions.includes('delete')" @click="$emit('delete', tb)"
                                        class="h-5 w-5 cursor-pointer text-gray-500 hover:text-primary-100">Delete</span>
                                    <span v-if="prop.tableData.actions.includes('edit')" @click="$emit('edit', tb)"
                                        class="h-5 w-5 cursor-pointer text-gray-500 hover:text-primary-100">Edit</span>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
                <div ref="tablePaginator" class="flex items-center p-3 bg-white sticky bottom-0  h-20 z-30 w-full">
                    <div class="flex items-center justify-center h-10 w-full gap-x-2">
                        <div v-if="prop.tableData.showMoreBeforePageNumber()" @click="$emit('loadPage', 1)"
                            class="cursor-pointer h-6 w-6 rounded-full text-center text-white bg-gray-500">
                            <IconEllipsis class="my-1 m-auto w-4 h-4" />
                        </div>
                        <div v-for="(pn, index) in prop.tableData.showPageNumbers()" :key="index + 'pg'"
                            @click="$emit('loadPage', pn)"
                            :class="['cursor-pointer h-6 w-6 rounded-full text-center text-white', pn === prop.tableData.currentPage ? 'bg-green-600' : 'bg-gray-500 hover:bg-gray-400']">
                            <span class="m-auto">
                                {{ pn }}</span>
                        </div>
                        <div v-if="prop.tableData.showMoreAfterPageNumber()"
                            @click="$emit('loadPage', prop.tableData?.pageNumbers.length ?? 1)"
                            class="cursor-pointer h-6 w-6 rounded-full text-center text-white bg-gray-500 md:flex justify-center items-center">
                            <IconEllipsis class="my-1 m-auto w-4 h-4" />
                        </div>
                    </div>
                    <div class="sm:flex gap-x-5 items-center absolute right-0">
                        <div class="flex items-center gap-x-5 pt-3 sm:pt-0">
                            <div @click.prevent="$emit('previousPage')"
                                class="hover:bg-gray-500/30 flex justify-center items-center text-green-600 cursor-pointer w-7 h-7 md:w-10 md:h-10 rounded-full">
                                <div>
                                    <IconDownArrow class="rotate-90 w-4 h-4" />
                                </div>
                            </div>
                            <div @click.prevent="$emit('nextPage')"
                                class="hover:bg-gray-500/30 flex justify-center items-center text-green-600 cursor-pointer w-7 h-7 md:w-10 md:h-10 rounded-full">
                                <div>
                                    <IconDownArrow class="-rotate-90 w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

