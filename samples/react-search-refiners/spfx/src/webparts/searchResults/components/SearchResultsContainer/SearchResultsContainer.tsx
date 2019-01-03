import * as React from 'react';
import ISearchContainerProps from './ISearchResultsContainerProps';
import ISearchContainerState from './ISearchResultsContainerState';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from 'office-ui-fabric-react/lib/Shimmer';
import { Logger, LogLevel } from '@pnp/logging';
import * as strings from 'SearchResultsWebPartStrings';
import { IRefinementFilter, IRefinementValue, IRefinementResult } from '../../../../models/ISearchResult';
import Paging from '../Paging/Paging';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import SearchResultsTemplate from '../Layouts/SearchResultsTemplate';
import styles from '../SearchResultsWebPart.module.scss';
import { SortPanel } from '../SortPanel';
import { SortDirection } from "@pnp/sp";
import { ITermData, ITerm } from '@pnp/sp-taxonomy';
import LocalizationHelper from '../../../../helpers/LocalizationHelper';
import { Text } from '@microsoft/sp-core-library';


declare var System: any;
let FilterPanel = null;

export default class SearchResultsContainer extends React.Component<ISearchContainerProps, ISearchContainerState> {

    private _searchWpRef: HTMLElement;

    public constructor(props) {
        super(props);

        // Set the initial state
        this.state = {
            results: {
                RefinementResults: [],
                RelevantResults: []
            },
            resultCount: 0,
            selectedFilters: [],
            availableFilters: [],
            currentPage: 1,
            areResultsLoading: false,
            errorMessage: '',
            hasError: false,
            lastQuery: '',
            mountingNodeGuid: this.getGUID(),
        };

        this._onUpdateFilters = this._onUpdateFilters.bind(this);
        this._onUpdateSort = this._onUpdateSort.bind(this);
        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<ISearchContainerProps> {

        const areResultsLoading = this.state.areResultsLoading;
        const items = this.state.results;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;

        let renderWpContent: JSX.Element = null;
        let renderOverlay: JSX.Element = null;
        let renderWebPartTitle: JSX.Element = null;

        if (areResultsLoading) {

            if (items.RelevantResults.length > 0) {
                renderOverlay = <div>
                    <Overlay isDarkThemed={false} className={styles.overlay}>
                        <Spinner size={SpinnerSize.medium} />
                    </Overlay>
                </div>;
            } else {
                let i = 0;
                let renderShimmerElements: JSX.Element[] = [];
                while (i < 4) {
                    renderShimmerElements.push(
                        <Shimmer 
                        key={i}
                        customElementsGroup={this._getShimmerElements()} 
                        width="100%"
                        style={{ marginBottom: "20px" }}                    
                    />);
                    i++;
                }

                renderWpContent = <div>{ renderShimmerElements }</div>;
            }
        }

        
        if (this.props.webPartTitle && this.props.webPartTitle.length > 0) {
            renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
        }

        const sortPanel = <SortPanel 
                                onUpdateSort={this._onUpdateSort} 
                                sortableFieldsConfiguration={this.props.sortableFields} 
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField} />; 
        if (hasError) {
            renderWpContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
        } else {

            const currentQuery = this.props.queryKeywords + this.props.searchService.queryTemplate + this.props.selectedProperties.join(',');
            const renderFilterPanel = this.state.availableFilters && this.state.availableFilters.length > 0 ? 
                                    <FilterPanel 
                                        availableFilters={this.state.availableFilters} 
                                        onUpdateFilters={this._onUpdateFilters} 
                                        refinersConfiguration={this.props.refiners} 
                                        resetSelectedFilters={ this.state.lastQuery !== currentQuery ? true : false}
                                    /> : <span />;                                   

            if (items.RelevantResults.length === 0) {

                // Check if a search request has already been entered (to distinguish the first use scenario)
                if (!this.props.showBlank && this.state.lastQuery && !this.state.areResultsLoading) {
                    renderWpContent =
                        <div>
                            {renderWebPartTitle}
                            <div className={styles.searchWp__buttonBar}>{sortPanel}{renderFilterPanel}</div>
                            <div className={styles.searchWp__noresult}>{strings.NoResultMessage}</div>
                        </div>;
                } else {
                    if (this.props.displayMode === DisplayMode.Edit && !areResultsLoading) {
                        renderWpContent = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankEditInfoMessage}</MessageBar>;
                    }
                }
            } else {

                let searchResultTemplate = <div></div>;
                 if(!this.props.useCodeRenderer) {
                    searchResultTemplate =  (
                        <SearchResultsTemplate
                            templateService={this.props.templateService}
                            templateContent={this.props.templateContent}
                            templateContext={
                                {
                                    items: this.state.results.RelevantResults,
                                    promotedResults: this.state.results.PromotedResults,
                                    totalRows: this.state.resultCount,
                                    keywords: this.props.queryKeywords,
                                    showResultsCount: this.props.showResultsCount,
                                    siteUrl: this.props.context.pageContext.site.serverRelativeUrl,
                                    webUrl: this.props.context.pageContext.web.serverRelativeUrl,
                                    maxResultsCount: this.props.maxResultsCount,
                                    actualResultsCount: items.RelevantResults.length,
                                    strings: strings
                                }
                            }
                        />);
                }
                renderWpContent =
                    <div>
                        {renderWebPartTitle}
                        <div className={styles.searchWp__buttonBar}>{sortPanel}{renderFilterPanel}</div>
                        {renderOverlay}
                        <div id={`pnp-search-render-node-${this.state.mountingNodeGuid}`} />
                        {searchResultTemplate}
                        {this.props.showPaging ?
                            <Paging
                                totalItems={items.TotalRows}
                                itemsCountPerPage={this.props.maxResultsCount}
                                onPageUpdate={this._onPageUpdate}
                                currentPage={this.state.currentPage} />
                            : null
                        }
                    </div>;
            }
        }
        
