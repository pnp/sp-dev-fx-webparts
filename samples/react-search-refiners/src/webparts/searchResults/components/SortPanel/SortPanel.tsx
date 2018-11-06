import * as React from                                                 'react';
import ISortPanelProps from                                            './ISortPanelProps';
import ISortPanelState from                                            './ISortPanelState';
import { Panel, PanelType } from                                       'office-ui-fabric-react/lib/Panel';
import { Dropdown, IDropdownOption } from                              'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from                                                 'office-ui-fabric-react/lib/Toggle';
import * as strings from                                               'SearchWebPartStrings';
import { Scrollbars } from                                             'react-custom-scrollbars';
import { ActionButton } from                                           'office-ui-fabric-react/lib/Button';
import SortDirection from '../../../../models/SortDirection';
import styles from '../SearchResultsWebPart.module.scss';

export default class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            showPanel: false,
            sortDirection:this.props.sortDirection ? this.props.sortDirection :SortDirection.Ascending,
            sortField:this.props.sortField ? this.props.sortField : null
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);
        this._getSortableFieldCount = this._getSortableFieldCount.bind(this);
        this._setSortDirection = this._setSortDirection.bind(this);
        this._getDropdownOptions = this._getDropdownOptions.bind(this);
        this._onChangedSelectedField = this._onChangedSelectedField.bind(this);
    }

    public render(): React.ReactElement<ISortPanelProps> {
        if(this._getSortableFieldCount() === 0) return <span />;

        const dropdownOptions: IDropdownOption[] = this._getDropdownOptions();

        return (
            <div>
                <div className={`${styles.searchWp__buttonBar__button} ms-textAlignRight`}>
                    <ActionButton 
                        className={`${styles.searchWp__filterResultBtn} ms-fontWeight-semibold`}
                        iconProps={{ iconName:'Sort' }}
                        text={strings.SortResultsButtonLabel}
                        onClick={this._onTogglePanel}
                    />
                </div>

                <Panel
                    isOpen={this.state.showPanel}
                    type={PanelType.custom}
                    customWidth="450px"
                    isBlocking={false}
                    isLightDismiss={true}
                    onDismiss={this._onClosePanel}
                    headerText={strings.SortPanelTitle}
                    closeButtonAriaLabel={strings.PanelCloseButtonAria}
                    hasCloseButton={true}
                    onRenderBody={() => {
                        return <Scrollbars style={{ height: '100%' }}>
                            <div className={styles.searchWp__sortPanel__body}>
                                <div>
                                    <Dropdown
                                            placeHolder={strings.SortPanelSortFieldPlaceHolder}
                                            label={strings.SortPanelSortFieldLabel}
                                            ariaLabel={strings.SortPanelSortFieldAria}
                                            onChanged={this._onChangedSelectedField}
                                            selectedKey={this.state.sortField}
                                            options={dropdownOptions}
                                        />
                                </div>
                                <div>
                                    <Toggle
                                        label={strings.SortPanelSortDirectionLabel}
                                        onText={strings.SortDirectionAscendingLabel}
                                        offText={strings.SortDirectionDescendingLabel}
                                        onChanged={(checked: boolean) => {
                                            this._setSortDirection(checked);
                                        }}
                                        checked={this.state.sortDirection === SortDirection.Ascending || typeof(this.state.sortDirection) === 'undefined'}
                                    />
                                </div>
                            </div>
                        </Scrollbars>;
                    }}
                    >
                </Panel>
            </div>
        );
    }

    private _getSortableFieldCount() {
        if(!this.props.sortableFieldsConfiguration) return 0;

        return Object.keys(this.props.sortableFieldsConfiguration).filter(value => {
            return value;
        }).length;
    }

    private _setSortDirection(checked:boolean) {
        const sortDirection = checked ? SortDirection.Ascending : SortDirection.Descending;
        this.setState({
            sortDirection: sortDirection,
        });
        this.props.onUpdateSort(sortDirection,this.state.sortField);
    }

    private _getDropdownOptions():IDropdownOption[] {
        let dropdownOptions:IDropdownOption[] = [];
        const sortableFields = Object.keys(this.props.sortableFieldsConfiguration);

        sortableFields.forEach((fieldKey) => {
            //Strip " from start and end of the display name if present
            const fieldDisplayName = this.props.sortableFieldsConfiguration[fieldKey].replace(/^\"+|\"+$/g, '');
            dropdownOptions.push({ key: fieldKey, text: fieldDisplayName});
        });
        return dropdownOptions;
    }

    private _onChangedSelectedField(option: IDropdownOption, index?: number):void {
        const sortField = option.key.toString();
        this.setState({          
            sortField: sortField,
        });
        this.props.onUpdateSort(this.state.sortDirection,sortField);
    }

    private _onClosePanel() {
        this.setState({ showPanel: false });
    }

    private _onTogglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }
}