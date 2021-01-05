//
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from './TenantProperties.module.scss';
import { ITenantPropertiesProps } from './ITenantPropertiesProps';
import { ITenantPropertiesState } from './ITenantPropertiesState';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IListViewItems } from '../components/IListViewItems';
import spservice from '../../../services/spservices';
import { ITenantProperty } from '../../../services/ITenantProperty';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import TenantProperyPanel from './TenantPropertyPanel';
import { panelMode } from './ITenantPropertyPanelProps';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'TenantPropertiesWebPartStrings';
import { SyntheticEvent } from 'react';

// ListView Columns
const viewFields: IViewField[] = [
  {
    name: 'Prop',
    render: ((item: IListViewItems) => {
      return <Icon iconName="Tag" />;
    }),
    maxWidth: 50,
  },
  {
    name: 'key',
    displayName: strings.ListViewColumnKeyLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 250
  },
  {
    name: 'tenantPropertyValue',
    displayName: strings.ListViewColumnValueLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 250
  },
  {
    name: 'tenantPropertyDescription',
    displayName: strings.ListViewColumnDescriptionLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 200
  }

];

export default class TenantProperties extends React.Component<ITenantPropertiesProps, ITenantPropertiesState> {

  private spService: spservice;
  private items: IListViewItems[];
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
      errorMessage: ''
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this._getSelection = this._getSelection.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
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
  // Panel Dismiss CallBack
  // @param refresh refresh list?
  public async onDismissPanel(ev?: SyntheticEvent<HTMLElement, Event>, refresh?: boolean) {
    this.setState({
      showPanel: false
    });
    if (refresh) {
      await this.loadTenantProperties();
    }
    return;
  }
  // On New Item
  private onNewItem(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    this.setState({
      panelMode: panelMode.New,
      showPanel: true,
      selectItem: { key: '', tenantPropertyValue: '', tenantPropertyDescription: '', tenantPropertyComment: '' }
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
  // Load Tenant Properties
  private async loadTenantProperties() {
    this.items = [];
    this.setState({ isLoading: true });
    try {
      // check if user is Teanant Global Admin
      const isGlobalAdmin = await this.spService.checkUserIsGlobalAdmin();
      if (isGlobalAdmin) {
        // Get Tenant Properties
        const properties: ITenantProperty = await this.spService.getTenantProperties();
        if (properties) {
          const keys: string[] = Object.keys(properties);
          keys.map((key: string): any => {
            const property: ITenantProperty = properties[key];
            this.items.push(
              {
                key: key,
                tenantPropertyValue: property.Value,
                tenantPropertyDescription: property.Description,
                tenantPropertyComment: property.Comment
              }
            );
          });
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
    this.loadTenantProperties();
  }
  // Component Did Mount
  public async  componentDidMount() {
    // LoadTenantProperties
    await this.loadTenantProperties();
  }
  // On Render
  public render(): React.ReactElement<ITenantPropertiesProps> {
    return (
      <div className={styles.tenantProperties}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          className={styles.webparttitle}
          updateProperty={this.props.updateProperty} />
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
          this.state.showPanel &&
          <TenantProperyPanel
            mode={this.state.panelMode}
            TenantProperty={this.state.selectItem}
            onDismiss={this.onDismissPanel}
            showPanel={this.state.showPanel}
            context={this.props.context}
          />
        }
      </div>
    );
  }
}
