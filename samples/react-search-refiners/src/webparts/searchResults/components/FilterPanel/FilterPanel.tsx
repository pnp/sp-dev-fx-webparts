import * as React from                                                 'react';
import IFilterPanelProps from                                          './IFilterPanelProps';
import IFilterPanelState from                                          './IFilterPanelState';
import { Panel, PanelType } from                                       'office-ui-fabric-react/lib/Panel';
import { Checkbox } from                                               'office-ui-fabric-react/lib/Checkbox';
import { Toggle } from                                                 'office-ui-fabric-react/lib/Toggle';
import * as strings from                                               'SearchWebPartStrings';
import { IRefinementValue, IRefinementFilter } from '../../../../models/ISearchResult';
import { Label } from                                                  'office-ui-fabric-react/lib/Label';
import { Text } from                                                   '@microsoft/sp-core-library';
import                                                                 '../SearchResultsWebPart.scss';
import * as update from                                                'immutability-helper';
import {
    GroupedList,
    IGroup,
    IGroupDividerProps
} from                                                                 'office-ui-fabric-react/lib/components/GroupedList/index';
import { Scrollbars } from                                             'react-custom-scrollbars';
import { ActionButton } from                                           'office-ui-fabric-react/lib/Button';

export default class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            showPanel: false,
            selectedFilters: [],
            expandedGroups: [],
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);
        this._addFilter = this._addFilter.bind(this);
        this._removeFilter = this._removeFilter.bind(this);
        this._isInFilterSelection = this._isInFilterSelection.bind(this);
        this._applyAllfilters = this._applyAllfilters.bind(this);
        this._removeAllFilters = this._removeAllFilters.bind(this);
        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): React.ReactElement<IFilterPanelProps> {

        let items: JSX.Element[] = [];
        let groups: IGroup[] = [];

        if (this.props.availableFilters.length === 0) return <span />;

        // Initialize the Office UI grouped list
        this.props.availableFilters.map((filter, i) => {

            groups.push({
                key: i.toString(),
                name: this.props.refinersConfiguration[filter.FilterName],
                count: 1,
                startIndex: i,
                isDropEnabled: true,
                isCollapsed: this.state.expandedGroups.indexOf(i) === -1 ? true : false,
            });

            items.push(
                <div key={i}>
                    <div className='filterPanel__filterProperty'>
                        {
                            filter.Values.map((refinementValue: IRefinementValue, j) => {

                                // Create a new IRefinementFilter with only the current refinement information
                                const currentRefinement: IRefinementFilter = {
                                    FilterName: filter.FilterName,
                                    Value: refinementValue,
                                };

                                return (
                                    <Checkbox
                                        key={j}
                                        checked={this._isInFilterSelection(currentRefinement)}
                                        disabled={false}
                                        label={Text.format(refinementValue.RefinementValue + ' ({0})', refinementValue.RefinementCount)}
                                        onChange={(ev, checked: boolean) => {
                                            // Every time we chek/uncheck a filter, a complete new search request is performed with current selected refiners
                                            checked ? this._addFilter(currentRefinement) : this._removeFilter(currentRefinement);
                                        }} />
                                );
                            })
                        }
                    </div>
                </div>
            );
        });

        const renderSelectedFilters: JSX.Element[] = this.state.selectedFilters.map((filter) => {

            return (
                <Label className='filter'>
                    <i className='ms-Icon ms-Icon--ClearFilter' onClick={() => { this._removeFilter(filter); }}></i>
                    {filter.Value.RefinementName}
                </Label>
            );
        });

        const renderAvailableFilters = <GroupedList
            ref='groupedList'
            items={items}
            onRenderCell={this._onRenderCell}
            className='filterPanel__body__group'
            groupProps={
                {
                    onRenderHeader: this._onRenderHeader,
                }
            }
            groups={groups} />;

        return (
            <div>
                <ActionButton
                    className='searchWp__filterResultBtn'
                    iconProps={{ iconName: 'Filter' }}
                    text={strings.FilterResultsButtonLabel}
                    onClick={this._onTogglePanel}
                />
                {(this.state.selectedFilters.length > 0) ?

                    <div className='searchWp__selectedFilters'>
                        {renderSelectedFilters}
                    </div>
                    : null
                }
                <Panel
                    className='filterPanel'
                    isOpen={this.state.showPanel}
                    type={PanelType.smallFixedNear}
                    isBlocking={false}
                    isLightDismiss={true}
                    onDismiss={this._onClosePanel}
                    headerText={strings.FilterPanelTitle}
                    closeButtonAriaLabel='Close'
                    hasCloseButton={true}
                    headerClassName='filterPanel__header'
                    onRenderBody={() => {
                        if (this.props.availableFilters.length > 0) {
                            return (
                                <Scrollbars style={{ height: '100%' }}>
                                    <div className='filterPanel__body'>
                                        <div className='filterPanel__body__allFiltersToggle'>
                                            <Toggle
                                                onText={strings.RemoveAllFiltersLabel}
                                                offText={strings.ApplyAllFiltersLabel}
                                                onChanged={(checked: boolean) => {
                                                    checked ? this._applyAllfilters() : this._removeAllFilters();
                                                }}
                                                checked={this.state.selectedFilters.length === 0 ? false : true}
                                            />
                                        </div>
                                        {renderAvailableFilters}
                                    </div>
                                </Scrollbars>
                            );
                        } else {
                            return (
                                <div className='filterPanel__body'>
                                    {strings.NoFilterConfiguredLabel}
                                </div>
                            );
                        }
                    }}>
                </Panel>
            </div>
        );
    }

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
            <div className='ms-Grid-row' data-selection-index={itemIndex}>
                <div className='ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10 ms-smPush1 ms-mdPush1 ms-lgPush1'>
                    {item}
                </div>
            </div>
        );
    }

    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
        return (

            <div className='ms-Grid-row' onClick={() => {

                // Update the index for expanded groups to be able to keep it open after a re-render
                const updatedExpandedGroups =
                    props.group.isCollapsed ?
                        update(this.state.expandedGroups, { $push: [props.group.startIndex] }) :
                        update(this.state.expandedGroups, { $splice: [[this.state.expandedGroups.indexOf(props.group.startIndex), 1]] });

                this.setState({
                    expandedGroups: updatedExpandedGroups,
                });

                props.onToggleCollapse(props.group);
            }}>
                <div className='ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1'>
                    <div className='header-icon'>
                        <i className={props.group.isCollapsed ? 'ms-Icon ms-Icon--ChevronDown' : 'ms-Icon ms-Icon--ChevronUp'}></i>
                    </div>
                </div>
                <div className='ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10'>
                    <div className='ms-font-l'>{props.group.name}</div>
                </div>
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
        let newFilters = update(this.state.selectedFilters, { $push: [filterToAdd] });
        this._applyFilters(newFilters);
    }

    private _removeFilter(filterToRemove: IRefinementFilter): void {

        // Remove the filter from the selected filters collection
        let newFilters = this.state.selectedFilters.filter((elt) => {
            return elt.Value.RefinementToken !== filterToRemove.Value.RefinementToken;
        });

        this._applyFilters(newFilters);
    }

    private _applyAllfilters(): void {

        let allFilters: IRefinementFilter[] = [];

        this.props.availableFilters.map((filter) => {

            filter.Values.map((refinementValue: IRefinementValue, index) => {
                allFilters.push({ FilterName: filter.FilterName, Value: refinementValue });
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

        // Save the selected filters
        this.setState({
            selectedFilters: selectedFilters,
        });

        this.props.onUpdateFilters(selectedFilters);
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