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
import { PropertyPaneColumnConfiguration } from './propertyPane/PropertyPaneColumnConfiguration';
import { ColumnSetting, deriveColumnSettings, serializeColumnConfiguration } from './utils/columnConfig';

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
        showAdvancedProperties: this.properties.showAdvancedProperties || false,
        showTitleColumn: this.properties.showTitleColumn,
        showLocationColumn: this.properties.showLocationColumn,
        showSiteColumn: this.properties.showSiteColumn,
        showScopeColumn: this.properties.showScopeColumn,
        showComponentColumn: this.properties.showComponentColumn,
        showSequenceColumn: this.properties.showSequenceColumn,
        showDescriptionColumn: this.properties.showDescriptionColumn,
        columnOrder: this.properties.columnOrder,
        columnConfiguration: this.properties.columnConfiguration
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
    const columnSettings = deriveColumnSettings(this.properties);

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
            },
            {
              groupName: strings.ColumnConfigurationGroupName,
              groupFields: [
                PropertyPaneColumnConfiguration({
                  key: 'columnConfigurationField',
                  targetProperty: 'columnConfiguration',
                  label: strings.ColumnConfigurationFieldLabel,
                  description: strings.ColumnConfigurationFieldDescription,
                  settings: columnSettings,
                  onChange: this._onColumnConfigurationChanged
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _onColumnConfigurationChanged = (settings: ColumnSetting[]): void => {
    const serialized = serializeColumnConfiguration(settings);
    const previousValue = this.properties.columnConfiguration;

    this.properties.columnConfiguration = serialized;
    this.properties.columnOrder = settings.map(setting => setting.key).join(',');
    this.properties.showTitleColumn = settings.find(setting => setting.key === 'title')?.visible ?? true;
    this.properties.showLocationColumn = settings.find(setting => setting.key === 'location')?.visible ?? true;
    this.properties.showSiteColumn = settings.find(setting => setting.key === 'site')?.visible ?? true;
    this.properties.showScopeColumn = settings.find(setting => setting.key === 'scope')?.visible ?? true;
    this.properties.showComponentColumn = settings.find(setting => setting.key === 'component')?.visible ?? true;
    this.properties.showSequenceColumn = settings.find(setting => setting.key === 'sequence')?.visible ?? true;
    this.properties.showDescriptionColumn = settings.find(setting => setting.key === 'description')?.visible ?? true;

    this.onPropertyPaneFieldChanged('columnConfiguration', previousValue, serialized);
    this.render();
    this.context.propertyPane.refresh();
  };
}
