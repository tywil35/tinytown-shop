import { useAuthStore } from "@/stores/auth.store";
import { useLoadStore } from "@/stores/load.store";
import { useShopStore } from "@/stores/shop.store";
import { useUacStore } from "@/stores/uac.store";
import { LocalStorageEnum } from "../enum/local-storage.enum";

export class BaseApiService {
    protected apiUrl = import.meta.env.VITE_API_URL;
    protected auth;
    private AUTH_HEADER_KEY = 'authorization';
    private loader = useLoadStore();
    constructor(auth = false) {
        this.auth = auth;
    }
    protected jwt_token = (): string => {
        return `Bearer ${localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN) ?? ''}`;
    }
    protected clearStores = ():void=>{
        const uacStore = useUacStore();
        const authStore = useAuthStore();
        authStore.clearToken();
        uacStore.showLogin();
    }
    post<Request, Response>(url: string, options?: {
        payload?: Request,
        headers?: Record<string, string>
    }, method: 'POST' | 'PUT' = 'POST'): Promise<Response> {
        return new Promise((resolve, reject) => {
            const post = async () => {
                let headers = options?.headers;
                if (this.auth === true) {
                    if (!headers) { headers = {}; }
                    headers[this.AUTH_HEADER_KEY] = this.jwt_token();
                }
                const reqInfo: RequestInfo = `${this.apiUrl}${url}`;
                const reqInit: RequestInit = {
                    method,
                    headers,
                    body: JSON.stringify(options?.payload)
                };
                this.loader.show();
                return fetch(reqInfo, reqInit)
                    .then(res => {
                        res.json().then((json) => {
                            this.loader.hide();
                            if (![200, 201].includes(res.status)) {
                                reject(json);
                                this.clearStores();
                            } else {
                                resolve(json);
                            }
                        });
                    }).catch(error => { reject(error); });
            };
            post();
        });
    }
    get<Response>(url: string, options?: {
        headers?: Record<string, string>
    }, method: 'GET' | 'DELETE' = 'GET'): Promise<Response> {
        return new Promise((resolve, reject) => {
            const get = async () => {
                let headers = options?.headers;
                if (this.auth === true) {
                    if (!headers) { headers = {}; }
                    headers[this.AUTH_HEADER_KEY] = this.jwt_token();
                }
                const reqInfo: RequestInfo = `${this.apiUrl}${url}`;
                const reqInit: RequestInit = {
                    method,
                    headers
                };
                this.loader.show();
                return fetch(reqInfo, reqInit)
                    .then(res => {
                        res.json().then((json) => {
                            this.loader.hide();
                            if (![200, 201].includes(res.status)) {
                                reject(json);
                                this.clearStores();
                            } else {
                                resolve(json);
                            }
                        });
                    }).catch(error => { reject(error); });
            };
            get();
        });
    }
}

