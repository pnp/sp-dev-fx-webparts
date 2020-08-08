import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalGreetingWebPartStrings';
import PersonalGreeting from './components/PersonalGreeting';
import { IPersonalGreetingProps } from './components/IPersonalGreetingProps';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export interface IPersonalGreetingWebPartProps {
  greetingText: string;
  context: WebPartContext;
  position: string;
  textColor: string;
}

export default class PersonalGreetingWebPart extends BaseClientSideWebPart <IPersonalGreetingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalGreetingProps> = React.createElement(
      PersonalGreeting,
      {
        greetingText: this.properties.greetingText,
        context: this.context,
        position: this.properties.position,
        textColor: this.properties.textColor
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
