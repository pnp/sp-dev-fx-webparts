import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ReactQuotesWebPartStrings';
import ReactQuotes from './components/ReactQuotes';
import { IReactQuotesProps } from './components/IReactQuotesProps';
import { PropertyFieldColorPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyPaneToggle, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';

export interface IReactQuotesWebPartProps {
  description: string;
  quoteColor: string;
  authorColor: string;
  manual: boolean;
  manualQuote: string;
  manualAuthor: string;
}

export default class ReactQuotesWebPart extends BaseClientSideWebPart<IReactQuotesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactQuotesProps> = React.createElement(
      ReactQuotes,
      {
        description: this.properties.description,
        quoteColor: this.properties.quoteColor,
        authorColor: this.properties.authorColor,
        manual: this.properties.manual,
        manualQuote: this.properties.manualQuote,
        manualAuthor: this.properties.manualAuthor
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
              groupName: 'Quote Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Title'
                }),
                PropertyFieldColorPicker('quoteColor', {
                  label: 'Quote Color',
                  selectedColor: this.properties.quoteColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  iconName: 'Precipitation',
                  key: 'quoteFieldID'
                }),
                PropertyFieldColorPicker('authorColor', {
                  label: 'Author Color',
                  selectedColor: this.properties.authorColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  iconName: 'Precipitation',
                  key: 'authorFieldID'
                }),
                PropertyPaneToggle('manual', {
                  label: 'Use manual quote?'
                }),
                PropertyPaneTextField('manualQuote', {
                  label: 'Quote',
                  disabled: !this.properties.manual
                }),
                PropertyPaneTextField('manualAuthor', {
                  label: 'Author',
                  disabled: !this.properties.manual
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
