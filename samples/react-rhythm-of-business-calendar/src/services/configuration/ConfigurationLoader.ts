import { ErrorHandler } from "common";
import { PagedViewLoader, IListItemResult, SPField, buildLiveList, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
import { ILiveUpdateService, ISharePointService, ITimeZoneService } from "common/services";
import { ViewKeys, ViewYearFYKeys, ListViewKeys } from "model";
import { Configuration, ConfigurationList } from 'schema';
import { TemplateViewKeys } from "model/TemplateViewKeys";

interface IConfigurationListItemResult extends IListItemResult {
    readonly SchemaVersion: SPField.Query_Number;
    readonly CurrentUpgradeAction: SPField.Query_Number;
    readonly FiscalYearSartMonth: SPField.Query_Number;
    readonly DefaultView: SPField.Query_Choice;
    readonly UseRefiners: SPField.Query_Boolean;
    readonly RefinerRailInitiallyExpanded: SPField.Query_Boolean;
    readonly QuarterViewGroupByRefinerId: SPField.Query_Number;
    readonly UseApprovals: SPField.Query_Boolean;
    readonly AllowConfidentialEvents: SPField.Query_Boolean;
    readonly UseApprovalsTeamsNotification: SPField.Query_Boolean;
    readonly UseApprovalsEmailNotification: SPField.Query_Boolean;
    readonly FiscalYearStartYear: SPField.Query_Choice;
    readonly ListViewColumn: SPField.Query_ChoiceMulti;
    readonly UseAddToOutlook: SPField.Query_Boolean;
    readonly TemplateView: SPField.Query_ChoiceMulti;
}

interface IConfigurationUpdateListItem extends IUpdateListItem {
    // 1.0 fields
    readonly SchemaVersion: SPField.Update_Number;
    readonly CurrentUpgradeAction: SPField.Update_Number;
    readonly FiscalYearSartMonth: SPField.Update_Number;
    readonly DefaultView: SPField.Update_Choice;
    readonly UseRefiners: SPField.Update_Boolean;
    readonly RefinerRailInitiallyExpanded: SPField.Update_Boolean;
    readonly QuarterViewGroupByRefinerId: SPField.Update_Number;
    readonly UseApprovals: SPField.Update_Boolean;
    readonly AllowConfidentialEvents: SPField.Update_Boolean;
    readonly UseApprovalsTeamsNotification: SPField.Update_Boolean;
    readonly UseApprovalsEmailNotification: SPField.Update_Boolean;
    readonly FiscalYearStartYear: SPField.Update_Choice;
    readonly ListViewColumn: SPField.Update_ChoiceMulti;
    readonly UseAddToOutlook: SPField.Update_Boolean;
    readonly TemplateView: SPField.Update_ChoiceMulti;
}

const toConfiguration = async (row: IConfigurationListItemResult, config: Configuration): Promise<void> => {
    config.title = row.Title;
    config.schemaVersion = SPField.fromFloat(row, 'SchemaVersion');
    config.currentUpgradeAction = SPField.fromInt(row, 'CurrentUpgradeAction', 0);
    config.fiscalYearSartMonth = SPField.fromInt(row, 'FiscalYearSartMonth', 1) - 1;
    config.defaultView = row.DefaultView as ViewKeys || ViewKeys.monthly;
    config.useRefiners = SPField.fromYesNo(row, 'UseRefiners', true);
    config.refinerRailInitiallyExpanded = SPField.fromYesNo(row, 'RefinerRailInitiallyExpanded', true);
    config.quarterViewGroupByRefinerId = SPField.fromInt(row, 'QuarterViewGroupByRefinerId', undefined);
    config.useApprovals = SPField.fromYesNo(row, 'UseApprovals', false);
    config.allowConfidentialEvents = SPField.fromYesNo(row, 'AllowConfidentialEvents', false);
    config.useApprovalsTeamsNotification = SPField.fromYesNo(row, 'UseApprovalsTeamsNotification', false);
    config.useApprovalsEmailNotification = SPField.fromYesNo(row, 'UseApprovalsEmailNotification', false);
    config.fiscalYearStartYear = row.FiscalYearStartYear as ViewYearFYKeys || ViewYearFYKeys["Next Year"];
    config.listViewColumn = row.ListViewColumn as ListViewKeys[] || [ListViewKeys["displayName"]];
    config.useAddToOutlook = SPField.fromYesNo(row, 'UseAddToOutlook', false);
    config.templateView = row.TemplateView as TemplateViewKeys[] || [TemplateViewKeys["eventTitle"]];
};

const toUpdateListItem = (config: Configuration): IConfigurationUpdateListItem => {
    return {
        // 1.0 fields
        ...{
            Title: config.title,
            SchemaVersion: config.schemaVersion,
            CurrentUpgradeAction: config.currentUpgradeAction,
            FiscalYearSartMonth: config.fiscalYearSartMonth + 1,
            DefaultView: config.defaultView,
            UseRefiners: config.useRefiners,
            RefinerRailInitiallyExpanded: config.refinerRailInitiallyExpanded,
            QuarterViewGroupByRefinerId: config.quarterViewGroupByRefinerId || 0,
            UseApprovals: config.useApprovals,
            AllowConfidentialEvents: config.allowConfidentialEvents,
            UseApprovalsTeamsNotification: config.useApprovalsTeamsNotification,
            UseApprovalsEmailNotification: config.useApprovalsEmailNotification,
            FiscalYearStartYear : config.fiscalYearStartYear,
            ListViewColumn: SPField.toChoiceMulti(config.listViewColumn as any[]),
            UseAddToOutlook: config.useAddToOutlook,
            TemplateView: SPField.toChoiceMulti(config.templateView as any[]),    
        },
        // 1.1 fields
        ...(config.schemaVersion >= 1.1 && {
        })
    };
};

export class ConfigurationLoader extends PagedViewLoader<Configuration> {
    constructor(timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService) {
        super({ ctor: Configuration, view: buildLiveList(ConfigurationList).view_AllItems, timezones, spo, liveUpdate, fastLoad: { useCache: true } });
    }

    protected readonly toEntity = toConfiguration;
    protected readonly updateListItem = toUpdateListItem;
    protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
}