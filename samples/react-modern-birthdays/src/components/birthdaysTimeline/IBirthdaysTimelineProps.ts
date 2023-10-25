import { ITheme } from 'office-ui-fabric-react/lib/Styling';

import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IBirthdaysTimelineProps {
  title: string;
  numberDays: number;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  theme?:ITheme | IReadonlyTheme;
  context: BaseComponentContext;
  displayMode: DisplayMode;
  pageSize:number;
  updateProperty: (value: string) => void;
  todayBirthdaysMessage?: string;
  noBirthdaysMessage?: string;
}
