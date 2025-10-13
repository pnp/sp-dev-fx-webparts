import * as React from "react";
import * as strings from 'ManageSchemaExtensionsWebPartStrings';

import {
  ArrowSync20Regular,
  Delete20Regular,
  DocumentText20Regular,
  Edit20Regular,
  MoreVertical20Regular,
} from "@fluentui/react-icons";
import {
 Menu,
 MenuButton,
 MenuItem,
 MenuList,
 MenuPopover,
 MenuProps,
 MenuTrigger,
} from "@fluentui/react-components";

import { ISchemaExtension } from "../../models/ISchemaExtension";
import { css } from "@emotion/css";

// Global state to track open menus by schema extension ID
const openMenus = new Set<string>();

export interface ISchemaExtensionActionsMenuProps {
      schemaExtension: ISchemaExtension;
  onChangeStatus?: (schemaExtension: ISchemaExtension) => void;
  onEdit?: (schemaExtension: ISchemaExtension) => void;
  onDelete?: (schemaExtension: ISchemaExtension) => void;
  onView?: (schemaExtension: ISchemaExtension) => void;
  buttonSize?: "small" | "medium" | "large";
  buttonAppearance?:
    | "primary"
    | "secondary"
    | "outline"
    | "subtle"
    | "transparent";
  disabled?: boolean;
  setSelectedRow?: (row: ISchemaExtension) => void;
}

export const SchemaExtensionActionsMenu: React.FunctionComponent<
  ISchemaExtensionActionsMenuProps
> = (
  props: React.PropsWithChildren<ISchemaExtensionActionsMenuProps>
): JSX.Element => {
  const {
    schemaExtension,
    onChangeStatus,
    onEdit,
    onDelete,
    onView,
    buttonSize = "small",
    buttonAppearance = "subtle",
    disabled = false,
  } = props;

  const { status } = schemaExtension;
  // Use a stable ID that doesn't change on re-renders
  // this Pattern is required for manage events on controls when DataGrid is defined to select row,
  // DataGrid don't handle well nested controls with events
  const menuId = React.useMemo(() => 
    schemaExtension.id || `menu-${schemaExtension.description?.substring(0, 10) || 'unknown'}`, 
    [schemaExtension.id, schemaExtension.description]
  );
  
  // Initialize state from global set
  const [isOpen, setIsOpen] = React.useState(() => openMenus.has(menuId));
 
  const menuRef = React.useRef<HTMLButtonElement>(null);

  const onOpenChange: MenuProps["onOpenChange"] = React.useCallback(
    (event, data) => {
      setIsOpen(data.open);
      if (data.open) {
        openMenus.add(menuId);
      } else {
        openMenus.delete(menuId);
      }
    },
    [menuId]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      openMenus.delete(menuId);
    };
  }, [menuId]);

  const handleChangeStatusClick = (event: React.MouseEvent): void => {
    setIsOpen(false);
    openMenus.delete(menuId);
    onChangeStatus?.(schemaExtension);
  };

  const handleEditClick = (event: React.MouseEvent): void => {
    setIsOpen(false);
    openMenus.delete(menuId);
    onEdit?.(schemaExtension);
  };

  const handleViewClick = (event: React.MouseEvent): void => {
    setIsOpen(false);
    openMenus.delete(menuId);
    onView?.(schemaExtension);
  };

  const handleDeleteClick = (event: React.MouseEvent): void => {
    setIsOpen(false);
    openMenus.delete(menuId);
    onDelete?.(schemaExtension);
  };

  const containerStyles = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
     
    position: "absolute",
    top: 10,
    right: 5,
  
  });

  return (
    <div className={containerStyles}>
      <Menu open={isOpen} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            ref={menuRef}
            appearance={buttonAppearance}
            icon={<MoreVertical20Regular />}
            aria-label={strings.ActionsMenuLabel}
            size={buttonSize}
            disabled={disabled}
             
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem
              icon={<DocumentText20Regular />}
              onClick={handleViewClick}
              disabled={disabled}
            >
              {strings.ViewDetailsAction}
            </MenuItem>
            <MenuItem
              icon={<ArrowSync20Regular />}
              onClick={handleChangeStatusClick}
              disabled={disabled}
            >
              {strings.ChangeStatusAction}
            </MenuItem>
            <MenuItem
              icon={<Edit20Regular />}
              onClick={handleEditClick}
              disabled={disabled || status === "Available"}
            >
              {strings.EditAction}
            </MenuItem>
            <MenuItem
              icon={<Delete20Regular />}
              onClick={handleDeleteClick}
              disabled={disabled || status === "Available"}
            >
              {strings.DeleteAction}
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
