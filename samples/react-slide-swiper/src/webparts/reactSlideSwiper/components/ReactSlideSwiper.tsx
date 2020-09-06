import * as React from 'react';
import styles from './ReactSlideSwiper.module.scss';
import { IReactSlideSwiperProps } from './IReactSlideSwiperProps';
import { IReactSlideSwiperState } from './IReactSlideSwiperState';
import { ListItem } from '../services/ListItem';
import Card from './Card/Card';

const Swiper: any = require('swiper/dist/js/swiper.min');

export default class ReactSlideSwiper extends React.Component<IReactSlideSwiperProps, IReactSlideSwiperState> {
  
  private uniqueId: number;

  constructor(props: IReactSlideSwiperProps) {
    super(props);
    this.state = { listItems: [] };
    
    this.uniqueId = Math.floor(Math.random() * 10000) + 1;
  }

  public componentDidMount(): void {

    this.props.listService.getAll(this.props.listName).then((result: Array<ListItem>) => {

      // List items returned from the ListMock so we can
      // change the state and display them.
      this.setState({ listItems: result });
      console.log(this.state.listItems.length);

      // Since we have list items rendered
      // we can call the swiper and let it
      // handle the swipe effect for the items.
      this.setSwiper();
    });
  }

  public render(): React.ReactElement<IReactSlideSwiperProps> {
    return (
      <div className={styles.reactSlideSwiper}>

        <div className={`swiper-container ${styles.container} container-${this.uniqueId}`}>
          <div className='swiper-wrapper'>
            {this.state.listItems.length &&
              this.state.listItems.map((listItem, i) => {
                return <div className={`swiper-slide ${styles.slide}`} key={i}>

                  <Card listItem={listItem} key={i} />

                </div>;
              })}
          </div>

          {this.props.swiperOptions.enableNavigation &&
            <div className={`swiper-button-next next-${this.uniqueId}`}></div>
          }
          {this.props.swiperOptions.enableNavigation &&
            <div className={`swiper-button-prev prev-${this.uniqueId}`}></div>
          }

          {this.props.swiperOptions.enablePagination !== false &&
            <div className={`swiper-pagination pagination-${this.uniqueId}`}></div>
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
        el: `.pagination-${this.uniqueId}`,
        clickable: true,
      };
    }

    if (opts.enableNavigation) {

      options.navigation = {
        nextEl: `.next-${this.uniqueId}`,
        prevEl: `.prev-${this.uniqueId}`,
      };
    }

    if (opts.enableAutoplay) {

      options.autoplay = {
        delay: opts.delayAutoplay,
        disableOnInteraction: opts.disableAutoplayOnInteraction,
      };
    }

    // tslint:disable-next-line:no-unused-expression
    new Swiper(`.container-${this.uniqueId}`, options);
  }
}