import * as React from 'react';
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  FluentProvider,
  makeStyles,
  PartialTheme,
  tokens
} from '@fluentui/react-components';
import * as strings from 'EventsLayoutsWebPartStrings';
import { SizeClass } from '../../common/useContainerSize';
import { ILayoutProps } from './ILayoutProps';
import { useEventsContext } from '../EventsContext';
import { EventCategory, EventDescription, EventImage, EventMeta, EventTitle } from '../shared/EventParts';

const SLIDE_HEIGHT: Record<SizeClass, number> = { xs: 300, sm: 340, md: 400, lg: 420 };

/** Text sits on top of a photo or brand color, so force light foreground tokens inside the slide. */
const onMediaTheme: PartialTheme = {
  colorNeutralForeground1: '#ffffff',
  colorNeutralForeground2: 'rgba(255, 255, 255, 0.9)',
  colorNeutralForeground3: 'rgba(255, 255, 255, 0.85)',
  colorBrandForeground1: '#ffffff',
  colorStrokeFocus2: '#ffffff'
};

const useStyles = makeStyles({
  slide: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusXLarge
  },
  image: { position: 'absolute', inset: 0 },
  scrim: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.35) 55%, rgba(0, 0, 0, 0.05) 100%)'
  },
  brand: { position: 'absolute', inset: 0, backgroundColor: tokens.colorBrandBackground },
  content: {
    position: 'absolute',
    insetInline: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: 'transparent'
  },
  nav: { marginTop: tokens.spacingVerticalS }
});

/** One event at a time, full-bleed image with overlay text. Built on the Fluent UI v9 Carousel. */
export const CarouselLayout: React.FC<ILayoutProps> = ({ events, size, autoplay, height }) => {
  const styles = useStyles();
  const { display } = useEventsContext();
  const slideHeight = height || SLIDE_HEIGHT[size];

  return (
    <Carousel
      groupSize={1}
      circular
      draggable
      autoplayInterval={6000}
      announcement={(index, total) => `${index + 1} / ${total}`}
    >
      <CarouselViewport>
        <CarouselSlider>
          {events.map((event, index) => (
            <CarouselCard key={event.key} className={styles.slide} style={{ height: slideHeight }}
              aria-label={`${index + 1} / ${events.length}`}>
              {display.showImage
                ? <EventImage event={event} className={styles.image} />
                : <div className={styles.brand} />}
              <div className={styles.scrim} />
              <FluentProvider theme={onMediaTheme} className={styles.content}>
                <EventCategory event={event} />
                <EventTitle event={event} size={size === 'xs' ? 'medium' : 'large'} />
                <EventDescription event={event} />
                <EventMeta event={event} />
              </FluentProvider>
            </CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      {events.length > 1 && (
        <CarouselNavContainer
          className={styles.nav}
          layout="inline"
          prev={{ 'aria-label': strings.Previous }}
          next={{ 'aria-label': strings.Next }}
          autoplay={autoplay ? { 'aria-label': strings.Pause } : undefined}
        >
          <CarouselNav>
            {index => <CarouselNavButton aria-label={strings.GoToSlide.replace('{0}', String(index + 1))} />}
          </CarouselNav>
        </CarouselNavContainer>
      )}
    </Carousel>
  );
};
