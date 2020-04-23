import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { escape } from "@microsoft/sp-lodash-subset";
import * as jquery from "jquery";

import styles from "./SkypePresenceWebPart.module.scss";
import * as strings from "SkypePresenceWebPartStrings";
import { SkypeForBusinessCommunicationService } from "./services";

export interface ISkypePresenceWebPartProps {
  description: string;
}

export default class SkypePresenceWebPartWebPart extends BaseClientSideWebPart<ISkypePresenceWebPartProps> {

  public render(): void {
    const skypeService: SkypeForBusinessCommunicationService = new SkypeForBusinessCommunicationService(() => this.context);
    this.domElement.innerHTML = `
      <div class="${ styles.skypePresence }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Skype presence with UCWA JS SDK sample for SPFX</span>
              <p class="${ styles.subTitle }">Enter the email address of the user you want to see the status change</p>
              <input type="email" id="emailaddress" /><input type="button" value="subscribe" id="subbutton" /><br />
              Status <span id="status">Loading...</span>
            </div>
          </div>
        </div>
      </div>`;
      jquery("#subbutton").click(async () => {
        const emailAddress: string = jquery("#emailaddress").val() as string;
        await skypeService.SubscribeToStatusChangeForUser(emailAddress, "Name", (newStatus, oldStatus, displayName) => {
          jquery("#status").text(newStatus);
        });
      });
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
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
