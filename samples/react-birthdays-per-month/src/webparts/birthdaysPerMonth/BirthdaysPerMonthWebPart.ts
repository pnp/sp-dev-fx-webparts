import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { spfi, SPFx, SPFI } from "@pnp/sp";

import "../../../assets/dist/tailwind.css";
import {
  BirthdaysPerMonth,
  IBirthdaysPerMonthProps,
} from "./components/BirthdaysPerMonth";
import { BirthdaysInMonth } from "../../models/BirthdaysInMonth";
import { SharePointService } from "../../utils/SharePointService";

export interface IBirthdaysPerMonthWebPartProps {}

export default class BirthdaysPerMonthWebPart extends BaseClientSideWebPart<IBirthdaysPerMonthWebPartProps> {
  private _spfi: SPFI;

  public async render(): Promise<void> {
    const sharePointService = new SharePointService(this._spfi);
    const birthdays: Array<BirthdaysInMonth> =
      await sharePointService.GetBirthdays();
    const elementProps: IBirthdaysPerMonthProps = {
      data: birthdays,
    };
    const element: React.ReactElement<IBirthdaysPerMonthProps> =
      React.createElement(BirthdaysPerMonth, elementProps);

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._spfi = spfi().using(SPFx(this.context));
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
