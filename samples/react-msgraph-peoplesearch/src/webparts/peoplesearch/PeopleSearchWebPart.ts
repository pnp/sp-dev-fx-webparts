import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { isEqual } from '@microsoft/sp-lodash-subset';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  IPropertyPaneField,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
  IPropertyPaneGroup,
  IPropertyPaneConditionalGroup,
  DynamicDataSharedDepth,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet
} from "@microsoft/sp-property-pane";
import * as update from 'immutability-helper';
import * as strings from "PeopleSearchWebPartStrings";
import { IPeopleSearchWebPartProps } from "./IPeopleSearchWebPartProps";
import { ISearchService, MockSearchService, SearchService } from "../../services/SearchService";
import { IPeopleSearchContainerProps, PeopleSearchContainer } from "./components/PeopleSearchContainer";
import ResultsLayoutOption from "../../models/ResultsLayoutOption";
import { TemplateService } from "../../services/TemplateService/TemplateService";

export default class PeopleSearchWebPart extends BaseClientSideWebPart<IPeopleSearchWebPartProps> {
  private _searchService: ISearchService;
  private _templateService: TemplateService;
  private _placeholder = null;
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme;
  private _initComplete = false;
  private _templatePropertyPaneOptions: IPropertyPaneField<any>[] = [];

  public async render(): Promise<void> {

    if (!this._initComplete) {
        return;
    }

    await this._initTemplate();

    if (this.displayMode === DisplayMode.Edit) {
        const { Placeholder } = await import(
            /* webpackChunkName: 'search-property-pane' */
            '@pnp/spfx-controls-react/lib/Placeholder'
        );
        this._placeholder = Placeholder;
    }

    this.renderCompleted();
  }

  protected get isRenderAsync(): boolean {
    return true;
  }

