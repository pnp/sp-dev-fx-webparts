import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IMultilingualIntranetSwitcherProps {
  context: WebPartContext;
  title: string;
  configurationJson: string;
}
