import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { PagesToDisplay } from '@src/utilities';
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IContainerProps {
  currentPageId: number;
  pagesToDisplay: PagesToDisplay;
  themeVariant: IReadonlyTheme;
  context: WebPartContext;
  domElement: HTMLElement;
  // all this is just for WebPartTitle control
  showTitle: boolean;
  title: string;
  displayMode: DisplayMode;
  updateTitle: (value: string) => void;
  onConfigure: () => void;

  pageEditFinished: boolean;
}
