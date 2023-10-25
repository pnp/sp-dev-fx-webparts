import { Guid } from '@microsoft/sp-core-library';
import { Entity, IManyToOneRelationship, ManyToOneRelationship, IOneToManyRelationship, OneToManyRelationship } from 'common';
import { flatten } from 'lodash';

interface IState<T> {
    termId: Guid;
    label: string;
    labels: string[];
    parent: T;
}

export class TaxonomyTermEntity<S, T extends TaxonomyTermEntity<S, T>> extends Entity<S & IState<T>> {
    constructor(label: string = '', termId: Guid = Guid.empty, labels: string[] = []) {
        super(-1);

        this.state.termId = termId;
        this.state.label = label;
        this.state.labels = labels;

        this.parent = ManyToOneRelationship.create<Entity<any>, any>(this as unknown as Entity<any>, 'children', 'parent');
        this.children = OneToManyRelationship.create<any, any>(this, 'parent');
    }

    public readonly parent: IManyToOneRelationship<T>;
    public readonly children: IOneToManyRelationship<T>;

    public get ancestors(): T[] {
        const parent = this.parent.get();
        const ancestors = parent?.ancestors;
        return parent ? [parent, ...ancestors] : [];
    }

    public get allDescendants(): T[] {
        return [this as unknown as T, ...flatten(this.children.map(c => c.allDescendants))];
    }

    public get displayName(): string { return this.label; }

    public get termId(): Guid { return this.state.termId; }

    public get label(): string { return this.state.label; }
    public set label(val: string) { this.state.label = val; }

    public get labels(): string[] { return this.state.labels; }

    protected buildSearchHelperStrings(): string[] {
        return [
            this.label.normalize("NFD").replace(/\p{Diacritic}/gu, ""),
            ...this.labels
        ];
    }
}