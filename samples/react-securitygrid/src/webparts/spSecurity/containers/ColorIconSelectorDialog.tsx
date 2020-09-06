import * as React from 'react';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { IColor } from "office-ui-fabric-react/lib/Color";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { ComboBox, IComboBox, IComboBoxOption, } from "office-ui-fabric-react/lib/ComboBox";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import { SPPermission } from "@microsoft/sp-page-context";
import { findIndex } from "lodash";
export interface IColorIconSelectorPanelProps {
  isOpen: boolean;
  onPermissionChange(color: ISelectedPermission): void;
  closePanel(): void;
  title: string;
  subText: string;
  currentPerm: ISelectedPermission;
  SelectedPermissions: ISelectedPermission[];
}
export interface IColorIconSelectionPanelState {
  currentPerm: ISelectedPermission;
}
export default class ColorIconSelectionPanel extends React.Component<IColorIconSelectorPanelProps, IColorIconSelectionPanelState> {

  private iconNames = [
    "Add",
    "Back",
    "BlockContact",
    "Cancel",
    "Cat",
    "CheckBox",
    "CheckBoxComposite",
    "CheckMark",
    "ChevronDown",
    "ChevronUp",
    "CircleFill",
    "CircleRing",
    "Clear",
    "Contact",
    "Contrast",
    "Delete",
    "Design",
    "eDiscovery",
    "Edit",
    "EditSolid12",
    "Emoji2",
    "Error",
    "FavoriteStar",
    "FavoriteStarFill",
    "Glasses",
    "HomeSolid",
    "IncidentTriangle",
    "LaptopSecure",
    "LifeSaver",
    "LifeSaverLock",
    "Lock",
    "LockSolid",
    "Mail",
    "More",
    "PageLink",
    "People",
    "PeopleAdd",
    "Permissions",
    "PinSolid12",
    "RedEye",
    "Sad",
    "SecurityGroup",
    "Settings",
    "Share",
    "Sync",
    "TriangleSolid",
    "UnEditable",
    "UnEditable2",
    "Unlock",
    "UserWarning",
    "View",



  ];
  constructor(props: IColorIconSelectorPanelProps) {
    super(props);
    //debugger;

    this.state = {
      currentPerm: this.props.currentPerm
    };
  }

  private saveChanges(): void {
    this.props.onPermissionChange(this.state.currentPerm);
    this.onClosePanel();
  }

  private onClosePanel(element?: any): void {
    this.props.closePanel();
  }
  private renderIcon(props?, defaultRender?: (props?) => JSX.Element | null): JSX.Element {

    return (<div>
      <Icon iconName={props.text} /> {props.text}
    </div>);
  }




  private getIconOptions(): IComboBoxOption[] {
    let options: IComboBoxOption[] = [];
    for (var iconName of this.iconNames) {
      var option: IComboBoxOption = {
        key: iconName, text: iconName,
      };
      options.push(option);
    }
    return options;
  }
  public getPermissionTypes(): IDropdownOption[] {
    let perms = new Array<IDropdownOption>();
    for (const perm in SPPermission) {
      if (typeof (SPPermission[perm]) === "object") {
        perms.push({
          text: perm,
          key: perm,
          disabled: findIndex(this.props.SelectedPermissions, (sp: ISelectedPermission) => { return sp.permission == perm; }) !== -1
        });
      }
    }
    return perms;
  }
  public render(): JSX.Element {

    //Renders content
    return (

      <Dialog
        isOpen={this.props.isOpen}
        onDismiss={() => this.onClosePanel()}
        title={this.props.title}
        subText={this.props.subText}
      >
        <Dropdown label="Permission"
          options={this.getPermissionTypes()}
          defaultSelectedKey={this.state.currentPerm.permission}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
            this.state.currentPerm.permission = option.text;
            this.setState((current) => ({ ...current, currentPerm: this.state.currentPerm }));
          }}>
        </Dropdown>
        <TextField label="Friendly Name"
          defaultValue={this.state.currentPerm.freindlyName}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            this.state.currentPerm.freindlyName = newValue;
            this.setState((current) => ({ ...current, currentPerm: this.state.currentPerm }));
          }}>
        </TextField>
        <Label>Color:</Label>
        <ColorPicker
          color={this.state.currentPerm.color}
          onChange={(event: React.FormEvent<HTMLDivElement>, color: IColor) => {
            this.state.currentPerm.color = color.str;
            this.setState((current) => ({ ...current, currentPerm: this.state.currentPerm }));
          }}>
        </ColorPicker>
        <ComboBox allowFreeform={true}

          label="Select Icon(or enter name of a Fabric Icon):"
          options={this.getIconOptions()}
          onRenderOption={this.renderIcon}
          text={this.state.currentPerm.iconName}
          onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
            //debugger;
            this.state.currentPerm.iconName = value ? value : option.text;
            this.setState((current) => ({ ...current, currentPerm: this.state.currentPerm }));
          }}
        />

        <Label>Display:</Label>
        <Icon iconName={this.state.currentPerm.iconName} style={{ color: this.state.currentPerm.color }} />
        <br></br>
        <br></br>
        <Button onClick={() => {
          this.onClosePanel();
        }}>Cancel</Button>
        <PrimaryButton
          disabled={
            this.state.currentPerm.color == null ||
            this.state.currentPerm.freindlyName == null ||
            this.state.currentPerm.iconName == null ||
            this.state.currentPerm.permission == null
          }
          onClick={() => {
            //debugger;
            this.saveChanges();
          }}
        >Save</PrimaryButton>

      </Dialog>


    );
  }
}


