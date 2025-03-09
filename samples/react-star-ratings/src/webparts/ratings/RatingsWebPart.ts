import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RatingsWebPartStrings';
import Ratings from './components/Ratings';
import { IRatingsProps } from './components/IRatingsProps';

export interface IRatingsWebPartProps {
  color: 'brand' | 'marigold' | 'neutral';
  size: 'small' | 'medium' | 'large';
  title: string;
}

export default class RatingsWebPart extends BaseClientSideWebPart<IRatingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRatingsProps> = React.createElement(
      Ratings,
      {
        context: this.context,
        color: this.properties.color,
        displayMode: this.displayMode,
        size: this.properties.size,
        title: this.properties.title,
        onUpdateTitle: (value: string) => {
          this.properties.title = value;
          this.render();
        }
      }
    );
    ReactDom.render(
      element,
      this.domElement
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.4');
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
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneDropdown('color', {
                  label: strings.ColorFieldLabel,
                  options: [
                    { key: 'brand', text: strings.ColorFieldOptions.brand },
                    { key: 'marigold', text: strings.ColorFieldOptions.marigold },
                    { key: 'neutral', text: strings.ColorFieldOptions.neutral }
                  ]
                }),
                PropertyPaneDropdown('size', {
                  label: strings.SizeFieldLabel,
                  options: [
                    { key: 'small', text: strings.SizeFieldOptions.small },
                    { key: 'medium', text: strings.SizeFieldOptions.medium },
                    { key: 'large', text: strings.SizeFieldOptions.large }
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
