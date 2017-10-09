import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  PropertyPaneSlider,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as strings from 'SearchWebPartStrings';
import SearchContainer from "./components/SearchContainer/SearchContainer";
import ISearchContainerProps from "./components/SearchContainer/ISearchContainerProps";
import { ISearchWebPartProps } from './ISearchWebPartProps';
import ISearchDataProvider from "../dataProviders/ISearchDataProvider";
import MockSearchDataProvider from "../dataProviders/MockSearchDataProvider";
import SearchDataProvider from "../dataProviders/SearchDataProvider";
import * as moment from "moment";

export default class SearchWebPart extends BaseClientSideWebPart<ISearchWebPartProps> {

  private _dataProvider: ISearchDataProvider;

  /**
   * Override the base onInit() implementation to get the persisted properties to initialize data provider.
   */
  protected onInit(): Promise<void> {

    // Init the moment JS library locale globally
    const currentLocale = this.context.pageContext.cultureInfo.currentCultureName;
    moment.locale(currentLocale);   

    if (Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockSearchDataProvider();
    } else {
      this._dataProvider = new SearchDataProvider(this.context);
    }

    return super.onInit();
  }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  public render(): void {

    this._dataProvider.resultsCount = this.properties.resultsCount;
    this._dataProvider.selectedProperties = this.properties.selectedProperties ? 
                                            this.properties.selectedProperties.replace(/\s|,+$/g,'').split(",") :[];        

    const element: React.ReactElement<ISearchContainerProps> = React.createElement(
      SearchContainer,
      {
        dataProvider: this._dataProvider,
        searchQuery: this.properties.searchQuery,
        resultsCount: this.properties.resultsCount,
        selectedProperties: this.properties.selectedProperties,
        refiners: this.properties.refiners,
        showPaging: this.properties.showPaging,
      }
      
    );
    
    ReactDom.render(element, this.domElement);
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
              groupName: strings.SearchSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('searchQuery', {
                  label: strings.SearchQueryFieldLabel,
                  multiline: true,    
                  resizable: true,
                  placeholder: strings.SearchQueryPlaceHolderText,
                  onGetErrorMessage: this._validateEmptyField.bind(this)
                }),
                PropertyPaneTextField('selectedProperties', {
                  label: strings.SelectedPropertiesFieldLabel,
                  multiline: true,    
                  resizable: true,
                  value: "Title,Path,Created,Filename,ServerRedirectedPreviewURL",
                }),     
                PropertyPaneTextField('refiners', {
                  label: strings.RefinersFieldLabel,
                  multiline: true,    
                  resizable: true,
                }),             
                PropertyPaneSlider("resultsCount", {
                  label: strings.ResultsCount,
                  max: 50,
                  min: 1,
                  showValue: true,
                  step: 1,
                  value: 10,
                }),       
                PropertyPaneToggle("showPaging", {
                  label: strings.ShowPagingLabel,
                  checked: true,
                }),                
              ]
            }
          ]
        }
      ]
    };
  }

  private _validateEmptyField(value: string): string {

    if (!value) {
      return strings.EmptyFieldErrorMessage;
    }

    return "";
  }
}
