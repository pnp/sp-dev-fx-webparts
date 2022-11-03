import { stringToEnum } from "common";

export const ViewKeys = stringToEnum([
    "daily",
    "weekly",
    "monthly",
    "quarter"
]);

export type ViewKeys = keyof (typeof ViewKeys);

export const DefaultViewKey = ViewKeys.monthly;