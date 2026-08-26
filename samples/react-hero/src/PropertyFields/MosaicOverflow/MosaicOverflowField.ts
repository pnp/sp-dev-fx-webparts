import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { MosaicOverflow } from './MosaicOverflow';
import { IMosaicOverflowInternalProps, IMosaicOverflowComponentProps } from '../../models/IMosaicOverflowProps';

class MosaicOverflowBuilder implements IPropertyPaneField<IMosaicOverflowInternalProps> {
  public readonly type = PropertyPaneFieldType.Custom;
  public readonly targetProperty: string = 'mosaicOverflowMode';
  public properties: IMosaicOverflowInternalProps;
  private _domElement: HTMLElement | undefined;

  constructor(properties: IMosaicOverflowInternalProps) {
    this.properties = { ...properties, onRender: this._onRender, onDispose: this._onDispose };
  }

  private _onRender = (domElement: HTMLElement): void => {
    this._domElement = domElement;
    this._renderComponent();
  };

  private _renderComponent(): void {
    if (!this._domElement) return;
    const componentProps: IMosaicOverflowComponentProps = {
      label:  this.properties.label,
      value:  this.properties.value,
      theme:  this.properties.theme,
      hostType: this.properties.hostType,
      onChange: (newValue) => {
        this.properties.value = newValue;
        this._renderComponent();
        this.properties.onChange(newValue);
      },
    };
    ReactDOM.render(React.createElement(MosaicOverflow, componentProps), this._domElement);
  }

  private _onDispose = (domElement: HTMLElement): void => {
    ReactDOM.unmountComponentAtNode(domElement);
  };
}

export function PropertyPaneMosaicOverflow(
  properties: Omit<IMosaicOverflowInternalProps, 'onRender' | 'onDispose' | 'key'>
): IPropertyPaneField<IMosaicOverflowInternalProps> {
  return new MosaicOverflowBuilder({ key: 'mosaicOverflowMode', ...properties } as IMosaicOverflowInternalProps);
}
