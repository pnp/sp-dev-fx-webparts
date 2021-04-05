import * as React from "react";
import styles from "./StaffDirectory.module.scss";
import { IStaffDirectoryProps } from "./IStaffDirectoryProps";
import { IStaffDirectoryState } from "./IStaffDirectoryState";
import { escape } from "@microsoft/sp-lodash-subset";
import { WebPartTitle } from "@pnp/spfx-controls-react";
import { MSGraphClient } from "@microsoft/sp-http";
import {
  IStackTokens,
  mergeStyleSets,
  IBasePickerStyles,
  IPersonaProps,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  IPersonaStyleProps,
  ValidationState,
  Customizer,
  Stack,
  FontIcon,
  NormalPeoplePicker,
  ImageFit,
  Image,
  Text,
  ActionButton,
  Link,
  ILinkStyles,
  warnConditionallyRequiredProps,
  LinkBase,
  mergeStyles,
} from "office-ui-fabric-react";
import { IAppContext } from "../../common/IAppContext";
import { IUser } from "../../entites/IUser";
import {
  useGetUsersByDepartment,
  useGetUserId,
  useSearchUsers,
  useGetUsersPresence,
  useGetUsersNextPage,
} from "../../hooks/useSearchUsers";
import { useInterval } from '../../hooks/useInterval';
import { IUserExtended } from "../../entites/IUserExtended";
import { presenceStatus } from "../../common/PresenceStatus";
import { AppContext } from "../../common/AppContext";
import { UserCard } from "../UserCard/UserCard";
import { useRef } from "react";
import strings from "StaffDirectoryWebPartStrings";
import {Theme} from 'spfx-uifabric-themes';
const imageNoData: string = require("../../../assets/Nodatarafiki.svg");


const stackTokens: IStackTokens = {
  childrenGap: 10,
};
// Component Styles
const stackStyles = {
  root: {
    width: "100%",
  },
};
const suggestionProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: false,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

