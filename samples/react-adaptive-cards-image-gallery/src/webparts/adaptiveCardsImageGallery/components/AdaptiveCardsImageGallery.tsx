import * as React from 'react';
import styles from './AdaptiveCardsImageGallery.module.scss';
import * as strings from 'AdaptiveCardsImageGalleryWebPartStrings';
import { IAdaptiveCardsImageGalleryProps } from './IAdaptiveCardsImageGalleryProps';
import { IAdaptiveCardsImageGalleryState } from './IAdaptiveCardsImageGalleryState';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import * as AdaptiveCards from "adaptivecards";
import { ImageGalleryService, IImageGalleryService } from '../services/ImageGalleryService';
import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class AdaptiveCardsImageGallery extends React.Component<IAdaptiveCardsImageGalleryProps, IAdaptiveCardsImageGalleryState> {
  // The rendering container
  private _acContainer: HTMLDivElement;
  private ImageGalleryServiceInstance: IImageGalleryService;
  private _galleryListName: string;
  private _noOfItems: number;
  private card: any;
  private imagesJSON = [];

  constructor(props: IAdaptiveCardsImageGalleryProps) {
    super(props);

    this.state = {
      galleryItems: []
    };

    this._galleryListName = this.props.imageGalleryName;
    this._noOfItems = this.props.imagesToDisplay;
  }

  private _executeActionHandler = (action: AdaptiveCards.Action) => {
    window.location.href = action.iconUrl;
  }

  public componentDidMount(): void {
    let serviceScope: ServiceScope = this.props.serviceScope;

    // Based on the type of environment, return the correct instance of the ImageGalleryServiceInstance interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.ImageGalleryServiceInstance = serviceScope.consume(ImageGalleryService.serviceKey);
    }

    this.ImageGalleryServiceInstance.getGalleryImages(this._galleryListName, this._noOfItems).then((galleryImages: any[]) => {
      this.setState({ galleryItems: galleryImages });
      this.showAdaptiveCard();
    });
  }

  public componentWillReceiveProps(nextProps: IAdaptiveCardsImageGalleryProps) {
    this.ImageGalleryServiceInstance.getGalleryImages(nextProps.imageGalleryName, nextProps.imagesToDisplay).then((galleryImages: any[]) => {
      this.setState({ galleryItems: galleryImages });
      this.showAdaptiveCard();
    });
  }

  public showAdaptiveCard() {
    this.state.galleryItems.forEach(adaptiveImage => {
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
    adaptiveCard.onExecuteAction = this._executeActionHandler;

    // Parse the card
    adaptiveCard.parse(this.card);

    // Empty the div so we can replace it
    while (this._acContainer.firstChild) {
      this._acContainer.removeChild(this._acContainer.lastChild);
    }

    // Render the card to an HTML element
    adaptiveCard.render(this._acContainer);
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IAdaptiveCardsImageGalleryProps> {
    return (
      <div className={styles.adaptiveCardsImageGallery}>
        <div className={styles.container}>
          {
            this.state.galleryItems.length == 0 ?
            <Placeholder iconName='Edit'
              iconText={strings.ConfigureWebPartLabel}
              description={strings.ConfigureDescription}
              buttonLabel={strings.ConfigureLabel}
              onConfigure={this._onConfigure} />
              :
              <div ref={(elm) => { this._acContainer = elm; }}></div>
          }
        </div>
      </div>
    );
  }
}
