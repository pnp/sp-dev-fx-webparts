import * as jsStyles from './AssignsStyles';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import spservices from '../../../../services/spservices';
import styles from './Assigns.module.scss';
import {
  Callout,
  DefaultPalette,
  FontWeights,
  Icon,
  IconButton,
  IFacepilePersona,
  IPersonaSharedProps,
  Label,
  MessageBar,
  MessageBarType,
  Persona,
  PersonaBase,
  PersonaSize,
  Stack,
  TextField,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { IAssignments } from '../../../../services/IAssignments';
import { IAssignsProps } from './IAssignsProps';
import { IAssignsState } from './IAssignsState';
import { IGroupMember, IMember } from '../../../../services/IGroupMembers';

export class Assigns extends React.Component<IAssignsProps, IAssignsState> {
  private _spservices: spservices = this.props.spservice;
  private _membersSkipToken: string = undefined;
  private _unAssignsMembers: IMember[] = [];

  constructor(props: IAssignsProps) {
    super(props);

    this.state = {
      unAssigns: [],
      assigns: [],
      hasError: false,
      hasMoreMembers: false,
      messageError: '',
      isloading: true
    };
  }

  private _sortUnAssigns = (a: IGroupMember, b: IGroupMember) => {};

  /**
   * Load more group members not assigned
   */
  private _loadMoreMembers = async (ev: any) => {
    try {
      const unAssigns = await this._getunAssigns(this.props.plannerPlan.owner);
      this.setState({
        unAssigns: unAssigns,
        hasError: false,
        messageError: '',
        hasMoreMembers: this._membersSkipToken ? true : false
      });
    } catch (error) {
      this.setState({ hasError: true, messageError: error.message });
    }
  };

  /**
   * Determines whether click member on
   */
  private _onClickMember = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    alert(ev.currentTarget.getAttribute('data-memberId'));
  };

  /**
   * Gets assignments
   * @param assignments
   * @returns assignments
   */
  private async _getAssignments(assignments: IAssignments): Promise<JSX.Element[]> {
    let persona: IPersonaSharedProps = undefined;
    let assignmentsKeys: string[] = [];
    let renderAssigns: JSX.Element[] = [];
    assignmentsKeys = Object.keys(assignments);
    for (const userId of assignmentsKeys) {
      try {
        const user = await this.props.spservice.getUser(userId);
        const userPhoto = await this.props.spservice.getUserPhoto(user.userPrincipalName);
        persona = {
          style: { paddingRight: 5, cursor: 'default' },
          text: user.displayName,
          imageUrl: userPhoto
        };

        renderAssigns.push(
          <div className={styles.renderMemberItem} key={user.id} data-member-displayName={user.displayName}>
            <Persona
              {...persona}
              data-memberId={user.id}
              size={PersonaSize.size32}
              styles={jsStyles.memberPersonaStyle}
              onClick={this._onClickMember}
            />
            <IconButton
              iconProps={{ iconName: 'ChromeClose', styles: { ...jsStyles.chromeCloseButtomStyle } }}
              styles={{ root: { paddingRight: 10 } }}
            />
          </div>
        );
      } catch (error) {
        Promise.reject(error);
      }
    }
    return renderAssigns;
  }

  /**
   * Gets group members
   * @param groupId
   * @returns group members
   */
  private async _getunAssigns(groupId: string): Promise<JSX.Element[]> {
    try {
      const assignmentsKeys = Object.keys(this.props.task.assignments);
      const unAssigns: IGroupMember = await this._spservices.getGroupMembers(
        this.props.plannerPlan.owner,
        this._membersSkipToken
      );

      let persona: IPersonaSharedProps = undefined;
      let renderMembers: JSX.Element[] = [];

      if (unAssigns && unAssigns['@odata.nextLink']) {
        const URLQueryString = new URLSearchParams(unAssigns['@odata.nextLink']);
        this._membersSkipToken = URLQueryString.get('$skiptoken');
      } else {
        this._membersSkipToken = undefined;
      }

      const unAssignsMembers = unAssigns && unAssigns ? unAssigns.value : [];
      this._unAssignsMembers = this._unAssignsMembers.concat(unAssignsMembers);
      // Sort Members
      this._unAssignsMembers = this._unAssignsMembers.sort((a, b) => {
        if (a.displayName.toLocaleUpperCase() < b.displayName.toLocaleUpperCase()) return -1;
        if (a.displayName.toLocaleLowerCase() > b.displayName.toLocaleLowerCase()) return 1;
        return 0;
      });
      // read group member and add to render array
      for (const member of this._unAssignsMembers) {
       // if (assignmentsKeys.indexOf(member.id) !== -1) continue;
        if (this._checkIfUserAssigned(member.id)) continue; // don't show members that are already assigned
        const userPhoto = await this.props.spservice.getUserPhoto(member.userPrincipalName);
        persona = {
          style: { paddingRight: 5 },
          text: member.displayName,
          imageUrl: userPhoto
        };

        renderMembers.push(
          <div className={styles.renderMemberItem} key={member.id}>
            <Persona
              {...persona}
              data-memberId={member.id}
              size={PersonaSize.size32}
              styles={jsStyles.memberPersonaStyle}
              onClick={this._onClickMember}
            />
          </div>
        );
      }
      // <Icon iconName={'ChromeClose'} styles={{ root: { paddingRight: 10, fontSize: FontSizes.size12 } }} />
      return renderMembers;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Determines whether callout dismiss on
   */
  /**
   *
   * Determines whether callout dismiss on
   */
  private _onCalloutDismiss = (ev: any) => {
    this.props.onDismiss();
  };

  /**
   * Components did mount
   * @returns did mount
   */
  public async componentDidMount(): Promise<void> {
    let unAssigns: JSX.Element[] = [];
    let assigns: JSX.Element[] = [];
    try {
      assigns = await this._getAssignments(this.props.task.assignments);
      unAssigns = await this._getunAssigns(this.props.plannerPlan.owner);
      this.setState({
        assigns: assigns,
        unAssigns: unAssigns,
        hasError: false,
        messageError: '',
        isloading: false,
        hasMoreMembers: this._membersSkipToken ? true : false
      });
    } catch (error) {
      this.setState({ unAssigns: unAssigns, assigns: assigns, hasError: true, messageError: error.message });
    }
  }


  /**
   * Check if user is member of unAssignsMembers
   */
  private  _checkIfUserIsMember = async (userId:string):Promise<boolean> => {

      const foundUser =  this._unAssignsMembers.filter( (user) => {
        return ( user.id === userId);
        }
         );
          console.log('found', foundUser);
          return foundUser.length > 0 ? true : false;
  }
  /**
   * Check if user assigned of assigns
   */
  private _checkIfUserAssigned = (userId:string):boolean => {
    const assignmentsKeys = Object.keys(this.props.task.assignments);
     return (assignmentsKeys.indexOf(userId) !== -1) ? true:  false;
  }
  /**
   * Determines whether search user on
   */
  private   _onSearchUser= async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,newValue:string) => {
    try {
      if (newValue.length > 3){
        const users:IMember[] = await this._spservices.searchUsers(newValue);

        console.log(users);
        for (const user of users){
          const found = await this._checkIfUserIsMember(user.id);

        }
      }
    } catch (error) {

    }
  }
  /**
   * Components did update
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IAssignsProps, prevState: IAssignsState): void {}

  public render(): React.ReactElement<IAssignsProps> {
    return (
      <div>
        <Callout
          target={this.props.target}
          isBeakVisible={false}
          role='dialog'
          onDismiss={this._onCalloutDismiss}
          calloutWidth={320}
          gapSpace={5}
          setInitialFocus={true}>
          <div className={styles.calloutHeader}>
            <TextField placeholder={'enter name or email'} borderless={true} styles={jsStyles.textFieldSearchStyles} onChange={this._onSearchUser}></TextField>
          </div>

          <div className={styles.calloutContent}>
            {this.state.isloading ? (
              <Spinner size={SpinnerSize.small} label={'loading...'} />
            ) : (
              <Stack styles={{ root: { height: '100%' } }}>
                {this.state.assigns.length > 0 && (
                  <>
                    <h4 style={{ margin: 10 }}>Assigned</h4>
                    {this.state.assigns}
                  </>
                )}

                {(this.state.unAssigns.length > 0 || this.state.hasMoreMembers) && ( // Has Member or has more pages to load, show unassigns
                  <>
                    <h4 style={{ margin: 10 }}>Unassigned</h4>

                    {this.state.hasError ? (
                      <MessageBar messageBarType={MessageBarType.error}>{this.state.messageError}</MessageBar>
                    ) : (
                      <InfiniteScroll
                        pageStart={0}
                        loadMore={this._loadMoreMembers}
                        hasMore={this.state.hasMoreMembers}
                        threshold={5}
                        useWindow={false}>
                        {this.state.unAssigns}
                      </InfiniteScroll>
                    )}
                  </>
                )}
              </Stack>
            )}
          </div>
        </Callout>
      </div>
    );
  }
}
