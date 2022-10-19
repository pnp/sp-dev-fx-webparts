import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPageNavigatorProps {
  anchorLinks: INavLink[];
  themeVariant: IReadonlyTheme;
}
