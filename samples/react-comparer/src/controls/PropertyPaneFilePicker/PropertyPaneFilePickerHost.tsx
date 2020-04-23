import * as React from 'react';

// Our custom styles
import styles from './PropertyPaneFilePicker.module.scss';

// Our props
import { IPropertyPaneFilePickerHostProps, IPropertyPaneFilePickerHostState } from '.';

// Office Fabric controls
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { css } from "@uifabric/utilities/lib/css";

// Localization
import * as strings from 'PropertyPaneFilePickerStrings';

// Custom property pane file picker tabs
import LinkFilePickerTab from './LinkFilePickerTab/LinkFilePickerTab';
import UploadFilePickerTab from './UploadFilePickerTab/UploadFilePickerTab';
import SiteFilePickerTab from './SiteFilePickerTab/SiteFilePickerTab';
import WebSearchTab from './WebSearchTab/WebSearchTab';
import RecentFilesTab from './RecentFilesTab/RecentFilesTab';
import { ItemType } from './IPropertyPaneFilePicker';
import OneDriveTab from './OneDriveTab/OneDriveTab';

// The list of acceptable image file types
const ACCEPTABLE_IMAGEFILE_EXTENSIONS: string = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg";

export class PropertyPaneFilePickerHost extends React.Component<IPropertyPaneFilePickerHostProps, IPropertyPaneFilePickerHostState> {
  constructor(props: IPropertyPaneFilePickerHostProps) {
    super(props);

    this.state = {
      panelOpen: false,
      selectedTab: 'keyRecent',
      showFullNav: true
    };
  }

  public render(): JSX.Element {
    // If no acceptable file type was passed, and we're expecting images, set the default image filter
    const accepts: string = this.props.accepts !== undefined ? this.props.accepts
      : this.props.itemType === ItemType.Images && this.props.accepts === undefined ? ACCEPTABLE_IMAGEFILE_EXTENSIONS
        : undefined;

    // Get a list of groups to display
    let groups: INavLinkGroup[] = [
      {
        links: [
          {
            name: strings.RecentLinkLabel,
            url: '#recent',
            icon: 'Recent',
            key: 'keyRecent',
          },
          {
            name: strings.WebSearchLinkLabel,
            url: '#search',
            key: 'keyWeb',
            icon: 'Search',
          },
          {
            name: "OneDrive",
            url: '#onedrive',
            key: 'keyOneDrive',
            icon: 'OneDrive',
          },
          {
            name: strings.SiteLinkLabel,
            url: '#globe',
            key: 'keySite',
            icon: 'Globe',
          },
          {
            name: strings.UploadLinkLabel,
            url: '#upload',
            key: 'keyUpload',
            icon: 'System'
          },
          {
            name: strings.FromLinkLinkLabel,
            url: '#link',
            key: 'keyLink',
            icon: 'Link'
          }
        ]
      }
    ];

    // Hide tabs we don't want. Start from bottom of the list
    // so we're not changing the relative position of items
    // as we remove them.

    // I'm sure there is a better way to do this...

    // If we don't want local uploads, remove it from the list
    if (this.props.disableLocalUpload) {
      groups[0].links.splice(4, 1);
    }

    // If we don't want OneDrive, remove it from the list
    if (this.props.hasMySiteTab === false) {
      groups[0].links.splice(2, 1);
    }

    // If we don't want web search, remove it from the list
    if (this.props.disableWebSearchTab) {
      groups[0].links.splice(1, 1);
    }

    return (
      <div >
        <Label required={this.props.required}>{this.props.label}</Label>
        <PrimaryButton text={this.props.buttonLabel}
          onClick={this._handleOpenPanel}
          disabled={this.props.disabled} />

        <Panel isOpen={this.state.panelOpen}
          isBlocking={true}
          hasCloseButton={true}
          className={styles.filePicker}
          onDismiss={this._handleClosePanel}
          type={PanelType.extraLarge}
          isFooterAtBottom={true}
          onRenderNavigation={() => { return undefined; }}
          headerText={strings.FilePickerHeader}
          isLightDismiss={true}
          onRenderHeader={() => this._renderHeader()}
        >

          <div className={styles.nav}>
            <Nav
              groups={groups}
              selectedKey={this.state.selectedTab}
              onLinkClick={(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => this._handleLinkClick(ev, item)}
            />
          </div>
          <div className={styles.tabsContainer}>
            {this.state.selectedTab === "keyLink" && <LinkFilePickerTab
              itemType={this.props.itemType}
              allowExternalTenantLinks={true}
              accepts={accepts}
              context={this.props.webPartContext}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}
            {this.state.selectedTab === "keyUpload" && <UploadFilePickerTab
              itemType={this.props.itemType}
              context={this.props.webPartContext}
              accepts={accepts}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}
            {this.state.selectedTab === "keySite" && <SiteFilePickerTab
              itemType={this.props.itemType}
              context={this.props.webPartContext}
              accepts={accepts}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}
            {this.state.selectedTab === "keyWeb" && <WebSearchTab
              itemType={this.props.itemType}
              context={this.props.webPartContext}
              accepts={accepts}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}
            {this.state.selectedTab === "keyOneDrive" && <OneDriveTab
              itemType={this.props.itemType}
              context={this.props.webPartContext}
              accepts={accepts}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}
            {this.state.selectedTab === "keyRecent" && <RecentFilesTab
              itemType={this.props.itemType}
              context={this.props.webPartContext}
              accepts={accepts}
              onClose={() => this._handleClosePanel()}
              onSave={(value: string) => this._handleSave(value)}
            />}

          </div>
        </Panel>
      </div >
    );
  }

  /**
   * Renders the panel header
   */
  private _renderHeader = (): JSX.Element => {
    return <div className={"ms-Panel-header"}><p className={css("ms-Panel-headerText", styles.header)} role="heading">{strings.FilePickerHeader}</p></div>;
  }

  /**
   * Open the panel
   */
  private _handleOpenPanel = () => {
    this.setState({
      panelOpen: true,
      selectedTab: 'keyRecent'
    });
  }

  /**
   * Closes the panel
   */
  private _handleClosePanel = () => {
    this.setState({
      panelOpen: false
    });
  }

  /**
   * On save action
   */
  private _handleSave = (image: string) => {
    this.props.onChanged(image);
    this.setState({
      panelOpen: false
    });
  }

  /**
   * Changes the selected tab when a link is selected
   */
  private _handleLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    this.setState({ selectedTab: item.key });
  }

}
