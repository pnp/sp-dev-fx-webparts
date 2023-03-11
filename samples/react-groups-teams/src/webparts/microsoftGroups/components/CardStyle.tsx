import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './MicrosoftGroups.module.scss';
import { DocumentCard, DocumentCardDetails, Modal, Stack, ThemeProvider, TooltipHostBase } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { iconClass } from './MicrosoftGroupsTeams';

export interface IGraphConsumerProps {
  context: WebPartContext;
  GroupDisplay: number;
  Mygroups: any [];
  Allgroups:any[];
}
export interface IUserItem {
  Topic: string;
  DeliveryDate: Date;
}

export interface IGraphConsumerState {
  mode: string;
  title: string;
  GroupResultsFiltered: any;
  Next: number;
  Min: number;
  GroupDisplay: number;
}
export default class MicrosoftGroups extends React.Component<IGraphConsumerProps, IGraphConsumerState> {
  public _plannerIDs = [];
  public _arr = [];
  public webAbsoluteURL: string = this.props.context.pageContext.web.absoluteUrl;
  public TenantPathname: string = this.webAbsoluteURL.split('//')[1].split('/')[0];
  public TenantEmail: string = this.props.context.pageContext.user.loginName.split('@')[1];
  constructor(props) {
    super(props);
    this.state = {
      mode: 'All',
      title: 'Groups In My Organization',
      GroupResultsFiltered: [],
      Next: 6,
      Min: 0,
      GroupDisplay: 6
    };
  }
  public SwitchGroupList() {
    if (this.state.title === 'Groups In My Organization') {
      this.setState({ title: "My Groups" });
      this.SwitchGroupList2(this.state.mode, "My Groups");
    }else {
      this.setState({ title: 'Groups In My Organization' });
      this.SwitchGroupList2(this.state.mode, 'Groups In My Organization');
    }

  }
  public SwitchGroupList2(Switch:string, title) {
    if (Switch === 'All') {
      if(title === 'My Groups') {
        this.setState({ GroupResultsFiltered: this.props.Mygroups });
      } else{
        this.setState({ GroupResultsFiltered: this.props.Allgroups });
      }
    }
    else {
      var SwitchedValue;
      if(title === 'My Groups') {
        SwitchedValue = this.props.Mygroups.filter(item => item.Visibility === Switch);
      }
      else{
        SwitchedValue = this.props.Allgroups.filter(item => item.Visibility === Switch);
      }
      this.setState({ GroupResultsFiltered: SwitchedValue});
    }
    var nextVariable;
    if(this.state.GroupDisplay != undefined) {
      if(!(this.props.GroupDisplay === undefined)) {nextVariable = this.props.GroupDisplay;} else {nextVariable = 5;}
      this.setState({ mode: Switch,  Next:nextVariable, Min: 0});
    }
    else {
      nextVariable = 5;
      this.setState({ mode: Switch,  Next:nextVariable, Min: 0, GroupDisplay: 5});}
  }
  public componentDidMount() {
    if (!(this.props.GroupDisplay === undefined || this.props.GroupDisplay ===null)){
      this.SwitchGroupList2(this.state.mode, this.state.title);
      this.setState({GroupDisplay: this.props.GroupDisplay, Min:0, Next: this.props.GroupDisplay}); }
      else {
      this.SwitchGroupList2(this.state.mode, this.state.title);
      this.setState({GroupDisplay: 5, Min: 0, Next: 5});
    }
  }

public Next(GroupsFiltered) {
  var array = [],
  count = 0,
  min = this.state.Next,
  max = min + (this.state.GroupDisplay + 1);
  GroupsFiltered.map(Group => {
    count = count + 1;
    if (count > min && count < max) {
      array.push(Group);
    }
  });
  var newVal = this.state.Next + this.state.GroupDisplay;
  this.setState({ Next: newVal, Min: min});
}

public Back(GroupsFiltered) {
  // comments are as going forward one page and then back. GroupDisplay is set to the default at 5
  var array = [], //create an array to store the new groups to display
  max, min, count = 0, //min and max for the range of groups by number and count to get the current level of mapping
  Above = this.state.Next + this.state.GroupDisplay, //say it's 15
  FilteredL = this.state.GroupResultsFiltered.length, // How many groups we have in total, say we have 12 total.
  i = Math.floor(FilteredL / (this.state.GroupDisplay)), //Our group total divided by the limit per page, rounding up so we don't miss groups, 5 goes into 12 twice
  ifull = i * (this.state.GroupDisplay), //we basically multiply it back out, finding how many pages of full groups we can have. 10
  Leftover = FilteredL - ifull, // Finding the difference/leftover when we do the math: 12 - 10 = 2
  difference = (this.state.GroupDisplay) - Leftover; // Finding how much we're missing in the last page: 5 - 2 = 3
  if((this.state.Next + (this.state.GroupDisplay)) - difference > FilteredL){
/*if 10 (remember we're on page 2) + 5 (the current display setting) - 3 (the difference between a full page) > Total Groups
//This step matters if you are going back from the last page!! Remember, when we go to the next page we add in increments of 5
That means if I were to go to the last page, my Next would be 15 and this statement would be true-
15 + 5 - 3 = 17*/
    max = (FilteredL - Leftover) + 1; // 12 - 2 + 1. We get it back into the 5 increment setting.
    min = max - this.state.GroupDisplay - 1; // Subtract 5 from the max so we can have a range of 5.
    /*We just add one because when we map through the Groups we don't have an "or equals to" so it has to be 1 above and under*/
  }
  else {
   // for when it's not the last page we're going back from
    max = this.state.Next - this.state.GroupDisplay;
    min = max - this.state.GroupDisplay;
  }
  GroupsFiltered.map(Group => {
    count = count + 1;
    if (count > min && count < max) {
      array.push(Group);
    }
  });
  var newVal = this.state.Next - (this.state.GroupDisplay);
  this.setState({ Next: newVal, Min: min });
}
public componentDidUpdate(prevProps: Readonly<IGraphConsumerProps>): void {
  if(prevProps.GroupDisplay !== this.props.GroupDisplay) {
    this.setState({Next: this.props.GroupDisplay, Min: 0, GroupDisplay: this.props.GroupDisplay});
    }
    if(prevProps.Allgroups !== this.props.Allgroups || prevProps.Mygroups !== this.props.Mygroups) {
      this.SwitchGroupList2(this.state.mode, this.state.title);
    }
}

public render(): React.ReactElement<IGraphConsumerProps> {
  var i = 0,
  Replaceregex = /\s+/g;
  return <div className={styles.Container}>
    <div className={styles.tableCaptionStyle}>{this.state.title}
      <div>
        {this.state.mode === 'Public' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('Public', this.state.title)}>Public</button> :
        <button className={styles.Filters} onClick={() => this.SwitchGroupList2('Public', this.state.title)}>Public</button>}

