import * as React from 'react';
import styles from './TeamsMembershipUpdater.module.scss';
import { ITeamsMembershipUpdaterProps } from './ITeamsMembershipUpdaterProps';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, ProgressIndicator, Separator, PrimaryButton, MessageBar, MessageBarType, Link, Toggle, List, Dropdown, IDropdownOption, Text, TeachingBubble, Icon, Callout, mergeStyleSets, FontWeights } from 'office-ui-fabric-react';
import { ITeamsMembershipUpdaterWebPartProps } from '../TeamsMembershipUpdaterWebPart';
import { usePapaParse } from 'react-papaparse';
import { MSGraphClient, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react';
import * as strings from 'TeamsMembershipUpdaterWebPartStrings';
import { emailColumnPlaceholder, selectTeamPlacehold } from 'TeamsMembershipUpdaterWebPartStrings';

export enum Stage {
  LoadingTeams,
  CheckingOwnership,
  LoadingCurrentMembers,
  ComparingMembers,
  RemovingOrphendMembers,
  AddingNewMembers,
  LoggingDone,
  Done,
  ErrorOwnership,
  Ready
}

export interface ITeamsMembershipUpdaterState {
  items: IDropdownOption[];
  privateChannels: IDropdownOption[];
  selectionDetails: IDropdownOption;
  selectionChannel: IDropdownOption;
  csvdata: any[];
  csvcolumns: IColumn[];
  csvSelected: IDropdownOption;
  csvItems: IDropdownOption[];
  me: string;
  groupOwners: string[];
  groupMembers: Array<MicrosoftGraph.User>;
  stage: Stage;
  logs: Array<string>;
  errors: Array<string>;
  logurl: string;
  delete: boolean;
  orphanedMembersHelp: boolean;
}

interface IMemberReturn {
  value: MicrosoftGraph.User[];
  "@odata.nextLink": string;
}

export interface IRequest {
  requests: any[];
}

export default class TeamsMembershipUpdater extends React.Component<ITeamsMembershipUpdaterProps, ITeamsMembershipUpdaterState> {
  private _datacolumns: IColumn[];
  private _data: any[];

  constructor(props: ITeamsMembershipUpdaterWebPartProps) {
    super(props);

    this.state = {
      items: props.items,
      privateChannels: [],
      selectionDetails: null,
      selectionChannel: null,
      csvdata: null,
      csvcolumns: [],
      csvSelected: null,
      csvItems: [],
      me: null,
      groupOwners: [],
      groupMembers: [],
      stage: Stage.LoadingTeams,
      logs: [],
      errors: [],
      logurl: null,
      delete: true,
      orphanedMembersHelp: false
    };
  }

  public addError = (e: string, o: any): void => {
    console.error(e, o);
    let _log: Array<string> = this.state.errors;
    _log.push(e);
    this.setState({ ...this.state, errors: _log });
  }

  public addLog = (e: string): void => {
    let _log: Array<string> = this.state.logs;
    _log.push(e);
    this.setState({ ...this.state, logs: _log });
  }

  public handleOnDrop = (data) => {
    var h = data[0].meta.fields;
    this._data = data.map(r => { return r.data; });
    this._datacolumns = h.map(r => { return { key: r.replace(' ', ''), name: r, fieldName: r, isResizable: true }; });
    this.setState({ ...this.state, csvcolumns: this._datacolumns, csvdata: this._data, csvItems: h.map(r => { return { key: r.replace(' ', ''), text: r }; }), logs: [], errors: [], logurl: null });
  }

  public handleOnError = (err, file, inputElem, reason) => {
    console.error(err);
  }

  public handleOnRemoveFile = (data) => {
    this._data = null;
    this.setState({ ...this.state, csvdata: null });
  }

  private fileChange = (filePickerResult: IFilePickerResult[]) => {
    this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      filePickerResult.forEach(f => {
        f.downloadFileContent().then((file) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = ((ev) => {
            let decodedString = new TextDecoder('utf-8').decode(new DataView(reader.result as ArrayBuffer));
            const { readString } = usePapaParse();
            readString(decodedString, { header: true, skipEmptyLines: true, worker: true, complete: (results) => {
              var h = results.meta.fields;
              this._data = results.data;
              this._datacolumns = h.map(r => { return { key: r.replace(' ', ''), name: r, fieldName: r, isResizable: true, minWidth: 100 }; });
              this.setState({ ...this.state, csvcolumns: this._datacolumns, csvdata: this._data, csvItems: h.map(r => ({ key: r.replace(' ', ''), text: r })), logs: [], errors: [], logurl: null });
            } });
          });
        });
      });
    });
  }

  public onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ ...this.state, stage: Stage.CheckingOwnership, selectionChannel: null, privateChannels: [], logs: [], errors: [], logurl: null });
    this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      client.api(`groups/${item.key}/owners`).version("v1.0").get((err, res) => {
        if (err) {
          this.addError(err.message, err);
          return;
        }
        let _owners: Array<string> = new Array<string>();
        let b: boolean = false;
        res.value.forEach(element => {
          _owners.push(element.userPrincipalName);
          if (element.userPrincipalName == this.state.me) b = true;
        });
        if (b) {
          this.setState({ ...this.state, selectionDetails: item, groupOwners: _owners, stage: Stage.Ready });
          client.api(`/teams/${item.key}/channels?$filter=membershipType eq 'private'`).get((err2, res2: { value: MicrosoftGraph.Channel[] }) => {
            if (err2) {
              this.addError(err2.message, err2);
              return;
            }
            res2.value = res2.value.sort((a1, b1) => a1.displayName.localeCompare(b1.displayName));
            this.setState({...this.state, selectionDetails: item, groupOwners: _owners, stage: Stage.Ready, privateChannels: res2.value.length === 0 ? [] : [{ key: 'null', text: strings.noChannel }].concat(res2.value.map(r => ({ key: r.id, text: r.displayName }))) });
          });
        }
        else this.setState({ ...this.state, stage: Stage.ErrorOwnership });
      });
    });
  }

  public onChannelChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ ...this.state, stage: Stage.Ready, selectionChannel: item.key !== "null" ? item : null, logs: [], errors: [], logurl: null });
  }

  public onEmailChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ ...this.state, csvSelected: item });
  }

  public onToggleDelete = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ ...this.state, delete: checked });
  }

  private loadMembers = async (url: string, client: MSGraphClient): Promise<Array<MicrosoftGraph.User>> => {
    return new Promise<Array<MicrosoftGraph.User>>(result => {
      client.api(url).version("v1.0").get((err, res: IMemberReturn) => {
        if (err) {
          this.addError(err.message, err);
        }
        let _m = res.value;
        if (res['@odata.nextLink']) this.loadMembers(res['@odata.nextLink'], client).then((members) => { _m = _m.concat(members); });
        result(_m);
      });
    });
  }

  private loadChannelMembers = async (client: MSGraphClient, url: string): Promise<Array<MicrosoftGraph.AadUserConversationMember>> => {
    return new Promise<Array<MicrosoftGraph.AadUserConversationMember>>(result => {
      client.api(url).get((err, res: { value: MicrosoftGraph.AadUserConversationMember[], '@odata.nextLink'?: string }) =>{
        if (err) {
          this.addError(err.message, err);
        }
        let _m = res.value;
        if (res['@odata.nextLink']) this.loadChannelMembers(client, res['@odata.nextLink']).then((members) => { _m = _m.concat(members); });
        result(_m);
      });
    });
  }

  public onRun = (e) => {
    this.setState({ ...this.state, stage: Stage.LoadingCurrentMembers });
    this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      if (this.state.selectionChannel === null) {
        this.loadMembers(`groups/${this.state.selectionDetails.key}/members`, client).then((_members) => {
          this.setState({ ...this.state, groupMembers: _members, stage: Stage.ComparingMembers });

          this.addLog(`Found ${_members.length} members existing in the group`);

          let _delete: Array<MicrosoftGraph.User> = new Array<MicrosoftGraph.User>();

          //filter the members lists to find out if they no longer exist in the csv file and add those to the delete queue, ignore group owners
          _members = _members.filter(m => {
            if (this._data.some(value => value[this.state.csvSelected.text].toLowerCase() === m.mail.toLowerCase()) || this.state.groupOwners.some(value => value.toLowerCase() === m.userPrincipalName.toLowerCase())) return m;
            else { if (this.state.delete == true) { _delete.push(m); this.addLog(`Will delete ${m.mail}`); } }
          });

          let reqs: IRequest[] = [];
          if (this.state.delete == true) {
            this.setState({ ...this.state, stage: Stage.RemovingOrphendMembers });
            let _i, _j, _k, temparray, chunk = 20;
            for (_i = 0, _j = _delete.length, _k = 0; _i < _j; _i += chunk) {
              temparray = _delete.slice(_i, _i + chunk);
              reqs.push({ requests: temparray.map(e1 => { _k++; return { id: `${_k}`, method: "DELETE", url: `groups/${this.state.selectionDetails.key}/members/${e1.id}/$ref` }; }) });
            }
          }

          let newMembers: string[] = [];

          //filter the csv to look for users that do not exist the members list and add those to the add queue
          this._data.forEach(async e2 => {
            if (_members.some(m => m.mail.toLowerCase() === e2[this.state.csvSelected.text].toLowerCase()) == false) {
              newMembers.push(e2[this.state.csvSelected.text]);
              this.addLog(`Will add ${e2[this.state.csvSelected.text]}`);
            }
          });

          //send delete batches to the graph, if they exist
          if (reqs.length > 0) {
            this.addLog(`${reqs.length} Delete Batches Detected`);
            reqs.forEach(r => {
              if (r.requests.length > 0) {
                this.addLog(`Deleting ${r.requests.length} users as a batch`);
                client.api("$batch").version("v1.0").post(r, (er, re) => {
                  if (er) { this.addError(er.message, er); return; }
                  if (re) re.reponses.forEach(e3 => { if (e3.body.error) this.addError(e3.body.error.message, e3.body.error); });
                  this.addLog(`Deleting Batch Done`);
                });
              }
            });
            //once the delete batches are done call the add members function, if no new members are needed call the Done function
            if (newMembers.length == 0) this.Done();
            else this.addMembers(newMembers, client);
          } //if no new members are needed call the Done function
          else if (newMembers.length == 0) this.Done();
          else this.addMembers(newMembers, client);
        });
      }
      else {
        this.loadChannelMembers(client, `teams/${this.state.selectionDetails.key}/channels/${this.state.selectionChannel.key}/members`).then((_members) => {
          this.setState({ ...this.state, groupMembers: _members, stage: Stage.ComparingMembers });

          this.addLog(`Found ${_members.length} members existing in the channel`);

          let _delete: Array<MicrosoftGraph.AadUserConversationMember> = new Array<MicrosoftGraph.AadUserConversationMember>();

          //filter the members lists to find out if they no longer exist in the csv file and add those to the delete queue, ignore group owners
          _members = _members.filter(m => {
            if (this._data.some(value => value[this.state.csvSelected.text].toLowerCase() === m.email.toLowerCase()) || this.state.groupOwners.some(value => value.toLowerCase() === m.email.toLowerCase())) return m;
            else { if (this.state.delete == true) { _delete.push(m); this.addLog(`Will delete ${m.email}`); } }
          });

          let reqs: IRequest[] = [];
          if (this.state.delete == true) {
            this.setState({ ...this.state, stage: Stage.RemovingOrphendMembers });
            let _i, _j, _k, temparray, chunk = 20;
            for (_i = 0, _j = _delete.length, _k = 0; _i < _j; _i += chunk) {
              temparray = _delete.slice(_i, _i + chunk);
              reqs.push({ requests: temparray.map(e1 => { _k++; return { id: `${_k}`, method: "DELETE", url: `teams/${this.state.selectionDetails.key}/channels/${this.state.selectionChannel.key}/${e1.id}` }; }) });
            }
          }

          let newMembers: string[] = [];

          //filter the csv to look for users that do not exist the members list and add those to the add queue
          this._data.forEach(async e2 => {
            if (_members.some(m => m.email.toLowerCase() === e2[this.state.csvSelected.text].toLowerCase()) == false) {
              newMembers.push(e2[this.state.csvSelected.text]);
              this.addLog(`Will add ${e2[this.state.csvSelected.text]}`);
            }
          });

          //send delete batches to the graph, if they exist
          if (reqs.length > 0) {
            this.addLog(`${reqs.length} Delete Batches Detected`);
            reqs.forEach(r => {
              if (r.requests.length > 0) {
                this.addLog(`Deleting ${r.requests.length} users as a batch`);
                client.api("$batch").version("v1.0").post(r, (er, re) => {
                  if (er) { this.addError(er.message, er); return; }
                  if (re) re.reponses.forEach(e3 => { if (e3.body.error) this.addError(e3.body.error.message, e3.body.error); });
                  this.addLog(`Deleting Batch Done`);
                });
              }
            });
            //once the delete batches are done call the add members function, if no new members are needed call the Done function
            if (newMembers.length == 0) this.Done();
            else this.addMembers(newMembers, client);
          } //if no new members are needed call the Done function
          else if (newMembers.length == 0) this.Done();
          else this.addMembers(newMembers, client);
        });
      }
    });
  }

  public Done = (): void => {
    this.setState({ ...this.state, stage: this.props.loglist !== null || this.props.loglist !== undefined ? Stage.LoggingDone : Stage.Done });
    if (this.props.loglist !== null || this.props.loglist !== undefined) {
      //If Log list provided place the log entries into the list
      this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this.props.loglist.title}')?$select=ListItemEntityTypeFullName`, SPHttpClient.configurations.v1)
        .then((res: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string; }> => {
          return res.json();
        })
        .then((web: { ListItemEntityTypeFullName: string }): void => {
          const p = {
            //"__metadata": { "type": web.ListItemEntityTypeFullName },
            "Title": `${this.state.selectionDetails.text} update ${new Date().toString()}`,
            "Logs": this.state.logs.join(", \n"),
            "Errors": this.state.errors.join(", \n")
          };

          this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this.props.loglist.title}')/items`, SPHttpClient.configurations.v1, {
            body: JSON.stringify(p)
          }).then((res: SPHttpClientResponse): Promise<{ w: any; }> => {
            return res.json();
          }).then((w: any): void => {
              this.setState({ ...this.state, stage: Stage.Done, logurl: `${this.props.loglist.url}/my.aspx` });
          });
        });
    }
  }

  public addMembers = (newMembers: string[], client: MSGraphClient): void => {
    this.setState({ ...this.state, stage: Stage.AddingNewMembers });

    //create add member graph batches (batches of 20 operations)
    let reqs: IRequest[] = [];
    let _i, _j, _k, temparray, chunk = 20;
    for (_i = 0, _j = newMembers.length, _k = 0; _i < _j; _i += chunk) {
      temparray = newMembers.slice(_i, _i + chunk);
      reqs.push({ requests: temparray.map(e => { _k++; return { id: `${_k}`, method: "GET", url: `users/${e}?$select=id` }; }) });
    }

    //we need to get the AzureAD object id of the user from the email to use the add member ref function, so we call the graph to get those and generate new batches
    this.addLog(`Getting Object IDs for ${newMembers.length} Members to Add from Graph`);
    for (let i = 0; i < reqs.length; i++) {
      client.api("$batch").version("v1.0").post(reqs[i], (er, re) => {
        if (er) { this.addError(er.message, er); return; }
        let newreq: IRequest = { requests: [] };
        if (re) {
          re.responses.forEach(e => {
            if (e.body.error) this.addError(e.body.error.message, e.body.error);
            else {
              newreq.requests.push({
                id: `${newreq.requests.length + 1}`,
                method: "POST",
                url: this.state.selectionChannel === null ? `groups/${this.state.selectionDetails.key}/members/$ref` : `teams/${this.state.selectionDetails.key}/channels/${this.state.selectionChannel.key}/members`,
                headers: { "Content-Type": "application/json" },
                body: this.state.selectionChannel === null ?
                  { "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${e.body.id}` } :
                  { "@odata.type": "#microsoft.graph.aadUserConversationMember", "roles": [], "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${e.body.id}')` }
              });
            }
          });
          this.addLog(`Adding ${newreq.requests.length} Members`);
          //post the actual adding batch to graph
          client.api("$batch").version("v1.0").post(newreq, (err, res) => {
            if (err) { this.addError(err.message, err); return; }
            if (res) {
              res.responses.forEach(e => {
                if (e.body.error) this.addError(e.body.error.message, e.body.error);
              });
              this.addLog("Adding Done");
              this.Done();
            }
            this.addLog("Adding Done");
            this.Done();
          });
        }
      });

    }

  }

  public componentDidMount(): void {
    this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      let req = {
        requests: [
          { id: "1", method: "GET", url: "me" },
          { id: "2", method: "GET", url: "me/joinedTeams" }
        ]
      };
      client.api("$batch").version("v1.0").post(req, (err, res) => {
        if (err) {
          this.addError(err.message, err);
          return;
        }
        let teams: Array<IDropdownOption> = res.responses[1].body.value.map(item => ({ key: item.id, text: item.displayName }));
        if (res.responses[1].body['@odata.nextLink']) this.loadMoreTeams(client, res.responses[1].body['@odata.nextLink']).then((value) => teams = teams.concat(value));
        teams = teams.sort((a, b) => a.text.localeCompare(b.text));
        this.setState({ ...this.state, me: res.responses[0].body.userPrincipalName, items: teams, stage: Stage.Ready });

      });
    });
  }

  private loadMoreTeams = (client: MSGraphClient, url: string) : Promise<IDropdownOption[]> => {
    return new Promise<IDropdownOption[]>((resolve) => {
      client.api(url).get((error, response: { value: MicrosoftGraph.Team[],'@odata.nextLink'?: string }) => {
        if (response['@odata.nextLink']) this.loadMoreTeams(client, response['@odata.nextLink']).then((value) => response.value = response.value.concat(value));
        resolve(response.value.map(item => ({ key: item.id, text: item.displayName })));
      });
    });
  }

  public render(): React.ReactElement<ITeamsMembershipUpdaterProps> {
    const { items, csvItems, orphanedMembersHelp, csvdata, csvcolumns, stage, csvSelected, logurl, logs, errors, privateChannels } = this.state;
    const mg = mergeStyleSets({
      callout: {
        width: 320,
        padding: '20px 24px',
      },
      title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
      }
    });
    return (
      <div className={styles.teamsMembershipUpdater}>
        <div className={styles.container}>
          <Text variant="xLarge">{this.props.title}</Text>
          {stage == Stage.Done && <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
              {strings.doneText}
            {logurl != null && <Link href={logurl}>{strings.doneHistory}</Link>}
          </MessageBar>}
          {stage == Stage.LoadingTeams && <ProgressIndicator label={strings.loadingTeams} description={strings.loadingTeamsDescription} />}
          {stage == Stage.LoadingCurrentMembers && <ProgressIndicator label={strings.loadingMembersLabel} description={strings.loadingMembersDescription} />}
          {stage == Stage.ComparingMembers && <ProgressIndicator label={strings.comparingMembers} description={strings.comparingMembersDescription} />}
          {stage == Stage.RemovingOrphendMembers && <ProgressIndicator label={strings.removingOrphend} description={strings.removingOrphendDescription} />}
          {stage == Stage.AddingNewMembers && <ProgressIndicator label={strings.addingNew} description={strings.addingNewDescription} />}
          {stage == Stage.LoggingDone && <ProgressIndicator label={strings.logging} description={strings.loggingDescription} />}
          <Dropdown label={strings.selectTeam} onChange={this.onChange} placeholder={selectTeamPlacehold} options={items} disabled={items.length == 0} required />
          {stage == Stage.CheckingOwnership && <ProgressIndicator label={strings.checkingOwner} description={strings.checkingOwnerDescription} />}
          {stage == Stage.ErrorOwnership && <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>You are not an owner of this group. Please select another.</MessageBar>}
          <Dropdown label={strings.selectChannel } onChange={this.onChannelChange} placeholder={strings.selectChannelPlaceholder} options={privateChannels} disabled={privateChannels.length === 0} />
          <FilePicker accepts={[".csv"]} buttonLabel={strings.selectFile} buttonIcon="ExcelDocument" label={strings.selectFileLabel} required
            hideStockImages hideOrganisationalAssetTab hideSiteFilesTab hideWebSearchTab hideLinkUploadTab onSave={this.fileChange} onChange={this.fileChange} context={this.props.context} />
          <Dropdown label={strings.emailColumn} onChange={this.onEmailChange} placeholder={emailColumnPlaceholder} options={csvItems.filter(o => o.text !== "")} disabled={!csvdata} required />
          <Toggle label={<span>4. Remove Orphaned Members <Icon iconName="Info" onMouseEnter={() => this.setState({...this.state, orphanedMembersHelp: true})} id="orphanedMembers" /></span>} inlineLabel onText={strings.on} offText={strings.off} defaultChecked={true} onChange={this.onToggleDelete} />
          {orphanedMembersHelp && <Callout target="#orphanedMembers" className={mg.callout} onDismiss={() => this.setState({...this.state, orphanedMembersHelp: false})}>
            <Text block variant="xLarge" className={mg.title}>{strings.orphanedMembersTitle}</Text>
            {strings.orphanedMembersContent}
          </Callout>}
          <PrimaryButton text={strings.submitButton} onClick={this.onRun} allowDisabledFocus disabled={!csvdata || items.length == 0 || stage != Stage.Ready || !csvSelected} />

          <Separator>CSV Preview</Separator>
          {csvdata && <DetailsList
            items={csvdata}
            columns={csvcolumns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
          />}
          {logs.length > 0 && (<><Separator>Logs</Separator><List items={logs} onRenderCell={this._onRenderCell} /></>)}
          {errors.length > 0 && (<><Separator>Errors</Separator><List items={errors} onRenderCell={this._onRenderCell} /></>)}
        </div>
      </div>
    );
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    return (
      <div data-is-focusable={true}>
        <div style={{ padding: 2 }}>
          {item}
        </div>
      </div>
    );
  }
}
