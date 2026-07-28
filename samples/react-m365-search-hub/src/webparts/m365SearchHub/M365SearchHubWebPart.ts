import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

import * as strings from 'M365SearchHubWebPartStrings';
import M365SearchHub from './components/M365SearchHub';
import { IM365SearchHubProps } from './components/IM365SearchHubProps';

export interface IM365SearchHubWebPartProps {
  title: string;
  pageSize: number;
  showPerformancePanel: boolean;
}

/**
 * A page size Microsoft Graph is happy with.
 *
 * The Search API caps a page at 1000 and documents that a larger page costs
 * latency, recommending a small first page. 25 is Graph's own default.
 */
const DEFAULT_PAGE_SIZE = 25;

export default class M365SearchHubWebPart extends BaseClientSideWebPart<IM365SearchHubWebPartProps> {
  private _themeProvider?: ThemeProvider;
  private _theme: Theme = webLightTheme;

  protected onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._theme = this._toFluentTheme(this._themeProvider.tryGetTheme());
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IM365SearchHubProps> = React.createElement(
      M365SearchHub,
      {
        title: this.properties.title,
        pageSize: this.properties.pageSize || DEFAULT_PAGE_SIZE,
        showPerformancePanel: !!this.properties.showPerformancePanel
      }
    );

    // IdPrefixProvider keeps generated ids unique when more than one copy of
    // the web part sits on the same page.
    ReactDom.render(
      React.createElement(
        IdPrefixProvider,
        { value: `m365-search-hub-${this.instanceId}-` },
        React.createElement(FluentProvider, { theme: this._theme }, element)
      ),
      this.domElement
    );
  }

  /** Bridges the host theme onto Fluent v9, which has a palette of its own. */
  private _toFluentTheme(variant: IReadonlyTheme | undefined): Theme {
    const base = variant?.isInverted ? webDarkTheme : webLightTheme;
    return variant ? createV9Theme(variant as never, base) : base;
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._theme = this._toFluentTheme(args.theme);
    this.render();
  }

  protected onDispose(): void {
    // Stop listening before the tree goes away, so a later theme change cannot
    // try to render into a container that is no longer there.
    this._themeProvider?.themeChangedEvent.remove(this, this._handleThemeChangedEvent);
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneSlider('pageSize', {
                  label: strings.PageSizeFieldLabel,
                  min: 10,
                  max: 100,
                  step: 5,
                  value: this.properties.pageSize || DEFAULT_PAGE_SIZE,
                  showValue: true
                })
              ]
            },
            {
              groupName: strings.DiagnosticsGroupName,
              groupFields: [
                PropertyPaneToggle('showPerformancePanel', {
                  label: strings.ShowPerformancePanelLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
