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

	assert(bs.get().isOn);
	assert(bs.get().isOpen);
	assert(!bs.get().isOff);
	assert(!bs.get().isClosed);

	bs.toggle();

	assert(!bs.get().isOn);
	assert(!bs.get().isOpen);
	assert(bs.get().isOff);
	assert(bs.get().isClosed);

	bs.on();

	assert(bs.get().isOn);

	bs.close();

	assert(!bs.get().isOn);
});

suite.test('undefined state works', () => {
	const bs = createSwitchStore<undefined>(undefined);

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(bs.get().isUndefined);

	bs.toggle();

	assert(bs.get().isOn);
	assert(!bs.get().isOff);
	assert(!bs.get().isUndefined);

	bs.unset();

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(bs.get().isUndefined);

	bs.off();

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(!bs.get().isUndefined);

	bs.unset();

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(bs.get().isUndefined);

	bs.on();

	assert(bs.get().isOn);
	assert(!bs.get().isOff);
	assert(!bs.get().isUndefined);
});

suite.test('toggle unset', () => {
	const bs = createSwitchStore<undefined>(undefined);

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(bs.get().isUndefined);

	bs.toggleUnset();

	assert(bs.get().isOn);
	assert(!bs.get().isOff);
	assert(!bs.get().isUndefined);

	bs.toggleUnset();

	assert(!bs.get().isOn);
	assert(bs.get().isOff);
	assert(bs.get().isUndefined);
});

suite.test('with data', () => {
	const bs = createSwitchStore<{ foo: string }>(false);

	assert(!bs.get().isOpen);
	assert(!bs.get().data);

	bs.open({ foo: 'bar' });

	assert(bs.get().isOpen);
	assert(bs.get().data.foo === 'bar');

	// we're closing with paylod - legit
	bs.close({ foo: 'baz' });

	assert(!bs.get().isOpen);
	assert(bs.get().data.foo === 'baz');

	bs.open();

	assert(bs.get().isOpen);
	assert(bs.get().data.foo === 'baz'); // baz still there

	bs.unset();

	assert(!bs.get().isOpen);
	assert(bs.get().isUndefined);
	assert(bs.get().data.foo === 'baz'); // baz still there
});

export default suite;
