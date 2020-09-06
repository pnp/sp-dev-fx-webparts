
// João Mendes
// Mar 2019
//
import * as React from 'react';
//import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { ISiteDesignRightsProps } from './ISiteRightsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IListViewItems } from './IListViewItems';
import spservice from '../../services/spservices';
import {
  Icon,
  IconType,
  CommandBar,
  Panel,
  PanelType,
  MessageBar,
  MessageBarType,
  Label,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  ImageFit,

} from 'office-ui-fabric-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'SiteDesignsWebPartStrings';
import { ISiteDesignRightsState } from './ISiteDesignRightsState';
import { SiteDesignInfo, SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignUpdateInfo, SiteDesignPrincipals } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import styles from './SiteDesignRights.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

// "https://outlook.office365.com/owa/service.svc/s/Ge…?email=anamendes@sitenanuvem.pt&UA=0&size=HR96x96"
// ListView Columns
const viewFields: IViewField[] = [
  {
    name: 'Icon',
    render: ((item: IListViewItems) => {
      // const image = <Icon  iconName="UserFollowed" />;
      const email = item.PrincipalName.replace('i:0#.f|membership|', "");
      const image = <Icon iconType={IconType.image} imageProps={{ imageFit: ImageFit.cover, src: `/_layouts/15/userphoto.aspx?size=s&accountname=${email}`, className: styles.image }} />;
      return image;
    }),
    maxWidth: 70,
  },
  {
    name: 'DisplayName',
    displayName: strings.ListViewColumnIdPrincipalNameLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 300,
    minWidth: 300
  }
];

export default class SiteDesignRights extends React.Component<ISiteDesignRightsProps, ISiteDesignRightsState> {

  private spService: spservice;
  private items: IListViewItems[] = [];
  private refreshParent: boolean = false;
  private siteDesignPrincipals: SiteDesignPrincipals[];

  private AddPrincipal = React.lazy(() => import('../AddPrincipal/AddPrincipal' /* webpackChunkName: "addprincipal" */));

  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      items: [],
      isLoading: false,
      disableCommandOption: true,
      showPanel: false,
      selectItem: [],
      panelMode: panelMode.New,
      hasError: false,
      errorMessage: '',
      showPanelAddScript: false,
      showDialogDelete: false,
      deleting: false,
      disableDeleteButton: false,
      showError: false
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.getSelection = this.getSelection.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDismissAddPrincipalPane = this.onDismissAddPrincipalPane.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  /**
   *
   * @private
   * @param {boolean} refresh
   * @memberof SiteDesignRights
   */
  private onDismissAddPrincipalPane(refresh: boolean) {

    this.setState({ showPanel: false });
    if (refresh) {
      this.refreshParent = true;
      this.loadPrincipals();
    }
  }

  // Get Selection Item from List
  /**
   *
   * @private
   * @param {IListViewItems[]} items
   * @memberof SiteDesignRights
   */
  private getSelection(items: IListViewItems[]) {
    if (items.length > 0) {
      this.setState({
        disableCommandOption: false,
        selectItem: items
      });
    } else {
      this.setState({
        disableCommandOption: true,
        selectItem: [],
        showPanel: false,
      });
    }

  }
  /**
   *   cancel event option SiteScrips
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof SiteDesignRights
   */
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {

    this.props.onDismiss(this.refreshParent);
  }

