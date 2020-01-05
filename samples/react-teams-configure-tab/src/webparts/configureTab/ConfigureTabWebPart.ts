import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';

import * as strings from 'ConfigureTabWebPartStrings';
import ConfigureTab from './components/ConfigureTab';
import { IConfigureTabProps } from './components/IConfigureTabProps';

export interface IConfigureTabWebPartProps {
  tabNames: string;
  entityIds: string;
  contentPageUrls: string;
  redirectPages: boolean;
}

export default class ConfigureTabWebPart extends BaseClientSideWebPart<IConfigureTabWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IConfigureTabProps> = React.createElement(
      ConfigureTab,
      {
        contentPageUrl: this.properties.contentPageUrls
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

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('tabNames', {
                  label: strings.TabNamesFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneLabel('', {
                  text: strings.TabNamesFieldInstructions
                }),
                PropertyPaneTextField('entityIds', {
                  label: strings.EntityIdsFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneLabel('', {
                  text: strings.EntityIdsFieldInstructions
                }),
                PropertyPaneTextField('contentPageUrls', {
                  label: strings.ContentPageUrlsFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneLabel('', {
                  text: strings.ContentPageUrlsFieldInstructions
                }),
                PropertyPaneCheckbox('redirectPages', {
                  text: strings.RedirectFieldLabel
                }),
                PropertyPaneLabel('', {
                  text: strings.RedirectFieldInstructions
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
