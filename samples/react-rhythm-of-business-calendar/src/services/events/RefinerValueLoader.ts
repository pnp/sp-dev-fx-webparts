import { Color, ErrorHandler } from "common";
import { PagedViewLoader, IListItemResult, SPField, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
import { ISharePointService, ILiveUpdateService, ITimeZoneService } from "common/services";
import { RefinerValue } from "model";
import { IRhythmOfBusinessCalendarSchema } from "schema";
import { RefinerLoader } from "./RefinerLoader";

interface IRefinerValueListItemResult extends IListItemResult {
    Order: SPField.Query_Number;
    Refiner: SPField.Query_Lookup;
    Color: SPField.Query_Text;
    Tag: SPField.Query_Text;
    Archived: SPField.Query_Boolean;
}

interface IRefinerValueUpdateListItem extends IUpdateListItem {
    Order: SPField.Update_Number;
    RefinerId: SPField.Update_LookupId;
    Color: SPField.Update_Text;
    Tag: SPField.Update_Text;
    Archived: SPField.Update_Boolean;
}

const toRefinerValue = async (row: IRefinerValueListItemResult, value: RefinerValue, refinerLoader: RefinerLoader): Promise<void> => {
    value.title = row.Title;
    value.order = SPField.fromInt(row, 'Order');
    value.refiner.set(await SPField.fromLookupAsync(row.Refiner, refinerLoader.getById));
    value.color = row.Color ? Color.parse(row.Color) : new Color(255, 255, 255);
    value.tag = row.Tag;
    value.isActive = !SPField.fromYesNo(row, 'Archived', false);
};

const toUpdateListItem = (value: RefinerValue): IRefinerValueUpdateListItem => {
    return {
        Title: value.title,
        Order: value.order,
        RefinerId: value.refiner.get()?.id,
        Color: value.color?.toHexString() || '',
        Tag: value.tag,
        Archived: !value.isActive
    };
};

export class RefinerValueLoader extends PagedViewLoader<RefinerValue> {
    constructor(schema: IRhythmOfBusinessCalendarSchema, timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService, private readonly _refinerLoader: RefinerLoader) {
        super({ ctor: RefinerValue, view: schema.refinerValuesList.view_AllRefinerValues, timezones, spo, liveUpdate, fastLoad: { useCache: true } });

        _refinerLoader.registerDependency(this);
    }

    protected readonly toEntity = (row: IRefinerValueListItemResult, entity: RefinerValue) => toRefinerValue(row, entity, this._refinerLoader);
    protected readonly updateListItem = toUpdateListItem;
    protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
}