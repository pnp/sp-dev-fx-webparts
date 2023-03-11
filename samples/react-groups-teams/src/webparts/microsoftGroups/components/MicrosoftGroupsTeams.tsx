import * as React from 'react';
import { MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import GraphConsumer from './Microsoft365Groups';
import CardStyle from './CardStyle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
export interface IMicrosoftGroupsProps {
  context: WebPartContext;
  GroupDisplayTable: any;
  GroupDisplayCard: any;
  StyleToggle: boolean;
}

export interface IMicrosoftGroupsState {
  AllGroupsresults: any;
  MyGroupResults: any;
  GroupDisplayTable: number;
  GroupDisplayCard: number;
  StyleToggle: boolean;
}
export const iconClass = mergeStyles({
  fontSize: 32,
  height: 32,
  width: 32
});

export default class MicrosoftGroups extends React.Component<IMicrosoftGroupsProps, IMicrosoftGroupsState> {
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
      GroupDisplayTable: 5,
      GroupDisplayCard: 6,
      StyleToggle: false
    };
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

      this.setState({ MyGroupResults: this.state.MyGroupResults });
      } catch (error) {}
    });
    this.GetTeams();
  }

  public async GetTeams() {
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
              this.GetTeamsURL(array);
            }
          });
      });
  }

  public GetTeamsURL(Teams) {
    Teams.map(Team => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          client
            .api(`/teams/${Team.Id}/?$select=webUrl`)
            .version("v1.0")
            .get((err, res) => {
              if (err) {
                return;
              }
              if (res) {
                var URL = (res.webUrl.split('conversations')[0] + '/General' + res.webUrl.split('conversations')[1]),
                webUrl = { WebUrl: URL },
                Results = Object.assign(Team, { WebUrl: webUrl });
                Team = Results;
              this.state.MyGroupResults.map(Group => {
                if (Group.Name === Team.Name) {
                var Results2 = Object.assign(Group, webUrl);
                Group = Results2;
              }
            });
            this.state.AllGroupsresults.map(Group => {
              if (Group.Name === Team.Name) {
              var Results2 = Object.assign(Group, webUrl);
              Group = Results2;
            }
          });
            this.setState({ AllGroupsresults: this.state.AllGroupsresults, MyGroupResults: this.state.MyGroupResults});
              }
            });
        });
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
              this.setState({ MyGroupResults: myarray});
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
              this.setState({ AllGroupsresults: this._arr });
              this.GetPlanner();
            }
          });
      });

  }
  public componentDidMount() {
    this.GetGroups();
    this.setState({GroupDisplayTable: this.props.GroupDisplayTable, GroupDisplayCard: this.props.GroupDisplayCard});
  }
public componentDidUpdate(prevProps: Readonly<IMicrosoftGroupsProps>): void {
  if(prevProps.GroupDisplayTable !== this.props.GroupDisplayTable) { //needed to prevent exceeding maximum update update depth
  this.setState({GroupDisplayTable: this.props.GroupDisplayTable});
  }
  if(prevProps.GroupDisplayCard !== this.props.GroupDisplayCard) {
    this.setState({GroupDisplayCard: this.props.GroupDisplayCard});
  }
  if (prevProps.StyleToggle !== this.props.StyleToggle && this.props.StyleToggle!== undefined){
    this.setState({StyleToggle: this.props.StyleToggle});
  }

}
  public render(): React.ReactElement<IMicrosoftGroupsProps> {
return <div>
  {this.state.StyleToggle === false ?
    <GraphConsumer
      context={this.props.context}
      GroupDisplay={this.state.GroupDisplayTable}
      Mygroups={this.state.MyGroupResults}
      Allgroups={this.state.AllGroupsresults}/>
  :
    <CardStyle
      context={this.props.context}
      GroupDisplay={this.props.GroupDisplayCard}
      Mygroups={this.state.MyGroupResults}
      Allgroups={this.state.AllGroupsresults}/>
  }
</div>;
}
}
