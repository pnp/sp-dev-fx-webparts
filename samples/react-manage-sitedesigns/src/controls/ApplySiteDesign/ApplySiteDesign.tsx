
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IApplySiteDesignProps } from './IApplySiteDesignProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import * as strings from 'SiteDesignsWebPartStrings';
import { IApplySiteDesignState } from './IApplySiteDesignState';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IImageProps, Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IViewSite } from '../SelectSite/IViewSite';
import { IAddSiteDesignTaskToCurrentWebResult } from '../../services/IAddSiteDesignTaskToCurrentWebResult';

export default class ApplySiteDesign extends React.Component<IApplySiteDesignProps, IApplySiteDesignState> {

  private spService: spservice;
  private siteDesignsApplyedInfo: {addSiteDesignTaskResult:IAddSiteDesignTaskToCurrentWebResult, siteUrl:string}[] = [];
  private selectedWebSites: IViewSite[] = [];
  private SelectSite = React.lazy(() => import('../SelectSite/SelectSite' /* webpackChunkName: "selectsite" */));

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
      selectedItems: [],
      saving: false,
    });

    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.ontSelectSite = this.ontSelectSite.bind(this);
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof ApplySiteDesign
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
   * @memberof ApplySiteDesign
   */
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.setState({ saving: true, disableSaveButton: true, showError: false, errorMessage: '' });
    try {
      if (this.selectedWebSites.length > 0) {

        let addSiteDesignTaskResult: IAddSiteDesignTaskToCurrentWebResult = null;
        for (const item of this.selectedWebSites) {
          addSiteDesignTaskResult = await this.spService.AddSiteDesignTask(item.url,this.props.siteDesignInfo.Id);
          this.siteDesignsApplyedInfo.push({addSiteDesignTaskResult: addSiteDesignTaskResult, siteUrl:item.url});
        }
      }
      this.props.onDismiss(this.siteDesignsApplyedInfo,true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }
  }

  /**
   *
   * @private
   * @param {IViewSite[]} items
   * @memberof ApplySiteDesign
   */
  private ontSelectSite(items: IViewSite[]) {

    if (items.length > 0) {
      this.selectedWebSites = items;
      this.setState({
        disableSaveButton: false
      });
    } else {
      this.selectedWebSites = [];
      this.setState({
        disableSaveButton: true
      });
    }
  }

  /**
   * Load SiteScript
   * @private
   * @memberof ApplySiteDesign
   */
  private async loadSiteScripts() {
  }
  // Component Did Mount
  /**
   *
   * @memberof ApplySiteDesign
   */
  public async  componentDidMount() {
    // LoadTenantProperties
  }

  /**
   * On Render
   *
   * @returns {React.ReactElement<IApplySiteDesignProps>}
   * @memberof ApplySiteDesign
   */
  public render(): React.ReactElement<IApplySiteDesignProps> {

    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.medium}
          headerText={strings.ApplyPanelTitle}>

          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.Title}
            style={{ backgroundColor: "#f8f8f8" }}
          />
          <TextField
            label={"WebTemplate"}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.WebTemplate}
            style={{ backgroundColor: "#f8f8f8" }}
          />

          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.props.siteDesignInfo.Description}
            style={{ backgroundColor: "#f8f8f8" }}
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
          <div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <this.SelectSite
                context={this.props.context}
                onSelectItem={this.ontSelectSite}
              />
            </React.Suspense>
          </div>
          <br />
          <DialogFooter>
            {
              this.state.saving &&
              <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                <Spinner size={SpinnerSize.small} ariaLive="assertive" />
              </div>
            }
            <PrimaryButton onClick={this.onSave} text={strings.ApplyPanelApplyButtonLabel} disabled={this.state.disableSaveButton} />
            <DefaultButton onClick={this.onCancel} text={strings.ApplyPanelButtonCancelLabel}/>
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
