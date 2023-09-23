import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from "./Directory.module.scss";
import { PersonaCard } from "./PersonaCard/PersonaCard";
import { spservices } from "../../../SPServices/spservices";
import { IDirectoryState } from "./IDirectoryState";
import * as strings from "DirectoryWebPartStrings";
import {
  Spinner, SpinnerSize, MessageBar, MessageBarType, SearchBox, Icon, Label,
  Pivot, PivotItem, PivotLinkFormat, PivotLinkSize, Dropdown, IDropdownOption
} from "office-ui-fabric-react";
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { debounce } from "throttle-debounce";
import { WebPartTitle } from "@pnp/spfx-controls-react";
import { ISPServices } from "../../../SPServices/ISPServices";


import { IDirectoryProps } from './IDirectoryProps';
import Paging from './Pagination/Paging';


const wrapStackTokens: IStackTokens = { childrenGap: 30 };

const DirectoryHook: React.FC<IDirectoryProps> = (props) => {
  const _services: ISPServices = new spservices(props.context);
  const [az, setaz] = useState<string[]>([]);
  const [alphaKey, setalphaKey] = useState<string>('A');
  const [state, setstate] = useState<IDirectoryState>({
    users: [],
    isLoading: true,
    errorMessage: "",
    hasError: false,
    indexSelectedKey: "A",
    searchString: "LastName",
    searchText: ""
  });
  const orderOptions: IDropdownOption[] = [
    { key: "FirstName", text: "First Name" },
    { key: "LastName", text: "Last Name" },
    { key: "Department", text: "Department" },
    { key: "Location", text: "Location" },
    { key: "JobTitle", text: "Job Title" }
  ];
  const color = props.context.microsoftTeams ? "white" : "";
  // Paging
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pagedItems, setPagedItems] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(props.pageSize ? props.pageSize : 10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const _onPageUpdate = async (pageno?: number):Promise<void> => {
    const currentPge = (pageno) ? pageno : currentPage;
    const startItem = ((currentPge - 1) * pageSize);
    const endItem = currentPge * pageSize;
    const filItems = state.users.slice(startItem, endItem);
    setCurrentPage(currentPge);
    setPagedItems(filItems);
  };

  const diretoryGrid =
    pagedItems && pagedItems.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? pagedItems.map((user: any, i) => {
        return (
          <PersonaCard
            context={props.context}
            key={"PersonaCard" + i}
            profileProperties={{
              DisplayName: user.PreferredName,
              Title: user.JobTitle,
              PictureUrl: user.PictureURL,
              Email: user.WorkEmail,
              Department: user.Department,
              WorkPhone: user.WorkPhone,
              Location: user.OfficeNumber
                ? user.OfficeNumber
                : user.BaseOfficeLocation
            }}
          />
        );
      })
      : [];
  const _loadAlphabets = ():void => {
    const alphabets: string[] = [];
    for (let i = 65; i < 91; i++) {
      alphabets.push(
        String.fromCharCode(i)
      );
    }
    setaz(alphabets);
  };

  const _alphabetChange = async (item?: PivotItem):Promise<void> => {
    setstate({ ...state, searchText: "", indexSelectedKey: item.props.itemKey, isLoading: true });
    setalphaKey(item.props.itemKey);
    setCurrentPage(1);
  };
  const _searchByAlphabets = async (initialSearch: boolean):Promise<void> => {
    setstate({ ...state, isLoading: true, searchText: '' });
    let users = null;
    if (initialSearch) {
      if (props.searchFirstName)
        users = await _services.searchUsersNew('', `FirstName:a*`, false);
      else users = await _services.searchUsersNew('a', '', true);
    } else {
      if (props.searchFirstName)
        users = await _services.searchUsersNew('', `FirstName:${alphaKey}*`, false);
      else users = await _services.searchUsersNew(`${alphaKey}`, '', true);
    }
    setstate({
      ...state,
      searchText: '',
      indexSelectedKey: initialSearch ? 'A' : state.indexSelectedKey,
      users:
        users && users.PrimarySearchResults
          ? users.PrimarySearchResults
          : null,
      isLoading: false,
      errorMessage: "",
      hasError: false
    });
  };

  const _searchUsers = async (searchText: string):Promise<void> => {
    try {
      setstate({ ...state, searchText: searchText, isLoading: true });
      if (searchText.length > 0) {
        const searchProps: string[] = props.searchProps && props.searchProps.length > 0 ?
          props.searchProps.split(',') : ['FirstName', 'LastName', 'WorkEmail', 'Department'];
        let qryText = '';
        const finalSearchText: string = searchText ? searchText.replace(/ /g, '+') : searchText;
        if (props.clearTextSearchProps) {
          const tmpCTProps: string[] = props.clearTextSearchProps.indexOf(',') >= 0 ? props.clearTextSearchProps.split(',') : [props.clearTextSearchProps];
          if (tmpCTProps.length > 0) {
            searchProps.map((srchprop, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const ctPresent: any[] = tmpCTProps.filter( (o) => { return o.toLowerCase() === srchprop.toLowerCase(); });
              if (ctPresent.length > 0) {
                if (index === searchProps.length - 1) {
                  qryText += `${srchprop}:${searchText}*`;
                } else qryText += `${srchprop}:${searchText}* OR `;
              } else {
                if (index === searchProps.length - 1) {
                  qryText += `${srchprop}:${finalSearchText}*`;
                } else qryText += `${srchprop}:${finalSearchText}* OR `;
              }
            });
          } else {
            searchProps.map((srchprop, index) => {
              if (index === searchProps.length - 1)
                qryText += `${srchprop}:${finalSearchText}*`;
              else qryText += `${srchprop}:${finalSearchText}* OR `;
            });
          }
        } else {
          searchProps.map((srchprop, index) => {
            if (index === searchProps.length - 1)
              qryText += `${srchprop}:${finalSearchText}*`;
            else qryText += `${srchprop}:${finalSearchText}* OR `;
          });
        }
        console.log(qryText);
        const users = await _services.searchUsersNew('', qryText, false);
        setstate({
          ...state,
          searchText: searchText,
          indexSelectedKey: '0',
          users:
            users && users.PrimarySearchResults
              ? users.PrimarySearchResults
              : null,
          isLoading: false,
          errorMessage: "",
          hasError: false
        });
        setalphaKey('0');
      } else {
        setstate({ ...state, searchText: '' });
        await _searchByAlphabets(true);
      }
    } catch (err) {
      setstate({ ...state, errorMessage: err.message, hasError: true });
    }
  };
  const _debouncesearchUsers = debounce(500, _searchUsers);

  const _searchBoxChanged = (newvalue: string): void => {
    setCurrentPage(1);
    _debouncesearchUsers(newvalue);
  };


  const _sortPeople = async (sortField: string):Promise<void> => {
    let _users = [...state.users];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _users = _users.sort((a: any, b: any) => {


      switch (sortField) {

        // Sort by Location
        case "Location":
            if ((a.BaseOfficeLocation||"").toUpperCase() < (b.BaseOfficeLocation||"").toUpperCase()) {
              return -1;
            }
            if ((a.BaseOfficeLocation||"").toUpperCase() > (b.BaseOfficeLocation||"").toUpperCase()) {
              return 1;
            }
            return 0;

            break;
          break;

        default:
          if ((a[sortField]||"").toUpperCase() < (b[sortField]||"").toUpperCase()) {
            return -1;
          }
          if ((a[sortField]||"").toUpperCase() > (b[sortField]||"").toUpperCase()) {
            return 1;
          }
          return 0;

          break;
      }
    });
    setstate({ ...state, users: _users, searchString: sortField });
  };

  useEffect(() => {
    setPageSize(props.pageSize);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (state.users) {  _onPageUpdate()}
  }, [state.users, props.pageSize]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (alphaKey.length > 0 && alphaKey !== "0") _searchByAlphabets(false);
  }, [alphaKey]);

  useEffect(() => {
    _loadAlphabets();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _searchByAlphabets(true);
  }, [props]);

  return (
    <div className={styles.directory}>
      <WebPartTitle displayMode={props.displayMode} title={props.title}
        updateProperty={props.updateProperty} />
      <div className={styles.searchBox}>
        <SearchBox placeholder={strings.SearchPlaceHolder} className={styles.searchTextBox}
          onSearch={_searchUsers}
          value={state.searchText}
          onChange={(ev,newVal) =>_searchBoxChanged(newVal)} />
        <div>
          <Pivot className={styles.alphabets} linkFormat={PivotLinkFormat.tabs}
            selectedKey={state.indexSelectedKey} onLinkClick={_alphabetChange}
            linkSize={PivotLinkSize.normal} >
            {az.map((index: string) => {
              return (
                <PivotItem headerText={index} itemKey={index} key={index} />
              );
            })}
          </Pivot>
        </div>
      </div>
      {state.isLoading ? (
        <div style={{ marginTop: '10px' }}>
          <Spinner size={SpinnerSize.large} label={strings.LoadingText} />
        </div>
      ) : (
        <>
          {state.hasError ? (
            <div style={{ marginTop: '10px' }}>
              <MessageBar messageBarType={MessageBarType.error}>
                {state.errorMessage}
              </MessageBar>
            </div>
          ) : (
            <>
              {!pagedItems || pagedItems.length === 0 ? (
                <div className={styles.noUsers}>
                  <Icon
                    iconName={"ProfileSearch"}
                    style={{ fontSize: "54px", color: color }}
                  />
                  <Label>
                    <span style={{ marginLeft: 5, fontSize: "26px", color: color }}>
                      {strings.DirectoryMessage}
                    </span>
                  </Label>
                </div>
              ) : (
                <>
                  <div style={{ width: '100%', display: 'inline-block' }}>
                    <Paging
                      totalItems={state.users.length}
                      itemsCountPerPage={pageSize}
                      onPageUpdate={_onPageUpdate}
                      currentPage={currentPage} />
                  </div>
                  <div className={styles.dropDownSortBy}>
                    <Stack horizontal horizontalAlign="center" wrap tokens={wrapStackTokens}>
                      <Dropdown
                        placeholder={strings.DropDownPlaceHolderMessage}
                        label={strings.DropDownPlaceLabelMessage}
                        options={orderOptions}
                        selectedKey={state.searchString}
                        onChange={(ev, value) => {
                          // eslint-disable-next-line @typescript-eslint/no-floating-promises
                          _sortPeople(value.key.toString());
                        }}
                        styles={{ dropdown: { width: 200 } }}
                      />
                    </Stack>
                  </div>
                  <Stack horizontal horizontalAlign={props.useSpaceBetween ? "space-between" : "center"} wrap tokens={wrapStackTokens}>
                    {diretoryGrid}
                  </Stack>
                  <div style={{ width: '100%', display: 'inline-block' }}>
                    <Paging
                      totalItems={state.users.length}
                      itemsCountPerPage={pageSize}
                      onPageUpdate={_onPageUpdate}
                      currentPage={currentPage} />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DirectoryHook;
