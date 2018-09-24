import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Text, Log } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    PropertyPaneSlider,
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneToggle,
    PropertyPaneCheckbox,
    PropertyPaneChoiceGroup,
    IPropertyPaneChoiceGroupOption,
    IPropertyPaneField,
    IPropertyPaneDropdownOption,
    PropertyPaneDropdown,
    PropertyPaneLabel,
    PropertyPaneCustomField,
    IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as strings from 'SearchWebPartStrings';
import SearchContainer from './components/SearchResultsContainer/SearchResultsContainer';
import ISearchContainerProps from './components/SearchResultsContainer/ISearchResultsContainerProps';
import { ISearchResultsWebPartProps } from './ISearchResultsWebPartProps';
import ISearchService from '../../services/SearchService/ISearchService';
import MockSearchService from '../../services/SearchService/MockSearchService';
import SearchService from '../../services/SearchService/SearchService';
import ITaxonomyService from '../../services/TaxonomyService/ITaxonomyService';
import MockTaxonomyService from '../../services/TaxonomyService/MockTaxonomyService';
import TaxonomyService from '../../services/TaxonomyService/TaxonomyService';
import { Placeholder, IPlaceholderProps } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import LocalizationHelper from '../../helpers/LocalizationHelper';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import TemplateService from '../../services/TemplateService/TemplateService';
import { update, isEmpty } from '@microsoft/sp-lodash-subset';
import MockTemplateService from '../../services/TemplateService/MockTemplateService';
import BaseTemplateService from '../../services/TemplateService/BaseTemplateService';
import { IDynamicDataSource } from '@microsoft/sp-dynamic-data';

declare var System: any;

const LOG_SOURCE: string = '[SearchResultsWebPart_{0}]';

