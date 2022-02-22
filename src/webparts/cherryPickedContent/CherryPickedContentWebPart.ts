import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CherryPickedContentWebPartStrings';
import CherryPickedContent from './components/CherryPickedContent';
import { ICherryPickedContentProps } from './components/ICherryPickedContentProps';
import { update } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { approvedLibraries } from './components/ApprovedLibraries';

export interface ICherryPickedContentWebPartProps {
  description: string;
  libraryPicker: string;
  libraryItemPicker: string;
}

export default class CherryPickedContentWebPart extends BaseClientSideWebPart<ICherryPickedContentWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ICherryPickedContentProps> = React.createElement(
      CherryPickedContent,
      {
        description: this.properties.description,
        libraryPicker: this.properties.libraryPicker,
        libraryItemPicker: this.properties.libraryItemPicker,
        approvedLibraries: this.approvedLibraries,
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // Only content from the approved libraries can be selected
  private approvedLibraries = approvedLibraries;

  private updateWebPartProperty(property, value, refreshWebPart = true, refreshPropertyPane = true) {

    update(this.properties, property, () => value);
    if (refreshWebPart) this.render();
    if (refreshPropertyPane) this.context.propertyPane.refresh();

  }

  // Dropdown gets disabled while retrieving items asynchronously
  private itemsDropdownDisabled: boolean = true;

  // Files in the selected library
  private libraryItemsList: IPropertyPaneDropdownOption[];

  // Asynchronous library query
  private getLibraryItemsList = (library) => {
    // Validate approved location
    const filesLocation = this.approvedLibraries.filter(loc => loc.key == library)[0];
    const filesQuery = window.location.origin + filesLocation.siteRelativeURL + "/_api/web/lists/getbytitle('" + filesLocation.library + "')/files?$select=Name";

    return this.context.spHttpClient.get(filesQuery, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => response.json())
      .then(data => data.value);
  }

  // Runs before getting the Property Pane configuration
  protected onPropertyPaneConfigurationStart(): void {

    this.itemsDropdownDisabled = true;

    if (this.properties.libraryPicker)
      this.getLibraryItemsList(this.properties.libraryPicker)
        .then((files): void => {
          // store items
          this.libraryItemsList = files.map(file => { return { key: file.Name, text: file.Name }; });
          this.itemsDropdownDisabled = false;
        })
        .then(() => this.context.propertyPane.refresh());
  }

  // This API is invoked after updating the new value of the property in the property bag (Reactive mode). 
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if ((propertyPath === 'libraryPicker') && (newValue)) {
      // get previously selected item
      const previousItem: string = this.properties.libraryItemPicker;
      // reset selected item
      this.properties.libraryItemPicker = "";
      // disable item selector until new items are loaded
      this.itemsDropdownDisabled = true;
      // push new item value
      this.onPropertyPaneFieldChanged('libraryItemPicker', previousItem, this.properties.libraryItemPicker);
      // this.render();
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();

      this.getLibraryItemsList(newValue)
        .then((files): void => {

          if (files.length) {
          // store items
          this.libraryItemsList = files.map(file => { return { key: file.Name, text: file.Name }; });
          // enable item selector
          this.itemsDropdownDisabled = false;
          // this.render();
          // refresh the item selector control by repainting the property pane
          this.context.propertyPane.refresh();
          }
        });
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // Web Part title
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                // Library Picker (approved libraries only)
                PropertyPaneDropdown('libraryPicker', {
                  label: strings.LibraryPickerLabel,
                  options: this.approvedLibraries,
                  selectedKey: this.properties.libraryPicker,

                }),
                // Cascading Library Item Picker
                PropertyPaneDropdown('libraryItemPicker', {
                  label: strings.LibraryItemPickerLabel,
                  options: this.libraryItemsList,
                  selectedKey: this.properties.libraryItemPicker,
                  disabled: this.itemsDropdownDisabled
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
