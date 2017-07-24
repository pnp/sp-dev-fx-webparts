import * as React                                       from 'react';
import * as ReactDom                                    from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType }    from '@microsoft/sp-webpart-base';
import { IPropertyPaneQueryFilterPanelProps }           from './IPropertyPaneQueryFilterPanelProps';
import { IPropertyPaneQueryFilterPanelInternalProps }   from './IPropertyPaneQueryFilterPanelInternalProps';
import { IQueryFilter }                                 from './components/QueryFilter/IQueryFilter';
import { QueryFilterPanel }                             from './components/QueryFilterPanel/QueryFilterPanel';
import { IQueryFilterPanelProps }                       from './components/QueryFilterPanel/IQueryFilterPanelProps';


export class PropertyPaneQueryFilterPanel implements IPropertyPaneField<IPropertyPaneQueryFilterPanelProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneQueryFilterPanelInternalProps;
  private elem: HTMLElement;


  /*****************************************************************************************
   * Property pane's contructor
   * @param targetProperty 
   * @param properties 
   *****************************************************************************************/
  constructor(targetProperty: string, properties: IPropertyPaneQueryFilterPanelProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      filters: properties.filters,
      loadFields: properties.loadFields,
      onLoadTaxonomyPickerSuggestions: properties.onLoadTaxonomyPickerSuggestions,
      onLoadPeoplePickerSuggestions: properties.onLoadPeoplePickerSuggestions,
      onPropertyChange: properties.onPropertyChange,
      trimEmptyFiltersOnChange: properties.trimEmptyFiltersOnChange,
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
  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const queryFilterpanel: React.ReactElement<IQueryFilterPanelProps> = React.createElement(QueryFilterPanel, {
      filters: this.properties.filters,
      loadFields: this.properties.loadFields,
      onLoadTaxonomyPickerSuggestions: this.properties.onLoadTaxonomyPickerSuggestions,
      onLoadPeoplePickerSuggestions: this.properties.onLoadPeoplePickerSuggestions,
      onChanged: this.onChanged.bind(this),
      trimEmptyFiltersOnChange: this.properties.trimEmptyFiltersOnChange,
      disabled: this.properties.disabled,
      strings: this.properties.strings,
      // required to allow the component to be re-rendered by calling this.render() externally
      stateKey: new Date().toString()
    });

    ReactDom.render(queryFilterpanel, elem);
  }


  /*****************************************************************************************
   * Call the property pane's onPropertyChange when the QueryFilterPanel changes
   *****************************************************************************************/
  private onChanged(filters: IQueryFilter[]): void {
    this.properties.onPropertyChange(this.targetProperty, filters);
  }
}