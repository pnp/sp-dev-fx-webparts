import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
//import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'PageSectionsNavigationStrings';
import { PageSectionsNavigation, IPageSectionsNavigationProps } from './components/PageSectionsNavigation';
import { IDynamicDataSource, IDynamicDataCallables, IDynamicDataPropertyDefinition } from '@microsoft/sp-dynamic-data';
import { IAnchorItem } from '../../common/model';
import { NavPosition, NavAlign } from '../../common/types';

export interface IPageSectionsNavigationWebPartProps {
  scrollBehavior: ScrollBehavior;
  position: NavPosition;
  isDark: boolean;
  align: NavAlign;
  showHomeItem: boolean;
  homeItemText: string;
  customCssUrl: string;
}

export default class PageSectionsNavigationWebPart extends BaseClientSideWebPart<IPageSectionsNavigationWebPartProps> implements IDynamicDataCallables {

  private _dataSources: IDynamicDataSource[] = [];
  //private _anchors: IAnchorItem[];


  protected onInit(): Promise<void> {
    const { customCssUrl } = this.properties;

    this._onAnchorChanged = this._onAnchorChanged.bind(this);
    this._initDataSources();
    this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._initDataSources.bind(this, true));

    this._addCustomCss(customCssUrl);

    this.context.dynamicDataSourceManager.initializeSource(this);

    return super.onInit();
  }

  public render(): void {

    const anchors = this._dataSources && this._dataSources.map(ds => ds.getPropertyValue('anchor') as IAnchorItem);
    const {
      scrollBehavior,
      position,
      isDark,
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
        theme: isDark ? 'dark' : 'light',
        align: align,
        isEditMode: this.displayMode === DisplayMode.Edit,
        homeItem: showHomeItem && homeItemText
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [{
      id: 'position',
      title: 'position'
    }];
  }
  public getPropertyValue(propertyId: string): NavPosition {
    switch (propertyId) {
      case 'position':
        return this.properties.position;
    }

    throw new Error('Bad property id');
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

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
          oldCssLink.parentElement.removeChild(oldCssLink);
        }
      }

      this._addCustomCss(newValue);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const align = this.properties.align || 'left';
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
                  selectedKey: this.properties.scrollBehavior || 'auto'
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
                  selectedKey: this.properties.position || 'top'
                }),
                PropertyPaneToggle('isDark', {
                  label: strings.ThemeLabel,
                  offText: strings.ThemeLight,
                  onText: strings.ThemeDark,
                  checked: !!this.properties.isDark
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
                  checked: this.properties.showHomeItem
                }),
                PropertyPaneTextField('homeItemText', {
                  label: strings.HomeNavItemTextLabel,
                  value: this.properties.homeItemText || strings.HomeNavItemDefaultText
                }),
                PropertyPaneTextField('customCssUrl', {
                  label: strings.CustomCSSLabel,
                  value: this.properties.customCssUrl
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _initDataSources(reRender?: boolean) {
    const availableDataSources = this.context.dynamicDataProvider.getAvailableSources();

    if (availableDataSources && availableDataSources.length) {
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
          //this._anchors.push(dataSource.getPropertyValue('anchor') as IAnchorItem);
        }
      }
    }

    // TODO: unregister events for deleted data sources

    //this._dataSources = availableDataSources;

    if (reRender) {
      this.render();
    }
  }

  private _onAnchorChanged() {
    this.render();
    //console.log(ds.getPropertyValue('anchor'));
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
