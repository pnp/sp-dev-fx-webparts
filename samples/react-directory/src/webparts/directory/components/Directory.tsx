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
  Label,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
}
  from 'office-ui-fabric-react';
import { IProfileProperties } from '../../../SPServices/IProfileProperties';
import { PeoplePickerEntity, Search, SearchResult } from '@pnp/sp';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Root } from '@pnp/graph';

const az: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default class Directory extends React.Component<IDirectoryProps, IDirectoryState> {

  private _services: spservices = null;

  constructor(props: IDirectoryProps) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      errorMessage: '',
      hasError: false,
      indexSelectedKey: 'A',
      searchString: ''
    };

    this._services = new spservices(this.props.context);
    // Register event handlers
    this._searchUsers = this._searchUsers.bind(this);
    this._selectedIndex = this._selectedIndex.bind(this);
  }


  /**
   *
   *
   * @memberof Directory
   */
  public async componentDidMount() {
    await this._searchUsers('A');
  }

  private async _searchUsers(searchText: string) {
    searchText = searchText ? searchText : 'A';
    this.setState({ isLoading: true, indexSelectedKey: searchText.substring(0, 1).toLocaleUpperCase() });

    try {
      const users = await this._services.searchUsers(searchText);
      this.setState({ users: users && users.PrimarySearchResults ? users.PrimarySearchResults : null, isLoading: false, errorMessage: '', hasError: false });
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
   * @private
   * @param {PivotItem} [item]
   * @param {React.MouseEvent<HTMLElement>} [ev]
   * @memberof Directory
   */
  private _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {

    this._searchUsers(item.props.itemKey);
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
            styles={{ root: { minWidth: 180, width: 360, marginLeft: 'auto', marginRight: 'auto', marginBottom: 25 } }}
            onSearch={this._searchUsers}
            onClear={() => { this._searchUsers('A'); }}
            onChange={this._searchUsers} />
          <div>
            <Pivot
              styles={{ root: { paddingLeft: 10, paddingRight: 10, whiteSpace: 'normal', textAlign: 'center' } }}
              linkFormat={PivotLinkFormat.tabs}
              selectedKey={this.state.indexSelectedKey}
              onLinkClick={this._selectedIndex}
              linkSize={PivotLinkSize.normal}>
              {
                az.map((index) => {
                  return (
                    <PivotItem
                      headerText={index}
                      itemKey={index}
                      key={index} >
                    </PivotItem>
                  );
                })
              }
            </Pivot>
          </div>



        </div>
        {
          !this.state.users || this.state.users.length == 0 ?
            <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
              <Icon iconName={'ProfileSearch'} style={{ fontSize: '54px', color: color }} />
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
                this.state.users.map((user: any) => {
                  return (
                    <PersonaCard
                      context={this.props.context}
                      profileProperties={{
                        DisplayName: user.PreferredName,
                        Title: user.JobTitle,
                        PictureUrl: user.PictureURL,
                        Email: user.WorkEmail,
                        Department: user.Department,
                        MobilePhone: user.MobilePhone
                      }}>
                    </PersonaCard>
                  );
                })
        }
      </div>
    );
  }
}
