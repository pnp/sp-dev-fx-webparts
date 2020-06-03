export interface IEventRecurrenceInfoYearlyState {
  selectedKey:string;
  selectPatern:string;
  startDate: Date;
  endDate:Date;
  numberOcurrences:string;
  dayOfMonth:string;

  disableDayOfMonth: boolean;
  disableNumberOcurrences: boolean;
  selectdateRangeOption:string;
  disableEndDate:boolean;
  selectedRecurrenceRule:string;
  isLoading:boolean;
  errorMessageDayOfMonth:string;
  selectedWeekOrderMonth:string;
  selectedWeekDay:string;
  selectedMonth:string | number;
  selectedYearlyByDayMonth: string | number;
}
