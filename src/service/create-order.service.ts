import type { ProductOrder } from "../interfaces/product.interface";
import { BaseApiService } from "./base-api.service";
type Request = {
    delivery_address: string,
    delivery_note: string,
    delivery_time: Date,
    items: ProductOrder[]
};
type Response = { message: string };
const Send = async (order: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/order', { headers: { 'Content-Type': 'application/json' }, payload: order },);
};
export const CreateOrderService = {
    Request,
    Response,
    Send
}