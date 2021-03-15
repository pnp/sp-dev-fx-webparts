import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ISiteContent } from "./ISiteContent";

export interface ISitecontentsState {
  columns: IColumn[];
  items: ISiteContent[];
}
