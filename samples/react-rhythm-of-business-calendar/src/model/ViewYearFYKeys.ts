import { stringToEnum } from "common";

export const ViewYearFYKeys = stringToEnum([
    "Current Year",
    "Next Year"
]);

export type ViewYearFYKeys = keyof (typeof ViewYearFYKeys);

export const DefaultViewYearFYKey = ViewYearFYKeys["Next Year"];