import { css } from '@uifabric/utilities/lib/css';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import Slider from 'react-slick';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from "./FilmstripLayout.module.scss";
import { useRef, useEffect, useState } from 'react';
import useComponentSize from '@rehooks/component-size';

function useDebounce(value: number, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

function useBreakpoints(currentWidth: number, breakpoints: number[]) {
  return breakpoints.map(breakpoint => currentWidth < breakpoint);
}

/**
 * Filmstrip layout
 * Presents the child compoments as a slick slide
 */
export const FilmstripLayout = (props: { children: any; ariaLabel?: string; }) => {
  let ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  // // the slick slider used in normal views
  let _slider: React.MutableRefObject<Slider> = useRef<Slider>(null);



  let size = useComponentSize(ref);
  let { width } = size;

  const debouncedWidth = useDebounce(width, 500);
  const [numSlides, setNumSlides] = useState(3);

  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
  SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');

  useEffect(
    () => {
      console.log("New width", debouncedWidth);
      // slick seems to have an issue with having "infinite" mode set to true and having less items than the number of slides per page
      // set infinite to true only if there are more than 3 children
      const [isSmall, isMedium] = useBreakpoints(debouncedWidth, [696, 928]);

      if (isSmall) {
        setNumSlides(2);
      } else if (isMedium) {
        setNumSlides(3);
      } else {
        setNumSlides(4);
      }
    },
    [debouncedWidth] // Only re-call effect if value or delay changes
  );

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
