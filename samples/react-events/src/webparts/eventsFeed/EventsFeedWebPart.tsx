import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneField,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Theme } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { IApplicationContext } from '@spteck/react-controls-v2';
import { SPFxContextAdapter } from '@spteck/react-controls-v2-spfx-adapter';

import * as strings from 'EventsFeedWebPartStrings';
import { IEventFeedWebPartProps } from '../../models/IEventFeedWebPartProps';
import { SPFxHostType } from '../../models/SPFxHostType';
import { LAYOUT_OPTIONS } from '../../constants/constants';
import EventFeedWebPartRoot from '../../components/EventFeedWebPartRoot';
import { PropertyPaneSelectCalendar } from '../../PropertyFields/SelectCalendar/SelectCalendarField';
import { PropertyPaneMaxEvents } from '../../PropertyFields/MaxEvents/MaxEventsField';
import { PropertyPaneMarqueeDirection } from '../../PropertyFields/MarqueeDirection/MarqueeDirectionField';
import { PropertyPaneHeight } from '../../PropertyFields/Height/HeightField';
import { PropertyPaneCardLines } from '../../PropertyFields/CardLines/CardLinesField';
import { PropertyPaneAllowDrag } from '../../PropertyFields/AllowDrag/AllowDragField';
import { PropertyPaneShowDescription } from '../../PropertyFields/ShowDescription/ShowDescriptionField';
import { PropertyPaneShowMeta } from '../../PropertyFields/ShowMeta/ShowMetaField';
import { PropertyPaneShowLocation } from '../../PropertyFields/ShowLocation/ShowLocationField';
import { PropertyPaneShowOrganizer } from '../../PropertyFields/ShowOrganizer/ShowOrganizerField';
import { PropertyPaneShowFilters } from '../../PropertyFields/ShowFilters/ShowFiltersField';


