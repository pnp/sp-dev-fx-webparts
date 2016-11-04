import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactMobxStrings';
import ReactMobx, { IReactMobxProps } from './components/ReactMobx';
import { IReactMobxWebPartProps } from './IReactMobxWebPartProps';

export default class ReactMobxWebPart extends BaseClientSideWebPart<IReactMobxWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IReactMobxProps> = React.createElement(ReactMobx, {
      description: this.properties.description
    });

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
