import { ILocationPickerItem } from "@pnp/spfx-controls-react/lib/LocationPicker";

export interface IHelloWorldProps {
  properties: {
    description: string;
    pnpListPicker: string;
    pnpListItemPicker: any[];
    pnpLocationPicker: ILocationPickerItem;
    pnpPeoplePicker: any[];
  };
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
