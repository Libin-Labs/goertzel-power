function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function sample(values: readonly number[], max = 2048): void {
  if (!Array.isArray(values) || !values.length || values.length > max)
    throw new RangeError('Nonempty bounded sample required');
  for (const v of values) finite(v, -1e6, 1e6);
}
export function goertzelPower(
  values: readonly number[],
  frequency: number,
  sampleRate: number,
): number {
  sample(values, 65536);
  finite(sampleRate, 1e-6, 1e12);
  finite(frequency, 0, sampleRate / 2);
  const coefficient = 2 * Math.cos((2 * Math.PI * frequency) / sampleRate);
  let previous = 0,
    older = 0;
  for (const v of values) {
    const next = v + coefficient * previous - older;
    older = previous;
    previous = next;
  }
  return Math.max(0, previous * previous + older * older - coefficient * previous * older);
}
