
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IAddSiteScriptProps } from './IAddSiteScriptProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { IAddSiteScriptState } from './IAddSiteScriptState';
import { SiteDesignInfo, SiteScriptInfo, SiteScriptUpdateInfo } from '@pnp/sp';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ISiteScript } from '../../types/ISiteScript';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class AddSiteScript extends React.Component<IAddSiteScriptProps, IAddSiteScriptState> {
  private spService: spservice;
  private siteScriptshowError: boolean = false;
  private siteTitleshowError: boolean = false;

  private JsonEditorWrapper = React.lazy(() => import('../json-editor-wrapper' /* webpackChunkName: "jsoneditorwrapper" */));
  private currentSiteScript: ISiteScript = {

    "$schema": "schema.json",
    "actions": [],
    "bindata": {},
    "version": 1
  };

  /**
   *Creates an instance of AddSiteScript.
   * @param {*} props
   * @memberof AddSiteScript
   */
  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      saving: false,
      hideDialog: true,
      readOnly: false,
      title: '',
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      currentSiteScript: this.currentSiteScript,
      description: ''
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
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof AddSiteScript
   */
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {
    this.props.onDismiss();
  }

  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    try {
      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.createSiteScript(this.state.title, this.state.description, this.state.currentSiteScript);
      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }
  }
  /**
   *
   * @memberof AddSiteScript
   */
  public async  componentDidMount() {
    // LoadTenantProperties
  }

  /**
   *
   * @private
   * @param {*} value
   * @memberof AddSiteScript
   */
  private setSiteScript(value: ISiteScript) {

    this.setState({ currentSiteScript: value });

  }

  /**
   *
   *
   * @private
   * @param {string} error (true/false)
   * @memberof AddSiteScript
   */
  private onValidateSiteScript(valid: boolean) {

    if (valid) {
      this.siteScriptshowError = false;
      if (this.siteTitleshowError) {
        this.setState({ errorMessage: '', disableSaveButton: true, showError: false });
      } else {
        this.setState({ errorMessage: '', disableSaveButton: false, showError: false });
      }

    } else {
      this.siteScriptshowError = true;
      this.setState({ showError: true, errorMessage: strings.JSONSchemaErrorMessage, disableSaveButton: true });
    }


  }
  // Validate Value
  /**
   *
   *  Validate Title
   * @private
   * @param {string} value
   * @returns
   * @memberof AddSiteScript
   */
  private onGetErrorMessageTitle(value: string) {
    let returnvalue: string = '';
    let siteScriptTitle = this.state.title;
    const { showError } = this.state;
    if (value.trim().length > 0) {
      siteScriptTitle = value;
      this.siteTitleshowError = false;
      if (this.siteScriptshowError) {
        this.setState({ disableSaveButton: true, title: siteScriptTitle });
      } else {
        this.setState({ disableSaveButton: false, title: siteScriptTitle });
      }
    } else {
      siteScriptTitle = value;
      this.siteTitleshowError = true;
      this.setState({ disableSaveButton: true, title: siteScriptTitle });
    //  returnvalue = 'Site Script title is required';
    }
    return returnvalue;
  }
  /**
   *
   *
   * @private
   * @param {string} value
   * @returns
   * @memberof AddSiteScript
   */
  private onGetErrorMessageDescription(value: string) {
    let returnvalue: string = '';
    this.setState({ description: value });
    return returnvalue;
  }
  /**
   *
   *
   * @returns {React.ReactElement<IAddSiteScriptProps>}
   * @memberof AddSiteScript
   */
  public render(): React.ReactElement<IAddSiteScriptProps> {
    return (
      <div className={styles.siteDesigns} >

          <Dialog
            hidden={this.props.hideDialog}
            onDismiss={this.onCancel}
            minWidth={"600px"}
            dialogContentProps={{
              type: DialogType.normal,
              title: strings.AddSiteScriptDialogTitle,
              subText: strings.AddSiteScriptDialogSubText
            }}
            modalProps={{
              isBlocking: true,
            }}
          >
            {
              this.state.showError &&
              <MessageBar messageBarType={MessageBarType.error}>
                <span>{this.state.errorMessage}</span>
              </MessageBar>
            }
            <TextField
              label={strings.AddSiteScriptTitleLabel}
              readOnly={this.state.readOnly}
              required={true}
              value={this.state.title ? this.state.title : ''}
              deferredValidationTime={300}
              onGetErrorMessage={this.onGetErrorMessageTitle} />
            <TextField
              label={strings.AddSiteScriptDescriptionLabel}
              readOnly={this.state.readOnly}
              value={this.state.title ? this.state.description : ''}
              deferredValidationTime={300}
              onGetErrorMessage={this.onGetErrorMessageDescription} />
            <br />
            {
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
              <PrimaryButton onClick={this.onSave} text={strings.AddSiteScriptPanelButtonSave} disabled={this.state.disableSaveButton} />
              <DefaultButton onClick={this.onCancel} text={strings.AddSiteScriptPanelButtonCancelText} />
            </DialogFooter>
          </Dialog>


      </div>
    );
  }
}
