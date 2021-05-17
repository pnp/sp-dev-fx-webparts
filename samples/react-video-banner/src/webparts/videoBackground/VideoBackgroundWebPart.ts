import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneLabel
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "VideoBackgroundWebPartStrings";
import VideoBackground from "./components/VideoBackground";
import { IVideoBackgroundProps } from "./components/IVideoBackgroundProps";
import {
  PropertyFieldFilePicker,
  IPropertyFieldFilePickerProps,
  IFilePickerResult,
} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

export interface IVideoBackgroundWebPartProps {
  wpTitle: string;
  videoUrl: string;
  filePickerResult: IFilePickerResult;
  color: string;
  brightness: number;
  height: number;
}

export default class VideoBackgroundWebPart extends BaseClientSideWebPart<IVideoBackgroundWebPartProps> {
  

  public render(): void {
    const element: React.ReactElement<IVideoBackgroundProps> = React.createElement(
      VideoBackground,
      {
        wpTitle: this.properties.wpTitle,
        videoUrl: this.properties.videoUrl,
        labelColor: this.properties.color,
        brightness: this.properties.brightness,
        height: this.properties.height,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyFieldFilePicker("filePicker", {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: () => {
                    this.onPropertyPaneFieldChanged.bind(this);
                    this.render();
                  },
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    this.properties.videoUrl = e.fileAbsoluteUrl;
                    this.render();

                  },
                  onChanged: (e: IFilePickerResult) => {
                    this.properties.videoUrl = e.fileAbsoluteUrl;
                    this.render();

                  },
                  key: "filePickerId",
                  buttonLabel: strings.selectVideo,
                  label: "",
                  accepts: [".mp4", ".vmw", ".avi"],
                  buttonIcon: "VideoSolid",
                }),
                PropertyPaneLabel("videoLabel", {
                  text: this.properties.videoUrl
                }),
                PropertyPaneTextField("wpTitle", {
                  label: strings.wpTitleLabel,
                }),
              ],
            },
            {
              groupName: strings.StylesGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyFieldColorPicker("color", {
                  label: strings.selectColor,
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "colorFieldId",
                }),
                PropertyPaneSlider("brightness", {
                  min: 10,
                  max: 100,
                  step: 10,
                  value: 50,
                  label: strings.selectBrightness,
                  showValue: true,
                }),
                PropertyPaneSlider("height", {
                  min: 200,
                  max: 500,
                  step: 1,
                  value: 300,
                  label:  strings.selectHeight,
                  showValue: true,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
