import { IamService } from "@/service/iam.service";
import { UpdateJwtService } from "@/service/update-jwt.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMenuStore } from "@/stores/menu-item.store";
import { useUacStore } from "@/stores/uac.store";
let intervalId = -1;
const StartInterval = () => {
    if (intervalId !== -1) {
        clearInterval(intervalId);
    }
    updateAuth();
    intervalId = setInterval(updateAuth, 300000);
}
const ClearInterval = () => {
    clearInterval(intervalId);
}
const updateAuth = () => {
    const authStore = useAuthStore();
    const menuStore = useMenuStore();
    if (authStore.token) {
        IamService.Admin().then((res) => {
            if (res.iam) {
                menuStore.setAdminUsers(true);
                menuStore.setAdminProducts(true);
            } else {
                menuStore.setAdminUsers(false);
                menuStore.setAdminProducts(false);
            }
        }).catch(err => console.warn(err));
        IamService.Staff().then((res) => {
            if (res.iam) {
                menuStore.setOrders(true);
            } else {
                menuStore.setOrders(false);
            }
        }).catch(err => console.warn(err));
        UpdateJwtService.Send().then(res => {
            authStore.setToken(res.access_token);
        })
            .catch(err => {
                console.warn(err);
                authStore.clearToken();
                const uacStore = useUacStore();
                if (!uacStore.loginDlg && !uacStore.registerDlg) {
                    uacStore.showLogin();
                }
            });
    }
}
export const RefreshAuthUtil = {
    StartInterval,
    ClearInterval
}