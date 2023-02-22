import type { ProductModel } from "../interfaces/product.interface";
import { BaseApiService } from "./base-api.service";
type Request = ProductModel;
type Response = { message: string };
const service = new BaseApiService(true);
const Create = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/product/create', { headers: { 'Content-Type': 'application/json' }, payload });
};
const Update = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/product/update', { headers: { 'Content-Type': 'application/json' }, payload });
};
const Delete = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/product/delete', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const AdminCaptureProductService = {
    Request,
    Response,
    Create,
    Update,
    Delete,
}

