import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'SaveEmailToSharePointWebPartStrings';
import SaveEmailToSharePoint from './components/SaveEmailToSharePoint';
import { ISaveEmailToSharePointProps } from './components/ISaveEmailToSharePointProps';

export interface ISaveEmailToSharePointWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class SaveEmailToSharePointWebPart extends BaseClientSideWebPart <ISaveEmailToSharePointWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => { 
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<ISaveEmailToSharePointProps> = React.createElement(
      SaveEmailToSharePoint,
      {
        description: this.properties.description,
        context: this.context
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
          groups: [
            {
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
