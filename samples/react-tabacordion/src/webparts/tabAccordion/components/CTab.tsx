import * as React from 'react';
import styles from './CTab.module.scss';
import { ICTabProps } from './ICTabProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Editor } from '@tinymce/tinymce-react';
import {
  Text,
  Stack,
  IStackTokens,
  ActionButton,
  IIconProps,
  MessageBar,
  MessageBarType,
  IconButton,
  Spinner,
  SpinnerSize,
  TooltipHost,
  Icon,
  DefaultButton,
  IContextualMenuProps
} from '@fluentui/react';
import { getTheme } from '@fluentui/react/lib/Styling';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

interface ICTabState {
  selectedKey: string;
  showTinyMCEInitMsg: boolean;
  showNotification: boolean;
  notificationMessage: string;
  notificationType: MessageBarType;
  currentUser?: any;
  isImporting: boolean;
  showExportDialog: boolean;
  isLoading: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 10,
};

const addIcon: IIconProps = { iconName: 'Add' };
const settingsIcon: IIconProps = { iconName: 'Settings' };
const downloadIcon: IIconProps = { iconName: 'Download' };
const uploadIcon: IIconProps = { iconName: 'Upload' };
const linkIcon: IIconProps = { iconName: 'Link' };
const duplicateIcon: IIconProps = { iconName: 'Copy' };
const deleteIcon: IIconProps = { iconName: 'Delete' };

export default class CTab extends React.Component<ICTabProps, ICTabState> {
  private fileInputRef = React.createRef<HTMLInputElement>();

  constructor(props: ICTabProps) {
    super(props);
    this.state = {
      selectedKey: '0',
      showTinyMCEInitMsg: false,
      showNotification: false,
      notificationMessage: '',
      notificationType: MessageBarType.info,
      isImporting: false,
      showExportDialog: false,
      isLoading: false
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ showTinyMCEInitMsg: true });
    setTimeout(() => {
      this.setState({ showTinyMCEInitMsg: false });
    }, 3000);

    if (this.props.enableDeepLinking) {
      this.handleHashChange();
      window.addEventListener('hashchange', this.handleHashChange);
    }

