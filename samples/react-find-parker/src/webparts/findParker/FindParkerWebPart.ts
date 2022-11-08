import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'FindParkerWebPartStrings';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import FindParker from './components/FindParker/FindParker';
import { IFindParkerProps } from './components//FindParker/IFindParkerProps';
import { IFindParkerWebPartProps } from './IFindParkerWebPartProps';

export default class FindParkerWebPart extends BaseClientSideWebPart<IFindParkerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFindParkerProps> = React.createElement(
      FindParker,
      {
        numberOfElements: this.properties.numberOfElements
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
              groupName: strings.PropertyPaneBasicGroupName,
              groupFields: [
                PropertyPaneSlider('numberOfElements', {
                  label: strings.PropertyPaneNumberOfElementsFieldLabel,
                  min: 1,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
