import AppInsightsHelper, { AppInsightsHelperSSO } from "../../common/AppInsightsHelper";
import { CacheExpiration, IDashboardContextProps, ILayoutConfig } from "../../common/CommonProps";
import CostManagementHelper from "../../common/CostMngmtHelper";

export interface IInsightsDashboardProps extends ILayoutConfig, IDashboardContextProps {
    helper: AppInsightsHelper | AppInsightsHelperSSO | CostManagementHelper ;
    query: string;
    cacheExpiration: CacheExpiration;
    dateSpan?: string;
}