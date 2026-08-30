/// <reference types="mocha" />

import { assert } from 'chai';
import { getAccessibilityState, getSwitcherViewState } from '../utils/viewState';

describe('MultilingualIntranetSwitcher accessibility states', () => {
  it('keeps explicit accessibility contracts for error, empty, and ready states', () => {
    assert.equal(getSwitcherViewState(true, false), 'empty');
    assert.equal(getSwitcherViewState(true, true), 'ready');
    assert.equal(getSwitcherViewState(false, false), 'error');
    assert.deepEqual(getAccessibilityState('error'), { containerRole: 'alert', statusLive: 'off' });
    assert.deepEqual(getAccessibilityState('empty'), { containerRole: 'region', statusLive: 'polite' });
    assert.deepEqual(getAccessibilityState('ready'), { containerRole: 'region', statusLive: 'polite' });
  });
});
