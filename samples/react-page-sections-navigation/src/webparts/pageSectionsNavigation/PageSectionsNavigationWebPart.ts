import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
//import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'PageSectionsNavigationStrings';
import { PageSectionsNavigation, IPageSectionsNavigationProps } from './components/PageSectionsNavigation';
import { IDynamicDataSource, IDynamicDataCallables, IDynamicDataPropertyDefinition } from '@microsoft/sp-dynamic-data';
import { IAnchorItem } from '../../common/model';
import { NavPosition, NavAlign, NavTheme } from '../../common/types';

export interface IPageSectionsNavigationWebPartProps {
  scrollBehavior: ScrollBehavior;
  position: NavPosition;
  isDark?: boolean;
  theme: NavTheme;
  align: NavAlign;
  showHomeItem: boolean;
  homeItemText: string;
  customCssUrl: string;
}

export default class PageSectionsNavigationWebPart extends BaseClientSideWebPart<IPageSectionsNavigationWebPartProps> implements IDynamicDataCallables {
  // "Anchor" data sources
  private _dataSources: IDynamicDataSource[] = [];

  protected onInit(): Promise<void> {
    const { customCssUrl } = this.properties;

    this._onAnchorChanged = this._onAnchorChanged.bind(this);
    this._availableSourcesChanged = this._availableSourcesChanged.bind(this);
    // getting data sources that have already been added on the page
    this._initDataSources();
    // registering for changes in available datasources
    this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._availableSourcesChanged);

    this._addCustomCss(customCssUrl);

    // registering current web part as a data source
    this.context.dynamicDataSourceManager.initializeSource(this);

