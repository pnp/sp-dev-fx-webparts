import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField } from "@microsoft/sp-property-pane";

import * as strings from 'EventDetailsWebPartStrings';
import { EventDetails, IEventDetailsProps } from './components';
import { IEvent } from '../../data';
import { DynamicProperty } from '@microsoft/sp-component-base';

/**
 * Represents properties of the Event details web part
 */
export interface IEventDetailsWebPartProps {
  /**
   * Event to show the details for
   */
  event: DynamicProperty<IEvent>;
  /**
   * Web part title
   */
  title: string;
}

/**
 * Events web part. Shows detail information about a selected event retrieved
 * from the connected dynamic data source.
 */
export default class EventDetailsWebPart extends BaseClientSideWebPart<IEventDetailsWebPartProps> {
  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  public render(): void {
    const needsConfiguration: boolean = !this.properties.event.tryGetSource();

    const element: React.ReactElement<IEventDetailsProps> = React.createElement(
      EventDetails,
      {
        needsConfiguration: needsConfiguration,
        event: this.properties.event,
        onConfigure: this._onConfigure,
        displayMode: this.displayMode,
        title: this.properties.title,
        updateProperty: (value: string): void => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'event': {
        dynamicPropertyType: 'object'
      }
    };
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: 'Select event source',
                  fields: [
                    PropertyPaneDynamicField('event', {
                      label: 'Event source'
                    })
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
