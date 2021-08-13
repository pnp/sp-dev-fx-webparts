import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'MyonedrivefilesWebPartStrings';
import Myonedrivefiles from './components/Myonedrivefiles';
import { IMyonedrivefilesProps } from './components/IMyonedrivefilesProps';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { MSGraphClient } from '@microsoft/sp-http';
import { sp } from "@pnp/sp";

export interface IMyonedrivefilesWebPartProps {
  title: string;
  fields: string[];
  titleLink: boolean;
}

export default class MyonedrivefilesWebPart extends BaseClientSideWebPart<IMyonedrivefilesWebPartProps> {

  private graphClient: MSGraphClient;

  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<IMyonedrivefilesProps> = React.createElement(
      Myonedrivefiles,
      {
        context: this.context,
        graphClient: this.graphClient,
        title: this.properties.title,
        displayMode: this.displayMode,
        fields: this.properties.fields,
        titleLink: this.properties.titleLink,
        updateProperty: (value: string): void => {
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
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldMultiSelect('fields', {
                  key: 'fields',
                  label: "Select fields",
                  options: [                 
                    {
                      key: 'name',
                      text: 'Name',
                    },
                    {
                      key: "lastModifiedDateTime",
                      text: "Modified"
                    },
                    {
                      key: "lastModifiedBy",
                      text: "Modified By"
                    },
                    {
                      key: 'folder',
                      text: 'File Size',
                    },
                    {
                      key: "shared",
                      text: "Sharing"
                    },
                  ],
                  selectedKeys: this.properties.fields 
                }),
                PropertyPaneToggle('titleLink', {
                  label: 'Show hyperlink on webpart title?'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
