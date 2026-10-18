import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ModernGlossaryWebPartStrings';
import { ModernGlossary, IModernGlossaryProps } from './components/ModernGlossary';
import { IModernGlossaryWebPartProps } from './models/IModernGlossaryWebPartProps';

export default class ModernGlossaryWebPart extends BaseClientSideWebPart<IModernGlossaryWebPartProps> {
  protected onInit(): Promise<void> {
    if (!this.properties.listName) {
      this.properties.listName = 'ModernGlossary';
    }
    if (!this.properties.title) {
      this.properties.title = 'All Application Glossary';
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IModernGlossaryProps> = React.createElement(
      ModernGlossary,
      {
        context: this.context,
        title: this.properties.title,
        listName: this.properties.listName,
        isEditMode: this.displayMode === DisplayMode.Edit
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDisplayModeChanged(oldDisplayMode: DisplayMode): void {
    void oldDisplayMode;
    this.render();
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel,
                  description: strings.ListNameFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}