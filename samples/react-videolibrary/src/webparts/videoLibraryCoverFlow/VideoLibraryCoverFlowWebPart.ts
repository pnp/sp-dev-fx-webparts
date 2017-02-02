import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown, IPropertyPaneDropdownOption,
  PropertyPaneSlider,
  PropertyPaneToggle
} from "@microsoft/sp-webpart-base";
import { O365Video } from "../O365VUtilities";
import * as strings from 'videoLibraryCoverFlowStrings';
import VideoLibraryCoverFlow, { IVideoLibraryCoverFlowProps } from './components/VideoLibraryCoverFlow';
import { IVideoLibraryCoverFlowWebPartProps } from './IVideoLibraryCoverFlowWebPartProps';
debugger;
require('coverflow.css');
export default class VideoLibraryCpverFlowWebPart extends BaseClientSideWebPart<IVideoLibraryCoverFlowWebPartProps> {
  private O365Video: O365Video;
  private channels: Array<IPropertyPaneDropdownOption>;
  private channelsFetched: boolean;


  public onInit<T>(): Promise<T> {

    this.O365Video = new O365Video(this.context);
    return Promise.resolve(null);
  }
  public render(): void {
    const props: IVideoLibraryCoverFlowWebPartProps = {
      description: this.properties.description,
      videoChannel: this.properties.videoChannel,
      o365Video: this.O365Video,
      iframeHeight: this.properties.iframeHeight,
      iframeWidth: this.properties.iframeWidth,
      playerHeight: this.properties.playerHeight,
      playerWidth: this.properties.playerWidth,
      imgHeight: this.properties.imgHeight,
      imgWidth: this.properties.imgWidth,
      coverflowWidth: this.properties.coverflowWidth,
      coverflowHeight: this.properties.coverflowHeight,
      coverflowMargin: this.properties.coverflowMargin,
      coverflowAnimationSpeed: this.properties.coverflowAnimationSpeed,
      coverflowStartPosition: this.properties.coverflowStartPosition,
      coverflowEnableScroll: this.properties.coverflowEnableScroll,
    };
    const element: React.ReactElement<IVideoLibraryCoverFlowWebPartProps> = React.createElement(VideoLibraryCoverFlow, props);

    ReactDom.render(element, this.domElement);
  }

  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

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
          const opt: IPropertyPaneDropdownOption = {
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown("videoChannel", {
                  label: strings.VideoChannelFieldLabel,
                  options: this.channels,
                }),
                PropertyPaneSlider("coverflowHeight", {
                  label: strings.CoverflowHeightFieldLabel,
                  min: 100,
                  max: 1000
                }),
                PropertyPaneSlider("coverflowWidth", {
                  label: strings.CoverflowWidthFieldLabel,
                  min: 100,
                  max: 1900
                }),
                PropertyPaneSlider("coverflowMargin", {
                  label: strings.CoverflowMarginFieldLabel,
                  min: 0,
                  max: 100
                }),
                PropertyPaneSlider("coverflowAnimationSpeed", {
                  label: strings.CoverflowAnimationSpeedFieldLabel,
                  min: 0.0,
                  max: 1.0,
                  step: 0.1
                }),
                PropertyPaneToggle("coverflowEnableScroll", {
                  label: strings.CoverflowEnableScrollFieldLabel,
                }),

                PropertyPaneSlider("coverflowStartPosition", {
                  label: strings.CoverflowStartPositionFieldLabel,
                  min: 0,
                  max: 25
                }),



                PropertyPaneSlider("imgWidth", {
                  label: strings.ImgWidthFieldLabel,
                  min: 100,
                  max: 1900
                }),
                PropertyPaneSlider("imgHeight", {
                  label: strings.ImgHeightFieldLabel,
                  min: 100,
                  max: 1000
                }),
                PropertyPaneSlider("iframeWidth", {
                  label: strings.IframeWidthFieldLabel,
                  min: 100,
                  max: 1900
                }),
                PropertyPaneSlider("iframeHeight", {
                  label: strings.IframeHeightFieldLabel,
                  min: 100,
                  max: 1000
                }),
                  PropertyPaneSlider("playerWidth", {
                  label: strings.PlayerWidthFieldLabel,
                  min: 100,
                  max: 1900
                }),
                PropertyPaneSlider("playerHeight", {
                  label: strings.PlayerHeightFieldLabel,
                  min: 100,
                  max: 1000
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
