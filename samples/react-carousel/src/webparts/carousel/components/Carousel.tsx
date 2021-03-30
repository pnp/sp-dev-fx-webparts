import * as React from 'react';
import styles from './Carousel.module.scss';
import { ICarouselProps } from './ICarouselProps';
import { ICarouselState } from './ICarouselState';
import { escape } from '@microsoft/sp-lodash-subset';
import spservices from '../../../spservices/spservices';
import * as microsoftTeams from '@microsoft/teams-js';
import { ICarouselImages } from './ICarouselmages';
import 'video-react/dist/video-react.css'; // import css
import { Player, BigPlayButton } from 'video-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as $ from 'jquery';
import { FontSizes, } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import * as strings from 'CarouselWebPartStrings';
import { DisplayMode } from '@microsoft/sp-core-library';
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import {
	Spinner,
	SpinnerSize,
	MessageBar,
	MessageBarType,
	Label,
	Icon,
	ImageFit,
	Image,
	ImageLoadState,
} from 'office-ui-fabric-react';


export default class Carousel extends React.Component<ICarouselProps, ICarouselState> {
	private spService: spservices = null;
	private _teamsContext: microsoftTeams.Context = null;


	public constructor(props: ICarouselProps) {
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
			isLoading: false,
			errorMessage: '',
			hasError: false,
			teamsTheme: 'default',
			photoIndex: 0,
			carouselImages: [],
			loadingImage: true
		};
	}


	private onConfigure() {
		// Context of the web part
		this.props.context.propertyPane.open();
	}


	private async loadPictures() {

		this.setState({ isLoading: true, hasError: false });
		const tenantUrl = `https://${location.host}`;
		let galleryImages: ICarouselImages[] = [];
		let carouselImages: React.ReactElement<HTMLElement>[] = [];

		try {
			const images = await this.spService.getImages(this.props.siteUrl, this.props.list, this.props.numberImages);

			for (const image of images) {

				if (image.FileSystemObjectType == 1) continue; // by pass folder item
				const pURL = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/large/content?preferNoRedirect=true `;
				const thumbnailUrl = `${tenantUrl}/_api/v2.0/sharePoint:${image.File.ServerRelativeUrl}:/driveItem/thumbnails/0/c240x240/content?preferNoRedirect=true `;

				let mediaType: string = '';
				switch (image.File_x0020_Type) {
					case 'jpg':
					case 'jpeg':
					case 'png':
					case 'tiff':
					case 'gif':
						mediaType = 'image';
						break;
					case 'mp4':
						mediaType = 'video';
						break;
					default:
						continue;
						break;
				}

				galleryImages.push(
					{
						imageUrl: pURL,
						mediaType: mediaType,
						serverRelativeUrl: image.File.ServerRelativeUrl,
						caption: image.Title ? image.Title : image.File.Name,
						description: image.Description ? image.Description : '',
						linkUrl: ''
					},
				);

				// Create Carousel Slides from Images

				carouselImages = galleryImages.map((galleryImage, i) => {
					return (
						<div className='slideLoading' >

							{galleryImage.mediaType == 'video' ?
								<div >
									<Player
										poster={galleryImage.imageUrl}
										style={{ width: '100%', height: '400px' }}>
										<BigPlayButton position="center" />
										<source src={galleryImage.serverRelativeUrl}
										/>
									</Player>
								</div>
								:
								<div>
									<Image src={galleryImage.imageUrl}
										onLoadingStateChange={async (loadState: ImageLoadState) => {
											console.log('imageload Status ' + i, loadState, galleryImage.imageUrl);
											if (loadState == ImageLoadState.loaded) {
												this.setState({ loadingImage: false });
											}
										}}
										height={'400px'}
										imageFit={ImageFit.cover}
									/>
									<div style={{ background: 'rgba(0, 0, 0, 0.3)', overflow: 'hidden', fontSize: FontSizes.size16, top: 0, transition: '.7s ease', textAlign: 'left', width: '200px', height: '350px', position: 'absolute', color: '#ffffff', padding: '25px' }}>
										<h2 style={{ fontSize: FontSizes.size20, textTransform: 'uppercase', color: 'white' }}>{galleryImage.caption}</h2>
										<p>{galleryImage.description}</p>
									</div>

								</div>
							}
						</div>
					);
				}
				);

				this.setState({ carouselImages: carouselImages, isLoading: false });
			}
		} catch (error) {
			this.setState({ hasError: true, errorMessage: decodeURIComponent(error.message) });
		}
	}

	public async componentDidMount() {
		await this.loadPictures();
	}

	public async componentDidUpdate(prevProps: ICarouselProps) {

		if (!this.props.list || !this.props.siteUrl) return;
		// Get  Properties change
		if (prevProps.list !== this.props.list || prevProps.numberImages !== this.props.numberImages) {
			/*
			 this.galleryImages = [];
			 this._carouselImages = [];
			 this.setState({ images: this.galleryImages, carouselImages: t.his._carouselImages, isLoading: false });
			 */
			await this.loadPictures();
		}
	}
	public render(): React.ReactElement<ICarouselProps> {
		const sliderSettings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: 'progressive',
			autoplaySpeed: 3000,
			initialSlide: this.state.photoIndex,
			arrows: true,
			draggable: true,
			adaptiveHeight: true,
			useCSS: true,
			useTransform: true,
		};

		return (
			<div className={styles.carousel}>
				<div>
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
								this.state.carouselImages.length == 0 ?
									<div style={{ width: '300px', margin: 'auto' }}>
										<Icon iconName="PhotoCollection"
											style={{ fontSize: '250px', color: '#d9d9d9' }} />
										<Label style={{ width: '250px', margin: 'auto', fontSize: FontSizes.size20 }}>No images in the library</Label>
									</div>
									:
									<div style={{ width: '100%', height: '100%' }}>

										<div style={{ width: '100%' }}>
											<Slider
												{...sliderSettings}
												autoplay={true}
												onReInit={() => {
													if (!this.state.loadingImage)
														$(".slideLoading").removeClass("slideLoading");
												}}>
												{
													this.state.carouselImages
												}
											</Slider>
										</div>
										{
											this.state.loadingImage &&
											<Spinner size={SpinnerSize.small} label={'Loading...'} style={{ verticalAlign: 'middle', right: '30%', top: 20, position: 'absolute', fontSize: FontSizes.size18, color: CommunicationColors.primary }}></Spinner>
										}
									</div>
				}
			</div>
		);
	}
}
