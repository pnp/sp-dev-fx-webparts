import * as React from "react";
import styles from "./TeamsNotificationSender.module.scss";
import { ITeamsNotificationSenderProps } from "./ITeamsNotificationSenderProps";
import { ITeamsNotificationSenderState } from "./ITeamsNotificationSenderState";
import { PeoplePicker } from "@microsoft/mgt-react";
import { TextField } from "office-ui-fabric-react/lib/components/TextField/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton";

export default class TeamsNotificationSender extends React.Component<
  ITeamsNotificationSenderProps,
  ITeamsNotificationSenderState
> {
  constructor(props: ITeamsNotificationSenderProps) {
    super(props);
    this.state = {
      groupName: "",
      selectedPeople: "",
      notificationText: "",
    };
    this._sendNotification = this._sendNotification.bind(this);
  }

  private _getGroupName(id: string): void {
    this.props.webpartContext.msGraphClientFactory
      .getClient()
      .then((graphClient) => {
        graphClient
          .api(`/groups/${id}/displayName`)
          .get((error, response: any, rawResponse?: any) => {
            if (error) {
              console.error(error);
              return;
            }

            this.setState({
              groupName: response.value,
            });
          });
      });
  }

  private _sendNotification(): void {
    const endpoint: string = `https://graph.microsoft.com/beta/teams/${this.props.groupId}`;

    const notificationBody: any = {
      topic: {
        source: "entityUrl",
        value: endpoint,
      },
      activityType: "readThisRequired",
      previewText: {
        content: this.state.notificationText,
      },
      recipient: {
        "@odata.type": "microsoft.graph.aadUserNotificationRecipient",
        userId: this.state.selectedPeople,
      },
    };

    console.log(notificationBody);

    this.props.webpartContext.msGraphClientFactory
      .getClient()
      .then((graphClient) => {
        graphClient
          .api(`${endpoint}/sendActivityNotification`)
          .post(notificationBody);
      });
  }

  public componentDidMount(): void {
    this._getGroupName(this.props.groupId);
  }

  public render(): React.ReactElement<ITeamsNotificationSenderProps> {
    if (!this.props.groupId) {
      return (
        <p>
          GroupId not available. Ensure the webpart is running in Teams or
          SharePoint Team Site
        </p>
      );
    }

    if (!this.state.groupName) {
      return <p>Loading data...</p>;
    }

    const handleSelectionChanged = (e) => {
      console.log(e.target.selectedPeople);
      this.setState({ selectedPeople: e.target.selectedPeople[0].id });
    };

    return (
      <div className={styles.teamsNotificationSender}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1>{this.state.groupName}</h1>
              <TextField
                label="Please enter notification text"
                onChange={(event) => {
                  this.setState({
                    notificationText: (event.target as HTMLInputElement).value,
                  });
                }}
              />
              <p>Select the user to Notify:</p>
              <PeoplePicker
                selectionChanged={handleSelectionChanged}
                selectionMode="single"
                groupId={this.props.groupId}
              />
              <PrimaryButton text="Primary" onClick={this._sendNotification} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
