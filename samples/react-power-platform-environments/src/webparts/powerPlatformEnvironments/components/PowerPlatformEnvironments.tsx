import * as React from 'react';
import styles from './PowerPlatformEnvironments.module.scss';
import type { IPowerPlatformEnvironmentsProps } from './IPowerPlatformEnvironmentsProps';

import { IEnvironment } from '../PowerPlatformEnvironmentsWebPart';

import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { Text } from '@fluentui/react/lib/Text';
import { Link } from '@fluentui/react/lib/Link';
import { IconButton, PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';


export interface IEnvironmentRow {
    key: string;
    displayName: string;
    environmentUrl: string;
    instanceUrl?: string;
    type: string;
    state: string;
    dataverse: string;
    managed: string;
    region: string;
    createdOn: string;
    createdOnValue: number;
    environmentId: string;
}

export interface IPowerPlatformEnvironmentsState {
    columns: IColumn[];
    items: IEnvironmentRow[];
    selectionDetails: string;
    isModalSelection: boolean;
    announcedMessage?: string;
    showDeleteDialog: boolean;
    confirmText: string;
    message?: string;
    messageType?: MessageBarType;
    selectedEnvironment?: IEnvironmentRow;
    isDetailsPanelOpen: boolean;
}

export default class PowerPlatformEnvironments extends React.Component<IPowerPlatformEnvironmentsProps, IPowerPlatformEnvironmentsState> {
    private _selection: Selection;
    private _allItems: IEnvironmentRow[];

    constructor(props: IPowerPlatformEnvironmentsProps) {
        super(props);

        this._allItems = props.environments.map((env: IEnvironment): IEnvironmentRow => ({
            key: env.name,
            displayName: env.properties.displayName,
            environmentUrl: `https://make.powerapps.com/environments/${env.name}/home`,
            instanceUrl: env.properties.linkedEnvironmentMetadata?.instanceUrl,
            type: env.properties.environmentSku,
            state: env.properties.provisioningState,
            dataverse: env.properties.linkedEnvironmentMetadata ? 'Yes' : 'No',
            managed: env.properties.isManaged ? 'Yes' : 'No',
            region: env.location,
            createdOn: env.properties.createdTime
                ? new Date(env.properties.createdTime).toLocaleDateString()
                : '-',
            createdOnValue: env.properties.createdTime
                ? new Date(env.properties.createdTime).valueOf()
                : 0,
            environmentId: env.name
        }));

        // this._allItems = this._generateFakeEnvironments(10000);

        const columns: IColumn[] = [
            {
                key: 'displayName',
                name: 'Environment',
                fieldName: 'displayName',
                minWidth: 150,
                maxWidth: 250,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                onRender: (item: IEnvironmentRow) => {
                    return (
                        <Link href={item.environmentUrl} target="_blank" underline>
                            {item.displayName}
                        </Link>
                    );
                },
                isPadded: true
            },
            {
                key: 'type',
                name: 'Type',
                fieldName: 'type',
                minWidth: 80,
                maxWidth: 120,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'state',
                name: 'State',
                fieldName: 'state',
                minWidth: 80,
                maxWidth: 120,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'dataverse',
                name: 'Dataverse',
                fieldName: 'dataverse',
                minWidth: 80,
                maxWidth: 100,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'managed',
                name: 'Managed',
                fieldName: 'managed',
                minWidth: 80,
                maxWidth: 100,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'region',
                name: 'Region',
                fieldName: 'region',
                minWidth: 100,
                maxWidth: 150,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'createdOn',
                name: 'Created on',
                fieldName: 'createdOnValue',
                minWidth: 100,
                maxWidth: 150,
                isResizable: true,
                isSorted: true,
                isSortedDescending: true,
                sortAscendingAriaLabel: 'Sorted A to Z',
                sortDescendingAriaLabel: 'Sorted Z to A',
                onColumnClick: this._onColumnClick,
                data: 'number',
                onRender: (item: IEnvironmentRow) => {
                    return <span>{item.createdOn}</span>;
                },
                isPadded: true
            },
            {
                key: 'admin',
                name: 'Admin',
                minWidth: 50,
                maxWidth: 70,
                isResizable: false,
                className: styles.adminColumn,
                onRender: (item: IEnvironmentRow) => (
                    <IconButton
                        iconProps={{ iconName: 'Settings' }}
                        title="Open in Power Platform Admin Center"
                        ariaLabel="Open in Power Platform Admin Center"
                        onClick={() =>
                            window.open(
                                `https://admin.powerplatform.microsoft.com/manage/environments/environment/${item.environmentId}/hub`,
                                '_blank'
                            )
                        }
                    />
                )
            }
        ];

        this._selection = new Selection({
            onSelectionChanged: () => {

                this.setState({
                    selectionDetails: this._getSelectionDetails()
                });

            },

            getKey: this._getKey
        });

        this.state = {
            items: this._allItems,
            columns,
            selectionDetails: this._getSelectionDetails(),
            isModalSelection: false,
            announcedMessage: undefined,
            showDeleteDialog: false,
            confirmText: '',
            message: undefined,
            messageType: undefined,
            selectedEnvironment: undefined,
            isDetailsPanelOpen: false
        };
    }

    public render(): React.ReactElement {
        const {
            columns,
            items,
            selectionDetails,
            isModalSelection,
            announcedMessage
        } = this.state;

        const selectedItems = this._selection.getSelection() as IEnvironmentRow[];

        const selectedEnvironment = selectedItems.length === 1 ? selectedItems[0] : undefined;

        return (
            <div>
                <Text className={styles.header1}>Environments</Text>

                <div className={styles.controlWrapper}>
                    <div className={styles.controlContainer}>
                        <Toggle
                            label="Enable modal selection"
                            checked={isModalSelection}
                            onChange={this._onChangeModalSelection}
                            onText="Modal"
                            offText="Normal"
                        />
                    </div>

                    {
                        isModalSelection && (
                            <div className={styles.controlContainer} style={{ marginLeft: '25px', marginTop: '15px' }}>
                                <TooltipHost content="Delete environment?">
                                    <IconButton
                                        iconProps={{ iconName: 'Delete' }}
                                        ariaLabel="Delete environment"
                                        disabled={this._selection.getSelectedCount() !== 1}
                                        onClick={this._openDeleteDialog}
                                    />
                                </TooltipHost>
                            </div>
                        )
                    }

                    <div className={`${styles.controlContainer} ${styles.filterContainer}`}>
                        <TextField
                            label="Filter by Environment name:"
                            onChange={this._onChangeText}
                        />
                    </div>

                    <Announced message={`Number of items after filter applied: ${items.length}.`} />
                </div>

                <div className={styles.selectionDetails}>
                    {selectionDetails}
                </div>

                <Announced message={selectionDetails} />

                {announcedMessage ? (
                    <Announced message={announcedMessage} />
                ) : undefined}

                {
                    this.state.message && (
                        <TooltipHost
                            content={this.state.message}
                        >

                            <MessageBar
                                messageBarType={this.state.messageType}
                                isMultiline={false}
                                dismissButtonAriaLabel="Close"
                                onDismiss={() =>
                                    this.setState({
                                        message: undefined,
                                        messageType: undefined
                                    })
                                }
                            >
                                {this.state.message}
                            </MessageBar>

                        </TooltipHost>
                    )
                }

                {isModalSelection ? (
                    <MarqueeSelection selection={this._selection}>
                        <DetailsList
                            items={items}
                            columns={columns}
                            selectionMode={SelectionMode.multiple}
                            setKey="multiple"
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                            selection={this._selection}
                            onItemInvoked={this._openDetailsPanel}
                            selectionPreservedOnEmptyClick={true}
                            enterModalSelectionOnTouch={true}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="select row"
                        />
                    </MarqueeSelection>
                ) : (
                    <DetailsList
                        items={items}
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        getKey={this._getKey}
                        setKey="none"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                    />
                )}

                <Panel
                    isOpen={this.state.isDetailsPanelOpen}
                    onDismiss={() =>
                        this.setState({
                            isDetailsPanelOpen: false
                        })
                    }
                    type={PanelType.medium}
                    headerText="Environment Details"
                >

                    {this.state.selectedEnvironment && (
                        <div>

                            <Text variant="large">{this.state.selectedEnvironment.displayName}</Text>

                            <br/>
                            <br/>

                            <Text variant="mediumPlus">Environment ID</Text>
                            <Text block>{this.state.selectedEnvironment.environmentId}</Text>

                            <br/>

                            <Text variant="mediumPlus">Type</Text>
                            <Text block>{this.state.selectedEnvironment.type}</Text>

                            <br/>

                            <Text variant="mediumPlus">State</Text>
                            <Text block>{this.state.selectedEnvironment.state}</Text>

                            <br/>

                            <Text variant="mediumPlus">Region</Text>
                            <Text block>{this.state.selectedEnvironment.region}</Text>

                            <br/>

                            <Text variant="mediumPlus">Dataverse</Text>
                            <Text block>{this.state.selectedEnvironment.dataverse}</Text>

                            <br/>

                            <Text variant="mediumPlus">Managed</Text>
                            <Text block>{this.state.selectedEnvironment.managed}</Text>

                            <br/>

                            <Link href={this.state.selectedEnvironment.environmentUrl} target="_blank">Open Maker Studio</Link>

                            <br/>
                            <br/>

                            <Link href={`https://admin.powerplatform.microsoft.com/manage/environments/environment/${this.state.selectedEnvironment.environmentId}/hub`} target="_blank">Open Admin Centre</Link>

                        </div>

                    )}
                </Panel>

                <Dialog
                    hidden={!this.state.showDeleteDialog}
                    onDismiss={this._closeDeleteDialog}
                    minWidth={482}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: `Delete environment ${selectedEnvironment?.displayName}?`
                    }}
                >
                    <div>

                        <Text> Its resources and backups will be deleted, including:</Text>

                        <ul style={{ margin: '0px' }}>
                            <li>Dataverse (<Link href={selectedEnvironment?.instanceUrl} target="_blank">{selectedEnvironment?.instanceUrl?.replace('https://', '').replace('/', '')}</Link>) apps and data</li>
                        </ul>

                        <Text>Administrators of the environment will have 7 days to recover it by going to the main environments page.</Text>

                        <Link href={`https://learn.microsoft.com/en-gb/power-platform/admin/recover-environment`} target="_blank">Learn more</Link>

                    </div>

                    <div style={{ paddingTop: '16px' }}>

                        <Text>Enter the environment name,</Text>

                        <Text style={{ fontWeight: 'bold' }}> {selectedEnvironment?.displayName}</Text>

                        <Text>, to confirm</Text>

                        <TextField
                            required={true}
                            value={this.state.confirmText}
                            onChange={(ev, value) =>
                                this.setState({
                                    confirmText: value ?? ''
                                })
                            }
                        />
                    </div>

                    <DialogFooter>

                        <PrimaryButton
                            text="Confirm"
                            disabled={
                                this.state.confirmText !==
                                selectedEnvironment?.displayName
                            }
                            onClick={this._confirmDelete}
                        />

                        <DefaultButton
                            text="Cancel"
                            onClick={this._closeDeleteDialog}
                        />

                    </DialogFooter>

                </Dialog>
            </div >
        );
    }

    public componentDidUpdate(previousProps: IPowerPlatformEnvironmentsProps, previousState: IPowerPlatformEnvironmentsState): void {
        if (
            previousState.isModalSelection !== this.state.isModalSelection &&
            !this.state.isModalSelection
        ) {
            this._selection.setAllSelected(false);
        }
    }

    private _getKey(item: IEnvironmentRow, index?: number): string {
        return item.key;
    }

    private _onChangeModalSelection = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
        this.setState({
            isModalSelection: checked ?? false
        });
    };

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string): void => {
        this.setState({
            items: text
                ? this._allItems.filter(i =>
                    i.displayName.toLowerCase().indexOf(text.toLowerCase()) > -1
                )
                : this._allItems,
        });
    };

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return ('1 item selected: ' + (this._selection.getSelection()[0] as IEnvironmentRow).displayName);
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _openDetailsPanel = (item: IEnvironmentRow): void => {

        this.setState({
            selectedEnvironment: item,
            isDetailsPanelOpen: true
        });

    };

    private _onColumnClick = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn): void => {
        if (!column) {
            return;
        }

        const { columns, items } = this.state;

        const newColumns: IColumn[] = columns.slice();

        const currColumn: IColumn = newColumns.filter(
            currCol => column.key === currCol.key
        )[0];

        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });

        const newItems = _copyAndSort(
            items,
            currColumn.fieldName!,
            currColumn.isSortedDescending
        );

        this.setState({
            columns: newColumns,
            items: newItems,
            announcedMessage: `${currColumn.name} is sorted ${currColumn.isSortedDescending ? 'descending' : 'ascending'}`,
        });
    };

    private _openDeleteDialog = (): void => {
        this.setState({
            showDeleteDialog: true,
            confirmText: ''
        });
    };

    private _closeDeleteDialog = (): void => {
        this.setState({
            showDeleteDialog: false,
            confirmText: ''
        });
    };

    private _confirmDelete = async (): Promise<void> => {
        const selectedItems = this._selection.getSelection() as IEnvironmentRow[];

        if (selectedItems.length !== 1) {
            return;
        }

        const environment = selectedItems[0];

        console.log('Delete environment:', environment.environmentId);


        try {
            await this.props.deleteEnvironment(
                environment.environmentId
            );
            this.setState({
                message: `Environment '${environment.displayName}' is being deleted.`,
                messageType: MessageBarType.success
            });
        } catch (error) {
            this.setState({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Failed to delete environment.',
                messageType: MessageBarType.error
            });
        }

        this._closeDeleteDialog();
    };

    // private _generateFakeEnvironments(count: number): IEnvironmentRow[] {
    //     const items: IEnvironmentRow[] = [];

    //     for (let i = 1; i <= count; i++) {

    //         items.push({
    //             key: `env-${i}`,
    //             displayName: `Environment ${i}`,
    //             environmentUrl: 'https://make.powerapps.com',
    //             instanceUrl: 'https://test.crm.dynamics.com',
    //             type: i % 3 === 0 ? 'Production' : 'Developer',
    //             state: 'Ready',
    //             dataverse: 'Yes',
    //             managed: i % 2 === 0 ? 'Yes' : 'No',
    //             region: 'Europe',
    //             createdOn: '01/01/2026',
    //             createdOnValue: i,
    //             environmentId: `environment-${i}`
    //         });

    //     }

    //     return items;
    // }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;

    return items.slice(0).sort((a: T, b: T) =>
        ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1)
    );
}