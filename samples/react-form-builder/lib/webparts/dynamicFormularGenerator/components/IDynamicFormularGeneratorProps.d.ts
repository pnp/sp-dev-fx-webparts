import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IRuleEntry } from '../../../Common/IRuleEntry';
import { IRESTLookupDefinition } from '../../../Common/IRESTLookupDefinition';
import { IDateTimeFieldValue } from '@pnp/spfx-property-controls';
export interface IDynamicFormularGeneratorProps {
    description: string;
    isDarkTheme: boolean;
    hasTeamsContext: boolean;
    userDisplayName: string;
    viewID: string;
    listID: string;
    viewXml: string;
    httpClient: SPHttpClient;
    siteURL: string;
    successMessage: string;
    uploads: number;
    allowedUploadFileTypes: string;
    addionalFieldRules: {
        [key: string]: IRuleEntry;
    };
    emailSubject: string;
    emailLeadText: string;
    currentUserEMail: string;
    sendConfirmationEMail: boolean;
    addDataLinkInEMail: boolean;
    enablePrint: boolean;
    wpContext: WebPartContext;
    RESTLookupDefinition: IRESTLookupDefinition[];
    validFrom: IDateTimeFieldValue | null;
    validTo: IDateTimeFieldValue | null;
    msgFormNotPublished: string;
    msgFormExpired: string;
    contentTypeID: string;
    emailNotifyBCC: string;
}
//# sourceMappingURL=IDynamicFormularGeneratorProps.d.ts.map