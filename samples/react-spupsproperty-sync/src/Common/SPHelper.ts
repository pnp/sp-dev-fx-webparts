import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/profiles";
import "@pnp/sp/search";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import * as moment from 'moment/moment';
import { IWeb } from "@pnp/sp/webs";
import { IUserInfo, IPropertyMappings, IPropertyPair, FileContentType, SyncType, JobStatus } from "./IModel";
import { IList } from '@pnp/sp/lists';
import { ChoiceFieldFormatType } from '@pnp/sp/fields/types';
import { IFileAddResult, IFileInfo } from '@pnp/sp/files';

const map: any = require('lodash/map');
const intersection: any = require('lodash/intersection');
const orderBy: any = require('lodash/orderBy');

export interface ISPHelper {
    getCurrentUserInfo: () => Promise<IUserInfo>;
    checkCurrentUserGroup: (allowedGroups: string[], userGroups: string[]) => boolean;
    getAzurePropertyForUsers: (selectFields: string, filterQuery: string) => Promise<any[]>;
    getPropertyMappings: () => Promise<any[]>;
    getPropertyMappingsTemplate: (propertyMappings: IPropertyMappings[]) => Promise<any>;
    addFilesToFolder: (filename: string, fileContent: any) => Promise<IFileAddResult>;
    addDataFilesToFolder: (fileContent: any, filename: string) => Promise<IFileAddResult>;
    getFileContent: (filepath: string, contentType: FileContentType) => void;
    createSyncItem: (syncType: SyncType) => Promise<number>;
    updateSyncItem: (itemid: number, inputJson: string) => void;
    updateSyncItemStatus: (itemid: number, errMsg: string) => void;
    getAllJobs: () => void;
    getAllTemplates: () => Promise<IFileInfo[]>;
    getAllBulkList: () => Promise<IFileInfo[]>;

    runAzFunction: (httpClient: HttpClient, inputData: any, azFuncUrl: string, itemid: number) => void;
}

export default class SPHelper implements ISPHelper {

    private SiteURL: string = "";
    private SiteRelativeURL: string = "";
    private AdminSiteURL: string = "";
    private SyncTemplateFilePath: string = "";
    private SyncUploadFilePath: string = "";
    private SyncJSONFileName: string = `SyncTemplate_${moment().format("MMDDYYYYhhmmss")}.json`;
    private SyncCSVFileName: string = `SyncTemplate_${moment().format("MMDDYYYYhhmmss")}.csv`;
    private _web: IWeb = null;

    private Lst_PropsMapping = 'Sync Properties Mapping';
    private Lst_SyncJobs = 'UPS Sync Jobs';

    constructor(siteurl: string, tenantname: string, domainname: string, relativeurl: string, libid: string) {
        this.SiteURL = siteurl;
        this.SiteRelativeURL = relativeurl;
        this.AdminSiteURL = `https://${tenantname}-admin.${domainname}`;
        this._web = sp.web;
        this.getTemplateLibraryInfo(libid);
    }