    if (this.props.enableAudienceTargeting && this.props.graphService) {
      this.setState({ isLoading: true });
      try {
        const currentUser = await this.props.graphService.getCurrentUser();
        this.setState({ currentUser });
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  public componentWillUnmount(): void {
    if (this.props.enableDeepLinking) {
      window.removeEventListener('hashchange', this.handleHashChange);
    }
  }

  private handleHashChange = (): void => {
    if (!this.props.enableDeepLinking) return;

    // Get the hash from URL
    const hash = window.location.hash.substring(1);

    // Check if hash is trying to link to a tab
    if (hash.startsWith('tab-')) {
      const tabIndex = hash.replace('tab-', '');

      // Check if this tab index exists
      if (this.props.tabs && this.props.tabs.length > parseInt(tabIndex)) {
        this.setState({ selectedKey: tabIndex });
      }
    }
  };

  public handleEditorChange = (content: string, editor: any) => {
    const id = editor.id.split("-editor-")[1];
    this.props.tabs[id].Content = content;
  }

  private handleTabChange = (index: string): void => {
    this.setState({ selectedKey: index });

    // Update the URL hash for deep linking
    if (this.props.enableDeepLinking) {
      const newUrl = `${window.location.pathname}${window.location.search}#tab-${index}`;
      window.history.replaceState(null, document.title, newUrl);
    }
  }

  // Generate custom styles based on props
  private getCustomStyles() {
    const theme = this.props.themeVariant || getTheme();
    const {
      // Color properties
      headerBackgroundColor,
      headerTextColor,
      activeHeaderBackgroundColor,
      activeHeaderTextColor,
      useThemeColor = true,

      // Font properties
      headerFontSize = 14, // Default: 14px
      headerFontFamily = '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif', // Default font
      headerFontWeight = 'normal', // Default: normal
      headerTextTransform = 'none', // Default: none

      // Content font properties
      contentFontSize = 16, // Default: 16px
      contentFontFamily = '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif' // Default font
    } = this.props;

    // Default theme-based colors
    const defaultHeaderBg = theme.palette.neutralLighter;
    const defaultHeaderText = theme.palette.neutralPrimary;
    const defaultActiveHeaderBg = theme.palette.white;
    const defaultActiveHeaderText = useThemeColor ? theme.palette.themePrimary : theme.palette.neutralPrimary;

    // Use custom colors if provided, otherwise use defaults
    const tablinksStyle = {
      backgroundColor: headerBackgroundColor || defaultHeaderBg
    };

    const tablinkStyle = {
      backgroundColor: headerBackgroundColor || defaultHeaderBg,
      color: headerTextColor || defaultHeaderText,
      fontSize: `${headerFontSize}px`,
      fontFamily: headerFontFamily,
      fontWeight: headerFontWeight,
      textTransform: headerTextTransform as any // TypeScript needs help here
    };

    const tablinkActiveStyle = {
      backgroundColor: activeHeaderBackgroundColor || defaultActiveHeaderBg,
      color: activeHeaderTextColor || defaultActiveHeaderText,
      fontSize: `${headerFontSize}px`,
      fontFamily: headerFontFamily,
      fontWeight: headerFontWeight === 'normal' ? 'bold' : headerFontWeight, // Make active tabs bold by default
      textTransform: headerTextTransform as any
    };

    const activeIndicatorStyle = {
      backgroundColor: activeHeaderTextColor || (useThemeColor ? theme.palette.themePrimary : theme.palette.neutralPrimary)
    };

    const contentStyle = {
      fontSize: `${contentFontSize}px`,
      fontFamily: contentFontFamily
    };

    // Webpart title style
    const webpartTitleStyle = {
      fontFamily: headerFontFamily,
      fontWeight: headerFontWeight === 'normal' ? '600' : headerFontWeight, // Make title bolder
      textTransform: headerTextTransform as any,
      color: headerTextColor || theme.palette.neutralPrimary
    };

    return {
      tablinksStyle,
      tablinkStyle,
      tablinkActiveStyle,
      activeIndicatorStyle,
      contentStyle,
      webpartTitleStyle
    };
  }

  // Tab management functions
  private moveTab = (dragIndex: number, hoverIndex: number): void => {
    const tabs = [...this.props.tabs];
    const dragTab = tabs[dragIndex];

    // Remove the dragged item
    tabs.splice(dragIndex, 1);
    // Insert it at the hover position
    tabs.splice(hoverIndex, 0, dragTab);

    // Update tabs in the web part properties
    this.updateTabs(tabs);

    // Update selected key if needed
    if (this.state.selectedKey === dragIndex.toString()) {
      this.setState({ selectedKey: hoverIndex.toString() });
    } else if (this.state.selectedKey === hoverIndex.toString()) {
      this.setState({ selectedKey: dragIndex.toString() });
    }
  };

  private duplicateTab = (index: number): void => {
    const tabs = [...this.props.tabs];
    const tabToDuplicate = { ...tabs[index] };

    // Create a copy with a modified title
    const duplicatedTab = {
      ...tabToDuplicate,
      Title: `${tabToDuplicate.Title} (Copy)`
    };

    // Insert after the original
    tabs.splice(index + 1, 0, duplicatedTab);

    // Update tabs in the web part properties
    this.updateTabs(tabs);

    // Show notification
    this.setState({
      showNotification: true,
      notificationMessage: "Tab duplicated successfully",
      notificationType: MessageBarType.success
    });

    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 3000);
  };

  private removeTab = (index: number): void => {
    if (this.props.tabs.length <= 1) {
      // Don't allow removing the last tab
      this.setState({
        showNotification: true,
        notificationMessage: "Cannot remove the last tab",
        notificationType: MessageBarType.warning
      });
      return;
    }

    const tabs = [...this.props.tabs];
    tabs.splice(index, 1);

    // Update tabs in the web part properties
    this.updateTabs(tabs);

    // Update selected key if needed
    if (parseInt(this.state.selectedKey) >= tabs.length) {
      this.setState({ selectedKey: (tabs.length - 1).toString() });
    }

    // Show notification
    this.setState({
      showNotification: true,
      notificationMessage: "Tab removed",
      notificationType: MessageBarType.success
    });

    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 3000);
  };

