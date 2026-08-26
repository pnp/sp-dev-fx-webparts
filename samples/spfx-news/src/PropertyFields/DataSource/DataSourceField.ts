import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { IDataSourceInternalProps, IDataSourceComponentProps } from '../../models/IDataSourceProps';
import DataSourceHost from './DataSourceHost';

class PropertyPaneDataSourceBuilder
  implements IPropertyPaneField<IDataSourceInternalProps>
{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IDataSourceInternalProps;

  constructor(targetProperty: string, properties: IDataSourceComponentProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...properties,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
      key: targetProperty,
    };
  }

  private onRender(elem: HTMLElement): void {
    ReactDOM.render(
      React.createElement(DataSourceHost, this.properties),
      elem
    );
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPaneDataSource(
  targetProperty: string,
  properties: IDataSourceComponentProps
): IPropertyPaneField<IDataSourceInternalProps> {
  return new PropertyPaneDataSourceBuilder(targetProperty, properties);
}
