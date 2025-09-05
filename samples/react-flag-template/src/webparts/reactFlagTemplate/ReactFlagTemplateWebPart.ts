import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ReactFlagTemplate from './components/ReactFlagTemplate';
import { IReactFlagTemplateProps } from './components/IReactFlagTemplateProps';

export interface IReactFlagTemplateWebPartProps {
  listName: string;
}

export default class ReactFlagTemplateWebPart extends BaseClientSideWebPart<IReactFlagTemplateWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactFlagTemplateProps> = React.createElement(
      ReactFlagTemplate,
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
          header: { description: 'List items renderd using the flag template' },
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
