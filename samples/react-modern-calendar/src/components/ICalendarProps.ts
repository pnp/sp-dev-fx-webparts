import { BaseComponentContext } from "@microsoft/sp-component-base";
import { EAppHostName } from "../constants/EAppHostName";
import { ECalendarViews } from "@nuvemerudita/react-controls";
import { IUnifiedCalendar } from "@nuvemerudita/m365-hooks";
import { Theme } from "@fluentui/react";

export interface ICalendarProps {
 isDarkTheme: boolean;
  hasTeamsContext: boolean;
  themeString: string;
  theme?: Partial<Theme>  | undefined;
  context: BaseComponentContext;
  title: string;
  appHostName: EAppHostName;
  isRunninglocal: boolean;
  aadUserId: string;
  containerWidth: number;
  selectedCalendars: IUnifiedCalendar[];
  height: string;
  defaultView: ECalendarViews;
  autoRefresh: boolean;
  refreshInterval: number;
}
