import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration ,
 
  PropertyPaneTextField,
  PropertyPaneDropdown,  IPropertyPaneDropdownOption,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { O365Video } from "../O365VUtilities";
import * as strings from 'videoLibraryStrings';
import VideoLibrary, { IVideoLibraryProps } from './components/VideoLibraryReact3DCarousel';
import { IVideoLibraryReact3DCarouselWebPartProps } from './IVideoLibraryReact3DCarouselWebPartProps';
require("./carousel.css"); // needed to copy this to lib folder to get it displayed
export default class VideoLibraryWebPart extends BaseClientSideWebPart<IVideoLibraryReact3DCarouselWebPartProps> {
  private O365Video: O365Video;
  private channels: Array<IPropertyPaneDropdownOption>;
  private channelsFetched: boolean;

  public onInit<T>(): Promise<T> {
    this.O365Video = new O365Video(this.context);
    return Promise.resolve(null);
  }
  public render(): void {

    const props: IVideoLibraryProps = {
      description: this.properties.description,
      videoChannel: this.properties.videoChannel,
      o365Video: this.O365Video,
      layout: this.properties.layout,
      duration:this.properties.duration,
      panels:this.properties.panels
    };
    const element: React.ReactElement<IVideoLibraryProps> = React.createElement(VideoLibrary, props);

    ReactDom.render(element, this.domElement);
  }

  public  getPropertyPaneConfiguration(): IPropertyPaneConfiguration  {
debugger;
    if (!this.O365Video.isInitialized) {
      this.O365Video.Initialize().then(x => {
        this.O365Video.getChannels().then(channels => {
            this.context.propertyPane.refresh();
        });

      });
    }
    if (!this.channelsFetched && this.O365Video.isInitialized) {
      this.O365Video.getChannels().then(channels => {
        this.channels = channels.map((c, i, a) => {
          let opt: IPropertyPaneDropdownOption = {
            key: c.Id,
            text: c.Title,
            index: i,

          };
          return opt;
        });
        this.channelsFetched = true;
         this.context.propertyPane.refresh();
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown("videoChannel", {
                  label: strings.VideoChannelFieldLabel,
                  options: this.channels,

                }),
                PropertyPaneDropdown("layout", {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: "prism", text: "prism" },
                    { key: "clssic", text: "classic" }
                  ]

                }),
                PropertyPaneSlider("duration", {
                  label: strings.DurationFieldLabel,
                  min: 1,
                  max: 1000
                }),
                  PropertyPaneSlider("panels", {
                  label: strings.PanelsFieldLabel,
                  min: 1,
                  max: 5
                }),
                
                //   PropertyPaneTextField("listName", channelDropDownProps),

              ]
            }
          ]
        }
      ]
    };
  }
}
