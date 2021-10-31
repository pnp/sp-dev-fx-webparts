// SPFx  React-tree-Organization-Chart
// Author: João Mendes
// Fev 2019
//
import * as React from "react";
import styles from "./TreeOrgChart.module.scss";
import { ITreeOrgChartProps } from "./ITreeOrgChartProps";
import { ITreeOrgChartState } from "./ITreeOrgChartState";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize
} from "office-ui-fabric-react/lib/Persona";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import SPService from "../../../services/SPServices";
import { ITreeData } from "./ITreeData";
import {
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react/lib/components/Spinner";
import { DisplayMode, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'TreeOrgChartWebPartStrings';
import GraphServices, { IGraphUser } from "../../../services/GraphService";
import GraphService from "../../../services/GraphService";


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

  constructor(props) {
    super(props);

    this.SPService = new SPService(this.props.context);
    this.GraphService = new GraphServices(this.props.context);
    this.state = {
      treeData: [],
      isLoading: true
    };
  }
  //
  private handleTreeOnChange(treeData) {
    this.setState({ treeData });
  }

  public async componentDidUpdate(
    prevProps: ITreeOrgChartProps,
    prevState: ITreeOrgChartState
  ) {
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

  public async componentDidMount() {
    if (Environment.type !== EnvironmentType.Local) {
      const sharedLibrary = await this._loadSPComponentById(
        LIVE_PERSONA_COMPONENT_ID
      );
      const livePersonaCard: any = sharedLibrary.LivePersonaCard;
      this.setState({ livePersonaCard: livePersonaCard });
    }

    await this.loadOrgchart();
  }

  private async _loadSPComponentById(componentId: string): Promise<any> {
    try {
      const component: any = await SPComponentLoader.loadComponentById(
        componentId
      );
      return component;
    } catch (error) {
      Promise.reject(error);
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
  public async loadOrgchart() {

    this.setState({ treeData: [], isLoading: true });
    const currentUser = this.props.context.pageContext.user.loginName;
    let currentUserProperties = null;
    this.treeData = [];
    // Test if show only my Team or All Organization Chart
    switch (this.props.viewType) {
      case TreeOrgChartType.CompanyHierarchy:
        const spcurrentlogin = `i:0#.f|membership|${currentUser}`;
        currentUserProperties = await this.SPService.getUserProperties(
          spcurrentlogin
        );
        const treeManagers = await this.buildOrganizationChart(
          currentUserProperties
        );
        if (treeManagers) this.treeData.push(treeManagers);
        break;
      case TreeOrgChartType.MyTeam:
        const myteam = await this.buildMyTeamOrganizationChart(
          currentUser
        );
        if (myteam)
          this.treeData = [{ ...myteam }];
        break;
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
  }

  /*
    Build Organization Chart from currentUser
    @parm : currentUserProperties
  */
  public async buildOrganizationChart(currentUserProperties: any) {
    // Get Managers
    let treeManagers: ITreeData | null = null;
    if (
      currentUserProperties.ExtendedManagers &&
      currentUserProperties.ExtendedManagers.length > 0
    ) {
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

    let spUser: IPersonaSharedProps = {};
    let imageInitials: string[] = user.displayName ? user.displayName.split(" ") : [];
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


  private async getUsers(upn: string): Promise<ITreeData | null> {
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

  private async getDirectReportsUsers(upn?: string, level: number = 1, expanded: boolean = false): Promise<ITreeData[] | null> {
    if (!upn) { return null; }

   
    const directReportsUser = await this.GraphService.getUserDirectReports(upn,this.props.excludefilter,this.props.filter);
    //this is already level 1
    if (directReportsUser && directReportsUser.length > 0) {
      return await Promise.all(directReportsUser.map(async (dr) => {
        const children = ((level +1) <= this.props.maxLevels) ? await this.getDirectReportsUsers(dr.userPrincipalName, level + 1) : null;
        return ({
          title: this.buildPersonaCard(dr),
          expanded: expanded,
          children: children
        });

      }));
    }
    return null;
  }



  //buildTeamLeaderOrganizationChart
  private async buildTeamLeaderOrganizationChart(upn: string): Promise<ITreeData | null> {

    const tmpupn: string | undefined = this.claimUserToUPN(upn);

    return await this.getUsers(tmpupn ? tmpupn : upn);

  }
  /*
      Build My Team Organization Chart
      @parm: currentUserProperties
  */
  private async buildMyTeamOrganizationChart(upn: string): Promise<ITreeData | null> {

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
            context={this.props.context}
            titleText={strings.TeamLeaderHeadline}
            personSelectionLimit={1}
            groupName={""} // Leave this blank in case you want to filter from all users
            isRequired={true}
            disabled={false}
            defaultSelectedUsers={selectedTeamleader ? [selectedTeamleader] : undefined}
            selectedItems={(items: any) => {
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
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
        </div>)}

        {this.state.isLoading ? (
          <Spinner
            size={SpinnerSize.large}
            label="Loading Organization Chart ..."
          ></Spinner>
        ) : null}
        <div className={styles.treeContainer}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.handleTreeOnChange.bind(this)}
            canDrag={false}
            rowHeight={70}
            maxDepth={this.props.maxLevels}
            generateNodeProps={rowInfo => {
              return !this.props.detailBehavoir ?
                ({
                  buttons: [
                    <IconButton
                      disabled={false}
                      checked={false}
                      iconProps={{ iconName: "ContactInfo" }}
                      title={strings.ContactInfoTitle}
                      ariaLabel={strings.ContactInfoTitle}
                      onClick={() => {
                        window.open(
                          `https://eur.delve.office.com/?p=${rowInfo.node.title.props.tertiaryText}&v=work`
                        );
                      }}
                    />
                  ]
                }) : undefined;
            }
            }
          />
        </div>
      </div>
    );
  }
}
