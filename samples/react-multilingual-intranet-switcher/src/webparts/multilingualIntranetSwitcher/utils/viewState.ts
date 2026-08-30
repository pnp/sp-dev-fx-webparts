export type SwitcherViewState = 'ready' | 'empty' | 'error';

export interface IAccessibilityState {
  containerRole: 'region' | 'alert';
  statusLive: 'polite' | 'off';
}

export const getSwitcherViewState = (hasConfiguration: boolean, hasItems: boolean): SwitcherViewState => {
  if (!hasConfiguration) {
    return 'error';
  }
  return hasItems ? 'ready' : 'empty';
};

export const getAccessibilityState = (viewState: SwitcherViewState): IAccessibilityState => ({
  containerRole: viewState === 'error' ? 'alert' : 'region',
  statusLive: viewState === 'error' ? 'off' : 'polite'
});
