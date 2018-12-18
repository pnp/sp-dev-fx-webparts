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
  PropertyPaneHorizontalRule,
} from '@microsoft/sp-webpart-base';
import * as strings from 'SearchResultsWebPartStrings';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import { ISearchResultsWebPartProps } from './ISearchResultsWebPartProps';
import BaseTemplateService from '../../services/TemplateService/BaseTemplateService';
import ISearchService from '../../services/SearchService/ISearchService';
import ITaxonomyService from '../../services/TaxonomyService/ITaxonomyService';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import TemplateService from '../../services/TemplateService/TemplateService';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import MockSearchService from '../../services/SearchService/MockSearchService';
import MockTemplateService from '../../services/TemplateService/MockTemplateService';
import SearchService from '../../services/SearchService/SearchService';
import TaxonomyService from '../../services/TaxonomyService/TaxonomyService';
import MockTaxonomyService from '../../services/TaxonomyService/MockTaxonomyService';
import ISearchResultsContainerProps from './components/SearchResultsContainer/ISearchResultsContainerProps';
import { Placeholder, IPlaceholderProps } from '@pnp/spfx-controls-react/lib/Placeholder';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { SortDirection, Sort } from '@pnp/sp';
import { ISortFieldConfiguration, ISortFieldDirection } from '../../models/ISortFieldConfiguration';
import { ResultTypeOperator } from '../../models/ISearchResultType';

const LOG_SOURCE: string = '[SearchResultsWebPart_{0}]';

