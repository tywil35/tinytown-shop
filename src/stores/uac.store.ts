import { defineStore } from 'pinia'
export interface Uac {
    registerDlg: boolean;
    loginDlg: boolean;
}
export const useUacStore = defineStore<'uac', Uac, Record<string, never>, { hideRegister(): void, showRegister(): void, hideLogin(): void, showLogin(): void }>({
    id: 'uac',
    state: () => ({
        registerDlg: false,
        loginDlg: false,
    }),
    actions: {
        hideRegister(): void {
            this.registerDlg = false;
        },
        showRegister(): void {
            this.registerDlg = true;
        },
        hideLogin(): void {
            this.loginDlg = false;
        },
        showLogin(): void {
            this.loginDlg = true;
        },
    }
});