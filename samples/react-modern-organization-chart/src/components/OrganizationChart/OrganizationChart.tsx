import * as React from "react";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { IOrganizationChartProps } from "./IOrganizationChartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Customizer } from "@uifabric/utilities/lib/";
import * as strings from "OrganizationChartWebPartStrings";
import {
  IStyle,
  mergeStyles,
  Persona,
  IPersonaSharedProps,
  PersonaSize,
  PersonaPresence,
  DocumentCard,
  IPersonaStyles,
  mergeStyleSets,
  IDocumentCardStyles,
  Spinner,
  SpinnerSize,
  Stack,
  IPersonaProps,
  Label,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";

//import { AppContext } from "../../Entities/AppContext";
import { IAppContext } from "../../Entities/IAppContext";
import { IUserInfo } from "../../Entities/IUserInfo";
import { useState } from "react";
import { useGetUserProperties } from "../../hooks/useGetUserProperties";
import { IOrganizationChartState } from "./IOrganizationChartState";

// Persona Styles
const personaStyles: Partial<IPersonaStyles> = {
  root: {},
  primaryText: {
    fontSize: 14,
    fontWeight: 500,
  },
};

// Maping presence status MSGraph to persona presence status
const presenceStatus: any[] = [];
presenceStatus["Available"] = PersonaPresence.online;
presenceStatus["AvailableIdle"] = PersonaPresence.online;
presenceStatus["Away"] = PersonaPresence.away;
presenceStatus["BeRightBack"] = PersonaPresence.away;
presenceStatus["Busy"] = PersonaPresence.busy;
presenceStatus["BusyIdle"] = PersonaPresence.busy;
presenceStatus["DoNotDisturb"] = PersonaPresence.dnd;
presenceStatus["Offline"] = PersonaPresence.offline;
presenceStatus["PresenceUnknown"] = PersonaPresence.none;

// Functional Component
export const OrganizationChart: React.FunctionComponent<IOrganizationChartProps> = (
  props: IOrganizationChartProps
) => {

  // Timer Id used by setInterval
  let _timerId:number = 0;
  // Application Context (React.Context)
  const applicationContext: IAppContext = {
    currentUser: props.currentUser,
    context: props.context,
  };

  // State
  const [state, setState] = useState<IOrganizationChartState>({
    isloading: true,
    hasError: false,
    errorMessage: "",
    managerList: [],
    userProfile: undefined,
    reportsList: [],
  });

  // Global Compoment Styles
  const stylesComponent = mergeStyleSets({
    container: {
      minWidth: 257,
      display: "block",
      maxWidth: 300,
      maxHeight: 620,
      overflow: "auto",
      padding: 10,
      paddingBottom: 20,
    },
    managerList: {
      display: "block",
      marginLeft: 30,
      marginRight: 10,
      height: "auto",
      paddingBottom: 40,
      borderLeftStyle: "solid",
      borderLeftWidth: 2,
      borderLeftColor: props.themeVariant.palette.neutralQuaternary,
      borderBottomColor: props.themeVariant.palette.neutralQuaternary,
      borderBottomStyle: "solid",
      borderBottomWidth: 2,
    },
    currentUser: {
      marginLeft: 75,
      height: "auto",
      marginRight: 10,
      borderLeftStyle: state.reportsList.length > 0 ? "solid" : "none",
      borderLeftWidth: state.reportsList.length > 0 ? 2 : 0,
      borderLeftColor: props.themeVariant.palette.neutralQuaternary,
      borderBottomColor: props.themeVariant.palette.neutralQuaternary,
    },
    directReportList: {
      marginLeft: 85,
      height: "auto",
      marginRight: 10,
    },
    directReportInfo: {
      width: "70%",
      padding: 5,
      height: "auto",
      backgroundColor: props.themeVariant.palette.neutralLight,
      marginLeft: 1,
      marginTop: 20,
    },
    webPartTile: {
      paddingLeft: 30,
      paddingTop: 20,
    },
  });
  // Document Card Styles
  const documentCardManagerStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginLeft: -25,
      marginTop: 15,
      padding: 5,
      paddingBottom: 5,
      borderStyle: "none",
      borderWidth: 0,
      selectors: {
        ":hover": {
          backgroundColor: props.themeVariant.palette.themeLighter,
        },
        ":hover::after": {
          borderWidth: 0,
          borderStyle: "none",
        },
      },
    },
  };

  const documentCardUserStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginLeft: 0,
      marginTop: 15,
      padding: 5,
      paddingBottom: 5,
      borderStyle: "none",
      borderWidth: 0,
      selectors: {
        ":hover": {
          backgroundColor: props.themeVariant.palette.themeLighter,
        },
        ":hover::after": {
          borderWidth: 0,
          borderStyle: "none",
        },
      },
    },
  };

  const documentCardCurrentUserStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginLeft: -25,
      padding: 5,
      borderStyle: "none",
      borderWidth: 0,
      marginTop: state.managerList.length > 0 ? -25 : 15,
      selectors: {
        ":hover": {
          backgroundColor: props.themeVariant.palette.themeLighter,
        },
        ":hover::after": {
          borderWidth: 0,
          borderStyle: "none",
        },
      },
    },
  };

  const _onRenderCoin = (iconProps: IPersonaProps): JSX.Element => {
    const { coinSize, imageAlt, imageUrl } = iconProps;
    return (
      <img
        src={imageUrl}
        alt={imageAlt}
        width={coinSize}
        height={coinSize}
        style={{
          display: "block",
          background: "transparent",
          border: `2px solid ${props.themeVariant.palette.neutralTertiary}`,
          borderRadius: "50%",
        }}
      />
    );
  };

  const _userPersonaCard = (userInfo: IUserInfo): JSX.Element => {
    return (
      <>
        <DocumentCard
          styles={documentCardUserStyles}
          onClickHref={userInfo.userUrl}
          key={userInfo.email}
        >
          <Persona
            styles={personaStyles}
            imageUrl={userInfo.pictureUrl}
            text={userInfo.displayName}
            secondaryText={userInfo.title}
            size={PersonaSize.size40}
            coinSize={40}
            onRenderCoin={_onRenderCoin}
            presence={presenceStatus[userInfo.presence.availability]}
            presenceTitle={userInfo.presence.activity}
          />
        </DocumentCard>
      </>
    );
  };

  const _managerPersonaCard = (managerInfo: IUserInfo): JSX.Element => {
    return (
      <>
        <DocumentCard
          styles={documentCardManagerStyles}
          onClickHref={managerInfo.userUrl}
          key={managerInfo.email}
        >
          <Persona
            styles={personaStyles}
            imageUrl={managerInfo.pictureUrl}
            text={managerInfo.displayName}
            secondaryText={managerInfo.title}
            size={PersonaSize.size40}
            coinSize={40}
            onRenderCoin={_onRenderCoin}
            presence={presenceStatus[managerInfo.presence.availability]}
            presenceTitle={managerInfo.presence.activity}
          />
        </DocumentCard>
      </>
    );
  };

  React.useEffect(() => {
    (async () => {
      try {
        let {
          _managersList,
          _currentUserProfile,
          _reportsList,
          getPresenceStatus,
        } = await useGetUserProperties(
          applicationContext.currentUser.loginName,
          applicationContext.context
        );

        setState({
          ...state,
          isloading: false,
          managerList: _managersList,
          reportsList: _reportsList,
          userProfile: _currentUserProfile,
        });

        // Pooling status each x min ( value define as property in webpart)
        // test if there are an Timer running if exist clear
        if (_timerId) {
          clearInterval(_timerId);
        }
        const _interval = props.refreshInterval * 60000;
       _timerId =  setInterval(async () => {
         console.log("cheching new status... ", new Date());
          const newPresenceStatus =  await getPresenceStatus(
            _managersList,
            _reportsList,
            _currentUserProfile
          );
          const {
            managersList,
            currentUserProfile,
            reportsList,
          } = newPresenceStatus;
          setState({
            ...state,
            isloading: false,
            managerList: managersList,
            reportsList: reportsList,
            userProfile: currentUserProfile,
          });
        }, _interval);

        //
      } catch (error) {
        setState({
          ...state,
          isloading: false,
          hasError: true,
          errorMessage: `${strings.errorMessage}  ${error.message}`,
        });
      }
    })();
  }, [props.title, props.refreshInterval]);

  // Render component
  return (
    <>
      <div className={stylesComponent.container}>
        <WebPartTitle
          displayMode={props.displayMode}
          title={props.title}
          updateProperty={props.updateProperty}
          themeVariant={props.themeVariant}
        />

        {state.isloading ? (
          <Stack horizontal horizontalAlign={"center"}>
            <Spinner size={SpinnerSize.small} label={"loading..."} />
          </Stack>
        ) : state.hasError ? (
          <MessageBar messageBarType={MessageBarType.error}>
            {state.errorMessage}
          </MessageBar>
        ) : (
          <ol style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={{ display: "list-item" }}>
              {state.managerList.length > 0 ? (
                <div className={stylesComponent.managerList} key={1}>
                  {state.managerList.map((manager, i) => {
                    return _managerPersonaCard(manager);
                  })}
                </div>
              ) : null}
            </li>
            <li style={{ display: "list-item" }}>
              {state.userProfile ? (
                <div
                  className={stylesComponent.currentUser}
                  style={{
                    marginLeft: state.managerList.length > 0 ? 80 : 40,
                  }}
                >
                  <DocumentCard
                    onClickHref={state.userProfile.UserUrl}
                    styles={documentCardCurrentUserStyles}
                  >
                    <Persona
                      styles={{
                        ...personaStyles,
                        primaryText: { fontWeight: 700 },
                      }}
                      imageUrl={state.userProfile.PictureUrl}
                      text={state.userProfile.DisplayName}
                      secondaryText={state.userProfile.Title}
                      size={PersonaSize.size40}
                      coinSize={40}
                      onRenderCoin={_onRenderCoin}
                      presence={
                        presenceStatus[state.userProfile.presence.availability]
                      }
                      presenceTitle={state.userProfile.presence.activity}
                      // imageAlt={"Annie Linguist, status is away"}
                    />
                  </DocumentCard>
                  {state.reportsList.length > 0 ? (
                    <div className={stylesComponent.directReportInfo}>
                      <Label style={{ fontWeight: 500, fontSize: 12 }}>
                        Direct Reports ({state.reportsList.length})
                      </Label>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div
                className={stylesComponent.directReportList}
                style={{
                  marginLeft: state.managerList.length > 0 ? 80 : 40,
                }}
              >
                {state.reportsList.length > 0
                  ? state.reportsList.map((user, i) => {
                      return _userPersonaCard(user);
                    })
                  : null}
              </div>
            </li>
          </ol>
        )}
      </div>
    </>
  );
};