  private updateTabs = (tabs: any[]): void => {
    // Dispatch event to update web part property
    const updateEvent = new CustomEvent('setWebPartProperty', {
      detail: { propName: 'tabs', propValue: tabs },
      bubbles: true,
      cancelable: true
    });
    this.props.context.domElement.dispatchEvent(updateEvent);
  };

  // Generate a URL for deep linking to a specific tab
  private generateDeepLink = (tabIndex: number): string => {
    if (!this.props.enableDeepLinking) return '#';

    const baseUrl = window.location.href.split('#')[0];
    return `${baseUrl}#tab-${tabIndex}`;
  };

  // Copy deep link to clipboard
  private copyDeepLink = (tabIndex: number): void => {
    if (!this.props.enableDeepLinking) return;

    // Generate the deep link
    const deepLink = this.generateDeepLink(tabIndex);

    // Copy to clipboard
    navigator.clipboard.writeText(deepLink).then(() => {
      this.setState({
        showNotification: true,
        notificationMessage: 'Link copied to clipboard!',
        notificationType: MessageBarType.success
      });

      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  // Import/Export functions
  private exportTabsToJson = (): void => {
    try {
      const tabsData = this.props.tabs;
      const dataStr = JSON.stringify(tabsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = 'tab-accordion-data.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      this.setState({
        showNotification: true,
        notificationMessage: 'Tabs exported successfully!',
        notificationType: MessageBarType.success
      });

      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 3000);
    } catch (error) {
      console.error('Error exporting tabs:', error);
      this.setState({
        showNotification: true,
        notificationMessage: 'Error exporting tabs. Please try again.',
        notificationType: MessageBarType.error
      });
    }
  }

  private importTabsFromJson = (event: React.ChangeEvent<HTMLInputElement>): void => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      this.setState({ isImporting: true });

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTabs = JSON.parse(e.target.result as string);
          if (!Array.isArray(importedTabs)) {
            throw new Error('Invalid data format');
          }

          this.updateTabs(importedTabs);

          this.setState({
            showNotification: true,
            notificationMessage: 'Tabs imported successfully!',
            notificationType: MessageBarType.success,
            isImporting: false
          });

          setTimeout(() => {
            this.setState({ showNotification: false });
          }, 3000);
        } catch (error) {
          console.error('Error parsing imported data:', error);
          this.setState({
            showNotification: true,
            notificationMessage: 'Invalid file format. Please select a valid JSON file.',
            notificationType: MessageBarType.error,
            isImporting: false
          });
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    } catch (error) {
      console.error('Error importing tabs:', error);
      this.setState({
        showNotification: true,
        notificationMessage: 'Error importing tabs. Please try again.',
        notificationType: MessageBarType.error,
        isImporting: false
      });
    }
  }

  private getTabManagementMenu = (): IContextualMenuProps => {
    return {
      items: [
        {
          key: 'export',
          text: 'Export Tabs',
          iconProps: downloadIcon,
          onClick: this.exportTabsToJson
        },
        {
          key: 'import',
          text: 'Import Tabs',
          iconProps: uploadIcon,
          onClick: () => this.fileInputRef.current.click()
        },
      ]
    };
  };

  // Import/Export buttons to render in header area
  private renderImportExportButtons(): JSX.Element {
    return (
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <DefaultButton
          text="Export/Import"
          split
          menuProps={this.getTabManagementMenu()}
          onClick={this.exportTabsToJson}
        />
        <input
          type="file"
          ref={this.fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={this.importTabsFromJson}
        />
      </Stack>
    );
  }

  public render(): React.ReactElement<ICTabProps> {
    const { title, tabs, displayMode } = this.props;
    const { selectedKey, isLoading } = this.state;
    const customStyles = this.getCustomStyles();

    // If loading, show spinner
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner
            size={SpinnerSize.large}
            label="Loading..."
          />
        </div>
      );
    }

    // If no tabs, show placeholder in edit mode
    if ((!tabs || tabs.length === 0) && displayMode === DisplayMode.Edit) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="Configure your tabs"
          description="Please configure the web part to add tabs."
          buttonLabel="Configure"
          onConfigure={() => {
            this.props.context.propertyPane.open();
          }}
        />
      );
    }

    if (displayMode === DisplayMode.Edit) {
      return (
        <ThemeProvider theme={this.props.themeVariant}>
          <Stack tokens={stackTokens}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <div style={customStyles.webpartTitleStyle}>
                <WebPartTitle
                  displayMode={displayMode}
                  title={title}
                  updateProperty={(value: string) => {
                    const updateEvent = new CustomEvent('setWebPartProperty', {
                      detail: { propName: 'title', propValue: value },
                      bubbles: true,
                      cancelable: true
                    });
                    this.props.context.domElement.dispatchEvent(updateEvent);
                  }}
                />
              </div>


              <Stack horizontal tokens={{ childrenGap: 8 }}>
                {this.renderImportExportButtons()}
                <ActionButton
                  iconProps={addIcon}
                  onClick={() => this.props.context.propertyPane.open()}
                >
                  Add Tab
                </ActionButton>
                <ActionButton
                  iconProps={settingsIcon}
                  onClick={() => this.props.context.propertyPane.open()}
                >
                  Settings
                </ActionButton>
              </Stack>
            </Stack>

            {this.state.showNotification && (
              <MessageBar
                messageBarType={this.state.notificationType}
                isMultiline={false}
                onDismiss={() => this.setState({ showNotification: false })}
                dismissButtonAriaLabel="Close"
              >
                {this.state.notificationMessage}
              </MessageBar>
            )}

            {this.state.showTinyMCEInitMsg && (
              <MessageBar messageBarType={MessageBarType.info} isMultiline={false} dismissButtonAriaLabel="Close">
                TinyMCE Editor initializing...
              </MessageBar>
            )}

            <div className={styles.tabs}>
              <div className={styles.tablinks} style={customStyles.tablinksStyle}>
                {tabs.map((tab: any, index: number) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <button
                      className={selectedKey === index.toString() ? styles.tablinkactive : styles.tablink}
                      style={selectedKey === index.toString() ? customStyles.tablinkActiveStyle : customStyles.tablinkStyle}
                      onClick={() => this.handleTabChange(index.toString())}
                      aria-selected={selectedKey === index.toString()}
                      aria-controls={`tab-content-${index}`}
                      id={`tab-button-${index}`}
                      role="tab"
                    >
                      {tab.Title}
                      {this.props.enableAudienceTargeting && tab.TargetAudience && tab.TargetAudience !== 'everyone' && (
                        <TooltipHost content={`Targeted to: ${tab.TargetAudienceName || tab.TargetAudience}`}>
                          <Icon iconName="PeopleFilter" style={{ marginLeft: 8, fontSize: 12 }} />
                        </TooltipHost>
                      )}
                    </button>
                    {selectedKey === index.toString() && (
                      <div
                        className={styles.tabActiveIndicator}
                        style={customStyles.activeIndicatorStyle}
                      />
                    )}
                  </div>
                ))}
              </div>

              {tabs.map((tab: any, index: number) => (
                <div
                  key={index}
                  className={styles.content}
                  style={{
                    display: selectedKey === index.toString() ? 'block' : 'none',
                    ...customStyles.contentStyle
                  }}
                  id={`tab-content-${index}`}
                  aria-labelledby={`tab-button-${index}`}
                  role="tabpanel"
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    {this.props.enableDeepLinking && (
                      <IconButton
                        iconProps={linkIcon}
                        title="Copy direct link to this tab"
                        ariaLabel="Copy direct link to this tab"
                        onClick={() => this.copyDeepLink(index)}
                      />
                    )}
                    <IconButton
                      iconProps={duplicateIcon}
                      title="Duplicate Tab"
                      ariaLabel="Duplicate Tab"
                      onClick={() => this.duplicateTab(index)}
                    />
                    <IconButton
                      iconProps={deleteIcon}
                      title="Remove Tab"
                      ariaLabel="Remove Tab"
                      onClick={() => this.removeTab(index)}
                    />
                  </div>
                  <Editor
                    id={this.props.guid + '-editor-' + index}
                    initialValue={tab.Content}
                    init={{
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
                        'codesample', 'hr', 'pagebreak', 'nonbreaking', 'template', 'paste'
                      ],

                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | link image media codesample emoticons table | help',

                      menubar: 'file edit view insert format tools table help',

                      automatic_uploads: true,

                      // Updated content_style to use custom font settings
                      content_style: `
                      body { 
                        font-family: ${this.props.contentFontFamily || '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif'}; 
                        font-size: ${this.props.contentFontSize || 16}px; 
                      }
                      a { color: #0078d4 !important; }
                      img { max-width: 100%; height: auto; }
                      .mce-content-body [data-mce-selected=inline-boundary] { background-color: #0078d4; }
                      .mce-content-body .mce-item-table td, .mce-content-body .mce-item-table th { border: 1px solid #ddd; }
                      .mce-content-body table { border-collapse: collapse; width: 100%; }
                    `,

                      // Other TinyMCE settings...
                      table_responsive_width: true,
                      table_default_styles: {
                        'width': '100%',
                        'height': 'auto'
                      },

                      a11y_advanced_options: true,

                      autoresize_bottom_margin: 20,
                      min_height: 300,
                      max_height: 800,

                      branding: false,

                      paste_data_images: true,
                      smart_paste: true,
                      browser_spellcheck: true,
                      contextmenu: 'link image table media inserttable | cell row column deletetable'
                    }}
                    onEditorChange={this.handleEditorChange}
                  />
                </div>
              ))}
            </div>
          </Stack>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={this.props.themeVariant}>
          <Stack tokens={stackTokens}>
            {title && (
              <div
                className={styles.webpartTitle}
                style={customStyles.webpartTitleStyle}
              >
                {title}
              </div>
            )}

            {this.state.showNotification && (
              <MessageBar
                messageBarType={this.state.notificationType}
                isMultiline={false}
                onDismiss={() => this.setState({ showNotification: false })}
                dismissButtonAriaLabel="Close"
              >
                {this.state.notificationMessage}
              </MessageBar>
            )}

            <div className={styles.tabs}>
              <div className={styles.tablinks} style={customStyles.tablinksStyle}>
                {tabs.map((tab: any, index: number) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <button
                      className={selectedKey === index.toString() ? styles.tablinkactive : styles.tablink}
                      style={selectedKey === index.toString() ? customStyles.tablinkActiveStyle : customStyles.tablinkStyle}
                      onClick={() => this.handleTabChange(index.toString())}
                      aria-selected={selectedKey === index.toString()}
                      aria-controls={`tab-content-${index}`}
                      id={`tab-button-${index}`}
                      role="tab"
                    >
                      {tab.Title}
                    </button>
                    {selectedKey === index.toString() && (
                      <div
                        className={styles.tabActiveIndicator}
                        style={customStyles.activeIndicatorStyle}
                      />
                    )}
                  </div>
                ))}
              </div>

              {tabs.map((tab: any, index: number) => (
                <div
                  key={index}
                  className={styles.content}
                  style={{
                    display: selectedKey === index.toString() ? 'block' : 'none',
                    ...customStyles.contentStyle
                  }}
                  id={`tab-content-${index}`}
                  aria-labelledby={`tab-button-${index}`}
                  role="tabpanel"
                  dangerouslySetInnerHTML={{ __html: tab.Content }}
                />
              ))}
            </div>
          </Stack>
        </ThemeProvider>
      );
    }
  }
}