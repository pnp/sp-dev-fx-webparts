import * as React from 'react';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { IColor } from "office-ui-fabric-react/lib/Color";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { ComboBox, IComboBox, IComboBoxOption, } from "office-ui-fabric-react/lib/ComboBox";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ISelectedPermission } from "../ISpSecurityWebPartProps";

export interface IColorIconSelectorPanelProps {
  isOpen: boolean;
  onPermissionChange(color: ISelectedPermission): void;
  closePanel(): void;
  title: string;
  subText: string;
  currentPerm:  ISelectedPermission;
 
}
export interface IColorIconSelectionPanelState {
  currentPerm:  ISelectedPermission;
}
export default class ColorIconSelectionPanel extends React.Component<IColorIconSelectorPanelProps, IColorIconSelectionPanelState> {

  private iconNames = [
        "Add",
        "AddFreind",
        "Admin",
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
        "SwitdchUser",
        "Sync",
        "TriangleSolid",
        "UnEditable",
        "UnEditable2",
        "Unlock",
        "UserWarning",
        "View",
    
    
    
  ]
  constructor(props: IColorIconSelectorPanelProps) {
    super(props);
    debugger;

    this.state = {
      currentPerm:   this.props.currentPerm
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
  public render(): JSX.Element {

    //Renders content
    return (

      <Dialog
        isOpen={this.props.isOpen}
        onDismiss={() => this.onClosePanel()}
        title={this.props.title}
        subText={this.props.subText}
      >
        <TextField label="Friendly Name"
          defaultValue={this.state.currentPerm.freindlyName}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            this.state.currentPerm.freindlyName=newValue;
            this.setState((current) => ({ ...current, currentPerm:this.state.currentPerm }));
          }}>
        </TextField>
        <Label>Color:</Label>
        <ColorPicker
          color={this.state.currentPerm.color}
          onChange={(event: React.FormEvent<HTMLDivElement>, color: IColor) => {
            this.state.currentPerm.color=color.str;
            this.setState((current) => ({ ...current, currentPerm:this.state.currentPerm }));
          }}>
        </ColorPicker>
        <ComboBox
          label="Select Icon:"
          options={this.getIconOptions()}
          onRenderOption={this.renderIcon}
          text={this.state.currentPerm.iconName}
          onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
            debugger;
            this.state.currentPerm.iconName=option.text;
            this.setState((current) => ({ ...current, currentPerm:this.state.currentPerm }));
          }}
        />
        <Label>Display:</Label>
        <Icon iconName={this.state.currentPerm.iconName} style={{ color: this.state.currentPerm.color }} />
        <br></br>
        <br></br>
        <Button onClick={() => {
          this.onClosePanel()
        }}>Cancel</Button>
        <PrimaryButton onClick={() => {
          debugger;
          this.saveChanges();



        }}>Save</PrimaryButton>

      </Dialog>


    )
  }
}


