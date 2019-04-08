
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from './SiteDesigns.module.scss';
import { ISiteDesignsProps } from './ISiteDesignsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IListViewItems } from '../components/IListViewItems';
import spservice from '../../../services/spservices';
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { panelMode } from './IEnumPanel';
import {
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  ImageFit,
  PrimaryButton,
  Link
} from 'office-ui-fabric-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'SiteDesignsWebPartStrings';
import { ISiteDesignState } from './ISiteDesignState';
import { SiteDesignInfo, Item } from '@pnp/sp';
import { IAddSiteDesignTaskToCurrentWebResult } from '../../../services/IAddSiteDesignTaskToCurrentWebResult';

//import { SiteScripts } from './../../../controls/sitescripts/SiteScripts';


// ListView Columns
const viewFields: IViewField[] = [
  {
    name: 'Image',
    render: ((item: IListViewItems) => {
      let image;
      item.PreviewImageUrl ?
        image = <Icon iconType={IconType.image} imageProps={{ src: item.PreviewImageUrl, imageFit: ImageFit.cover }} /> :
        image = <Icon iconName="FileImage" />;
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
    name: 'WebTemplate',
    displayName: strings.ListViewColumnWebTemplateLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 65
  },
  {
    name: 'numberSiteScripts',
    displayName: strings.ListViewColumnNumberSiteScriptsLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 60
  }
];
export default class SiteDesigns extends React.Component<ISiteDesignsProps, ISiteDesignState> {
  private spService: spservice;
  private items: IListViewItems[];
  private siteDesignsRunStatus: { addSiteDesignTaskResult: IAddSiteDesignTaskToCurrentWebResult, siteUrl: string }[] = [];

  private SiteScriptsList = React.lazy(() => import('../../../controls/siteScripts/SiteScripts' /* webpackChunkName: "sitescriptslist" */));
  private AddSiteDesign = React.lazy(() => import('./../../../controls/AddSiteDesign/AddSiteDesign' /* webpackChunkName: "addsitedesign" */));
  private EditSiteDesign = React.lazy(() => import('./../../../controls/EditSiteDesign/EditSiteDesign' /* webpackChunkName: "editsitedesign" */));
  private DeleteSiteDesign = React.lazy(() => import('./../../../controls/DeleteSiteDesign/DeleteSiteDesign' /* webpackChunkName: "deletesitedesign" */));
  private SiteDesignRights = React.lazy(() => import('./../../../controls/SiteDesignRights/SiteDesignRights' /* webpackChunkName: "sitedesignrights" */));
  private ApplySiteDesign = React.lazy(() => import('./../../../controls/ApplySiteDesign/ApplySiteDesign' /* webpackChunkName: "applysitedesign" */));

  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      items: [],
      isLoading: false,
      disableCommandOption: true,
      showPanel: false,
      selectItem: null,
      panelMode: panelMode.New,
      hasError: false,
      errorMessage: '',
      siteDesignRunning: false,
      siteDesignRunningMessage: []
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this._getSelection = this._getSelection.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onApplyItem = this.onApplyItem.bind(this);
    this.onRights = this.onRights.bind(this);
    this.onSiteScripts = this.onSiteScripts.bind(this);
    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onDismissApplyPanel = this.onDismissApplyPanel.bind(this);
  }
  // Get Selection Item from List
  private _getSelection(items: IListViewItems[]) {
    if (items.length > 0) {
      this.setState({
        disableCommandOption: false,
        selectItem: items[0]
      });
    } else {
      this.setState({
        disableCommandOption: true,
        selectItem: null,
        showPanel: false,
      });
    }
  }

  /**
   *
   *
   * @param {IAddSiteDesignTaskToCurrentWebResult[]} siteDesignsRunning
   * @param {boolean} [refresh]
   * @returns
   * @memberof SiteDesigns
   */
  public async onDismissApplyPanel(siteDesignsRunning: { addSiteDesignTaskResult: IAddSiteDesignTaskToCurrentWebResult, siteUrl: string }[], refresh?: boolean) {
    let isRunning: boolean = false;
    let totalRunningSiteDesigns: number = 0;
    let siteDesignRunningMessage: string[] = [`The Site Design ${siteDesignsRunning[0].addSiteDesignTaskResult.SiteDesignID} is beeing applyed ...`];
    if (siteDesignsRunning && siteDesignsRunning.length > 0) {

      totalRunningSiteDesigns = siteDesignsRunning.length;
      this.siteDesignsRunStatus = siteDesignsRunning;
      this.setState({
        siteDesignRunning: true,
        siteDesignRunningMessage: siteDesignRunningMessage
      });
      const runTimer = setInterval(async () => {

        siteDesignRunningMessage = [];
        siteDesignRunningMessage = [`The Site Design :${siteDesignsRunning[0].addSiteDesignTaskResult.SiteDesignID} was applyed.`];
        for (const siteDesignApplyed of siteDesignsRunning) {
          isRunning = true;

          const result = await this.spService.getSiteDesignTask(siteDesignApplyed.siteUrl, siteDesignApplyed.addSiteDesignTaskResult.ID);
          isRunning = !result['@odata.null'] ? true : false;

          if (!isRunning) {

            totalRunningSiteDesigns = totalRunningSiteDesigns - 1;
            siteDesignRunningMessage.push(` site: ${siteDesignApplyed.siteUrl} : Applyed`);

          } else {

            siteDesignRunningMessage.push(`site: ${siteDesignApplyed.siteUrl} : Applying...`);

          }
        }
           //
           if (totalRunningSiteDesigns <= 0) {
            clearInterval(runTimer);
            this.setState({
              siteDesignRunning: true,
              siteDesignRunningMessage: siteDesignRunningMessage
            });
          }
      }
        , 5000);
    }

    this.setState({
      showPanel: false
    });
    if (refresh) {
      await this.loadSiteDesignsProperties();
    }
    return;
  }
  // Panel Dismiss CallBack
  // @param refresh refresh list?
  public async onDismissPanel(refresh?: boolean) {
    this.setState({
      showPanel: false
    });
    if (refresh) {
      await this.loadSiteDesignsProperties();
    }
    return;
  }
  // On New Item
  private onNewItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.New,
      showPanel: true,
    });
  }
  // On Delete
  private onDeleteItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.Delete,
      showPanel: true,
    });
  }
  // On Edit item
  private onEditItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.edit,
      showPanel: true
    });
  }

  /**
   * On Appply item
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteDesigns
   */
  private onApplyItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.Apply,
      showPanel: true
    });
  }

  /**
   *   On Rights Event
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteDesigns
   */
  private onRights(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.Rights,
      showPanel: true
    });
  }

  /**
   *   On SiteScripts
   *
   * @private
   * @param {React.MouseEvent<HTMLElement>} e
   * @memberof SiteDesigns
   */
  private onSiteScripts(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.SiteScripts,
      showPanel: true
    });
  }


  private checkSiteDesignRunTask(siteDesignApplyedInfo: IAddSiteDesignTaskToCurrentWebResult) {
    try {

    } catch (error) {

    }
  }
  //
  /**
   *
   *
   * @private
   * @memberof SiteDesigns
   */
  private async loadSiteDesignsProperties() {
    this.items = [];
    this.setState({ isLoading: true });
    try {
      // check if user is Teanant Global Admin
      const isGlobalAdmin = await this.spService.checkUserIsGlobalAdmin();
      if (isGlobalAdmin) {
        // Get Tenant Properties
        const siteDesigns: SiteDesignInfo[] = await this.spService.getSiteDesigns();
        for (const siteDesign of siteDesigns) {
          this.items.push(
            {
              key: siteDesign.Id,
              Description: siteDesign.Description,
              Id: siteDesign.Id,
              Title: siteDesign.Title,
              WebTemplate: siteDesign.WebTemplate,
              SiteScriptIds: siteDesign.SiteScriptIds.toString(),
              numberSiteScripts: siteDesign.SiteScriptIds.length,
              IsDefault: siteDesign.IsDefault,
              PreviewImageAltText: siteDesign.PreviewImageAltText,
              PreviewImageUrl: siteDesign.PreviewImageUrl,
              Version: siteDesign.Version,
              runStatus: false
            }
          );
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
  // Refresh
  public onRefresh(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    // LoadTenantProperties
    this.loadSiteDesignsProperties();
  }
  // Component Did Mount
  public async  componentDidMount() {
    // LoadTenantProperties
    await this.loadSiteDesignsProperties();
  }
  // On Render
  public render(): React.ReactElement<ISiteDesignsProps> {
    return (
      <div className={styles.siteDesigns}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          className={styles.webPartTitle}
          updateProperty={this.props.updateProperty} />
        {
          this.state.isLoading ?
            <Spinner size={SpinnerSize.large} label={strings.LoadingLabel} ariaLive="assertive" />
            :
            this.state.hasError ?
              <MessageBar
                messageBarType={MessageBarType.error}>
                <span>{this.state.errorMessage}</span>
              </MessageBar >
              :
              this.state.siteDesignRunning ?
                <MessageBar
                  truncated={true}
                  isMultiline={false}
                  onDismiss={ (ev) => {this.setState({siteDesignRunning: false});}}
                  messageBarType={MessageBarType.info}
                  styles={{
                    root: {
                      background: 'rgba(113, 175, 229, 0.2)',
                      color: '#00188f'
                    },
                    icon: {
                      color: '#00188f'
                    }
                  }}
                >
                  {
                    this.state.siteDesignRunningMessage.map((message) =>{
                      return (
                        <span>{message}<br/></span>
                      );
                    })

                  }
                </MessageBar>
                :
                null
        }

        {
          !this.state.hasError && !this.state.isLoading &&
          < div className={styles.commandBar}>
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
                  disabled: this.state.disableCommandOption,
                },
                {
                  key: 'delete',
                  name: strings.CommandbarDeleteLabel,
                  iconProps: {
                    iconName: 'Delete'
                  },
                  onClick: this.onDeleteItem,
                  disabled: this.state.disableCommandOption,
                },
                {
                  key: 'apply',
                  name: strings.CommandbarApplyLabel,
                  iconProps: {
                    iconName: 'Play'
                  },
                  onClick: this.onApplyItem,
                  disabled: this.state.disableCommandOption,
                },
                {
                  key: 'rights',
                  name: strings.CommandbarRightsLabel,
                  iconProps: {
                    iconName: 'Permissions'
                  },
                  onClick: this.onRights,
                  disabled: this.state.disableCommandOption,
                },
                {
                  key: 'sitescripts',
                  name: strings.CommandbarSiteScriptsLabel,
                  iconProps: {
                    iconName: 'FileCode'
                  },
                  onClick: this.onSiteScripts,
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
            selectionMode={SelectionMode.single}
            selection={this._getSelection}
            showFilter={true}
            filterPlaceHolder={strings.SearchPlaceholder}
          />

        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.SiteScripts &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.SiteScriptsList
              mode={this.state.panelMode}
              SiteDesignSelectedItem={this.state.selectItem}
              onDismiss={this.onDismissPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
            />
          </React.Suspense>
        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.New &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.AddSiteDesign
              mode={this.state.panelMode}
              onDismiss={this.onDismissPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
            />
          </React.Suspense>
        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.edit &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.EditSiteDesign
              mode={this.state.panelMode}
              onDismiss={this.onDismissPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
              siteDesignInfo={this.state.selectItem}
            />
          </React.Suspense>
        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.Delete &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.DeleteSiteDesign
              mode={this.state.panelMode}
              onDismiss={this.onDismissPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
              siteDesignInfo={this.state.selectItem}
            />
          </React.Suspense>
        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.Rights &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.SiteDesignRights
              mode={this.state.panelMode}
              onDismiss={this.onDismissPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
              SiteDesignSelectedItem={this.state.selectItem}
            />
          </React.Suspense>
        }
        {
          this.state.showPanel && this.state.panelMode == panelMode.Apply &&
          <React.Suspense fallback={<div>Loading...</div>}>
            <this.ApplySiteDesign
              onDismiss={this.onDismissApplyPanel}
              showPanel={this.state.showPanel}
              context={this.props.context}
              siteDesignInfo={this.state.selectItem}
            />
          </React.Suspense>
        }
      </div >
    );
  }
}
