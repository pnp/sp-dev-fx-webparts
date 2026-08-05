import { CHECK_OUT_TYPE, CheckoutState, decideCheckoutAction } from './checkoutPolicy';

const ME = 'nicolas@contoso.com';

describe('decideCheckoutAction', () => {
  it('proceeds when nothing holds the file', () => {
    expect(decideCheckoutAction({ CheckOutType: CHECK_OUT_TYPE.none }, ME)).toEqual({ kind: 'proceed' });
  });

  it('checks in — never discards — a file we hold', () => {
    const state: CheckoutState = {
      CheckOutType: CHECK_OUT_TYPE.online,
      CheckedOutByUser: { Title: 'Nicolas', Email: ME }
    };

    expect(decideCheckoutAction(state, ME)).toEqual({ kind: 'checkin' });
  });

  it('checks in when the holder cannot be identified', () => {
    expect(decideCheckoutAction({ CheckOutType: CHECK_OUT_TYPE.online }, ME)).toEqual({ kind: 'checkin' });
  });

  it('refuses to touch a checkout held by someone else', () => {
    const state: CheckoutState = {
      CheckOutType: CHECK_OUT_TYPE.offline,
      CheckedOutByUser: { Title: 'Petter', Email: 'petter@contoso.com' }
    };

    expect(decideCheckoutAction(state, ME)).toEqual({ kind: 'blocked', heldBy: 'Petter' });
  });

  it('falls back to the holder email when they have no display name', () => {
    const state: CheckoutState = {
      CheckOutType: CHECK_OUT_TYPE.online,
      CheckedOutByUser: { Email: 'petter@contoso.com' }
    };

    expect(decideCheckoutAction(state, ME)).toEqual({ kind: 'blocked', heldBy: 'petter@contoso.com' });
  });

  it('compares identities case- and whitespace-insensitively', () => {
    const state: CheckoutState = {
      CheckOutType: CHECK_OUT_TYPE.online,
      CheckedOutByUser: { Title: 'Nicolas', Email: '  NICOLAS@Contoso.com ' }
    };

    expect(decideCheckoutAction(state, ME)).toEqual({ kind: 'checkin' });
  });

  it('proceeds rather than guessing when the state is unknown', () => {
    expect(decideCheckoutAction(undefined, ME)).toEqual({ kind: 'proceed' });
    expect(decideCheckoutAction({}, ME)).toEqual({ kind: 'proceed' });
  });

  it('does not block when the current user is unknown', () => {
    const state: CheckoutState = {
      CheckOutType: CHECK_OUT_TYPE.online,
      CheckedOutByUser: { Title: 'Petter', Email: 'petter@contoso.com' }
    };

    expect(decideCheckoutAction(state, undefined)).toEqual({ kind: 'checkin' });
  });
});
