import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import { spfi, SPFI, SPFx as spSPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/search';
import { graphfi, GraphFI, SPFx as graphSPFx } from '@pnp/graph';
import '@pnp/graph/users';

import * as strings from 'MyWorkspacesHubWebPartStrings';
import MyWorkspacesHub from './components/MyWorkspacesHub';
import { IMyWorkspacesHubProps } from './components/IMyWorkspacesHubProps';
import { DEFAULT_SETTINGS, IMySitesSettings, MySitesTab } from './components/IMySitesSettings';
import { resolveFluentTheme } from '../../common/utils';

export interface IMyWorkspacesHubWebPartProps {
  title: string;
  defaultTab?: MySitesTab;
  showDashboard?: boolean;
  enableSiteContent?: boolean;
  enableRecentFiles?: boolean;
  enableFollow?: boolean;
  enableMembership?: boolean;
  enableTypeFilter?: boolean;
  followedStarColor?: string;
  enableFullWidth?: boolean;
}

export type IMySitesInfoWebPartProps = IMyWorkspacesHubWebPartProps;

interface IStyleSnapshot {
  element: HTMLElement;
  cssText: string;
}

export default class MyWorkspacesHubWebPart extends BaseClientSideWebPart<IMyWorkspacesHubWebPartProps> {

  private _isDarkTheme: boolean = false;
  private readonly _isHighContrast: boolean = false;
  private _sp: SPFI | undefined;
  private _graph: GraphFI | undefined;
  private _fullWidthSnapshots: IStyleSnapshot[] = [];
  private _fullWidthFrame: number | undefined;
  private _hasDisposed: boolean = false;

  private resolveSettings(): IMySitesSettings {
    const props = this.properties;
    const pick = (value: boolean | undefined, fallback: boolean): boolean =>
      value ?? fallback;
    return {
      defaultTab: props.defaultTab ?? DEFAULT_SETTINGS.defaultTab,
      showDashboard: pick(props.showDashboard, DEFAULT_SETTINGS.showDashboard),
      enableSiteContent: pick(props.enableSiteContent, DEFAULT_SETTINGS.enableSiteContent),
      enableRecentFiles: pick(props.enableRecentFiles, DEFAULT_SETTINGS.enableRecentFiles),
      enableFollow: pick(props.enableFollow, DEFAULT_SETTINGS.enableFollow),
      enableMembership: pick(props.enableMembership, DEFAULT_SETTINGS.enableMembership),
      enableTypeFilter: pick(props.enableTypeFilter, DEFAULT_SETTINGS.enableTypeFilter),
      followedStarColor: props.followedStarColor ?? DEFAULT_SETTINGS.followedStarColor
    };
  }

  private snapshotElement(element: HTMLElement): void {
    if (!this._fullWidthSnapshots.some((snapshot) => snapshot.element === element)) {
      this._fullWidthSnapshots.push({ element, cssText: element.style.cssText });
    }
  }

  private restoreFullWidthStyles(): void {
    if (this._fullWidthFrame !== undefined) {
      globalThis.cancelAnimationFrame(this._fullWidthFrame);
      this._fullWidthFrame = undefined;
    }
    for (const snapshot of this._fullWidthSnapshots) {
      snapshot.element.style.cssText = snapshot.cssText;
    }
    this._fullWidthSnapshots = [];
  }

  private scheduleFullWidthMode(): void {
    if (!this.properties.enableFullWidth) {
      this.restoreFullWidthStyles();
      return;
    }

    if (this._fullWidthFrame !== undefined) {
      globalThis.cancelAnimationFrame(this._fullWidthFrame);
    }

    this._fullWidthFrame = globalThis.requestAnimationFrame(() => {
      this._fullWidthFrame = undefined;
      if (this._hasDisposed || !this.properties.enableFullWidth) {
        return;
      }

      try {
        this.applyFullWidthMode();
      } catch {
        this.restoreFullWidthStyles();
      }
    });
  }

  private applyFullWidthMode(): void {
    this.restoreFullWidthStyles();

    const host = this.domElement;
    const canvasControl = host.closest('[data-automation-id="CanvasControl"]') as HTMLElement | null;
    const fullBleedElement = canvasControl ?? host.parentElement ?? host;
    const ancestors: HTMLElement[] = [];
    let current = host.parentElement;

    while (current && current !== fullBleedElement.parentElement && ancestors.length < 6) {
      ancestors.push(current);
      current = current.parentElement;
    }

    for (const element of [host, ...ancestors]) {
      this.snapshotElement(element);
      element.style.maxWidth = 'none';
      element.style.width = '100%';
      element.style.boxSizing = 'border-box';
    }

    this.snapshotElement(fullBleedElement);
    fullBleedElement.style.position = 'relative';
   
    fullBleedElement.style.width = '90vw';
    fullBleedElement.style.maxWidth = '90vw';
    fullBleedElement.style.marginLeft = 'auto';
    fullBleedElement.style.marginRight = 'auto';
    fullBleedElement.style.boxSizing = 'border-box';
  }

  public render(): void {
    if (!this._sp || !this._graph) {
      this.domElement.innerHTML = '';
      return;
    }

    const fluentTheme = resolveFluentTheme({
      isDark: this._isDarkTheme,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      isHighContrast: this._isHighContrast
    });

    const element: React.ReactElement<IMyWorkspacesHubProps> = React.createElement(
      MyWorkspacesHub,
      {
        context: this.context,
        sp: this._sp,
        graph: this._graph,
        fluentTheme,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        title: this.properties.title,
        settings: this.resolveSettings()
      }
    );

    ReactDom.render(element, this.domElement);
    this.scheduleFullWidthMode();
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sp = spfi().using(spSPFx(this.context));
    this._graph = graphfi().using(graphSPFx(this.context));
    this.render();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    this.render();
  }

  protected onDispose(): void {
    this._hasDisposed = true;
    ReactDom.unmountComponentAtNode(this.domElement);
    this.restoreFullWidthStyles();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    // The follow toggle gates the enabled state of the star colour field.
    if (propertyPath === 'enableFollow') {
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const followEnabled = this.properties.enableFollow ?? DEFAULT_SETTINGS.enableFollow;

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.GeneralGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneChoiceGroup('defaultTab', {
                  label: strings.DefaultTabLabel,
                  options: [
                    { key: 'dashboard', text: strings.TabDashboardLabel },
                    { key: 'all', text: strings.TabAllSitesLabel }
                  ]
                })
              ]
            },
            {
              groupName: strings.FeaturesGroupName,
              groupFields: [
                PropertyPaneLabel('featuresInfo', {
                  text: strings.FeaturesGroupDescription
                }),
                PropertyPaneToggle('showDashboard', {
                  label: strings.ShowDashboardLabel
                }),
                PropertyPaneToggle('enableSiteContent', {
                  label: strings.EnableSiteContentLabel
                }),
                PropertyPaneToggle('enableRecentFiles', {
                  label: strings.EnableRecentFilesLabel
                }),
                PropertyPaneToggle('enableFollow', {
                  label: strings.EnableFollowLabel
                }),
                PropertyPaneToggle('enableMembership', {
                  label: strings.EnableMembershipLabel
                }),
                PropertyPaneToggle('enableTypeFilter', {
                  label: strings.EnableTypeFilterLabel
                }),
                PropertyFieldColorPicker('followedStarColor', {
                  label: strings.FollowedStarColorLabel,
                  selectedColor: this.properties.followedStarColor ?? DEFAULT_SETTINGS.followedStarColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: !followEnabled,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'followedSiteRowColorFieldId'
                }),
                PropertyPaneToggle('enableFullWidth', {
                  label: strings.EnableFullWidthLabel,
                  onText: strings.EnableFullWidthOnText,
                  offText: strings.EnableFullWidthOffText
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

export const MySitesInfoWebPart = MyWorkspacesHubWebPart;
