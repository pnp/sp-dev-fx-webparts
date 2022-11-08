import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";

import { ErrorMessage } from "./components/ErrorMessage";
import { IReactZodProps, ReactZod } from "./components/ReactZod";
import SharePointHelper from "./utils/SharePointHelper";

export interface IReactZodWebPartProps {
  description: string;
}

export default class ReactZodWebPart extends BaseClientSideWebPart<IReactZodWebPartProps> {
  private _sp!: SPFI;

  public async render(): Promise<void> {
    let element: React.ReactElement;
    try {
      const data = await SharePointHelper.GetFormResultsData(this._sp);
      element = React.createElement(ReactZod, {
        data,
      } as IReactZodProps);
    } catch (error) {
      console.error(error);
      element = React.createElement(ErrorMessage);
    }

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sp = spfi().using(SPFx(this.context));
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [],
    };
  }
}
