import * as React from 'react';
import styles from './Directory.module.scss';
import { IDirectoryProps } from './IDirectoryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PersonaCard } from './PersonaCard/PersonaCard';
import { spservices } from '../../../SPServices/spservices';
import { IDirectoryState } from './IDirectoryState';
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'DirectoryWebPartStrings';
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  SearchBox,
  Icon,
  Label
}
  from 'office-ui-fabric-react';
import { IProfileProperties } from '../../../SPServices/IProfileProperties';
import { PeoplePickerEntity, Search } from '@pnp/sp';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class Directory extends React.Component<IDirectoryProps, IDirectoryState> {

  private _services: spservices = null;

  constructor(props: IDirectoryProps) {
    super(props);

    this.state = { users: [], isLoading: true, errorMessage: '', hasError: false };

    this._services = new spservices(this.props.context);
    this._searchUsers = this._searchUsers.bind(this);
  }


  /**
   *
   *
   * @memberof Directory
   */
  public async componentDidMount() {


  }

  private async _searchUsers(searchText:string){
    this.setState({ isLoading: true });
    try {
      setTimeout( async () => {
        const users: PeoplePickerEntity[] = await this._services.getUsers(searchText);
        this.setState({ users: users, isLoading: false, errorMessage: '', hasError: false });
      }, 2500);

    } catch (error) {
      this.setState({ errorMessage: error.message, hasError: true });
    }
  }

  /**
   *
   *
   * @param {IDirectoryProps} prevProps
   * @param {IDirectoryState} prevState
   * @memberof Directory
   */
  public componentDidUpdate(prevProps: IDirectoryProps, prevState: IDirectoryState): void {

  }

  /**
   *
   *
   * @returns {React.ReactElement<IDirectoryProps>}
   * @memberof Directory
   */
  public render(): React.ReactElement<IDirectoryProps> {
    const color = this.props.context.microsoftTeams ? 'white' : '';

    return (
      <div className={styles.directory}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />

        <div style={{ width: '100%', verticalAlign: 'middle', marginBottom: 40 }}>
          <SearchBox
            placeholder={strings.SearchPlaceHolder}
            styles={{ root: { minWidth: 180, width: 360, marginLeft: 'auto', marginRight: 'auto' } }}
            onSearch={this._searchUsers}
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            onChange={this._searchUsers}/>
        </div>
        {
          this.state.users.length == 0 ?
            <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
              <Icon iconName={'ProfileSearch'} style={{ fontSize: '54px' , color: color}} />
              <Label>
                <span style={{ marginLeft: 5, fontSize: '26px', color: color }}>{strings.DirectoryMessage}</span>
              </Label>
            </div>
            :
            this.state.isLoading ?
              <Spinner size={SpinnerSize.large} label={'searching ...'}></Spinner>
              :
              this.state.hasError ?
                <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
                :
                this.state.users.map((user: PeoplePickerEntity) => {
                  return (
                    <PersonaCard
                      context={this.props.context}
                      profileProperties={user}>
                    </PersonaCard>
                  );
                })
        }
      </div>
    );
  }
}
