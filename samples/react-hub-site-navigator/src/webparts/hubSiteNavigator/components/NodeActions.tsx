import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { Copy20Regular, Info20Regular, MoreHorizontal20Regular, Open20Regular } from "@fluentui/react-icons";
import * as React from "react";
import { IAssociatedHubSiteInfo } from "../../../common/models/IAssociatedHubSiteInfo";
import { IHubSiteInfo } from "@pnp/sp/hubsites";
import { INodeActionsProps } from "./IHubSiteNavigator";

export const NodeActions = ({ node, isHubSite, onMoreInfoClick }: INodeActionsProps): JSX.Element => {
  const url = isHubSite ? (node as IHubSiteInfo).SiteUrl : (node as IAssociatedHubSiteInfo).Path;
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Handle error (e.g., show an error message to the user)
    }
  };
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button aria-label="More options" appearance="subtle" size="small" icon={<MoreHorizontal20Regular />} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem icon={<Open20Regular />} onClick={() => window.open(url, "_blank")}>
            Open in New Tab
          </MenuItem>
          <MenuItem icon={<Copy20Regular />} onClick={copyToClipboard}>
            Copy URL
          </MenuItem>

          <MenuItem icon={<Info20Regular />} onClick={() => onMoreInfoClick(url)}>
            View Info
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
