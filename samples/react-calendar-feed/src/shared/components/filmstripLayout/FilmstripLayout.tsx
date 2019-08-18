import { css } from '@uifabric/utilities/lib/css';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
// import * as slick from 'slick-carousel';
import Slider from 'react-slick';
import { IFilmstripLayoutProps, IFilmstripLayoutState } from "./FilmstripLayout.types";


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

  /**
   *
   */
  constructor(props: IFilmstripLayoutProps) {
    super(props);

    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css');
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css');
  }
  /**
   * Renders a slick switch, a slide for each child, and next/previous arrows
   */
  public render(): React.ReactElement<IFilmstripLayoutProps> {
    // slick seems to have an issue with having "infinite" mode set to true and having less items than the number of slides per page
    // set infinite to true only if there are more than 3 children
    var isInfinite: boolean = React.Children.count(this.props.children) > 3;
    var settings: any = {
      accessibility: true,
      arrows: false,
      autoplaySpeed: 5000,
      dots: true,
      infinite: isInfinite,
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 500,
      centerPadding: styles.centerPadding,
      pauseOnHover: true,
      variableWidth: false,
      useCSS: true,
      rows: 1,
      respondTo: "slider",
      responsive: [
        {
          breakpoint: 499,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 731,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 963,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1028,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        }
      ]
    };

    return (
      <div>
        <div className={css(styles.filmstripLayout, styles.filmStrip)} aria-label={this.props.ariaLabel}>
          <Slider ref={c => (this._slider = c)} {...settings}>
            {this.props.children}
          </Slider>
          <div
            className={css(styles.indexButtonContainer, styles.sliderButtons, styles.sliderButtonLeft)}
            onClick={() => this._slider.slickPrev()}
          >
            <IconButton
              className={css(styles.indexButton, styles.leftPositioned)}
              iconProps={{ iconName: "ChevronLeft" }}
            />
          </div>
          <div
            className={css(styles.indexButtonContainer, styles.sliderButtons, styles.sliderButtonRight)}
            onClick={() => this._slider.slickNext()}
          >
            <IconButton
              className={css(styles.indexButton, styles.rightPositioned)}
              iconProps={{ iconName: "ChevronRight" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
