export interface IEventRecurrenceInfoMonthlyState {
  selectedKey:string;
  selectPatern:string;
  startDate: Date;
  endDate:Date;
  numberOcurrences:string;
  dayOfMonth:string;
  everyNumberOfMonths: string;
  disableDayOfMonth: boolean;
  disableNumberOcurrences: boolean;
  selectdateRangeOption:string;
  disableEndDate:boolean;
  selectedRecurrenceRule:string;
  isLoading:boolean;
  errorMessageDayOfMonth:string;
  errorMessageNumberOfMonth:string;
  selectedWeekOrderMonth:string;
  selectedWeekDay:string | number;
  everyNumberOfMonthsWeekDay:string;
  errorMessageNumberOfMonthWeekDay:string;
}
