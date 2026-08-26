import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QuickLinksProWebPartStrings';
import QuickLinksPro from './components/QuickLinksPro';
import { IQuickLinksProProps } from './components/IQuickLinksProProps';

export interface IQuickLinksProWebPartProps {
  description: string;
  selectedListId: string;
  selectedListTitle: string;
  displayStyle: 'cards' | 'buttons' | 'list'; // Added 'list' option
}

export default class QuickLinksProWebPart extends BaseClientSideWebPart<IQuickLinksProWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickLinksProProps> = React.createElement(
      QuickLinksPro,
      {
        description: this.properties.description,
        context: this.context,
        displayMode: this.displayMode,
        selectedListId: this.properties.selectedListId || '',
        selectedListTitle: this.properties.selectedListTitle || '',
        displayStyle: this.properties.displayStyle || 'cards',
        updateProperty: (value: { selectedListId: string; selectedListTitle: string })  => {
          this.properties.selectedListId = value.selectedListId;
          this.properties.selectedListTitle = value.selectedListTitle;
          this.render();
        }
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
                PropertyPaneChoiceGroup('displayStyle', {
                  label: 'Display Style',
                  options: [
                    { key: 'cards', text: 'Cards' },
                    { key: 'buttons', text: 'Buttons' },
                    { key: 'list', text: 'List' } // Added list option
                  ]
                })
              ]
            },
            {
              groupName: 'Information',
              groupFields: [
                PropertyPaneTextField('selectedListTitle', {
                  label: 'Selected List',
                  disabled: true
                })
              ],
              isCollapsed: true
            }
          ]
        }
      ]
    };
  }
}