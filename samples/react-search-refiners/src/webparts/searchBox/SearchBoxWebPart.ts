import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneLabel,
  PropertyPaneToggle,
} from '@microsoft/sp-webpart-base';
import * as strings from 'SearchBoxWebPartStrings';
import SearchBox from './components/SearchBoxContainer';
import { ISearchBoxProps } from './components/ISearchBoxContainerProps';
import { PageOpenBehavior } from '../common/UrlHelper';
import ISearchDataProvider from '../dataProviders/SearchDataProvider/ISearchDataProvider';
import MockSearchDataProvider from '../dataProviders/SearchDataProvider/MockSearchDataProvider';
import SearchDataProvider from '../dataProviders/SearchDataProvider/SearchDataProvider';

export interface ISearchBoxWebPartProps {

  /**
   * Indicates if we should show the query suggestions when typing
   */
  enableQuerySuggestions: boolean;

  /**
   * Indicates if we should send the query to a new page
   */
  searchInNewPage: boolean;

  /**
   * The page URL where to send the query
   */
  pageUrl: string;

  /**
   * Defines the opening behavior for new page
   */
  openBehavior: PageOpenBehavior;
}

export default class SearchBoxWebPart extends BaseClientSideWebPart<ISearchBoxWebPartProps> {

  private _searchDataProvider: ISearchDataProvider;

  /**
   * Override the base onInit() implementation to get the persisted properties to initialize data provider.
   */
  protected onInit(): Promise<void> {

    // Initializes data provider on first load according to property pane configuration
    this.initSearchDataProvider();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ISearchBoxProps > = React.createElement(
      SearchBox, { 
        enableQuerySuggestions: this.properties.enableQuerySuggestions,
        searchDataProvider: this._searchDataProvider,
        eventAggregator: this.context.eventAggregator,
        searchInNewPage: this.properties.searchInNewPage,
        pageUrl: this.properties.pageUrl,
        openBehavior: this.properties.openBehavior
      });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    // Initializes data provider on first load according to property pane configuration
    this.initSearchDataProvider();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.SearchBoxNewPage,
              groupFields: [
                PropertyPaneCheckbox("searchInNewPage", {
                  text: strings.SearchBoxSearchInNewPageLabel
                }),
                PropertyPaneLabel("", {
                  text: strings.SearchBoxSearchInNewPageDescription
                }),
                PropertyPaneTextField("pageUrl", {
                  disabled: !this.properties.searchInNewPage,
                  label: strings.SearchBoxPageUrlLabel,
                  onGetErrorMessage: this._validateUrl.bind(this)
                }),
                PropertyPaneDropdown("openBehavior", {
                  label:  strings.SearchBoxPageOpenBehaviorLabel,
                  options: [
                    { key: PageOpenBehavior.Self, text: strings.SearchBoxSameTabOpenBehavior, index: 0 },
                    { key: PageOpenBehavior.NewTab, text: strings.SearchBoxNewTabOpenBehavior, index: 1 }
                  ],
                  disabled:  !this.properties.searchInNewPage,
                  selectedKey: 0
                })
              ]
            },
            {
              groupName: strings.SearchBoxQuerySuggestionsSettings,
              groupFields: [
                PropertyPaneToggle("enableQuerySuggestions", {
                  checked: false,
                  label: strings.SearchBoxEnableQuerySuggestions
                })
              ]
            }
          ]
        }
      ]
    };
  }

  /**
   * Initializes the query optimization data provider instance according to the current environnement
   */
  private initSearchDataProvider() {
      
      if (this.properties.enableQuerySuggestions) {
        if (Environment.type === EnvironmentType.Local ) {
          this._searchDataProvider = new MockSearchDataProvider();
        } else {
          this._searchDataProvider = new SearchDataProvider(this.context);        
        return "";
      }
    }
  }

  private _validateUrl(value: string) {    
    
    if ((!/^(https?):\/\/[^\s/$.?#].[^\s]*/.test(value) || !value) && this.properties.searchInNewPage) {
      return strings.SearchBoxUrlErrorMessage;
    }
    
    return "";
  }
}
