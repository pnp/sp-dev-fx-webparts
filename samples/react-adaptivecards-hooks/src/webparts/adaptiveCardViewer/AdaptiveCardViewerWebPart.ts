import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// Used for property pane
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneTextField,
  IPropertyPaneField
} from '@microsoft/sp-property-pane';

// Used to display help on the property pane
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

// Used to select which list
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

// Used to pick which view you want
import { PropertyFieldViewPicker, PropertyFieldViewPickerOrderBy } from '../../controls/PropertyFieldViewPicker';

// Used by the code editor fields
import { PropertyFieldCodeEditorLanguages, IPropertyFieldCodeEditorPropsInternal } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

// Used to adapt to changing section background
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AdaptiveCardViewerWebPartStrings';
import { RootComponent } from './components/RootComponent';
import { IAdaptiveCardViewerWebPartProps } from './IAdaptiveCardViewerWebPartProps';
import { IAdaptiveCardViewerProps } from './components/IAdaptiveCardViewerProps';


/**
 *  This component is a thin wrapper around the function component.
 *   The job of this class is property management and bootstrapping the component tree
 */
export default class AdaptiveCardViewerWebPart extends BaseClientSideWebPart <IAdaptiveCardViewerWebPartProps> {
  private _templatePropertyPaneHelper: IPropertyPaneField<IPropertyFieldCodeEditorPropsInternal>;
  private _dataPropertyPaneHelper: IPropertyPaneField<IPropertyFieldCodeEditorPropsInternal>;

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IAdaptiveCardViewerProps> = React.createElement(
      RootComponent,
      {
        spContext: this.context,
        spEventObserver: this,
        acViewerState: null,
        acViewerStateDispatch: null,
        ...this.properties
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
                  label: strings.TemplateUrlLabel,
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
                  label: strings.ViewFieldLabel,
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
}
