import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { MSGraphClient } from '@microsoft/sp-http';
import "@pnp/graph/users";
import "@pnp/graph/photos";
import "@pnp/graph/groups";
import { sp } from '@pnp/sp';
import "@pnp/sp/profiles";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { Web, IWeb } from "@pnp/sp/webs";
import { ISiteUserInfo, ISiteUser } from "@pnp/sp/site-users/types";
import { PnPClientStorage, dateAdd } from '@pnp/common';
import { IUserInfo, IUserPickerInfo, SyncType, JobStatus, IAzFuncValues } from './IModel';
import * as moment from 'moment';
import ImageResize from 'image-resize';

import "@pnp/sp/search";
import { SearchQueryBuilder, SearchResults, ISearchQuery } from "@pnp/sp/search";
import { ChoiceFieldFormatType } from '@pnp/sp/fields/types';

const storage = new PnPClientStorage();
const imgResize_48 = new ImageResize({ format: 'png', width: 48, height: 48, output: 'base64' });
const imgResize_96 = new ImageResize({ format: 'png', width: 96, height: 96, output: 'base64' });
const imgResize_240 = new ImageResize({ format: 'png', width: 240, height: 240, output: 'base64' });

const map: any = require('lodash/map');
const intersection: any = require('lodash/intersection');
const orderBy: any = require('lodash/orderBy');
const chunk: any = require('lodash/chunk');
const flattenDeep: any = require('lodash/flattenDeep');

const batchItemLimit: number = 18;
const userBatchLimit: number = 6;

const userDefStorageKey: string = 'userDefaultInfo';
const userCusStorageKey: string = 'userCustomInfo';

export interface IHelper {
    getLibraryDetails: (listid: string) => Promise<any>;
    dataURItoBlob: (dataURI: any) => Blob;
    getCurrentUserDefaultInfo: () => Promise<ISiteUserInfo>;
    getCurrentUserCustomInfo: () => Promise<IUserInfo>;
    checkCurrentUserGroup: (allowedGroups: string[], userGroups: string[]) => boolean;
    getUsersInfo: (UserIds: string[]) => Promise<any[]>;
    getUserPhotoFromAADForDisplay: (users: IUserPickerInfo[]) => Promise<any[]>;
    getAndStoreUserThumbnailPhotos: (users: IUserPickerInfo[], tempLibId: string) => Promise<IAzFuncValues[]>;
    generateAndStorePhotoThumbnails: (fileInfo: any[], tempLibId: string) => Promise<IAzFuncValues[]>;
    createSyncItem: (syncType: SyncType) => Promise<number>;
    updateSyncItem: (itemid: number, inputJson: string) => void;
    getAllJobs: () => Promise<any[]>;
    runAzFunction: (httpClient: HttpClient, inputData: any, azFuncUrl: string, itemid: number) => void;
    checkAndCreateLists: () => Promise<boolean>;
}

export default class Helper implements IHelper {
    private _web: IWeb = null;
    private _graphClient: MSGraphClient = null;
    private _graphUrl: string = "https://graph.microsoft.com/v1.0";
    private web_ServerRelativeURL: string = '';
    private TPhotoFolderName: string = 'UserPhotos';
    private Lst_SyncJobs = 'UPS Photo Sync Jobs';

