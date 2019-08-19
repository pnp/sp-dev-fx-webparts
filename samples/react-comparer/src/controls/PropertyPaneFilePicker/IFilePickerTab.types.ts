import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ItemType } from "./IPropertyPaneFilePicker";

export interface IFilePickerTab {
  itemType: ItemType;
  context: WebPartContext;
  accepts: string;
  onSave: (value: string) => void;
  onClose: () => void;
}
