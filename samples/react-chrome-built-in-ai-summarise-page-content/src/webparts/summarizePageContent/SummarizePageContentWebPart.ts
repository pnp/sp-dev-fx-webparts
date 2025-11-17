import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'SummarizePageContentWebPartStrings';
import { SPFxWebPartProvider } from '@apvee/spfx-react-toolkit';

import SummarizePageContent from './components/SummarizePageContent';

export interface ISummarizePageContentWebPartProps {
  useStreaming: boolean;
  summarizerType: string;
  summarizerFormat: string;
  summarizerLength: string;
  sharedContext: string;
  context: string;
  
  // UI Labels (optional - fallback to locale strings)
  summarizeButtonText?: string;
  stopGeneratingText?: string;
  downloadingModelText?: string;
  summaryTitle?: string;
  disclaimerText?: string;
  hideText?: string;
  showSummaryText?: string;
  regenerateSummaryText?: string;
  apiNotSupportedWarning?: string;
  waitForEditorText?: string;
}

export default class SummarizePageContentWebPart extends BaseClientSideWebPart<ISummarizePageContentWebPartProps> {

  private _isLanguageSupported(): boolean {
    const locale = this.context.pageContext.cultureInfo.currentUICultureName;
    const languageCode = locale.split('-')[0];
    const SUPPORTED_SUMMARIZER_LANGUAGES = ['en', 'ja', 'es'];
    return SUPPORTED_SUMMARIZER_LANGUAGES.indexOf(languageCode) !== -1;
  }

  public render(): void {
    const element = React.createElement(
      SPFxWebPartProvider,
      { instance: this },
      React.createElement(
        SummarizePageContent,
        {
          useStreaming: this.properties.useStreaming,
          summarizerType: this.properties.summarizerType ?? 'key-points',
          summarizerFormat: this.properties.summarizerFormat ?? 'markdown',
          summarizerLength: this.properties.summarizerLength ?? 'medium',
          sharedContext: this.properties.sharedContext ?? 'This is a SharePoint page with business content.',
          context: this.properties.context ?? strings.SummarizerContext,
          
          // UI Labels with fallback to locale strings
          summarizeButtonText: this.properties.summarizeButtonText || strings.SummarizeButtonText,
          stopGeneratingText: this.properties.stopGeneratingText || strings.StopGeneratingText,
          downloadingModelText: this.properties.downloadingModelText || strings.DownloadingModelText,
          summaryTitle: this.properties.summaryTitle || strings.SummaryTitle,
          disclaimerText: this.properties.disclaimerText || strings.DisclaimerText,
          hideText: this.properties.hideText || strings.HideText,
          showSummaryText: this.properties.showSummaryText || strings.ShowSummaryText,
          regenerateSummaryText: this.properties.regenerateSummaryText || strings.RegenerateSummaryText,
          apiNotSupportedWarning: this.properties.apiNotSupportedWarning || strings.ApiNotSupportedWarning,
          waitForEditorText: this.properties.waitForEditorText || strings.WaitForEditorText
        }
      )
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // Set initial theme
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const themeState = (window as any).__themeState__;
    if (themeState?.theme) {
      this._applyTheme(themeState.theme);
    }
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._applyTheme(currentTheme);
  }

  private _applyTheme(theme: IReadonlyTheme | undefined): void {
    if (!theme) {
      return;
    }

    const {
      semanticColors,
      palette
    } = theme;

    if (semanticColors && palette) {
      this.domElement.style.setProperty('--themePrimary', semanticColors.primaryButtonBackground || palette.themePrimary || null);
      this.domElement.style.setProperty('--themeDarker', palette.themeDarker || null);
      this.domElement.style.setProperty('--themeLight', palette.themeLight || null);
      this.domElement.style.setProperty('--white', semanticColors.bodyBackground || '#ffffff');
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const isLanguageSupported = this._isLanguageSupported();
    
    // Build summarizer options fields conditionally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const summarizerFields: any[] = [
      PropertyPaneDropdown('summarizerType', {
        label: 'Type',
        options: [
          { key: 'key-points', text: 'Key Points' },
          { key: 'tldr', text: 'TL;DR' },
          { key: 'teaser', text: 'Teaser' },
          { key: 'headline', text: 'Headline' }
        ],
        selectedKey: this.properties.summarizerType ?? 'key-points'
      }),
      PropertyPaneDropdown('summarizerFormat', {
        label: 'Format',
        options: [
          { key: 'markdown', text: 'Markdown' },
          { key: 'plain-text', text: 'Plain Text' }
        ],
        selectedKey: this.properties.summarizerFormat ?? 'markdown'
      }),
      PropertyPaneDropdown('summarizerLength', {
        label: 'Length',
        options: [
          { key: 'short', text: 'Short' },
          { key: 'medium', text: 'Medium' },
          { key: 'long', text: 'Long' }
        ],
        selectedKey: this.properties.summarizerLength ?? 'medium'
      })
    ];

    // Only add sharedContext and context fields for supported languages
    if (isLanguageSupported) {
      summarizerFields.push(
        PropertyPaneTextField('sharedContext', {
          label: 'Shared Context',
          description: 'Additional context to help the summarizer understand the content.',
          multiline: true,
          rows: 3,
          value: this.properties.sharedContext ?? 'This is a SharePoint page with business content.'
        }),
        PropertyPaneTextField('context', {
          label: 'Context',
          description: 'Instruction describing what the content is and how it should be summarized.',
          multiline: true,
          rows: 3,
          placeholder: strings.SummarizerContext,
          value: this.properties.context
        })
      );
    }

    return {
      pages: [
        {
          header: {
            description: 'Configure summarization settings'
          },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneToggle('useStreaming', {
                  label: 'Use Streaming',
                  onText: 'On',
                  offText: 'Off',
                  checked: this.properties.useStreaming ?? true
                })
              ]
            },
            {
              groupName: 'Summarizer Options',
              groupFields: summarizerFields
            },
            {
              groupName: 'UI Labels (Optional - defaults to locale)',
              groupFields: [
                PropertyPaneTextField('summarizeButtonText', {
                  label: 'Summarize Button Text',
                  placeholder: strings.SummarizeButtonText
                }),
                PropertyPaneTextField('stopGeneratingText', {
                  label: 'Stop Generating Text',
                  placeholder: strings.StopGeneratingText
                }),
                PropertyPaneTextField('downloadingModelText', {
                  label: 'Downloading Model Text',
                  placeholder: strings.DownloadingModelText
                }),
                PropertyPaneTextField('summaryTitle', {
                  label: 'Summary Title',
                  placeholder: strings.SummaryTitle
                }),
                PropertyPaneTextField('hideText', {
                  label: 'Hide Text',
                  placeholder: strings.HideText
                }),
                PropertyPaneTextField('showSummaryText', {
                  label: 'Show Summary Text',
                  placeholder: strings.ShowSummaryText
                }),
                PropertyPaneTextField('regenerateSummaryText', {
                  label: 'Regenerate Summary Text',
                  placeholder: strings.RegenerateSummaryText
                }),
                PropertyPaneTextField('waitForEditorText', {
                  label: 'Wait For Editor Text',
                  placeholder: strings.WaitForEditorText
                }),
                PropertyPaneTextField('disclaimerText', {
                  label: 'Disclaimer Text',
                  multiline: true,
                  rows: 2,
                  placeholder: strings.DisclaimerText
                }),
                PropertyPaneTextField('apiNotSupportedWarning', {
                  label: 'API Not Supported Warning',
                  multiline: true,
                  rows: 2,
                  placeholder: strings.ApiNotSupportedWarning
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
