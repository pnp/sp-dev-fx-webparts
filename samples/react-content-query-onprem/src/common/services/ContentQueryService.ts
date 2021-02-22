import * as strings                                             from 'contentQueryStrings';
import { IDropdownOption, IPersonaProps, ITag }                 from 'office-ui-fabric-react';
import { SPHttpClient, SPHttpClientResponse }                   from '@microsoft/sp-http';
import { isEmpty }                                              from '@microsoft/sp-lodash-subset';
import { IWebPartContext }                                      from '@microsoft/sp-webpart-base';
import { Text, Log }                                            from '@microsoft/sp-core-library';
import { IContentQueryService }                                 from './IContentQueryService';
import { IQueryFilterField }                                    from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilterField';
import { QueryFilterFieldType }                                 from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterFieldType';
import { IChecklistItem }                                       from '../../controls/PropertyPaneAsyncChecklist/components/AsyncChecklist/IChecklistItem';
import { IContentQueryTemplateContext }                         from '../../webparts/contentQuery/components/IContentQueryTemplateContext';
import { IQuerySettings }                                       from '../../webparts/contentQuery/components/IQuerySettings';
import { CamlQueryHelper }                                      from '../helpers/CamlQueryHelper';
import { ListService, IListTitle }                              from './ListService';
import { SearchService }                                        from './SearchService';
import { PeoplePickerService }                                  from './PeoplePickerService';
import { TaxonomyService }                                      from './TaxonomyService';


export class ContentQueryService implements IContentQueryService {

    private readonly logSource = "ContentQueryService.ts";

    /**************************************************************************************************
     * The page context and http clients used for performing REST calls
     **************************************************************************************************/
    private context: IWebPartContext;
    private spHttpClient: SPHttpClient;


    /**************************************************************************************************
     * The different services used to perform REST calls
     **************************************************************************************************/
     private listService: ListService;
     private searchService: SearchService;
     private peoplePickerService: PeoplePickerService;
     private taxonomyService: TaxonomyService;
     

    /**************************************************************************************************
     * Stores the first async calls locally to avoid useless redundant calls
     **************************************************************************************************/
    private siteUrlOptions: IDropdownOption[];
    private webUrlOptions: IDropdownOption[];
    private listTitleOptions: IDropdownOption[];
    private orderByOptions: IDropdownOption[];
    private filterFields: IQueryFilterField[];
    private viewFields: IChecklistItem[];


    /**************************************************************************************************
     * Constructor
     * @param context : A IWebPartContext for logging and page context
     * @param spHttpClient : A SPHttpClient for performing SharePoint specific requests
     **************************************************************************************************/
    constructor(context: IWebPartContext, spHttpClient: SPHttpClient) {
        Log.verbose(this.logSource, "Initializing a new IContentQueryService instance...", context.serviceScope);

        this.context = context;
        this.spHttpClient = spHttpClient;
        this.listService = new ListService(this.spHttpClient);
        this.searchService = new SearchService(this.spHttpClient);
        this.peoplePickerService = new PeoplePickerService(this.spHttpClient);
        this.taxonomyService = new TaxonomyService(this.spHttpClient);
    }


