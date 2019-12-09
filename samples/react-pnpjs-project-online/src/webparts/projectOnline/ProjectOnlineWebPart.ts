import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { setup as pnpSetup } from "@pnp/common";
import { project } from "pnpjs-project-online-package";


import * as strings from 'ProjectOnlineWebPartStrings';
import { ProjectOnline } from './components/ProjectOnline';
import { IProjectOnlineProps } from './components/ProjectOnline';

export interface IProjectOnlineWebPartProps {
  description: string;
}

export default class ProjectOnlineWebPart extends BaseClientSideWebPart<IProjectOnlineWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      project.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IProjectOnlineProps> = React.createElement(
      ProjectOnline,
      {
        description: this.properties.description
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
