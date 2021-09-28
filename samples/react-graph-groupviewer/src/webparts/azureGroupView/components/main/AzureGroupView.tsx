import * as React from 'react';
import styles from './AzureGroupView.module.scss';
import { IAzureGroupViewProps } from './IAzureGroupViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import { graph } from "@pnp/graph";
import "@pnp/graph/groups";
import { IAzureGroupViewState } from './IAzureGroupViewState';
import { GroupList } from '../grouplist/GroupList';
import { GroupDetails } from '../groupdetails/GroupDetails';


export class AzureGroupView extends React.Component<IAzureGroupViewProps, IAzureGroupViewState> {

  constructor(props: IAzureGroupViewProps) {
    super(props);

    this.state = {
      searchResults: null,
    };

  }

  public render(): React.ReactElement<IAzureGroupViewProps> {
    return (
      <div className={ styles.azureGroupView }>
        <TextField label="Search Groups" onChange={(event: React.FormEvent<HTMLInputElement>, newValue: string) => {this._searchGroups(newValue);}} />
        <br />
        <GroupList results={this.state.searchResults} />
      </div>
    );
  } 

  private _searchGroups = (searchText: string): void => {
    graph.groups.search(`displayName:${searchText}`).top(5).get().then(groups => {
      this.setState({
        searchResults: groups
      });
    });
  }

}
