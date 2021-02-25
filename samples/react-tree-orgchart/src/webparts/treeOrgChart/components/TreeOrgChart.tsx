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
import { ITreeChildren } from "./ITreeChildren";
import { ITreeData } from "./ITreeData";
import {
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react/lib/components/Spinner";
import { DisplayMode, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'TreeOrgChartWebPartStrings';


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

  constructor(props) {
    super(props);

    this.SPService = new SPService(this.props.context);
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

  private livePersonaCard(userProperties: any): JSX.Element {
    return React.createElement(
      this.state.livePersonaCard,
      {
        serviceScope: this.props.context.serviceScope,
        upn: userProperties.Email,
        onCardOpen: () => {
          console.log('LivePersonaCard Open');
        },
        onCardClose: () => {
          console.log('LivePersonaCard Close');
        },
      }, this.buildDefaultPersonaCard(userProperties)
    );

  }

  /*
  // Load Organization Chart
  */
  public async loadOrgchart() {

    this.setState({ treeData: [], isLoading: true });
    const currentUser = `i:0#.f|membership|${this.props.context.pageContext.user.loginName}`;
    let currentUserProperties = null;
    this.treeData = [];
    // Test if show only my Team or All Organization Chart
    switch (this.props.viewType) {
      case TreeOrgChartType.CompanyHierarchy:
        currentUserProperties = await this.SPService.getUserProperties(
          currentUser
        );
        const treeManagers = await this.buildOrganizationChart(
          currentUserProperties
        );
        if (treeManagers) this.treeData.push(treeManagers);
        break;
      case TreeOrgChartType.MyTeam:
        currentUserProperties = await this.SPService.getUserProperties(
          currentUser
        );
        const myteam = await this.buildMyTeamOrganizationChart(
          currentUserProperties
        );
        if (myteam)
          this.treeData.push({
            title: myteam.person,
            expanded: true,
            children: myteam.treeChildren
          });
        break;
      case TreeOrgChartType.ShowOtherTeam:
        debugger;
        if (this.props.teamLeader && this.props.teamLeader.length > 0) {
          currentUserProperties = await this.SPService.getUserProperties(
            this.props.teamLeader
          );
          const otherteam = await this.buildTeamLeaderOrganizationChart(
            currentUserProperties
          );
          if (otherteam)
            this.treeData.push({
              title: otherteam.person,
              expanded: true,
              children: otherteam.treeChildren
            });
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
      treeManagers = await this.getUsers(
        currentUserProperties.ExtendedManagers[0]
      );
    }
    return treeManagers;
  }

  public buildPersonaCard(userProperties: any): JSX.Element {
    if (this.props.detailBehavoir) {
      if (this.state.livePersonaCard) {
        return (this.livePersonaCard(userProperties));
      }
      return this.buildDefaultPersonaCard(userProperties);
    } else {
      return this.buildDefaultPersonaCard(userProperties);
    }
  }

  public buildDefaultPersonaCard(userProperties: any): JSX.Element {

    let spUser: IPersonaSharedProps = {};
    let imageInitials: string[] = userProperties.DisplayName.split(" ");

    // Persona Card Properties
    spUser.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${userProperties.Email}`;
    spUser.imageInitials = imageInitials && imageInitials.length > 0 ? `${imageInitials[0]
      .substring(0, 1)
      .toUpperCase()}${imageInitials[1] ? imageInitials[1].substring(0, 1).toUpperCase() : ''}` : '';
    spUser.text = userProperties.DisplayName;
    spUser.tertiaryText = userProperties.Email;
    spUser.secondaryText = userProperties.Title;
    // PersonaCard component
    return (
      <Persona
        {...spUser}
        hidePersonaDetails={false}
        size={PersonaSize.size40}
      />
    );
  }

  /*
  // Get user from Top Manager
  */
  private async getUsers(manager: string) {

    // Get User Properties
    const managerProperties = await this.SPService.getUserProperties(manager);

    const person = this.buildPersonaCard(managerProperties);

    // Has DirectReports
    if (
      managerProperties.DirectReports &&
      managerProperties.DirectReports.length > 0
    ) {


      const usersDirectReports: any[] = await this.getChildren(
        this.applyFilter(managerProperties.DirectReports)
      );
      // return treeData
      return { title: person, expanded: true, children: usersDirectReports };
      // Don't have DirectReports
    } else {
      // return treeData
      return { title: person };
    }
  }

  private applyFilter(directReports: string[]): string[] {
    let applyuser: string[] = [];
    if (this.props.filter && this.props.filter.length > 0) {
      //filter is active

      if (this.props.excludefilter) {
        applyuser = directReports.filter((x) => x.indexOf(this.props.filter) === -1);
      } else {
        applyuser = directReports.filter((x) => x.indexOf(this.props.filter) !== -1);
      }

    } else {
      applyuser = directReports;
    }

    return applyuser;
  }
  // Get Children (user DirectReports)
  private async getChildren(userDirectReports: any[]) {
    let treeChildren: ITreeChildren[] = [];

    for (const user of userDirectReports) {
      const managerProperties = await this.SPService.getUserProperties(user);

      const person = this.buildPersonaCard(managerProperties);
      const usersDirectReports = await this.getChildren(
        this.applyFilter(managerProperties.DirectReports)
      );

      usersDirectReports
        ? treeChildren.push({ title: person, children: usersDirectReports })
        : treeChildren.push({ title: person });
    }
    return treeChildren;
  }

  //buildTeamLeaderOrganizationChart
  private async buildTeamLeaderOrganizationChart(teamleaderUserProperties: any) {
    const teamleaderCard = this.buildPersonaCard(teamleaderUserProperties);

    const usersDirectReports: any[] = await this.getChildren(
      this.applyFilter(teamleaderUserProperties.DirectReports)
    );
    return { person: teamleaderCard, treeChildren: usersDirectReports };

  }
  /*
      Build My Team Organization Chart
      @parm: currentUserProperties
  */
  private async buildMyTeamOrganizationChart(currentUserProperties: any) {
    let treeChildren: ITreeChildren[] = [];
    let hasManager: boolean = false;
    let managerCard: any;
    // Get My Manager
    const myManager = await this.SPService.getUserProfileProperty(
      currentUserProperties.AccountName,
      "Manager"
    );
    // Get My Manager Properties
    if (myManager) {
      const managerProperties = await this.SPService.getUserProperties(
        myManager
      );
      managerCard = this.buildPersonaCard(managerProperties);

      hasManager = true;
    }

    // Get my Properties

    const meCard = this.buildPersonaCard(currentUserProperties);

    const usersDirectReports: any[] = await this.getChildren(
      this.applyFilter(currentUserProperties.DirectReports)
    );
    // Current USer Has Manager
    if (hasManager) {
      treeChildren.push({
        title: meCard,
        expanded: true,
        children: usersDirectReports
      });
    } else {
      treeChildren = usersDirectReports;
      managerCard = meCard;
    }

    // Get MyPeers
    for (const userPeer of currentUserProperties.Peers) {
      const peerProperties = await this.SPService.getUserProperties(userPeer);

      const peerCard = this.buildPersonaCard(peerProperties);

      treeChildren.push({ title: peerCard });
    }
    // Return
    return { person: managerCard, treeChildren: treeChildren };
  }
  // Render
  public render(): React.ReactElement<ITreeOrgChartProps> {
    const showEditOther: boolean = this.props.displayMode === DisplayMode.Edit && this.props.viewType === TreeOrgChartType.ShowOtherTeam;
    let selectedTeamleader: string | undefined = undefined;
    if (showEditOther && this.props.teamLeader && this.props.teamLeader.length > 0 && this.props.teamLeader.split('|').length === 3) {
      selectedTeamleader = this.props.teamLeader.split('|')[2];
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
                if (items.length > 0)
                  this.props.updateTeamLeader(items[0].loginName);
                else {
                  this.props.updateTeamLeader('');
                }
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
            canDrop={false}
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
