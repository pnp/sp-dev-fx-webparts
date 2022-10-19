import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ReactDatatableWebPartStrings';
import ReactDatatable from './components/ReactDatatable';
import { IReactDatatableProps } from './components/IReactDatatableProps';
import { sp } from '@pnp/sp';
import { SPService } from '../../shared/service/SPService';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';

export interface IReactDatatableWebPartProps {
  title: string;
  list: string;
  fields: any;
  fieldDetails: any;
  searchBy: any[];
  sortBy: any[];
  oddRowColor: string;
  evenRowColor: string;
  enableSorting: boolean;
  enableSearching: boolean;
  enablePagination: boolean;
  enableDownloadAsCsv: boolean;
  enableDownloadAsPdf: boolean;
  fieldOrder: Array<any>;
}

export default class ReactDatatableWebPart extends BaseClientSideWebPart<IReactDatatableWebPartProps> {

  private _services: SPService = null;
  private _selectedFields: Array<IPropertyPaneDropdownOption>;

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
      this._services = new SPService(this.context);
    });
  }

  private mapFieldsToObjects = () => {
    let { fields = [], fieldDetails = [] } = this.properties;
    return fields.map(f => fieldDetails.find(fDetails => fDetails.key === f));
  }

  public async getSelectedListFields() {
    if (this.properties.list) {
      let allFields = await this._services.getFields(this.properties.list);
      this.properties.fieldDetails = allFields.map(field => ({ key: field.InternalName, text: field.Title, fieldType: field['odata.type'] }));
      this.context.propertyPane.refresh();
    }
  }

  public render(): void {
    this.getSelectedListFields();
    const element: React.ReactElement<IReactDatatableProps> = React.createElement(
      ReactDatatable,
      {
        context: this.context,
        title: this.properties.title,
        list: this.properties.list,
        fieldDetails: this.properties.fieldDetails,
        fields: this.mapFieldsToObjects(),
        enableSorting: this.properties.enableSorting,
        enableSearching: this.properties.enableSearching,
        enablePagination: this.properties.enablePagination,
        searchBy: this.properties.searchBy,
        sortBy: this.properties.sortBy,
        enableDownloadAsCsv: this.properties.enableDownloadAsCsv,
        enableDownloadAsPdf: this.properties.enableDownloadAsPdf,
        displayMode: this.displayMode,
        oddRowColor: this.properties.oddRowColor,
        evenRowColor: this.properties.evenRowColor,
        fieldOrder: this.properties.fieldOrder,
        onChangeProperty: this.onChangeProperty
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public onChangeProperty = (changeType: string, oldValue: any, newValue: any[]): void => {
    switch (changeType) {
      case "list":
        this.getSelectedListFields();
        this.properties.fields = [];
        break;
      case "fieldOrder":
        this.properties.fields = newValue.map(n => n.key);
        break;
      default:
        break;
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let isSearch = !this.properties.enableSearching;
    let isSort = !this.properties.enableSorting;
    this._selectedFields = this.mapFieldsToObjects();

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.ListConfigurationGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DataTableTitleFieldLabel
                }),
                PropertyFieldListPicker('list', {
                  label: strings.ListPickerLabel,
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 100,
                  onPropertyChange: this.onChangeProperty.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  key: 'listPickerFieldId',
                }),
                PropertyFieldMultiSelect('fields', {
                  key: 'fields',
                  label: strings.MultiSelectFieldLabel,
                  options: this.properties.fieldDetails,
                  selectedKeys: this.properties.fields
                }),
              ]
            },
            {
              groupName: strings.SearchAndSortGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneToggle('enableSorting', {
                  label: strings.SortingToggleLabel,
                  checked: true
                }),
                PropertyFieldMultiSelect('sortBy', {
                  key: 'sortBy',
                  label: strings.SortByLabel,
                  disabled: isSort,
                  options: this._selectedFields,
                  selectedKeys: this.properties.sortBy
                }),
                PropertyPaneToggle('enableSearching', {
                  label: strings.SearchingToggleLabel,
                  checked: false
                }),
                PropertyFieldMultiSelect('searchBy', {
                  key: 'searchBy',
                  label: strings.SearchByLabel,
                  disabled: isSearch,
                  options: this._selectedFields,
                  selectedKeys: this.properties.searchBy
                }),
              ]
            },
          ]
        },
        {
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.AdvancedFeaturesGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneToggle('enableDownloadAsCsv', {
                  label: strings.CSVToggleLabel,
                  checked: false
                }),
                PropertyPaneToggle('enableDownloadAsPdf', {
                  label: strings.PDFToggleLabel,
                  checked: false
                }),
                PropertyPaneToggle('enablePagination', {
                  label: strings.PaginationLabel,
                  checked: false
                }),
                PropertyFieldOrder("fieldOrder", {
                  key: "fieldOrder",
                  label: strings.OrderListItemsLabel,
                  items: this._selectedFields,
                  textProperty: "text",
                  properties: this.properties,
                  onPropertyChange: this.onChangeProperty
                }),
                PropertyFieldColorPicker('evenRowColor', {
                  label: strings.EvenRowColorLabel,
                  selectedColor: this.properties.evenRowColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldColorPicker('oddRowColor', {
                  label: strings.OddRowColorLabel,
                  selectedColor: this.properties.oddRowColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
              ]
            },          
          ]
        }
      ]
    };
  }
}

