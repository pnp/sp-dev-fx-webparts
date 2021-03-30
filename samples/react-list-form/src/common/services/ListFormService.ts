import { Text } from '@microsoft/sp-core-library';
import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as strings from 'servicesStrings';
import { ControlMode } from '../datatypes/ControlMode';
import { IFieldSchema, RenderListDataOptions } from './datatypes/RenderListData';
import { IListFormService } from './IListFormService';
import { IAttachment } from '../../types/IAttachment';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPPeopleSearchService } from './SPPeopleSearchService';


export class ListFormService implements IListFormService {

    private spHttpClient: SPHttpClient;

    constructor(spHttpClient: SPHttpClient) {
        this.spHttpClient = spHttpClient;
    }

    /**
     * Gets the schema for all relevant fields for a specified SharePoint list form.
     *
     * @param webUrl The absolute Url to the SharePoint site.
     * @param listUrl The server-relative Url to the SharePoint list.
     * @param formType The type of form (Display, New, Edit)
     * @returns Promise object represents the array of field schema for all relevant fields for this list form.
     */
    public async getFieldSchemasForForm(webUrl: string, listUrl: string, formType: ControlMode): Promise<IFieldSchema[]> {
        return new Promise<IFieldSchema[]>((resolve, reject) => {
            const httpClientOptions: ISPHttpClientOptions = {
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-type': 'application/json;odata=verbose',
                    'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                    'odata-version': '',
                },
                body: JSON.stringify({
                    parameters: {
                        __metadata: {
                            type: 'SP.RenderListDataParameters',
                        },
                        ViewXml: '<View><ViewFields><FieldRef Name="ID"/></ViewFields></View>',
                        RenderOptions: RenderListDataOptions.clientFormSchema,
                    },
                }),
            };
            const endpoint = `${webUrl}/_api/web/GetList(@listUrl)/RenderListDataAsStream`
                + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}`;
            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions)
                .then((response: SPHttpClientResponse) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject(this.getErrorMessage(webUrl, response));
                    }
                })
                .then((data) => {
                    const form = (formType === ControlMode.New) ? data.ClientForms.New : data.ClientForms.Edit;
                    resolve(form[Object.keys(form)[0]]);
                })
                .catch((error) => {
                    reject(this.getErrorMessage(webUrl, error));
                });
        });
    }
    /**
     * Retrieves the options for a lookup field
     *
     * @param fieldSchema The field schema for the lookup field.
     * @param webUrl The absolute Url to the SharePoint site.
     * @returns Promise representing an object containing all the field values for the lookup field.
     */
    public async getLookupfieldOptions(fieldSchema: any, webUrl: string): Promise<any[]> {
        const endpoint = `${webUrl}/_api/Web/lists/getbyid('${fieldSchema.LookupListId}')/items?$orderby=${fieldSchema.LookupFieldName}&$top=5000`;

        try {
            let resp: SPHttpClientResponse = await this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
            if (resp.ok) {
                let json = await resp.json();
                return json.value.map((x) => {
                    return { LookupId: x.ID, LookupValue: x[fieldSchema.LookupFieldName], x };
                });
            }
        }
        catch (error) {
            console.error(error);
        }
        return [];

    }
    /**
     * Retrieves the options for a lookup field
     *
     * @param fieldSchema The field schema for the lookup field.
     * @param webUrl The absolute Url to the SharePoint site.
     * @returns Promise representing an object containing all the field values for the lookup field.
     */
    public async getLookupfieldsOnList(listUrl: string, webUrl: string, formType: ControlMode): Promise<any[]> {
        let fields = await this.getFieldSchemasForForm(webUrl, listUrl, formType);
        fields = fields.filter((x) => {
            return x.FieldType.indexOf("Lookup") === 0;
        });

        return fields;
    }
    /**
     * Retrieves the data for a specified SharePoint list form.
     *
     * @param webUrl The absolute Url to the SharePoint site.
     * @param listUrl The server-relative Url to the SharePoint list.
     * @param itemId The ID of the list item to be updated.
     * @param formType The type of form (Display, New, Edit)
     * @returns Promise representing an object containing all the field values for the list item.
     */
    public getDataForForm(webUrl: string, listUrl: string, itemId: number, formType: ControlMode): Promise<any> {
        if (!listUrl || (!itemId) || (itemId === 0)) {
            return Promise.resolve({}); // no data, so returns empty
        }
        return new Promise<any>((resolve, reject) => {
            const httpClientOptions: ISPHttpClientOptions = {
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-type': 'application/json;odata=verbose',
                    'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                    'odata-version': '',
                },
            };
            const endpoint = `${webUrl}/_api/web/GetList(@listUrl)/RenderExtendedListFormData`
                + `(itemId=${itemId},formId='editform',mode='2',options=7)`
                + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}`;
            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions)
                .then((response: SPHttpClientResponse) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject(this.getErrorMessage(webUrl, response));
                    }
                })
                .then((data) => {
                    const extendedData = JSON.parse(data.d.RenderExtendedListFormData);
                    if (formType !== ControlMode.Display) {
                        resolve(extendedData.ListData);
                    } else {
                        resolve(extendedData.Data.Row[0]);
                    }
                })
                .catch((error) => {
                    reject(this.getErrorMessage(webUrl, error));
                });
        });
    }
    public async getExtraFieldData(data: any, fieldSchema: any, ctx: IWebPartContext, siteUrl: string) {
        const userFields = fieldSchema.filter((x) => x.FieldType === "User" || x.FieldType === "UserMulti");

        let searchSvc = null;
        if (userFields.length > 0) {
            searchSvc = new SPPeopleSearchService();
        }
        for (let i = 0; i < userFields.length; i++) {
            let x = userFields[i];
            let val = data[x.InternalName];
            //Need group lookups
            for (let j = 0; j < val.length; j++) {
                let y = val[j];
                if (y.Key && y.Key.indexOf("c:0") == 0) {
                    let res = await searchSvc.resolvePeople(ctx, y.Key, siteUrl);
                    y.Key = res.Description;
                }
            }
        }

        return data;
    }

    /**
     * Saves the given data to the specified SharePoint list item.
     *
     * @param webUrl The absolute Url to the SharePoint site.
     * @param listUrl The server-relative Url to the SharePoint list.
     * @param itemId The ID of the list item to be updated.
     * @param fieldsSchema The array of field schema for all relevant fields of this list.
     * @param data An object containing all the field values to update.
     * @param originalData An object containing all the field values retrieved on loading from list item.
     * @returns Promise object represents the updated or erroneous form field values.
     */
    public updateItem = async (webUrl: string, listUrl: string, itemId: number, fieldsSchema: IFieldSchema[], data: any, originalData: any) => {
        const httpClientOptions: ISPHttpClientOptions = {
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-type': 'application/json;odata=verbose',
                'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                'odata-version': '',
            },
        };
        const formValues = this.GetFormValues(fieldsSchema, data, originalData);
        let createAttachments = this.GetAttachmentsCreate(data);
        let deleteAttachments = this.GetAttachmentsDelete(data, originalData);
        httpClientOptions.body = JSON.stringify({
            bNewDocumentUpdate: false,
            checkInComment: null,
            formValues,
        });

        const endpoint = `${webUrl}/_api/web/GetList(@listUrl)/items(@itemId)/ValidateUpdateListItem()`
            + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}&@itemId=%27${itemId}%27`;
        try {
            let response = await this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions);
            if (!response.ok) {
                return this.getErrorMessage(webUrl, response);
            }
            let responseData = await response.json();
            responseData.AttachmentResponse = [];
            if (deleteAttachments.length > 0) {
                let deleteResponse = await this.deleteAttachments(webUrl, listUrl, itemId, deleteAttachments);
                responseData.AttachmentResponse.push(deleteResponse);
            }
            if (createAttachments.length > 0) {
                let createResponse = await this.uploadAttachments(webUrl, listUrl, itemId, createAttachments);
                responseData.AttachmentResponse.push(createResponse);
            }
            return responseData.d.ValidateUpdateListItem.results;
        } catch (error) {
            return this.getErrorMessage(webUrl, error);
        }

    }

    /**
     * Adds a new SharePoint list item to a list using the given data.
     *
     * @param webUrl The absolute Url to the SharePoint site.
     * @param listUrl The server-relative Url to the SharePoint list.
     * @param fieldsSchema The array of field schema for all relevant fields of this list.
     * @param data An object containing all the field values to set on creating item.
     * @returns Promise object represents the updated or erroneous form field values.
     */
    public createItem(webUrl: string, listUrl: string, fieldsSchema: IFieldSchema[], data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const formValues = this.GetFormValues(fieldsSchema, data, {});
            const formAttachmetns = this.GetAttachmentsCreate(data);
            const httpClientOptions: ISPHttpClientOptions = {
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-type': 'application/json;odata=verbose',
                    'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                    'odata-version': '',
                },
                body: JSON.stringify({
                    listItemCreateInfo: {
                        __metadata: { type: 'SP.ListItemCreationInformationUsingPath' },
                        FolderPath: {
                            __metadata: { type: 'SP.ResourcePath' },
                            DecodedUrl: listUrl,
                        },
                    },
                    formValues,
                    bNewDocumentUpdate: false,
                    checkInComment: null,
                }),
            };
            const endpoint = `${webUrl}/_api/web/GetList(@listUrl)/AddValidateUpdateItemUsingPath`
                + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}`;
            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions)
                .then((response: SPHttpClientResponse) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject(this.getErrorMessage(webUrl, response));
                    }
                })
                .then((respData) => {
                    let itemId = respData.d.AddValidateUpdateItemUsingPath.results.find(item => {
                        return item.FieldName == "Id";
                    }).FieldValue;
                    //if there are attachments, we upload all of them.
                    if (formAttachmetns.length > 0) {
                        this.uploadAttachments(webUrl, listUrl, itemId, formAttachmetns)
                            .then((attachmentResponse) => {
                                respData.AttachmentResponse = attachmentResponse;
                                resolve(respData.d.AddValidateUpdateItemUsingPath.results);
                            })
                            .catch((error) => {
                                reject(this.getErrorMessage(webUrl, error));
                            });
                    }
                    resolve(respData.d.AddValidateUpdateItemUsingPath.results);
                })
                .catch((error) => {
                    reject(this.getErrorMessage(webUrl, error));
                });
        });
    }

    private uploadAttachments = async (webUrl: string, listUrl: string, itemId: number, attachments: any) => {
        let responses = [];
        for (var i = 0; i < attachments.length; i++) {
            let attachment = attachments[i];
            let httpClientOptions: ISPHttpClientOptions = {
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "content-type": "application/json; odata=verbose",
                    "content-length": attachment.buffer.byteLength,
                    'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                    'odata-version': '',
                },
                body: attachment.buffer,
            };
            let endpoint = `${webUrl}/_api/web/GetList(@listUrl)/items(@itemId)/AttachmentFiles/add(FileName='${attachment.fileName}')`
                + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}&@itemId=%27${itemId}%27`;
            try {
                let response = await this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions);
                if (response.ok) {
                    let respJson = await response.json();
                    responses.push(respJson);
                } else {
                    return this.getErrorMessage(webUrl, response);
                }
            } catch (error) {
                return error;
            }
        }
        return responses;
    }
    private deleteAttachments = async (webUrl: string, listUrl: string, itemId: number, attachments: string[]) => {
        let responses = [];
        for (const attachment of attachments) {
            let httpClientOptions: ISPHttpClientOptions = {
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "content-type": "application/json; odata=verbose",
                    'X-SP-REQUESTRESOURCES': 'listUrl=' + encodeURIComponent(listUrl),
                    "X-HTTP-Method": "DELETE",
                    'odata-version': '',
                }
            };
            let endpoint = `${webUrl}/_api/web/GetList(@listUrl)/items(@itemId)/AttachmentFiles/getByFileName('${attachment}')`
                + `?@listUrl=${encodeURIComponent('\'' + listUrl + '\'')}&@itemId=%27${itemId}%27`;
            try {
                await this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, httpClientOptions);
            } catch (error) {
                return error;
            }
        }
        return responses;
    }

    private GetFormValues(fieldsSchema: IFieldSchema[], data: any, originalData: any)
        : Array<{ FieldName: string, FieldValue: any, HasException: boolean, ErrorMessage: string }> {
        return fieldsSchema.filter(
            (field) => (
                (!field.ReadOnlyField)
                && (field.InternalName in data)
                && (data[field.InternalName] !== null)
                && (data[field.InternalName] !== originalData[field.InternalName])
                && (field.InternalName != "Attachments")
            ))
            .map((field) => {
                if (field.FieldType === "User" || field.FieldType === "UserMulti") {
                    return {
                        ErrorMessage: null,
                        FieldName: field.InternalName,
                        FieldValue: JSON.stringify(data[field.InternalName]),
                        HasException: false,
                    };
                }
                else if (field.FieldType === "DateTime") {
                    let dateValue = data[field.InternalName].split('').map((c) => { return (c.charCodeAt(0) < 127) ? c : ''; }).join('');
                    return {
                        ErrorMessage: null,
                        FieldName: field.InternalName,
                        FieldValue: dateValue,
                        HasException: false,
                    };
                }
                else {
                    return {
                        ErrorMessage: null,
                        FieldName: field.InternalName,
                        FieldValue: data[field.InternalName],
                        HasException: false,
                    };
                }
            });
    }
    private GetAttachmentsCreate(data: any)
        : Array<{ buffer: any, bufferLength: number, fileName: string }> {
        var results = new Array<{ buffer: any, bufferLength: number, fileName: string }>();
        if (data.Attachments && data.Attachments.length > 0) {
            results = data.Attachments
                .filter((attachment: IAttachment) => typeof attachment.AttachmentId == "undefined")
                .map((attachment: IAttachment) => {
                    return {
                        buffer: attachment.FileBuffer,
                        bufferLength: attachment.FileBuffer.byteLength,
                        fileName: attachment.FileName
                    } as { buffer: any, bufferLength: number, fileName: string };
                });
        }
        return results;
    }
    private GetAttachmentsDelete(data: any, originalData: any)
        : Array<string> {
        let results = new Array<string>();

        let newAttachments = (typeof data.Attachments.Attachments == "undefined") ? data.Attachments : data.Attachments.Attachments;
        if (originalData && originalData.Attachments && originalData.Attachments.Attachments) {
            let filtered = originalData.Attachments.Attachments
                .filter((originalAttachment: IAttachment) =>
                    !newAttachments.some((attachment: IAttachment) => attachment.FileName == originalAttachment.FileName)
                );
            results = filtered.map((originalAttachment: IAttachment) => originalAttachment.FileName);
        }
        return results;
    }

    /**
     * Returns an error message based on the specified error object
     * @param error : An error string/object
     */
    private getErrorMessage(webUrl: string, error: any): string {
        let errorMessage: string = error.statusText ? error.statusText : error.statusMessage ? error.statusMessage : error;
        const serverUrl = `{window.location.protocol}//{window.location.hostname}`;
        const webServerRelativeUrl = webUrl.replace(serverUrl, '');

        if (error.status === 403) {
            errorMessage = Text.format(strings.ErrorWebAccessDenied, webServerRelativeUrl);
        } else if (error.status === 404) {
            errorMessage = Text.format(strings.ErrorWebNotFound, webServerRelativeUrl);
        }
        return errorMessage;
    }

}
