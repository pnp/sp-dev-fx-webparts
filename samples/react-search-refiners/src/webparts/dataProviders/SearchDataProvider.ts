import ISearchDataProvider from "./ISearchDataProvider";
import { ISearchResults, ISearchResult, IRefinementResult, IRefinementValue, IRefinementFilter } from "../models/ISearchResult";
<<<<<<< HEAD
import pnp, { ConsoleListener, Logger, LogLevel, SearchQuery, SearchQueryBuilder, SearchResults, setup, Web, Sort, SortDirection } from "sp-pnp-js";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities  } from "@microsoft/sp-core-library";
=======
import { sp, SearchQuery, SearchQueryBuilder, SearchResults, SPRest, Web, Sort, SortDirection } from "@pnp/sp";
import { PnPClientStorage, Util } from "@pnp/common";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { Text, JsonUtilities, UrlUtilities } from "@microsoft/sp-core-library";
>>>>>>> upstream/master
import sortBy from "lodash-es/sortBy";
import groupBy from 'lodash-es/groupBy';
import mapValues from 'lodash-es/mapValues';
import mapKeys from "lodash-es/mapKeys";
import * as moment from "moment";

class SearchDataProvider implements ISearchDataProvider {

<<<<<<< HEAD
=======
    private _initialSearchResult: SearchResults = null;
>>>>>>> upstream/master
    private _resultsCount: number;
    private _context: IWebPartContext;
    private _appSearchSettings: SearchQuery;
    private _selectedProperties: string[];
<<<<<<< HEAD
=======
    private _queryTemplate: string;
    private _resultSourceId: string;
    private _enableQueryRules: boolean;
>>>>>>> upstream/master

    public get resultsCount(): number { return this._resultsCount; }
    public set resultsCount(value: number) { this._resultsCount = value; }

<<<<<<< HEAD
    public set selectedProperties(value:  string[]) { this._selectedProperties = value; }
    public get selectedProperties(): string[] { return this._selectedProperties; }

    public constructor(webPartContext: IWebPartContext) {
        this._context = webPartContext;
        
=======
    public set selectedProperties(value: string[]) { this._selectedProperties = value; }
    public get selectedProperties(): string[] { return this._selectedProperties; }

    public set queryTemplate(value: string) { this._queryTemplate = value; }
    public get queryTemplate(): string { return this._queryTemplate; }

    public set resultSourceId(value: string) { this._resultSourceId = value; }
    public get resultSourceId(): string { return this._resultSourceId; }

    public set enableQueryRules(value: boolean) { this._enableQueryRules = value; }
    public get enableQueryRules(): boolean { return this._enableQueryRules; }

    private _localPnPSetup: SPRest;

    public constructor(webPartContext: IWebPartContext) {
        this._context = webPartContext;

>>>>>>> upstream/master
        // Setup the PnP JS instance
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);

        // To limit the payload size, we set odata=nometadata
        // We just need to get list items here
<<<<<<< HEAD
        // We also set the SPFx context accordingly (https://github.com/SharePoint/PnP-JS-Core/wiki/Using-sp-pnp-js-in-SharePoint-Framework)
        setup({
            sp: {
                headers: {
                    Accept: "application/json; odata=nometadata",
                },
            },
            spfxContext: this._context,
        });
=======
        // We use a local configuration to avoid conflicts with other Web Parts
        this._localPnPSetup= sp.configure({
            headers: {
                Accept: "application/json; odata=nometadata",
            },
        }, this._context.pageContext.web.absoluteUrl);
>>>>>>> upstream/master
    }

