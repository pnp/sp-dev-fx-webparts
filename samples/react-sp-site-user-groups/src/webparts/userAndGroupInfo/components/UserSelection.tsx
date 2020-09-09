import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { Stack } from "office-ui-fabric-react";
import TenantUserPicker from "./TenantUserPicker";
import SpUserGroupLookup from "../../../services/SpUserGroupLookup";
import SiteUserPicker from "./SiteUserPicker";

import styles from "./UserAndGroupInfo.module.scss";

export interface IUserSelectionProps {
  context: WebPartContext;
  userGroupLookup: SpUserGroupLookup;
  onSelectedUserChanged: (siteUserId: number, email: string) => void;
}

const UserSelection: React.FunctionComponent<IUserSelectionProps> = (props) => {
  const [pickedUserEmail, setPickedUserEmail] = React.useState(props.context.pageContext.user.email);

  const pickedTenantUserHandler = (loginName: string) => {
    if (loginName) {
      const email = loginName.substring(loginName.lastIndexOf("|") + 1);
      props.userGroupLookup.getSpSiteUserByLoginName(loginName).then((userInfo) => {
        setPickedUserEmail(email);
        if (userInfo) {
          props.onSelectedUserChanged(userInfo.Id, email);
        } else {
          props.onSelectedUserChanged(undefined, email);
        }
      });
    } else {
      setPickedUserEmail(undefined);
      props.onSelectedUserChanged(undefined, undefined);
    }
  };

  const pickedSiteUserHandler = (siteUserId: number, email: string) => {
    setPickedUserEmail(email);
    props.onSelectedUserChanged(siteUserId, email);
  };

  return (
    <Stack horizontal disableShrink>
      <div className={styles.TenantUserPicker}>
        <TenantUserPicker
          context={props.context}
          pickedUserEmail={pickedUserEmail}
          onPickedTenantUserChanged={pickedTenantUserHandler}
        />
      </div>
      <div className={styles.SiteUserPicker}>
        <SiteUserPicker
          context={props.context}
          spUserGroupLookup={props.userGroupLookup}
          onSelectedUserChanged={pickedSiteUserHandler}
        />
      </div>
    </Stack>
  );
};

export default UserSelection;
