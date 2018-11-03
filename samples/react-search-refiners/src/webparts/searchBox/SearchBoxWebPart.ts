import * as React from                                                                                                 'react';
import * as ReactDom from                                                                                              'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  IPropertyPaneField,
  IPropertyPaneDropdownOption,
  PropertyPaneToggle,
} from                                                                                                                 '@microsoft/sp-webpart-base';
import * as strings from                                                                                               'SearchBoxWebPartStrings';
import SearchBox from                                                                                                  './components/SearchBoxContainer';
import { ISearchBoxContainerProps } from                                                                               './components/ISearchBoxContainerProps';
import { PageOpenBehavior } from                                                                                       '../../helpers/UrlHelper';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataSource } from                              '@microsoft/sp-dynamic-data';
import ISearchBoxWebPartProps from                                                                                     './ISearchBoxWebPartProps';
import { Log, Text, Environment, EnvironmentType } from                                                                '@microsoft/sp-core-library';
import ISearchService from                                                                                             '../../services/SearchService/ISearchService';
import MockSearchService from                                                                                          '../../services/SearchService/MockSearchService';
import SearchService from                                                                                              '../../services/SearchService/SearchService';
import DynamicDataHelper from '../../helpers/DynamicDataHelper';

const LOG_SOURCE: string = '[SearchBoxWebPart_{0}]';

export default class SearchBoxWebPart extends BaseClientSideWebPart<ISearchBoxWebPartProps> implements IDynamicDataCallables {
  private _searchService: ISearchService;
  private _searchQuery: string;
  private _source: IDynamicDataSource;
  private _dynamicDataHelper: DynamicDataHelper;

  /**
   * Used to be able to unregister dynamic data events if the source is updated
   */
  private _lastSourceId: string = undefined;
  private _lastPropertyId: string = undefined;
  
  constructor() {
    super();
    this._searchQuery = '';
  }

  /**
   * Handler used to notify data source subscribers when the input query is updated
   */
  private _onSearch = (query: string): void => {
    this._searchQuery = query;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('inputQuery');
  }

