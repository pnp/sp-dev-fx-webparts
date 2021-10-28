declare interface IReactMyEventsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  NoOfEventsFieldLabel: string;
  NoEventsFoundFieldLabel: string;
  DateRangeFieldLabel: string;
  DateRangeOptionUpcoming: string;
  DateRangeOptionWeek: string;
  DateRangeOptionTwoWeeks: string;
  DateRangeOptionMonth: string;
  DateRangeOptionQuarter: string;
  AllDayDateFormat: string;
  LocalizedTimeFormat: string;
  EventCardWrapperArialLabel:string
  FilmStripAriaLabel: string;
  FocusZoneAriaLabelReadMode:string;
  FocusZoneAriaLabelEditMode: string;
  PlaceholderTitle: string;
  PlaceholderDescription: string;
  ConfigureButton: string;
  CreatedLabel: string;
}

declare module 'ReactMyEventsWebPartStrings' {
  const strings: IReactMyEventsWebPartStrings;
  export = strings;
}
