import React, { Component, MutableRefObject, RefObject } from "react";
import { MessageBar, MessageBarType } from '@fluentui/react';
import { ErrorHandler } from "../ErrorHandler";
import { IComponent } from "../IComponent";
import { AsyncOverlay } from "./AsyncOverlay";
import { ConfirmDialog } from "./ConfirmDialog";

import * as cstrings from "CommonStrings";

export type UpdateDataCallback<T> = (update: (data: T) => void, callback?: () => any) => void;

export enum DataComponentMode {
    ReadOnly,
    Display,
    Edit
}

export interface IDataComponentBase<T> extends IComponent {
    valid(showValidationFeedback: boolean): boolean;
    readonly(entity: T): Promise<void>;
    display(entity?: T): Promise<void>;
    edit(entity?: T): Promise<void>;
    inDisplayMode: boolean;
    inEditMode: boolean;
}

export interface IDataComponentBaseProps<T> {
    componentRef?: RefObject<IDataComponentBase<T>>;
    onDismissed?: () => void;
    className?: string;
}

export interface IDataComponentBaseState<T> {
    data: T;
    mode: DataComponentMode;
    showValidationFeedback: boolean;
    submitting: boolean;
    showConfirmDiscard: boolean;
    showConfirmDelete: boolean;
    errorMessage: string;
}

export abstract class DataComponentBase<T, P extends IDataComponentBaseProps<T>, S extends IDataComponentBaseState<T>> extends Component<P, S> implements IDataComponentBase<T> {
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
            data: null,
            mode: DataComponentMode.Display,
            showValidationFeedback: false,
            submitting: false,
            showConfirmDiscard: false,
            showConfirmDelete: false,
            errorMessage: null
        } as S;
    }

    public componentDidMount() {
        (this.props.componentRef as MutableRefObject<IDataComponentBase<T>>).current = this;
    }

    public componentWillUnmount(): void {
        (this.props.componentRef as MutableRefObject<IDataComponentBase<T>>).current = null;
    }

    public componentShouldRender() {
        this.forceUpdate();
    }

    protected get data(): T {
        return this.state.data;
    }

    protected get isReadOnly(): boolean {
        return this.state.mode === DataComponentMode.ReadOnly;
    }

    public get inDisplayMode(): boolean {
        return this.state.mode === DataComponentMode.Display || this.state.mode === DataComponentMode.ReadOnly;
    }

    public get inEditMode(): boolean {
        return this.state.mode === DataComponentMode.Edit;
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
            data: entity,
            mode: DataComponentMode.ReadOnly,
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
            data: entity,
            mode: DataComponentMode.Display,
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
                data: entity,
                mode: DataComponentMode.Edit
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
        const onDiscard = () => this.discard();
        const onDelete = () => this.delete();

        const Header = () => this.renderHeader();
        const Footer = () => this.renderFooter();

        return (
            <div>
                {this.data && <Header />}

                <div>
                    {this.state.errorMessage &&
                        <MessageBar role="alert" messageBarType={MessageBarType.error}>
                            {this.state.errorMessage}
                        </MessageBar>
                    }

                    {this.data && this.renderContent()}

                    <AsyncOverlay show={this.state.submitting} label={cstrings.Saving} />
                </div>

                {this.data && <Footer />}

                <ConfirmDialog
                    show={this.state.showConfirmDiscard}
                    strings={cstrings.ConfirmDiscardDialog}
                    onAccept={onDiscard}
                    onReject={() => this.setState({ showConfirmDiscard: false })} />
                <ConfirmDialog
                    show={this.state.showConfirmDelete}
                    strings={cstrings.ConfirmDeleteDialog}
                    disabled={this.state.submitting}
                    onAccept={onDelete}
                    onReject={() => this.setState({ showConfirmDelete: false })} />
            </div>
        );
    }

    protected renderHeader(): JSX.Element {
        if (this.isReadOnly)
            return this.renderReadOnlyHeader() || this.renderDisplayHeader();
        else if (this.inDisplayMode)
            return this.renderDisplayHeader();
        else if (this.inEditMode)
            return this.renderEditHeader();
    }

    protected renderReadOnlyHeader(): JSX.Element { return null; }
    protected renderDisplayHeader(): JSX.Element { return null; }
    protected renderEditHeader(): JSX.Element { return null; }

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