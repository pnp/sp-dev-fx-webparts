import * as React from 'react';

import { ListPicker } from '@pnp/spfx-controls-react/lib/ListPicker';
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { LocationPicker, ILocationPickerItem } from "@pnp/spfx-controls-react/lib/LocationPicker";

import { PropertyPanePortal } from 'property-pane-portal';

import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';

export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {

  return (
    <PropertyPanePortal context={props.context}>
      <ListPicker
        data-property="pnpListPicker"
        context={props.context as any}
        label="PnP List and Item Picker"
        placeHolder="Select your list(s)"
        selectedList={props.properties["pnpListPicker"]}
        baseTemplate={100}
        includeHidden={false}
        multiSelect={false}
        onSelectionChanged={(list: any) => {
          props.updateWebPartProperty("pnpListPicker", list);
          props.updateWebPartProperty("pnpListItemPicker", []);
        }}
      />
      {(props.properties["pnpListPicker"]) && (props.properties["pnpListPicker"].length == 36) &&
        <ListItemPicker
          data-property="pnpListItemPicker"
          listId={props.properties["pnpListPicker"]}
          defaultSelectedItems={props.properties["pnpListItemPicker"]}
          columnInternalName='Title'
          keyColumnInternalName='Id'
          orderBy={"Id desc"}
          itemLimit={2}
          onSelectedItem={(item: any) => props.updateWebPartProperty("pnpListItemPicker", item)}
          context={props.context as any}
        />
      }
      <LocationPicker
        data-property="pnpLocationPicker"
        context={props.context as any}
        defaultValue={props.properties["pnpLocationPicker"]}
        label="PnP Location"
        onChange={(locValue: ILocationPickerItem) => props.updateWebPartProperty("pnpLocationPicker", locValue)}
      />
      <PeoplePicker
        data-property="pnpPeoplePicker"
        context={props.context as any}
        titleText="PnP People Picker"
        personSelectionLimit={3}
        defaultSelectedUsers={props.properties["pnpPeoplePicker"]?.map(user => user.secondaryText)}
        showtooltip={true}
        required={false}
        disabled={false}
        onChange={(items: any) => props.updateWebPartProperty("pnpPeoplePicker", items)}
        showHiddenInUI={false}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
      />
    </PropertyPanePortal>
  );
};