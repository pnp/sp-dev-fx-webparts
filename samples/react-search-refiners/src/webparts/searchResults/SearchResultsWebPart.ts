import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    PropertyPaneSlider,
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneToggle,
    IEvent
} from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as strings from 'SearchWebPartStrings';
import SearchContainer from "./components/SearchResultsContainer/SearchResultsContainer";
import ISearchContainerProps from "./components/SearchResultsContainer/ISearchResultsContainerProps";
import { ISearchResultsWebPartProps } from './ISearchResultsWebPartProps';
import ISearchDataProvider from "../dataProviders/SearchDataProvider/ISearchDataProvider";
import MockSearchDataProvider from "../dataProviders/SearchDataProvider/MockSearchDataProvider";
import SearchDataProvider from "../dataProviders/SearchDataProvider/SearchDataProvider";
import ITaxonomyDataProvider from "../dataProviders/TaxonomyProvider/ITaxonomyDataProvider";
import MockTaxonomyDataProvider from "../dataProviders/TaxonomyProvider/MockTaxonomyDataProvider";
import TaxonomyProvider from "../dataProviders/TaxonomyProvider/TaxonomyProvider";
import * as moment from "moment";
import { Placeholder, IPlaceholderProps } from "@pnp/spfx-controls-react/lib/Placeholder";
import { PropertyPaneCheckbox } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox';
import { PropertyPaneHorizontalRule } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule';
import { UrlUtilities, DisplayMode } from "@microsoft/sp-core-library";
import LocalizationHelper from "../common/LocalizationHelper";
import { UrlHelper } from '../common/UrlHelper';

