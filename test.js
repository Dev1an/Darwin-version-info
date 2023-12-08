import test from 'node:test'
import assert from 'node:assert'
import {iOSInfoFrom} from './index.js'

test('synchronous passing test', (t) => {
	// This test passes because it does not throw an exception.

	const iOS1701 = 'CFNetwork/1485 Darwin/23.1.0'
	const iOS1504 =                'Darwin/21.4.0'

	assert.strictEqual(iOSInfoFrom(iOS1701).version, '17.1');
	assert.strictEqual(iOSInfoFrom(iOS1504).version, '15.4');
})