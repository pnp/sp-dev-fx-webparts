import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';

// Import color picker from PnP controls
import { PropertyFieldColorPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import * as strings from 'TabAccordionWebPartStrings';
import TabComponent from './components/CTab';
import { ICTabProps } from './components/ICTabProps';
import AccordionComponent from './components/CAccordion';
import { ICAccordionProps } from './components/ICAccordionProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { GraphService } from './services/GraphService';
import { SharePointService } from './services/SharePointService';
import { LanguageService } from './services/LanguageService';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { LanguageSelector } from './components/LanguageSelector';
import 'tinymce';

// Initialize Fluent UI icons
initializeIcons();

export interface ITabAccordionWebPartProps {
  tabs: any[]; 
  type: string;
  title: string;
  accordion: boolean;
  tabContent: string;
  
  // Display settings
  showBorders: boolean;
  allowMultipleExpand: boolean;
  useThemeColorForHeaders: boolean;
  
  // Header/Tab styling options
  headerBackgroundColor: string;
  headerTextColor: string;
  activeHeaderBackgroundColor: string;
  activeHeaderTextColor: string;
  
  // SharePoint List Integration
  useSharePointList: boolean;
  listUrl: string;
  titleColumn: string;
  contentColumn: string;
  orderByColumn: string;
  maxItems: number;
  
  // Deep Linking
  enableDeepLinking: boolean;
  
  // Audience Targeting
  enableAudienceTargeting: boolean;
  
  // Multi-language Support
  enableMultiLanguage: boolean;
  tabsMultiLanguage: {
    [language: string]: {
      title: string;
      tabs: {
        Title: string;
        Content: string;
        Id: string;
      }[];
    }
  };
}

export default class TabAccordionWebPart extends BaseClientSideWebPart<ITabAccordionWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private guid: string;
  private isMobile: boolean;
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  
  // Services
  private _graphService: GraphService;
  private _sharePointService: SharePointService;
  private _languageService: LanguageService;
  
  // Audience Targeting
  private _availableGroups: any[] = [];

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'title': { isSearchablePlainText: true },
      'tabContent': { isHtmlString: true }
    };
  }

  /**
   * @function
   * Web part constructor.
   */
  public constructor(context?: WebPartContext) {
    super();

    //Initialize unique GUID
    this.guid = this.getGuid();

    this.isMobile = this.detectmob();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  
  protected async onInit(): Promise<void> {
    await super.onInit();

    // Initialize services
    this._graphService = new GraphService(this.context);
    this._sharePointService = new SharePointService(this.context);
    this._languageService = new LanguageService(this.context);

    // Initialize theme variant
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    // Initialize default properties if not already set
    if (!this.properties.tabs) {
      this.properties.tabs = [];
    }
    
    if (this.properties.type === undefined) {
      this.properties.type = 'Tab';
    }
    
    if (this.properties.accordion === undefined) {
      this.properties.accordion = true;
    }
    
    if (this.properties.showBorders === undefined) {
      this.properties.showBorders = true;
    }
    
    if (this.properties.allowMultipleExpand === undefined) {
      this.properties.allowMultipleExpand = false;
    }
    
    if (this.properties.useThemeColorForHeaders === undefined) {
      this.properties.useThemeColorForHeaders = true;
    }
    
    // Initialize color properties
    if (this.properties.headerBackgroundColor === undefined) {
      this.properties.headerBackgroundColor = '';
    }
    
    if (this.properties.headerTextColor === undefined) {
      this.properties.headerTextColor = '';
    }
    
    if (this.properties.activeHeaderBackgroundColor === undefined) {
      this.properties.activeHeaderBackgroundColor = '';
    }
    
    if (this.properties.activeHeaderTextColor === undefined) {
      this.properties.activeHeaderTextColor = '';
    }
    
    if (this.properties.enableDeepLinking === undefined) {
      this.properties.enableDeepLinking = false;
    }
    
    if (this.properties.enableAudienceTargeting === undefined) {
      this.properties.enableAudienceTargeting = false;
    }
    
    if (this.properties.enableMultiLanguage === undefined) {
      this.properties.enableMultiLanguage = false;
    }
    
    if (this.properties.useSharePointList === undefined) {
      this.properties.useSharePointList = false;
    }
    
    if (!this.properties.tabsMultiLanguage) {
      this.properties.tabsMultiLanguage = {};
      
      // Initialize with current language and tabs
      const currentLanguage = this._languageService.getCurrentLanguage();
      if (this.properties.tabs && this.properties.tabs.length > 0) {
        this.properties.tabsMultiLanguage[currentLanguage] = {
          title: this.properties.title,
          tabs: [...this.properties.tabs]
        };
      }
    }
    
    // Load list data if configured
    if (this.displayMode === DisplayMode.Read && this.properties.useSharePointList) {
      await this.loadListData();
    }
    
    // Load audience groups if needed
    if (this.properties.enableAudienceTargeting && this.displayMode === DisplayMode.Edit) {
      await this.loadAvailableGroups();
    }
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
  
  private async loadListData(): Promise<void> {
    if (!this.properties.useSharePointList || !this.properties.listUrl) {
      return;
    }
    
    try {
      const items = await this._sharePointService.getListItems(
        this.properties.listUrl,
        this.properties.titleColumn || 'Title',
        this.properties.contentColumn || 'Content',
        this.properties.orderByColumn || 'Title',
        this.properties.maxItems || 10
      );
      
      // Convert list items to tabs format
      const tabs = items.map(item => ({
        Id: item.Id,
        Title: item.Title,
        Content: item.Content
      }));
      
      // Update the tabs property
      this.properties.tabs = tabs;
      
      // Re-render the web part
      this.render();
    } catch (error) {
      console.error('Error loading list data:', error);
      // Handle error (could show a message on the web part)
    }
  }
  
  private async loadAvailableGroups(): Promise<void> {
    if (!this.properties.enableAudienceTargeting) {
      return;
    }
    
    try {
      const groups = await this._graphService.getUserGroups();
      this._availableGroups = groups || [];
      
      // If we have tabs with audience targeting, update the display names
      if (this.properties.tabs && this.properties.tabs.length > 0) {
        this.properties.tabs.forEach(tab => {
          if (tab.TargetAudience && tab.TargetAudience !== 'everyone') {
            const group = this._availableGroups.find(g => g.id === tab.TargetAudience);
            if (group) {
              tab.TargetAudienceName = group.displayName;
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading available groups:', error);
    }
  }
  
  private async filterTabsByAudience(tabs: any[]): Promise<any[]> {
    if (!this.properties.enableAudienceTargeting) {
      return tabs;
    }
    
    try {
      const result = [];
      
      for (const tab of tabs) {
        // If no target audience or "everyone", include the tab
        if (!tab.TargetAudience || tab.TargetAudience === 'everyone') {
          result.push(tab);
          continue;
        }
        
        // Check if user is in the target group
        const isInGroup = await this._graphService.checkUserInGroup(tab.TargetAudience);
        if (isInGroup) {
          result.push(tab);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error filtering tabs by audience:', error);
      return tabs;
    }
  }
  
  private getLanguageSpecificContent(): { title: string, tabs: any[] } {
    if (!this.properties.enableMultiLanguage || !this._languageService) {
      return { 
        title: this.properties.title, 
        tabs: this.properties.tabs 
      };
    }
    
    // Get the current language
    const currentLanguage = this._languageService.getCurrentLanguage();
    
    // Check if we have content for this language
    if (this.properties.tabsMultiLanguage[currentLanguage]) {
      return this.properties.tabsMultiLanguage[currentLanguage];
    }
    
    // Get the default language (first available)
    const defaultLanguage = Object.keys(this.properties.tabsMultiLanguage)[0] || '';
    
    // Return default language content or fallback to main properties
    return this.properties.tabsMultiLanguage[defaultLanguage] || { 
      title: this.properties.title, 
      tabs: this.properties.tabs 
    };
  }
  
  public async render(): Promise<void> {
    console.log('Web Part Render Called');
    
    // Get language-specific content
    let { title, tabs } = this.getLanguageSpecificContent();
    
    // Create tabContent string for backward compatibility
    this.properties.tabContent = "";
    tabs.map((tab: any, tabindex: number) => {
      this.properties.tabContent += tab.Title + "," + tab.Content + "|";
    });
    
    // Filter tabs based on audience targeting
    if (this.displayMode === DisplayMode.Read && this.properties.enableAudienceTargeting) {
      tabs = await this.filterTabsByAudience(tabs);
    }
    
    // Create the language selector if needed
    if (this.displayMode === DisplayMode.Read && this.properties.enableMultiLanguage) {
      const languageSelectorContainer = document.createElement('div');
      languageSelectorContainer.className = 'language-selector-container';
      this.domElement.appendChild(languageSelectorContainer);
      
      const languageSelectorElement = React.createElement(
        LanguageSelector,
        {
          availableLanguages: this._languageService.getAvailableLanguages(),
          currentLanguage: this._languageService.getCurrentLanguage(),
          onLanguageChange: (language: string) => {
            // Store the user's language preference
            localStorage.setItem('preferredLanguage', language);
            // Force re-render
            this.render();
          }
        }
      );
      
      ReactDom.render(languageSelectorElement, languageSelectorContainer);
    }
    
    // Create the appropriate element based on display type and device
    const elementTab: React.ReactElement<ICTabProps> = React.createElement(
      TabComponent,
      {        
        tabs: tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title: title,
        context: this.context,
        themeVariant: this._themeVariant,
        showBorders: this.properties.showBorders,
        useThemeColor: this.properties.useThemeColorForHeaders,
        // Pass color properties
        headerBackgroundColor: this.properties.headerBackgroundColor,
        headerTextColor: this.properties.headerTextColor,
        activeHeaderBackgroundColor: this.properties.activeHeaderBackgroundColor,
        activeHeaderTextColor: this.properties.activeHeaderTextColor,
        graphService: this._graphService,
        enableDeepLinking: this.properties.enableDeepLinking,
        enableAudienceTargeting: this.properties.enableAudienceTargeting,
        enableMultiLanguage: this.properties.enableMultiLanguage
      }
    );
    
    const elementAccordion: React.ReactElement<ICAccordionProps> = React.createElement(
      AccordionComponent,
      {        
        tabs: tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title: title,
        accordion: this.properties.accordion,
        context: this.context,
        themeVariant: this._themeVariant,
        showBorders: this.properties.showBorders,
        allowMultipleExpand: this.properties.allowMultipleExpand,
        useThemeColor: this.properties.useThemeColorForHeaders,
        // Pass color properties
        headerBackgroundColor: this.properties.headerBackgroundColor,
        headerTextColor: this.properties.headerTextColor,
        activeHeaderBackgroundColor: this.properties.activeHeaderBackgroundColor,
        activeHeaderTextColor: this.properties.activeHeaderTextColor,
        graphService: this._graphService,
        enableDeepLinking: this.properties.enableDeepLinking,
        enableAudienceTargeting: this.properties.enableAudienceTargeting,
        enableMultiLanguage: this.properties.enableMultiLanguage
      }
    );
    
    // Render the appropriate component based on device and settings
    if(this.isMobile) {
      ReactDom.render(elementAccordion, this.domElement);
    }
    else {
      if(this.properties.type == "Accordion") {
        ReactDom.render(elementAccordion, this.domElement);
      }
      else {
        ReactDom.render(elementTab, this.domElement);
      }
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    if (this._themeProvider) {
      this._themeProvider.themeChangedEvent.remove(this, this._handleThemeChangedEvent);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * @function
   * Generates a GUID
   */
  private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private detectmob(): boolean {
    console.log('inside detectmob');
    if(window.innerWidth <= 480) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @function
   * Generates a GUID part
   */
  private s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import(
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

  /**
   * @function
   * PropertyPanel settings definition
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneDropdown('type', {
                  label: strings.Type,
                  disabled: false,                   
                  options: [
                    {key: 'Accordion', text: 'Accordion'},
                    {key: 'Tab', text: 'Tab'}
                  ]
                }),  
                this.propertyFieldCollectionData("tabs", {
                  key: "tabs",
                  panelHeader: strings.ManageAccordion,
                  manageBtnLabel: strings.ManageAccordion,
                  value: this.properties.tabs,
                  enableSorting: true,
                  fields: [
                    {
                      id: "Title",
                      title: strings.TitleFieldLabel,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "TargetAudience",
                      title: "Target Audience",
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        { key: 'everyone', text: 'Everyone' },
                        ...this._availableGroups.map(group => ({ key: group.id, text: group.displayName }))
                      ],
                      required: false,
                      hidden: !this.properties.enableAudienceTargeting
                    }
                  ]
                }),                           
              ],             
            },
            {
              groupName: 'Display Settings',
              groupFields: [
                PropertyPaneToggle('showBorders', {
                  label: 'Show borders'
                }),
                PropertyPaneToggle('useThemeColorForHeaders', {
                  label: 'Use theme color for headers'
                }),
                PropertyPaneToggle('allowMultipleExpand', {
                  label: 'Allow multiple expanded sections (Accordion only)',
                  disabled: this.properties.type !== 'Accordion'
                })
              ]
            },
            {
              groupName: 'Header/Tab Styling',
              groupFields: [
                // Add color picker controls
                PropertyPaneLabel('', {
                  text: 'Customize header/tab colors'
                }),
                PropertyFieldColorPicker('headerBackgroundColor', {
                  label: 'Header Background Color',
                  selectedColor: this.properties.headerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  // Removed incorrect style property
                  iconName: 'ColorSolid',
                  key: 'headerBackgroundColorFieldId'
                }),
                PropertyFieldColorPicker('headerTextColor', {
                  label: 'Header Text Color',
                  selectedColor: this.properties.headerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  // Removed incorrect style property
                  iconName: 'ColorSolid',
                  key: 'headerTextColorFieldId'
                }),
                PropertyFieldColorPicker('activeHeaderBackgroundColor', {
                  label: 'Active Header Background Color',
                  selectedColor: this.properties.activeHeaderBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  // Removed incorrect style property
                  iconName: 'ColorSolid',
                  key: 'activeHeaderBackgroundColorFieldId'
                }),
                PropertyFieldColorPicker('activeHeaderTextColor', {
                  label: 'Active Header Text Color',
                  selectedColor: this.properties.activeHeaderTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  // Removed incorrect style property
                  iconName: 'ColorSolid',
                  key: 'activeHeaderTextColorFieldId'
                }),
                PropertyPaneButton('resetColors', {
                  text: 'Reset to Default Colors',
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: () => {
                    this.properties.headerBackgroundColor = '';
                    this.properties.headerTextColor = '';
                    this.properties.activeHeaderBackgroundColor = '';
                    this.properties.activeHeaderTextColor = '';
                    this.render();
                  }
                })
              ]
            },
            {
              groupName: "SharePoint List Integration",
              groupFields: [
                PropertyPaneToggle('useSharePointList', {
                  label: 'Use SharePoint List for content'
                }),
                PropertyPaneTextField('listUrl', {
                  label: 'List URL (relative)',
                  placeholder: '/sites/intranet/Lists/TabContent',
                  disabled: !this.properties.useSharePointList
                }),
                PropertyPaneTextField('titleColumn', {
                  label: 'Title Column',
                  placeholder: 'Title',
                  disabled: !this.properties.useSharePointList
                }),
                PropertyPaneTextField('contentColumn', {
                  label: 'Content Column',
                  placeholder: 'Content',
                  disabled: !this.properties.useSharePointList
                }),
                PropertyPaneTextField('orderByColumn', {
                  label: 'Order By Column',
                  placeholder: 'SortOrder',
                  disabled: !this.properties.useSharePointList
                }),
                PropertyPaneSlider('maxItems', {
                  label: 'Maximum Items',
                  min: 1,
                  max: 50,
                  step: 1,
                  value: 10,
                  disabled: !this.properties.useSharePointList
                }),
                PropertyPaneButton('refreshFromList', {
                  text: 'Refresh from List',
                  onClick: this.loadListData.bind(this),
                  disabled: !this.properties.useSharePointList
                })
              ]
            },
            {
              groupName: "Advanced Features",
              groupFields: [
                PropertyPaneToggle('enableDeepLinking', {
                  label: 'Enable deep linking to tabs'
                }),
                PropertyPaneToggle('enableAudienceTargeting', {
                  label: 'Enable audience targeting'
                }),
                PropertyPaneToggle('enableMultiLanguage', {
                  label: 'Enable multi-language support'
                })
              ]
            }           
          ]
        }
      ]
    };
  }
}