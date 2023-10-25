import { isEmpty } from "lodash";
import React, { Component, CSSProperties, FC, MutableRefObject, RefObject, useCallback } from "react";
import { css, CommandBar, IconButton, ICommandBarItemProps, MessageBar, MessageBarType, Panel, PanelType, Stack, StackItem, Text, useTheme, TooltipHost } from '@fluentui/react';
import { IComponent } from "common";
import { BackEventListener } from "../BackEventListener";
import { ErrorHandler } from "../ErrorHandler";
import { AsyncOverlay } from "./AsyncOverlay";
import { ConfirmDialog } from "./ConfirmDialog";

import * as cstrings from "CommonStrings";
import styles from "./styles/DataPanelBase.module.scss";

interface IPanelNavigationProps {
    heading: JSX.Element;
    headerCommands: ICommandBarItemProps[];
    hasCloseButton: boolean;
    onConfirmDiscard: () => void;
    errorMessage: string | undefined;
}

const PanelNavigation: FC<IPanelNavigationProps> = ({
    heading,
    headerCommands,
    hasCloseButton,
    onConfirmDiscard,
    errorMessage
}) => {
    const hasHeaderCommands = !isEmpty(headerCommands);
    const { semanticColors: { bodyBackground } } = useTheme();
    const navigationStyle = useCallback(() => {
        return {
            backgroundColor: bodyBackground
        } as CSSProperties;
    }, [bodyBackground]);

    return (
        <div style={navigationStyle()}>
            <Stack className={styles.headerCommands} horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
                <StackItem grow>
                    {hasHeaderCommands
                        ? <CommandBar items={headerCommands} />
                        : heading
                    }
                </StackItem>
                {hasCloseButton &&
                    <StackItem>
                        <TooltipHost content={cstrings.Close}>
                            <IconButton onClick={onConfirmDiscard} iconProps={{ iconName: "Cancel" }} ariaLabel={cstrings.Close} />
                        </TooltipHost>
                    </StackItem>
                }
            </Stack>
            {hasHeaderCommands && heading}
            {errorMessage && <MessageBar role="alert" messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>}
        </div>
    );
};

export type UpdateDataCallback<T> = (update: (data: T) => void, callback?: () => any) => void;

export enum DataPanelMode {
    ReadOnly,
    Display,
    Edit
}

export interface IDataPanelBase<T> extends IComponent {
    valid(showValidationFeedback: boolean): boolean;
    readonly(entity: T): Promise<void>;
    display(entity?: T): Promise<void>;
    edit(entity?: T): Promise<void>;
    inDisplayMode: boolean;
    inEditMode: boolean;
}

export interface IDataPanelBaseProps<T> {
    componentRef?: RefObject<IDataPanelBase<T>>;
    onDismissed?: () => void;
    title?: string;
    className?: string;
    hasCloseButton?: boolean;
    panelType?: PanelType;
}

export interface IDataPanelBaseState<T> {
    hidden: boolean;
    data: T;
    mode: DataPanelMode;
    showValidationFeedback: boolean;
    submitting: boolean;
    showConfirmDiscard: boolean;
    showConfirmDelete: boolean;
    errorMessage: string;
}

export abstract class DataPanelBase<T, P extends IDataPanelBaseProps<T>, S extends IDataPanelBaseState<T>> extends Component<P, S> implements IDataPanelBase<T> {
    private readonly _backEventListener = new BackEventListener(() => { if (this.data) this.confirmDiscard(); });

    private _promise: Promise<void>;
    private _accept: () => void;
    private _discard: () => void;

    constructor(props: P) {
        super(props);

        this.state = this.resetState();
    }

    protected resetState(): S {
        this._resetPromise();

        return {
            hidden: true,
            data: null,
            mode: DataPanelMode.Display,
            showValidationFeedback: false,
            submitting: false,
            showConfirmDiscard: false,
            showConfirmDelete: false,
            errorMessage: null
        } as S;
    }

    public componentDidMount() {
        (this.props.componentRef as MutableRefObject<IDataPanelBase<T>>).current = this;
    }

