import { ThemeProvider, type ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  FluentProvider,
  IdPrefixProvider,
  type Theme,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
import { spfi, type SPFI } from '@pnp/sp';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'SiteDirectoryWebPartStrings';
import SiteDirectory from './components/SiteDirectory';
import type { ISiteDirectoryProps } from './components/ISiteDirectoryProps';
import { SiteDirectoryService, type ISiteDirectoryConfig } from './services/SiteDirectoryService';

export interface ISiteDirectoryWebPartProps {
  listTitle: string;
  title: string;
  titleField: string;
  categoryField: string;
  urlField: string;
  descriptionField: string;
  ownerField: string;
  logoUrlField: string;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_PROPERTIES: ISiteDirectoryWebPartProps = {
  listTitle: 'Site Directory',
  title: 'Site Directory',
  titleField: 'Title',
  categoryField: 'Category',
  urlField: 'URL',
  descriptionField: 'Description',
  ownerField: 'Owner',
  logoUrlField: 'LogoUrl',
  pageSize: DEFAULT_PAGE_SIZE
};

export default class SiteDirectoryWebPart extends BaseClientSideWebPart<ISiteDirectoryWebPartProps> {
  private _sp?: SPFI;
  private _themeProvider?: ThemeProvider;
  private _theme: Theme = webLightTheme;

  protected async onInit(): Promise<void> {
    this._sp = spfi().using(SPFx(this.context));
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._theme = this._themeProvider.tryGetTheme()?.isInverted ? webDarkTheme : webLightTheme;
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    await super.onInit();
  }

  public render(): void {
    if (!this._sp) {
      return;
    }

    const config: ISiteDirectoryConfig = {
      listTitle: this.properties.listTitle ?? DEFAULT_PROPERTIES.listTitle,
      titleField: this.properties.titleField ?? DEFAULT_PROPERTIES.titleField,
      categoryField: this.properties.categoryField ?? DEFAULT_PROPERTIES.categoryField,
      urlField: this.properties.urlField ?? DEFAULT_PROPERTIES.urlField,
      descriptionField: this.properties.descriptionField ?? DEFAULT_PROPERTIES.descriptionField,
      ownerField: this.properties.ownerField ?? DEFAULT_PROPERTIES.ownerField,
      logoUrlField: this.properties.logoUrlField ?? DEFAULT_PROPERTIES.logoUrlField,
      pageSize: this.properties.pageSize ?? DEFAULT_PROPERTIES.pageSize
    };
    const service = new SiteDirectoryService(this._sp, config);
    const props: ISiteDirectoryProps = {
      service,
      sp: this._sp,
      config,
      title: this.properties.title ?? DEFAULT_PROPERTIES.title,
      currentOrigin: window.location.origin
    };

    ReactDom.render(
      React.createElement(
        IdPrefixProvider,
        { value: `site-directory-${this.instanceId}-` },
        React.createElement(
          FluentProvider,
          { theme: this._theme },
          React.createElement(SiteDirectory, props)
        )
      ),
      this.domElement
    );
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    const theme = args.theme ?? this._themeProvider?.tryGetTheme();
    this._theme = theme?.isInverted ? webDarkTheme : webLightTheme;
    this.render();
  }

  protected onDispose(): void {
    this._themeProvider?.themeChangedEvent.remove(this, this._handleThemeChangedEvent);
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [
          {
            groupName: strings.ListGroupName,
            groupFields: [
              PropertyPaneTextField('listTitle', {
                label: strings.ListTitleFieldLabel,
                description: strings.ListTitleFieldDescription
              }),
              PropertyPaneTextField('title', { label: strings.WebPartTitleFieldLabel }),
              PropertyPaneSlider('pageSize', {
                label: strings.PageSizeFieldLabel,
                min: 1,
                max: 50,
                step: 1,
                value: this.properties.pageSize ?? DEFAULT_PAGE_SIZE,
                showValue: true
              })
            ]
          },
          {
            groupName: strings.FieldsGroupName,
            groupFields: [
              PropertyPaneTextField('titleField', { label: strings.TitleFieldLabel }),
              PropertyPaneTextField('categoryField', { label: strings.CategoryFieldLabel }),
              PropertyPaneTextField('urlField', { label: strings.UrlFieldLabel }),
              PropertyPaneTextField('descriptionField', { label: strings.DescriptionFieldLabel }),
              PropertyPaneTextField('ownerField', { label: strings.OwnerFieldLabel }),
              PropertyPaneTextField('logoUrlField', { label: strings.LogoUrlFieldLabel })
            ]
          }
        ]
      }]
    };
  }
}
