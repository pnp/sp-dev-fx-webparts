import * as React from 'react';
import styles from './TeamsTagging.module.scss';
import { ITeamsTaggingProps, ITeamInfo } from './ITeamsTaggingProps';
import { TaxonomyPicker, IPickerTerms, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { ITeamsTaggingState } from './ITeamsTaggingState';
import { DefaultButton } from "office-ui-fabric-react";
import { Guid } from '@microsoft/sp-core-library';
import { HttpClientResponse, GraphHttpClient, IGraphHttpClientOptions } from '@microsoft/sp-http';

export default class TeamsTagging extends React.Component<ITeamsTaggingProps, ITeamsTaggingState> {

  private readonly separator: string = "__";

  constructor(props: ITeamsTaggingProps) {
    super(props);

    this._findSimilarTeams = this._findSimilarTeams.bind(this);
    this._updateTeamTags = this._updateTeamTags.bind(this);
    this._onTaxPickerChange = this._onTaxPickerChange.bind(this);

    this.state = {
      similarTeams: [],
      tags: [],
      tagsUpdatedResult: ''
    };
  }

  private async _getTeamTags(): Promise<IPickerTerms> {
    const groupId: Guid = this.props.context.pageContext.site.group.id;

    const response: HttpClientResponse = await this.props.context.graphHttpClient.get(
      `v1.0/groups/${groupId}/?$select=id,displayName,inheritscloud_TeamsTagging`,
      GraphHttpClient.configurations.v1);

    const responseJson: any = await response.json();

    let tags: IPickerTerms = [];
    if (responseJson.inheritscloud_TeamsTagging.tag1) tags.push(this._toIPickerTerm(responseJson.inheritscloud_TeamsTagging.tag1));
    if (responseJson.inheritscloud_TeamsTagging.tag2) tags.push(this._toIPickerTerm(responseJson.inheritscloud_TeamsTagging.tag2));
    if (responseJson.inheritscloud_TeamsTagging.tag3) tags.push(this._toIPickerTerm(responseJson.inheritscloud_TeamsTagging.tag3));

    return tags;
  }

  private async _findSimilarTeams(): Promise<void> {
    const tag1: string = this._serializeIPickerTerm(this.state.tags[0]);

    const response: HttpClientResponse = await this.props.context.graphHttpClient.get(
      `v1.0/groups/?$filter=inheritscloud_TeamsTagging/tag1 eq '${tag1}'&$select=id,displayName,inheritscloud_TeamsTagging`,
      GraphHttpClient.configurations.v1);

    const responseJson: any = await response.json();

    const similarTeams = responseJson.value.map((team) => {
      let tags: IPickerTerms = [];

      if (team.inheritscloud_TeamsTagging.tag1) tags.push(this._toIPickerTerm(team.inheritscloud_TeamsTagging.tag1));
      if (team.inheritscloud_TeamsTagging.tag2) tags.push(this._toIPickerTerm(team.inheritscloud_TeamsTagging.tag2));
      if (team.inheritscloud_TeamsTagging.tag3) tags.push(this._toIPickerTerm(team.inheritscloud_TeamsTagging.tag3));

      const similarTeam: ITeamInfo = {
        id: team.id,
        name: team.displayName,
        tags: tags.map((t: IPickerTerm) => t.name)
      };
      return similarTeam;
    });

    this.setState({
      similarTeams: similarTeams
    });
  }

  private async _updateTeamTags(): Promise<void> {
    const updated: any = await this._updateExtensionInGroup();
    if (updated === 204) {
      this.setState({
        tagsUpdatedResult: 'Team tags updated successfully!'
      });
    } else {
      console.log("Error updating data");
    }
  }

  private async _updateExtensionInGroup(): Promise<any> {

    const httpClientOptions: IGraphHttpClientOptions = {
      method: "PATCH",
      body: JSON.stringify({
        "inheritscloud_TeamsTagging": {
          "tag1": this.state.tags[0] ? this._serializeIPickerTerm(this.state.tags[0]) : '',
          "tag2": this.state.tags[1] ? this._serializeIPickerTerm(this.state.tags[1]) : '',
          "tag3": this.state.tags[2] ? this._serializeIPickerTerm(this.state.tags[2]) : ''
        }
      })
    };

    const groupId: Guid = this.props.context.pageContext.site.group.id;

    const response: HttpClientResponse = await this.props.context.graphHttpClient.fetch(
      `v1.0/groups/${groupId}`,
      GraphHttpClient.configurations.v1,
      httpClientOptions);

    return response.status;
  }

  public componentDidMount(): void {
    this._getTeamTags().then((value) => {
      console.log(value);
      this.setState({
        tags: value
      });
    });
  }

  public render(): React.ReactElement<ITeamsTaggingProps> {

    let similarTeams: any;
    if (this.state.similarTeams.length > 0) {
      similarTeams = <div><h3>Similar teams:</h3><ul>
        {this.state.similarTeams.map(t => <li>{t.name} ({t.tags.map(tag => <span>{tag}, </span>)}) </li>)}
      </ul></div>;
    }

    return (
      <div className={styles.teamsTagging}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>

              <div>
                <TaxonomyPicker allowMultipleSelections={true}
                  termsetNameOrID={this.props.termSetId}
                  panelTitle="Select Term"
                  label="Select Tags for Team/Group..."
                  context={this.props.context}
                  onChange={this._onTaxPickerChange}
                  isTermSetSelectable={false}
                  initialValues={this.state.tags} />

                <DefaultButton
                  primary={true}
                  text="Update Team Tags"
                  onClick={this._updateTeamTags}
                />

                <p>{this.state.tagsUpdatedResult}</p>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <DefaultButton
                primary={true}
                text="Find similar Teams *"
                onClick={this._findSimilarTeams}
              />
              * (only using 1st tag)
              {similarTeams}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onTaxPickerChange(terms: IPickerTerms) {
    this.setState({
      tags: terms
    });
  }

  private _toIPickerTerm(input: string): IPickerTerm
  {
    const parts: string[] = input.split(this.separator);
    const pickerTerm: IPickerTerm = {
      key: parts[0],
      name: parts[1],
      path: parts[2],
      termSet: parts[3]
    };
    return pickerTerm;
  }

  private _serializeIPickerTerm(term: IPickerTerm): string {
    return `${term.key}${this.separator}${term.name}${this.separator}${term.path}${this.separator}${term.termSet}`;
  }
}