    public componentWillUnmount(): void {
        (this.props.componentRef as MutableRefObject<IDataPanelBase<T>>).current = null;

        this._backEventListener.cleanup();
    }

    public componentShouldRender() {
        this.forceUpdate();
    }

    protected get title(): string {
        return this.props.title;
    }

    protected get data(): T {
        return this.state.data;
    }

    protected get isReadOnly(): boolean {
        return this.state.mode === DataPanelMode.ReadOnly;
    }

    public get inDisplayMode(): boolean {
        return this.state.mode === DataPanelMode.Display || this.state.mode === DataPanelMode.ReadOnly;
    }

    public get inEditMode(): boolean {
        return this.state.mode === DataPanelMode.Edit;
    }

    public readonly valid = (showValidationFeedback: boolean = true): boolean => {
        this.setState({ showValidationFeedback });
        return this.validate();
    }

    protected abstract validate(): boolean;

    protected readonly updateField = (update: (data: T) => void, callback?: () => any): void => {
        this.setState((prevState: S) => {
            const data = prevState.data;
            update(data);
            return {
                ...prevState,
                data
            };
        }, callback);
    }

    public readonly(entity: T, resetPromise: boolean = true): Promise<void> {
        if (entity && entity !== this.data && resetPromise) this._resetPromise();
        entity = entity || this.data;

        this.setState({
            hidden: false,
            data: entity,
            mode: DataPanelMode.ReadOnly,
            errorMessage: null
        });

        this._backEventListener.listenForBack();

        return this._promise;
    }

    public display(entity?: T, resetPromise: boolean = true): Promise<void> {
        if (entity && entity !== this.data && resetPromise) this._resetPromise();
        entity = entity || this.data;

        this.setState({
            hidden: false,
            data: entity,
            mode: DataPanelMode.Display,
            showValidationFeedback: false,
            errorMessage: null
        });

        this._backEventListener.listenForBack();

        return this._promise;
    }

    public edit(entity?: T, resetPromise: boolean = true): Promise<void> {
        if (entity && entity !== this.data && resetPromise) this._resetPromise();
        entity = entity || this.data;

        if (!this.isReadOnly) {
            this.setState({
                hidden: false,
                data: entity,
                mode: DataPanelMode.Edit
            });
        }

        this._backEventListener.listenForBack();

        return this._promise;
    }

    private _resetPromise() {
        this._promise = new Promise((resolve, reject) => {
            this._accept = resolve;
            this._discard = reject;
        });
    }

    protected submit(successFn: () => void) {
        if (this.valid()) {
            this.submitting(true);
            this.persistChanges(successFn);
        } else {
            this.error(cstrings.Validation.ValidationFailed);
        }
    }

    protected submitting(val: boolean) {
        this.setState({ submitting: val });
    }

    protected confirmDelete() {
        this.setState({ showConfirmDelete: true });
    }

    protected delete() {
        this.submitting(true);

        this.persistChanges(() => {
            this.onDeleted();
            this.dismiss();
        });
    }

    protected onDeleted() {
    }

    public confirmDiscard() {
        this.discard();
    }

    public discard() {
        this._discard();
        this.dismiss();
    }

    public dismiss() {
        if (this.data) {
            this.setState(this.resetState());

            if (this.props.onDismissed) {
                this.props.onDismissed();
            }
        }

        this._backEventListener.cancelListeningForBack();
    }

    public error(msg: string = cstrings.GenericError) {
        this.setState({
            submitting: false,
            errorMessage: msg
        });
    }

    protected customSavingLabel(): string {
        return cstrings.Saving;
    }

    protected async persistChanges(successFn: () => void) {
        try {
            await this.persistChangesCore();
            this.submitting(false);
            this._accept();
            successFn();
        } catch (e) {
            console.error(e);
            this.error(await ErrorHandler.message(e));
        }
    }

    protected abstract persistChangesCore(): Promise<void>;

