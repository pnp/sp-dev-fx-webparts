import { stringToEnum } from "../common";

export const TemplateViewKeys = stringToEnum([
  "eventTitle",
  "tag",
  "location",
  "starttime",
]);
export type TemplateViewKeys = keyof (typeof TemplateViewKeys);

export const DefaultTemplateViewKeys = TemplateViewKeys["eventTitle"];