import type { UserModel } from "@/interfaces/user.inteface";
import { BaseApiService } from "./base-api.service";
type Response = UserModel[];
const service = new BaseApiService(true);
const AllUser = async (): Promise<Response> => {
    return service.get<Response>('/admin/user', { headers: { 'Content-Type': 'application/json' } });
};
export const AdminAllUsersService = {
    Response,
    AllUser
}