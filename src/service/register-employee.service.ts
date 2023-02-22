import { BaseApiService } from "./base-api.service";
type Request = { username: string, email: string, cell: string, psswrd: string, role: number };
type Response = { message: string };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService();
    return _service.post<Request, Response>('/ua/register-employee', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const RegisterEmployeeService = {
    Request,
    Response,
    Send
}