import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ApplicationCustomizersWebPartStrings';
import ApplicationCustomizers from './components/ApplicationCustomizers';
import { IApplicationCustomizersProps } from './components/IApplicationCustomizersProps';
import { sp } from "@pnp/sp/presets/all";


export interface IApplicationCustomizersWebPartProps {
  description: string;
  designType: string;
}

export default class ApplicationCustomizersWebPart extends BaseClientSideWebPart<IApplicationCustomizersWebPartProps> {

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IApplicationCustomizersProps> = React.createElement(
      ApplicationCustomizers,
      {
        description: this.properties.description,
        context: this.context,
        designType: this.properties.designType
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
                }),
                PropertyPaneChoiceGroup('designType', {
                  label: strings.DesignFieldLabel,
                  options: [
                    { key: 'Accordion', checked: true, text: 'Accordion', iconProps: { officeFabricIconFontName: 'AutoFillTemplate' } },
                    { key: 'List', text: 'List', iconProps: { officeFabricIconFontName: 'GroupedList' } }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
