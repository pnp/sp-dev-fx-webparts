import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'receiverStrings';
import Receiver from './components/Receiver';
import { IReceiverProps } from './components/IReceiverProps';
import { IReceiverWebPartProps } from './IReceiverWebPartProps';

export default class ReceiverWebPart extends BaseClientSideWebPart<IReceiverWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IReceiverProps> = React.createElement(Receiver);

    ReactDom.render(element, this.domElement);
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