import * as React from "react";
import { IOrgChartProps } from "./IOrgChartProps";
import { IOrgChartState } from "./IOrgChartState";
import { OrgChartReducer } from "./OrgChartReducer";
import {
  useGetUserProperties,
  manpingUserProperties,
} from "../../hooks/useGetUserProperties";
import { IStackStyles, Stack } from "@fluentui/react/lib/Stack";
import { PersonCard } from "../PersonCard/PersonCard";
import { IUserInfo } from "../../models/IUserInfo";
import { EOrgChartTypes } from "./EOrgChartTypes";
import {
  MessageBar,
  MessageBarType,
  Overlay,
  Spinner,
  SpinnerSize,
  Text,
} from "@fluentui/react";

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { getGUID } from "@pnp/common";
import { useOrgChartStyles } from "./useOrgChartStyles";

import "./OrgChart.module.scss";

const initialState: IOrgChartState = {
  isLoading: true,
  renderDirectReports: [],
  renderManagers: [],
  error: undefined,
  currentUser: undefined,
};

const titleStyle: IStackStyles = {
  root: {
    paddingBottom: 40,
  },
};

export const OrgChart: React.FunctionComponent<IOrgChartProps> = (
  props: IOrgChartProps
) => {
  const { getUserProfile } = useGetUserProperties();
  const [state, dispatch] = React.useReducer(OrgChartReducer, initialState);
  const { orgChartClasses } = useOrgChartStyles();

  const {
    renderManagers,
    renderDirectReports,
    currentUser,
    isLoading,
    error,
  }: IOrgChartState = state;

  const {
    context,
    showAllManagers,
    showGuestUsers,
    startFromUser,
    showActionsBar,
    title,
  }: IOrgChartProps = props;


  const startFromUserId: Maybe<string> = React.useMemo(
    () => startFromUser && startFromUser[0].id,
    [startFromUser]
  );
  const onUserSelected = React.useCallback((selectedUser: IUserInfo) => {
    dispatch({
      type: EOrgChartTypes.SET_CURRENT_USER,
      payload: selectedUser,
    });
  }, []);

  const loadOrgChart = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (selectedUser: string): Promise<any> => {
      const wRenderManagers: JSX.Element[] = [];
      const wRenderDirectReports: JSX.Element[] = [];

      try {
        const profileResponse = await getUserProfile(
          selectedUser,
          startFromUserId,
          showAllManagers,
          showGuestUsers,
        );
        if (profileResponse) {
          for (const managerInfo of profileResponse.managersList) {
            wRenderManagers.push(
              <>
                <PersonCard
                  key={getGUID()}
                  userInfo={managerInfo}
                  onUserSelected={onUserSelected}
                  selectedUser={currentUser}
                  showActionsBar={showActionsBar}
                 />
                <div
                  key={getGUID()}
                  className={orgChartClasses.separatorVertical}
                 />
              </>
            );
          }

          for (const directReport of profileResponse.reportsLists) {
            wRenderDirectReports.push(
              <>
                <PersonCard
                  key={getGUID()}
                  userInfo={directReport}
                  onUserSelected={onUserSelected}
                  selectedUser={currentUser}
                  showActionsBar={showActionsBar}
                 />
              </>
            );
          }
        }

        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: { hasError: false, errorMessage: "" },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: EOrgChartTypes.SET_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: {
            hasError: true,
            errorMessage: "error",
          },
        });
      }

      return { wRenderDirectReports, wRenderManagers };
    },

    [
      getUserProfile,
      startFromUserId,
      showAllManagers,
      showGuestUsers,
      onUserSelected,
      currentUser,
      showActionsBar,
      orgChartClasses.separatorVertical,
    ]
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        if (startFromUserId === undefined)  return;
        if (startFromUserId === ''){
          dispatch({
            type: EOrgChartTypes.SET_IS_LOADING,
            payload: false,
          });
          dispatch({
            type: EOrgChartTypes.SET_HAS_ERROR,
            payload: {
              hasError: true,
              errorMessage: "User don't have email defined",
            },
          });
          return;
        }
        const profileResponse = await getUserProfile(startFromUserId);
        const wCurrentUser: IUserInfo = await manpingUserProperties(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          profileResponse!.currentUserProfile
        );
        dispatch({
          type: EOrgChartTypes.SET_CURRENT_USER,
          payload: wCurrentUser,
        });
        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: { hasError: false, errorMessage: "" },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: EOrgChartTypes.SET_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: {
            hasError: true,
            errorMessage: "error",
          },
        });
      }
    })();
  }, [getUserProfile, startFromUserId]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (!currentUser || !currentUser.id) return;
      dispatch({
        type: EOrgChartTypes.SET_IS_LOADING,
        payload: true,
      });

      const { wRenderDirectReports, wRenderManagers } = await loadOrgChart(
        currentUser.id
      );
      dispatch({
        type: EOrgChartTypes.SET_RENDER_MANAGERS,
        payload: wRenderManagers,
      });
      dispatch({
        type: EOrgChartTypes.SET_RENDER_DIRECT_REPORTS,
        payload: wRenderDirectReports,
      });
      dispatch({
        type: EOrgChartTypes.SET_IS_LOADING,
        payload: false,
      });
    })();
  }, [currentUser, loadOrgChart]);

  if (!startFromUser) {
    return (
      <Placeholder
        iconName="Edit"
        iconText="Configure your Organization Chart Web Part"
        description={"Please configure web part"}
        buttonLabel="Configure"
        onConfigure={context.propertyPane.open}
      />
    );
  }

  if (isLoading) {
    return (
      <Overlay style={{ height: "100%", position: "fixed" }}>
        <Stack style={{ height: "100%" }} verticalAlign="center">
          <Spinner
            styles={{ root: { zIndex: 9999 } }}
            size={SpinnerSize.large}
            label={"loading Organization Chart..."}
            labelPosition={"bottom"}
           />
        </Stack>
      </Overlay>
    );
  }

  if (error && error.hasError) {
    return (
      <Stack
        horizontal
        horizontalAlign="center"
        styles={{root:{padding: 20}}}
        tokens={{ childrenGap: 10 }}
      >
        <MessageBar messageBarType={MessageBarType.error} isMultiline>
          {error.errorMessage}
        </MessageBar>
      </Stack>
    );
  }

  return (
    <>
      <Stack  styles={{root:{padding: 20}}} >
        <Stack horizontal horizontalAlign="center" styles={titleStyle}>
          <Text variant="xLarge" block>
            {title}
          </Text>
        </Stack>
        <Stack horizontalAlign="center" verticalAlign="center">
          {renderManagers}
          <PersonCard
            key={getGUID()}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            userInfo={currentUser!}
            onUserSelected={onUserSelected}
            selectedUser={currentUser}
            showActionsBar={showActionsBar}
           />
          {renderDirectReports.length && (
            <>
              <div className={orgChartClasses.separatorVertical} />
              <div className={orgChartClasses.separatorHorizontal} />
            </>
          )}
        </Stack>
        <Stack
          horizontal
          horizontalAlign="center"
          styles={{root:{padding: 10}}}
          tokens={{ childrenGap: 15 }}
          wrap
        >
          {renderDirectReports}
        </Stack>
      </Stack>
    </>
  );
};
