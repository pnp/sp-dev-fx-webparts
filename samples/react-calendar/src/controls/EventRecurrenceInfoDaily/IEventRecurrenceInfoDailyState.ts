export interface IEventRecurrenceInfoDailyState {
  selectedKey:string;
  selectPatern:string;
  startDate: Date;
  endDate:Date;
  numberOcurrences:string;
  numberOfDays:string;
  disableNumberOfDays: boolean;
  disableNumberOcurrences: boolean;
  selectdateRangeOption:string;
  disableEndDate:boolean;
  selectedRecurrenceRule:string;
  isLoading:boolean;
  errorMessageNumberOfDays: string;
  errorMessageNumberOcurrences: string;
}
