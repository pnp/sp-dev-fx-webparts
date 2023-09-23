import { Guid } from "@microsoft/sp-core-library";
import { User } from "common";
import { ListItemEntity } from "common/sharepoint";
import { ViewKeys } from "model";
import { Moment } from "moment-timezone";
import { CurrentSchemaVersion, IRhythmOfBusinessCalendarSchema, RhythmOfBusinessCalendarSchema } from "./RhythmOfBusinessCalendarSchema";

interface IState {
    schemaVersion: number;
    currentUpgradeAction: number;
    fiscalYearSartMonth: number;
    defaultView: ViewKeys;
    useRefiners: boolean;
    refinerRailInitiallyExpanded: boolean;
    quarterViewGroupByRefinerId: number;
    useApprovals: boolean;
    allowConfidentialEvents: boolean;
}

export class Configuration extends ListItemEntity<IState> {
    private _schema: IRhythmOfBusinessCalendarSchema;

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.state.schemaVersion = CurrentSchemaVersion;
        this.state.currentUpgradeAction = 0;
        this.state.fiscalYearSartMonth = 1;
        this.state.defaultView = ViewKeys.monthly;
        this.state.useRefiners = true;
        this.state.refinerRailInitiallyExpanded = true;
        this.state.quarterViewGroupByRefinerId = undefined;
        this.state.useApprovals = false;
        this.state.allowConfidentialEvents = false;

        this._schema = RhythmOfBusinessCalendarSchema;
    }

    public get schema(): IRhythmOfBusinessCalendarSchema { return this._schema; }

    public get schemaVersion(): number { return this.state.schemaVersion; }
    public set schemaVersion(val: number) { this.state.schemaVersion = val; }

    public get currentUpgradeAction(): number { return this.state.currentUpgradeAction; }
    public set currentUpgradeAction(val: number) { this.state.currentUpgradeAction = val; }

    public get schemaRequiresUpgrade(): boolean { return this._schema.version > this.schemaVersion; }

    public get fiscalYearSartMonth(): number { return this.state.fiscalYearSartMonth; }
    public set fiscalYearSartMonth(val: number) { this.state.fiscalYearSartMonth = val; }

    public get defaultView(): ViewKeys { return this.state.defaultView; }
    public set defaultView(val: ViewKeys) { this.state.defaultView = val; }

    public get useRefiners(): boolean { return this.state.useRefiners; }
    public set useRefiners(val: boolean) { this.state.useRefiners = val; }

    public get refinerRailInitiallyExpanded(): boolean { return this.state.refinerRailInitiallyExpanded; }
    public set refinerRailInitiallyExpanded(val: boolean) { this.state.refinerRailInitiallyExpanded = val; }

    public get quarterViewGroupByRefinerId(): number { return this.state.quarterViewGroupByRefinerId; }
    public set quarterViewGroupByRefinerId(val: number) { this.state.quarterViewGroupByRefinerId = val; }

    public get useApprovals(): boolean { return this.state.useApprovals; }
    public set useApprovals(val: boolean) { this.state.useApprovals = val; }

    public get allowConfidentialEvents(): boolean { return this.state.allowConfidentialEvents; }
    public set allowConfidentialEvents(val: boolean) { this.state.allowConfidentialEvents = val; }
}

export type ConfigurationMap = Map<number, Configuration>;
export type ReadonlyConfigurationMap = ReadonlyMap<number, Configuration>;