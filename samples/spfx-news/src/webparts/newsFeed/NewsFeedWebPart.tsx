import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneField,
  PropertyPaneChoiceGroup,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Theme } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { IApplicationContext } from '@spteck/react-controls-v2';
import { SPFxContextAdapter } from '@spteck/react-controls-v2-spfx-adapter';

import * as strings from 'NewsFeedWebPartStrings';
import { INewsFeedWebPartProps } from '../../models/INewsFeedWebPartProps';
import { SPFxHostType } from '../../models/SPFxHostType';
import { LAYOUT_OPTIONS } from '../../constants/constants';
import NewsFeedWebPartRoot from '../../components/NewsFeedWebPartRoot';
import { PropertyPaneDataSource } from '../../PropertyFields/DataSource/DataSourceField';
import { PropertyPaneMaxNews } from '../../PropertyFields/MaxNews/MaxNewsField';
import { PropertyPaneMarqueeDirection } from '../../PropertyFields/MarqueeDirection/MarqueeDirectionField';
import { PropertyPaneHeight } from '../../PropertyFields/Height/HeightField';
import { PropertyPaneCardLines } from '../../PropertyFields/CardLines/CardLinesField';
import { PropertyPaneAllowDrag } from '../../PropertyFields/AllowDrag/AllowDragField';
import { PropertyPaneShowAuthorDate } from '../../PropertyFields/ShowAuthorDate/ShowAuthorDateField';
import { PropertyPaneShowViewsLikes } from '../../PropertyFields/ShowViewsLikes/ShowViewsLikesField';
import { PropertyPaneShowComments } from '../../PropertyFields/ShowComments/ShowCommentsField';
import { PropertyPaneShowShare } from '../../PropertyFields/ShowShare/ShowShareField';

