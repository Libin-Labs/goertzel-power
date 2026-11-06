import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('DC', () => {
  assert.equal(api.goertzelPower([1, 1, 1, 1], 0, 4), 16);
});
test('Nyquist', () => {
  assert.equal(api.goertzelPower([1, -1, 1, -1], 2, 4), 16);
});
test('single sinusoid', () => {
  const a = Array.from({ length: 32 }, (_, i) => Math.cos((2 * Math.PI * 3 * i) / 32));
  assert.ok(Math.abs(api.goertzelPower(a, 3, 32) - 256) < 1e-10);
});
test('direct DFT oracle', () => {
  const a = [1, 2, 4, -1, 3];
  for (const f of [0, 0.1, 0.2, 0.5]) {
    let re = 0,
      im = 0;
    for (let i = 0; i < a.length; i++) {
      re += a[i] * Math.cos(2 * Math.PI * f * i);
      im -= a[i] * Math.sin(2 * Math.PI * f * i);
    }
    assert.ok(Math.abs(api.goertzelPower(a, f, 1) - (re * re + im * im)) < 1e-10);
  }
});
test('invalid frequency', () => {
  assert.throws(() => api.goertzelPower([1], 1, 1));
  assert.throws(() => api.goertzelPower([1], 0, 0));
});
test('type and empty', () => {
  assert.throws(() => api.goertzelPower([], 0, 1));
  assert.throws(() => api.goertzelPower(['1'], 0, 1));
});
