import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'Caml2TableWebPartStrings';
import Caml2Table from './components/Caml2Table';
import { ICaml2TableProps } from './components/ICaml2TableProps';
import { Caml2TableContext, ICaml2TableContext } from './Caml2TableContext';

// PnPjs imports
import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ICaml2TableWebPartProps {
  description: string;
}

/**
 * Web part for CAML query builder and executor
 */
export default class Caml2TableWebPart extends BaseClientSideWebPart<ICaml2TableWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _themeVariant: IReadonlyTheme | undefined;
  private _sp: SPFI;

  protected async onInit(): Promise<void> {
    // Initialize PnPjs
    this._sp = spfi().using(SPFx(this.context));
    
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ICaml2TableProps> = React.createElement(
      Caml2Table,
      {}
    );

    // Create context provider for PnPjs and theme
    const contextValue: ICaml2TableContext = {
      SPFxContext: this.context,
      spfi: this._sp,
      themeVariant: this._themeVariant
    };

    const contextProvider = React.createElement(
      Caml2TableContext.Provider,
      { value: contextValue },
      element
    );

    ReactDom.render(contextProvider, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    this._themeVariant = currentTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}