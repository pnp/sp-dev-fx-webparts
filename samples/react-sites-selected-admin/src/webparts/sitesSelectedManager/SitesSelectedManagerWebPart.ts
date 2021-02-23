import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SitesSelectedManagerWebPartStrings';
import SitesSelectedManager from './components/SitesSelectedManager';
import { ISitesSelectedManagerProps } from './components/ISitesSelectedManagerProps';

export interface ISitesSelectedManagerWebPartProps {
  description: string;
  showAbout: boolean;
  aadGuid: string;

}

export default class SitesSelectedManagerWebPart extends BaseClientSideWebPart<ISitesSelectedManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISitesSelectedManagerProps> = React.createElement(
      SitesSelectedManager,
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

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
