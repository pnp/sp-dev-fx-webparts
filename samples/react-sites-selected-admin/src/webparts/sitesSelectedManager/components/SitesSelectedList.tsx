import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { IAppListItem, IAppListState, ISelectedSitesListProps } from './ISitesSelectedAppInterfaces';
import { ICommandBarItemProps, CommandBar, IButtonProps } from 'office-ui-fabric-react';
import styles from './SitesSelectedManager.module.scss';
import { SitesSelectedDialog } from './SitesSelectedDialog';

export class SitesSelectedAppList extends React.Component<ISelectedSitesListProps, IAppListState> {
    private _selection: Selection;
    private _allItems: IAppListItem[];
    private _columns: IColumn[];
    private _items: ICommandBarItemProps[];
    private _overflowButtonProps: IButtonProps;

    constructor(props) {
        super(props);
        this._hideDialog = this._hideDialog.bind(this);
        this._items = this._getMenu(true);
        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
        });

        this._allItems = [];
        let i = 0;
        this.props.value.forEach(element => {
            this._allItems.push({
                key: i,
                name: element.displayName,
                value: element.appId,
            });
            i = i + 1;
        });

        this._columns = [
            { key: 'column1', name: 'App Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Azure AD App Id', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
        ];

        this.state = {
            items: this._allItems,
            selectionDetails: this._getSelectionDetails(),
            menuItems: this._items,
            dialogHidden: true
        };
    }

    private _hideDialog(hide: boolean) {
        this.setState(
            { dialogHidden: hide }
        )
    }
    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                this.setState(
                    {
                        menuItems: this._getMenu(true)
                    }
                )
                return 'No items selected';
            case 1:
                this.setState(
                    {
                        menuItems: this._getMenu(false)
                    }
                )
                const result = this._selection.getSelection()[0] as IAppListItem;
                return `${result.name}|${result.value}`;
            default:
                return `${selectionCount} items selected`;
        }
    }
    private _getMenu(disabled: boolean): ICommandBarItemProps[] {
        return [
            {
                key: 'newItem',
                text: 'Add app permissions',
                iconProps: { iconName: 'CloudAdd' },
                split: false,
                ariaLabel: 'New',
                onClick: () => { this.setState({ dialogHidden: false, isDeleteMode: false }) },
                disabled: disabled,

            },
            {
                key: 'upload',
                text: 'Clear app permissions',
                iconProps: { iconName: 'BlockedSiteSolid12' },
                split: false,
                onClick: () => { this.setState({ dialogHidden: false, isDeleteMode: true }) },
                disabled: disabled,

            }
        ];
    }

    public render(): JSX.Element {
        const { items } = this.state;
        return (
            <Fabric>

                <div>
                    <CommandBar className={styles.commandBar}
                        items={this.state.menuItems}
                        overflowButtonProps={this._overflowButtonProps}
                        ariaLabel="Use left and right arrow keys to navigate between commands"
                    />
                </div>


                <MarqueeSelection className={styles.listMargin} selection={this._selection}>
                    <DetailsList
                        items={items}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this._selection}
                        checkboxVisibility={CheckboxVisibility.onHover}
                        selectionMode={SelectionMode.single}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                    />
                </MarqueeSelection>
                <div>&nbsp;</div>
                <SitesSelectedDialog {...
                    {
                        isHidden: this.state.dialogHidden,
                        hideDialog: this._hideDialog,
                        webPartProperties: this.props.webpartProperties,
                        selectedApp: this.state.selectionDetails,
                        isDeleteMode: this.state.isDeleteMode
                    }} />

            </Fabric >
        );
    }
}