export const defaultDateFormat: string = "MM/DD/YYYY";
export const chartDateFormat: string = "MMM DD, hh:mm A";
export interface IPageViewCountProps {
    oriDate: string;
    date: string;
    sum: number;
}
export interface IPageViewDetailProps {
    oriStartDate: string;
    oriEndDate: string;
    start: string;
    end: string;
    date: string;
    Url: string;
    count: string;
}
export interface IPerfDurationProps {
    PageName: string;
    count: number;
    AvgDuration: number;
    PerDur_50: number;
    PerDur_95: number;
    PerDur_99: number;
}