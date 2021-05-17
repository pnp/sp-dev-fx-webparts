import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'SitesSelectedManagerWebPartStrings';
import { App } from './components/App';

export interface IAppProperties {
  description: string;
  context: WebPartContext;
  showAbout: boolean;
  aadGuid: string;
}

export default class SitesSelectedManagerWebPart extends BaseClientSideWebPart<IAppProperties> {
  public render(): void {
    const element: React.ReactElement<IAppProperties> = React.createElement(
      App,
      {
        description: this.properties.description,
        context: this.context,
        showAbout: this.properties.showAbout,
        aadGuid: this.properties.aadGuid
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneToggle('showAbout',
                  {
                    label: strings.ShowAboutFieldLabel,
                    checked: this.properties.showAbout === true,
                  }),
                PropertyPaneTextField('aadGuid', {
                  label: strings.AADGuidLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
