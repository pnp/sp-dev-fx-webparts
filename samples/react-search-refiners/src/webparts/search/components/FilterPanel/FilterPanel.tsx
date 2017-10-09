import * as React from "react";
import IFilterPanelProps from "./IFilterPanelProps";
import IFilterPanelState from "./IFilterPanelState";
import { PrimaryButton, DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as strings from "SearchWebPartStrings";
import { IRefinementResult, IRefinementValue, IRefinementFilter } from "../../../models/ISearchResult";
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Text } from "@microsoft/sp-core-library";
import "../SearchWebPart.scss";
import * as update from "immutability-helper";

export default class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {
    
    private _initialFilters: IRefinementResult[];

    public constructor(props) {
        super(props);

        // The initialFilters are just set once and never updated afterwards so we don't need to put them in the component state.
        this._initialFilters = this.props.availableFilters;

        this.state = {
            showPanel: false,
            selectedFilters: [],
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);
        this._addFilter = this._addFilter.bind(this);
        this._removeFilter = this._removeFilter.bind(this);
        this._isInFilterSelection = this._isInFilterSelection.bind(this);
        this._applyAllfilters = this._applyAllfilters.bind(this);
        this._removeAllFilters = this._removeAllFilters.bind(this);
    }

    public render(): React.ReactElement<IFilterPanelProps> {

        const renderAvailableFilters: JSX.Element[] = this._initialFilters.map((filter, i) => {
            
            return (
            <div key= { i }>
                <div className="filterPanel__filterProperty">
                    {
                        filter.Values.map((refinementValue: IRefinementValue, j) => {

                            // Create a new IRefinementFilter with only the current refinement information
                            const currentRefinement: IRefinementFilter = {
                                FilterName: filter.FilterName,
                                Value: refinementValue,
                            };

                            return (
                                <Toggle
                                key={ j }
                                checked= { this._isInFilterSelection(currentRefinement) }
                                disabled={ false }
                                label={ Text.format(refinementValue.RefinementValue + " ({0})",  refinementValue.RefinementCount)} 
                                onChanged= {(checked: boolean) => {                                
                                    // Every time we chek/uncheck a filter, a complete new search is performed
                                    checked ? this._addFilter(currentRefinement): this._removeFilter(currentRefinement);
                                }} />
                            );
                        })
                    }
                </div>
                { 
                    (this._initialFilters.length !== i + 1) ? <div className="divider"/> : null
                }
            </div>
            );
        });

        const renderSelectedFilters: JSX.Element[] = this.state.selectedFilters.map((filter) => {

            return (
                <PrimaryButton
                    key ={filter.Value.RefinementToken }
                    className="searchWp__selectedFilters__filterBtn"                   
                    iconProps={ { iconName: 'StatusErrorFull' } }
                    text={ filter.Value.RefinementName }
                    onClick={ ()=> { this._removeFilter(filter); }}
                />           
                );
        });
        
        return (
            <div>
                <DefaultButton
                    className="searchWp__filterResultBtn"
                    iconProps={ { iconName: 'Filter' } }
                    text={ strings.FilterResultsButtonLabel }
                    onClick= { this._onTogglePanel }
                />            
                {  (this.state.selectedFilters.length > 0) ? 

                        <div className="searchWp__selectedFilters">
                            <Label className="searchWp__selectedFilterLbl">{ strings.SelectedFiltersLabel }</Label>
                            { renderSelectedFilters } 
                        </div>  
                    : null                    
                }
                <Panel
                    className="filterPanel"
                    isOpen={ this.state.showPanel }
                    type={ PanelType.smallFixedFar }
                    isBlocking={ false }
                    isLightDismiss= { true }
                    onDismiss={ this._onClosePanel }
                    headerText={ strings.FilterPanelTitle }
                    closeButtonAriaLabel='Close' 
                    onRenderBody={() => { 
                        if(this._initialFilters.length > 0) {
                            return (
                                <div className="filterPanel__body">
                                    <Toggle 
                                        onText={ strings.RemoveAllFiltersLabel } 
                                        offText={ strings.ApplyAllFiltersLabel } 
                                        onChanged= {(checked: boolean) => {                                
                                            checked ? this._applyAllfilters() : this._removeAllFilters();
                                        }}
                                        checked= { this.state.selectedFilters.length === 0 ? false : true }/>
                                    <div className="divider"/>
                                    { renderAvailableFilters }
                                </div>
                            );
                        } else {
                            return (
                                <div className="filterPanel__body">
                                    { strings.NoFilterConfiguredLabel }
                                </div>
                            );
                        }
                    }}>                
                </Panel>
            </div>
        );
    }

    private _onClosePanel() {
        this.setState({ showPanel: false });
    }
    
    private _onTogglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    private _addFilter(filterToAdd: IRefinementFilter): void {

        // Add the filter to the selected filters collection
        let newFilters = update(this.state.selectedFilters, {$push: [filterToAdd]});
        this._applyFilters(newFilters);
    }

    private _removeFilter(filterToRemove: IRefinementFilter): void {

        // Remove the filter from the selected filters collection
        const indexToRemove = this.state.selectedFilters.indexOf(filterToRemove);
        let newFilters = update(this.state.selectedFilters, {$splice: [[indexToRemove, 1]]});

        this._applyFilters(newFilters);
    }

    private _applyAllfilters(): void {

        let allFilters: IRefinementFilter[] = [];

        this._initialFilters.map((filter) => {

            filter.Values.map((refinementValue: IRefinementValue, index) => { 
                allFilters.push({FilterName: filter.FilterName, Value: refinementValue});
            });            
        });

        this._applyFilters(allFilters);
    }

    private _removeAllFilters(): void {
        this._applyFilters([]);
    }

    /**
     * Inner method to effectivly apply the refiners by calling back the parent component
     * @param selectedFilters The filters to apply
     */
    private _applyFilters(selectedFilters: IRefinementFilter[]): void {

        this.props.onUpdateFilters(selectedFilters);

        // Save the selected filters
        this.setState({
            selectedFilters: selectedFilters,
        });
    }
    
    /**
     * Checks if the current filter is present in the list of the selected filters
     * @param filterToCheck The filter to check
     */
    private _isInFilterSelection(filterToCheck: IRefinementFilter): boolean {

        let newFilters = this.state.selectedFilters.filter((filter) => {         
            return filter.Value.RefinementToken === filterToCheck.Value.RefinementToken;            
        });

        return newFilters.length === 0 ? false : true;
    }
}