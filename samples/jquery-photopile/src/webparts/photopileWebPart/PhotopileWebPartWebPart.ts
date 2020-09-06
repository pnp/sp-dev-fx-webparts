import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,  
  IWebPartContext,  
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'mystrings';
import { IPhotopileWebPartProps } from './IPhotopileWebPartProps';
import PhotopileWebPart from './components/PhotopileWebPart';
import { IPhotopileWebPartWebPartProps } from './IPhotopileWebPartWebPartProps';
import { SPPicturesListService } from './SPPicturesListService';
import { ISPList } from './ISPList';

/**
 * @class
 * Defines the Photopile client side web part
 */
export default class PhotopileWebPartWebPart extends BaseClientSideWebPart<IPhotopileWebPartWebPartProps> {

    /**
   * @var
   * Stores the list of SharePoint Pictures library found in the current SP web
   */
  private listsDropdownOptions: IPropertyPaneDropdownOption[] = [];

  /**
   * @function
   * Web Part constructor
   */
  public constructor(context: IWebPartContext) {
    super();
  }

  /**
   * @function
   * Function called when the web part is inialized
   */
  public onInit<T>(): Promise<T> {
    //Init the PicturesListService to get the picture libs
    const picturesListService: SPPicturesListService = new SPPicturesListService(this.properties, this.context);
    //Request the libs
    picturesListService.getPictureLibs()
      .then((response) => {
        //Store the result as list of dropdown options
        this.listsDropdownOptions = response.value.map((list: ISPList) => {
          return {
            key: list.Id,
            text: list.Title
          };
        });
      });
      return Promise.resolve();
  }

  /**
   * @function
   * Renders the web part
   */

    public render(): void {

    //Constructs the react element code to JSX
    const element: React.ReactElement<IPhotopileWebPartProps> = React.createElement(PhotopileWebPart, {
      listName: this.properties.listName,
      orderBy: this.properties.orderBy,
      orderByAsc: this.properties.orderByAsc,
      count: this.properties.count,
      numLayers: this.properties.numLayers,
      thumbOverlap: this.properties.thumbOverlap,
      thumbRotation: this.properties.thumbRotation,
      thumbBorderWidth: this.properties.thumbBorderWidth,
      thumbBorderColor: this.properties.thumbBorderColor,
      thumbBorderHover: this.properties.thumbBorderHover,
      draggable: this.properties.draggable,
      fadeDuration: this.properties.fadeDuration,
      pickupDuration: this.properties.pickupDuration,
      photoZIndex: this.properties.photoZIndex,
      photoBorder: this.properties.photoBorder,
      photoBorderColor: this.properties.photoBorderColor,
      showInfo: this.properties.showInfo,
      autoplayGallery: this.properties.autoplayGallery,
      autoplaySpeed: this.properties.autoplaySpeed,
      context: this.context
    });

    //Render the dom
    ReactDom.render(element, this.domElement);
  }

  /**
   * @function
   * Prevent from changing the pane properties on typing
   */
	protected get disableReactivePropertyChanges(): boolean {
		return false;
	}

  /**
   * @function
   * Gets the web part properties panel settings
   */

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          //Display the web part properties as accordion
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.PictureLibraryGroupName,
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: strings.PictureLibraryFieldLabel,
                  options: this.listsDropdownOptions
                }),
                PropertyPaneDropdown('orderBy', {
                  label: strings.OrderByFieldLabel,
                  options: [
                    { key: 'ID', text: strings.OrderByChoiceLabelId },
                    { key: 'Title', text: strings.OrderByChoiceLabelTitle },
                    { key: 'Created', text: strings.OrderByChoiceLabelCreated },
                    { key: 'Modified', text: strings.OrderByChoiceLabelModified },
                    { key: 'ImageWidth', text: strings.OrderByChoiceLabelImageWidth },
                    { key: 'ImageHeight', text: strings.OrderByChoiceLabelImageHeight }
                  ]
                }),
                PropertyPaneDropdown('orderByAsc', {
                  label: strings.OrderByAscFieldLabel,
                  options: [
                    { key: 'asc', text: strings.OrderByAscChoiceLabel },
                    { key: 'desc', text: strings.OrderByDescChoiceLabel }
                  ]
                }),
                PropertyPaneSlider('count', {
                  label: strings.PictureLibraryCountLabel,
                  min: 1,
                  max: 100,
                  step: 1,
                  showValue: true
                })
              ]
            },
            {
              groupName: strings.ThumbnailsGroupName,
              groupFields: [
                PropertyPaneSlider('numLayers', {
                  label: strings.NumLayersFieldLabel,
                  min: 1,
                  max: 20,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('thumbOverlap', {
                  label: strings.ThumbOverlabFieldLabel,
                  min: 1,
                  max: 130,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('thumbRotation', {
                  label: strings.ThumbRotationFieldLabel,
                  min: 0,
                  max: 360,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('thumbBorderWidth', {
                  label: strings.ThumbBorderWidthFieldLabel,
                  min: 0,
                  max: 50,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneTextField('thumbBorderColor', {
                  label: strings.ThumbBorderColorFieldLabel
                }),
                PropertyPaneTextField('thumbBorderHover', {
                  label: strings.ThumbBorderHoverFieldLabel
                }),
                PropertyPaneToggle('draggable', {
                  label: strings.DraggableFieldLabel
                })
              ]
            },
             {
              groupName: strings.PhotoContainerGroupName,
              groupFields: [
                PropertyPaneSlider('fadeDuration', {
                  label: strings.FadeDurationFieldLabel,
                  min: 0,
                  max: 5000,
                  step: 100,
                  showValue: true
                }),
                PropertyPaneSlider('pickupDuration', {
                  label: strings.PickupDurationFieldLabel,
                  min: 0,
                  max: 5000,
                  step: 100,
                  showValue: true
                }),
                PropertyPaneSlider('photoZIndex', {
                  label: strings.PhotoZIndexFieldLabel,
                  min: 1,
                  max: 1000,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('photoBorder', {
                  label: strings.PhotoBorderFieldLabel,
                  min: 0,
                  max: 50,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneTextField('photoBorderColor', {
                  label: strings.PhotoBorderColorFieldLabel
                }),
                PropertyPaneToggle('showInfo', {
                  label: strings.ShowInfoFieldLabel
                })
              ]
            },
             {
              groupName: strings.AutoplayGroupName,
              groupFields: [
                PropertyPaneToggle('autoplayGallery', {
                  label: strings.AutoplayGalleryFieldLabel
                }),
                PropertyPaneSlider('autoplaySpeed', {
                  label: strings.AutoplaySpeedFieldLabel,
                  min: 0,
                  max: 5000,
                  step: 100,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
