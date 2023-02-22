import type { UserRoleEnum, UserStatusEnum } from "@/enum/user.enum";
import { BaseApiService } from "./base-api.service";
type Request = { update_user_id?: string, username: string, email: string, cell: string, goa_member_number: string, address_line: string, user_role: UserRoleEnum, user_status: UserStatusEnum };
type Response = { message: string };
const service = new BaseApiService(true);
const RegisterUser = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/user/create', { headers: { 'Content-Type': 'application/json' }, payload });
};
const UpdateUser = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/user/update', { headers: { 'Content-Type': 'application/json' }, payload });
};
const BlockUser = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/user/block', { headers: { 'Content-Type': 'application/json' }, payload });
};
const AllowUser = async (payload: Request): Promise<Response> => {
    return service.post<Request, Response>('/admin/user/allow', { headers: { 'Content-Type': 'application/json' }, payload });
};
export const AdminUsersService = {
    Request,
    Response,
    RegisterUser,
    UpdateUser,
    BlockUser,
    AllowUser
}