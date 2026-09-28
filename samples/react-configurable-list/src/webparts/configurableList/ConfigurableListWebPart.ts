import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import * as strings from 'ConfigurableListWebPartStrings';
import ConfigurableList from './components/ConfigurableList';
import { PnPListApi } from './services/PnPListApi';
import { ListService } from './services/ListService';

export interface IConfigurableListWebPartProps {
  listTitle: string;
  visibleFields: string;
  title: string;
  pageSize: number;
  defaultSortField: string;
  defaultSortDirection: 'asc' | 'desc';
  enableSearch: boolean;
}

export default class ConfigurableListWebPart extends BaseClientSideWebPart<IConfigurableListWebPartProps> {
  protected async onInit(): Promise<void> {
    this.properties.listTitle = this.properties.listTitle || 'Documents';
    this.properties.visibleFields = this.properties.visibleFields || 'Title';
    this.properties.title = this.properties.title || 'SharePoint list';
    this.properties.pageSize = this.properties.pageSize || 20;
    this.properties.defaultSortField = this.properties.defaultSortField || 'Id';
    this.properties.defaultSortDirection = this.properties.defaultSortDirection || 'asc';
    this.properties.enableSearch = this.properties.enableSearch !== false;
    await super.onInit();
  }

  public render(): void {
    const element = React.createElement(
      FluentProvider,
      { theme: webLightTheme },
      React.createElement(ConfigurableList, {
        service: new ListService(new PnPListApi(this.context)),
        listTitle: this.properties.listTitle,
        title: this.properties.title,
        visibleFields: this.properties.visibleFields,
        pageSize: this.properties.pageSize,
        defaultSortField: this.properties.defaultSortField,
        defaultSortDirection: this.properties.defaultSortDirection,
        enableSearch: this.properties.enableSearch,
        webUrl: this.context.pageContext.web.absoluteUrl
      })
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
      pages: [{
        groups: [{
          groupName: strings.ConfigurationGroupName,
          groupFields: [
            PropertyPaneTextField('listTitle', { label: strings.ListTitleFieldLabel }),
            PropertyPaneTextField('visibleFields', { label: strings.VisibleFieldsFieldLabel, description: strings.VisibleFieldsFieldDescription }),
            PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
            PropertyPaneSlider('pageSize', { label: strings.PageSizeFieldLabel, min: 1, max: 100, step: 1, showValue: true }),
            PropertyPaneTextField('defaultSortField', { label: strings.DefaultSortFieldLabel }),
            PropertyPaneDropdown('defaultSortDirection', {
              label: strings.DefaultSortDirectionLabel,
              options: [
                { key: 'asc', text: strings.AscendingOption },
                { key: 'desc', text: strings.DescendingOption }
              ]
            }),
            PropertyPaneToggle('enableSearch', { label: strings.EnableSearchFieldLabel, onText: strings.OnText, offText: strings.OffText })
          ]
        }]
      }]
    };
  }
}
