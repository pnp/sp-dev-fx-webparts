import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";

import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";

import EnhancedPageProperties from "./components/EnhancedPageProperties";
import { IEnhancedPagePropertiesProps } from "./components/IEnhancedPagePropertiesProps";

export interface IEnhancedPagePropertiesWebPartProps {
  title: string;
  fields: string;
}

export interface propertyItem {
  label: string;
  field: string;
  value: string;
  isAvailable: boolean;
}

export default class EnhancedPagePropertiesWebPart extends BaseClientSideWebPart<IEnhancedPagePropertiesWebPartProps> {
  private readonly docLibTitle = 'Site Pages';
  private _sp: SPFI;

  public async render(): Promise<void> {
    const items: propertyItem[] = await this.getCurrentPageProperties();
    const element: React.ReactElement<IEnhancedPagePropertiesProps> =
      React.createElement(EnhancedPageProperties, {
        title: this.properties.title,
        items,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sp = spfi().using(SPFx(this.context));
  }

  protected convertSelectedFieldsString(): string[] {
    return this.properties.fields.split(",").map((field) => field.trim());
  }

  protected async getCurrentPageProperties(): Promise<propertyItem[]> {
    // Get available fields in the Document Library
    const availableFields = await this._sp.web.lists
      .getByTitle(this.docLibTitle)
      .fields();
    // Filter to only non hidden fields
    const filteredAvailableFields: Map<string, string> = new Map();
    for (let i = 0; i < availableFields.length; i++) {
      const field = availableFields[i];
      if (field.Hidden) continue;
      filteredAvailableFields.set(field.InternalName, field.Title);
    }

    const selectedFields = this.convertSelectedFieldsString();
    const propertyItems: propertyItem[] = [];
    const currentPageId = this.context.pageContext.listItem?.id || 0;
    const currentPageProperties = await this._sp.web.lists
      .getByTitle(this.docLibTitle)
      .items.getById(currentPageId)
      .select(
        ...selectedFields.filter((field) => filteredAvailableFields.has(field))
      )();
    for (let i = 0; i < selectedFields.length; i++) {
      const field = selectedFields[i];
      const isAvailable = filteredAvailableFields.has(field);
      propertyItems.push({
        field,
        isAvailable,
        label: isAvailable ? (filteredAvailableFields.get(field) || '') : field,
        value: currentPageProperties[field],
      });
    }
    return propertyItems;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("fields", {
                  label: "Fields",
                  description: "separate by comma",
                  multiline: true,
                  rows: 5,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
