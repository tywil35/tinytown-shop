import { LocalStorageEnum } from '@/enum/local-storage.enum';
import { defineStore } from 'pinia'
export interface AuthStore {
    token: string | undefined;
}
export const useAuthStore = defineStore<'auth', AuthStore, Record<string, never>, { setToken(token: string): void, clearToken(): void }>({
    id: 'auth',
    state: () => ({
        token: localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN) ?? undefined,
    }),
    actions: {
        setToken(token: string): void {
            this.token = token;
            localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, token)
        },
        clearToken(): void {
            this.token = undefined;
            localStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN)
        }
    }
});