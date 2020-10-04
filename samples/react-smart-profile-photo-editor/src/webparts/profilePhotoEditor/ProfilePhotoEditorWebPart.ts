import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import {
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import * as strings from 'ProfilePhotoEditorWebPartStrings';
import ProfilePhotoEditor from './components/ProfilePhotoEditor';
import { IProfilePhotoEditorProps } from './components/IProfilePhotoEditorProps';

// Used for password fields
import { PropertyFieldPassword } from '@pnp/spfx-property-controls/lib/PropertyFieldPassword';

// Used to provide guidance for users
import { PropertyPaneMarkdownContent } from '@pnp/spfx-property-controls/lib/PropertyPaneMarkdownContent';

// Used to retrieve storage key
import { StorageEntityService, IStorageEntityService, MockStorageEntityService } from '../../services/StorageEntityService';

import { Environment, EnvironmentType } from '@microsoft/sp-core-library';


export interface IProfilePhotoEditorWebPartProps {
  instructions: string;
  requirePortrait: boolean;
  allowClipart: boolean;
  allowLinedrawing: boolean;
  allowRacy: boolean;
  allowAdult: boolean;
  allowGory: boolean;
  forbiddenKeywords: string;
  azureKey: string;
  azureEndPoint: string;
  useStorageEntity: boolean;
}

export default class ProfilePhotoEditorWebPart extends BaseClientSideWebPart<IProfilePhotoEditorWebPartProps> {
  // These are used if we're configured to use storage entity service
  private _storageAzureKey: string = undefined;
  private _storageAzureEndPoint: string = undefined;

  /***
   * If the web part is configured to use storage entity, will retrieve the
   * Azure Endpoint and the Azure Key
   */
  protected async onInit() {
    if (this.properties.useStorageEntity === undefined) {
      this.properties.useStorageEntity = false;
    }

    if (this.properties.useStorageEntity) {
      // Get an instance of the entity storage service
      let storageService: IStorageEntityService = undefined;
      if (Environment.type === EnvironmentType.Local || Environment.type === EnvironmentType.Test) {
        //Running on Unit test environment or local workbench
        storageService = new MockStorageEntityService(this.context);
      } else if (Environment.type === EnvironmentType.SharePoint) {
        //Modern SharePoint page
        storageService = new StorageEntityService(this.context);
      }

      // Attempt to retrieve the Azure key from tenant storage if it isn't specified
      this._storageAzureKey = await storageService.GetStorageEntity("azurekey");
      this._storageAzureEndPoint = await storageService.GetStorageEntity("azureendpoint");
    }
  }

  /**
   * Renders the web part component
   */
  public render(): void {
    const element: React.ReactElement<IProfilePhotoEditorProps > = React.createElement(
      ProfilePhotoEditor,
      {
        //instructions: this.properties.instructions,
        azureVisionKey: this.properties.azureKey,
        azureVisionEndpoint: this.properties.azureEndPoint,
        context: this.context,
        displayMode: this.displayMode,
        ... this.properties
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
    var config: IPropertyPaneConfiguration = {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.AzureGroupName,
              groupFields: [
                PropertyPaneMarkdownContent({
                  markdown: strings.AzureGroupMarkdown,
                  key: 'azureInstructions'
                }),
                PropertyFieldPassword("azureKey", {
                  key: "azureKey",
                  label: strings.AzureKey,
                  value: this.properties.azureKey
                }),
                PropertyPaneTextField('azureEndPoint', {
                  label: strings.AzureEndPoint
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLabel('instructions', {
                  text: strings.BasicInstructions,
                }),
                PropertyPaneTextField('instructions', {
                  label: strings.InstructionsFieldLabel,
                  multiline: true
                }),
                PropertyPaneToggle('requirePortrait', {
                  label: strings.RequirePortraitFieldLabel
                }),
                PropertyPaneToggle('allowClipart', {
                  label: strings.AllowClipartFieldLabel
                }),
                PropertyPaneToggle('allowLinedrawing', {
                  label: strings.AllowLineDrawingFieldLabel
                }),
                PropertyPaneToggle('allowRacy', {
                  label: strings.AllowRacyFieldLabel
                }),
                PropertyPaneToggle('allowAdult', {
                  label: strings.AllowAdultImagesFieldLabel
                }),
                PropertyPaneToggle('allowGory', {
                  label: strings.AllowGoryFieldLabel
                }),
                PropertyPaneTextField('forbiddenKeywords', {
                  label: strings.ForbiddenTagsFieldLabel,
                  multiline: true,
                  description: strings.ForbiddenTagsFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };

    // Hide the Azure cognitive services settings if the web part is configured to use storage entity
    if (this.properties.useStorageEntity) {
      // Remove the first group from the property pane
      config.pages[0].groups.splice(0,1);
    }

    return config;
  }
}
