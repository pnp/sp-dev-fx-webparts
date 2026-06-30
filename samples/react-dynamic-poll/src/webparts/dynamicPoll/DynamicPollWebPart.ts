import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";

import DynamicPoll from "./components/DynamicPoll";
import { SharePointService } from "../../services/SharePointService";

import { Poll, PollResult } from "./models/Poll";

export interface DynamicPollWebPartProps {
  description: string;
}

export default class DynamicPollWebPart extends BaseClientSideWebPart<DynamicPollWebPartProps> {
  private _sharePointService: SharePointService;
  private _pollItem: Poll | undefined = undefined;
  private _pollResults: PollResult[] = [];
  private _userVote: string | undefined = undefined;
  private _totalVotes: number = 0;

  public render(): void {
    const element: React.ReactElement = React.createElement(DynamicPoll, {
      pollItem: this._pollItem,
      sharePointService: this._sharePointService,
      initialPollResults: this._pollResults,
      initialUserVote: this._userVote,
      initialTotalVotes: this._totalVotes,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sharePointService = new SharePointService(this.context);

    // Fetch list item from Polls list
    await this._getPollItems();

    // If we have a poll, fetch initial data
    if (this._pollItem) {
      try {
        this._userVote = await this._sharePointService.getUserVote(
          this._pollItem.Id,
        );
        const { results, totalVotes } =
          await this._sharePointService.getPollResults(this._pollItem);
        this._pollResults = results;
        this._totalVotes = totalVotes;
      } catch (err) {
        console.error("Error initializing poll data", err);
      }
    }
  }

  private async _getPollItems(): Promise<void> {
    try {
      this._pollItem = await this._sharePointService.getActivePoll();
      console.log("Fetched Poll Item:", this._pollItem);
    } catch (error) {
      console.error("Error fetching poll items:", error);
    }
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
              groupFields: [],
            },
          ],
        },
      ],
    };
  }
}
