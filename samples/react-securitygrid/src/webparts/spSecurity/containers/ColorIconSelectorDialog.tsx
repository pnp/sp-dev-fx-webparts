

import * as React from 'react';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { IColor } from "office-ui-fabric-react/lib/Color";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";
import { IconNames, initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxProps,
} from "office-ui-fabric-react/lib/ComboBox";


export interface IColorIconSelectorPanelProps {
  isOpen: boolean;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  closePanel(): void;
  title: string;
  subText: string;
  selectedColor: string;
  selectedIcon: string;

}
export interface IColorIconSelectionPanelState {

  selectedColor: string;
  selectedIcon: string;
}
export default class ColorIconSelectionPanel extends React.Component<IColorIconSelectorPanelProps, IColorIconSelectionPanelState> {

  private iconNames = ["ChevronDown",
    "ChevronUp",
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
      selectedIcon: this.props.selectedIcon

    };
  }

  private saveChanges(): void {
    if (this.props.onPropertyChange) {
      this.props.onPropertyChange("selectedColor", this.props.selectedColor, this.state.selectedColor);
      this.props.onPropertyChange("selectedIcon", this.props.selectedIcon, this.state.selectedIcon);
      this.onClosePanel();
    }
  }

  private onClosePanel(element?: any): void {
    this.props.closePanel();
  }
  private renderIcon(props?, defaultRender?: (props?) => JSX.Element | null): JSX.Element {
    debugger;
    return (<div>
      <Icon iconName={props.text} /> {props.text}
    </div>);
  }




  private getIconOptions(): IComboBoxOption[] {
    debugger;

    let options: IComboBoxOption[] = [];
    for (var iconName of this.iconNames) {
      debugger;
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

          <Icon iconName={this.state.selectedIcon} style={{ color: this.state.selectedColor }}/>

        <Button onClick={() => {
          this.onClosePanel()
        }}>Cancel</Button>
        <PrimaryButton onClick={() => {
          debugger;
          this.saveChanges();
          this.onClosePanel();


        }}>Save</PrimaryButton>

      </Dialog>


    )
  }
}


