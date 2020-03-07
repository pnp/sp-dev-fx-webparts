
import React, { useState, useEffect, useReducer } from 'react';
import styles from './SpFxAlm.module.scss';
import { ISpFxAlmProps } from './ISpFxAlmProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import HttpService from './service';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { css } from "@uifabric/utilities/lib/css";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export default function SpFxAlm(props: ISpFxAlmProps) {

  const [isSiteAppCatalog, setSiteAppCatalog] = useState(false);
  const [file, setFile] = useState(null);
  const [hideDialog, hideDialogBox] = useState(true);
  const [operationInfo, setMessage] = useState("");
  const [operationCompleted, setoperationStatus] = useState(false);

  const [siteURL, setSiteURL] = useState("");
  const [allSiteURL, setAllSiteURL] = useState([]);
  const [tentantAppURL, setTenantAppURL] = useState("");

  const [allSPFxApps, setAllApps] = useState([]);
  const [appID, setAppID] = useState(null);

  const [showaddremoveError, setShowUploadError] = useState({ addAppSelectSiteErr: false, addAppSelectAppErr: false, uploadAppSelectAppErr: false });
  const [showDeployRetractError, setShoweployRetractError] = useState({ deployAppSelectSiteErr: false, deployAppSelectAppErr: false });
  const [showunInstallError, setshowunInstallError] = useState({ appinstallSelectSiteErr: false, appinstallSelectAppErr: false });

  const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 0 }
  };
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
  };

  useEffect(() => {
    loadPrereqs();
  }, [siteURL, isSiteAppCatalog, appID]);

  return (
    <div className={styles.spFxAlm} >
      <div className={styles.container}>
        <div className={css(styles.row, styles.customBorder)}>
          <div
            style={{
              display: 'flex'
            }}
          >
            <Pivot style={{ width: '100%' }} aria-label="Basic Pivot Example">
              <PivotItem
                headerText="Add or Remove App"
                headerButtonProps={{
                  'data-order': 1,
                  'data-title': 'My Files Title'
                }}
              >
                <div className={styles.row}>
                  {isSiteAppCatalog && <Dropdown
                    placeholder="Select a site"
                    label="Select a site to perform the activity"
                    options={allSiteURL}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onSiteChange}
                    defaultSelectedKey={siteURL}
                    errorMessage={showaddremoveError.addAppSelectSiteErr ? 'Select Site' : undefined}
                  />}
                  <Dropdown
                    placeholder="Select an app"
                    label="Select an app to perform the activity"
                    options={allSPFxApps}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onAppChange}
                    defaultSelectedKey={appID}
                    errorMessage={showaddremoveError.addAppSelectAppErr ? 'Select an App' : undefined}
                  />
                  <div className='ms-Grid-col ms-u-sm6'>
                    <Label styles={labelStyles}>Upload solution package</Label>
                  </div>
                  <div className='ms-Grid-col ms-u-sm6'>
                    <input type='file' id='file' onChange={(e) => handleChange(e.target.files, e)} required accept='.sppkg' />
                    {showaddremoveError.uploadAppSelectAppErr && <div className={styles.errorMessage}>.sppkg file is required</div>}
                  </div>
                </div>
                <div className={styles.row}>
                  <PrimaryButton text='Add an app' onClick={() => { addanApp() }} /> &nbsp;
                  <PrimaryButton text='Remove App' onClick={() => { removeApp() }} ></PrimaryButton>
                </div>
              </PivotItem>
              <PivotItem headerText="Deploy or Retract App">
                <div className={styles.row}>
                  {isSiteAppCatalog && <Dropdown
                    placeholder="Select a site"
                    label="Select a site to perform the activity"
                    options={allSiteURL}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onSiteChange}
                    defaultSelectedKey={siteURL}
                    errorMessage={showDeployRetractError.deployAppSelectSiteErr ? 'Select Site' : undefined}
                  />}

                  <Dropdown
                    placeholder="Select an app"
                    label="Select an app to perform the activity"
                    options={allSPFxApps}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onAppChange}
                    defaultSelectedKey={appID}
                    errorMessage={showDeployRetractError.deployAppSelectAppErr ? 'Select an App' : undefined}
                  />
                  <PrimaryButton text='Deploy' onClick={() => { deployApp() }} ></PrimaryButton> &nbsp;
                  <PrimaryButton text='Retract' onClick={() => { retractApp() }} ></PrimaryButton>
                </div>
              </PivotItem>
              <PivotItem headerText="Install or Uninstall App">
                <div className={styles.row}>
                  <Dropdown
                    placeholder="Select a site"
                    label="Select a site to perform the activity"
                    options={allSiteURL}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onSiteChange}
                    defaultSelectedKey={siteURL}
                    errorMessage={showunInstallError.appinstallSelectSiteErr ? 'Select Site' : undefined}
                  />

                  <Dropdown
                    placeholder="Select an app"
                    label="Select an app to perform the activity"
                    options={allSPFxApps}
                    styles={{ dropdown: { width: '100%' }, root: { height: 100 } }}
                    onChange={_onAppChange}
                    defaultSelectedKey={appID}
                    errorMessage={showunInstallError.appinstallSelectAppErr ? 'Select an App' : undefined}
                  />
                  <PrimaryButton text='Install' onClick={() => { installApp() }} ></PrimaryButton> &nbsp;
                  <PrimaryButton text='Uninstall' onClick={() => { uninstallApp() }} ></PrimaryButton>
                </div>
              </PivotItem>
            </Pivot>
            <Toggle style={{ display: 'flex' }} label="For Site Collection App Catalog" onText="On" offText="Off" onChange={_ontoggleChange} />
          </div>
        </div>
        <Dialog
          hidden={hideDialog}
          onDismiss={hideDialogWindow}
          dialogContentProps={{
            type: DialogType.normal,
            title: '',
            subText: ''
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >{operationCompleted ? <span>{operationInfo}</span> : <Spinner size={SpinnerSize.large} label="Working on it..." ariaLive='assertive' />}
          <DialogFooter>
            {operationCompleted ? <PrimaryButton onClick={hideDialogWindow} text="Okay" /> : null}
          </DialogFooter>
        </Dialog>
      </div>
    </div >
  );

  function _onAppChange(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    setAppID(item.key);
  };

  function _onSiteChange(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    setSiteURL(item.text);
    getAllApps();
  };

  function _ontoggleChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    setSiteAppCatalog(checked);
    getAllApps();
  }


  function hideDialogWindow() {
    setAppID(null);
    getAllApps();
    hideDialogBox(true);
    setoperationStatus(false);
  }

  function displayDialog() {
    hideDialogBox(false);
  }

  function handleChange(selectorFiles: FileList, currentEvent: any) {
    //Add only if .sppkg file
    if (selectorFiles[0].name.substr(selectorFiles[0].name.length - 6).toLowerCase() === '.sppkg') {
      setFile(selectorFiles);
    }
  }

  /**
   * To load the prerequisite for this spfx app
   */
  async function loadPrereqs() {
    const tenanAppCatalogResponse = await HttpService.GetTenantAppcatalogUrl(props.url);
    setTenantAppURL(tenanAppCatalogResponse.CorporateCatalogUrl);
    getAllSites();
    getAllApps();
  }

  /**
   * Get all sites present on the tenant - brings 1000 sites
   */
  async function getAllSites() {
    const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
    const siteDetails = await HttpService.GetAllSites(targetSite, props.rootSiteUrl);
    let allSiteCollectionURL: IDropdownOption[] = [];
    await Promise.all(siteDetails.PrimaryQueryResult.RelevantResults.Table.Rows.map((currentSite) => {
      allSiteCollectionURL.push({ key: currentSite.Cells[3].Value, text: currentSite.Cells[3].Value });
    }));

    if (allSiteCollectionURL !== allSiteURL) {
      setAllSiteURL(allSiteCollectionURL);
    }
  }

  /**
   * Get all apps present on the tenant or site collection
   */
  async function getAllApps() {
    const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
    try {
      const appDetails = await HttpService.GetApps(targetSite, isSiteAppCatalog);
      let allApps: IDropdownOption[] = [];

      // check if appcatalog available for the site
      if (appDetails["error"] === undefined) {
        appDetails.value.map((currentappDetail) => {
          allApps.push({ key: currentappDetail.ID, text: currentappDetail.Title })
        });
        setAllApps(allApps);
      }
      else {
        setAllApps([]);
      }
    }
    catch (exception) {
      setMessage(exception);
      setAllApps([]);
    }
  }

  /**
   * To Add an app in a site collection on tenant app catalog
   */
  async function addanApp() {
    try {
      if (validate("AddApp")) {
        setMessage("Working on it...");
        displayDialog();
        const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
        await HttpService.AddanApp(file, targetSite, isSiteAppCatalog);
        setMessage("App added successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }

  }

  /**
   * To remove an app from site collection or tenant app catalog 
   */
  async function removeApp() {
    try {
      if (validate("RemoveApp")) {
        setMessage("Working on it...");
        displayDialog();
        const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
        await HttpService.RemoveApp(targetSite, appID, isSiteAppCatalog);
        setMessage("App removed successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }
  }

  /**
   * To install an app on a site
   */
  async function installApp() {
    try {
      if (validate("InstallApp")) {
        setMessage("Working on it...");
        displayDialog();
        const installAppResponse = await HttpService.InstallApp(siteURL, appID, isSiteAppCatalog);
        setMessage("App installed successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }
  }

  /**
   * To Uninstall app from a site
   */
  async function uninstallApp() {
    try {
      if (validate("UninstallApp")) {
        setMessage("Working on it...");
        displayDialog();
        const uninstallAppResponse = await HttpService.UninstallApp(siteURL, appID, isSiteAppCatalog);
        setMessage("App uninstalled successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }
  }

  /**
   * To deploy an app on tenant or site app catalog
   */
  async function deployApp() {
    try {
      if (validate("DeployApp")) {
        setMessage("Working on it...");
        displayDialog();
        const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
        await HttpService.DeployApp(targetSite, appID, isSiteAppCatalog);
        setMessage("App deployed successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }
  }

  /**
   * To retract an app from tenant or site app catalog
   */
  async function retractApp() {
    try {
      if (validate("RetractApp")) {
        setMessage("Working on it...");
        displayDialog();
        const targetSite = isSiteAppCatalog ? siteURL : tentantAppURL;
        await HttpService.RetractApp(targetSite, appID, isSiteAppCatalog);
        setMessage("App retracted successfully !");
        setoperationStatus(true);
      }
    }
    catch (exception) {
      setMessage(exception);
    }
  }

  /**
   * to validate the inputs are selected and show validations
   */
  function validate(stage): boolean {
    let isActionAllowed = true;
    switch (stage) {
      case 'AddApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || file === null) {
          isActionAllowed = false;
        }
        setShowUploadError({ addAppSelectSiteErr: (siteURL.length > 0) ? false : true, addAppSelectAppErr: false, uploadAppSelectAppErr: file === null ? true : false });
        break;

      case 'RemoveApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || appID === null) {
          isActionAllowed = false;
        }
        setShowUploadError({ addAppSelectSiteErr: (siteURL.length > 0) ? false : true, addAppSelectAppErr: appID === null ? true : false, uploadAppSelectAppErr: false });
        break;

      case 'DeployApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || appID === null) {
          isActionAllowed = false;
        }
        setShoweployRetractError({ deployAppSelectSiteErr: (siteURL.length > 0) ? false : true, deployAppSelectAppErr: appID === null ? true : false });
        break;

      case 'RetractApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || appID === null) {
          isActionAllowed = false;
        }
        setShoweployRetractError({ deployAppSelectSiteErr: (siteURL.length > 0) ? false : true, deployAppSelectAppErr: appID === null ? true : false });
        break;

      case 'InstallApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || appID === null) {
          isActionAllowed = false;
        }
        setshowunInstallError({ appinstallSelectSiteErr: (siteURL.length > 0) ? false : true, appinstallSelectAppErr: appID === null ? true : false });
        break;

      case 'UninstallApp':
        if ((isSiteAppCatalog && siteURL.length === 0) || appID === null) {
          isActionAllowed = false;
        }
        setshowunInstallError({ appinstallSelectSiteErr: (siteURL.length > 0) ? false : true, appinstallSelectAppErr: appID === null ? true : false });
        break;
    }
    return isActionAllowed;
  }
}