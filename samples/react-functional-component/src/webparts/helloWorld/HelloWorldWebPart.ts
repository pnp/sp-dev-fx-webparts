import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import HelloWorld from './components/HelloWorld';

export interface IHelloWorldProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldProps> {

  public render(): void {
    ReactDom.render(React.createElement(HelloWorld, this.properties), this.domElement);
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
            description: "Properties"
          },
          groups: [
            {
              groupName: "General",
              groupFields: [
                PropertyPaneTextField('description', { label: "Description Text" })
              ]
            }
          ]
        }
      ]
    };
  }
}
