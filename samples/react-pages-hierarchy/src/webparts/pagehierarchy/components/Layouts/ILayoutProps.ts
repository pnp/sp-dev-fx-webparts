import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPage } from '@src/models/IPage';
import { INavLink } from 'office-ui-fabric-react';

export interface ILayoutProps {
  domElement: HTMLElement;
  pages: IPage[];
  nav?: INavLink;
  pageId?: number;
  themeVariant: IReadonlyTheme;
}
