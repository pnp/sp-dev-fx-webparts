
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IAddSiteScriptToSiteDesignProps } from './IAddSiteScriptToSiteDesignProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import * as strings from 'SiteDesignsWebPartStrings';
import { IAddSiteScriptToSiteDesignState } from './IAddSiteScriptToSiteDesignState';
import { SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignCreationInfo, SiteDesignUpdateInfo } from '@pnp/sp';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IImageProps, Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ISiteScript } from '../../types/ISiteScript';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { getGUID } from '@pnp/common';
import { FieldTextRenderer } from "@pnp/spfx-controls-react/lib/FieldTextRenderer";

export default class AddSiteScriptToSiteDesign extends React.Component<IAddSiteScriptToSiteDesignProps, IAddSiteScriptToSiteDesignState> {
  private spService: spservice;
  private siteScripts: SiteScriptInfo[];
  private currentSiteScriptsIds: string[] = [];

  private AddScriptDialog = React.lazy(() => import('../AddSiteScript/AddSiteScript' /* webpackChunkName: "addscriptdialog" */));

  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      isLoading: false,
      readOnly: true,
      showPanel: false,
      panelMode: panelMode.New,
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      siteScriptsList: [],
      selectedItems: [],
      showPanelAddScript: false,
      saving: false,

    });

    this.currentSiteScriptsIds = this.props.siteDesignInfo.SiteScriptIds.split(',');
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onCancel = this.onCancel.bind(this);
    this.onChangeMultiSelect = this.onChangeMultiSelect.bind(this);
    this.onAddScript = this.onAddScript.bind(this);
    this.onDismissAddScriptPanel = this.onDismissAddScriptPanel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof AddSiteDesign
   */
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.props.onDismiss();
  }

  /**
   *   Save SiteDesign Event
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof AddSiteDesign
   */
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    try {
      for (const item of this.state.selectedItems) {
        this.currentSiteScriptsIds.push(item);
      }
      const siteDesignUpdateInfo: SiteDesignUpdateInfo = {
        Id: this.props.siteDesignInfo.Id,
        SiteScriptIds: this.currentSiteScriptsIds
      };

      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.updateSiteDesign(siteDesignUpdateInfo);

      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }
  }
  /**
   *  Add SiteScrit Event
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof AddSiteDesign
   */
  private onAddScript(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.setState({ showPanelAddScript: true });
  }

  private onDismissAddScriptPanel(refresh: boolean) {

    this.setState({ showPanelAddScript: false });
    if (refresh) {
      this.loadSiteScripts();
    }
  }


  /**
   * Check if SiteScript already exists in Site Design
   *
   * @private
   * @param {string} siteScriptId
   * @returns
   * @memberof AddSiteScriptToSiteDesign
   */
  private async checkSiteScriptExists(siteScriptId: string) {
    let found: boolean = false;

    for (const currentSitescriptId of this.currentSiteScriptsIds) {
      if (currentSitescriptId === siteScriptId) {
        found = true;
        break;
      }
    }
    return found;
  }
  /**
   * Load SiteScript
   * @private
   * @memberof AddSiteDesign
   */
  private async loadSiteScripts() {

    this.siteScripts = await this.spService.getSiteScripts();
    let siteScriptsList: IDropdownOption[] = [];
    if (this.siteScripts) {
      for (const siteScript of this.siteScripts) {
        const exists = await this.checkSiteScriptExists(siteScript.Id);
        if (!exists) {
          siteScriptsList.push({
            key: siteScript.Id,
            text: siteScript.Title
          });
        }
      }
      this.setState({ siteScriptsList: siteScriptsList.sort() });
    }
  }
  // Component Did Mount
  /**
   *
   * @memberof AddSiteDesign
   */
  public async  componentDidMount() {
    // LoadTenantProperties
    await this.loadSiteScripts();
  }

  /**
   *
   *
   * @memberof AddSiteDesign
   */
  public async onChangeMultiSelect(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    const updatedSelectedItem = this.state.selectedItems ? this.copyArray(this.state.selectedItems) : [];

    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItem.push(item.key);
      this.setState({ errorMessage: '', selectedItems: updatedSelectedItem, disableSaveButton:  false });
    } else {
      // remove the option if it's unchecked
      const currIndex = updatedSelectedItem.indexOf(item.key);
      if (currIndex > -1) {
        updatedSelectedItem.splice(currIndex, 1);
      }
      this.setState({ errorMessage: '', selectedItems: updatedSelectedItem, disableSaveButton: updatedSelectedItem.length > 0 ? false : true });
    }
  }

  /**
   *
   * @memberof AddSiteDesign
   */
  public copyArray(array: any[]): any[] {
    const newArray: any[] = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  /**
   * On Render
   *
   * @returns {React.ReactElement<IAddSiteDesignProps>}
   * @memberof AddSiteDesign
   */
  public render(): React.ReactElement<IAddSiteScriptToSiteDesignProps> {

    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.medium}
          headerText={strings.AddSiteScriptToSiteDesignPanelTitle}>

          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.Title}
            style={{backgroundColor: "#f8f8f8"}}
          />
          <TextField
            label={"WebTemplate"}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.WebTemplate}
            style={{backgroundColor: "#f8f8f8"}}
          />

          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.Description}
            style={{backgroundColor: "#f8f8f8"}}
          />
          <br />
          {
            this.props.siteDesignInfo.PreviewImageUrl &&
            <Image src={this.props.siteDesignInfo ? this.props.siteDesignInfo.PreviewImageUrl : ''}
              imageFit={ImageFit.cover}
              width={200}
              height={200}
            />
          }
          <Toggle
            defaultChecked={this.props.siteDesignInfo.IsDefault}
            label={strings.AddSiteDesignIsDefaultLabel}
            onText="On"
            offText="Off"
            disabled
          />
          <div style={{ paddingTop: '10px', textAlign: 'right' }}>
            <ActionButton
              data-automation-id="test"
              iconProps={{ iconName: 'Add' }}
              allowDisabledFocus={true}
              title={strings.actionButtonTitle}
              onClick={this.onAddScript}
            >
              Add SiteScript
        </ActionButton>
          </div>
          <div>
            <Dropdown
              placeholder={strings.DropDownSelectSiteScriptPlaceHolder}
              label={strings.DropDownSelectSiteScriptLabel}
              selectedKeys={this.state.selectedItems}
              onChange={this.onChangeMultiSelect}
              multiSelect
              options={this.state.siteScriptsList}

            />
          </div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.AddScriptDialog
              hideDialog={!this.state.showPanelAddScript}
              onDismiss={this.onDismissAddScriptPanel}
              context={this.props.context} />
          </React.Suspense>
          <br />
          <DialogFooter>
            {
              this.state.saving &&
              <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                <Spinner size={SpinnerSize.small} ariaLive="assertive" />
              </div>
            }
            <PrimaryButton onClick={this.onSave} text={strings.AddSiteScriptToSiteDesignPanelButtonSaveText} disabled={this.state.disableSaveButton} />
            <DefaultButton onClick={this.onCancel} text={strings.AddSiteScriptToSiteDesignPanelButtonCancelText} />
          </DialogFooter>
          {
            this.state.showError &&
            <div style={{ marginTop: '15px' }}>
              <MessageBar messageBarType={MessageBarType.error} >
                <span>{this.state.errorMessage}</span>
              </MessageBar>
            </div>
          }
        </Panel>
      </div>
    );
  }
}
