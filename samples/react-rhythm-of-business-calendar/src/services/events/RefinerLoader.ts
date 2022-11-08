import { ErrorHandler } from "common";
import { PagedViewLoader, IListItemResult, SPField, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
import { ISharePointService, ILiveUpdateService, ITimeZoneService } from "common/services";
import { Refiner } from "model";
import { IRhythmOfBusinessCalendarSchema } from "schema";

interface IRefinerListItemResult extends IListItemResult {
    Order: SPField.Query_Number;
    AllowMultiselect: SPField.Query_Boolean;
    Required: SPField.Query_Boolean;
    InitiallyExpanded: SPField.Query_Boolean;
    EnableColors: SPField.Query_Boolean;
    EnableTags: SPField.Query_Boolean;
    CustomSort: SPField.Query_Boolean;
}

interface IRefinerUpdateListItem extends IUpdateListItem {
    Order: SPField.Update_Number;
    AllowMultiselect: SPField.Update_Boolean;
    Required: SPField.Update_Boolean;
    InitiallyExpanded: SPField.Update_Boolean;
    EnableColors: SPField.Update_Boolean;
    EnableTags: SPField.Update_Boolean;
    CustomSort: SPField.Update_Boolean;
}

const toRefiner = (row: IRefinerListItemResult, refiner: Refiner): void => {
    refiner.title = row.Title;
    refiner.order = SPField.fromInt(row, 'Order');
    refiner.allowMultiselect = SPField.fromYesNo(row, 'AllowMultiselect');
    refiner.required = SPField.fromYesNo(row, 'Required');
    refiner.initiallyExpanded = SPField.fromYesNo(row, 'InitiallyExpanded');
    refiner.enableColors = SPField.fromYesNo(row, 'EnableColors');
    refiner.enableTags = SPField.fromYesNo(row, 'EnableTags');
    refiner.customSort = SPField.fromYesNo(row, 'CustomSort');
};

const toUpdateListItem = (refiner: Refiner): IRefinerUpdateListItem => {
    return {
        Title: refiner.title,
        Order: refiner.order,
        AllowMultiselect: refiner.allowMultiselect,
        Required: refiner.required,
        InitiallyExpanded: refiner.initiallyExpanded,
        EnableColors: refiner.enableColors,
        EnableTags: refiner.enableTags,
        CustomSort: refiner.customSort
    };
};

export class RefinerLoader extends PagedViewLoader<Refiner> {
    constructor(schema: IRhythmOfBusinessCalendarSchema, timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService) {
        super({ ctor: Refiner, view: schema.refinersList.view_AllRefiners, timezones, spo, liveUpdate, fastLoad: { useCache: true } });
    }

    protected readonly toEntity = toRefiner;
    protected readonly updateListItem = toUpdateListItem;
    protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
}