/*
Template concept from https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-search-refiners
*/
import * as React from                                     'react';
import * as ReactDom from                                  'react-dom';
import { Version, Text, Environment, EnvironmentType} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneField,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneChoiceGroup,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { update, isEmpty } from                            '@microsoft/sp-lodash-subset';

import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle } from                     '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import * as strings from                                   'RssReaderWebPartStrings';

import { RssReader, IRssReaderProps } from                 './components/RssReader';

import { RssHttpClientService } from                       '../../services/RssHttpClientService';
import {
  BaseTemplateService,
  TemplateService,
  MockTemplateService } from                               '../../services/TemplateService';
import { FeedLayoutOption, FeedServiceOption } from        '../../models';

export interface IRssReaderWebPartProps {
  title: string;

  //feed settings
  feedUrl: string;
  feedService: FeedServiceOption; //fetch, feed2json (service url) - not for production, rss2json (possible api key)
  feedServiceUrl: string; //used by feed2json - https://github.com/chilts/feed2json
  feedServiceApiKey: string; //used by rss2json

  disableCorsMode: boolean;
  useCorsProxy: boolean;
  corsProxyUrl: string; //possible dev testing suggestions: https://github.com/Rob--W/cors-anywhere/, https://cors.io/, https://corsproxy.github.io/, https://github.com/htmldriven/cors-proxy/

  maxCount: number;

  //caching / local storage
  cacheResults: boolean;
  cacheResultsMinutes: number;
  cacheStorageKeyPrefix: string;

  feedLoadingLabel: string;

  //rendering / layout
  selectedLayout: FeedLayoutOption;
  externalTemplateUrl: string;
  inlineTemplateText: string;

  //default layout settings
  feedViewAllLink: string;
  feedViewAllLinkLabel: string;
  showDesc: boolean;
  showPubDate: boolean;
  descCharacterLimit: number;
  titleLinkTarget: string;
  dateFormat: string;
  dateFormatLang: string;
  backgroundColor: string;
  fontColor: string;
}

export default class RssReaderWebPart extends BaseClientSideWebPart<IRssReaderWebPartProps> {
  private _templateService: BaseTemplateService;
  private _propertyPage = null;

  /**
   * The template to display at render time
   */
  private _templateContentToDisplay: string;

  public onInit(): Promise<void> {

    //Initialize a redux store that uses our custom Reducer & state
    RssHttpClientService.init(this.context);

    //set required properties to enforce certainer parameters
    this.initializeRequiredProperties();

    if (Environment.type === EnvironmentType.Local) {
      this._templateService = new MockTemplateService(this.context.pageContext.cultureInfo.currentUICultureName);
    }
    else {
      this._templateService = new TemplateService(this.context.spHttpClient, this.context.pageContext.cultureInfo.currentUICultureName);
    }

    return super.onInit().then();
  }

