import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import HotDeskBooking from './components/HotDeskBooking';
import { IHotDeskBookingProps } from './components/IHotDeskBookingProps';
import * as strings from 'HotDeskBookingWebPartStrings';

export interface IHotDeskBookingWebPartProps {
  title: string;
  resourcesListName: string;
  bookingsListName: string;
  isAdminMode: boolean;
  defaultResourceType: string;
}

export default class HotDeskBookingWebPart extends BaseClientSideWebPart<IHotDeskBookingWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IHotDeskBookingProps> = React.createElement(
      HotDeskBooking,
      {
        title: this.properties.title,
        resourcesListName: this.properties.resourcesListName || 'HotDeskResources',
        bookingsListName: this.properties.bookingsListName || 'HotDeskBookings',
        isAdminMode: this.properties.isAdminMode || false,
        defaultResourceType: this.properties.defaultResourceType || '',
        context: this.context
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneTextField('resourcesListName', { label: strings.ResourcesListNameFieldLabel }),
                PropertyPaneTextField('bookingsListName', { label: strings.BookingsListNameFieldLabel }),
                PropertyPaneTextField('defaultResourceType', { label: strings.DefaultResourceTypeFieldLabel }),
                PropertyPaneToggle('isAdminMode', { label: strings.AdminModeFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