  private onCloseDialog(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.setState({
      showDialogDelete: false
    });
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof SiteDesignRights
   */
  private async onDeleteConfirm(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    try {
      let updateSiteDesignPrincipals: IListViewItems[] = this.items;
      for (const item of this.state.selectItem) {
        const idx = updateSiteDesignPrincipals.indexOf(item);
        if (idx !== -1) {
          updateSiteDesignPrincipals.splice(idx, 1);
        }
      }

      this.setState({ deleting: true, disableDeleteButton: true });
      const principals: string[] = [];
      for (const item of this.state.selectItem) {
        principals.push(item.PrincipalName.replace('i:0#.f|membership|', ""));
      }

      await this.spService.revokeSiteDesignRights(this.props.SiteDesignSelectedItem.Id, principals);
      this.refreshParent = true;
      this.setState({ deleting: false, disableDeleteButton: false, showDialogDelete: false, showError: false });
      this.loadPrincipals();

    } catch (error) {
      console.log(error.message);
      this.setState({ deleting: false, disableDeleteButton: true, showError: true, errorMessage: error.message });
    }
  }
  /**
   * Panel Dismiss CallBack
   *
   * @param {boolean} [refresh]
   * @returns
   * @memberof SiteDesignRights
   */
  public async onDismissPanel(refresh?: boolean) {
    this.setState({
      showPanel: false
    });
    if (refresh) {
      await this.loadPrincipals();
    }
    return;
  }
  // On New Item
  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteDesignRights
   */
  private onNewItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.New,
      showPanel: true,
    });
  }

  /**
   * On Delete
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteDesignRights
   */
  private onDeleteItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.Delete,
      showDialogDelete: true,
    });
  }

  /**
   *  Load SiteDesignRights
   *
   * @private
   * @memberof SiteDesignRights
   */
  private async   loadPrincipals() {
    this.items = [];
    this.setState({ isLoading: true });
    try {
      // check if user is Teanant Global Admin
      const isGlobalAdmin = await this.spService.checkUserIsGlobalAdmin();
      if (isGlobalAdmin) {
        // get SiteDesignRights for SiteDesign
        this.siteDesignPrincipals = await this.spService.getSiteDesignRights(this.props.SiteDesignSelectedItem.Id);

        if (this.siteDesignPrincipals.length > 0) {
          for (const siteDesignPrincipal of this.siteDesignPrincipals) {

            this.items.push(
              {
                key: siteDesignPrincipal.PrincipalName,
                DisplayName: siteDesignPrincipal.DisplayName,
                PrincipalName: siteDesignPrincipal.PrincipalName
              }
            );
          }
        }
        this.setState({ items: this.items, isLoading: false, disableCommandOption: true });
      } else {
        this.setState({
          items: this.items,
          hasError: true,
          errorMessage: strings.ErrorMessageUserNotAdmin,
          isLoading: false
        });
      }
    }
    catch (error) {
      this.setState({
        items: this.items,
        hasError: true,
        errorMessage: error.message,
        isLoading: false
      });
    }

  }
  /**  Refresh
   *
   * @param {React.MouseEvent<HTMLElement>} ev
   * @memberof SiteDesignRights
   */
  public onRefresh(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    //   loadPrincipals
    this.loadPrincipals();
  }

  /**
   * Component Did Mount
   *
   * @memberof SiteDesignRights
   */
  public async  componentDidMount() {
    //   loadPrincipals
    await this.loadPrincipals();
  }
  // On Render
  public render(): React.ReactElement<ISiteDesignRightsProps> {
    return (
      <div>
        <Panel isOpen={this.props.showPanel} onDismiss={this.onCancel} type={PanelType.medium} headerText={strings.SiteDesignRightsPanelTitle}>
          <div>
            <span className={styles.label}>{strings.SiteDesignIdLabel}</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.Id}</span>
          </div>
          <div>
            <span className={styles.label}>{strings.SiteDesignRightsPanelTitle}</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.Title}</span>
          </div>
          <div>
            <span className={styles.label}>{strings.WebTemplateLabel}</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.WebTemplate === '64' ? strings.WebTemplateTeamSite : strings.WebTemplateCommunicationSite}</span>
          </div>
          <br />
          {
            this.state.isLoading ?
              <Spinner size={SpinnerSize.large} label={strings.LoadingLabel} ariaLive="assertive" />
              :
              this.state.hasError ?
                <MessageBar
                  messageBarType={MessageBarType.error}>
                  <span>{this.state.errorMessage}</span>
                </MessageBar>
                :
                <div style={{ marginBottom: 10 }}>
                  <CommandBar
                    items={[
                      {
                        key: 'newItem',
                        name: strings.CommandbarNewLabel,
                        iconProps: {
                          iconName: 'Add'
                        },
                        onClick: this.onNewItem,
                      },
                      {
                        key: 'delete',
                        name: strings.CommandbarDeleteLabel,
                        iconProps: {
                          iconName: 'Delete'
                        },
                        onClick: this.onDeleteItem,
                        disabled: this.state.disableCommandOption,
                      }
                    ]}
                    farItems={[
                      {
                        key: 'refresh',
                        name: strings.CommandbarRefreshLabel,
                        iconProps: {
                          iconName: 'Refresh'
                        },
                        onClick: this.onRefresh,
                      }
                    ]}
                  />
                </div>
          }
          {
            !this.state.hasError && !this.state.isLoading &&
            <ListView
              items={this.state.items}
              viewFields={viewFields}
              compact={false}
              selectionMode={SelectionMode.multiple}
              selection={this.getSelection}
              showFilter={true}
              filterPlaceHolder={strings.SearchPlaceholder}
            />
          }
          {
            this.state.showPanel && this.state.panelMode == panelMode.New &&
            <React.Suspense fallback={<div>Loading...</div>}>
              <this.AddPrincipal
                showPanel={this.state.showPanel}
                onDismiss={this.onDismissAddPrincipalPane}
                context={this.props.context}
                siteDesignInfo={this.props.SiteDesignSelectedItem}
              />
            </React.Suspense>
          }

          <Dialog
            hidden={!this.state.showDialogDelete}
            onDismiss={this.onCloseDialog}

            dialogContentProps={{
              type: DialogType.normal,
              title: strings.DialogConfirmDeleteTitle,
            }}
            modalProps={{
              isBlocking: true,

            }}
          >
            <p>{strings.DialogConfirmDeleteText}</p>
            <br />
            {
              this.state.showError &&
              <div style={{ marginTop: '15px' }}>
                <MessageBar messageBarType={MessageBarType.error} >
                  <span>{this.state.errorMessage}</span>
                </MessageBar>
              </div>
            }
            <br />
            <DialogFooter>
              {
                this.state.deleting &&
                <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                  <Spinner size={SpinnerSize.small} ariaLive="assertive" />
                </div>
              }
              <DefaultButton onClick={this.onDeleteConfirm} text={strings.ButtonDeleteLabel} disabled={this.state.disableDeleteButton} />
              <PrimaryButton onClick={this.onCloseDialog} text={strings.ButtonCancelLabel} />
            </DialogFooter>
          </Dialog>
        </Panel>
      </div >
    );
  }
}