    /**
     * Performs a search query against SharePoint
     * @param query The search query in KQL format
     * @return The search results
     */
    public async search(query: string, refiners?: string, refinementFilters?: IRefinementFilter[], pageNumber?: number): Promise<ISearchResults> {
<<<<<<< HEAD
        
=======

>>>>>>> upstream/master
        let searchQuery: SearchQuery = {};
        let sortedRefiners: string[] = [];

        // Search paging option is one based
<<<<<<< HEAD
        let page = pageNumber ? pageNumber: 1;

        searchQuery.ClientType = "ContentSearchRegular";

        // To be able to use search query variable according to the current context
        // http://www.techmikael.com/2015/07/sharepoint-rest-do-support-query.html
        searchQuery.QueryTemplate = query ? query : "";;

        searchQuery.RowLimit = this._resultsCount;
=======
        let page = pageNumber ? pageNumber : 1;

        searchQuery.ClientType = "ContentSearchRegular";
        searchQuery.Querytext = query;

        // Disable query rules by default if not specified
        searchQuery.EnableQueryRules = this._enableQueryRules ? this._enableQueryRules : false;

        if (this._resultSourceId) {
            searchQuery.SourceId = this._resultSourceId;
        } else {
            // To be able to use search query variable according to the current context
            // http://www.techmikael.com/2015/07/sharepoint-rest-do-support-query.html
            searchQuery.QueryTemplate = this._queryTemplate;
        }

        searchQuery.RowLimit = this._resultsCount ? this._resultsCount : 50;
>>>>>>> upstream/master
        searchQuery.SelectProperties = this._selectedProperties;
        searchQuery.TrimDuplicates = false;

        let sortList: Sort[] = [
            {
                Property: "Created",
                Direction: SortDirection.Descending
            },
            {
                Property: "Size",
                Direction: SortDirection.Ascending
            }
        ];

        searchQuery.SortList = sortList;

        if (refiners) {
            // Get the refiners order specified in the property pane
            sortedRefiners = refiners.split(",");
            searchQuery.Refiners = refiners ? refiners : "";
        }
<<<<<<< HEAD
        
=======

>>>>>>> upstream/master
        if (refinementFilters) {
            if (refinementFilters.length > 0) {
                searchQuery.RefinementFilters = [this._buildRefinementQueryString(refinementFilters)];
            }
        }

        let results: ISearchResults = {
<<<<<<< HEAD
            RelevantResults : [],
=======
            RelevantResults: [],
>>>>>>> upstream/master
            RefinementResults: [],
            TotalRows: 0,
        };

        try {
<<<<<<< HEAD
    
            const r = await pnp.sp.search(searchQuery);
=======
            if (!this._initialSearchResult || page == 1) {
                this._initialSearchResult = await this._localPnPSetup.search(searchQuery);
            }
>>>>>>> upstream/master

            const allItemsPromises: Promise<any>[] = [];
            let refinementResults: IRefinementResult[] = [];

            // Need to do this check
            // More info here: https://github.com/SharePoint/PnP-JS-Core/issues/337
<<<<<<< HEAD
            if (r.RawSearchResults.PrimaryQueryResult) {
                        
                // Be careful, there was an issue with paging calculation under 2.0.8 version of sp-pnp-js library
                // More info https://github.com/SharePoint/PnP-JS-Core/issues/535
                const r2 = await r.getPage(page, this._resultsCount);
=======
            if (this._initialSearchResult.RawSearchResults.PrimaryQueryResult) {

                // Be careful, there was an issue with paging calculation under 2.0.8 version of sp-pnp-js library
                // More info https://github.com/SharePoint/PnP-JS-Core/issues/535
                let r2 = this._initialSearchResult;
                if (page > 1) {
                    r2 = await this._initialSearchResult.getPage(page, this._resultsCount);
                }
>>>>>>> upstream/master

                const resultRows = r2.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows;
                let refinementResultsRows = r2.RawSearchResults.PrimaryQueryResult.RefinementResults;

                const refinementRows = refinementResultsRows ? refinementResultsRows["Refiners"] : [];

                // Map search results
                resultRows.map((elt) => {

                    const p1 = new Promise<ISearchResult>((resolvep1, rejectp1) => {
<<<<<<< HEAD
                    
=======

>>>>>>> upstream/master
                        // Build item result dynamically
                        // We can't type the response here because search results are by definition too heterogeneous so we treat them as key-value object
                        let result: ISearchResult = {};

                        elt.Cells.map((item) => {
                            result[item.Key] = item.Value;
                        });

                        // Get the icon source URL
<<<<<<< HEAD
                        this._mapToIcon(result.Filename).then((iconUrl) => {

                            result.iconSrc = iconUrl;                            
=======
                        this._mapToIcon(result.Filename ? result.Filename : Text.format(".{0}", result.FileExtension)).then((iconUrl) => {

                            result.iconSrc = iconUrl;
>>>>>>> upstream/master
                            resolvep1(result);

                        }).catch((error) => {
                            rejectp1(error);
<<<<<<< HEAD
                        });                       
                    });

                    allItemsPromises.push(p1);                
=======
                        });
                    });

                    allItemsPromises.push(p1);
>>>>>>> upstream/master
                });

                // Map refinement results                    
                refinementRows.map((refiner) => {
<<<<<<< HEAD
                    
                    let values: IRefinementValue[] = [];
                    refiner.Entries.map((item) => {
                        values.push({
                            RefinementCount: item.RefinementCount,
                            RefinementName:  this._formatDate(item.RefinementName), //This value will appear in the selected filter bar
=======

                    let values: IRefinementValue[] = [];
                    refiner.Entries.map((item) => {
                        values.push({
                            RefinementCount: parseInt(item.RefinementCount, 10),
                            RefinementName: this._formatDate(item.RefinementName), // This value will appear in the selected filter bar
>>>>>>> upstream/master
                            RefinementToken: item.RefinementToken,
                            RefinementValue: this._formatDate(item.RefinementValue), // This value will appear in the filter panel
                        });
                    });

                    refinementResults.push({
                        FilterName: refiner.Name,
                        Values: values,
                    });
                });

                // Resolve all the promises once to get news
                const relevantResults: ISearchResult[] = await Promise.all(allItemsPromises);
<<<<<<< HEAD
                    
=======

>>>>>>> upstream/master
                // Sort refiners according to the property pane value
                refinementResults = sortBy(refinementResults, (refinement) => {

                    // Get the index of the corresponding filter name
                    return sortedRefiners.indexOf(refinement.FilterName);
                });

                results.RelevantResults = relevantResults;
<<<<<<< HEAD
                results.RefinementResults = refinementResults,
                results.TotalRows = r.TotalRows;
=======
                results.RefinementResults = refinementResults;
                results.TotalRows = this._initialSearchResult.TotalRows;
>>>>>>> upstream/master
            }
            return results;

        } catch (error) {
            Logger.write("[SharePointDataProvider.search()]: Error: " + error, LogLevel.Error);
            throw error;
<<<<<<< HEAD
        }       
=======
        }
>>>>>>> upstream/master
    }

    /**
     * Gets the icon corresponding to the file name extension
     * @param filename The file name (ex: file.pdf)
     */
    private async _mapToIcon(filename: string): Promise<string> {
<<<<<<< HEAD
        
        const webAbsoluteUrl = this._context.pageContext.web.absoluteUrl;
        const web = new Web(webAbsoluteUrl);
        
        try {
            const encodedFileName = filename ? filename.replace(/["']/g, "") : "";
            const iconFileName = await web.mapToIcon(encodedFileName,1);
=======

        const webAbsoluteUrl = this._context.pageContext.web.absoluteUrl;
        const web = new Web(webAbsoluteUrl);

        try {
            const encodedFileName = filename ? filename.replace(/["']/g, "") : "";
            const iconFileName = await web.mapToIcon(encodedFileName, 1);
>>>>>>> upstream/master
            const iconUrl = webAbsoluteUrl + "/_layouts/15/images/" + iconFileName;

            return iconUrl;

        } catch (error) {
            Logger.write("[SharePointDataProvider._mapToIcon()]: Error: " + error, LogLevel.Error);
            throw error;
        }
    }

    /**
     * Find and eeplace ISO 8601 dates in the string by a friendly value
     * @param inputValue The string to format
     */
    private _formatDate(inputValue: string): string {

        const iso8061rgx = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/g;
        const matches = inputValue.match(iso8061rgx);

        let updatedInputValue = inputValue;

        if (matches) {
            matches.map(match => {
                updatedInputValue = updatedInputValue.replace(match, moment(match).format("LL"));
            });
        }

<<<<<<< HEAD
        return updatedInputValue;        
=======
        return updatedInputValue;
>>>>>>> upstream/master
    }

    /**
     * Build the refinement condition in FQL format
     * @param selectedFilters The selected filter array
     */
    private _buildRefinementQueryString(selectedFilters: IRefinementFilter[]): string {
<<<<<<< HEAD
        
        let refinementQueryConditions: string[] = [];
        let refinementQueryString: string = null;
        
        const refinementFilters = mapValues(groupBy(selectedFilters, 'FilterName'), (values) => {
            const refinementFilter =  values.map((filter) => {
                return filter.Value.RefinementToken;                       
            });

            return refinementFilter.length > 1 ? "or(" + refinementFilter + ")" : refinementFilter.toString();
        });
        
        mapKeys(refinementFilters, (value, key) => {
            refinementQueryConditions.push(key + ":" + value);
        });
        
        const conditionsCount = refinementQueryConditions.length;

        switch (true) {
            
=======

        let refinementQueryConditions: string[] = [];
        let refinementQueryString: string = null;

        const refinementFilters = mapValues(groupBy(selectedFilters, 'FilterName'), (values) => {
            const refinementFilter = values.map((filter) => {
                return filter.Value.RefinementToken;
            });

            return refinementFilter.length > 1 ? Text.format("or({0})", refinementFilter) : refinementFilter.toString();
        });

        mapKeys(refinementFilters, (value, key) => {
            refinementQueryConditions.push(key + ":" + value);
        });

        const conditionsCount = refinementQueryConditions.length;

        switch (true) {

>>>>>>> upstream/master
            // No filters
            case (conditionsCount === 0): {
                refinementQueryString = null;
                break;
<<<<<<< HEAD
            } 
=======
            }
>>>>>>> upstream/master

            // Just one filter
            case (conditionsCount === 1): {
                refinementQueryString = refinementQueryConditions[0].toString();
                break;
            }

            // Multiple filters
            case (conditionsCount > 1): {
<<<<<<< HEAD
                refinementQueryString = "and(" + refinementQueryConditions.toString() + ")";
=======
                refinementQueryString = Text.format("and({0})", refinementQueryConditions.toString());
>>>>>>> upstream/master
                break;
            }
        }

        return refinementQueryString;
    }
}

export default SearchDataProvider;