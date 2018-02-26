import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CustomApiConsumerWebPartStrings';
import CustomApiConsumer from './components/CustomApiConsumer';
import { ICustomApiConsumerProps } from './components/ICustomApiConsumerProps';

export interface ICustomApiConsumerWebPartProps {
  description: string;
}

export default class CustomApiConsumerWebPart extends BaseClientSideWebPart<ICustomApiConsumerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomApiConsumerProps > = React.createElement(
      CustomApiConsumer,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
