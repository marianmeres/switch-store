import { StoreReadable } from '@marianmeres/store';
export interface SwitchStore<T> extends StoreReadable<{
    data: T;
    isOn: boolean;
    isOff: boolean;
    isUndefined: boolean;
    isOpen: boolean;
    isClosed: boolean;
}> {
    on: (data?: any) => void;
    off: (data?: any) => void;
    unset: () => void;
    toggle: () => void;
    open: (data?: any) => void;
    close: (data?: any) => void;
}
export declare const createSwitchStore: <T>(initial?: boolean | undefined, data?: T | null) => SwitchStore<T>;
