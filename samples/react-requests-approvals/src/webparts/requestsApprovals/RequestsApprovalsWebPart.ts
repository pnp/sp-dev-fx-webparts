import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/behaviors/spfx";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";

import * as strings from "RequestsApprovalsWebPartStrings";
import RequestsApprovals from "./components/RequestsApprovals";
import { RequestsApprovalsService } from "./services/RequestsApprovalsService";

export interface IRequestsApprovalsWebPartProps {
  listTitle: string;
  title: string;
  titleField: string;
  statusField: string;
  approverField: string;
  requesterField: string;
  submittedField: string;
  decisionDateField: string;
  decisionCommentField: string;
  requestTypeField: string;
  amountField: string;
  descriptionField: string;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PROPERTIES: IRequestsApprovalsWebPartProps = {
  listTitle: "Approval Requests",
  title: "Requests and approvals",
  titleField: "Title",
  statusField: "ApprovalStatus",
  approverField: "AssignedApprover",
  requesterField: "SubmittedBy",
  submittedField: "SubmittedOn",
  decisionDateField: "DecisionOn",
  decisionCommentField: "DecisionNotes",
  requestTypeField: "RequestType",
  amountField: "Amount",
  descriptionField: "Description",
  pageSize: DEFAULT_PAGE_SIZE
};

export default class RequestsApprovalsWebPart extends BaseClientSideWebPart<IRequestsApprovalsWebPartProps> {
  private _sp?: SPFI;

  public async onInit(): Promise<void> {
    this._sp = spfi().using(SPFx(this.context));
    await super.onInit();
  }

  public render(): void {
    if (!this._sp) {
      return;
    }

    const pageSize = this.properties.pageSize >= 1 && this.properties.pageSize <= 50
      ? Math.floor(this.properties.pageSize)
      : DEFAULT_PAGE_SIZE;
    const configuredService = new RequestsApprovalsService(this._sp, {
      listTitle: this.properties.listTitle || DEFAULT_PROPERTIES.listTitle,
      fields: {
        title: this.properties.titleField || DEFAULT_PROPERTIES.titleField,
        status: this.properties.statusField || DEFAULT_PROPERTIES.statusField,
        approver: this.properties.approverField || DEFAULT_PROPERTIES.approverField,
        requester: this.properties.requesterField || DEFAULT_PROPERTIES.requesterField,
        submitted: this.properties.submittedField || DEFAULT_PROPERTIES.submittedField,
        decisionDate: this.properties.decisionDateField || DEFAULT_PROPERTIES.decisionDateField,
        decisionComment: this.properties.decisionCommentField || DEFAULT_PROPERTIES.decisionCommentField,
        requestType: this.properties.requestTypeField || undefined,
        amount: this.properties.amountField || undefined,
        description: this.properties.descriptionField || undefined
      }
    });
    const service = {
      getPendingRequests: async () => (await configuredService.getPendingRequests()).slice(0, pageSize),
      approveRequest: configuredService.approveRequest.bind(configuredService),
      rejectRequest: configuredService.rejectRequest.bind(configuredService)
    };
    const title = this.properties.title || DEFAULT_PROPERTIES.title;

    ReactDom.render(
      React.createElement(
        FluentProvider,
        { theme: webLightTheme },
        React.createElement(RequestsApprovals, { service, title })
      ),
      this.domElement
    );
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.ListGroupName,
              groupFields: [
                PropertyPaneTextField("listTitle", {
                  label: strings.ListTitleFieldLabel,
                  description: strings.ListTitleFieldDescription
                }),
                PropertyPaneTextField("title", { label: strings.WebPartTitleFieldLabel }),
                PropertyPaneSlider("pageSize", {
                  label: strings.PageSizeFieldLabel,
                  min: 1,
                  max: 50,
                  step: 1,
                  value: this.properties.pageSize || DEFAULT_PAGE_SIZE,
                  showValue: true
                })
              ]
            },
            {
              groupName: strings.FieldsGroupName,
              groupFields: [
                PropertyPaneTextField("titleField", { label: strings.TitleFieldLabel }),
                PropertyPaneTextField("statusField", { label: strings.StatusFieldLabel }),
                PropertyPaneTextField("approverField", { label: strings.ApproverFieldLabel }),
                PropertyPaneTextField("requesterField", { label: strings.RequesterFieldLabel }),
                PropertyPaneTextField("submittedField", { label: strings.SubmittedFieldLabel }),
                PropertyPaneTextField("decisionDateField", { label: strings.DecisionDateFieldLabel }),
                PropertyPaneTextField("decisionCommentField", { label: strings.DecisionCommentFieldLabel }),
                PropertyPaneTextField("requestTypeField", { label: strings.RequestTypeFieldLabel }),
                PropertyPaneTextField("amountField", { label: strings.AmountFieldLabel }),
                PropertyPaneTextField("descriptionField", { label: strings.DescriptionFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
