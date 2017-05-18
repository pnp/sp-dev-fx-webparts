import { DisplayMode } from '@microsoft/sp-client-base';

export interface IConfigProps {
  displayMode: DisplayMode;
  configure: () => void;
}