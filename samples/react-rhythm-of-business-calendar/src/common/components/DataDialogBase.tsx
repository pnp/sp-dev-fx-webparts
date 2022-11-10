import React, { Component, MutableRefObject, RefObject } from "react";
import { css, Dialog, MessageBar, MessageBarType, IModalProps } from "@fluentui/react";
import { ErrorHandler } from "../ErrorHandler";
import { IComponent } from "../IComponent";
import { AsyncOverlay } from "./AsyncOverlay";
import { ConfirmDialog } from "./ConfirmDialog";

import * as cstrings from "CommonStrings";
import styles from "./styles/DataDialogBase.module.scss";

export type UpdateDataCallback<T> = (update: (data: T) => void, callback?: () => any) => void;

export enum DataDialogMode {
    ReadOnly,
    Display,
    Edit
}

export interface IDataDialogBase<T> extends IComponent {
    valid(showValidationFeedback: boolean): boolean;
    readonly(entity: T): Promise<void>;
    display(entity?: T): Promise<void>;
    edit(entity?: T): Promise<void>;
    inDisplayMode: boolean;
    inEditMode: boolean;
}

export interface IDataDialogBaseProps<T> {
    componentRef?: RefObject<IDataDialogBase<T>>;
    onDismissed?: () => void;
    title?: string;
    className?: string;
    showCloseButton?: boolean;
    wide?: boolean;
}

export interface IDataDialogBaseState<T> {
    hidden: boolean;
    data: T;
    mode: DataDialogMode;
    showValidationFeedback: boolean;
    submitting: boolean;
    showConfirmDiscard: boolean;
    showConfirmDelete: boolean;
    errorMessage: string;
}

export abstract class DataDialogBase<T, P extends IDataDialogBaseProps<T>, S extends IDataDialogBaseState<T>> extends Component<P, S> implements IDataDialogBase<T> {
    private _accept: () => void;
    private _discard: () => void;

    constructor(props: P) {
        super(props);

        this.state = this.resetState();
    }

    protected resetState(): S {
        this._accept = () => { };
        this._discard = () => { };

        return {
            hidden: true,
            data: null,
            mode: DataDialogMode.Display,
            showValidationFeedback: false,
            submitting: false,
            showConfirmDiscard: false,
            showConfirmDelete: false,
            errorMessage: null
        } as S;
    }

    public componentDidMount() {
        (this.props.componentRef as MutableRefObject<IDataDialogBase<T>>).current = this;
    }

    public componentWillUnmount(): void {
        (this.props.componentRef as MutableRefObject<IDataDialogBase<T>>).current = null;
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
        return this.state.mode === DataDialogMode.ReadOnly;
    }

    public get inDisplayMode(): boolean {
        return this.state.mode === DataDialogMode.Display || this.state.mode === DataDialogMode.ReadOnly;
    }

    public get inEditMode(): boolean {
        return this.state.mode === DataDialogMode.Edit;
    }

    public valid(showValidationFeedback: boolean = true): boolean {
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

    public readonly(entity: T): Promise<void> {
        entity = entity || this.data;

        this.setState({
            hidden: false,
            data: entity,
            mode: DataDialogMode.ReadOnly,
            errorMessage: null
        } as S);

        return new Promise<void>((resolve, reject) => {
            this._accept = resolve;
            this._discard = reject;
        });
    }

    public display(entity?: T): Promise<void> {
        entity = entity || this.data;

        this.setState({
            hidden: false,
            data: entity,
            mode: DataDialogMode.Display,
            showValidationFeedback: false,
            errorMessage: null
        } as S);

        return new Promise<void>((resolve, reject) => {
            this._accept = resolve;
            this._discard = reject;
        });
    }

    public edit(entity?: T): Promise<void> {
        entity = entity || this.data;

        if (!this.isReadOnly) {
            this.setState({
                hidden: false,
                data: entity,
                mode: DataDialogMode.Edit
            } as S);
        }

        return new Promise<void>((resolve, reject) => {
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
    }

    public error(msg: string = cstrings.GenericError) {
        this.setState({
            submitting: false,
            errorMessage: msg
        });
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
        const { className, wide, showCloseButton } = this.props;
        const { hidden, submitting, showConfirmDiscard, showConfirmDelete, errorMessage } = this.state;

        const onConfirmDiscard = () => this.confirmDiscard();
        const onDiscard = () => this.discard();
        const onDelete = () => this.delete();

        const Footer = () => this.renderFooter();

        return (
            <div>
                <Dialog
                    title={this.title}
                    modalProps={{
                        className: css(styles.dataDialogBase, { [styles.wide]: wide }, className),
                        isBlocking: true,
                        isDarkOverlay: true
                    } as IModalProps}
                    dialogContentProps={{ showCloseButton }}
                    hidden={hidden}
                    closeButtonAriaLabel={cstrings.Close}
                    onDismiss={onConfirmDiscard}>
                    <div>
                        {errorMessage &&
                            <MessageBar role="alert" messageBarType={MessageBarType.error}>
                                {errorMessage}
                            </MessageBar>
                        }

                        {this.data && this.renderContent()}

                        <AsyncOverlay show={submitting} label={cstrings.Saving} />
                    </div>

                    {this.data && <Footer />}

                    <ConfirmDialog
                        show={showConfirmDiscard}
                        strings={cstrings.ConfirmDiscardDialog}
                        onAccept={onDiscard}
                        onReject={() => this.setState({ showConfirmDiscard: false })} />
                </Dialog>
                <ConfirmDialog
                    show={showConfirmDelete}
                    strings={cstrings.ConfirmDeleteDialog}
                    onAccept={onDelete}
                    onReject={() => this.setState({ showConfirmDelete: false })} />
            </div>
        );
    }

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

    protected renderFooter(): JSX.Element {
        if (this.isReadOnly)
            return this.renderReadOnlyFooter() || this.renderDisplayFooter();
        else if (this.inDisplayMode)
            return this.renderDisplayFooter();
        else if (this.inEditMode)
            return this.renderEditFooter();
    }

    protected renderReadOnlyFooter(): JSX.Element { return null; }
    protected renderDisplayFooter(): JSX.Element { return null; }
    protected renderEditFooter(): JSX.Element { return null; }
}