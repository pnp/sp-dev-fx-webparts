import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown, IPropertyPaneDropdownProps, IPropertyPaneDropdownOption,
  PropertyPaneSlider, IPropertyPaneSliderProps
} from "@microsoft/sp-webpart-base";
import { O365Video, Video, VideoChannel, VideoServiceSettings } from "../O365VUtilities";
import * as strings from 'videoLibraryCpverFlowStrings';
import VideoLibraryCpverFlow, { IVideoLibraryCpverFlowProps } from './components/VideoLibraryCpverFlow';
import { IVideoLibraryCpverFlowWebPartProps } from './IVideoLibraryCpverFlowWebPartProps';
debugger;
require('coverflow.css');
export default class VideoLibraryCpverFlowWebPart extends BaseClientSideWebPart<IVideoLibraryCpverFlowWebPartProps> {
  private O365Video: O365Video;
  private channels: Array<IPropertyPaneDropdownOption>;
  private channelsFetched: boolean;

  public constructor(context: IWebPartContext) {
    debugger;
    super(context);
  }
  public onInit<T>(): Promise<T> {

    this.O365Video = new O365Video(this.context);
    return Promise.resolve(null);
  }
  public render(): void {
    const props: IVideoLibraryCpverFlowWebPartProps = {
      description: this.properties.description,
      videoChannel: this.properties.videoChannel,
      o365Video: this.O365Video,
      layout: this.properties.layout,
      duration: this.properties.duration,
      panels: this.properties.panels
    };
    const element: React.ReactElement<IVideoLibraryCpverFlowWebPartProps> = React.createElement(VideoLibraryCpverFlow, props);

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    if (!this.O365Video.isInitialized) {
      this.O365Video.Initialize().then(x => {
        this.O365Video.getChannels().then(channels => {
          this.refreshPropertyPane();
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

          }
          return opt;
        });
        this.channelsFetched = true;
        this.refreshPropertyPane();
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown("videoChannel", {
                  label: strings.VideoChannelFieldLabel,
                  options: this.channels,

                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