export default class EventsFeedWebPart extends BaseClientSideWebPart<IEventFeedWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: Theme | undefined = undefined;
  private _isTeamsContext: boolean = false;
  private _hostType: SPFxHostType = 'sharepoint';
  private _universalContext: IApplicationContext | undefined = undefined;

  protected async onInit(): Promise<void> {
    if (this.properties.title === undefined || this.properties.title === null) {
      this.properties.title = 'Events';
    }
    if (!this.properties.layout) {
      this.properties.layout = 'agenda';
    }
    if (this.properties.height === undefined || this.properties.height === null) {
      this.properties.height = '100%';
    } else if (typeof (this.properties.height as unknown) === 'number') {
      this.properties.height = `${this.properties.height}px`;
    }
    if (!this.properties.marqueeDirection) {
      this.properties.marqueeDirection = 'vertical';
    }
    if (!this.properties.selectedCalendars) {
      this.properties.selectedCalendars = [];
    }
    if (!this.properties.maxEvents) {
      this.properties.maxEvents = 10;
    }
    if (this.properties.refreshIntervalMinutes === undefined) {
      this.properties.refreshIntervalMinutes = 5;
    }
    if (this.properties.headlineLines === undefined) {
      this.properties.headlineLines = 2;
    }
    if (this.properties.descriptionLines === undefined) {
      this.properties.descriptionLines = 2;
    }
    if (this.properties.allowDrag === undefined) {
      this.properties.allowDrag = false;
    }
    if (this.properties.showDescription === undefined) {
      this.properties.showDescription = true;
    }
    if (this.properties.showMeta === undefined) {
      this.properties.showMeta = true;
    }
    if (this.properties.showLocation === undefined) {
      this.properties.showLocation = true;
    }
    if (this.properties.showOrganizer === undefined) {
      this.properties.showOrganizer = true;
    }
    if (this.properties.showFilters === undefined) {
      this.properties.showFilters = true;
    }

    if (this.context.sdks.microsoftTeams) {
      this._isTeamsContext = true;
      this._hostType = 'teams';
    }

    this._universalContext = SPFxContextAdapter.adapt(
      this.context as never,
      'EventsFeedWebPart'
    );

    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    this._theme = createV9Theme(currentTheme as unknown as Parameters<typeof createV9Theme>[0]);
    this.render();
  }

  public render(): void {
    if (!this._universalContext) return;

    const element = React.createElement(EventFeedWebPartRoot, {
      context: this._universalContext,
      spfxContext: this.context,
      theme: this._theme!,
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: this._isTeamsContext,
      title: this.properties.title,
      layout: this.properties.layout,
      height: this.properties.height,
      marqueeDirection: this.properties.marqueeDirection,
      selectedCalendars: this.properties.selectedCalendars,
      maxEvents: this.properties.maxEvents,
      refreshIntervalMinutes: this.properties.refreshIntervalMinutes,
      headlineLines: this.properties.headlineLines,
      descriptionLines: this.properties.descriptionLines,
      allowDrag: this.properties.allowDrag,
      showDescription: this.properties.showDescription,
      showMeta: this.properties.showMeta,
      showLocation: this.properties.showLocation,
      showOrganizer: this.properties.showOrganizer,
      showFilters: this.properties.showFilters,
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
    const isCompactList = this.properties.layout === 'compactList';
    const isDraggableLayout = (['grid', 'list', 'masonry', 'feature'] as string[]).indexOf(this.properties.layout) !== -1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layoutFields: IPropertyPaneField<any>[] = [
      PropertyPaneTextField('title', {
        label: strings.TitleLabel,
        placeholder: 'Events',
      }),
      PropertyPaneChoiceGroup('layout', {
        label: strings.LayoutLabel,
        options: LAYOUT_OPTIONS,
      }),
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
                PropertyPaneMaxEvents('maxEvents', {
                  label: strings.MaxEventsLabel,
                  value: this.properties.maxEvents,
                  min: 1,
                  max: 100,
                  step: 1,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (value) => {
                    this.properties.maxEvents = value;
                    this.render();
                  },
                }),
                PropertyPaneCardLines('cardLines', {
                  headlineLinesLabel: strings.HeadlineLinesLabel,
                  descriptionLinesLabel: strings.DescriptionLinesLabel,
                  headlineLines: this.properties.headlineLines,
                  descriptionLines: this.properties.descriptionLines,
                  showDescriptionLines: !isCompactList,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: (headlineLines, descriptionLines) => {
                    this.properties.headlineLines = headlineLines;
                    this.properties.descriptionLines = descriptionLines;
                    this.render();
                  },
                }),
                ...(!isCompactList ? [
                  PropertyPaneShowDescription('showDescription', {
                    label: strings.ShowDescriptionLabel,
                    value: this.properties.showDescription,
                    theme: this._theme!,
                    hostType: this._hostType,
                    onChange: (value) => {
                      this.properties.showDescription = value;
                      this.render();
                    },
                  }),
                  PropertyPaneShowMeta('showMeta', {
                    label: strings.ShowMetaLabel,
                    value: this.properties.showMeta,
                    theme: this._theme!,
                    hostType: this._hostType,
                    onChange: (value) => {
                      this.properties.showMeta = value;
                      this.render();
                    },
                  }),
                  PropertyPaneShowLocation('showLocation', {
                    label: strings.ShowLocationLabel,
                    value: this.properties.showLocation,
                    theme: this._theme!,
                    hostType: this._hostType,
                    onChange: (value) => {
                      this.properties.showLocation = value;
                      this.render();
                    },
                  }),
                  PropertyPaneShowOrganizer('showOrganizer', {
                    label: strings.ShowOrganizerLabel,
                    value: this.properties.showOrganizer,
                    theme: this._theme!,
                    hostType: this._hostType,
                    onChange: (value) => {
                      this.properties.showOrganizer = value;
                      this.render();
                    },
                  }),
                  PropertyPaneShowFilters('showFilters', {
                    label: strings.ShowFiltersLabel,
                    value: this.properties.showFilters,
                    theme: this._theme!,
                    hostType: this._hostType,
                    onChange: (value) => {
                      this.properties.showFilters = value;
                      this.render();
                    },
                  }),
                ] : []),
              ],
            },
            {
              groupName: strings.DataSourceGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneSelectCalendar('selectCalendar', {
                  spfxContext: this.context,
                  selectedCalendars: this.properties.selectedCalendars,
                  theme: this._theme!,
                  hostType: this._hostType,
                  onChange: ({ selectedCalendars }) => {
                    this.properties.selectedCalendars = selectedCalendars;
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
