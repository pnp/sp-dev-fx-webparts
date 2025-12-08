import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ReactBubbleTemplate from './components/ReactBubbleTemplate';
import { IReactBubbleTemplateProps } from './components/IReactBubbleTemplateProps';

export interface IReactBubbleTemplateWebPartProps {
  listName: string;
}

export default class ReactBubbleTemplateWebPart extends BaseClientSideWebPart<IReactBubbleTemplateWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactBubbleTemplateProps> = React.createElement(
      ReactBubbleTemplate,
      {
        listName: this.properties.listName,
        spfxContext: this.context
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
          header: { description: 'List items rendered using the bubble template' },
          groups: [
            {
              groupName: 'Data',
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: 'List name',
                  placeholder: 'Enter SharePoint list title'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}