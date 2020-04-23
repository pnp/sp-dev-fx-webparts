import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactTaxonomypickerPanelWebPartStrings';
import ReactTaxonomypickerPanel from './components/ReactTaxonomypickerPanel';
import { IReactTaxonomypickerPanelProps } from './components/IReactTaxonomypickerPanelProps';
import { setup as pnpSetup } from "@pnp/common";

export interface IReactTaxonomypickerPanelWebPartProps {
  description: string;
}

export default class ReactTaxonomypickerPanelWebPart extends BaseClientSideWebPart<IReactTaxonomypickerPanelWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IReactTaxonomypickerPanelProps > = React.createElement(
      ReactTaxonomypickerPanel,
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
