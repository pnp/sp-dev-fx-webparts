import * as React from 'react';
import styles from './CAccordion.module.scss';
import { ICAccordionProps } from './ICAccordionProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Editor } from '@tinymce/tinymce-react';
import {
  Stack,
  Text,
  IStackTokens,
  DefaultButton,
  IIconProps,
  FontWeights,
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
    // Clean up hash change listener
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
    //Save the content in properties
    this.props.tabs[id].Content = content;
  }
  
  // Generate custom styles based on props
  private getCustomStyles() {
    const theme = this.props.themeVariant || getTheme();
    const { 
      headerBackgroundColor, 
      headerTextColor, 
      activeHeaderBackgroundColor, 
      activeHeaderTextColor,
      useThemeColor = true
    } = this.props;

    // Default theme-based colors
    const defaultHeaderBg = theme.palette.white;
    const defaultHeaderText = theme.palette.neutralPrimary;
    const defaultActiveHeaderBg = theme.palette.white;
    const defaultActiveHeaderText = useThemeColor ? theme.palette.themePrimary : theme.palette.neutralPrimary;
    
    // Use custom colors if provided, otherwise use defaults
    const accordionTitleStyle = {
      backgroundColor: headerBackgroundColor || defaultHeaderBg,
      color: headerTextColor || defaultHeaderText
    };
    
    const accordionTitleActiveStyle = {
      backgroundColor: activeHeaderBackgroundColor || defaultActiveHeaderBg,
      color: activeHeaderTextColor || defaultActiveHeaderText,
      fontWeight: 600,
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
    
    return {
      accordionTitleStyle,
      accordionTitleActiveStyle,
      accordionIconStyle,
      accordionIconActiveStyle,
      accordionIconActiveTextStyle
    };
  }
  
  private toggleAccordion = (index: string) => {
    let expandedItems = [...this.state.expandedItems];
    
    if (expandedItems.includes(index)) {
      // Remove if already expanded
      expandedItems = expandedItems.filter(item => item !== index);
    } else {
      // If accordion mode and not allowing multiple expansion, clear others and add this one
      // If not, just add this one
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

  public render(): React.ReactElement<ICAccordionProps> {
    const { title, tabs, displayMode, context } = this.props;
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
    
    if(displayMode === DisplayMode.Edit) {
      return (
        <ThemeProvider theme={this.props.themeVariant}>
          <div className={styles.accordionContainer}>
            <Stack tokens={stackTokens}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
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
                  const isExpanded = this.state.expandedItems.includes(indexStr);
                  
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
                      >
                        <Editor
                          id={this.props.guid + '-editor-' + index}                        
                          initialValue={tab.Content}
                          init={{                          
                            content_style: "a {color:rgb(0,120,212) !important}",
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
                              {title: 'Headings', items: [
                                {title: 'Heading 1', format: 'h1'},
                                {title: 'Heading 2', format: 'h2'},
                                {title: 'Heading 3', format: 'h3'}
                              ]},
                              {title: 'Inline', items: [
                                {title: 'Bold', format: 'bold'},
                                {title: 'Italic', format: 'italic'},
                                {title: 'Underline', format: 'underline'},
                                {title: 'Strikethrough', format: 'strikethrough'}
                              ]}
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
          </div>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={this.props.themeVariant}>
          <div className={styles.accordionContainer}>
            <Stack tokens={stackTokens}>
              {title && (
                <div className={styles.webpartTitle}>{title}</div>
              )}
              
              <div className={styles.accordion}>
                {tabs.map((tab: any, index: number) => {
                  const indexStr = index.toString();
                  const isExpanded = this.state.expandedItems.includes(indexStr);
                  
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
                      >
                        <div dangerouslySetInnerHTML={{__html: tab.Content}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Stack>
          </div>
        </ThemeProvider>
      );
    }
  }
}