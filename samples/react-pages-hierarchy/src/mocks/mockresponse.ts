/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IItemUpdateResult } from '@pnp/sp/presets/all';
import { IContextInfo } from '@pnp/sp/context-info';
import { IFetchOptions } from '@pnp/common';
import { FilterParser } from './filterParser';
import { MockListFactory } from './mocklistfactory';
import { parse } from 'url';
// import * as FileSaver from 'file-saver';
import { LogHelper, ListTitles } from '@src/utilities';

export class MockResponse {

    private listTitle: string;
    private currentUser;

    constructor(private mockListFactory: MockListFactory) { }

    public async fetch(url: string, options: IFetchOptions): Promise<Response> {
        let response;

        this.listTitle = this.getListTitleFromUrl(url);
        this.currentUser = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION)[0];

        if (options.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('_api/web/currentuser') !== -1) {
            response = this.getCurrentUser(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers(@v)?') !== -1) {
            response = this.getSiteUser(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers/getbyid') !== -1) {
            response = this.getSiteUserById(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers/getbyemail') !== -1) {
            response = this.getSiteUserByEmail(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && this.endsWith(url, '/_api/web')) {
            response = this.getWeb(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && this.endsWith(url, '/attachmentfiles')) {
            response = this.getAttachments(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/getfilebyserverrelativeurl') !== -1) {
            response = await this.getFileByServerRelativeUrl(url);
        }
        else if (options?.method?.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/items') === -1) {
            response = this.getListProperties(url);
        }
        else if (options?.method?.toUpperCase() === 'GET') {
            response = this.getListItems(url);
        }
        else if (options?.method?.toUpperCase() === 'POST' && this.endsWith(url, '_api/contextinfo')) {
            response = this.getContextInfo();
        }
        else if (options?.method?.toUpperCase() === 'POST' && this.endsWith(url, '_api/$batch')) {
            response = await this.processBatch(url, options);
        }
        else if (options?.method?.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.utilities.utility.searchprincipalsusingcontextweb')) {
            response = this.searchPrincipals(url, options);
        }
        else if (options?.method?.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.ui.applicationpages.clientpeoplepickerwebserviceinterface.clientpeoplepickersearchuser')) {
            response = this.clientPeoplePickerSearchUser(url, options);
        }
        else if (options?.method?.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.utilities.utility.sendemail')) {
            response = this.sendEmail(url, options);
        }
        else if (options?.method?.toUpperCase() === 'POST' && this.endsWith(url, '_api/web/ensureuser')) {
            response = this.ensureUser(url, options);
        }
        else if (options?.method?.toUpperCase() === 'POST' && url.toLowerCase().indexOf('/attachmentfiles') !== -1) {
            // add, updates and deletes
            response = this.saveAttachmentChanges(url, options);
        }
        else if (options?.method?.toUpperCase() === 'POST' && url.toLowerCase().indexOf('_api/web/sitegroups/') !== -1) {
            response = new Response('', { status: 200 });
        }
        else if (options?.method?.toUpperCase() === 'POST' && this.endsWith(url, '/getitems')) {
            response = this.getListItemsCamlQuery(url, options);
        }
        else if (options?.method?.toUpperCase() === 'POST' && url.toLowerCase().indexOf('/files/add') !== -1) {
            // add, updates and deletes
            response = this.saveFile(url, options);
        }
        else {
            // add, updates and deletes
            response = this.saveListItemChanges(url, options);
        }

        return new Promise<Response>((resolve) => {
            setTimeout(() => resolve(response), 200);
        });
    }

    private endsWith(url: string, search: string): boolean {
        return url.substring(url.length - search.length, url.length) === search;
    }

    private getListItems(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getListItems', urlString);

        const url = parse(urlString, true, true);
        let body: string | undefined;
        let totalItemsCount: number = 0;

        // try to get the data from local storage and then from mock data
        let items = this.mockListFactory.getListItems(this.listTitle);

        // apply select, filter, top, etc...
        items = this.applyFilter(items, url.query.$filter);
        items = this.applySelect(items, url.query.$select);
        items = this.applyOrderBy(items, url.query.$orderby);
        items = this.applySkip(items, url.query.$skip);

        totalItemsCount = items.length;
        items = this.applyTop(items, url.query.$top);

        if (url.pathname.endsWith('/items')) {
            body = JSON.stringify(items);

            // revisit to figure out how the source is telling us to page
            if (items.length < totalItemsCount) {
                const skipParts = urlString.split('&$skip=');
                let nextUrl = '';
                if (skipParts.length === 1) {
                    nextUrl = `${urlString}"&$skip=${items.length}`;
                }
                else if (skipParts.length === 2) {
                    nextUrl = `${urlString}"&$skip=${+skipParts[1] + items.length}`;
                }

                const result = {
                    'd': {
                        'results': items,
                        '__next': nextUrl
                    }

                };
                body = JSON.stringify(result);
            }
        }
        else if (url.pathname.endsWith(')')) {
            const index = url.pathname.lastIndexOf('(');
            const id = url.pathname.slice(index + 1, url.pathname.length - 1);

            const item = items.filter(i => i.ID === +id)[0];
            body = JSON.stringify(item);
        }
        else {
            // not sure what might hit here yet
        }

        return new Response(body, { status: 200 });
    }

    private getListProperties(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getListProperties', urlString);

        const body = {
            'RootFolder': {
                'ServerRelativeUrl': `/${this.listTitle}`
            },
            'ParentWeb': {
                'Url': `${window.location.origin}/`
            },
            'ParentWebUrl': '/',
            'Title': this.listTitle
        };

        return new Response(JSON.stringify(body), { status: 200 });
    }

    private getListItemsCamlQuery(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'getListItemsCamlQuery', urlString);

        const url = parse(urlString, true, true);
        let body: string | undefined;

        // try to get the data from local storage and then from mock data
        let items = this.mockListFactory.getListItems(this.listTitle);

        // tslint:disable-next-line:max-line-length
        // {"query":{"__metadata":{"type":"SP.CamlQuery"},"ViewXml":"<View><ViewFields><FieldRef Name='Group1'/><FieldRef Name='ProductGroup'/>...</ViewFields><Query><Where><Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq></Where></Query><RowLimit>1000</RowLimit></View>"}}
        const camlQuery = JSON.parse(options.body);

        const viewXml: string = camlQuery.query.ViewXml;
        const viewFieldsStart = viewXml.indexOf('<ViewFields>') + 12;
        const viewFieldsEnd = viewXml.indexOf('</ViewFields>');
        const queryStart = viewXml.indexOf('<Query>') + 7;
        const queryEnd = viewXml.indexOf('</Query>');
        const rowLimitStart = viewXml.indexOf('<RowLimit>') + 10;
        const rowLimitEnd = viewXml.indexOf('</RowLimit>');

        const viewFields = viewXml.substring(viewFieldsStart, viewFieldsEnd);
        const query = viewXml.substring(queryStart, queryEnd);  // <Where><Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq></Where>
        const rowLimit = viewXml.substring(rowLimitStart, rowLimitEnd);

        const select = viewFields.split(`<FieldRef Name='`).join('').split(`'/>`).join(',');

        // WARNING - currently this assumes only one clause with an Eq
        const whereStart = query.indexOf('<Where>') + 7;
        const whereEnd = query.indexOf('</Where>');
        let where = query.substring(whereStart, whereEnd); // <Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq>
        const compare = where.startsWith('<Eq>') ? 'eq' : null; // add other checks for future compares
        where = where.split('<Eq>').join('').split('</Eq>').join(''); // <FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value>
        const filter = where.split(`<FieldRef Name='`).join('').split(`'/>`).join(` ${compare} `)
            .split(`<Value Type='Choice'>`).join(`'`).split('</Value>').join(`'`);

        items = this.applyFilter(items, filter);
        items = this.applySelect(items, select);
        items = this.applyTop(items, rowLimit);

        if (url.pathname.endsWith('/getitems')) {
            body = JSON.stringify(items);
        }
        else if (url.pathname.endsWith(')')) {
            const index = url.pathname.lastIndexOf('(');
            const id = url.pathname.slice(index + 1, url.pathname.length - 1);

            const item = items.filter(i => i.ID === +id)[0];
            body = JSON.stringify(item);
        }
        else {
            // not sure what might hit here yet
        }

        return new Response(body, { status: 200 });
    }

    private getAttachments(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getAttachments', urlString);

        const url = parse(urlString, true, true);
        let body: string;

        // try to get the data from local storage and then from mock data
        const items = this.mockListFactory.getListItems(this.listTitle);

        // _api/web/lists/getByTitle([list name])/items([id])/AttachmentFiles
        const index = url.pathname.lastIndexOf('(');
        const id = url.pathname.slice(index + 1, url.pathname.length - 17);

        const item = items.filter(i => i.ID === +id)[0];

        if (item.AttachmentFiles !== undefined) {
            body = JSON.stringify(item.AttachmentFiles);
        }
        else {
            body = JSON.stringify([]);
        }

        return new Response(body, { status: 200 });
    }

    private getFileByServerRelativeUrl(urlString: string): Promise<Response> {
        LogHelper.verbose(this.constructor.name, 'getFileByServerRelativeUrl', urlString);

        return new Promise((resolve) => {
            let response;

            const startIndex = urlString.lastIndexOf(`(`) + 2;
            const endIndex = urlString.lastIndexOf(`)`) - 1;

            const filePath = urlString.substring(startIndex, endIndex);
            /* TODO Revisit
            if (filePath.indexOf(ApplicationValues.Path) !== -1) {
                filePath = filePath.split(ApplicationValues.Path)[1];
            }

            */

            if (this.endsWith(urlString, '$value')) {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.responseType = 'arraybuffer';
                // tslint:disable-next-line:no-function-expression
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
                        response = new Response(xmlhttp.response, { status: 200 });
                        resolve(response);
                    }
                };
                xmlhttp.open('GET', filePath, true);
                xmlhttp.send();
            }
            else {
                // TO DO if we need file properties
            }
        });
    }

    private getWeb(urlString: string): Response {
        // only have a method for this stuff in case we need to do more mock stuff in the future
        const url = parse(urlString, true, true);
        const body = {
            'Url': `${url.protocol}//${url.host}/`,
            'ServerRelativeUrl': ''
        };
        return new Response(JSON.stringify(body), { status: 200 });
    }

    private getCurrentUser(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getCurrentUser', urlString);

        // only have a method for this stuff in case we need to do more mock stuff in the future
        return new Response(JSON.stringify(this.currentUser), { status: 200 });
    }

    private getSiteUser(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getSiteUser', urlString);

        const url = parse(urlString, true, true);
        const search = decodeURIComponent(url.search);
        const loginName = search.substring(5, search.length - 1);

        const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        const user = users.filter(i => {
            return (i.LoginName && i.LoginName.toLowerCase().indexOf(loginName.toLowerCase()) !== -1);
        })[0];

        return new Response(JSON.stringify(user), { status: 200 });
    }

    // _api/web/siteusers/getById(1)
    private getSiteUserById(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getSiteUserById', urlString);

        const url = parse(urlString, true, true);
        const index = url.pathname.lastIndexOf('(');
        const id = url.pathname.slice(index + 1, url.pathname.length - 1);

        const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        const user = users.filter(i => {
            return (i.ID === +id);
        })[0];

        return new Response(JSON.stringify(user), { status: 200 });
    }

    // _api/web/siteusers/getByEmail('administrator@demo.com')
    private getSiteUserByEmail(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getSiteUserByEmail', urlString);

        const url = parse(urlString, true, true);
        const pathName = decodeURIComponent(url.pathname); // get rid of encoded characters
        const index = pathName.lastIndexOf(`('`);
        const email = pathName.slice(index + 2, pathName.length - 2);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let user: any;
        if (email.length > 0) {
            const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
            // To better work with SharePoint and mock data...
            // User Profile uses "Email"
            // User Information uses "EMail"
            user = users.filter(i => {
                return (
                    i.Email ? i.Email.toLocaleLowerCase() === email.toLocaleLowerCase() : (i.EMail ? i.EMail.toLocaleLowerCase() === email.toLocaleLowerCase() : false)
                );
            })[0];
        }
        return new Response(JSON.stringify(user), { status: 200 });
    }

    private saveListItemChanges(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'saveListItemChanges', urlString);

        const url = parse(urlString, true, true);
        let body: string | undefined;

        let items = this.mockListFactory.getListItems(this.listTitle);

        if (url.pathname.endsWith('/items')) {
            // add a new item
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item: any = {};

            const storageKey = this.listTitle + '_ItemCount';
            let maxId: number = 0;
            if (localStorage.getItem(storageKey) !== null) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                maxId = +localStorage.getItem(storageKey)!;
                if (Number.isNaN(maxId) || maxId === 0) {
                    if (items.length > 0) {
                        // eslint-disable-next-line prefer-spread
                        maxId = Math.max.apply(Math, items.map(i => i.ID));
                    }
                    else {
                        maxId = 0;
                    }
                }
                maxId = maxId + 1;

                item.ID = maxId;
            }

            const requestBody = JSON.parse(options.body);
            Object.keys(requestBody).map(
                // eslint-disable-next-line no-return-assign
                (e) => item[e] = requestBody[e]
            );

            // Common to all SharePoint List Items
            const now = new Date();
            item.Created = now;
            item.Modified = now;
            item.AuthorId = this.currentUser.ID;
            item.EditorId = this.currentUser.ID;

            items.push(item);
            item.Id = item.ID;

            body = JSON.stringify(item);
            localStorage.setItem(storageKey, JSON.stringify(maxId));
        }
        else if (url.pathname.endsWith(')')) {
            // update
            const index = url.pathname.lastIndexOf('(');
            const id = url.pathname.slice(index + 1, url.pathname.length - 1);

            const item = items.filter(i => i.ID === +id)[0];

            if (options.body !== undefined) {
                // update an item
                const requestBody = JSON.parse(options.body);
                Object.keys(requestBody).map(
                    // eslint-disable-next-line no-return-assign
                    (e) => item[e] = requestBody[e]
                );

                // Common to all SharePoint List Items
                const now = new Date();
                item.Modified = now;
                item.EditorId = this.currentUser.ID;

                const result: IItemUpdateResult = {
                    item: item,
                    data: { 'etag': '' }
                };

                body = JSON.stringify(result);
            }
            else {
                // delete an item
                items = items.filter(i => i.ID !== +id);
            }
        }
        else {
            // not sure what might hit here yet
        }

        this.mockListFactory.saveListItems(this.listTitle, items);

        return new Response(body, { status: 200 });
    }

