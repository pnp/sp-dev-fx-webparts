import * as React                                                                   from 'react';
import * as ReactDom                                                                from 'react-dom';
import * as strings                                                                 from 'contentQueryStrings';
import { Version, Text, Log }                                                       from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IPropertyPaneField }    from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField, IPropertyPaneTextFieldProps }                       from '@microsoft/sp-webpart-base';
import { PropertyPaneChoiceGroup, IPropertyPaneChoiceGroupProps }                   from '@microsoft/sp-webpart-base';
import { PropertyPaneToggle, IPropertyPaneToggleProps }                             from '@microsoft/sp-webpart-base';
import { update, get, isEmpty }                                                     from '@microsoft/sp-lodash-subset';
import { IDropdownOption, IPersonaProps, ITag }                                     from 'office-ui-fabric-react';
import ContentQuery                                                                 from './components/ContentQuery';
import { IContentQueryProps }                                                       from './components/IContentQueryProps';
import { IQuerySettings }                                                           from './components/IQuerySettings';
import { IContentQueryTemplateContext }                                             from './components/IContentQueryTemplateContext';
import { IContentQueryWebPartProps }                                                from './IContentQueryWebPartProps';
import { PropertyPaneAsyncDropdown }                                                from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { PropertyPaneQueryFilterPanel }                                             from '../../controls/PropertyPaneQueryFilterPanel/PropertyPaneQueryFilterPanel';
import { PropertyPaneAsyncChecklist }                                               from '../../controls/PropertyPaneAsyncChecklist/PropertyPaneAsyncChecklist';
import { PropertyPaneTextDialog }                                                   from '../../controls/PropertyPaneTextDialog/PropertyPaneTextDialog';
import { IQueryFilterField }                                                        from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilterField';
import { IChecklistItem }                                                           from '../../controls/PropertyPaneAsyncChecklist/components/AsyncChecklist/IChecklistItem';
import { ContentQueryService }                                                      from '../../common/services/ContentQueryService';
import { IContentQueryService }                                                     from '../../common/services/IContentQueryService';
import { ContentQueryConstants }                                                    from '../../common/constants/ContentQueryConstants';



export default class ContentQueryWebPart extends BaseClientSideWebPart<IContentQueryWebPartProps> {

  private readonly logSource = "ContentQueryWebPart.ts";

  /***************************************************************************
   * Service used to perform REST calls 
   ***************************************************************************/
   private ContentQueryService: IContentQueryService;


  /***************************************************************************
   * Custom ToolPart Property Panes
   ***************************************************************************/
  private siteUrlDropdown: PropertyPaneAsyncDropdown;
  private webUrlDropdown: PropertyPaneAsyncDropdown;
  private listTitleDropdown: PropertyPaneAsyncDropdown;
  private orderByDropdown: PropertyPaneAsyncDropdown;
  private orderByDirectionChoiceGroup: IPropertyPaneField<IPropertyPaneChoiceGroupProps>;
  private limitEnabledToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private itemLimitTextField: IPropertyPaneField<IPropertyPaneTextFieldProps>;
  private recursiveEnabledToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private filtersPanel: PropertyPaneQueryFilterPanel;
  private viewFieldsChecklist: PropertyPaneAsyncChecklist;
  private templateTextDialog: PropertyPaneTextDialog;
  private templateUrlTextField: IPropertyPaneField<IPropertyPaneTextFieldProps>;
  private externalScripts: IPropertyPaneField<IPropertyPaneTextFieldProps>;

  
  /***************************************************************************
   * Returns the WebPart's version
   ***************************************************************************/
  protected get dataVersion(): Version {
    return Version.parse('1.0.11');
  }


