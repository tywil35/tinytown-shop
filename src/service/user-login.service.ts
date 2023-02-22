import { BaseApiService } from "./base-api.service";
type Request = { email: string, psswrd: string };
type Response = { access_token: string };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.post<Request, Response>('/ua/login', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const UserLoginService = {
    Request,
    Response,
    Send
}