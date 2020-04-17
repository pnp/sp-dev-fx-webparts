import { css } from '@uifabric/utilities/lib/css';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import Slider from 'react-slick';
import { IFilmstripLayoutProps } from "./IFilmstripLayoutProps";
import { IFilmstripLayoutState} from "./IFilmstripLayoutState";
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from "./FilmstripLayout.module.scss";

/**
 * Filmstrip layout
 * Presents the child compoments as a slick slide
 */
export class FilmstripLayout extends React.Component<
  IFilmstripLayoutProps,
  IFilmstripLayoutState
  > {
  // the slick slider used in normal views
  private _slider: Slider;

  private _container: HTMLDivElement;

  /**
   *
   */
  constructor(props: IFilmstripLayoutProps) {
    super(props);

    this.state = {
      dimensions: undefined
    };

    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');
  }

  public componentDidMount(): void {
    if (this._container) {
      this.setState({
        dimensions: {
          width: this._container.offsetWidth,
          height: this._container.offsetHeight,
        },
      });
    }

  }
  /**
   * Renders a slick switch, a slide for each child, and next/previous arrows
   */
  public render(): React.ReactElement<IFilmstripLayoutProps> {
    // slick seems to have an issue with having "infinite" mode set to true and having less items than the number of slides per page
    // set infinite to true only if there are more than 3 children

    let numSlides: number = 3;
    if (this.state.dimensions) {
      if (this.state.dimensions.width > 927) {
        numSlides = 4;
      } else if (this.state.dimensions.width <= 695) {
        numSlides = 2;
      }
    }

    var isInfinite: boolean = React.Children.count(this.props.children) > numSlides;
    var settings: any = {
      accessibility: true,
      arrows: false,
      autoplaySpeed: 5000,
      dots: true,
      //dotsClass: css("slick-dots", styles.slickDots),
      customPaging: (i:number)=> {
        return (
          <a>
            <div role="button" className={styles.carouselDotsContainer} aria-label={`Carousel Dot ${i}`} data-is-focusable={true} tabIndex={0}>
              <span className={styles.carouselDot} tabIndex={-1}></span>
            </div>
          </a>
        );
      },
      infinite: isInfinite,
      slidesToShow: numSlides,
      slidesToScroll: numSlides,
      speed: 500,
      centerPadding: styles.centerPadding,
      pauseOnHover: true,
      variableWidth: false,
      useCSS: true,
      rows: 1,
      respondTo: "slider",
      // responsive: [
      //   // {
      //   //   breakpoint: 1440,
      //   //   settings: {
      //   //     slidesToShow: 4,
      //   //     slidesToScroll: 4,
      //   //     infinite: isInfinite,
      //   //     dots: true
      //   //   }
      //   // },
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       infinite: isInfinite,
      //       dots: true
      //     }
      //   },
      //   {
      //     // breakpoint: 754,
      //     breakpoint: 767,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //       infinite: isInfinite,
      //       dots: true
      //     }
      //   }
      // ]
    };

    console.log("Dimensions", this.state.dimensions);
    return (
      <div>
        WIDTH: {this.state.dimensions && this.state.dimensions.width}
        <div className={css(styles.filmstripLayout, styles.filmStrip)} aria-label={this.props.ariaLabel} ref={(el: HTMLDivElement) => (this._container = el)}>
          <Slider ref={(c:Slider) => (this._slider = c)} {...settings}>
            {this.props.children}
          </Slider>
          <div
            className={css(styles.indexButtonContainer, styles.sliderButtons)}
            style={{ left: "10px" }}
            onClick={() => this._slider.slickPrev()}
          >
            <IconButton
              className={css(styles.indexButton, styles.leftPositioned)}
              iconProps={{ iconName: "ChevronLeft", styles: {root: { fontSize:'28px', fontWeight:'400'} }}}
            />
          </div>
          <div
            className={css(styles.indexButtonContainer, styles.sliderButtons)}
            style={{ right: "10px" }}
            onClick={() => this._slider.slickNext()}
          >
            <IconButton
              className={css(styles.indexButton, styles.rightPositioned)}
              iconProps={{ iconName: "ChevronRight", styles: {root: { fontSize:'28px', fontWeight:'400'} }}}
            />
          </div>
        </div>
      </div>
    );
  }
}
