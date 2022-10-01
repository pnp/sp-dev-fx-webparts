import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";

import ReactZod from "./components/ReactZod";

export interface IReactZodWebPartProps {
  description: string;
}

export default class ReactZodWebPart extends BaseClientSideWebPart<IReactZodWebPartProps> {
  private _spfi: SPFI;

  public render(): void {
    const element: React.ReactElement = React.createElement(ReactZod, {});

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._spfi = spfi().using(SPFx(this.context));
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
