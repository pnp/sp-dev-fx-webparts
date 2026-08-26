import { IHeroItem } from "@spteck/react-controls-v2";
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { Theme } from "@fluentui/react-components";
import { SPFxHostType } from "./SPFxHostType";

export interface IHeroItemsManagerInternalProps extends IPropertyPaneCustomFieldProps {
  items: IHeroItem[];
  theme: Theme;
  hostType: SPFxHostType;
  /** Called for structural changes (add / delete / reorder) → triggers pane refresh */
  onStructuralChange: (propertyPath: string, newValue: IHeroItem[]) => void;
  /** Called for in-place detail edits → only updates storage, no pane refresh */
  onDetailChange: (propertyPath: string, newValue: IHeroItem[]) => void;
  resolveUrl?: (url: string) => Promise<string>;
}

export interface IHeroItemsManagerHostProps {
  items: IHeroItem[];
  theme: Theme;
  hostType: SPFxHostType;
  onStructuralChange: (items: IHeroItem[]) => void;
  onDetailChange: (items: IHeroItem[]) => void;
  resolveUrl?: (url: string) => Promise<string>;
}
