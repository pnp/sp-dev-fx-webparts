import { SPHttpClient } from '@microsoft/sp-http';
import { ISPListField } from './ISPListFields';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export declare class Helper {
    static parseDateTime(rawDate: string): Date;
    static sendEMail(receiver: string, bccReceiver: string, subject: string, body: string, siteUrl: string, wpCtx: WebPartContext): Promise<void>;
    static sendEMailRetired(receiver: string, subject: string, body: string, siteUrl: string, httpCtx: SPHttpClient): Promise<any>;
    static GetViewFields(viewXML: string): string[];
    static GetFieldValueAsString(field: ISPListField): string;
}
//# sourceMappingURL=Helper.d.ts.map