import * as React from 'react';
import { MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './MicrosoftGroups.module.scss';
import { Modal, TooltipHostBase } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { iconClass } from './MyTeams';

export interface IGraphConsumerProps {
  context: WebPartContext;
}
export interface IUserItem {
  Topic: string;
  DeliveryDate: Date;
}

export interface IGraphConsumerState {
  AllGroupsresults: any;
  MyGroupResults: any;
  plannerId: string;
  either: string;
  Allgroupsdisplay: number;
  mygroupsdisplay: number;
  mode: string;
  title: string;
  isOpen: boolean;
  MoreDetails: any;
  Name: string;
  Description: string;
  TenantUrl: string;
  MyGroupResultsFiltered: any;
  AllGroupsresultsFiltered: any;
}
export default class MicrosoftGroups extends React.Component<IGraphConsumerProps, IGraphConsumerState> {
  public _plannerIDs = [];
  public _arr = [];
  private graphClient: MSGraphClient = null;
  public webAbsoluteURL: string = this.props.context.pageContext.web.absoluteUrl;
  public TenantPathname: string = this.webAbsoluteURL.split('//')[1].split('/')[0];
  public TenantEmail: string = this.props.context.pageContext.user.loginName.split('@')[1];
  constructor(props) {
    super(props);
    this.GetPlanner = this.GetPlanner.bind(this);
    this.GetGroups = this.GetGroups.bind(this);
    this.state = {
      AllGroupsresults: [],
      MyGroupResults: [],
      plannerId: '',
      either: '',
      Allgroupsdisplay: 0,
      mygroupsdisplay: 0,
      mode: 'All',
      title: 'Groups In My Organization',
      isOpen: false,
      MoreDetails: [],
      Name: '',
      Description: '',
      TenantUrl: '',
      MyGroupResultsFiltered: [],
      AllGroupsresultsFiltered: []
    };
  }
  public SwitchGroupList() {
    if (this.state.title === 'Groups In My Organization') {
      this.setState({ title: "My Groups" });
    }
    else {
      this.setState({ title: 'Groups In My Organization' });
    }
  }
  public SwitchGroupList2(Switch) {
    if (Switch === 'All') {
      this.setState({ AllGroupsresultsFiltered: this.state.AllGroupsresults });
      this.setState({ MyGroupResultsFiltered: this.state.MyGroupResults });
    }
    else {
      const SwitchedALL = this.state.AllGroupsresults.filter(item => item.Visibility === Switch);
      this.setState({ AllGroupsresultsFiltered: SwitchedALL });
      const SwitchedMY = this.state.MyGroupResults.filter(item => item.Visibility === Switch);
      this.setState({ MyGroupResultsFiltered: SwitchedMY });
    }
    this.setState({ mode: Switch });
  }
  public OpenModal(GroupInfo) {
    var array = [];
    array.push(GroupInfo);
    this.setState({ isOpen: true, MoreDetails: array, Name: GroupInfo.Name, Description: GroupInfo.Description });
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
          this.state.AllGroupsresults.map(Group => {
            if (Group.Name === GroupId.Name) {
              var Results2 = Object.assign(Group, Planner);
              Group = Results2;
            }

          });
        }
        return this.setState({ MyGroupResultsFiltered: this.state.MyGroupResults });
      } catch (error) {
      }
    });
  }
  public GetGroups() {
    var
      GroupIDListAll = [],
      GroupIDListMy = [],
      myarray = [];
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api(`me/transitiveMemberOf/microsoft.graph.group?$filter=groupTypes/any(a:a eq 'unified')`)
          .version("v1.0")
          .get((err, res) => {
            if (err) {
            }
            if (res) {
              res.value.map((item) => {
                myarray.push({ Name: item.displayName, Id: item.id, Description: item.description, Mail: item.mail, Visibility: item.visibility });
                GroupIDListMy.push({ Id: item.id });

              });
              this.setState({ MyGroupResultsFiltered: myarray, MyGroupResults: myarray });
              this.GetPlanner();
            }
          });
      });
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api(`groups?$filter=groupTypes/any(a:a eq 'unified')`)
          .version("v1.0")
          .get((err, res) => {
            if (err) {
              // Do nothing
            }
            if (res) {
              res.value.map((item) => {
                this._arr.push({ Name: item.displayName, Id: item.id, Description: item.description, Mail: item.mail, Visibility: item.visibility });
                GroupIDListAll.push([item.id]);

              });
              this.setState({ AllGroupsresults: this._arr, AllGroupsresultsFiltered: this._arr });
              this.GetPlanner();
            }
          });
      });

  }
  public componentDidMount() {
    this.GetGroups();
  }
  public render(): React.ReactElement<IGraphConsumerProps> {
    var Replaceregex = /\s+/g;
    return <div className={styles.test}>
      <div className={styles.tableCaptionStyle}>{this.state.title}
        <div>
          {this.state.mode === 'Public' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('Public')}>Public</button> : 
          <button className={styles.Filters} onClick={() => this.SwitchGroupList2('Public')}>Public</button>}

          {this.state.mode === 'All' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('All')}>All</button> : 
          <button className={styles.Filters} onClick={() => this.SwitchGroupList2('All')}>All</button>}

          {this.state.mode === 'Private' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('Private')}>Private</button> : 
          <button className={styles.Filters} onClick={() => this.SwitchGroupList2('Private')}>Private</button>}

        </div>
        <button className={styles.SwitchGroups} onClick={() => this.SwitchGroupList()}> View {this.state.title === 'My Groups' ? 
        'Groups in my Organization' : 'My Groups'}</button>
      </div>
      <div className={styles.tableStyle}>
        <div className={styles.headerStyle}>
          <div className={styles.Center}>Group</div>
          <div className={styles.Center}>Mail</div>
          <div className={styles.Center}>Site</div>
          <div className={styles.Center}>Calendar</div>
          <div className={styles.Center}>Planner</div>
          <div className={styles.Center} style={{ borderRight: 'none' }}>Visibility</div>

        </div>
        {this.state.title === 'My Groups' ? this.state.MyGroupResultsFiltered.map(Group => {
          var GroupEmailSplit = Group.Mail.split("@");
          Group.Mail = GroupEmailSplit[0];
          return <div className={styles.rowStyle}>
            <div className={styles.ToolTipName}>{Group.Name}<span className={styles.ToolTip}>{Group.Description}</span></div>
            <a className={styles.Center} href={`https://outlook.office.com/mail/group/${this.TenantEmail}/${Group.Mail.toLowerCase()}/email`}>
              <Icon className={iconClass} style={{ color: '#087CD7' }} iconName="OutlookLogo"></Icon>
            </a>
            <a className={styles.Center} href={`https://${this.TenantPathname}/sites/${Group.Mail}`}>
              <Icon className={iconClass} style={{ color: '#068B90' }} iconName="SharePointLogo"></Icon>
            </a>
            <a className={styles.Center} href={`https://outlook.office.com/calendar/group/${this.TenantEmail}/${Group.Name.replace(Replaceregex, '')}/view/week`}>
              <Icon className={iconClass} style={{ color: '#119AE2' }} iconName="Calendar"></Icon>
            </a>

            <div className={styles.Center}>
              {Group.Planner === undefined ? <div></div> : <a href={Group.Planner}>
                <Icon className={iconClass} style={{ color: '#077D3F' }} iconName="ViewListTree"></Icon></a>}
            </div>
            <div className={styles.Center} style={{ borderRight: 'none' }}>{Group.Visibility}</div>
          </div>;
        }) : this.state.AllGroupsresultsFiltered.map(Group => {
          var GroupEmailSplit = Group.Mail.split("@");
          Group.Mail = GroupEmailSplit[0];
          return <div className={styles.rowStyle}>
            <div className={styles.ToolTipName}>{Group.Name}<span className={styles.ToolTip}>{Group.Description}</span></div>
            <a className={styles.Center} href={`https://outlook.office.com/mail/group/${this.TenantEmail}/${Group.Mail.toLowerCase()}/email`}>
              <Icon className={iconClass} style={{ color: '#087CD7' }} iconName="OutlookLogo"></Icon>
            </a>
            <a className={styles.Center} href={`https://${this.TenantPathname}/sites/${Group.Mail}`}>
              <Icon className={iconClass} style={{ color: '#068B90' }} iconName="SharePointLogo"></Icon>
            </a>
            <a className={styles.Center} href={`https://outlook.office.com/calendar/group/${this.TenantEmail}/${Group.Name.replace(Replaceregex, '')}/view/week`}>
              <Icon className={iconClass} style={{ color: '#119AE2' }} iconName="Calendar"></Icon>
            </a>

            <div className={styles.Center}>
              {Group.Planner === undefined ? <div></div> : <a href={Group.Planner}>
                <Icon className={iconClass} style={{ color: '#077D3F' }} iconName="ViewListTree"></Icon></a>}
            </div>
            <div className={styles.Center} style={{ borderRight: 'none' }}>{Group.Visibility}</div>
          </div>;
        })}
      </div>;
    </div>;
  }
}
