import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import * as strings from 'DynamicFormularGeneratorWebPartStrings';
import { FieldTypes } from './FieldTypes';
import { ChoiceValue, ISPListField } from './ISPListFields';
import { LinkFieldValue } from './LinkFieldValue';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class Helper {
    static parseDateTime(rawDate: string): Date {
        let dateParser = /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        let match = rawDate.match(dateParser);
        if (match !== null)
            return new Date(
                parseInt(match[3]),  // year
                parseInt(match[2]) - 1,  // monthIndex
                parseInt(match[1]),  // day
                parseInt(match[4]),  // hours
                parseInt(match[5]),  // minutes
                parseInt(match[6])  //seconds
            );
        dateParser = /(\d{2})\.(\d{2})\.(\d{4})/;
        match = rawDate.match(dateParser);
        if (match !== null)
            return new Date(
                parseInt(match[3]),
                parseInt(match[2]) - 1,
                parseInt(match[1])
            );
        return null;
    }

    // https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0&tabs=javascript
    // https://learn.microsoft.com/en-us/graph/api/message-send?view=graph-rest-1.0&tabs=http
    // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis
    static async sendEMail(receiver: string, bccReceiver: string, subject: string, body: string, siteUrl: string, wpCtx: WebPartContext): Promise<void> {
        const sendMail = {
            message: {
                subject: subject,
                body: {
                    contentType: 'html',
                    content: body
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: receiver
                        }
                    }
                ],
                ccRecipients: (typeof bccReceiver !== "undefined" && bccReceiver !== null && bccReceiver.length > 0) ? [
                    {
                        emailAddress: {
                            address: bccReceiver
                        }
                    }
                ] : []
            },
            saveToSentItems: 'false'
        };

        const graphCtx = await wpCtx.msGraphClientFactory.getClient('3');
        await graphCtx.api(`/users/${wpCtx.pageContext.user.loginName}/sendMail`).post(sendMail)
    }

    // see: https://support.microsoft.com/en-us/office/retirement-of-the-sharepoint-sendemail-api-b35bbab1-7d09-455f-8737-c2de63fe0821
    static async sendEMailRetired(receiver: string, subject: string, body: string, siteUrl: string, httpCtx: SPHttpClient): Promise<any> {
        const reqOptions: ISPHttpClientOptions = {
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "odata-version": "3.0"
            },
            body: JSON.stringify({
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'To': { 'results': [receiver] },
                    'Body': body,
                    'Subject': subject
                }
            })
        };
        const resultInfo: SPHttpClientResponse = await httpCtx.post(`${siteUrl}/_api/SP.Utilities.Utility.SendEmail`, SPHttpClient.configurations.v1, reqOptions);
        return await resultInfo.json();
    }

    static GetViewFields(viewXML: string): string[] {
        const temp: string = viewXML.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(temp, "text/xml");
        const tempFields: string[] = [];
        xmlDoc.getElementsByTagName("ViewFields")[0].childNodes.forEach((node: HTMLElement, index) => {
            if (node.getAttribute("Name").indexOf("_x003a_") === -1)
                tempFields.push(node.getAttribute("Name"));
        });
        return tempFields;
    }

    static GetFieldValueAsString(field: ISPListField): string {
        if (field.FormValue !== null) {
            if (field.FieldTypeKind === FieldTypes.BOOLEAN) {
                if (field.FormValue)
                    return strings.LabelYES;
                else
                    return strings.LabelNO;
            }
            if (field.FieldTypeKind === FieldTypes.MULTICHOICE) {
                field.FormValue.toString();
            }
            if (field.FieldTypeKind === FieldTypes.URLORIMAGE) {
                return `${(field.FormValue as LinkFieldValue).Url} / ${(field.FormValue as LinkFieldValue).Description}`;
            }
            if (field.FieldTypeKind === FieldTypes.LOOKUP) {
                return `${(field.FormValue as ChoiceValue).Title} ${(field.FormValue as ChoiceValue).Details}`;
            }
            if (field.FieldTypeKind === FieldTypes.DATETIME) {
                const result: Date = Helper.parseDateTime(field.FormValue.toString());
                if (result !== null)
                    return result.toISOString();
            }
            return field.FormValue.toString();
        }
        return "";
    }

}