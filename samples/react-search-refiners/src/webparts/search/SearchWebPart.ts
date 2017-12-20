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
import { Placeholder, IPlaceholderProps } from "@pnp/spfx-controls-react/lib/Placeholder";

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
                                            
    let renderElement = null;

    // Configure the provider before the query according to our needs
    this._dataProvider.resultsCount = this.properties.maxResultsCount;
    this._dataProvider.queryTemplate = this.properties.queryTemplate;

    const searchContainer: React.ReactElement<ISearchContainerProps> = React.createElement(
      SearchContainer,
      {
        searchDataProvider: this._dataProvider,
        queryKeywords: this.properties.queryKeywords,
        maxResultsCount: this.properties.maxResultsCount,
        selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g,'').split(",") :[],
        refiners: this.properties.refiners,
        showPaging: this.properties.showPaging,
      } as ISearchContainerProps
    );

    const placeholder: React.ReactElement<IPlaceholderProps> = React.createElement(
      Placeholder,
      {
        iconName: strings.PlaceHolderEditLabel,
        iconText: strings.PlaceHolderIconText,
        description: strings.PlaceHolderDescription,
        buttonLabel: strings.PlaceHolderConfigureBtnLabel,
        onConfigure: this._setupWebPart.bind(this)
      }
    );

    renderElement = this.properties.queryKeywords ? searchContainer : placeholder;

    ReactDom.render(renderElement, this.domElement);

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
                PropertyPaneTextField('queryKeywords', {
                  label: strings.SearchQueryKeywordsFieldLabel,
                  value: "",
                  multiline: true,    
                  resizable: true,
                  placeholder: strings.SearchQueryPlaceHolderText,
                  onGetErrorMessage: this._validateEmptyField.bind(this)
                }),
                PropertyPaneTextField('queryTemplate', {
                  label: strings.QueryTemplateFieldLabel,
                  value: "{searchTerms} Path:{Site}",
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
                  value: "Created"
                }),             
                PropertyPaneSlider("maxResultsCount", {
                  label: strings.MaxResultsCount,
                  max: 50,
                  min: 1,
                  showValue: true,
                  step: 1,
                  value: 50,
                }),            
                PropertyPaneToggle("showPaging", {
                  label: strings.ShowPagingLabel,
                  checked: false,
                }),                
              ]
            }
          ]
        }
      ]
    };
  }

  /**
   * Opens the Web Part property pane
   */
  private _setupWebPart() {
    this.context.propertyPane.open();
  }

  private _validateEmptyField(value: string): string {

    if (!value) {
      return strings.EmptyFieldErrorMessage;
    }

    return "";
  }
}
