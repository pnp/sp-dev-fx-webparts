import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import * as strings from 'EventsWebPartStrings';
import { Events } from './components';
import { IEventsProps } from './components/IEventsProps';

import { sp } from '@pnp/sp';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';
import { IEvent, ILocation } from '../../data';

/**
 * Properties of the Events web part
 */
export interface IEventsWebPartProps {
  /**
   * Web part title
   */
  title: string;
}

/**
 * Events web part. Shows list of events retrieved from a SharePoint list
 */
export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> implements IDynamicDataCallables {
  /**
   * Currently selected event
   */
  private _selectedEvent: IEvent;

  /**
   * Event handler for selecting an event in the list
   */
  private _eventSelected = (event: IEvent): void => {
    // store the currently selected event in the class variable. Required
    // so that connected component will be able to retrieve its value
    this._selectedEvent = event;
    // notify subscribers that the selected event has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('event');
    // notify subscribers that the selected location has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('location');
  }

  protected onInit(): Promise<void> {
    // setup PnPjs context
    sp.setup({
      spfxContext: this.context
    });
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);

    return Promise.resolve();
  }

  /**
   * Return list of dynamic data properties that this dynamic data source
   * returns
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'event',
        title: 'Event'
      },
      {
        id: 'location',
        title: 'Location'
      }
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): IEvent | ILocation {
    switch (propertyId) {
      case 'event':
        return this._selectedEvent;
      case 'location':
        return this._selectedEvent ? { city: this._selectedEvent.city, address: this._selectedEvent.address } : undefined;
    }

    throw new Error('Bad property id');
  }

  public render(): void {
    const element: React.ReactElement<IEventsProps> = React.createElement(
      Events,
      {
        displayMode: this.displayMode,
        onEventSelected: this._eventSelected,
        title: this.properties.title,
        updateProperty: (value: string): void => {
          this.properties.title = value;
        },
        siteUrl: this.context.pageContext.web.serverRelativeUrl
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
    return {
      pages: []
    };
  }
}