export default class SearchWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

    private _searchDataProvider: ISearchDataProvider;
    private _taxonomyDataProvider: ITaxonomyDataProvider;
    private _useResultSource: boolean;

    public constructor() {
        super();

        this._parseRefiners = this._parseRefiners.bind(this);
        this.bindSearchQuery = this.bindSearchQuery.bind(this);
    }

    /**
     * Override the base onInit() implementation to get the persisted properties to initialize data provider.
     */
    protected onInit(): Promise<void> {

        // Init the moment JS library locale globally
        const currentLocale = this.context.pageContext.cultureInfo.currentCultureName;
        moment.locale(currentLocale);

        if (Environment.type === EnvironmentType.Local) {
            this._searchDataProvider = new MockSearchDataProvider();
            this._taxonomyDataProvider = new MockTaxonomyDataProvider();
        } else {

            const lcid = LocalizationHelper.getLocaleId(this.context.pageContext.cultureInfo.currentUICultureName);

            this._searchDataProvider = new SearchDataProvider(this.context);
            this._taxonomyDataProvider = new TaxonomyProvider(this.context, lcid);
        }

        this._useResultSource = false;

        if (this.properties.useSearchBoxQuery) {

            // Check if there is an existing query parameter on loading (only on first load)
            const queryStringKeywords = UrlHelper.getQueryStringParam("q", window.location.href);
        
            if (queryStringKeywords) {
                this.properties.queryKeywords = decodeURIComponent(queryStringKeywords);
            } else {
                this.properties.queryKeywords = "";
            }
        }

        // Use the SPFx event aggregator to get the search box query keywords
        // Bind this on initialization since options can be changed in the proeprty pane an this method won't be called again
        // We don't want subscribe every time this option is changed
        this.context.eventAggregator.subscribeByEventName("search:newQueryKeywords", this.componentId , this.bindSearchQuery);
                    
        return super.onInit();
    }

    protected get disableReactivePropertyChanges(): boolean {
        // Set this to true if you don't want the reactive behavior.
        return false;
    }

    public render(): void {

        let renderElement = null;

        // Configure the provider before the query according to our needs
        this._searchDataProvider.resultsCount = this.properties.maxResultsCount;
        this._searchDataProvider.queryTemplate = this.properties.queryTemplate;
        this._searchDataProvider.resultSourceId = this.properties.resultSourceId;
        this._searchDataProvider.enableQueryRules = this.properties.enableQueryRules;

        const searchContainer: React.ReactElement<ISearchContainerProps> = React.createElement(
            SearchContainer,
            {
                searchDataProvider: this._searchDataProvider,
                taxonomyDataProvider: this._taxonomyDataProvider,
                queryKeywords: this.properties.queryKeywords,
                maxResultsCount: this.properties.maxResultsCount,
                resultSourceId: this.properties.resultSourceId,
                enableQueryRules: this.properties.enableQueryRules,
                selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g, '').split(",") : [],
                refiners: this._parseRefiners(this.properties.refiners),
                showPaging: this.properties.showPaging,
                showFileIcon: this.properties.showFileIcon,
                showCreatedDate: this.properties.showCreatedDate,
                showResultsCount: this.properties.showResultsCount,
                showBlank: this.properties.showBlank,
                displayMode: this.displayMode
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

        renderElement = (this.properties.queryKeywords && !this.properties.useSearchBoxQuery) || this.properties.useSearchBoxQuery ? searchContainer : placeholder;
        
        ReactDom.render(renderElement, this.domElement);              
    }

    public onPropertyPaneFieldChanged(changedProperty: string) {

        if (changedProperty === "useSearchBoxQuery") {
            // Reset the value if use search box (property pane)
            this.properties.queryKeywords = this.properties.useSearchBoxQuery ? "" : this.properties.queryKeywords;
        }
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
                                PropertyPaneCheckbox("useSearchBoxQuery", {
                                    checked: false,
                                    text: strings.UseSearchBoxQueryLabel,                               
                                }),
                                PropertyPaneTextField('queryKeywords', {
                                    label: strings.SearchQueryKeywordsFieldLabel,
                                    description: strings.SearchQueryKeywordsFieldDescription,
                                    value: this.properties.useSearchBoxQuery ? "" : this.properties.queryKeywords,
                                    multiline: true,
                                    resizable: true,
                                    placeholder: strings.SearchQueryPlaceHolderText,
                                    onGetErrorMessage: this._validateEmptyField.bind(this),
                                    deferredValidationTime: 500,
                                    disabled: this.properties.useSearchBoxQuery
                                }),
                                PropertyPaneTextField('queryTemplate', {
                                    label: strings.QueryTemplateFieldLabel,
                                    value: this.properties.queryTemplate,
                                    multiline: true,
                                    resizable: true,
                                    placeholder: strings.SearchQueryPlaceHolderText,
                                    deferredValidationTime: 300,
                                    disabled: this._useResultSource,
                                }),
                                PropertyPaneTextField('resultSourceId', {
                                    label: strings.ResultSourceIdLabel,
                                    multiline: false,
                                    onGetErrorMessage: this.validateSourceId.bind(this),
                                    deferredValidationTime: 300
                                }),
                                PropertyPaneToggle('enableQueryRules', {
                                    label: strings.EnableQueryRulesLabel,
                                    checked: this.properties.enableQueryRules,
                                }),
                                PropertyPaneTextField('selectedProperties', {
                                    label: strings.SelectedPropertiesFieldLabel,
                                    description: strings.SelectedPropertiesFieldDescription,
                                    multiline: true,
                                    resizable: true,
                                    value: this.properties.selectedProperties,
                                    deferredValidationTime: 300
                                }),
                                PropertyPaneTextField('refiners', {
                                    label: strings.RefinersFieldLabel,
                                    description: strings.RefinersFieldDescription,
                                    multiline: true,
                                    resizable: true,
                                    value: this.properties.refiners,
                                    deferredValidationTime: 300,
                                }),
                                PropertyPaneSlider("maxResultsCount", {
                                    label: strings.MaxResultsCount,
                                    max: 50,
                                    min: 1,
                                    showValue: true,
                                    step: 1,
                                    value: 50,
                                })
                            ]
                        },
                    ]
                },
                {
                    groups: [
                        {
                            groupName: strings.StylingSettingsGroupName,
                            groupFields: [
                                PropertyPaneToggle("showBlank", {
                                    label: strings.ShowBlankLabel,
                                    checked: this.properties.showBlank,
                                }),
                                PropertyPaneToggle("showResultsCount", {
                                    label: strings.ShowResultsCountLabel,
                                    checked: this.properties.showResultsCount,
                                }),
                                PropertyPaneToggle("showPaging", {
                                    label: strings.ShowPagingLabel,
                                    checked: this.properties.showPaging,
                                }),
                                PropertyPaneToggle("showFileIcon", {
                                    label: strings.ShowFileIconLabel,
                                    checked: this.properties.showFileIcon,
                                }),
                                PropertyPaneToggle("showCreatedDate", {
                                    label: strings.ShowCreatedDateLabel,
                                    checked: this.properties.showCreatedDate,
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

    public bindSearchQuery(eventName: string, eventData: IEvent<any>) {

        if (this.properties.useSearchBoxQuery) {
            if (eventData.data) {
                    
                this.properties.queryKeywords = eventData.data;
                this.render();
            }  
        }
    }

    private validateSourceId(value: string): string {
        if(value.length > 0) {
            if (!/^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/.test(value)) {
                this._useResultSource = false;
                return strings.InvalidResultSourceIdMessage;
            } else {
                this._useResultSource = true;
            }
        } else {
            this._useResultSource = false;
        }
        
        return '';
    }

    private _parseRefiners(rawValue: string) : { [key: string]: string } {

        let refiners = {};

        // Get each configuration
        let refinerKeyValuePair = rawValue.split(",");

        if (refinerKeyValuePair.length > 0) {
            refinerKeyValuePair.map((e) => {

                const refinerValues = e.split(":");
                switch (refinerValues.length) {
                    case 1:
                            // Take the same name as the refiner managed property
                            refiners[refinerValues[0]] = refinerValues[0];
                            break;
                    
                    case 2:
                            // Trim quotes if present
                            refiners[refinerValues[0]] = refinerValues[1].replace(/^"(.*)"$/, '$1');
                            break;
                }
            });
        }

        return refiners;
    }
}
