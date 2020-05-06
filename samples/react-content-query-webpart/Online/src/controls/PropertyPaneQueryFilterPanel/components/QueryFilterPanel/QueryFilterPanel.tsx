import * as React                               from 'react';
import { cloneDeep }                            from '@microsoft/sp-lodash-subset';
import { Text }                                 from '@microsoft/sp-core-library';
import { isEmpty }                              from '@microsoft/sp-lodash-subset';
import { Spinner, CommandButton, ButtonType, Label }   from 'office-ui-fabric-react';
import { QueryFilter }                          from '../QueryFilter/QueryFilter';
import { IQueryFilter }                         from '../QueryFilter/IQueryFilter';
import { QueryFilterOperator }                  from '../QueryFilter/QueryFilterOperator';
import { QueryFilterJoin }                      from '../QueryFilter/QueryFilterJoin';
import { IQueryFilterField }                    from '../QueryFilter/IQueryFilterField';
import { IQueryFilterPanelProps }               from './IQueryFilterPanelProps';
import { IQueryFilterPanelState }               from './IQueryFilterPanelState';
import styles                                   from './QueryFilterPanel.module.scss';


export class QueryFilterPanel extends React.Component<IQueryFilterPanelProps, IQueryFilterPanelState> {

    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    constructor(props: IQueryFilterPanelProps, state: IQueryFilterPanelState) {
        super(props);

        this.state = {
            loading: true,
            fields: [],
            filters: this.getDefaultFilters(),
            error: null
        };

        this.getDefaultFilters = this.getDefaultFilters.bind(this);
        this.loadFields = this.loadFields.bind(this);
    }


    /*************************************************************************************
     * Returns a default array with an empty filter
     *************************************************************************************/
    private getDefaultFilters():IQueryFilter[] {
        if(this.props.filters != null && this.props.filters.length > 0) {
            return this.sortFiltersByIndex(this.props.filters);
        }

        let defaultFilters:IQueryFilter[] = [
            { index: 0, field: null, operator: QueryFilterOperator.Eq, join: QueryFilterJoin.Or, value: '' }
        ];
        return defaultFilters;
    }


    /*************************************************************************************
     * Called once after initial rendering
     *************************************************************************************/
    public componentDidMount(): void {
        this.loadFields();
    }


    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    public componentDidUpdate(prevProps: IQueryFilterPanelProps, prevState: IQueryFilterPanelState): void {
        if (this.props.disabled !== prevProps.disabled || this.props.stateKey !== prevProps.stateKey) {
            this.loadFields();
        }
    }


    /*************************************************************************************
     * Loads the available fields asynchronously
     *************************************************************************************/
    private loadFields(): void {

        this.setState((prevState: IQueryFilterPanelState, props: IQueryFilterPanelProps): IQueryFilterPanelState => {
            prevState.loading = true;
            prevState.error = null;
            return prevState;
        });

        this.props.loadFields().then((fields: IQueryFilterField[]) => {
            this.setState((prevState: IQueryFilterPanelState, props: IQueryFilterPanelProps): IQueryFilterPanelState => {
                prevState.loading = false;
                prevState.fields = fields;
                prevState.filters = this.getDefaultFilters();
                return prevState;
            });
        })
        .catch((error: any) => {
            this.setState((prevState: IQueryFilterPanelState, props: IQueryFilterPanelProps): IQueryFilterPanelState => {
                prevState.loading = false;
                prevState.error = error;
                return prevState;
            });
        });
    }


