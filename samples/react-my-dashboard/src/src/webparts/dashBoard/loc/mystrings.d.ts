declare interface IDashBoardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  eventOrganizer:string;
  Agenda:string;
  Todo:string;
  CompanyAnnoucements:string;
  Trending:string;
  NoNews:string;
  Files:string;
  Used:string;
  Shared:string;
  MyFiles:string;
  NoFiles:string;
  NoData:string;
  Relevant:string;
  NoPeople:string;
  MyDashboard:string;
}

declare module 'DashBoardWebPartStrings' {
  const strings: IDashBoardWebPartStrings;
  export = strings;
}
