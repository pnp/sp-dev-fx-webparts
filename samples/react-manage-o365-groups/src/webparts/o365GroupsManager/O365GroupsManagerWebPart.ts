import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'O365GroupsManagerWebPartStrings';
import O365GroupsManager from './components/O365GroupsManager/O365GroupsManager';
import { IO365GroupsManagerProps } from './components/O365GroupsManager/IO365GroupsManagerProps';
import O365GroupService from '../../services/O365GroupService';

export interface IO365GroupsManagerWebPartProps {
  flowUrl: string;
}

export default class O365GroupsManagerWebPart extends BaseClientSideWebPart<IO365GroupsManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IO365GroupsManagerProps> = React.createElement(
      O365GroupsManager,
      {
        flowUrl: this.properties.flowUrl,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      O365GroupService.setup(this.context);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {   
    return true;   
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
                PropertyPaneTextField('flowUrl', {
                  label: strings.FlowUrlLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
