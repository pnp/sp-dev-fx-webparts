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
      this.props.currentUserTeam !== prevProps.currentUserTeam ||
      this.props.maxLevels !== prevProps.maxLevels
    ) {
      await this.loadOrgchart();
    }
  }

  public async componentDidMount() {
    await this.loadOrgchart();
  }
  /*
  // Load Organization Chart
  */
  public async loadOrgchart() {
    this.setState({ treeData: [], isLoading: true });
    const currentUser = `i:0#.f|membership|${this.props.context.pageContext.user.loginName}`;
    const currentUserProperties = await this.SPService.getUserProperties(
      currentUser
    );
    this.treeData = [];
    // Test if show only my Team or All Organization Chart
    if (!this.props.currentUserTeam) {
      const treeManagers = await this.buildOrganizationChart(
        currentUserProperties
      );
      if (treeManagers) this.treeData.push(treeManagers);
    } else {
      const treeManagers = await this.buildMyTeamOrganizationChart(
        currentUserProperties
      );
      if (treeManagers)
        this.treeData.push({
          title: treeManagers.person,
          expanded: true,
          children: treeManagers.treeChildren
        });
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
  /*
  // Get user from Top Manager
  */
  private async getUsers(manager: string) {
    let person: any;
    let spUser: IPersonaSharedProps = {};
    // Get User Properties
    const managerProperties = await this.SPService.getUserProperties(manager);


    let imageInitials: string[] =  managerProperties.DisplayName.split(" ");
    
    // Persona Card Properties
    spUser.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${managerProperties.Email}`;
    spUser.imageInitials = imageInitials && imageInitials.length > 0 ?  `${imageInitials[0]
      .substring(0, 1)
      .toUpperCase()}${imageInitials[1] ? imageInitials[1].substring(0, 1).toUpperCase():''}` : '';
    spUser.text = managerProperties.DisplayName;
    spUser.tertiaryText = managerProperties.Email;
    spUser.secondaryText = managerProperties.Title;
    // PersonaCard component
    person = (
      <Persona
        {...spUser}
        hidePersonaDetails={false}
        size={PersonaSize.size40}
      />
    );
    // Has DirectReports
    if (
      managerProperties.DirectReports &&
      managerProperties.DirectReports.length > 0
    ) {
      const usersDirectReports: any[] = await this.getChildren(
        managerProperties.DirectReports
      );
      // return treeData
      return { title: person, expanded: true, children: usersDirectReports };
      // Don't have DirectReports
    } else {
      // return treeData
      return { title: person };
    }
  }
  // Get Children (user DirectReports)
  private async getChildren(userDirectReports: any[]) {
    let treeChildren: ITreeChildren[] = [];
    let spUser: IPersonaSharedProps = {};

    for (const user of userDirectReports) {
      const managerProperties = await this.SPService.getUserProperties(user);
      const imageInitials: string[] = managerProperties.DisplayName.split(" ");

      spUser.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${managerProperties.Email}`;
      spUser.imageInitials = imageInitials && imageInitials.length > 0 ?  `${imageInitials[0]
        .substring(0, 1)
        .toUpperCase()}${imageInitials[1] ? imageInitials[1].substring(0, 1).toUpperCase(): ''}` : '';
      spUser.text = managerProperties.DisplayName;
      spUser.tertiaryText = managerProperties.Email;
      spUser.secondaryText = managerProperties.Title;
      const person = (
        <Persona
          {...spUser}
          hidePersonaDetails={false}
          size={PersonaSize.size40}
        />
      );
      const usersDirectReports = await this.getChildren(
        managerProperties.DirectReports
      );

      usersDirectReports
        ? treeChildren.push({ title: person, children: usersDirectReports })
        : treeChildren.push({ title: person });
    }
    return treeChildren;
  }

  /*
      Build My Team Organization Chart
      @parm: currentUserProperties
  */
  private async buildMyTeamOrganizationChart(currentUserProperties: any) {
    let manager: IPersonaSharedProps = {};
    let me: IPersonaSharedProps = {};
    let treeChildren: ITreeChildren[] = [];
    let peer: IPersonaSharedProps = {};
    let imageInitials: string[];
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
      imageInitials = managerProperties.DisplayName?.split(" ").map(name => name[0]);
      // PersonaCard Props
      manager.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${managerProperties.Email}`;
      if (imageInitials)
        manager.imageInitials = `${imageInitials[0]}${imageInitials[1] ? imageInitials[1]: ''}`.toUpperCase();
      manager.text = managerProperties.DisplayName;
      manager.tertiaryText = managerProperties.Email;
      manager.secondaryText = managerProperties.Title;
      // PersonaCard Component
      managerCard = (
        <Persona
          {...manager}
          hidePersonaDetails={false}
          size={PersonaSize.size40}
        />
      );
      hasManager = true;
    }

    // Get my Properties
    const meImageInitials: string[] = currentUserProperties.DisplayName.split(
      " "
    );
    me.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${currentUserProperties.Email}`;
    me.imageInitials =    me.imageInitials &&   me.imageInitials.length > 0  ?`${meImageInitials[0]
      .substring(0, 1)
      .toUpperCase()}${meImageInitials[1] ? meImageInitials[1].substring(0, 1).toUpperCase():''}` : '';
    me.text = currentUserProperties.DisplayName;
    me.tertiaryText = currentUserProperties.Email;
    me.secondaryText = currentUserProperties.Title;
    const meCard = (
      <Persona {...me} hidePersonaDetails={false} size={PersonaSize.size40} />
    );
    const usersDirectReports: any[] = await this.getChildren(
      currentUserProperties.DirectReports
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
      imageInitials = peerProperties.DisplayName.split(" ");
      peer.imageUrl = `/_layouts/15/userphoto.aspx?size=L&username=${peerProperties.Email}`;
      peer.imageInitials =   peer.imageInitials && peer.imageInitials.length>0 ? `${imageInitials[0]
        .substring(0, 1)
        .toUpperCase()}${imageInitials[1] ? imageInitials[1].substring(0, 1).toUpperCase():''}` : '';
      peer.text = peerProperties.DisplayName;
      peer.tertiaryText = peerProperties.Email;
      peer.secondaryText = peerProperties.Title;
      const peerCard = (
        <Persona
          {...peer}
          hidePersonaDetails={false}
          size={PersonaSize.size40}
        />
      );
      treeChildren.push({ title: peerCard });
    }
    // Return
    return { person: managerCard, treeChildren: treeChildren };
  }
  // Render
  public render(): React.ReactElement<ITreeOrgChartProps> {
    return (
      <div className={styles.treeOrgChart}>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
        />
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
            generateNodeProps={rowInfo => ({
              buttons: [
                <IconButton
                  disabled={false}
                  checked={false}
                  iconProps={{ iconName: "ContactInfo" }}
                  title="Contact Info"
                  ariaLabel="Contact"
                  onClick={() => {
                    window.open(
                      `https://eur.delve.office.com/?p=${rowInfo.node.title.props.tertiaryText}&v=work`
                    );
                  }}
                />
              ]
            })}
          />
        </div>
      </div>
    );
  }
}
