import * as React from 'react';
import styles from './SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { FileTypeIcon, IconType } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { css, ProgressIndicator } from 'office-ui-fabric-react/lib';
import { IPropertyMappings, FileContentType, MessageScope, SyncType } from '../../../Common/IModel';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import SPHelper from '../../../Common/SPHelper';
import PropertyMappingList from './PropertyMapping/PropertyMappingList';
import UPPropertyData from './UPPropertyData';
import ManualPropertyUpdate from './ManualPropertyUpdate';
import AzurePropertyView from './AzurePropertyView';
import SyncJobsView from './SyncJobs/SyncJobs';
import TemplatesView from './TemplatesList/TemplatesView';
import BulkSyncList from './BulkSyncFiles/BulkSyncList';
import * as moment from 'moment/moment';
import MessageContainer from './MessageContainer';


const map: any = require('lodash/map');

export interface ISpupsProperySyncProps {
    context: WebPartContext;
    templateLib: string;
    displayMode: DisplayMode;
    appTitle: string;
    AzFuncUrl: string;
    UseCert: boolean;
    dateFormat: string;
    allowedUsers: IPropertyFieldGroupOrPerson[];
    useFullWidth: boolean;
    openPropertyPane: () => void;
    updateProperty: (value: string) => void;
}

export interface ISpupsProperySyncState {
    listExists: boolean;
    isSiteAdmin: boolean;
    loading: boolean;
    accessDenied: boolean;
    propertyMappings: IPropertyMappings[];
    uploadedTemplate?: IFilePickerResult;
    uploadedFileURL?: string;
    showUploadData: boolean;
    showUploadProgress: boolean;
    showPropsLoader: boolean;
    updatePropsLoader_Manual: boolean;
    updatePropsLoader_Azure: boolean;
    updatePropsLoader_Bulk: boolean;
    clearData: boolean;
    disablePropsButtons: boolean;
    uploadedData?: any;
    isCSV: boolean;
    selectedUsers?: any[];
    manualPropertyData: any[];
    azurePropertyData: any[];
    reloadGetProperties: boolean;
    helper: SPHelper;
    selectedMenu?: string;
    globalMessage: string;
    noActivePropertyMappings: boolean;
}

