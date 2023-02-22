import type { InvoiceModel, InvoiceStatusEnum } from "@/interfaces/invoice.interface";
import { BaseApiService } from "./base-api.service";
type Request = { status: InvoiceStatusEnum };
type Response = InvoiceModel[];
const Send = async (): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.get<Response>('/order', { headers: { 'Content-Type': 'application/json' } },);
};
const Filter = async (filter: { status: InvoiceStatusEnum }): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/order/filter', { headers: { 'Content-Type': 'application/json' }, payload: filter },);
};
export const AllOrderService = {
    Request,
    Response,
    Send,
    Filter
}