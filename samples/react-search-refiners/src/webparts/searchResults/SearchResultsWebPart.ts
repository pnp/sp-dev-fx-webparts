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
import SearchContainer from "./components/SearchResultsContainer/SearchResultsContainer";
import ISearchContainerProps from "./components/SearchResultsContainer/ISearchResultsContainerProps";
import { ISearchResultsWebPartProps } from './ISearchResultsWebPartProps';
import ISearchDataProvider from "../dataProviders/ISearchDataProvider";
import MockSearchDataProvider from "../dataProviders/MockSearchDataProvider";
import SearchDataProvider from "../dataProviders/SearchDataProvider";
import * as moment from "moment";
import { Placeholder, IPlaceholderProps } from "@pnp/spfx-controls-react/lib/Placeholder";
import { PropertyPaneCheckbox } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox';
import { PropertyPaneHorizontalRule } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneHorizontalRule/PropertyPaneHorizontalRule';

export default class SearchWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

    private _dataProvider: ISearchDataProvider;
    private _useResultSource: boolean;

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

        // Register an handler to catch search box queries
        this.bindPushStateEvent();

        this._useResultSource = false;

        return super.onInit();
    }

    protected get disableReactivePropertyChanges(): boolean {
        // Set this to true if you don't want the reactive behavior.
        return false;
    }

    public render(): void {

        let renderElement = null;

        // Configure the provider before the query according to our needs
        this._dataProvider.resultsCount = this.properties.maxResultsCount;
        this._dataProvider.queryTemplate = this.properties.queryTemplate;
        this._dataProvider.resultSourceId = this.properties.resultSourceId;
        this._dataProvider.enableQueryRules = this.properties.enableQueryRules;

        const searchContainer: React.ReactElement<ISearchContainerProps> = React.createElement(
            SearchContainer,
            {
                searchDataProvider: this._dataProvider,
                queryKeywords: this.properties.queryKeywords,
                maxResultsCount: this.properties.maxResultsCount,
                resultSourceId: this.properties.resultSourceId,
                enableQueryRules: this.properties.enableQueryRules,
                selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g, '').split(",") : [],
                refiners: this.properties.refiners,
                showPaging: this.properties.showPaging,
                showFileIcon: this.properties.showFileIcon,
                showCreatedDate: this.properties.showCreatedDate
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
                                    value: this.properties.queryKeywords,
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
                                    deferredValidationTime: 300
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
                        {
                            groupName: strings.StylingSettingsGroupName,
                            groupFields: [
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
                                })
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

    private bindPushStateEvent() {

        // Original source: https://www.eliostruyf.com/check-page-mode-from-within-spfx-extensions

        const _pushState = () => {
            const _defaultPushState = history.pushState;
            const _self = this;
            return function (data: any, title: string, url?: string | null) {

                const currentUrl = new URLSearchParams(url);
                // We need to call the in context of the component
                // The "k" parameter is set by the search box component
                if (_self.properties.useSearchBoxQuery) {
                    _self.properties.queryKeywords = data.k;
                    _self.render();
                }
                // Call the original function with the provided arguments
                // This context is necessary for the context of the history change
                return _defaultPushState.apply(this, [data, title, url]);
            };
        };

        history.pushState = _pushState();
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
}
