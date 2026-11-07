import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneField,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Theme } from '@fluentui/react-components';

import * as strings from 'EventsLayoutsWebPartStrings';
import { CalendarSystem, DateRangeKey, DirectionMode, IEventSource, LayoutType } from './models';
import { buildLocale } from './common/dates';
import { createFluentTheme, getTeamsTheme } from './common/theme';
import { EventService } from './services/EventService';
import { SourceSearchService } from './services/SourceSearchService';
import EventsLayouts from './components/EventsLayouts';
import { IEventsLayoutsProps } from './components/IEventsLayoutsProps';
import { RANGE_LABELS } from './components/EventsHeader';
import { PropertyPaneSourcePicker } from './propertyPane/PropertyPaneSourcePicker';

export interface IEventsLayoutsWebPartProps {
  title: string;
  layout: LayoutType;
  height: number;
  autoplay: boolean;
  maxEvents: number;
  titleLines: number;
  descriptionLines: number;
  showDescription: boolean;
  showLocation: boolean;
  showOrganizer: boolean;
  showCategory: boolean;
  showImage: boolean;
  showDateFilter: boolean;
  seeAllUrl: string;
  sources: IEventSource[];
  dateRange: DateRangeKey;
  direction: DirectionMode;
  locale: string;
  calendar: CalendarSystem;
  latinDigits: boolean;
}

const LAYOUT_ICONS: Record<LayoutType, string> = {
  agenda: 'CalendarAgenda',
  grid: 'GridViewMedium',
  list: 'BulletedList',
  filmstrip: 'PhotoCollection',
  carousel: 'Slideshow',
  timeline: 'Timeline'
};

const LAYOUT_LABELS: Record<LayoutType, string> = {
  agenda: strings.LayoutAgenda,
  grid: strings.LayoutGrid,
  list: strings.LayoutList,
  filmstrip: strings.LayoutFilmstrip,
  carousel: strings.LayoutCarousel,
  timeline: strings.LayoutTimeline
};

export default class EventsLayoutsWebPart extends BaseClientSideWebPart<IEventsLayoutsWebPartProps> {
  private _theme: Theme = createFluentTheme(undefined);
  private _eventService!: EventService;
  private _searchService!: SourceSearchService;

  protected async onInit(): Promise<void> {
    await super.onInit();
    const { spHttpClient, msGraphClientFactory, pageContext } = this.context;
    this._eventService = new EventService(spHttpClient, msGraphClientFactory, pageContext.web.absoluteUrl);
    this._searchService = new SourceSearchService(spHttpClient, msGraphClientFactory, pageContext.web.absoluteUrl);

    // In Teams, Outlook and Office the host theme (light, dark, high contrast) wins over the site theme.
    const teams = this.context.sdks.microsoftTeams;
    if (teams) {
      const hostContext = await teams.teamsJs.app.getContext();
      this._theme = getTeamsTheme(hostContext.app.theme);
      teams.teamsJs.app.registerOnThemeChangeHandler(themeName => {
        this._theme = getTeamsTheme(themeName);
        this.render();
      });
    }
  }

