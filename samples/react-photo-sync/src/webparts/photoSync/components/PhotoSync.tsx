import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './PhotoSync.module.scss';
import * as strings from 'PhotoSyncWebPartStrings';
import { HttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { AppContext, AppContextProps } from '../common/AppContext';
import { IHelper } from '../common/helper';
import ConfigPlaceholder from '../common/ConfigPlaceholder';
import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/propertyFields/peoplePicker';
import MessageContainer from '../common/MessageContainer';
import { MessageScope, IUserInfo, IAzFuncValues } from '../common/IModel';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import UserSelectionSync from './UserSelectionSync';
import BulkPhotoSync from './BulkPhotoSync';
import SyncJobs from './SyncJobs';


const map: any = require('lodash/map');

export interface IPhotoSyncProps {
    context: WebPartContext;
    httpClient: HttpClient;
    siteUrl: string;
    domainName: string;
    helper: IHelper;
    displayMode: DisplayMode;
    useFullWidth: boolean;
    appTitle: string;
    updateProperty: (value: string) => void;
    AzFuncUrl: string;
    UseCert: boolean;
    dateFormat: string;
    allowedUsers: IPropertyFieldGroupOrPerson[];
    openPropertyPane: () => void;
    enableBulkUpdate: boolean;
    tempLib: string;
    deleteThumbnails: boolean;
}

const PhotoSync: React.FunctionComponent<IPhotoSyncProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const [listExists, setListExists] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<string>('0');
    const [pivotItems, setPivotItems] = useState<any[]>([]);
    const [disablePivot, setdisablePivot] = useState<boolean>(false);
    const headerButtonProps = { 'disabled': disablePivot };

    const parentCtxValues: AppContextProps = {
        context: props.context,
        siteurl: props.siteUrl,
        domainName: props.domainName,
        helper: props.helper,
        displayMode: props.displayMode,
        openPropertyPane: props.openPropertyPane,
        tempLib: props.tempLib,
        deleteThumbnails: props.deleteThumbnails
    };
    const showConfig = !props.tempLib; //!props.templateLib || !props.AzFuncUrl || !props.tempLib ? true : false;
    const _useFullWidth = () => {
        const jQuery: any = require('jquery');
        if (props.useFullWidth) {
            jQuery("#workbenchPageContent").prop("style", "max-width: none");
            jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
            jQuery(".CanvasZone").prop("style", "max-width: none");
        } else {
            jQuery("#workbenchPageContent").prop("style", "max-width: 924px");
        }
    };
    const _checkAndCreateLists = async () => {
        setLoading(false);
        let listCheck: boolean = await props.helper.checkAndCreateLists();
        if (listCheck) setListExists(true);
    };
    const _checkForAccess = async () => {
        setLoading(true);
        let currentUserInfo: IUserInfo = await props.helper.getCurrentUserCustomInfo();
        if (currentUserInfo.IsSiteAdmin) {
            _checkAndCreateLists();
        } else {
            let allowedGroups: string[] = map(props.allowedUsers, 'login');
            let accessAllowed: boolean = props.helper.checkCurrentUserGroup(allowedGroups, currentUserInfo.Groups);
            console.log("Access allowed: ", accessAllowed);
            if (accessAllowed) {
                _checkAndCreateLists();
            } else {
                setLoading(false);
                setAccessDenied(true);
            }
        }
    };
    const _updatePivotMenus = () => {
        let pvitems: any[] = [];
        if (props.enableBulkUpdate) {
            pvitems = [
                <PivotItem headerText={strings.TabMenu2} itemKey="1" itemIcon="BulkUpload" headerButtonProps={headerButtonProps}></PivotItem>,
            ];
        }
        setPivotItems(pvitems);
    };
    const _onMenuClick = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        if (item) {
            if (item.props.itemKey == "0") {

            } else if (item.props.itemKey == "1") {

            }
            setSelectedMenu(item.props.itemKey);
        }
    };
    const _prepareJSONForAzFunc = (data: IAzFuncValues[], itemid: number, folderPath: string): string => {
        let finalJson: string = "";
        let tenantName: string = props.siteUrl.split("." + props.domainName)[0];
        if (data && data.length > 0) {
            let userPhotoObj = new Object();
            userPhotoObj['adminurl'] = `${tenantName}-admin.${props.domainName}`;
            userPhotoObj['mysiteurl'] = `${tenantName}-my.${props.domainName}`;
            userPhotoObj['targetSiteUrl'] = props.siteUrl;
            userPhotoObj['picfolder'] = folderPath + "/";
            userPhotoObj['clearPhotos'] = props.deleteThumbnails;
            userPhotoObj['usecert'] = props.UseCert ? props.UseCert : false;
            userPhotoObj['itemId'] = itemid;
            userPhotoObj['value'] = data;
            finalJson = JSON.stringify(userPhotoObj);
        }
        return finalJson;
    };
    const _updateSPWithPhoto = async (data: IAzFuncValues[], itemid: number) => {
        setdisablePivot(true);
        let tempFolderPath: string = await props.helper.getLibraryDetails(props.tempLib);
        let finalJson: string = _prepareJSONForAzFunc(data, itemid, tempFolderPath);
        await props.helper.updateSyncItem(itemid, finalJson);
        props.helper.runAzFunction(props.httpClient, finalJson, props.AzFuncUrl, itemid);
        setdisablePivot(false);
    };

    useEffect(() => {
        _useFullWidth();
    }, [props.useFullWidth]);

    useEffect(() => {
        _checkForAccess();
    }, [props.allowedUsers]);

    useEffect(() => {
        _updatePivotMenus();
    }, [props.enableBulkUpdate]);

    return (
        <AppContext.Provider value={parentCtxValues}>
            <div className={styles.photoSync}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <WebPartTitle displayMode={props.displayMode} title={props.appTitle ? props.appTitle : strings.DefaultAppTitle} updateProperty={props.updateProperty} />
                            {showConfig ? (
                                <ConfigPlaceholder />
                            ) : (
                                    <>
                                        {loading ? (
                                            <ProgressIndicator label={strings.AccessCheckDesc} description={strings.PropsLoader} />
                                        ) : (
                                                <>
                                                    {accessDenied ? (
                                                        <MessageContainer MessageScope={MessageScope.SevereWarning} Message={strings.AccessDenied} />
                                                    ) : (
                                                            <>
                                                                {!listExists ? (
                                                                    <ProgressIndicator label={strings.ListCreationText} description={strings.PropsLoader} />
                                                                ) : (
                                                                        <>
                                                                            <div>
                                                                                <Pivot defaultSelectedKey="0" selectedKey={selectedMenu} onLinkClick={_onMenuClick} className={styles.periodmenu}>
                                                                                    <PivotItem headerText={strings.TabMenu1} itemKey="0" itemIcon="SchoolDataSyncLogo" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                    {pivotItems}
                                                                                    <PivotItem headerText={strings.TabMenu3} itemKey="2" itemIcon="SyncStatus" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                </Pivot>
                                                                            </div>
                                                                            {/* Individual Selection photo sync */}
                                                                            {selectedMenu == "0" &&
                                                                                <div>
                                                                                    <UserSelectionSync updateSPWithPhoto={_updateSPWithPhoto} />
                                                                                </div>
                                                                            }
                                                                            {/* Bulk photo sync */}
                                                                            {selectedMenu == "1" &&
                                                                                <BulkPhotoSync updateSPWithPhoto={_updateSPWithPhoto} />
                                                                            }
                                                                            {/* Overall status of the sync jobs */}
                                                                            {selectedMenu == "2" &&
                                                                                <SyncJobs dateFormat={props.dateFormat} />
                                                                            }
                                                                        </>
                                                                    )}
                                                            </>
                                                        )}
                                                </>
                                            )}
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default PhotoSync;
