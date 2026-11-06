import { goertzelPower } from '@lp-labs/goertzel-power';
if (goertzelPower([1, 1, 1, 1], 0, 4) !== 16) throw new Error('Power');
// @ts-expect-error invalid argument must be rejected by declarations
goertzelPower(['1'], 0, 4);
