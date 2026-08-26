import * as React from 'react';
import styles from './CAccordion.module.scss';
import { ICAccordionProps } from './ICAccordionProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Editor } from '@tinymce/tinymce-react';
import {
  Stack,
  IStackTokens,
  IIconProps,
  ActionButton,
  MessageBar,
  MessageBarType,
  Icon,
  TooltipHost
} from '@fluentui/react';
import { getTheme } from '@fluentui/react/lib/Styling';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

interface ICAccordionState {
  expandedItems: string[];
  showTinyMCEInitMsg: boolean;
}

// Stack tokens for spacing
const stackTokens: IStackTokens = {
  childrenGap: 12,
};

// Icons for actions
const addIcon: IIconProps = { iconName: 'Add' };
const settingsIcon: IIconProps = { iconName: 'Settings' };

export default class CAccordion extends React.Component<ICAccordionProps, ICAccordionState> {
  constructor(props: ICAccordionProps) {
    super(props);
    this.state = {
      expandedItems: this.props.accordion ? [] : ['0'], // If not accordion mode, open first item by default
      showTinyMCEInitMsg: false
    };
  }

  public componentDidMount(): void {
    this.setState({ showTinyMCEInitMsg: true });
    setTimeout(() => {
      this.setState({ showTinyMCEInitMsg: false });
    }, 5000);

    // Set up hash change listener for deep linking
    if (this.props.enableDeepLinking) {
      this.handleHashChange();
      window.addEventListener('hashchange', this.handleHashChange);
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

    // Check if hash is trying to link to an accordion item
    if (hash.startsWith('accordion-')) {
      const itemIndex = hash.replace('accordion-', '');

      // Check if this accordion item index exists
      if (this.props.tabs && this.props.tabs.length > parseInt(itemIndex)) {
        this.setState({ expandedItems: [itemIndex] });
      }
    }
  };

  public handleEditorChange = (content: string, editor: any) => {
    const id = editor.id.split("-editor-")[1];
    this.props.tabs[id].Content = content;
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
    const defaultHeaderBg = theme.palette.white;
    const defaultHeaderText = theme.palette.neutralPrimary;
    const defaultActiveHeaderBg = theme.palette.white;
    const defaultActiveHeaderText = useThemeColor ? theme.palette.themePrimary : theme.palette.neutralPrimary;

    // Use custom colors if provided, otherwise use defaults
    const accordionTitleStyle = {
      backgroundColor: headerBackgroundColor || defaultHeaderBg,
      color: headerTextColor || defaultHeaderText,
      fontSize: `${headerFontSize}px`,
      fontFamily: headerFontFamily,
      fontWeight: headerFontWeight,
      textTransform: headerTextTransform as any
    };

    const accordionTitleActiveStyle = {
      backgroundColor: activeHeaderBackgroundColor || defaultActiveHeaderBg,
      color: activeHeaderTextColor || defaultActiveHeaderText,
      fontWeight: headerFontWeight === 'normal' ? 'bold' : headerFontWeight, // Make active accordion items bold by default
      fontSize: `${headerFontSize}px`,
      fontFamily: headerFontFamily,
      textTransform: headerTextTransform as any
    };

    const accordionIconStyle = {
      backgroundColor: headerBackgroundColor ? theme.palette.neutralLighter : theme.palette.neutralLighter
    };

    const accordionIconActiveStyle = {
      backgroundColor: activeHeaderBackgroundColor || (useThemeColor ? theme.palette.themeLighter : theme.palette.neutralLighter),
      transform: 'rotate(180deg)'
    };

    const accordionIconActiveTextStyle = {
      color: activeHeaderTextColor || (useThemeColor ? theme.palette.themePrimary : theme.palette.neutralPrimary)
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
      accordionTitleStyle,
      accordionTitleActiveStyle,
      accordionIconStyle,
      accordionIconActiveStyle,
      accordionIconActiveTextStyle,
      contentStyle,
      webpartTitleStyle
    };
  }

  private toggleAccordion = (index: string) => {
    let expandedItems = [...this.state.expandedItems];

    if (expandedItems.includes(index)) {
      // Remove if already expanded
      expandedItems = expandedItems.filter(item => item !== index);
    } else {
      if (this.props.accordion && !this.props.allowMultipleExpand) {
        expandedItems = [index];
      } else {
        expandedItems.push(index);
      }
    }

    this.setState({ expandedItems });

    // Update URL hash for deep linking
    if (this.props.enableDeepLinking && expandedItems.length > 0) {
      const newUrl = `${window.location.pathname}${window.location.search}#accordion-${index}`;
      window.history.replaceState(null, document.title, newUrl);
    }
  }

  /**
   * Component render method
   */
  public render(): React.ReactElement<ICAccordionProps> {
    const { title, tabs, displayMode } = this.props;
    const { expandedItems } = this.state;
    const customStyles = this.getCustomStyles();

    // If no tabs, show placeholder in edit mode
    if ((!tabs || tabs.length === 0) && displayMode === DisplayMode.Edit) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="Configure your accordion"
          description="Please configure the web part to add accordion items."
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
                <ActionButton
                  iconProps={addIcon}
                  onClick={() => this.props.context.propertyPane.open()}
                >
                  Add Item
                </ActionButton>
                <ActionButton
                  iconProps={settingsIcon}
                  onClick={() => this.props.context.propertyPane.open()}
                >
                  Settings
                </ActionButton>
              </Stack>
            </Stack>

            {this.state.showTinyMCEInitMsg && (
              <MessageBar messageBarType={MessageBarType.info} isMultiline={false} dismissButtonAriaLabel="Close">
                TinyMCE Editor initializing...
              </MessageBar>
            )}

            <div className={styles.accordion}>
              {tabs.map((tab: any, index: number) => {
                const indexStr = index.toString();
                const isExpanded = expandedItems.includes(indexStr);

                return (
                  <div key={index} className={styles.accordionItem}>
                    <button
                      className={styles.accordionTitle}
                      style={isExpanded ? customStyles.accordionTitleActiveStyle : customStyles.accordionTitleStyle}
                      onClick={() => this.toggleAccordion(indexStr)}
                      aria-expanded={isExpanded}
                      data-automation-id={`accordion-header-${index}`}
                      aria-controls={`accordion-content-${index}`}
                      id={`accordion-button-${index}`}
                    >
                      <span>{tab.Title}</span>
                      {this.props.enableAudienceTargeting && tab.TargetAudience && tab.TargetAudience !== 'everyone' && (
                        <TooltipHost content={`Targeted to: ${tab.TargetAudienceName || tab.TargetAudience}`}>
                          <Icon iconName="PeopleFilter" style={{ margin: '0 8px', fontSize: 12 }} />
                        </TooltipHost>
                      )}
                      <span
                        className={styles.accordionIcon}
                        style={isExpanded ? customStyles.accordionIconActiveStyle : customStyles.accordionIconStyle}
                      >
                        <i
                          className="ms-Icon ms-Icon--ChevronDown"
                          aria-hidden="true"
                          style={isExpanded ? customStyles.accordionIconActiveTextStyle : {}}
                        ></i>
                      </span>
                    </button>

                    <div
                      className={isExpanded ? styles.accordionBody : styles.accordionBodyHidden}
                      id={`accordion-content-${index}`}
                      aria-labelledby={`accordion-button-${index}`}
                      role="region"
                      style={isExpanded ? customStyles.contentStyle : undefined}
                    >
                      <Editor
                        id={this.props.guid + '-editor-' + index}
                        initialValue={tab.Content}
                        init={{
                          // Updated content_style to use custom font settings
                          content_style: `
                          body { 
                            font-family: ${this.props.contentFontFamily || '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif'}; 
                            font-size: ${this.props.contentFontSize || 16}px; 
                          }
                          a { color: #0078d4 !important; }
                          img { max-width: 100%; height: auto; }
                        `,
                          plugins: 'link image table lists code autolink autoresize',
                          menubar: 'edit insert format table tools',
                          height: 340,
                          toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | numlist bullist | link image | code',
                          table_responsive_width: true,
                          table_default_styles: {
                            'width': '100%',
                            'height': 'auto'
                          },
                          image_advtab: true,
                          style_formats: [
                            {
                              title: 'Headings', items: [
                                { title: 'Heading 1', format: 'h1' },
                                { title: 'Heading 2', format: 'h2' },
                                { title: 'Heading 3', format: 'h3' }
                              ]
                            },
                            {
                              title: 'Inline', items: [
                                { title: 'Bold', format: 'bold' },
                                { title: 'Italic', format: 'italic' },
                                { title: 'Underline', format: 'underline' },
                                { title: 'Strikethrough', format: 'strikethrough' }
                              ]
                            }
                          ],
                          browser_spellcheck: true,
                          branding: false,
                          autoresize_bottom_margin: 20,
                          resize: true
                        }}
                        onEditorChange={this.handleEditorChange}
                      />
                    </div>
                  </div>
                );
              })}
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

            <div className={styles.accordion}>
              {tabs.map((tab: any, index: number) => {
                const indexStr = index.toString();
                const isExpanded = expandedItems.includes(indexStr);

                return (
                  <div key={index} className={styles.accordionItem}>
                    <button
                      className={styles.accordionTitle}
                      style={isExpanded ? customStyles.accordionTitleActiveStyle : customStyles.accordionTitleStyle}
                      onClick={() => this.toggleAccordion(indexStr)}
                      aria-expanded={isExpanded}
                      data-automation-id={`accordion-header-${index}`}
                      aria-controls={`accordion-content-${index}`}
                      id={`accordion-button-${index}`}
                    >
                      <span>{tab.Title}</span>
                      <span
                        className={styles.accordionIcon}
                        style={isExpanded ? customStyles.accordionIconActiveStyle : customStyles.accordionIconStyle}
                      >
                        <i
                          className="ms-Icon ms-Icon--ChevronDown"
                          aria-hidden="true"
                          style={isExpanded ? customStyles.accordionIconActiveTextStyle : {}}
                        ></i>
                      </span>
                    </button>

                    <div
                      className={isExpanded ? styles.accordionBody : styles.accordionBodyHidden}
                      id={`accordion-content-${index}`}
                      aria-labelledby={`accordion-button-${index}`}
                      role="region"
                      style={isExpanded ? customStyles.contentStyle : undefined}
                    >
                      <div dangerouslySetInnerHTML={{ __html: tab.Content }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Stack>
        </ThemeProvider>
      );
    }
  }
}