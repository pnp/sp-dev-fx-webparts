import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxAlmWebPartStrings';
import SpFxAlm from './components/SpFxAlm';
import { ISpFxAlmProps } from './components/ISpFxAlmProps';
import { sp } from '@pnp/sp';
import HttpService from '../spFxAlm/components/service';


export interface ISpFxAlmWebPartProps {
  description: string;
}

export default class SpFxAlmWebPart extends BaseClientSideWebPart<ISpFxAlmWebPartProps> {

  protected async onInit(): Promise<void> {
    HttpService.Init(this.context.spHttpClient);  
  }

  public render(): void {
    const element: React.ReactElement<ISpFxAlmProps> = React.createElement(
      SpFxAlm,
      {
        url: this.context.pageContext.web.absoluteUrl,
        rootSiteUrl: this.context.pageContext.web.serverRelativeUrl.length > 1 ? this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,"") : this.context.pageContext.web.absoluteUrl
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
