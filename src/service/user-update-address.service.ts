import { BaseApiService } from "./base-api.service";
type Request = { address: string };
type Response = { message: string };
const Send = async (payload: Request): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.post<Request, Response>('/ua/profile/address', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const UserUpdateAddressService = {
    Request,
    Response,
    Send
}