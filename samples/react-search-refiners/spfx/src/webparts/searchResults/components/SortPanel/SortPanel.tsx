import * as React from                                                 'react';
import ISortPanelProps from                                            './ISortPanelProps';
import ISortPanelState from                                            './ISortPanelState';
import { Dropdown, IDropdownOption } from                              'office-ui-fabric-react/lib/Dropdown';
import * as strings from                                               'SearchResultsWebPartStrings';
import { ActionButton } from                                           'office-ui-fabric-react/lib/Button';
import { SortDirection } from '@pnp/sp';
import styles from '../SearchResultsWebPart.module.scss';

export default class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            sortDirection:this.props.sortDirection ? this.props.sortDirection :SortDirection.Ascending,
            sortField:this.props.sortField ? this.props.sortField : null
        };

        this._setSortDirection = this._setSortDirection.bind(this);
        this._getDropdownOptions = this._getDropdownOptions.bind(this);
        this._onChangedSelectedField = this._onChangedSelectedField.bind(this);
    }

    public render(): React.ReactElement<ISortPanelProps> {
        if (this.props.sortableFieldsConfiguration.length === 0) return <span />;

        const dropdownOptions: IDropdownOption[] = this._getDropdownOptions();

        return (
            <div className={styles.searchWp__buttonBar__button}>
                    <ActionButton 
                        className={`${styles.searchWp__filterResultBtn} ms-fontWeight-semibold`}
                        iconProps={{ 
                            iconName: this.state.sortDirection === SortDirection.Ascending ? 'Ascending' : 'Descending'
                        }}
                        disabled={ !this.state.sortField ? true : false}
                        title={ this.state.sortDirection === SortDirection.Ascending ? strings.Sort.SortDirectionAscendingLabel : strings.Sort.SortDirectionDescendingLabel }
                        onClick={ () => {
                            this._setSortDirection();
                        }}
                    />
                    <Dropdown
                            className={ styles.searchWp__sortDropdown }
                            placeHolder={strings.Sort.SortPanelSortFieldPlaceHolder}
                            ariaLabel={strings.Sort.SortPanelSortFieldAria}
                            onChanged={this._onChangedSelectedField}
                            selectedKey={this.state.sortField}
                            options={dropdownOptions}
                        />
                </div>
        );
    }

    private _setSortDirection() {

        let sortDirection;

        switch (this.state.sortDirection) {
            case SortDirection.Ascending:
                sortDirection = SortDirection.Descending;
                break;

            case SortDirection.Descending:
                sortDirection = SortDirection.Ascending;
                break;

            default:
                sortDirection = SortDirection.Ascending;
                break;
        }

        this.setState({
            sortDirection: sortDirection,
        });

        this.props.onUpdateSort(sortDirection,this.state.sortField);
    }

    private _getDropdownOptions():IDropdownOption[] {

        let dropdownOptions:IDropdownOption[] = [];

        this.props.sortableFieldsConfiguration.map(e => {
            dropdownOptions.push({ 
                key: e.sortField, 
                text: e.displayValue
            });
        });

        return dropdownOptions;
    }

    private _onChangedSelectedField(option: IDropdownOption):void {
        const sortField = option.key.toString();
        this.setState({          
            sortField: sortField,
        });
        this.props.onUpdateSort(this.state.sortDirection,sortField);
    }
}