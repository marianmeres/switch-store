import { StoreReadable, createStore } from '@marianmeres/store';

export interface SwitchStore<T>
	extends StoreReadable<{
		payload: T;
		isOn: boolean;
		isOff: boolean;
		// aliases
		isOpen: boolean;
		isClosed: boolean;
	}> {
	on: (payload?: any) => void;
	off: (payload?: any) => void;
	toggle: () => void;
	open: (payload?: any) => void;
	close: (payload?: any) => void;
}

export const createSwitchStore = <T>(
	initial: boolean = false,
	payload: T | null = null
): SwitchStore<T> => {
	const isFlags = (v: boolean) => ({ isOn: !!v, isOpen: !!v, isOff: !v, isClosed: !v });

	const _store = createStore<{
		payload: T;
		isOn: boolean;
		isOff: boolean;
		// alias
		isOpen: boolean;
		isClosed: boolean;
	}>({ ...isFlags(initial), payload });

	const _onOrOff = (v: boolean, payload: any) => {
		let old = _store.get();
		if (payload !== undefined) old = { ...old, payload };
		_store.set({ ...old, ...isFlags(!!v) });
	};

	const on = (payload = undefined) => _onOrOff(true, payload);

	const off = (payload = undefined) => _onOrOff(false, payload);

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
