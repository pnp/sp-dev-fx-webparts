import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, Text, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneLabel,
  IWebPartPropertiesMetadata,
  PropertyPaneHorizontalRule,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth
} from '@microsoft/sp-webpart-base';
import * as strings from 'SearchBoxWebPartStrings';
import ISearchBoxWebPartProps from './ISearchBoxWebPartProps';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import ISearchQuery from '../../models/ISearchQuery';
import { ISearchBoxContainerProps } from './components/ISearchBoxContainerProps';
import ServiceHelper from '../../helpers/ServiceHelper';
import ISearchService from '../../services/SearchService/ISearchService';
import INlpService from '../../services/NlpService/INlpService';
import MockSearchService from '../../services/SearchService/MockSearchService';
import SearchService from '../../services/SearchService/SearchService';
import MockNlpService from '../../services/NlpService/MockNlpService';
import NlpService from '../../services/NlpService/NlpService';
import { PageOpenBehavior } from '../../helpers/UrlHelper';
import SearchBoxContainer from './components/SearchBoxContainer';

export default class SearchBoxWebPart extends BaseClientSideWebPart<ISearchBoxWebPartProps> implements IDynamicDataCallables {

  private _searchQuery: ISearchQuery;
  private _searchService: ISearchService;
  private _serviceHelper: ServiceHelper;
  private _nlpService: INlpService;

  constructor() {
    super();

    // Initialize default values for search query
    this._searchQuery = {
      rawInputValue: '',
      enhancedQuery: ''
    };

    this._bindHashChange = this._bindHashChange.bind(this);
  }

  public render(): void {

    let inputValue = this.properties.defaultQueryKeywords.tryGetValue();

    if (inputValue && typeof(inputValue) === 'string') {
      
      // Notify subsscriber a new value if available
      this.context.dynamicDataSourceManager.notifyPropertyChanged('searchQuery');
      this._searchQuery.rawInputValue = inputValue;
    }
    
    const element: React.ReactElement<ISearchBoxContainerProps> = React.createElement(
      SearchBoxContainer, { 
        onSearch: this._onSearch,
        searchInNewPage: this.properties.searchInNewPage,
        pageUrl: this.properties.pageUrl,
        openBehavior: this.properties.openBehavior,
        inputValue: this._searchQuery.rawInputValue,
        enableQuerySuggestions: this.properties.enableQuerySuggestions,
        searchService: this._searchService,
        enableDebugMode: this.properties.enableDebugMode,
        enableNlpService: this.properties.enableNlpService,
        isStaging: this.properties.isStaging,
        NlpService: this._nlpService,
        domElement: this.domElement
      } as ISearchBoxContainerProps);

    ReactDom.render(element, this.domElement);
  }

  /**
   * Return list of dynamic data properties that this dynamic data source
   * returns
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
          id: 'searchQuery',
          title: strings.DynamicData.SearchQueryPropertyLabel
      },
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): any {

    switch (propertyId) {
      case 'searchQuery':

          let property = {
            [strings.DynamicData.RawInputValuePropertyLabel]: this._searchQuery.rawInputValue
          };

          if (this.properties.enableNlpService && this.properties.NlpServiceUrl) {
            property[strings.DynamicData.EnhancedQueryPropertyLabel] = this._searchQuery.enhancedQuery;
          }

          return property;

      default:
          throw new Error('Bad property id');
    }
  }

  protected onInit(): Promise<void> {

    this._serviceHelper = new ServiceHelper(this.context.httpClient);
    this.context.dynamicDataSourceManager.initializeSource(this);
    
    this.initSearchService();
    this.initNlpService();

    this._bindHashChange();

    return Promise.resolve();
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
          groups: [
            {
              groupName: strings.SearchBoxQuerySettings,
              groupFields: this._getSearchQueryFields()
            },
            {
              groupName: strings.SearchBoxNewPage,
              groupFields: this._getSearchBehaviorOptionsFields()
            },
            {
                groupName: strings.SearchBoxQueryNlpSettings,
                groupFields: this._getSearchQueryOptimizationFields()
            },
          ],
          displayGroupsAsAccordion: true
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string) {
    this.initSearchService();
    this.initNlpService();

    if (!this.properties.useDynamicDataSource) {
      this.properties.defaultQueryKeywords.setValue("");
    } else {
        this._bindHashChange();
    }

    if (propertyPath === 'enableNlpService') {
      this.properties.enableDebugMode = !this.properties.enableDebugMode ? false : true;
    }
  }

  /**
   * Handler used to notify data source subscribers when the input query is updated
   */
  private _onSearch = (searchQuery: ISearchQuery): void => {

    this._searchQuery = searchQuery;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('searchQuery');
  }

