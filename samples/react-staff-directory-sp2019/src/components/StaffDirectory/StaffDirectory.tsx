import * as React from "react";
import styles from "./StaffDirectory.module.scss";
import { IStaffDirectoryProps } from "./IStaffDirectoryProps";
import { IStaffDirectoryState } from "./IStaffDirectoryState";
import { WebPartTitle } from "@pnp/spfx-controls-react";
import {
  IStackTokens,
  mergeStyleSets,
  IBasePickerStyles,
  IPersonaProps,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  ValidationState,
  Stack,
  FontIcon,
  NormalPeoplePicker,
  ImageFit,
  Image,
  Text,
  Link,
  ILinkStyles,
  LinkBase,
  mergeStyles,
} from "office-ui-fabric-react";
import { IAppContext } from "../../common/IAppContext";
import {
  useGetUserProperties, manpingUserProperties
} from "../../hooks/useGetUserProperties"
 
import { IUserExtended } from "../../entites/IUserExtended";
import { AppContext, currentSiteTheme } from "../../common/AppContext";
import { UserCard } from "../UserCard/UserCard";
import { toInteger } from "lodash";
import strings from "StaffDirectoryWebPartStrings";
import { SearchResults } from "@pnp/sp";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageNoData:never =  require('../../../assets/Nodatarafiki.svg');


const stackTokens: IStackTokens = {
  childrenGap: 10,
};
// Component Styles
const suggestionProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: false,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

const getTotalPages = (totalRows:number, pageSize:number):number => {
  let _totalPages: number =
totalRows /  pageSize;
const _modulus: number =  totalRows % pageSize;
_totalPages =  _modulus > 0 ? toInteger(_totalPages) + 1 : toInteger(_totalPages);
return _totalPages;
}


