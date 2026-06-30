import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneCustomFieldProps,
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { ColumnConfigurationField, ColumnConfigurationFieldProps } from './ColumnConfigurationField';
import { ColumnSetting } from '../utils/columnConfig';

export interface PropertyPaneColumnConfigurationProps {
  key: string;
  label: string;
  description?: string;
  settings: ColumnSetting[];
  targetProperty: string;
  onChange: (settings: ColumnSetting[]) => void;
}

interface ColumnConfigurationInternalProps extends IPropertyPaneCustomFieldProps {
  key: string;
  settings: ColumnSetting[];
  label: string;
  description?: string;
}

export const PropertyPaneColumnConfiguration = (
  props: PropertyPaneColumnConfigurationProps
): IPropertyPaneField<IPropertyPaneCustomFieldProps> => {
  let currentElement: HTMLElement | undefined;

  const internalProps: ColumnConfigurationInternalProps = {
    key: props.key,
    settings: props.settings,
    label: props.label,
    description: props.description,
    onRender: (element, _context, changeCallback) => {
      currentElement = element;

      const fieldProps: ColumnConfigurationFieldProps = {
        label: props.label,
        description: props.description,
        settings: props.settings,
        onChange: (updatedSettings) => {
          props.onChange(updatedSettings);
          if (changeCallback) {
            changeCallback(props.targetProperty, JSON.stringify(
              updatedSettings.map(setting => ({
                key: setting.key,
                visible: setting.visible
              }))
            ));
          }
        }
      };

      ReactDom.render(React.createElement(ColumnConfigurationField, fieldProps), element);
    },
    onDispose: () => {
      if (currentElement) {
        ReactDom.unmountComponentAtNode(currentElement);
      }
    }
  };

  return {
    type: PropertyPaneFieldType.Custom,
    targetProperty: props.targetProperty,
    properties: internalProps
  };
};
