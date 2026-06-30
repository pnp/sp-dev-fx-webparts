import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { Rotation } from './Rotation';
import { IRotationInternalProps, IRotationComponentProps } from '../../models/IRotationProps';

class RotationBuilder implements IPropertyPaneField<IRotationInternalProps> {
  public readonly type = PropertyPaneFieldType.Custom;
  public readonly targetProperty: string = 'rotation';
  public properties: IRotationInternalProps;

  private _domElement: HTMLElement | undefined;

  constructor(properties: IRotationInternalProps) {
    this.properties = {
      ...properties,
      onRender: this._onRender,
      onDispose: this._onDispose,
    };
  }

  private _onRender = (domElement: HTMLElement): void => {
    this._domElement = domElement;
    this._renderComponent();
  };

  private _renderComponent(): void {
    if (!this._domElement) return;

    const componentProps: IRotationComponentProps = {
      enabledLabel:  this.properties.enabledLabel,
      modeLabel:     this.properties.modeLabel,
      intervalLabel: this.properties.intervalLabel,
      enabled:       this.properties.enabled,
      mode:          this.properties.mode,
      intervalMs:    this.properties.intervalMs,
      theme:         this.properties.theme,
      hostType:      this.properties.hostType,

      onEnabledChange: (newValue: boolean) => {
        this.properties.enabled = newValue;
        this._renderComponent();
        this.properties.onEnabledChange(newValue);
      },

      onModeChange: (newValue: 'interval' | 'refresh') => {
        this.properties.mode = newValue;
        this._renderComponent();
        this.properties.onModeChange(newValue);
      },

      onIntervalChange: (newValue: number) => {
        this.properties.intervalMs = newValue;
        this._renderComponent();
        this.properties.onIntervalChange(newValue);
      },
    };

    ReactDOM.render(
      React.createElement(Rotation, componentProps),
      this._domElement
    );
  }

  private _onDispose = (domElement: HTMLElement): void => {
    ReactDOM.unmountComponentAtNode(domElement);
  };
}

export function PropertyPaneRotation(
  properties: Omit<IRotationInternalProps, 'onRender' | 'onDispose' | 'key'>
): IPropertyPaneField<IRotationInternalProps> {
  return new RotationBuilder(
    { key: 'rotation', ...properties } as IRotationInternalProps
  );
}
