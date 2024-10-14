/* eslint-disable @typescript-eslint/no-explicit-any */
// SPFx  React-tree-Organization-Chart
// Author: João Mendes
// Fev 2019
//
import * as React from "react";
import styles from "./TreeOrgChart.module.scss";
import { ITreeOrgChartProps } from "./ITreeOrgChartProps";
import { ITreeOrgChartState } from "./ITreeOrgChartState";



import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import SPService from "../../../services/SPServices";
import { ITreeData } from "./ITreeData";

import { DisplayMode } from "@microsoft/sp-core-library";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'TreeOrgChartWebPartStrings';
import GraphServices, { IGraphUser } from "../../../services/GraphService";
import GraphService from "../../../services/GraphService";
import {   IconButton, IPersonaSharedProps, Persona, PersonaSize, Spinner, SpinnerSize } from "@fluentui/react";
import Tree from "./Tree/Tree";





export enum TreeOrgChartType {
  MyTeam = 1,
  CompanyHierarchy = 2,
  ShowOtherTeam = 4
}
const LIVE_PERSONA_COMPONENT_ID: string = '914330ee-2df2-4f6e-a858-30c23a812408';

export default class TreeOrgChart extends React.Component<
  ITreeOrgChartProps,
  ITreeOrgChartState
  > {
  private treeData: ITreeData[];
  private SPService: SPService;
  private GraphService: GraphService;

  constructor(props:ITreeOrgChartProps) {
    super(props);

    this.SPService = new SPService(this.props.context);
    this.GraphService = new GraphServices(this.props.context);
    this.state = {
      treeData: [],
      isLoading: true
    };
  }
  
  /*
  private handleTreeOnChange(treeData:ITreeOrgChartState):void {
    this.setState({...treeData });
  }
    */
  

  public async componentDidUpdate(
    prevProps: ITreeOrgChartProps,
    prevState: ITreeOrgChartState
  ): Promise<void> {
    if (
      this.props.viewType !== prevProps.viewType ||
      this.props.maxLevels !== prevProps.maxLevels ||
      this.props.teamLeader !== prevProps.teamLeader ||
      this.props.excludefilter !== prevProps.excludefilter ||
      this.props.filter !== prevProps.filter ||
      this.props.detailBehavoir !== prevProps.detailBehavoir
    ) {
      await this.loadOrgchart();
    }
  }

  public async componentDidMount(): Promise<void> {
      const sharedLibrary = await this._loadSPComponentById<any>(
        LIVE_PERSONA_COMPONENT_ID
      );
      const livePersonaCard: unknown = sharedLibrary.LivePersonaCard;
      this.setState({ livePersonaCard: livePersonaCard });
      await this.loadOrgchart();
    return Promise.resolve();
  }

  private async _loadSPComponentById<TComponent>(componentId: string): Promise<TComponent> {
    try {
      const component: TComponent = await SPComponentLoader.loadComponentById(
        componentId
      );
      return component;
    } catch (error) {
     return Promise.reject(error);
    }
  }

  private livePersonaCard(user: IGraphUser): JSX.Element {
    return React.createElement(
      this.state.livePersonaCard,
      {
        serviceScope: this.props.context.serviceScope,
        upn: user.userPrincipalName,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      }, this.buildDefaultPersonaCard(user)
    );

  }

  /*
  // Load Organization Chart
  */
  public loadOrgchart(): void{

    this.setState({ treeData: [], isLoading: true }, async () => {
      const currentUser = this.props.context.pageContext.user.loginName;
      let currentUserProperties = undefined;
      this.treeData = [];
      // Test if show only my Team or All Organization Chart
      switch (this.props.viewType) {
        case TreeOrgChartType.CompanyHierarchy: {
        
          const spcurrentlogin = `i:0#.f|membership|${currentUser}`;
          currentUserProperties = await this.SPService.getUserProperties(
            spcurrentlogin
          );
          const treeManagers = await this.buildOrganizationChart(
            currentUserProperties
          );
          if (treeManagers) this.treeData.push(treeManagers);
          break;
        }
        case TreeOrgChartType.MyTeam: {
          const myteam = await this.buildMyTeamOrganizationChart(
            currentUser
          );
          if (myteam)
            this.treeData = [{ ...myteam }];
          break;
        }
        case TreeOrgChartType.ShowOtherTeam:
          if (this.props.teamLeader && this.props.teamLeader.length > 0) {
  
            const otherteam = await this.buildTeamLeaderOrganizationChart(
              this.props.teamLeader
            );
            if (otherteam)
              this.treeData = [{ ...otherteam }];
          }
          break;
      }
  
      this.setState({ treeData: this.treeData, isLoading: false });

    });
    
  }

  /*
    Build Organization Chart from currentUser
    @parm : currentUserProperties
  */
  public async buildOrganizationChart(currentUserProperties: any):Promise<ITreeData | undefined> {
    // Get Managers
    let treeManagers: ITreeData | undefined = undefined;
    if (
      currentUserProperties.ExtendedManagers &&
      currentUserProperties.ExtendedManagers.length > 0
    ) {
      //get directManager currentUserProperties.ExtendedManagers.length  -1
      //get orgmanager 0
      const upn: string | undefined = this.claimUserToUPN(currentUserProperties.ExtendedManagers[0]);
      if (upn) {
        treeManagers = await this.getUsers(
          upn
        );
      }

    }
    return treeManagers;
  }

  private claimUserToUPN(claim: string): string | undefined {
    if (!claim) { return undefined; }
    const claimuser: string[] = claim.split('|');
    if (claimuser.length > 1) {
      const upn = claimuser[claimuser.length - 1];
      if (upn && upn.length > 0 && upn.indexOf('@') !== -1) {
        return upn;
      }
    }
    return undefined;
  }

  public buildPersonaCard(user: IGraphUser): JSX.Element {
    if (this.props.detailBehavoir) {
      if (this.state.livePersonaCard) {
        return (this.livePersonaCard(user));
      }
      return this.buildDefaultPersonaCard(user);
    } else {
      return this.buildDefaultPersonaCard(user);
    }
  }

  public buildDefaultPersonaCard(user: IGraphUser): JSX.Element {

    const spUser: IPersonaSharedProps = {};
    const imageInitials: string[] = user.displayName ? user.displayName.split(" ") : [];
    //https://graph.microsoft.com/v1.0/users/${upn}/photo/$value
    // Persona Card Properties
    spUser.imageUrl = user.userPrincipalName ? `/_layouts/15/userphoto.aspx?size=L&username=${user.userPrincipalName}` : undefined;
    spUser.imageInitials = imageInitials && imageInitials.length > 0 ? `${imageInitials[0]
      .substring(0, 1)
      .toUpperCase()}${imageInitials[1] ? imageInitials[1].substring(0, 1).toUpperCase() : ''}` : '';
    spUser.text = user.displayName;
    spUser.tertiaryText = user.mail;
    spUser.secondaryText = user.jobTitle;
    // PersonaCard component
    return (
      <Persona
        {...spUser}
        hidePersonaDetails={false}
        size={PersonaSize.size40}
      />
    );
  }


  private async getUsers(upn: string): Promise<ITreeData | undefined> {
    const managerUser = await this.GraphService.getUser(upn);
    const person = this.buildPersonaCard(managerUser);
    if (managerUser.userPrincipalName) {
      return ({
        title: person,
        expanded: true,
        children: await this.getDirectReportsUsers(managerUser.userPrincipalName)
      });
    } else {
      return { title: person };
    }
  }

  private async getDirectReportsUsers(upn?: string, level: number = 1, expanded: boolean = false): Promise<ITreeData[] | undefined> {
    if (!upn) { return undefined; }

    const directReportsUser = await this.GraphService.getUserDirectReports(upn,this.props.excludefilter,this.props.filter);
    //this is already level 1
    if (directReportsUser && directReportsUser.length > 0) {
      return await Promise.all(directReportsUser.map(async (dr) => {
        const children = ((level +1) <= this.props.maxLevels) ? await this.getDirectReportsUsers(dr.userPrincipalName, level + 1) : undefined;
        return ({
          title: this.buildPersonaCard(dr),
          expanded: expanded,
          children: children
        });

      }));
    }
    return undefined;
  }



  //buildTeamLeaderOrganizationChart
  private async buildTeamLeaderOrganizationChart(upn: string): Promise<ITreeData | undefined> {

    const tmpupn: string | undefined = this.claimUserToUPN(upn);

    return await this.getUsers(tmpupn ? tmpupn : upn);

  }
  /*
      Build My Team Organization Chart
      @parm: currentUserProperties
  */
  private async buildMyTeamOrganizationChart(upn: string): Promise<ITreeData | undefined> {

    const mymanager = await this.GraphService.getUserManger(upn);
    if (mymanager && mymanager.userPrincipalName) {
      return await this.getUsers(mymanager.userPrincipalName);
    }
    return await this.getUsers(upn);
  }
  // Render
  public render(): React.ReactElement<ITreeOrgChartProps> {
    const showEditOther: boolean = this.props.displayMode === DisplayMode.Edit && this.props.viewType === TreeOrgChartType.ShowOtherTeam;
    let selectedTeamleader: string | undefined = undefined;
    if (showEditOther && this.props.teamLeader && this.props.teamLeader.length > 0) {
      selectedTeamleader = this.claimUserToUPN(this.props.teamLeader);
      if (!selectedTeamleader) {
        selectedTeamleader = this.props.teamLeader;
      }
    }
  
    return (
      <div className={styles.treeOrgChart}>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
        />
        {showEditOther && (<div>
          <PeoplePicker
          context={ this.props.context as any}
            titleText={strings.TeamLeaderHeadline}
            personSelectionLimit={1}
            groupName={""} // Leave this blank in case you want to filter from all users
            disabled={false}
            defaultSelectedUsers={selectedTeamleader ? [selectedTeamleader] : undefined}
            onChange={(items: any) => {
              if (this.props.updateTeamLeader) {
                if (items.length > 0) {
                  const teamleaderupn: string | undefined = this.claimUserToUPN(items[0].loginName);
                  if (teamleaderupn) {
                    this.props.updateTeamLeader(teamleaderupn);
                    return;
                  }
                }
                this.props.updateTeamLeader('');
              }
            }}
            
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
        </div>)}

        {this.state.isLoading && (
          <Spinner
            size={SpinnerSize.large}
            label="Loading Organization Chart ..."
          />)}
        <div className={styles.treeContainer}>
          
          <Tree data={this.state.treeData} renderNode={this.renderNode.bind(this)} />
        </div>
      </div>
    );
  }
  private renderNode(node: any):JSX.Element{
    return (<div> 
      <div className={styles.treeContents}>
        <div style={{marginRight:'30px',display:'inline-block'}}>
        {node.title}
        </div>
        {this.props.detailBehavoir  &&(   <IconButton
                        disabled={false}
                        checked={false}
                        iconProps={{ iconName: "ContactInfo" }}
                        title={strings.ContactInfoTitle}
                        ariaLabel={strings.ContactInfoTitle}
                        onClick={() => {
                          window.open(
                            `https://eur.delve.office.com/?p=${node.title.props.tertiaryText}&v=work`
                          );
                        }}
                      />)}
      </div>
    </div>);
  }
}
