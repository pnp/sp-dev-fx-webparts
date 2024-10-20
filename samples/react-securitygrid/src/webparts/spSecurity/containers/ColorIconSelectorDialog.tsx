import * as React from 'react';
import { Button, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ColorPicker } from "@fluentui/react/lib/ColorPicker";
import { IColor } from "@fluentui/react/lib/Color";
import { Dialog } from "@fluentui/react/lib/Dialog";
import { TextField } from "@fluentui/react/lib/TextField";
import { Icon } from "@fluentui/react/lib/Icon";
import { ComboBox, IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { Label } from '@fluentui/react/lib/Label';
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import { SPPermission } from "@microsoft/sp-page-context";
import { findIndex } from "lodash";

export interface IColorIconSelectorPanelProps {
  isOpen: boolean;
  onPermissionChange: (perm: ISelectedPermission) => void;
  closePanel: () => void;
  title: string;
  subText: string;
  currentPerm: ISelectedPermission;
  SelectedPermissions: ISelectedPermission[];
}

export interface IColorIconSelectionPanelState {
  currentPerm: ISelectedPermission;
}

export default class ColorIconSelectionPanel extends React.Component<IColorIconSelectorPanelProps, IColorIconSelectionPanelState> {

  private iconNames: string[] = [
    "Add", "Back", "BlockContact", "Cancel", "Cat", "CheckBox", "CheckBoxComposite", "CheckMark",
    "ChevronDown", "ChevronUp", "CircleFill", "CircleRing", "Clear", "Contact", "Contrast", "Delete",
    "Design", "eDiscovery", "Edit", "EditSolid12", "Emoji2", "Error", "FavoriteStar", "FavoriteStarFill",
    "Glasses", "HomeSolid", "IncidentTriangle", "LaptopSecure", "LifeSaver", "LifeSaverLock", "Lock",
    "LockSolid", "Mail", "More", "PageLink", "People", "PeopleAdd", "Permissions", "PinSolid12", "RedEye",
    "Sad", "SecurityGroup", "Settings", "Share", "Sync", "TriangleSolid", "UnEditable", "UnEditable2",
    "Unlock", "UserWarning", "View"
  ];

  constructor(props: IColorIconSelectorPanelProps) {
    super(props);
    this.state = {
      currentPerm: { ...this.props.currentPerm } // Ensure immutability of props
    };
  }

  private saveChanges(): void {
    this.props.onPermissionChange(this.state.currentPerm);
    this.onClosePanel();
  }

  private onClosePanel(): void {
    this.props.closePanel();
  }

  private renderIcon(option?: IComboBoxOption): JSX.Element {
    return (
      <div>
        <Icon iconName={option?.text} /> {option?.text}
      </div>
    );
  }

  private getIconOptions(): IComboBoxOption[] {
    return this.iconNames.map(iconName => ({
      key: iconName,
      text: iconName
    }));
  }

  public getPermissionTypes(): IDropdownOption[] {
    return Object.keys(SPPermission).map((perm) => {
      const isDisabled = findIndex(this.props.SelectedPermissions, sp => sp.permission === perm) !== -1;
      if (typeof SPPermission[perm as keyof typeof SPPermission] === "object") {
        return { text: perm, key: perm, disabled: isDisabled };
      }
      return null;
    }).filter(Boolean) as IDropdownOption[]; // Remove null values
  }

  public render(): JSX.Element {
    const { currentPerm } = this.state;

    return (
      <Dialog
        isOpen={this.props.isOpen}
        onDismiss={this.onClosePanel.bind(this)}
        title={this.props.title}
        subText={this.props.subText}
      >
        <Dropdown
          label="Permission"
          options={this.getPermissionTypes()}
          defaultSelectedKey={currentPerm.permission}
          onChange={(event, option) => {
            const updatedPerm = { ...currentPerm, permission: option?.text || '' };
            this.setState({ currentPerm: updatedPerm });
          }}
        />
        <TextField
          label="Freindly Name"
          defaultValue={currentPerm.freindlyName}
          onChange={(event, newValue) => {
            const updatedPerm = { ...currentPerm, freindlyName: newValue || '' };
            this.setState({ currentPerm: updatedPerm });
          }}
        />
        <Label>Color:</Label>
        <ColorPicker
          color={currentPerm.color}
          onChange={(event, color: IColor) => {
            const updatedPerm = { ...currentPerm, color: color.str };
            this.setState({ currentPerm: updatedPerm });
          }}
        />
        <ComboBox
          allowFreeform
          label="Select Icon (or enter name of a Fabric Icon):"
          options={this.getIconOptions()}
          onRenderOption={this.renderIcon.bind(this)}
          text={currentPerm.iconName}
          onChange={(event, option, index, value) => {
            const updatedPerm = { ...currentPerm, iconName: value || option?.text || '' };
            this.setState({ currentPerm: updatedPerm });
          }}
        />
        <Label>Display:</Label>
        <Icon iconName={currentPerm.iconName} style={{ color: currentPerm.color }} />
        <br />
        <Button onClick={this.onClosePanel.bind(this)}>Cancel</Button>
        <PrimaryButton
          disabled={
            !currentPerm.color ||
            !currentPerm.freindlyName ||
            !currentPerm.iconName ||
            !currentPerm.permission
          }
          onClick={this.saveChanges.bind(this)}
        >
          Save
        </PrimaryButton>
      </Dialog>
    );
  }
}
