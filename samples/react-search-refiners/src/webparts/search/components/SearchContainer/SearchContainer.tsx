import * as React from "react";
import ISearchContainerProps from "./ISearchContainerProps";
import ISearchContainerState from "./ISearchContainerState";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Logger, LogLevel } from "sp-pnp-js";
import * as strings from "SearchWebPartStrings";
import { ISearchResults, IRefinementFilter } from "../../../models/ISearchResult";
import TilesList from "../TilesList/TilesList";
import "../SearchWebPart.scss";
import FilterPanel from "../FilterPanel/FilterPanel";
import Paging from "../Paging/Paging";

export default class SearchContainer extends React.Component<ISearchContainerProps,ISearchContainerState> {

    public constructor(props) {

        super(props);

        // Set the initial state
        this.state = {
            results: { 
                        RefinementResults: [], 
                        RelevantResults: [] 
                     },
            selectedFilters: [],
            currentPage: 1,
            areResultsLoading: true,
            errorMessage: "",
            hasError: false,
        };

        this._onUpdateFilters = this._onUpdateFilters.bind(this);
        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<ISearchContainerProps> {

        const areResultsLoading = this.state.areResultsLoading;
        const items = this.state.results;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;

        let wpContent: JSX.Element = null;

        if (areResultsLoading) {
            wpContent =  <Spinner size={ SpinnerSize.large } label={ strings.LoadingMessage } />; 
        } else {

            if (hasError) {

                wpContent = <MessageBar messageBarType= { MessageBarType.error }>{ errorMessage }</MessageBar>;

            } else {

                if (items.RelevantResults.length === 0) {

                    wpContent = 
                    <div>
                        <FilterPanel availableFilters={ items.RefinementResults } onUpdateFilters={ this._onUpdateFilters }/>
                        <div className="searchWp__noresult">{ strings.NoResultMessage }</div>
                    </div>;

                } else {     
                        
                    wpContent = 
                      
                          <div>
                              <FilterPanel availableFilters={ items.RefinementResults } onUpdateFilters={ this._onUpdateFilters }/>     
                              <TilesList items={ items.RelevantResults }/>
                              { this.props.showPaging ?
                                <Paging 
                                    totalItems={ items.TotalRows }
                                    itemsCountPerPage={ this.props.maxResultsCount } 
                                    onPageUpdate={ this._onPageUpdate } 
                                    currentPage={ this.state.currentPage }/> 
                                : null
                              }
                          </div>;   
                }
            }          
        }

        return (
            <div className="searchWp">                            
                { wpContent } 
            </div>
        );
    }

    public componentDidMount() {

        // Async calls
        this._getSearchResults(this.props.searchQuery, this.props.refiners, this.state.selectedFilters, this.state.currentPage);
    }

    public componentWillReceiveProps(nextProps: ISearchContainerProps): void {

        // Intermediate state to display the spinner before an async query
        this.setState({
            areResultsLoading: true,
        });

        // We reset the page number and refinement filters
        this._getSearchResults(nextProps.searchQuery, nextProps.refiners, [], 1);
    }

    private _getSearchResults(searchQuery: string, refiners: string, refinementFilters?: IRefinementFilter[], pageNumber?: number) {
   
        this.props.dataProvider.search(searchQuery, refiners, refinementFilters, pageNumber).then((searchResults: ISearchResults) => {
            
            this.setState({
                results: searchResults,
                areResultsLoading: false,
            });

        }).catch((error) => {
            Logger.write("[SearchContainer._getSearchResults()]: Error: " + error, LogLevel.Error);

            this.setState({
                areResultsLoading: false,
                results: { RefinementResults: [], RelevantResults: [] },
                hasError: true,
                errorMessage: error.message,
            });
        });
    }

    /**
     * Callback function to apply new filters coming from the filter panel child component
     * @param newFilters The new filters to apply
     */
    private _onUpdateFilters(newFilters: IRefinementFilter[]) {

        this._getSearchResults(this.props.searchQuery, this.props.refiners, newFilters, 1);

        this.setState({
            selectedFilters: newFilters,
            currentPage: 1,
        });
    }

    /**
     * Callback function update search results according the page number
     * @param pageNumber The page mumber to get
     */
    private _onPageUpdate(pageNumber: number) {
        this._getSearchResults(this.props.searchQuery, this.props.refiners, this.state.selectedFilters, pageNumber);  
        
        this.setState({
            currentPage: pageNumber,
        });
    }
}