/* eslint-disable @typescript-eslint/no-explicit-any */
export type ProductModel = {
    id?: string;
    goa_member_only: boolean,
    active: boolean,
    product_analysis: any,
    currency: 'R' | 'CSRF',
    product_code: string,
    product_description: string,
    product_name: string,
    product_options: any,
    categories: any,
    imgs: any,
    stock_level: ProductStockLevelEnum,
    sharing_goa_member: string,
    sharing_goa_farm: string,
    max_quantity: number
};

export interface ProductOption {
    description: string;
    position: number;
    price: number;
}

export enum ProductStockLevelEnum {
    None = 0,
    Low = 1,
    Ok = 2,
    High = 3,
}

export interface Image {
    id: string;
    url: string;
}

export type ProductOrder = ProductModel & {
    option: ProductOption;
    quantity: number;
}
