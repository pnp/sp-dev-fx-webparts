import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFlightTrackerProps {
  title: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  currentTheme: IReadonlyTheme | undefined;
  context: WebPartContext
  numberItemsPerPage: number;
  displayMode: DisplayMode;
    updateProperty: (value: string) => void;
  webpartContainerWidth: number;

}
