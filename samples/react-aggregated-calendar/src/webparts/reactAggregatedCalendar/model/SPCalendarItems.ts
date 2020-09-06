/**
 * Interface for SPCalendarItemsValue
 *
 * @export
 * @interface SPCalendarItemsValue
 */
export interface SPCalendarItemsValue {
  Id: number;
  Title: string;
  Location?: any;
  EventDate: Date;
  EndDate: Date;
  Description?: any;
  fAllDayEvent?: boolean;
  Category?: string;
}

/**
 * Interface for SPCalendarItems
 *
 * @export
 * @interface SPCalendarItems
 */
export interface SPCalendarItems {
  value: SPCalendarItemsValue[];
}
