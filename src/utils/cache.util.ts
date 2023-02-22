export enum StorageType {
    LOCAL_STORAGE = 'localStorage',
    SESSION_STORAGE = 'sessionStorage'
}

export function AddCache<T>(key: string, store: T | undefined, storageType: StorageType = StorageType.LOCAL_STORAGE): void {
    const canStore = store !== undefined ? JSON.stringify(store) : undefined;
    if (storageType === StorageType.LOCAL_STORAGE) {
        if (canStore) { localStorage.setItem(key, canStore); }
        else { localStorage.removeItem(key); }
    } else {
        if (canStore) { sessionStorage.setItem(key, canStore); }
        else { sessionStorage.removeItem(key); }
    }
}

export function FetchCache<T>(key: string, storageType: StorageType = StorageType.LOCAL_STORAGE): T | undefined {
    try {
        if (storageType === StorageType.LOCAL_STORAGE) {
            const str = localStorage.getItem(key);
            return str != null ? JSON.parse(str) : undefined;
        } else {
            const str = sessionStorage.getItem(key);
            return str != null ? JSON.parse(str) : undefined;
        }
    } catch (e) {
        return undefined;
    }
}
