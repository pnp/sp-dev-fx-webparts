import { IDropdownOption } from "@fluentui/react";
import stringsCommon from "CommonDasboardWebPartStrings";
import moment from "moment";

const defaultDateFormat: string = "L";

//used for dropdown options in AppInsights TimePicker
enum TimeSpanAppInsights {
    "PT1H" = "1 hour",
    "PT6H" = "6 hours",
    "PT12H" = "12 hours",
    "P1D" = "1 day",
    "P3D" = "3 days",
    "P7D" = "7 days",
    "P15D" = "15 days",
    "P30D" = "30 days",
    "P45D" = "45 days",
    "P60D" = "60 days",
    "P75D" = "75 days",
    "P90D" = "90 days"
}

enum TimeSpanCost {
    "MonthToDate" = "This month",//*this is the default
    "BillingMonthToDate" = "Current billing period",
    "TheLastBillingMonth"="Last invoice",
    "TheLastMonth"="Last month",
    "WeekToDate"="Last 7 days"
}

enum TimeSpanKusto{
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


interface dateFormat {
    datetime: string;
    cultureName?: string;
    format?: string;
}

export default class TimeHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static GetTimeOptions<T>(timeSpanOptions: any ): IDropdownOption<any>[] {

        const options = Object.keys(timeSpanOptions).map((key) => {
            return {
                key: key,
                text: timeSpanOptions[key as keyof T].toString(),
            };
        });
        options.push({
            key: "Custom",
            text: stringsCommon.DatePicker_TimeSpanCustom,
        });
        return options;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static get AppInsightsTimeOptions (): IDropdownOption<any>[] {
        return TimeHelper.GetTimeOptions <TimeSpanAppInsights>(TimeSpanAppInsights);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static get CostManagementTimeOptions(): IDropdownOption<any>[] {
        return TimeHelper.GetTimeOptions<TimeSpanCost>(TimeSpanCost);
    }


    public static getFormattedDate = ({ datetime, cultureName, format }: dateFormat): string => {
        if (cultureName) {
            moment.locale(cultureName);
        }
        return moment(datetime).format(format ? format : defaultDateFormat);
    };

    public static getFormattedDateTime = ({ datetime, cultureName, format }: dateFormat): string => {
        if (cultureName) {
            moment.locale(cultureName);
        }
        return `${moment(datetime).format(format ? format : defaultDateFormat)} ${moment(datetime).format('LT')}`;
    };

    public static getQueryDateFormat = (datetime: string): string => {
        return moment(datetime).format('YYYY-MM-DDT00:00:00.000Z');
    }

    public static getFirstDayOfWeek = (cultureName: string): number => {
        moment.locale(cultureName);
        return moment.localeData().firstDayOfWeek() || 0
    }
}

export { TimeSpanCost, TimeSpanAppInsights, TimeSpanKusto };

