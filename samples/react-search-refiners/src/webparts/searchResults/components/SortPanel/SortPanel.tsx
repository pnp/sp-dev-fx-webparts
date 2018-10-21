import * as React from                                                 'react';
import ISortPanelProps from                                            './ISortPanelProps';
import ISortPanelState from                                            './ISortPanelState';
import { Panel, PanelType } from                                       'office-ui-fabric-react/lib/Panel';
import { Dropdown, IDropdownOption } from                              'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from                                                 'office-ui-fabric-react/lib/Toggle';
import * as strings from                                               'SearchWebPartStrings';
import                                                                 '../SearchResultsWebPart.scss';
import { Scrollbars } from                                             'react-custom-scrollbars';
import { ActionButton } from                                           'office-ui-fabric-react/lib/Button';
import SortOrder from '../../../../models/SortOrder';

export default class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            showPanel: false,
            sortField:this.props.sortField,
            sortOrder:this.props.sortOrder
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);
        this._getSortableFieldCount = this._getSortableFieldCount.bind(this);
        this._setSortOrder = this._setSortOrder.bind(this);
        this._getDropdownOptions = this._getDropdownOptions.bind(this);
        this._onChangedSelectedField = this._onChangedSelectedField.bind(this);
    }

    public render(): React.ReactElement<ISortPanelProps> {
        if(this._getSortableFieldCount() === 0) return <span />;

        const dropdownOptions: IDropdownOption[] = this._getDropdownOptions();

        return (
            <div className='sortPanel__panelParent'>
                <ActionButton 
                    className=''
                    iconProps={{ iconName:'Sort' }}
                    text={strings.SortResultsButtonLabel}
                    onClick={this._onTogglePanel}
                />

                <Panel
                    className='sortPanel'
                    isOpen={this.state.showPanel}
                    type={PanelType.smallFixedNear}
                    isBlocking={false}
                    isLightDismiss={true}
                    onDismiss={this._onClosePanel}
                    headerText={strings.SortPanelTitle}
                    closeButtonAriaLabel='Close'
                    hasCloseButton={true}
                    headerClassName='sortPanel__header'
                    onRenderBody={() => {
                        return <Scrollbars style={{ height: '100%' }}>
                            <div className='sortPanel__body'>
                                <div className='sortPanel__body__sortFieldSelector'>
                                    <Dropdown
                                            placeHolder="Select a field"
                                            label="Sort on field"
                                            ariaLabel="Select a field"
                                            onChanged={this._onChangedSelectedField}
                                            selectedKey={this.state.sortField}
                                            options={dropdownOptions}
                                        />
                                </div>
                                <div className='sortPanel__body__sortOrderSelector'>
                                    <Toggle
                                        label="Sort order"
                                        onText={strings.SortOrderAscendingLabel}
                                        offText={strings.SortOrderDescendingLabel}
                                        onChanged={(checked: boolean) => {
                                            this._setSortOrder(checked);
                                        }}
                                        checked={this.state.sortOrder === SortOrder.Ascending || typeof(this.state.sortOrder) === 'undefined'}
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

    private _setSortOrder(checked:boolean) {
        const sortOrder = checked ? SortOrder.Ascending : SortOrder.Descending;
        this.setState({
            sortOrder: sortOrder,
        });
        this.props.onUpdateSort(sortOrder,this.state.sortField);
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
        this.props.onUpdateSort(this.state.sortOrder,sortField);
    }

    private _onClosePanel() {
        this.setState({ showPanel: false });
    }

    private _onTogglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }
}