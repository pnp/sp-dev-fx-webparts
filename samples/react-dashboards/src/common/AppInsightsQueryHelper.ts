import moment from "moment";
import ApiQueryHelper, { QueryPreset } from "./ApiQueryHelper";
import { ChartStyles } from "./DashboardHelper";
import TimeHelper from "./TimeHelper";

enum TimeSpanKusto {
    "PT1H" = "1h",
    "PT6H" = "6h",
    "PT12H" = "12h",
    "P1D" = "1d",
    "P3D" = "3d",
    "P7D" = "7d",
    "P15D" = "15d",
    "P30D" = "30d",
    "P45D" = "45d",
    "P60D" = "60d",
    "P75D" = "75d",
    "P90D" = "90d"
}

export interface ChartConfig {
    chartStyle: ChartStyles;
    settings: string;
    isSupported: boolean;
}


class AppInsightsQueryHelper extends ApiQueryHelper {

    public static get ClientId(): string {
        return "https://api.applicationinsights.io";
    }
    public static GetUrlQuery = (query: string, dateSpan: string): string => {

        const _setTimeRange = (query: string, dateSpan: string): string => {

            if (dateSpan.includes('-')) {
                const dates: string[] = dateSpan.split('-')
                    .map(dt => {
                        return `"${TimeHelper.getQueryDateFormat(moment(Number(dt)).utc().format())}"`;
                    })

                return query.replaceAll('{TimeRange:start}', dates[0]).replaceAll('{TimeRange:end}', dates[1]);
            }
            else {
                const start = `ago(${AppInsightsQueryHelper.GetKustoTime(dateSpan)})`;
                const end = 'now()';

                return query.replaceAll('{TimeRange:start}', start).replaceAll('{TimeRange:end}', end);
            }
        }

        const queryParam = encodeURIComponent(
            _setTimeRange(
                AppInsightsQueryHelper.GetSanitisedQuery(query),
                dateSpan)
        );

        const timeStamp = dateSpan.includes('-')
            ? dateSpan.split('-')
                .map(dt => {
                    return moment(Number(dt)).format('YYYY-MM-DDThh:mm:ss')
                })
                .join('/')
            : dateSpan

        return (query.indexOf('where timestamp') > 0)
            ? `${queryParam}`
            : `${queryParam}&timespan=${timeStamp}`;

    }
    public static GetKustoTime = (dateSpan: string): string => {
        return TimeSpanKusto[dateSpan as keyof typeof TimeSpanKusto]
    }
    public static GetChartConfig = (query: string): ChartConfig => {
        const regexObj = /render(\s)+(?<vis>\S+)((\s)+with(\s)+\((?<settings>[^)]+))*/g
        const found = regexObj.exec(
            AppInsightsQueryHelper.GetSanitisedQuery(query)
        );
        const chartName = found?.groups?.vis ?? "";

        return {
            chartStyle: ChartStyles[chartName as keyof typeof ChartStyles] ?? null,
            settings: found?.groups?.settings ?? "",
            isSupported: Object.keys(ChartStyles).includes(chartName)
        }
    }
    public static GetAPIEndpoint = (appId: string, dataEndpoint: string): string => {
        return `${AppInsightsQueryHelper.ClientId}/v1/apps/${appId ?? '____'}/${dataEndpoint}?`
    }
    public static IsConfigValid = (isDevMode: boolean, appId: string, appKey?: string): boolean => {
        return isDevMode
            ? appId !== "" && appKey !== ""
            : appId !== ""
    }
}

class AppInsightsQueryLogsHelper extends AppInsightsQueryHelper {
    private static empty: QueryPreset = {
        key: 100,
        text: "---",
        description: "Write your custom Kusto query",
        query: "",
    };
    private static pageViewsTrend: QueryPreset = {
        key: 1,
        text: "Page views trend",
        description: "Chart the page views count",
        query: `pageViews
| where client_Type == 'Browser'
| summarize pageViews = sum(itemCount) by bin(timestamp,30m)
| sort by timestamp asc
| render linechart
    `,
    };
    private static slowestPages: QueryPreset = {
        key: 2,
        text: "Slowest pages",
        description: "What are the 3 slowest pages, and how slow are they? ",
        query: `pageViews
| where notempty(duration) and client_Type == 'Browser'
| extend total_duration=duration*itemCount
| summarize avgDuration=(sum(total_duration)/sum(itemCount)) by operation_Name
| top 3 by avgDuration desc
        `,
    };
    private static operationsPerformance: QueryPreset = {
        key: 3,
        text: "Operations performance ",
        description: "Calculate request count and duration by operations. ",
        query: `requests
| summarize RequestsCount=sum(itemCount), AverageDuration=avg(duration), percentiles(duration, 50, 95, 99) by operation_Name // you can replace 'operation_Name' with another value to segment by a different property
| order by RequestsCount desc // order from highest to lower (descending)`,
    };
    private static pageViewsHeatmap: QueryPreset = {
        key: 4,
        text: "Page views heatmap",
        description: "Display page views heatmap per calendarweek",
        query: `let start = startofweek({TimeRange:start});
let end=  endofweek({TimeRange:end});
let dow = dynamic(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
pageViews
| where timestamp >= start
| where client_Type == 'Browser'
| make-series Metric=sum(itemCount)  default=0 on timestamp in range(start, end, 1d)
| mvexpand timestamp to typeof(datetime), Metric to typeof(long)
| extend WeekDay = toint(dayofweek(timestamp) / 1d), KW=week_of_year(timestamp)
| extend WeekDayName=tostring(dow[WeekDay])
| order by timestamp asc
| project-away timestamp,WeekDay
| evaluate pivot(WeekDayName, sum(Metric))
| project tostring(KW),column_ifexists("Mon",""),column_ifexists("Tue",""),column_ifexists("Wed",""),column_ifexists("Thu",""),column_ifexists("Fri",""),column_ifexists("Sat",""),column_ifexists("Sun","")`,
    };

    protected static override queries: QueryPreset[] = [this.empty, this.pageViewsTrend, this.slowestPages, this.operationsPerformance, this.pageViewsHeatmap];


}


export { AppInsightsQueryHelper, AppInsightsQueryLogsHelper };

