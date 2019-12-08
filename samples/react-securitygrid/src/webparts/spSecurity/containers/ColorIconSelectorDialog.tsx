
import { findIndex, filter } from "underscore";
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode, Selection } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ColorPicker, IColorPickerProps } from "office-ui-fabric-react/lib/ColorPicker";
import { SwatchColorPicker, ISwatchColorPickerProps } from "office-ui-fabric-react/lib/SwatchColorPicker";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SPPermission } from "@microsoft/sp-page-context";
import { IColor } from "office-ui-fabric-react/lib/Color";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";

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
        </ColorPicker>);
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


