export interface IEventRecurrenceInfoWeeklyState {
  selectedKey:string;
  selectPatern:string;
  startDate: Date;
  endDate:Date;
  numberOcurrences:string;
  numberOfWeeks:string;
  disableNumberOfWeeks: boolean;
  disableNumberOcurrences: boolean;
  selectdateRangeOption:string;
  disableEndDate:boolean;
  weeklySunday:boolean;
  weeklyMonday:boolean;
  weekklyTuesday:boolean;
  weekklyWednesday:boolean;
  weekklyThursday:boolean;
  weeklyFriday:boolean;
  weeklySaturday:boolean;
  isLoading:boolean;
  errorMessageNumberOfWeeks:string;
}
