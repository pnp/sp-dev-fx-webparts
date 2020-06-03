import * as React from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryProps } from './ImageGalleryProps';
import { ImageGalleryState } from './ImageGalleryState';
import { escape } from '@microsoft/sp-lodash-subset';
import spservices from '../../../../services/spservices';
import Gallery from 'react-grid-gallery';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import RenderImage from '../RenderImage/RenderImage';
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Label,
  Icon,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  ImageFit,
  Image,
} from 'office-ui-fabric-react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import * as strings from 'ImageGalleryWebPartStrings';
import * as microsoftTeams from '@microsoft/teams-js';
import { Root } from '@pnp/graph';

import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app


/**
 *
 *
 * @export
 * @class ImageGallery
 * @extends {React.Component<ImageGalleryProps, ImageGalleryState>}
 */
export default class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
  private spService: spservices = null;
  private images: any;
  private galleryImages: any[] = [];
  private _teamsContext: microsoftTeams.Context;
  private _teamsTheme: string = '';
  private lithboxMedia: any[] = [];

  constructor(props: ImageGalleryProps) {
    super(props);


    this.spService = new spservices(this.props.context);

    if (this.props.context.microsoftTeams) {
      this.props.context.microsoftTeams.getContext(context => {
        this._teamsContext = context;
        this._teamsTheme = this._teamsContext.theme;
        console.log('ctt', this._teamsContext);
        this.setState({ teamsTheme: this._teamsTheme });
      });


    }

    this.state = {
      images: [],
      isLoading: false,
      errorMessage: '',
      hasError: false,
      teamsTheme: this._teamsTheme,
      onOver: false,
      showLithbox: false,
      lithboxMedia: [],
      photoIndex: 0,
    };
  }


  /**
   *
   *
   * @protected
   * @returns {Promise<any>}
   * @memberof ImageGallery
   */

  /**
   *
   *
   * @private
   * @memberof ImageGallery
   */
  private async loadPictures() {
    this.setState({ isLoading: true, hasError: false });
    const tenantUrl = `https://${location.host}`;
    try {
      this.images = await this.spService.getImages(this.props.siteUrl, this.props.list, this.props.numberImages);
      //   const el =  <Label style={{fontSize: FontSizes.size18, bottom:0,transition:'.5s ease', textAlign: 'center', width:'100%', position:'absolute', background: 'rgba(0, 0, 0, 0.5)', color: '#f1f1f1', padding: '10px'}}>Teste</Label>;
      const el = <Label className={styles.overlay}>Teste</Label>;
      for (const image of this.images) {

        if (image.FileSystemObjectType == 1) continue; // by pass folder item
        const pURL = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/large/content?preferNoRedirect=true `;
        const thumbnailUrl = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/c240x240/content?preferNoRedirect=true `;
        this.lithboxMedia.push(pURL);
        this.galleryImages.push(
          {
            src: pURL,
            thumbnail: thumbnailUrl,
            thumbnailWidth: 240,
            thumbnailHeight: 180,
            caption: image.Title ? image.Title : image.File.Name,
            //  thumbnailCaption: image.File.Name,
            customOverlay:
              <Label style={{ fontSize: FontSizes.size18, bottom: 0, transition: '.5s ease', textAlign: 'center', width: '100%', position: 'absolute', background: 'rgba(0, 0, 0, 0.5)', color: '#f1f1f1', padding: '10px' }}>
                {image.Title ? image.Title : image.File.Name}
              </Label>

          },

        );

      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: decodeURIComponent(error.message) });
    }
  }

  public async componentDidMount() {

    await this.loadPictures();
    this.setState({ images: this.galleryImages, lithboxMedia: this.lithboxMedia, isLoading: false });

  }

  /**
   *
   *
   * @param {ImageGalleryProps} prevProps
   * @returns
   * @memberof ImageGallery
   */
  public async componentDidUpdate(prevProps: ImageGalleryProps) {

    if (!this.props.list || !this.props.siteUrl) return;
    // Get  Properties change
    if (prevProps.list !== this.props.list || prevProps.numberImages !== this.props.numberImages) {
      this.galleryImages = [];
      await this.loadPictures();
      this.setState({ images: this.galleryImages, isLoading: false });
    }
  }


  /**
   *
   *
   * @private
   * @memberof ImageGallery
   */
  private onConfigure() {
    // Context of the web part
    this.props.context.propertyPane.open();
  }


  /**
   *
   *
   * @returns {React.ReactElement<ImageGalleryProps>}
   * @memberof ImageGallery
   */
  public render(): React.ReactElement<ImageGalleryProps> {
    console.log('th', (this._teamsContext && this._teamsContext.theme == 'dark') ? styles.webpartTitle : '');

    return (
      <div className={styles.imageGallery}>
        <div  >
          {
            (this._teamsContext && this._teamsContext.theme == 'dark') ?
              <Label className={styles.title}>{this.props.title}</Label>
              :
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty}
                className={(this._teamsContext && this._teamsContext.theme == 'dark') && styles.webpartTitle}
              />
          }
        </div>

        {
          (!this.props.list) ?
            <Placeholder iconName='Edit'
              iconText={strings.WebpartConfigIconText}
              description={strings.WebpartConfigDescription}
              buttonLabel={strings.WebPartConfigButtonLabel}
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.onConfigure.bind(this)} />
            :
            this.state.hasError ?
              <MessageBar messageBarType={MessageBarType.error}>
                {this.state.errorMessage}
              </MessageBar>
              :
              this.state.isLoading ?
                <Spinner size={SpinnerSize.large} label='loading images...' />
                :
                this.state.images.length == 0 ?

                  <div style={{ width: '300px', margin: 'auto' }}>
                    <Icon iconName="PhotoCollection"
                      style={{ fontSize: '250px', color: '#d9d9d9' }} />
                    <Label style={{ width: '250px', margin: 'auto', fontSize: FontSizes.size20 }}>No images in the library</Label>
                  </div>
                  :
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Gallery images={this.state.images} enableImageSelection={false} rowHeight={180} />

                  </div>
        }
      </div>
    );
  }
}
