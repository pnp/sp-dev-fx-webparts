import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown, IPropertyPaneDropdownProps, IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import { O365Video, Video, VideoChannel, VideoServiceSettings } from "../O365VUtilities";
import * as strings from 'videoLibraryStrings';
import VideoLibrary, { IVideoLibraryProps } from './components/VideoLibrary';
import { IVideoLibraryWebPartProps } from './IVideoLibraryWebPartProps';

export default class VideoLibraryWebPart extends BaseClientSideWebPart<IVideoLibraryWebPartProps> {
  private O365Video: O365Video;
  private channels: Array<IPropertyPaneDropdownOption>;
  private videos: Array<Video>;
  public constructor(context: IWebPartContext) {
    super(context);
  }
  public onInit<T>(): Promise<T> {
    this.O365Video = new O365Video(this.context);
     this.O365Video.Initialize().then((settings)=>{
       if (this.properties.videoChannel){
         this.O365Video.GetVideos(this.properties.videoChannel).then((videos)=>{
           this.videos=videos;
         })
       }
     });
   
    return Promise.resolve(null);
  }
  public render(): void {
    debugger;
    const element: React.ReactElement<IVideoLibraryProps> = React.createElement(VideoLibrary, {
      description: this.properties.description,
      videoChannel: this.properties.videoChannel,
      videos:this.videos
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    debugger;
    if (!this.O365Video.isInitialized) {
      this.O365Video.Initialize().then(x => {
        this.O365Video.getChannels().then(channels => {
          this.channels = channels.map((c, i, a) => {
            let opt: IPropertyPaneDropdownOption = {
              key: c.Id,
              text: c.Title,
              index: i,
              isSelected:(i===1)
            }
            return opt;
          });
           this.refreshPropertyPane();
        });
       
      });
    }
    const channelDropDownProps: IPropertyPaneDropdownProps = {
      label: strings.VideoChannelFieldLabel,
      options: this.channels,
      isDisabled: false,
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
               //   isDisabled: false,
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