export default class NewsFeedWebPart extends BaseClientSideWebPart<INewsFeedWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: Theme | undefined = undefined;
  private _themeString: string = '';
  private _isTeamsContext: boolean = false;
  private _hostType: SPFxHostType = 'sharepoint';
  private _universalContext: IApplicationContext | undefined = undefined;

  protected async onInit(): Promise<void> {
    // Set property defaults
    if (!this.properties.layout) {
      this.properties.layout = 'feature';
    }
    if (this.properties.height === undefined || this.properties.height === null) {
      this.properties.height = '100%';
    } else if (typeof (this.properties.height as unknown) === 'number') {
      this.properties.height = `${this.properties.height}px`;
    }
    if (!this.properties.marqueeDirection) {
      this.properties.marqueeDirection = 'vertical';
    }
    if (!this.properties.dataSourceMode) {
      this.properties.dataSourceMode = 'all';
    }
    if (!this.properties.selectedSites) {
      this.properties.selectedSites = [];
    }
    if (!this.properties.maxNews) {
      this.properties.maxNews = 10;
    }
    if (this.properties.refreshIntervalMinutes === undefined) {
      this.properties.refreshIntervalMinutes = 5;
    }
    if (this.properties.headlineLines === undefined) {
      this.properties.headlineLines = 2;
    }
    if (this.properties.bodyLines === undefined) {
      this.properties.bodyLines = 2;
    }
    if (this.properties.allowDrag === undefined) {
      this.properties.allowDrag = false;
    }
    if (this.properties.showAuthorDate === undefined) {
      this.properties.showAuthorDate = true;
    }
    if (this.properties.showViewsLikes === undefined) {
      this.properties.showViewsLikes = true;
    }
    if (this.properties.showComments === undefined) {
      this.properties.showComments = true;
    }
    if (this.properties.showShare === undefined) {
      this.properties.showShare = true;
    }

    // Detect host
    if (this.context.sdks.microsoftTeams) {
      this._isTeamsContext = true;
      this._hostType = 'teams';
    }

    // Build IApplicationContext
    this._universalContext = SPFxContextAdapter.adapt(
      this.context as never,
      'NewsFeedWebPart'
    );

    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    this._themeString = JSON.stringify(currentTheme);
    this._theme = createV9Theme(currentTheme as unknown as Parameters<typeof createV9Theme>[0]);
    this.render();
  }

  public render(): void {
    if (!this._universalContext) return;

    const element = React.createElement(NewsFeedWebPartRoot, {
      context: this._universalContext,
      spfxContext: this.context,
      theme: this._theme!,
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: this._isTeamsContext,
      layout: this.properties.layout,
      height: this.properties.height,
      marqueeDirection: this.properties.marqueeDirection,
      dataSourceMode: this.properties.dataSourceMode,
      selectedSites: this.properties.selectedSites,
      maxNews: this.properties.maxNews,
      refreshIntervalMinutes: this.properties.refreshIntervalMinutes,
      headlineLines: this.properties.headlineLines,
      bodyLines: this.properties.bodyLines,
      allowDrag: this.properties.allowDrag,
      showAuthorDate: this.properties.showAuthorDate,
      showViewsLikes: this.properties.showViewsLikes,
      showComments: this.properties.showComments,
      showShare: this.properties.showShare,
      displayMode: this.displayMode,
      onConfigure: () => this.context.propertyPane.open(),
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const isMarquee = this.properties.layout === 'marquee';
    const isDraggableLayout = (['grid', 'list', 'masonry', 'feature', 'mosaic'] as string[]).indexOf(this.properties.layout) !== -1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layoutFields: IPropertyPaneField<any>[] = [
      PropertyPaneChoiceGroup('layout', {
        label: strings.LayoutLabel,
        options: LAYOUT_OPTIONS,
      }),
    ];

    if (isMarquee) {
      layoutFields.push(
        PropertyPaneMarqueeDirection('marqueeDirection', {
          label: strings.MarqueeDirectionLabel,
          value: this.properties.marqueeDirection,
          theme: this._theme!,
          hostType: this._hostType,
          onChange: (value) => {
            this.properties.marqueeDirection = value;
            this.render();
          },
        })
      );
    }

    if (isDraggableLayout) {
      layoutFields.push(
        PropertyPaneAllowDrag('allowDrag', {
          label: strings.AllowDragLabel,
          value: this.properties.allowDrag,
          theme: this._theme!,
          hostType: this._hostType,
          onChange: (value) => {
            this.properties.allowDrag = value;
            this.render();
          },
        })
      );
    }

    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.LayoutGroupName,
              isCollapsed: false,
              groupFields: layoutFields,
            },
            {
              groupName: strings.DisplayGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneHeight('height', {
                  label: strings.HeightLabel,
                  value: this.properties.height,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.height = value;
                    this.render();
                  },
                }),
                PropertyPaneMaxNews('maxNews', {
                  label: strings.MaxNewsLabel,
                  value: this.properties.maxNews,
                  min: 1,
                  max: 100,
                  step: 1,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.maxNews = value;
                    this.render();
                  },
                }),
                PropertyPaneCardLines('cardLines', {
                  headlineLinesLabel: strings.HeadlineLinesLabel,
                  bodyLinesLabel: strings.BodyLinesLabel,
                  headlineLines: this.properties.headlineLines,
                  bodyLines: this.properties.bodyLines,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (headlineLines, bodyLines) => {
                    this.properties.headlineLines = headlineLines;
                    this.properties.bodyLines = bodyLines;
                    this.render();
                  },
                }),
                PropertyPaneShowAuthorDate('showAuthorDate', {
                  label: strings.ShowAuthorDateLabel,
                  value: this.properties.showAuthorDate,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.showAuthorDate = value;
                    this.render();
                  },
                }),
                PropertyPaneShowViewsLikes('showViewsLikes', {
                  label: strings.ShowViewsLikesLabel,
                  value: this.properties.showViewsLikes,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.showViewsLikes = value;
                    this.render();
                  },
                }),
                PropertyPaneShowComments('showComments', {
                  label: strings.ShowCommentsLabel,
                  value: this.properties.showComments,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.showComments = value;
                    this.render();
                  },
                }),
                PropertyPaneShowShare('showShare', {
                  label: strings.ShowShareLabel,
                  value: this.properties.showShare,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.showShare = value;
                    this.render();
                  },
                }),
              ],
            },
            {
              groupName: strings.DataSourceGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneDataSource('dataSource', {
                  spfxContext: this.context,
                  dataSourceMode: this.properties.dataSourceMode,
                  selectedSites: this.properties.selectedSites,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: ({ dataSourceMode, selectedSites }) => {
                    this.properties.dataSourceMode = dataSourceMode;
                    this.properties.selectedSites = selectedSites;
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
