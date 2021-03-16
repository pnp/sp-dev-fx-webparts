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
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { debounce } from "throttle-debounce";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ISPServices } from "../../../SPServices/ISPServices";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { spMockServices } from "../../../SPServices/spMockServices";
import { IDirectoryProps } from './IDirectoryProps';
import Paging from './Pagination/Paging';

const slice: any = require('lodash/slice');
const filter: any = require('lodash/filter');
const wrapStackTokens: IStackTokens = { childrenGap: 30 };

const DirectoryHook: React.FC<IDirectoryProps> = (props) => {
    let _services: ISPServices = null;
    if (Environment.type === EnvironmentType.Local) {
        _services = new spMockServices();
    } else {
        _services = new spservices(props.context);
    }
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
    const [pagedItems, setPagedItems] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(props.pageSize ? props.pageSize : 10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const _onPageUpdate = async (pageno?: number) => {
        var currentPge = (pageno) ? pageno : currentPage;
        var startItem = ((currentPge - 1) * pageSize);
        var endItem = currentPge * pageSize;
        let filItems = slice(state.users, startItem, endItem);
        setCurrentPage(currentPge);
        setPagedItems(filItems);
    };

    const diretoryGrid =
        pagedItems && pagedItems.length > 0
            ? pagedItems.map((user: any) => {
                return (
                    <PersonaCard
                        context={props.context}
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
    const _loadAlphabets = () => {
        let alphabets: string[] = [];
        for (let i = 65; i < 91; i++) {
            alphabets.push(
                String.fromCharCode(i)
            );
        }
        setaz(alphabets);
    };

    const _alphabetChange = async (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setstate({ ...state, searchText: "", indexSelectedKey: item.props.itemKey, isLoading: true });
        setalphaKey(item.props.itemKey);
        setCurrentPage(1);
    };
    const _searchByAlphabets = async (initialSearch: boolean) => {
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

    let _searchUsers = async (searchText: string) => {
        try {
            setstate({ ...state, searchText: searchText, isLoading: true });
            if (searchText.length > 0) {
                let searchProps: string[] = props.searchProps && props.searchProps.length > 0 ?
                    props.searchProps.split(',') : ['FirstName', 'LastName', 'WorkEmail', 'Department'];
                let qryText: string = '';
                let finalSearchText: string = searchText ? searchText.replace(/ /g, '+') : searchText;
                if (props.clearTextSearchProps) {
                    let tmpCTProps: string[] = props.clearTextSearchProps.indexOf(',') >= 0 ? props.clearTextSearchProps.split(',') : [props.clearTextSearchProps];
                    if (tmpCTProps.length > 0) {
                        searchProps.map((srchprop, index) => {
                            let ctPresent: any[] = filter(tmpCTProps, (o) => { return o.toLowerCase() == srchprop.toLowerCase(); });
                            if (ctPresent.length > 0) {
                                if(index == searchProps.length - 1) {
                                    qryText += `${srchprop}:${searchText}*`;
                                } else qryText += `${srchprop}:${searchText}* OR `;
                            } else {
                                if(index == searchProps.length - 1) {
                                    qryText += `${srchprop}:${finalSearchText}*`;
                                } else qryText += `${srchprop}:${finalSearchText}* OR `;                                
                            }
                        });
                    } else {
                        searchProps.map((srchprop, index) => {
                            if (index == searchProps.length - 1)
                                qryText += `${srchprop}:${finalSearchText}*`;
                            else qryText += `${srchprop}:${finalSearchText}* OR `;
                        });
                    }
                } else {
                    searchProps.map((srchprop, index) => {
                        if (index == searchProps.length - 1)
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
                _searchByAlphabets(true);
            }
        } catch (err) {
            setstate({ ...state, errorMessage: err.message, hasError: true });
        }
    };

    const _searchBoxChanged = (newvalue: string): void => {
        setCurrentPage(1);
        _searchUsers(newvalue);
    };
    _searchUsers = debounce(500, _searchUsers);

    const _sortPeople = async (sortField: string) => {
        let _users = [...state.users];
        _users = _users.sort((a: any, b: any) => {
            switch (sortField) {
                // Sorte by FirstName
                case "FirstName":
                    const aFirstName = a.FirstName ? a.FirstName : "";
                    const bFirstName = b.FirstName ? b.FirstName : "";
                    if (aFirstName.toUpperCase() < bFirstName.toUpperCase()) {
                        return -1;
                    }
                    if (aFirstName.toUpperCase() > bFirstName.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                    break;
                // Sort by LastName
                case "LastName":
                    const aLastName = a.LastName ? a.LastName : "";
                    const bLastName = b.LastName ? b.LastName : "";
                    if (aLastName.toUpperCase() < bLastName.toUpperCase()) {
                        return -1;
                    }
                    if (aLastName.toUpperCase() > bLastName.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                    break;
                // Sort by Location
                case "Location":
                    const aBaseOfficeLocation = a.BaseOfficeLocation
                        ? a.BaseOfficeLocation
                        : "";
                    const bBaseOfficeLocation = b.BaseOfficeLocation
                        ? b.BaseOfficeLocation
                        : "";
                    if (
                        aBaseOfficeLocation.toUpperCase() <
                        bBaseOfficeLocation.toUpperCase()
                    ) {
                        return -1;
                    }
                    if (
                        aBaseOfficeLocation.toUpperCase() >
                        bBaseOfficeLocation.toUpperCase()
                    ) {
                        return 1;
                    }
                    return 0;
                    break;
                // Sort by JobTitle
                case "JobTitle":
                    const aJobTitle = a.JobTitle ? a.JobTitle : "";
                    const bJobTitle = b.JobTitle ? b.JobTitle : "";
                    if (aJobTitle.toUpperCase() < bJobTitle.toUpperCase()) {
                        return -1;
                    }
                    if (aJobTitle.toUpperCase() > bJobTitle.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                    break;
                // Sort by Department
                case "Department":
                    const aDepartment = a.Department ? a.Department : "";
                    const bDepartment = b.Department ? b.Department : "";
                    if (aDepartment.toUpperCase() < bDepartment.toUpperCase()) {
                        return -1;
                    }
                    if (aDepartment.toUpperCase() > bDepartment.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                    break;
                default:
                    break;
            }
        });
        setstate({ ...state, users: _users, searchString: sortField });
    };

    useEffect(() => {
        setPageSize(props.pageSize);
        if (state.users) _onPageUpdate();
    }, [state.users, props.pageSize]);

    useEffect(() => {
        if (alphaKey.length > 0 && alphaKey != "0") _searchByAlphabets(false);
    }, [alphaKey]);

    useEffect(() => {
        _loadAlphabets();
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
                    onChange={_searchBoxChanged} />
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
                                    {!pagedItems || pagedItems.length == 0 ? (
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
                                                            onChange={(ev: any, value: IDropdownOption) => {
                                                                _sortPeople(value.key.toString());
                                                            }}
                                                            styles={{ dropdown: { width: 200 } }}
                                                        />
                                                    </Stack>
                                                </div>
                                                <Stack horizontal horizontalAlign="center" wrap tokens={wrapStackTokens}>
                                                    <div>{diretoryGrid}</div>
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