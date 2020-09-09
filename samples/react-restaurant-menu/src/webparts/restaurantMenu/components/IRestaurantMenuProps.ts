import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import {
  IReadonlyTheme,
} from "@microsoft/sp-component-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";
export interface IRestaurantMenuProps {
  title: string;
  site: IPropertyFieldSite[];
  listId: string;
  dateFieldName: string;
  soupFieldName: string;
  meatFieldName: string;
  fishFieldName: string;
  veganFieldName: string;
  dietFieldName: string;
  dessertFieldName: string;
  themeVariant: IReadonlyTheme | undefined;
  showBox:boolean;
  displayMode: DisplayMode;
  propertyPanel: IPropertyPaneAccessor;
  updateProperty: (value: string) => void;
}
