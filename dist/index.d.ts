import { StoreReadable } from '@marianmeres/store';
export interface SwitchStore<T> extends StoreReadable<{
    data: T;
    isOn: boolean;
    isOff: boolean;
    isOpen: boolean;
    isClosed: boolean;
}> {
    on: (data?: any) => void;
    off: (data?: any) => void;
    toggle: () => void;
    open: (data?: any) => void;
    close: (data?: any) => void;
}
export declare const createSwitchStore: <T>(initial?: boolean, data?: T | null) => SwitchStore<T>;
