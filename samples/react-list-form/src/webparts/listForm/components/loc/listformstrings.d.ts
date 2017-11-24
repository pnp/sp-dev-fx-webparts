declare interface IListFormStrings {
    SaveButtonText: string;
    CancelButtonText: string;
    AddNewFieldAction: string;
    LoadingFormIndicator: string;
    ErrorLoadingSchema: string;
    ConfigureListMessage: string;
    RequiredValueMessage: string;s
    ErrorLoadingData: string;
    ItemSavedSuccessfully: string;
    FieldsErrorOnSaving: string;
    ErrorOnSavingListItem: string;
  }
  
  declare module 'ListFormStrings' {
    const strings: IListFormStrings;
    export = strings;
  }
  