import { intersection } from 'lodash';
import { Moment } from 'moment-timezone';
import { Guid } from '@microsoft/sp-core-library';
import { groupBy, IManyToManyRelationship, ManyToManyRelationship, MaxLengthValidationRule, RequiredValidationRule, User, ValidationRule } from 'common';
import { ListItemEntity } from "common/sharepoint";
import { RefinerValue } from './RefinerValue';
import { Refiner } from './Refiner';

interface IState {
    users: User[];
    includeInApprovalEmail: boolean;
}

export class Approvers extends ListItemEntity<IState> {
    public static readonly TitleValidations = [
        new RequiredValidationRule<Approvers>(e => e.title),
        new MaxLengthValidationRule<Approvers>(e => e.title, 255)
    ];
    public static readonly UsersValidations = [
        new RequiredValidationRule<Approvers>(e => e.users)
    ];

    public static appliesTo(approvers: Approvers, eventValuesByRefiner: Map<Refiner, RefinerValue[]>): boolean {
        const { refinerValuesByRefiner: approverValuesByRefiner } = approvers;
        return [...approverValuesByRefiner.keys()].every(refiner => {
            const approverValues = approverValuesByRefiner.get(refiner);
            const eventValues = eventValuesByRefiner.get(refiner);
            return intersection(approverValues, eventValues).length > 0;
        });
    }

    public static appliesToAny(approvers: Approvers[], eventValuesByRefiner: Map<Refiner, RefinerValue[]>): boolean {
        return approvers.some(a => Approvers.appliesTo(a, eventValuesByRefiner));
    }

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.users = [];
        this.includeInApprovalEmail = true;

        this.refinerValues = ManyToManyRelationship.create<Approvers, RefinerValue>(this, 'approvers');
        this.includeInBoundedContext(this.refinerValues);
    }

    public readonly refinerValues: IManyToManyRelationship<RefinerValue>;

    private _refinerValuesByRefiner: Map<Refiner, RefinerValue[]> = undefined;
    public get refinerValuesByRefiner() {
        return (this._refinerValuesByRefiner = this._refinerValuesByRefiner ||
            groupBy(this.refinerValues.get(), value => value.refiner.get())
        );
    }

    public hasChanges(specificProperty?: string | number | symbol): boolean {
        if (specificProperty)
            return super.hasChanges(specificProperty);
        else
            return super.hasChanges() || this.refinerValues.hasChanges();
    }

    public immortalize() {
        this._refinerValuesByRefiner = undefined;
        super.immortalize();
    }

    public endLiveUpdate() {
        this._refinerValuesByRefiner = undefined;
        super.endLiveUpdate();
    }

    public get users(): User[] { return this.state.users; }
    public set users(val: User[]) { this.state.users = val; }

    public get includeInApprovalEmail(): boolean { return this.state.includeInApprovalEmail; }
    public set includeInApprovalEmail(val: boolean) { this.state.includeInApprovalEmail = val; }

    public userIsAnApprover(user: User): boolean {
        return this.users.some(u => User.equal(u, user));
    }

    protected validationRules(): ValidationRule<Approvers>[] {
        return [
            ...Approvers.TitleValidations,
            ...Approvers.UsersValidations
        ];
    }
}

export type ApproversMap = Map<number, Approvers>;
export type ReadonlyApproversMap = ReadonlyMap<number, Approvers>;