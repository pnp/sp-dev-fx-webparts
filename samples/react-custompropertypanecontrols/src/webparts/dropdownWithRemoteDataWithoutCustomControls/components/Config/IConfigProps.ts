import { DisplayMode } from '@microsoft/sp-core-library';

export interface IConfigProps {
  displayMode: DisplayMode;
  configure: () => void;
}