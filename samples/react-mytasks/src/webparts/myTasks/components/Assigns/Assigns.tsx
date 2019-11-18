import * as jsStyles from './AssignsStyles';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import spservices from '../../../../services/spservices';
import styles from './Assigns.module.scss';
import * as strings from 'MyTasksWebPartStrings';
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
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter
} from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { IAssignments } from '../../../../services/IAssignments';
import { IAssignsProps } from './IAssignsProps';
import { IAssignsState } from './IAssignsState';
import { IGroupMember, IMember } from '../../../../services/IGroupMembers';
import { IAssign } from './IAssign';
import { AssignMode } from './../Assigns/EAssignMode';
import { stringIsNullOrEmpty } from '@pnp/pnpjs';

export class Assigns extends React.Component<IAssignsProps, IAssignsState> {
  private _spservices: spservices = this.props.spservice;
  private _membersSkipToken: string = undefined;
  private _unAssignsMembers: IMember[] = [];
  private _assigns: IMember[] = [];
  private _nonMembers: IMember[] = [];

  constructor(props: IAssignsProps) {
    super(props);

    this.state = {
      unAssigns: [],
      assigns: [],
      nonMembers: [],
      hasError: false,
      hasMoreMembers: false,
      messageError: '',
      isloading: true,
      searchValue: ''
    };
  }



  /**
   * Load more group members not assigned
   */
  private _loadMoreMembers = async (ev: any) => {
    try {
      await this._getunAssigns(this.props.plannerPlan.owner);
      const unAssigns = await this._renderUnAssigns(this._unAssignsMembers);
      this.setState({
        unAssigns: unAssigns,
        hasError: false,
        messageError: '',
        hasMoreMembers: this._membersSkipToken ? true : false
      });
    } catch (error) {
      this.setState({ hasError: true, messageError: error.message });
    }
  }

  /**
   * Determines whether click member on
   */
  private _onClickAddUnAssignMember = async (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();
    let renderAssigns: JSX.Element[] = [];
    let renderUnAssigns: JSX.Element[] = [];
    const memberId = ev.currentTarget.getAttribute('data-memberId');
    const user = this._unAssignsMembers.filter(unAssignMember => {
      return unAssignMember.id === memberId;
    });
    const idx = this._unAssignsMembers.indexOf(user[0]);
    const rtnMember = this._unAssignsMembers.splice(idx, 1);
    this._assigns.push(rtnMember[0]);
    renderAssigns = await this._renderAssigns(this._assigns);
    renderUnAssigns = await this._renderUnAssigns(this._unAssignsMembers);
    //alert(ev.currentTarget.getAttribute('data-memberId'));
    this.setState({ assigns: renderAssigns, unAssigns: renderUnAssigns, searchValue: '' });

    //alert(ev.currentTarget.getAttribute('data-memberId'));
  }

  /**
   * Determines whether click assign non member on
   */
  private _onClickAssignNonMember = async (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();

    let renderAssigns: JSX.Element[] = [];
    let renderNonMembers: JSX.Element[] = [];
    let renderUnAssigns: JSX.Element[] = [];
    const memberId = ev.currentTarget.getAttribute('data-memberId');
    const user = this._nonMembers.filter(nonMember => {
      return nonMember.id === memberId;
    });
    const idx = this._nonMembers.indexOf(user[0]);
    const rtnMember = this._nonMembers.splice(idx, 1);
    this._assigns.push(rtnMember[0]);
    renderAssigns = await this._renderAssigns(this._assigns) ;
    renderUnAssigns = await this._renderUnAssigns(this._unAssignsMembers);
    renderNonMembers = await this._renderNonMembers(this._nonMembers);
    //alert(ev.currentTarget.getAttribute('data-memberId'));
    this.setState({ assigns: renderAssigns, unAssigns: renderUnAssigns,  nonMembers: renderNonMembers, searchValue: '' });
  }

  private _onClickRemoveAssign = async (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.preventDefault();

    let renderAssigns: JSX.Element[] = [];
    let renderUnAssigns: JSX.Element[] = [];
    const memberId = ev.currentTarget.getAttribute('data-memberId');
    const user = this._assigns.filter(assignMember => {
      return assignMember.id === memberId;
    });
    const idx = this._assigns.indexOf(user[0]);
    const rtnMember = this._assigns.splice(idx, 1);
    this._unAssignsMembers.push(rtnMember[0]);
    renderAssigns = await this._renderAssigns(this._assigns);
    renderUnAssigns = await this._renderUnAssigns(this._unAssignsMembers);
    //alert(ev.currentTarget.getAttribute('data-memberId'));
    this.setState({ assigns: renderAssigns, unAssigns: renderUnAssigns, searchValue: '' });
  }

