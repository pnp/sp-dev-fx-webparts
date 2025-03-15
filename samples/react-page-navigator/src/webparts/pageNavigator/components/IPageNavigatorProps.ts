import { INavLink } from '@fluentui/react/lib/Nav';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IPageNavigatorProps {
  anchorLinks: INavLink[];
  themeVariant: IReadonlyTheme;
  stickyMode: boolean;
  stickyParentDistance: string;
  webpartId: string;
}
