

import * as React from 'react';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
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


