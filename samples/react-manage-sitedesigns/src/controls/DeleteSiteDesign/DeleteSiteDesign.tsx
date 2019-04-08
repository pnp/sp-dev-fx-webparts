// João Mendes
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IDeleteSiteDesignProps } from './IDeleteSiteDesignProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { IDeleteSiteDesignState } from './IDeleteSiteDesignState';
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

export default class DeleteSiteDesign extends React.Component<IDeleteSiteDesignProps, IDeleteSiteDesignState> {
  private spService: spservice;
  public constructor(props) {
    super(props);
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = ({
      isLoading: false,
      readOnly: true,
      showPanel: false,
      siteDesignInfo: this.props.siteDesignInfo,
      showError: false,
      errorMessage: '',
      disableDeleteButton: false,
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
  private async onDelete(ev: React.MouseEvent<HTMLButtonElement>) {
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
      this.setState({ saving: true, disableDeleteButton: true });
     await this.spService.deleteSiteDesign(siteDesignUpdateInfo);
      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableDeleteButton: true, showError: true, errorMessage: error.message });
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
   * On Render
   *
   * @returns {React.ReactElement<IAddSiteDesignProps>}
   * @memberof EditSiteDesign
   */
  public render(): React.ReactElement<IDeleteSiteDesignProps> {
    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.medium}
          headerText={strings.DeleteSiteDesignPanelTitle}>
           <TextField
            label={strings.SiteDesignIdLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Id : ''}
            style={{ backgroundColor: "#f8f8f8" }}
           />
          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            required={true}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Title : ''}
            style={{ backgroundColor: "#f8f8f8" }}
             />
          <Dropdown
            placeholder="SelectWebTemplate"
            style={{ backgroundColor: "#f8f8f8" }}
            label="WebTemplate"
            selectedKey={this.state.selectedItemWebTemplate}
            options={[
              { key: 64, text: 'Team Site' },
              { key: 68, text: 'Comunication Site' }
            ]}
          />
          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Description : ''}
            style={{ backgroundColor: "#f8f8f8" }}
            multiline
            />
          <TextField
            label={strings.AddSiteDesignImageUrlLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.PreviewImageUrl : ''}
            style={{ backgroundColor: "#f8f8f8" }}
           />
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
            disabled={true}
          />

          <br />
          <DialogFooter>
            {
              this.state.saving &&
              <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                <Spinner size={SpinnerSize.small} ariaLive="assertive" />
              </div>
            }
            <PrimaryButton onClick={this.onDelete} text={strings.DeleteSiteDesignPanelButtonDeleteText} disabled={this.state.disableDeleteButton} />
            <DefaultButton onClick={this.onCancel} text={strings.DeleteSiteDesignPanelButtonCanceltext} />
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