        {this.state.mode === 'All' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('All', this.state.title)}>All</button> :
        <button className={styles.Filters} onClick={() => this.SwitchGroupList2('All', this.state.title)}>All</button>}

        {this.state.mode === 'Private' ? <button className={styles.SelectedFilter} onClick={() => this.SwitchGroupList2('Private', this.state.title)}>Private</button> :
        <button className={styles.Filters} onClick={() => this.SwitchGroupList2('Private', this.state.title)}>Private</button>}

      </div>
      <button className={styles.SwitchGroups} onClick={() => this.SwitchGroupList()}> View {this.state.title === 'My Groups' ?
      'Groups in my Organization' : 'My Groups'}</button>
    </div>
    <div className={styles.tableStyle}>
{ this.state.GroupResultsFiltered.map(Group => {
        var GroupEmailSplit = Group.Mail.split("@");
        Group.Mail = GroupEmailSplit[0];
        i = i + 1;
        if ( i <= this.state.Next && i >= this.state.Min +1) {
        return <DocumentCard
        style={{boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
        width:'31.65%',
        height: '144px',
        paddingBottom: '15px',
        float: 'left',
        margin: '6px'
        }}
        >
          <h3 style={{marginBottom: '5px'}}>{Group.Name}</h3>
        <DocumentCardDetails>
          <div style={{padding: '0px 4px 0px 4px'}}>{Group.Description}</div>

        <div style={{display:'table-row'}}>
        <a href={`https://outlook.office.com/mail/group/${this.TenantEmail}/${Group.Mail.toLowerCase()}/email`}>
          <Icon className={iconClass} style={{ color: '#087CD7', margin:'2px', marginTop:'10px' }} iconName="OutlookLogo"></Icon>
        </a>
        <a  href={`https://${this.TenantPathname}/sites/${Group.Mail}`}>
          <Icon className={iconClass} style={{ color: '#068B90', margin:'2px', marginTop:'10px' }} iconName="SharePointLogo"></Icon>
        </a>
        <a  href={`https://outlook.office.com/calendar/group/${this.TenantEmail}/${Group.Name.replace(Replaceregex, '')}/view/week`}>
          <Icon className={iconClass} style={{ color: '#119AE2', margin:'2px', marginTop:'10px' }} iconName="Calendar"></Icon>
        </a>

        <>
          {Group.Planner === undefined ? <></> : <a href={Group.Planner}>
            <Icon className={iconClass} style={{ color: '#077D3F', margin:'2px', marginTop:'10px' }} iconName="ViewListTree"></Icon></a>}
        </>
        <>{Group.WebUrl === undefined || Group.WebUrl === null ? <></> :
          <a href={`${Group.WebUrl}`}>
      <Icon className={iconClass} style={{ color: '#424AB5', margin:'2px', marginTop:'10px' }} iconName="TeamsLogo"></Icon>
    </a>}</>
      </div></DocumentCardDetails>
        </DocumentCard>;

        }})}
      </div>
      {this.state.GroupResultsFiltered.length === 0 ? <div>There are no items with the selected filters</div>:<></>}
      <div className={styles.tableStyle}>
 <div style={{display:'table-row'}}>
 <div style={{position: 'relative', textAlign:'right', width:'45%', display:'table-cell'}}>
  <button disabled={this.state.Next === (this.state.GroupDisplay)} onClick={() => this.Back(this.state.GroupResultsFiltered)}>Back</button>
       </div>
       <div style={{padding: 8}}>{this.state.Next/this.state.GroupDisplay} of {Math.ceil(this.state.GroupResultsFiltered.length/this.state.GroupDisplay)}</div>
       <div style={{position: 'relative', textAlign:'left', width:'45%', display:'table-cell'}}>
       <button disabled={this.state.Next >= this.state.GroupResultsFiltered.length} onClick={() => this.Next(this.state.GroupResultsFiltered)}>Next</button>
       </div> </div></div>
  </div>;
}
}
