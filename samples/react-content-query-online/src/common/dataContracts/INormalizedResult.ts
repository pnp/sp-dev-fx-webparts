import { IPersonValue } from "./IPersonValue";

export interface INormalizedResult {
  textValue: string;
  htmlValue: string;
  rawValue: any;
  jsonValue: any;
  personValue?: IPersonValue;
}