  /**
   * Verifies if the string is a correct URL
   * @param value the URL to verify
   */
  private _validatePageUrl(value: string) {    
    
    if ((!/^(https?):\/\/[^\s/$.?#].[^\s]*/.test(value) || !value) && this.properties.searchInNewPage) {
      return strings.SearchBoxUrlErrorMessage;
    }
    
    return '';
  }

  /**
   * Ensures the service URL is valid 
   * @param value the service URL
   */
  private async _validateServiceUrl(value: string) {

    if ((!/^(https?):\/\/[^\s/$.?#].[^\s]*/.test(value) || !value)) {
      return strings.SearchBoxUrlErrorMessage;
    } else {
      if (Environment.type !== EnvironmentType.Local) {
        try {
          await this._serviceHelper.ensureUrlResovles(value);
          return '';
        } catch (errorMessage) {
            return Text.format(strings.UrlNotResolvedErrorMessage, value, errorMessage);
        }
      } else {
        return '';
      }
    }
  }

  /**
   * Initializes the query suggestions data provider instance according to the current environnement
   */
  private initSearchService() {
      
      if (this.properties.enableQuerySuggestions) {
        if (Environment.type === EnvironmentType.Local ) {
          this._searchService = new MockSearchService();
        } else {
          this._searchService = new SearchService(this.context);        
        return "";
      }
    }
  }

  /**
   * Initializes the query optimization data provider instance according to the current environment
   */
  private initNlpService() {

    if (this.properties.enableNlpService && this.properties.NlpServiceUrl) {
        if (Environment.type === EnvironmentType.Local) {
            this._nlpService = new MockNlpService();
            this.properties.NlpServiceUrl = 'https://localhost:7071/api/example';
        } else {
            this._nlpService = new NlpService(this.context, this.properties.NlpServiceUrl);
        }
    }
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'defaultQueryKeywords': {
        dynamicPropertyType: 'string'
      }
    };
  }

    /**
   * Determines the group fields for the search query options inside the property pane
   */
  private _getSearchQueryFields(): IPropertyPaneField<any>[] {
      
    // Sets up search query fields
    let searchQueryConfigFields: IPropertyPaneField<any>[] = [
        PropertyPaneCheckbox('useDynamicDataSource', {
            checked: false,
            text: strings.DynamicData.UseDynamicDataSourceLabel,
        })
    ];

    if (this.properties.useDynamicDataSource) {
      searchQueryConfigFields.push(
        PropertyPaneDynamicFieldSet({
          label: strings.DynamicData.DefaultQueryKeywordsPropertyLabel,
          fields: [
            PropertyPaneDynamicField('defaultQueryKeywords', {
              label: strings.DynamicData.DefaultQueryKeywordsPropertyLabel,
            })
          ],          
          sharedConfiguration: {
            depth: DynamicDataSharedDepth.Source,
          }
        })
      );
    }

    return searchQueryConfigFields;
}

  /**
   * Determines the group fields for the search options inside the property pane
   */
  private _getSearchBehaviorOptionsFields(): IPropertyPaneField<any>[] {

    let searchBehaviorOptionsFields: IPropertyPaneField<any>[]  = [
      PropertyPaneToggle("enableQuerySuggestions", {
        checked: false,
        label: strings.SearchBoxEnableQuerySuggestions
      }),
      PropertyPaneHorizontalRule(),
      PropertyPaneCheckbox('searchInNewPage', {
        text: strings.SearchBoxSearchInNewPageLabel
      })
    ];

    if (this.properties.searchInNewPage) {
      searchBehaviorOptionsFields = searchBehaviorOptionsFields.concat([
        PropertyPaneTextField('pageUrl', {
          disabled: !this.properties.searchInNewPage,
          label: strings.SearchBoxPageUrlLabel,
          onGetErrorMessage: this._validatePageUrl.bind(this)
        }),
        PropertyPaneDropdown('openBehavior', {
          label:  strings.SearchBoxPageOpenBehaviorLabel,
          options: [
            { key: PageOpenBehavior.Self, text: strings.SearchBoxSameTabOpenBehavior, index: 0 },
            { key: PageOpenBehavior.NewTab, text: strings.SearchBoxNewTabOpenBehavior, index: 1 }
          ],
          disabled:  !this.properties.searchInNewPage,
          selectedKey: 0
        })
      ]);
    }

    return searchBehaviorOptionsFields;
  }

  /**
   * Determines the group fields for the search query optimization inside the property pane
   */
  private _getSearchQueryOptimizationFields(): IPropertyPaneField<any>[] {

      let searchQueryOptimizationFields: IPropertyPaneField<any>[] = [
          PropertyPaneLabel("", {
              text: strings.SearchBoxQueryNlpSettingsDescription
          }),
          PropertyPaneToggle("enableNlpService", {
              checked: false,
              label: strings.SearchBoxUserQueryNlpLabel,
          })
      ];

      if (this.properties.enableNlpService) {

          searchQueryOptimizationFields.push(
              PropertyPaneTextField("NlpServiceUrl", {
                  label: strings.SearchBoxServiceUrlLabel,
                  disabled: !this.properties.enableNlpService,
                  onGetErrorMessage: this._validateServiceUrl.bind(this),
                  description: Text.format(strings.SearchBoxServiceUrlDescription, window.location.host)
              }),
              PropertyPaneToggle("enableDebugMode", {
                  checked: false,
                  label: strings.SearchBoxUseDebugModeLabel,
                  disabled: !this.properties.enableNlpService,
              }),
              PropertyPaneToggle("isStaging", {
                checked: true,
                label: strings.SearchBoxUseStagingEndpoint,
                disabled: !this.properties.enableNlpService,
            }),
          );
      } else {
          this.properties.enableDebugMode = false;
      }

      return searchQueryOptimizationFields;
  }

  /**
   * Subscribes to URL hash change if the dynamic property is set to the default 'URL Fragment' property
   */
  private _bindHashChange() {

    if (this.properties.defaultQueryKeywords.tryGetSource()) {
        if (this.properties.defaultQueryKeywords.reference.localeCompare('PageContext:UrlData:fragment') === 0) {
            // Manually subscribe to hash change since the default property doesn't
            window.addEventListener('hashchange', this.render);
        } else {
            window.removeEventListener('hashchange', this.render); 
        }
    }
  }
}
