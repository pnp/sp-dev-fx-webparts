
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IAddSiteDesignProps } from './IAddSiteDesignProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import * as strings from 'SiteDesignsWebPartStrings';
import { IAddSiteDesignState } from './IAddSiteDesignState';
import { SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignCreationInfo } from '@pnp/sp';
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

export default class AddSiteDesign extends React.Component<IAddSiteDesignProps, IAddSiteDesignState> {
  private spService: spservice;
  private siteScripts: SiteScriptInfo[];

  private AddScriptDialog = React.lazy(() => import('../../controls/AddSiteScript/AddSiteScript' /* webpackChunkName: "addscriptdialog" */));

  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      isLoading: false,
      readOnly: false,
      showPanel: false,
      siteDesignCreationInfo: { Description: '', Title: '', IsDefault: false, PreviewImageAltText: '', PreviewImageUrl: '', SiteScriptIds: [], WebTemplate: '64' },
      panelMode: panelMode.New,
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      sitescriptslist: [],
      selectedItems: [],
      showPanelAddScript: false,
      saving: false,
      selectedItemWebTemplate: 64
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onIsDefault = this.onIsDefault.bind(this);
    this.onGetErrorMessageDescription = this.onGetErrorMessageDescription.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onGetErrorMessageImageUrl = this.onGetErrorMessageImageUrl.bind(this);
    this.onChangeMultiSelect = this.onChangeMultiSelect.bind(this);
    this.onAddScript = this.onAddScript.bind(this);
    this.onDismissAddScriptPanel = this.onDismissAddScriptPanel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectedItemWebTemplate = this.onSelectedItemWebTemplate.bind(this);
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