    private saveAttachmentChanges(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'saveAttachmentChanges', urlString);

        const url = parse(urlString, true, true);
        let body: string | undefined;
        const items = this.mockListFactory.getListItems(this.listTitle);
        // '/reqdocs/BR/4/attachments/_api/web/lists/getByTitle(%27Requirement%20Documents%27)/items(4)/AttachmentFiles/add(FileName=%27AA%20Template.docx%27)'

        const decodedPath = decodeURI(url.pathname);
        const index = decodedPath.lastIndexOf('(');
        const fileName = decodedPath.slice(index + 2, decodedPath.length - 2);
        const startIndex = decodedPath.lastIndexOf('/items(');
        const endIndex = decodedPath.lastIndexOf(')/AttachmentFiles');
        const id = decodedPath.slice(startIndex + 7, endIndex);

        const item = items.filter(i => i.ID === +id)[0];
        if (item.AttachmentFiles === undefined) {
            item.AttachmentFiles = [];
        }

        if (options.body !== undefined) {
            // add an attachment
            /*
            item.AttachmentFiles.push({
                FileName: options.body.name,
                ServerRelativeUrl: options.body.name,
                file: options.body
            });
            */

            const fileReader = new FileReader();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fileReader.onload = (evt: any) => {
                this.fileLoaded(evt, items, item, options);
            };

            fileReader.readAsDataURL(options.body);

        }
        else {
            // delete an attachment
            item.AttachmentFiles = item.AttachmentFiles.filter(a => a.FileName.toLowerCase() !== fileName.toLowerCase());
        }

