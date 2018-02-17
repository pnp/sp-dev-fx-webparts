declare interface IEmployeeSpotlightStrings {
  propertyPaneHeading: string;
  selectSiteLableMessage: string;
  selectListLableMessage: string;
  employeeEmailcolumnLableMessage: string;
  descriptioncolumnLableMessage: string;
  expirationDateColumnLableMessage: string;
  effectsGroupName: string;
  spotlightBGColorLableMessage:string;
  spotlightFontColorLableMessage:string;
  enableAutoSlideLableMessage: string;
  carouselSpeedLableMessage: string;
}

declare module 'employeeSpotlightStrings' {
  const strings: IEmployeeSpotlightStrings;
  export = strings;
}