  /**
   * Gets assignments
   * @param assignments
   * @returns assignments
   */
  private async _getAssignments(assignments: IAssignments): Promise<void> {
    let assignmentsKeys: string[] = [];

    assignmentsKeys = Object.keys(assignments);
    for (const userId of assignmentsKeys) {
      try {
        const user = await this.props.spservice.getUser(userId);

        this._assigns.push(user);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  /**
   * Render non members of assigns
   */
  private _renderNonMembers = async (nonMembers: IMember[]): Promise<JSX.Element[]> => {
    let persona: IPersonaSharedProps = undefined;
    let renderNonMembers: JSX.Element[] = [];
    try {
      for (const user of nonMembers) {
        const userPhoto = await this.props.spservice.getUserPhoto(user.userPrincipalName);
        persona = {
          style: { paddingRight: 5, cursor: 'default' },
          text: user.displayName,
          imageUrl: userPhoto
        };

        renderNonMembers.push(
          <div className={styles.renderMemberItem} key={user.id}>
            <Persona
              {...persona}
              data-memberId={user.id}
              size={PersonaSize.size32}
              styles={jsStyles.memberPersonaStyle}
              onClick={this._onClickAssignNonMember}
            />
          </div>
        );
      }
      return renderNonMembers;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Render assigns of assigns
   */
  private _renderAssigns = async (assigns: IMember[]): Promise<JSX.Element[]> => {
    let persona: IPersonaSharedProps = undefined;
    let renderAssigns: JSX.Element[] = [];
    try {
      for (const user of assigns) {
        const userPhoto = await this.props.spservice.getUserPhoto(user.userPrincipalName);
        persona = {
          style: { paddingRight: 5, cursor: 'default' },
          text: user.displayName,
          imageUrl: userPhoto
        };

        renderAssigns.push(
          <div className={styles.renderMemberItem} key={user.id}>
            <Persona
              {...persona}
              data-memberId={user.id}
              size={PersonaSize.size32}
              styles={jsStyles.memberPersonaStyle}
              // onClick={this._onClickMember}
            />
            <IconButton
              iconProps={{ iconName: 'ChromeClose', styles: { ...jsStyles.chromeCloseButtomStyle } }}
              styles={{ root: { paddingRight: 10 } }}
              data-memberId={user.id}
              onClick={this._onClickRemoveAssign}
            />
          </div>
        );
      }
      return renderAssigns;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Render unassigns
   */
  private _renderUnAssigns = async (unAssignsMembers: IMember[]): Promise<JSX.Element[]> => {
    let persona: IPersonaSharedProps = undefined;
    let renderMembers: JSX.Element[] = [];
    try {
      // read group member and add to render array
      for (const member of unAssignsMembers) {
        // If in Edit Task Mode  check Assigns
        if (this.props.AssignMode === AssignMode.Edit) {
         // if (await this._checkIfUserAssigned(member.id)) continue;
        } // don't show members that are already assigned
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
              onClick={this._onClickAddUnAssignMember}
            />
          </div>
        );
      }
      // <Icon iconName={'ChromeClose'} styles={{ root: { paddingRight: 10, fontSize: FontSizes.size12 } }} />
      return renderMembers;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Gets group members
   * @param groupId
   * @returns group members
   */
  private async _getunAssigns(groupId: string): Promise<void> {
    try {
      const groupMembers: IGroupMember = await this._spservices.getGroupMembers(groupId, this._membersSkipToken);

      if (groupMembers && groupMembers['@odata.nextLink']) {
        const URLQueryString = new URLSearchParams(groupMembers['@odata.nextLink']);
        this._membersSkipToken = URLQueryString.get('$skiptoken');
      } else {
        this._membersSkipToken = undefined;
      }
      // skip users already assigned
      if (groupMembers && groupMembers.value ){
        for ( const groupMember of groupMembers.value){
          const isAssigned = await this._checkIfUserAssigned(groupMember.id);
          if (isAssigned){
            continue;
          }else{
            this._unAssignsMembers.push(groupMember);
          }
        }
      }


    //  const unAssignsMembers = unAssigns && unAssigns.value ? unAssigns.value : [];
    //  this._unAssignsMembers = this._unAssignsMembers.concat(unAssignsMembers);
      // Sort Members
      this._unAssignsMembers = this._unAssignsMembers.sort((a, b) => {
        if (a.displayName.toLocaleUpperCase() < b.displayName.toLocaleUpperCase()) return -1;
        if (a.displayName.toLocaleLowerCase() > b.displayName.toLocaleLowerCase()) return 1;
        return 0;
      });
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
    this.props.onDismiss(this._assigns);
  }

  /**
   * Components did mount
   * @returns did mount
   */
  public async componentDidMount(): Promise<void> {
    let unAssigns: JSX.Element[] = [];
    let assigns: JSX.Element[] = [];
    try {
      /*
      if (this.props.AssignMode === AssignMode.Edit) {
        await this._getAssignments(this.props.task.assignments);
      }else{
        this._assigns = this.props.assigns;
      }*/
      this._assigns = this.props.assigns;
      assigns = await this._renderAssigns(this._assigns);

      await this._getunAssigns(this.props.plannerPlan.owner);
      unAssigns = await this._renderUnAssigns(this._unAssignsMembers);
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
  private _checkIfUserIsMember = async (userId: string): Promise<boolean> => {
    const foundUser = this._unAssignsMembers.filter(user => {
      return user.id === userId;
    });
    return foundUser.length > 0 ? true : false;
  }
  /**
   * Check if user assigned of assigns
   */
  private _checkIfUserAssigned = async (userId: string): Promise<boolean> => {
    const user = this._assigns.filter(assignMember => {
      return assignMember.id === userId;
    });
    /*
    if (user.length > 0) {
      const idx = this._unAssignsMembers.indexOf(user[0]);
          this._unAssignsMembers.splice(idx, 1);
    }*/
    return user.length > 0 ? true : false;
  }
  /**
   * Determines whether search user on
   */
  private _onSearchUser = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({searchValue: newValue,});
    try {
      let renderAssigns: JSX.Element[] = [];
      let renderUnAssigns: JSX.Element[] = [];
      let renderNonMembers: JSX.Element[] = [];


      if (newValue.length > 2) {
        const users: IMember[] = await this._spservices.searchUsers(newValue);
        const unAssignMembers: IMember[] = [];
        const assigns: IMember[] = [];
        this._nonMembers = [];

        for (const user of users) {
         // const userAssigned = this.props.AssignMode === AssignMode.Edit ? await this._checkIfUserAssigned(user.id) : false;
          const userAssigned =  await this._checkIfUserAssigned(user.id) ;
          if (userAssigned) {
            assigns.push(user);
          } else {
            const found = await this._checkIfUserIsMember(user.id);
            if (found) {
              unAssignMembers.push(user);
            } else {
              this._nonMembers.push(user);
            }
          }
        }

       // renderAssigns = this.props.AssignMode === AssignMode.Edit ? await this._renderAssigns(assigns) : [];
        renderAssigns =  await this._renderAssigns(assigns);
        renderUnAssigns = await this._renderUnAssigns(unAssignMembers);
        renderNonMembers = await this._renderNonMembers(this._nonMembers);

        this.setState({
          assigns: renderAssigns,
          unAssigns: renderUnAssigns,
          searchValue: newValue,
          nonMembers: renderNonMembers,
          hasError: false,
          messageError: ''
        });
      }

      if (newValue.length <=2) {
        renderAssigns = await this._renderAssigns(this._assigns);
        renderUnAssigns = await this._renderUnAssigns(this._unAssignsMembers);
        this.setState({
          assigns: renderAssigns,
          unAssigns: renderUnAssigns,
          searchValue: newValue,
          nonMembers: renderNonMembers,
          hasError: false,
          messageError: ''
        });
      }



    } catch (error) {
      this.setState({ hasError: true, messageError: error.message });
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
        <Dialog
          hidden={false}
          onDismiss={this._onCalloutDismiss}
          minWidth={350}
          title={strings.AssignsLabel}
          dialogContentProps={{
            type: DialogType.normal
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 350 } }
          }}>
          <div className={styles.calloutHeader}>
            <TextField
              value={this.state.searchValue}
              placeholder={strings.TypeUserOrEmailLabel}
              borderless={true}
              styles={jsStyles.textFieldSearchStyles}
              onChange={this._onSearchUser}></TextField>
          </div>

          <div className={styles.calloutContent}>
            {this.state.isloading ? (
              <Spinner size={SpinnerSize.small} label={strings.LoadingAssignLabel} />
            ) : (
              <Stack styles={{ root: { height: '100%' } }}>
                {this.state.assigns.length > 0 && (
                  <>
                    <h4 style={{ margin: 10 }}>{strings.AssignedLabel}</h4>
                    {this.state.assigns}
                  </>
                )}

                {(this.state.unAssigns.length > 0 || this.state.hasMoreMembers) && ( // Has Member or has more pages to load, show unassigns
                  <>
                    <h4 style={{ margin: 10 }}>{strings.UnassignedLabel}</h4>

                    {this.state.hasError ? (
                      <MessageBar messageBarType={MessageBarType.error}>{this.state.messageError}</MessageBar>
                    ) : (
                      <InfiniteScroll
                        pageStart={0}
                        loadMore={this._loadMoreMembers}
                        hasMore={this.state.hasMoreMembers}
                        threshold={15}
                        useWindow={false}>
                        {this.state.unAssigns}
                      </InfiniteScroll>
                    )}
                  </>
                )}
                {this.state.nonMembers.length > 0 && (
                  <>
                    <h4 style={{ margin: 10 }}>{strings.NonMembersLabel}</h4>
                    {this.state.nonMembers}
                  </>
                )}
              </Stack>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}
