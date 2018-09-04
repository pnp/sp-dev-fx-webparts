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
import { IDynamicDataController, IDynamicDataSourceMetadata, IDynamicDataPropertyDefinition, IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import ISearchBoxWebPartProps from                                                                                     './ISearchBoxWebPartProps';
import { Log, Text, Environment, EnvironmentType } from                                                                '@microsoft/sp-core-library';
import ISearchService from                                                                                             '../../services/SearchService/ISearchService';
import MockSearchService from                                                                                          '../../services/SearchService/MockSearchService';
import SearchService from                                                                                              '../../services/SearchService/SearchService';

const LOG_SOURCE: string = '[SearchBoxWebPart_{0}]';

export default class SearchBoxWebPart extends BaseClientSideWebPart<ISearchBoxWebPartProps> implements IDynamicDataController {

  private _searchService: ISearchService;
  private _searchQuery: string;
  private _source: IDynamicDataSource;
  private _domElement: HTMLElement;

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
   * Resolves the connected data sources
   * Useful in the case when the data source comes from an extension, 
   * the id is regenerated every time the page is refreshed causing the property pane configuration be lost
   */
  private _initDynamicDataSource() {

    if (this.properties.dynamicDataSourceId 
      && this.properties.dynamicDataSourcePropertyId
      && this.properties.dynamicDataSourceComponentId) {

      this._source = this.context.dynamicDataProvider.tryGetSource(this.properties.dynamicDataSourceId);
      let sourceId = undefined;
      
      if (this._source) {
          sourceId = this._source.id;
      } else {
          // Try to resolve the source and get its id by the name
          this._source = this._tryGetSourceByComponentId(this.properties.dynamicDataSourceComponentId);
          sourceId = this._source ? this._source.id : undefined;
      }

      if (sourceId) {
          this.context.dynamicDataProvider.registerPropertyChanged(sourceId, this.properties.dynamicDataSourcePropertyId, this._dataSourceUpdated);
          this._searchQuery = this._source.getPropertyValue(this.properties.dynamicDataSourcePropertyId);

          // Update the property for the property pane
          this.properties.dynamicDataSourceId = sourceId;
          this._lastSourceId = this.properties.dynamicDataSourceId;
          this._lastPropertyId = this.properties.dynamicDataSourcePropertyId;

          // Notify subscriber of the initial value
          this.context.dynamicDataSourceManager.notifyPropertyChanged('inputQuery');
          
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
                    componentId: source.metadata.componentId
                };
        }).filter((item) => {
          if (item.key.localeCompare("PageContext") !== 0 && item.componentId !== this.componentId) {
            return item;
          }
        });

        const selectedSource: string = this.properties.dynamicDataSourceId;
    
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
            PropertyPaneDropdown('dynamicDataSourceId', {
                label: "Source",
                options: sourceOptions,
                selectedKey: this.properties.dynamicDataSourceId,
            }),
            PropertyPaneDropdown('dynamicDataSourcePropertyId', {
                disabled: !this.properties.dynamicDataSourceId,
                label: "Source property",
                options: propertyOptions,
                selectedKey: this.properties.dynamicDataSourcePropertyId
            }),
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
   * Handler to notify data source subscribers the query string value has been updated
   */
  private _dataSourceUpdated() {

    if (this.properties.useDynamicDataSource) {
      if (this.properties.dynamicDataSourceId && this.properties.dynamicDataSourcePropertyId) {
        this._searchQuery = this._source ? this._source.getPropertyValue(this.properties.dynamicDataSourcePropertyId) : undefined;
        this.context.dynamicDataSourceManager.notifyPropertyChanged('inputQuery');

        this.render();
      }
    }
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
   * Gets a dynamic data source by its component id. The component id doesn't change when the page is refreshed
   * @param dataSourceComponentId the component id
   */
  private _tryGetSourceByComponentId(dataSourceComponentId: string): IDynamicDataSource {
    const resolvedDataSource = this.context.dynamicDataProvider.getAvailableSources()
                                    .filter((item) => {
                                      if (item.metadata.componentId) {
                                        if (item.metadata.componentId.localeCompare(dataSourceComponentId) === 0) {
                                          return item;
                                        }
                                      }                                      
                                    });

    if (resolvedDataSource.length > 0 ) {
      return resolvedDataSource[0];
    } else {
      Log.verbose(Text.format(LOG_SOURCE, "_tryGetSourceByComponentId()"), `Unable to find dynamic data source with componentId '${dataSourceComponentId}'`);
      return undefined;      
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

  protected onInit(): Promise<void> {

    this._domElement = this.domElement;

    this.initSearchService();

    this.context.dynamicDataSourceManager.initializeSource(this);

    // Make sure the data source will be plugged in correctly when loaded on the page
    // Depending of the component loading order, some sources may be unavailable at this time so that's why we use an event listener 
    this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._initDynamicDataSource.bind(this));

    return Promise.resolve();
  }

  protected onPropertyPaneFieldChanged(changedProperty: string) {

    this.initSearchService();
    
    if (changedProperty === 'dynamicDataSourceId') {

      this._source = this.context.dynamicDataProvider.tryGetSource(this.properties.dynamicDataSourceId);

      this.properties.dynamicDataSourcePropertyId = this._source.getPropertyDefinitions()[0].id;
      this.properties.dynamicDataSourceComponentId = this._source.metadata.componentId;
        
      // Unregister previous event listeners is the source is updated
      if (this._lastSourceId && this._lastPropertyId) {
          // Check if the source is still on the page so we can unregister
          if (this.context.dynamicDataProvider.tryGetSource(this._lastSourceId)) {
              this.context.dynamicDataProvider.unregisterPropertyChanged(this._lastSourceId, this._lastPropertyId, this.render);
          }
      }

      this.context.dynamicDataProvider.registerPropertyChanged(this.properties.dynamicDataSourceId, this.properties.dynamicDataSourcePropertyId, this._dataSourceUpdated);

      this._lastSourceId = this.properties.dynamicDataSourceId;
      this._lastPropertyId = this.properties.dynamicDataSourcePropertyId;
    }
    
    if (changedProperty === 'useDynamicDataSource') {
      if (!this.properties.useDynamicDataSource) {
        this.context.dynamicDataProvider.unregisterAvailableSourcesChanged(this._initDynamicDataSource.bind(this));
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

    ReactDom.render(element, this._domElement);
  }
}
