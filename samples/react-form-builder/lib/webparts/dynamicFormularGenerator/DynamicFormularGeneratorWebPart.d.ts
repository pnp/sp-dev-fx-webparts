import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, IPropertyPaneGroup } from '@microsoft/sp-property-pane';
import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IRuleEntry } from '../../Common/IRuleEntry';
import { IDateTimeFieldValue } from '@pnp/spfx-property-controls';
import { IRESTLookupDefinition } from '../../Common/IRESTLookupDefinition';
export declare enum AppMode {
    SharePoint = 0,
    SharePointLocal = 1,
    Teams = 2,
    TeamsLocal = 3,
    Office = 4,
    OfficeLocal = 5,
    Outlook = 6,
    OutlookLocal = 7
}
export interface IDynamicFormularGeneratorWebPartProps {
    description: string;
    successMessage: string;
    fieldRESTLoookup: IRESTLookupDefinition[];
    siteUrl: string;
    crossSite: IPropertyFieldSite[];
    sourceListName: string;
    viewID: string;
    viewXML: string;
    emailToUser: boolean;
    attachmentFields: number;
    allowedUploadFileTypes: string;
    addionalFieldRules: {
        [key: string]: IRuleEntry;
    };
    emailSubject: string;
    emailHeader: string;
    addDataLinkInEMail: boolean;
    enablePrint: boolean;
    validFrom: IDateTimeFieldValue | null;
    validTo: IDateTimeFieldValue | null;
    msgFormNotPublished: string;
    msgFormExpired: string;
    contentTypeID: string;
    emailNotifyBCC: string;
}
export default class DynamicFormularGeneratorWebPart extends BaseClientSideWebPart<IDynamicFormularGeneratorWebPartProps> {
    private _isDarkTheme;
    private _appMode;
    private _theme;
    private availableLists;
    private viewsInList;
    private viewData;
    private contentTypesInList;
    private fieldsInView;
    private loadingLists;
    render(): void;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    private GetSelectedUrl;
    private loadWPConfigInformation;
    private GetContentTypes4List;
    private qryListInformation;
    private qryViews4List;
    private loadAvailableLists;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void;
    protected get getSourceConfiguration(): IPropertyPaneGroup;
    protected get getMiscConfiguration(): IPropertyPaneGroup;
    protected onPropertyPaneConfigurationStart(): void;
    protected getEMailConfiguration(): IPropertyPaneGroup;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=DynamicFormularGeneratorWebPart.d.ts.map