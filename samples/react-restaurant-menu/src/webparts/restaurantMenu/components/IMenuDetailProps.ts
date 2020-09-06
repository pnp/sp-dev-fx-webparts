import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import {
  IReadonlyTheme,
} from "@microsoft/sp-component-base";
import { EWeekdays } from "./EWeekDays";
import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";
export interface IMenuDetailProps {
  dayOfWeek: EWeekdays;
  themeVariant: IReadonlyTheme  ;
  listId:string;
  site:any[];
  dateFieldName: string;
  soupFieldName: string;
  meatFieldName: string;
  fishFieldName: string;
  dietFieldName :string;
  veganFieldName: string;
  dessertFieldName: string;
}
