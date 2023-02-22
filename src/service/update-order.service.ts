import { BaseApiService } from "./base-api.service";
type Request = {
    invoice_id: string
};
type Response = { message: string };
const Cultivated = async (invoice_id: string): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/order/cultivated', { headers: { 'Content-Type': 'application/json' }, payload: { invoice_id: invoice_id } }, 'PUT');
};
const Cancel = async (invoice_id: string): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/order/cancel', { headers: { 'Content-Type': 'application/json' }, payload: { invoice_id: invoice_id } }, 'PUT');
};
export const UpdateOrderService = {
    Request,
    Response,
    Cultivated,
    Cancel
}