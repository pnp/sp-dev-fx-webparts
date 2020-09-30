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
  DefaultButton,
  PrimaryButton,
  ImageFit,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  ActionButton,
  IButtonProps,
  IconButton,
  CommandBarButton,
  ImageLoadState,
  Panel, PanelType

} from 'office-ui-fabric-react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import { FontSizes, } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import * as strings from 'ImageGalleryWebPartStrings';
import * as microsoftTeams from '@microsoft/teams-js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import 'video-react/dist/video-react.css'; // import css
import { Player, BigPlayButton } from 'video-react';
import './carousel.scss';
import { IGalleryImages } from './IGalleryImages';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as $ from 'jquery';
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
  private galleryImages: IGalleryImages[] = [];
  private _teamsContext: microsoftTeams.Context;
  private _teamsTheme: string = '';
  private _carouselImages: any;
  private _slider: any = null;

  constructor(props: ImageGalleryProps) {
    super(props);


    this.spService = new spservices(this.props.context);

    if (this.props.context.microsoftTeams) {
      this.props.context.microsoftTeams.getContext(context => {
        this._teamsContext = context;
        console.log('ctt', this._teamsContext.theme);
        this.setState({ teamsTheme: this._teamsContext.theme });
      });


    }

    this.state = {
      images: [],
      isLoading: false,
      errorMessage: '',
      hasError: false,
      teamsTheme: 'default',
      isPlaying: true,
      showLithbox: false,
      photoIndex: 0,
      isloadingCarousel: false,
      carouselImages: [],
      autoplay: true,
    };

    this.onPlayResume = this.onPlayResume.bind(this);
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

      for (const image of this.images) {
        const pURL = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/large/content?preferNoRedirect=true `;
        const thumbnailUrl = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/c240x240/content?preferNoRedirect=true `;

        let mediaType: string = '';
        switch (image.File_x0020_Type) {
          case ('jpg'):
          case ('jpeg'):
          case ('png'):
          case ('tiff'):
          case ('gif'):
            mediaType = 'image';
            break;
          case ('mp4'):
            mediaType = 'video';
            break;
          default:
            continue;
            break;
        }

        this.galleryImages.push(
          {
            imageUrl: pURL,
            mediaType: mediaType,
            ServerRelativeUrl: image.File.ServerRelativeUrl,
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

        // Create Carousel Slides from Images

        this._carouselImages = this.galleryImages.map((GalleryImage, i) => {
          return (
            <div className='slideLoading'>
              <div style={{}}  >
                <Label
                  style={{ fontSize: FontSizes.size18, textAlign: 'center', width: '100%', padding: '5px' }}>
                  <ActionButton
                    data-automation-id="test"
                    iconProps={{ iconName: 'Download', styles: { root: { fontSize: FontSizes.size18, } } }}
                    allowDisabledFocus={true}
                    style={{ padding: '10px', fontSize: FontSizes.size18 }}
                    checked={true}
                    href={`${this.props.context.pageContext.legacyPageContext.siteAbsoluteUrl}/_layouts/download.aspx?SourceUrl=${GalleryImage.ServerRelativeUrl}`}
                  >
                    {GalleryImage.caption}
                  </ActionButton>
                </Label>
              </div>
              {GalleryImage.mediaType == 'video' ?
                <div >
                  <Player
                    poster={GalleryImage.imageUrl}
                    style={{ width: '100%', height: '640px' }}
                  >
                    <BigPlayButton position="center" />
                    <source src={GalleryImage.ServerRelativeUrl}
                    />
                  </Player>
                </div>
                :
                <div style={{ maxWidth: '100%' }}>
                  <Image src={GalleryImage.imageUrl}
                    style={{ height: 'auto', overflow: 'hidden', maxHeight: '100%' }}
                    onLoadingStateChange={async (loadState: ImageLoadState) => {
                      console.log('imageload Status ' + i, loadState, GalleryImage.imageUrl);
                      if (loadState == ImageLoadState.loaded) {
                        this.setState({ isloadingCarousel: false });
                      }
                    }}
                    height={'400px'}
                    imageFit={ImageFit.contain}
                  />
                </div>
              }
            </div>
          );
        }
        );
      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: decodeURIComponent(error.message) });
    }
  }

  public async componentDidMount() {

    await this.loadPictures();
    this.setState({ images: this.galleryImages, carouselImages: this._carouselImages, isLoading: false, isloadingCarousel: false });

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
      this._carouselImages = [];
      await this.loadPictures();
      this.setState({ images: this.galleryImages, carouselImages: this._carouselImages, isLoading: false });
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

  private handleclick = event => {
    const value = event.currentTarget.attributes.getNamedItem("data-i").value;

    this.setState({ showLithbox: true, photoIndex: Number(value), isloadingCarousel: true });
  }

  private onNext = () => {
    this._slider.slickNext();
  }

  private onPrev = () => {
    this._slider.slickPrev();
  }



  private async onPlayResume() {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this._slider.slickPause();
    } else {
      this._slider.slickPlay();
    }
    this.setState({
      isPlaying: !isPlaying
    });
  }

  private onDialogClose = (ev: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ showLithbox: false });
  }

  /**
   *
   *
   * @returns {React.ReactElement<ImageGalleryProps>}
   * @memberof ImageGallery
   */
  public render(): React.ReactElement<ImageGalleryProps> {
    console.log('theme', this.state.teamsTheme);
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: 'progressive',
      autoplaySpeed: 3000,
      initialSlide: this.state.photoIndex,
      arrows: false,
      draggable: false,
      adaptiveHeight: true,
      useCSS: true,
      useTransform: true,
    };

    return (
      <div className={styles.container}>
        <div>
          {
            this.state.teamsTheme == 'dark' ?
              <Label style={{color:'white',  fontSize: FontSizes.size24}}>{this.props.title}</Label>
              :
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty}
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
                    {
                      this.state.images.map((item, i) => {
                        let v: boolean = true;
                        return (
                          <div
                            onClick={this.handleclick}
                            data-i={i}
                            id={i.toString()}
                            style={{ width: '230px', display: 'inline-block', verticalAlign: 'top', margin: '2px' }}>
                            <DocumentCard>
                              <RenderImage displayCaption={v} image={item} context={this.props.context} />
                            </DocumentCard>
                          </div>
                        );
                      })
                    }
                    <Panel
                      isOpen={this.state.showLithbox}
                      onDismiss={this.onDialogClose}
                      headerText="Images - slides"
                      type={PanelType.custom}
                      customWidth="700px"
                      onRenderFooterContent={() => {
                        return (
                          <div style={{ float: 'right', paddingBottom: '20px' }}>
                            <PrimaryButton text="Close" onClick={this.onDialogClose} />
                          </div>
                        );
                      }}
                    >

                      <div style={{ marginBottom: 25, verticalAlign: 'Top', width: '100%' }}>
                        <Slider
                          ref={c => (this._slider = c)}
                          {...sliderSettings}
                          autoplay={this.state.autoplay}
                          onReInit={() => {
                            if (!this.state.isloadingCarousel)
                              $(".slideLoading").removeClass("slideLoading");

                          }}
                        >
                          {
                            this.state.carouselImages
                          }
                        </Slider>
                      </div>
                      {
                        !this.state.isloadingCarousel ?
                          <div style={{ textAlign: 'center', width: '100%' }}>
                            <CommandBarButton
                              iconProps={{ iconName: 'TriangleSolidLeft12', styles: { root: { fontSize: FontSizes.size16, padding: '10px', color: CommunicationColors.primary } } }}
                              allowDisabledFocus={true}
                              style={{ fontSize: FontSizes.size16, marginRight: '10px' }}
                              title='Prev'
                              onClick={this.onPrev}>
                            </CommandBarButton>
                            <CommandBarButton
                              iconProps={{ iconName: this.state.isPlaying ? 'Pause' : 'PlayResume', styles: { root: { fontSize: FontSizes.size18, padding: '10px', color: CommunicationColors.primary } } }}
                              allowDisabledFocus={true}
                              style={{ fontSize: FontSizes.size18, marginRight: '10px' }}
                              title={this.state.isPlaying ? 'Pause' : 'Play'}
                              onClick={this.onPlayResume}>
                            </CommandBarButton>
                            <CommandBarButton
                              iconProps={{ iconName: 'TriangleSolidRight12', styles: { root: { fontSize: FontSizes.size16, padding: '10px', color: CommunicationColors.primary } } }}
                              allowDisabledFocus={true}
                              style={{ fontSize: FontSizes.size16 }}
                              title='Next'
                              onClick={this.onNext}>
                            </CommandBarButton>
                          </div>
                          :
                          <Spinner size={SpinnerSize.large} label={'Loading...'} style={{ fontSize: FontSizes.size18, color: CommunicationColors.primary }}></Spinner>
                      }
                    </Panel>
                  </div>
        }
      </div>
    );
  }
}
