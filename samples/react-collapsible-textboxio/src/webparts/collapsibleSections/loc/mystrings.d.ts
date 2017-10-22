declare interface ICollapsibleSectionsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  LoadingMessage: string;
  EmptySectionsMessage: string;
  ConfirmDeleteItem: string;
  ConfirmButton: string;
  CancelButton: string;
  EditLinksCommandAdd: string;
  EditLinksCommandRemove: string;
  EditLinksColumnTitle: string;
  EditLinksColumnAbstract: string;
  EditLinksColumnCreationDate: string;
  EditLinksModalHeader: string;
  EditLinksModalLink: string;
  EditLinksModalSearchPlaceholder: string;
  ReferenceSectionsFetchErrorMessage: string;
  SectionDescriptionPlaceHolderText: string;
  RelatedContentUpdateErrorMessage: string;
}

declare module 'CollapsibleSectionsWebPartStrings' {
  const strings: ICollapsibleSectionsWebPartStrings;
  export = strings;
}
