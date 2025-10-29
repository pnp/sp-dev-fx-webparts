import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import {
  PropertyFieldPeoplePicker,
  PrincipalType,
  IPropertyFieldGroupOrPerson,
} from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import * as strings from "OrganizationChartWebPartStrings";
import { OrgChart } from "../../components/OrgChart/OrgChart";

import { IOrgChartProps } from "../../components/OrgChart/IOrgChartProps";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/profiles";

let _sp: SPFI;
export interface IOrganizationChartWebPartProps {
  title: string;
  currentUser: string;
  selectedUser: IPropertyFieldGroupOrPerson[];
  showAllManagers: boolean;
  showGuestUsers: boolean;
  showActionsBar: boolean;
}

export default class OrganizationChartWebPart extends BaseClientSideWebPart<IOrganizationChartWebPartProps> {
  public async onInit(): Promise<void> {
    _sp = spfi().using(SPFx(this.context));
    return super.onInit();
  }
  
  public get sp(): SPFI {
    return _sp;
  }
  public render(): void {
    const element: React.ReactElement<IOrgChartProps> = React.createElement(
      OrgChart,
      {
        title: this.properties.title,
        defaultUser: this.properties.currentUser,
        startFromUser: this.properties.selectedUser,
        showAllManagers: this.properties.showAllManagers,
        showGuestUsers: this.properties.showGuestUsers,
        context: this.context,
        showActionsBar: this.properties.showActionsBar,
        sp: this.sp,
      }
    );

    ReactDom.render(element, this.domElement);
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
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel,
                }),
                PropertyFieldPeoplePicker("selectedUser", {
                  context: this.context,
                  label: strings.startFromUserLabel,
                  initialData: this.properties.selectedUser,
                  key: "peopleFieldId",
                  multiSelect: false,
                  allowDuplicate: false,
                  principalType: [PrincipalType.Users],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                }),
                PropertyPaneToggle("showAllManagers", {
                  label: strings.showAllManagers,
                }),
                PropertyPaneToggle("showGuestUsers", {
                  label: strings.showGuestUsers,
                }),
                PropertyPaneToggle("showActionsBar", {
                  label: strings.showactionsLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
