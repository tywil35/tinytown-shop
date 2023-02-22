import { TailwindToastDefault } from '@/enum/tailwind-default.enum';
import { defineStore } from 'pinia'
export interface Toast {
    color: string;
    msg: string;
    visibility: boolean;
}
export const useToastStore = defineStore<'toast', Toast, Record<string, never>, { setColor(color: string): void, setMsg(msg: string): void, clearMsg(): void, showFor(opt: { msg: string, color?: string, x?: number }): void, show(): void, hide(): void }>({
    id: 'toast',
    state: () => ({
        color: TailwindToastDefault.TOAST_BG,
        msg: '',
        visibility: false,
    }),
    actions: {
        setColor(color: string): void {
            this.color = color;
        },
        setMsg(msg: string): void {
            this.msg = msg;
        },
        clearMsg(): void {
            this.msg = '';
            this.color = TailwindToastDefault.TOAST_BG;
        },
        showFor(opt: { msg: string, color?: string, x?: number }): void {
            this.msg = opt.msg;
            this.color = opt.color ?? TailwindToastDefault.TOAST_BG;
            this.visibility = true;
            setTimeout(this.hide, opt.x ?? 1500);
        },
        show(): void {
            this.visibility = true;
        },
        hide(): void {
            this.visibility = false;
            this.clearMsg;
        },
    }
});
/**
 *   
 toastStore.setColor('bg-blue-400');
  const msg = {
    msg: 'Hey buddy asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
    x: 1500,
    color: 'bg-yellow-400'
  }
  toastStore.showFor(msg);
*/