import { Moment } from 'moment-timezone';
import { Guid } from '@microsoft/sp-core-library';
import { IOneToManyRelationship, IRelationshipSortingParameters, MaxLengthValidationRule, OneToManyRelationship, RequiredValidationRule, User, ValidationRule } from 'common';
import { ListItemEntity } from "common/sharepoint";
import { RefinerValue } from './RefinerValue';

interface IState {
    order: number;
    allowMultiselect: boolean;
    required: boolean;
    initiallyExpanded: boolean;
    enableColors: boolean;
    enableTags: boolean;
    customSort: boolean;
}

export class Refiner extends ListItemEntity<IState> {
    public static readonly TitleValidations = [
        new RequiredValidationRule<Refiner>(e => e.title),
        new MaxLengthValidationRule<Refiner>(e => e.title, 50)
    ];

    public static readonly OrderAscComparer = (a: Refiner, b: Refiner) => a.order - b.order;

    private readonly _refinerValuesSorting: IRelationshipSortingParameters<RefinerValue>;

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.state.order = 0;
        this.state.allowMultiselect = false;
        this.state.required = false;
        this.state.initiallyExpanded = true;
        this.state.enableColors = false;
        this.state.enableTags = false;
        this.state.customSort = false;

        this._refinerValuesSorting = { comparer: RefinerValue.TitleAscComparer };
        this.values = OneToManyRelationship.create<Refiner, RefinerValue>(this, 'refiner', this._refinerValuesSorting);
        this.includeInBoundedContext(this.values);

        this.blankValue = new RefinerValue();
    }

    public readonly values: IOneToManyRelationship<RefinerValue>;

    public readonly blankValue: RefinerValue;

    public get order(): number { return this.state.order; }
    public set order(val: number) { this.state.order = val; }

    public get allowMultiselect(): boolean { return this.state.allowMultiselect; }
    public set allowMultiselect(val: boolean) { this.state.allowMultiselect = val; }

    public get required(): boolean { return this.state.required; }
    public set required(val: boolean) { this.state.required = val; }

    public get initiallyExpanded(): boolean { return this.state.initiallyExpanded; }
    public set initiallyExpanded(val: boolean) { this.state.initiallyExpanded = val; }

    public get enableColors(): boolean { return this.state.enableColors; }
    public set enableColors(val: boolean) { this.state.enableColors = val; }

    public get enableTags(): boolean { return this.state.enableTags; }
    public set enableTags(val: boolean) { this.state.enableTags = val; }

    public get customSort(): boolean { return this.state.customSort; }
    public set customSort(val: boolean) {
        this.state.customSort = val;

        if (val)
            this._refinerValuesSorting.comparer = RefinerValue.OrderAscComparer;
        else
            this._refinerValuesSorting.comparer = RefinerValue.TitleAscComparer;
    }

    public delete() {
        super.delete();
        this.values.forEach(value => value.delete());
    }

    protected validationRules(): ValidationRule<Refiner>[] {
        return [
            ...Refiner.TitleValidations
        ];
    }
}

export type RefinerMap = Map<number, Refiner>;
export type ReadonlyRefinerMap = ReadonlyMap<number, Refiner>;