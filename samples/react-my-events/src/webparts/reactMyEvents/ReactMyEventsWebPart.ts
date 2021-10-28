import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactMyEventsWebPartStrings';
import ReactMyEvents from './components/ReactMyEvents';
import { IReactMyEventsProps } from './components/IReactMyEventsProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { MSGraphClient } from '@microsoft/sp-http';
import { Layouts } from '../../shared/models/ILayouts';
import { DateRange } from '../../shared/models/IDateRange';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';

export interface IReactMyEventsWebPartProps {
  webpartTitle: string;
  maxEvents: number;
  dateRange: DateRange;
  layout: number;
  displayMode: DisplayMode;
}

export default class ReactMyEventsWebPart extends BaseClientSideWebPart<IReactMyEventsWebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private graphClient: MSGraphClient;


  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public render(): void {

    const { clientWidth } = this.domElement;

    const element: React.ReactElement<IReactMyEventsProps> = React.createElement(
      ReactMyEvents,
      {
        webpartTitle: this.properties.webpartTitle,
        dateRange: this.properties.dateRange,
        graphClient: this.graphClient,
        displayMode: this.displayMode,
        layout: this.properties.layout,
        context: this.context,
        clientWidth: clientWidth,
        themeVariant: this._themeVariant,
        maxEvents: this.properties.maxEvents,
        updateProperty: (value: string) => {
          this.properties.webpartTitle = value;
        },
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let maxEventsForCompact: any = [];

    if (this.properties.layout === Layouts.compact) {
      maxEventsForCompact = PropertyFieldNumber('maxEvents', {
        label: strings.NoOfEventsFieldLabel,
        key: "maxEventsFieldId",
        value: this.properties.maxEvents,
        minValue: 0
      });
    }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown("dateRange", {
                  label: strings.DateRangeFieldLabel,
                  options: [
                    { key: DateRange.AllUpcoming, text: strings.DateRangeOptionUpcoming },
                    { key: DateRange.ThisWeek, text: strings.DateRangeOptionWeek },
                    { key: DateRange.NextTwoWeeks, text: strings.DateRangeOptionTwoWeeks },
                    { key: DateRange.Month, text: strings.DateRangeOptionMonth },
                    { key: DateRange.Quarter, text: strings.DateRangeOptionQuarter }                    
                  ],
                  selectedKey: this.properties.dateRange,
                }),
                PropertyPaneChoiceGroup('layout', {
                  label: "Layouts",
                  options: [
                    {
                      iconProps: { officeFabricIconFontName: 'DockLeftMirrored' },
                      key: Layouts.compact,
                      text: "Compact"
                    },
                    {
                      iconProps: { officeFabricIconFontName: 'Tiles' },
                      key: Layouts.filmstrip,
                      text: "FilmStrip",
                    }
                  ],
                }),
                maxEventsForCompact
              ]
            }
          ]
        }
      ]
    };
  }
}
