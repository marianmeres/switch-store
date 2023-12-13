import { StoreReadable } from '@marianmeres/store';
export interface SwitchStore<T> extends StoreReadable<{
    payload: T;
    isOn: boolean;
    isOff: boolean;
    isOpen: boolean;
    isClosed: boolean;
}> {
    on: (payload?: any) => void;
    off: (payload?: any) => void;
    toggle: () => void;
    open: (payload?: any) => void;
    close: (payload?: any) => void;
}
export declare const createSwitchStore: <T>(initial?: boolean, payload?: T | null) => SwitchStore<T>;
