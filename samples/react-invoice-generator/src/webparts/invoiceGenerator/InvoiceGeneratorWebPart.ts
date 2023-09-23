import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneGroup,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import * as strings from 'InvoiceGeneratorWebPartStrings';
import { IInvoiceGeneratorProps } from './components/InvoiceGenerator/IInvoiceGeneratorProps';
import { InvoiceGenerator } from './components/InvoiceGenerator/InvoiceGenerator';
import { IFilePickerResult, PropertyFieldFilePicker } from '@pnp/spfx-property-controls';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';
import { InvoiceService } from './services/InvoiceService';



export interface IInvoiceGeneratorWebPartProps {
  filePickerResult: IFilePickerResult;
  description: string;
  listId: string;
  taxRate: number
  companyName: string;
  companyAddress: string;
  logoImage: string;
  createListToggle: boolean;
  listName: string;
  listIdOptions: { key: string, text: string }[];
}

export default class InvoiceGeneratorWebPart extends BaseClientSideWebPart<IInvoiceGeneratorWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private _invoiceService: InvoiceService;

  protected async onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    this._invoiceService = new InvoiceService(this.context);

    const availableLists = await this._invoiceService.getLists();
    this.properties.listIdOptions = availableLists.map(list => ({
      key: list.Id,
      text: list.Title,
    }));


    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
  public render(): void {
    const element: React.ReactElement<IInvoiceGeneratorProps> = React.createElement(
      InvoiceGenerator,
      {
        logoImage: this.properties.logoImage,
        listId: this.properties.listId,
        context: this.context,
        taxRate: this.properties.taxRate || 0,
        companyName: this.properties.companyName,
        companyAddress: this.properties.companyAddress,
        themeVariant: this._themeVariant
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


  private async validateListName(value: string): Promise<string> {
    const listExists = await this._invoiceService.listExists(value);
    if (listExists) {
      return (`List with name "${value}" already exists.`);
    }

  }

  protected onPropertyPaneFieldChanged(propertyPath: string, newValue: string): void {
    if (propertyPath === 'listId' && newValue) {
      // Update the web part property
      this.properties.listId = newValue;
      // Refresh the web part to reflect the new property value
      this.render();
    }
  }
  private async createList(): Promise<void> {
    try {

      const createdList = await this._invoiceService.createList(this.properties.listName);
      if (createdList) {
        console.log(`List "${this.properties.listName}" created successfully.`);
        const availableLists = await this._invoiceService.getLists();
        this.properties.listIdOptions = availableLists.map(list => ({
          key: list.Id,
          text: list.Title,
        }));
        this.properties.listId = createdList.Id;
        this.context.propertyPane.refresh();
        this.render();
      }
    } catch (error) {
      console.error('Error creating list:', error);

    }
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { createListToggle, listId, listIdOptions } = this.properties;

    const PropertyPaneFields: IPropertyPaneGroup["groupFields"] = [
      PropertyFieldFilePicker('filePicker', {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        context: this.context as any,
        filePickerResult: this.properties.filePickerResult,
        onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
        properties: this.properties,
        onSave: (e: IFilePickerResult) => {
          this.properties.logoImage = e.fileAbsoluteUrl;
          this.context.propertyPane.refresh();
        },
        onChanged: (e: IFilePickerResult) => {
          this.properties.logoImage = e.fileAbsoluteUrl;
          this.context.propertyPane.refresh();
        },
        accepts: [".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"],
        key: "filePickerId",
        buttonLabel: "Logo Picker",
        label: "Logo Picker",
      }),
      PropertyPaneToggle('createListToggle', {
        label: 'Do you want to create a new list?',
        checked: createListToggle,
      }),
      createListToggle &&
      PropertyPaneTextField('listName', {
        label: 'New list name',
        onGetErrorMessage: this.validateListName.bind(this)
      }),
      createListToggle &&
      PropertyPaneButton('CreateList', {
        text: "Create List",
        buttonType: PropertyPaneButtonType.Normal,
        onClick: this.createList.bind(this),


      }),

      PropertyPaneDropdown('listId', {
        label: 'Pick your list',
        options: listIdOptions.map(list => ({
          key: list.key,
          text: list.text
        })),
        selectedKey: listId
      }),
      PropertyPaneTextField('companyName', {
        label: strings.CompanyNameFieldLabel
      }),
      PropertyPaneTextField('companyAddress', {
        label: strings.CompanyAddressFieldLabel,
        multiline: true
      }),
      PropertyPaneTextField('taxRate', {
        label: strings.TaxRateFieldLabel
      }),
    ];

    return {
      pages: [
        {
          groups: [
            {
              groupName: "Invoice Settings",
              groupFields: PropertyPaneFields
            }
          ]
        }
      ]
    };
  }

}