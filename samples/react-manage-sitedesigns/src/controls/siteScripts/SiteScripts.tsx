
// João Mendes
// Mar 2019
//
import * as React from 'react';
//import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { ISiteScriptsProps } from './ISiteScriptsProps';
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

} from 'office-ui-fabric-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'SiteDesignsWebPartStrings';
import { ISiteScriptsState } from './ISiteScriptsState';
import { SiteDesignInfo, SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignUpdateInfo } from '@pnp/sp';
import { panelMode } from '../../webparts/siteDesigns/components/IEnumPanel';
import styles from './siteScript.module.scss';

// ListView Columns
const viewFields: IViewField[] = [
  {
    name: 'Image',
    render: ((item: IListViewItems) => {
      const image = <Icon iconName="FileCode" />;
      return image;
    }),
    maxWidth: 70,
  },
  {
    name: 'Id',
    displayName: strings.ListViewColumnIdLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 200
  },
  {
    name: 'Title',
    displayName: strings.TitleFieldLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 250
  },
  {
    name: 'Description',
    displayName: strings.ListViewColumnDescriptionLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 250
  },
  {
    name: 'Version',
    displayName: "Version",
    sorting: true,
    isResizable: true,
    maxWidth: 65
  }
];

export default class SiteScripts extends React.Component<ISiteScriptsProps, ISiteScriptsState> {
  private spService: spservice;
  private items: IListViewItems[] = [];
  private refreshParent: boolean = false;
  private siteScripts: string[];

  private AddSiteScriptToSiteDesignDialog = React.lazy(() => import('../AddSiteScriptToSiteDesign/AddSiteScriptToSiteDesign' /* webpackChunkName: "addscriptdialog" */));
  private EditScriptDialog = React.lazy(() => import('../../controls/EditSiteScript/EditSiteScript' /* webpackChunkName: "editscriptdialog" */));
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
      showError: false,
      showCommmandEdit: ''
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.getSelection = this.getSelection.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDismissAddScriptPanel = this.onDismissAddScriptPanel.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  /**
   *
   *
   * @private
   * @param {boolean} refresh
   * @memberof SiteScripts
   */
  private onDismissAddScriptPanel(refresh: boolean) {

    this.setState({ showPanel: false });
    if (refresh) {
      this.refreshParent = true;
      this.loadSiteScripts();
    }
  }

  // Get Selection Item from List
  /**
   *
   *
   * @private
   * @param {IListViewItems[]} items
   * @memberof SiteScripts
   */
  private getSelection(items: IListViewItems[]) {
    if (items.length > 0) {

      this.setState({
        disableCommandOption: false,
        selectItem: items,
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
   * @memberof SiteScripts
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
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof SiteScripts
   */
  private async onDeleteConfirm(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    try {
      let updateSiteScripts: string[] = this.siteScripts;
      for (const item of this.state.selectItem) {
        const idx = updateSiteScripts.indexOf(item.Id);
        if (idx !== -1) {
          updateSiteScripts.splice(idx, 1);
        }
      }
      this.setState({ deleting: true, disableDeleteButton: true });
      const siteDesignUpdateInfo: SiteDesignUpdateInfo = { Id: this.props.SiteDesignSelectedItem.Id, SiteScriptIds: updateSiteScripts };
      const result = await this.spService.updateSiteDesign(siteDesignUpdateInfo);
      this.refreshParent = true;
      this.setState({ deleting: false, disableDeleteButton: false, showDialogDelete: false, showError: false });
      this.loadSiteScripts();
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
   * @memberof SiteScripts
   */
  public async onDismissPanel(refresh?: boolean) {
    this.setState({
      showPanel: false
    });
    if (refresh) {
      await this.loadSiteScripts();
    }
    return;
  }
  // On New Item
  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteScripts
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
   * @memberof SiteScripts
   */
  private onDeleteItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.Delete,
      showDialogDelete: true,
    });
  }

  /**
   * On Edit item
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteScripts
   */
  private onEditItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.edit,
      showPanel: true
    });
  }

  /**
   *  Load SiteScripts
   *
   * @private
   * @memberof SiteScripts
   */
  private async loadSiteScripts() {
    this.items = [];
    this.setState({ isLoading: true });
    try {
      // check if user is Teanant Global Admin
      const isGlobalAdmin = await this.spService.checkUserIsGlobalAdmin();
      if (isGlobalAdmin) {
        // get SiteScripts for SiteDesign
        const siteDesignInfo: SiteDesignInfo = await this.spService.getSiteDesignMetadata(this.props.SiteDesignSelectedItem.Id);
        this.siteScripts = siteDesignInfo.SiteScriptIds;

        if (this.siteScripts.length > 0) {
          for (const siteScriptId of this.siteScripts) {
            if (siteScriptId === "") continue;
            const siteScript: SiteScriptInfo = await this.spService.getSiteScriptMetadata(siteScriptId);
            this.items.push(
              {
                key: siteScript.Id,
                Description: siteScript.Description,
                Id: siteScript.Id,
                Title: siteScript.Title,
                Version: siteScript.Version
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
   * @memberof SiteScripts
   */
  public onRefresh(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    // loadSiteScripts
    this.loadSiteScripts();
  }

  /**
   * Component Did Mount
   *
   * @memberof SiteScripts
   */
  public async  componentDidMount() {
    // loadSiteScripts
    await this.loadSiteScripts();
  }
  // On Render
  public render(): React.ReactElement<ISiteScriptsProps> {
    return (
      <div>
        <Panel isOpen={this.props.showPanel} onDismiss={this.onCancel} type={PanelType.large} headerText="Site Scripts">
          <div>
            <span className={styles.label}>SiteDesign Id:</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.Id}</span>
          </div>
          <div>
            <span className={styles.label}>Title:</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.Title}</span>
          </div>
          <div>
            <span className={styles.label}>WebTemplate:</span>
            <span className={styles.title}>{this.props.SiteDesignSelectedItem.WebTemplate === '64' ? "Team Site" : "Communication Site"}</span>
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
                        key: 'edit',
                        name: strings.CommandbarEditLabel,
                        iconProps: {
                          iconName: 'Edit'
                        },
                        onClick: this.onEditItem,
                        disabled: this.state.selectItem.length ===0 ?  true : this.state.selectItem.length > 1 ? true : false,

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
              <this.AddSiteScriptToSiteDesignDialog
                showPanel={this.state.showPanel}
                onDismiss={this.onDismissAddScriptPanel}
                context={this.props.context}
                siteDesignInfo={this.props.SiteDesignSelectedItem}

              />
            </React.Suspense>
          }
           {
            this.state.showPanel && this.state.panelMode == panelMode.edit &&
            <React.Suspense fallback={<div>Loading...</div>}>
              <this.EditScriptDialog
                hideDialog={!this.state.showPanel}
                onDismiss={this.onDismissAddScriptPanel}
                context={this.props.context}
                siteScriptId={this.state.selectItem[0].Id}

              />
            </React.Suspense>
          }
          <Dialog
            hidden={!this.state.showDialogDelete}
            onDismiss={this.onCloseDialog}

            dialogContentProps={{
              type: DialogType.normal,
              title: strings.DeleteSiteScriptDialogConfirmTitle,
            }}
            modalProps={{
              isBlocking: true,

            }}
          >
            <p>{strings.DeleteSiteScriptDialogConfirmText}</p>
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
