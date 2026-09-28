import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'GovernanceSiteLifecycleDashboardWebPartStrings';
import GovernanceSiteLifecycleDashboard from './components/GovernanceSiteLifecycleDashboard';
import { ISourceResult, parseConfig, parseReferenceDate } from './services/governanceLogic';
import { loadSources } from './services/governanceService';

export interface IGovernanceSiteLifecycleDashboardWebPartProps {
  sourcesJson: string;
  referenceDate: string;
  reviewHorizonDays: number;
}

export default class GovernanceSiteLifecycleDashboardWebPart extends BaseClientSideWebPart<IGovernanceSiteLifecycleDashboardWebPartProps> {
  private _sourceResults: ISourceResult[] = [];
  private _configurationErrors: string[] = [];
  private _loading: boolean = true;
  private _loadError: string | undefined;
  private _loadSequence: number = 0;

  public render(): void {
    const config = parseConfig(this.properties.sourcesJson || '[]', this.properties.reviewHorizonDays);
    const referenceDate = parseReferenceDate(this.properties.referenceDate || '2026-08-30');
    const element: React.ReactElement = React.createElement(GovernanceSiteLifecycleDashboard, {
      sourceResults: this._sourceResults,
      configurationErrors: this._configurationErrors.length ? this._configurationErrors : config.errors,
      referenceDate: referenceDate.toISOString().slice(0, 10),
      reviewHorizonDays: config.reviewHorizonDays,
      loading: this._loading,
      loadError: this._loadError,
      onRetry: this._load
    });
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await this._load();
  }

  private _load = async (): Promise<void> => {
    const sequence = ++this._loadSequence;
    const config = parseConfig(this.properties.sourcesJson || '[]', this.properties.reviewHorizonDays);
    const referenceDate = parseReferenceDate(this.properties.referenceDate || '2026-08-30');
    this._loading = true;
    this._loadError = undefined;
    this._configurationErrors = config.errors;
    this._sourceResults = [];
    this.render();

    try {
      const pageUrl = new URL(this.context.pageContext.web.absoluteUrl);
      const results = await loadSources(this.context.spHttpClient, config.sources, pageUrl.origin, referenceDate, config.reviewHorizonDays, SPHttpClient.configurations.v1);
      if (sequence !== this._loadSequence) { return; }
      this._sourceResults = results;
    } catch (error) {
      if (sequence !== this._loadSequence) { return; }
      this._loadError = error instanceof Error ? error.message : 'The dashboard could not load its sources.';
    } finally {
      if (sequence === this._loadSequence) {
        this._loading = false;
        this.render();
      }
    }
  };

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === 'sourcesJson' || propertyPath === 'referenceDate' || propertyPath === 'reviewHorizonDays') {
      void this._load();
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [
            PropertyPaneTextField('sourcesJson', { label: strings.SourcesJsonFieldLabel, multiline: true, rows: 10 }),
            PropertyPaneTextField('referenceDate', { label: strings.ReferenceDateFieldLabel }),
            PropertyPaneTextField('reviewHorizonDays', { label: strings.ReviewHorizonFieldLabel })
          ]
        }]
      }]
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
