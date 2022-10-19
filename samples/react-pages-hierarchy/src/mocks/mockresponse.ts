import { IItemUpdateResult, IContextInfo } from '@pnp/sp/presets/all';
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

        if (options.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('_api/web/currentuser') !== -1) {
            response = this.getCurrentUser(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers(@v)?') !== -1) {
            response = this.getSiteUser(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers/getbyid') !== -1) {
            response = this.getSiteUserById(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/siteusers/getbyemail') !== -1) {
            response = this.getSiteUserByEmail(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && this.endsWith(url, '/_api/web')) {
            response = this.getWeb(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && this.endsWith(url, '/attachmentfiles')) {
            response = this.getAttachments(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/_api/web/getfilebyserverrelativeurl') !== -1) {
            response = await this.getFileByServerRelativeUrl(url);
        }
        else if (options!.method!.toUpperCase() === 'GET' && url.toLowerCase().indexOf('/items') === -1) {
            response = this.getListProperties(url);
        }
        else if (options!.method!.toUpperCase() === 'GET') {
            response = this.getListItems(url);
        }
        else if (options!.method!.toUpperCase() === 'POST' && this.endsWith(url, '_api/contextinfo')) {
            response = this.getContextInfo();
        }
        else if (options!.method!.toUpperCase() === 'POST' && this.endsWith(url, '_api/$batch')) {
            response = await this.processBatch(url, options);
        }
        else if (options!.method!.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.utilities.utility.searchprincipalsusingcontextweb')) {
            response = this.searchPrincipals(url, options);
        }
        else if (options!.method!.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.ui.applicationpages.clientpeoplepickerwebserviceinterface.clientpeoplepickersearchuser')) {
            response = this.clientPeoplePickerSearchUser(url, options);
        }
        else if (options!.method!.toLocaleUpperCase() === 'POST' && this.endsWith(url, '/_api/sp.utilities.utility.sendemail')) {
            response = this.sendEmail(url, options);
        }
        else if (options!.method!.toUpperCase() === 'POST' && this.endsWith(url, '_api/web/ensureuser')) {
            response = this.ensureUser(url, options);
        }
        else if (options!.method!.toUpperCase() === 'POST' && url.toLowerCase().indexOf('/attachmentfiles') !== -1) {
            // add, updates and deletes
            response = this.saveAttachmentChanges(url, options);
        }
        else if (options!.method!.toUpperCase() === 'POST' && url.toLowerCase().indexOf('_api/web/sitegroups/') !== -1) {
            response = new Response('', { status: 200 });
        }
        else if (options!.method!.toUpperCase() === 'POST' && this.endsWith(url, '/getitems')) {
            response = this.getListItemsCamlQuery(url, options);
        }
        else if (options!.method!.toUpperCase() === 'POST' && url.toLowerCase().indexOf('/files/add') !== -1) {
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

        let url = parse(urlString, true, true);
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
                let skipParts = urlString.split('&$skip=');
                let nextUrl = '';
                if (skipParts.length === 1) {
                    nextUrl = `${urlString}"&$skip=${items.length}`;
                }
                else if (skipParts.length === 2) {
                    nextUrl = `${urlString}"&$skip=${+skipParts[1] + items.length}`;
                }

                let result = {
                    'd': {
                        'results': items,
                        '__next': nextUrl
                    }

                };
                body = JSON.stringify(result);
            }
        }
        else if (url.pathname.endsWith(')')) {
            let index = url.pathname.lastIndexOf('(');
            let id = url.pathname.slice(index + 1, url.pathname.length - 1);

            let item = items.filter(i => i.ID === +id)[0];
            body = JSON.stringify(item);
        }
        else {
            // not sure what might hit here yet
        }

        return new Response(body, { status: 200 });
    }

    private getListProperties(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getListProperties', urlString);

        let body = {
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

        let url = parse(urlString, true, true);
        let body: string | undefined;

        // try to get the data from local storage and then from mock data
        let items = this.mockListFactory.getListItems(this.listTitle);

        // tslint:disable-next-line:max-line-length
        // {"query":{"__metadata":{"type":"SP.CamlQuery"},"ViewXml":"<View><ViewFields><FieldRef Name='Group1'/><FieldRef Name='ProductGroup'/>...</ViewFields><Query><Where><Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq></Where></Query><RowLimit>1000</RowLimit></View>"}}
        let camlQuery = JSON.parse(options.body);

        let viewXml: string = camlQuery.query.ViewXml;
        let viewFieldsStart = viewXml.indexOf('<ViewFields>') + 12;
        let viewFieldsEnd = viewXml.indexOf('</ViewFields>');
        let queryStart = viewXml.indexOf('<Query>') + 7;
        let queryEnd = viewXml.indexOf('</Query>');
        let rowLimitStart = viewXml.indexOf('<RowLimit>') + 10;
        let rowLimitEnd = viewXml.indexOf('</RowLimit>');

        let viewFields = viewXml.substring(viewFieldsStart, viewFieldsEnd);
        let query = viewXml.substring(queryStart, queryEnd);  // <Where><Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq></Where>
        let rowLimit = viewXml.substring(rowLimitStart, rowLimitEnd);

        let select = viewFields.split(`<FieldRef Name='`).join('').split(`'/>`).join(',');

        // WARNING - currently this assumes only one clause with an Eq
        let whereStart = query.indexOf('<Where>') + 7;
        let whereEnd = query.indexOf('</Where>');
        let where = query.substring(whereStart, whereEnd); // <Eq><FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value></Eq>
        let compare = where.startsWith('<Eq>') ? 'eq' : null; // add other checks for future compares
        where = where.split('<Eq>').join('').split('</Eq>').join(''); // <FieldRef Name='AppliesTo'/><Value Type='Choice'>Cost</Value>
        let filter = where.split(`<FieldRef Name='`).join('').split(`'/>`).join(` ${compare} `)
            .split(`<Value Type='Choice'>`).join(`'`).split('</Value>').join(`'`);

        items = this.applyFilter(items, filter);
        items = this.applySelect(items, select);
        items = this.applyTop(items, rowLimit);

        if (url.pathname.endsWith('/getitems')) {
            body = JSON.stringify(items);
        }
        else if (url.pathname.endsWith(')')) {
            let index = url.pathname.lastIndexOf('(');
            let id = url.pathname.slice(index + 1, url.pathname.length - 1);

            let item = items.filter(i => i.ID === +id)[0];
            body = JSON.stringify(item);
        }
        else {
            // not sure what might hit here yet
        }

        return new Response(body, { status: 200 });
    }

    private getAttachments(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getAttachments', urlString);

        let url = parse(urlString, true, true);
        let body: string;

        // try to get the data from local storage and then from mock data
        let items = this.mockListFactory.getListItems(this.listTitle);

        // _api/web/lists/getByTitle([list name])/items([id])/AttachmentFiles
        let index = url.pathname.lastIndexOf('(');
        let id = url.pathname.slice(index + 1, url.pathname.length - 17);

        let item = items.filter(i => i.ID === +id)[0];

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

            let startIndex = urlString.lastIndexOf(`(`) + 2;
            let endIndex = urlString.lastIndexOf(`)`) - 1;

            let filePath = urlString.substring(startIndex, endIndex);
            /* TODO Revisit
            if (filePath.indexOf(ApplicationValues.Path) !== -1) {
                filePath = filePath.split(ApplicationValues.Path)[1];
            }

            */

            if (this.endsWith(urlString, '$value')) {
                let xmlhttp = new XMLHttpRequest();
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
        let url = parse(urlString, true, true);
        let body = {
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

        let url = parse(urlString, true, true);
        let search = decodeURIComponent(url.search);
        let loginName = search.substring(5, search.length - 1);

        let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        let user = users.filter(i => {
            return (i.LoginName && i.LoginName.toLowerCase().indexOf(loginName.toLowerCase()) !== -1);
        })[0];

        return new Response(JSON.stringify(user), { status: 200 });
    }

    // _api/web/siteusers/getById(1)
    private getSiteUserById(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getSiteUserById', urlString);

        let url = parse(urlString, true, true);
        let index = url.pathname.lastIndexOf('(');
        let id = url.pathname.slice(index + 1, url.pathname.length - 1);

        let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        let user = users.filter(i => {
            return (i.ID === +id);
        })[0];

        return new Response(JSON.stringify(user), { status: 200 });
    }

    // _api/web/siteusers/getByEmail('administrator@demo.com')
    private getSiteUserByEmail(urlString: string): Response {
        LogHelper.verbose(this.constructor.name, 'getSiteUserByEmail', urlString);

        let url = parse(urlString, true, true);
        let pathName = decodeURIComponent(url.pathname); // get rid of encoded characters
        let index = pathName.lastIndexOf(`('`);
        let email = pathName.slice(index + 2, pathName.length - 2);

        let user: any;
        if (email.length > 0) {
            let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
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

        let url = parse(urlString, true, true);
        let body: string | undefined;

        let items = this.mockListFactory.getListItems(this.listTitle);

        if (url.pathname.endsWith('/items')) {
            // add a new item
            let item: any = {};

            let storageKey = this.listTitle + '_ItemCount';
            let maxId: number = 0;
            if (localStorage.getItem(storageKey) !== null) {
                maxId = +localStorage.getItem(storageKey)!;
                if (maxId === NaN || maxId === 0) {
                    if (items.length > 0) {
                        maxId = Math.max.apply(Math, items.map(i => i.ID));
                    }
                    else {
                        maxId = 0;
                    }
                }
                maxId = maxId + 1;

                item['ID'] = maxId;
            }

            let requestBody = JSON.parse(options.body);
            Object.keys(requestBody).map(
                (e) => item[e] = requestBody[e]
            );

            // Common to all SharePoint List Items
            let now = new Date();
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
            let index = url.pathname.lastIndexOf('(');
            let id = url.pathname.slice(index + 1, url.pathname.length - 1);

            let item = items.filter(i => i.ID === +id)[0];

            if (options.body !== undefined) {
                // update an item
                let requestBody = JSON.parse(options.body);
                Object.keys(requestBody).map(
                    (e) => item[e] = requestBody[e]
                );

                // Common to all SharePoint List Items
                let now = new Date();
                item.Modified = now;
                item.EditorId = this.currentUser.ID;

                let result: IItemUpdateResult = {
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

        let url = parse(urlString, true, true);
        let body: string | undefined;
        let items = this.mockListFactory.getListItems(this.listTitle);
        // '/reqdocs/BR/4/attachments/_api/web/lists/getByTitle(%27Requirement%20Documents%27)/items(4)/AttachmentFiles/add(FileName=%27AA%20Template.docx%27)'

        let decodedPath = decodeURI(url.pathname);
        let index = decodedPath.lastIndexOf('(');
        let fileName = decodedPath.slice(index + 2, decodedPath.length - 2);
        let startIndex = decodedPath.lastIndexOf('/items(');
        let endIndex = decodedPath.lastIndexOf(')/AttachmentFiles');
        let id = decodedPath.slice(startIndex + 7, endIndex);

        let item = items.filter(i => i.ID === +id)[0];
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

            let fileReader = new FileReader();
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

        let url = parse(urlString, true, true);
        let body: string;
        // /files/add(overwrite=true,url='Authorized%20Retail%20Pricing%20(effective%2004.27.18).xlsx')

        let decodedPath = decodeURI(url.pathname);
        let index = decodedPath.lastIndexOf('url=');
        let fileName = decodedPath.slice(index + 5, decodedPath.length - 2);

        //        FileSaver.saveAs(options.body, fileName);

        let result = {
            file: options.body,
            ServerRelativeUrl: fileName
        };

        body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }


    private fileLoaded(evt: any, items: any, item: any, options: any) {
        let data = evt.target.result;
        item.AttachmentFiles.push({
            FileName: options.body.name,
            ServerRelativeUrl: data
        });

        this.mockListFactory.saveListItems(this.listTitle, items);
    }

    private searchPrincipals(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'searchPrincipals', urlString);

        let body: string;
        let searchOptions = JSON.parse(options.body);

        let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        let items = users.filter(i => {
            return ((i.DisplayName && i.DisplayName.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1) ||
                (i.LoginName && i.LoginName.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1) ||
                (i.Email && i.Email.toLowerCase().indexOf(searchOptions.input.toLowerCase()) !== -1)
            );
        });

        let result = {
            'SearchPrincipalsUsingContextWeb': {
                'results': items
            }
        };

        body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }

    private clientPeoplePickerSearchUser(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'clientpeoplepickersearchuser', urlString);

        let body: string;
        let postBody = JSON.parse(options.body);
        let query = postBody.queryParams.QueryString.toLowerCase();

        let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        let items = users.filter(i => {
            return ((i.DisplayName && i.DisplayName.toLowerCase().indexOf(query) !== -1) ||
                (i.LoginName && i.LoginName.toLowerCase().indexOf(query) !== -1) ||
                (i.Email && i.Email.toLowerCase().indexOf(query) !== -1)
            );
        });

        let results: any[] = [];
        for (let item of items) {
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

        let result = {
            d: {
                ClientPeoplePickerSearchUser: JSON.stringify(results)
            }
        };

        body = JSON.stringify(result);

        return new Response(body, { status: 200 });
    }

    private sendEmail(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'sendEmail', urlString);

        let body: string;
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

        body = JSON.stringify('');

        return new Response(body, { status: 200 });
    }

    private ensureUser(urlString: string, options: IFetchOptions): Response {
        LogHelper.verbose(this.constructor.name, 'ensureUser', urlString);

        let url = parse(urlString, true, true);
        let body: string;
        let ensureOptions = JSON.parse(options.body);

        let users = this.mockListFactory.getListItems(ListTitles.USERS_INFORMATION);
        let user = users.filter(i => {
            return (i.LoginName && i.LoginName.toLowerCase().indexOf(ensureOptions.logonName.toLowerCase()) !== -1);
        })[0];

        user['__metadata'] = { id: `${url.protocol}${url.host}/_api/Web/GetUserById(${user.ID})` };
        user.Id = user.ID;  // because... SharePoint

        let result = {
            'd': user
        };

        body = JSON.stringify(result);
        return new Response(body, { status: 200 });
    }

    private getContextInfo(): Response {
        let contexInfo: IContextInfo = {
            FormDigestTimeoutSeconds: 100,
            FormDigestValue: 100
        };

        let body = JSON.stringify({ d: { GetContextWebInformation: contexInfo } });
        return new Response(body, { status: 200 });
    }

    private async processBatch(urlString: string, options: IFetchOptions): Promise<Response> {
        let linesInBody = options.body.split('\n');
        let getRequests: string[] = [];
        for (let line of linesInBody) {
            if (line.startsWith('GET')) {
                let httpIndex = line.indexOf('http://');
                let protocolIndex = line.indexOf('HTTP/1.1');
                let requestUrl = line.substring(httpIndex, protocolIndex);
                requestUrl = requestUrl.split('/#/').join('/');

                getRequests.push(requestUrl);
            }
        }

        // Creating response lines to look like what should be processed here
        // https://github.com/pnp/pnpjs/blob/dev/packages/sp/src/batch.ts
        let responseLines: string[] = [];
        for (let requestUrl of getRequests) {
            let getResponse = await this.fetch(requestUrl, { method: 'GET' });

            responseLines.push('--batchresponse_1234');
            responseLines.push('Content-Type: application/http');
            responseLines.push('Content-Transfer-Encoding: binary');
            responseLines.push('');
            responseLines.push('HTTP/1.1 200 OK');
            responseLines.push('CONTENT-TYPE: application/json;odata=verbose;charset=utf-8');
            responseLines.push('');
            let text = await getResponse.text();
            // TODO - Revisit this as it assumes we are only batching a set of results
            responseLines.push(`{"d":{"results":${text}}}`);
        }

        responseLines.push('--batchresponse_1234--');
        responseLines.push('');

        let r = responseLines.join('\n');

        return new Response(r, { status: 200 });
    }

    private applyOrderBy(items: any[], orderby: string): any[] {
        // Logger.write(`applyOrderBy`);
        let sortKey: string;
        let sortOrder: string;
        if (orderby != null && orderby !== undefined && orderby.length > 0) {
            let keys = orderby.split(' ');
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

    private applySelect(items: any[], select: string): any[] {
        // Logger.write(`applySelect`);
        let newItems: any[] = [];
        if (select != null && select.length > 0) {
            let keys = select.split(',');
            for (let item of items) {
                let newItem = {};
                for (let key of keys) {
                    if (key.indexOf('/') === -1) {
                        newItem[key] = item[key];
                    }
                    else {
                        let partKeys = key.split('/');
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

    private applySkip(items: any[], skip: string): any[] {
        // Logger.write(`applySkip`);
        if (skip != null && +skip !== NaN) {
            return items.slice(+skip);
        }
        else {
            return items;
        }
    }

    private applyTop(items: any[], top: string): any[] {
        // Logger.write(`applyTop`);
        if (top != null && +top !== NaN) {
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
    private expandedSelect(parentItem: any, parentNewItem: any, partKeys: string[]): any {
        // Logger.write(`expandedSelect [${partKeys}]`);
        try {
            if (partKeys.length === 0) { return; }
            let partKey = partKeys.shift();
            if (parentNewItem && partKey) {
                parentNewItem[partKey] = parentItem[partKey];
                this.expandedSelect(parentItem[partKey], parentNewItem[partKey], partKeys);
            }
        }
        catch (e) {
            LogHelper.exception(this.constructor.name, 'expandedSelect', e);
        }
    }

    private applyFilter(items: any[], filter: string): any[] {
        // Logger.write(`applyFilter`);
        let newItems: any[] = [];
        if (filter != null && filter.length > 0) {
            let parseResult = new FilterParser().parse(filter);

            for (let item of items) {
                let match: boolean = this.getMatchResult(item, parseResult);
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

    private getMatchResult_EQUALS(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (let property of parseResult.property) {
            propertyValue = propertyValue[property];

            // if our property is undefined or null no reason to keep looping into it
            if (propertyValue === undefined || propertyValue === null) {
                break;
            }

            // hack that for multi
            if (propertyValue['results'] !== undefined) {
                LogHelper.verbose(this.constructor.name, 'ensureUser', `getMatchResult_EQUALS ${property} - hack based on assumption this is a multiLookup`);
                // if (property.toLowerCase().indexOf('multilookup') !== -1) {
                // take the results collection and map to a single array of just the property we are matching on
                propertyValue = propertyValue['results'].map(r => r[parseResult.property[1]]);
                break;
            }
        }

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

    private getMatchResult_NOTEQUALS(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (let property of parseResult.property) {
            propertyValue = propertyValue[property];
        }

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

    private getMatchResult_SUBSTRINGOF(item: any, parseResult: any): boolean {
        let propertyValue = item;
        for (let property of parseResult.property) {
            propertyValue = propertyValue[property];
        }

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
    private getMatchResult_AND(item: any, parseResult: any): boolean {
        let parseResult1 = this.getMatchResult(item, parseResult.property);
        let parseResult2 = this.getMatchResult(item, parseResult.value);

        if (parseResult1 === true && parseResult2 === true) {
            return true;
        }
        else {
            return false;
        }
    }

    // This assumes just one 'OR'
    private getMatchResult_OR(item: any, parseResult: any): boolean {
        let parseResult1 = this.getMatchResult(item, parseResult.property);
        let parseResult2 = this.getMatchResult(item, parseResult.value);

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
