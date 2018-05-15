import * as React from "react";
import ISearchContainerProps from "./ISearchResultsContainerProps";
import ISearchContainerState from "./ISearchResultsContainerState";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Logger, LogLevel } from "@pnp/logging";
import * as strings from "SearchWebPartStrings";
import { ISearchResults, IRefinementFilter, IRefinementValue, IRefinementResult } from "../../../models/ISearchResult";
import TilesList from "../TilesList/TilesList";
import "../SearchResultsWebPart.scss";
import FilterPanel from "../FilterPanel/FilterPanel";
import Paging from "../Paging/Paging";
import { Overlay } from "office-ui-fabric-react/lib/Overlay";
import { Label } from "office-ui-fabric-react";
import { Text, DisplayMode } from '@microsoft/sp-core-library';

export default class SearchResultsContainer extends React.Component<ISearchContainerProps, ISearchContainerState> {

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
            isComponentLoading: true,
            errorMessage: "",
            hasError: false,
            lastQuery: ""
        };

        this._onUpdateFilters = this._onUpdateFilters.bind(this);
        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<ISearchContainerProps> {

        const areResultsLoading = this.state.areResultsLoading;
        const items = this.state.results;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;
        const isComponentLoading = this.state.isComponentLoading;

        let renderWpContent: JSX.Element = null;
        let renderOverlay: JSX.Element = null;
        let renderCount: JSX.Element = null;

        
        if (!isComponentLoading && areResultsLoading) {
            renderOverlay = <div>
                <Overlay isDarkThemed={false} className="overlay">
                    <Spinner size={SpinnerSize.medium} />
                </Overlay>
            </div>;
        }

        if (this.props.showResultsCount && !this.state.areResultsLoading) {
            renderCount = <div className="searchWp__count"><label dangerouslySetInnerHTML={ {__html: Text.format(strings.CountMessage, this.state.resultCount , this.props.queryKeywords) }}></label></div>;
        }

        if (isComponentLoading) {
            renderWpContent = <Spinner size={SpinnerSize.large} label={strings.LoadingMessage} />;
        } else {

            if (hasError) {
                renderWpContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
            } else {

                if (items.RelevantResults.length === 0 ) {
                    
                    if (!this.props.showBlank) {

                        renderWpContent =
                            <div>
                                <FilterPanel availableFilters={this.state.availableFilters} onUpdateFilters={this._onUpdateFilters} refinersConfiguration={ this.props.refiners } /> 
                                { renderCount }
                                <div className="searchWp__noresult">{strings.NoResultMessage}</div>                                                  
                            </div>;
                    } else {
                        if (this.props.displayMode === DisplayMode.Edit) {
                            renderWpContent = <MessageBar messageBarType={ MessageBarType.info }>{ strings.ShowBlankEditInfoMessage }</MessageBar>;
                        }
                    }
                } else {
                    renderWpContent =

                        <div>
                            <FilterPanel availableFilters={this.state.availableFilters} onUpdateFilters={this._onUpdateFilters} refinersConfiguration={ this.props.refiners }/>
                            { renderCount }
                            { renderOverlay }                            
                            <TilesList items={items.RelevantResults} showFileIcon={this.props.showFileIcon} showCreatedDate={this.props.showCreatedDate} />
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
        }

        return (
            <div className="searchWp">
                { renderWpContent }
            </div>
        );
    }

    public async componentDidMount() {
        
        // Don't perform search is there is no keywords
        if (this.props.queryKeywords) {
            try {

                this.setState({
                    areResultsLoading: true,
                });

                this.props.searchDataProvider.selectedProperties = this.props.selectedProperties;

                const refinerManagedProperties = Object.keys(this.props.refiners).join(",");

                const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, refinerManagedProperties, this.state.selectedFilters, this.state.currentPage);
                const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);

                // Initial filters are just set once for the filter control during the component initialization
                // By this way, we are be able to select multiple values whithin a specific filter (OR condition). Otherwise, if we pass every time the new filters retrieved from new results,
                // previous values will overwritten preventing to select multiple values (default SharePoint behavior)
                this.setState({
                    results: searchResults,
                    resultCount: searchResults.TotalRows,
                    availableFilters: localizedFilters,
                    areResultsLoading: false,
                    isComponentLoading: false,
                    lastQuery: this.props.queryKeywords + this.props.searchDataProvider.queryTemplate + this.props.selectedProperties.join(',')
                });

            } catch (error) {

                Logger.write("[SearchContainer._componentDidMount()]: Error: " + error, LogLevel.Error);

                this.setState({
                    areResultsLoading: false,
                    isComponentLoading: false,
                    results: { RefinementResults: [], RelevantResults: [] },
                    hasError: true,
                    errorMessage: error.message
                });
            }
        } else {
            this.setState({
                areResultsLoading: false,
                isComponentLoading: false,
            });
        }
    }

    public async componentWillReceiveProps(nextProps: ISearchContainerProps) {

        let query = nextProps.queryKeywords + nextProps.searchDataProvider.queryTemplate + nextProps.selectedProperties.join(',');
        
        // New props are passed to the component when the search query has been changed
        if (JSON.stringify(this.props.refiners) !== JSON.stringify(nextProps.refiners)
            || this.props.maxResultsCount !== nextProps.maxResultsCount
            || this.state.lastQuery !== query
            || this.props.showFileIcon !== nextProps.showFileIcon
            || this.props.resultSourceId !== nextProps.resultSourceId
            || this.props.showCreatedDate !== nextProps.showCreatedDate
            || this.props.queryKeywords !== nextProps.queryKeywords
            || this.props.enableQueryRules !== nextProps.enableQueryRules) {

            // Don't perform search is there is no keywords
            if (nextProps.queryKeywords) {
                try {
                    // Clear selected filters on a new query or new refiners
                    this.setState({
                        selectedFilters: [],
                        areResultsLoading: true,
                    });

                    this.props.searchDataProvider.selectedProperties = nextProps.selectedProperties;

                    const refinerManagedProperties = Object.keys(nextProps.refiners).join(",");

                    // We reset the page number and refinement filters
                    const searchResults = await this.props.searchDataProvider.search(nextProps.queryKeywords, refinerManagedProperties, [], 1);
                    const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);               

                    this.setState({
                        results: searchResults,
                        resultCount: searchResults.TotalRows,
                        availableFilters: localizedFilters,
                        areResultsLoading: false,
                        lastQuery: query
                    });

                } catch (error) {

                    Logger.write("[SearchContainer._componentWillReceiveProps()]: Error: " + error, LogLevel.Error);

                    this.setState({
                        areResultsLoading: false,
                        isComponentLoading: false,
                        results: { RefinementResults: [], RelevantResults: [] },
                        hasError: true,
                        errorMessage: error.message
                    });
                }
            } else {
                this.setState({
                    areResultsLoading: false,
                    isComponentLoading: false,
                });
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

        const refinerManagedProperties = Object.keys(this.props.refiners).join(",");

        const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, refinerManagedProperties, newFilters, 1);

        this.setState({
            results: searchResults,
            areResultsLoading: false,
        });
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

        const refinerManagedProperties = Object.keys(this.props.refiners).join(",");

        const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, refinerManagedProperties, this.state.selectedFilters, pageNumber);

        this.setState({
            results: searchResults,
            areResultsLoading: false,
        });
    }

    /**
     * Translates all refinement results according the current culture
     * By default SharePoint stores the taxonomy values according to the current site language. Because we can't create a communication site in French (as of 08/12/2017)
     * we need to do the translation afterwards
     * @param rawFilters The raw refinement results to translate coming from SharePoint search results
     */
    private async _getLocalizedFilters(rawFilters: IRefinementResult[]): Promise<IRefinementResult[]> {
        
        let termsToLocalize: { uniqueIdentifier: string, termId: string, localizedTermLabel: string }[] = [];
        let udpatedFilters = [];

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

            // Process all terms in a single JSOM call for performance purpose. In general JSOM is pretty slow so we try to limit the number of calls...
            await this.props.taxonomyDataProvider.initialize();
            const termValues = await this.props.taxonomyDataProvider.getTermsById(termsToLocalize.map((t)=> { return t.termId; }));

            const termsEnumerator = termValues.getEnumerator();

            while (termsEnumerator.moveNext()) {

                const currentTerm = termsEnumerator.get_current();

                // Need to do this check in the case where the term indexed by the search doesn't exist anymore in the term store
                if (!currentTerm.get_serverObjectIsNull()) {

                    const termId = currentTerm.get_id();

                    // Check if retrieved term is part of terms to localize
                    const terms = termsToLocalize.filter((e) => { return e.termId === termId.toString(); });
                    if (terms.length > 0) {
                        termsToLocalize = termsToLocalize.map((term) => {
                            if (term.termId === terms[0].termId) {
                                return {
                                    uniqueIdentifier: term.uniqueIdentifier,
                                    termId: termId.toString(),
                                    localizedTermLabel: termsEnumerator.get_current().get_name(),
                                };
                            } else {
                                return term;
                            }
                        });
                    }
                }
            }

            // Update original filters with localized values
            rawFilters.map((filter) => {
                let updatedValues = [];

                filter.Values.map((value) => {
                    const existingFilters = termsToLocalize.filter((e) => { return e.uniqueIdentifier === value.RefinementToken; });
                    if (existingFilters.length > 0) {
                        updatedValues.push({
                            RefinementCount: value.RefinementCount,
                            RefinementName: existingFilters[0].localizedTermLabel,
                            RefinementToken: value.RefinementToken,
                            RefinementValue: existingFilters[0].localizedTermLabel,
                        } as IRefinementValue);
                    } else {

                        // Keep only terms (L0). The crawl property ows_taxid_xxx return term sets too.
                        if (!/(GTSet|GPP|GP0)/i.test(value.RefinementName))  {
                            updatedValues.push(value);
                        }
                    }
                });

                udpatedFilters.push({
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
            udpatedFilters = rawFilters;
        }

        return udpatedFilters;
    }
}