import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup,
  type IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import * as spPropertyPane from '@microsoft/sp-property-pane';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropertyPaneCustomField: any = (spPropertyPane as any)['PropertyPaneCustomField'];
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'LegalLensWebPartStrings';
import LegalLens from './components/LegalLens';
import { ILegalLensProps } from './components/ILegalLensProps';
import { SharePointService } from './services/SharePointService';
import { AzureAIFoundryService } from './services/AzureAIFoundryService';
import { ILang, LANGS } from './constants/languages';
import { LanguagesPropertyPaneField } from './components/PropertyPane/LanguagesField/LanguagesPropertyPaneField';

export interface ILegalLensWebPartProps {
  description: string;
  contractLibraryUrl: string;
  aiFoundryEndpoint: string;
  aiFoundryApiKey: string;
  aiFoundryDeployment: string;
  documentIntelligenceEndpoint: string;
  documentIntelligenceKey: string;
  enableDocumentAnalysis: boolean;
  translationLanguages: ILang[];
  showTranslateTab: boolean;
  showESignatureTab: boolean;
  colorScheme: 'dark' | 'light' | 'site';
}

export default class LegalLensWebPart extends BaseClientSideWebPart<ILegalLensWebPartProps> {
  private sharePointService: SharePointService;
  private aiFoundryService: AzureAIFoundryService;
  private _libraryOptions: IPropertyPaneDropdownOption[] = [];
  private _themeProvider: ThemeProvider;

  private get effectiveLangs(): ILang[] {
    return this.properties.translationLanguages || LANGS;
  }

  protected onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeProvider.themeChangedEvent.add(this, this._onThemeChanged);
    this._applySiteThemeVars(this._themeProvider.tryGetTheme());

