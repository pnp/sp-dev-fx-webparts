import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { FluentProvider, IdPrefixProvider, Theme, webLightTheme } from '@fluentui/react-components';

import { MSGraphClientV3 } from '@microsoft/sp-http';

import * as strings from 'M365SearchHubWebPartStrings';
import M365SearchHub from './components/M365SearchHub';
import { IM365SearchHubProps } from './components/IM365SearchHubProps';
import { GraphSearchService } from './services/GraphSearchService';
import { createMSGraphPoster } from './services/msGraphPoster';
import { toFluentTheme } from './services/toFluentTheme';
import { SearchScope } from './models/ISearchModels';

export interface IM365SearchHubWebPartProps {
  title: string;
  pageSize: number;
  scope: SearchScope;
  showPerformancePanel: boolean;
}

/**
 * How many results a page asks for.
 *
 * Graph's own default is 25, and the Search API caps a page at 1000 while
 * documenting that a larger page costs latency. 25 is still too many here:
 * measured in a workbench, 25 results made the web part 2388px tall, which
 * takes over a page it is meant to sit inside. 10 fills a screen without
 * dominating it, and anybody who wants a denser list can raise it.
 */
const DEFAULT_PAGE_SIZE = 10;

export default class M365SearchHubWebPart extends BaseClientSideWebPart<IM365SearchHubWebPartProps> {
  private _themeProvider?: ThemeProvider;
  private _theme: Theme = webLightTheme;
  private _service?: GraphSearchService;

  protected onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._theme = toFluentTheme(this._themeProvider.tryGetTheme());
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    // Built once and kept, so its cache survives the re-renders a property
    // pane change causes. The Graph client is acquired per call, which is
    // cheap and avoids holding one open while the web part sits unused.
    this._service = new GraphSearchService(
      createMSGraphPoster(() => this.context.msGraphClientFactory.getClient('3') as Promise<MSGraphClientV3>)
    );

    return super.onInit();
  }

  public render(): void {
    if (!this._service) {
      // render() can run before onInit finished on a first paint. There is
      // nothing to search with yet, so wait rather than render half a web part.
      return;
    }

    const element: React.ReactElement<IM365SearchHubProps> = React.createElement(
      M365SearchHub,
      {
        title: this.properties.title,
        pageSize: this.properties.pageSize || DEFAULT_PAGE_SIZE,
        scope: this.properties.scope || 'tenant',
        currentSiteUrl: this.context.pageContext.web.absoluteUrl,
        showPerformancePanel: !!this.properties.showPerformancePanel,
        service: this._service
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

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._theme = toFluentTheme(args.theme);
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
                  min: 5,
                  max: 50,
                  step: 5,
                  value: this.properties.pageSize || DEFAULT_PAGE_SIZE,
                  showValue: true
                }),
                // Two options, because there are two behaviours. A scope this
                // web part cannot actually apply has no business being offered.
                PropertyPaneChoiceGroup('scope', {
                  label: strings.ScopeFieldLabel,
                  options: [
                    { key: 'tenant', text: strings.ScopeTenant },
                    { key: 'site', text: strings.ScopeSite }
                  ]
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
