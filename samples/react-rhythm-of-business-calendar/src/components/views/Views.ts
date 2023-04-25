import { arrayToMap } from "common";
import { IViewDescriptor } from "./IViewDescriptor";
import { DayViewDescriptor } from "./day/DayView";
import { WeekViewDescriptor } from "./week/WeekView";
import { MonthViewDescriptor } from "./month/MonthView";
import { QuarterViewDescriptor } from "./quarter/QuarterView";

export const ViewDescriptors: IViewDescriptor[] = [
    DayViewDescriptor,
    WeekViewDescriptor,
    MonthViewDescriptor,
    QuarterViewDescriptor
];

export const ViewDescriptorsById = arrayToMap(ViewDescriptors, v => v.id);