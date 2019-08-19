import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import RomanNumerals from './components/RomanNumerals';

export interface IRomanNumeralsProps {
  title: string;
  description: string;
  initialValue: string;
  inputCaption: string;
  resultCaption: string;
  showUpdownButtons: boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IRomanNumeralsProps> {

  public render(): void {
    ReactDom.render(React.createElement(RomanNumerals, this.properties), this.domElement);
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
                PropertyPaneTextField('title', { label: "Web part title" }),
                PropertyPaneTextField('description', { label: "Description Text" }),
                PropertyPaneToggle('showUpdownButtons', { label: "Show increment/decrement buttons" })
              ]
            },
            {
              groupName: "Initialization",
              groupFields: [
                PropertyPaneTextField('initialValue', { label: "Initial Value (numeric)" })
              ]
            },
            {
              groupName: "Captions",
              groupFields: [
                PropertyPaneTextField('inputCaption', { label: "Caption for input control" }),
                PropertyPaneTextField('resultCaption', { label: "Caption for result" })
              ]
            }
          ]
        }
      ]
    };
  }
}
