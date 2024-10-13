import { INavLink } from '@fluentui/react/lib/Nav';

export interface IPageNavigatorState {
  anchorLinks: INavLink[];
  selectedKey: string;
}