        return (
            <div className={styles.searchWp}>
                <div tabIndex={-1} ref={ (ref) => { this._searchWpRef = ref; }}></div>
                {renderWpContent}
            </div>
        );
    }

    public async componentDidMount() {

        // Don't perform search if there are no keywords
        if (this.props.queryKeywords) {
            try {

                this.setState({
                    areResultsLoading: true,
                });

                this.props.searchService.selectedProperties = this.props.selectedProperties;

                const refinerManagedProperties = this.props.refiners.map(e => { return e.refinerName ;}).join(',');

                const searchResults = await this.props.searchService.search(this.props.queryKeywords, refinerManagedProperties, this.state.selectedFilters, this.state.currentPage);
                const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);

                if (localizedFilters && localizedFilters.length > 0) {
                    const filterPanelComponent = await import(
                        /* webpackChunkName: 'search-filterpanel' */
                        '../FilterPanel'
                    );
                    FilterPanel = filterPanelComponent.FilterPanel;
                }

                this.setState({
                    results: searchResults,
                    resultCount: searchResults.TotalRows,
                    availableFilters: localizedFilters,
                    areResultsLoading: false,
                    lastQuery: this.props.queryKeywords + this.props.searchService.queryTemplate + this.props.selectedProperties.join(',')
                });
                this.handleResultUpdateBroadCast(searchResults);

            } catch (error) {

                Logger.write('[SearchContainer._componentDidMount()]: Error: ' + error, LogLevel.Error);

                this.setState({
                    areResultsLoading: false,
                    results: { RefinementResults: [], RelevantResults: [] },
                    hasError: true,
                    errorMessage: error.message
                });
                this.handleResultUpdateBroadCast({ RefinementResults: [], RelevantResults: [] });
            }
        } else {
            this.setState({
                areResultsLoading: false
            });
        }
    }

    public async componentWillReceiveProps(nextProps: ISearchContainerProps) {

        let query = nextProps.queryKeywords + nextProps.searchService.queryTemplate + nextProps.selectedProperties.join(',');

        // New props are passed to the component when the search query has been changed
        if (JSON.stringify(this.props.refiners) !== JSON.stringify(nextProps.refiners)
            || JSON.stringify(this.props.sortableFields) !== JSON.stringify(nextProps.sortableFields)
            || this.props.sortList !== nextProps.sortList
            || this.props.maxResultsCount !== nextProps.maxResultsCount
            || this.state.lastQuery !== query
            || this.props.resultSourceId !== nextProps.resultSourceId
            || this.props.queryKeywords !== nextProps.queryKeywords
            || this.props.enableQueryRules !== nextProps.enableQueryRules) {

            // Don't perform search is there is no keywords
            if (nextProps.queryKeywords) {
                try {
                    // Clear selected filters on a new query or new refiners
                    this.setState({
                        selectedFilters: [],
                        areResultsLoading: true,
                        hasError: false,
                        errorMessage: ""
                    });

                    this.props.searchService.selectedProperties = nextProps.selectedProperties;

                    const refinerManagedProperties = nextProps.refiners.map(e => { return e.refinerName ;}).join(',');

                    // Reset sortlist
                    this.props.searchService.sortList = nextProps.sortList;

                    // We reset the page number and refinement filters
                    const searchResults = await this.props.searchService.search(nextProps.queryKeywords, refinerManagedProperties, [], 1);
                    const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);

                    if (FilterPanel === null && localizedFilters && localizedFilters.length > 0) {
                        const filterPanelComponent = await import(
                            /* webpackChunkName: 'search-filterpanel' */
                            '../FilterPanel'
                        );
                        FilterPanel = filterPanelComponent.FilterPanel;
                    }

                    this.setState({
                        results: searchResults,
                        resultCount: searchResults.TotalRows,
                        availableFilters: localizedFilters,
                        areResultsLoading: false,
                        currentPage: 1,
                        lastQuery: query
                    });
                    this.handleResultUpdateBroadCast(searchResults);

                } catch (error) {

                    Logger.write('[SearchContainer._componentWillReceiveProps()]: Error: ' + error, LogLevel.Error);

                    this.setState({
                        areResultsLoading: false,
                        results: { RefinementResults: [], RelevantResults: [] },
                        hasError: true,
                        errorMessage: error.message
                    });
                    this.handleResultUpdateBroadCast({ RefinementResults: [], RelevantResults: [] });
                }
            } else {
                this.setState({
                    areResultsLoading: false,
                    lastQuery: '',
                    results: { RefinementResults: [], RelevantResults: [] },
                });
                this.handleResultUpdateBroadCast({ RefinementResults: [], RelevantResults: [] });
            }
        } else {
            // Refresh the template without making a new search query because we don't need to
            if (this.props.templateContent !== nextProps.templateContent ||
                this.props.showResultsCount !== nextProps.showResultsCount) {

                // Reset template errors if it has
                if (this.state.hasError) {
                    this.setState({
                        hasError: false,
                    });
                } else {
                    // We don't use a state variable for the template since it is passed from props 
                    // so we force a re render to apply the new template
                    this.forceUpdate();
                }
            }
        }
    }

    /**
     * Callback function to apply new filters coming from the filter panel child component
     * @param newFilters The new filters to apply
     */
    private async _onUpdateFilters(newFilters: IRefinementFilter[]) {

        // Get back to the first page when new filters have been selected
        this.setState({
            selectedFilters: newFilters,
            currentPage: 1,
            areResultsLoading: true,
        });

        const refinerManagedProperties = this.props.refiners.map(e => { return e.refinerName ;}).join(',');

        const searchResults = await
        this.props.searchService.search(this.props.queryKeywords, refinerManagedProperties, newFilters, 1);
        const localizedFilters = await
        this._getLocalizedFilters(searchResults.RefinementResults);

        this.setState({
            resultCount: searchResults.TotalRows,
            results: searchResults,
            availableFilters: localizedFilters,
            areResultsLoading: false,
        });
        this.handleResultUpdateBroadCast(searchResults);
    }

    /**
     * Callback function to apply new sort configuration coming from the sort panel child component
     * @param newFilters The new filters to apply
     */
    private async _onUpdateSort(sortDirection: SortDirection, sortField?: string) {

        if (sortField) {
            // Get back to the first page when new sorting has been selected
            this.setState({
                sortField: sortField,
                sortDirection: sortDirection,
                currentPage: 1,
                areResultsLoading: true,
                hasError:false,
                errorMessage:null
            });

            const refinerManagedProperties = this.props.refiners.map(e => { return e.refinerName ;}).join(',');
                       
            this.props.searchService.sortList = [{Property: sortField, Direction: sortDirection}];

            try
            {
                const searchResults = await this.props.searchService.search(this.props.queryKeywords, refinerManagedProperties, this.state.selectedFilters, 1);

                this.setState({
                    results: searchResults,
                    areResultsLoading: false,
                });
                this.handleResultUpdateBroadCast(searchResults);
            }
            catch(error) {
                Logger.write('[SearchContainer._onUpdateSort()]: Error: ' + error, LogLevel.Error);
                const errorMessage = /\"value\":\"[^:]+: SortList\.\"/.test(error.message) ? strings.Sort.SortErrorMessage : error.message;

                this.setState({
                    areResultsLoading: false,
                    results: { RefinementResults: [], RelevantResults: [] },
                    hasError: true,
                    errorMessage: errorMessage
                });
                this.handleResultUpdateBroadCast({ RefinementResults: [], RelevantResults: [] });
            }
        }
    }

    /**
     * Callback function update search results according the page number
     * @param pageNumber The page mumber to get
     */
    private async _onPageUpdate(pageNumber: number) {

        this.setState({
            currentPage: pageNumber,
            areResultsLoading: true,
        });

        this._searchWpRef.focus();

        const refinerManagedProperties = this.props.refiners.map(e => { return e.refinerName ;}).join(',');

        const searchResults = await this.props.searchService.search(this.props.queryKeywords, refinerManagedProperties, this.state.selectedFilters, pageNumber);

        this.setState({
            results: searchResults,
            areResultsLoading: false,
        });
        this.handleResultUpdateBroadCast(searchResults);
    }

    /**
     * Translates all refinement results according the current culture
     * By default SharePoint stores the taxonomy values according to the current site language. Because we can't create a communication site in French (as of 08/12/2017)
     * we need to do the translation afterwards
     * @param rawFilters The raw refinement results to translate coming from SharePoint search results
     */
    private async _getLocalizedFilters(rawFilters: IRefinementResult[]): Promise<IRefinementResult[]> {

        // Get the current lcid according to current page language
        const lcid = LocalizationHelper.getLocaleId(this.props.context.pageContext.cultureInfo.currentUICultureName);

        let termsToLocalize: { uniqueIdentifier: string, termId: string, localizedTermLabel: string }[] = [];
        let updatedFilters = [];
        let localizedTerms = [];

        rawFilters.map((filterResult) => {

            filterResult.Values.map((value) => {

                // Check if the value seems to be a taxonomy term
                // If the field value looks like a taxonomy value, we get the label according to the current locale
                // To get this type of values, we need to map the RefinableStringXXX properties with ows_taxId_xxx crawled properties
                const isTerm = /L0\|#(.+)\|/.test(value.RefinementValue);

                if (isTerm) {
                    const termId = /L0\|#(.+)\|/.exec(value.RefinementValue)[1].substr(1);

                    // The uniqueIdentifier is here to be able to match the original value with the localized one
                    // We use the refinement token, which is unique
                    termsToLocalize.push({
                        uniqueIdentifier: value.RefinementToken,
                        termId: termId,
                        localizedTermLabel: null
                    });
                }
            });
        });

        if (termsToLocalize.length > 0) {

            // Get the terms from taxonomy
            // If a term doesn't exist anymore, it won't be retrieved by the API so the termValues count could be less than termsToLocalize count
            const termValues = await this.props.taxonomyService.getTermsById(termsToLocalize.map((t) => { return t.termId; }));

            termsToLocalize.map((termToLocalize) => {

                // Check if the term has been retrieved from taxonomy (i.e. exists)
                const termsFromTaxonomy = termValues.filter((taxonomyTerm: ITerm & ITermData) => {
                    const termIdFromTaxonomy = taxonomyTerm.Id.substring(taxonomyTerm.Id.indexOf('(') + 1, taxonomyTerm.Id.indexOf(')'));
                    return termIdFromTaxonomy === termToLocalize.termId;
                });

                if (termsFromTaxonomy.length > 0) {

                    // Should be always unique since we can't have two terms with the same ids
                    const termFromTaxonomy: ITerm & ITermData = termsFromTaxonomy[0];

                    // It supposes the 'Label' property has been selected in the underlying call
                    // A term always have a default label so the collection can't be empty
                    const localizedLabel = termFromTaxonomy["Labels"]._Child_Items_.filter((label: any) => {
                        return label.Language === lcid;
                    });
                    
                    localizedTerms.push({
                        uniqueIdentifier: termToLocalize.uniqueIdentifier,
                        termId: termToLocalize.termId,
                        localizedTermLabel: localizedLabel.length > 0 ? localizedLabel[0].Value : termFromTaxonomy.Name
                    });
                } else {
                    localizedTerms.push({
                        uniqueIdentifier: termToLocalize.uniqueIdentifier,
                        termId: termToLocalize.termId,
                        localizedTermLabel: Text.format(strings.TermNotFound, termToLocalize.termId)
                    });
                }
            });

            // Update original filters with localized values
            rawFilters.map((filter) => {
                let updatedValues = [];

                filter.Values.map((value) => {
                    const existingFilters = localizedTerms.filter((e) => { return e.uniqueIdentifier === value.RefinementToken; });
                    if (existingFilters.length > 0) {
                        updatedValues.push({
                            RefinementCount: value.RefinementCount,
                            RefinementName: existingFilters[0].localizedTermLabel,
                            RefinementToken: value.RefinementToken,
                            RefinementValue: existingFilters[0].localizedTermLabel,
                        } as IRefinementValue);
                    } else {

                        // Keep only terms (L0). The crawl property ows_taxid_xxx return term sets too.
                        if (!/(GTSet|GPP|GP0)/i.test(value.RefinementName)) {
                            updatedValues.push(value);
                        }
                    }
                });

                updatedFilters.push({
                    FilterName: filter.FilterName,
                    Values: updatedValues.sort((a: IRefinementValue, b: IRefinementValue) => {
                        if (a.RefinementName) {
                            return a.RefinementName.localeCompare(b.RefinementName);
                        } else {
                            return 0;
                        }
                    })
                } as IRefinementResult);
            });

        } else {
            // Return filters without any modification
            updatedFilters = rawFilters;
        }

        return updatedFilters;
    }

    private _getShimmerElements(): JSX.Element {
        return <div style={{ display: 'flex' }}>
                  <ShimmerElementsGroup
                    shimmerElements={[
                        { type: ElemType.line, width: 40, height: 40 },
                        { type: ElemType.gap, width: 10, height: 40 }
                    ]}
                    />
                    <ShimmerElementsGroup
                    flexWrap={true}
                    width="100%"
                    shimmerElements={[
                        { type: ElemType.line, width: '100%', height: 10 },
                        { type: ElemType.line, width: '75%', height: 10 },
                        { type: ElemType.gap, width: '25%', height: 20 }
                    ]}
                    />
                </div>;
    }

    private handleResultUpdateBroadCast(results) {
        this.props.resultService.updateResultData(results, this.props.rendererId, `pnp-search-render-node-${this.state.mountingNodeGuid}`, this.props.customTemplateFieldValues);
    }

    /**
     * Gets a random GUID value
     *
     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    /* tslint:disable no-bitwise */
    private getGUID(): string {
        let d = new Date().getTime();
        const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
}