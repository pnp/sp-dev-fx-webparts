
export const CHECK_OUT_TYPE = {
  online: 0,
  offline: 1,
  none: 2
} as const;

export interface CheckoutState {
  readonly CheckOutType?: number;
  readonly CheckedOutByUser?: {
    readonly Title?: string;
    readonly Email?: string;
  };
}

export type CheckoutAction =
  | { readonly kind: 'proceed' }
  | { readonly kind: 'checkin' }
  | { readonly kind: 'blocked'; readonly heldBy: string };

export const decideCheckoutAction = (
  state: CheckoutState | undefined,
  currentUserEmail: string | undefined
): CheckoutAction => {
  if (!state || state.CheckOutType === undefined || state.CheckOutType === CHECK_OUT_TYPE.none) {
    return { kind: 'proceed' };
  }

  const holderEmail = state.CheckedOutByUser?.Email?.trim().toLowerCase();
  const currentEmail = currentUserEmail?.trim().toLowerCase();

  if (holderEmail && currentEmail && holderEmail !== currentEmail) {
    return { kind: 'blocked', heldBy: state.CheckedOutByUser?.Title?.trim() || holderEmail };
  }

  return { kind: 'checkin' };
};
