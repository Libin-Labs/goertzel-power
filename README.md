# @lp-labs/goertzel-power

Single-frequency power by bounded Goertzel recurrence.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/goertzel-power
```

## Working example

```js
import { goertzelPower } from '@lp-labs/goertzel-power';
if (goertzelPower([1, 1, 1, 1], 0, 4) !== 16) throw new Error('Power');
```

CommonJS: `const api = require('@lp-labs/goertzel-power')`.

## Behavior, customization and limits

goertzelPower(values,frequency,sampleRate) accepts1..65536 finite samples[-1e6,1e6],sampleRate[1e-6,1e12],frequency[0,sampleRate/2]. Returns unnormalized squared magnitude of the DFT at that frequency,which need not be an integer bin. O(N)time,constant storage. Negative roundoff power clamped0. No windowing,phase,peak detection or alias elimination.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function goertzelPower(
  values: readonly number[],
  frequency: number,
  sampleRate: number,
): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