    public getTemplateLibraryInfo = async (libid: string) => {
        if (libid) {
            let libinfo = await this._web.lists.getById(libid).select('Title').get();
            this.SyncTemplateFilePath = `/${libinfo.Title}/SyncJobTemplate/`;
            this.SyncUploadFilePath = `/${libinfo.Title}/UPSDataToProcess/`;
        }
    }
    /**
     * Get the Azure property data for the Users
     */
    public getAzurePropertyForUsers = async (selectFields: string, filterQuery: string): Promise<any[]> => {
        let users = await graph.users.filter(filterQuery).select(selectFields).get();
        return orderBy(users, 'displayName', 'asc');
    }
    /**
     * Get the property mappings from the 'Sync Properties Mapping' list.
     */
    public getPropertyMappings = async (): Promise<any[]> => {
        return await this._web.lists.getByTitle(this.Lst_PropsMapping).items
            .select("ID", "Title", "AzProperty", "SPProperty", "IsActive", "AutoSync")
            .filter(`IsActive eq 1`)
            .get();
    }
    /**
     * Generated the property mapping json content.
     */
    public getPropertyMappingsTemplate = async (propertyMappings: IPropertyMappings[]) => {
        if (!propertyMappings) propertyMappings = await this.getPropertyMappings();
        let finalJson: string = "";
        let propertyPair: any[] = [];
        let sampleUser1 = new Object();
        let sampleUser2 = new Object();
        sampleUser1['UserID'] = "user1@tenantname.onmicrosoft.com";
        sampleUser2['UserID'] = "user2@tenantname.onmicrosoft.com";
        propertyMappings.map((propsMap: IPropertyMappings) => {
            sampleUser1[propsMap.SPProperty] = "";
            sampleUser2[propsMap.SPProperty] = "";
        });
        propertyPair.push(sampleUser1, sampleUser2);
        finalJson = JSON.stringify(propertyPair);
        return JSON.parse(finalJson);
    }
    public getPropertyMappingsTemplate1 = async (propertyMappings: IPropertyMappings[]) => {
        if (!propertyMappings) propertyMappings = await this.getPropertyMappings();
        let finalJson: string = "";
        let propertyPair: IPropertyPair[] = [];
        propertyMappings.map((propsMap: IPropertyMappings) => {
            propertyPair.push({
                name: propsMap.SPProperty,
                value: ""
            });
        });
        finalJson = `{
            "targetAdminUrl": "${this.AdminSiteURL}",
            "targetSiteUrl": "${this.SiteURL}",
            "values": [
                {
                    "UserID": "userid@tenantname.onmicrosoft.com",
                    "Properties": ${JSON.stringify(propertyPair)}
                }
            ]
        }`;
        return JSON.parse(finalJson);
    }
    /**
     * Get the file content as blob based on the file url.
     */
    public getFileContent = async (filepath: string, contentType: FileContentType) => {
        switch (contentType) {
            case FileContentType.Blob:
                return await this._web.getFileByServerRelativeUrl(filepath).getBlob();
            case FileContentType.ArrayBuffer:
                return await this._web.getFileByServerRelativeUrl(filepath).getBuffer();
            case FileContentType.Text:
                return await this._web.getFileByServerRelativeUrl(filepath).getText();
            case FileContentType.JSON:
                return await this._web.getFileByServerRelativeUrl(filepath).getJSON();
        }
    }
    /**
     * Add the template file to a folder with contents.
     * This is used for creating the template json file.
     */
    public addFilesToFolder = async (fileContent: any, isCSV: boolean): Promise<IFileAddResult> => {
        let filename = (isCSV) ? this.SyncCSVFileName : this.SyncJSONFileName;
        await this.checkAndCreateFolder(this.SiteRelativeURL + this.SyncTemplateFilePath);
        return await this._web.getFolderByServerRelativeUrl(this.SiteRelativeURL + this.SyncTemplateFilePath)
            .files
            .add(decodeURI(this.SiteRelativeURL + this.SyncTemplateFilePath + filename), fileContent, true);
    }
    /**
     * Add the data file to a folder with contents.
     * This is used for creating the template json file.
     */
    public addDataFilesToFolder = async (fileContent: any, filename: string): Promise<IFileAddResult> => {
        await this.checkAndCreateFolder(this.SiteRelativeURL + this.SyncUploadFilePath);
        return await this._web.getFolderByServerRelativeUrl(this.SiteRelativeURL + this.SyncUploadFilePath)
            .files
            .add(decodeURI(this.SiteRelativeURL + this.SyncUploadFilePath + filename), fileContent, true);
    }
    /**
     * Check for the template folder, if not creates.
     */
    public checkAndCreateFolder = async (folderPath: string) => {
        try {
            await this._web.getFolderByServerRelativeUrl(folderPath).get();
        } catch (err) {
            await this._web.folders.add(folderPath);
        }
    }
    /**
     * Get current logged in user information.
     */
    public getCurrentUserInfo = async (): Promise<IUserInfo> => {
        let currentUserInfo = await this._web.currentUser.get();
        let currentUserGroups = await this._web.currentUser.groups.get();
        return ({
            ID: currentUserInfo.Id,
            Email: currentUserInfo.Email,
            LoginName: currentUserInfo.LoginName,
            DisplayName: currentUserInfo.Title,
            IsSiteAdmin: currentUserInfo.IsSiteAdmin,
            Groups: map(currentUserGroups, 'LoginName'),
            Picture: '/_layouts/15/userphoto.aspx?size=S&username=' + currentUserInfo.UserPrincipalName,
        });
    }
    /**
     * Check current user is a member of groups or not.
     */
    public checkCurrentUserGroup = (allowedGroups: string[], userGroups: string[]): boolean => {
        if (userGroups.length > 0) {
            let diff: string[] = intersection(allowedGroups, userGroups);
            if (diff && diff.length > 0) return true;
        }
        return false;
    }
    /**
     * Create a sync item
     */
    public createSyncItem = async (syncType: SyncType): Promise<number> => {
        let returnVal: number = 0;
        let itemAdded = await this._web.lists.getByTitle(this.Lst_SyncJobs).items.add({
            Title: `SyncJob_${moment().format("MMDDYYYYhhmm")}`,
            Status: JobStatus.Submitted.toString(),
            SyncType: syncType.toString()
        });
        returnVal = itemAdded.data.Id;
        return returnVal;
    }
    /**
     * Update Sync item with the input data to sync
     */
    public updateSyncItem = async (itemid: number, inputJson: string) => {
        await this._web.lists.getByTitle(this.Lst_SyncJobs).items.getById(itemid).update({
            SyncData: inputJson
        });
    }
    /**
     * Update Sync item with the error status
     */
    public updateSyncItemStatus = async (itemid: number, errMsg: string) => {
        await this._web.lists.getByTitle(this.Lst_SyncJobs).items.getById(itemid).update({
            Status: JobStatus.Error,
            ErrorMessage: errMsg
        });
    }
    /**
     * Get all the jobs items
     */
    public getAllJobs = async () => {
        return await this._web.lists.getByTitle(this.Lst_SyncJobs).items
            .select('ID', 'Title', 'SyncedData', 'Status', 'ErrorMessage', 'SyncType', 'Created', 'Author/Title', 'Author/Id', 'Author/EMail')
            .expand('Author')
            .getAll();
    }
    /**
     * Get all the templates generated
     */
    public getAllTemplates = async (): Promise<IFileInfo[]> => {
        return await this._web.getFolderByServerRelativeUrl(this.SiteRelativeURL + this.SyncTemplateFilePath)
            .files
            .select('Name', 'ServerRelativeUrl', 'TimeCreated')
            .expand('Author')
            .get();
    }
    /**
     * Get all the bulk sync files
     */
    public getAllBulkList = async (): Promise<IFileInfo[]> => {
        return await this._web.getFolderByServerRelativeUrl(this.SiteRelativeURL + this.SyncUploadFilePath)
            .files
            .select('Name', 'ServerRelativeUrl', 'TimeCreated')
            .expand('Author')
            .get();
    }
    /**
     * Check and create the required lists
     */
    public checkAndCreateLists = async (): Promise<boolean> => {
        return new Promise<boolean>(async (res, rej) => {
            try {
                await this._web.lists.getByTitle(this.Lst_PropsMapping).get();
                console.log('Property Mapping List Exists');
            } catch (err) {
                console.log("Property Mapping List doesn't exists, so creating");
                await this._createPropsMappingList();
                console.log("Property Mapping List created");
            }
            try {
                await this._web.lists.getByTitle(this.Lst_SyncJobs).get();
                console.log('Sync Jobs List Exists');
            } catch (err) {
                console.log("Sync Jobs List doesn't exists, so creating");
                await this._createSyncJobsList();
                console.log("Sync Jobs List created");
            }
            console.log("Checked all lists");
            res(true);
        });
    }
    /**
     * Create Sync Jobs list
     */
    public _createSyncJobsList = async () => {
        let listExists = await (await sp.web.lists.ensure(this.Lst_SyncJobs)).list;
        await listExists.fields.addMultilineText('SyncData', 6, false, false, false, false, { Required: true, Description: 'Data sent to Azure function for property update.' });
        await listExists.fields.addMultilineText('SyncedData', 6, false, false, false, false, { Required: true, Description: 'Data received from Azure function with property update status.' });
        await listExists.fields.addChoice('Status', ['Submitted', 'In-Progress', 'Completed', 'Error'], ChoiceFieldFormatType.Dropdown, false, { Required: true, Description: 'Status of the job.' });
        await listExists.fields.addMultilineText('ErrorMessage', 6, false, false, false, false, { Required: false, Description: 'Store the error message while calling Azure function.' });
        await listExists.fields.addChoice('SyncType', ['Manual', 'Azure', 'Template'], ChoiceFieldFormatType.Dropdown, false, { Required: true, Description: 'Type of data sent to Azure function.' });
        let allItemsView = await listExists.views.getByTitle('All Items');
        let batch = sp.createBatch();
        allItemsView.fields.inBatch(batch).add('ID');
        allItemsView.fields.inBatch(batch).add('SyncData');
        allItemsView.fields.inBatch(batch).add('SyncedData');
        allItemsView.fields.inBatch(batch).add('Status');
        allItemsView.fields.inBatch(batch).add('ErrorMessage');
        allItemsView.fields.inBatch(batch).add('SyncType');
        allItemsView.fields.inBatch(batch).move('ID', 0);
        await batch.execute();
    }
    /**
     * Create property mapping list
     */
    public _createPropsMappingList = async () => {
        let listExists = await (await sp.web.lists.ensure(this.Lst_PropsMapping)).list;
        await listExists.fields.addText('AzProperty', 255, { Required: true, Description: 'Azure user profile property name.' });
        await listExists.fields.addText('SPProperty', 255, { Required: true, Description: 'SharePoint User Profile property name.' });
        await listExists.fields.addBoolean('IsActive', { Required: true, Description: 'Active or InActive used for mapping by the end users.' });
        await listExists.fields.addBoolean('AutoSync', { Required: true, Description: 'Properties that are automatically synced with Azure.' });
        let allItemsView = await listExists.views.getByTitle('All Items');
        let batch = sp.createBatch();
        allItemsView.fields.inBatch(batch).add('AzProperty');
        allItemsView.fields.inBatch(batch).add('SPProperty');
        allItemsView.fields.inBatch(batch).add('IsActive');
        allItemsView.fields.inBatch(batch).add('AutoSync');
        await batch.execute();
        await this._createDefaultPropsMapping(listExists);
    }
    /**
     * Create default property mapping items
     */
    public _createDefaultPropsMapping = async (lst: IList) => {
        let batch = sp.createBatch();
        lst.items.inBatch(batch).add({ Title: 'Department', AzProperty: 'department', SPProperty: 'Department', IsActive: true, AutoSync: true });
        lst.items.inBatch(batch).add({ Title: 'Job Title', AzProperty: 'jobTitle', SPProperty: 'Title', IsActive: true, AutoSync: true });
        lst.items.inBatch(batch).add({ Title: 'Office', AzProperty: 'officeLocation', SPProperty: 'Office', IsActive: true, AutoSync: true });
        lst.items.inBatch(batch).add({ Title: 'Business Phone', AzProperty: 'businessPhones', SPProperty: 'workPhone', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'Mobile Phone', AzProperty: 'mobilePhone', SPProperty: 'CellPhone', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'Fax Number', AzProperty: 'faxNumber', SPProperty: 'Fax', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'Street Address', AzProperty: 'streetAddress', SPProperty: 'StreetAddress', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'City', AzProperty: 'city', SPProperty: 'City', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'State or Province', AzProperty: 'state', SPProperty: 'State', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'Zip or Postal code', AzProperty: 'postalCode', SPProperty: 'PostalCode', IsActive: true, AutoSync: false });
        lst.items.inBatch(batch).add({ Title: 'Country or Region', AzProperty: 'country', SPProperty: 'Country', IsActive: true, AutoSync: false });
        await batch.execute();
    }
    /**
     * Azure function to update the UPS properties.
     */
    public runAzFunction = async (httpClient: HttpClient, inputData: any, azFuncUrl: string, itemid: number) => {
        const requestHeaders: Headers = new Headers();
        requestHeaders.append("Content-type", "application/json");
        requestHeaders.append("Cache-Control", "no-cache");
        const postOptions: IHttpClientOptions = {
            headers: requestHeaders,
            body: `${inputData}`
        };
        let response: HttpClientResponse = await httpClient.post(azFuncUrl, HttpClient.configurations.v1, postOptions);
        if (!response.ok) {
            await this.updateSyncItemStatus(itemid, `${response.status} - ${response.statusText}`);
        }
        console.log("Azure Function executed");
    }

}
