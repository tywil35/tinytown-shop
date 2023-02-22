import { UserRoleEnum, UserStatusEnum } from "@/enum/user.enum";
import { InvoiceStatusEnum } from "@/interfaces/invoice.interface";
import { ProductStockLevelEnum } from "@/interfaces/product.interface";

export const FriendlyEnum = (key: string, value: number): string => {
    switch (key) {
        case 'invoice_status':
            return invoicestatus(value);
        case 'user_status':
            return userstatus(value);
        case 'user_role':
            return userrole(value);
        case 'active':
            return active(value);
        case 'goa_member_only':
            return yesno(value);
        case 'stock_level':
            return stocklevel(value);
        default:
            return 'None';
    }
}
// 'user_status','user_role','active','goa_member_number','stock_level'
const userstatus = (value: number): string => {
    switch (value) {
        case UserStatusEnum.Active:
            return 'Active';
        case UserStatusEnum.ActiveMember:
            return 'Active G.O.A';
        case UserStatusEnum.BlockMember:
            return 'Block';
        case UserStatusEnum.Inactive:
            return 'Inactive';
        default:
            return 'None';
    }
}
const userrole = (value: number): string => {
    switch (value) {
        case UserRoleEnum.SA:
            return 'Admin';
        case UserRoleEnum.FrontCounter:
            return 'Front Counter';
        case UserRoleEnum.BudBar:
            return 'Bud Bar';
        case UserRoleEnum.GoaMember:
            return 'G.O.A Member';
        case UserRoleEnum.Customer:
            return 'Customer';
        default:
            return 'None';
    }
}
const active = (value: number): string => {
    switch (value) {
        case 1:
            return 'Active';
        case 0:
            return 'Inactive';
        default:
            return 'Nope';
    }
}


const invoicestatus = (value: number): string => {
    switch (value) {
        case InvoiceStatusEnum.Pending:
            return 'Pending';
        case InvoiceStatusEnum.Cultivated:
            return 'Shared';
        case InvoiceStatusEnum.Cancel:
            return 'Cancel';
        default:
            return 'Nope';
    }
}
const yesno = (value: number): string => {
    switch (value) {
        case 1:
            return 'Yes';
        case 0:
            return 'No';
        default:
            return 'Nope';
    }
}

const stocklevel = (value: number): string => {
    switch (value) {
        case ProductStockLevelEnum.None:
            return 'None';
        case ProductStockLevelEnum.Low:
            return 'Low';
        case ProductStockLevelEnum.Ok:
            return 'Ok';
        case ProductStockLevelEnum.High:
            return 'High';
        default:
            return 'None';
    }
}