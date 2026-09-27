import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { GraphFI } from '@pnp/graph';
import { CalendarService } from './services/CalendarService';
import { ReactCrossSiteEvents } from './components/ReactCrossSiteEvents';
import { createGraphHost } from './host/GraphHost';
import { clampDays, safeRangeSettings, validateSiteSources } from './utils/validation';
import { MAX_DAYS_AHEAD, MAX_DAYS_BACK } from './models/Configuration';

export interface IReactCrossSiteEventsWebPartProps {
  siteUrls: string;
  daysBack: number;
  daysAhead: number;
  displayTimeZone: string;
}

export default class ReactCrossSiteEventsWebPart extends BaseClientSideWebPart<IReactCrossSiteEventsWebPartProps> {
  private graph!: GraphFI;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.graph = createGraphHost(this.context);
  }

  public render(): void {
    const settings = safeRangeSettings(this.properties.daysBack, this.properties.daysAhead);
    const validation = validateSiteSources(this.properties.siteUrls || '', this.context.pageContext.web.absoluteUrl);
    const displayTimeZone = this.safeTimeZone(this.properties.displayTimeZone);
    const element = React.createElement(ReactCrossSiteEvents, {
      service: new CalendarService(this.graph),
      sources: validation.sources,
      validationErrors: validation.errors,
      daysBack: settings.daysBack,
      daysAhead: settings.daysAhead,
      displayTimeZone
    });
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
        header: { description: 'Cross-site events' },
        groups: [{
          groupName: 'Calendar sources',
          groupFields: [
            PropertyPaneTextField('siteUrls', {
              label: 'Team-site calendar sources',
              description: 'One HTTPS SharePoint URL|Microsoft 365 group ID per line. Maximum 8 sources.',
              multiline: true,
              rows: 6
            }),
            PropertyPaneSlider('daysBack', { label: 'Days back', min: 0, max: MAX_DAYS_BACK, value: 7, showValue: true }),
            PropertyPaneSlider('daysAhead', { label: 'Days ahead', min: 0, max: MAX_DAYS_AHEAD, value: 30, showValue: true }),
            PropertyPaneTextField('displayTimeZone', { label: 'Display time zone', description: 'IANA time zone, for example Europe/London.' })
          ]
        }]
      }]
    };
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    this.properties.daysBack = clampDays(this.properties.daysBack, 7, MAX_DAYS_BACK);
    this.properties.daysAhead = clampDays(this.properties.daysAhead, 30, MAX_DAYS_AHEAD);
    this.render();
  }

  private safeTimeZone(value: string | undefined): string {
    const candidate = (value || 'UTC').trim() || 'UTC';
    try {
      new Intl.DateTimeFormat('en', { timeZone: candidate }).format();
      return candidate;
    } catch (_) {
      return 'UTC';
    }
  }
}
