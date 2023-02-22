import type { ProductFilter } from "../interfaces/product-filter.interface";
import type { ProductModel } from "../interfaces/product.interface";
import { BaseApiService } from "./base-api.service";
type Request = ProductFilter;
type Response = ProductModel[];
const Find = async (): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.get<Response>('/common/product', { headers: { 'Content-Type': 'application/json' } }).then(res => {
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.imgs = JSON.parse(element.imgs as string);
            element.product_analysis = JSON.parse(element.product_analysis as string);
            element.product_options = JSON.parse(element.product_options as string);
            element.categories = JSON.parse(element.categories as string);
        }
        return res;
    });
};
const Filter = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/common/product/filter', { headers: { 'Content-Type': 'application/json' }, payload }).then(res => {
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.imgs = JSON.parse(element.imgs as string);
            element.product_analysis = JSON.parse(element.product_analysis as string);
            element.product_options = JSON.parse(element.product_options as string);
            element.categories = JSON.parse(element.categories as string);
        }
        return res;
    });
};
const FilterAdmin = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/admin/product/filter', { headers: { 'Content-Type': 'application/json' }, payload }).then(res => {
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.imgs = JSON.parse(element.imgs as string);
            element.product_analysis = JSON.parse(element.product_analysis as string);
            element.product_options = JSON.parse(element.product_options as string);
            element.categories = JSON.parse(element.categories as string);
        }
        return res;
    });
};
export const FindProductService = {
    Request,
    Response,
    Find,
    Filter,
    FilterAdmin
}