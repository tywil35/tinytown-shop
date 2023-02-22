/* eslint-disable @typescript-eslint/no-explicit-any */
export type InvoiceModel = {
    id: string,
    currency: string,
    user_id: string,
    invoice_number: number,
    total_amount: number,
    invoice_status: InvoiceStatusEnum,
    delivery_address?: string,
    delivery_note?: string,
    delivery_time?: Date
};

export type InvoiceItemProductModel = {
    product_code: string,
    product_name: string,
    product_quantity: number,
    product_option: any,
};

export enum InvoiceStatusEnum {
    Pending = 0,
    Cultivated = 1,
    Cancel = 2,
}