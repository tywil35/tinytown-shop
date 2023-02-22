import { BaseApiService } from "./base-api.service";
type Request = { email: string, forgot_token?: string, psswrd?: string };
type Response = { message: string };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.post<Request, Response>('/ua/forgot-password', { headers: { 'Content-Type': 'application/json' }, payload });
};
const Validate = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.post<Request, Response>('/ua/forgot-password/update', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const ForgotPasswordService = {
    Request,
    Response,
    Send,
    Validate
}