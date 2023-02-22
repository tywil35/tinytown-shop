import type { UserProfileModel } from "@/interfaces/profile.interface";
import { BaseApiService } from "./base-api.service";
export type Response = UserProfileModel;
export const Send = async (): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.get<Response>('/ua/profile', { headers: { 'Content-Type': 'application/json' } });
};
export const UserProfileService = {
    Response,
    Send
}