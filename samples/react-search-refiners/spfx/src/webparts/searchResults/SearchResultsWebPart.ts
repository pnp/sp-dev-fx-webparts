import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Text, Environment, EnvironmentType, DisplayMode, Log } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartPropertiesMetadata,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth,
  IPropertyPaneConditionalGroup,
  IPropertyPaneField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,

} from '@microsoft/sp-webpart-base';
import * as strings from 'SearchResultsWebPartStrings';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import { ISearchResultsWebPartProps } from './ISearchResultsWebPartProps';
import BaseTemplateService from '../../services/TemplateService/BaseTemplateService';
import ISearchService from '../../services/SearchService/ISearchService';
import ITaxonomyService from '../../services/TaxonomyService/ITaxonomyService';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import TemplateService from '../../services/TemplateService/TemplateService';
import { update, isEmpty } from '@microsoft/sp-lodash-subset';
import MockSearchService from '../../services/SearchService/MockSearchService';
import MockTemplateService from '../../services/TemplateService/MockTemplateService';
import SearchService from '../../services/SearchService/SearchService';
import TaxonomyService from '../../services/TaxonomyService/TaxonomyService';
import MockTaxonomyService from '../../services/TaxonomyService/MockTaxonomyService';
import ISearchResultsContainerProps from './components/SearchResultsContainer/ISearchResultsContainerProps';
import { Placeholder, IPlaceholderProps } from '@pnp/spfx-controls-react/lib/Placeholder';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

const LOG_SOURCE: string = '[SearchResultsWebPart_{0}]';