export const StaffDirectory: React.FunctionComponent<IStaffDirectoryProps> = (
  props: IStaffDirectoryProps
) => {
  const { showBox, maxHeight } = props;
 const _theme = window.__themeState__.theme;
  const styleClasses = mergeStyleSets({
    webPartTitle: {
      marginBottom: 20,
    },

    separator: {
      paddingLeft: 30,
      paddingRight: 30,
      margin: 20,
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: props.themeVariant?.palette?.themeLighter ?? _theme.themeLighter,
    },

    styleIcon: {
      maxWidth: 44,
      minWidth: 44,
      minHeight: 30,
      height: 30,
      borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
      borderRightWidth: 0,
      borderRightStyle: "none",
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    listContainer: {
      maxWidth: "100%",
      overflowY: "auto",

      marginTop: 20,
      padding: 10,
      boxShadow: showBox
        ? "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"
        : "",
    },
  });

  const pickerStyles: Partial<IBasePickerStyles> = {
    root: {
      width: "100%",
      maxHeight: 32,
      minHeight: 32,
      borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
    },
    itemsWrapper: {
      borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
    },
    text: {
      borderLeftWidth: 0,
      minHeight: 32,
      borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
      selectors: {
        ":focus": {
          borderColor:props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
        },
        ":hover": {
          borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
        },
        "::after": {
          borderColor: props.themeVariant?.palette?.themePrimary ?? _theme.themePrimary,
          borderWidth: 1,
          borderLeftWidth: 0,
        },
      },
    },
  };

  const nextPageStyle: ILinkStyles = {
    root: {
      fontWeight: 600,
      fontSize: props.themeVariant?.fonts?.mediumPlus?.fontSize ?? window.__themeState__.theme["ms-font-mediumPlus-fontSize"],
      selectors: { ":hover": { textDecoration: "underline" } },
    },
  };
  const _appContext  = React.useRef<IAppContext>({} as IAppContext);
  const _msGraphClient = React.useRef<MSGraphClient>();
  const _currentUser=  React.useRef<any>('');
  const _currentUserDepartment = React.useRef<string>('');


  const [state, setState] = React.useState<IStaffDirectoryState>({
    listUsers: [],
    hasError: false,
    errorMessage: "",
    isLoading: true,
    updateUsersPresence: false,
    nextPageLink: undefined,
    isLoadingNextPage: false,
  });

  const picker = React.useRef(null);
  _currentUser.current = props.context.pageContext.user;
  let _currentuserProperties: IUser = {} as IUser;
  let _listUsers: IUserExtended[] = [];


  const _interval = props.refreshInterval * 60000;
  const _updatePresenceStatus: boolean = props.updatePresenceStatus;
  useInterval( async () => {

    _listUsers = state.listUsers;
    if (_listUsers) {
      _listUsers = await useGetUsersPresence(_listUsers, _msGraphClient.current);


      setState({
        ...state,
        listUsers: _listUsers,
        isLoading: false,
        updateUsersPresence: true,
      });
    }
  },(!_updatePresenceStatus || isNaN(_interval) ? null : _interval ));


  React.useEffect(() => {
    (async () => {
      try {
        _msGraphClient.current = await props.context.msGraphClientFactory.getClient();
        _currentUser.current = props.context.pageContext.user;

        _appContext.current.currentUser = _currentUser.current ;
        _appContext.current.msGraphClient = _msGraphClient.current;
        _appContext.current.themeVariant = props.themeVariant;

        _currentuserProperties = await useGetUserId(
          _currentUser.current.email,
          _msGraphClient.current
        );
        setState({
          ...state,
          isLoading: true,
        });
        _currentUserDepartment.current = _currentuserProperties.department;

        const _usersResults = await useGetUsersByDepartment(
          _currentUserDepartment.current,
          _msGraphClient.current,
          props.pageSize
        );
        _listUsers = _usersResults.usersExtended;

        setState({
          ...state,
          listUsers: _listUsers,
          isLoading: false,
          updateUsersPresence: false,
          nextPageLink: _usersResults.nextPage,
        });
        // Pooling status each x min ( value define as property in webpart)
      } catch (error) {
        setState({
          ...state,
          errorMessage: error.message
            ? error.message
            : " Error searching users, please try later or contact support.",
          hasError: true,
          isLoading: false,
        });
        console.log(error);
      }
    })();
  }, [props]);

  // on Filter changed
  const _onFilterChanged = async (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): Promise<IPersonaProps[]> => {
    let filteredPersonas: IPersonaProps[] = [];

    if (filterText.trim().length > 0) {
      try {
        const _usersResults = await useSearchUsers(
          "displayName:" + filterText,
          _msGraphClient.current
        );
        filteredPersonas = [];
        for (const _user of _usersResults.usersExtended) {
          filteredPersonas.push({
            text: _user.displayName,
            presence:presenceStatus[_user.availability].presenceStatus,
            presenceTitle:
              presenceStatus[_user.availability].presenceStatusLabel,
            imageUrl: _user.pictureBase64,
            secondaryText: _user.department,
          });
        }
        filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
        return filteredPersonas;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      return [];
    }
  };

  // On Picker Changed
  const _onPickerChange = async (items: IPersonaProps[]) => {
    if (!(items.length === 0)) return;
    try {
      setState({
        ...state,
        isLoading: true,
      });
      const _usersResults = await useGetUsersByDepartment(
        _currentUserDepartment.current,
        _msGraphClient.current,
        props.pageSize
      );
      setState({
        ...state,
        nextPageLink: _usersResults.nextPage,
        listUsers: _usersResults.usersExtended,
        updateUsersPresence: false,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        listUsers: [],
        hasError: true,
        errorMessage: error.message
          ? error.message
          : " Error searching users, please try later or contact support.",
      });
    }
  };

  const _onNextPage = async (
    event: React.MouseEvent<
      HTMLElement | HTMLAnchorElement | HTMLButtonElement | LinkBase,
      MouseEvent
    >
  ) => {
    event.preventDefault();
    let { listUsers, nextPageLink } = state;

    setState({
      ...state,
      isLoadingNextPage: true,
    });
    try {
      const _usersResults = await useGetUsersNextPage(
        nextPageLink,
        _msGraphClient.current
      );
      const _newlistUsers = listUsers.concat(_usersResults.usersExtended);

      setState({
        ...state,
        listUsers: _newlistUsers,
        isLoadingNextPage: false,
        nextPageLink: _usersResults.nextPage,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        listUsers: [],
        hasError: true,
        isLoadingNextPage: false,
        errorMessage: error.message
          ? error.message
          : strings.ErrorMessage
      });
    }
  };

  // Render compoent
  // Has Error
  if (state.hasError) {
    return (
      <MessageBar messageBarType={MessageBarType.error}>{state.errorMessage}</MessageBar>
    );
  }

  return (
    <AppContext.Provider value={_appContext.current}>
      <Customizer settings={{ theme: props.themeVariant }}>
        <WebPartTitle
          displayMode={props.displayMode}
          title={props.title}
          themeVariant={props.themeVariant}
          updateProperty={props.updateProperty}
          className={styleClasses.webPartTitle}
        />
        <Stack tokens={stackTokens} style={{ width: "100%" }}>
          <Stack
            style={{ width: "100%" }}
            horizontal={true}
            verticalAlign="center"
            tokens={{ childrenGap: 0 }}
          >
            <div className={styleClasses.styleIcon}>
              <FontIcon
                iconName="Search"
                style={{
                  verticalAlign: "center",
                  fontSize: props.themeVariant?.fonts?.mediumPlus?.fontSize ??   window.__themeState__.theme["ms-font-mediumPlus-fontSize"],
                  color: props.themeVariant?.palette.themePrimary ?? _theme.themePrimary,
                }}
              />
            </div>
            <NormalPeoplePicker
              itemLimit={1}
              onResolveSuggestions={_onFilterChanged}
              getTextFromItem={getTextFromItem}
              pickerSuggestionsProps={suggestionProps}
              className="ms-PeoplePicker"
              key="normal"
              onValidateInput={validateInput}
              onChange={_onPickerChange}
              styles={pickerStyles}
              componentRef={picker}
              onInputChange={onInputChange}
              resolveDelay={300}
              disabled={state.isLoading}
              onItemSelected={async (selectedItem: IPersonaProps) => {
                const _useSearchUsers = await useSearchUsers(
                  `displayName:${selectedItem.text.trim()}`,
                  _msGraphClient.current,
                  props.pageSize
                );
                setState({
                  ...state,
                  nextPageLink: _useSearchUsers.nextPage,
                  listUsers: _useSearchUsers.usersExtended,
                  isLoading: false,
                  updateUsersPresence: false,
                });
                return selectedItem;
              }}
            />
          </Stack>

          {state.isLoading ? (
            <Spinner size={SpinnerSize.medium}></Spinner>
          ) : (
            <div
              className={`${styleClasses.listContainer} ${styles.hideScrollBar}`}
              style={{ maxHeight: props.maxHeight }}
            >
              {state.listUsers.length > 0 ? (
                state.listUsers.map((user, i) => {
                  return (
                    <>
                      <UserCard
                        userData={user}
                        userAttributes={props.userAttributes}
                        updateUsersPresence={state.updateUsersPresence}
                      ></UserCard>
                      <div className={styleClasses.separator}></div>
                    </>
                  );
                })
              ) : (
                <>
                  <Stack
                    horizontalAlign="center"
                    verticalAlign="center"
                    style={{ marginBottom: 25 }}
                  >
                    <Image
                      src={imageNoData}
                      imageFit={ImageFit.cover}
                      width={250}
                      height={300}
                    ></Image>
                    <Text variant="large">No colleagues found </Text>
                  </Stack>
                </>
              )}
              {state.nextPageLink && (
                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  style={{
                    marginTop: 10,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                >
                  <Link
                    styles={nextPageStyle}
                    disabled={state.isLoadingNextPage}
                    onClick={_onNextPage}
                  >
                    Next Page
                  </Link>
                  {state.isLoadingNextPage && (
                    <Spinner
                      style={{ marginLeft: 5 }}
                      size={SpinnerSize.small}
                    ></Spinner>
                  )}
                </Stack>
              )}
            </div>
          )}
        </Stack>
      </Customizer>
    </AppContext.Provider>
  );
};

// Get text from Persona
const getTextFromItem = (persona) => {
  return persona.text;
};
// Remove dumplicate Items
const removeDuplicates = (personas, possibleDupes) => {
  return personas.filter((persona) => {
    return !listContainsPersona(persona, possibleDupes);
  });
};
// Check if  selecte list has a persona selected
const listContainsPersona = (persona, personas) => {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return (
    personas.filter((item) => {
      return item.text === persona.text;
    }).length > 0
  );
};
// Validate Input Function
const validateInput = (input) => {
  if (input.trim().length > 1) {
    return ValidationState.valid;
  } else {
    return ValidationState.invalid;
  }
};
/**
 *
 *
 * @param input The text entered into the picker.
 */
const onInputChange = (input) => {
  /*  const outlookRegEx = /<.*>/g;
   const emailAddress = outlookRegEx.exec(input);

   if (emailAddress && emailAddress[0]) {
     return emailAddress[0].substring(1, emailAddress[0].length - 1);
   } */
  return input;
};
