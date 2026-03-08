import type { IColumnConfig, IScaleConfig } from "@svar-ui/react-gantt";
import { format } from "date-fns";
import * as strings from "GanttWebPartStrings";

export const SVAR_CSS_URL =
  "https://cdn.jsdelivr.net/npm/@svar-ui/react-gantt@2.5.2/dist-full/index.css";

export type GanttScaleKey =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

export const SCALE_PRESETS: Record<GanttScaleKey, IScaleConfig[]> = {
  hour: [
    {
      unit: "day",
      step: 1,
      format: (date: Date) => format(date, "dd MMM yyyy"),
    },
    { unit: "hour", step: 1, format: (date: Date) => format(date, "HH:mm") },
  ],
  day: [
    {
      unit: "month",
      step: 1,
      format: (date: Date) => format(date, "MMMM yyyy"),
    },
    { unit: "day", step: 1, format: (date: Date) => format(date, " d EEEEEE") },
  ],
  week: [
    {
      unit: "month",
      step: 1,
      format: (date: Date) => format(date, "MMMM yyyy"),
    },
    { unit: "week", step: 1, format: (date: Date) => format(date, "'W'w") },
  ],
  month: [
    { unit: "year", step: 1, format: (date: Date) => format(date, "yyyy") },
    { unit: "month", step: 1, format: (date: Date) => format(date, "MMM") },
  ],
  quarter: [
    { unit: "year", step: 1, format: (date: Date) => format(date, "yyyy") },
    { unit: "quarter", step: 1, format: (date: Date) => format(date, "QQQ") },
  ],
  year: [
    { unit: "year", step: 1, format: (date: Date) => format(date, "yyyy") },
  ],
};

export const DEFAULT_SCALE: GanttScaleKey = "day";

export const DEFAULT_SCALES: IScaleConfig[] = SCALE_PRESETS[DEFAULT_SCALE];

export const getColumnDefs = (): Record<string, IColumnConfig> => ({
  text: {
    id: "text",
    header: strings.ColumnTaskName,
    flexgrow: 2,
    sort: false,
  },
  start: {
    id: "start",
    header: strings.ColumnStartDate,
    flexgrow: 1,
    align: "center",
    sort: false,
  },
  duration: {
    id: "duration",
    header: strings.ColumnDuration,
    width: 90,
    align: "center",
    sort: false,
  },
  end: {
    id: "end",
    header: strings.ColumnEndDate,
    flexgrow: 1,
    align: "center",
    sort: false,
  },
  progress: {
    id: "progress",
    header: strings.ColumnProgress,
    width: 90,
    align: "center",
    sort: false,
  },
});

export const getDefaultColumns = (): IColumnConfig[] => {
  const defs = getColumnDefs();
  return [defs.text, defs.start, defs.duration];
};
