import { BaseApiService } from "./base-api.service";
type Response = { access_token: string };
const Send = async (): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.get<Response>('/ua/update', { headers: { 'Content-Type': 'application/json' } });
};
export const UpdateJwtService = {
    Response,
    Send
}