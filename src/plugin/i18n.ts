/* import { i18n, type i18nOption } from "@cbana/i18n"
import type { App, Plugin } from "vue";

export const i18nPlugin: Plugin = {
    install: (app: App, json: any) => {
        const translateLang = (key: string, option?: i18nOption) => {
            const s = new i18n(json);
            return s.translator(key, option);
        }
        app.config.globalProperties.$i18n = translateLang;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $i18n: (key: string, option?: i18nOption) => string;
    }
} */
export const ha = '';