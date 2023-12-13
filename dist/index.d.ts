import { StoreReadable } from '@marianmeres/store';
export interface BooleanStore<T> extends StoreReadable<{
    payload: T;
    isOn: boolean;
    isOpen: boolean;
}> {
    on: (payload?: any) => void;
    off: (payload?: any) => void;
    toggle: () => void;
    open: (payload?: any) => void;
    close: (payload?: any) => void;
}
export declare const createBooleanStore: <T>(initial?: boolean, payload?: T | null) => BooleanStore<T>;
