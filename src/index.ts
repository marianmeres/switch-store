import { StoreReadable, createStore } from '@marianmeres/store';

export interface SwitchStore<T>
	extends StoreReadable<{
		data: T;
		isOn: boolean;
		isOff: boolean;
		// aliases
		isOpen: boolean;
		isClosed: boolean;
	}> {
	on: (data?: any) => void;
	off: (data?: any) => void;
	toggle: () => void;
	open: (data?: any) => void;
	close: (data?: any) => void;
}

export const createSwitchStore = <T>(
	initial: boolean = false,
	data: T | null = null
): SwitchStore<T> => {
	const isFlags = (v: boolean) => ({ isOn: !!v, isOpen: !!v, isOff: !v, isClosed: !v });

	const _store = createStore<{
		data: T;
		isOn: boolean;
		isOff: boolean;
		// alias
		isOpen: boolean;
		isClosed: boolean;
	}>({ ...isFlags(initial), data });

	const _onOrOff = (v: boolean, data: any) => {
		let old = _store.get();
		if (data !== undefined) old = { ...old, data };
		_store.set({ ...old, ...isFlags(!!v) });
	};

	const on = (data = undefined) => _onOrOff(true, data);

	const off = (data = undefined) => _onOrOff(false, data);

	return {
		subscribe: _store.subscribe,
		get: _store.get,
		on,
		off,
		toggle: () => _store.update((v) => ({ ...v, ...isFlags(!v.isOn) })),
		// aliases
		open: on,
		close: off,
	};
};
