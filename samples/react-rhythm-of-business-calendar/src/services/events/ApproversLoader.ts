import { ErrorHandler } from "common";
import { PagedViewLoader, IListItemResult, SPField, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
import { ISharePointService, ILiveUpdateService, ITimeZoneService } from "common/services";
import { Approvers } from "model";
import { IRhythmOfBusinessCalendarSchema } from "schema";
import { RefinerValueLoader } from "./RefinerValueLoader";

interface IApproversListItemResult extends IListItemResult {
    RefinerValues: SPField.Query_LookupMulti;
    IncludeInApprovalEmail: SPField.Query_Boolean;
    Users: SPField.Query_UserMulti;
}

interface IApproversUpdateListItem extends IUpdateListItem {
    RefinerValuesId: SPField.Update_LookupIdMulti;
    IncludeInApprovalEmail: SPField.Update_Boolean;
    UsersId: SPField.Update_UserIdMulti;
}

const toApprovers = async (row: IApproversListItemResult, approver: Approvers, refinerValueLoader: RefinerValueLoader): Promise<void> => {
    approver.title = row.Title;
    approver.users = SPField.toUsers(row.Users);
    approver.includeInApprovalEmail = SPField.fromYesNo(row, 'IncludeInApprovalEmail');
    approver.refinerValues.set(await SPField.fromLookupMultiAsync(row.RefinerValues, refinerValueLoader.getById));
};

const toUpdateListItem = (approver: Approvers): IApproversUpdateListItem => {
    return {
        Title: approver.title,
        UsersId: SPField.fromUsers(approver.users),
        IncludeInApprovalEmail: approver.includeInApprovalEmail,
        RefinerValuesId: SPField.toLookupMulti(approver.refinerValues.get())
    };
};

export class ApproversLoader extends PagedViewLoader<Approvers> {
    constructor(schema: IRhythmOfBusinessCalendarSchema, timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService, private readonly _refinerValueLoader: RefinerValueLoader) {
        super({ ctor: Approvers, view: schema.approversList.view_AllApprovers, timezones, spo, liveUpdate, fastLoad: { useCache: true } });

        _refinerValueLoader.registerDependency(this);
    }

    protected readonly extractReferencedUsers = (approver: Approvers) => [...approver.users];
    protected readonly toEntity = (row: IApproversListItemResult, entity: Approvers) => toApprovers(row, entity, this._refinerValueLoader);
    protected readonly updateListItem = toUpdateListItem;
    protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
}