import {
	CreateStoreOptions,
	StoreReadable,
	createDerivedStore,
	createStore,
} from '@marianmeres/store';

interface SwitchStoreInternalValue<T> {
	value: boolean | null;
	data: T | null;
}

interface SwitchStoreDerivedValue<T> {
	data: T | null;
	isOn: boolean;
	isOff: boolean;
	isUndefined: boolean;
	// alias
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

export const createSwitchStore = <T>(
	initial?: boolean | undefined,
	data: T | null = null,
	createStoreOptions: CreateStoreOptions<SwitchStoreInternalValue<T>> | null = null
): SwitchStore<T> => {
	// internally keeping value as `null`, even being referred as `undefined`
	const _value = (v: any) => (v === undefined || v === null ? null : !!v);

	const _internal = createStore<SwitchStoreInternalValue<T>>(
		{ value: _value(initial), data },
		createStoreOptions
	);

	const _store = createDerivedStore<{
		data: T;
		isOn: boolean;
		isOff: boolean;
		isUndefined: boolean;
		// alias
		isOpen: boolean;
		isClosed: boolean;
	}>([_internal], ([v]) => {
		const isOn = v.value === true;
		const isUndefined = v.value === null; // internally storing always as `null`
		const isOff = !isOn;
		return { data: v.data, isOn, isOff, isUndefined, isOpen: isOn, isClosed: isOff };
	});

	const _onOrOff = (v: boolean | undefined, data: any) => {
		let old = _internal.get();
		// intentionally using data only if defined so it is not reset on switching
		if (data !== undefined) old = { ...old, data };
		_internal.set({ ...old, value: _value(v) });
	};

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
		toggle: () => _internal.update((v) => ({ ...v, value: _value(!v.value) })),
		toggleUnset: () => (_internal.get().value ? unset() : on()),
		// aliases
		open: on,
		close: off,
	};
};
