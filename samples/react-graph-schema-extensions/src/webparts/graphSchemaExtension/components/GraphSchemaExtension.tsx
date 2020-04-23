import * as React from "react";
import { escape } from "@microsoft/sp-lodash-subset";
import styles from "./GraphSchemaExtension.module.scss";
import { IGraphSchemaExtensionProps, IGraphSchemaExtensionState, ISalesDataSchemaExtension } from "./IGraphSchemaExtensionProps";
import { GraphHttpClient, HttpClientResponse, GraphHttpClientConfiguration, IGraphHttpClientOptions } from "@microsoft/sp-http";
import { Guid } from "@microsoft/sp-core-library";
import { TextField, DefaultButton } from "office-ui-fabric-react";


export default class GraphSchemaExtension extends React.Component<IGraphSchemaExtensionProps, IGraphSchemaExtensionState> {

  private graphClient: GraphHttpClient;

  private _onBusinessUnitChanged(value: any): void {
    let stateCopy: ISalesDataSchemaExtension = this.state.data;
    stateCopy.businessUnit = value;
    this.setState({
      data: stateCopy
    });
  }

  private _onEstimatedBudgetChanged(value: any): void {
    let stateCopy: ISalesDataSchemaExtension = this.state.data;
    stateCopy.estimatedBudget = value;
    this.setState({
      data: stateCopy
    });
  }

  private _onExpectedClosedDateChanged(value: any): void {
    let stateCopy: ISalesDataSchemaExtension = this.state.data;
    stateCopy.expectedClosedDate = value;
    this.setState({
      data: stateCopy
    });
  }

  constructor() {
    super();

    this._update = this._update.bind(this);
    this._onBusinessUnitChanged = this._onBusinessUnitChanged.bind(this);
    this._onEstimatedBudgetChanged = this._onEstimatedBudgetChanged.bind(this);
    this._onExpectedClosedDateChanged = this._onExpectedClosedDateChanged.bind(this);


    this.state = {
      data: null
    };
  }

  /// so far is not allowed to create an Extension using GraphClient
  /// but if MS grant more permissions in future, this code should work
  /// current scopes allowed: Group.ReadWrite.All Reports.Read.All User.Read.All
  private async _createSchemaExtension(): Promise<any> {
    const httpClientOptions: IGraphHttpClientOptions = {
      body: JSON.stringify({
        "id": "inheritscloud_SalesCustomData02",
        "description": "Adding custom data to Groups created for sales",
        "owner": "ac638f16-63c2-462b-95a4-16f8a60b0628",
        "targetTypes": [
            "Group"
        ],
        "properties": [
          {
            "name": "businessUnit", "type": "String"
          },
          {
              "name": "estimatedBudget", "type": "Integer"
          },
          {
              "name": "expectedClosedDate", "type": "DateTime"
          }
        ]
      })
    };


    const response: HttpClientResponse = await this.graphClient.post(
      "v1.0/schemaExtensions",
      GraphHttpClient.configurations.v1, httpClientOptions);

    const responseJson: any = await response.json();

    return responseJson;
  }

  /// not allowed so far. Even for your own user, you can´t update a custom Schema ext.
  private async _updateMeUser(): Promise<any> {
    const httpClientOptions: IGraphHttpClientOptions = {
      method: "PATCH",
      body: JSON.stringify({
        "inheritscloud_SocialData": {
          "twitter": "@luismanez",
          "facebook": "facebook.com/luismanez",
          "lastEvent": "2018-06-09T10:30:00",
          "isSpeaker": true
        }
      })
    };

    const response: HttpClientResponse = await this.graphClient.fetch(
      "v1.0/me",
      GraphHttpClient.configurations.v1,
      httpClientOptions);

    const responseJson: any = await response.json();

    return responseJson;
  }

  private async _getCustomExtension(): Promise<ISalesDataSchemaExtension> {
    const groupId: Guid = this.props.context.pageContext.site.group.id;

    const response: HttpClientResponse = await this.graphClient.get(
      `v1.0/groups/${groupId}/?$select=id,displayName,inheritscloud_SalesCustomData`,
      GraphHttpClient.configurations.v1);

    const responseJson: any = await response.json();

    const groupSchemaExtenion: ISalesDataSchemaExtension = {
      id: responseJson.id,
      displayName: responseJson.displayName,
      expectedClosedDate: responseJson.inheritscloud_SalesCustomData &&
        responseJson.inheritscloud_SalesCustomData.expectedClosedDate,
      estimatedBudget: responseJson.inheritscloud_SalesCustomData &&
        responseJson.inheritscloud_SalesCustomData.estimatedBudget,
      businessUnit: responseJson.inheritscloud_SalesCustomData &&
        responseJson.inheritscloud_SalesCustomData.businessUnit
    };

    return groupSchemaExtenion;
  }

  private async _updateExtensionInGroup(): Promise<any> {
    console.log("About to update Extension with data: ", this.state.data);

    const httpClientOptions: IGraphHttpClientOptions = {
      method: "PATCH",
      body: JSON.stringify({
        "inheritscloud_SalesCustomData": {
          "businessUnit": this.state.data.businessUnit,
          "estimatedBudget": this.state.data.estimatedBudget,
          "expectedClosedDate": this.state.data.expectedClosedDate
        }
      })
    };

    const groupId: Guid = this.props.context.pageContext.site.group.id;

    const response: HttpClientResponse = await this.graphClient.fetch(
      `v1.0/groups/${groupId}`,
      GraphHttpClient.configurations.v1,
      httpClientOptions);

    return response.status;
  }

  private async _update(): Promise<void> {
    console.log(this.state.data);
    const updated: any = await this._updateExtensionInGroup();
    if (updated === 204) {
      console.log("Data updated successfuly");
    } else {
      console.log("Error updating data");
    }
  }

  public componentWillMount(): void {
    this.graphClient = this.props.context.graphHttpClient;
  }

  public componentDidMount(): void {

    this._getCustomExtension().then((value) => {
      console.log(value);
      this.setState({
        data: value
      });
    }).catch((error: any) => {
      console.log(error);
      this.setState({
        data: {id: null, displayName: "ERROR"}
      });
    });
  }

  public render(): React.ReactElement<IGraphSchemaExtensionProps> {

    let content: any = <div>Loading ...</div>;

    if (this.state.data !== null) {
      content = <div>
        <h3>{this.state.data.displayName} ({this.state.data.id})</h3>
        <div>
          <TextField label="Business Unit"
            defaultValue={this.state.data.businessUnit}
            onChanged={this._onBusinessUnitChanged} />
        </div>
        <div>
          <TextField label="Estimated Budget"
            defaultValue={this.state.data.estimatedBudget.toString()}
            onChanged={this._onEstimatedBudgetChanged} />
        </div>
        <div>
          <TextField label="Expected Closed Date"
            defaultValue={this.state.data.expectedClosedDate.toString()}
            onChanged={this._onExpectedClosedDateChanged} />
        </div>
        <DefaultButton
            primary={true}
            text="Update"
            onClick={this._update}
          />
      </div>;
    }

    return (
      <div className={ styles.container }>
        <h2>Group sales data (MS Graph custom Schema extension)</h2>
        { content }
      </div>
    );
  }
}
