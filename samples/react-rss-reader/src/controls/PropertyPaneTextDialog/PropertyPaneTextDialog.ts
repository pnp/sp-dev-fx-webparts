import * as React                                       from 'react';
import * as ReactDom                                    from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType }    from "@microsoft/sp-property-pane";
import { IPropertyPaneTextDialogProps }           	  	from './IPropertyPaneTextDialogProps';
import { IPropertyPaneTextDialogInternalProps }   	  	from './IPropertyPaneTextDialogInternalProps';
import { ITextDialogProps }                         		from './components/TextDialog/ITextDialogProps';
import { TextDialog }                                   from './components/TextDialog/TextDialog';

export class PropertyPaneTextDialog implements IPropertyPaneField<IPropertyPaneTextDialogProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneTextDialogInternalProps;
  private elem: HTMLElement;


  /*****************************************************************************************
   * Property pane's contructor
   * @param targetProperty
   * @param properties
   *****************************************************************************************/
  constructor(targetProperty: string, properties: IPropertyPaneTextDialogProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      dialogTextFieldValue: properties.dialogTextFieldValue,
      onPropertyChange: properties.onPropertyChange,
      disabled: properties.disabled,
      strings: properties.strings,
      onRender: this.onRender.bind(this),
      key: targetProperty
    };
  }


  /*****************************************************************************************
   * Renders the QueryFilterPanel property pane
   *****************************************************************************************/
  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }


  /*****************************************************************************************
   * Renders the QueryFilterPanel property pane
   *****************************************************************************************/
  private async onRender(elem: HTMLElement): Promise<void> {
    if (!this.elem) {
      this.elem = elem;
    }

    const textDialog: React.ReactElement<ITextDialogProps> = React.createElement(TextDialog, {
      dialogTextFieldValue: this.properties.dialogTextFieldValue,
      onChanged: this.onChanged.bind(this),
      disabled: this.properties.disabled,
      strings: this.properties.strings,
      // required to allow the component to be re-rendered by calling this.render() externally
      stateKey: new Date().toString()
    });

    ReactDom.render(textDialog, elem);
  }


  /*****************************************************************************************
   * Call the property pane's onPropertyChange when the TextDialog changes
   *****************************************************************************************/
  private onChanged(text: string): void {
    this.properties.onPropertyChange(this.targetProperty, text);
  }
}