  /** Called on load and whenever the site theme or the section background changes. */
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (this.context.sdks.microsoftTeams) {
      return;
    }
    this._theme = createFluentTheme(currentTheme);
    if (this.renderedOnce) {
      this.render();
    }
  }

  public render(): void {
    const props = this.properties;
    const element: React.ReactElement<IEventsLayoutsProps> = React.createElement(EventsLayouts, {
      title: props.title,
      layout: props.layout,
      sources: props.sources || [],
      dateRange: props.dateRange,
      maxEvents: props.maxEvents,
      height: props.height,
      autoplay: props.autoplay,
      showDateFilter: props.showDateFilter,
      seeAllUrl: props.seeAllUrl,
      display: {
        titleLines: props.titleLines,
        descriptionLines: props.descriptionLines,
        showDescription: props.showDescription,
        showLocation: props.showLocation,
        showOrganizer: props.showOrganizer,
        showCategory: props.showCategory,
        showImage: props.showImage
      },
      theme: this._theme,
      dir: this._direction,
      locale: this._locale,
      service: this._eventService,
      onConfigure: this.displayMode === DisplayMode.Edit ? () => this.context.propertyPane.open() : undefined
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private get _direction(): 'ltr' | 'rtl' {
    const { direction } = this.properties;
    if (direction === 'ltr' || direction === 'rtl') {
      return direction;
    }
    return this.context.pageContext.cultureInfo.isRightToLeft ? 'rtl' : 'ltr';
  }

  private get _locale(): string {
    const { locale, calendar, latinDigits } = this.properties;
    const base = (locale || '').trim() || this.context.pageContext.cultureInfo.currentCultureName || 'en-US';
    return buildLocale(base, calendar || 'auto', !!latinDigits);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const layouts = Object.keys(LAYOUT_ICONS) as LayoutType[];
    const ranges = Object.keys(RANGE_LABELS) as DateRangeKey[];
    const carouselFields: IPropertyPaneField<unknown>[] = this.properties.layout === 'carousel'
      ? [PropertyPaneToggle('autoplay', { label: strings.AutoplayFieldLabel })]
      : [];

    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: strings.LayoutGroupName,
            groupFields: [
              PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
              PropertyPaneChoiceGroup('layout', {
                label: strings.LayoutFieldLabel,
                options: layouts.map(key => ({
                  key,
                  text: LAYOUT_LABELS[key],
                  iconProps: { officeFabricIconFontName: LAYOUT_ICONS[key] }
                }))
              }),
              ...carouselFields,
              PropertyPaneSlider('height', { label: strings.HeightFieldLabel, min: 0, max: 1200, step: 20 })
            ]
          },
          {
            groupName: strings.DisplayGroupName,
            groupFields: [
              PropertyPaneSlider('maxEvents', { label: strings.MaxEventsFieldLabel, min: 1, max: 50 }),
              PropertyPaneSlider('titleLines', { label: strings.TitleLinesFieldLabel, min: 1, max: 4 }),
              PropertyPaneSlider('descriptionLines', { label: strings.DescriptionLinesFieldLabel, min: 1, max: 6 }),
              PropertyPaneToggle('showDescription', { label: strings.ShowDescriptionFieldLabel }),
              PropertyPaneToggle('showImage', { label: strings.ShowImageFieldLabel }),
              PropertyPaneToggle('showLocation', { label: strings.ShowLocationFieldLabel }),
              PropertyPaneToggle('showOrganizer', { label: strings.ShowOrganizerFieldLabel }),
              PropertyPaneToggle('showCategory', { label: strings.ShowCategoryFieldLabel }),
              PropertyPaneToggle('showDateFilter', { label: strings.ShowDateFilterFieldLabel }),
              PropertyPaneTextField('seeAllUrl', { label: strings.SeeAllUrlFieldLabel, placeholder: 'https://' })
            ]
          },
          {
            groupName: strings.DataGroupName,
            groupFields: [
              PropertyPaneSourcePicker('sources', {
                label: strings.SourcesFieldLabel,
                description: strings.SourcesFieldDescription,
                selected: this.properties.sources || [],
                searchService: this._searchService,
                theme: this._theme,
                dir: this._direction
              }),
              PropertyPaneDropdown('dateRange', {
                label: strings.DefaultRangeFieldLabel,
                options: ranges.map(key => ({ key, text: RANGE_LABELS[key] }))
              })
            ]
          },
          {
            groupName: strings.LanguageGroupName,
            isCollapsed: true,
            groupFields: [
              PropertyPaneDropdown('direction', {
                label: strings.DirectionFieldLabel,
                options: [
                  { key: 'auto', text: strings.DirectionAuto },
                  { key: 'ltr', text: strings.DirectionLtr },
                  { key: 'rtl', text: strings.DirectionRtl }
                ]
              }),
              PropertyPaneTextField('locale', {
                label: strings.LocaleFieldLabel,
                description: strings.LocaleFieldDescription,
                placeholder: this.context.pageContext.cultureInfo.currentCultureName
              }),
              PropertyPaneDropdown('calendar', {
                label: strings.CalendarFieldLabel,
                options: [
                  { key: 'auto', text: strings.CalendarAuto },
                  { key: 'gregory', text: strings.CalendarGregorian },
                  { key: 'islamic-umalqura', text: strings.CalendarHijri }
                ]
              }),
              PropertyPaneToggle('latinDigits', { label: strings.LatinDigitsFieldLabel })
            ]
          }
        ]
      }]
    };
  }
}
