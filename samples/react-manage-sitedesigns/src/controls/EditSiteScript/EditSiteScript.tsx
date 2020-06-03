
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IEditSiteScriptProps } from './IEditSiteScriptProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { IEditSiteScriptState } from './IEditSiteScriptState';
import { SiteDesignInfo, SiteScriptInfo, SiteScriptUpdateInfo } from '@pnp/sp';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ISiteScript } from '../../types/ISiteScript';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class EditSiteScript extends React.Component<IEditSiteScriptProps, IEditSiteScriptState> {
  private spService: spservice;
  private siteScriptShowError: boolean = false;
  private siteTitleShowError: boolean = false;
  private siteScriptInfo: SiteScriptInfo;

  private JsonEditorWrapper = React.lazy(() => import('../json-editor-wrapper' /* webpackChunkName: "testcomponent" */));
  private currentSiteScript: ISiteScript = {

    "$schema": "schema.json",
    "actions": [],
    "bindata": {},
    "version": 1
  };

  /**
   *Creates an instance of EditSiteScript.
   * @param {*} props
   * @memberof EditSiteScript
   */
  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      saving: false,
      hideDialog: true,
      readOnly: false,
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      currentSiteScript: this.currentSiteScript,
      title: '',
      description: '',
      isLoading: false
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onGetErrorMessageDescription = this.onGetErrorMessageDescription.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.setSiteScript = this.setSiteScript.bind(this);
    this.onValidateSiteScript = this.onValidateSiteScript.bind(this);
  }
  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof EditSiteScript
   */
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {
    this.props.onDismiss();
  }

  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof EditSiteScript
   */
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    try {
      const siteScriptUpdateInfo: SiteScriptUpdateInfo = { Id: this.props.siteScriptId, Title: this.state.title, Description: this.state.description, Content: JSON.stringify(this.state.currentSiteScript) };
      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.updateSiteScript(siteScriptUpdateInfo);
      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }
  }
  /**
   *
   * @memberof EditSiteScript
   */
  public async  componentDidMount() {
    // LoadTenantProperties
    try {
      this.setState({ isLoading: true });
      this.siteScriptInfo = await this.spService.getSiteScriptMetadata(this.props.siteScriptId);
      const siteScript: ISiteScript = JSON.parse(this.siteScriptInfo.Content);
      this.setState({ isLoading: false, description: this.siteScriptInfo.Description, title: this.siteScriptInfo.Title, currentSiteScript: siteScript });
    } catch (error) {
      console.log(error.message);
      this.setState({ isLoading: false, saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }
  }

  /**
   *
   * @private
   * @param {*} value
   * @memberof EditSiteScript
   */
  private setSiteScript(value: ISiteScript) {
    this.setState({ currentSiteScript: value });
  }

  /**
   *
   *
   * @private
   * @param {string} error (true/false)
   * @memberof EditSiteScript
   */
  private onValidateSiteScript(valid: boolean) {

    if (valid)  {
      this.siteScriptShowError = false;
      if (this.siteTitleShowError) {
        this.setState({ errorMessage: '', disableSaveButton: true, showError: false });
      } else {
        this.setState({ errorMessage: '', disableSaveButton: false, showError: false });
      }
    } else {
      this.siteScriptShowError = true;
      this.setState({ showError: true, errorMessage: strings.JSONSchemaNotValidMessage, disableSaveButton: true });
    }
  }
  // Validate Value
  /**
   *
   *  Validate Title
   * @private
   * @param {string} value
   * @returns
   * @memberof EditSiteScript
   */
  private onGetErrorMessageTitle(value: string) {
    let returnvalue: string = '';
    let siteScriptTitle = this.state.title;

    if (value.trim().length > 0) {
      siteScriptTitle = value;
      this.siteTitleShowError = false;
      if (this.siteScriptShowError) {
        this.setState({ disableSaveButton: true, title: siteScriptTitle });
      } else {
        this.setState({ disableSaveButton: false, title: siteScriptTitle });
      }
    } else {
      siteScriptTitle = value;
      this.siteTitleShowError = true;
      this.setState({ disableSaveButton: true, title: siteScriptTitle });
      // returnvalue = 'Site Script title is required';
    }
    return returnvalue;
  }
  /**
   *
   *
   * @private
   * @param {string} value
   * @returns
   * @memberof EditSiteScript
   */
  private onGetErrorMessageDescription(value: string) {
    let returnvalue: string = '';
    this.setState({ description: value });
    return returnvalue;
  }
  /**
   *
   *
   * @returns {React.ReactElement<IEditSiteScriptProps>}
   * @memberof EditSiteScript
   */
  public render(): React.ReactElement<IEditSiteScriptProps> {
    return (
      <div className={styles.siteDesigns} >

          <Dialog
            hidden={this.props.hideDialog}
            onDismiss={this.onCancel}
            minWidth={"600px"}
            dialogContentProps={{
              type: DialogType.normal,
              title: strings.EditSiteScriptDialogTitle,
              subText: strings.AddSiteScriptDialogSubText
            }}
            modalProps={{
              isBlocking: true,
            }}
          >
            {
              this.state.isLoading &&
              <Spinner size={SpinnerSize.small} label={strings.LoadingLabel} ariaLive="assertive" />
            }
            {
              this.state.showError &&
              <MessageBar messageBarType={MessageBarType.error}>
                <span>{this.state.errorMessage}</span>
              </MessageBar>
            }
             {
              !this.state.isLoading &&
              <TextField
                label={strings.SiteScriptIdLabel}
                readOnly={true}
                value={this.props.siteScriptId}
                style={{backgroundColor: "#f8f8f8"}}
                />
            }
            {
              !this.state.isLoading &&
              <TextField
                label={strings.AddSiteScriptTitleLabel}
                readOnly={this.state.readOnly}
                required={true}
                value={this.state.title ? this.state.title : ''}
                deferredValidationTime={300}
                onGetErrorMessage={this.onGetErrorMessageTitle} />
            }
            {
              !this.state.isLoading &&
              <TextField
                label={strings.AddSiteScriptDescriptionLabel}
                readOnly={this.state.readOnly}
                value={this.state.title ? this.state.description : ''}
                deferredValidationTime={300}
                onGetErrorMessage={this.onGetErrorMessageDescription} />
            }
            <br />
            {
              !this.state.isLoading &&
              <React.Suspense fallback={<div>Loading...</div>}>
                <this.JsonEditorWrapper
                  currentSiteScript={this.state.currentSiteScript}
                  setSiteScript={this.setSiteScript}
                  onValidate={this.onValidateSiteScript}
                />
              </React.Suspense>
            }
            <DialogFooter>
              {
                this.state.saving &&
                <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                  <Spinner size={SpinnerSize.small} ariaLive="assertive" />
                </div>
              }
              <PrimaryButton onClick={this.onSave} text={strings.EditSiteScriptSaveButtonLabel} disabled={this.state.disableSaveButton} />
              <DefaultButton onClick={this.onCancel} text={strings.EditSiteScriptPanelButtonCancel} />
            </DialogFooter>


          </Dialog>


      </div>
    );
  }
}