        this.mockListFactory.saveListItems(this.listTitle, items);

        return new Response(body, { status: 200 });
    }


    private saveFile(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'saveFile', urlString);

        const url = parse(urlString, true, true);
        // /files/add(overwrite=true,url='Authorized%20Retail%20Pricing%20(effective%2004.27.18).xlsx')

        const decodedPath = decodeURI(url.pathname);
        const index = decodedPath.lastIndexOf('url=');
        const fileName = decodedPath.slice(index + 5, decodedPath.length - 2);

        //        FileSaver.saveAs(options.body, fileName);

        const result = {
            file: options.body,
            ServerRelativeUrl: fileName
        };

        const body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private fileLoaded(evt: any, items: any, item: any, options: any): void {
        const data = evt.target.result;
        item.AttachmentFiles.push({
            FileName: options.body.name,
            ServerRelativeUrl: data
        });

        this.mockListFactory.saveListItems(this.listTitle, items);
    }

    private searchPrincipals(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'searchPrincipals', urlString);

        const searchOptions = JSON.parse(options.body);

        const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        const items = users.filter(i => {
            return ((i.DisplayName && i.DisplayName.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1) ||
                (i.LoginName && i.LoginName.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1) ||
                (i.Email && i.Email.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1)
            );
        });

        const result = {
            'SearchPrincipalsUsingContextWeb': {
                'results': items
            }
        };

        const body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }

    private clientPeoplePickerSearchUser(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'clientpeoplepickersearchuser', urlString);

        const postBody = JSON.parse(options.body);
        const query = postBody.queryParams.QueryString.toLowerCase();

        const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        const items = users.filter(i => {
            return ((i.DisplayName && i.DisplayName.toLowerCase().indexOf(query) !== -1) ||
                (i.LoginName && i.LoginName.toLowerCase().indexOf(query) !== -1) ||
                (i.Email && i.Email.toLowerCase().indexOf(query) !== -1)
            );
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const results: any[] = [];
        for (const item of items) {
            results.push({
                Key: item.Key,
                Description: item.Title,
                DisplayText: item.DisplayName,
                EntityType: 'User',
                IsResolved: true,
                MultipleMatches: [],
                ProviderDisplayName: 'User Information List',
                ProviderName: 'UserInformationList',
                EntityData: {
                    AccountName: item.Email,
                    Department: '',
                    Title: item.JobTitle,
                    Email: item.Email,
                    MobilePhone: item.Mobile
                }
            });
        }

        const result = {
            d: {
                ClientPeoplePickerSearchUser: JSON.stringify(results)
            }
        };

        const body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }

    private sendEmail(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'sendEmail', urlString);

        /*
        let emailOptions = JSON.parse(options.body);

        let to = '';
        if (emailOptions.properties.To !== undefined && emailOptions.properties.To !== null && emailOptions.properties.To.results.length > 0) {
            for (let address of emailOptions.properties.To.results) {
                if (address !== null && address.length > 0) {
                    to += `${address};`;
                }
            }
        }

        let cc = '';
        if (emailOptions.properties.CC !== undefined && emailOptions.properties.CC !== null && emailOptions.properties.CC.results.length > 0) {
            for (let address of emailOptions.properties.CC.results) {
                if (address !== null && address.length > 0) {
                    cc += `${address};`;
                }
            }
        }

        let email = `To: ${to}\nCc: ${cc}\nSubject: ${emailOptions.properties.Subject}\nX-Unsent: 1\nContent-Type: text/html\n\n<html><body>${emailOptions.properties.Body}</body></html>`;

        let data = new Blob([email], { type: 'text/plain' });
        FileSaver.saveAs(data, emailOptions.properties.Subject + '.eml');
        */

        const body = JSON.stringify('');

        return new Response(body, { status: 200 });
    }

    private ensureUser(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'ensureUser', urlString);

        const url = parse(urlString, true, true);
        const ensureOptions = JSON.parse(options.body);

        const users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        const user = users.filter(i => {
            return (i.LoginName && i.LoginName.toLowerCase().indexOf(ensureOptions.logonName.toLowerCase()) !== -1);
        })[0];

        user['__metadata'] = { id: `${url.protocol}${url.host}/_api/Web/GetUserById(${user.ID})` };
        user.Id = user.ID;  // because... SharePoint

        const result = {
            'd': user
        };

        const body = JSON.stringify(result);
        return new Response(body, { status: 200 });
    }

    private getContextInfo(): Response {
        const contexInfo: Partial<IContextInfo> = {
            FormDigestTimeoutSeconds: 100,
            FormDigestValue: 100
        };

        const body = JSON.stringify({ d: { GetContextWebInformation: contexInfo } });
        return new Response(body, { status: 200 });
    }

    private async processBatch(urlString: string, options: IFetchOptions): Promise<Response> {
        const linesInBody = options.body.split('\n');
        const getRequests: string[] = [];
        for (const line of linesInBody) {
            if (line.startsWith('GET')) {
                const httpIndex = line.indexOf('http://');
                const protocolIndex = line.indexOf('HTTP/1.1');
                let requestUrl = line.substring(httpIndex, protocolIndex);
                requestUrl = requestUrl.split('/#/').join('/');

                getRequests.push(requestUrl);
            }
        }

        // Creating response lines to look like what should be processed here
        // https://github.com/pnp/pnpjs/blob/dev/packages/sp/src/batch.ts
        const responseLines: string[] = [];
        for (const requestUrl of getRequests) {
            const getResponse = await this.fetch(requestUrl, { method: 'GET' });

            responseLines.push('--batchresponse_1234');
            responseLines.push('Content-Type: application/http');
            responseLines.push('Content-Transfer-Encoding: binary');
            responseLines.push('');
            responseLines.push('HTTP/1.1 200 OK');
            responseLines.push('CONTENT-TYPE: application/json;odata=verbose;charset=utf-8');
            responseLines.push('');
            const text = await getResponse.text();
            // TODO - Revisit this as it assumes we are only batching a set of results
            responseLines.push(`{"d":{"results":${text}}}`);
        }

        responseLines.push('--batchresponse_1234--');
        responseLines.push('');

        const r = responseLines.join('\n');

        return new Response(r, { status: 200 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private applyOrderBy(items: any[], orderby: string): any[] {
        // Logger.write(`applyOrderBy`);
        let sortKey: string;
        let sortOrder: string;
        if (orderby !== null && orderby !== undefined && orderby.length > 0) {
            const keys = orderby.split(' ');
            sortKey = keys[0];
            sortOrder = keys[1].toLocaleLowerCase();
            // https://medium.com/@pagalvin/sort-arrays-using-typescript-592fa6e77f1
            return items.sort((leftSide, rightSide): number => {
                if (leftSide[sortKey] < rightSide[sortKey]) { return (sortOrder === 'asc' ? -1 : 1); }
                if (leftSide[sortKey] > rightSide[sortKey]) { return (sortOrder === 'asc' ? 1 : -1); }
                return 0;
            });
        }
        else {
            return items;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private applySelect(items: any[], select: string): any[] {
        // Logger.write(`applySelect`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newItems: any[] = [];
        if (select !== null && select.length > 0) {
            const keys = select.split(',');
            for (const item of items) {
                const newItem = {};
                for (const key of keys) {
                    if (key.indexOf('/') === -1) {
                        newItem[key] = item[key];
                    }
                    else {
                        const partKeys = key.split('/');
                        this.expandedSelect(item, newItem, partKeys);
                    }
                }
                newItems.push(newItem);
            }
            return newItems;
        }
        else {
            return items;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private applySkip(items: any[], skip: string): any[] {
        // Logger.write(`applySkip`);
        if (skip !== null && !Number.isNaN(+skip)) {
            return items.slice(+skip);
        }
        else {
            return items;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private applyTop(items: any[], top: string): any[] {
        // Logger.write(`applyTop`);
        if (top !== null && !Number.isNaN(+top)) {
            return items.slice(0, +top);
        }
        else {
            return items;
        }
    }

    /*
        This is intended for lookups but is a little 'hokey' and the moment since it really grabs the whole lookup object
        rather than just the requested properties of the lookup.  To be revisited.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private expandedSelect(parentItem: any, parentNewItem: any, partKeys: string[]): any {
        // Logger.write(`expandedSelect [${partKeys}]`);
        try {
            if (partKeys.length === 0) { return; }
            const partKey = partKeys.shift();
            if (parentNewItem && partKey) {
                parentNewItem[partKey] = parentItem[partKey];
                this.expandedSelect(parentItem[partKey], parentNewItem[partKey], partKeys);
            }
        }
        catch (e) {
            LogHelper.exception(this.constructor.name, 'expandedSelect', e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private applyFilter(items: any[], filter: string): any[] {
        // Logger.write(`applyFilter`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newItems: any[] = [];
        if (filter !== null && filter.length > 0) {
            const parseResult = new FilterParser().parse(filter);

            for (const item of items) {
                const match: boolean = this.getMatchResult(item, parseResult);
                if (match) {
                    newItems.push(item);
                }
            }
            return newItems;
        }
        else {
            return items;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult(item: any, parseResult: any): boolean {
        switch (parseResult.operator.toLowerCase()) {
            case FilterParser.Operators.EQUALS:
                return this.getMatchResult_EQUALS(item, parseResult);
            case FilterParser.Operators.SUBSTRINGOF:
                return this.getMatchResult_SUBSTRINGOF(item, parseResult);
            case FilterParser.Operators.AND:
                return this.getMatchResult_AND(item, parseResult);
            case FilterParser.Operators.OR:
                return this.getMatchResult_OR(item, parseResult);
            case FilterParser.Operators.NOT_EQUAL:
                return this.getMatchResult_NOTEQUALS(item, parseResult);
            default:
                return false;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult_EQUALS(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (const property of parseResult.property) {
            propertyValue = propertyValue[property];

            // if our property is undefined or null no reason to keep looping into it
            if (propertyValue === undefined || propertyValue === null) {
                break;
            }

            // hack that for multi
            if (propertyValue.results !== undefined) {
                LogHelper.verbose(this.constructor.name, 'ensureUser', `getMatchResult_EQUALS ${property} - hack based on assumption this is a multiLookup`);
                // if (property.toLowerCase().indexOf('multilookup') !== -1) {
                // take the results collection and map to a single array of just the property we are matching on
                propertyValue = propertyValue.results.map(r => r[parseResult.property[1]]);
                break;
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filterValue: any;
        if (typeof (propertyValue) === 'number') {
            filterValue = +parseResult.value;
        }
        else if (typeof (propertyValue) === 'boolean') {
            filterValue = Boolean(parseResult.value);
        }
        else {
            filterValue = parseResult.value;
        }

        if (propertyValue === filterValue) {
            return true;
        }
        else if (Array.isArray(propertyValue)) {
            if (propertyValue.indexOf(filterValue) !== -1) {
                return true;
            }
        }

        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult_NOTEQUALS(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (const property of parseResult.property) {
            propertyValue = propertyValue[property];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filterValue: any;
        if (typeof (propertyValue) === 'number') {
            filterValue = +parseResult.value;
        }
        else if (typeof (propertyValue) === 'boolean') {
            filterValue = Boolean(parseResult.value);
        }
        else {
            filterValue = parseResult.value;
        }

        if (propertyValue !== filterValue) {
            return true;
        }
        else if (Array.isArray(propertyValue)) {
            if (propertyValue.indexOf(filterValue) === -1) {
                return true;
            }
        }

        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult_SUBSTRINGOF(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (const property of parseResult.property) {
            propertyValue = propertyValue[property];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filterValue: any;
        if (typeof (propertyValue) === 'number') {
            filterValue = +parseResult.value;
        }
        else {
            filterValue = parseResult.value;
        }

        if (propertyValue.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) {
            return true;
        }

        return false;
    }

    // This assumes just one 'AND'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult_AND(item: any, parseResult: any): boolean {
        const parseResult1 = this.getMatchResult(item, parseResult.property);
        const parseResult2 = this.getMatchResult(item, parseResult.value);

        if (parseResult1 === true && parseResult2 === true) {
            return true;
        }
        else {
            return false;
        }
    }

    // This assumes just one 'OR'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMatchResult_OR(item: any, parseResult: any): boolean {
        const parseResult1 = this.getMatchResult(item, parseResult.property);
        const parseResult2 = this.getMatchResult(item, parseResult.value);

        if (parseResult1 === true || parseResult2 === true) {
            return true;
        }
        else {
            return false;
        }
    }

    private getListTitleFromUrl(urlString: string): string {
        let listTitle = '';
        let index = urlString.indexOf(`getByTitle('`);
        if (index !== -1) {
            listTitle = urlString.substring(index + 12);
            index = listTitle.indexOf(`')`);
            if (index !== -1) {
                listTitle = listTitle.substring(0, index);
            }
        }

        return listTitle;
    }
}
