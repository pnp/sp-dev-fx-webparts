import { Moment } from 'moment-timezone';
import { Guid } from '@microsoft/sp-core-library';
import { Color, IManyToManyRelationship, IManyToOneRelationship, ManyToManyRelationship, ManyToOneRelationship, MaxLengthValidationRule, RequiredValidationRule, User, ValidationRule } from 'common';
import { ListItemEntity } from "common/sharepoint";
import { Approvers } from './Approvers';
import { Event } from './Event';
import { Refiner } from './Refiner';

import * as cstrings from "CommonStrings";

class TagRequiredValidationRule extends ValidationRule<RefinerValue> {
    constructor() {
        super(TagRequiredValidationRule._isValid, cstrings.Validation.Required);
    }

    private static _isValid({ refiner, tag }: RefinerValue): boolean {
        return refiner.get()?.enableTags ? RequiredValidationRule.hasValue(tag) : true;
    }
}

interface IState {
    refiner: Refiner;
    order: number;
    tag: string;
    color: Color;
    isActive: boolean;
}

export class RefinerValue extends ListItemEntity<IState> {
    public static readonly TitleValidations = [
        new RequiredValidationRule<RefinerValue>(e => e.title),
        new MaxLengthValidationRule<RefinerValue>(e => e.title, 50)
    ];
    public static readonly TagValidations = [
        new TagRequiredValidationRule(),
        new MaxLengthValidationRule<RefinerValue>(e => e.tag, 3)
    ];

    public static readonly OrderAscComparer = (a: RefinerValue, b: RefinerValue) => a.order - b.order;
    public static readonly RefinerOrderAscComparer = (a: RefinerValue, b: RefinerValue) => a.refiner.get()?.order - b.refiner.get()?.order;

    public static readonly ActiveFilter = ({ isActive }: RefinerValue): boolean => isActive;

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.state.refiner = null;
        this.state.order = 0;
        this.state.tag = "";
        this.state.color = new Color(255, 255, 255);
        this.state.isActive = true;

        this.refiner = ManyToOneRelationship.create<RefinerValue, Refiner>(this, 'values', 'refiner');
        this.includeInBoundedContext(this.refiner);

        this.events = ManyToManyRelationship.create<RefinerValue, Event>(this, 'refinerValues');
        this.approvers = ManyToManyRelationship.create<RefinerValue, Approvers>(this, 'refinerValues');
    }

    public readonly refiner: IManyToOneRelationship<Refiner>;
    public readonly events: IManyToManyRelationship<Event>;
    public readonly approvers: IManyToManyRelationship<Approvers>;

    public get order(): number { return this.state.order; }
    public set order(val: number) { this.state.order = val; }

    public get tag(): string { return this.state.tag; }
    public set tag(val: string) { this.state.tag = val; }

    public get color(): Color { return this.state.color; }
    public set color(val: Color) { this.state.color = val; }

    public get isActive(): boolean { return this.state.isActive; }
    public set isActive(val: boolean) { this.state.isActive = val; }

    protected validationRules(): ValidationRule<RefinerValue>[] {
        return [
            ...RefinerValue.TitleValidations,
            ...RefinerValue.TagValidations
        ];
    }
}

export type RefinerValueMap = Map<number, RefinerValue>;
export type ReadonlyRefinerValueMap = ReadonlyMap<number, RefinerValue>;