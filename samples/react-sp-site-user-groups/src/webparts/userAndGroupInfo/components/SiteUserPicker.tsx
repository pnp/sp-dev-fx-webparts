import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useConstCallback } from "@uifabric/react-hooks";
import { DefaultButton } from "office-ui-fabric-react";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { List } from "office-ui-fabric-react/lib/List";
import { Persona } from "office-ui-fabric-react/lib/Persona";

import SpUserGroupLookup from "../../../services/SpUserGroupLookup";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

import styles from "./UserAndGroupInfo.module.scss";

export interface ISiteUserPickerProps {
  context: WebPartContext;
  spUserGroupLookup: SpUserGroupLookup;
  onSelectedUserChanged: (siteUserId: number, email: string) => void;
}

const SiteUserPicker: React.FunctionComponent<ISiteUserPickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [siteUserInfos, setSiteUserInfos] = React.useState([] as ISiteUserInfo[]);
  const [filteredSiteUserInfos, setFilteredSiteUserInfos] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(undefined);

  React.useEffect(() => {
    props.spUserGroupLookup.getSpSiteUsers().then((_) => setSiteUserInfos(_));
  }, [props.spUserGroupLookup]);

  React.useEffect(() => {
    if (filter) {
      setFilteredSiteUserInfos(siteUserInfos.filter((i) => i.Title.toLowerCase().includes(filter.toLowerCase())));
    } else {
      setFilteredSiteUserInfos(siteUserInfos);
    }
  }, [filter, siteUserInfos]);

  React.useEffect(() => {
    setFilteredSiteUserInfos([...filteredSiteUserInfos]);
  }, [selectedUser]);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    setFilter(text);
  };

  const personaClickedHandler = (siteUserInfo: ISiteUserInfo) => {
    setSelectedUser(siteUserInfo);
    setIsOpen(false);
    props.onSelectedUserChanged(siteUserInfo.Id, siteUserInfo.Email);
  };

  const onRenderCell = (item: ISiteUserInfo) => {
    const classes = [styles.SiteUser];
    if (item === selectedUser) {
      classes.push(styles.Active);
    }

    return (
      <div className={classes.join(" ")} onClick={() => personaClickedHandler(item)}>
        <Persona text={item.Title} />
      </div>
    );
  };

  return (
    <>
      <DefaultButton text="Select site user" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        isLightDismiss
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        headerText="Select site user"
      >
        <TextField label="Filter by Name:" value={filter} onChange={onFilter} />
        <List className={styles.SiteUserList} items={filteredSiteUserInfos} onRenderCell={onRenderCell} />
      </Panel>
    </>
  );
};

export default SiteUserPicker;
