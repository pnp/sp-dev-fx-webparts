import { css } from '@uifabric/utilities/lib/css';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import Slider from 'react-slick';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from "./FilmstripLayout.module.scss";
import { useRef } from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

function useBreakpoints(currentWidth: number, breakpoints: number[]) {
  return breakpoints.map(breakpoint => currentWidth < breakpoint);
}

/**
 * Filmstrip layout
 * Presents the child compoments as a slick slide
 */
export const FilmstripLayout = (props: { children: any; clientWidth: number; themeVariant?: IReadonlyTheme, ariaLabel?: string; }) => {
  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');

  let topElem: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  let _slider: React.MutableRefObject<Slider> = useRef<Slider>(null);

  const [isSmall, isMedium] = useBreakpoints(props.clientWidth, [696, 928]);

  let numSlides: number = 3;
  if (isSmall) {
    numSlides = 2;
  } else if (isMedium) {
    numSlides = 3;
  } else {
    numSlides = 4;
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

  console.log("Theme", props.themeVariant);

  return (
    <>
      {/*
      KLUDGE:
      This is a cheaty way to inject styles from the theme variant when the component does not support theme variant customizations.
      We can do this without too much nastiness because this component is added only once per web part
      ... but I still wish there was a better way
      */}
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
      <div>
        <div className={css(styles.filmstripLayout, styles.filmStrip)} aria-label={props.ariaLabel} ref={topElem}>
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
    </>
  );
};