    return super.onInit().then(async () => {
      const diEndpoint = this.properties.enableDocumentAnalysis
        ? (this.properties.documentIntelligenceEndpoint || '') : '';
      const diKey = this.properties.enableDocumentAnalysis
        ? (this.properties.documentIntelligenceKey || '') : '';

      const libraryUrl = this.properties.contractLibraryUrl || 'Contracts';
      this.sharePointService = new SharePointService(
        this.context, libraryUrl, diEndpoint, diKey
      );

      this.aiFoundryService = new AzureAIFoundryService(
        this.properties.aiFoundryEndpoint || '',
        this.properties.aiFoundryApiKey || '',
        this.properties.aiFoundryDeployment || 'gpt-4o',
        diEndpoint,
        diKey
      );

      await this._loadSiteLibraries();

      console.log('[WebPart] Services initialized');
      console.log('[WebPart] Document Intelligence:', diEndpoint ? 'Enabled ✓' : 'Disabled - toggle ON in web part settings');
    });
  }

  private async _loadSiteLibraries(): Promise<void> {
    try {
      const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101 and Hidden eq false&$select=Title&$orderby=Title`;
      const response = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      const data = await response.json();
      this._libraryOptions = (data.value || []).map((l: { Title: string }) => ({
        key: l.Title,
        text: l.Title,
      }));
    } catch (e) {
      console.warn('[WebPart] Could not load site libraries:', e);
      this._libraryOptions = [];
    }
  }

  public render(): void {
    const element: React.ReactElement<ILegalLensProps> = React.createElement(
      LegalLens,
      {
        description: this.properties.description,
        sharePointService: this.sharePointService,
        aiFoundryService: this.aiFoundryService,
        langs: this.effectiveLangs,
        isDarkTheme: this.context.sdks?.microsoftTeams?.context?.theme === 'dark',
        environmentMessage: this._getEnvironmentMessage(),
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        userEmail: this.context.pageContext.user.email,
        context: this.context,
        documentIntelligenceEndpoint: this.properties.enableDocumentAnalysis
          ? (this.properties.documentIntelligenceEndpoint || '') : '',
        documentIntelligenceKey: this.properties.enableDocumentAnalysis
          ? (this.properties.documentIntelligenceKey || '') : '',
        showTranslateTab: !!this.properties.showTranslateTab,
        showESignatureTab: !!this.properties.showESignatureTab,
        colorScheme: this.properties.colorScheme || 'dark'
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _onThemeChanged(args: ThemeChangedEventArgs): void {
    this._applySiteThemeVars(args.theme);
    this.render();
  }

  private _applySiteThemeVars(theme: IReadonlyTheme | undefined): void {
    const el = this.domElement;
    if (!theme?.palette) return;
    const { palette } = theme;
    el.style.setProperty('--themePrimary', palette.themePrimary);
    el.style.setProperty('--themeSecondary', palette.themeSecondary);
    el.style.setProperty('--themeDarker', palette.themeDarker);
    el.style.setProperty('--neutralPrimary', palette.neutralPrimary);
    el.style.setProperty('--neutralLight', palette.neutralLight);
    el.style.setProperty('--neutralLighter', palette.neutralLighter);
    el.style.setProperty('--neutralLighterAlt', palette.neutralLighterAlt);
    el.style.setProperty('--neutralSecondary', palette.neutralSecondary);
    el.style.setProperty('--neutralTertiary', palette.neutralTertiary);
    el.style.setProperty('--white', palette.white);
    el.style.setProperty('--black', palette.black);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) {
      return strings.AppTeamsTabEnvironment;
    }
    return strings.AppSharePointEnvironment;
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, _oldValue: string, newValue: string): void {
    if (propertyPath === 'contractLibraryUrl') {
      const diEndpoint = this.properties.enableDocumentAnalysis ? (this.properties.documentIntelligenceEndpoint || '') : '';
      const diKey = this.properties.enableDocumentAnalysis ? (this.properties.documentIntelligenceKey || '') : '';
      this.sharePointService = new SharePointService(this.context, newValue, diEndpoint, diKey);
      this.render();
    }
  }

  protected onDispose(): void {
    this._themeProvider.themeChangedEvent.remove(this, this._onThemeChanged);
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
              groupName: 'SharePoint Configuration',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyPaneDropdown('contractLibraryUrl', {
                  label: strings.ContractLibraryUrlFieldLabel,
                  options: this._libraryOptions,
                  disabled: this._libraryOptions.length === 0
                })
              ]
            },
            {
              groupName: 'Azure AI Foundry Configuration',
              groupFields: [
                PropertyPaneTextField('aiFoundryEndpoint', {
                  label: strings.AIFoundryEndpointFieldLabel,
                  description: 'Azure AI Foundry project endpoint (e.g., https://your-project.openai.azure.com)',
                  multiline: false
                }),
                PropertyPaneTextField('aiFoundryApiKey', {
                  label: strings.AIFoundryApiKeyFieldLabel,
                  description: 'Azure AI Foundry API key',
                  multiline: false
                }),
                PropertyPaneTextField('aiFoundryDeployment', {
                  label: strings.AIFoundryDeploymentFieldLabel,
                  description: 'Model deployment name (e.g., gpt-4, gpt-35-turbo)',
                  multiline: false
                })
              ]
            },
            {
              groupName: 'Document Intelligence (Optional)',
              groupFields: [
                PropertyPaneToggle('enableDocumentAnalysis', {
                  label: 'Enable Document Analysis',
                  onText: 'Enabled',
                  offText: 'Disabled'
                }),
                PropertyPaneTextField('documentIntelligenceEndpoint', {
                  label: strings.DocumentIntelligenceEndpointFieldLabel,
                  description: 'Document Intelligence endpoint (e.g., https://your-di.cognitiveservices.azure.com)',
                  multiline: false,
                  disabled: !this.properties.enableDocumentAnalysis
                }),
                PropertyPaneTextField('documentIntelligenceKey', {
                  label: strings.DocumentIntelligenceKeyFieldLabel,
                  description: 'Document Intelligence API key',
                  multiline: false,
                  disabled: !this.properties.enableDocumentAnalysis
                })
              ]
            },
            {
              groupName: 'Tabs & Theme',
              groupFields: [
                PropertyPaneToggle('showTranslateTab', {
                  label: 'Show Translate tab',
                  onText: 'Visible',
                  offText: 'Hidden'
                }),
                PropertyPaneToggle('showESignatureTab', {
                  label: 'Show E-Signature tab',
                  onText: 'Visible',
                  offText: 'Hidden'
                }),
                PropertyPaneChoiceGroup('colorScheme', {
                  label: 'Color Scheme',
                  options: [
                    { key: 'dark', text: 'Dark', iconProps: { officeFabricIconFontName: 'ClearNight' } },
                    { key: 'light', text: 'Light', iconProps: { officeFabricIconFontName: 'Sunny' } },
                    { key: 'site', text: 'Site Theme', iconProps: { officeFabricIconFontName: 'Color' } }
                  ]
                })
              ]
            },
            {
              groupName: 'Translation Languages',
              groupFields: [
                PropertyPaneCustomField({
                  key: 'translationLanguages',
                  onRender: (elem: HTMLElement) => {
                    ReactDom.render(
                      React.createElement(LanguagesPropertyPaneField, {
                        langs: this.effectiveLangs,
                        onChange: (newLangs: ILang[]) => {
                          this.properties.translationLanguages = newLangs;
                          this.render();
                        }
                      }),
                      elem
                    );
                  },
                  onDispose: (elem: HTMLElement) => {
                    ReactDom.unmountComponentAtNode(elem);
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
