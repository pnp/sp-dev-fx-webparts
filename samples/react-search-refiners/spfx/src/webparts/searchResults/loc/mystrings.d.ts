declare interface ISearchResultsWebPartStrings {
    SearchQuerySettingsGroupName: string;
    SearchSettingsGroupName: string;
    SearchQueryKeywordsFieldLabel: string;
    SearchQueryKeywordsFieldDescription: string;
    QueryTemplateFieldLabel: string;
    SelectedPropertiesFieldLabel: string;
    SelectedPropertiesFieldDescription: string;
    LoadingMessage: string;
    MaxResultsCount: string;
    NoResultMessage: string;
    RefinersFieldLabel: string;
    SortableFieldsLabel: string;
    RefinersFieldDescription: string;
    SortableFieldsDescription: string;
    FilterPanelTitle: string;
    SortPanelTitle: string;
    FilterResultsButtonLabel: string;
    SortResultsButtonLabel:string;
    SelectedFiltersLabel: string;
    RemoveAllFiltersLabel: string;
    ShowPagingLabel: string;
    ShowResultsCountLabel: string;
    ShowBlankLabel: string;
    ShowBlankEditInfoMessage: string;
    NoFilterConfiguredLabel: string;
    SearchQueryPlaceHolderText: string;
    EmptyFieldErrorMessage: string;
    PlaceHolderEditLabel: string;
    PlaceHolderConfigureBtnLabel: string;
    PlaceHolderIconText: string;
    PlaceHolderDescription: string;
    ResultSourceIdLabel: string;
    InvalidResultSourceIdMessage: string;
    EnableQueryRulesLabel: string;
    StylingSettingsGroupName: string;
    CountMessageShort: string;
    CountMessageLong: string;
    CancelButtonText: string;
    DialogButtonLabel: string;
    DialogButtonText: string;
    DialogTitle: string;
    SaveButtonText: string;
    ListLayoutOption: string;
    TilesLayoutOption: string;
    CustomLayoutOption: string;
    TemplateUrlFieldLabel: string;
    TemplateUrlPlaceholder: string;
    ErrorTemplateExtension: string;
    ErrorTemplateResolve: string;
    WebPartTitle: string;
    HandlebarsHelpersDescription: string;
    PromotedResultsLabel: string;
    PanelCloseButtonAria:string;  
    Sort: {
        SortList: string;
        SortListDescription: string;
        SortDirectionAscendingLabel:string;
        SortDirectionDescendingLabel:string;
        SortErrorMessage:string;
        SortPanelSortFieldLabel:string;
        SortPanelSortFieldAria:string;
        SortPanelSortFieldPlaceHolder:string;
        SortPanelSortDirectionLabel:string;              
    },
    TermNotFound: string;
    UseDefaultSearchQueryKeywordsFieldLabel: string;
    DefaultSearchQueryKeywordsFieldLabel: string;
    DefaultSearchQueryKeywordsFieldDescription: string;
}

declare module 'SearchResultsWebPartStrings' {
    const strings: ISearchResultsWebPartStrings;
    export = strings;
}
