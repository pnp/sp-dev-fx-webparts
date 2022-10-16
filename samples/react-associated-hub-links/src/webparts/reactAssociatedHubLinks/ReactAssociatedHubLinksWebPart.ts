import "../../../assets/dist/tailwind.css";
import "@pnp/sp/search";
import "@pnp/sp/webs";
import "@pnp/sp/sites";

import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";

import {
  IReactAssociatedHubLinksProps,
  ReactAssociatedHubLinks,
} from "./components/ReactAssociatedHubLinks";

export interface IReactAssociatedHubLinksWebPartProps {
  description: string;
}

export default class ReactAssociatedHubLinksWebPart extends BaseClientSideWebPart<IReactAssociatedHubLinksWebPartProps> {
  private _sp: SPFI;

  public async render(): Promise<void> {
    const element: React.ReactElement<IReactAssociatedHubLinksProps> =
      React.createElement(ReactAssociatedHubLinks, {
        sp: this._sp,
      });

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
      pages: [
        {
          groups: [],
        },
      ],
    };
  }
}
