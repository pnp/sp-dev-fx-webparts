import * as React from "react";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITenantUserPickerProps {
  context: WebPartContext;
  pickedUserEmail: string;
  onPickedTenantUserChanged: (loginName: string) => void;
}

const TenantUserPicker: React.FunctionComponent<ITenantUserPickerProps> = (props) => {
  const selectedItemsHandler = (items: any[]) => {
    console.debug("TenantUserPicked selection handler", items);
    if (items.length) {
      const item = items[0];
      const loginName: string = item.loginName;
      props.onPickedTenantUserChanged(loginName);
    } else {
      props.onPickedTenantUserChanged(undefined);
    }
  };

  return (
    <PeoplePicker
      context={props.context}
      placeholder="Enter tenant user name"
      principalTypes={[PrincipalType.User]}
      selectedItems={selectedItemsHandler}
      ensureUser={false}
      defaultSelectedUsers={[props.pickedUserEmail]}
    />
  );
};

export default TenantUserPicker;
