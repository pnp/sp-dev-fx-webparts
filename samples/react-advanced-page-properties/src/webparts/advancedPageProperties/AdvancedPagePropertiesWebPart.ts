import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, IPropertyPaneDropdownOption, IPropertyPaneField, PropertyPaneButton, PropertyPaneButtonType, PropertyPaneDropdown, PropertyPaneHorizontalRule, PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AdvancedPagePropertiesWebPartStrings';
import AdvancedPageProperties from './components/AdvancedPageProperties';
import { IAdvancedPagePropertiesProps } from './components/IAdvancedPagePropertiesProps';
//import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { getSP } from './utilities/pnpjs-config';
import { SPFI } from '@pnp/sp';

import { Log } from './utilities/Log';
import * as _ from 'lodash';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

export interface IAdvancedPagePropertiesWebPartProps {
  title: string;
  selectedProperties: string[];
}

export default class AdvancedPagePropertiesWebPart extends BaseClientSideWebPart<IAdvancedPagePropertiesWebPartProps> {

  private _availableProperties: IPropertyPaneDropdownOption[] = [];

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  /**
   * Private variable to store the SharePoint Factory Instance
   */
  private _sp: SPFI;

  protected async onInit(): Promise<void> {
    this._sp = getSP(this.context);

      // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IAdvancedPagePropertiesProps> = React.createElement(
      AdvancedPageProperties,
      {
        context: this.context,
        title: this.properties.title,
        selectedProperties: this.properties.selectedProperties,
        themeVariant: this._themeVariant
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async getPageProperties(): Promise<void> {
    Log.Write("Getting Site Page fields...");
    const list = await this._sp.web.lists.ensureSitePagesLibrary();
    const _fields = await list.fields();
    this._availableProperties = [];

    Log.Write(`${_fields.length.toString()} fields retrieved!`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fields.forEach((field: any) => {
      if (!field.FromBaseType && !field.Hidden && field.SchemaXml.indexOf("ShowInListSettings=\"FALSE\"") === -1
          //&& field.TypeAsString !== "Boolean" && field.TypeAsString !== "Note") {
          && field.TypeAsString !== "Boolean") {
        const internalFieldName = field.InternalName == "LinkTitle" ? "Title" : field.InternalName;
        this._availableProperties.push({ key: internalFieldName, text: field.Title });
        Log.Write(field.TypeAsString);
      }
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  protected onAddButtonClick (_value: any) {
    this.properties.selectedProperties.push(this._availableProperties[0].key.toString());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onDeleteButtonClick (value: any) {
    Log.Write(value.toString());
    const removed = this.properties.selectedProperties.splice(value, 1);
    Log.Write(`${removed[0]} removed.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onPropertyPaneFieldChanged(propertyPath: string, _oldValue: any, newValue: any): void {
    if (propertyPath.indexOf("selectedProperty") >= 0) {
      Log.Write('Selected Property identified');
      const index: number = _.toInteger(propertyPath.replace("selectedProperty", ""));
      this.properties.selectedProperties[index] = newValue;
    }
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    Log.Write(`onPropertyPaneConfigurationStart`);
    await this.getPageProperties();
    this.context.propertyPane.refresh();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    Log.Write(`getPropertyPaneConfiguration`);

    // Initialize with the Title entry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const propDrops: IPropertyPaneField<any>[] = [];
    propDrops.push(PropertyPaneTextField('title', {
      label: strings.TitleFieldLabel
    }));
    propDrops.push(PropertyPaneHorizontalRule());
    // Determine how many page property dropdowns we currently have
    this.properties.selectedProperties.forEach((prop, index) => {
      propDrops.push(PropertyPaneDropdown(`selectedProperty${index.toString()}`,
        {
          label: strings.SelectedPropertiesFieldLabel,
          options: this._availableProperties,
          selectedKey: prop,
        }));
      // Every drop down gets its own delete button
      propDrops.push(PropertyPaneButton(`deleteButton${index.toString()}`,
      {
        text: strings.PropPaneDeleteButtonText,
        buttonType: PropertyPaneButtonType.Command,
        icon: "RecycleBin",
        onClick: this.onDeleteButtonClick.bind(this, index)
      }));
      propDrops.push(PropertyPaneHorizontalRule());
    });
    // Always have the Add button
    propDrops.push(PropertyPaneButton('addButton',
    {
      text: strings.PropPaneAddButtonText,
      buttonType: PropertyPaneButtonType.Command,
      icon: "CirclePlus",
      onClick: this.onAddButtonClick.bind(this)
    }));

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.SelectionGroupName,
              groupFields: propDrops
            }
          ]
        }
      ]
    };
  }
}
