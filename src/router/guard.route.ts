import { AdminRoutes } from './admin.route';
import { OpenRoutes } from "./open.route";

export const AllowedToRoute = (route: string): boolean => {
    if (OpenRoutes.children?.find(element => element.name === route) != undefined) {
        return true;
    }
    return false;
};

export const RoleAllowedToRoute = (role: string, route: string): boolean => {
    switch (role) {
        case 'ADMIN':
            return AdminRoutes.children?.find(element => element.name === route) != undefined;
        default:
            return false;
    }
};
