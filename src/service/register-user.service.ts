import { BaseApiService } from "./base-api.service";
type Request = { username: string, email: string, cell: string, psswrd: string, verifyGoa: boolean };
type Response = { message: string };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.post<Request, Response>('/ua/register', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const RegisterUserService = {
    Request,
    Response,
    Send
}