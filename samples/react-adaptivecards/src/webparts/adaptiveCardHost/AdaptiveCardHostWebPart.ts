import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

// Used for property pane
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

// Used to select which list
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

// Used to pick which view you want
import { PropertyFieldViewPicker, PropertyFieldViewPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldViewPicker';

// Used by the code editor fields
import { PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

// Used to display help on the property pane
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

// Used to adapt to changing section background
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

// Used to retrieve SharePoint items
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import "@pnp/sp/views";
//import '@pnp/sp/items';

// Used for localizations
import * as strings from 'AdaptiveCardHostWebPartStrings';

// Used to render adaptive cards
import AdaptiveCardHost from './components/AdaptiveCardHost';
import { IAdaptiveCardHostProps } from './components/IAdaptiveCardHostProps';

export type TemplateSourceType = 'json' | 'url';
export type DataSourceType = 'list' | 'json' | 'url';

export interface IAdaptiveCardHostWebPartProps {
  /**
   * Either 'json' or 'url'
   */
  templateSource: TemplateSourceType;

  /**
   * The JSON Adaptive Cards template
   */
  template: string;

  /**
   * The URL to the template json
   */
  templateUrl: string;

  /**
   * The static JSON data, if using
   */
  data: string | undefined;

  /**
   * Whether we'll use adaptive templating or not
   */
  useTemplating: boolean;

  /**
   * Either 'list' or 'json' or 'url'
   */
  dataSource: DataSourceType;

  /**
   * The list id of the selected list
   */
  list: string | undefined;

  /**
   * The view id of the selected view
   */
  view: string | undefined;

  /**
   * The url of the remote data
   */
  dataUrl: string | undefined;
}

export default class AdaptiveCardHostWebPart extends BaseClientSideWebPart<IAdaptiveCardHostWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private _templatePropertyPaneHelper: any;
  private _dataPropertyPaneHelper: any;
  private _dataJSON: string;
  private _viewSchema: string;
  private _templateJSON: string;

  protected async onInit(): Promise<void> {

    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    await super.onInit();

    sp.setup({
      spfxContext: this.context
    });

    await this._loadTemplateFromUrl();
    await this._loadDataFromList();
    await this._loadDataFromUrl();
  }

  public async render(): Promise<void> {
    const templateJson: string = this.properties.templateSource === 'url' && this.properties.templateUrl ? this._templateJSON: this.properties.template;

    const dataJson: string = (this.properties.dataSource === 'list' && this.properties.list && this.properties.view) ||
                             (this.properties.dataSource === 'url' && this.properties.dataUrl) ? this._dataJSON : this.properties.data;

    // The Adaptive Card control does not care where the template and data are coming from.
    // Pass a valid template JSON and -- if using -- some data JSON
    const element: React.ReactElement<IAdaptiveCardHostProps> = React.createElement(
      AdaptiveCardHost,
      {
        themeVariant: this._themeVariant,
        template: templateJson,
        data: dataJson,
        useTemplating: this.properties.useTemplating === true,
        context: this.context,
        displayMode: this.displayMode
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Instead of always loading the property field code editor every time the web part is loaded,
   * we load it dynamically only when we need to display the property pane.
   *
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    // load the property field code editor asynchronously
    const codeEditor = await import(
      '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor'
    );

    // create a helper for templates
    this._templatePropertyPaneHelper = codeEditor.PropertyFieldCodeEditor('template', {
      label: strings.TemplateFieldLabel,
      panelTitle: strings.TemplateCodeEditorPanelTitle,
      initialValue: this.properties.template,
      onPropertyChange: this.onPropertyPaneFieldChanged,
      properties: this.properties,
      disabled: false,
      key: 'codeEditorTemplateId',
      language: PropertyFieldCodeEditorLanguages.JSON
    });

    // create a helper for data
    this._dataPropertyPaneHelper = codeEditor.PropertyFieldCodeEditor('data', {
      label: strings.DataJSONFieldLabel,
      panelTitle: strings.DataPanelTitle,
      key: "dataJSON",
      initialValue: this.properties.data,
      onPropertyChange: this.onPropertyPaneFieldChanged,
      properties: this.properties,
      disabled: false,
      language: PropertyFieldCodeEditorLanguages.JSON
    });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const isTemplateJSONBound: boolean = this.properties.templateSource === 'json';
    const isTemplateUrlBound: boolean = this.properties.templateSource === 'url';

    const isDataJSONBound: boolean = this.properties.useTemplating === true && this.properties.dataSource === 'json';
    const isDataListBound: boolean = this.properties.useTemplating === true && this.properties.dataSource === 'list';
    const isDataUrlBound: boolean = this.properties.useTemplating === true && this.properties.dataSource === 'url';

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              // Primary group is used to provide the address to show on the map
              // in a text field in the web part properties
              groupName: strings.TemplatingGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: strings.TemplateDescription,
                  moreInfoLink: strings.TemplateMoreInfoUrl,
                  moreInfoLinkTarget: "_blank",
                  key: 'adaptiveCardJSONId'
                }),
                PropertyPaneChoiceGroup('templateSource', {
                  label: strings.TemplateSourceFieldLabel,
                  options: [
                    {
                      key: 'json',
                      text: strings.TemplateSourceFieldChoiceJSON,
                      iconProps: {
                        officeFabricIconFontName: 'Code'
                      }
                    },
                    {
                      key: 'url',
                      text: strings.TemplateSourceFieldChoiceUrl,
                      iconProps: {
                        officeFabricIconFontName: 'Globe'
                      }
                    }
                  ]
                }),
                isTemplateJSONBound && this._templatePropertyPaneHelper,
                isTemplateUrlBound && PropertyPaneTextField('templateUrl', {
                  label: strings.DataUrlLabel,
                })
              ]
            },
            {
              groupName: strings.AdaptiveCardTemplatingGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: strings.AdaptiveCardTemplatingInfoLabel,
                  moreInfoLink: strings.AdaptiveCardTemplatingMoreInfoLinkUrl,
                  moreInfoLinkTarget: "_blank",
                  key: 'adaptiveTemplatingId'
                }),
                PropertyPaneToggle('useTemplating', {
                  label: strings.UseAdaptiveTemplatingLabel,
                  checked: this.properties.useTemplating === true
                }),

                this.properties.useTemplating === true && PropertyPaneChoiceGroup('dataSource', {
                  label: strings.DataSourceFieldLabel,
                  options: [
                    {
                      key: 'json',
                      text: strings.DataSourceFieldChoiceJSON,
                      iconProps: {
                        officeFabricIconFontName: 'Code'
                      },
                    },
                    {
                      key: 'list',
                      text: strings.DataSourceFieldChoiceList,
                      iconProps: {
                        officeFabricIconFontName: 'CustomList'
                      },
                    },
                    {
                      key: 'url',
                      text: strings.DataSourceFieldChoiceUrl,
                      iconProps: {
                        officeFabricIconFontName: 'Globe'
                      }
                    }
                  ]
                }),
                isDataJSONBound && this._dataPropertyPaneHelper,
                isDataJSONBound && PropertyPaneWebPartInformation({
                  description: strings.UseTemplatingDescription,
                  key: 'dataInfoId'
                }),
                isDataListBound && PropertyFieldListPicker('list', {
                  label: strings.ListFieldLabel,
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                isDataListBound && PropertyFieldViewPicker('view', {
                  label: strings.ViewPropertyFieldLabel,
                  context: this.context,
                  selectedView: this.properties.view,
                  listId: this.properties.list,
                  disabled: false,
                  orderBy: PropertyFieldViewPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'viewPickerFieldId'
                }),
                isDataUrlBound && PropertyPaneTextField('dataUrl', {
                  label: strings.DataUrlLabel,
                })
              ]
            }
          ]
        }
      ]
    };
  }

  /**
   * Gets called when a property is changed in the property pane.
   * @param propertyPath The property name that's being changed
   * @param _oldValue Unused. The old value.
   * @param _newValue Unused. The new value.
   *
   * We use this to force a reload of the data
   */
  protected async onPropertyPaneFieldChanged(propertyPath: string, _oldValue: any, _newValue: any): Promise<void> {
    // If we changed the view or the list or the JSON file
    // we need to get the view again, and re-load the data
    if (propertyPath === 'view' || propertyPath === 'list' || propertyPath === 'dataSource') {
      // Clear the view schema cache
      this._viewSchema = undefined;

      // Load the data
      await this._loadDataFromList();

      // Render the card
      this.render();
    }

    if (propertyPath === 'templateUrl') {
      await this._loadTemplateFromUrl();
      this.render();
    }
    if (propertyPath === 'dataUrl'){
      await this._loadDataFromUrl();
      this.render();
    }

  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @PARAM args The new theme
   */
  private _handleThemeChangedEvent = (args: ThemeChangedEventArgs) => {
    this._themeVariant = args.theme;
    this.render();
  }

  /**
   * Loads data from a list by using a cached view
   */
  private async _loadDataFromList(): Promise<void> {

    // There is no need to load data from a list if the list and the view aren't configured
    if (this.properties.dataSource !== 'list' || !this.properties.list || !this.properties.view) {
      return;
    }

    // Get the list
    const list = await sp.web.lists.getById(this.properties.list);

    // If we didn't yet load the view schema, do so now
    if (!this._viewSchema) {
      const view = await list.getView(this.properties.view)();
      this._viewSchema = view.HtmlSchemaXml;
    }

    // Get the data as returned by the view
    const { Row: data } = await list.renderListDataAsStream({
      ViewXml: this._viewSchema
    });

    // Store that data for later
    this._dataJSON = JSON.stringify(data);

    if (this.displayMode === DisplayMode.Edit) {
      console.log("Data JSON", this._dataJSON);
    }
  }

  /**
   * Loads data from a url
   */
  private async _loadDataFromUrl(): Promise<void> {
    // There is no need to load data if the url is not configured
    if (this.properties.dataSource !== 'url' || !this.properties.dataUrl) {
      return;
    }

    this.context.httpClient.get(this.properties.dataUrl, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        if (response.ok) {
          response.json()
            .then((data: any) => {
              this._dataJSON = JSON.stringify(data);
            });
        }
      });
  }

  private async _loadTemplateFromUrl(): Promise<void> {
    if (this.properties.templateSource !== 'url' || !this.properties.templateUrl) {
      return;
    }

    this.context.httpClient.get(this.properties.templateUrl, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        if (response.ok) {
          response.json()
            .then((data: any) => {
              this._templateJSON = JSON.stringify(data);
            });
        }
      });

  }
}
