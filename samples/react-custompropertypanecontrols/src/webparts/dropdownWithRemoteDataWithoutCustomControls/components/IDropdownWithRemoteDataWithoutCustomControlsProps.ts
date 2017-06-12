import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDropdownWithRemoteDataWithoutCustomControlsProps {
  list: string;
  item: string;
  needsConfiguration: boolean;
  configureWebPart: () => void;
  displayMode: DisplayMode;
}
