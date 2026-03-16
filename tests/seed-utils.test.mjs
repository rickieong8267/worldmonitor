import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isTransientRedisError } from '../scripts/_seed-utils.mjs';

describe('seed utils redis error handling', () => {
  it('treats undici connect timeout as transient', () => {
    const err = new TypeError('fetch failed');
    err.cause = new Error('Connect Timeout Error');
    err.cause.code = 'UND_ERR_CONNECT_TIMEOUT';

    assert.equal(isTransientRedisError(err), true);
  });

  it('does not treat generic validation errors as transient redis failures', () => {
    const err = new Error('validation failed');
    assert.equal(isTransientRedisError(err), false);
  });
});
