import * as React                                       from 'react';
import * as ReactDom                                    from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType }    from '@microsoft/sp-webpart-base';
import { IPropertyPaneAsyncChecklistProps }             from './IPropertyPaneAsyncChecklistProps';
import { IPropertyPaneAsyncChecklistInternalProps }     from './IPropertyPaneAsyncChecklistInternalProps';
import { AsyncChecklist }                               from './components/AsyncChecklist/AsyncChecklist';
import { IAsyncChecklistProps }                         from './components/AsyncChecklist/IAsyncChecklistProps';


export class PropertyPaneAsyncChecklist implements IPropertyPaneField<IPropertyPaneAsyncChecklistProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneAsyncChecklistInternalProps;
  public loadedItems: boolean;
  private elem: HTMLElement;


  /*****************************************************************************************
   * Property pane's contructor
   * @param targetProperty 
   * @param properties 
   *****************************************************************************************/
  constructor(targetProperty: string, properties: IPropertyPaneAsyncChecklistProps) {
    this.targetProperty = targetProperty;

    this.properties = {
        loadItems: properties.loadItems,
        checkedItems: properties.checkedItems,
        onPropertyChange: properties.onPropertyChange,
        disable: properties.disable,
        strings: properties.strings,
        onRender: this.onRender.bind(this),
        key: targetProperty
    };
  }


  /*****************************************************************************************
   * Renders the AsyncChecklist property pane
   *****************************************************************************************/
  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }


  /*****************************************************************************************
   * Renders the AsyncChecklist property pane
   *****************************************************************************************/
  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const asyncChecklist: React.ReactElement<IAsyncChecklistProps> = React.createElement(AsyncChecklist, {
        loadItems: this.properties.loadItems,
        checkedItems: this.properties.checkedItems,
        onChange: this.onChange.bind(this),
        disable: this.properties.disable,
        strings: this.properties.strings,
        stateKey: new Date().toString()
    });

    ReactDom.render(asyncChecklist, elem);
    this.loadedItems = true;
  }


  /*****************************************************************************************
   * Call the property pane's onPropertyChange when the QueryFilterPanel changes
   *****************************************************************************************/
  private onChange(checkedKeys: string[]): void {
    this.properties.onPropertyChange(this.targetProperty, checkedKeys);
  }
}