    /**************************************************************************************************
     * Generates the final template context that will be given to handlebars 
     * @param querySettings : The settings required for generating the CAML query
     * @param callTimeStamp : The time stamp of the call in order to fight concurency
     **************************************************************************************************/
    public getTemplateContext(querySettings: IQuerySettings, callTimeStamp: number): Promise<IContentQueryTemplateContext> {
        Log.verbose(this.logSource, Text.format("Getting template context for request with queue number {0}...", callTimeStamp), this.context.serviceScope);

        return new Promise<IContentQueryTemplateContext>((resolve,reject) => {

            // Initializes the base template context
            let templateContext:IContentQueryTemplateContext = {
                pageContext: this.context.pageContext,
                items: [],
                accessDenied: false,
                webNotFound: false,
                callTimeStamp: callTimeStamp
            };

            // Builds the CAML query based on the webpart settings
            let query = CamlQueryHelper.generateCamlQuery(querySettings);
            Log.info(this.logSource, Text.format("Generated CAML query {0}...", query), this.context.serviceScope);

            // Queries the list with the generated caml query
            this.listService.getListItemsByQuery(querySettings.webUrl, querySettings.listId, query)
                .then((data: any) => {
                    // Updates the template context with the normalized query results
                    let normalizedResults = this.normalizeQueryResults(data.value, querySettings.viewFields);
                    templateContext.items = normalizedResults;
                    resolve(templateContext);
                })
                .catch((error) => {
                    // If it fails because previously configured web/list isn't accessible for current user
                    if(error.status === 403) {

                         // Still resolve with accessDenied=true so the handlebar template can decide what to render in that case
                         templateContext.accessDenied = true;
                         resolve(templateContext);
                    }

                    // If it fails because previously configured web/list doesn't exist anymore
                    else if(error.status === 404) {

                        // Still resolve with webNotFound=true so the handlebar template can decide what to render in that case
                        templateContext.webNotFound = true;
                        resolve(templateContext);
                    }

                    // If it fails for any other reason, reject with the error message
                    else {
                        let errorMessage: string = error.statusText ? error.statusText : error;
                        reject(errorMessage);
                    }
                }
            );
        });
    }


