import * as React from 'react';
import styles from '../O365GroupsManager/O365GroupsManager.module.scss';
import { IGroupListProps } from './IGroupListProps';
import { IGroupListState } from './IGroupListState';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IconButton, IIconProps, Stack } from 'office-ui-fabric-react';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IGroup, IGroupCollection } from "../../../../models/IGroup";
import O365GroupService from '../../../../services/O365GroupService';

interface IGroupListClassObject {
  itemCell: string;
  itemImage: string;
  itemContent: string;
  itemName: string;
  itemIndex: string;
  chevron: string;
}

// Icons
const teamsIcon: IIconProps = { iconName: 'TeamsLogo' };
const joinIcon: IIconProps = { iconName: 'Subscribe' };
const leaveIcon: IIconProps = { iconName: 'Unsubscribe' };
const manageIcon: IIconProps = { iconName: 'AccountManagement' };
const requestToJoinIcon: IIconProps = { iconName: 'SecurityGroup' };

// List style
const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames: IGroupListClassObject = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight }
      }
    }
  ],
  itemImage: {
    flexShrink: 0
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0
  }
});

export default class GroupList extends React.Component<IGroupListProps, IGroupListState> {
  private _originalItems: IGroup[];
  private _menuButtonElement: HTMLElement;

  constructor(props: IGroupListProps) {
    super(props);

    props.items.map(group => {
      let myUserRole: string = "";

      if (props.ownerGroups.indexOf(group.id) > -1) {
        myUserRole = "Owner";
      }
      else if (props.memberGroups.indexOf(group.id) > -1) {
        myUserRole = "Member";
      }

      group.userRole = myUserRole;
    });

    this._originalItems = props.items;

    this.state = {
      filterText: '',
      isTeachingBubbleVisible: false,
      groups: this._originalItems
    };

    this._onRenderCell = this._onRenderCell.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._getGroupLinks(this._originalItems);
  }

  public render(): React.ReactElement<IGroupListProps> {
    const { groups = [] } = this.state;
    const resultCountText = groups.length === this._originalItems.length ? '' : ` (${groups.length} of ${this._originalItems.length} shown)`;

    return (
      <div className={styles.groupContainer}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <TextField label={'Filter by name' + resultCountText} onChange={this._onFilterChanged} />
          <List items={groups} onRenderCell={this._onRenderCell} />
          {this.state.isTeachingBubbleVisible ? (
            <div>
              <TeachingBubble
                calloutProps={{ directionalHint: DirectionalHint.bottomLeftEdge }}
                isWide={true}
                hasCloseIcon={true}
                closeButtonAriaLabel="Close"
                target={this._menuButtonElement}
                onDismiss={this._onDismiss}
                headline="Manage O365 Groups"
              >
                {this.state.techingBubbleMessage}
              </TeachingBubble>
            </div>
          ) : null}
        </FocusZone>
      </div>
    );
  }

  public _getGroupLinks = (groups: any): void => {
    groups.map(groupItem => (
      O365GroupService.getGroupLink(groupItem).then(groupUrl => {
        if (groupUrl !== null) {
          this.setState(prevState => ({
            groups: prevState.groups.map(group => group.id === groupItem.id ? { ...group, url: groupUrl.value } : group)
          }));
        }
      })
    ));

    this._getGroupThumbnails(groups);
  }

  public _getGroupThumbnails = (groups: any): void => {
    groups.map(groupItem => (
      O365GroupService.getGroupThumbnail(groupItem).then(grouptb => {
        console.log(grouptb);
        this.setState(prevState => ({
          groups: prevState.groups.map(group => group.id === groupItem.id ? { ...group, thumbnail: grouptb } : group)
        }));
      })
    ));
  }

  private _onFilterChanged = (_: any, text: string): void => {
    this.setState({
      filterText: text,
      groups: text ? this._originalItems.filter(item => item.displayName.toLowerCase().indexOf(text.toLowerCase()) >= 0) : this._originalItems
    });

    this._getGroupLinks(this.state.groups);
  }

  private _onRenderCell(group: IGroup, index: number | undefined): JSX.Element {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Image className={classNames.itemImage} src={group.thumbnail} width={50} height={50} imageFit={ImageFit.cover} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>
            <a href={group.url} target="_blank">{group.displayName}</a>
            {
              group.teamsConnected &&
              <IconButton iconProps={teamsIcon} title="Open MS Teams" ariaLabel="Open MS Teams" onClick={(event) => { this._openMSTeamsClicked(group.id); }} />
            }
          </div>
          <div className={classNames.itemIndex}>{group.visibility}</div>
          <div>{group.description}</div>
        </div>
        {
          group.userRole === "Owner" &&
          <IconButton iconProps={manageIcon} title="Manage Group" ariaLabel="Manage Group" onClick={(event) => { this._manageGroupClicked(group.id); }} />
        }
        {
          group.userRole === "Member" &&
          <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
            <IconButton iconProps={leaveIcon} title="Leave Group" ariaLabel="Leave Group" onClick={(event) => { this._leaveGroupClicked(group.id, group.displayName); }} />
          </span>
        }
        {
          group.visibility === "Public" && group.userRole === "" &&
          <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
            <IconButton iconProps={joinIcon} title="Join Group" ariaLabel="Join Group" onClick={(event) => { this._joinGroupClicked(group.id, group.displayName); }} />
          </span>
        }
        {
          group.visibility === "Private" && group.userRole === "" && this.props.flowUrl != undefined &&
          <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton!)}>
            <IconButton iconProps={requestToJoinIcon} title="Request to Join Group" ariaLabel="Request to Join Group" onClick={(event) => { this._requestJoinGroupClicked(group.id, group.displayName, group.url); }} />
          </span>
        }
      </div>
    );
  }

  private _onDismiss(ev: any): void {
    this.setState({
      isTeachingBubbleVisible: false
    });
  }

  private _manageGroupClicked = (groupId: string) => {
    window.open("https://admin.microsoft.com/Adminportal/Home?source=applauncher#/groups");
  }

  private _openMSTeamsClicked = (groupId: string) => {
    O365GroupService.getTeamChannels(groupId).then(response => {
      window.open(response[0].webUrl, '_blank');
    });
  }

  private _leaveGroupClicked = (groupId: string, groupName: string) => {
    O365GroupService.removeMember(groupId).then(response => {
      this.setState(prevState => ({
        groups: prevState.groups.map(group => group.id === groupId ? { ...group, userRole: "" } : group),
        isTeachingBubbleVisible: true,
        techingBubbleMessage: 'You have left the group: ' + groupName
      }));
    });
  }

  private _joinGroupClicked = (groupId: string, groupName: string) => {
    O365GroupService.addMember(groupId).then(response => {
      this.setState(prevState => ({
        groups: prevState.groups.map(group => group.id === groupId ? { ...group, userRole: "Member" } : group),
        isTeachingBubbleVisible: true,
        techingBubbleMessage: 'You have joined the group: ' + groupName
      }));
    });
  }

  private _requestJoinGroupClicked = (groupId: string, groupName: string, groupUrl: string) => {
    this.setState({
      isTeachingBubbleVisible: true,
      techingBubbleMessage: 'Request sent to join the private group: ' + groupName
    });

    O365GroupService.requestToJoinPrivateGroup(this.props.flowUrl, groupId, groupName, groupUrl).then(response => {
      console.log(response);
    });
  }
}