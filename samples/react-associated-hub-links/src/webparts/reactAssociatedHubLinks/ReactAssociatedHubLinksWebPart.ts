import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import "../../../assets/dist/tailwind.css";

import {
  ReactAssociatedHubLinks,
  IReactAssociatedHubLinksProps,
} from "./components/ReactAssociatedHubLinks";

export interface IReactAssociatedHubLinksWebPartProps {
  description: string;
}

export default class ReactAssociatedHubLinksWebPart extends BaseClientSideWebPart<IReactAssociatedHubLinksWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IReactAssociatedHubLinksProps> =
      React.createElement(ReactAssociatedHubLinks, {});

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
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