    /**************************************************************************************************
     * Executes an HTTP request against the specified file and returns a promise with it's content
     * @param fileUrl : The url of the file
     **************************************************************************************************/
    public getFileContent(fileUrl: string): Promise<string> {
        Log.verbose(this.logSource, Text.format("Getting content for file with url '{0}'...", fileUrl), this.context.serviceScope);

        return new Promise<string>((resolve,reject) => {
            this.spHttpClient.get(fileUrl, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                if(response.ok) {
                    if(response.url.indexOf('AccessDenied.aspx') > -1){
                        reject('Access Denied');
                    }
                    else
                    {
                        resolve(response.text());
                    }                    
                }
                else {
                    reject(response.statusText);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    
    /**************************************************************************************************
     * Gets the available webs for the current user
     **************************************************************************************************/   
    public getSiteUrlOptions(): Promise<IDropdownOption[]> {
        Log.verbose(this.logSource, "Loading dropdown options for toolpart property 'Site Url'...", this.context.serviceScope);

        // Resolves the already loaded data if available
        if(this.siteUrlOptions) {
            return Promise.resolve(this.siteUrlOptions);
        }

        // Otherwise, performs a REST call to get the data
        return new Promise<IDropdownOption[]>((resolve,reject) => {
            let serverUrl = Text.format("{0}//{1}", window.location.protocol, window.location.hostname); 

            this.searchService.getSitesStartingWith(serverUrl)
                .then((urls) => {
                    // Adds the current site collection url to the ones returned by the search (in case the current site isn't indexed yet)
                    this.ensureUrl(urls, this.context.pageContext.site.absoluteUrl);

                    // Builds the IDropdownOption[] based on the urls
                    let options:IDropdownOption[] = [ { key: "", text: strings.SiteUrlFieldPlaceholder } ];
                    let urlOptions:IDropdownOption[] = urls.sort().map((url) => { 
                        let serverRelativeUrl = !isEmpty(url.replace(serverUrl, '')) ? url.replace(serverUrl, '') : '/';
                        return { key: url, text: serverRelativeUrl };
                    });
                    options = options.concat(urlOptions);
                    this.siteUrlOptions = options;
                    resolve(options);
                })
                .catch((error) => {
                    reject(error);
                }
            );
        });
    }


    /**************************************************************************************************
     * Gets the available webs for the current user
     * @param siteUrl : The url of the site from which webs must be loaded from
     **************************************************************************************************/   
    public getWebUrlOptions(siteUrl: string): Promise<IDropdownOption[]> {
        Log.verbose(this.logSource, "Loading dropdown options for toolpart property 'Web Url'...", this.context.serviceScope);

        // Resolves an empty array if site is null
        if (isEmpty(siteUrl)) {
            return Promise.resolve(new Array<IDropdownOption>());
        }

        // Resolves the already loaded data if available
        if(this.webUrlOptions) {
            return Promise.resolve(this.webUrlOptions);
        }

        // Otherwise, performs a REST call to get the data
        return new Promise<IDropdownOption[]>((resolve,reject) => {

            this.searchService.getWebsFromSite(siteUrl)
                .then((urls) => {
                    // If querying the current site, adds the current site collection url to the ones returned by the search (in case the current web isn't indexed yet)
                    if(siteUrl.toLowerCase().trim() === this.context.pageContext.site.absoluteUrl.toLowerCase().trim()) {
                        this.ensureUrl(urls, this.context.pageContext.web.absoluteUrl);
                    }
                    
                    // Builds the IDropdownOption[] based on the urls
                    let options:IDropdownOption[] = [ { key: "", text: strings.WebUrlFieldPlaceholder } ];
                    let urlOptions:IDropdownOption[] = urls.sort().map((url) => { 
                        let siteRelativeUrl = !isEmpty(url.replace(siteUrl, '')) ? url.replace(siteUrl, '') : '/';
                        return { key: url, text: siteRelativeUrl };
                    });
                    options = options.concat(urlOptions);
                    this.webUrlOptions = options;
                    resolve(options);
                })
                .catch((error) => {
                    reject(error);
                }
            );
        });
    }


    /**************************************************************************************************
     * Gets the available lists from the specified web
     * @param webUrl : The url of the web from which lists must be loaded from
     **************************************************************************************************/   
    public getListTitleOptions(webUrl: string): Promise<IDropdownOption[]> {
        Log.verbose(this.logSource, "Loading dropdown options for toolpart property 'List Title'...", this.context.serviceScope);

        // Resolves an empty array if web is null
        if (isEmpty(webUrl)) {
            return Promise.resolve(new Array<IDropdownOption>());
        }

        // Resolves the already loaded data if available
        if(this.listTitleOptions) {
            return Promise.resolve(this.listTitleOptions);
        }

        // Otherwise gets the options asynchronously
        return new Promise<IDropdownOption[]>((resolve, reject) => {
            this.listService.getListTitlesFromWeb(webUrl).then((listTitles:IListTitle[]) => {
                let options:IDropdownOption[] = [ { key: "", text: strings.ListTitleFieldPlaceholder } ];
                let listTitleOptions = listTitles.map((list) => { return { key: list.id, text: list.title }; });
                options = options.concat(listTitleOptions);
                this.listTitleOptions = options;
                resolve(options);
            })
            .catch((error) => { 
                reject(this.getErrorMessage(webUrl, error));
            });
        });
    }


    /**************************************************************************************************
     * Gets the available fields out of the specified web/list
     * @param webUrl : The url of the web from which the list comes from
     * @param listId : The id of the list from which the field must be loaded from
     **************************************************************************************************/ 
    public getOrderByOptions(webUrl: string, listId: string): Promise<IDropdownOption[]> {
        Log.verbose(this.logSource, "Loading dropdown options for toolpart property 'Order By'...", this.context.serviceScope);

        // Resolves an empty array if no web or no list has been selected
        if (isEmpty(webUrl) || isEmpty(listId)) {
            return Promise.resolve(new Array<IDropdownOption>());
        }

        // Resolves the already loaded data if available
        if(this.orderByOptions) {
            return Promise.resolve(this.orderByOptions);
        }

        // Otherwise gets the options asynchronously
        return new Promise<IDropdownOption[]>((resolve, reject) => {
            this.listService.getListFields(webUrl, listId, ['InternalName', 'Title', 'Sortable'], 'Title').then((data:any) => {
                let sortableFields:any[] = data.value.filter((field) => { return field.Sortable == true; });
                let options:IDropdownOption[] = [ { key: "", text: strings.queryFilterPanelStrings.queryFilterStrings.fieldSelectLabel } ];
                let orderByOptions:IDropdownOption[] = sortableFields.map((field) => { return { key: field.InternalName, text: Text.format("{0} \{\{{1}\}\}", field.Title, field.InternalName) }; });
                options = options.concat(orderByOptions);
                this.orderByOptions = options;
                resolve(options);
            })
            .catch((error) => {
                reject(this.getErrorMessage(webUrl, error));
            });
        });
    }


    /**************************************************************************************************
     * Gets the available fields out of the specified web/list
     * @param webUrl : The url of the web from which the list comes from
     * @param listId : The id of the list from which the field must be loaded from
     **************************************************************************************************/
    public getFilterFields(webUrl: string, listId: string):Promise<IQueryFilterField[]> {
        Log.verbose(this.logSource, "Loading dropdown options for toolpart property 'Filters'...", this.context.serviceScope);

        // Resolves an empty array if no web or no list has been selected
        if (isEmpty(webUrl) || isEmpty(listId)) {
            return Promise.resolve(new Array<IQueryFilterField>());
        }

        // Resolves the already loaded data if available
        if(this.filterFields) {
            return Promise.resolve(this.filterFields);
        }

        // Otherwise gets the options asynchronously
        return new Promise<IQueryFilterField[]>((resolve, reject) => {
            this.listService.getListFields(webUrl, listId, ['InternalName', 'Title', 'TypeAsString'], 'Title').then((data:any) => {
                let fields:any[] = data.value;
                let options:IQueryFilterField[] = fields.map((field) => { return { 
                    internalName: field.InternalName, 
                    displayName: field.Title,
                    type: this.getFieldTypeFromString(field.TypeAsString)
                }; });
                this.filterFields = options;
                resolve(options);
            })
            .catch((error) => {
                reject(this.getErrorMessage(webUrl, error));
            });
        });
    }


    /**************************************************************************************************
     * Loads the checklist items for the viewFields property
     * @param webUrl : The url of the web from which the list comes from
     * @param listId : The id of the list from which the field must be loaded from
     **************************************************************************************************/
    public getViewFieldsChecklistItems(webUrl: string, listId: string):Promise<IChecklistItem[]> {
        Log.verbose(this.logSource, "Loading checklist items for toolpart property 'View Fields'...", this.context.serviceScope);

        // Resolves an empty array if no web or no list has been selected
        if (isEmpty(webUrl) || isEmpty(listId)) {
            return Promise.resolve(new Array<IChecklistItem>());
        }

        // Resolves the already loaded data if available
        if(this.viewFields) {
            return Promise.resolve(this.viewFields);
        }

        // Otherwise gets the options asynchronously
        return new Promise<IChecklistItem[]>((resolve, reject) => {
            this.listService.getListFields(webUrl, listId, ['InternalName', 'Title'], 'Title').then((data:any) => {
                let fields:any[] = data.value;
                let items:IChecklistItem[] = fields.map((field) => { return { 
                    id: field.InternalName, 
                    label: Text.format("{0} \{\{{1}\}\}", field.Title, field.InternalName)
                }; });
                this.viewFields = items;
                resolve(items);
            })
            .catch((error) => {
                reject(this.getErrorMessage(webUrl, error));
            });
        });
    }


    /**************************************************************************************************
     * Returns the user suggestions based on the user entered picker input
     * @param webUrl : The web url on which to query for users
     * @param filterText : The filter specified by the user in the people picker
     * @param currentPersonas : The IPersonaProps already selected in the people picker
     * @param limitResults : The results limit if any
     **************************************************************************************************/
    public getPeoplePickerSuggestions(webUrl: string, filterText: string, currentPersonas: IPersonaProps[], limitResults?: number):Promise<IPersonaProps[]> {
        Log.verbose(this.logSource, "Getting people picker suggestions for toolpart property 'Filters'...", this.context.serviceScope);

        return new Promise<IPersonaProps[]>((resolve, reject) => {
            this.peoplePickerService.getUserSuggestions(webUrl, filterText, 1, 15, limitResults).then((data) => {
                let users: any[] = JSON.parse(data.value);
                let userSuggestions:IPersonaProps[] = users.map((user) => { return { 
                    primaryText: user.DisplayText,
                    optionalText: user.EntityData.SPUserID || user.EntityData.SPGroupID
                }; });
                resolve(this.removeUserSuggestionsDuplicates(userSuggestions, currentPersonas));
            })
            .catch((error) => {
                reject(error);
            });
        });
    }


    /**************************************************************************************************
     * Returns the taxonomy suggestions based on the user entered picker input
     * @param webUrl : The web url on which to look for the list
     * @param listId : The id of the list on which to look for the taxonomy field
     * @param field : The IQueryFilterField which contains the selected taxonomy field 
     * @param filterText : The filter text entered by the user
     * @param currentTerms : The current terms
     **************************************************************************************************/
    public getTaxonomyPickerSuggestions(webUrl: string, listId: string, field: IQueryFilterField, filterText: string, currentTerms: ITag[]):Promise<ITag[]> {
        Log.verbose(this.logSource, "Getting taxonomy picker suggestions for toolpart property 'Filters'...", this.context.serviceScope);

        return new Promise<ITag[]>((resolve, reject) => {
            this.taxonomyService.getSiteTaxonomyTermsByTermSet(webUrl, listId, field.internalName, this.context.pageContext.web.language).then((data:any) => {
                let termField = Text.format('Term{0}', this.context.pageContext.web.language);
                let terms: any[] = data.value;
                let termSuggestions: ITag[] = terms.map((term:any) => { return { key: term.Id, name: term[termField] }; });
                resolve(this.removeTermSuggestionsDuplicates(termSuggestions, currentTerms));
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
    

    /*************************************************************************************************
     * Performs a GET request against the specified file path and returns whether it resolved or not
     * @param filePath : The path of the file that needs to be validated against a HEAD request
     *************************************************************************************************/
    public ensureFileResolves(filePath: string): Promise<{}> {
        Log.verbose(this.logSource, Text.format("Checking if file exists at url '{0}'...", filePath), this.context.serviceScope);

        return new Promise<boolean>((resolve, reject) => { 
            this.spHttpClient.get(filePath, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                if(response.ok) {
                    resolve();
                }
                else {
                    reject(response.statusText);
                }
            })
            .catch((error) => {
                reject(error);
            }); 
        });
    }


    /*************************************************************************************************
     * Returns whether the specified file path is a valid .htm or .html filePath
     * @param filePath : The path of the file which needs to be validated
     *************************************************************************************************/
    public isValidTemplateFile(filePath: string): boolean {
        Log.verbose(this.logSource, Text.format("Validating template file at url '{0}'...", filePath), this.context.serviceScope);

        let path = filePath.toLowerCase().trim();
        let pathExtension = path.substring(path.lastIndexOf('.'));
        return (pathExtension == '.htm' || pathExtension == '.html');
    }


    /*************************************************************************************************
     * Generates a default handlebars template based on the view fields selected by the user
     * @param viewFields : The view fields that have been selected by the user
     *************************************************************************************************/
    public generateDefaultTemplate(viewFields: string[]): string {
        let viewFieldsStr = viewFields.map((field) => { return Text.format("                    <span><b>{0} : </b>\{\{{0}.textValue\}\}</span>", field); }).join("\n");
        let template = Text.format(`<style type="text/css">
    .dynamic-template .dynamic-items .dynamic-item {
        background: #ffffff;
        box-shadow: 0px 0px 6px #bfbebe;
        margin-bottom: 15px;
    }
    .dynamic-template .dynamic-items .dynamic-item h3 {
        background: #47b4de;
        color: #fff;
        padding: 5px 5px 7px 10px;
        margin: 0px;
    }
    .dynamic-template .dynamic-items .dynamic-item .dynamic-item-fields {
        padding: 10px;
    }
    .dynamic-template .dynamic-items .dynamic-item .dynamic-item-fields span {
        display: block;
        font-size: 12px;
    }
</style>

<div class="dynamic-template">
    <h2>{0}</h2>
    <div class="dynamic-items">
        {{#each items}}
            <div class="dynamic-item">
                <h3>Result #{{@index}}</h3>
                <div class="dynamic-item-fields">
{1}
                </div>
            </div>
        {{/each}}
    </div>
</div>`, strings.DynamicallyGeneratedTemplate ,viewFieldsStr);

        return template;
    }


    /**************************************************************************************************
     * Resets the stored 'list title' options 
     **************************************************************************************************/
    public clearCachedWebUrlOptions() {
        Log.verbose(this.logSource, "Clearing cached dropdown options for toolpart property 'Web Url'...", this.context.serviceScope);
        this.webUrlOptions = null;
    }
    

    /**************************************************************************************************
     * Resets the stored 'list title' options 
     **************************************************************************************************/
    public clearCachedListTitleOptions() {
        Log.verbose(this.logSource, "Clearing cached dropdown options for toolpart property 'List Title'...", this.context.serviceScope);
        this.listTitleOptions = null;
    }


    /**************************************************************************************************
     * Resets the stored 'order by' options
     **************************************************************************************************/
    public clearCachedOrderByOptions() {
        Log.verbose(this.logSource, "Clearing cached dropdown options for toolpart property 'Order By'...", this.context.serviceScope);
        this.orderByOptions = null;
    }


    /**************************************************************************************************
     * Resets the stored filter fields
     **************************************************************************************************/
    public clearCachedFilterFields() {
        Log.verbose(this.logSource, "Clearing cached dropdown options for toolpart property 'Filter'...", this.context.serviceScope);
        this.filterFields = null;
    }


    /**************************************************************************************************
     * Resets the stored view fields
     **************************************************************************************************/
    public clearCachedViewFields() {
        Log.verbose(this.logSource, "Clearing cached checklist items for toolpart property 'View Fields'...", this.context.serviceScope);
        this.viewFields = null;
    }


    /**************************************************************************************************
     * Normalizes the results coming from a CAML query into a userfriendly format for handlebars
     * @param results : The results returned by a CAML query executed against a list
     **************************************************************************************************/
    private normalizeQueryResults(results: any[], viewFields: string[]): any[] {
        Log.verbose(this.logSource, "Normalizing results for the requested handlebars context...", this.context.serviceScope);

        let normalizedResults: any[] = [];

        for(let result of results) {
            let normalizedResult: any = {};
            let formattedCharsRegex = /_x00(20|3a)_/gi;

            for(let viewField of viewFields) {
                let formattedName = viewField.replace(formattedCharsRegex, "_x005f_x00$1_x005f_");

                normalizedResult[viewField] = {
                    textValue: result.FieldValuesAsText[formattedName],
                    htmlValue: result.FieldValuesAsHtml[formattedName],
                    rawValue: result[viewField] || result[viewField + 'Id']
                };
            }
            normalizedResults.push(normalizedResult);
        }
        return normalizedResults;
    }


    /**************************************************************************************************
     * Returns an error message based on the specified error object
     * @param error : An error string/object
     **************************************************************************************************/
    private getErrorMessage(webUrl: string, error: any): string {
        let errorMessage:string = error.statusText ? error.statusText : error;
        let serverUrl = Text.format("{0}//{1}", window.location.protocol, window.location.hostname);
        let webServerRelativeUrl = webUrl.replace(serverUrl, '');

        if(error.status === 403) {
            errorMessage = Text.format(strings.ErrorWebAccessDenied, webServerRelativeUrl);
        }
        else if(error.status === 404) {
            errorMessage = Text.format(strings.ErrorWebNotFound, webServerRelativeUrl);
        }
        return errorMessage;
    }

    
    /**************************************************************************************************
     * Returns a field type enum value based on the provided string type
     * @param fieldTypeStr : The field type as a string
     **************************************************************************************************/
    private getFieldTypeFromString(fieldTypeStr: string): QueryFilterFieldType {
        let fieldType:QueryFilterFieldType;

        switch(fieldTypeStr.toLowerCase().trim()) {
            case 'user':                    fieldType = QueryFilterFieldType.User;
                                            break;

            case 'usermulti':               fieldType = QueryFilterFieldType.User;
                                            break;

            case 'datetime':                fieldType= QueryFilterFieldType.Datetime;
                                            break;

            case 'lookup':                  fieldType = QueryFilterFieldType.Lookup;
                                            break;
            
            case 'url':                     fieldType = QueryFilterFieldType.Url;
                                            break;

            case 'number':                  fieldType = QueryFilterFieldType.Number;
                                            break;

            case 'taxonomyfieldtype':       fieldType = QueryFilterFieldType.Taxonomy;
                                            break;

            case 'taxonomyfieldtypemulti':  fieldType = QueryFilterFieldType.Taxonomy;
                                            break;

            default:                        fieldType = QueryFilterFieldType.Text;
                                            break;
        }
        return fieldType;
    }


    /**************************************************************************************************
     * Returns the specified users with possible duplicates removed
     * @param users : The user suggestions from which duplicates must be removed
     * @param currentUsers : The current user suggestions that could be duplicates
     **************************************************************************************************/
    private removeUserSuggestionsDuplicates(users: IPersonaProps[], currentUsers: IPersonaProps[]): IPersonaProps[] {
        Log.verbose(this.logSource, "Removing user suggestions duplicates for toolpart property 'Filters'...", this.context.serviceScope);
        let trimmedUsers: IPersonaProps[] = [];

        for(let user of users) {
            let isDuplicate = currentUsers.filter((u) => { return u.optionalText === user.optionalText; }).length > 0;

            if(!isDuplicate) {
                trimmedUsers.push(user);
            }
        }
        return trimmedUsers;
    }


    /**************************************************************************************************
     * Returns the specified users with possible duplicates removed
     * @param users : The user suggestions from which duplicates must be removed
     * @param currentUsers : The current user suggestions that could be duplicates
     **************************************************************************************************/
    private removeTermSuggestionsDuplicates(terms: ITag[], currentTerms: ITag[]): ITag[] {
        Log.verbose(this.logSource, "Removing term suggestions duplicates for toolpart property 'Filters'...", this.context.serviceScope);
        let trimmedTerms: ITag[] = [];

        for(let term of terms) {
            let isDuplicate = currentTerms.filter((t) => { return t.key === term.key; }).length > 0;

            if(!isDuplicate) {
                trimmedTerms.push(term);
            }
        }
        return trimmedTerms;
    }


    /**************************************************************************************************
     * Makes sure the specified url is in the given collection, otherwise adds it
     * @param urls : An array of urls
     * @param urlToEnsure : The url that needs to be ensured
     **************************************************************************************************/
    private ensureUrl(urls: string[], urlToEnsure: string) {
        urlToEnsure = urlToEnsure.toLowerCase().trim();
        let urlExist = urls.filter((u) => { return u.toLowerCase().trim() === urlToEnsure; }).length > 0;

        if(!urlExist) {
            urls.push(urlToEnsure);
        }
    }
}