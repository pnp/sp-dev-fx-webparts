import { IUserValue } from "./IUserValue";

export interface INormalizedResult {
  textValue: string;
  htmlValue: string;
  rawValue: any;
  jsonValue: any;
  userValue?: IUserValue;
}