  public async render(): Promise<void> {
    // Determine the template content to display
    // In the case of an external template is selected, the render is done asynchronously waiting for the content to be fetched
    await this._getTemplateContent();

    const element: React.ReactElement<IRssReaderProps > = React.createElement(
      RssReader,
      {
        feedUrl: this.properties.feedUrl,
        feedService: this.properties.feedService,
        feedServiceUrl: this.properties.feedServiceUrl,
        feedServiceApiKey: this.properties.feedServiceApiKey,

        useCorsProxy: this.properties.useCorsProxy,
        corsProxyUrl: this.properties.corsProxyUrl,
        disableCorsMode: this.properties.disableCorsMode,

        maxCount: this.properties.maxCount,

        cacheResults: this.properties.cacheResults,
        cacheResultsMinutes: this.properties.cacheResultsMinutes,
        cacheStorageKeyPrefix: this.properties.cacheStorageKeyPrefix,

        feedLoadingLabel: this.properties.feedLoadingLabel,

        selectedLayout: this.properties.selectedLayout,
        externalTemplateUrl: this.properties.externalTemplateUrl,
        inlineTemplateText: this.properties.inlineTemplateText,

        feedViewAllLink: this.properties.feedViewAllLink,
        feedViewAllLinkLabel: this.properties.feedViewAllLinkLabel,

        showDesc: this.properties.showDesc,
        showPubDate: this.properties.showPubDate,
        descCharacterLimit: this.properties.descCharacterLimit,
        titleLinkTarget: this.properties.titleLinkTarget,
        dateFormat: this.properties.dateFormat,

        backgroundColor: this.properties.backgroundColor,
        fontColor: this.properties.fontColor,

        propertyPane: this.context.propertyPane,

        title: this.properties.title,
        displayMode: this.displayMode,

        templateService: this._templateService,
        templateContent: this._templateContentToDisplay,

        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //return false if property changes should occur upon change, not upon apply
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
              description: strings.FeedSettingsPageName
          },
          groups: [
            {
              groupName: strings.FeedSettingsGroupLabel,
              groupFields: this._getFeedSettingsFields()
            },
            {
              groupName: strings.CorsSettingsGroupLabel,
              isCollapsed: true,
              groupFields: this._getCorsSettingsFields()
            }
          ],
          displayGroupsAsAccordion: true
        },
        {
          header: {
              description: strings.LayoutSettingsPageName
          },
          groups: [
            {
              groupFields: this._getLayoutSettingsFields()
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string) {

    if (propertyPath === 'selectedLayout') {

      // Refresh setting the right template for the property pane
      await this._getTemplateContent();

    }

    // Detect if the layout has been changed to custom...
    if (propertyPath === 'inlineTemplateText') {

      // Automatically switch the option to 'Custom' if a default template has been edited
      // (meaning the user started from a the list or tiles template)
      if (this.properties.inlineTemplateText && this.properties.selectedLayout !== FeedLayoutOption.Custom) {

        this.properties.selectedLayout = FeedLayoutOption.Custom;

        // Reset also the template URL
        this.properties.externalTemplateUrl = '';
      }

    }
  }

  /**
   * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
   */
  private initializeRequiredProperties() {

    //require an initial feed service
    this.properties.feedService = this.properties.feedService ? this.properties.feedService : FeedServiceOption.Rss2Json;

    this.properties.useCorsProxy = this.properties.useCorsProxy ? true : false;
    this.properties.corsProxyUrl = this.properties.corsProxyUrl ? this.properties.corsProxyUrl : "";
    this.properties.disableCorsMode = this.properties.disableCorsMode ? true : false;

    this.properties.maxCount = this.properties.maxCount ? this.properties.maxCount : 10;

    this.properties.cacheResults = this.properties.cacheResults ? this.properties.cacheResults : false;
    this.properties.cacheResultsMinutes = this.properties.cacheResultsMinutes ? this.properties.cacheResultsMinutes : 60;

    // Set the default search results layout
    this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : FeedLayoutOption.Default;
  }

  /**
   * Custom handler when a custom property pane field is updated
   * @param propertyPath the name of the updated property
   * @param newValue the new value for this property
   */
  private async _onCustomPropertyPaneChange(propertyPath: string, newValue: any): Promise<void> {

    // Stores the new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });

    // Call the default SPFx handler
    this.onPropertyPaneFieldChanged(propertyPath);

    // Refresh setting the right template for the property pane
    await this._getTemplateContent();

    // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
    // https://github.com/SharePoint/sp-dev-docs/issues/594
    if (!this.disableReactivePropertyChanges) {
        // The render has to be completed before the property pane to refresh to set up the correct property value
        // so the property pane field will use the correct value for future edit
        this.render();
        this.context.propertyPane.refresh();
    }

  }

  //concept from https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-search-refiners
  protected async loadPropertyPaneResources(): Promise<void> {
    this._propertyPage = await import(
        /* webpackChunkName: 'search-property-pane' */
        '../../controls/PropertyPaneTextDialog/PropertyPaneTextDialog'
    );
  }

  /**
   * Step 1: Set general feed properties including feed location, method to retrieve feed, and caching (local storage)
   */
  private _getFeedSettingsFields(): IPropertyPaneField<any>[] {
    // Options for the feed service options
    const feedServiceOptions = [
      {
          text: strings.DefaultFeedServiceOption,
          key: FeedServiceOption.Default,
          checked: this.properties.feedService === FeedServiceOption.Default || !this.properties.feedService
      },
      {
          text: strings.Feed2JsonFeedServiceOption,
          key: FeedServiceOption.Feed2Json,
          checked: this.properties.feedService === FeedServiceOption.Feed2Json
      },
      {
          text: strings.Rss2JsonFeedServiceOption,
          key: FeedServiceOption.Rss2Json,
          checked: this.properties.feedService === FeedServiceOption.Rss2Json
      }
    ] as IPropertyPaneChoiceGroupOption[];


    // Sets up styling fields
    let feedFields: IPropertyPaneField<any>[] = [
      PropertyPaneTextField('feedUrl', {
        label: strings.FeedUrlLabel
      }),
      PropertyPaneChoiceGroup('feedService', {
        label: strings.FeedServiceLabel,
        options: feedServiceOptions
      })
    ];

    if (this.properties.feedService == FeedServiceOption.Feed2Json) {
      feedFields.push(PropertyPaneTextField('feedServiceUrl', {
        label: strings.FeedServiceUrlLabel,
        description: strings.FeedServiceUrlDescription
      }));
    }

    if (this.properties.feedService == FeedServiceOption.Rss2Json) {
      feedFields.push(PropertyPaneTextField('feedServiceApiKey', {
        label: strings.FeedServiceApiKeyLabel,
        description: strings.FeedServiceApiKeyDescription
      }));
    }

    feedFields.push(PropertyPaneHorizontalRule());

    feedFields.push(PropertyPaneSlider('maxCount', {
      label: strings.MaxCountLabel,
      min: 1,
      max: 100,
      step: 1
    }));

    feedFields.push(PropertyPaneHorizontalRule());

    feedFields.push(PropertyPaneToggle('cacheResults', {
      label: strings.CacheResultsLabel,
      checked: this.properties.cacheResults,
    }));

    // if we want to include a search box, more parameters required
    if (this.properties.cacheResults) {
      feedFields.push(PropertyPaneSlider('cacheResultsMinutes', {
        label: strings.CacheResultsMinutesLabel,
        max: 1440,
        min: 5,
        showValue: true,
        step: 5,
        value: this.properties.cacheResultsMinutes,
      }));

      feedFields.push(PropertyPaneTextField('cacheStorageKeyPrefix', {
        label: strings.CacheStorageKeyPrefixLabel,
        description: strings.CacheStorageKeyPrefixDescription
      }));
    }

    feedFields.push(PropertyPaneHorizontalRule());

    feedFields.push(PropertyPaneTextField('feedLoadingLabel', {
      label: strings.FeedLoadingLabel,
      placeholder: strings.DefaultFeedLoadingLabel
    }));

    return feedFields;
  }

  /**
   * Step 1B: Set feed cors settings
   */
  private _getCorsSettingsFields(): IPropertyPaneField<any>[] {
    // Sets up styling fields
    let feedFields: IPropertyPaneField<any>[] = [
      PropertyPaneToggle('useCorsProxy', {
        label: strings.UseCorsProxyLabel,
        checked: this.properties.useCorsProxy,
      })
    ];

    if (this.properties.useCorsProxy) {
      feedFields.push(PropertyPaneTextField('corsProxyUrl', {
        label: strings.CorsProxyUrlLabel,
        description: strings.CorsProxyUrlDescription
      }));
    }
    else {
      feedFields.push(PropertyPaneToggle('disableCorsMode', {
        label: strings.DisableCorsModeLabel,
        checked: this.properties.disableCorsMode,
      }));
      feedFields.push(PropertyPaneLabel('disableCorsMode', {
        text: this.properties.disableCorsMode ? strings.DisableCorsModeSelectedDescription : strings.DisableCorsModeDescription
      }));
    }

    return feedFields;
  }

  /**
   * Step 2: Set feed layout settings
   */
  private _getLayoutSettingsFields(): IPropertyPaneField<any>[] {
    // Options for the search results layout
    const layoutOptions = [
      {
          iconProps: {
              officeFabricIconFontName: 'List'
          },
          text: strings.DefaultFeedLayoutOption,
          key: FeedLayoutOption.Default,
          checked: this.properties.selectedLayout === FeedLayoutOption.Default
      },
      {
          iconProps: {
              officeFabricIconFontName: 'Code'
          },
          text: strings.CustomFeedLayoutOption,
          key: FeedLayoutOption.Custom,
          checked: this.properties.selectedLayout === FeedLayoutOption.Custom
      }
    ] as IPropertyPaneChoiceGroupOption[];

    const canEditTemplate = this.properties.externalTemplateUrl && this.properties.selectedLayout === FeedLayoutOption.Custom ? false : true;

    // Sets up styling fields
    let layoutFields: IPropertyPaneField<any>[] = [
      PropertyPaneChoiceGroup('selectedLayout', {
        label: strings.SelectedLayoutLabel,
        options: layoutOptions
      })
    ];

    if (this.properties.selectedLayout === FeedLayoutOption.Custom) {
      layoutFields.push(
        new this._propertyPage.PropertyPaneTextDialog('inlineTemplateText', {
          dialogTextFieldValue: this._templateContentToDisplay,
          onPropertyChange: this._onCustomPropertyPaneChange.bind(this),
          disabled: !canEditTemplate,
          strings: {
              cancelButtonText: strings.CancelButtonText,
              dialogButtonLabel: strings.DialogButtonLabel,
              dialogButtonText: strings.DialogButtonText,
              dialogTitle: strings.DialogTitle,
              saveButtonText: strings.SaveButtonText
          }
        })
      );

      layoutFields.push(PropertyPaneTextField('externalTemplateUrl', {
        label: strings.TemplateUrlLabel,
        placeholder: strings.TemplateUrlPlaceholder,
        deferredValidationTime: 500,
        onGetErrorMessage: this._onTemplateUrlChange.bind(this)
      }));
    }


    //default layout
    if (this.properties.selectedLayout === FeedLayoutOption.Default) {
      layoutFields.push(PropertyPaneHorizontalRule());

      layoutFields.push(PropertyPaneTextField('feedViewAllLink', {
        label: strings.FeedViewAllLinkLabel,
        placeholder: strings.FeedViewAllLinkPlaceholder
      }));

      layoutFields.push(PropertyPaneTextField('feedViewAllLinkLabel', {
        label: strings.FeedViewAllLinkLabelLabel,
        placeholder: strings.DefaultFeedViewAllLinkLabel
      }));


      layoutFields.push(PropertyPaneToggle('showPubDate', {
        label: strings.ShowPubDateLabel
      }));
      layoutFields.push(PropertyPaneToggle('showDesc', {
        label: strings.ShowDescLabel
      }));
      layoutFields.push(PropertyPaneSlider('descCharacterLimit', {
        label: strings.DescCharacterLimitLabel,
        min: 1,
        max: 500,
        step: 1
      }));
      layoutFields.push(PropertyPaneTextField('titleLinkTarget', {
        label: strings.TitleLinkTargetLabel
      }));
      layoutFields.push(PropertyPaneTextField('dateFormat', {
        label: strings.DateFormatLabel
      }));

      layoutFields.push(PropertyPaneHorizontalRule());

      layoutFields.push(PropertyFieldColorPicker('fontColor', {
        label: strings.FontColorLabel,
        selectedColor: this.properties.fontColor,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Full,
        iconName: 'Precipitation',
        key: 'rssReaderFontColorField'
      }));
      layoutFields.push(PropertyFieldColorPicker('backgroundColor', {
        label: strings.BackgroundColorLabel,
        selectedColor: this.properties.backgroundColor,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        alphaSliderHidden: false,
        style: PropertyFieldColorPickerStyle.Full,
        iconName: 'Precipitation',
        key: 'rssReaderBgColorField'
      }));

      /*
      dateFormatLang: string;
      */
    }

    return layoutFields;
  }



  /**
   * Custom handler when the external template file URL
   * from https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-search-refiners
   * @param value the template file URL value
   */
  private async _onTemplateUrlChange(value: string): Promise<String> {

    try {

      if (isEmpty(value)) {

        // Doesn't raise any error if file is empty (otherwise error message will show on initial load...)
        return '';

      }
      else if (!TemplateService.isValidTemplateFile(value)) {

        // Resolves an error if the file isn't a valid .htm or .html file
        return strings.ErrorTemplateExtension;

      }
      else {

        console.log("attempt to resolve");
        // Resolves an error if the file doesn't answer a simple head request
        await this._templateService.ensureFileResolves(value);
        return '';

      }
    }
    catch (error) {
      return Text.format(strings.ErrorTemplateResolve, error);
    }
  }

  /**
   * Get the correct results template content according to the property pane current configuration
   * @returns the template content as a string
   */
  private async _getTemplateContent(): Promise<void> {

    let templateContent = null;

    switch (this.properties.selectedLayout) {
      case FeedLayoutOption.Default:

        templateContent = TemplateService.getListDefaultTemplate();
        break;

      case FeedLayoutOption.Custom:

        if (this.properties.externalTemplateUrl) {
            templateContent = await this._templateService.getFileContent(this.properties.externalTemplateUrl);
        } else {
            templateContent = this.properties.inlineTemplateText ? this.properties.inlineTemplateText : TemplateService.getBlankDefaultTemplate();
        }

        break;

      default:

        break;
    }

    this._templateContentToDisplay = templateContent;
  }
}
