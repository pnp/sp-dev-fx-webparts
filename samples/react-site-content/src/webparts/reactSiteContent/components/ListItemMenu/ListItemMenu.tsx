import * as React from "react";

import { MenuList, MenuItem, MenuProps, Menu, MenuTrigger, MenuPopover, Link } from "@fluentui/react-components";
import { CustomMenuTrigger } from "../CustomMenuTrigger/CustomMenuTrigger";
import { IListViewItem } from "../../models/IListViewItem";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IListItemMenuProps {
  item: IListViewItem;
  context: WebPartContext;
  onDriveInfoClick: () => void;
}

export const ListItemMenu = (props: IListItemMenuProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    setOpen(data.open);
  };

  const handleDriveIdClick = (): void => {
    setOpen(false);
    props.onDriveInfoClick();
  };

  return (
    <>
      {props.item.BaseTemplate > 0 && (
        <Menu open={open} onOpenChange={onOpenChange}>
          <MenuTrigger disableButtonEnhancement>
            <CustomMenuTrigger />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>
                <Link
                  target="_blank"
                  data-interception="off"
                  href={`${props.context.pageContext.web.absoluteUrl}/_layouts/15/listedit.aspx?List=${props.item.AppId}`}
                  style={{ color: "inherit" }}
                >
                  Settings
                </Link>
              </MenuItem>
              {props.item.Type !== "List" && <MenuItem onClick={handleDriveIdClick}>Details</MenuItem>}
            </MenuList>
          </MenuPopover>
        </Menu>
      )}
    </>
  );
};