    constructor(webRelativeUrl: string, weburl?: string, graphClient?: MSGraphClient) {
        this._graphClient = graphClient ? graphClient : null;
        this._web = weburl ? Web(weburl) : sp.web;
        this.web_ServerRelativeURL = webRelativeUrl;
    }
    /**
     * Get temp library details
     * @param listid Temporary library
     */
    public getLibraryDetails = async (listid: string): Promise<string> => {
        let retFolderPath: string = '';
        let listDetails = await this._web.lists.getById(listid).get();
        retFolderPath = listDetails.DocumentTemplateUrl.replace('/Forms/template.dotx', '') + '/' + this.TPhotoFolderName;
        return retFolderPath;
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
     * Convert base64 image to blob.
     */
    public dataURItoBlob = (dataURI): Blob => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
    /**
     * Get current logged in user default info.
     */
    public getCurrentUserDefaultInfo = async (): Promise<ISiteUserInfo> => {
        //return await this._web.currentUser.get();
        let currentUserInfo: ISiteUserInfo = storage.local.get(userDefStorageKey);
        if (!currentUserInfo) {
            currentUserInfo = await this._web.currentUser.get();
            storage.local.put(userDefStorageKey, currentUserInfo, dateAdd(new Date(), 'hour', 1));
        }
        return currentUserInfo;
    }
    /**
     * Get current logged in user custom information.
     */
    public getCurrentUserCustomInfo = async (): Promise<IUserInfo> => {
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
     * Get user profile photos from Azure AD
     */
    public getUserPhotoFromAADForDisplay = async (users: IUserPickerInfo[]): Promise<any[]> => {
        return new Promise(async (res, rej) => {
            if (users && users.length > 0) {
                let requests: any[] = [];
                let finalResponse: any[] = [];
                if (users.length > batchItemLimit) {
                    let chunkUserArr: any[] = chunk(users, batchItemLimit);
                    Promise.all(chunkUserArr.map(async chnkdata => {
                        requests = [];
                        chnkdata.map((user: IUserPickerInfo) => {
                            let upn: string = user.LoginName.split('|')[2];
                            requests.push({
                                id: `${user.LoginName}`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${upn}/photos/$value`
                            });
                        });
                        let photoReq: any = { requests: requests };
                        let graphRes: any = await this._graphClient.api('$batch').post(photoReq);
                        finalResponse.push(graphRes);
                    })).then(() => {
                        res(finalResponse);
                    });
                } else {
                    users.map((user: IUserPickerInfo) => {
                        let upn: string = user.LoginName.split('|')[2];
                        requests.push({
                            id: `${user.LoginName}`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${upn}/photo/$value`
                        });
                    });
                    let photoReq: any = { requests: requests };
                    finalResponse.push(await this._graphClient.api('$batch').post(photoReq));
                    res(finalResponse);
                }
            }
        });
    }
    /**
     * Get user info based on UserID
     */
    public getUsersInfo = async (userids: string[]): Promise<any[]> => {
        return new Promise(async (res, rej) => {
            let finalResponse: any[] = [];
            let batch = sp.createBatch();
            if (userids.length > batchItemLimit) {
                let chunkUserArr: any[] = chunk(userids, batchItemLimit);
                Promise.all(chunkUserArr.map(async chnkdata => {
                    batch = sp.createBatch();
                    finalResponse.push(await this.executeBatch(chnkdata, batch));
                })).then(() => {
                    res(flattenDeep(finalResponse));
                });
            } else {
                batch = sp.createBatch();
                finalResponse.push(await this.executeBatch(userids, batch));
                res(flattenDeep(finalResponse));
            }
        });
    }
    private executeBatch = (chnkdata, batch): Promise<any[]> => {
        return new Promise((res, rej) => {
            let finalResponse: any[] = [];
            batch = sp.createBatch();
            chnkdata.map((userid: string) => {
                sp.web.siteUsers.getByLoginName(`i:0#.f|membership|${userid}`).inBatch(batch).get().then((userinfo) => {
                    if (userinfo && userinfo.Title) {
                        finalResponse.push({
                            'loginname': userid,
                            'title': userinfo.Title,
                            'status': 'Valid'
                        });
                    }
                }).catch((e) => {
                    finalResponse.push({
                        'loginname': userid,
                        'title': 'User not found!',
                        'status': 'Invalid'
                    });
                });
            });
            batch.execute().then(() => {
                res(finalResponse);
            }).catch(() => {
                res(finalResponse);
            });
        });
    }
    /**
     * Get thumbnail photos for the users.
     * @param users List of users
     */
    public getAndStoreUserThumbnailPhotos = async (users: IUserPickerInfo[], tempLibId: string): Promise<IAzFuncValues[]> => {
        let retVals: IAzFuncValues[] = [];
        return new Promise(async (res, rej) => {
            let tempLibUrl: string = await this.getLibraryDetails(tempLibId);
            await this.checkAndCreateFolder(tempLibUrl);
            if (users && users.length > 0) {
                let requests: any[] = [];
                let finalResponse: any[] = [];
                if (users.length > userBatchLimit) {
                    let chunkUserArr: any[] = chunk(users, userBatchLimit);
                    Promise.all(chunkUserArr.map(async chnkdata => {
                        requests = [];
                        chnkdata.map((user: IUserPickerInfo) => {
                            let upn: string = user.LoginName.split('|')[2];
                            requests.push({
                                id: `${user.LoginName}_1`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${upn}/photos/48x48/$value`
                            }, {
                                id: `${user.LoginName}_2`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${upn}/photos/96x96/$value`
                            }, {
                                id: `${user.LoginName}_3`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${upn}/photos/240x240/$value`
                            });
                        });
                        let photoReq: any = { requests: requests };
                        let graphRes: any = await this._graphClient.api('$batch').post(photoReq);
                        finalResponse.push(graphRes);
                    })).then(async () => {
                        retVals = await this.saveThumbnailPhotosInDocLib(finalResponse, tempLibUrl, "Manual");
                    });
                } else {
                    users.map((user: IUserPickerInfo) => {
                        let upn: string = user.LoginName.split('|')[2];
                        requests.push({
                            id: `${user.LoginName}_1`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${upn}/photos/48x48/$value`
                        }, {
                            id: `${user.LoginName}_2`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${upn}/photos/96x96/$value`
                        }, {
                            id: `${user.LoginName}_3`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${upn}/photos/240x240/$value`
                        });
                    });
                    let photoReq: any = { requests: requests };
                    finalResponse.push(await this._graphClient.api('$batch').post(photoReq));
                    retVals = await this.saveThumbnailPhotosInDocLib(finalResponse, tempLibUrl, "Manual");
                }
            }
            res(retVals);
        });
    }
    /**
     * Add thumbnails to the configured document library
     */
    private saveThumbnailPhotosInDocLib = async (thumbnails: any[], tempLibName: string, scope: 'Manual' | 'Bulk'): Promise<IAzFuncValues[]> => {
        let retVals: IAzFuncValues[] = [];
        if (thumbnails && thumbnails.length > 0) {
            if (scope === "Manual") {
                thumbnails.map(res => {
                    if (res.responses && res.responses.length > 0) {
                        res.responses.map(async thumbnail => {
                            if (!thumbnail.body.error) {
                                let username: string = thumbnail.id.split('_')[0].split('|')[2];
                                let userFilename: string = username.replace(/[@.]/g, '_');
                                let filecontent = this.dataURItoBlob("data:image/jpg;base64," + thumbnail.body);
                                let partFileName = '';
                                retVals.push({
                                    userid: username,
                                    picturename: userFilename
                                });
                                if (thumbnail.id.indexOf('_1') > 0) partFileName = 'SThumb.jpg';
                                else if (thumbnail.id.indexOf('_2') > 0) partFileName = "MThumb.jpg";
                                else if (thumbnail.id.indexOf('_3') > 0) partFileName = "LThumb.jpg";
                                await sp.web.getFolderByServerRelativeUrl(decodeURI(`${tempLibName}/`))
                                    .files
                                    .add(decodeURI(`${tempLibName}/${userFilename}_` + partFileName), filecontent, true);
                            }
                        });
                    }
                });
                return retVals;
            }
            if (scope === "Bulk") {
                return new Promise((res, rej) => {
                    let batch = sp.createBatch();
                    thumbnails.map(async thumbnail => {
                        let username: string = thumbnail.name.replace('.' + thumbnail.name.split('.').pop(), '');
                        let userFilename: string = username.replace(/[@.]/g, '_');
                        retVals.push({
                            userid: username,
                            picturename: userFilename
                        });
                        let filecontent_48 = this.dataURItoBlob(thumbnail.Thumb48);
                        sp.web.getFolderByServerRelativeUrl(decodeURI(`${tempLibName}/`))
                            .files.inBatch(batch)
                            .add(decodeURI(`${tempLibName}/${userFilename}_` + 'SThumb.jpg'), filecontent_48, true);
                        let filecontent_96 = this.dataURItoBlob(thumbnail.Thumb96);
                        sp.web.getFolderByServerRelativeUrl(decodeURI(`${tempLibName}/`))
                            .files.inBatch(batch)
                            .add(decodeURI(`${tempLibName}/${userFilename}_` + 'MThumb.jpg'), filecontent_96, true);
                        let filecontent_240 = this.dataURItoBlob(thumbnail.Thumb240);
                        sp.web.getFolderByServerRelativeUrl(decodeURI(`${tempLibName}/`))
                            .files.inBatch(batch)
                            .add(decodeURI(`${tempLibName}/${userFilename}_` + 'LThumb.jpg'), filecontent_240, true);
                    });
                    batch.execute().then(() => { res(retVals); });
                });
            }
        }
    }
    /**
     * Generate 3 different thumbnails and upload to the temp library.
     */
    public generateAndStorePhotoThumbnails = async (fileInfo: any[], tempLibId: string): Promise<IAzFuncValues[]> => {
        return new Promise(async (res, rej) => {
            if (fileInfo && fileInfo.length > 0) {
                let tempLibUrl: string = await this.getLibraryDetails(tempLibId);
                Promise.all(fileInfo.map(async file => {
                    file['Thumb48'] = await imgResize_48.play(URL.createObjectURL(file));
                    file['Thumb96'] = await imgResize_96.play(URL.createObjectURL(file));
                    file['Thumb240'] = await imgResize_240.play(URL.createObjectURL(file));
                })).then(async () => {
                    let users: any = await this.saveThumbnailPhotosInDocLib(fileInfo, tempLibUrl, "Bulk");
                    res(users);
                }).catch(err => {
                    console.log("Error while generating thumbnails: ", err);
                    res([]);
                });
            }
        });
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
    public getAllJobs = async (): Promise<any[]> => {
        return await this._web.lists.getByTitle(this.Lst_SyncJobs).items
            .select('ID', 'Title', 'SyncedData', 'Status', 'ErrorMessage', 'SyncType', 'Created', 'Author/Title', 'Author/Id', 'Author/EMail')
            .expand('Author')
            .getAll();
    }
    /**
     * Azure function to update the UPS Photo properties.
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
    /**
     * Check and create the required lists
     */
    public checkAndCreateLists = async (): Promise<boolean> => {
        return new Promise<boolean>(async (res, rej) => {
            try {
                await this._web.lists.getByTitle(this.Lst_SyncJobs).get();
                console.log('Sync Jobs List Exists');
            } catch (err) {
                console.log("Sync Jobs List doesn't exists, so creating...");
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
        await listExists.fields.addChoice('SyncType', ['Manual', 'Bulk'], ChoiceFieldFormatType.Dropdown, false, { Required: true, Description: 'Type of data sent to Azure function.' });
        await listExists.fields.addMultilineText('ErrorMessage', 6, false, false, false, false, { Required: false, Description: 'Store the error message while calling Azure function.' });
        let allItemsView = await listExists.views.getByTitle('All Items');
        let batch = sp.createBatch();
        allItemsView.fields.inBatch(batch).add('ID');
        allItemsView.fields.inBatch(batch).add('SyncType');
        allItemsView.fields.inBatch(batch).add('SyncData');
        allItemsView.fields.inBatch(batch).add('SyncedData');
        allItemsView.fields.inBatch(batch).add('Status');
        allItemsView.fields.inBatch(batch).add('ErrorMessage');
        allItemsView.fields.inBatch(batch).move('ID', 0);
        await batch.execute();
    }
}