export const StaffDirectory: React.FunctionComponent<IStaffDirectoryProps> = (
  props: IStaffDirectoryProps
) => {
  const { showBox, context } = props;


const {  getUsers} = useGetUserProperties(context);

console.log( props.themeVariant);
console.log(currentSiteTheme);

  const styleClasses = mergeStyleSets({
    webPartTitle: mergeStyles({
      marginBottom: 20,
    }),

    separator:mergeStyles( {
      paddingLeft: 30,
      paddingRight: 30,
      margin: 20,
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: props.themeVariant?.themeLighter
    }),

    styleIcon:mergeStyles( {
      maxWidth: 44,
      minWidth: 44,
      minHeight: 30,
      height: 30,
      borderColor: props.themeVariant?.themePrimary ,
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
    }),
    listContainer: mergeStyles( {
      maxWidth: "100%",
      overflowY: "auto",

      marginTop: 20,
      padding: 10,
      boxShadow: showBox
        ? "rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 10%) 0px 0px 10px 0px"
        : "",
    }),
  });

  const pickerStyles: Partial<IBasePickerStyles> = {
    root: {
      width: "100%",
      maxHeight: 32,
      minHeight: 32,
      borderColor: props.themeVariant?.themePrimary
    },
    itemsWrapper: {
      borderColor: props.themeVariant?.themePrimary ,
    },
    text: {
      borderLeftWidth: 0,
      minHeight: 32,
      borderColor: props.themeVariant?.themePrimary,
      selectors: {
        ":focus": {
          borderColor: props.themeVariant?.themePrimary
        },
        ":hover": {
          borderColor: props.themeVariant?.themePrimary
        },
        "::after": {
          borderColor: props.themeVariant?.themePrimary,
          borderWidth: 1,
          borderLeftWidth: 0,
        },
      },
    },
  };

  const nextPageStyle: ILinkStyles = {
    root: {
      fontWeight: 600,
      fontSize: props.themeVariant?.["ms-font-mediumPlus-fontSize"],
      selectors: { ":hover": { textDecoration: "underline" } },
    },
  };
  const _appContext  = React.useRef<IAppContext>({} as IAppContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _currentUser=  React.useRef<any>();
  const _currentUserDepartment = React.useRef<string>('');


  const [state, setState] = React.useState<IStaffDirectoryState>({
    listUsers: [],
    hasError: false,
    errorMessage: "",
    isLoading: true,
    isLoadingNextPage: false,
    currentPage: 1,
    totalPages: 0,
  });

  const picker = React.useRef(null);
  _currentUser.current = props.context.pageContext.user;
  const _currentuserProperties  = React.useRef<IUserExtended[]>([]);
  const _spResults  = React.useRef<SearchResults>();




  React.useEffect(() => {
    (async () => {
      try {
        _currentUser.current = props.context.pageContext.user;
        _appContext.current.currentUser = _currentUser.current ;
        _appContext.current.themeVariant = props.themeVariant
       const _usersResults = await getUsers(
           `WorkEmail: ${_currentUser.current.email}`,      
        );
        setState({
          ...state,
          isLoading: true,
        });
        _currentuserProperties.current = await manpingUserProperties(_usersResults);
        _currentUserDepartment.current = _currentuserProperties?.current[0]?.department;
        let _searchDepartment = '';
        if (_currentUserDepartment.current){
          _searchDepartment = `Department:${_currentUserDepartment.current}`
        }else{
          _searchDepartment = '*';
        }
       _spResults.current = await getUsers(
          _searchDepartment,
          props.pageSize
        );
        const _totalPages: number = getTotalPages(_spResults.current.TotalRows,props.pageSize );
        setState({
          ...state,
          listUsers: await manpingUserProperties(_spResults.current),
          currentPage: 1,
          totalPages: _totalPages,
          
          isLoading: false,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // on Filter changed
  const _onFilterChanged = async (
    filterText: string,
    currentPersonas: IPersonaProps[],
  ): Promise<IPersonaProps[]> => {
    let filteredPersonas: IPersonaProps[] = [];

    if (filterText.trim().length > 0) {
      try {
        const _usersResults = await getUsers(`PreferredName: ${filterText}`);
        const _users = await manpingUserProperties(_usersResults);
      
        for (const _user of _users) {
          filteredPersonas.push({
            text: _user.displayName,
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
      _spResults.current = await getUsers(
        _currentUserDepartment.current ?? '*',
        props.pageSize
      );
      const _totalPages: number = getTotalPages(_spResults.current.TotalRows,props.pageSize );
      setState({
        ...state,
        listUsers: await manpingUserProperties(_spResults.current),
       totalPages: _totalPages,
       currentPage: 1
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
   const { listUsers} = state;

    setState({
      ...state,
      isLoadingNextPage: true,
    });
    try {
       const { currentPage } = state;
       console.log('page',_spResults.current);
      _spResults.current = await _spResults.current.getPage(currentPage +1 )
      const _newlistUsers = listUsers.concat(await manpingUserProperties(_spResults.current));

      setState({
        ...state,
        listUsers: _newlistUsers,
        isLoadingNextPage: false,
        currentPage: currentPage + 1 
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
      
        <WebPartTitle
          displayMode={props.displayMode}
          title={props.title}   
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
                  fontSize: props.themeVariant?.["ms-font-mediumPlus-fontSize"],
                  color: props.themeVariant?.themePrimary ,
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
              resolveDelay={300}
              disabled={state.isLoading}
              onItemSelected={async (selectedItem: IPersonaProps) => {
               _spResults.current = await getUsers(
                  `PreferredName:${selectedItem.text.trim()}`,
                  props.pageSize
                );
             
                const _totalPages: number = getTotalPages(_spResults.current.TotalRows,props.pageSize );
                setState({
                  ...state,
                  listUsers: await manpingUserProperties(_spResults.current),
                  isLoading: false,
                  totalPages: _totalPages,
                  currentPage: 1
                
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
                state.listUsers.map((user) => {
                  return (
                    <>
                      <UserCard
                        userData={user}
                        userAttributes={props.userAttributes}
                        updateUsersPresence={undefined}
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
              {state.totalPages > 1 && state.currentPage < state.totalPages && (
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

 

