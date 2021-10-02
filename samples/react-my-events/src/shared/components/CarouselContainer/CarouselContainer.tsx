import { css } from "@uifabric/utilities/lib/css";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import Slider from "react-slick";
import { ICarouselContainerProps, ICarouselContainerState } from ".";
import styles from "./CarouselContainer.module.scss";

/**
 * Carousel container
 * Presents the child compoments as a slick slide
 */
export class CarouselContainer extends React.Component<
  ICarouselContainerProps,
  ICarouselContainerState
> {
  // the slick slider used in normal views
  private _slider: Slider;

  /**
   * Renders a slick switch, a slide for each child, and next/previous arrows
   */
  public render(): React.ReactElement<ICarouselContainerProps> {
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
      centerPadding: "50px",
      pauseOnHover: true,
      variableWidth: false,
      useCSS: true,
      rows: 1,
      respondTo: "slider",
      responsive: [
        {
          breakpoint: 2560,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 801,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        // there is no 1 slide option, as it converts to narrow view
      ]
    };

    return (

      <div className={css(styles.carouselContainer, styles.filmStrip)}>
        <Slider ref={c => (this._slider = c)} {...settings}>
          {this.props.children}
        </Slider>
        <div
          className={css(styles.indexButtonContainer, styles.sliderButtons)}
          style={{ left: "10px" }}
          onClick={() => this._slider.slickPrev()}
        >
          <IconButton
            className={css(styles.indexButton, styles.leftPositioned)}
            iconProps={{ iconName: "ChevronLeft" }}
          />
        </div>
        <div
          className={css(styles.indexButtonContainer, styles.sliderButtons)}
          style={{ right: "10px" }}
          onClick={() => this._slider.slickNext()}
        >
          <IconButton
            className={css(styles.indexButton, styles.rightPositioned)}
            iconProps={{ iconName: "ChevronRight" }}
          />
        </div>
      </div>
    );
  }
}
