export enum RenderListDataOptions {
    none = 0,
    contextInfo = 1,
    listData = 2,
    listSchema = 4,
    menuView = 8,
    listContentType = 16,
    fileSystemItemId = 32,
    clientFormSchema = 64,
    quickLaunch = 128,
    spotlight = 256,
    visualization = 512,
    viewMetadata = 1024,
    disableAutoHyperlink = 2048,
    enableMediaTAUrls = 4096,
    parentInfo = 8192,
}

export interface IChoice {
    LookupId: number;
    LookupValue: string;
}

export interface IFieldSchema {
    Id: string;
    Title: string;
    InternalName: string;
    StaticName: string;
    Hidden: boolean;
    IMEMode: string;
    Name: string;
    Required: boolean;
    Direction: string;
    FieldType: string;
    Description: string;
    ReadOnlyField: boolean;
    IsAutoHyperLink: boolean;
    Type: string;
    DefaultValue: string;
    DefaultValueTyped: any;
    MaxLength: number;
    DependentLookup?: boolean;
    AllowMultipleValues?: boolean;
    BaseDisplayFormUrl: string;
    Throttled?: boolean;
    LookupListId: string;
    ChoiceCount?: number;
    Choices: any[];
    RichText?: boolean;
    AppendOnly?: boolean;
    RichTextMode?: number;
    NumberOfLines?: number;
    AllowHyperlink?: boolean;
    RestrictedMode?: boolean;
    ScriptEditorAdderId: string;
    FillInChoice?: boolean;
    MultiChoices: string[];
    FormatType?: number;
    ShowAsPercentage?: boolean;
    Presence?: boolean;
    WithPicture?: boolean;
    DefaultRender?: boolean;
    WithPictureDetail?: boolean;
    ListFormUrl: string;
    UserDisplayUrl: string;
    EntitySeparator: string;
    PictureOnly?: boolean;
    PictureSize?: any;
    UserInfoListId: string;
    SharePointGroupID?: number;
    PrincipalAccountType: string;
    SearchPrincipalSource?: number;
    ResolvePrincipalSource?: number;
    UserNoQueryPermission?: boolean;
    DisplayFormat?: number;
    CalendarType?: number;
    ShowWeekNumber?: boolean;
    TimeSeparator: string;
    TimeZoneDifference: string;
    FirstDayOfWeek?: number;
    FirstWeekOfYear?: number;
    HijriAdjustment?: number;
    WorkWeek: string;
    LocaleId: string;
    LanguageId: string;
    MinJDay?: number;
    MaxJDay?: number;
    DefaultValueFormatted: string;
    SspId: string;
    TermSetId: string;
    AnchorId: string;
    AllowFillIn?: boolean;
    WidthCSS: string;
    Lcid?: number;
    IsSpanTermSets?: boolean;
    IsSpanTermStores?: boolean;
    IsAddTerms?: boolean;
    IsUseCommaAsDelimiter?: boolean;
    Disable?: boolean;
    WebServiceUrl: string;
    HiddenListInternalName: string;
    HoursOptions?: string[];
}

export interface IFormSchema {
    Item: IFieldSchema[];
}

export interface IRenderListDataAsStreamResponse {
    ClientForms: {
        New: IFormSchema;
        Edit: IFormSchema;
    };
    ContentTypeIdToNameMap: any;
    EnableAttachments: string;
    FormRenderModes: {
        New?: { RenderType: number };
        Edit?: { RenderType: number };
        Display?: { RenderType: number };
    };
}
