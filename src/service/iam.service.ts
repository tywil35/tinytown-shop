import { BaseApiService } from "./base-api.service";
type Response = { iam: boolean };
const Admin = async (): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.get<Response>('/iam/admin', { headers: { 'Content-Type': 'application/json' } });
};
const Staff = async (): Promise<Response> => {
    const _service = new BaseApiService(true);
    return _service.get<Response>('/iam/staff', { headers: { 'Content-Type': 'application/json' } });
};
export const IamService = {
    Response,
    Admin,
    Staff
}