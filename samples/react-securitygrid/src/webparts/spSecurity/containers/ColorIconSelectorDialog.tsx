import * as React from 'react';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { IColor } from "office-ui-fabric-react/lib/Color";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {  ComboBox,  IComboBox,  IComboBoxOption,} from "office-ui-fabric-react/lib/ComboBox";
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface IColorIconSelectorPanelProps {
  isOpen: boolean;
  onPermissionChange(color: string, icon: string, friendlyName: string): void;
  closePanel(): void;
  title: string;
  subText: string;
  selectedColor: string;
  selectedIcon: string;
  freindlyName: string;
}
export interface IColorIconSelectionPanelState {
  selectedColor: string;
  selectedIcon: string;
  freindlyName: string;
}
export default class ColorIconSelectionPanel extends React.Component<IColorIconSelectorPanelProps, IColorIconSelectionPanelState> {

  private iconNames = ["ChevronDown",
    "ChevronUp",
    "ChevronDown",
    "PageLink",
    "Mail",
    "FavoriteStar",
    "Back",
    "CheckBox",
    "View",
    "Contrast",
    "IncidentTriange",
    "Edit",
    "Add",
    "Cancel",
    "More",
    "Settings"
  ]
  constructor(props: IColorIconSelectorPanelProps) {
    super(props);
    debugger;

    this.state = {
      selectedColor: this.props.selectedColor,
      selectedIcon: this.props.selectedIcon,
      freindlyName: this.props.freindlyName

    };
  }

  private saveChanges(): void {
    // TODO clean this up. s/b one call
    this.props.onPermissionChange(this.state.selectedColor, this.state.selectedIcon, this.state.freindlyName);
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
          defaultValue={this.state.freindlyName}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            this.setState((current) => ({ ...current, freindlyName: newValue }));
          }}>
        </TextField>
        <Label>Color:</Label>
        <ColorPicker 
          color={this.state.selectedColor}
          onChange={(event: React.FormEvent<HTMLDivElement>, color: IColor) => {
            this.setState((current) => ({ ...current, selectedColor: color.str }));
          }}>
        </ColorPicker>
        <ComboBox
          label="Select Icon:"
          options={this.getIconOptions()}
          onRenderOption={this.renderIcon}
          text={this.state.selectedIcon}
          onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
            debugger;
            this.setState((current) => ({ ...current, selectedIcon: option.text }));
          }}
        />
       <Label>Display:</Label>
        <Icon iconName={this.state.selectedIcon} style={{ color: this.state.selectedColor }} />
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