export default class SearchResultsWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

    private _searchService: ISearchService;
    private _taxonomyService: ITaxonomyService;
    private _templateService: BaseTemplateService;
    private _useResultSource: boolean;
    private _queryKeywords: string;
    private _source: IDynamicDataSource;
    private _domElement: HTMLElement;
    private _propertyPage = null;

    /**
     * Used to be able to unregister dynamic data events if the source is updated
     */
    private _lastSourceId: string = undefined;
    private _lastPropertyId: string = undefined;

    /**
     * The template to display at render time
     */
    private _templateContentToDisplay: string;

    constructor() {
        super();

        this._parseRefiners = this._parseRefiners.bind(this);
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
                this.context.dynamicDataProvider.registerPropertyChanged(sourceId, this.properties.dynamicDataSourcePropertyId, this.render);

                // Update the property for the property pane
                this.properties.dynamicDataSourceId = sourceId;
                this._lastSourceId = this.properties.dynamicDataSourceId;
                this._lastPropertyId = this.properties.dynamicDataSourcePropertyId;

                // If false, means the onInit method is not completed yet so we let it render the web part through the normal process
                if (this.renderedOnce) {
                    this.render();
                }
            }
        }
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

        if (resolvedDataSource.length > 0) {
            return resolvedDataSource[0];
        } else {
            Log.verbose(Text.format(LOG_SOURCE, "_tryGetSourceByComponentId()"), `Unable to find dynamic data source with componentId '${dataSourceComponentId}'`);
            return undefined;
        }
    }

    /**
     * Determines the group fields for the search settings options inside the property pane
     */
    private _getSearchSettingsFields(): IPropertyPaneField<any>[] {
        // Sets up search settings fields
        const searchSettingsFields: IPropertyPaneField<any>[] = [
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
            PropertyPaneTextField('sortList', {
                label: strings.SortList,
                description: strings.SortListDescription,
                multiline: false,
                resizable: true,
                value: this.properties.sortList,
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
            })
        ];

        return searchSettingsFields;
    }

    /**
     * Determines the group fields for the search query options inside the property pane
     */
    private _getSearchQueryFields(): IPropertyPaneField<any>[] {
        // Sets up search query fields
        let searchQueryConfigFields: IPropertyPaneField<any>[] = [
            PropertyPaneCheckbox('useSearchBoxQuery', {
                checked: false,
                text: strings.UseSearchBoxQueryLabel,
            })
        ];

        if (this.properties.useSearchBoxQuery) {
            const sourceOptions: IPropertyPaneDropdownOption[] =
                this.context.dynamicDataProvider.getAvailableSources().map(source => {
                    return {
                        key: source.id,
                        text: source.metadata.title
                    };
                }).filter(item => item.key.localeCompare("PageContext") !== 0);

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

        } else {
            searchQueryConfigFields.push(
                PropertyPaneTextField('queryKeywords', {
                    label: strings.SearchQueryKeywordsFieldLabel,
                    description: strings.SearchQueryKeywordsFieldDescription,
                    value: this.properties.useSearchBoxQuery ? '' : this.properties.queryKeywords,
                    multiline: true,
                    resizable: true,
                    placeholder: strings.SearchQueryPlaceHolderText,
                    onGetErrorMessage: this._validateEmptyField.bind(this),
                    deferredValidationTime: 500,
                    disabled: this.properties.useSearchBoxQuery
                })
            );
        }
        searchQueryConfigFields.push(
            PropertyPaneLabel('', { text: '' }), // dummy space
            PropertyPaneSlider('maxResultsCount', {
                label: strings.MaxResultsCount,
                max: 50,
                min: 1,
                showValue: true,
                step: 1,
                value: 50,
            })
        );

        return searchQueryConfigFields;
    }

    /**
     * Determines the group fields for styling options inside the property pane
     */
    private _getStylingFields(): IPropertyPaneField<any>[] {

        // Options for the search results layout 
        const layoutOptions = [
            {
                iconProps: {
                    officeFabricIconFontName: 'List'
                },
                text: strings.ListLayoutOption,
                key: ResultsLayoutOption.List,
            },
            {
                iconProps: {
                    officeFabricIconFontName: 'Tiles'
                },
                text: strings.TilesLayoutOption,
                key: ResultsLayoutOption.Tiles
            },
            {
                iconProps: {
                    officeFabricIconFontName: 'Code'
                },
                text: strings.CustomLayoutOption,
                key: ResultsLayoutOption.Custom,
            }
        ] as IPropertyPaneChoiceGroupOption[];

        const canEditTemplate = this.properties.externalTemplateUrl && this.properties.selectedLayout === ResultsLayoutOption.Custom ? false : true;

        const pp: IPropertyPaneCustomFieldProps = {
            onRender: (elem: HTMLElement): void => {
                elem.innerHTML = `<div class="ms-font-xs ms-fontColor-neutralSecondary">${strings.HandlebarsHelpersDescription}</div>`;
            },
            key: "HandlebarsDescription"
        };

        // Sets up styling fields
        let stylingFields: IPropertyPaneField<any>[] = [
            PropertyPaneTextField('webPartTitle', {
                label: strings.WebPartTitle
            }),
            PropertyPaneToggle('showBlank', {
                label: strings.ShowBlankLabel,
                checked: this.properties.showBlank,
            }),
            PropertyPaneToggle('showResultsCount', {
                label: strings.ShowResultsCountLabel,
                checked: this.properties.showResultsCount,
            }),
            PropertyPaneToggle('showPaging', {
                label: strings.ShowPagingLabel,
                checked: this.properties.showPaging,
            }),
            PropertyPaneChoiceGroup('selectedLayout', {
                label: 'Results layout',
                options: layoutOptions
            }),
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
            }),
            PropertyPaneToggle('useHandlebarsHelpers', {
                label: "Handlebars Helpers",
                checked: this.properties.useHandlebarsHelpers
            }),
            PropertyPaneCustomField(pp)
        ];

        // Only show the template external URL for 'Custom' option
        if (this.properties.selectedLayout === ResultsLayoutOption.Custom) {
            stylingFields.push(PropertyPaneTextField('externalTemplateUrl', {
                label: strings.TemplateUrlFieldLabel,
                placeholder: strings.TemplateUrlPlaceholder,
                deferredValidationTime: 500,
                onGetErrorMessage: this._onTemplateUrlChange.bind(this)
            }));
        }

        return stylingFields;
    }

    /**
     * Opens the Web Part property pane
     */
    private _setupWebPart() {
        this.context.propertyPane.open();
    }

    /**
     * Checks if a field if empty or not
     * @param value the value to check
     */
    private _validateEmptyField(value: string): string {

        if (!value) {
            return strings.EmptyFieldErrorMessage;
        }

        return '';
    }

    /**
     * Ensures the result source id value is a valid GUID
     * @param value the result source id
     */
    private validateSourceId(value: string): string {
        if (value.length > 0) {
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

    /**
     * Parses refiners from the property pane value by extracting the refiner managed property and its label in the filter panel.
     * @param rawValue the raw value of the refiner
     */
    private _parseRefiners(rawValue: string): { [key: string]: string } {

        let refiners = {};

        // Get each configuration
        let refinerKeyValuePair = rawValue.split(',');

        if (refinerKeyValuePair.length > 0) {
            refinerKeyValuePair.map((e) => {

                const refinerValues = e.split(':');
                switch (refinerValues.length) {
                    case 1:
                        // Take the same name as the refiner managed property
                        refiners[refinerValues[0]] = refinerValues[0];
                        break;

                    case 2:
                        // Trim quotes if present
                        refiners[refinerValues[0]] = refinerValues[1].replace(/^'(.*)'$/, '$1');
                        break;
                }
            });
        }

        return refiners;
    }

    /**
     * Get the correct results template content according to the property pane current configuration
     * @returns the template content as a string
     */
    private async _getTemplateContent(): Promise<void> {

        let templateContent = null;

        switch (this.properties.selectedLayout) {
            case ResultsLayoutOption.List:
                templateContent = TemplateService.getListDefaultTemplate();
                break;

            case ResultsLayoutOption.Tiles:
                templateContent = TemplateService.getTilesDefaultTemplate();
                break;

            case ResultsLayoutOption.Custom:

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

    /**
     * Custom handler when a custom property pane field is updated
     * @param propertyPath the name of the updated property
     * @param newValue the new value for this property
     */
    private _onCustomPropertyPaneChange(propertyPath: string, newValue: any): void {

        // Stores the new value in web part properties
        update(this.properties, propertyPath, (): any => { return newValue; });

        // Call the default SPFx handler
        this.onPropertyPaneFieldChanged(propertyPath);

        // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
        // https://github.com/SharePoint/sp-dev-docs/issues/594
        if (!this.disableReactivePropertyChanges) {
            // The render has to be completed before the property pane to refresh to set up the correct property value 
            // so the property pane field will use the correct value for future edit
            this.render();
            this.context.propertyPane.refresh();
        }
    }

    /**
     * Custom handler when the external template file URL
     * @param value the template file URL value
     */
    private async _onTemplateUrlChange(value: string): Promise<String> {

        try {
            // Doesn't raise any error if file is empty (otherwise error message will show on initial load...)
            if (isEmpty(value)) {
                return '';
            }
            // Resolves an error if the file isn't a valid .htm or .html file
            else if (!TemplateService.isValidTemplateFile(value)) {
                return strings.ErrorTemplateExtension;
            }
            // Resolves an error if the file doesn't answer a simple head request
            else {
                await this._templateService.ensureFileResolves(value);
                return '';
            }
        } catch (error) {
            return Text.format(strings.ErrorTemplateResolve, error);
        }
    }

    /**
     * Override the base onInit() implementation to get the persisted properties to initialize data provider.
     */
    protected async onInit(): Promise<void> {

        this._domElement = this.domElement;

        if (Environment.type === EnvironmentType.Local) {
            this._searchService = new MockSearchService();
            this._taxonomyService = new MockTaxonomyService();
            this._templateService = new MockTemplateService(this.context.pageContext.cultureInfo.currentUICultureName);

        } else {

            const lcid = LocalizationHelper.getLocaleId(this.context.pageContext.cultureInfo.currentUICultureName);

            this._searchService = new SearchService(this.context);
            this._taxonomyService = new TaxonomyService(this.context, lcid);
            this._templateService = new TemplateService(this.context.spHttpClient, this.context.pageContext.cultureInfo.currentUICultureName);
        }
        await this._templateService.LoadHandlebarsHelpers(this.properties.useHandlebarsHelpers);

        // Configure search query settings
        this._useResultSource = false;

        // Set the default search results layout
        this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : ResultsLayoutOption.List;

        // Make sure the data source will be plugged in correctly when loaded on the page
        // Depending of the component loading order, some sources may be unavailable at this time so that's why we use an event listener 
        this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._initDynamicDataSource.bind(this));

        return super.onInit();
    }

    protected get disableReactivePropertyChanges(): boolean {
        // Set this to true if you don't want the reactive behavior.
        return false;
    }

    protected get isRenderAsync(): boolean {
        return true;
    }

    protected renderCompleted(): void {
        super.renderCompleted();

        let renderElement = null;
        if (typeof this.properties.useHandlebarsHelpers === 'undefined') {
            this.properties.useHandlebarsHelpers = true;
        }

        const searchContainer: React.ReactElement<ISearchContainerProps> = React.createElement(
            SearchContainer,
            {
                searchDataProvider: this._searchService,
                taxonomyDataProvider: this._taxonomyService,
                queryKeywords: this._queryKeywords,
                maxResultsCount: this.properties.maxResultsCount,
                resultSourceId: this.properties.resultSourceId,
                sortList: this.properties.sortList,
                enableQueryRules: this.properties.enableQueryRules,
                selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g, '').split(',') : [],
                refiners: this._parseRefiners(this.properties.refiners),
                showPaging: this.properties.showPaging,
                showResultsCount: this.properties.showResultsCount,
                showBlank: this.properties.showBlank,
                displayMode: this.displayMode,
                templateService: this._templateService,
                templateContent: this._templateContentToDisplay,
                webPartTitle: this.properties.webPartTitle,
                context: this.context
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

        if ((this.properties.queryKeywords && !this.properties.useSearchBoxQuery) ||
            (this.properties.useSearchBoxQuery && this.properties.dynamicDataSourcePropertyId)) {
            renderElement = searchContainer;
        } else {
            if (this.displayMode === DisplayMode.Edit) {
                renderElement = placeholder;
            } else {
                renderElement = React.createElement('div', null);
            }
        }

        ReactDom.render(renderElement, this._domElement);
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

        return {
            pages: [
                {
                    header: {
                        description: strings.SearchQuerySettingsGroupName
                    },
                    groups: [
                        {
                            groupFields: this._getSearchQueryFields()
                        }
                    ]
                },
                {
                    header: {
                        description: strings.SearchSettingsGroupName
                    },
                    groups: [
                        {
                            groupFields: this._getSearchSettingsFields()
                        }
                    ]
                },
                {
                    header: {
                        description: strings.StylingSettingsGroupName
                    },
                    groups: [
                        {
                            groupFields: this._getStylingFields()
                        }
                    ]
                }
            ]
        };
    }

    protected async loadPropertyPaneResources(): Promise<void> {
        this._propertyPage = await System.import(
            /* webpackChunkName: 'search-property-pane' */
            '../controls/PropertyPaneTextDialog/PropertyPaneTextDialog'
        );
    }

    public async onPropertyPaneFieldChanged(changedProperty: string) {

        if (changedProperty === 'useSearchBoxQuery') {

            if (!this.properties.useSearchBoxQuery) {
                // Reset source settings if we don't use search query
                this.properties.dynamicDataSourceId = undefined;
                this.properties.dynamicDataSourcePropertyId = undefined;
                this.context.dynamicDataProvider.unregisterAvailableSourcesChanged(this._initDynamicDataSource.bind(this));
            }
        }

        // Detect if the layout has been changed to custom...
        if (changedProperty === 'inlineTemplateText') {

            // Automatically switch the option to 'Custom' if a default template has been edited
            // (meaning the user started from a the list or tiles template)
            if (this.properties.inlineTemplateText && this.properties.selectedLayout !== ResultsLayoutOption.Custom) {
                this.properties.selectedLayout = ResultsLayoutOption.Custom;

                // Reset also the template URL
                this.properties.externalTemplateUrl = '';
            }
        }

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

            this.context.dynamicDataProvider.registerPropertyChanged(this.properties.dynamicDataSourceId, this.properties.dynamicDataSourcePropertyId, this.render);

            this._lastSourceId = this.properties.dynamicDataSourceId;
            this._lastPropertyId = this.properties.dynamicDataSourcePropertyId;
        }

        await this._templateService.LoadHandlebarsHelpers(this.properties.useHandlebarsHelpers);
    }

    public async render(): Promise<void> {

        // Configure the provider before the query according to our needs
        this._searchService.resultsCount = this.properties.maxResultsCount;
        this._searchService.queryTemplate = this.properties.queryTemplate;
        this._searchService.resultSourceId = this.properties.resultSourceId;
        this._searchService.sortList = this.properties.sortList;
        this._searchService.enableQueryRules = this.properties.enableQueryRules;

        this._queryKeywords = this.properties.queryKeywords;

        // If a source is selected, use the value from here
        if (this.properties.useSearchBoxQuery) {
            if (this.properties.dynamicDataSourceId && this.properties.dynamicDataSourcePropertyId) {
                this._queryKeywords = this._source ? this._source.getPropertyValue(this.properties.dynamicDataSourcePropertyId) : this._queryKeywords;
            }
        }

        // Determine the template content to display
        // In the case of an external template is selected, the render is done asynchronously waiting for the content to be fetched
        await this._getTemplateContent();

        this.renderCompleted();
    }
}
