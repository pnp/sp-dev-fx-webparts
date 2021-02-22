
//Code from https://kaboodlesoftware.com/2019/10/04/a-rather-useful-empty-spfx-property-pane-control/
import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

export class EmptyPropertyPane implements IPropertyPaneField<any> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneCustomFieldProps;

  constructor() {
    this.properties = {
      onRender: this.onRender.bind(this),
      key: "EmptyKey"
    };
    // ...
  }

  private onRender(elem: HTMLElement): void {
    elem.innerHTML = `<div style='margin-top:-4px'></div>`;
  }
}
