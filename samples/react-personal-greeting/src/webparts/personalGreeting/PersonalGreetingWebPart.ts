import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import PersonalGreeting from './components/PersonalGreeting';
import { IPersonalGreetingProps } from './components/IPersonalGreetingProps';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export interface IPersonalGreetingWebPartProps {
  greetingText: string;
  context: WebPartContext;
  position: string;
  textColor: string;
  fontSize: number;
}

const fontSizeOptions: IPropertyPaneDropdownOption[] = [
  {
    key: 12,
    text: '12'
  },
  {
    key: 14,
    text: '16'
  },
  {
    key: 18,
    text: '18'
  },
  {
    key: 20,
    text: '20'
  },
  {
    key: 24,
    text: '24'
  },
  {
    key: 28,
    text: '28'
  },
  {
    key: 32,
    text: '32'
  },
  {
    key: 36,
    text: '36'
  },
  {
    key: 42,
    text: '42'
  },
  {
    key: 46,
    text: '46'
  },
  {
    key: 68,
    text: '68'
  },
];

export default class PersonalGreetingWebPart extends BaseClientSideWebPart <IPersonalGreetingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalGreetingProps> = React.createElement(
      PersonalGreeting,
      {
        greetingText: this.properties.greetingText,
        context: this.context,
        position: this.properties.position,
        textColor: this.properties.textColor,
        fontSize: this.properties.fontSize
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Use the fields below to configure the webpart. The placeholder will be removed once text has been entered into the "Greeting Text" field.'

          },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneTextField('greetingText', {
                  label: 'Greeting Text',
                }),
                PropertyPaneDropdown('position', {
                  label: 'Text Position',
                  selectedKey: 'left',
                  options: [{
                    key: 'left',
                    text: 'left'
                  },
                  {
                    key: 'center',
                    text: 'center'
                  },
                  {
                    key: 'right',
                    text: 'right'
                  }
                  ]
                }),
                PropertyPaneDropdown('fontSize', {
                  label: 'Font Size',
                  options: fontSizeOptions,
                  selectedKey: 20
                }),
                PropertyFieldColorPicker('textColor', {
                  label: 'Text Color',
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  selectedColor: this.properties.textColor,
                  style: PropertyFieldColorPickerStyle.Full,
                  key: 'textColor'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
