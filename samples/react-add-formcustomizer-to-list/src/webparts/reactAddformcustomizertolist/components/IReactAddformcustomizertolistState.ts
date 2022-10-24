import { ISite } from "@pnp/spfx-controls-react/lib/controls/sitePicker/ISitePicker";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IReactAddformcustomizertolistState {
    siteUrl: string;
    sites: ISite[];
    errors: string[];
    contentTypes: IDropdownOption[];
    NewForm: boolean;
    EditForm: boolean;
    ViewForm: boolean;
    disabled: boolean;
    selectedContnetType: string;
    selectedList: string;
    clientComponentID: string;
    isCalloutVisible: boolean;
    userMessage: string;
    hideDialog: boolean;
    chkCustomSiteUrl: boolean;
}
