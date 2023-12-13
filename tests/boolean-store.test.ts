import path from 'node:path';
import { strict as assert } from 'node:assert';
import { fileURLToPath } from 'node:url';
import { createClog } from '@marianmeres/clog';
import { TestRunner } from '@marianmeres/test-runner';
import { createBooleanStore } from '../src/index.js';

const clog = createClog(path.basename(fileURLToPath(import.meta.url)));
const suite = new TestRunner(path.basename(fileURLToPath(import.meta.url)));

suite.test('basic', () => {
	const bs = createBooleanStore<undefined>(true);
	assert(bs.get().isOn);
	bs.toggle();
	assert(!bs.get().isOn);
	bs.on();
	assert(bs.get().isOn);
	bs.close();
	assert(!bs.get().isOn);
});

suite.test('with payload', () => {
	const bs = createBooleanStore<{ foo: string }>(false);
	assert(!bs.get().isOpen);
	assert(!bs.get().payload);

	bs.open({ foo: 'bar' });

	assert(bs.get().isOpen);
	assert(bs.get().payload.foo === 'bar');

	// we're closing with paylod - legit
	bs.close({ foo: 'baz' });

	assert(!bs.get().isOpen);
	assert(bs.get().payload.foo === 'baz');

	bs.open();

	assert(bs.get().isOpen);
	assert(bs.get().payload.foo === 'baz'); // baz still there
});

export default suite;
