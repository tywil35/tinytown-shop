import type { UserRoleEnum, UserStatusEnum } from "@/enum/user.enum";

export type UserModel = {
    id?: string;
    login_time?: Date,
    username: string,
    email: string,
    cell: string,
    goa_member_signup?: boolean,
    goa_member_number?: string,
    address_line: string,
    user_role: UserRoleEnum,
    user_status: UserStatusEnum
};