export default class SearchResultsWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

    private _searchService: ISearchService;
    private _taxonomyService: ITaxonomyService;
    private _templateService: BaseTemplateService;
    private _textDialogComponent = null;
    private _propertyFieldCodeEditor = null;
    private _propertyFieldCodeEditorLanguages = null;

    /**
     * The template to display at render time
     */
    private _templateContentToDisplay: string;

    public constructor() {
        super();
        this._templateContentToDisplay = '';
    }

    public async render(): Promise<void> {
        // Configure the provider before the query according to our needs
        this._searchService.resultsCount = this.properties.maxResultsCount;
        this._searchService.queryTemplate = await this.replaceQueryVariables(this.properties.queryTemplate);
        this._searchService.resultSourceId = this.properties.resultSourceId;
        this._searchService.sortList = this._convertToSortList(this.properties.sortList);
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
        let dataSourceValue;

        let source = this.properties.queryKeywords.tryGetSource();

        // Try to get the source if a source id is present
        if (!source && this.properties.sourceId) {
            source = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceId);

            if (source && this.properties.propertyId) {
                dataSourceValue = source.getPropertyValue(this.properties.propertyId)[this.properties.propertyPath];
            }

        } else {
            dataSourceValue = this.properties.queryKeywords.tryGetValue();
        }
        
        if (typeof(dataSourceValue) !== 'string') {
            dataSourceValue = '';
            this.context.propertyPane.refresh();
        }
        
        if (!dataSourceValue) {
            queryKeywords = this.properties.defaultSearchQuery;
        } else {
            queryKeywords = dataSourceValue;
        }

        const isValueConnected = !!source; 

        const searchContainer: React.ReactElement<ISearchResultsContainerProps> = React.createElement(
            SearchResultsContainer,
            {
                searchService: this._searchService,
                taxonomyService: this._taxonomyService,
                queryKeywords: queryKeywords,
                maxResultsCount: this.properties.maxResultsCount,
                resultSourceId: this.properties.resultSourceId,
                sortList: this._convertToSortList(this.properties.sortList),
                enableQueryRules: this.properties.enableQueryRules,
                selectedProperties: this.properties.selectedProperties ? this.properties.selectedProperties.replace(/\s|,+$/g, '').split(',') : [],
                refiners: this.properties.refiners,
                sortableFields: this.properties.sortableFields,
                showPaging: this.properties.showPaging,
                showResultsCount: this.properties.showResultsCount,
                showBlank: this.properties.showBlank,
                displayMode: this.displayMode,
                templateService: this._templateService,
                templateContent: this._templateContentToDisplay,
                webPartTitle: this.properties.webPartTitle,
                context: this.context,
                resultTypes: this.properties.resultTypes
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

        this.initializeRequiredProperties();

        if (Environment.type === EnvironmentType.Local) {
            this._searchService = new MockSearchService();
            this._taxonomyService = new MockTaxonomyService();
            this._templateService = new MockTemplateService(this.context.pageContext.cultureInfo.currentUICultureName);

        } else {

            this._searchService = new SearchService(this.context);
            this._taxonomyService = new TaxonomyService(this.context.pageContext.site.absoluteUrl);
            this._templateService = new TemplateService(this.context.spHttpClient, this.context.pageContext.cultureInfo.currentUICultureName);
        }

        if (this.properties.sourceId) {
            // Needed to retrieve manually the value for the dynamic property at render time. See the associated SPFx bug
            // https://github.com/SharePoint/sp-dev-docs/issues/2985
            this.context.dynamicDataProvider.registerSourceChanged(this.properties.sourceId, this.render);
        } 

        // Set the default search results layout
        this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : ResultsLayoutOption.List;

        return super.onInit();
    }

    private _convertToSortList(sortList: ISortFieldConfiguration[]): Sort[] {
        return sortList.map(e => {
            
            let direction;

            switch (e.sortDirection) {
                case ISortFieldDirection.Ascending:
                    direction = SortDirection.Ascending;
                    break;

                case ISortFieldDirection.Descending:
                    direction = SortDirection.Descending;
                    break;

                default:
                    direction = SortDirection.Ascending;
                    break;
            }

            return {
                Property: e.sortField,
                Direction: direction
            } as Sort;
        });
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    /**
     * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
     */
    private initializeRequiredProperties() {

        this.properties.queryTemplate = this.properties.queryTemplate ? this.properties.queryTemplate : "{searchTerms} Path:{Site}";
        this.properties.refiners = Array.isArray(this.properties.refiners) ? this.properties.refiners : [
                                                                                                            {
                                                                                                                refinerName: "Created",
                                                                                                                displayValue: "Created Date"
                                                                                                            },
                                                                                                            {
                                                                                                                refinerName: "Size",
                                                                                                                displayValue: "Size of the file"
                                                                                                            }
                                                                                                        ];
        this.properties.sortList = Array.isArray(this.properties.sortList) ? this.properties.sortList : [
                                                                                                            {
                                                                                                                sortField: "Created",
                                                                                                                sortDirection: ISortFieldDirection.Ascending
                                                                                                            },
                                                                                                            {
                                                                                                                sortField: "Size",
                                                                                                                sortDirection: ISortFieldDirection.Descending
                                                                                                            }
                                                                                                        ];
        this.properties.sortableFields = Array.isArray(this.properties.sortableFields) ? this.properties.sortableFields : [];                                                                        
        this.properties.selectedProperties = this.properties.selectedProperties ? this.properties.selectedProperties : "Title,Path,Created,Filename,SiteLogo,PreviewUrl,PictureThumbnailURL,ServerRedirectedPreviewURL,ServerRedirectedURL,HitHighlightedSummary,FileType,contentclass,ServerRedirectedEmbedURL,DefaultEncodingURL";
        this.properties.maxResultsCount = this.properties.maxResultsCount ? this.properties.maxResultsCount : 10;
        this.properties.resultTypes = Array.isArray(this.properties.resultTypes) ? this.properties.resultTypes : [];
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

        // Code editor component for result types
        this._textDialogComponent = await import(
            /* webpackChunkName: 'search-property-pane' */
            '../controls/TextDialog'
        );

        // tslint:disable-next-line:no-shadowed-variable
        const { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } = await import (
            /* webpackChunkName: 'search-property-pane' */
            '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor'
          );

        this._propertyFieldCodeEditor = PropertyFieldCodeEditor;
        this._propertyFieldCodeEditorLanguages = PropertyFieldCodeEditorLanguages;
    }

    protected async onPropertyPaneFieldChanged(propertyPath: string) {

        if (!this.properties.useDefaultSearchQuery) {
            this.properties.defaultSearchQuery = '';
        }

        if (propertyPath === 'selectedLayout') {
            // Refresh setting the right template for the property pane
            await this._getTemplateContent();

            this.context.propertyPane.refresh();
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
    }

    protected async onPropertyPaneConfigurationStart() {
        await this.loadPropertyPaneResources();
    }

    protected onBeforeSerialize() {
        this._saveDataSourceInfo();
        super.onBeforeSerialize();
    }

    /**
    * Save the useful information for the connected data source. 
    * They will be used to get the value of the dynamic property if this one fails.
    */
    private _saveDataSourceInfo() {

        if (this.properties.queryKeywords.reference) {
            this.properties.sourceId = this.properties.queryKeywords["_reference"]._sourceId;
            this.properties.propertyId = this.properties.queryKeywords["_reference"]._property;
            this.properties.propertyPath = this.properties.queryKeywords["_reference"]._propertyPath;
        } else {
            this.properties.sourceId = null;
            this.properties.propertyId = null;
            this.properties.propertyPath = null;
        }
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
                return strings.InvalidResultSourceIdMessage;
            }
        }

        return '';
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

        // Register result types inside the template      
        this._templateService.registerResultTypes(this.properties.resultTypes);

        this._templateContentToDisplay = templateContent;
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
                    
                    // Handle multi or single values
                    if (item[term[0]].length > 0) {
                        itemProp = item[term[0]].map(e => { return e[term[1]]; }).join(',');                 
                    } else {
                        itemProp = item[term[0]][term[1]];   
                    }
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
                deferredValidationTime: 300
            }),
            PropertyPaneTextField('resultSourceId', {
                label: strings.ResultSourceIdLabel,
                multiline: false,
                onGetErrorMessage: this.validateSourceId.bind(this),
                deferredValidationTime: 300
            }),
            PropertyFieldCollectionData('sortList', {
                manageBtnLabel: strings.Sort.EditSortLabel,
                key: 'sortList',
                panelHeader: strings.Sort.EditSortLabel,
                panelDescription: strings.Sort.SortListDescription,
                label: strings.Sort.SortPropertyPaneFieldLabel,
                value: this.properties.sortList,
                fields: [
                    {
                        id: 'sortField',
                        title: "Field name",
                        type: CustomCollectionFieldType.string,
                        required: true,
                        placeholder: '\"Created\", \"Size\", etc.'
                    },
                    {
                        id: 'sortDirection',
                        title: "Direction",
                        type: CustomCollectionFieldType.dropdown,
                        required: true,
                        options: [
                            {
                                key: ISortFieldDirection.Ascending,
                                text: strings.Sort.SortDirectionAscendingLabel
                            },
                            {
                                key: ISortFieldDirection.Descending,
                                text: strings.Sort.SortDirectionDescendingLabel
                            }
                        ]
                    }
                ]
            }),
            PropertyFieldCollectionData('sortableFields', {
                manageBtnLabel: strings.Sort.EditSortableFieldsLabel,
                key: 'sortableFields',
                panelHeader: strings.Sort.EditSortableFieldsLabel,
                panelDescription: strings.Sort.SortableFieldsDescription,
                label: strings.Sort.SortableFieldsPropertyPaneField,
                value: this.properties.sortableFields,
                fields: [
                    {
                        id: 'sortField',
                        title: strings.Sort.SortableFieldManagedPropertyField,
                        type: CustomCollectionFieldType.string,
                        placeholder: '\"Created\", \"Size\", etc.',
                        required: true
                    },
                    {
                        id: 'displayValue',
                        title: strings.Sort.SortableFieldDisplayValueField,
                        type: CustomCollectionFieldType.string
                    }
                ]
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
            PropertyFieldCollectionData('refiners', {
                manageBtnLabel: strings.Refiners.EditRefinersLabel,
                key: 'refiners',
                panelHeader: strings.Refiners.EditRefinersLabel,
                panelDescription: strings.Refiners.RefinersFieldDescription,
                label: strings.Refiners.RefinersFieldLabel,
                value: this.properties.refiners,
                fields: [
                    {
                        id: 'refinerName',
                        title: strings.Refiners.RefinerManagedPropertyField,
                        type: CustomCollectionFieldType.string,
                        placeholder: '\"RefinableStringXXX\", etc.'
                    },
                    {
                        id: 'displayValue',
                        title: strings.Refiners.RefinerDisplayValueField,
                        type: CustomCollectionFieldType.string
                    }
                ]
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

        let dialogTextFieldValue;

        switch (this.properties.selectedLayout) {
            case ResultsLayoutOption.List:
                dialogTextFieldValue = BaseTemplateService.getDefaultResultTypeListItem();
                break;

            case ResultsLayoutOption.Tiles:
                dialogTextFieldValue = BaseTemplateService.getDefaultResultTypeTileItem();    
                break;

            default:
                dialogTextFieldValue = BaseTemplateService.getDefaultResultTypeCustomItem();
                break;
        }

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
            PropertyPaneHorizontalRule(),
            PropertyPaneChoiceGroup('selectedLayout', {
                label: 'Results layout',
                options: layoutOptions
            }),
            this._propertyFieldCodeEditor('inlineTemplateText', {
                label: strings.DialogButtonLabel,
                panelTitle: strings.DialogTitle,
                initialValue: this._templateContentToDisplay,
                deferredValidationTime: 500,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: !canEditTemplate,
                key: 'inlineTemplateTextCodeEditor',
                language: this._propertyFieldCodeEditorLanguages.Handlebars
            }),
            PropertyFieldCollectionData('resultTypes', {
                manageBtnLabel: strings.ResultTypes.EditResultTypesLabel,
                key: 'resultTypes',
                panelHeader: strings.ResultTypes.EditResultTypesLabel,
                panelDescription: strings.ResultTypes.ResultTypesDescription,
                enableSorting: true,
                label: strings.ResultTypes.ResultTypeslabel,
                value: this.properties.resultTypes,
                fields: [
                    {
                        id: 'property',
                        title: strings.ResultTypes.ConditionPropertyLabel,
                        type: CustomCollectionFieldType.string,
                        required: true,
                    },
                    {
                        id: 'operator',
                        title: strings.ResultTypes.CondtionOperatorValue,
                        type: CustomCollectionFieldType.dropdown,
                        defaultValue: ResultTypeOperator.Equal,
                        required: true,
                        options: [
                            {
                                key: ResultTypeOperator.Equal,
                                text: strings.ResultTypes.EqualOperator
                            },
                            {
                                key: ResultTypeOperator.Contains,
                                text: strings.ResultTypes.ContainsOperator
                            },
                            {
                                key: ResultTypeOperator.StartsWith,
                                text: strings.ResultTypes.StartsWithOperator
                            },
                            {
                                key: ResultTypeOperator.NotNull,
                                text: strings.ResultTypes.NotNullOperator
                            },
                            {
                                key: ResultTypeOperator.GreaterOrEqual,
                                text: strings.ResultTypes.GreaterOrEqualOperator
                            },
                            {
                                key: ResultTypeOperator.GreaterThan,
                                text: strings.ResultTypes.GreaterThanOperator
                            },
                            {
                                key: ResultTypeOperator.LessOrEqual,
                                text: strings.ResultTypes.LessOrEqualOperator
                            },
                            {
                                key: ResultTypeOperator.LessThan,
                                text: strings.ResultTypes.LessThanOperator
                            }
                        ]
                    },
                    {
                        id: 'value',
                        title: strings.ResultTypes.ConditionValueLabel,
                        type: CustomCollectionFieldType.string,
                        required: false,
                    },
                    {
                        id: "inlineTemplateContent",
                        title: "Inline template",
                        type: CustomCollectionFieldType.custom,
                        onCustomRender: (field, value, onUpdate) => {
                          return (
                            React.createElement("div", null,
                              React.createElement(this._textDialogComponent.TextDialog, { 
                                    language: this._propertyFieldCodeEditorLanguages.Handlebars,
                                    dialogTextFieldValue: value ? value : dialogTextFieldValue,
                                    onChanged: (fieldValue) => onUpdate(field.id, fieldValue),
                                    strings: {
                                        cancelButtonText: strings.CancelButtonText,
                                        dialogButtonText: strings.DialogButtonText,
                                        dialogTitle: strings.DialogTitle,
                                        saveButtonText: strings.SaveButtonText
                                    }
                                })
                            )
                          );
                        }
                    },
                    {
                        id: 'externalTemplateUrl',
                        title: strings.ResultTypes.ExternalUrlLabel,
                        type: CustomCollectionFieldType.url,
                        onGetErrorMessage: this._onTemplateUrlChange.bind(this),
                        placeholder: 'https://mysite/Documents/external.html'
                    },
                ]
            })
        ];

        // Only show the template external URL for 'Custom' option
        if (this.properties.selectedLayout === ResultsLayoutOption.Custom) {
            stylingFields.splice(6, 0, PropertyPaneTextField('externalTemplateUrl', {
                label: strings.TemplateUrlFieldLabel,
                placeholder: strings.TemplateUrlPlaceholder,
                deferredValidationTime: 500,
                onGetErrorMessage: this._onTemplateUrlChange.bind(this)
            }));
        }

        return stylingFields;
    }
}
