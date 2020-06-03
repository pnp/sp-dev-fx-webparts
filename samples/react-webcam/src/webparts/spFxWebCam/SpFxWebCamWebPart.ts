import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SpFxWebCamWebPartStrings';
import SpFxWebCam from './components/SpFxWebCam';
import { ISpFxWebCamProps } from './components/ISpFxWebCamProps';


export interface ISpFxWebCamWebPartProps {
  description: string;

}

export default class SpFxWebCamWebPart extends BaseClientSideWebPart<ISpFxWebCamWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxWebCamProps > = React.createElement(
      SpFxWebCam,
      {
        description: this.properties.description

      }
    );
    ReactDom.render(element, this.domElement);
    //ReactDom.render(element2, document.getElementById("mywebcam"));
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
