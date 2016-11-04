import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactMobxStrings';
import DefaultContainer from './containers/DefaultContainer';
import { IReactMobxWebPartProps } from './IReactMobxWebPartProps';

export default class ReactMobxWebPart extends BaseClientSideWebPart<IReactMobxWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {

    const element = (
      <DefaultContainer name={this.properties.description} reactive={this.properties.disableReactive} />
    );

    ReactDom.render(element, this.domElement);
  }

   protected get disableReactivePropertyChanges() {
     return this.properties ? this.properties.disableReactive : false;
   }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
