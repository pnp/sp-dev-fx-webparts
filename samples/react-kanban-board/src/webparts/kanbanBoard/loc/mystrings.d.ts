declare interface IKanbanBoardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;

  //Resource is used for Translating percentage  SP Field Title would be better
  PercentComplete: string;

  propertyPaneHideWPHeadline: string;
  propertyPaneHideWPHeadlineShow: string;
  propertyPaneHideWPHeadlineHide: string;
  propertyPaneSelectList: string;

  propertyPaneGroupNameOrderBuckets: string;
  propertyPaneLabelOrderBuckets: string;
  propertyPaneBucketConfiguration: string;


  PlaceholderIconText: string;
  PlaceholderDescription: string;
  PlaceholderButtonLabel: string;
  SpinnerLabel: string;
}

declare module 'KanbanBoardWebPartStrings' {
  const strings: IKanbanBoardWebPartStrings;
  export = strings;
}
