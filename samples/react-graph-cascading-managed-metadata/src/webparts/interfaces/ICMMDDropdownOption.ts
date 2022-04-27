import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ICoordinates } from "@pnp/spfx-controls-react/lib/Map";

export interface ICMMDDropdownOption extends IDropdownOption {
    data: ICoordinates;
    parent?: string;
}
