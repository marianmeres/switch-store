import { CreateStoreOptions, StoreReadable } from '@marianmeres/store';
interface SwitchStoreInternalValue<T> {
    value: boolean | null;
    data: T | null;
}
interface SwitchStoreDerivedValue<T> {
    data: T | null;
    isOn: boolean;
    isOff: boolean;
    isUndefined: boolean;
    isOpen: boolean;
    isClosed: boolean;
}
export interface SwitchStore<T> extends StoreReadable<SwitchStoreDerivedValue<T>> {
    on: (data?: any) => void;
    off: (data?: any) => void;
    unset: (data?: any) => void;
    toggle: () => void;
    toggleUnset: () => void;
    open: (data?: any) => void;
    close: (data?: any) => void;
}
export declare const createSwitchStore: <T>(initial?: boolean | undefined, data?: T | null, createStoreOptions?: CreateStoreOptions<SwitchStoreInternalValue<T>> | null) => SwitchStore<T>;
export {};
