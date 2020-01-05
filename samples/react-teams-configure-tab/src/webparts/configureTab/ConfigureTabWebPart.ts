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
import { ITabLink } from './model/ITabLink';

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

  private parseTabLinks(tabNames: string, entityIds: string, contentPageUrls: string): ITabLink[] {
    var tabNameArray = tabNames.split('\n');
    var entityIdArray = entityIds.split('\n');
    var contentPageUrlArray = contentPageUrls.split('\n');
    var result: ITabLink[] = [];

    var length = tabNameArray.length;
    if (entityIdArray.length != length || contentPageUrlArray.length != length) {
      throw new Error(strings.UnevenTabsErrorMessage);
    }

    for (let i = 0; i < length; i++) {
      result.push({
        tabName: tabNameArray[i],
        entityId: entityIdArray[i],
        contentPageUrl: contentPageUrlArray[i]
      })
    }

    return result;
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
                PropertyPaneLabel('', {
                  text: strings.TabInstructions
                }),
                PropertyPaneTextField('tabNames', {
                  label: strings.TabNamesFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('entityIds', {
                  label: strings.EntityIdsFieldLabel,
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneTextField('contentPageUrls', {
                  label: strings.ContentPageUrlsFieldLabel,
                  multiline: true,
                  rows: 5
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
