
import { DisplayMode } from "@microsoft/sp-core-library";
import { Theme} from 'spfx-uifabric-themes';

export interface IListItemsMenuProps {
  title: string;
  listId:string;
  listBaseTemplate:number;
  fieldName:string;
  locale:string;
  themeVariant: Theme | undefined;
  onConfigure: () => void;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
