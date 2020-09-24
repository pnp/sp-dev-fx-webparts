declare interface IPhotoSyncWebPartStrings {
    PropertyPaneDescription: string;
    BasicGroupName: string;
    ListCreationText: string;
    PropTemplateLibLabel: string;
    PropTempLibLabel: string;
    PropDelThumbnail: string;
    PropAzFuncLabel: string;
    PropAzFuncDesc: string;
    PropUseCertLabel: string;
    PropUseCertCallout: string;
    PropDelThumbnailCallout: string;
    PropDateFormatLabel: string;
    PropInfoDateFormat: string;
    PropInfoUseCert: string;
    PropInfoTemplateLib: string;
    PropInfoNormalUser: string;
    PropAllowedUserInfo: string;
    PropEnableBUCallout: string;
    PropInfoTempLib: string;

    DefaultAppTitle: string;
    PlaceholderIconText: string;
    PlaceholderDescription: string;
    PlaceholderButtonLabel: string;
    AccessCheckDesc: string;
    SitePrivilegeCheckLabel: string;

    BtnUploadPhotoDataForSync: string;
    BtnUpdatePhotoProps: string;
    BtnAzurePhotoProps: string;
    BtnUpdatePhoto: string;

    PPLPickerTitleText: string;
    Photo_UserListChanges: string;
    Photo_UserListEmpty: string;
    PropsLoader: string;
    PropsUpdateLoader: string;
    AdminConfigHelp: string;
    AccessDenied: string;
    NoAADPhotos: string;
    UpdateProcessInitialized: string;
    EmptyPhotoMsg: string;
    BulkSyncNote: string;
    BulkPhotoDragDrop: string;
    JobsListLoaderDesc: string;
    EmptyTable: string;
    JobResultsDialogTitle: string;
    JobResultsLoaderDesc: string;
    SyncFailedErrorMessage: string;

    TabMenu1: string;
    TabMenu2: string;
    TabMenu3: string;
    TabMenu4: string;
    TabMenu5: string;
}

declare module 'PhotoSyncWebPartStrings' {
    const strings: IPhotoSyncWebPartStrings;
    export = strings;
}
