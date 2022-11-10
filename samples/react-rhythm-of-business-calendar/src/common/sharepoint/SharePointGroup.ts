import { isEqualWith } from 'lodash';
import { Entity } from "../Entity";
import { User } from "../User";
import { IUserListChanges } from "../IUserListChanges";

interface State {
    title: string;
    members: User[];
    description?: string;
    allowMembersEditMembership?: boolean;
    allowRequestToJoinLeave?: boolean;
    autoAcceptRequestToJoinLeave?: boolean;
    onlyAllowMembersViewMembership?: boolean;
    requestToJoinLeaveEmailSetting?: string;
    hasMembershipChanges: boolean;
    hasMetadataChanges: boolean;
}

export class SharePointGroup extends Entity<State> {
    constructor(id?: number, name: string = '', members: User[] = []) {
        super(id);

        this.state.title = name;
        this.state.members = members.slice();
        this.state.description = '';
        this.state.requestToJoinLeaveEmailSetting = '';
        this.state.allowMembersEditMembership = true;
        this.state.allowRequestToJoinLeave = false;
        this.state.autoAcceptRequestToJoinLeave = false;
        this.state.onlyAllowMembersViewMembership = false;
    }

    public containsUser(user: User): boolean {
        return this.members.some(m => User.equal(m, user));
    }

    public get displayName(): string { return this.state.title; }

    public get title(): string { return this.state.title; }
    public set title(val: string) { this.state.title = val; }

    public get members(): User[] { return this.state.members; }
    public set members(val: User[]) { this.state.members = val; }

    public get description(): string { return this.state.description; }
    public set description(val: string) { this.state.description = val; }

    public get requestToJoinLeaveEmailSetting(): string { return this.state.requestToJoinLeaveEmailSetting; }
    public set requestToJoinLeaveEmailSetting(val: string) { this.state.requestToJoinLeaveEmailSetting = val; }

    public get allowMembersEditMembership(): boolean { return this.state.allowMembersEditMembership; }
    public set allowMembersEditMembership(val: boolean) { this.state.allowMembersEditMembership = val; }

    public get allowRequestToJoinLeave(): boolean { return this.state.allowRequestToJoinLeave; }
    public set allowRequestToJoinLeave(val: boolean) { this.state.allowRequestToJoinLeave = val; }

    public get autoAcceptRequestToJoinLeave(): boolean { return this.state.autoAcceptRequestToJoinLeave; }
    public set autoAcceptRequestToJoinLeave(val: boolean) { this.state.autoAcceptRequestToJoinLeave = val; }

    public get onlyAllowMembersViewMembership(): boolean { return this.state.onlyAllowMembersViewMembership; }
    public set onlyAllowMembersViewMembership(val: boolean) { this.state.onlyAllowMembersViewMembership = val; }

    public hasMetadataChanges(): boolean {
        if (this.isNew) {
            return true;
        } else if (this.hasSnapshot) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { members, ...metadata } = this.state;

            this.peekSnapshot();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { members: membersOriginal, ...metadataOriginal } = this.state;
            this.endPeek();

            return !isEqualWith(metadata, metadataOriginal, this.stateIsEqualCustomizer);
        } else {
            return false;
        }
    }

    public hasMembershipChanges(): boolean {
        const diff = this.membersDifference();
        return diff.added.length > 0 || diff.removed.length > 0;
    }

    public membersDifference(): IUserListChanges {
        return this.usersDifference('members');
    }
}