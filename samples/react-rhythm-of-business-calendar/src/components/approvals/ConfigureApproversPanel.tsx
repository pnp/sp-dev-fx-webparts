import { isEqual } from "lodash";
import React, { Component, createRef, MutableRefObject, ReactNode, RefObject } from "react";
import { CheckboxVisibility, CommandBar, ConstrainMode, DetailsList, DetailsListLayoutMode, IColumn, IContextualMenuItem, MessageBar, MessageBarType, Panel, PanelType, Selection, SelectionMode, Text } from "@fluentui/react";
import { Entity, humanizeFixedList, IAsyncData, multifilter } from "common";
import { AsyncDataComponent } from "common/components";
import { Approvers, Refiner } from "model";
import { EventsService, EventsServiceProp, ServicesProp, TeamsJs, withServices } from "services";
import ApproversPanel, { IApproversPanel } from "./ApproversPanel";

import { ConfigureApproversPanel as strings } from "ComponentStrings";

export interface IConfigureApproversPanel {
    open: () => void;
    close: () => void;
}

interface IOwnProps {
    componentRef?: RefObject<IConfigureApproversPanel>;
}
type IProps = IOwnProps & ServicesProp<EventsServiceProp>;

interface IState {
    hidden: boolean;
    approversAsync: IAsyncData<readonly Approvers[]>;
    refinersAsync: IAsyncData<readonly Refiner[]>;
}

class ConfigureApproversPanel extends Component<IProps, IState> implements IConfigureApproversPanel {
    private readonly _approversPanel = createRef<IApproversPanel>();
    private readonly _selection: Selection<Approvers>;

    constructor(props: IProps) {
        super(props);

        const {
            [EventsService]: { approversAsync, refinersAsync }
        } = this.props.services;

        this.state = {
            hidden: true,
            approversAsync,
            refinersAsync
        };

        this._selection = new Selection<Approvers>({
            onSelectionChanged: () => this.setState({}),
            items: []
        });
    }

    public componentDidMount() {
        (this.props.componentRef as MutableRefObject<IConfigureApproversPanel>).current = this;
    }

    public componentWillUnmount(): void {
        (this.props.componentRef as MutableRefObject<IConfigureApproversPanel>).current = null;
    }

    public readonly open = () =>
        this.setState({ hidden: false })

    public readonly close = () =>
        this.setState({ hidden: true })

    private readonly _viewApprovers = async () => {
        try {
            const approvers = this._selection.getSelection()[0];
            await this._approversPanel.current.display(approvers);
        } finally { this.forceUpdate(); }
    }

    private readonly _newApprovers = async () => {
        try {
            await this._approversPanel.current.edit(new Approvers());
        } finally { this.forceUpdate(); }
    }

    private readonly _editApprovers = async () => {
        try {
            const approvers = this._selection.getSelection()[0];
            await this._approversPanel.current.edit(approvers);
        } finally { this.forceUpdate(); }
    }

    private readonly _getApproversKey = ({ key }: Approvers) => key;

    private readonly _generateCommands = (selectedCount: number) => {
        const addContact: IContextualMenuItem = {
            key: "add",
            name: "New",
            iconProps: { iconName: "Add" },
            onClick: () => { this._newApprovers(); }
        };

        const viewContact: IContextualMenuItem = {
            key: "view",
            name: "View",
            iconProps: { iconName: "View" },
            disabled: selectedCount === 0,
            onClick: () => { this._viewApprovers(); }
        };

        const editContact: IContextualMenuItem = {
            key: "edit",
            name: "Edit",
            iconProps: { iconName: "Edit" },
            disabled: selectedCount === 0,
            onClick: () => { this._editApprovers(); }
        };

        return {
            near: [addContact, viewContact, editContact]
        };
    }

    private *_generateColumns(refiners: readonly Refiner[]): Generator<IColumn> {
        yield {
            key: 'title',
            name: strings.Column_Title,
            isRowHeader: true,
            isResizable: true,
            isMultiline: true,
            fieldName: 'displayName'
        } as IColumn;

        for (const refiner of refiners) {
            yield {
                key: `refiner-${refiner.key}`,
                name: refiner.displayName,
                isResizable: true,
                isMultiline: true,
                onRender: ({ refinerValues }: Approvers) => {
                    const selectedValues = multifilter(refinerValues.get(), Entity.NotDeletedFilter, v => v.refiner.get() === refiner);
                    const allValues = refiner.values.filter(Entity.NotDeletedFilter);
                    const humanizedString = humanizeFixedList(selectedValues, allValues, v => v.displayName, false, strings.AnyValue, undefined, strings.ValueListConjunction);
                    return selectedValues.length > 0 ? humanizedString : strings.AnyValue;
                }
            } as IColumn;
        }

        yield {
            key: 'users',
            name: strings.Column_Users,
            isResizable: true,
            isMultiline: true,
            onRender: ({ users }: Approvers) => users.map(({ title }) => title).join(', ')
        } as IColumn;
    }

    private _filteredAndSortdApprovers: Approvers[] = [];
    private _getFilteredAndSortedApprovers(approvers: readonly Approvers[]): Approvers[] {
        const filteredAndSortdApprovers = approvers.filter(Entity.NotDeletedFilter).sort(Entity.DisplayNameAscComparer);
        if (!isEqual(this._filteredAndSortdApprovers, filteredAndSortdApprovers)) {
            this._filteredAndSortdApprovers = filteredAndSortdApprovers;
            this._selection.setItems(filteredAndSortdApprovers);
        }

        return this._filteredAndSortdApprovers;
    }


    public render(): ReactNode {
        const { [TeamsJs]: teams } = this.props.services;
        const { hidden, approversAsync, refinersAsync } = this.state;

        const commands = this._generateCommands(this._selection.getSelectedCount());

        return (
            <AsyncDataComponent dataAsync={approversAsync}>{approvers =>
                <AsyncDataComponent dataAsync={refinersAsync}>{refiners => <>
                    <Panel
                        type={PanelType.large}
                        isOpen={!hidden}
                        isBlocking={false}
                        isLightDismiss
                        onDismiss={this.close}
                        headerText={strings.HeaderText}
                        closeButtonAriaLabel={strings.Command_Close.AriaLabel}
                    >
                        <CommandBar items={commands.near} />
                        <DetailsList
                            items={this._getFilteredAndSortedApprovers(approvers)}
                            getKey={this._getApproversKey}
                            columns={[...this._generateColumns(refiners)]}
                            selection={this._selection}
                            selectionMode={SelectionMode.single}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            constrainMode={ConstrainMode.horizontalConstrained}
                            checkboxVisibility={CheckboxVisibility.always}
                            onItemInvoked={this._viewApprovers}
                        />
                        {this._filteredAndSortdApprovers.length === 0 &&
                            <Text block styles={{ root: { marginLeft: 60, marginBottom: 20 } }}>{strings.NoApproversDefined}</Text>
                        }
                        <MessageBar messageBarType={MessageBarType.info}>
                            {teams ? strings.AdminApproversMessage_Teams : strings.AdminApproversMessage_SharePoint}
                        </MessageBar>
                    </Panel>
                    <ApproversPanel
                        hasCloseButton
                        componentRef={this._approversPanel}
                        asyncWatchers={[approversAsync]}
                    />
                </>}</AsyncDataComponent>
            }</AsyncDataComponent>
        );
    }
}

export default withServices(ConfigureApproversPanel);