import moment from "moment";
import ApiQueryHelper, { DropDownOption, QueryPreset } from "./ApiQueryHelper";
import { ICostManagementConfig } from "./CommonProps";
import { TimeSpanCost } from "./TimeHelper";
export enum CostManagementScope {
    Subscription = 1,
    ResourceGroup,
    ManagementGroup,
}

//#region Cost Management Query Presets
const jsonCostByService = {
    "type": "Usage",
    "timeframe": "MonthToDate",
    "dataset": {
        "granularity": "Monthly",
        "filter": {
            "tags": {
                "name": "Environment",
                "operator": "In",
                "values": [
                    "Build",
                    "Dev",
                    "Test",
                    "UAT",
                    "Prod"
                ]
            }
        },
        "grouping": [
            {
                "type": "Dimension",
                "name": "ServiceName"
            }
        ],
        "aggregation": {
            "totalCost": {
                "name": "Cost",
                "function": "Sum"
            }
        }
    }
}
const jsonAzureMonitorCosts = {
    "type": "Usage",
    "timeframe": "MonthToDate",
    "dataset": {
        "granularity": "Monthly",
        "filter": {
            "dimensions": {
                "name": "MeterCategory",
                "operator": "In",
                "values": [
                    "Azure Monitor",
                    "Log Analytics"
                ]
            }
        },
        "grouping": [
            {
                "type": "Dimension",
                "name": "ServiceName"
            },
            {
                "type": "TagKey",
                "name": "Environment"
            }
        ],
        "aggregation": {
            "totalCost": {
                "name": "PreTaxCost",
                "function": "Sum"
            }
        }
    }
}
const jsonAccumulatedCosts = {
    "type": "Usage",
    "timeframe": "MonthToDate",
    "dataset": {
        "granularity": "Accumulated",
        "filter": {
            "tags": {
                "name": "Environment",
                "operator": "In",
                "values": [
                    "Build",
                    "Dev",
                    "Test",
                    "UAT",
                    "Prod"
                ]
            }
        },
        "grouping": [
            {
                "type": "Dimension",
                "name": "ServiceName"
            }
        ],
        "aggregation": {
            "totalCost": {
                "name": "PreTaxCost",
                "function": "Sum"
            }
        }
    }
}
//#endregion

export default class CostMngmtQueryHelper extends ApiQueryHelper {

    //#region query presets
    private static empty: QueryPreset = {
        key: 100,
        text: "---",
        description: "Write your custom body",
        query: "",
    };
    private static getCostBilling: QueryPreset = {
        key: 1,
        text: "Cost by service",
        description: "Get usage cost by service for the current billing period",
        query: JSON.stringify(jsonCostByService, null, 2),
        columnsOrdering: ['ServiceName', 'Cost', 'Currency'], //String, Number,String
    }
    private static getAccumulatedCostBilling: QueryPreset = {
        key: 2,
        text: "Accumulated costs",
        description: "Get Accumulated usage costs for the last month",
        query: JSON.stringify(jsonAccumulatedCosts, null, 2),
        columnsOrdering: ['ServiceName', 'PreTaxCost', 'Currency'], //String, Number,String
    }
    private static getAzMonitorCostBilling: QueryPreset = {
        key: 3,
        text: "Azure Monitor costs",
        description: "Get Azure Monitor usage cost for the last month",
        query: JSON.stringify(jsonAzureMonitorCosts, null, 2),
        columnsOrdering: ['ServiceName', 'PreTaxCost', 'Currency'],
    }
    //#endregion

    protected static queries: QueryPreset[] = [this.empty, this.getCostBilling, this.getAccumulatedCostBilling, this.getAzMonitorCostBilling];

    public static get Scopes(): DropDownOption[] {
        return [
            { key: CostManagementScope.Subscription, text: "Subscription" },
            { key: CostManagementScope.ResourceGroup, text: "Resource Group" },
            { key: CostManagementScope.ManagementGroup, text: "Management Group" },
        ]
    }
    public static get ClientId(): string {
        return "https://management.azure.com";
    }
    public static get ApiVersion(): string {
        return "2022-10-01";
    }
    public static GetAPIEndpoint(scope: CostManagementScope, config: { subscriptionId?: string, resourceGroupName?: string, managementGroupId?: string }): string {
        const scopePath = this.getEndpoint(scope, config);
        return `${CostMngmtQueryHelper.ClientId}/${scopePath}/providers/Microsoft.CostManagement`;
    }
    public static GetAPIEndpointFull(baseUrl: string): string {
            return `${baseUrl}/query?api-version=${CostMngmtQueryHelper.ApiVersion}`;
    }

    public static IsConfigValid(config: ICostManagementConfig): boolean {
        switch (config.scope) {
            case CostManagementScope.Subscription:
                return !!config.subscriptionId //!== "";
            case CostManagementScope.ResourceGroup:
                return !!config.resourceGroupName && !!config.subscriptionId
            case CostManagementScope.ManagementGroup:
                return !!config.managementGroupId
            default:
                return false;
        }
    }
    public static GetSanitisedQuery = (query: string): string => {
        return JSON.stringify(
            JSON.parse(query),
            null,
            0);
    }
    public static ShouldShowForecast(query: string): boolean {
        const queryObj = JSON.parse(query);
        if (queryObj.timeframe) {
            const timeframe = queryObj.timeframe;
            if (Object.keys(TimeSpanCost).includes(timeframe)) {
                switch (TimeSpanCost[timeframe as keyof typeof TimeSpanCost]) {
                    case TimeSpanCost.BillingMonthToDate:
                    case TimeSpanCost.MonthToDate:
                        return true;
                    default:
                        return false;
                }
            }
        }
        else if (queryObj.timePeriod) {
            const timePeriod = queryObj.timePeriod;
            if (moment(timePeriod.from).isValid() && moment(timePeriod.to).isValid()) {
                //is timeperiod.from this month?
                if (moment(timePeriod.from).isSame(moment(), 'month')) {
                    return true;
                }
            }
        }
        return false;
    }
    public static GetGroupBy(query: string): string[] {
        const queryObj = JSON.parse(query);
        if (queryObj.dataset && queryObj.dataset.grouping) {
            return queryObj.dataset.grouping.map((g: {name:string}) => g.name);
        }
        return [];
    }

    private static getEndpoint(scope: CostManagementScope, config: { subscriptionId?: string, resourceGroupName?: string, managementGroupId?: string }): string {

        switch (scope) {
            case CostManagementScope.Subscription:
                return `subscriptions/${config.subscriptionId ?? '____'}`; //'/subscriptions/{subscriptionId}/' for subscription scope,
            case CostManagementScope.ResourceGroup:
                return `subscriptions/${config.subscriptionId ?? '____'}/resourceGroups/${config.resourceGroupName ?? '____'}`; //'/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope,
            case CostManagementScope.ManagementGroup:
                return `/providers/Microsoft.Management/managementGroups/${config.managementGroupId ?? '____'}` //'/providers/Microsoft.Management/managementGroups/{managementGroupId} for Management Group scope,
            default:
                return "____";
        }
    }


}