  /**
   * Binds data source properties to the Web Part properties. In some cases, the data source configuration is not retrieved propertly due to updated ids 
   */
  private _bindDataSources() {

    const sourceFound = this._source ? true : false;

    if (this.properties.sourceInstance.sourceId && this.properties.sourceInstance.propertyId && !sourceFound) {

        let sourceId = undefined;
        this._source = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceInstance.sourceId);
        
        if (this._source ) {
            sourceId = this._source .id;
        } else {
            this._source = this._dynamicDataHelper._tryGetSourceByInstanceOrComponentId(this.properties.sourceInstance);
            sourceId = this._source ? this._source.id : undefined;
        }

        if (sourceId) {
            this.context.dynamicDataProvider.registerPropertyChanged(sourceId, this.properties.sourceInstance.propertyId, this.render);

            // Update the property for the property pane
            this.properties.sourceInstance.sourceId = sourceId;
            this._lastSourceId = sourceId;
            this._lastPropertyId = this.properties.sourceInstance.propertyId;

            // If false, means the onInit method is not completed yet so we let it render the web part through the normal process
            if (this.renderedOnce) {
                this.render();
            }
        }
    }
  }

  /**
   * Determines the group fields for the search query options inside the property pane
   */
  private _getSearchQueryFields(): IPropertyPaneField<any>[] {
      
      // Sets up search query fields
      let searchQueryConfigFields: IPropertyPaneField<any>[] = [
          PropertyPaneCheckbox('useDynamicDataSource', {
              checked: false,
              text: strings.UseDynamicDataSourceLabel,
          })
      ];

      if (this.properties.useDynamicDataSource) {
          const sourceOptions: IPropertyPaneDropdownOption[] =
          this.context.dynamicDataProvider.getAvailableSources().map(source => {
              return {
                  key: source.id,
                  text: source.metadata.title,
                  instanceId: source.metadata.instanceId,
                  componentId: source.metadata.componentId                        
              };
          }).filter((item) => {
              // We don't allow as data source:
              // - The component itself
              // - Components of the same type 
              if (item.instanceId !== this.instanceId && this.componentId !== item.componentId) {
                  return item;
              }
          });
    
          const selectedSource: string = this.properties.sourceInstance.sourceId;
          let propertyOptions: IPropertyPaneDropdownOption[] = [];
          
          if (selectedSource) {
              const source: IDynamicDataSource = this.context.dynamicDataProvider.tryGetSource(selectedSource);
              if (source) {
                  propertyOptions = source.getPropertyDefinitions().map(prop => {
                      return {
                          key: prop.id,
                          text: prop.title
                      };
                  });
              }
          }

          searchQueryConfigFields = searchQueryConfigFields.concat([
              PropertyPaneDropdown('sourceInstance.sourceId', {
                  label: strings.DynamicDataSourceLabel,
                  options: sourceOptions,
                  selectedKey: this.properties.sourceInstance.sourceId,
              }),
              PropertyPaneDropdown('sourceInstance.propertyId', {
                  disabled: !this.properties.sourceInstance.sourceId,
                  label: strings.DynamicDataSourcePropertyLabel,
                  options: propertyOptions,
                  selectedKey: this.properties.sourceInstance.propertyId
              })
          ]);
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
      PropertyPaneCheckbox('searchInNewPage', {
        text: strings.SearchBoxSearchInNewPageLabel
      })
    ];

    if (this.properties.searchInNewPage) {
      searchBehaviorOptionsFields = searchBehaviorOptionsFields.concat([
        PropertyPaneTextField('pageUrl', {
          disabled: !this.properties.searchInNewPage,
          label: strings.SearchBoxPageUrlLabel,
          onGetErrorMessage: this._validateUrl.bind(this)
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
   * Verifies if the string is a correct URL
   * @param value the URL to verify
   */
  private _validateUrl(value: string) {    
    
      if ((!/^(https?):\/\/[^\s/$.?#].[^\s]*/.test(value) || !value) && this.properties.searchInNewPage) {
        return strings.SearchBoxUrlErrorMessage;
      }
      
      return '';
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
   * Make sure the data source will be plugged in correctly when refreshing the whole page
   * In the cas of extension, the source id changes every time so we need to set the correct suorce Id to corresponding property to get the value at render time
   */
  private _reconnectDataSource() {
    if (this.properties.sourceInstance.sourceId && this.properties.sourceInstance.propertyId) {
        this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._bindDataSources.bind(this));
    }
  }

  protected onInit(): Promise<void> {

    this._source = undefined;

    if(!this.properties.sourceInstance) {
        this.properties.sourceInstance = {
            componentId: null,
            instanceId: null,
            propertyId: null,
            sourceId: null
        };
    }

    this.initSearchService();

    this.context.dynamicDataSourceManager.initializeSource(this);

    // Re bind data sources to WebPart properties
    this._reconnectDataSource();

    return Promise.resolve();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string) {

    this.initSearchService();
    
    if (propertyPath === 'sourceInstance.sourceId') {

        // Select the first property by default
        this.properties.sourceInstance.propertyId =
          this.context.dynamicDataProvider.tryGetSource(this.properties.sourceInstance.sourceId).getPropertyDefinitions()[0].id;
    }

    if (this.properties.sourceInstance.sourceId && this.properties.sourceInstance.propertyId) {
        this.context.dynamicDataProvider.registerPropertyChanged(this.properties.sourceInstance.sourceId, this.properties.sourceInstance.propertyId, this.render);
        this._lastSourceId = this.properties.sourceInstance.sourceId;
        this._lastPropertyId = this.properties.sourceInstance.propertyId;
    }

    if (this._lastSourceId && this._lastPropertyId) {

        // In the case of extension, we don't need to unregister because the id changes every time the page is reloaded so it doesn't exist anymore
        if (!this._lastSourceId.startsWith("Extension")) {
            this.context.dynamicDataProvider.unregisterPropertyChanged(this._lastSourceId, this._lastPropertyId, this.render);
        }
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.SearchBoxDynamicDataSourceGroupName,
              groupFields: this._getSearchQueryFields()
            },
            {
              groupName: strings.SearchBoxNewPage,
              groupFields: this._getSearchBehaviorOptionsFields()
            }
          ],
          displayGroupsAsAccordion: true
        }
      ]
    };
  }

  public getPropertyValue(propertyId: string) {
    switch (propertyId) {
      case 'inputQuery':
        return this._searchQuery;

      default:
        throw new Error('Bad property id');
    }
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'inputQuery',
        title: strings.SearchBoxDynamicPropertyInputLabel
      }
    ];
  }

  public render(): void {

    if (this.properties.useDynamicDataSource) {

      const needsConfiguration: boolean = !this.properties.sourceInstance.sourceId || !this.properties.sourceInstance.propertyId;

      if (!needsConfiguration) {
          const source: IDynamicDataSource = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceInstance.sourceId);
          let sourceValue = source ? source.getPropertyValue(this.properties.sourceInstance.propertyId) : undefined;

          if (typeof sourceValue === 'string') {
              this._searchQuery = sourceValue ? sourceValue : "";
          } else {
              Log.warn(Text.format(LOG_SOURCE, this.instanceId), `The selected input value from the dynamic data source is not a string. Received (${typeof sourceValue})`, this.context.serviceScope);
          }
      }
    }

    const element: React.ReactElement<ISearchBoxContainerProps> = React.createElement(
      SearchBox, { 
        onSearch: this._onSearch,
        searchInNewPage: this.properties.searchInNewPage,
        pageUrl: this.properties.pageUrl,
        openBehavior: this.properties.openBehavior,
        inputValue: this._searchQuery,
        enableQuerySuggestions: this.properties.enableQuerySuggestions,
        searchService: this._searchService
      } as ISearchBoxContainerProps);

    ReactDom.render(element, this.domElement);
  }
}
