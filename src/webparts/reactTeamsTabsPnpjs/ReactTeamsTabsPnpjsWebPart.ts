import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactTeamsTabsPnpjsWebPartStrings';
import ReactTeamsTabsPnpjs from './components/ReactTeamsTabsPnpjs';
import { IReactTeamsTabsPnpjsProps } from './components/IReactTeamsTabsPnpjsProps';
import { graph } from "@pnp/graph";
import { sp } from "@pnp/sp";



export interface IReactTeamsTabsPnpjsWebPartProps {
  description: string;
}

export default class ReactTeamsTabsPnpjsWebPart extends BaseClientSideWebPart<IReactTeamsTabsPnpjsWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });

      graph.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IReactTeamsTabsPnpjsProps > = React.createElement(
      ReactTeamsTabsPnpjs,
      {
        description: this.properties.description
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
