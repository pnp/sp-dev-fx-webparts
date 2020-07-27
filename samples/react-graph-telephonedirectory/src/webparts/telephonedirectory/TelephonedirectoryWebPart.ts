import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TelephonedirectoryWebPartStrings';
import Telephonedirectory from './components/Telephonedirectory';
import { ITelephoneDirectoryProps } from './components/ITelephonedirectoryProps';
import { MSGraphService } from '../../Services/MSGraphService';
import { MSGraphClient } from "@microsoft/sp-http";
export interface ITelephonedirectoryWebPartProps {
  description: string;
  Title:string;
}

export default class TelephonedirectoryWebPart extends BaseClientSideWebPart<ITelephonedirectoryWebPartProps> {
  private MSGraphServiceInstance:MSGraphService;
  private MSGraphClient:MSGraphClient;
  public render(): void {
    const element: React.ReactElement<ITelephoneDirectoryProps> = React.createElement(
      Telephonedirectory,
      {
        description: this.properties.description,
        MSGraphServiceInstance:this.MSGraphServiceInstance,
        context:this.context,
        MsGraphClient:this.MSGraphClient,
        DisplayMode:this.displayMode,
        WebpartTitle:strings.WebpartTitle,
        updateProperty: (value: string) => {
          this.properties.Title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(){
    await super.onInit();
    this.MSGraphServiceInstance = new MSGraphService();
    this.MSGraphClient = await this.context.msGraphClientFactory.getClient();
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
                }),
                PropertyPaneTextField('Title',{
                  label: strings.Title   
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