export default class SearchResultsWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

    private _searchService: ISearchService;
    private _taxonomyService: ITaxonomyService;
    private _templateService: BaseTemplateService;
    private _useResultSource: boolean;
    private _propertyPage = null;

    /**
     * The template to display at render time
     */
    private _templateContentToDisplay: string;

    constructor() {
        super();
        this._parseFieldListString = this._parseFieldListString.bind(this);

    }

    public async render(): Promise<void> {
        // Configure the provider before the query according to our needs
        this._searchService.resultsCount = this.properties.maxResultsCount;
        this._searchService.queryTemplate = await this.replaceQueryVariables(this.properties.queryTemplate);
        this._searchService.resultSourceId = this.properties.resultSourceId;
        this._searchService.sortList = this.properties.sortList;
        this._searchService.enableQueryRules = this.properties.enableQueryRules;

        // Determine the template content to display
        // In the case of an external template is selected, the render is done asynchronously waiting for the content to be fetched
        await this._getTemplateContent();

        this.renderCompleted();
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

        let queryKeywords;

        let renderElement = null;
        if (typeof this.properties.useHandlebarsHelpers === 'undefined') {
            this.properties.useHandlebarsHelpers = true;
        }

        // Get value from data source
        const dataSourceValue = this.properties.queryKeywords.tryGetValue();

        if (typeof(dataSourceValue) !== 'string') {
            this.properties.queryKeywords.setValue('');
            this.context.propertyPane.refresh();
        }

        if (!dataSourceValue) {
            queryKeywords = this.properties.defaultSearchQuery;
        } else {
            queryKeywords = dataSourceValue;
        }

        const isValueConnected = !!this.properties.queryKeywords.tryGetSource();

        const searchContainer: React.ReactElement<ISearchResultsContainerProps> = React.createElement(
            SearchResultsContainer,
            {
                searchService: this._searchService,
                taxonomyService: this._taxonomyService,
                queryKeywords: queryKeywords,
                maxResultsCount: this.properties.maxResultsCount,
                resultSourceId: this.properties.resultSourceId,
                sortList: this.properties.sortList,
                enableQueryRules: this.properties.enableQueryRules,
                selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g, '').split(',') : [],
                refiners: this._parseFieldListString(this.properties.refiners),
                sortableFields: this._parseFieldListString(this.properties.sortableFields),
                showPaging: this.properties.showPaging,
                showResultsCount: this.properties.showResultsCount,
                showBlank: this.properties.showBlank,
                displayMode: this.displayMode,
                templateService: this._templateService,
                templateContent: this._templateContentToDisplay,
                webPartTitle: this.properties.webPartTitle,
                context: this.context
            } as ISearchResultsContainerProps
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

        if (isValueConnected && !this.properties.useDefaultSearchQuery ||
            isValueConnected && this.properties.useDefaultSearchQuery && this.properties.defaultSearchQuery || 
            !isValueConnected && !isEmpty(queryKeywords)) {
            renderElement = searchContainer;
        } else {
            if (this.displayMode === DisplayMode.Edit) {
                renderElement = placeholder;
            } else {
                renderElement = React.createElement('div', null);
            }
        }

        ReactDom.render(renderElement, this.domElement);
    }
    
    protected async onInit(): Promise<void> {

        if (Environment.type === EnvironmentType.Local) {
            this._searchService = new MockSearchService();
            this._taxonomyService = new MockTaxonomyService();
            this._templateService = new MockTemplateService(this.context.pageContext.cultureInfo.currentUICultureName);

        } else {

            this._searchService = new SearchService(this.context);
            this._taxonomyService = new TaxonomyService(this.context.pageContext.site.absoluteUrl);
            this._templateService = new TemplateService(this.context.spHttpClient, this.context.pageContext.cultureInfo.currentUICultureName);
        }

        await this._templateService.LoadHandlebarsHelpers(this.properties.useHandlebarsHelpers);

        // Configure search query settings
        this._useResultSource = false;


        // Set the default search results layout
        this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : ResultsLayoutOption.List;

        return super.onInit();
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
                    header: {
                        description: strings.SearchQuerySettingsGroupName
                    },
                    groups: [
                        this._getSearchQueryFields()
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

    protected get propertiesMetadata(): IWebPartPropertiesMetadata {
        return {
            'queryKeywords': {
                dynamicPropertyType: 'string'
            }
        };
    }
    
    protected async loadPropertyPaneResources(): Promise<void> {
        this._propertyPage = await import(
            /* webpackChunkName: 'search-property-pane' */
            '../controls/PropertyPaneTextDialog/PropertyPaneTextDialog'
        );
    }

    protected async onPropertyPaneFieldChanged(propertyPath: string) {

        if (!this.properties.useDefaultSearchQuery) {
            this.properties.defaultSearchQuery = '';
        }

        if (propertyPath === 'selectedLayout') {
            // Refresh setting the right template for the property pane
            await this._getTemplateContent();
        }

        // Detect if the layout has been changed to custom...
        if (propertyPath === 'inlineTemplateText') {

            // Automatically switch the option to 'Custom' if a default template has been edited
            // (meaning the user started from a the list or tiles template)
            if (this.properties.inlineTemplateText && this.properties.selectedLayout !== ResultsLayoutOption.Custom) {
                this.properties.selectedLayout = ResultsLayoutOption.Custom;

                // Reset also the template URL
                this.properties.externalTemplateUrl = '';
            }
        }

        await this._templateService.LoadHandlebarsHelpers(this.properties.useHandlebarsHelpers);
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
     * Parses a list of Fields from the property pane value by extracting the managed property and its label.
     * @param rawValue the raw value of the refiner
     */
    private _parseFieldListString(rawValue: string): { [key: string]: string } {

        let returnValues = {};
        if(!rawValue) { return returnValues; }

        // Get each configuration
        let refinerKeyValuePair = rawValue.split(',');

        if (refinerKeyValuePair.length > 0) {
            refinerKeyValuePair.map((e) => {

                const refinerValues = e.split(':');
                switch (refinerValues.length) {
                    case 1:
                        // Take the same name as the refiner managed property
                        returnValues[refinerValues[0]] = refinerValues[0];
                        break;

                    case 2:
                        // Trim quotes if present
                        returnValues[refinerValues[0]] = refinerValues[1].replace(/^'(.*)'$/, '$1');
                        break;
                }
            });
        }

        return returnValues;
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

    private async replaceQueryVariables(queryTemplate: string) {
        const pagePropsVariables = /\{(?:Page)\.(.*?)\}/gi;
        let reQueryTemplate = queryTemplate;
        let match = pagePropsVariables.exec(reQueryTemplate);
        let item = null;

        if (match != null) {
            let url = this.context.pageContext.web.absoluteUrl + `/_api/web/GetList(@v1)/RenderExtendedListFormData(itemId=${this.context.pageContext.listItem.id},formId='viewform',mode='2',options=7)?@v1='${this.context.pageContext.list.serverRelativeUrl}'`;
            var client = this.context.spHttpClient;
            try {
                const response: SPHttpClientResponse = await client.post(url, SPHttpClient.configurations.v1, {});
                if (response.ok) {
                    let result = await response.json();
                    let itemRow = JSON.parse(result.value);
                    item = itemRow.Data.Row[0];
                }
                else {
                    throw response.statusText;
                }
            } catch (error) {
                Log.error(Text.format(LOG_SOURCE, "RenderExtendedListFormData"), error);
            }

            while (match !== null && item != null) {
                // matched variable
                let pageProp = match[1];
                let itemProp;
                if (pageProp.indexOf(".Label") !== -1 || pageProp.indexOf(".TermID") !== -1) {
                    let term = pageProp.split(".");
                    itemProp = item[term[0]][0][term[1]];
                } else {
                    itemProp = item[pageProp];
                }
                if (itemProp.indexOf(' ') !== -1) {
                    // add quotes to multi term values
                    itemProp = `"${itemProp}"`;
                }
                queryTemplate = queryTemplate.replace(match[0], itemProp);
                match = pagePropsVariables.exec(reQueryTemplate);
            }
        }


        const currentDate = /\{CurrentDate\}/gi;
        const currentMonth = /\{CurrentMonth\}/gi;
        const currentYear = /\{CurrentYear\}/gi;

        const d = new Date();
        queryTemplate = queryTemplate.replace(currentDate, d.getDate().toString());
        queryTemplate = queryTemplate.replace(currentMonth, (d.getMonth()+1).toString());
        queryTemplate = queryTemplate.replace(currentYear, d.getFullYear().toString());

        return queryTemplate;
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
                label: strings.Sort.SortList,
                description: strings.Sort.SortListDescription,
                multiline: false,
                resizable: true,
                value: this.properties.sortList,
                deferredValidationTime: 300
            }),
            PropertyPaneTextField('sortableFields', {
                label: strings.SortableFieldsLabel,
                description: strings.SortableFieldsDescription,
                multiline: true,
                resizable: true,
                value: this.properties.sortableFields,
                deferredValidationTime: 300,
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
            PropertyPaneSlider('maxResultsCount', {
                label: strings.MaxResultsCount,
                max: 50,
                min: 1,
                showValue: true,
                step: 1,
                value: 50,
            }),
        ];

        return searchSettingsFields;
    }

    /**
     * Determines the group fields for the search query options inside the property pane
     */
    private _getSearchQueryFields(): IPropertyPaneConditionalGroup {

        let defaultSearchQueryFields: IPropertyPaneField<any>[] = [];

        if (!!this.properties.queryKeywords.tryGetSource()) {
            defaultSearchQueryFields.push(
                PropertyPaneCheckbox('useDefaultSearchQuery', {
                    text: strings.UseDefaultSearchQueryKeywordsFieldLabel
                })
            );
        }

        if (this.properties.useDefaultSearchQuery) {
            defaultSearchQueryFields.push(
                PropertyPaneTextField('defaultSearchQuery', {
                    label: strings.DefaultSearchQueryKeywordsFieldLabel,
                    description: strings.DefaultSearchQueryKeywordsFieldDescription,
                    multiline: true,
                    resizable: true,
                    placeholder: strings.SearchQueryPlaceHolderText,
                    onGetErrorMessage: this._validateEmptyField.bind(this),
                    deferredValidationTime: 500
                })
            );
        }

        return {
            primaryGroup: {
              groupFields: [
                    PropertyPaneTextField('queryKeywords', {
                        label: strings.SearchQueryKeywordsFieldLabel,
                        description: strings.SearchQueryKeywordsFieldDescription,
                        multiline: true,
                        resizable: true,
                        placeholder: strings.SearchQueryPlaceHolderText,
                        onGetErrorMessage: this._validateEmptyField.bind(this),
                        deferredValidationTime: 500
                    })
                ]
            },
            secondaryGroup: {
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: strings.SearchQueryKeywordsFieldLabel,
                
                  fields: [
                    PropertyPaneDynamicField('queryKeywords', {
                        label: strings.SearchQueryKeywordsFieldLabel
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Source,
                  },
                }),                
              ].concat(defaultSearchQueryFields)
            },
            // Show the secondary group only if the web part has been
            // connected to a dynamic data source
            showSecondaryGroup: !!this.properties.queryKeywords.tryGetSource(),
            onShowPrimaryGroup: () => {

                // Reset dynamic data fields related values to be consistent
                this.properties.useDefaultSearchQuery = false;
                this.properties.defaultSearchQuery = '';
                this.properties.queryKeywords.setValue('');
                this.render();
            }
          } as IPropertyPaneConditionalGroup;
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
            })
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
}
