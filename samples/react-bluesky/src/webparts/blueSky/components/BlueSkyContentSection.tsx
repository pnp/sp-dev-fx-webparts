import React from 'react';
import styles from './BlueSky.module.scss';

interface BlueSkyContentSectionProps {
    content: string;
}

const BlueSkyContentSection: React.FC<BlueSkyContentSectionProps> = ({ content }) => {
    const renderContentWithHashtags = (text: string): React.ReactNode[] => {
        const hashtagPattern = /#\w+/g;
        const parts = text.split(hashtagPattern);
        const hashtags = text.match(hashtagPattern) || [];

        return parts.reduce((acc, part, index) => {
            acc.push(<span key={`part-${index}`}>{part}</span>);
            if (hashtags[index]) {
                acc.push(
                    <span key={`hashtag-${index}`} className={styles.hashtag}>
                        {hashtags[index]}
                    </span>
                );
            }
            return acc;
        }, [] as React.ReactNode[]);
    };

    return <div className={styles.cardContent}>{renderContentWithHashtags(content)}</div>;
};

export default BlueSkyContentSection;