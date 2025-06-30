import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ListItemsWebPartStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

export interface IListItemsWebPartProps {
  listName: string;
  itemName: string;
}

export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {
  private isDarkTheme: boolean = false;
  private environmentMessage: string = '';
  private lists: IPropertyPaneDropdownOption[];
  private items: IPropertyPaneDropdownOption[];
  private listsDropdownDisabled: boolean = true;
  private itemsDropdownDisabled: boolean = true;
  private loadingIndicator: boolean = true;

  public render(): void {
    const element: React.ReactElement<IListItemsProps> = React.createElement(
      ListItems,
      {
        listName: this.properties.listName,
        itemName: this.properties.itemName,
        isDarkTheme: this.isDarkTheme,
        environmentMessage: this.environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const message = await this.getEnvironmentMessage();
    this.environmentMessage = message;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this.isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      showLoadingIndicator: this.loadingIndicator,   
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled
                }),
                PropertyPaneDropdown('itemName', {
                  label: strings.ItemNameFieldLabel,
                  options: this.items,
                  disabled: this.itemsDropdownDisabled,
                  selectedKey: this.properties.itemName // don't forget to bind this property so it is refreshed when the parent property changes
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    // disable the item selector until lists have been loaded
    this.listsDropdownDisabled = !this.lists;

    // disable the item selector until items have been loaded or if the list has not been selected
    this.itemsDropdownDisabled = !this.properties.listName || !this.items;

    // nothing to do until someone selects a list
    if (this.lists) {
      return;
    }

    // show a loading indicator in the property pane while loading lists and items
    this.loadingIndicator = true;
    this.context.propertyPane.refresh();

    // load the lists from SharePoint
    const listOptions: IPropertyPaneDropdownOption[] = await this.loadLists();
    this.lists = listOptions;
    this.listsDropdownDisabled = false;

    // load the items from SharePoint
    const itemOptions: IPropertyPaneDropdownOption[] = await this.loadItems();
    this.items = itemOptions;
    this.itemsDropdownDisabled = !this.properties.listName;

    // remove the loading indicator
    this.loadingIndicator = false;
    this.context.propertyPane.refresh();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void> {
    if (propertyPath === 'listName' && newValue) {
      // communicate loading items
      this.loadingIndicator = true;

      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

      // reset selected item
      this.properties.itemName = ''; // use empty string to force property pane to reset the selected item. undefined will not trigger the reset

      // disable item selector until new items are loaded
      this.itemsDropdownDisabled = true;

      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();

      // get new items
      const itemOptions: IPropertyPaneDropdownOption[] = await this.loadItems();

      // store items
      this.items = itemOptions;

      // enable item selector
      this.itemsDropdownDisabled = false;

      // clear status indicator
      this.loadingIndicator = false;

      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }

  private async getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      const context = await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      let environmentMessage: string = '';
      switch (context.app.host.name) {
        case 'Office': // running in Office
          environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
          break;
        case 'Outlook': // running in Outlook
          environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
          break;
        case 'Teams': // running in Teams
        case 'TeamsModern':
          environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
          break;
        default:
          environmentMessage = strings.UnknownEnvironment;
      }
      return environmentMessage;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  private async loadLists(): Promise<IPropertyPaneDropdownOption[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, _reject: (error: any) => void) => {
      setTimeout((): void => {
        resolve([{
          key: 'sharedDocuments',
          text: 'Shared Documents'
        },
        {
          key: 'myDocuments',
          text: 'My Documents'
        }]);
      }, 2000);
    });
  }

  private async loadItems(): Promise<IPropertyPaneDropdownOption[]> {
    if (!this.properties.listName) {
      // return empty options since no list has been selected
      return [];
    }

    // This is where you'd replace the mock data with the actual data from SharePoint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void, reject: (error: any) => void) => {
      // timeout to simulate async call
      setTimeout(() => {
        const items: { [key: string]: { key: string; text: string }[] } = {
          sharedDocuments: [
            {
              key: 'spfx_presentation.pptx',
              text: 'SPFx for the masses'
            },
            {
              key: 'hello-world.spapp',
              text: 'hello-world.spapp'
            }
          ],
          myDocuments: [
            {
              key: 'isaiah_cv.docx',
              text: 'Isaiah CV'
            },
            {
              key: 'isaiah_expenses.xlsx',
              text: 'Isaiah Expenses'
            }
          ]
        };
        resolve(items[this.properties.listName]);
      }, 2000);
    });
  }
}