  /***************************************************************************
   * Initializes the WebPart
   ***************************************************************************/
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.ContentQueryService = new ContentQueryService(this.context, this.context.spHttpClient);
      this.properties.webUrl = this.properties.siteUrl || this.properties.webUrl ? this.properties.webUrl : this.context.pageContext.web.absoluteUrl.toLocaleLowerCase().trim();
      this.properties.siteUrl = this.properties.siteUrl ? this.properties.siteUrl : this.context.pageContext.site.absoluteUrl.toLowerCase().trim();
      resolve();
    });
  }


  /***************************************************************************
   * Renders the WebPart
   ***************************************************************************/
  public render(): void {
    let querySettings: IQuerySettings = {
      webUrl: this.properties.webUrl,
      listId: this.properties.listId,
      limitEnabled: this.properties.limitEnabled,
      itemLimit: this.properties.itemLimit,
      recursiveEnabled: this.properties.recursiveEnabled,
      orderBy: this.properties.orderBy,
      orderByDirection: this.properties.orderByDirection,
      filters: this.properties.filters,
      viewFields: this.properties.viewFields,
    };
    
    const element: React.ReactElement<IContentQueryProps> = React.createElement(ContentQuery,
      {
        onLoadTemplate: this.loadTemplate.bind(this),
        onLoadTemplateContext: this.loadTemplateContext.bind(this),
        siteUrl: this.properties.siteUrl,
        querySettings: querySettings,
        templateText: this.properties.templateText,
        templateUrl: this.properties.templateUrl,
        wpContext: this.context,
        externalScripts: this.properties.externalScripts ? this.properties.externalScripts.split('\n').filter((script) => { return (script && script.trim() != ''); }) : null,
        strings: strings.contentQueryStrings,
        stateKey: new Date().toString()
      }
    );
    ReactDom.render(element, this.domElement);
  }
  

  /***************************************************************************
   * Loads the toolpart configuration
   ***************************************************************************/
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let firstCascadingLevelDisabled = !this.properties.siteUrl;
    let secondCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl;
    let thirdCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl || !this.properties.listId;

    // Creates a custom PropertyPaneAsyncDropdown for the siteUrl property
    this.siteUrlDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertySiteUrl, {
      label: strings.SiteUrlFieldLabel,
      loadingLabel: strings.SiteUrlFieldLoadingLabel,
      errorLabelFormat: strings.SiteUrlFieldLoadingError,
      loadOptions: this.loadSiteUrlOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.siteUrl || ""
    });

    // Creates a custom PropertyPaneAsyncDropdown for the webUrl property
    this.webUrlDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyWebUrl, {
      label: strings.WebUrlFieldLabel,
      loadingLabel: strings.WebUrlFieldLoadingLabel,
      errorLabelFormat: strings.WebUrlFieldLoadingError,
      loadOptions: this.loadWebUrlOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.webUrl || "",
      disabled: firstCascadingLevelDisabled
    });

    // Creates a custom PropertyPaneAsyncDropdown for the listId property
    this.listTitleDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyListId, {
      label: strings.ListTitleFieldLabel,
      loadingLabel: strings.ListTitleFieldLoadingLabel,
      errorLabelFormat: strings.ListTitleFieldLoadingError,
      loadOptions: this.loadListTitleOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.listId || "",
      disabled: secondCascadingLevelDisabled
    });

    // Creates a custom PropertyPaneAsyncDropdown for the orderBy property
    this.orderByDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyOrderBy, {
      label: strings.OrderByFieldLabel,
      loadingLabel: strings.OrderByFieldLoadingLabel,
      errorLabelFormat: strings.OrderByFieldLoadingError,
      loadOptions: this.loadOrderByOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.orderBy || "",
      disabled: thirdCascadingLevelDisabled
    });

    // Creates a custom PropertyPaneQueryFilterPanel for the filters property
    this.filtersPanel = new PropertyPaneQueryFilterPanel(ContentQueryConstants.propertyFilters, {
      filters: this.properties.filters,
      loadFields: this.loadFilterFields.bind(this),
      onLoadTaxonomyPickerSuggestions: this.loadTaxonomyPickerSuggestions.bind(this),
      onLoadPeoplePickerSuggestions: this.loadPeoplePickerSuggestions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      trimEmptyFiltersOnChange: true,
      disabled: thirdCascadingLevelDisabled,
      strings: strings.queryFilterPanelStrings
    });
    
    // Creates a custom PropertyPaneAsyncChecklist for the viewFields property
    this.viewFieldsChecklist = new PropertyPaneAsyncChecklist(ContentQueryConstants.propertyViewFields, {
      loadItems: this.loadViewFieldsChecklistItems.bind(this),
      checkedItems: this.properties.viewFields,
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      disable: thirdCascadingLevelDisabled,
      strings: strings.viewFieldsChecklistStrings
    });

    // Creates a custom PropertyPaneTextDialog for the templateText property
    this.templateTextDialog = new PropertyPaneTextDialog(ContentQueryConstants.propertyTemplateText, {
      dialogTextFieldValue: this.properties.templateText,
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      disabled: false,
      strings: strings.templateTextStrings
    });

    // Creates a PropertyPaneChoiceGroup for the orderByDirection property
    this.orderByDirectionChoiceGroup = PropertyPaneChoiceGroup(ContentQueryConstants.propertOrderByDirection, {
      options: [
        { text: strings.ShowItemsAscending, key: 'asc', checked: !this.properties.orderByDirection || this.properties.orderByDirection == 'asc', disabled: secondCascadingLevelDisabled },
        { text: strings.ShowItemsDescending, key: 'desc', checked: this.properties.orderByDirection == 'desc', disabled: secondCascadingLevelDisabled }
      ]
    });

    // Creates a PropertyPaneTextField for the templateUrl property
    this.templateUrlTextField = PropertyPaneTextField(ContentQueryConstants.propertyTemplateUrl, {
      label: strings.TemplateUrlFieldLabel,
      placeholder: strings.TemplateUrlPlaceholder,
      deferredValidationTime: 500,
      onGetErrorMessage: this.onTemplateUrlChange.bind(this)
    });

    // Creates a PropertyPaneToggle for the limitEnabled property
    this.limitEnabledToggle = PropertyPaneToggle(ContentQueryConstants.propertyLimitEnabled, {
      label: strings.LimitEnabledFieldLabel,
      offText: 'Disabled',
      onText: 'Enabled',
      checked: this.properties.limitEnabled,
      disabled: thirdCascadingLevelDisabled
    });

    // Creates a PropertyPaneTextField for the itemLimit property
    this.itemLimitTextField = PropertyPaneTextField(ContentQueryConstants.propertyItemLimit, {
      deferredValidationTime: 500,
      placeholder: strings.ItemLimitPlaceholder,
      disabled: !this.properties.limitEnabled || secondCascadingLevelDisabled,
      onGetErrorMessage: this.onItemLimitChange.bind(this)
    });

    // Creates a PropertyPaneToggle for the limitEnabled property
    this.recursiveEnabledToggle = PropertyPaneToggle(ContentQueryConstants.propertyRecursiveEnabled, {
      label: strings.RecursiveEnabledFieldLabel,
      offText: 'Disabled',
      onText: 'Enabled',
      checked: this.properties.recursiveEnabled,
      disabled: thirdCascadingLevelDisabled
    });

    // Creates a PropertyPaneTextField for the externalScripts property
    this.externalScripts = PropertyPaneTextField(ContentQueryConstants.propertyExternalScripts, {
      label: strings.ExternalScriptsLabel,
      deferredValidationTime: 500,
      placeholder: strings.ExternalScriptsPlaceholder,
      multiline: true,
      rows: 5,
      onGetErrorMessage: () => { return ''; }
    });

    return {
      pages: [
        {
          header: { description: strings.SourcePageDescription },
          groups: [
            {
              groupName: strings.SourceGroupName,
              groupFields: [
                this.siteUrlDropdown,
                this.webUrlDropdown,
                this.listTitleDropdown
              ]
            }
          ]
        },
        {
          header: { description: strings.QueryPageDescription },
          groups: [
            {
              groupName: strings.QueryGroupName,
              groupFields: [
                this.orderByDropdown,
                this.orderByDirectionChoiceGroup,
                this.limitEnabledToggle,
                this.itemLimitTextField,
                this.recursiveEnabledToggle,
                this.filtersPanel
              ]
            }
          ]
        },
        {
          header: { description: strings.DisplayPageDescription },
          groups: [
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                this.viewFieldsChecklist,
                this.templateTextDialog,
                this.templateUrlTextField
              ]
            }
          ]
        },
        {
          header: { description: strings.ExternalPageDescription },
          groups: [
            {
              groupName: strings.ExternalGroupName,
              groupFields: [
                this.externalScripts
              ]
            }
          ]
        }
      ]
    };
  }


  /***************************************************************************
   * Loads the HandleBars template from the specified url
   ***************************************************************************/
  private loadTemplate(templateUrl:string): Promise<string> {
    return this.ContentQueryService.getFileContent(templateUrl);
  }


  /***************************************************************************
   * Loads the HandleBars context based on the specified query 
   ***************************************************************************/
  private loadTemplateContext(querySettings:IQuerySettings, callTimeStamp: number): Promise<IContentQueryTemplateContext> {
    return this.ContentQueryService.getTemplateContext(querySettings, callTimeStamp);
  }


  /***************************************************************************
   * Loads the dropdown options for the webUrl property
   ***************************************************************************/
  private loadSiteUrlOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getSiteUrlOptions();
  }


  /***************************************************************************
   * Loads the dropdown options for the webUrl property
   ***************************************************************************/
  private loadWebUrlOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getWebUrlOptions(this.properties.siteUrl);
  }


  /***************************************************************************
   * Loads the dropdown options for the listTitle property
   ***************************************************************************/
  private loadListTitleOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getListTitleOptions(this.properties.webUrl);
  }


  /***************************************************************************
   * Loads the dropdown options for the orderBy property
   ***************************************************************************/
  private loadOrderByOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getOrderByOptions(this.properties.webUrl, this.properties.listId);
  }


  /***************************************************************************
   * Loads the dropdown options for the listTitle property
   ***************************************************************************/
  private loadFilterFields():Promise<IQueryFilterField[]> {
    return this.ContentQueryService.getFilterFields(this.properties.webUrl, this.properties.listId);
  }


  /***************************************************************************
   * Loads the checklist items for the viewFields property
   ***************************************************************************/
  private loadViewFieldsChecklistItems():Promise<IChecklistItem[]> {
    return this.ContentQueryService.getViewFieldsChecklistItems(this.properties.webUrl, this.properties.listId);
  }


  /***************************************************************************
   * Returns the user suggestions based on the user entered picker input
   * @param filterText : The filter specified by the user in the people picker
   * @param currentPersonas : The IPersonaProps already selected in the people picker
   * @param limitResults : The results limit if any
   ***************************************************************************/
  private loadPeoplePickerSuggestions(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number):Promise<IPersonaProps[]> {
    return this.ContentQueryService.getPeoplePickerSuggestions(this.properties.webUrl, filterText, currentPersonas, limitResults);
  }


  /***************************************************************************
   * Returns the taxonomy suggestions based on the user entered picker input
   * @param field : The taxonomy field from which to load the terms from
   * @param filterText : The filter specified by the user in the people picker
   * @param currentPersonas : The IPersonaProps already selected in the people picker
   * @param limitResults : The results limit if any
   ***************************************************************************/
  private loadTaxonomyPickerSuggestions(field: IQueryFilterField, filterText: string, currentTerms: ITag[]):Promise<ITag[]> {
    return this.ContentQueryService.getTaxonomyPickerSuggestions(this.properties.webUrl, this.properties.listId, field, filterText, currentTerms);
  }


  /***************************************************************************
   * When a custom property pane updates
   ***************************************************************************/
  private onCustomPropertyPaneChange(propertyPath: string, newValue: any): void {
    Log.verbose(this.logSource, "WebPart property '" + propertyPath + "' has changed, refreshing WebPart...", this.context.serviceScope);
    let rerenderTemplateTextDialog = false;
    const oldValue = get(this.properties, propertyPath);
    
    // Stores the new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // Resets dependent property panes if needed
    this.resetDependentPropertyPanes(propertyPath);

    // If the viewfields have changed, update the default template text if it hasn't been altered by the user
    if(propertyPath == ContentQueryConstants.propertyViewFields && !this.properties.hasDefaultTemplateBeenUpdated) {
      let generatedTemplate = this.ContentQueryService.generateDefaultTemplate(newValue);
      update(this.properties, ContentQueryConstants.propertyTemplateText, (): any => { return generatedTemplate; });
      this.templateTextDialog.properties.dialogTextFieldValue = generatedTemplate;
      rerenderTemplateTextDialog = true;
    }

    // If the templateText have changed, update the "hasDefaultTemplateBeenUpdated" to true so the WebPart doesn't override the user template after updating view fields
    if(propertyPath == ContentQueryConstants.propertyTemplateText && !this.properties.hasDefaultTemplateBeenUpdated) {
      update(this.properties, ContentQueryConstants.propertyhasDefaultTemplateBeenUpdated, (): any => { return true; });
    }

    // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
    // https://github.com/SharePoint/sp-dev-docs/issues/594
    if (!this.disableReactivePropertyChanges)
      this.render();

    if(rerenderTemplateTextDialog) {
      this.templateTextDialog.render();
    }
  }


  /***************************************************************************
   * Validates the templateUrl property
   ***************************************************************************/
  private onTemplateUrlChange(value: string): Promise<String> {
    Log.verbose(this.logSource, "WebPart property 'templateUrl' has changed, refreshing WebPart...", this.context.serviceScope);

    return new Promise<string>((resolve, reject) => { 

      // Doesn't raise any error if file is empty (otherwise error message will show on initial load...)
      if(isEmpty(value)) {
        resolve('');
      }
      // Resolves an error if the file isn't a valid .htm or .html file
      else if(!this.ContentQueryService.isValidTemplateFile(value)) {
        resolve(strings.ErrorTemplateExtension);
      }
      // Resolves an error if the file doesn't answer a simple head request
      else {  
        this.ContentQueryService.ensureFileResolves(value).then((isFileResolving:boolean) => {
          resolve('');
        })
        .catch((error) => {
          resolve(Text.format(strings.ErrorTemplateResolve, error));
        });    
      }
    });
  }
  

  /***************************************************************************
   * Validates the itemLimit property
   ***************************************************************************/
  private onItemLimitChange(value: string): Promise<String> {
    Log.verbose(this.logSource, "WebPart property 'itemLimit' has changed, refreshing WebPart...", this.context.serviceScope);

    return new Promise<string>((resolve, reject) => {  
      // Resolves an error if the file isn't a valid number between 1 to 999
      let parsedValue = parseInt(value);
      let isNumeric = !isNaN(parsedValue) && isFinite(parsedValue);
      let isValid = (isNumeric && parsedValue >= 1 && parsedValue <= 999) || isEmpty(value);
      resolve(!isValid ? strings.ErrorItemLimit : '');
    });
  }


  /***************************************************************************
   * Resets dependent property panes if needed
   ***************************************************************************/
  private resetDependentPropertyPanes(propertyPath: string): void {
    if(propertyPath == ContentQueryConstants.propertySiteUrl) {
      this.resetWebUrlPropertyPane();
      this.resetListTitlePropertyPane();
      this.resetOrderByPropertyPane();
      this.resetFiltersPropertyPane();
      this.resetViewFieldsPropertyPane();
    }
    else if(propertyPath == ContentQueryConstants.propertyWebUrl) {
      this.resetListTitlePropertyPane();
      this.resetOrderByPropertyPane();
      this.resetFiltersPropertyPane();
      this.resetViewFieldsPropertyPane();
    }
    else if (propertyPath == ContentQueryConstants.propertyListId) {
      this.resetOrderByPropertyPane();
      this.resetFiltersPropertyPane();
      this.resetViewFieldsPropertyPane();
    }
  }


  /***************************************************************************
   * Resets the List Title property pane and re-renders it
   ***************************************************************************/
  private resetWebUrlPropertyPane() {
    Log.verbose(this.logSource, "Resetting 'webUrl' property...", this.context.serviceScope);

    this.properties.webUrl = "";
    this.ContentQueryService.clearCachedWebUrlOptions();
    update(this.properties, ContentQueryConstants.propertyWebUrl, (): any => { return this.properties.webUrl; });
    this.webUrlDropdown.properties.selectedKey = "";
    this.webUrlDropdown.properties.disabled = isEmpty(this.properties.siteUrl);
    this.webUrlDropdown.render();
  }


  /***************************************************************************
   * Resets the List Title property pane and re-renders it
   ***************************************************************************/
  private resetListTitlePropertyPane() {
    Log.verbose(this.logSource, "Resetting 'listTitle' property...", this.context.serviceScope);

    this.properties.listId = null;
    this.ContentQueryService.clearCachedListTitleOptions();
    update(this.properties, ContentQueryConstants.propertyListId, (): any => { return this.properties.listId; });
    this.listTitleDropdown.properties.selectedKey = "";
    this.listTitleDropdown.properties.disabled = isEmpty(this.properties.webUrl);
    this.listTitleDropdown.render();
  }


  /***************************************************************************
   * Resets the Filters property pane and re-renders it
   ***************************************************************************/
  private resetOrderByPropertyPane() {
    Log.verbose(this.logSource, "Resetting 'orderBy' property...", this.context.serviceScope);

    this.properties.orderBy = null;
    this.ContentQueryService.clearCachedOrderByOptions();
    update(this.properties, ContentQueryConstants.propertyOrderBy, (): any => { return this.properties.orderBy; });
    this.orderByDropdown.properties.selectedKey = "";
    this.orderByDropdown.properties.disabled = isEmpty(this.properties.webUrl) || isEmpty(this.properties.listId);
    this.orderByDropdown.render();
  }


  /***************************************************************************
   * Resets the Filters property pane and re-renders it
   ***************************************************************************/
  private resetFiltersPropertyPane() {
    Log.verbose(this.logSource, "Resetting 'filters' property...", this.context.serviceScope);

    this.properties.filters = null;
    this.ContentQueryService.clearCachedFilterFields();
    update(this.properties, ContentQueryConstants.propertyFilters, (): any => { return this.properties.filters; });
    this.filtersPanel.properties.filters = null;
    this.filtersPanel.properties.disabled = isEmpty(this.properties.webUrl) || isEmpty(this.properties.listId);
    this.filtersPanel.render();
  }


  /***************************************************************************
   * Resets the View Fields property pane and re-renders it
   ***************************************************************************/
  private resetViewFieldsPropertyPane() {
    Log.verbose(this.logSource, "Resetting 'viewFields' property...", this.context.serviceScope);

    this.properties.viewFields = null;
    this.ContentQueryService.clearCachedViewFields();
    update(this.properties, ContentQueryConstants.propertyViewFields, (): any => { return this.properties.viewFields; });
    this.viewFieldsChecklist.properties.checkedItems = null;
    this.viewFieldsChecklist.properties.disable = isEmpty(this.properties.webUrl) || isEmpty(this.properties.listId);
    this.viewFieldsChecklist.render();
  }
}
