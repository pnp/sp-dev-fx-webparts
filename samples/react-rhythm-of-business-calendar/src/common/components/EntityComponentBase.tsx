import { isEqual } from 'lodash';
import { IAsyncData } from 'common';
import { Entity } from '../Entity';
import { DataComponentBase, IDataComponentBase, IDataComponentBaseProps, IDataComponentBaseState, DataComponentMode, UpdateDataCallback } from "./DataComponentBase";

export {
    IDataComponentBase,
    IDataComponentBaseState,
    DataComponentMode,
    UpdateDataCallback
};

export interface IEntityComponentProps<T extends Entity<any, any>> extends IDataComponentBaseProps<T> {
    asyncWatchers?: IAsyncData<any>[];
}

export abstract class EntityComponentBase<T extends Entity<any, any>, P extends IEntityComponentProps<T>, S extends IDataComponentBaseState<T>> extends DataComponentBase<T, P, S> {
    constructor(props: P) {
        super(props);

        this.state = this.resetState();
    }

    public componentDidMount(): void {
        super.componentDidMount();
        const { asyncWatchers } = this.props;
        (asyncWatchers || []).map((async: IAsyncData<any>) => async.registerComponentForUpdates(this));
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        const { asyncWatchers } = this.props;
        (asyncWatchers || []).map((async: IAsyncData<any>) => async.unregisterComponentForUpdates(this));
    }

    public componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void {
        const { asyncWatchers: prevAsyncWatchers } = prevProps;
        const { asyncWatchers: nextAsyncWatchers } = this.props;

        if (!isEqual(prevAsyncWatchers, nextAsyncWatchers)) {
            (prevAsyncWatchers || []).map((async: IAsyncData<any>) => async.unregisterComponentForUpdates(this));
            (nextAsyncWatchers || []).map((async: IAsyncData<any>) => async.registerComponentForUpdates(this));
        }
    }

    protected get entity(): T {
        return this.data;
    }

    protected get isNew(): boolean {
        return this.data && this.data.isNew;
    }

    protected hasChanges(): boolean {
        return this.data && this.data.hasChanges();
    }

    protected validate(): boolean {
        return this.data.valid();
    }

    public readonly(entity: T): Promise<void> {
        entity = entity || this.entity;
        entity.revert();
        return super.readonly(entity);
    }

    public display(entity?: T): Promise<void> {
        entity = entity || this.entity;
        entity.revert();
        return super.display(entity);
    }

    public edit(entity?: T): Promise<void> {
        entity = entity || this.entity;
        if (!this.isReadOnly) {
            entity.snapshot();
        }
        return super.edit(entity);
    }

    public submit(successFn: () => void) {
        super.submit(() => {
            this.data.immortalize();
            successFn();
        });
    }

    public delete() {
        this.markEntityDeleted();
        super.delete();
    }

    protected onDeleted() {
        this.entity.immortalize();
    }

    protected markEntityDeleted() {
        this.entity.snapshot();
        this.entity.delete();
    }

    public confirmDiscard() {
        if (this.hasChanges() && !this.isNew) {
            this.setState({ showConfirmDiscard: true });
        } else {
            this.discard();
        }
    }

    public discard() {
        if (this.entity) {
            this.updateField(
                entity => entity.revert(),
                () => super.discard()
            );
        }
    }
}