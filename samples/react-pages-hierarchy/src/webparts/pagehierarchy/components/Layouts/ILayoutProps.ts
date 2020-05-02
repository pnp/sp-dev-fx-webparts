import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPage } from '@src/models/IPage';

export interface ILayoutProps {
  domElement: HTMLElement;
  pages: IPage[];
  themeVariant: IReadonlyTheme;
}
