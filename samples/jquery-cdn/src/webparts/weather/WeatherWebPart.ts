import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './Weather.module.scss';
import * as strings from 'weatherStrings';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';

import * as $ from 'jquery';
require('simpleWeather');

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {
  private container: JQuery;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `<div class="${styles.weather}"></div>`;
    }

    this.renderContents();
  }

  private renderContents(): void {
    this.container = $(`.${styles.weather}`, this.domElement);

    const location: string = this.properties.location;

    if (!location || location.length === 0) {
      this.container.html('<p>Please specify a location</p>');
      return;
    }

    const webPart: WeatherWebPart = this;

    ($ as any).simpleWeather({
      location: location,
      woeid: '',
      unit: 'c',
      success: (weather: any): void => {
        const html: string =
          `<h2><i class="icon${weather.code}"></i> ${weather.temp}&deg;${weather.units.temp}</h2>
           <ul><li>${weather.city} ${weather.region}</li></ul>`;
        webPart.container.html(html)
          .removeAttr('style')
          .css('background',
            `url('http://loremflickr.com/500/139/${location}')`);
      },
      error: (error: any): void => {
        webPart.container.html(`<p>${error.message}</p>`).removeAttr('style');
      }
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
