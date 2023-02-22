import { defineStore } from 'pinia'
export interface LoadS {
    load: boolean;
}
export const useLoadStore = defineStore<'loadS', LoadS, Record<string, never>, { hide(): void, show(): void }>({
    id: 'loadS',
    state: () => ({
        load: false,
    }),
    actions: {
        hide(): void {
            setTimeout(() => this.load = false, 800);
        },
        show(): void {
            this.load = true;
        }
    }
});