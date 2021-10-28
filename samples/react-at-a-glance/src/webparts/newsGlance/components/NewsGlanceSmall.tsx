import * as React from 'react';
import { INewsGlanceSmallProps } from '../../../interfaces';
import NewsGlanceCard from './NewsGlanceCard';
import styles from './NewsGlanceSmall.module.scss';
// import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewsGlanceTitle from './NewsGlanceTitle';

const NewsGlanceSmall: React.FunctionComponent<INewsGlanceSmallProps> = (props) => {

    let imageElement: JSX.Element =
        <div className={`${styles.carouselItem}`}>
            <NewsGlanceCard imageUrl={props.imageUrl} />
        </div>;
    let sentenceElements: JSX.Element[] =
        props.sentences.map((s) => {
            return <div className={`${styles.carouselItem}`} >
                <NewsGlanceCard title={s} />
            </div>;
        });

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className={styles.newsGlanceSmall}>
            <NewsGlanceTitle title="At a glance" />
            {/* <Carousel
                buttonsLocation={CarouselButtonsLocation.center}
                buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
                contentContainerStyles={styles.container}
                isInfinite={false}
                indicatorShape={CarouselIndicatorShape.circle}
                interval={null}
                element={props.showImage ? [imageElement, ...sentenceElements] : [...sentenceElements]}>
            </Carousel> */}
            <Carousel 
            responsive={responsive}
            containerClass={styles.container}
            showDots={true}
            renderDotsOutside={true}
            dotListClass={styles.carouselDotList}
            removeArrowOnDeviceType={['mobile', 'tablet', 'desktop']}>
                {props.showImage && imageElement}
                {sentenceElements}
            </Carousel>
        </div>
    );
};

export default NewsGlanceSmall;