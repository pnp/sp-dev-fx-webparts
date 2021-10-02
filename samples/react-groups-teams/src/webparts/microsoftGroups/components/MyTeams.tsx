import * as React from 'react';
import { MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './MicrosoftGroups.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
export const iconClass = mergeStyles({
  fontSize: 32,
  height: 32,
  width: 32
});
export interface IMyTeamsProps {
  context: WebPartContext;
  hidden: Boolean;
}
export interface IUserItem {
  Topic: string;
  DeliveryDate: Date;
}

export interface IMyTeamsState {
  MyGroupResults: any;
  MyGroupsresultsFiltered: any;
  plannerId: string;
  Allgroupsdisplay: number;
  mygroupsdisplay: number;
  mode: string;
  title: string;
  TenantURL: String;
}
export default class MyTeams extends React.Component<IMyTeamsProps, IMyTeamsState> {
  public webAbsoluteURL: string = this.props.context.pageContext.web.absoluteUrl;
  public TenantPathname: string = this.webAbsoluteURL.split('//')[1].split('/')[0];
  public TenantEmail: string = this.props.context.pageContext.user.loginName.split('@')[1];
  private graphClient: MSGraphClient = null;
  constructor(props) {
    super(props);
    this.state = {
      MyGroupResults: [],
      MyGroupsresultsFiltered: [],
      plannerId: '',
      Allgroupsdisplay: 0,
      mygroupsdisplay: 0,
      mode: 'All',
      title: 'Teams in Microsoft Teams In My Organization',
      TenantURL: ''
    };
  }
  public SwitchGroupList(Switch) {
    if (Switch === 'All') {
      this.setState({ MyGroupsresultsFiltered: this.state.MyGroupResults });
    }
    else {
      const SwitchedMY = this.state.MyGroupResults.filter(item => item.Visibility === Switch);
      this.setState({ MyGroupsresultsFiltered: SwitchedMY });
    }
    this.setState({ mode: Switch });
  }
  public async GetPlanner() {
    this.state.MyGroupResults.map(async GroupId => {
      try {
        this.graphClient = await this.props.context.msGraphClientFactory.getClient();
        const results: any = await this.graphClient
          .api(`/groups/${GroupId.Id}/planner/plans`)
          .version('v1.0')
          .get();
        if (results.value.length > 0) {
          var ID; results.value.map(Items => {
            ID = Items.id;
          });
          var URL = `https://tasks.office.com/${this.TenantEmail}/EN-US/Home/Planner#/plantaskboard?groupId=${GroupId.Id}&planId=${ID}`;
          var Planner = { Planner: URL };
          var Results = Object.assign(GroupId, Planner);
          GroupId = Results;
        }
        return results.value;
      } catch (error) {
      }
    });

  }
  public GetTeamsURL() {
    this.state.MyGroupResults.map(Group => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api(`/teams/${Group.Id}/?$select=webUrl`)
            .version("v1.0")
            .get((err, res) => {
              if (err) {
                return;
              }
              if (res) {
                var Results = Object.assign(Group, { WebUrl: res.webUrl });
                Group = Results;
                this.setState({ MyGroupsresultsFiltered: this.state.MyGroupResults });
              }
            });
        });
    });
  }
  public async GetMail() {
    this.state.MyGroupResults.map(Group => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api(`groups/${Group.Id}/`)
            .version("v1.0")
            .get((err, res) => {
              if (err) {
                return;
              }
              if (res) {
                var Results = Object.assign(Group, { Mail: res.mail });
                Group = Results;
              }
            });
        });
    });
  }
  public componentDidMount() {
    this.setState({ TenantURL: this.props.context.pageContext.web.absoluteUrl });
    var array = [];
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api(`me/joinedTeams`)
          .version("v1.0")
          .get((err, res) => {
            if (err) {
              return;
            }
            if (res) {
              res.value.map((item) => {
                array.push({ Name: item.displayName, Id: item.id, Description: item.description, Visibility: item.visibility });
              });
              this.setState({ MyGroupResults: array });
              this.GetMail();
              this.GetPlanner();
              this.GetTeamsURL();
            }
          });
      });
  }
  public render(): React.ReactElement<IMyTeamsProps> {
    var Replaceregex = /\s+/g;
    return this.props.hidden ? <div></div> : <div className={styles.test}>
      <div className={styles.tableCaptionStyle} style={{ borderRight: 'none' }}>My Teams Teams<div>

        {this.state.mode === 'Public' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList('Public')}>Public</button> :
          <button className={styles.Filters} onClick={() => this.SwitchGroupList('Public')}>Public</button>}

        {this.state.mode === 'All' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList('All')}>All</button> :
          <button className={styles.Filters} onClick={() => this.SwitchGroupList('All')}>All</button>}

        {this.state.mode === 'Private' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList('Private')}>Private</button> : 
        <button className={styles.Filters} onClick={() => this.SwitchGroupList('Private')}>Private</button>}</div>

      </div>
      <div className={styles.tableStyle}>
        <div className={styles.headerStyle}>
          <div className={styles.Center}>Team</div>
          <div className={styles.Center}>Mail</div>
          <div className={styles.Center}>Site</div>
          <div className={styles.Center}>Calendar</div>
          <div className={styles.Center}>Planner</div>
          <div className={styles.Center}>WebUrl</div>
          <div className={styles.Center} style={{ borderRight: 'none' }}>Visibility</div>
        </div>
        {this.state.MyGroupsresultsFiltered.map(Team => {
          Team.Visibility = Team.Visibility.substr(0, 1).toUpperCase() + Team.Visibility.substr(1);
          var GroupEmailSplit = Team.Mail.split("@");
          var Mail = GroupEmailSplit[0];
          return (
            <div className={styles.rowStyle}>
              <div className={styles.ToolTipName}>{Team.Name}<span className={styles.ToolTip}>{Team.Description}</span></div>
              <a className={styles.Center} href={`https://outlook.office.com/mail/group/${this.TenantEmail}/${Mail.toLowerCase()}/email`}>
                <Icon className={iconClass} style={{ color: '#087CD7' }} iconName="OutlookLogo"></Icon></a>
              <a className={styles.Center} href={`https://${this.TenantPathname}/sites/${Mail}`}>
                <Icon className={iconClass} style={{ color: '#068B90' }} iconName="SharePointLogo"></Icon>
              </a>
              <a className={styles.Center} href={`https://outlook.office.com/calendar/group/${this.TenantEmail}/${Team.Name.replace(Replaceregex, '')}/view/week`}>
                <Icon className={iconClass} style={{ color: '#119AE2' }} iconName="Calendar"></Icon>
              </a>
              <div className={styles.Center}>
                {Team.Planner === undefined ? <div></div> : <a href={Team.Planner}>
                  <Icon className={iconClass} style={{ color: '#077D3F' }} iconName="ViewListTree"></Icon>
                </a>}
              </div>
              <a className={styles.Center} href={`${Team.WebUrl}`}>
                <Icon className={iconClass} style={{ color: '#424AB5' }} iconName="TeamsLogo"></Icon>
              </a>
              <div className={styles.Center} style={{ borderRight: 'none' }}>{Team.Visibility}</div>
            </div>
          );
        })}</div></div>;
  }
}
