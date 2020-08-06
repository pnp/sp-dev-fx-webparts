import * as React from "react";
import { Filters} from '../../../../Entities/EnumFilters';
import "./paginationOverride.module.scss";
import { IMySitesProps } from "./IMySitesProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  mergeStyleSets,
  Customizer,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  SearchBox,
  CommandButton,
  Stack,
  IContextualMenuProps,
  IIconProps,
  IContextualMenuItem,
  FontIcon,
  Label,
} from "office-ui-fabric-react";
import { WebPartTitle } from "@pnp/spfx-controls-react";
import { useUserSites } from "../../../../Hooks/useUserSites";
import { IMySitesState } from "./IMySitesState";
import { SiteTile } from "../SiteTile/SiteTile";
import { SearchResults } from "@pnp/sp/search";
import { toInteger } from "lodash";
import Pagination from "@material-ui/lab/Pagination";
import strings from "MySitesWebPartStrings";
import _ from "lodash";
import { MSGraphClient } from "@microsoft/sp-http";

let _searchResults: SearchResults = null;
let _msGraphClient:MSGraphClient = undefined;

export const MySites: React.FunctionComponent<IMySitesProps> = (
  props: IMySitesProps
) => {
  // Global Compoment Styles
  const stylesComponent = mergeStyleSets({
    containerTiles: {
      marginTop: 25,
      display: "grid",
      marginBottom: 10,
      gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
      gridTemplateRows: "auto",
    },
    webPartTile: {
      fontWeight: 500,
      marginBottom: 20
    },
  });
  // Document Card Styles


  // state
  const [state, setState] = React.useState<IMySitesState>({
    errorMessage: "",
    isLoading: true,
    sites: [],
    hasError: false,
    title: props.title,
    currentPage: 1,
    totalPages: 50,
    searchValue: "",
    currentFilter: Filters.All,
  });

  const filterIcon: IIconProps = { iconName: "Filter" };

  // Get Hook functions
  const { getUserSites } = useUserSites();

  // get User Sites
  const _getUserSites = async (
    searchString?: string,
    currentFilter?:  Filters
  ) => {
    try {
      console.log('tiles var', props.themeVariant);
      setState({ ...state, isLoading: true });
      const { itemsPerPage } = props;
      const searchResults = await getUserSites(searchString, itemsPerPage, currentFilter);
      _searchResults = searchResults;
      let _totalPages: number = searchResults.TotalRows / itemsPerPage;
      const _modulus: number = searchResults.TotalRows % itemsPerPage;
      _totalPages =
        _modulus > 0 ? toInteger(_totalPages) + 1 : toInteger(_totalPages);
      setState({
        searchValue: "",
        currentPage: 1,
        totalPages: _totalPages,
        title: props.title,
        isLoading: false,
        hasError: false,
        errorMessage: "",
        sites: _searchResults.PrimarySearchResults,
        currentFilter: currentFilter
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        hasError: true,
        isLoading: false,
        errorMessage: error.message,
      });
    }
  };

  const _Filtersites = async (filter: string) => {
    setState({ ...state, isLoading: true });
    let _filteredSites: any[] = [];

    switch (filter) {
      case "All":
        setState({...state,currentFilter: Filters.All});
        await  _getUserSites('', Filters.All);
        break;
      case "Groups":
        setState({...state,currentFilter: Filters.Group});
        await  _getUserSites('', Filters.Group);
        break;
      case "OneDrive":
        setState({...state,currentFilter: Filters.OneDrive});
        await  _getUserSites('', Filters.OneDrive);
        break;
      case "SharePoint":
        setState({...state,currentFilter: Filters.SharePoint});
        await  _getUserSites('', Filters.SharePoint);
        break;
      default:
        setState({ ...state, isLoading: false });
        break;
    }
  };

  const filterMenuProps: IContextualMenuProps = {
    items: [
      {
        key: "0",
        text: "All",
        iconProps: { iconName: "ThumbnailView" },
        onClick: (
          ev:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>,
          item: IContextualMenuItem
        ) => {
          _Filtersites(item.text);
        },
      },
      {
        key: "1",
        text: "SharePoint",
        iconProps: { iconName: "SharepointAppIcon16" },
        onClick: (
          ev:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>,
          item: IContextualMenuItem
        ) => {
          _Filtersites(item.text);
        },
      },
      {
        key: "2",
        text: "Groups",
        iconProps: { iconName: "Group" },
        onClick: (
          ev:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>,
          item: IContextualMenuItem
        ) => {
          _Filtersites(item.text);
        },
      },
      {
        key: "3",
        text: "OneDrive",
        iconProps: { iconName: "onedrive" },
        onClick: (
          ev:
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLElement>,
          item: IContextualMenuItem
        ) => {
          _Filtersites(item.text);
        },
      },
    ],
  };
  // useEffect component did mount or modified
  React.useEffect(() => {
    (async () => {
      _msGraphClient = await props.context.msGraphClientFactory.getClient();
      await _getUserSites("",state.currentFilter);
    })();
  }, [props.title, props.itemsPerPage]);

  // On Search Sites
  const _onSearch = async (value: string) => {
    await _getUserSites(value,state.currentFilter);
  };

  // On Search Sites
  const _onClear = async (ev: any) => {
    await _getUserSites("",state.currentFilter);
  };


// Render component
  if (state.hasError) { // render message error
    return (
      <MessageBar messageBarType={MessageBarType.error}>
        {state.errorMessage}
      </MessageBar>
    );
  }

  // Render list of tiles
  return (
    <>
      <Customizer settings={{ theme: props.themeVariant }}>
        <WebPartTitle
          displayMode={props.displayMode}
          title={state.title}
          themeVariant={props.themeVariant}
          updateProperty={props.updateProperty}
          className={stylesComponent.webPartTile}

        />
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
          <SearchBox
            placeholder="Search my sites"
            underlined={true}
            value={state.searchValue}
            onSearch={_onSearch}
            onClear={_onClear}
          />
          <CommandButton
            iconProps={{ iconName: "refresh" }}
            onClick={_onClear}
            title={strings.RefreshLabel}
          />
          <CommandButton
            iconProps={filterIcon}
            text={Filters[state.currentFilter]}
            menuProps={filterMenuProps}
            disabled={false}
            checked={true}
          />
        </Stack>
        {state.isLoading ? (
          <Spinner
            size={SpinnerSize.medium}
            label={strings.LoadingLabel}
          ></Spinner>
        ) : (
          <>
           { // has sites ?

             state.sites.length > 0 ?
             <div className={stylesComponent.containerTiles}>
             {state.sites.map((site:any, i: number) => {
               return (
                 <SiteTile
                   site={site}
                   msGraphClient={_msGraphClient}
                   themeVariant={props.themeVariant}
                 ></SiteTile>
               );
             })}
           </div>
           :
           <>
           <Stack horizontal verticalAlign="center" horizontalAlign="center" tokens={{childrenGap: 20}} styles={{root: {marginTop: 50}}}>
             <FontIcon iconName="Tiles" style={{fontSize: 48}}></FontIcon>
             <Label styles={{root:{fontSize: 26}}}>No Sites Found </Label>
           </Stack>
           </>

          }

            {state.totalPages > 1 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                >
                  <Pagination
                    color="primary"
                    count={state.totalPages}
                    page={state.currentPage}
                    onChange={async (event:any, page:number) => {
                      const rs = await _searchResults.getPage(page);
                      _searchResults = rs;
                      setState({
                        ...state,
                        currentPage: page,
                        sites: _searchResults.PrimarySearchResults,
                      });
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Customizer>
    </>
  );
};
