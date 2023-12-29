import { createClog } from '@marianmeres/clog';
import { TestRunner } from '@marianmeres/test-runner';
import { strict as assert } from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createSwitchStore } from '../src/index.js';

const clog = createClog(path.basename(fileURLToPath(import.meta.url)));
const suite = new TestRunner(path.basename(fileURLToPath(import.meta.url)));

suite.test('basic', () => {
	const bs = createSwitchStore<undefined>(true);

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(v.isOpen);
		assert(!v.isOff);
		assert(!v.isClosed);
	})();

	bs.toggle();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(!v.isOpen);
		assert(v.isOff);
		assert(v.isClosed);
	})();

	bs.on();

	bs.subscribe((v) => {
		assert(v.isOn);
	})();

	bs.close();

	bs.subscribe((v) => {
		assert(!v.isOn);
	})();
});

suite.test('undefined state works', () => {
	const bs = createSwitchStore(undefined);

	bs.subscribe((v) => {
		assert(v.isOff);
		assert(v.isUndefined);
	})();

	bs.toggle();

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(!v.isOff);
		assert(!v.isUndefined);
	})();

	bs.unset();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isOff);
		assert(v.isUndefined);
	})();

	bs.off();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isOff);
		assert(!v.isUndefined);
	})();

	bs.unset();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isOff);
		assert(v.isUndefined);
	})();

	bs.on();

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(!v.isOff);
		assert(!v.isUndefined);
	})();
});

suite.test('toggle unset', () => {
	const bs = createSwitchStore<undefined>(undefined);

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isOff);
		assert(v.isUndefined);
	})();

	bs.toggleUnset();

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(!v.isOff);
		assert(!v.isUndefined);
	})();

	bs.toggleUnset();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isOff);
		assert(v.isUndefined);
	})();
});

suite.test('with data', () => {
	const bs = createSwitchStore<{ foo: string }>(false);

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(!v.data);
	})();

	bs.open({ foo: 'bar' });

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(v.data?.foo === 'bar');
	})();

	// we're closing with paylod - legit
	bs.close({ foo: 'baz' });

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.data?.foo === 'baz');
	})();

	bs.open();

	bs.subscribe((v) => {
		assert(v.isOn);
		assert(v.data?.foo === 'baz'); // baz still there
	})();

	bs.unset();

	bs.subscribe((v) => {
		assert(!v.isOn);
		assert(v.isUndefined);
		assert(v.data?.foo === 'baz'); // baz still there
	})();
});

suite.test('with data and persistence', () => {
	let storage: any = null;
	const bs = createSwitchStore<{ foo: string }>(
		undefined,
		{ foo: 'bar' },
		{ persist: (v) => (storage = v) }
	);

	const unsub = bs.subscribe((v) => {});

	// internal structure is stored, not the isXyz flags
	assert(storage.data.foo === 'bar');
	assert(storage.value === null); // null, not undefined

	bs.open({ foo: 'baz' });

	assert(storage.data.foo === 'baz');
	assert(storage.value === true);

	unsub();
});

export default suite;
