import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { sp } from "@pnp/sp";
import * as strings from 'MaterialUiSampleWebPartStrings';
import MaterialUiSample from './components/MaterialUiSample';
import { IMaterialUiSampleProps } from './components/IMaterialUiSampleProps';

export interface IMaterialUiSampleWebPartProps {
  description: string;
}

export default class MaterialUiSampleWebPart extends BaseClientSideWebPart<IMaterialUiSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMaterialUiSampleProps > = React.createElement(
      MaterialUiSample,
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
  protected onInit(): Promise<void> {   
    sp.setup({
      spfxContext: this.context
    });
    return super.onInit();
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
