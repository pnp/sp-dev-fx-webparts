import * as React from 'react';
import styles from './ReactSlideSwiper.module.scss';
import { IReactSlideSwiperProps } from './IReactSlideSwiperProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReactSlideSwiperState } from './IReactSlideSwiperState';
import { ListItem } from '../services/ListItem';
import Card from './Card/Card';

const Swiper = require('swiper/dist/js/swiper.min');

export default class ReactSlideSwiper extends React.Component<IReactSlideSwiperProps, IReactSlideSwiperState> {

  constructor(props: IReactSlideSwiperProps) {
    super(props);
    this.state = { listItems: [] };
  }

  public componentDidMount(): void {

    this.props.listService.getAll().then((result: Array<ListItem>) => {

      // List items returned from the ListMock so we can
      // change the state and display them.
      this.setState({ listItems: result });

      // Since we have list items rendered
      // we can call the swiper and let it
      // handle the swipe effect for the items.
      this.setSwiper();
    });
  }

  public render(): React.ReactElement<IReactSlideSwiperProps> {
    return (
      <div className={styles.reactSlideSwiper}>

        <div className={`swiper-container ${styles.container}`}>
          <div className='swiper-wrapper'>
            {this.state.listItems.length &&
              this.state.listItems.map((listItem, i) => {
                return <div className={`swiper-slide ${styles.slide}`} key={i}>

                  <Card listItem={listItem} key={i} />

                </div>;
              })}
          </div>

          {this.props.swiperOptions.enableNavigation &&
            <div className="swiper-button-next"></div>
          }
          {this.props.swiperOptions.enableNavigation &&
            <div className="swiper-button-prev"></div>
          }

          {this.props.swiperOptions.enablePagination !== false &&
            <div className="swiper-pagination"></div>
          }
        </div>
      </div>
    );
  }

  private setSwiper(): void {
    const opts = this.props.swiperOptions;

    const options: any = {
      slidesPerView: parseInt(opts.slidesPerView) || 3,
      slidesPerGroup: parseInt(opts.slidesPerGroup) || 3,
      spaceBetween: parseInt(opts.spaceBetweenSlides) || 10,
      loop: opts.enableLoop || false,
      grabCursor: opts.enableGrabCursor || false,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        }
      }
    };

    if (opts.enablePagination !== false) {

      options.pagination = {
        el: '.swiper-pagination',
        clickable: true,
      };
    }

    if (opts.enableNavigation) {

      options.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }

    if (opts.enableAutoplay) {

      options.autoplay = {
        delay: opts.delayAutoplay,
        disableOnInteraction: opts.disableAutoplayOnInteraction,
      };
    }

    return new Swiper('.swiper-container', options);
  }
}