    /*************************************************************************************
     * When one of the filter changes
     *************************************************************************************/
    private onFilterChanged(filter:IQueryFilter): void {
        // Makes sure the parent is not notified for no reason if the modified filter was (and still is) considered empty
        let isWorthNotifyingParent = true;
        let oldFilter = this.state.filters.filter((i) => { return i.index == filter.index; })[0];
        let oldFilterIndex = this.state.filters.indexOf(oldFilter);

        if(this.props.trimEmptyFiltersOnChange && this.isFilterEmpty(oldFilter) && this.isFilterEmpty(filter)) {
            isWorthNotifyingParent = false;
        }

        // Updates the modified filter in the state
        this.state.filters[oldFilterIndex] = cloneDeep(filter);
        this.setState((prevState: IQueryFilterPanelState, props: IQueryFilterPanelProps): IQueryFilterPanelState => {
            prevState.filters = this.state.filters;
            return prevState;
        });

        // Notifies the parent with the updated filters
        if(isWorthNotifyingParent) {
            let filters:IQueryFilter[] = this.props.trimEmptyFiltersOnChange ? this.state.filters.filter((f) => { return !this.isFilterEmpty(f); }) : this.state.filters;
            this.props.onChanged(filters);
        }
    }


    /*************************************************************************************
     * Returns whether the specified filter is empty or not
     * @param filter : The filter that needs to be checked
     *************************************************************************************/
    private isFilterEmpty(filter:IQueryFilter) {
        let isFilterEmpty = false;

        // If the filter has no field
        if(filter.field == null) {
            isFilterEmpty = true;
        }

        // If the filter has a null or empty value
        if(filter.value == null || isEmpty(filter.value.toString())) {

            // And has no date time expression
            if(isEmpty(filter.expression)) {

                // And isn't a [Me] switch
                if(!filter.me) {

                    // And isn't a <IsNull /> or <IsNotNull /> operator
                    if(filter.operator != QueryFilterOperator.IsNull && filter.operator != QueryFilterOperator.IsNotNull) {
                        isFilterEmpty = true;
                    }
                }
            }
        }
        return isFilterEmpty;
    }


    /*************************************************************************************
     * When the 'Add filter' button is clicked
     *************************************************************************************/
    private onAddFilterClick(): void {
        // Updates the state with an all fresh new filter
        let nextAvailableFilterIndex = this.state.filters[this.state.filters.length-1].index + 1;
        let newFilter:IQueryFilter = { index: nextAvailableFilterIndex, field: null, operator: QueryFilterOperator.Eq, join: QueryFilterJoin.Or, value: '' };
        this.state.filters.push(newFilter);

        this.setState((prevState: IQueryFilterPanelState, props: IQueryFilterPanelProps): IQueryFilterPanelState => {
            prevState.filters = this.state.filters;
            return prevState;
        });
    }


    private sortFiltersByIndex(filters:IQueryFilter[]): IQueryFilter[] {
        return filters.sort((a, b) => {
            return a.index - b.index;
        });
    }


    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    public render() {
        const loading = this.state.loading ? <Spinner label={this.props.strings.loadingFieldsLabel} /> : <div />;
        const error = this.state.error != null ? <div className="ms-TextField-errorMessage ms-u-slideDownIn20">{ Text.format(this.props.strings.loadingFieldsErrorLabel, this.state.error) }</div> : <div />;

        const filters = this.state.filters.map((filter, index) =>
            <div className={styles.queryFilterPanelItem} key={index}>
                <QueryFilter fields={this.state.fields}
                             filter={filter}
                             disabled={this.props.disabled}
                             onLoadTaxonomyPickerSuggestions={this.props.onLoadTaxonomyPickerSuggestions}
                             onLoadPeoplePickerSuggestions={this.props.onLoadPeoplePickerSuggestions}
                             onChanged={this.onFilterChanged.bind(this)}
                             strings={this.props.strings.queryFilterStrings}
                             key={index} />
            </div>
        );

        return (
            <div className={styles.queryFilterPanel}>
                <Label>{this.props.strings.filtersLabel}</Label>

                {loading}

                { !this.state.loading &&
                    <div className={styles.queryFilterPanelItems}>{filters}</div>
                }

                { !this.state.loading &&
                    //<Button buttonType={ButtonType.primary} onClick={this.onAddFilterClick.bind(this)} disabled={this.props.disabled} icon='Add'>{this.props.strings.addFilterLabel}</Button>
                    <CommandButton iconProps={{ iconName: 'Add' }} onClick={this.onAddFilterClick.bind(this)} disabled={this.props.disabled} text={this.props.strings.addFilterLabel}/>
                }

                {error}
            </div>
        );
    }
}
