import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPalettePickerWebPartProps } from "../PalettePickerWebPart";

export interface ICustomPropertyPaneProps {
    context: WebPartContext;
    properties: IPalettePickerWebPartProps;
    updateWebPartProperty: Function;
}