  protected renderCompleted(): void {
    super.renderCompleted();
    let renderElement = null;

    if (this._isWebPartConfigured()) {

      const searchParameter: string | undefined = this.properties.searchParameter.tryGetValue();

      this._searchService = update(this._searchService, {
        selectParameter: { $set: this.properties.selectParameter ? this.properties.selectParameter.split(',') : [] },
        filterParameter: { $set: this.properties.filterParameter },
        orderByParameter: { $set: this.properties.orderByParameter },
        searchParameter: { $set: searchParameter },
        pageSize: { $set: parseInt(this.properties.pageSize) }
      });

      renderElement = React.createElement(
        PeopleSearchContainer,
        {
          webPartTitle: this.properties.webPartTitle,
          displayMode: this.displayMode,
          showBlank: this.properties.showBlank,
          showResultsCount: this.properties.showResultsCount,
          showPagination: this.properties.showPagination,
          searchService: this._searchService,
          templateService: this._templateService,
          templateParameters: this.properties.templateParameters,
          selectedLayout: this.properties.selectedLayout,
          themeVariant: this._themeVariant,
          serviceScope: this.context.serviceScope,
          updateWebPartTitle: (value: string) => {
            this.properties.webPartTitle = value;
          }
        } as IPeopleSearchContainerProps
      );
    } else {
      if (this.displayMode === DisplayMode.Edit) {
          const placeholder: React.ReactElement<any> = React.createElement(
              this._placeholder,
              {
                  iconName: strings.PlaceHolderEditLabel,
                  iconText: strings.PlaceHolderIconText,
                  description: strings.PlaceHolderDescription,
                  buttonLabel: strings.PlaceHolderConfigureBtnLabel,
                  onConfigure: this._setupWebPart.bind(this)
              }
          );
          renderElement = placeholder;
      } else {
          renderElement = React.createElement('div', null);
      }
    }

    ReactDom.render(renderElement, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._initializeRequiredProperties();

    this._initThemeVariant();

    if (Environment.type === EnvironmentType.Local) {
      this._searchService = new MockSearchService();
    } else {
      this._searchService = new SearchService(this.context.msGraphClientFactory);
    }

    this._templateService = new TemplateService();

    this._initComplete = true;

    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const templateParametersGroup = this._getTemplateFieldsGroup();

    let propertyPaneGroups: (IPropertyPaneGroup | IPropertyPaneConditionalGroup)[] = [
      {
        groupName: strings.QuerySettingsGroupName,
        groupFields: this._getQueryFields()
      },
      {
        primaryGroup: {
          groupName: strings.SearchQuerySettingsGroupName,
          groupFields: [
            PropertyPaneTextField('searchParameter', {
              label: strings.SearchParameter
            })
          ]
        },
        secondaryGroup: {
          groupName: strings.SearchQuerySettingsGroupName,
          groupFields: [

            PropertyPaneDynamicFieldSet({
              label: strings.SearchParameter,
              fields: [
                PropertyPaneDynamicField('searchParameter', {
                  label: strings.SearchParameter
                })
              ],
              sharedConfiguration: {
                depth: DynamicDataSharedDepth.Property
              }
            })
          ]
        },
        // Show the secondary group only if the web part has been
        // connected to a dynamic data source
        showSecondaryGroup: !!this.properties.searchParameter.tryGetSource()
      } as IPropertyPaneConditionalGroup,
      {
        groupName: strings.StylingSettingsGroupName,
        groupFields: this._getStylingFields(),
      }
    ];

    if (templateParametersGroup) {
      propertyPaneGroups.push(templateParametersGroup);
    }

    return {
      pages: [
        {
          groups: propertyPaneGroups,
          displayGroupsAsAccordion: false
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string) {
    if (propertyPath.localeCompare('selectedLayout') === 0) {
      await this._initTemplate();
      this.context.propertyPane.refresh();
    }
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'searchParameter': {
        dynamicPropertyType: 'string'
      }
    } as any as IWebPartPropertiesMetadata;
  }

  /**
   * Determines the group fields for query options inside the property pane
   */
  private _getQueryFields(): IPropertyPaneField<any>[] {
    let stylingFields: IPropertyPaneField<any>[] = [
      PropertyPaneTextField('selectParameter', {
          label: strings.SelectParameter,
          multiline: true
      }),
      PropertyPaneTextField('filterParameter', {
        label: strings.FilterParameter,
        multiline: true
      }),
      PropertyPaneTextField('orderByParameter', {
        label: strings.OrderByParameter,
        multiline: true
      }),
      PropertyPaneTextField('pageSize', {
        label: strings.PageSizeParameter,
        value: this.properties.pageSize.toString(),
        maxLength: 3,
        deferredValidationTime: 300,
        onGetErrorMessage: (value: string) => {
          return this._validateNumber(value);
        } 
      }),
    ];

    return stylingFields;
  }

    /**
   * Init the template according to the property pane current configuration
   * @returns the template content as a string
   */
  private async _initTemplate(): Promise<void> {
    this._templatePropertyPaneOptions = this._templateService.getTemplateParameters(this.properties.selectedLayout, this.properties);
  }

  /**
   * Determines the group fields for styling options inside the property pane
   */
  private _getStylingFields(): IPropertyPaneField<any>[] {
    const layoutOptions = [
        {
            iconProps: {
                officeFabricIconFontName: 'People'
            },
            text: strings.PeopleLayoutOption,
            key: ResultsLayoutOption.People
        },
        {
            iconProps: {
                officeFabricIconFontName: 'Code'
            },
            text: strings.DebugLayoutOption,
            key: ResultsLayoutOption.Debug
        }
    ] as IPropertyPaneChoiceGroupOption[];

    let stylingFields: IPropertyPaneField<any>[] = [
      // PropertyPaneToggle('showPagination', {
      //   label: strings.ShowPaginationControl,
      // }),
      PropertyPaneToggle('showBlank', {
          label: strings.ShowBlankLabel,
          checked: this.properties.showBlank,
      }),
      PropertyPaneToggle('showResultsCount', {
          label: strings.ShowResultsCountLabel,
          checked: this.properties.showResultsCount,
      }),
      PropertyPaneChoiceGroup('selectedLayout', {
          label: strings.ResultsLayoutLabel,
          options: layoutOptions
      }),
    ];

    return stylingFields;
  }

  /**
   * Gets template parameters fields
   */
  private _getTemplateFieldsGroup(): IPropertyPaneGroup {

    let templateFieldsGroup: IPropertyPaneGroup = null;

    if (this._templatePropertyPaneOptions.length > 0) {
        templateFieldsGroup = {
            groupFields: this._templatePropertyPaneOptions,
            isCollapsed: false,
            groupName: strings.TemplateParameters.TemplateParametersGroupName
        };
    }

    return templateFieldsGroup;
  }

  /**
  * Checks if all webpart properties have been configured
  */ 
  private _isWebPartConfigured(): boolean {
    return true;
  }

  /**
  * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
  */
  private _initializeRequiredProperties() {
    this.properties.selectedLayout = (this.properties.selectedLayout !== undefined && this.properties.selectedLayout !== null) ? this.properties.selectedLayout : ResultsLayoutOption.People;
    this.properties.templateParameters = this.properties.templateParameters ? this.properties.templateParameters : {};
  }

  /**
   * Initializes theme variant properties
   */
  private _initThemeVariant(): void {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent.bind(this));
  }

  /**
   * Update the current theme variant reference and re-render.
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
      if (!isEqual(this._themeVariant, args.theme)) {
          this._themeVariant = args.theme;
          this.render();
      }
  }

    /**
   * Opens the Web Part property pane
   */
  private _setupWebPart() {
      this.context.propertyPane.open();
  }

  private _validateNumber(value: string): string {
    let number = parseInt(value);
    if (isNaN(number)) {
        return strings.InvalidNumberIntervalMessage;
    }
    if (number < 1 || number > 999) {
        return strings.InvalidNumberIntervalMessage;
    }
    return '';
  }
}
