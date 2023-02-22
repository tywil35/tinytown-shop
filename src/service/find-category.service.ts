import type { CategoryModel } from "@/interfaces/category.model";
import type { CategoryFilter } from "../interfaces/category-filter.interface";
import { BaseApiService } from "./base-api.service";
type Request = CategoryFilter;
type Response = CategoryModel[];
const Find = async (): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.get<Response>('/common/category', { headers: { 'Content-Type': 'application/json' } });
};
const Filter = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/common/category/filter', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const FindCategoryService = {
    Request,
    Response,
    Find,
    Filter
}