// João Mendes
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IEditSiteDesignProps } from './IEditSiteDesignProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { IEditSiteDesignState } from './IEditSiteDesignState';
import { SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignInfo, SiteDesignUpdateInfo } from '@pnp/sp';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IImageProps, Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class EditSiteDesign extends React.Component<IEditSiteDesignProps, IEditSiteDesignState> {
  private spService: spservice;
  public constructor(props) {
    super(props);
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onIsDefault = this.onIsDefault.bind(this);
    this.onGetErrorMessageDescription = this.onGetErrorMessageDescription.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onGetErrorMessageImageUrl = this.onGetErrorMessageImageUrl.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectedItemWebTemplate = this.onSelectedItemWebTemplate.bind(this);

    this.state = ({
      isLoading: false,
      readOnly: false,
      showPanel: false,
      siteDesignInfo: this.props.siteDesignInfo,
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      saving: false,
      selectedItemWebTemplate: parseInt(this.props.siteDesignInfo.WebTemplate)
    });
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberofEditSiteDesign
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
   * @memberof EditSiteDesign
   */
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();

    const siteDesignUpdateInfo: SiteDesignUpdateInfo= {
      Id: this.state.siteDesignInfo.Id,
      Description: this.state.siteDesignInfo.Description,
      IsDefault: this.state.siteDesignInfo.IsDefault,
      PreviewImageUrl: this.state.siteDesignInfo.PreviewImageUrl,
      Title: this.state.siteDesignInfo.Title,
      WebTemplate: this.state.siteDesignInfo.WebTemplate,

    };
    // read SiteScript
    try {
      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.updateSiteDesign(siteDesignUpdateInfo);

      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }

  }

  // Component Did Mount
  /**
   *
   * @memberof EditSiteDesign
   */
  public async  componentDidMount() {
    //
  }

  /**
   *  Select WebTemplate
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} event
   * @param {IDropdownOption} item
   * @memberof EditSiteDesign
   */
  private onSelectedItemWebTemplate(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    const siteDesignInfo = this.state.siteDesignInfo;
    siteDesignInfo.WebTemplate = item.key.toString();
    this.setState({ selectedItemWebTemplate: item.key, siteDesignInfo: siteDesignInfo });
  }

  // Validate Value
  /**
   *  Validate Title
   * @private
   * @param {string} value
   * @returns
   * @memberof EditSiteDesign
   */
  private onGetErrorMessageTitle(value: string) {
    let returnvalue: string = '';
    const siteDesignInfo = this.state.siteDesignInfo;

    if (value.trim().length > 0) {
      siteDesignInfo.Title = value;
      this.setState({ disableSaveButton: false, siteDesignInfo: siteDesignInfo });
    } else {
      siteDesignInfo.Title = value;
      this.setState({ errorMessage: '', disableSaveButton: true, siteDesignInfo: siteDesignInfo });
      returnvalue = "SiteDesign tile is required";
    }
    return returnvalue;
  }

  /**
   *  Validate Description
   *
   * @private
   * @param {string} value
   * @returns
   * @memberof EditSiteDesign
   */
  private onGetErrorMessageDescription(value: string) {

    let returnvalue: string = '';
    const siteDesignInfo = this.state.siteDesignInfo;
    siteDesignInfo.Description = value;
    this.setState({ siteDesignInfo: siteDesignInfo });

    return returnvalue;
  }
  /**
   *
   * @private
   * @param {string} value
   * @returns {string} returnvale
   * @memberof EditSiteDesign
   */
  private onGetErrorMessageImageUrl(value: string) {

    let returnvalue: string = '';
    const siteDesignInfo = this.state.siteDesignInfo;
    if (value.length > 0) {
      try {
        const _URL = new URL(value);
        siteDesignInfo.PreviewImageUrl = value;
      } catch (error) {
        siteDesignInfo.PreviewImageUrl = value;
        returnvalue = error.message;
      }
    } else {
      siteDesignInfo.PreviewImageUrl = value;
    }

    this.setState({ siteDesignInfo: siteDesignInfo });

    return returnvalue;
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} ev
   * @param {boolean} checked
   * @memberof EditSiteDesign
   */
  private onIsDefault(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    const siteDesignInfo = this.state.siteDesignInfo;
    siteDesignInfo.IsDefault = checked;
    this.setState({ siteDesignInfo: siteDesignInfo });
  }
  /**
   * On Render
   *
   * @returns {React.ReactElement<IAddSiteDesignProps>}
   * @memberof EditSiteDesign
   */
  public render(): React.ReactElement<IEditSiteDesignProps> {
    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.medium}
          headerText="Edit Site Design">
          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            required={true}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Title : ''}
            deferredValidationTime={200}
            onGetErrorMessage={this.onGetErrorMessageTitle} />
          <Dropdown
            placeholder={strings.DropDownSelectSiteScriptPlaceHolder}
            label={strings.DropDownSelectSiteScriptLabel}
            selectedKey={this.state.selectedItemWebTemplate}
            onChange={this.onSelectedItemWebTemplate}
            options={[
              { key: 64, text: strings.WebTemplateTeamSite },
              { key: 68, text:  strings.WebTemplateCommunicationSite }
            ]}

          />
          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Description : ''}
            deferredValidationTime={200}
            multiline
            onGetErrorMessage={this.onGetErrorMessageDescription} />
          <TextField
            label={strings.AddSiteDesignImageUrlLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.PreviewImageUrl : ''}
            deferredValidationTime={200}

            onGetErrorMessage={this.onGetErrorMessageImageUrl} />
          <br />
          {
            this.state.siteDesignInfo.PreviewImageUrl &&
            <Image src={this.state.siteDesignInfo ? this.state.siteDesignInfo.PreviewImageUrl : ''}
              imageFit={ImageFit.cover}
              width={200}
              height={200}
            />
          }
          <Toggle
            defaultChecked={this.state.siteDesignInfo.IsDefault}
            label={strings.AddSiteDesignIsDefaultLabel}
            onText="On"
            offText="Off"
            onChange={this.onIsDefault}
          />

          <br />
          <DialogFooter>
            {
              this.state.saving &&
              <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                <Spinner size={SpinnerSize.small} ariaLive="assertive" />
              </div>
            }
            <PrimaryButton onClick={this.onSave} text={strings.EditSiteDesignPanelButtonSaveText} disabled={this.state.disableSaveButton} />
            <DefaultButton onClick={this.onCancel} text={strings.EditSiteDesignPanelButtonCancelText} />
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
