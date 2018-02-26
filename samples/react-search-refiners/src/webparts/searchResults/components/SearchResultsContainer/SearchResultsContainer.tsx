import * as React from "react";
import ISearchContainerProps from "./ISearchResultsContainerProps";
import ISearchContainerState from "./ISearchResultsContainerState";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Logger, LogLevel } from "sp-pnp-js";
import * as strings from "SearchWebPartStrings";
import { ISearchResults, IRefinementFilter } from "../../../models/ISearchResult";
import TilesList from "../TilesList/TilesList";
import "../SearchResultsWebPart.scss";
import FilterPanel from "../FilterPanel/FilterPanel";
import Paging from "../Paging/Paging";
import { Overlay } from "office-ui-fabric-react/lib/Overlay";
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";

export default class SearchResultsContainer extends React.Component<ISearchContainerProps, ISearchContainerState> {

    public constructor(props) {
        super(props);
        // Set the initial state
        this.state = {
            results: {
                RefinementResults: [],
                RelevantResults: []
            },
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

        let wpContent: JSX.Element = null;
        let renderOverlay = null;

        if (!isComponentLoading && areResultsLoading) {
            renderOverlay = <div>
                <Overlay isDarkThemed={false} className="overlay">
                </Overlay>
            </div>;
        }

        if (isComponentLoading) {
            wpContent = <Spinner size={SpinnerSize.large} label={strings.LoadingMessage} />;
        } else {

            if (hasError) {
                wpContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
            } else {

                if (items.RelevantResults.length === 0) {
                    wpContent =
                        <div>
                            <FilterPanel availableFilters={this.state.availableFilters} onUpdateFilters={this._onUpdateFilters} />
                            <div className="searchWp__noresult">{strings.NoResultMessage}</div>
                        </div>;
                } else {
                    wpContent =

                        <div>
                            <FilterPanel availableFilters={this.state.availableFilters} onUpdateFilters={this._onUpdateFilters} />
                            {renderOverlay}
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
                {wpContent}
            </div>
        );
    }

    public async componentDidMount() {
        
        try {

            this.setState({
                areResultsLoading: true,
            });

            this.props.searchDataProvider.selectedProperties = this.props.selectedProperties;

            const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, this.props.refiners, this.state.selectedFilters, this.state.currentPage);

            // Initial filters are just set once for the filter control during the component initialization
            // By this way, we are be able to select multiple values whithin a specific filter (OR condition). Otherwise, if we pass every time the new filters retrieved from new results,
            // previous values will overwritten preventing to select multiple values (default SharePoint behavior)
            this.setState({
                results: searchResults,
                availableFilters: searchResults.RefinementResults,
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
    }

    public async componentWillReceiveProps(nextProps: ISearchContainerProps) {

        let query = nextProps.queryKeywords + nextProps.searchDataProvider.queryTemplate + nextProps.selectedProperties.join(',');
        // New props are passed to the component when the search query has been changed
        if (this.props.refiners.toString() !== nextProps.refiners.toString()
            || this.props.maxResultsCount !== nextProps.maxResultsCount
            || this.state.lastQuery !== query
            || this.props.showFileIcon !== nextProps.showFileIcon
            || this.props.resultSourceId !== nextProps.resultSourceId
            || this.props.showCreatedDate !== nextProps.showCreatedDate
            || this.props.queryKeywords !== nextProps.queryKeywords
            || this.props.enableQueryRules !== nextProps.enableQueryRules) {

            try {
                // Clear selected filters on a new query or new refiners
                this.setState({
                    selectedFilters: [],
                    areResultsLoading: true,
                });

                this.props.searchDataProvider.selectedProperties = nextProps.selectedProperties;
                // We reset the page number and refinement filters
                const searchResults = await this.props.searchDataProvider.search(nextProps.queryKeywords, nextProps.refiners, [], 1);

                this.setState({
                    results: searchResults,
                    availableFilters: searchResults.RefinementResults,
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

        const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, this.props.refiners, newFilters, 1);

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

        const searchResults = await this.props.searchDataProvider.search(this.props.queryKeywords, this.props.refiners, this.state.selectedFilters, pageNumber);

        this.setState({
            results: searchResults,
            areResultsLoading: false,
        });
    }
}