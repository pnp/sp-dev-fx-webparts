import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'KnowledgeSourceHealthWebPartStrings';
import KnowledgeSourceHealth from './components/KnowledgeSourceHealth';
import { IKnowledgeSourceHealthProps } from './components/IKnowledgeSourceHealthProps';
import { IScanService } from '../../services/IScanService';
import { SharePointScanService } from '../../services/SharePointScanService';
import { DemoScanService } from '../../services/DemoScanService';

export interface IKnowledgeSourceHealthWebPartProps {
  maxItemsPerLibrary: number;
  staleAfterMonths: number;
  useDemoData: boolean;
}

export default class KnowledgeSourceHealthWebPart extends BaseClientSideWebPart<IKnowledgeSourceHealthWebPartProps> {
  private _hasTeamsContext: boolean = false;
  private _scanService: IScanService | undefined = undefined;
  private _scanServiceIsDemo: boolean | undefined = undefined;

  /**
   * Cached so the React effect that loads libraries is not retriggered on every
   * render. Rebuilt only when the demo data toggle changes.
   */
  private _getScanService(): IScanService {
    const useDemo = this.properties.useDemoData !== false;
    if (!this._scanService || this._scanServiceIsDemo !== useDemo) {
      this._scanService = useDemo
        ? new DemoScanService()
        : new SharePointScanService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
      this._scanServiceIsDemo = useDemo;
    }
    return this._scanService;
  }

  public render(): void {
    const element: React.ReactElement<IKnowledgeSourceHealthProps> = React.createElement(
      KnowledgeSourceHealth,
      {
        scanService: this._getScanService(),
        maxItemsPerLibrary: this.properties.maxItemsPerLibrary || 300,
        staleAfterMonths: this.properties.staleAfterMonths || 24,
        usingDemoData: this.properties.useDemoData !== false,
        hasTeamsContext: this._hasTeamsContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._hasTeamsContext = !!this.context.sdks.microsoftTeams;
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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
              groupName: strings.ScanGroupName,
              groupFields: [
                PropertyPaneToggle('useDemoData', {
                  label: strings.UseDemoDataFieldLabel,
                  onText: strings.DemoDataOn,
                  offText: strings.DemoDataOff
                }),
                PropertyPaneSlider('maxItemsPerLibrary', {
                  label: strings.MaxItemsFieldLabel,
                  min: 50,
                  max: 2000,
                  step: 50,
                  showValue: true
                }),
                PropertyPaneSlider('staleAfterMonths', {
                  label: strings.StaleAfterMonthsFieldLabel,
                  min: 3,
                  max: 60,
                  step: 3,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
