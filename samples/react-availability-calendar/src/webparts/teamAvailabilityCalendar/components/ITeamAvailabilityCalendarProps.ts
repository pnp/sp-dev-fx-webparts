import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IAbsenceFieldMap } from '../services/AbsenceService';

export type CalendarViewMode = 'month' | 'week';

export interface ITeamAvailabilityCalendarProps {
  context: WebPartContext;
  /** Absolute URL of the site holding the list; used to build user photo URLs. */
  siteUrl: string;
  listName: string;
  fieldMap: IAbsenceFieldMap;
  /** Whole month grid, or a single week row. */
  viewMode: CalendarViewMode;
  startWeekOnMonday: boolean;
  showWeekends: boolean;
  /** Rows of bars a day cell shows before collapsing the rest into "+N more". */
  maxLanesPerDay: number;
  showOutThisWeek: boolean;
  /** Tint days with at least this many people away. 0 disables the tint. */
  capacityWarningThreshold: number;
  /** Render bundled sample data instead of reading the list. */
  useMockData: boolean;
  isDarkTheme: boolean;
}