export default class SpupsProperySync extends React.Component<ISpupsProperySyncProps, ISpupsProperySyncState> {
    // Private variables
    private helper: SPHelper = null;
    /**
     * Constructor
     * @param props 
     */
    constructor(props: ISpupsProperySyncProps) {
        super(props);
        this.state = {
            listExists: false,
            isSiteAdmin: false,
            loading: true,
            accessDenied: false,
            propertyMappings: [],
            showUploadData: false,
            showUploadProgress: false,
            showPropsLoader: false,
            updatePropsLoader_Manual: false,
            updatePropsLoader_Azure: false,
            updatePropsLoader_Bulk: false,
            clearData: false,
            disablePropsButtons: false,
            isCSV: false,
            selectedUsers: [],
            manualPropertyData: [],
            azurePropertyData: [],
            reloadGetProperties: false,
            helper: null,
            selectedMenu: '0',
            globalMessage: '',
            noActivePropertyMappings: true
        };
    }
    /**
     * Component mount
     */
    public componentDidMount = async () => {
        this._useFullWidth();
        this.initializeHelper();
        let currentUserInfo = await this.helper.getCurrentUserInfo();
        if (currentUserInfo.IsSiteAdmin) {
            this.setState({ isSiteAdmin: true });
            this._checkAndCreateLists();
        } else {
            let allowedGroups: string[] = map(this.props.allowedUsers, 'login');
            let accessAllowed: boolean = this.helper.checkCurrentUserGroup(allowedGroups, currentUserInfo.Groups);
            console.log(accessAllowed);
            if (accessAllowed) {
                this._checkAndCreateLists();
            } else {
                this.setState({ loading: false, accessDenied: true });
            }
        }
    }
    /**
     * Component update
     */
    public componentDidUpdate = (prevProps: ISpupsProperySyncProps) => {
        if (prevProps.templateLib !== this.props.templateLib) this.initializeHelper();
        //if (prevProps.appTitle !== this.props.appTitle || prevProps.dateFormat !== this.props.dateFormat || this.props.allowedUsers) this.render();
        if (prevProps.useFullWidth !== this.props.useFullWidth) this._useFullWidth();
    }
    /**
     * Check and create the required list
     */
    public _checkAndCreateLists = async () => {
        this.setState({ loading: false });
        let listExists = await this.helper.checkAndCreateLists();
        if (listExists) {
            let propertyMappings: IPropertyMappings[] = await this.helper.getPropertyMappings();
            let globalMessage: string = "";
            let noActivePropertyMappings: boolean = true;
            if (propertyMappings.length <= 0) {
                globalMessage = strings.EmptyPropertyMappings;
                noActivePropertyMappings = true;
            } else {
                globalMessage = "";
                noActivePropertyMappings = false;
            }
            propertyMappings.map(prop => { prop.IsIncluded = true; });
            this.setState({ listExists, propertyMappings, globalMessage, noActivePropertyMappings, disablePropsButtons: noActivePropertyMappings });
        }
    }
    /**
     * Initialize the helper with required arguments.
     */
    private initializeHelper = () => {
        this.helper = new SPHelper(this.props.context.pageContext.legacyPageContext.siteAbsoluteUrl,
            this.props.context.pageContext.legacyPageContext.tenantDisplayName,
            this.props.context.pageContext.legacyPageContext.webDomain,
            this.props.context.pageContext.web.serverRelativeUrl,
            this.props.templateLib
        );
        this.setState({ helper: this.helper });
    }
    /**
     * Use full width
     */
    private _useFullWidth = () => {
        if (this.props.useFullWidth) {
            const jQuery: any = require('jquery');
            jQuery("#workbenchPageContent").prop("style", "max-width: none");
            jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
            jQuery(".CanvasZone").prop("style", "max-width: none");
        }
    }
    /**
     * Triggers when the users are selected for manual update
     */
    private _getPeoplePickerItems = (items: any[]) => {
        let reloadGetProperties: boolean = false;
        if (this.state.selectedUsers.length > items.length) {
            if (this.state.manualPropertyData.length > 0 || this.state.azurePropertyData.length > 0) {
                reloadGetProperties = true;
            }
        }
        this.setState({ selectedUsers: items, reloadGetProperties, clearData: false }, () => {
            if (this.state.selectedUsers.length <= 0) {
                this.state.manualPropertyData.length > 0 ? this._getManualPropertyTable() : this._getAzurePropertyTable();
            }
        });
    }
    /**
     * Set the defaultusers property for people picker control, this is used when clearing the data.
     */
    private _getSelectedUsersLoginNames = (items: any[]): string[] => {
        let retUsers: string[] = [];
        retUsers = map(items, (o) => { return o.loginName.split('|')[2]; });
        return retUsers;
    }
    /**
     * Display the inline editing table to edit the properties for manual update
     */
    private _getManualPropertyTable = () => {
        this.setState({ disablePropsButtons: true, showPropsLoader: true });
        const { propertyMappings, selectedUsers } = this.state;
        let includedProperties: IPropertyMappings[] = propertyMappings.filter((o) => { return o.IsIncluded; });
        let manualPropertyData: any[] = [];
        if (selectedUsers && selectedUsers.length > 0) {
            selectedUsers.map(user => {
                let userObj = new Object();
                userObj['UserID'] = user.loginName;
                userObj['DisplayName'] = user.text;
                userObj['ImageUrl'] = user.imageUrl;
                includedProperties.map((propsMap: IPropertyMappings) => {
                    userObj[propsMap.SPProperty] = "";
                });
                manualPropertyData.push(userObj);
            });
            this.setState({ manualPropertyData, azurePropertyData: [], showPropsLoader: false, disablePropsButtons: false });
        } else {
            this.setState({ disablePropsButtons: false, showPropsLoader: false, manualPropertyData: [] });
        }
    }
    /**
     * Get the property values from Azure
     */
    private _getAzurePropertyTable = async () => {
        this.setState({ disablePropsButtons: true, showPropsLoader: true });
        const { propertyMappings, selectedUsers } = this.state;
        let includedProperties: IPropertyMappings[] = propertyMappings.filter((o) => { return o.IsIncluded; });
        let selectFields: string = "id, userPrincipalName, displayName, " + map(includedProperties, 'AzProperty').join(',');
        let tempQuery: string[] = []; let filterQuery: string = ``;
        if (selectedUsers && selectedUsers.length > 0) {
            selectedUsers.map(user => {
                tempQuery.push(`userPrincipalName eq '${user.loginName.split('|')[2]}'`);
            });
            filterQuery = tempQuery.join(' or ');
            let azurePropertyData = await this.helper.getAzurePropertyForUsers(selectFields, filterQuery);
            this.setState({ azurePropertyData, manualPropertyData: [], showPropsLoader: false, disablePropsButtons: false });
        } else {
            this.setState({ disablePropsButtons: false, showPropsLoader: false, azurePropertyData: [] });
        }
    }
    /**
     * On selecting the data file for update
     */
    private _onSaveTemplate = (uploadedTemplate: IFilePickerResult) => {
        this.setState({ uploadedTemplate, showUploadData: true, clearData: false });
    }
    /**
     * On changing the data file for update
     */
    private _onChangeTemplate = (uploadedTemplate: IFilePickerResult) => {
        this.setState({ uploadedTemplate, showUploadData: true, clearData: false });
    }
    /**
     * Uploading data file and displaying the contents of the file
     */
    private _uploadDataToSync = async () => {
        this.setState({ showUploadProgress: true });
        const { uploadedTemplate } = this.state;
        let filecontent: any = null;
        if (uploadedTemplate && uploadedTemplate.fileName) {
            let ext: string = uploadedTemplate.fileName.split('.').pop();
            let filename: string = `${uploadedTemplate.fileNameWithoutExtension}_${moment().format("MMDDYYYYHHmmss")}.${ext}`;
            if (uploadedTemplate.fileAbsoluteUrl && null !== uploadedTemplate.fileAbsoluteUrl) {
                let filerelativeurl: string = "";
                if (uploadedTemplate.fileAbsoluteUrl.indexOf(this.props.context.pageContext.legacyPageContext.webAbsoluteUrl) >= 0) {
                    filerelativeurl = uploadedTemplate.fileAbsoluteUrl.replace(this.props.context.pageContext.legacyPageContext.webAbsoluteUrl,
                        this.props.context.pageContext.legacyPageContext.webServerRelativeUrl);
                }
                filecontent = await this.helper.getFileContent(filerelativeurl, FileContentType.Blob);
                await this.helper.addDataFilesToFolder(filecontent, filename);
                if (ext.toLocaleLowerCase() == "csv") {
                    filecontent = await this.helper.getFileContent(filerelativeurl, FileContentType.Text);
                } else if (ext.toLocaleLowerCase() == "json") {
                    filecontent = await this.helper.getFileContent(filerelativeurl, FileContentType.JSON);
                }
                this.setState({ showUploadProgress: false, uploadedData: filecontent, isCSV: ext.toLocaleLowerCase() == "csv" });
            } else {
                let dataToSync = await uploadedTemplate.downloadFileContent();
                let filereader = new FileReader();
                filereader.readAsBinaryString(dataToSync);
                filereader.onload = async () => {
                    let dataUploaded = await this.helper.addDataFilesToFolder(filereader.result, filename);
                    if (ext.toLocaleLowerCase() == "csv") {
                        filecontent = await dataUploaded.file.getText();
                    } else if (ext.toLocaleLowerCase() == "json") {
                        filecontent = await dataUploaded.file.getJSON();
                    }
                    this.setState({ showUploadProgress: false, uploadedData: filecontent, isCSV: ext.toLocaleLowerCase() == "csv" });
                };
            }
        }
    }
    /**
     * Update with manual properties
     */
    private _updateSPWithManualProperties = async (data: any[]) => {
        this.setState({ updatePropsLoader_Manual: true });
        let itemID = await this.helper.createSyncItem(SyncType.Manual);
        let finalJson = this._prepareJSONForAzFunc(data, false, itemID);
        await this.helper.updateSyncItem(itemID, finalJson);
        this.helper.runAzFunction(this.props.context.httpClient, finalJson, this.props.AzFuncUrl, itemID);
        this.setState({ updatePropsLoader_Manual: false, clearData: true, selectedUsers: [], manualPropertyData: [] });
    }
    /**
     * Update with azure properties
     */
    private _updateSPWithAzureProperties = async (data: any[]) => {
        this.setState({ updatePropsLoader_Azure: true });
        let itemID = await this.helper.createSyncItem(SyncType.Azure);
        let finalJson = this._prepareJSONForAzFunc(data, true, itemID);
        await this.helper.updateSyncItem(itemID, finalJson);
        this.helper.runAzFunction(this.props.context.httpClient, finalJson, this.props.AzFuncUrl, itemID);
        this.setState({ updatePropsLoader_Azure: false, clearData: true, selectedUsers: [], azurePropertyData: [] });
    }
    /**
     * Update with csv or json file
     */
    private _updateSPForBulkUsers = async (data: any[]) => {
        this.setState({ updatePropsLoader_Bulk: true });
        let itemID = await this.helper.createSyncItem(SyncType.Template);
        let finalJson = this._prepareJSONForAzFunc(data, false, itemID);
        await this.helper.updateSyncItem(itemID, finalJson);
        this.helper.runAzFunction(this.props.context.httpClient, finalJson, this.props.AzFuncUrl, itemID);
        this.setState({ updatePropsLoader_Bulk: false, clearData: true, uploadedData: null, uploadedTemplate: null, uploadedFileURL: '', showUploadData: false });
    }
    /**
     * Prepare JSON based on the manual or az data to call AZ FUNC.
     */
    private _prepareJSONForAzFunc = (data: any[], isAzure: boolean, itemid: number): string => {
        let finalJson: string = "";
        if (data && data.length > 0) {
            let userPropMapping = new Object();
            userPropMapping['targetSiteUrl'] = this.props.context.pageContext.legacyPageContext.webAbsoluteUrl;
            userPropMapping['targetAdminUrl'] = `https://${this.props.context.pageContext.legacyPageContext.tenantDisplayName}-admin.${this.props.context.pageContext.legacyPageContext.webDomain}`;
            userPropMapping['usecert'] = this.props.UseCert ? this.props.UseCert : false;
            userPropMapping['itemId'] = itemid;
            let propValues: any[] = [];
            data.map((userprop: any) => {
                let userPropValue: any = {};
                let userProperties: any[] = [];
                let userPropertiesKeys: string[] = Object.keys(userprop);
                userPropertiesKeys.map((prop: string) => {
                    if (isAzure && prop.toLowerCase() == "userprincipalname") {
                        userPropValue['userid'] = userprop[prop].indexOf('|') > 0 ? userprop[prop].split('|')[2] : userprop[prop];
                    }
                    if (!isAzure && prop.toLowerCase() == "userid") {
                        userPropValue['userid'] = userprop[prop].indexOf('|') > 0 ? userprop[prop].split('|')[2] : userprop[prop];
                    }
                    if (prop.toLowerCase() !== "userid" && prop.toLowerCase() !== "id" && prop.toLowerCase() !== "displayname"
                        && prop.toLowerCase() !== "userprincipalname" && prop.toLowerCase() !== "imageurl") {
                        let objProp = new Object();
                        objProp['name'] = isAzure ? this._getSPPropertyName(prop) : prop;
                        objProp['value'] = userprop[prop];
                        userProperties.push(JSON.parse(JSON.stringify(objProp)));
                    }
                });
                userPropValue['properties'] = JSON.parse(JSON.stringify(userProperties));
                propValues.push(JSON.parse(JSON.stringify(userPropValue)));
            });
            userPropMapping['value'] = propValues;
            finalJson = JSON.stringify(userPropMapping);
        }
        return finalJson;
    }
    /**
     * Get SPProperty name for Azure Property
     */
    private _getSPPropertyName = (azPropName: string): string => {
        return this.state.propertyMappings.filter((o) => { return o.AzProperty.toLowerCase() === azPropName.toLowerCase(); })[0].SPProperty;
    }
    /**
     * On menu click
     */
    private _onMenuClick = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        if (item) {
            if (item.props.itemKey == "0") {
                this.setState({
                    updatePropsLoader_Manual: false, updatePropsLoader_Azure: false, clearData: false, selectedUsers: [],
                    manualPropertyData: [], azurePropertyData: []
                });
            } else if (item.props.itemKey == "1") {
                this.setState({ uploadedData: null, uploadedTemplate: null, uploadedFileURL: '', showUploadData: false });
            }
            this.setState({
                selectedMenu: item.props.itemKey
            }, () => {

            });
        }
    }
    /**
     * Component render
     */
    public render(): React.ReactElement<ISpupsProperySyncProps> {
        const { templateLib, displayMode, appTitle, AzFuncUrl } = this.props;
        const { propertyMappings, uploadedTemplate, uploadedFileURL, showUploadData, showUploadProgress, uploadedData, isCSV, selectedUsers, manualPropertyData,
            azurePropertyData, disablePropsButtons, showPropsLoader, reloadGetProperties, selectedMenu, updatePropsLoader_Manual, updatePropsLoader_Azure,
            updatePropsLoader_Bulk, clearData, globalMessage, noActivePropertyMappings, listExists, isSiteAdmin, loading, accessDenied } = this.state;
        const fileurl = uploadedFileURL ? uploadedFileURL : uploadedTemplate && uploadedTemplate.fileAbsoluteUrl ? uploadedTemplate.fileAbsoluteUrl :
            uploadedTemplate && uploadedTemplate.fileName ? uploadedTemplate.fileName : '';
        const showConfig = !templateLib || !AzFuncUrl ? true : false;
        const headerButtonProps = { 'disabled': showUploadProgress || updatePropsLoader_Manual || updatePropsLoader_Azure || updatePropsLoader_Bulk };
        return (
            <div className={styles.spupsProperySync}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <WebPartTitle displayMode={displayMode} title={appTitle ? appTitle : strings.DefaultAppTitle} updateProperty={this.props.updateProperty} />
                            {showConfig ? (
                                <>
                                    {isSiteAdmin ? (
                                        <Placeholder iconName='DataManagementSettings'
                                            iconText={strings.PlaceholderIconText}
                                            description={strings.PlaceholderDescription}
                                            buttonLabel={strings.PlaceholderButtonLabel}
                                            hideButton={displayMode === DisplayMode.Read}
                                            onConfigure={this.props.openPropertyPane} />
                                    ) : (
                                            <>
                                                {loading &&
                                                    <ProgressIndicator label={strings.SitePrivilegeCheckLabel} description={strings.PropsLoader} />
                                                }
                                                {!loading &&
                                                    <MessageContainer MessageScope={MessageScope.SevereWarning} Message={strings.AdminConfigHelp} />
                                                }
                                            </>                                            
                                        )}
                                </>
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
                                                                                {globalMessage.length > 0 &&
                                                                                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                                                        <MessageContainer MessageScope={MessageScope.Failure} Message={globalMessage} />
                                                                                    </div>
                                                                                }
                                                                                <Pivot defaultSelectedKey="0" selectedKey={selectedMenu} onLinkClick={this._onMenuClick} className={styles.periodmenu}>
                                                                                    <PivotItem headerText={strings.TabMenu1} itemKey="0" itemIcon="SchoolDataSyncLogo" headerButtonProps={headerButtonProps} ></PivotItem>
                                                                                    <PivotItem headerText={strings.TabMenu2} itemKey="1" itemIcon="BulkUpload" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                    <PivotItem headerText={strings.TabMenu3} itemKey="2" itemIcon="StackIndicator" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                    <PivotItem headerText={strings.TabMenu4} itemKey="3" itemIcon="FileTemplate" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                    <PivotItem headerText={strings.TabMenu5} itemKey="4" itemIcon="SyncStatus" headerButtonProps={headerButtonProps}></PivotItem>
                                                                                </Pivot>
                                                                                <div style={{ float: "right" }}>
                                                                                    <PropertyMappingList mappingProperties={propertyMappings} helper={this.state.helper} siteurl={this.props.context.pageContext.web.serverRelativeUrl}
                                                                                        disabled={showUploadProgress || updatePropsLoader_Manual || updatePropsLoader_Azure || updatePropsLoader_Bulk || noActivePropertyMappings} />
                                                                                </div>
                                                                            </div>
                                                                            {selectedMenu == "0" &&
                                                                                <div className={css(styles.menuContent)}>
                                                                                    <PeoplePicker
                                                                                        disabled={disablePropsButtons || updatePropsLoader_Manual || updatePropsLoader_Azure}
                                                                                        context={this.props.context}
                                                                                        titleText={strings.PPLPickerTitleText}
                                                                                        personSelectionLimit={10}
                                                                                        groupName={""} // Leave this blank in case you want to filter from all users
                                                                                        showtooltip={false}
                                                                                        isRequired={false}
                                                                                        selectedItems={this._getPeoplePickerItems}
                                                                                        showHiddenInUI={false}
                                                                                        principalTypes={[PrincipalType.User]}
                                                                                        resolveDelay={500}
                                                                                        defaultSelectedUsers={selectedUsers.length > 0 ? this._getSelectedUsersLoginNames(selectedUsers) : []} />
                                                                                    {reloadGetProperties ? (
                                                                                        <>
                                                                                            {selectedUsers.length > 0 &&
                                                                                                <div>
                                                                                                    <MessageContainer MessageScope={MessageScope.Info} Message={strings.UserListChanges} />
                                                                                                </div>
                                                                                            }
                                                                                            {selectedUsers.length <= 0 && !clearData &&
                                                                                                <div>
                                                                                                    <MessageContainer MessageScope={MessageScope.Info} Message={strings.UserListEmpty} ShowDismiss={true} />
                                                                                                </div>
                                                                                            }
                                                                                        </>
                                                                                    ) : (
                                                                                            <></>
                                                                                        )
                                                                                    }
                                                                                    {selectedUsers && selectedUsers.length > 0 &&
                                                                                        <div style={{ marginTop: "5px" }}>
                                                                                            <PrimaryButton text={strings.BtnManualProps} onClick={this._getManualPropertyTable} style={{ marginRight: '5px' }}
                                                                                                disabled={disablePropsButtons || updatePropsLoader_Manual || updatePropsLoader_Azure} />
                                                                                            <PrimaryButton text={strings.BtnAzureProps} onClick={this._getAzurePropertyTable}
                                                                                                disabled={disablePropsButtons || updatePropsLoader_Manual || updatePropsLoader_Azure} />
                                                                                            {showPropsLoader && <Spinner className={styles.generateTemplateLoader} label={strings.PropsLoader} ariaLive="assertive" labelPosition="right" />}
                                                                                        </div>
                                                                                    }
                                                                                    {manualPropertyData && manualPropertyData.length > 0 &&
                                                                                        <ManualPropertyUpdate userProperties={manualPropertyData} UpdateSPUserWithManualProps={this._updateSPWithManualProperties}
                                                                                            showProgress={updatePropsLoader_Manual} />
                                                                                    }
                                                                                    {azurePropertyData && azurePropertyData.length > 0 &&
                                                                                        <AzurePropertyView userProperties={azurePropertyData} UpdateSPUserWithAzureProps={this._updateSPWithAzureProperties}
                                                                                            showProgress={updatePropsLoader_Azure} />
                                                                                    }
                                                                                    {clearData &&
                                                                                        <div><MessageContainer MessageScope={MessageScope.Success} Message={strings.JobIntializedSuccess} /></div>
                                                                                    }
                                                                                </div>
                                                                            }
                                                                            {selectedMenu == "1" &&
                                                                                <div className={css(styles.menuContent)}>
                                                                                    <div>
                                                                                        <FilePicker
                                                                                            accepts={[".json", ".csv"]}
                                                                                            buttonIcon="FileImage"
                                                                                            onSave={this._onSaveTemplate}
                                                                                            onChanged={this._onChangeTemplate}
                                                                                            context={this.props.context}
                                                                                            disabled={showUploadProgress || updatePropsLoader_Bulk || noActivePropertyMappings}
                                                                                            buttonLabel={"Select Data file"}
                                                                                            hideLinkUploadTab={true}
                                                                                            hideOrganisationalAssetTab={true}
                                                                                            hideWebSearchTab={true}
                                                                                        />
                                                                                    </div>
                                                                                    {fileurl &&
                                                                                        <div style={{ color: "black", padding: '10px' }}>
                                                                                            <FileTypeIcon type={IconType.font} path={fileurl} />&nbsp;{uploadedTemplate.fileName}
                                                                                        </div>
                                                                                    }
                                                                                    {showUploadData &&
                                                                                        <div style={{ padding: '10px', width: 'auto', display: 'inline-block' }}>
                                                                                            <PrimaryButton text={strings.BtnUploadDataForSync} onClick={this._uploadDataToSync} disabled={showUploadProgress || updatePropsLoader_Bulk} />
                                                                                            {showUploadProgress &&
                                                                                                <div style={{ paddingLeft: '10px', display: 'inline-block' }}><Spinner className={styles.generateTemplateLoader} label={strings.UploadDataToSyncLoader} ariaLive="assertive" labelPosition="right" /></div>
                                                                                            }
                                                                                        </div>
                                                                                    }
                                                                                    <UPPropertyData items={uploadedData} isCSV={isCSV} UpdateSPForBulkUsers={this._updateSPForBulkUsers} showProgress={updatePropsLoader_Bulk}
                                                                                        clearData={clearData} />
                                                                                    {clearData &&
                                                                                        <div><MessageContainer MessageScope={MessageScope.Success} Message={strings.JobIntializedSuccess} /></div>
                                                                                    }
                                                                                </div>
                                                                            }
                                                                            {selectedMenu == "2" &&
                                                                                <div className={css(styles.menuContent)}>
                                                                                    <BulkSyncList helper={this.state.helper} siteurl={this.props.context.pageContext.web.serverRelativeUrl} dateFormat={this.props.dateFormat} />
                                                                                </div>
                                                                            }
                                                                            {selectedMenu == "3" &&
                                                                                <div className={css(styles.menuContent)}>
                                                                                    <TemplatesView helper={this.state.helper} siteurl={this.props.context.pageContext.web.serverRelativeUrl} dateFormat={this.props.dateFormat} />
                                                                                </div>
                                                                            }
                                                                            {selectedMenu == "4" &&
                                                                                <div className={css(styles.menuContent)}>
                                                                                    <SyncJobsView helper={this.state.helper} dateFormat={this.props.dateFormat} />
                                                                                </div>
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
        );
    }
}
