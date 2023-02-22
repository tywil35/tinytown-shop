import type { InvoiceItemProductModel } from "@/interfaces/invoice.interface";
import type { UserProfileGoaModel } from "@/interfaces/profile.interface";
import { BaseApiService } from "./base-api.service";
type Request = { user_id: string, order_id: string };
type Response = { user: UserProfileGoaModel, items: InvoiceItemProductModel[] };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/order/details', { headers: { 'Content-Type': 'application/json' }, payload }).then(res => {
        for (let index = 0; index < res.items.length; index++) {
            const element = res.items[index];
            element.product_option = JSON.parse(element.product_option as string);
        }
        return res;
    });
};
export const OrderDetailService = {
    Request,
    Response,
    Send
}