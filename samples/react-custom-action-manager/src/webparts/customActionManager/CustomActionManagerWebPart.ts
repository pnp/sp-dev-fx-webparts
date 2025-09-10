import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CustomActionManagerWebPartStrings';
import CustomActionManager from './components/CustomActionManager';
import { ICustomActionManagerProps } from './components/ICustomActionManagerProps';
import { ICustomActionManagerWebPartProps } from './ICustomActionManagerWebPartProps';
import { CustomActionScope } from '../../models';

export default class CustomActionManagerWebPart extends BaseClientSideWebPart<ICustomActionManagerWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ICustomActionManagerProps> = React.createElement(
      CustomActionManager,
      {
        title: this.properties.title || 'Custom Action Manager',
        description: this.properties.description || 'Manage SharePoint custom actions across different scopes',
        context: this.context,
        defaultScope: this.properties.defaultScope || CustomActionScope.Web,
        pageSize: this.properties.pageSize || 25,
        enableSearch: this.properties.enableSearch !== false,
        enableFiltering: this.properties.enableFiltering !== false,
        enableCRUD: this.properties.enableCRUD !== false,
        showAdvancedProperties: this.properties.showAdvancedProperties || false
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || '');
      this.domElement.style.setProperty('--link', semanticColors.link || '');
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || '');
    }
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
              groupName: strings.GeneralGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: this.properties.title || 'Custom Action Manager'
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  multiline: true,
                  rows: 3,
                  value: this.properties.description || 'Manage SharePoint custom actions across different scopes'
                }),
                PropertyPaneDropdown('defaultScope', {
                  label: strings.DefaultScopeFieldLabel,
                  options: [
                    { key: CustomActionScope.Web, text: 'Web' },
                    { key: CustomActionScope.Site, text: 'Site' },
                    { key: 'All', text: 'All Scopes' }
                  ],
                  selectedKey: this.properties.defaultScope || CustomActionScope.Web
                })
              ]
            },
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneSlider('pageSize', {
                  label: strings.PageSizeFieldLabel,
                  min: 10,
                  max: 100,
                  step: 5,
                  showValue: true,
                  value: this.properties.pageSize || 25
                }),
                PropertyPaneToggle('enableSearch', {
                  label: strings.EnableSearchFieldLabel,
                  checked: this.properties.enableSearch !== false
                }),
                PropertyPaneToggle('enableFiltering', {
                  label: strings.EnableFilteringFieldLabel,
                  checked: this.properties.enableFiltering !== false
                })
              ]
            },
            {
              groupName: strings.FunctionalityGroupName,
              groupFields: [
                PropertyPaneToggle('enableCRUD', {
                  label: strings.EnableCRUDFieldLabel,
                  checked: this.properties.enableCRUD !== false
                }),
                PropertyPaneToggle('showAdvancedProperties', {
                  label: strings.ShowAdvancedPropertiesFieldLabel,
                  checked: this.properties.showAdvancedProperties || false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}