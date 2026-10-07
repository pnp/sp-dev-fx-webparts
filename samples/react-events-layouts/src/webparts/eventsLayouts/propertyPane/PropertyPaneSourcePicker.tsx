import * as React from 'react';
import * as ReactDom from 'react-dom';
import { FluentProvider, Theme } from '@fluentui/react-components';
import { IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { ISourcePickerProps, SourcePicker } from './SourcePicker';

export interface IPropertyPaneSourcePickerProps extends Omit<ISourcePickerProps, 'onChange'> {
  theme: Theme;
  dir: 'ltr' | 'rtl';
}

/**
 * Hosts the React source picker inside the SharePoint property pane. Changes go through the
 * property pane callback so the page is marked dirty and the web part re-renders.
 */
export function PropertyPaneSourcePicker(
  targetProperty: string,
  props: IPropertyPaneSourcePickerProps
): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return {
    type: PropertyPaneFieldType.Custom,
    targetProperty,
    properties: {
      key: `${targetProperty}Picker`,
      onRender: (element: HTMLElement, _context?: unknown, onChange?: (property: string, value: unknown) => void) => {
        const { theme, dir, ...pickerProps } = props;
        ReactDom.render(
          <FluentProvider theme={theme} dir={dir} style={{ backgroundColor: 'transparent' }}>
            <SourcePicker {...pickerProps} onChange={sources => onChange?.(targetProperty, sources)} />
          </FluentProvider>,
          element
        );
      },
      onDispose: (element: HTMLElement) => {
        ReactDom.unmountComponentAtNode(element);
      }
    }
  };
}
