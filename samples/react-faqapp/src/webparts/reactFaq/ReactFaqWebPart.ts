import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ReactFaqWebPartStrings';
import ReactFaq from './components/ReactFaq';
import { IReactFaqProps } from './components/IReactFaqProps';

export interface IReactFaqWebPartProps {
  listName:string;
}

export default class ReactFaqWebPart extends BaseClientSideWebPart<IReactFaqWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactFaqProps > = React.createElement(
      ReactFaq,
      {
        listName:this.properties.listName,
        ServiceScope: this.context.serviceScope
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
