import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-webpart-base';

import {   
  Environment,
  EnvironmentType,
  Version 
} from '@microsoft/sp-core-library';


import * as strings from 'ReactSlideSwiperWebPartStrings';
import ReactSlideSwiper from './components/ReactSlideSwiper';
import { IReactSlideSwiperProps } from './components/IReactSlideSwiperProps';
import { IListService } from './services/IListService';
import { ListMock } from './services/ListMock';
import { ListSharePoint } from './services/ListSharePoint';

export interface IReactSlideSwiperWebPartProps {
  enableNavigation: boolean;
  enablePagination: boolean;
  enableAutoplay: boolean;
  delayAutoplay: number;
  disableAutoplayOnInteraction: boolean;
  slidesPerView: string;
  slidesPerGroup: string;
  spaceBetweenSlides: string;
  enableGrabCursor: boolean;
  enableLoop: boolean;
  listName: string;
}

export default class ReactSlideSwiperWebPart extends BaseClientSideWebPart<IReactSlideSwiperWebPartProps> {

  public render(): void {
    var listProvider: IListService;

    //use the mock service if running locally, otherwise use the SharePoint List Service
    if (Environment.type === EnvironmentType.Local) {
      listProvider = new ListMock();
    }
    else if (Environment.type == EnvironmentType.SharePoint) {
      listProvider = this.context.serviceScope.consume(ListSharePoint.serviceKey);
    }

    const element: React.ReactElement<IReactSlideSwiperProps> = React.createElement(
      ReactSlideSwiper,
      {
        listService: listProvider,
        swiperOptions: this.properties,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Swiper Options'
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.GeneralGroupName,
              groupFields: [
                PropertyPaneToggle('enableNavigation', {
                  label: strings.EnableNavigation
                }),
                PropertyPaneToggle('enablePagination', {
                  label: strings.EnablePagination,
                  checked: true
                }),
                PropertyPaneTextField('slidesPerView', {
                  label: strings.SlidesPerWiew,
                  value: '3'
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListName,
                  value: 'Swiper Content'
                })
              ]
            },
            {
              groupName: strings.AutoplayGroupName,
              groupFields: [
                PropertyPaneToggle('enableAutoplay', {
                  label: strings.EnableAutoplay
                }),
                PropertyPaneTextField('delayAutoplay', {
                  label: strings.DelayAutoplay,
                  description: strings.Miliseconds,
                  value: '2500',
                  disabled: !this.properties.enableAutoplay
                }),
                PropertyPaneToggle('disableAutoplayOnInteraction', {
                  label: strings.DisableAutoplayOnInteraction,
                  disabled: !this.properties.enableAutoplay
                })
              ],
              isCollapsed: true
            },
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [
                PropertyPaneTextField('slidesPerGroup', {
                  label: strings.SlidesPerGroup,
                  value: '3'
                }),
                PropertyPaneTextField('spaceBetweenSlides', {
                  label: strings.SpaceBetweenSlides,
                  description: strings.InPixels,
                  value: '5'
                }),
                PropertyPaneToggle('enableGrabCursor', {
                  label: strings.EnableGrabCursor
                }),
                PropertyPaneToggle('enableLoop', {
                  label: strings.EnableLoop
                })
              ],
              isCollapsed: true
            }
          ]
        }
      ]
    };
  }
}