    public render() {
        const { className, hasCloseButton, panelType } = this.props;
        const { hidden, submitting, showConfirmDiscard, showConfirmDelete, errorMessage } = this.state;

        const onDiscard = () => this.discard();
        const onConfirmDiscard = () => this.confirmDiscard();
        const onDelete = () => this.delete();

        const headerCommands = this.data ? this.buildHeaderCommands() : [];
        const Heading = () => this.data && this.renderHeader() ||
            <Text block className={styles.heading} role="heading" aria-level={1}>{this.title}</Text>;

        const footerContent = this.data && this.renderFooterContent();
        const hasFooterContent = !!footerContent;

        return (
            <Panel
                type={panelType !== undefined ? panelType : PanelType.medium}
                isOpen={!hidden}
                isBlocking={true}
                className={css(styles.panel, className)}
                onRenderNavigation={() =>
                    <PanelNavigation
                        heading={<Heading />}
                        headerCommands={headerCommands}
                        hasCloseButton={hasCloseButton}
                        onConfirmDiscard={onConfirmDiscard}
                        errorMessage={errorMessage}
                    />
                }
                onRenderFooterContent={hasFooterContent ? () => footerContent : undefined}
                isFooterAtBottom={hasFooterContent}
            >
                {this.data && this.renderContent()}

                <AsyncOverlay show={submitting} label={this.customSavingLabel()} />

                <ConfirmDialog
                    show={showConfirmDiscard}
                    strings={cstrings.ConfirmDiscardDialog}
                    onAccept={onDiscard}
                    onReject={() => { this.setState({ showConfirmDiscard: false }); this._backEventListener.listenForBack(); }} />
                <ConfirmDialog
                    show={showConfirmDelete}
                    strings={cstrings.ConfirmDeleteDialog}
                    onAccept={onDelete}
                    onReject={() => this.setState({ showConfirmDelete: false })} />
            </Panel>
        );
    }

    protected renderHeader(): JSX.Element {
        if (this.isReadOnly)
            return this.renderReadOnlyHeader() || this.renderDisplayHeader();
        else if (this.inDisplayMode)
            return this.renderDisplayHeader();
        else if (this.inEditMode)
            return this.renderEditHeader() || this.renderDisplayHeader();
    }

    protected renderReadOnlyHeader(): JSX.Element { return null; }
    protected renderDisplayHeader(): JSX.Element { return null; }
    protected renderEditHeader(): JSX.Element { return null; }

    protected buildHeaderCommands(): ICommandBarItemProps[] {
        if (this.isReadOnly)
            return this.buildReadOnlyHeaderCommands() || this.buildDisplayHeaderCommands() || [];
        else if (this.inDisplayMode)
            return this.buildDisplayHeaderCommands() || [];
        else if (this.inEditMode)
            return this.buildEditHeaderCommands() || [];
    }

    protected buildReadOnlyHeaderCommands(): ICommandBarItemProps[] { return null; }
    protected buildDisplayHeaderCommands(): ICommandBarItemProps[] { return null; }
    protected buildEditHeaderCommands(): ICommandBarItemProps[] { return null; }

    protected renderContent(): JSX.Element {
        if (this.isReadOnly)
            return this.renderReadOnlyContent() || this.renderDisplayContent();
        else if (this.inDisplayMode)
            return this.renderDisplayContent();
        else if (this.inEditMode)
            return this.renderEditContent();
    }

    protected renderReadOnlyContent(): JSX.Element { return null; }
    protected renderDisplayContent(): JSX.Element { return null; }
    protected renderEditContent(): JSX.Element { return null; }

    protected renderFooterContent(): JSX.Element {
        if (this.isReadOnly)
            return this.renderReadOnlyFooterContent() || this.renderDisplayFooterContent();
        else if (this.inDisplayMode)
            return this.renderDisplayFooterContent();
        else if (this.inEditMode)
            return this.renderEditFooterContent();
    }

    protected renderReadOnlyFooterContent(): JSX.Element { return null; }
    protected renderDisplayFooterContent(): JSX.Element { return null; }
    protected renderEditFooterContent(): JSX.Element { return null; }
}