import { StoreReadable, createStore } from '@marianmeres/store';

export interface SwitchStore<T>
	extends StoreReadable<{
		data: T;
		isOn: boolean;
		isOff: boolean;
		isUndefined: boolean;
		// aliases
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

export const createSwitchStore = <T>(
	initial?: boolean | undefined,
	data: T | null = null
): SwitchStore<T> => {
	const _isFlags = (v: boolean | undefined) => {
		const isOn = v === true;
		const isUndefined = v === undefined;
		// any other than true is considered off
		const isOff = !isOn;
		return { isOn, isOff, isUndefined, isOpen: isOn, isClosed: isOff };
	};

	const _store = createStore<{
		data: T;
		isOn: boolean;
		isOff: boolean;
		isUndefined: boolean;
		// alias
		isOpen: boolean;
		isClosed: boolean;
	}>({ ..._isFlags(initial), data });

	const _onOrOff = (v: boolean | undefined, data: any) => {
		let old = _store.get();
		// intentionally using data only if defined so it is not reset on switching
		if (data !== undefined) old = { ...old, data };
		_store.set({ ...old, ..._isFlags(v) });
	};

	// const on = (data = undefined) => _onOrOff(true, data);
	// const off = (data = undefined) => _onOrOff(false, data);

	// somewhat dirty: point is, most of the time (but not always), it is very handy
	// to call on/off like: on:click={switch.open}, where the first argument is
	// Event which must be ignored here... so, just hacking here to dynamically - based
	// on the number of args - pick either first or second arg as "data"
	const _extractData = (...args: any[]) => args[args.length > 1 ? 1 : 0];
	const on = (...args: any[]) => _onOrOff(true, _extractData(...args));
	const off = (...args: any[]) => _onOrOff(false, _extractData(...args));
	const unset = (...args: any[]) => _onOrOff(undefined, _extractData(...args));

	return {
		subscribe: _store.subscribe,
		get: _store.get, // extra method outside of Svelte store contract
		on,
		off,
		unset,
		toggle: () => _store.update((v) => ({ ...v, ..._isFlags(!v.isOn) })),
		// aliases
		open: on,
		close: off,
	};
};
