import { IFieldInfo } from "@pnp/sp/fields";

export interface PageProperty {
  info: IFieldInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[];
}
