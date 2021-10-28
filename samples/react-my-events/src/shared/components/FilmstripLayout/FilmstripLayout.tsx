
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { css } from '@uifabric/utilities/lib/css';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import Slider from 'react-slick';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from "./FilmstripLayout.module.scss";
import { useRef } from 'react';
import useComponentSize, { ComponentSize } from '@rehooks/component-size';

function useBreakpoints(currentWidth: number, breakpoints: number[]) {
  return breakpoints.map(breakpoint => currentWidth < breakpoint);
}

/**
 * Filmstrip layout
 * Presents the child compoments as a slick slide
 */
export const FilmstripLayout = (props: { children?: any; clientWidth?: number; themeVariant?: IReadonlyTheme, ariaLabel?: string; }) => {
  let ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  let size: ComponentSize = useComponentSize(ref);
  let { width } = size;

  // // the slick slider used in normal views
  let _slider: React.MutableRefObject<Slider> = useRef<Slider>(null);

  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');

  const [isSmall, isMedium] = useBreakpoints(props.clientWidth, [696, 928]);

  // slick seems to have an issue with having "infinite" mode set to true and having less items than the number of slides per page
  // set infinite to true only if there are more than 3 children
  let numSlides: number = 3;
  if (width) {
    if (width > 927) {
      numSlides = 4;
    } else if (width <= 695) {
      numSlides = 2;
    }
  }

  var isInfinite: boolean = React.Children.count(props.children) > numSlides;
  var settings: any = {
    accessibility: true,
    arrows: false,
    autoplaySpeed: 5000,
    dots: true,
    customPaging: (i: number) => {
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
  };

  return (
    <div>
      {props.themeVariant && <style>{`
             .${styles.carouselDot} {
               background-color: ${props.themeVariant.palette.black}!important;
               border-color: ${props.themeVariant.palette.black}!important;
             }
             .slick-active .${styles.carouselDot} {
               background-color: ${props.themeVariant.palette.themeDark}!important;
               border-color: ${props.themeVariant.palette.themeDark}!important;
             }
             .${styles.filmstripLayout} .ms-DocumentCard--actionable:hover {
               border-color: ${props.themeVariant.semanticColors.variantBorderHovered}!important;
             }
             `}
      </style>
      }
      <div className={css(styles.filmstripLayout, styles.filmStrip)} aria-label={props.ariaLabel} ref={ref}>
        <Slider ref={_slider} {...settings}>
          {props.children}
        </Slider>
        <div
          className={css(styles.indexButtonContainer, styles.sliderButtons)}
          style={{ left: "10px" }}
          onClick={() => _slider.current.slickPrev()}
        >
          <IconButton
            className={css(styles.indexButton, styles.leftPositioned)}
            iconProps={{ iconName: "ChevronLeft", styles: { root: { fontSize: '28px', fontWeight: '400' } } }}
          />
        </div>
        <div
          className={css(styles.indexButtonContainer, styles.sliderButtons)}
          style={{ right: "10px" }}
          onClick={() => _slider.current.slickNext()}
        >
          <IconButton
            className={css(styles.indexButton, styles.rightPositioned)}
            iconProps={{ iconName: "ChevronRight", styles: { root: { fontSize: '28px', fontWeight: '400' } } }}
          />
        </div>
      </div>
    </div>
  );
};
