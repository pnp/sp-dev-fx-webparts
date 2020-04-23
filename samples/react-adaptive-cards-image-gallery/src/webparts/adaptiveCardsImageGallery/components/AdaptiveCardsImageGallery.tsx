import * as React from 'react';
import styles from './AdaptiveCardsImageGallery.module.scss';
import { IAdaptiveCardsImageGalleryProps } from './IAdaptiveCardsImageGalleryProps';
import { IAdaptiveCardsImageGalleryState } from './IAdaptiveCardsImageGalleryState';
import { escape } from '@microsoft/sp-lodash-subset';

import * as AdaptiveCards from "adaptivecards";
import { ImageGalleryService, IImageGalleryService } from '../services/ImageGalleryService';
import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class AdaptiveCardsImageGallery extends React.Component<IAdaptiveCardsImageGalleryProps, IAdaptiveCardsImageGalleryState> {
  private ImageGalleryServiceInstance: IImageGalleryService;
  private _galleryListName: string;
  private _noOfItems: number;
  private card: any;
  private renderedCard: any = "";
  private imagesJSON = [];

  constructor(props: IAdaptiveCardsImageGalleryProps) {
    super(props);

    this.state = {
      galleryItems: null,
      isLoading: true,
      showErrorMessage: false
    };

    let serviceScope: ServiceScope;
    serviceScope = this.props.serviceScope;

    this._galleryListName = this.props.imageGalleryName;
    this._noOfItems = this.props.imagesToDisplay;

    // Based on the type of environment, return the correct instance of the ImageGalleryServiceInstance interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.ImageGalleryServiceInstance = serviceScope.consume(ImageGalleryService.serviceKey);
    }

    this.ImageGalleryServiceInstance.getGalleryImages(this._galleryListName, this._noOfItems).then((galleryImages: any[]) => {
      galleryImages.forEach(adaptiveImage => {
        let image = {};
        image["type"] = "Image";
        image["url"] = adaptiveImage.ImageLink.Url;        

        // Compose image action
        let imageAction = {};
        imageAction["title"] = adaptiveImage.NavigationURL.Description;
        imageAction["type"] = "Action.OpenUrl";
        imageAction["url"] = adaptiveImage.NavigationURL.Url;
        imageAction["iconUrl"] = adaptiveImage.NavigationURL.Url;

        image["selectAction"] = imageAction;
        this.imagesJSON.push(image);
      });

      this.card = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {
            "type": "TextBlock",
            "text": "Adaptive Image Gallery",
            "size": "medium"
          },
          {
            "type": "ImageSet",
            "imageSize": "medium",
            "images": this.imagesJSON
          }
        ]
      };

      // Create an AdaptiveCard instance
      var adaptiveCard = new AdaptiveCards.AdaptiveCard();

      // Set its hostConfig property unless you want to use the default Host Config
      // Host Config defines the style and behavior of a card
      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
      });

      // Set the adaptive card's event handlers. onExecuteAction is invoked
      // whenever an action is clicked in the card
      adaptiveCard.onExecuteAction = function(action) { 
        window.location.href = action.iconUrl;
      };

      // Parse the card
      adaptiveCard.parse(this.card);

      // Render the card to an HTML element
      this.renderedCard = adaptiveCard.render();
      this.setState({ isLoading: false });
    });
  }

  public render(): React.ReactElement<IAdaptiveCardsImageGalleryProps> {
    return (
      <div className={styles.adaptiveCardsImageGallery}>
        <div className={styles.container}>
          {this.state.isLoading && <Spinner className={styles.spinner} size={SpinnerSize.large} />}
          {!this.state.isLoading && <div ref={(n) => { n && n.appendChild(this.renderedCard) }} />}
        </div>
      </div>
    );
  }
}
