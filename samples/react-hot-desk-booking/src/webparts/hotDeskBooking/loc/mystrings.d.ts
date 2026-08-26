declare interface IHotDeskBookingWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  ResourcesListNameFieldLabel: string;
  BookingsListNameFieldLabel: string;
  DefaultResourceTypeFieldLabel: string;
  AdminModeFieldLabel: string;
}

declare module 'HotDeskBookingWebPartStrings' {
  const strings: IHotDeskBookingWebPartStrings;
  export = strings;
}
