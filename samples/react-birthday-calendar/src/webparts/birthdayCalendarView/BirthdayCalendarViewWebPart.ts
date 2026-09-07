import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'BirthdayCalendarViewWebPartStrings';
import BirthdayCalendarView from './components/BirthdayCalendarView';
import { IBirthdayCalendarViewProps } from './components/IBirthdayCalendarViewProps';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface IBirthdayCalendarViewWebPartProps {
  siteUrl: string;
  listName: string;
  dateFieldName: string;
  personFieldName: string;
  startWeekOnMonday: boolean;
  themeMode: ThemeMode;
}

export default class BirthdayCalendarViewWebPart extends BaseClientSideWebPart<IBirthdayCalendarViewWebPartProps> {

  private _isDarkTheme: boolean = false;

  /** The site theme decides the palette unless the author has pinned one in the property pane. */
  private get _useDarkPalette(): boolean {
    switch (this.properties.themeMode) {
      case 'light':
        return false;
      case 'dark':
        return true;
      default:
        return this._isDarkTheme;
    }
  }

  public render(): void {
    const element: React.ReactElement<IBirthdayCalendarViewProps> = React.createElement(
      BirthdayCalendarView,
      {
        siteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName || 'BDay',
        dateFieldName: this.properties.dateFieldName || 'BDate',
        personFieldName: this.properties.personFieldName === undefined
          ? 'Person'
          : this.properties.personFieldName,
        startWeekOnMonday: !!this.properties.startWeekOnMonday,
        spHttpClient: this.context.spHttpClient,
        isDarkTheme: this._useDarkPalette
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // The choice group shows nothing selected unless the property has a value.
    if (!this.properties.themeMode) {
      this.properties.themeMode = 'auto';
    }
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

    // The palette is chosen in render(), so a theme switch has to re-render to take effect.
    if (this.renderedOnce) {
      this.render();
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel,
                  description: strings.SiteUrlFieldDescription
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('dateFieldName', {
                  label: strings.DateFieldNameFieldLabel
                }),
                PropertyPaneTextField('personFieldName', {
                  label: strings.PersonFieldNameFieldLabel,
                  description: strings.PersonFieldNameFieldDescription
                })
              ]
            },
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneToggle('startWeekOnMonday', {
                  label: strings.StartWeekOnMondayFieldLabel,
                  onText: strings.StartWeekOnMondayOnText,
                  offText: strings.StartWeekOnMondayOffText
                }),
                PropertyPaneChoiceGroup('themeMode', {
                  label: strings.ThemeModeFieldLabel,
                  options: [
                    { key: 'auto', text: strings.ThemeModeAutoText },
                    { key: 'light', text: strings.ThemeModeLightText },
                    { key: 'dark', text: strings.ThemeModeDarkText }
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
