import { INavLink } from 'office-ui-fabric-react/lib/Nav';

export interface IPageNavigatorState {
  anchorLinks: INavLink[];
  selectedKey: string;
}