    const _siteDesignCreationInfo: SiteDesignCreationInfo = this.state.siteDesignCreationInfo;
    // read SiteScripts
    for (const item of this.state.selectedItems) {
      _siteDesignCreationInfo.SiteScriptIds.push(item);
    }
    try {
      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.createSiteDesign(_siteDesignCreationInfo);

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
   * Load SiteScript
   * @private
   * @memberof AddSiteDesign
   */
  private async loadSiteScripts() {
    this.siteScripts = await this.spService.getSiteScripts();
    let siteScriptsList: { key: string, text: string }[] = [];
    if (this.siteScripts) {
      for (const sitescript of this.siteScripts) {
        siteScriptsList.push({
          key: sitescript.Id,
          text: sitescript.Title
        });
      }
      this.setState({ sitescriptslist: siteScriptsList.sort() });
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
    const hasTitlevalue = this.state.siteDesignCreationInfo.Title;
    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItem.push(item.key);
      this.setState({ errorMessage: '', selectedItems: updatedSelectedItem, disableSaveButton: hasTitlevalue ? false : true });
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
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} event
   * @param {IDropdownOption} item
   * @memberof AddSiteDesign
   */
  private onSelectedItemWebTemplate(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    const _siteDesignCreationInfo = this.state.siteDesignCreationInfo;
    _siteDesignCreationInfo.WebTemplate = item.key.toString();
    this.setState({ selectedItemWebTemplate: item.key, siteDesignCreationInfo: _siteDesignCreationInfo });
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


  // Validate Value
  /**
   *  Validate Title
   * @private
   * @param {string} value
   * @returns
   * @memberof AddSiteDesign
   */
  private onGetErrorMessageTitle(value: string) {
    let returnvalue: string = '';
    const _siteDesignCreationInfo = this.state.siteDesignCreationInfo;
    const numberSiteScriptSelected = this.state.selectedItems.length;
    if (value.trim().length > 0) {
      _siteDesignCreationInfo.Title = value;
      this.setState({ disableSaveButton: numberSiteScriptSelected > 0 ? false : true, siteDesignCreationInfo: _siteDesignCreationInfo });
    } else {
      _siteDesignCreationInfo.Title = value;
      this.setState({ errorMessage: '', disableSaveButton: true, siteDesignCreationInfo: _siteDesignCreationInfo });
      returnvalue = strings.AddSiteDesignPanelTitleErrorMessage;
    }
    return returnvalue;
  }

  /**
   *  Validate Description
   *
   * @private
   * @param {string} value
   * @returns
   * @memberof AddSiteDesign
   */
  private onGetErrorMessageDescription(value: string) {

    let returnvalue: string = '';
    const _siteDesignCreationInfo = this.state.siteDesignCreationInfo;
    _siteDesignCreationInfo.Description = value;
    this.setState({ siteDesignCreationInfo: _siteDesignCreationInfo });

    return returnvalue;
  }
  /**
   *
   * @private
   * @param {string} value
   * @returns {string} returnvale
   * @memberof AddSiteDesign
   */
  private onGetErrorMessageImageUrl(value: string) {
    let returnvalue: string = '';
    const _siteDesignCreationInfo = this.state.siteDesignCreationInfo;
    if (value.length > 0) {
      try {
        const _URL = new URL(value);
        _siteDesignCreationInfo.PreviewImageUrl = value;
      } catch (error) {
        _siteDesignCreationInfo.PreviewImageUrl = value;
        returnvalue = error.message;
      }
    } else {
      _siteDesignCreationInfo.PreviewImageUrl = value;
    }

    this.setState({ siteDesignCreationInfo: _siteDesignCreationInfo });

    return returnvalue;
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} ev
   * @param {boolean} checked
   * @memberof AddSiteDesign
   */
  private onIsDefault(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    const _siteDesignCreationInfo = this.state.siteDesignCreationInfo;
    _siteDesignCreationInfo.IsDefault = checked;
    this.setState({ siteDesignCreationInfo: _siteDesignCreationInfo });
  }
  /**
   * On Render
   *
   * @returns {React.ReactElement<IAddSiteDesignProps>}
   * @memberof AddSiteDesign
   */
  public render(): React.ReactElement<IAddSiteDesignProps> {
    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.medium}
          headerText="Add Site Design">
          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            required={true}
            value={this.state.siteDesignCreationInfo ? this.state.siteDesignCreationInfo.Title : ''}
            deferredValidationTime={1500}
            onGetErrorMessage={this.onGetErrorMessageTitle} />
          <Dropdown
            placeholder="SelectWebTemplate"
            label="WebTemplate"
            selectedKey={this.state.selectedItemWebTemplate}
            onChange={this.onSelectedItemWebTemplate}

            options={[
              { key: 64, text: 'Team Site' },
              { key: 68, text: 'Comunication Site' }
            ]}

          />
          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignCreationInfo ? this.state.siteDesignCreationInfo.Description : ''}
            deferredValidationTime={1500}
            onGetErrorMessage={this.onGetErrorMessageDescription} />
          <TextField
            label={strings.AddSiteDesignImageUrlLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignCreationInfo ? this.state.siteDesignCreationInfo.PreviewImageUrl : ''}
            deferredValidationTime={1500}
            onGetErrorMessage={this.onGetErrorMessageImageUrl} />
          <br />
          {
            this.state.siteDesignCreationInfo.PreviewImageUrl &&
            <Image src={this.state.siteDesignCreationInfo ? this.state.siteDesignCreationInfo.PreviewImageUrl : ''}
              imageFit={ImageFit.cover}
              width={200}
              height={200}
            />
          }
          <Toggle
            defaultChecked={false}
            label={strings.AddSiteDesignIsDefaultLabel}
            onText="On"
            offText="Off"
            onChange={this.onIsDefault}
          />

          <div style={{ paddingTop: '10px', textAlign: 'right' }}>
            <ActionButton
              data-automation-id="test"
              iconProps={{ iconName: 'Add' }}
              allowDisabledFocus={true}
              title={"Add Site Script"}
              onClick={this.onAddScript}
            >
             {strings.AddSiteDesignPanelActionButtonText}
          </ActionButton>
          </div>
          <div>
            <p> {strings.AddSiteDesignPanelScriptOrderInfo} </p>
            <Dropdown
              placeholder={strings.AddSiteDesignPanelDropDownPlaceholderText}
              label={strings.AddSiteDesignPanelDropDownLabel}
              selectedKeys={this.state.selectedItems}
              onChange={this.onChangeMultiSelect}
              multiSelect
              options={this.state.sitescriptslist}

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
            <PrimaryButton onClick={this.onSave} text={strings.AddSiteDesignPanelButtonSaveText} disabled={this.state.disableSaveButton} />
            <DefaultButton onClick={this.onCancel} text={strings.AddSiteDesignPanelButtonCancelText} />
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