    return super.onInit();
  }

  public render(): void {

    const anchors = this._dataSources && this._dataSources.map(ds => ds.getPropertyValue('anchor') as IAnchorItem);
    const {
      scrollBehavior,
      position,
      isDark,
      theme,
      align,
      showHomeItem,
      homeItemText
    } = this.properties;
    const element: React.ReactElement<IPageSectionsNavigationProps> = React.createElement(
      PageSectionsNavigation,
      {
        anchors: anchors,
        scrollBehavior: scrollBehavior,
        position: position,
        theme: theme ? theme : (isDark ? 'dark' : 'light'),
        align: align,
        isEditMode: this.displayMode === DisplayMode.Edit,
        homeItem: showHomeItem ? homeItemText : ''
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * implementation of getPropertyDefinitions from IDynamicDataCallables
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [{
      id: 'position',
      title: 'position'
    }];
  }

  /**
   * implementation of getPropertyValue from IDynamicDataCallables
   * @param propertyId property Id
   */
  public getPropertyValue(propertyId: string): NavPosition {
    switch (propertyId) {
      case 'position':
        return this.properties.position;
    }

    throw new Error('Bad property id');
  }

  protected onDispose(): void {
    this.context.dynamicDataProvider.unregisterAvailableSourcesChanged(this._availableSourcesChanged);
    if (this._dataSources) {
      this._dataSources.forEach(ds => {
        this.context.dynamicDataProvider.unregisterPropertyChanged(ds.id, 'anchor', this._onAnchorChanged);
      });
      delete this._dataSources;
    }
    ReactDom.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Manual handling of changed properties.
   * If position has been changed we need to notify subscribers
   * If custom css has been changed we need to add new CSS to the page
   * @param propertyPath 
   * @param oldValue 
   * @param newValue 
   */
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    if (propertyPath === 'position') {
      this.context.dynamicDataSourceManager.notifyPropertyChanged('position');
    }
    else if (propertyPath === 'customCssUrl') {
      //
      // removing prev css
      //
      if (oldValue) {
        const oldCssLink = this._getCssLink(oldValue);
        if (oldCssLink) {
          oldCssLink.parentElement!.removeChild(oldCssLink);
        }
      }

      this._addCustomCss(newValue);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const align = this.properties.align || 'left';
    const {
      scrollBehavior,
      position,
      theme,
      isDark,
      showHomeItem,
      homeItemText,
      customCssUrl
    } = this.properties;
    return {
      pages: [
        {
          header: {
            description: ''
          },
          groups: [
            {
              groupName: strings.NavGroupName,
              groupFields: [
                PropertyPaneDropdown('scrollBehavior', {
                  label: strings.ScrollBehaviorFieldLabel,
                  options: [{
                    key: 'auto',
                    text: strings.AutoScrollBehavior
                  }, {
                    key: 'smooth',
                    text: strings.SmoothScrollBehavior
                  }],
                  selectedKey: scrollBehavior || 'auto'
                }),
                PropertyPaneDropdown('position', {
                  label: strings.PositionLabel,
                  options: [{
                    key: 'section',
                    text: strings.PositionSection
                  }, {
                    key: 'top',
                    text: strings.PositionTop
                  }],
                  selectedKey: position || 'top'
                }),
                PropertyPaneDropdown('theme', {
                  label: strings.ThemeLabel,
                  options: [{
                    key: 'light',
                    text: strings.ThemeLight
                  }, {
                    key: 'theme',
                    text: strings.ThemeTheme
                  }, {
                    key: 'dark',
                    text: strings.ThemeDark
                  }],
                  selectedKey: theme ? theme : isDark ? 'dark' : 'light'
                }),
                PropertyPaneChoiceGroup('align', {
                  label: strings.AlignLabel,
                  options: [{
                    key: 'flex-start',
                    text: strings.AlignLeft,
                    checked: align === 'flex-start',
                    iconProps: {
                      officeFabricIconFontName: 'AlignLeft'
                    }
                  }, {
                    key: 'center',
                    text: strings.AlignCenter,
                    checked: align === 'center',
                    iconProps: {
                      officeFabricIconFontName: 'AlignCenter'
                    }
                  }, {
                    key: 'flex-end',
                    text: strings.AlignRight,
                    checked: align === 'flex-end',
                    iconProps: {
                      officeFabricIconFontName: 'AlignRight'
                    }
                  }]
                }),
                PropertyPaneCheckbox('showHomeItem', {
                  text: strings.HomeNavItemCbxLabel,
                  checked: showHomeItem
                }),
                PropertyPaneTextField('homeItemText', {
                  label: strings.HomeNavItemTextLabel,
                  value: homeItemText || strings.HomeNavItemDefaultText
                }),
                PropertyPaneTextField('customCssUrl', {
                  label: strings.CustomCSSLabel,
                  value: customCssUrl
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _availableSourcesChanged() {
    this._initDataSources(true);
  }

  /**
   * Initializes collection of "Anchor" data soures based on collection of existing page's data sources
   * @param reRender specifies if the web part should be rerendered
   */
  private _initDataSources(reRender?: boolean) {
    // all data sources on the page
    const availableDataSources = this.context.dynamicDataProvider.getAvailableSources();

    if (availableDataSources && availableDataSources.length) {
      // "Ahchor" data sources cached in the web part from prev call
      const dataSources = this._dataSources;
      //
      // removing deleted data sources if any
      //
      const availableDataSourcesIds = availableDataSources.map(ds => ds.id);
      for (let i = 0, len = dataSources.length; i < len; i++) {
        let dataSource = dataSources[i];
        if (availableDataSourcesIds.indexOf(dataSource.id) == -1) {
          dataSources.splice(i, 1);
          try {
            this.context.dynamicDataProvider.unregisterPropertyChanged(dataSource.id, 'anchor', this._onAnchorChanged);
          }
          catch (err) { }
          i--;
          len--;
        }
      }

      //
      // adding new data sources
      //
      for (let i = 0, len = availableDataSources.length; i < len; i++) {
        let dataSource = availableDataSources[i];
        if (!dataSource.getPropertyDefinitions().filter(pd => pd.id === 'anchor').length) {
          continue; // we don't need data sources other than anchors
        }
        if (!dataSources || !dataSources.filter(ds => ds.id === dataSource.id).length) {
          dataSources.push(dataSource);
          this.context.dynamicDataProvider.registerPropertyChanged(dataSource.id, 'anchor', this._onAnchorChanged);
        }
      }
    }

    if (reRender) {
      this.render();
    }
  }

  /**
   * Fired when any of anchors has been changed
   */
  private _onAnchorChanged() {
    this.render();
  }

  private _addCustomCss(customCssUrl: string) {
    if (customCssUrl) {
      //SPComponentLoader doesn't work on Comm Sites: https://github.com/SharePoint/sp-dev-docs/issues/3503
      //SPComponentLoader.loadCss(this.properties.customCssUrl);
      const head = document.head;
      let styleEl = this._getCssLink(customCssUrl);
      if (!styleEl) {
        styleEl = document.createElement('link');
        styleEl.setAttribute('rel', 'stylesheet');
        styleEl.setAttribute('href', customCssUrl);
        head.appendChild(styleEl);
      }
    }
  }

  private _getCssLink(customCssUrl: string): Element | null {
    const head = document.head;
    return head.querySelector(`link[href="${customCssUrl}"]`);
  }
}
