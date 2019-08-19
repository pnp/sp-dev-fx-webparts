import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDropdownWithRemoteDataProps {
  list: string;
  item: string;
  needsConfiguration: boolean;
  configureWebPart: () => void;
  displayMode: DisplayMode;
}
