import React from 'react';
import styles from './BlueSky.module.scss';

interface BlueSkyImage {
    alt: string;
    aspectRatio: {
        height: number;
        width: number;
    };
    image: {
        $type: string;
        mimeType: string;
        ref: {
            $link: string;
        };
        size: number;
    };
}

interface BlueSkyExternal {
    description: string;
    thumb: {
        $type: string;
        mimeType: string;
        ref: {
            $link: string;
        };
        size: number;
    };
    title: string;
    uri: string;
}

interface BlueSkyImageSectionProps {
    images?: BlueSkyImage[];
    external?: BlueSkyExternal;
    did: string;
}

const BlueSkyImageSection: React.FC<BlueSkyImageSectionProps> = ({ images, external, did }) => {
    return (
        <div className={styles.cardImagesContainer}>
            {images?.map((image, index) => {
                const imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${image.image.ref.$link}@jpeg`;
                return (
                    <div 
                        key={index} 
                        className={styles.cardImageWrapper} 
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                );
            })}
            {external && (
                <div 
                    className={styles.cardImageWrapper} 
                    style={{ backgroundImage: `url(https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${external.thumb.ref.$link}@jpeg)` }}
                />
            )}
        </div>
    );
};

export default BlueSkyImageSection;