import * as React from 'react';
import styles from './PropertyPaneFilePicker.module.scss';
import { IPropertyPaneFilePickerHostProps, IPropertyPaneFilePickerHostState } from '.';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import * as strings from 'PropertyPaneFilePickerStrings';
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { css } from "@uifabric/utilities/lib/css";
import LinkFilePickerTab from './LinkFilePickerTab/LinkFilePickerTab';
import UploadFilePickerTab from './UploadFilePickerTab/UploadFilePickerTab';
import SiteFilePickerTab from './SiteFilePickerTab/SiteFilePickerTab';
import WebSearchTab from './WebSearchTab/WebSearchTab';
import RecentFilesTab from './RecentFilesTab/RecentFilesTab';
import { ItemType } from './IPropertyPaneFilePicker';

const ACCEPTABLE_FILE_EXTENSIONS: string = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg";

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
    const accepts: string = this.props.accepts !== undefined ? this.props.accepts
      : this.props.itemType === ItemType.Images && this.props.accepts === undefined ? ACCEPTABLE_FILE_EXTENSIONS
        : undefined;

    // Get a list of groups to display
    let groups:INavLinkGroup[] = [
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


    if (this.props.disableLocalUpload) {
      groups[0].links.splice(3,1);
    }

    if (this.props.disableWebSearchTab) {
      groups[0].links.splice(1,1);
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
          headerText={"File picker"}
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

  private _renderHeader = (): JSX.Element => {
    return <div className={"ms-Panel-header"}><p className={css("ms-Panel-headerText", styles.header)} role="heading">{strings.FilePickerHeader}</p></div>;
  }

  /**
   * Open the panel
   */
  private _handleOpenPanel = () => {
    this.setState({
      panelOpen: true
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

  private _handleLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    this.setState({ selectedTab: item.key });
  }

}
