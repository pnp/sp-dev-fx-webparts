import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CheckUserGroupWebPartStrings';
import CheckUserGroup from './components/CheckUserGroup';
import { ICheckUserGroupProps } from './components/ICheckUserGroupProps';

export interface ICheckUserGroupWebPartProps {
  description: string;
  title: string;
}

export default class CheckUserGroupWebPart extends BaseClientSideWebPart<ICheckUserGroupWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICheckUserGroupProps> = React.createElement(
      CheckUserGroup,
      {
        description: this.properties.description,
        context: this.context,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
